// ==========================================================================
// 🏥 MAS Labs & MediFamily - Interactive Script
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. "Coming Soon" Store Modal Handlers
  const modal = document.getElementById('comingSoonModal');
  const storeButtons = document.querySelectorAll('.store-btn, .trigger-coming-soon');
  const closeBtn = document.querySelector('.modal-close');
  const modalDismiss = document.getElementById('modalDismissBtn');

  function openModal(e) {
    if (e) e.preventDefault();
    if (modal) modal.classList.add('active');
  }

  function closeModal() {
    if (modal) modal.classList.remove('active');
  }

  storeButtons.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalDismiss) modalDismiss.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // 2. 1-Tap Copy Email to Clipboard with Toast Notification
  const copyPills = document.querySelectorAll('.copy-email');
  const toast = document.getElementById('toast');

  copyPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const email = pill.getAttribute('data-email');
      if (email) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard! 📋`);
        }).catch(() => {
          showToast(`Contact: ${email}`);
        });
      }
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // 3. Mobile Navigation Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
        navLinks.style.padding = '20px';
        navLinks.style.backdropFilter = 'blur(16px)';
        navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      }
    });
  }

  // 4. Single Source of Truth: Dynamic Version Manifest Sync
  fetch('api/version.json')
    .then(res => res.json())
    .then(data => {
      if (data && data.latest_version) {
        const fullVersionBuild = `v${data.latest_version} (Build ${data.latest_build || 1})`;
        
        // Update Hero Badge
        const heroBadge = document.getElementById('heroVersionBadge');
        if (heroBadge) heroBadge.textContent = fullVersionBuild;

        // Update Modal Alert
        const modalAlert = document.getElementById('modalReleaseInfo');
        if (modalAlert) {
          modalAlert.innerHTML = `📅 <strong>Official Release:</strong> Summer 2026 (${fullVersionBuild})<br>🔒 <strong>Status:</strong> Zero-Knowledge Security Audit Complete`;
        }

        // Update Footer
        const footerText = document.getElementById('footerVersionText');
        if (footerText) footerText.textContent = `Version ${fullVersionBuild}`;
      }
    })
    .catch(() => {
      // Fallback gracefully to pre-rendered HTML on local/offline environments
    });
});
