let model;

async function setupCamera() {
  const video = document.getElementById('video');
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
  video.srcObject = stream;
  await new Promise((res) => (video.onloadedmetadata = () => res()));
  await video.play();
  return video;
}

function drawDetections(ctx, predictions) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.lineWidth = 2;
  ctx.font = '14px system-ui';
  predictions.forEach((p) => {
    const [x, y, w, h] = p.bbox;
    ctx.strokeStyle = '#00e0b8';
    ctx.fillStyle = 'rgba(0,224,184,0.2)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillRect(x, y, w, h);
    const label = `${p.class} ${(p.score * 100).toFixed(0)}%`;
    ctx.fillStyle = '#0b3d3a';
    ctx.fillRect(x, y - 18, ctx.measureText(label).width + 8, 18);
    ctx.fillStyle = '#fff';
    ctx.fillText(label, x + 4, y - 5);
  });
}

async function run() {
  const status = document.getElementById('status');
  const video = await setupCamera();
  const canvas = document.getElementById('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');

  status.textContent = 'Model yükleniyor…';
  model = await cocoSsd.load();
  status.textContent = 'Çalışıyor';

  async function loop() {
    const preds = await model.detect(video);
    drawDetections(ctx, preds);
    requestAnimationFrame(loop);
  }
  loop();
}

document.addEventListener('DOMContentLoaded', () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    document.getElementById('status').textContent = 'Webcam desteklenmiyor.';
    return;
  }
  run();
});


