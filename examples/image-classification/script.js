let model;

async function loadModel() {
  if (!model) {
    model = await mobilenet.load();
  }
}

function showImage(file) {
  return new Promise((resolve) => {
    const img = document.getElementById('preview');
    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result;
      img.style.display = 'block';
      img.onload = () => resolve(img);
    };
    reader.readAsDataURL(file);
  });
}

function renderPredictions(preds) {
  const list = document.getElementById('predictions');
  list.innerHTML = '';
  preds.slice(0, 3).forEach((p) => {
    const li = document.createElement('li');
    const score = (p.probability * 100).toFixed(1) + '%';
    li.textContent = `${p.className} — ${score}`;
    list.appendChild(li);
  });
}

async function classify(imgEl) {
  await loadModel();
  const predictions = await model.classify(imgEl, 3);
  renderPredictions(predictions);
}

document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('file-input');
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const imgEl = await showImage(file);
    classify(imgEl);
  });
});


