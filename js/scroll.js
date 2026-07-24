// Scroll Progress Bar Controller
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// 1. Scroll Progress Bar Controller
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// 2. Animated Number Counters on Scroll Into View
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const speed = 200; // lower is faster
        const increment = Math.ceil(target / (speed / 10));

        let count = 0;
        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.innerText = count;
                setTimeout(updateCount, 25);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    // Intersection Observer to trigger counters when user scrolls to section
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    counters.forEach(counter => startCounter(counter));
                    hasAnimated = true; // Run only once
                }
            });
        }, { threshold: 0.5 });

        const counterSection = counters[0].closest('section');
        if (counterSection) {
            observer.observe(counterSection);
        }
    }
});