import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import type { EnvConfig } from 'types/env.types';

class JsonUtility {
    static getEnv(): string {
        if (!process.env.ENV) throw new Error('Env is undefined.');
        else return process.env.ENV;
    }

    static getEnvFile(): string {
        const env = this.getEnv()?.toLowerCase();

        if (!['dev', 'qa', 'beta', 'prod'].includes(env)) throw new Error(`Env is not correct: ${env}`);
        const envPath = path.resolve(process.cwd(), `src/test-data/${env}.json`);
        return envPath;
    }

    // Read JSON file
    static readJsonTestData(): EnvConfig {
        try {
            const absolutePath = this.getEnvFile();
            const data = fs.readFileSync(absolutePath, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            throw new Error(`Error reading JSON file: ${err}`);
        }
    }

    static getAppUrl(): string {
        return this.readJsonTestData().url;
    }

    static getApiUrl(): string {
        return this.readJsonTestData().apiUrl;
    }

    static getAdminUser(adminName: string): { email: string; password: string; role: string } {
        const adminCred = this.readJsonTestData().users.admins[adminName];
        if (!adminCred) throw new Error(`Admin '${adminName}' not found`);
        return (({ email, password, role }) => ({ email, password, role }))(adminCred);
    }

    static getShopperUser(shopperName: string): { email: string; password: string; role: string } {
        const shopperCred = this.readJsonTestData().users.shoppers[shopperName];
        if (!shopperCred) throw new Error(`Shopper '${shopperName}' not found`);
        return (({ email, password, role }) => ({ email, password, role }))(shopperCred);
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
