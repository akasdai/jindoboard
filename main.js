import { initializeApp }          from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getFirestore, collection, addDoc, onSnapshot,
  query, orderBy, doc, updateDoc, increment
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js';

// ── Firebase 설정 ──────────────────────────────────────────────────────────
// 1. https://console.firebase.google.com 에서 프로젝트를 만드세요.
// 2. Firestore Database → 시작하기 (테스트 모드)
// 3. Storage → 시작하기 (테스트 모드)
// 4. 프로젝트 설정 → 앱 추가 → 웹 → 아래에 값 붙여넣기
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
// ──────────────────────────────────────────────────────────────────────────

const isConfigured = Object.values(firebaseConfig).every(v => !v.startsWith('YOUR_'));

let db, storage;
if (isConfigured) {
  const app = initializeApp(firebaseConfig);
  db      = getFirestore(app);
  storage = getStorage(app);
} else {
  console.warn('⚠️  Firebase 설정이 필요합니다. main.js의 firebaseConfig를 채워주세요.');
}

// ── DOM refs ───────────────────────────────────────────────────────────────
const grid          = document.getElementById('photo-grid');
const loadingEl     = document.getElementById('loading');
const emptyEl       = document.getElementById('empty-state');
const setupEl       = document.getElementById('setup-notice');
const modalOverlay  = document.getElementById('modal-overlay');
const openUploadBtn = document.getElementById('open-upload');
const modalCloseBtn = document.getElementById('modal-close');
const dropZone      = document.getElementById('drop-zone');
const fileInput     = document.getElementById('file-input');
const dropPlaceholder = document.getElementById('drop-placeholder');
const dropPreview   = document.getElementById('drop-preview');
const previewImg    = document.getElementById('preview-img');
const changeImgBtn  = document.getElementById('change-img');
const browseLink    = document.getElementById('browse-link');
const titleInput    = document.getElementById('photo-title');
const descInput     = document.getElementById('photo-desc');
const authorInput   = document.getElementById('author-name');
const submitBtn     = document.getElementById('submit-btn');
const submitLabel   = document.getElementById('submit-label');
const btnSpinner    = document.getElementById('btn-spinner');
const searchInput   = document.getElementById('search-input');
const lightbox      = document.getElementById('lightbox');
const lightboxBg    = document.getElementById('lightbox-bg');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc  = document.getElementById('lightbox-desc');
const lightboxAuthor= document.getElementById('lightbox-author');
const lightboxLike  = document.getElementById('lightbox-like');
const lightboxLikeCount = document.getElementById('lightbox-like-count');
const toastEl       = document.getElementById('toast');

// ── State ──────────────────────────────────────────────────────────────────
let allPhotos      = [];
let currentPhotoId = null;
let selectedFile   = null;
let toastTimer     = null;

const likedSet = new Set(JSON.parse(localStorage.getItem('jb_liked') || '[]'));
const saveLiked = () => localStorage.setItem('jb_liked', JSON.stringify([...likedSet]));

// ── Toast ──────────────────────────────────────────────────────────────────
function showToast(msg, duration = 2600) {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.classList.remove('hidden');
  toastTimer = setTimeout(() => toastEl.classList.add('hidden'), duration);
}

// ── Modal ──────────────────────────────────────────────────────────────────
function openModal() {
  modalOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modalOverlay.classList.add('hidden');
  document.body.style.overflow = '';
  resetForm();
}
function resetForm() {
  selectedFile = null;
  fileInput.value = '';
  previewImg.src = '';
  dropPreview.classList.add('hidden');
  dropPlaceholder.classList.remove('hidden');
  titleInput.value = '';
  descInput.value = '';
  authorInput.value = '';
  setLoading(false);
}

openUploadBtn.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

// ── File Handling ──────────────────────────────────────────────────────────
function handleFile(file) {
  if (!file || !file.type.startsWith('image/')) {
    showToast('이미지 파일만 업로드할 수 있습니다.');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showToast('파일 크기는 10MB 이하여야 합니다.');
    return;
  }
  selectedFile = file;
  previewImg.src = URL.createObjectURL(file);
  dropPlaceholder.classList.add('hidden');
  dropPreview.classList.remove('hidden');
}

dropZone.addEventListener('click', () => fileInput.click());
browseLink.addEventListener('click', (e) => { e.stopPropagation(); fileInput.click(); });
fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));
changeImgBtn.addEventListener('click', (e) => { e.stopPropagation(); fileInput.click(); });

dropZone.addEventListener('dragover',  (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', ()  => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  handleFile(e.dataTransfer.files[0]);
});

// ── Upload ─────────────────────────────────────────────────────────────────
function setLoading(on) {
  submitBtn.disabled = on;
  submitLabel.classList.toggle('hidden', on);
  btnSpinner.classList.toggle('hidden', !on);
}

