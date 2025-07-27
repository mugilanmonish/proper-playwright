import type { LoginRole } from 'enums/login.enum';

export type LoginCredentials = {
    username: string;
    password: string;
    role: LoginRole;
};
