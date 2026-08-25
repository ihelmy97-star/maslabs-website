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

  // 4. Single Source of Truth: Dynamic Version Manifest & Promo Sync
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

        // 5. Dynamic Promotional Campaign Sync
        const promo = data.promo_campaign;
        const promoBanner = document.getElementById('pricingPromoBanner');
        const bannerText = document.getElementById('promoBannerText');
        const annualAnchor = document.getElementById('annualAnchorPrice');
        const lifetimeAnchor = document.getElementById('lifetimeAnchorPrice');
        const monthlyAnchor = document.getElementById('monthlyAnchorPrice');
        const annualPrice = document.getElementById('annualPrice');
        const lifetimePrice = document.getElementById('lifetimePrice');
        const monthlyPrice = document.getElementById('monthlyPrice');

        if (promo && promo.is_active) {
          if (promoBanner) promoBanner.style.display = 'flex';
          if (bannerText && promo.banner_text) bannerText.textContent = promo.banner_text;

          if (annualAnchor) {
            annualAnchor.textContent = `$${(promo.annual_anchor_usd || 49.99).toFixed(2)}`;
            annualAnchor.style.display = 'inline';
          }
          if (lifetimeAnchor) {
            lifetimeAnchor.textContent = `$${(promo.lifetime_anchor_usd || 99.99).toFixed(2)}`;
            lifetimeAnchor.style.display = 'inline';
          }
          if (monthlyAnchor) {
            monthlyAnchor.textContent = `$${(promo.monthly_anchor_usd || 5.99).toFixed(2)}`;
            monthlyAnchor.style.display = 'inline';
          }

          if (annualPrice) annualPrice.textContent = `$${(promo.annual_base_usd || 34.99).toFixed(2)}`;
          if (lifetimePrice) lifetimePrice.textContent = `$${(promo.lifetime_base_usd || 69.99).toFixed(2)}`;
          if (monthlyPrice) monthlyPrice.textContent = `$${(promo.monthly_base_usd || 3.99).toFixed(2)}`;
        } else {
          if (promoBanner) promoBanner.style.display = 'none';
          if (annualAnchor) annualAnchor.style.display = 'none';
          if (lifetimeAnchor) lifetimeAnchor.style.display = 'none';
          if (monthlyAnchor) monthlyAnchor.style.display = 'none';

          if (annualPrice) annualPrice.textContent = '$49.99';
          if (lifetimePrice) lifetimePrice.textContent = '$99.99';
          if (monthlyPrice) monthlyPrice.textContent = '$5.99';
        }
      }
    })
    .catch(() => {
      // Fallback gracefully to pre-rendered HTML on local/offline environments
    });

  // 6. Interactive FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });
        // Toggle clicked item
        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
});
