document.addEventListener('DOMContentLoaded', function() {

  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isVisible = mainNav.getAttribute('data-visible') === 'true';
      if (isVisible) {
        mainNav.setAttribute('data-visible', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        mainNav.setAttribute('data-visible', 'true');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });
  }


  // Dark Mode / Theme Switcher
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      themeToggle.checked = true;
    }
  } else {
    // OSの設定を優先
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.checked = true;
    }
  }

  themeToggle.addEventListener('change', function() {
    if (this.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });


  // Add simple scroll animations to elements
  const animatedElements = document.querySelectorAll('.feature-item, .cta-section h2, .cta-section p, .cta-section .btn');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `fadeInUp 0.8s ${entry.target.dataset.delay || '0s'} forwards ease-out`;
      }
    });
  }, {
    threshold: 0.1
  });

  animatedElements.forEach((el, index) => {
    el.style.opacity = '0'; // 初期状態は非表示
    el.dataset.delay = `${index * 0.1}s`;
    observer.observe(el);
  });

});

// CSSにアニメーションを追加する
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);