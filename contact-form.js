document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contactForm');
    var feedback = document.getElementById('formFeedback');
    var inputs = form ? form.querySelectorAll('.form-control') : [];

    // Convert NodeList to Array for better compatibility with older browsers
    inputs = Array.prototype.slice.call(inputs);

    // Real-time validation and error display
    inputs.forEach(function(input) {
        var errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        setStyle(errorSpan, {
            'color': '#ff4d6d',
            'fontSize': '14px',
            'display': 'block',
            'marginTop': '5px'
        });
        if (input.parentNode) {
            input.parentNode.appendChild(errorSpan);
        }

        input.addEventListener('input', function() {
            validateField(input, errorSpan);
        });
    });

    if (form) {
        form.addEventListener('submit', function(e) {
            e = e || window.event; // Fallback for older browsers
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false; // IE fallback
            }

            // Reset feedback
            if (feedback) {
                setStyle(feedback, { 'display': 'none' });
                feedback.textContent = '';
            }
            inputs.forEach(function(input) {
                var errorSpan = input.nextElementSibling || input.nextSibling; // Fallback for older browsers
                if (errorSpan) {
                    setStyle(errorSpan, { 'display': 'none' });
                }
            });

            // Check honeypot
            var honeypotField = form.querySelector('input[name="honeypot"]');
            var honeypot = honeypotField ? honeypotField.value : '';
            if (honeypot && feedback) {
                feedback.textContent = 'Bot detection triggered. Please try again.';
                feedback.className = 'form-feedback error';
                setStyle(feedback, { 'display': 'block' });
                return;
            }

            // Validate all fields
            var isValid = true;
            inputs.forEach(function(input) {
                var errorSpan = input.nextElementSibling || input.nextSibling;
                if (!validateField(input, errorSpan)) {
                    isValid = false;
                }
            });

            if (isValid && feedback) {
                // Simulate form submission
                feedback.textContent = 'Thank you! Your message has been sent successfully.';
                feedback.className = 'form-feedback success';
                setStyle(feedback, { 'display': 'block' });

                // Reset form
                if (form.reset) {
                    form.reset();
                }

                // Auto-hide success message after 5 seconds
                setTimeout(function() {
                    if (feedback) {
                        setStyle(feedback, { 'display': 'none' });
                    }
                }, 5000);
            } else if (feedback) {
                feedback.textContent = 'Please correct the errors in the form.';
                feedback.className = 'form-feedback error';
                setStyle(feedback, { 'display': 'block' });
            }
        });
    }

    function validateField(input, errorSpan) {
        var isValid = true;
        switch (input.name) {
            case 'name':
                var namePattern = /^[A-Za-z\s]{2,30}$/;
                if (!namePattern.test(input.value.trim())) {
                    errorSpan.textContent = 'Name must be 2-30 letters only.';
                    setStyle(errorSpan, { 'display': 'block' });
                    setStyle(input, { 'borderColor': '#ff4d6d' });
                    isValid = false;
                } else {
                    setStyle(errorSpan, { 'display': 'none' });
                    setStyle(input, { 'borderColor': '' });
                }
                break;
            case 'email':
                var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value.trim())) {
                    errorSpan.textContent = 'Please enter a valid email address.';
                    setStyle(errorSpan, { 'display': 'block' });
                    setStyle(input, { 'borderColor': '#ff4d6d' });
                    isValid = false;
                } else {
                    setStyle(errorSpan, { 'display': 'none' });
                    setStyle(input, { 'borderColor': '' });
                }
                break;
            case 'message':
                if (input.value.trim().length < 10) {
                    errorSpan.textContent = 'Message must be at least 10 characters.';
                    setStyle(errorSpan, { 'display': 'block' });
                    setStyle(input, { 'borderColor': '#ff4d6d' });
                    isValid = false;
                } else {
                    setStyle(errorSpan, { 'display': 'none' });
                    setStyle(input, { 'borderColor': '' });
                }
                break;
        }
        return isValid;
    }

    // Helper function for cross-browser style setting
    function setStyle(element, styles) {
        if (element && element.style) {
            for (var property in styles) {
                if (styles.hasOwnProperty(property)) {
                    element.style[property] = styles[property];
                }
            }
        }
    }
});