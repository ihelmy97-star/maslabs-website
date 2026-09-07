// ==========================================================================
// 🏥 MAS Labs & MediFamily - Interactive Script
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 🧪 [TEMPORARY: CLOSED BETA TESTING PHASE] Webhook Configuration & Handlers
  // Active during Google Play 14-Day Closed Testing & Apple TestFlight Phases
  // Deployed Apps Script Webhook endpoint for tester registration & automated notifications
  // ==========================================================================
  const BETA_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzYqA2az4ajpOqDgIrWPJ_Zzd40ZNAT4oEfkXkwSbMpMJdvARCEsYjxDTKXMbSnuAOF/exec';

  const betaModal = document.getElementById('betaInviteModal');
  const betaFormView = document.getElementById('betaFormView');
  const betaSuccessView = document.getElementById('betaSuccessView');
  const betaForm = document.getElementById('betaTesterForm');
  const modalCloseBtn = document.getElementById('betaModalCloseBtn');
  const successCloseBtn = document.getElementById('betaSuccessCloseBtn');
  const modalErrorBanner = document.getElementById('modalErrorBanner');
  const betaSubmitBtn = document.getElementById('betaSubmitBtn');
  const tabAndroid = document.getElementById('tabAndroid');
  const tabIos = document.getElementById('tabIos');
  const platformInput = document.getElementById('betaPlatformInput');
  const emailInput = document.getElementById('betaEmail');
  const emailLabel = document.getElementById('betaEmailLabel');
  const emailHint = document.getElementById('betaEmailHint');
  const deviceInput = document.getElementById('betaDevice');
  const betaDeviceLabel = document.getElementById('betaDeviceLabel');
  const humanCheck = document.getElementById('betaHumanCheck');
  const betaHumanCheckText = document.getElementById('betaHumanCheckText');
  const hpField = document.getElementById('b_hp_field');
  const confirmedEmailText = document.getElementById('confirmedEmailText');
  const confirmedPlatformBadge = document.getElementById('confirmedPlatformBadge');
  const betaModalTitle = document.getElementById('betaModalTitle');
  const betaSubmitBtnText = document.getElementById('betaSubmitBtnText');
  const modalPrivacyNote = document.getElementById('modalPrivacyNote');
  const betaSuccessTitle = document.getElementById('betaSuccessTitle');
  const betaSuccessDesc = document.getElementById('betaSuccessDesc');
  const betaNextStepsList = document.getElementById('betaNextStepsList');
  const androidSuccessLinks = document.getElementById('androidSuccessLinks');
  const iosSuccessLinks = document.getElementById('iosSuccessLinks');

  let modalOpenedAt = 0;

  function openBetaModal(defaultPlatform = 'android') {
    if (!betaModal) return;
    modalOpenedAt = Date.now();
    
    // Reset view states
    if (betaFormView) betaFormView.style.display = 'block';
    if (betaSuccessView) betaSuccessView.style.display = 'none';
    if (modalErrorBanner) {
      modalErrorBanner.style.display = 'none';
      modalErrorBanner.textContent = '';
    }
    if (betaSubmitBtn) {
      betaSubmitBtn.disabled = false;
      const btnText = betaSubmitBtn.querySelector('.btn-submit-text');
      const btnSpinner = betaSubmitBtn.querySelector('.btn-submit-spinner');
      if (btnText) {
        btnText.textContent = defaultPlatform === 'ios' 
          ? '🍏 Join Apple TestFlight Waitlist' 
          : '🚀 Join Google Play Beta';
      }
      if (btnSpinner) btnSpinner.style.display = 'none';
    }

    // Set initial platform tab
    selectPlatform(defaultPlatform);

    betaModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Auto-focus email input after animation completes
    setTimeout(() => {
      if (emailInput) emailInput.focus();
    }, 280);
  }

  function closeBetaModal() {
    if (!betaModal) return;
    betaModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function selectPlatform(platform) {
    if (platform === 'ios') {
      if (tabIos) {
        tabIos.classList.add('active');
        tabIos.setAttribute('aria-selected', 'true');
      }
      if (tabAndroid) {
        tabAndroid.classList.remove('active');
        tabAndroid.setAttribute('aria-selected', 'false');
      }
      if (platformInput) platformInput.value = 'iOS (Apple TestFlight)';
      if (betaModalTitle) betaModalTitle.textContent = 'Join MediFamily Apple Waitlist';
      if (emailLabel) emailLabel.innerHTML = 'Apple ID Account Email <span class="req-star">*</span>';
      if (emailInput) emailInput.placeholder = 'your.name@icloud.com';
      if (emailHint) emailHint.textContent = 'Must be the Apple ID email address registered to your iPhone for TestFlight access.';
      if (betaDeviceLabel) betaDeviceLabel.innerHTML = 'iPhone / iPad Model & iOS Version <span class="optional-tag">(Optional)</span>';
      if (deviceInput) deviceInput.placeholder = 'e.g., iPhone 15 Pro, iPhone 14, iOS 17 / iOS 18';
      if (betaHumanCheckText) betaHumanCheckText.textContent = 'I am a human tester excited to test MediFamily on my Apple device';
      if (betaSubmitBtnText) betaSubmitBtnText.textContent = '🍏 Join Apple TestFlight Waitlist';
      if (modalPrivacyNote) modalPrivacyNote.textContent = '🔒 Your email is used exclusively for Apple TestFlight waitlist enrollment and invitation dispatch. Zero marketing spam, zero third-party sharing.';
    } else {
      if (tabAndroid) {
        tabAndroid.classList.add('active');
        tabAndroid.setAttribute('aria-selected', 'true');
      }
      if (tabIos) {
        tabIos.classList.remove('active');
        tabIos.setAttribute('aria-selected', 'false');
      }
      if (platformInput) platformInput.value = 'Android (Google Play)';
      if (betaModalTitle) betaModalTitle.textContent = 'Join MediFamily Early Access';
      if (emailLabel) emailLabel.innerHTML = 'Google Play Account Email (@gmail.com) <span class="req-star">*</span>';
      if (emailInput) emailInput.placeholder = 'your.name@gmail.com';
      if (emailHint) emailHint.textContent = 'Must be your personal Google account email (@gmail.com) registered to your Android device\'s Google Play Store.';
      if (betaDeviceLabel) betaDeviceLabel.innerHTML = 'Phone Model & Android Version <span class="optional-tag">(Optional)</span>';
      if (deviceInput) deviceInput.placeholder = 'e.g., Samsung Galaxy S23, Google Pixel 8, Android 14';
      if (betaHumanCheckText) betaHumanCheckText.textContent = 'I am a human tester excited to test MediFamily on my device';
      if (betaSubmitBtnText) betaSubmitBtnText.textContent = '🚀 Join Google Play Early Access';
      if (modalPrivacyNote) modalPrivacyNote.textContent = '🔒 Your email is used exclusively to grant early access in Google Play Console. Zero marketing spam, zero third-party sharing.';
    }
  }

  function setModalError(message) {
    if (!modalErrorBanner) return;
    modalErrorBanner.textContent = message;
    modalErrorBanner.style.display = 'block';
    modalErrorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Trigger bindings
  const betaTriggers = document.querySelectorAll('#heroBetaActionBtn, #navBetaBtn, .trigger-beta-modal');
  betaTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openBetaModal('android');
    });
  });

  const googlePlayBtn = document.getElementById('googlePlayBtn');
  if (googlePlayBtn) {
    googlePlayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openBetaModal('android');
    });
  }

  const appStoreBtn = document.getElementById('appStoreBtn');
  if (appStoreBtn) {
    appStoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openBetaModal('ios');
    });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeBetaModal);
  if (successCloseBtn) successCloseBtn.addEventListener('click', closeBetaModal);

  if (betaModal) {
    betaModal.addEventListener('click', (e) => {
      if (e.target === betaModal) closeBetaModal();
    });
  }

  // Escape key support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && betaModal && betaModal.classList.contains('active')) {
      closeBetaModal();
    }
  });

  if (tabAndroid) {
    tabAndroid.addEventListener('click', () => selectPlatform('android'));
  }
  if (tabIos) {
    tabIos.addEventListener('click', () => selectPlatform('ios'));
  }

  // Form Submission & Cyber-Defense Engine
  if (betaForm) {
    betaForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (modalErrorBanner) modalErrorBanner.style.display = 'none';

      // 1. Cyber-Defense Check: Honeypot Decoy Field
      if (hpField && hpField.value.trim() !== '') {
        console.warn('Honeypot triggered; automated submission rejected.');
        setModalError('Security verification failed. Please try again.');
        return;
      }

      // 2. Cyber-Defense Check: Interaction Speed (Bot Protection)
      const elapsedMs = Date.now() - modalOpenedAt;
      if (elapsedMs < 1500) {
        setModalError('Please take a moment to review your details before submitting.');
        return;
      }

      // 3. Cyber-Defense Check: Human Checkbox
      if (humanCheck && !humanCheck.checked) {
        setModalError('Please check the box confirming you are a human tester.');
        return;
      }

      // 4. Input Validation: Email Address
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        setModalError('Please enter a valid email address.');
        if (emailInput) emailInput.focus();
        return;
      }

      const platformVal = platformInput ? platformInput.value : 'Android (Google Play)';

      // 4b. Strict Android Google Play Validation (Must be a Google Account / @gmail.com)
      if (platformVal.includes('Android')) {
        const lowerEmail = emailVal.toLowerCase();
        const isNonGoogle = /@(yahoo\.|ymail\.|hotmail\.|outlook\.|live\.|msn\.|icloud\.|me\.|mac\.|aol\.|proton\.|protonmail\.)/i.test(lowerEmail);
        const isGmail = lowerEmail.endsWith('@gmail.com') || lowerEmail.endsWith('@googlemail.com');

        if (isNonGoogle || !isGmail) {
          setModalError('Google Play Early Access requires an active Google Account email (@gmail.com). Non-Google emails (such as Yahoo, Outlook, or iCloud) cannot access the Google Play Store early access track.');
          if (emailInput) emailInput.focus();
          return;
        }
      }

      // 5. Formula Injection Sanitization (Prepend ' if starts with =, +, -, @)
      const sanitizeInput = (str) => {
        if (!str) return '';
        const trimmed = str.trim();
        if (/^[=+\-@]/.test(trimmed)) {
          return "'" + trimmed;
        }
        return trimmed;
      };

      const cleanEmail = sanitizeInput(emailVal);
      const cleanDevice = deviceInput ? sanitizeInput(deviceInput.value) : '';

      // UI: Show Loading Spinner
      if (betaSubmitBtn) {
        betaSubmitBtn.disabled = true;
        const btnText = betaSubmitBtn.querySelector('.btn-submit-text');
        const btnSpinner = betaSubmitBtn.querySelector('.btn-submit-spinner');
        if (btnText) btnText.textContent = 'Registering Your Access...';
        if (btnSpinner) btnSpinner.style.display = 'inline-block';
      }

      // Prepare Payload
      const payload = {
        email: cleanEmail,
        platform: platformVal,
        device: cleanDevice,
        human_check: true,
        elapsed_ms: elapsedMs,
        b_hp_field: '',
        submitted_at: new Date().toISOString()
      };

      try {
        // Check if Webhook is real or placeholder
        const isLiveWebhook = BETA_WEBHOOK_URL && !BETA_WEBHOOK_URL.includes('REPLACE_WITH_YOUR_WEB_APP_ID');

        if (isLiveWebhook) {
          // Send to Google Apps Script Webhook
          await fetch(BETA_WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors', // Standard for Google Apps Script Web Apps to prevent CORS preflight blocks
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
        } else {
          // Simulated delay for local/staging preview
          await new Promise(resolve => setTimeout(resolve, 800));
        }

        // Cache application locally as an offline backup record
        try {
          const cached = JSON.parse(localStorage.getItem('medifamily_beta_applications') || '[]');
          cached.push(payload);
          localStorage.setItem('medifamily_beta_applications', JSON.stringify(cached));
        } catch (storageErr) {
          // Non-critical local storage fallback
        }

        const isIos = !platformVal.includes('Android');

        // Transition to Success Confirmation View
        if (confirmedEmailText) confirmedEmailText.textContent = cleanEmail.replace(/^'/, '');
        if (confirmedPlatformBadge) {
          confirmedPlatformBadge.textContent = isIos 
            ? 'Apple TestFlight Waitlist' 
            : 'Google Play Early Access';
        }

        if (betaSuccessTitle) {
          betaSuccessTitle.textContent = isIos ? 'Waitlist Confirmed! 🍏' : 'Application Submitted! 🚀';
        }
        if (betaSuccessDesc) {
          betaSuccessDesc.textContent = isIos
            ? "Thank you for joining MediFamily's Apple TestFlight Waitlist! We've recorded your Apple ID email:"
            : "Thank you for joining MediFamily's Founding Tester Community! We've recorded your email address:";
        }

        if (betaNextStepsList) {
          if (isIos) {
            betaNextStepsList.innerHTML = `
              <li>
                <strong>Priority Waitlist Enrollment:</strong> Your Apple ID is registered on our priority TestFlight testing roster.
              </li>
              <li>
                <strong>Official TestFlight Invitation:</strong> As soon as the iOS beta build is staged in App Store Connect, you will receive an official invitation email directly from Apple TestFlight.
              </li>
              <li>
                <strong>Lifetime Pro Reward:</strong> Actively test core features, explore everyday health routines, and submit your feedback throughout the early access phase to receive your permanent $99.99 Lifetime Pro Code upon public launch!
              </li>
            `;
          } else {
            betaNextStepsList.innerHTML = `
              <li>
                <strong>Console Access Approval:</strong> Our team will add your email to the authorized Google Play Early Access list within a couple of hours.
              </li>
              <li>
                <strong>Direct Store Opt-In Link:</strong> Check your inbox for your official Google Play invitation link with 1-tap download access.
              </li>
              <li>
                <strong>Lifetime Pro Reward:</strong> Actively test core features, explore everyday health routines, and submit your feedback throughout the early access phase to receive your permanent $99.99 Lifetime Pro Code upon public launch!
              </li>
            `;
          }
        }

        if (androidSuccessLinks) {
          androidSuccessLinks.style.display = isIos ? 'none' : 'block';
        }
        if (iosSuccessLinks) {
          iosSuccessLinks.style.display = isIos ? 'block' : 'none';
        }

        if (betaFormView) betaFormView.style.display = 'none';
        if (betaSuccessView) betaSuccessView.style.display = 'block';

        // Clear Form Inputs
        betaForm.reset();
        selectPlatform(isIos ? 'ios' : 'android');

      } catch (err) {
        console.error('Submission error:', err);
        setModalError('Connection error while sending application. Please check your internet connection and try again.');
        if (betaSubmitBtn) {
          betaSubmitBtn.disabled = false;
          const btnText = betaSubmitBtn.querySelector('.btn-submit-text');
          const btnSpinner = betaSubmitBtn.querySelector('.btn-submit-spinner');
          if (btnText) {
            btnText.textContent = platformVal.includes('Android') 
              ? '🚀 Join Google Play Beta' 
              : '🍏 Join Apple TestFlight Waitlist';
          }
          if (btnSpinner) btnSpinner.style.display = 'none';
        }
      }
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
      navLinks.classList.toggle('mobile-open');
    });

    // Automatically close mobile menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
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
