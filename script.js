    // Mobile Sidebar Functions
    function toggleSidenav() {
      const sidenav = document.getElementById('mySidenav');
      sidenav.style.width = sidenav.style.width === '250px' ? '0' : '250px';
    }
    function closeNav() {
      document.getElementById('mySidenav').style.width = '0';
    }

    // Carousel Functionality
    let carouselIndex = 0;
  const carousel = document.getElementById('carousel');
  const slides = carousel.children;

  function showSlide(index) {
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextSlide() {
    carouselIndex = (carouselIndex + 1) % slides.length;
    showSlide(carouselIndex);
  }

  function prevSlide() {
    carouselIndex = (carouselIndex - 1 + slides.length) % slides.length;
    showSlide(carouselIndex);
  }

  // Initialize
  showSlide(carouselIndex);
    
    // Lightbox (Overlay) Functionality for Gallery
    const galleryImages = document.querySelectorAll('.gallery img');
    const overlay = document.getElementById('overlay');
    const overlayImg = document.getElementById('overlayImg');
    const closeOverlay = document.getElementById('closeOverlay');
    
    galleryImages.forEach(img => {
      img.addEventListener('click', function() {
        overlayImg.src = this.src;
        overlay.style.display = 'flex';
      });
    });
    
    closeOverlay.addEventListener('click', function() {
      overlay.style.display = 'none';
    });
    
    // Also close the overlay if the user clicks outside the image
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.style.display = 'none';
      }
    });

    // Hide preloader after page load
    window.addEventListener('load', function () {
      document.getElementById('preloader').classList.add('hidden');
    });
// Contact form submission handling
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const preloader = document.getElementById('preloader');
  const alertMessage = document.getElementById('alertMessage');
  const alertText = document.getElementById('alertText');
  const form = this;

  

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
  })
  .then(response => response.json())
  .then(data => {
    preloader.style.display = 'none';

    // Remove previous alert classes
    alertMessage.classList.remove('success', 'error');

    if (data.success) {
      alertMessage.classList.add('success');
      alertText.textContent = "Your message has been sent successfully!";
      form.reset();
    } else {
      alertMessage.classList.add('error');
      alertText.textContent = "Oops! Something went wrong. Please try again.";
    }

    alertMessage.style.display = 'block';
  })
  .catch(error => {
    preloader.style.display = 'none';

    alertMessage.classList.remove('success');
    alertMessage.classList.add('error');
    alertText.textContent = "There was an error sending your message. Please try again.";
    alertMessage.style.display = 'block';
    console.error('Form submission error:', error);
  });
});

// Dismiss alert functionality
document.getElementById('dismissBtn').addEventListener('click', function () {
  document.getElementById('alertMessage').style.display = 'none';
});




  //map initializing 
 document.addEventListener("DOMContentLoaded", function () {
  var map = L.map('map').setView([-1.2833, 36.8167], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  var routeCoordinates = [
    [-1.2823, 36.8569], // Umoja
    [-1.2841, 36.8377], // Donholm
    [-1.2888, 36.8295], // Jogoo Road
    [-1.2901, 36.8264], // Landhies Road
    [-1.2833, 36.8167]  // Nairobi CBD
  ];

  var routeLine = L.polyline(routeCoordinates, { color: 'red', weight: 5 }).addTo(map);

  var markers = [
    { coords: [-1.2823, 36.8569], name: "Umoja" },
    { coords: [-1.2841, 36.8377], name: "Donholm" },
    { coords: [-1.2888, 36.8295], name: "Jogoo Road" },
    { coords: [-1.2901, 36.8264], name: "Landhies Road" },
    { coords: [-1.2833, 36.8167], name: "Nairobi CBD" }
  ];

  markers.forEach(marker => {
    L.marker(marker.coords).addTo(map).bindPopup(marker.name);
  });

  map.fitBounds(routeLine.getBounds());
});
