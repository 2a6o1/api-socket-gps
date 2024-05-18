import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

let config; // Configuration object

const loadConfig = () => {
    const rootDir = process.cwd();

    // Find the first file with the .config.yml suffix in the root directory
    const configFile = findConfigFile(rootDir);
    if (configFile === "null" ||
        configFile === "undefined" ||
        configFile === ""  ||
        configFile === null ||
        configFile === undefined) {
        config = null;
        return;
    }

    // Read the YAML configuration file
    const configFilePath = path.join(rootDir, configFile);
    const configFileContent = fs.readFileSync(configFilePath, 'utf8');

    // Parse the YAML content
    config = yaml.load(configFileContent, { schema: yaml.JSON_SCHEMA });
}

const getConfig = () => {
    if (!config) {
        throw Error('Configuration not loaded. Call loadConfig() first.');
    }
    return config;
}

const findConfigFile = (dir) => {
    // Check if a .config.yml file exists in the current directory
    const files = fs.readdirSync(dir);
    const configFile = files.find(file => file.endsWith('.config.yml'));
    if (configFile) {
        return configFile;
    }

    // If not found, traverse upwards to the parent directory
    const parentDir = path.dirname(dir);
    // Check if reached the root directory
    if (parentDir === dir) {
        return null; // Config file not found in the project
    }
    // Recursively search in the parent directory
    return findConfigFile(parentDir);
}

export { loadConfig, getConfig };