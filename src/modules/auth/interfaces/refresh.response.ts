import type { User } from "@/modules/user/interfaces/user.interface";

export interface RefreshSession {
    user: User;
    accessToken: string;
}