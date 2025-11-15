document.addEventListener('DOMContentLoaded', () => {
  // ==========================
  // DARK MODE TOGGLE
  // ==========================
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem(
        'theme',
        document.body.classList.contains('dark') ? 'dark' : 'light'
      );
    });
  }
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }

  // ==========================
  // SMOOTH SCROLL FOR NAV LINKS
  // ==========================
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==========================
  // TYPING EFFECT
  // ==========================
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    const words = ["Full-stack Developer", "Software Engineer", "AI/ML Engineer"];
    let i = 0, j = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[i];
      typingText.textContent = currentWord.substring(0, j);

      if (isDeleting) {
        j--;
        if (j < 0) {
          isDeleting = false;
          i = (i + 1) % words.length;
          j = 0;
        }
      } else {
        j++;
        if (j > currentWord.length) {
          isDeleting = true;
          j = currentWord.length;
        }
      }

      setTimeout(type, isDeleting ? 100 : 200);
    }

    type();
  }

  // ==========================
  // HEADER SLIDE ON SCROLL
  // ==========================
  const header = document.querySelector('header');
  let prevScrollPos = window.pageYOffset;

  const scrollSections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;

    // ===== Header slide/shrink =====
    if (prevScrollPos > currentScrollPos) {
      // Scrolling up → full header
      header.style.top = "0";
      header.style.padding = "15px 10%"; // normal padding
    } else {
      // Scrolling down → shrink header for slide effect
      header.style.top = "0"; 
      header.style.padding = "5px 10%";  // slightly smaller padding
    }
    prevScrollPos = currentScrollPos;

    // ===== Reveal sections =====
    scrollSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        section.classList.add('visible');
      }
    });

    // ===== Highlight active nav link (scrollspy) =====
    let currentSection = "";
    scrollSections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === "#" + currentSection) {
        link.classList.add('active');
      }
    });
  });

  // ===== Ensure sections are visible on page load =====
  scrollSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });
});
