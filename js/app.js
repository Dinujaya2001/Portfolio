document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS Animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // 2. Mobile Menu Controller
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

    // 3. Dark/Light Theme Switching Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    const updateThemeIcons = () => {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
        } else {
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        }
    };

    updateThemeIcons();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            updateThemeIcons();
        });
    }

    // 4. Skills Category Filtering & Live Search Engine
    const skillTabs = document.querySelectorAll('.skill-tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    const skillSearchInput = document.getElementById('skill-search');

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

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => {
                t.classList.remove('active', 'bg-brandBlue', 'text-white');
                t.classList.add('glass-card', 'text-slate-300');
            });
            tab.classList.add('active', 'bg-brandBlue', 'text-white');
            tab.classList.remove('glass-card', 'text-slate-300');

            filterSkills();
        });
    });

    if (skillSearchInput) {
        skillSearchInput.addEventListener('input', filterSkills);
    }
});

// Initialize VanillaTilt 3D Effect
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 12,
        speed: 400,
        glare: true,
        "max-glare": 0.2
    });
}