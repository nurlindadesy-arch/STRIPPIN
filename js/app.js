/**
 * app.js – STRIPPIN main application logic
 */

// =====================
// STATE
// =====================
const state = {
  currentMode: 'bw',
  currentTemplateIndex: 0,
  uploadedPhotos: [], // array of data URLs
  selectedTemplate: null,
};

// =====================
// PAGE NAVIGATION
// =====================
function goTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);

    if (pageId === 'page-choose') renderTemplatePreview();
    if (pageId === 'page-studio') renderStudio();
    if (pageId === 'page-result') renderResult();
  }
}

// =====================
// HOME – SHUFFLE
// =====================
let showcaseIdx = 0;
const slides = document.querySelectorAll('.strip-slide');

function shuffleStrips() {
  slides[showcaseIdx].classList.remove('active');
  showcaseIdx = (showcaseIdx + 1) % slides.length;
  slides[showcaseIdx].classList.add('active');

  const btn = document.getElementById('shuffleBtn');
  btn.classList.add('spinning');
  setTimeout(() => btn.classList.remove('spinning'), 500);
}

// =====================
// CHOOSE – MODE & CAROUSEL
// =====================
function setMode(mode) {
  state.currentMode = mode;
  state.currentTemplateIndex = 0;
  document.getElementById('btn-bw').classList.toggle('active', mode === 'bw');
  document.getElementById('btn-ceria').classList.toggle('active', mode === 'ceria');
  renderTemplatePreview();
}

function nextTemplate() {
  const list = TEMPLATES[state.currentMode];
  state.currentTemplateIndex = (state.currentTemplateIndex + 1) % list.length;
  renderTemplatePreview();
}

function prevTemplate() {
  const list = TEMPLATES[state.currentMode];
  state.currentTemplateIndex = (state.currentTemplateIndex - 1 + list.length) % list.length;
  renderTemplatePreview();
}

function renderTemplatePreview() {
  const list = TEMPLATES[state.currentMode];
  const tpl = list[state.currentTemplateIndex];
  state.selectedTemplate = tpl;

  // Update prev button visibility
  const prevBtn = document.getElementById('prevBtn');
  if (prevBtn) prevBtn.style.display = list.length > 1 ? 'flex' : 'none';

  const container = document.getElementById('templatePreview');
  if (!container) return;
  container.innerHTML = '';

  const stripEl = buildStripElement(tpl, [], { width: 140, slotH: 100, preview: true });

  // Make it clickable → go to studio
  stripEl.style.cursor = 'pointer';
  stripEl.title = 'Klik untuk menggunakan template ini';
  stripEl.addEventListener('click', () => {
    state.selectedTemplate = tpl;
    state.uploadedPhotos = new Array(tpl.slots.length).fill(null);
    goTo('page-studio');
  });

  container.appendChild(stripEl);

  // Show template name
  let nameEl = container.querySelector('.tpl-name');
  if (!nameEl) {
    nameEl = document.createElement('p');
    nameEl.className = 'tpl-name';
    nameEl.style.cssText = 'font-family:Caveat,cursive;font-size:1rem;color:#7a1c1c;margin-top:8px;text-align:center;';
  }
  nameEl.textContent = tpl.name;
  container.after(nameEl);
}

