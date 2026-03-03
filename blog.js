// ── Sample Posts ────────────────────────────────────────────────────────────
const SAMPLE_POSTS = [
  {
    id: 'bp1',
    title: 'My First Year with a Jindo: Lessons Learned',
    content: `When I first brought home Baekgu, I thought I was ready. I'd done the research, bought the supplies, and even taken puppy training classes. What I hadn't prepared for was the sheer force of personality that would walk through my door.

Jindos are unlike any other breed I've encountered. In our first week together, Baekgu escaped from the backyard twice — once through a gap I didn't even know existed, and once by simply leaping over what I thought was a perfectly reasonable 4-foot fence. I quickly learned why Jindo owners talk about 6-foot fencing like it's a sacred commandment.

But what surprised me most was the loyalty. By month three, Baekgu had completely bonded to me. She follows me from room to room, greets me at the door with an enthusiasm that never fades, and has an almost uncanny ability to sense when I'm stressed or upset. I've had dogs my whole life, but nothing quite like this.

If you're thinking about getting a Jindo, my advice: invest in your fencing first, be patient during the bonding period, and prepare to be deeply loved.`,
    author: 'BaekgusMom',
    createdAt: Date.now() - 864e5 * 21,
    likes: 52,
    sample: true
  },
  {
    id: 'bp2',
    title: 'Hiking with My Jindo: Trail Tips for the Adventurous Owner',
    content: `My Jindo, Chestnut, and I have hiked over 200 miles together in the past two years. If you're thinking of hitting the trails with your Jindo, here's what I've learned.

Recall training is non-negotiable. Before I let Chestnut off-leash on any trail, we spent six months drilling recall in increasingly distracting environments. A Jindo with a reliable recall is a Jindo you can safely enjoy the outdoors with. A Jindo without one is a liability.

Bring more water than you think you need. Jindos can overheat in warm weather, especially on strenuous climbs. I carry at least 2 liters of water for us to share on any hike over 5 miles.

Watch for wildlife. Chestnut's prey drive goes into overdrive on the trail. She's spotted deer, rabbits, and squirrels before I even knew they were there. Keep a firm hand on the leash in areas with high wildlife activity.

The reward is worth it. There is nothing like watching your Jindo in their element — running through forest, scrambling up rocks, nose to the ground following a scent. They come alive on the trail in a way that never gets old.`,
    author: 'TrailJindoFan',
    createdAt: Date.now() - 864e5 * 14,
    likes: 38,
    sample: true
  },
  {
    id: 'bp3',
    title: "The Story of Baekgu — Korea's Most Famous Jindo",
    content: `If you own a Jindo, you've probably heard of Baekgu (백구). But for those new to the breed, her story is one worth knowing — because it perfectly captures what makes Jindos so extraordinary.

In the 1980s, a female Jindo named Baekgu was sold by her elderly owner, an old woman living on Jindo Island, to a family in Daejeon — a city nearly 300 kilometers away. Within weeks of arriving, Baekgu disappeared.

Seven months later, she appeared back at her original owner's home on Jindo Island. Thin, tired, and missing a toe, she had somehow navigated hundreds of kilometers of unfamiliar terrain, crossed rivers, traversed mountains, and found her way home.

The story captured the hearts of the Korean public and was later immortalized in a bestselling children's book, "The White Dog Baekgu" (흰 강아지 백구), which has sold millions of copies and remains a beloved classic of Korean children's literature.

Baekgu's story is the Jindo breed in one sentence: unbreakable loyalty, extraordinary intelligence, and a will that cannot be broken. Every Jindo carries a piece of that spirit.`,
    author: 'JindoHistorian',
    createdAt: Date.now() - 864e5 * 7,
    likes: 91,
    sample: true
  },
  {
    id: 'bp4',
    title: 'Socializing a Rescue Jindo: Our 6-Month Journey',
    content: `We adopted Dori from a Jindo rescue six months ago. She was two years old, had never lived indoors, and was terrified of everything — strangers, cars, umbrellas, and especially men in hats.

The first month was hard. Dori hid under the bed most of the day and would only come out to eat after we had left the room. Our trainer warned us that Jindo rescues can take much longer to settle than other breeds, and she was right.

Month two brought small breakthroughs. Dori started sleeping on the dog bed instead of under the bed. She began soliciting pets from my partner — first a tentative nose-bump, then leaning into scratches behind the ears.

By month four, something shifted. Dori began meeting us at the door when we came home. She started playing — actually playing, with toys and with us. She met my mother on a visit and, after two cautious hours, allowed herself to be petted.

Six months in, Dori is a different dog. Still wary of strangers, still startled by sudden sounds, but at home with us she is joyful, affectionate, and completely herself. The patience was absolutely worth it.`,
    author: 'DorisDad',
    createdAt: Date.now() - 864e5 * 3,
    likes: 64,
    sample: true
  }
];

