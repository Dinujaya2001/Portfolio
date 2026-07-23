// Typed.js Dynamic Role Animation Configuration
document.addEventListener('DOMContentLoaded', () => {
    const typedElement = document.getElementById('typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'Software Engineer.',
                'Java Developer.',
                'Backend Developer.',
                'Web Developer.',
                'UI/UX Designer.'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1800,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
});