// =====================
// STRIP BUILDER
// =====================
function buildStripElement(tpl, photos, opts = {}) {
  const { width = 160, slotH = 120, preview = false } = opts;

  const strip = document.createElement('div');
  strip.className = 'tpl-strip';
  strip.style.cssText = `
    width: ${width}px;
    background: ${tpl.bg};
    border: ${tpl.border};
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 2px 4px 16px rgba(0,0,0,.18);
    padding: 6px 6px 0;
    font-family: 'Caveat', cursive;
  `;

  // Film holes decoration
  if (tpl.filmHoles) {
    const holes = document.createElement('div');
    holes.style.cssText = 'width:100%;display:flex;justify-content:space-between;padding:2px 4px;';
    for (let i = 0; i < 6; i++) {
      const h = document.createElement('div');
      h.style.cssText = 'width:10px;height:6px;border-radius:2px;background:#fff;opacity:.8;';
      holes.appendChild(h);
    }
    strip.appendChild(holes);
  }

  // Header
  if (tpl.header) {
    const hdr = document.createElement('div');
    hdr.className = 'tpl-header';
    hdr.style.cssText = `
      background: ${tpl.header.bg};
      color: ${tpl.header.color};
      font-style: ${tpl.header.italic ? 'italic' : 'normal'};
      white-space: pre-line;
      padding: 6px 4px 2px;
      font-size: .8rem;
      font-weight: 700;
      width: 100%;
      text-align: center;
    `;
    hdr.textContent = tpl.header.text;
    strip.appendChild(hdr);
  }

  // Slots
  tpl.slots.forEach((slot, i) => {
    const photo = (photos && photos[i]) ? photos[i] : null;
    const isCircle = slot.shape === 'circle' || slot.shape === 'oval';
    const isScallop = slot.shape === 'scallop';

    const slotEl = document.createElement('div');
    const slotW = isCircle ? slotH - 10 : width - 16;
    slotEl.style.cssText = `
      width: ${slotW}px;
      height: ${slotH}px;
      background: ${photo ? 'transparent' : '#ccc'};
      margin: 4px auto;
      overflow: hidden;
      border-radius: ${isCircle ? '50%' : isScallop ? '50% 20%' : '3px'};
      flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      position: relative;
      cursor: ${preview ? 'default' : 'pointer'};
      border: ${photo ? '2px solid rgba(255,255,255,.4)' : '2px dashed #aaa'};
    `;

    if (photo) {
      const img = document.createElement('img');
      img.src = photo;
      img.style.cssText = `
        width: 100%; height: 100%;
        object-fit: cover;
        filter: ${tpl.filter || 'none'};
        display: block;
      `;
      slotEl.appendChild(img);
    } else {
      const ph = document.createElement('span');
      ph.style.cssText = 'color:#999;font-size:.75rem;text-align:center;padding:4px;line-height:1.3;font-family:Caveat,cursive;';
      ph.textContent = preview ? '' : (slot.label || `Foto ${i + 1}`);
      slotEl.appendChild(ph);
    }

    strip.appendChild(slotEl);
  });

  // Film holes bottom
  if (tpl.filmHoles) {
    const holes = document.createElement('div');
    holes.style.cssText = 'width:100%;display:flex;justify-content:space-between;padding:2px 4px;';
    for (let i = 0; i < 6; i++) {
      const h = document.createElement('div');
      h.style.cssText = 'width:10px;height:6px;border-radius:2px;background:#fff;opacity:.8;';
      holes.appendChild(h);
    }
    strip.appendChild(holes);
  }

  // Footer
  if (tpl.footer) {
    const ftr = document.createElement('div');
    ftr.className = 'tpl-footer';
    ftr.style.cssText = `
      background: ${tpl.footer.bg};
      color: ${tpl.footer.color};
      font-size: .68rem;
      font-weight: 700;
      width: 100%;
      text-align: center;
      padding: 4px 0 4px;
      margin-top: 4px;
      font-style: ${tpl.footer.italic ? 'italic' : 'normal'};
    `;
    ftr.textContent = tpl.footer.text;
    strip.appendChild(ftr);
  }

  return strip;
}

// =====================
// STUDIO PAGE
// =====================
function renderStudio() {
  const tpl = state.selectedTemplate;
  if (!tpl) { goTo('page-choose'); return; }

  // Init photos array
  if (!state.uploadedPhotos || state.uploadedPhotos.length !== tpl.slots.length) {
    state.uploadedPhotos = new Array(tpl.slots.length).fill(null);
  }

  renderUploadSlots();
  updateLivePreview();
}

