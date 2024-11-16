class GalleryManager {
    constructor(container) {
        this.container = container;
        this.images = Array.from(container.querySelectorAll('img'));
        this.targetRowHeight = 300; // Adjust this value to change row height
        this.spacing = 10; // Spacing between images
        
        this.init();
    }

    async init() {
        try {
            await this.waitForImages();
            this.initJustifiedLayout();
            this.initPhotoSwipe();
            this.handleResize();
            this.container.classList.add('ready');
        } catch (error) {
            console.error('Gallery initialization failed:', error);
        }
    }

    async waitForImages() {
        const promises = this.images.map(img => {
            return new Promise((resolve, reject) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = resolve;
                    img.onerror = reject;
                }
            });
        });

        await Promise.all(promises);
    }

    initJustifiedLayout() {
        const geometries = this.images.map(img => ({
            width: img.naturalWidth,
            height: img.naturalHeight
        }));

        const layout = window.justifiedLayout(geometries, {
            containerWidth: this.container.clientWidth,
            targetRowHeight: this.targetRowHeight,
            containerPadding: 0,
            boxSpacing: this.spacing,
            maxNumRows: 0,
            showWidows: true
        });

        this.images.forEach((img, index) => {
            const box = layout.boxes[index];
            const figure = img.closest('figure');
            
            if (figure) {
                Object.assign(figure.style, {
                    position: 'absolute',
                    left: `${box.left}px`,
                    top: `${box.top}px`,
                    width: `${box.width}px`,
                    height: `${box.height}px`,
                    transition: 'all 0.3s ease'
                });
            }
        });

        this.container.style.height = `${layout.containerHeight}px`;
    }

    initPhotoSwipe() {
        this.container.addEventListener('click', (e) => {
            e.preventDefault();
            
            const clickedFigure = e.target.closest('figure');
            if (!clickedFigure) return;

            const items = this.images.map(img => ({
                src: img.getAttribute('data-large-src') || img.src,
                w: img.naturalWidth,
                h: img.naturalHeight,
                title: img.closest('figure').querySelector('figcaption')?.textContent || ''
            }));

            const options = {
                index: this.images.findIndex(img => img.closest('figure') === clickedFigure),
                showAnimationDuration: 250,
                hideAnimationDuration: 250,
                showHideOpacity: true,
                closeOnScroll: false,
                history: false,
                closeEl: true,
                captionEl: true,
                fullscreenEl: true,
                zoomEl: true,
                shareEl: false,
                counterEl: true,
                arrowEl: true,
                preloaderEl: true
            };

            const gallery = new PhotoSwipe(
                document.querySelector('.pswp'),
                PhotoSwipeUI_Default,
                items,
                options
            );

            gallery.init();
        });
    }

    handleResize() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.initJustifiedLayout();
            }, 100);
        });
    }
}

// Initialize all galleries when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.justified-gallery').forEach(container => {
        new GalleryManager(container);
    });
});