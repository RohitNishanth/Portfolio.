document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    const inputs = form.querySelectorAll('.form-control');

    // Real-time validation and error display
    inputs.forEach(input => {
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.style.color = '#ff4d6d';
        errorSpan.style.fontSize = '14px';
        errorSpan.style.display = 'block';
        errorSpan.style.marginTop = '5px';
        input.parentNode.appendChild(errorSpan);

        input.addEventListener('input', () => {
            validateField(input, errorSpan);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset feedback
        feedback.style.display = 'none';
        feedback.textContent = '';
        inputs.forEach(input => {
            const errorSpan = input.nextElementSibling;
            errorSpan.style.display = 'none';
        });

        // Check honeypot
        const honeypot = form.querySelector('input[name="honeypot"]').value;
        if (honeypot) {
            feedback.textContent = 'Bot detection triggered. Please try again.';
            feedback.className = 'form-feedback error';
            feedback.style.display = 'block';
            return;
        }

        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            const errorSpan = input.nextElementSibling;
            if (!validateField(input, errorSpan)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Simulate form submission (replace with actual backend call)
            feedback.textContent = 'Thank you! Your message has been sent successfully.';
            feedback.className = 'form-feedback success';
            feedback.style.display = 'block';

            // Reset form
            form.reset();

            // Auto-hide success message after 5 seconds
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 5000);
        } else {
            feedback.textContent = 'Please correct the errors in the form.';
            feedback.className = 'form-feedback error';
            feedback.style.display = 'block';
        }
    });

    function validateField(input, errorSpan) {
        let isValid = true;
        switch (input.name) {
            case 'name':
                const namePattern = /^[A-Za-z\s]{2,30}$/;
                if (!namePattern.test(input.value.trim())) {
                    errorSpan.textContent = 'Name must be 2-30 letters only.';
                    errorSpan.style.display = 'block';
                    input.style.borderColor = '#ff4d6d';
                    isValid = false;
                } else {
                    errorSpan.style.display = 'none';
                    input.style.borderColor = '';
                }
                break;
            case 'email':
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value.trim())) {
                    errorSpan.textContent = 'Please enter a valid email address.';
                    errorSpan.style.display = 'block';
                    input.style.borderColor = '#ff4d6d';
                    isValid = false;
                } else {
                    errorSpan.style.display = 'none';
                    input.style.borderColor = '';
                }
                break;
            case 'message':
                if (input.value.trim().length < 10) {
                    errorSpan.textContent = 'Message must be at least 10 characters.';
                    errorSpan.style.display = 'block';
                    input.style.borderColor = '#ff4d6d';
                    isValid = false;
                } else {
                    errorSpan.style.display = 'none';
                    input.style.borderColor = '';
                }
                break;
        }
        return isValid;
    }
});