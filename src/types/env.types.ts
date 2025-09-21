// src/types/env.ts
export type EnvConfig = {
    url: string;
    apiUrl: string;
    users: {
        admins: Record<
            string,
            {
                email: string;
                password: string;
                firstName: string;
                lastName: string;
                role: string;
            }
        >;
        shoppers: Record<
            string,
            {
                email: string;
                password: string;
                firstName: string;
                lastName: string;
                phone?: string;
                role: string;
            }
        >;
        merchants: Record<
            string,
            {
                email: string;
                password: string;
                firstName: string;
                lastName: string;
                businessName?: string;
                phone?: string;
                role: string;
            }
        >;
    };
    products: Record<
        string, // category e.g. "electronics" | "clothing" | "books" | ...
        Record<
            string, // product key e.g. "smartphone" | "tshirt" | ...
            {
                name: string;
                brand: string;
                category: string;
                subCategory: string;
                description: string;
            }
        >
    >;
};
