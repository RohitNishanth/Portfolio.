// Typing Animation


document.addEventListener('DOMContentLoaded', () => {
    const navToggler = document.querySelector('.nav-toggler');
    const aside = document.querySelector('.aside');
    const mainContent = document.querySelector('.main-content');

    navToggler.addEventListener('click', () => {
        aside.classList.toggle('active');
        mainContent.classList.toggle('active');
    });

    // Optional: Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!aside.contains(e.target) && !navToggler.contains(e.target) && aside.classList.contains('active')) {
            aside.classList.remove('active');
            mainContent.classList.remove('active');
        }
    });

    // Optional: Prevent body scroll when sidebar is open
    aside.addEventListener('transitionend', () => {
        if (aside.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
});