// ==========================================================================
// MAS Labs & AutoFamily - Pre-Launch Compliance Page Script
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Hydrate pre-launch build badge from the isolated AutoFamily manifest only
  const versionBadge = document.getElementById('afVersionBadge');
  if (versionBadge) {
    fetch('/api/autofamily/version.json?t=' + Date.now(), {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data || !data.ios) return;
        const version = data.ios.latest_version || '1.0.0';
        const build = Math.max(Number(data.ios.latest_build) || 1, 1);
        versionBadge.textContent = `Pre-Launch v${version} (Build ${build})`;
      })
      .catch(() => {});
  }
});
