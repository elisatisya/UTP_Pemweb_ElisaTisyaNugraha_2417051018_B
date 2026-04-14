document.addEventListener('DOMContentLoaded', () => {

  /*1. TYPEWRITER*/
  const twEl = document.getElementById('typewriterEl');

  if (twEl) {
    const phrases = [
      'Mahasiswi Ilmu Komputer Universitas Lampung',
      'UI/UX Designer',
      'Web Developer',
      'Python Programmer'
    ];

    let pi = 0;
    let ci = 0;
    let deleting = false;

    function typewriter() {
      const current = phrases[pi];

      if (!deleting) {
        twEl.textContent = current.slice(0, ++ci);

        if (ci === current.length) {
          deleting = true;
          setTimeout(typewriter, 2000);
          return;
        }

      } else {
        twEl.textContent = current.slice(0, --ci);

        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
        }
      }

      setTimeout(typewriter, deleting ? 60 : 110);
    }

    typewriter();
  }

  /*2. DARK MODE*/
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  const themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {
    themeToggle.textContent =
      savedTheme === 'dark' ? 'Mode Terang' : 'Mode Gelap';

    themeToggle.addEventListener('click', () => {
      const next =
        html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);

      themeToggle.textContent =
        next === 'dark' ? 'Mode Terang' : 'Mode Gelap';
    });
  }

  /*3. HAMBURGER MENU\*/
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
      }
    });
  }

  /*4. PROJECT FILTER*/
  const filterBar = document.getElementById('filterBar');

  if (filterBar) {
    filterBar.addEventListener('click', e => {
      if (!e.target.classList.contains('filter-btn')) return;

      document.querySelectorAll('.filter-btn')
        .forEach(btn => btn.classList.remove('active'));

      e.target.classList.add('active');

      const filter = e.target.dataset.filter;

      document.querySelectorAll('.project-card')
        .forEach(card => {
          card.style.display =
            (filter === 'all' || card.dataset.cat === filter)
              ? 'flex'
              : 'none';
        });
    });
  }

  /*5. SKILL BAR ANIMATION*/
  const sbc = document.getElementById('skillBarsContainer');

  if (sbc) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          entry.target
            .querySelectorAll('.skill-bar-fill')
            .forEach(bar => {
              bar.style.width = bar.dataset.pct + '%';
            });

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(sbc);
  }

});