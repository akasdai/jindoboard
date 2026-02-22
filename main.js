// ── Sample Photos ──────────────────────────────────────────────────────────
const SAMPLE_PHOTOS = [
  {
    id: 's2',
    url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&auto=format&fit=crop',
    title: 'Majestic Pungsan',
    desc: 'The Pungsan, a powerful hunting dog from North Korea. Bold, fearless, and beautiful.',
    author: 'PungsanLover', likes: 95,
    createdAt: Date.now() - 864e5 * 5, sample: true
  },
  {
    id: 's3',
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop',
    title: 'Morning Walk',
    desc: 'A lively Jindo enjoying a morning walk. Loyal and intelligent — a true Korean native.',
    author: 'MorningWalker', likes: 74,
    createdAt: Date.now() - 864e5 * 4, sample: true
  },
  {
    id: 's4',
    url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop',
    title: 'Golden Hwanggu',
    desc: 'A golden Jindo running free in open fields. The iconic amber coat shines in the sun.',
    author: 'FieldKeeper', likes: 203,
    createdAt: Date.now() - 864e5 * 3, sample: true
  },
  {
    id: 's5',
    url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&auto=format&fit=crop',
    title: 'Fluffy Sapsali',
    desc: 'The Sapsali, a Korean natural monument said to ward off evil spirits. Fluffy and gentle.',
    author: 'SapsaliLove', likes: 156,
    createdAt: Date.now() - 864e5 * 2, sample: true
  },
  {
    id: 's6',
    url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&auto=format&fit=crop',
    title: 'Donggyeongi at the Beach',
    desc: 'The tailless Gyeongju Donggyeongi — a rare Korean native breed with a thousand-year history.',
    author: 'DonggyeongiPark', likes: 89,
    createdAt: Date.now() - 864e5 * 1, sample: true
  },
  {
    id: 's7',
    url: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=600&auto=format&fit=crop',
    title: 'Jeju Dog at Hallasan',
    desc: 'A Jeju native dog resting at the foot of Mt. Hallasan. Found only on Jeju Island.',
    author: 'JejuDogLover', likes: 312,
    createdAt: Date.now() - 864e5 * 0.5, sample: true
  },
  {
    id: 's8',
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop',
    title: 'Jindo Puppy',
    desc: 'A bold Jindo puppy — adorable and spirited from day one.',
    author: 'BabyJindo', likes: 441,
    createdAt: Date.now() - 864e5 * 0.2, sample: true
  },
  {
    id: 's9',
    url: 'https://images.unsplash.com/photo-1588269845464-8993565cac3a?w=600&auto=format&fit=crop',
    title: 'Sapsali in the Forest',
    desc: 'A Sapsali exploring the green forest, long fur flowing freely in the breeze.',
    author: 'ForestSapsali', likes: 67,
    createdAt: Date.now() - 864e5 * 0.1, sample: true
  },
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
const titleInput     = document.getElementById('photo-title');
const descInput      = document.getElementById('photo-desc');
const authorInput    = document.getElementById('author-name');
const submitBtn      = document.getElementById('submit-btn');
const submitLabel    = document.getElementById('submit-label');
const btnSpinner     = document.getElementById('btn-spinner');
const searchInput    = document.getElementById('search-input');
const lightbox       = document.getElementById('lightbox');
const lightboxBg     = document.getElementById('lightbox-bg');
const lightboxClose  = document.getElementById('lightbox-close');
const lightboxImg    = document.getElementById('lightbox-img');
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
  titleInput.value = '';
  descInput.value = '';
  authorInput.value = '';
  setSubmitLoading(false);
}

openUploadBtn.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

// ── File Handling ──────────────────────────────────────────────────────────
function handleFile(file) {
  if (!file || !file.type.startsWith('image/')) {
    showToast('Please select an image file.');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showToast('File size must be 10MB or less.');
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
  if (!selectedFile)              { showToast('Please select a photo.');         return; }
  if (!titleInput.value.trim())   { showToast('Please enter a title.');          return; }
  if (!authorInput.value.trim())  { showToast('Please enter your name or nickname.'); return; }

  setSubmitLoading(true);
  try {
    const dataUrl = await resizeImage(selectedFile);

    const newPhoto = {
      id:        'u_' + Date.now(),
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
    showToast('🐾 Photo uploaded!');
  } catch (err) {
    console.error(err);
    showToast('Upload failed. Please try again.');
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
  const card  = document.createElement('div');
  card.className = 'photo-card';
  card.dataset.id = photo.id;

  card.innerHTML = `
    <img src="${esc(photo.url)}" alt="${esc(photo.title)}" loading="lazy">
    <div class="card-overlay">
      <button class="btn-like card-like-overlay ${liked ? 'liked' : ''}" data-id="${esc(photo.id)}" aria-label="Like">
        <svg width="16" height="16" viewBox="0 0 24 24"
             fill="${liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
      <div class="card-overlay-text">
        <h4>${esc(photo.title)}</h4>
        <small>by ${esc(photo.author)}</small>
      </div>
    </div>
  `;

  card.querySelector('img').addEventListener('click', () => openLightbox(photo));
  card.querySelector('.card-overlay-text').addEventListener('click', () => openLightbox(photo));
  card.querySelectorAll('.btn-like').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLike(photo.id);
    });
  });

  return card;
}

// ── Render ─────────────────────────────────────────────────────────────────
function renderPhotos(photos) {
  const q = searchInput.value.trim().toLowerCase();
  let list = photos;

  if (q) {
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      (p.desc && p.desc.toLowerCase().includes(q))
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
  partnerSubmitBtn.textContent = 'Send Inquiry';
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

  if (!company) { showToast('Please enter your company or brand name.'); return; }
  if (!name)    { showToast('Please enter your contact name.');          return; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email address.'); return;
  }
  if (!type)    { showToast('Please select an inquiry type.');           return; }
  if (!message) { showToast('Please enter your message.');               return; }

  partnerSubmitBtn.disabled = true;
  partnerSubmitBtn.textContent = 'Sending...';

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
    showToast('Failed to send. Please try again later.');
    partnerSubmitBtn.disabled = false;
    partnerSubmitBtn.textContent = 'Send Inquiry';
  }
});

// ── Init ───────────────────────────────────────────────────────────────────
loadingEl.classList.add('hidden');
loadAndRender();
