import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import type { Admin, EnvConfig, Merchant, Shopper } from 'types/env.types';
import type { ProductCategory } from 'types/product.types';

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
    static getAdminUser(adminName: string): Admin {
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
    static getShopperData(shopperName: string): Shopper {
        const shopperData = this.readJsonTestData().users.shoppers[shopperName];
        if (!shopperData) throw new Error(`Shopper '${shopperName}' not found`);
        return (({ email, password, role, addresses }) => ({ email, password, role, addresses }))(shopperData);
    }

    /**
     * @description Get merchant user credentials from environment JSON file
     * @param merchantName - Name of the merchant user to retrieve credentials for
     * @throws If the specified merchant user is not found in the JSON file
     * @returns Merchant user credentials (email, password, role)
     */
    static getMerchantUser(merchantName: string): Merchant {
        const merchantCred = this.readJsonTestData().users.merchants[merchantName];
        if (!merchantCred) throw new Error(`Merchant '${merchantName}' not found`);
        return (({ email, password, role }) => ({ email, password, role }))(merchantCred);
    }

    /**
     * This function is used to get the product name by using product id
     * @param category 'men' | 'kids', 'beauty'..
     * @param id This is products id
     * @returns Product name
     */
    static getProductById(category: ProductCategory, id: number): string {
        const items = this.readJsonTestData().products[category];
        const product = items?.find((item: { productId: number }) => item.productId === id);
        if (!product) throw new Error(`Product id ${id} is not available`);
        return product.productName;
    }
}

export default JsonUtility;
