class HeroCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.hero-slide');
        this.interval = null;
        this.duration = 5000; // 5 seconds per slide

        if (this.slides.length > 0) {
            this.init();
        }
    }

    init() {
        // Show first slide
        this.showSlide(0);
        
        // Start autoplay
        this.startAutoplay();

        // Add pause on hover
        const hero = document.querySelector('.hero-carousel');
        if (hero) {
            hero.addEventListener('mouseenter', () => this.stopAutoplay());
            hero.addEventListener('mouseleave', () => this.startAutoplay());
        }
    }

    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('opacity-100');
            slide.classList.add('opacity-0');
        });

        // Show current slide
        this.slides[index].classList.remove('opacity-0');
        this.slides[index].classList.add('opacity-100');
        
        this.currentSlide = index;
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    }

    startAutoplay() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => this.nextSlide(), this.duration);
    }

    stopAutoplay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroCarousel();
});