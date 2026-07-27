document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // 2. Mobile Menu Toggle Controller
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            }
        });
    }

    // 3. Dark / Light Mode Theme Controller
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    const updateIcons = () => {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
        } else {
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        }
    };

    // Load Initial Icons
    updateIcons();

    // Theme Switch Click Event
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // Toggle the dark class on HTML tag
            document.documentElement.classList.toggle('dark');
            
            // Save to LocalStorage
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            
            // Update the Sun/Moon Icons
            updateIcons();
        });
    }

    console.log('NovaStack Core Initialized Successfully.');

    // 4. Skills Category Filtering & Live Search Engine
    const skillTabs = document.querySelectorAll('.skill-tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    const skillSearchInput = document.getElementById('skill-search');

    // Filter Function
    const filterSkills = () => {
        const activeTab = document.querySelector('.skill-tab-btn.active');
        const category = activeTab ? activeTab.getAttribute('data-category') : 'all';
        const searchQuery = skillSearchInput ? skillSearchInput.value.toLowerCase().trim() : '';

        skillCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardName = card.getAttribute('data-name').toLowerCase();

            const matchesCategory = (category === 'all' || cardCategory === category);
            const matchesSearch = cardName.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.classList.remove('hidden');
                card.classList.add('block');
            } else {
                card.classList.add('hidden');
                card.classList.remove('block');
            }
        });
    };

    // Tab Button Clicks
    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => {
                t.classList.remove('active', 'bg-brandBlue', 'text-white', 'shadow-lg');
                t.classList.add('glass-card', 'text-slate-300');
            });
            tab.classList.add('active', 'bg-brandBlue', 'text-white', 'shadow-lg');
            tab.classList.remove('glass-card', 'text-slate-300');

            filterSkills();
        });
    });

    // Live Search Input Listener
    if (skillSearchInput) {
        skillSearchInput.addEventListener('input', filterSkills);
    }

    // 5. Skill Bar Progress Animation on Scroll
    const skillBars = document.querySelectorAll('.skill-bar');
    let skillBarsAnimated = false;

    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress;
        });
    };

    if (skillBars.length > 0) {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !skillBarsAnimated) {
                        animateSkillBars();
                        skillBarsAnimated = true;
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(skillsSection);
        }
    }
});
// VanillaTilt 3D Effect Controller
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 12,
        speed: 400,
        glare: true,
        "max-glare": 0.25,
    });
}