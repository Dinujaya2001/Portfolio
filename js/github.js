// GitHub Username Configuration
const GITHUB_USERNAME = 'Dinujaya2001';

// Number Increment Animation Logic
function animateSingleCounter(element, target) {
    if (!element || isNaN(target) || target <= 0) {
        if (element) element.innerText = target || 0;
        return;
    }
    let start = 0;
    const duration = 1200;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.innerText = target;
            clearInterval(timer);
        } else {
            element.innerText = Math.ceil(start);
        }
    }, stepTime);
}

// Fetch Live Stats from Username: Dinujaya2001
async function fetchLiveGitHubStats() {
    try {
        // Fetch User Info
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userResponse.ok) throw new Error('User Profile fetch failed');
        const userData = await userResponse.json();

        // Dynamically update Profile Image & Name from GitHub API
        const avatarEl = document.getElementById('gh-avatar');
        const nameEl = document.getElementById('gh-name');
        if (avatarEl && userData.avatar_url) avatarEl.src = userData.avatar_url;
        if (nameEl && userData.name) nameEl.innerText = userData.name;

        // Fetch Repository Stars
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        let totalStars = 0;
        if (reposResponse.ok) {
            const reposData = await reposResponse.json();
            totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        }

        // Fetch Total Commit Count
        let totalCommits = 250;
        try {
            const commitSearchResponse = await fetch(`https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}`, {
                headers: { 'Accept': 'application/vnd.github.cloak-preview+json' }
            });
            if (commitSearchResponse.ok) {
                const commitData = await commitSearchResponse.json();
                if (commitData.total_count) totalCommits = commitData.total_count;
            }
        } catch (err) {
            console.warn('Commit API search rate-limited:', err);
        }

        // Set Target Numbers for Counters
        const reposEl = document.getElementById('gh-repos');
        const followersEl = document.getElementById('gh-followers');
        const starsEl = document.getElementById('gh-stars');
        const commitsEl = document.getElementById('gh-commits');

        if (reposEl) animateSingleCounter(reposEl, userData.public_repos || 0);
        if (followersEl) animateSingleCounter(followersEl, userData.followers || 0);
        if (starsEl) animateSingleCounter(starsEl, totalStars);
        if (commitsEl) animateSingleCounter(commitsEl, totalCommits);

    } catch (error) {
        console.error('Error fetching live GitHub statistics:', error);
    }
}

// Auto-Calculate GitHub Repository Language Percentages
async function fetchGitHubLanguages() {
    try {
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        if (!reposResponse.ok) return;

        const repos = await reposResponse.json();
        const languageMap = {};
        let totalBytes = 0;

        const langPromises = repos
            .filter(repo => !repo.fork && repo.languages_url)
            .map(repo => fetch(repo.languages_url).then(res => res.ok ? res.json() : {}));

        const langResults = await Promise.all(langPromises);

        langResults.forEach(langData => {
            for (const [lang, bytes] of Object.entries(langData)) {
                languageMap[lang] = (languageMap[lang] || 0) + bytes;
                totalBytes += bytes;
            }
        });

        if (totalBytes === 0) return;

        const langPercentages = {};
        for (const [lang, bytes] of Object.entries(languageMap)) {
            langPercentages[lang.toLowerCase()] = Math.round((bytes / totalBytes) * 100);
        }

        updateSkillCardsFromGitHub(langPercentages);

    } catch (error) {
        console.warn("Could not calculate dynamic language percentages:", error);
    }
}

// Update DOM Skill Cards dynamically
function updateSkillCardsFromGitHub(langPercentages) {
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        const skillName = card.getAttribute('data-name').toLowerCase();
        const percentEl = card.querySelector('.skill-percent');
        const progressBar = card.querySelector('.skill-bar');

        for (const [lang, percent] of Object.entries(langPercentages)) {
            if (skillName.includes(lang)) {
                const displayPercent = Math.max(percent, 25);
                if (percentEl) percentEl.innerText = `${displayPercent}%`;
                if (progressBar) {
                    progressBar.setAttribute('data-progress', `${displayPercent}%`);
                    progressBar.style.width = `${displayPercent}%`;
                }
                break;
            }
        }
    });
}

// Execute on Ready
document.addEventListener('DOMContentLoaded', () => {
    fetchLiveGitHubStats();
    fetchGitHubLanguages();
});