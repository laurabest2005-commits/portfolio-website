// 1. Mobile nav toggle

const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('is-open');
});

// Close mobile menu after clicking a link
document.querySelectorAll('.nav__links a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('is-open'));
});

// 2. Scroll-reveal animation

const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));

// 3. Auto-update the copyright year

document.getElementById('year').textContent = new Date().getFullYear();
const track = document.getElementById('projectsTrack');
const prevBtn = document.getElementById('prevProject');
const nextBtn = document.getElementById('nextProject');
const dotsWrap = document.getElementById('projectDots');

if (track) {
  const cards = Array.from(track.children);

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to project ${i + 1}`);
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => scrollToCard(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function scrollToCard(index) {
    cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  function currentIndex() {
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(cardCenter - trackCenter);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    return closest;
  }

  function updateActiveDot() {
    const i = currentIndex();
    dots.forEach((d, idx) => d.classList.toggle('is-active', idx === i));
  }

  prevBtn.addEventListener('click', () => scrollToCard(Math.max(currentIndex() - 1, 0)));
  nextBtn.addEventListener('click', () => scrollToCard(Math.min(currentIndex() + 1, cards.length - 1)));

  let scrollTimeout;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveDot, 100);
  });
}
