document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.image-container');
    const images = document.querySelectorAll('.moving-image');
    const speed = 1; // Adjust the speed as needed
    let intervalId;

    function moveImages() {
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
        images.forEach((image, index) => {
            image.style.position = 'absolute';
            image.style.left = `${index * (image.offsetWidth + 20)}px`; // Initial position with spacing
        });

        intervalId = setInterval(moveImages, 10); // Move images every 10ms
    }

    function refreshScript() {
        if (intervalId) {
            clearInterval(intervalId);
        }
        if (window.innerWidth >= 768) {
            initialize();
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
