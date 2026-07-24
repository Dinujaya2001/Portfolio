// GitHub Profile Configuration
const GITHUB_USERNAME = 'Dinujaya2001'; 

// Fetch GitHub Profile Data
async function fetchGitHubProfile() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!response.ok) throw new Error('GitHub user not found');
        
        const data = await response.json();
        
        // Dynamic Data Update Helper
        const updateElement = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.innerText = value;
        };

        // Update DOM elements with live GitHub stats
        updateElement('github-repos', data.public_repos);
        updateElement('github-followers', data.followers);
        updateElement('github-following', data.following);
        
        console.log('GitHub Live Data Fetched Successfully for:', GITHUB_USERNAME);
    } catch (error) {
        console.error('Error fetching GitHub profile:', error);
    }
}

// Invoke on DOM Ready
document.addEventListener('DOMContentLoaded', fetchGitHubProfile);