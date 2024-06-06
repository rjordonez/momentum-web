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

// JavaScript for dropdown menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const clickableLogo = document.getElementById('clickableLogo');
    
    clickableLogo.addEventListener('click', function() {
        window.location.href = 'index.html'; // Redirect to the homepage when the logo is clicked
    });
});

document.getElementById('roleSelect').addEventListener('change', function() {
    const additionalInputs = document.getElementById('additionalInputs');
    additionalInputs.innerHTML = ''; // Clear previous additional inputs

    if (this.value === 'University' || this.value === 'Brand' || this.value === 'Athlete') {
        let placeholderText = '';
        if (this.value === 'University') {
            placeholderText = 'Name of University';
        } else if (this.value === 'Brand') {
            placeholderText = 'Name of Brand';
        } else if (this.value === 'Athlete') {
            placeholderText = 'Name of Sport'; // Adding case for Athlete
        }

        // Add a new input field for the name of the University, Brand, or Sport
        additionalInputs.innerHTML = `<input type="text" placeholder="${placeholderText}" required>`;
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the form from submitting normally

        // Log that we are attempting to submit the form
        console.log("Attempting to submit form");

        const formData = new FormData(form); // Get form data

        // Call your existing function to append additional info
        appendAdditionalInfo(formData);

        // Simulate a fetch call here; replace URL with your actual fetch URL
        fetch('https://script.google.com/macros/s/AKfycbwlUoJMHrk45VZwcw1cuxIHYE_y1RCmtcszpmxCXK8cwTNUNh7W_6sSoy4P34ef4qbr3w/exec', {
            method: 'POST',
            body: formData
        })
        clearFields();
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return response.text(); // Assuming the server responds with text

        
    });
});

function appendAdditionalInfo(formData) {
    const roleSelectValue = document.getElementById('roleSelect').value;
    let placeholderText; // Declare placeholderText outside the if to potentially use later

    if (roleSelectValue === 'University' || roleSelectValue === 'Brand' || roleSelectValue === 'Athlete') {
        if (roleSelectValue === 'University') {
            placeholderText = 'Name of University';
        } else if (roleSelectValue === 'Brand') {
            placeholderText = 'Name of Brand';
        } else if (roleSelectValue === 'Athlete') {
            placeholderText = 'Name of Sport'; // Assuming 'Athlete' should have 'Name of Sport' as placeholder
        }

        const additionalInput = document.getElementById('additionalInputs').querySelector('input');
        additionalInput.placeholder = placeholderText; // Set the placeholder text for the input
        const additionalInputValue = additionalInput.value;
        // Append additional info to the form data
        formData.append('addInfo', additionalInputValue);
    }
}


function clearFields() {
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('roleSelect').selectedIndex = 0;
    document.getElementById('additionalInputs').innerHTML = ''; // Clear additional input box
    document.getElementById('adInfo').value = '';
    console.log("Fields cleared manually via button.");
}

