// Banner slider logic
const bannerImages = [
    'images/7.jpg',
    'images/5.jpg',
    'images/9.jpg',
    'images/8.jpg'
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