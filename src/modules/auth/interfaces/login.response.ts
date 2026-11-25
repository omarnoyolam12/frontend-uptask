import type { User } from "@/modules/user/interfaces/user.interface";

export interface Login {
    user: User;
    accessToken: string;
}