// Environment initialized
const scrollProgress = document.getElementById('scroll-progress');

// Dynamic Scroll Progress Bar Indicator
window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
        const percentage = (window.scrollY / totalScroll) * 100;
        scrollProgress.style.width = `${percentage}%`;
    }
});