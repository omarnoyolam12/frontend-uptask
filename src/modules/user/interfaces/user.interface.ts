export interface User{
    id: string;
    name: string;
    username: string;
    email: string;
    isConfirmed: boolean;
    createdAt: Date;
    avatarUrl?: string;
}