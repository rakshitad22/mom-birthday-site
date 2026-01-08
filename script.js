// script.js

// 1) Surprise message + confetti
const surpriseBtn = document.getElementById('surpriseBtn');
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let confetti = [];
function launchConfetti() {
  confetti = Array.from({ length: 180 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    r: Math.random() * 6 + 2,
    c: `hsl(${Math.random() * 360}, 80%, 60%)`,
    s: Math.random() * 2 + 1,
    a: Math.random() * 0.02 + 0.01
  }));
}
function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.c;
    ctx.fill();
    p.y += p.s;
    p.x += Math.sin(p.y * p.a) * 1.5;
    if (p.y > canvas.height + 10) p.y = -10;
  });
  requestAnimationFrame(drawConfetti);
}
surpriseBtn.addEventListener('click', () => {
  alert('💖 Mom, you are my world. Happy Birthday! 💖');
  launchConfetti();
});

// Start animation loop
drawConfetti();

// 2) Music control
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let playing = false;
musicBtn.addEventListener('click', () => {
  if (!playing) {
    bgMusic.play().catch(() => {});
    musicBtn.textContent = 'Pause Music';
    playing = true;
  } else {
    bgMusic.pause();
    musicBtn.textContent = 'Play Music';
    playing = false;
  }
});

// 3) Countdown (set your mom’s birthday here)
const targetDate = new Date('2026-02-15T00:00:00'); // change to actual date
const dEl = document.getElementById('days');
const hEl = document.getElementById('hours');
const mEl = document.getElementById('minutes');
const sEl = document.getElementById('seconds');

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) {
    dEl.textContent = '00';
    hEl.textContent = '00';
    mEl.textContent = '00';
    sEl.textContent = '00';
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  dEl.textContent = String(days).padStart(2, '0');
  hEl.textContent = String(hours).padStart(2, '0');
  mEl.textContent = String(minutes).padStart(2, '0');
  sEl.textContent = String(seconds).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 4) Wishes (local storage)
const wishForm = document.getElementById('wishForm');
const wishList = document.getElementById('wishList');

function loadWishes() {
  const data = JSON.parse(localStorage.getItem('wishes') || '[]');
  wishList.innerHTML = '';
  data.forEach(w => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="name">${w.name}:</span> <span>${w.message}</span>`;
    wishList.appendChild(li);
  });
}
function saveWish(name, message) {
  const data = JSON.parse(localStorage.getItem('wishes') || '[]');
  data.push({ name, message, ts: Date.now() });
  localStorage.setItem('wishes', JSON.stringify(data));
  loadWishes();
}
wishForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !message) return;
  saveWish(name, message);
  wishForm.reset();
});
loadWishes();