function renderUploadSlots() {
  const tpl = state.selectedTemplate;
  const container = document.getElementById('uploadSlots');
  container.innerHTML = '';

  tpl.slots.forEach((slot, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'upload-slot';

    const label = document.createElement('label');
    label.textContent = `Foto ${i + 1}`;
    label.style.fontFamily = 'Caveat, cursive';
    label.style.color = '#7a1c1c';
    label.style.minWidth = '60px';

    const thumb = document.createElement('div');
    thumb.className = 'slot-thumb';
    thumb.id = `thumb-${i}`;

    const photoInput = document.createElement('input');
    photoInput.type = 'file';
    photoInput.accept = 'image/*';
    photoInput.addEventListener('change', (e) => handlePhotoUpload(e, i));

    const icon = document.createElement('span');
    icon.textContent = '+';
    icon.id = `icon-${i}`;

    if (state.uploadedPhotos[i]) {
      const img = document.createElement('img');
      img.src = state.uploadedPhotos[i];
      thumb.appendChild(img);
      icon.style.display = 'none';
    }

    thumb.appendChild(icon);
    thumb.appendChild(photoInput);

    // Remove button
    if (state.uploadedPhotos[i]) {
      const removeBtn = document.createElement('button');
      removeBtn.textContent = '✕';
      removeBtn.style.cssText = `
        position: absolute; top: 2px; right: 2px;
        background: rgba(122,28,28,.8); color: #fff;
        border: none; border-radius: 50%;
        width: 20px; height: 20px;
        font-size: .65rem; cursor: pointer; z-index: 2;
        display: flex; align-items: center; justify-content: center;
      `;
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.uploadedPhotos[i] = null;
        renderUploadSlots();
        updateLivePreview();
      });
      thumb.appendChild(removeBtn);
    }

    wrap.appendChild(label);
    wrap.appendChild(thumb);
    container.appendChild(wrap);
  });
}

function handlePhotoUpload(e, index) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    state.uploadedPhotos[index] = ev.target.result;
    renderUploadSlots();
    updateLivePreview();
  };
  reader.readAsDataURL(file);
}

function updateLivePreview() {
  const tpl = state.selectedTemplate;
  const container = document.getElementById('livePreview');
  if (!container || !tpl) return;
  container.innerHTML = '';

  const stripEl = buildStripElement(tpl, state.uploadedPhotos, { width: 150, slotH: 110 });
  container.appendChild(stripEl);
}

// =====================
// RESULT PAGE
// =====================
function renderResult() {
  const tpl = state.selectedTemplate;
  const container = document.getElementById('resultStrip');
  if (!container || !tpl) return;
  container.innerHTML = '';

  const stripEl = buildStripElement(tpl, state.uploadedPhotos, { width: 200, slotH: 150 });
  container.appendChild(stripEl);
}

async function downloadStrip() {
  const btn = document.getElementById('downloadBtn');
  const tpl = state.selectedTemplate;
  if (!tpl) return;

  // Check if html2canvas available
  if (typeof html2canvas === 'undefined') {
    // Load html2canvas dynamically
    btn.textContent = '⏳ Loading...';
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
  }

  btn.textContent = '⏳ Menyiapkan...';
  btn.disabled = true;

  try {
    const stripEl = document.getElementById('resultStrip').firstChild;
    if (!stripEl) return;

    const canvas = await html2canvas(stripEl, {
      backgroundColor: null,
      scale: 3,
      useCORS: true,
      allowTaint: true,
    });

    const link = document.createElement('a');
    link.download = `strippin-${tpl.id}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    btn.textContent = '✅ Downloaded!';
    setTimeout(() => {
      btn.textContent = '🖨️ Download Strip';
      btn.disabled = false;
    }, 2000);
  } catch (err) {
    console.error('Download error:', err);
    btn.textContent = '❌ Gagal, coba lagi';
    btn.disabled = false;
    setTimeout(() => { btn.textContent = '🖨️ Download Strip'; }, 2000);
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function resetAll() {
  state.uploadedPhotos = [];
  state.selectedTemplate = null;
  state.currentTemplateIndex = 0;
  state.currentMode = 'bw';
  goTo('page-home');
}

// =====================
// INIT
// =====================
document.addEventListener('DOMContentLoaded', () => {
  renderTemplatePreview();
});
