// Ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggler
    var navToggler = document.querySelector('.nav-toggler');
    var aside = document.querySelector('.aside');
    var mainContent = document.querySelector('.main-content');

    if (navToggler && aside && mainContent) {
        navToggler.addEventListener('click', function() {
            // Toggle 'active' class with fallback for older browsers
            if (aside.classList && aside.classList.toggle) {
                aside.classList.toggle('active');
                mainContent.classList.toggle('active');
            } else {
                var hasActive = aside.className.indexOf('active') !== -1;
                if (hasActive) {
                    aside.className = aside.className.replace(' active', '');
                    mainContent.className = mainContent.className.replace(' active', '');
                } else {
                    aside.className += ' active';
                    mainContent.className += ' active';
                }
            }
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (aside.classList && aside.classList.contains('active') &&
                !aside.contains(e.target) && !navToggler.contains(e.target)) {
                aside.classList.remove('active');
                mainContent.classList.remove('active');
            } else if (aside.className.indexOf('active') !== -1 &&
                       !aside.contains(e.target) && !navToggler.contains(e.target)) {
                aside.className = aside.className.replace(' active', '');
                mainContent.className = mainContent.className.replace(' active', '');
            }
        });

        // Prevent body scroll when sidebar is open
        aside.addEventListener('transitionend', function() {
            if (aside.classList && aside.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
            // Fallback for browsers without classList
            if (!aside.classList) {
                var hasActive = aside.className.indexOf('active') !== -1;
                document.body.style.overflow = hasActive ? 'hidden' : 'auto';
            }
        });
    }

    // Typing Animation
    var typingElement = document.querySelector('.typing');
    if (typingElement) {
        var words = ['Developer', 'Designer', 'Freelancer', 'Creator']; // Customize your words
        var wordIndex = 0;
        var charIndex = 0;
        var currentWord = '';
        var isDeleting = false;
        var typingSpeed = 150; // Speed in milliseconds

        function type() {
            currentWord = words[wordIndex];

            if (isDeleting) {
                // Delete characters
                charIndex--;
                typingElement.textContent = currentWord.substring(0, charIndex);
                typingSpeed = 100; // Faster deletion
            } else {
                // Type characters
                charIndex++;
                typingElement.textContent = currentWord.substring(0, charIndex);
                typingSpeed = 150; // Normal typing speed
            }

            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at the end of the word
                typingSpeed = 2000; // Wait 2 seconds
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; // Loop back to first word
                typingSpeed = 500; // Brief pause before typing next word
            }

            // Use setTimeout with a self-invoking function for older browsers
            setTimeout(type, typingSpeed);
        }

        // Start typing animation
        type();
    }
});