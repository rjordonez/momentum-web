document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.image-container');
    const allImages = Array.from(document.querySelectorAll('.moving-image'));
    const speed = 1; // Adjust the speed as needed
    let intervalId;

    function moveImages(images) {
        images.forEach((image) => {
            const currentLeft = parseFloat(window.getComputedStyle(image).left);
            image.style.left = `${currentLeft + speed}px`;

            // If the image moves off the right side, reposition it to the left side
            if (currentLeft > container.offsetWidth) {
                image.style.left = `-${image.offsetWidth}px`;
            }
        });
    }

    function initialize() {
        const containerWidth = container.offsetWidth;
        const visibleImages = [];
        let totalWidth = 0;

        allImages.forEach((image) => {
            image.style.position = 'absolute';
            if (totalWidth + image.offsetWidth <= containerWidth && visibleImages.length < 4) {
                image.style.left = `${totalWidth}px`; // Initial position with spacing
                visibleImages.push(image);
                totalWidth += image.offsetWidth + 20; // Include spacing
            } else {
                image.style.left = `-${image.offsetWidth}px`;
            }
        });

        // Add an additional image if it fits
        if (visibleImages.length < 4) {
            const additionalImage = allImages[visibleImages.length];
            if (additionalImage) {
                additionalImage.style.left = `${totalWidth}px`;
                visibleImages.push(additionalImage);
            }
        }

        if (visibleImages.length > 0) {
            intervalId = setInterval(() => moveImages(visibleImages), 10); // Move images every 10ms
        }
    }

    function refreshScript() {
        if (intervalId) {
            clearInterval(intervalId);
        }
        if (window.innerWidth >= 768) {
            initialize();
        } else {
            allImages.forEach((image) => {
                image.style.left = `-${image.offsetWidth}px`;
            });
        }
    }

    // Initialize script if the window width is above 768px
    if (window.innerWidth >= 768) {
        initialize();
    }

    // Reinitialize script on window resize
    window.addEventListener('resize', () => {
        refreshScript();
    });
});
