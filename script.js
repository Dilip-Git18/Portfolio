// Smooth Scroll Effect for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle the nav menu when hamburger is clicked
document.getElementById('hamburger').addEventListener('click', function() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});

document.addEventListener('scroll', function() {
    const video = document.getElementById('home-video');
    if (window.scrollY > 200) {
        video.pause();
    } else {
        video.play();
    }
});
// Existing script code (e.g., hamburger menu) remains unchanged

// Certifications Slider
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('certifications-slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('slider-dots');
    const cards = document.querySelectorAll('.certificate-card');
    let currentIndex = 0;
    const totalCards = cards.length;
    const gap = 20; // Match the gap value from CSS
    let autoSlide;

    // Create dots
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.dot');

    // Update slider position
    function updateSlider() {
        const offset = currentIndex * (100 + (gap / slider.parentElement.offsetWidth) * 100);
        slider.style.transform = `translateX(-${offset}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
    }

    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateSlider();
    }

    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateSlider();
    }

    // Auto slide every 5 seconds
    function startAutoSlide() {
        autoSlide = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', startAutoSlide);

    // Start the slider
    startAutoSlide();

    // Adjust on resize
    window.addEventListener('resize', updateSlider);
});