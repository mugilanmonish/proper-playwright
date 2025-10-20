/**
 * Represents a product object from API response
 */
export interface Product {
    productId: number;
    productName: string;
    [key: string]: unknown;
}

/**
 * Represents the response structure for a list of products
 */
export interface ProductResponse {
    data: Product[];
}

/**
 * Represents the user data structure stored in localStorage
 */
export interface UserData {
    jwtToken: string;
    userId: number;
    [key: string]: unknown;
}

/**
 * Represents a cart response
 */
export interface CartResponse {
    data: Product[];
}
