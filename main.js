// ── Sample Photos ──────────────────────────────────────────────────────────
const SAMPLE_PHOTOS = [
  {
    id: 's1', breed: '진돗개',
    url: 'https://images.unsplash.com/photo-1583512654167-b60a09b7e2f1?w=600&auto=format&fit=crop',
    title: '진도 섬의 진돗개',
    desc: '전남 진도에서 만난 순수 혈통 진돗개. 맑은 눈빛과 당당한 자태가 인상적이에요.',
    author: '진도사랑', likes: 128,
    createdAt: Date.now() - 864e5 * 7, sample: true
  },
  {
    id: 's2', breed: '풍산개',
    url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&auto=format&fit=crop',
    title: '늠름한 풍산개',
    desc: '북방의 사냥개 풍산개. 하얀 털과 용맹한 눈빛이 인상적인 북한 천연기념물.',
    author: 'PungsanLover', likes: 95,
    createdAt: Date.now() - 864e5 * 5, sample: true
  },
  {
    id: 's3', breed: '진돗개',
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop',
    title: '산책하는 진돗개',
    desc: '아침 산책길에서 만난 활기찬 진돗개. 충성스럽고 영리한 한국의 대표 토종견.',
    author: 'Morning Walk', likes: 74,
    createdAt: Date.now() - 864e5 * 4, sample: true
  },
  {
    id: 's4', breed: '진돗개',
    url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop',
    title: '들판의 황구',
    desc: '넓은 들판을 자유롭게 달리는 황구. 진돗개의 전형적인 황금빛 털이 눈부셔요.',
    author: '들판지기', likes: 203,
    createdAt: Date.now() - 864e5 * 3, sample: true
  },
  {
    id: 's5', breed: '삽살개',
    url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&auto=format&fit=crop',
    title: '복스러운 삽살개',
    desc: '귀신을 쫓는다는 삽살개. 풍성한 털과 순한 눈빛이 매력적인 한국 천연기념물.',
    author: 'SapsaliLove', likes: 156,
    createdAt: Date.now() - 864e5 * 2, sample: true
  },
  {
    id: 's6', breed: '동경이',
    url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&auto=format&fit=crop',
    title: '해변의 동경이',
    desc: '꼬리 없는 경주 동경이. 신라 천년의 역사를 품은 특별한 한국 토종견이에요.',
    author: 'DonggyeongiPark', likes: 89,
    createdAt: Date.now() - 864e5 * 1, sample: true
  },
  {
    id: 's7', breed: '제주개',
    url: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=600&auto=format&fit=crop',
    title: '한라산 제주개',
    desc: '한라산 기슭에서 쉬고 있는 제주 토종개. 제주에서만 만날 수 있는 귀한 견종.',
    author: 'JejuDogLover', likes: 312,
    createdAt: Date.now() - 864e5 * 0.5, sample: true
  },
  {
    id: 's8', breed: '진돗개',
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop',
    title: '진돗개 강아지',
    desc: '어릴 때부터 위풍당당한 진돗개 강아지. 귀여움과 당당함을 동시에 갖췄어요.',
    author: 'BabyJindo', likes: 441,
    createdAt: Date.now() - 864e5 * 0.2, sample: true
  },
  {
    id: 's9', breed: '삽살개',
    url: 'https://images.unsplash.com/photo-1588269845464-8993565cac3a?w=600&auto=format&fit=crop',
    title: '숲속의 삽살개',
    desc: '초록 숲 속을 탐험하는 삽살개. 긴 털이 바람에 나부끼는 자유로운 모습이에요.',
    author: 'Forest_Sapsali', likes: 67,
    createdAt: Date.now() - 864e5 * 0.1, sample: true
  },
  {
    id: 's10', breed: '풍산개',
    url: 'https://images.unsplash.com/photo-1529429225476-8a6d1b06d6d3?w=600&auto=format&fit=crop',
    title: '눈 속의 풍산개',
    desc: '눈밭이 고향인 듯 자유로운 풍산개. 혹한에도 강한 강인한 북방 토종견.',
    author: 'WinterPungsan', likes: 188,
    createdAt: Date.now() - 864e5 * 0.05, sample: true
  }
];

