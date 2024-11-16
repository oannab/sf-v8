document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header-wrapper');
    const menuButton = document.querySelector('.nav-wrapper > img:last-child');
    const nav = document.querySelector('.nav-wrapper > ul');
    const dropdownItems = document.querySelectorAll('.nav-wrapper > ul > li');

    // Handle scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Handle dropdown toggles on mobile
    dropdownItems.forEach(item => {
        if (item.querySelector('ul')) {
            item.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
            nav.classList.remove('active');
            dropdownItems.forEach(item => item.classList.remove('active'));
        }
    });
});