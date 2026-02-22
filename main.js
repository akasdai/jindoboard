// ── Sample Photos ──────────────────────────────────────────────────────────
const SAMPLE_PHOTOS = [
  {
    id: 's2',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Cisco_%282503567883%29.jpg/600px-Cisco_%282503567883%29.jpg',
    title: 'Cisco on a Summer Day',
    desc: 'A confident Jindo posing outdoors — calm, alert, and full of personality.',
    author: 'CiscosDad', likes: 95,
    createdAt: Date.now() - 864e5 * 5, sample: true
  },
  {
    id: 's3',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Exuberance_%28278608587%29.jpg/600px-Exuberance_%28278608587%29.jpg',
    title: 'Full Speed!',
    desc: 'Pure joy in motion. This Jindo is living its best life running free.',
    author: 'MorningWalker', likes: 74,
    createdAt: Date.now() - 864e5 * 4, sample: true
  },
  {
    id: 's4',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Desert_puppy_%28278608593%29.jpg/600px-Desert_puppy_%28278608593%29.jpg',
    title: 'Desert Pup',
    desc: 'A young Jindo puppy exploring wide open landscapes. Curious and fearless from day one.',
    author: 'JindoPupLover', likes: 203,
    createdAt: Date.now() - 864e5 * 3, sample: true
  },
  {
    id: 's5',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Cliffs_%28279492043%29.jpg/600px-Cliffs_%28279492043%29.jpg',
    title: 'King of the Cliffs',
    desc: 'A Jindo surveying its territory from rocky cliffs. Proud, majestic, and utterly fearless.',
    author: 'CliffRunner', likes: 156,
    createdAt: Date.now() - 864e5 * 2, sample: true
  },
  {
    id: 's6',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/At_Balboa_Pier_%282838273604%29.jpg/600px-At_Balboa_Pier_%282838273604%29.jpg',
    title: 'Pier Portrait',
    desc: 'A beautiful Jindo at Balboa Pier, striking a natural, regal pose by the ocean.',
    author: 'BeachJindo', likes: 89,
    createdAt: Date.now() - 864e5 * 1, sample: true
  },
  {
    id: 's7',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Best_friends_%282411215500%29.jpg/600px-Best_friends_%282411215500%29.jpg',
    title: 'Best Friends',
    desc: 'Two Jindo dogs side by side — the loyalty of Jindos knows no bounds.',
    author: 'JejuDogLover', likes: 312,
    createdAt: Date.now() - 864e5 * 0.5, sample: true
  },
  {
    id: 's8',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/CHULMA.jpg/600px-CHULMA.jpg',
    title: 'Chulma',
    desc: 'A classic Jindo portrait. Intelligent eyes and an air of quiet, unshakeable confidence.',
    author: 'BabyJindo', likes: 441,
    createdAt: Date.now() - 864e5 * 0.2, sample: true
  },
  {
    id: 's9',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Christmas_dog_%28336908613%29.jpg/600px-Christmas_dog_%28336908613%29.jpg',
    title: 'Holiday Walk',
    desc: 'A Jindo enjoying the fresh outdoors. Always ready for the next adventure.',
    author: 'ForestJindo', likes: 67,
    createdAt: Date.now() - 864e5 * 0.1, sample: true
  },
  {
    id: 's11',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Adventure_dog%21_%282411172406%29.jpg',
    title: 'Adventure Awaits',
    desc: 'A Jindo hitting the trail with boundless energy. These dogs were born to explore.',
    author: 'TrailJindo', likes: 118,
    createdAt: Date.now() - 864e5 * 12, sample: true
  },
  {
    id: 's12',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Ambush_%28278593429%29.jpg',
    title: 'The Ambush',
    desc: 'Crouched low and ready to pounce — the natural hunting instincts of a Jindo on full display.',
    author: 'WildJindo', likes: 87,
    createdAt: Date.now() - 864e5 * 11, sample: true
  },
  {
    id: 's13',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Another_rest_stop_%283691126672%29.jpg',
    title: 'Trail Break',
    desc: 'Taking a well-earned rest on the trail. Even the most energetic Jindo needs a breather.',
    author: 'HikingWithJindo', likes: 64,
    createdAt: Date.now() - 864e5 * 10, sample: true
  },
  {
    id: 's14',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Cattle_dog_on_the_rocks_%284413995963%29.jpg',
    title: 'Rocky Terrain',
    desc: 'A Jindo navigating rough terrain with ease. Sure-footed and utterly fearless.',
    author: 'RockyJindo', likes: 142,
    createdAt: Date.now() - 864e5 * 9, sample: true
  },
  {
    id: 's15',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Cisco_%283141169167%29.jpg',
    title: 'Natural Light Portrait',
    desc: 'The soulful gaze of a Jindo in natural light. Intelligence and loyalty in every glance.',
    author: 'CiscosDad', likes: 229,
    createdAt: Date.now() - 864e5 * 8, sample: true
  },
  {
    id: 's16',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Jindo_dog_face.jpg',
    title: 'Up Close',
    desc: 'An intimate close-up of a Jindo\'s expressive face. Those eyes say everything.',
    author: 'JindoPortrait', likes: 375,
    createdAt: Date.now() - 864e5 * 7.5, sample: true
  },
  {
    id: 's17',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Korea_Jindo_Dog_1.jpg',
    title: 'Breed Standard',
    desc: 'A textbook-perfect Jindo showcasing the breed\'s characteristic upright ears and curled tail.',
    author: 'JindoBreeder', likes: 198,
    createdAt: Date.now() - 864e5 * 7, sample: true
  },
  {
    id: 's18',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/At_Balboa_Pier_%282838275584%29.jpg/600px-At_Balboa_Pier_%282838275584%29.jpg',
    title: 'Pier at Sunset',
    desc: 'A Jindo at Balboa Pier, relaxed and regal against the ocean backdrop.',
    author: 'BeachJindo', likes: 163,
    createdAt: Date.now() - 864e5 * 6.5, sample: true
  },
  {
    id: 's19',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Jindo_Cor%C3%A9en.jpg/600px-Jindo_Cor%C3%A9en.jpg',
    title: 'Jindo Coréen',
    desc: 'A beautifully composed Jindo portrait capturing the breed\'s quiet dignity and alert expression.',
    author: 'JindoLover', likes: 257,
    createdAt: Date.now() - 864e5 * 6, sample: true
  },
  {
    id: 's20',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Korean_Jindo_Dog.jpg',
    title: 'The Classic Jindo',
    desc: 'A cream-coated Jindo in perfect form. Korea\'s Natural Monument No. 53 and national treasure.',
    author: 'KoreanDogLover', likes: 401,
    createdAt: Date.now() - 864e5 * 5.5, sample: true
  },
  {
    id: 's21',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Jindo_024.JPG/600px-Jindo_024.JPG',
    title: 'Jindo Show',
    desc: 'A proud Jindo at a breed show, displaying the characteristic traits of this ancient Korean breed.',
    author: 'JindoBreeder', likes: 133,
    createdAt: Date.now() - 864e5 * 5, sample: true
  },
  {
    id: 's22',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Jindo-dog1.jpg/600px-Jindo-dog1.jpg',
    title: 'Standing Tall',
    desc: 'A Jindo standing in full form — the upright posture and alert ears are unmistakably Jindo.',
    author: 'JindoBreeder', likes: 88,
    createdAt: Date.now() - 864e5 * 4.5, sample: true
  },
  {
    id: 's23',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/CHUNDOONG.png/600px-CHUNDOONG.png',
    title: 'Chundoong',
    desc: 'A registered Korean Jindo named Chundoong. Proud lineage and impeccable form.',
    author: 'JindoBreeder', likes: 176,
    createdAt: Date.now() - 864e5 * 4, sample: true
  },
  {
    id: 's24',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cisco_and_Nako_%283501549756%29.jpg/600px-Cisco_and_Nako_%283501549756%29.jpg',
    title: 'Cisco & Nako',
    desc: 'Two Jindos, one adventure. These loyal companions explore the world side by side.',
    author: 'CiscosDad', likes: 312,
    createdAt: Date.now() - 864e5 * 3.5, sample: true
  },
  {
    id: 's25',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Cisco_at_the_beach_%282279842668%29.jpg/600px-Cisco_at_the_beach_%282279842668%29.jpg',
    title: 'Beach Day',
    desc: 'A Jindo enjoying a perfect beach day. The ocean suits them just as well as the mountains.',
    author: 'BeachJindo', likes: 289,
    createdAt: Date.now() - 864e5 * 3, sample: true
  },
  {
    id: 's26',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Cisco_at_the_Ski_Hut_%283690336081%29.jpg/600px-Cisco_at_the_Ski_Hut_%283690336081%29.jpg',
    title: 'Snow Dog',
    desc: 'A Jindo at a mountain ski hut, perfectly at home in the cold winter landscape.',
    author: 'WinterJindo', likes: 221,
    createdAt: Date.now() - 864e5 * 2.5, sample: true
  },
  {
    id: 's27',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cisco_in_the_creek_%283736999192%29.jpg/600px-Cisco_in_the_creek_%283736999192%29.jpg',
    title: 'Creek Crossing',
    desc: 'Wading through a creek without a second thought — Jindos are fearless in the great outdoors.',
    author: 'CiscosDad', likes: 145,
    createdAt: Date.now() - 864e5 * 2, sample: true
  },
  {
    id: 's28',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Cisco_leaping_into_the_sea_%28278615139%29.jpg/600px-Cisco_leaping_into_the_sea_%28278615139%29.jpg',
    title: 'Sea Leap',
    desc: 'Taking the plunge! A Jindo leaps joyfully into the sea. Pure, uninhibited freedom.',
    author: 'BeachJindo', likes: 467,
    createdAt: Date.now() - 864e5 * 1.5, sample: true
  },
  {
    id: 's29',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Exuberance_again_%28278608585%29.jpg/600px-Exuberance_again_%28278608585%29.jpg',
    title: 'More Exuberance',
    desc: 'Catching some air! When a Jindo runs, it runs with everything it has.',
    author: 'MorningWalker', likes: 334,
    createdAt: Date.now() - 864e5 * 1, sample: true
  },
  {
    id: 's30',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/White_Korea_Jindo_Dog.jpg/600px-White_Korea_Jindo_Dog.jpg',
    title: 'White Jindo',
    desc: 'The pure white coat of this Jindo is breathtaking — a rare and cherished variation of the breed.',
    author: 'WhiteJindoLover', likes: 519,
    createdAt: Date.now() - 864e5 * 0.5, sample: true
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
document.getElementById('footer-contact').addEventListener('click', (e) => { e.preventDefault(); openPartnerModal(); });
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
