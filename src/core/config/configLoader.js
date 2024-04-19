const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

let config; // Configuration object

function loadConfig() {
    try {
        // Get a list of files in the root directory
        const files = fs.readdirSync(__dirname);

        // Find the first file with the .config.yml suffix
        const configFile = files.find(file => file.endsWith('.config.yml'));

        if (!configFile) {
            throw new Error('No configuration file found with the .config.yml suffix in the root folder.');
        }

        // Read the YAML configuration file
        const configFilePath = path.join(__dirname, configFile);
        const configFileContent = fs.readFileSync(configFilePath, 'utf8');

        // Parse the YAML content
        config = yaml.load(configFileContent, { schema: yaml.JSON_SCHEMA });
        console.log('Configuration loaded successfully');
    } catch (error) {
        console.error('Error loading configuration:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
}

function getConfig() {
    if (!config) {
        throw new Error('Configuration not loaded. Call loadConfig() first.');
    }
    return config;
}

module.exports = {
    loadConfig,
    getConfig
};
