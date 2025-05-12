// script.js

// 1. Smooth scrolling for nav links
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// 2. Section reveal on scroll
const revealSections = document.querySelectorAll('section');
const observerOptions = { threshold: 0.15 };
const revealOnScroll = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
};
const sectionObserver = new IntersectionObserver(revealOnScroll, observerOptions);
revealSections.forEach(sec => {
  sec.classList.add('hidden');
  sectionObserver.observe(sec);
});

// 3. Back-to-top button
const topBtn = document.createElement('button');
topBtn.textContent = '⬆️';
topBtn.id = 'backToTop';
topBtn.title = 'Haut de page';
document.body.appendChild(topBtn);
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) topBtn.classList.add('show');
  else topBtn.classList.remove('show');
});

// 4. Dark mode toggle
const toggle = document.createElement('button');
toggle.id = 'themeToggle';
toggle.textContent = '🌙';
toggle.title = 'Changer de thème';
document.body.appendChild(toggle);
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  toggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

// 5. Confetti on contact click
const contactLink = document.querySelector('#contact a[href^="mailto"]');
contactLink.addEventListener('click', () => {
  // simple confetti effect using emojis
  for (let i = 0; i < 30; i++) {
    const conf = document.createElement('div');
    conf.textContent = '🎉';
    conf.className = 'confetti';
    document.body.appendChild(conf);
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * -100;
    conf.style.left = x + 'px';
    conf.style.top = y + 'px';
    conf.style.opacity = Math.random();
    conf.animate([
      { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random()*360}deg)` }
    ], { duration: 3000 + Math.random() * 2000 });
    setTimeout(() => conf.remove(), 5000);
  }
});
