import axios from 'axios';

export class User {
    public static isAdmin(user: IUser): boolean {
        return user.role === 'admin';
    }

    public static isUser(user: IUser): boolean {
        return user.role === 'user';
    }

    public static getProfileImage(user: IUser): string {
        return `${axios.defaults.baseURL}/profilePictures/${user.username}.jpeg`;
    }
}

export interface IUser {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    role: string;
    avatar: string;
}