submitBtn.addEventListener('click', async () => {
  if (!isConfigured) {
    showToast('Firebase 설정이 필요합니다.');
    return;
  }
  if (!selectedFile)            { showToast('사진을 선택해주세요.');         return; }
  if (!titleInput.value.trim()) { showToast('제목을 입력해주세요.');          return; }
  if (!authorInput.value.trim()){ showToast('이름 또는 닉네임을 입력해주세요.'); return; }

  setLoading(true);
  try {
    const ext      = selectedFile.name.split('.').pop();
    const filename = `photos/${Date.now()}.${ext}`;
    const storRef  = ref(storage, filename);

    await uploadBytes(storRef, selectedFile);
    const url = await getDownloadURL(storRef);

    await addDoc(collection(db, 'photos'), {
      url,
      title:     titleInput.value.trim(),
      desc:      descInput.value.trim(),
      author:    authorInput.value.trim(),
      likes:     0,
      createdAt: new Date()
    });

    closeModal();
    showToast('🐕 사진이 업로드됐어요!');
  } catch (err) {
    console.error(err);
    showToast('업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
    setLoading(false);
  }
});

// ── Like ───────────────────────────────────────────────────────────────────
async function toggleLike(id) {
  if (!isConfigured) return;
  const liked = likedSet.has(id);
  const delta = liked ? -1 : 1;

  if (liked) likedSet.delete(id);
  else       likedSet.add(id);
  saveLiked();

  // Update all card like buttons for this photo
  document.querySelectorAll(`.btn-like[data-id="${id}"]`).forEach(btn => {
    btn.classList.toggle('liked', !liked);
    const svg = btn.querySelector('svg');
    if (svg) svg.setAttribute('fill', !liked ? 'currentColor' : 'none');
    const count = btn.querySelector('.like-count');
    if (count) count.textContent = Math.max(0, parseInt(count.textContent || '0') + delta);
  });

  try {
    await updateDoc(doc(db, 'photos', id), { likes: increment(delta) });
  } catch (err) {
    // Rollback optimistic update
    if (liked) likedSet.add(id); else likedSet.delete(id);
    saveLiked();
    console.error(err);
  }
}

// ── Card ───────────────────────────────────────────────────────────────────
function createCard(photo) {
  const liked = likedSet.has(photo.id);
  const card  = document.createElement('div');
  card.className = 'photo-card';
  card.dataset.id = photo.id;

  card.innerHTML = `
    <img src="${photo.url}" alt="${escHtml(photo.title)}" loading="lazy">
    <div class="card-overlay">
      <div class="card-overlay-text">
        <h4>${escHtml(photo.title)}</h4>
        <small>by ${escHtml(photo.author)}</small>
      </div>
    </div>
    <div class="card-footer">
      <span class="card-title">${escHtml(photo.title)}</span>
      <button class="btn-like ${liked ? 'liked' : ''}" data-id="${photo.id}" aria-label="좋아요">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="${liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span class="like-count">${photo.likes || 0}</span>
      </button>
    </div>
  `;

  card.querySelector('img').addEventListener('click', () => openLightbox(photo));
  card.querySelector('.card-overlay').addEventListener('click', () => openLightbox(photo));
  card.querySelector('.btn-like').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLike(photo.id);
  });

  return card;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Render ─────────────────────────────────────────────────────────────────
function renderPhotos(photos) {
  const q = searchInput.value.trim().toLowerCase();
  const list = q
    ? photos.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        (p.desc && p.desc.toLowerCase().includes(q))
      )
    : photos;

  grid.innerHTML = '';

  if (list.length === 0) {
    emptyEl.classList.remove('hidden');
  } else {
    emptyEl.classList.add('hidden');
    list.forEach(p => grid.appendChild(createCard(p)));
  }
}

searchInput.addEventListener('input', () => renderPhotos(allPhotos));

// ── Lightbox ───────────────────────────────────────────────────────────────
function openLightbox(photo) {
  currentPhotoId = photo.id;

  lightboxImg.src = photo.url;
  lightboxTitle.textContent = photo.title;

  if (photo.desc) {
    lightboxDesc.textContent = photo.desc;
    lightboxDesc.style.display = '';
  } else {
    lightboxDesc.style.display = 'none';
  }

  lightboxAuthor.textContent = `by ${photo.author}`;
  lightboxLikeCount.textContent = photo.likes || 0;

  const liked = likedSet.has(photo.id);
  lightboxLike.dataset.id = photo.id;
  lightboxLike.classList.toggle('liked', liked);
  const svg = lightboxLike.querySelector('svg');
  if (svg) svg.setAttribute('fill', liked ? 'currentColor' : 'none');

  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
  currentPhotoId = null;
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxBg.addEventListener('click', closeLightbox);
lightboxLike.addEventListener('click', () => {
  if (currentPhotoId) toggleLike(currentPhotoId);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeLightbox(); closeModal(); }
});

// ── Init ───────────────────────────────────────────────────────────────────
function init() {
  if (!isConfigured) {
    loadingEl.classList.add('hidden');
    setupEl.classList.remove('hidden');
    return;
  }

  const q = query(collection(db, 'photos'), orderBy('createdAt', 'desc'));

  onSnapshot(q, (snap) => {
    loadingEl.classList.add('hidden');
    allPhotos = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    renderPhotos(allPhotos);
  }, (err) => {
    console.error(err);
    loadingEl.classList.add('hidden');
    showToast('데이터를 불러오는 중 오류가 발생했습니다.');
    emptyEl.classList.remove('hidden');
  });
}

init();
