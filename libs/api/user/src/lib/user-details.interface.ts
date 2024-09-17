export interface UserDetails {
    id: string;
    name: string;
    email: string;
}

export interface LoginResponse {
    error: boolean;
    status: string;
    token: string;
    name: string;
    expires_in: number;
}