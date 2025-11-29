let detector;
let squatCount = 0;
let wasDown = false;

async function setupCamera() {
  const video = document.getElementById('video');
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
  video.srcObject = stream;
  await new Promise((res) => (video.onloadedmetadata = () => res()));
  await video.play();
  return video;
}

function drawKeypoints(ctx, keypoints) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = '#00e0b8';
  ctx.strokeStyle = '#00e0b8';
  ctx.lineWidth = 2;
  keypoints.forEach((kp) => {
    if (kp.score > 0.4) {
      ctx.beginPath();
      ctx.arc(kp.x, kp.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

// Simple squat heuristic using hip and knee y-positions
function updateSquatCounter(pose) {
  const leftHip = pose.keypoints.find((k) => k.name === 'left_hip');
  const rightHip = pose.keypoints.find((k) => k.name === 'right_hip');
  const leftKnee = pose.keypoints.find((k) => k.name === 'left_knee');
  const rightKnee = pose.keypoints.find((k) => k.name === 'right_knee');
  if (!leftHip || !rightHip || !leftKnee || !rightKnee) return;

  const hipY = (leftHip.y + rightHip.y) / 2;
  const kneeY = (leftKnee.y + rightKnee.y) / 2;

  const down = hipY > kneeY - 10; // hips approximately below knees
  if (down && !wasDown) {
    wasDown = true;
  }
  if (!down && wasDown) {
    squatCount += 1;
    wasDown = false;
    document.getElementById('count').textContent = String(squatCount);
  }
}

async function run() {
  const status = document.getElementById('status');
  const video = await setupCamera();
  const canvas = document.getElementById('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');

  status.textContent = 'Model yükleniyor…';
  const model = poseDetection.SupportedModels.MoveNet;
  detector = await poseDetection.createDetector(model, { modelType: 'Lightning' });
  status.textContent = 'Çalışıyor';

  async function loop() {
    const poses = await detector.estimatePoses(video);
    if (poses[0]) {
      drawKeypoints(ctx, poses[0].keypoints);
      updateSquatCounter(poses[0]);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
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