// ── Storage Keys ─────────────────────────────────────────────────────────────
const KEY_POSTS      = 'kdb_blog_posts';
const KEY_LIKED      = 'kdb_blog_liked';
const KEY_LIKES      = 'kdb_blog_likes';

// ── State ─────────────────────────────────────────────────────────────────────
let allPosts       = [];
let currentPostId  = null;
let toastTimer     = null;

const likedSet   = new Set(JSON.parse(localStorage.getItem(KEY_LIKED) || '[]'));
const likeCounts = JSON.parse(localStorage.getItem(KEY_LIKES) || '{}');

function saveLiked() {
  localStorage.setItem(KEY_LIKED, JSON.stringify([...likedSet]));
  localStorage.setItem(KEY_LIKES, JSON.stringify(likeCounts));
}
function getLikeCount(post) {
  return post.id in likeCounts ? likeCounts[post.id] : (post.likes || 0);
}

// ── DOM refs ──────────────────────────────────────────────────────────────────
const grid          = document.getElementById('blog-grid');
const emptyEl       = document.getElementById('blog-empty');
const searchInput   = document.getElementById('search-input');
const toastEl       = document.getElementById('toast');

const writeOverlay  = document.getElementById('write-overlay');
const openWriteBtn  = document.getElementById('open-write');
const writeCloseBtn = document.getElementById('write-close');
const postTitleIn   = document.getElementById('post-title');
const postContentIn = document.getElementById('post-content');
const postAuthorIn  = document.getElementById('post-author');
const postSubmitBtn = document.getElementById('post-submit');
const contentCount  = document.getElementById('content-count');
const emptyWriteBtn = document.getElementById('empty-write');

const postOverlay   = document.getElementById('post-overlay');
const postCloseBtn  = document.getElementById('post-close');
const postDetail    = document.getElementById('post-detail');

