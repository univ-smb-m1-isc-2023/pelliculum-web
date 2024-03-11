import axios from 'axios';

export class User {
    public id: number;
    public firstname: string;
    public lastname: string;
    public username: string;
    public email: string;
    public role: string;
    public avatar: string;

    constructor(user: any) {
      this.id = user.id;
      this.firstname = user.name;
      this.lastname = user.lastname;
      this.username = user.username;
      this.email = user.email;
      this.role = user.role;
      this.avatar = user.avatar;
    }

    public isAdmin(): boolean {
      return this.role === 'admin';
    }

    public isUser(): boolean {
      return this.role === 'user' || this.isAdmin();
    }

    public getProfileImage(): string {
      return `${axios.defaults.baseURL}/profilePictures/${this.username}.jpeg`
    }

}