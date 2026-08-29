// Hikka Surf School Core Interactive JavaScript Engine

document.addEventListener('DOMContentLoaded', () => {
  const siteData = getActiveSiteData();
  const settings = siteData.settings;
  const cleanWhatsApp = settings.whatsappNumber.replace(/[^0-9]/g, '');

  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 2. Sticky Navbar Glass Effect on Scroll
  const mainNavbar = document.getElementById('main-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainNavbar?.classList.add('bg-ocean-950/95', 'shadow-xl', 'backdrop-blur-md', 'border-b', 'border-ocean-800');
      mainNavbar?.classList.remove('bg-transparent', 'top-8');
      mainNavbar?.classList.add('top-0');
    } else {
      mainNavbar?.classList.remove('bg-ocean-950/95', 'shadow-xl', 'backdrop-blur-md', 'border-b', 'border-ocean-800', 'top-0');
      mainNavbar?.classList.add('bg-transparent', 'top-8');
    }
  });

  // 3. WhatsApp Booking Modal System
  const bookingModal = document.getElementById('booking-modal');
  const modalActivitySelect = document.getElementById('modal-activity-select');
  const modalDateInput = document.getElementById('modal-date-input');
  const modalGuestsSelect = document.getElementById('modal-guests-select');
  const modalTimeSelect = document.getElementById('modal-time-select');
  const modalNameInput = document.getElementById('modal-name-input');
  const modalNotesInput = document.getElementById('modal-notes-input');
  const bookingForm = document.getElementById('booking-form');

  // Set default date to tomorrow
  if (modalDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    modalDateInput.value = tomorrow.toISOString().split('T')[0];
    modalDateInput.min = new Date().toISOString().split('T')[0];
  }

  // Open Modal function
  window.openBookingModal = function(activityTitle = 'Beginner Surf Lesson') {
    if (!bookingModal) return;
    if (modalActivitySelect && activityTitle) {
      modalActivitySelect.value = activityTitle;
    }
    bookingModal.classList.remove('hidden');
    bookingModal.classList.add('flex');
  };

  // Close Modal function
  window.closeBookingModal = function() {
    if (!bookingModal) return;
    bookingModal.classList.add('hidden');
    bookingModal.classList.remove('flex');
  };

  // Close modal when clicking outside
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        window.closeBookingModal();
      }
    });
  }

  // Direct WhatsApp helper
  window.openDirectWhatsApp = function(customMsg = '') {
    const msg = customMsg || `Hi Hikka Surf School! I'd like to ask about surf lessons and ocean activities in Hikkaduwa.`;
    window.open(`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Submit Booking Form -> Opens WhatsApp with perfectly formatted message
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const activity = modalActivitySelect?.value || 'Surf Lesson';
      const date = modalDateInput?.value || '';
      const guests = modalGuestsSelect?.value || '2';
      const time = modalTimeSelect?.value || '08:30 AM';
      const name = modalNameInput?.value || '';
      const notes = modalNotesInput?.value || '';

      const formattedMessage = `Hi Hikka Surf School! I'd like to book:
Activity: ${activity}
Date: ${date}
Number of people: ${guests}
Preferred time: ${time}${name ? `\nName: ${name}` : ''}${notes ? `\nNotes: ${notes}` : ''}`;

      const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(formattedMessage)}`;
      window.open(whatsappUrl, '_blank');
      window.closeBookingModal();
    });
  }

  // 4. FAQ Accordion Toggle
  document.querySelectorAll('.faq-btn').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector('.faq-icon');
      
      const isExpanded = !content.classList.contains('hidden');
      
      // Close all other faqs in this list
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

      if (!isExpanded) {
        content.classList.remove('hidden');
        icon?.classList.add('rotate-180');
      }
    });
  });

  // 5. Gallery Lightbox & Filter
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');

  window.openLightbox = function(imgUrl, title, caption) {
    if (!lightboxModal) return;
    if (lightboxImg) lightboxImg.src = imgUrl;
    if (lightboxTitle) lightboxTitle.textContent = title || '';
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightboxModal.classList.remove('hidden');
    lightboxModal.classList.add('flex');
  };

  window.closeLightbox = function() {
    if (!lightboxModal) return;
    lightboxModal.classList.add('hidden');
    lightboxModal.classList.remove('flex');
  };

  // Gallery category filter pills
  document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      
      document.querySelectorAll('.gallery-filter-btn').forEach(b => {
        b.classList.remove('bg-surf-600', 'text-white');
        b.classList.add('bg-gray-100', 'text-gray-700');
      });
      btn.classList.add('bg-surf-600', 'text-white');
      btn.classList.remove('bg-gray-100', 'text-gray-700');

      document.querySelectorAll('.gallery-item').forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'All' || itemCat === category) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
});