// ── Toast ─────────────────────────────────────────────────────────────────────
function showToast(msg, duration = 2600) {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.classList.remove('hidden');
  toastTimer = setTimeout(() => toastEl.classList.add('hidden'), duration);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
function excerpt(text, len = 160) {
  const flat = text.replace(/\n+/g, ' ').trim();
  return flat.length > len ? flat.slice(0, len) + '…' : flat;
}

// ── Write Modal ───────────────────────────────────────────────────────────────
function openWriteModal() {
  writeOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  postTitleIn.focus();
}
function closeWriteModal() {
  writeOverlay.classList.add('hidden');
  document.body.style.overflow = '';
  postTitleIn.value = '';
  postContentIn.value = '';
  postAuthorIn.value = '';
  contentCount.textContent = '0 / 3000';
  postSubmitBtn.disabled = false;
  postSubmitBtn.textContent = 'Publish';
}

openWriteBtn.addEventListener('click', openWriteModal);
emptyWriteBtn.addEventListener('click', openWriteModal);
writeCloseBtn.addEventListener('click', closeWriteModal);
writeOverlay.addEventListener('click', (e) => { if (e.target === writeOverlay) closeWriteModal(); });

postContentIn.addEventListener('input', () => {
  contentCount.textContent = `${postContentIn.value.length} / 3000`;
});

postSubmitBtn.addEventListener('click', () => {
  const title   = postTitleIn.value.trim();
  const content = postContentIn.value.trim();
  const author  = postAuthorIn.value.trim();

  if (!title)   { showToast('Please enter a title.'); return; }
  if (!content) { showToast('Please enter some content.'); return; }
  if (!author)  { showToast('Please enter your name or nickname.'); return; }

  const newPost = {
    id: 'up_' + Date.now(),
    title, content, author,
    createdAt: Date.now(),
    likes: 0
  };

  const saved = JSON.parse(localStorage.getItem(KEY_POSTS) || '[]');
  saved.unshift(newPost);
  localStorage.setItem(KEY_POSTS, JSON.stringify(saved));

  closeWriteModal();
  loadAndRender();
  showToast('Post published!');
});

// ── Post Detail Modal ─────────────────────────────────────────────────────────
function openPost(post) {
  currentPostId = post.id;
  const liked = likedSet.has(post.id);
  const count = getLikeCount(post);

  postDetail.innerHTML = `
    <h2 class="post-detail-title">${esc(post.title)}</h2>
    <div class="post-detail-meta">
      <span class="post-detail-author">by ${esc(post.author)}</span>
      <span>${formatDate(post.createdAt)}</span>
    </div>
    <div class="post-detail-body">${esc(post.content)}</div>
    <div class="post-detail-footer">
      <button class="btn-like ${liked ? 'liked' : ''}" id="detail-like" data-id="${esc(post.id)}" aria-label="Like">
        <svg width="18" height="18" viewBox="0 0 24 24"
             fill="${liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span class="like-count">${count}</span>
      </button>
    </div>
  `;

  document.getElementById('detail-like').addEventListener('click', () => {
    toggleLike(post.id);
    const btn = document.getElementById('detail-like');
    if (btn) {
      const nowLiked = likedSet.has(post.id);
      btn.classList.toggle('liked', nowLiked);
      btn.querySelector('svg').setAttribute('fill', nowLiked ? 'currentColor' : 'none');
      btn.querySelector('.like-count').textContent = likeCounts[post.id] ?? getLikeCount(post);
    }
  });

  postOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closePost() {
  postOverlay.classList.add('hidden');
  document.body.style.overflow = '';
  currentPostId = null;
}

postCloseBtn.addEventListener('click', closePost);
postOverlay.addEventListener('click', (e) => { if (e.target === postOverlay) closePost(); });

// ── Like ──────────────────────────────────────────────────────────────────────
function toggleLike(id) {
  const liked = likedSet.has(id);
  const delta = liked ? -1 : 1;
  if (liked) likedSet.delete(id); else likedSet.add(id);

  const post = allPosts.find(p => p.id === id);
  if (post) likeCounts[id] = Math.max(0, getLikeCount(post) + delta);
  saveLiked();

  // update card like button
  const cardBtn = document.querySelector(`.blog-card-likes[data-id="${id}"]`);
  if (cardBtn) {
    const nowLiked = likedSet.has(id);
    cardBtn.classList.toggle('liked', nowLiked);
    cardBtn.querySelector('svg').setAttribute('fill', nowLiked ? 'currentColor' : 'none');
    cardBtn.querySelector('.like-count').textContent = likeCounts[id] ?? getLikeCount(post);
  }
}

// ── Render ────────────────────────────────────────────────────────────────────
function renderPosts(posts) {
  const q = searchInput.value.trim().toLowerCase();
  let list = posts;
  if (q) {
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
    );
  }

  grid.innerHTML = '';
  emptyEl.classList.toggle('hidden', list.length > 0);

  list.forEach(post => {
    const liked = likedSet.has(post.id);
    const count = getLikeCount(post);
    const card  = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
      <div class="blog-card-title">${esc(post.title)}</div>
      <div class="blog-card-excerpt">${esc(excerpt(post.content))}</div>
      <div class="blog-card-meta">
        <span class="blog-card-author">${esc(post.author)}</span>
        <span>${formatDate(post.createdAt)}</span>
        <button class="blog-card-likes ${liked ? 'liked' : ''}" data-id="${esc(post.id)}" aria-label="Like">
          <svg width="14" height="14" viewBox="0 0 24 24"
               fill="${liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span class="like-count">${count}</span>
        </button>
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.blog-card-likes')) return;
      openPost(post);
    });
    card.querySelector('.blog-card-likes').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLike(post.id);
    });

    grid.appendChild(card);
  });
}

searchInput.addEventListener('input', () => renderPosts(allPosts));

// ── Load & Render ─────────────────────────────────────────────────────────────
function loadAndRender() {
  const userPosts = JSON.parse(localStorage.getItem(KEY_POSTS) || '[]');
  allPosts = [...userPosts, ...SAMPLE_POSTS];
  renderPosts(allPosts);
}

// ── Keyboard ──────────────────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closePost(); closeWriteModal(); }
});

// ── Init ──────────────────────────────────────────────────────────────────────
loadAndRender();
