// ===============================
// Theme Toggle Logic
// ===============================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateToggleIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateToggleIcon(newTheme);
});

function updateToggleIcon(theme) {
  themeToggle.innerHTML = theme === 'light' 
    ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
}



// ===============================
// TAB SWITCHING
// ===============================
function switchTab(tab) {
  const pillBg = document.getElementById('pillBg');

  const btnPrivacy = document.getElementById('btnPrivacy');
  const btnTerms = document.getElementById('btnTerms');

  const panelPrivacy = document.getElementById('panel-privacy');
  const panelTerms = document.getElementById('panel-terms');

  // remove active states
  btnPrivacy.classList.remove('active');
  btnTerms.classList.remove('active');

  panelPrivacy.classList.remove('active');
  panelTerms.classList.remove('active');

  // activate selected
  if (tab === 'privacy') {
    btnPrivacy.classList.add('active');
    panelPrivacy.classList.add('active');

    pillBg.style.transform = 'translateX(0)';
  } else {
    btnTerms.classList.add('active');
    panelTerms.classList.add('active');

    pillBg.style.transform = 'translateX(100%)';
  }

  // animate sections of active panel
  animateVisibleSections();
}


// ===============================
// SECTION REVEAL
// ===============================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.05
});

function animateVisibleSections() {

  const activePanel = document.querySelector('.panel.active');
  const sections = activePanel.querySelectorAll('.legal-section');

  sections.forEach((el, i) => {

    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';

    // MUCH FASTER stagger
    el.style.transition =
      `opacity 0.45s ease ${i * 0.03}s,
       transform 0.45s ease ${i * 0.03}s`;

    observer.observe(el);
  });
}

// initialize
animateVisibleSections();


// ===============================
// BACKGROUND PARTICLES
// ===============================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 50;

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.size = Math.random() * 2 + 1;

    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;

    this.opacity = Math.random() * 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    else if (this.x < 0) this.x = canvas.width;

    if (this.y > canvas.height) this.y = 0;
    else if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim();

    ctx.fillStyle = color;
    ctx.globalAlpha = this.opacity;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

window.addEventListener('resize', init);

init();
animate();

// ===============================
// Back To Top Button
// ===============================

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {

  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }

});

backToTop.addEventListener('click', () => {

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

});