import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import type { EnvConfig } from 'types/env.types';
import type { LoginCredentials } from 'types/loginPage.types';

class JsonUtility {
    /**
     * @description Get environment variable
     * @throws If ENV is undefined
     * @returns Env string
     * @example 'dev', 'qa', 'beta', 'prod'
     */
    static getEnv(): string {
        if (!process.env.ENV) throw new Error('Env is undefined.');
        else return process.env.ENV;
    }

    /**
     * @returns Path to the environment JSON file based on the ENV variable
     * @throws If ENV is not one of the expected values ('dev', 'qa', 'beta', 'prod')
     */
    static getEnvFile(): string {
        const env = this.getEnv()?.toLowerCase();

        if (!['dev', 'qa', 'beta', 'prod'].includes(env)) throw new Error(`Env is not correct: ${env}`);
        const envPath = path.resolve(process.cwd(), `src/test-data/${env}.json`);
        return envPath;
    }

    /**
     * Reads and parses the JSON file corresponding to the current environment.
     * @returns Parsed JSON data from the environment-specific file
     * @throws If there is an error reading or parsing the JSON file
     */
    static readJsonTestData(): EnvConfig {
        try {
            const absolutePath = this.getEnvFile();
            const data = fs.readFileSync(absolutePath, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            throw new Error(`Error reading JSON file: ${err}`);
        }
    }

    /**
     * @description Get application URL from environment JSON file
     * @returns Application URL from the environment JSON file
     * @throws If the URL is not found in the JSON file
     */
    static getAppUrl(): string {
        return this.readJsonTestData().url;
    }

    /**
     * @description Get API URL from environment JSON file
     * @returns API URL from the environment JSON file
     * @throws If the API URL is not found in the JSON file
     */
    static getApiUrl(): string {
        return this.readJsonTestData().apiUrl;
    }

    /**
     * @description Get admin user credentials from environment JSON file
     * @param adminName - Name of the admin user to retrieve credentials for
     * @throws If the specified admin user is not found in the JSON file
     * @returns Admin user credentials (email, password, role)
     */
    static getAdminUser(adminName: string): LoginCredentials {
        const adminCred = this.readJsonTestData().users.admins[adminName];
        if (!adminCred) throw new Error(`Admin '${adminName}' not found`);
        return (({ email, password, role }) => ({ email, password, role }))(adminCred);
    }

    /**
     * @description Get shopper user credentials from environment JSON file
     * @param shopperName - Name of the shopper user to retrieve credentials for
     * @throws If the specified shopper user is not found in the JSON file
     * @returns Shopper user credentials (email, password, role)
     */
    static getShopperUser(shopperName: string): LoginCredentials {
        const shopperCred = this.readJsonTestData().users.shoppers[shopperName];
        if (!shopperCred) throw new Error(`Shopper '${shopperName}' not found`);
        return (({ email, password, role }) => ({ email, password, role }))(shopperCred);
    }

    /**
     * @description Get merchant user credentials from environment JSON file
     * @param merchantName - Name of the merchant user to retrieve credentials for
     * @throws If the specified merchant user is not found in the JSON file
     * @returns Merchant user credentials (email, password, role)
     */
    static getMerchantUser(merchantName: string): LoginCredentials {
        const merchantCred = this.readJsonTestData().users.merchants[merchantName];
        if (!merchantCred) throw new Error(`Merchant '${merchantName}' not found`);
        return (({ email, password, role }) => ({ email, password, role }))(merchantCred);
    }

    // Write JSON file (overwrites existing content)
    // static writeJson(filePath, jsonData) {
    //     try {
    //         const absolutePath = path.resolve(filePath);
    //         fs.writeFileSync(absolutePath, JSON.stringify(jsonData, null, 2), 'utf-8');
    //         console.log('JSON file written successfully.');
    //     } catch (err) {
    //         console.error(`Error writing JSON file: ${err.message}`);
    //     }
    // }

    // // Update value by key
    // static updateValue(filePath, key, newValue) {
    //     const jsonData = this.readJson(filePath);
    //     if (jsonData) {
    //         jsonData[key] = newValue;
    //         this.writeJson(filePath, jsonData);
    //     }
    // }
}

export default JsonUtility;
