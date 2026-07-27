// GitHub Profile Config
const GITHUB_USERNAME = 'Dinujaya2001';

// Function to animate counter numbers
function animateSingleCounter(element, target) {
    if (!element) return;
    let start = 0;
    const duration = 1500; // 1.5 seconds
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

// Fetch Live Stats from GitHub REST API
async function fetchLiveGitHubStats() {
    try {
        // 1. Fetch User Profile Data (Public Repos & Followers)
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userResponse.ok) throw new Error('User not found');
        const userData = await userResponse.json();

        // 2. Fetch User Repositories to calculate Total Stars
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        let totalStars = 0;
        if (reposResponse.ok) {
            const reposData = await reposResponse.json();
            totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        }

        // 3. Elements Mapping
        const reposEl = document.getElementById('gh-repos');
        const followersEl = document.getElementById('gh-followers');
        const starsEl = document.getElementById('gh-stars');
        const qualityEl = document.getElementById('gh-quality');

        // Update dataset targets & trigger counter animations
        if (reposEl) animateSingleCounter(reposEl, userData.public_repos || 0);
        if (followersEl) animateSingleCounter(followersEl, userData.followers || 0);
        if (starsEl) animateSingleCounter(starsEl, totalStars || 0);
        if (qualityEl) animateSingleCounter(qualityEl, 100);

        console.log(`GitHub Stats Synced: Repos(${userData.public_repos}), Followers(${userData.followers}), Stars(${totalStars})`);

    } catch (error) {
        console.error('Failed to fetch GitHub live stats:', error);
        // Fallback static values in case API fails or hits rate limit
        const reposEl = document.getElementById('gh-repos');
        if (reposEl) reposEl.innerText = "15+";
    }
}

// Invoke on Page Load
document.addEventListener('DOMContentLoaded', fetchLiveGitHubStats);