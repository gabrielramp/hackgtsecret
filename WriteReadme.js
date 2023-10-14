const axios = require('axios');
require('dotenv').config();

// This should be stored securely and not exposed.
const TOKEN = process.env.GITHUB_TOKEN;

console.log(TOKEN);

const OWNER = 'gabrielramp';
const REPO = 'hackgtsecret';
const BRANCH = 'main'; // or whatever branch you want to update
const FILE_PATH = 'README.md';
const COMMIT_MESSAGE = 'Update README.md with pizzaz!';

async function updateReadme() {
    const headers = {
        'Authorization': `token ${TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
    };

    try {
        // First, get the file to obtain the sha (necessary for updating the file later)
        const { data } = await axios.get(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, { headers });
        const sha = data.sha;

        // Next, update the file
        const updateData = {
            message: COMMIT_MESSAGE,
            content: Buffer.from('Hello World!').toString('base64'),
            sha: sha,
            branch: BRANCH
        };

        await axios.put(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, updateData, { headers });
        console.log('README.md updated successfully!');
    } catch (error) {
        console.error('Error updating the README.md:', error);
    }
}

updateReadme();