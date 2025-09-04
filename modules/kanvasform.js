const FEATURED_IMAGES = [
  "basquiat2.jpg",
];
const initialImage = FEATURED_IMAGES[0];          
const previewImg    = document.getElementById('previewImg');
const previewTitle  = document.getElementById('previewTitle');
const previewDesc   = document.getElementById('previewDesc');
const previewArtist = document.getElementById('previewArtist');
const previewMedium = document.getElementById('previewMedium');
const previewStyle  = document.getElementById('previewStyle');
const previewDate   = document.getElementById('previewDate');

const confirmActions= document.getElementById('confirmActions');
const continueBtn   = document.getElementById('continueBtn');
const backBtn       = document.getElementById('backBtn');

const form          = document.getElementById('kanvasForm');
const firstName     = document.getElementById('firstName');
const lastName      = document.getElementById('lastName');
const email         = document.getElementById('email');
const bio           = document.getElementById('bio');
const descInput     = document.getElementById('description');
const mediumSelect  = document.getElementById('medium');
const styleSelect   = document.getElementById('style');
const originality   = document.getElementById('originality');
const titleInput    = document.getElementById('title');
const dateInput     = document.getElementById('creationDate');
const notes         = document.getElementById('notes');

const dropzone      = document.getElementById('dropzone');
const fileInput     = document.getElementById('artwork');

previewImg.src = initialImage;

// Keep upload zone roughly same height as the bio
function syncDropzoneHeight(){
  const h = bio.getBoundingClientRect().height;
  dropzone.style.minHeight = Math.max(200, Math.round(h)) + 'px';
}
window.addEventListener('load', syncDropzoneHeight);
window.addEventListener('resize', syncDropzoneHeight);

/********* IMAGE PREVIEW (drop/click/paste) *********/
['dragenter','dragover'].forEach(ev=>{
  dropzone.addEventListener(ev, e=>{ e.preventDefault(); dropzone.classList.add('dragover'); });
});
['dragleave','drop'].forEach(ev=>{
  dropzone.addEventListener(ev, e=>{ e.preventDefault(); dropzone.classList.remove('dragover'); });
});
dropzone.addEventListener('click', ()=> fileInput.click());
dropzone.addEventListener('drop', e=>{
  const files = e.dataTransfer.files;
  if(files && files[0]) loadLocalImage(files[0]);
});
fileInput.addEventListener('change', e=>{
  const f = e.target.files?.[0];
  if(f) loadLocalImage(f);
});
// paste support
document.addEventListener('paste', e=>{
  const items = e.clipboardData?.items || [];
  for(const it of items){
    if(it.type?.startsWith('image/')){
      const file = it.getAsFile();
      if(file) loadLocalImage(file);
      break;
    }
  }
});
function loadLocalImage(file){
  const rdr = new FileReader();
  rdr.onload = e => { previewImg.src = e.target.result; };
  rdr.readAsDataURL(file);
}

/********* LIVE PREVIEW *********/
function fullName(){
  return [firstName.value, lastName.value].filter(Boolean).join(' ').trim();
}
function updatePreview(){
  previewArtist.textContent = fullName() || '—';
  previewTitle.textContent  = titleInput.value || 'Untitled';
  previewDesc.textContent   = descInput.value || '—';
  previewMedium.textContent = mediumSelect.value || '—';
  previewStyle.textContent  = styleSelect.value || '—';
  previewDate.textContent   = dateInput.value || '—';
}
[firstName,lastName,titleInput,descInput,mediumSelect,styleSelect,dateInput,originality]
  .forEach(el => el.addEventListener('input', updatePreview));

/********* STEP FLOW: Continue -> Confirm (Back/Submit) *********/
let confirming = false;

continueBtn.addEventListener('click', ()=>{
  // If file upload is required, the native validation will enforce it:
  if(!form.checkValidity()){
    form.reportValidity();
    return;
  }
  updatePreview();
  confirmActions.classList.remove('hidden'); // shows Back + Submit (left)
  confirming = true;
});

backBtn?.addEventListener('click', ()=>{
  confirmActions.classList.add('hidden');
  confirming = false;
  // [...form.elements].forEach(el=> el.disabled = false);
});
