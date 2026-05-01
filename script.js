// Banner slider logic
const bannerImages = [
    'ds34.jpg.jpeg',
    'ds10.jpg.jpeg',
    'ds4.jpg.jpeg',
    'ds30.jpg.jpeg',
];

let currentBanner = 0;
let bannerInterval = null;

// Create image elements dynamically
function showBannerImage(index) {
    let container = document.querySelector('.banner-container');
    let oldImg = container.querySelector('img');
    if (oldImg) oldImg.remove();

    let img = document.createElement('img');
    img.src = bannerImages[index];
    img.alt = "Charity Project Banner";
    img.style.opacity = 0;
    container.insertBefore(img, container.firstChild);

    setTimeout(() => { img.style.opacity = 1; }, 50);
}

// Slide automatically every 3 seconds
function startBannerAutoSlide() {
    if (bannerInterval) clearInterval(bannerInterval);
    bannerInterval = setInterval(() => {
        currentBanner = (currentBanner + 1) % bannerImages.length;
        showBannerImage(currentBanner);
    }, 3000);
}

// Initial banner
document.addEventListener('DOMContentLoaded', function() {
    showBannerImage(currentBanner);
    startBannerAutoSlide();

    document.getElementById('bannerPrev').onclick = function() {
        currentBanner = (currentBanner - 1 + bannerImages.length) % bannerImages.length;
        showBannerImage(currentBanner);
        startBannerAutoSlide();
    };
    document.getElementById('bannerNext').onclick = function() {
        currentBanner = (currentBanner + 1) % bannerImages.length;
        showBannerImage(currentBanner);
        startBannerAutoSlide();
    };

    const readMoreLink = document.getElementById('about-read-more');
    if (readMoreLink) {
        readMoreLsink.addEventListener('click', function(event) {
            event.preventDefault();
            const more = document.getElementById('about-more');
            if (more) {
                if (more.style.display === 'none' || more.style.display === '') {
                    more.style.display = 'block';
                    readMoreLink.textContent = 'Read less';
                } else {
                    more.style.display = 'none';
                    readMoreLink.textContent = 'Read more';
                }
            }
        });
    }
});

// Show More / Show Less Functionality on the causes section for mobile devices
  document.addEventListener('DOMContentLoaded', function() {
    const causesCards = document.querySelector('.causes-cards');
    const isMobile = window.innerWidth <= 640;

    if (isMobile) {
      // Create wrapper and button
      const wrapper = document.createElement('div');
      wrapper.className = 'show-btn-wrapper';
      
      const showMoreBtn = document.createElement('button');
      showMoreBtn.className = 'show-more-btn';
      showMoreBtn.textContent = '+ Show More Causes';
      showMoreBtn.setAttribute('aria-expanded', 'false');
      showMoreBtn.setAttribute('type', 'button');
      
      wrapper.appendChild(showMoreBtn);
      causesCards.appendChild(wrapper);

      let isExpanded = false;

      showMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        isExpanded = !isExpanded;
        
        if (isExpanded) {
          causesCards.classList.add('show-all');
          showMoreBtn.textContent = '- Show Less Causes';
          showMoreBtn.setAttribute('aria-expanded', 'true');
          showMoreBtn.style.background = 'linear-gradient(135deg, #c62828 0%, #a01e1e 100%)';
        } else {
          causesCards.classList.remove('show-all');
          showMoreBtn.textContent = '+ Show More Causes';
          showMoreBtn.setAttribute('aria-expanded', 'false');
          showMoreBtn.style.background = 'linear-gradient(135deg, #0f7b3f 0%, #0d5f32 100%)';
          
          // Smooth scroll to the top of the section
          setTimeout(() => {
            document.getElementById('causes').scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 200);
        }
      });
    }
  });

//modal code
function showPaymentDetails(method) {
  const details = {
    airtel: `<div class="alert alert-success mb-0"><strong>Airtel Money:</strong> Send to <b>+256703204351</b></div>`,
    mtn: `<div class="alert alert-warning mb-0"><strong>MTN Mobile Money:</strong> Send to <b>+256784512521</b></div>`,
    bank: `<div class="alert alert-primary mb-0"><strong>Bank Transfer:</strong> Account No. <b>4325637345</b></div>`
  };
  document.getElementById('paymentDetails').style.display = 'block';
  document.getElementById('paymentDetails').innerHTML = details[method];

}