// ── Storage Keys ───────────────────────────────────────────────────────────
const KEY_PHOTOS = 'kdb_photos';
const KEY_LIKED  = 'kdb_liked';
const KEY_LIKES  = 'kdb_likes';

// ── State ──────────────────────────────────────────────────────────────────
let allPhotos      = [];
let currentPhotoId = null;
let selectedFile   = null;
let toastTimer     = null;
let currentBreed   = '';

const likedSet   = new Set(JSON.parse(localStorage.getItem(KEY_LIKED) || '[]'));
const likeCounts = JSON.parse(localStorage.getItem(KEY_LIKES) || '{}');

function saveLiked() {
  localStorage.setItem(KEY_LIKED, JSON.stringify([...likedSet]));
  localStorage.setItem(KEY_LIKES, JSON.stringify(likeCounts));
}

function getLikeCount(photo) {
  if (photo.id in likeCounts) return likeCounts[photo.id];
  return photo.likes || 0;
}

// ── DOM refs ───────────────────────────────────────────────────────────────
const grid           = document.getElementById('photo-grid');
const loadingEl      = document.getElementById('loading');
const emptyEl        = document.getElementById('empty-state');
const modalOverlay   = document.getElementById('modal-overlay');
const openUploadBtn  = document.getElementById('open-upload');
const modalCloseBtn  = document.getElementById('modal-close');
const dropZone       = document.getElementById('drop-zone');
const fileInput      = document.getElementById('file-input');
const dropPlaceholder = document.getElementById('drop-placeholder');
const dropPreview    = document.getElementById('drop-preview');
const previewImg     = document.getElementById('preview-img');
const changeImgBtn   = document.getElementById('change-img');
const browseLink     = document.getElementById('browse-link');
const breedInput     = document.getElementById('photo-breed');
const titleInput     = document.getElementById('photo-title');
const descInput      = document.getElementById('photo-desc');
const authorInput    = document.getElementById('author-name');
const submitBtn      = document.getElementById('submit-btn');
const submitLabel    = document.getElementById('submit-label');
const btnSpinner     = document.getElementById('btn-spinner');
const searchInput    = document.getElementById('search-input');
const breedNav       = document.getElementById('breed-nav');
const lightbox       = document.getElementById('lightbox');
const lightboxBg     = document.getElementById('lightbox-bg');
const lightboxClose  = document.getElementById('lightbox-close');
const lightboxImg    = document.getElementById('lightbox-img');
const lightboxBreed  = document.getElementById('lightbox-breed');
const lightboxTitle  = document.getElementById('lightbox-title');
const lightboxDesc   = document.getElementById('lightbox-desc');
const lightboxAuthor = document.getElementById('lightbox-author');
const lightboxLike   = document.getElementById('lightbox-like');
const lightboxLikeCount = document.getElementById('lightbox-like-count');
const toastEl        = document.getElementById('toast');

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
  breedInput.value = '';
  titleInput.value = '';
  descInput.value = '';
  authorInput.value = '';
  setSubmitLoading(false);
}

openUploadBtn.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

// ── Breed Filter ───────────────────────────────────────────────────────────
breedNav.querySelectorAll('.breed-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    breedNav.querySelectorAll('.breed-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    currentBreed = chip.dataset.breed;
    renderPhotos(allPhotos);
  });
});

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

// ── Image Resize (canvas) ──────────────────────────────────────────────────
function resizeImage(file, maxDim = 1200, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        if (width > height) { height = Math.round(height * maxDim / width); width = maxDim; }
        else { width = Math.round(width * maxDim / height); height = maxDim; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = reject;
    img.src = url;
  });
}

// ── Upload ─────────────────────────────────────────────────────────────────
function setSubmitLoading(on) {
  submitBtn.disabled = on;
  submitLabel.classList.toggle('hidden', on);
  btnSpinner.classList.toggle('hidden', !on);
}

