export interface UserDetails {
    id: string;
    name: string;
    email: string;
}

export interface LoginResponse {
    token: string;
    token_type: string;
    expires_in: number;
}