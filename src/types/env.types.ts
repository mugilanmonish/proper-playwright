export type Product = {
    productId: number;
    productName: string;
    description: string;
};

export type Admin = {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role: string;
};

export type Shopper = {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    role: string;
    addresses: Record<string, Address>;
};

export type Merchant = {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    businessName?: string;
    phone?: string;
    role: string;
};

export type Address = {
    addressId: number;
    addressType: string;
    'house/office': string;
    streetInfo: string;
    landmark: string;
    country: string;
    state: string;
    city: string;
    pincode: number;
    phoneNumber: number;
};

// main env
export type EnvConfig = {
    url: string;
    apiUrl: string;
    users: {
        admins: Record<string, Admin>;
        shoppers: Record<string, Shopper>;
        merchants: Record<string, Merchant>;
    };
    products: {
        men: Product[];
        women: Product[];
        kids: Product[];
        electronics: Product[];
        beauty: Product[];
    };
};