submitBtn.addEventListener('click', async () => {
  if (!selectedFile)              { showToast('사진을 선택해주세요.');           return; }
  if (!breedInput.value)          { showToast('품종을 선택해주세요.');            return; }
  if (!titleInput.value.trim())   { showToast('제목을 입력해주세요.');            return; }
  if (!authorInput.value.trim())  { showToast('이름 또는 닉네임을 입력해주세요.'); return; }

  setSubmitLoading(true);
  try {
    const dataUrl = await resizeImage(selectedFile);

    const newPhoto = {
      id:        'u_' + Date.now(),
      breed:     breedInput.value,
      url:       dataUrl,
      title:     titleInput.value.trim(),
      desc:      descInput.value.trim(),
      author:    authorInput.value.trim(),
      likes:     0,
      createdAt: Date.now()
    };

    const saved = JSON.parse(localStorage.getItem(KEY_PHOTOS) || '[]');
    saved.unshift(newPhoto);
    localStorage.setItem(KEY_PHOTOS, JSON.stringify(saved));

    closeModal();
    loadAndRender();
    showToast('🐾 사진이 업로드됐어요!');
  } catch (err) {
    console.error(err);
    showToast('업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
    setSubmitLoading(false);
  }
});

// ── Like ───────────────────────────────────────────────────────────────────
function toggleLike(id) {
  const liked = likedSet.has(id);
  const delta = liked ? -1 : 1;
  if (liked) likedSet.delete(id); else likedSet.add(id);

  const photo = allPhotos.find(p => p.id === id);
  if (photo) {
    likeCounts[id] = Math.max(0, getLikeCount(photo) + delta);
  }
  saveLiked();

  document.querySelectorAll(`.btn-like[data-id="${id}"]`).forEach(btn => {
    btn.classList.toggle('liked', !liked);
    const svg = btn.querySelector('svg');
    if (svg) svg.setAttribute('fill', !liked ? 'currentColor' : 'none');
    const countEl = btn.querySelector('.like-count');
    if (countEl) countEl.textContent = likeCounts[id] ?? 0;
  });
}

// ── Card ───────────────────────────────────────────────────────────────────
function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function createCard(photo) {
  const liked = likedSet.has(photo.id);
  const count = getLikeCount(photo);
  const breed = photo.breed || '기타';
  const card  = document.createElement('div');
  card.className = 'photo-card';
  card.dataset.id = photo.id;

  card.innerHTML = `
    <img src="${esc(photo.url)}" alt="${esc(photo.title)}" loading="lazy">
    <span class="breed-badge card-breed" data-breed="${esc(breed)}">${esc(breed)}</span>
    <div class="card-overlay">
      <div class="card-overlay-text">
        <h4>${esc(photo.title)}</h4>
        <small>by ${esc(photo.author)}</small>
      </div>
    </div>
    <div class="card-footer">
      <span class="card-title">${esc(photo.title)}</span>
      <button class="btn-like ${liked ? 'liked' : ''}" data-id="${esc(photo.id)}" aria-label="좋아요">
        <svg width="15" height="15" viewBox="0 0 24 24"
             fill="${liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span class="like-count">${count}</span>
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

// ── Render ─────────────────────────────────────────────────────────────────
function renderPhotos(photos) {
  const q = searchInput.value.trim().toLowerCase();
  let list = photos;

  if (currentBreed) {
    list = list.filter(p => (p.breed || '기타') === currentBreed);
  }
  if (q) {
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      (p.desc && p.desc.toLowerCase().includes(q)) ||
      (p.breed && p.breed.toLowerCase().includes(q))
    );
  }

  grid.innerHTML = '';
  emptyEl.classList.toggle('hidden', list.length > 0);
  list.forEach(p => grid.appendChild(createCard(p)));
}

searchInput.addEventListener('input', () => renderPhotos(allPhotos));

// ── Lightbox ───────────────────────────────────────────────────────────────
function openLightbox(photo) {
  currentPhotoId = photo.id;

  lightboxImg.src = photo.url;
  lightboxTitle.textContent = photo.title;
  lightboxDesc.textContent = photo.desc || '';
  lightboxDesc.style.display = photo.desc ? '' : 'none';
  lightboxAuthor.textContent = `by ${photo.author}`;

  if (photo.breed) {
    lightboxBreed.textContent = photo.breed;
    lightboxBreed.dataset.breed = photo.breed;
    lightboxBreed.classList.remove('hidden');
  } else {
    lightboxBreed.classList.add('hidden');
  }

  const count = getLikeCount(photo);
  lightboxLikeCount.textContent = count;
  lightboxLike.dataset.id = photo.id;

  const liked = likedSet.has(photo.id);
  lightboxLike.classList.toggle('liked', liked);
  lightboxLike.querySelector('svg').setAttribute('fill', liked ? 'currentColor' : 'none');

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

// ── Load & Render ──────────────────────────────────────────────────────────
function loadAndRender() {
  const userPhotos = JSON.parse(localStorage.getItem(KEY_PHOTOS) || '[]');
  allPhotos = [...userPhotos, ...SAMPLE_PHOTOS];
  renderPhotos(allPhotos);
}

// ── Partnership Modal ──────────────────────────────────────────────────────
const FORMSPREE_URL = 'https://formspree.io/f/mgolnarw';

const partnerOverlay     = document.getElementById('partner-overlay');
const openPartnerBtn     = document.getElementById('open-partner');
const partnerCloseBtn    = document.getElementById('partner-close');
const partnerFormView    = document.getElementById('partner-form-view');
const partnerSuccessView = document.getElementById('partner-success-view');
const partnerDoneBtn     = document.getElementById('partner-done');
const partnerSubmitBtn   = document.getElementById('partner-submit');
const partnerCompany     = document.getElementById('partner-company');
const partnerName        = document.getElementById('partner-name');
const partnerEmail       = document.getElementById('partner-email');
const partnerType        = document.getElementById('partner-type');
const partnerMessage     = document.getElementById('partner-message');

function openPartnerModal() {
  partnerOverlay.classList.remove('hidden');
  partnerFormView.classList.remove('hidden');
  partnerSuccessView.classList.add('hidden');
  document.body.style.overflow = 'hidden';
}
function closePartnerModal() {
  partnerOverlay.classList.add('hidden');
  document.body.style.overflow = '';
  partnerCompany.value = '';
  partnerName.value = '';
  partnerEmail.value = '';
  partnerType.value = '';
  partnerMessage.value = '';
  partnerSubmitBtn.disabled = false;
  partnerSubmitBtn.textContent = '문의 보내기';
}

openPartnerBtn.addEventListener('click', openPartnerModal);
partnerCloseBtn.addEventListener('click', closePartnerModal);
partnerOverlay.addEventListener('click', (e) => { if (e.target === partnerOverlay) closePartnerModal(); });
partnerDoneBtn.addEventListener('click', closePartnerModal);

partnerSubmitBtn.addEventListener('click', async () => {
  const company = partnerCompany.value.trim();
  const name    = partnerName.value.trim();
  const email   = partnerEmail.value.trim();
  const type    = partnerType.value;
  const message = partnerMessage.value.trim();

  if (!company) { showToast('회사 / 브랜드명을 입력해주세요.'); return; }
  if (!name)    { showToast('담당자 이름을 입력해주세요.');     return; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('올바른 이메일 주소를 입력해주세요.'); return;
  }
  if (!type)    { showToast('문의 유형을 선택해주세요.');       return; }
  if (!message) { showToast('문의 내용을 입력해주세요.');       return; }

  partnerSubmitBtn.disabled = true;
  partnerSubmitBtn.textContent = '전송 중...';

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ company, name, email, type, message })
    });

    if (res.ok) {
      partnerFormView.classList.add('hidden');
      partnerSuccessView.classList.remove('hidden');
    } else {
      throw new Error('server error');
    }
  } catch {
    showToast('전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    partnerSubmitBtn.disabled = false;
    partnerSubmitBtn.textContent = '문의 보내기';
  }
});

// ── Init ───────────────────────────────────────────────────────────────────
loadingEl.classList.add('hidden');
loadAndRender();
