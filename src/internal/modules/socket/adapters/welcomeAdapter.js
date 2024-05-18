import { join } from 'path';

const welcomeAdapter = (req, res) => {
    const rootDir = process.cwd(); // Get the root directory of the project
    res.sendFile(join(rootDir, 'public', 'index.html')); // Construct the path to the index.html file
};

export default welcomeAdapter;