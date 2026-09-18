// Apex Studio - Interactive Client JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Initialize theme from storage or system preference
  const savedTheme = localStorage.getItem('apex_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = htmlElement.classList.toggle('dark');
      localStorage.setItem('apex_theme', isDark ? 'dark' : 'light');
      
      // Update icons
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.remove('hidden');
        menuIcon?.classList.add('hidden');
        closeIcon?.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        menuIcon?.classList.remove('hidden');
        closeIcon?.classList.add('hidden');
      }
    };

    mobileMenuBtn.addEventListener('click', () => toggleMenu());

    // Close mobile menu when clicking any navigation link
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close mobile menu on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        toggleMenu(false);
      }
    });
  }

  // 3. Navigation Scrollspy (Active Section Highlighting for Home, Resume, Projects, Contact)
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('header nav a.nav-link');

  const updateActiveNavLink = () => {
    let currentSection = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    if (!currentSection && sections.length > 0) {
      currentSection = sections[0].getAttribute('id');
    }

    desktopNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        link.classList.add('text-brand-600', 'dark:text-brand-400', 'border-brand-600', 'dark:border-brand-400', 'font-semibold');
        link.classList.remove('text-slate-600', 'dark:text-slate-300', 'border-transparent');
      } else {
        link.classList.remove('text-brand-600', 'dark:text-brand-400', 'border-brand-600', 'dark:border-brand-400', 'font-semibold');
        link.classList.add('text-slate-600', 'dark:text-slate-300', 'border-transparent');
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink(); // Trigger once on load

  // 4. Download Resume Action
  const downloadResumeBtn = document.getElementById('download-resume-btn');
  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', () => {
      showToast('Opening print dialog for PDF export...', 'success');
      setTimeout(() => {
        window.print();
      }, 500);
    });
  }

  // 5. Portfolio Category Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterButtons.forEach((b) => {
        b.classList.remove('active', 'bg-white', 'dark:bg-slate-800', 'text-brand-600', 'dark:text-brand-400', 'shadow-sm');
        b.classList.add('text-slate-600', 'dark:text-slate-400');
      });
      btn.classList.add('active', 'bg-white', 'dark:bg-slate-800', 'text-brand-600', 'dark:text-brand-400', 'shadow-sm');
      btn.classList.remove('text-slate-600', 'dark:text-slate-400');

      const selectedCategory = btn.getAttribute('data-filter');

      // Filter project cards with smooth animation
      projectItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');
        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          item.classList.remove('hidden-item');
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.classList.add('hidden-item');
        }
      });
    });
  });

  // 6. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 7. Toast Notification System
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const isSuccess = type === 'success';

    toast.className = `pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-medium toast-in transition-all ${
      isSuccess
        ? 'bg-white dark:bg-slate-900 border-emerald-500/30 text-slate-900 dark:text-white'
        : 'bg-white dark:bg-slate-900 border-red-500/30 text-slate-900 dark:text-white'
    }`;

    toast.innerHTML = `
      <div class="p-1 rounded-full ${isSuccess ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}">
        <i data-lucide="${isSuccess ? 'check-circle' : 'alert-circle'}" class="w-5 h-5"></i>
      </div>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) {
      window.lucide.createIcons();
    }

    setTimeout(() => {
      toast.classList.remove('toast-in');
      toast.classList.add('toast-out');
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  // 8. Interactive Contact Form Submission Handling
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!name || !email) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      // Show loading feedback
      if (submitBtn && btnText) {
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
      }

      setTimeout(() => {
        // Reset button
        if (submitBtn && btnText) {
          submitBtn.disabled = false;
          btnText.textContent = 'Send Message';
        }

        // Show success toast
        showToast(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`, 'success');
        contactForm.reset();
      }, 750);
    });
  }
});
