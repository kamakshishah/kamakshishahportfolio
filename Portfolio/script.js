document.addEventListener('DOMContentLoaded', () => {
  // DARK MODE TOGGLE
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  }
  if(localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');

  // SMOOTH SCROLL
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior:'smooth' });
    });
  });

  // TYPING EFFECT
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    const words = ["Full-stack Developer", "Software Engineer", "AI/ML Engineer"];
    let i = 0, j = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[i];
      typingText.textContent = currentWord.substring(0, j);

      if(isDeleting) {
        j--;
        if(j < 0) {
          isDeleting = false;
          i = (i + 1) % words.length;
          j = 0;
        }
      } else {
        j++;
        if(j > currentWord.length) {
          isDeleting = true;
          j = currentWord.length;
        }
      }

      setTimeout(type, isDeleting ? 100 : 200);
    }

    type();
  }
});

const scrollSections = document.querySelectorAll('section');

function revealSections() {
  scrollSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);
