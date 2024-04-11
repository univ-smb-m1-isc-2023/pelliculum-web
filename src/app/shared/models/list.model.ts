import { IUser } from './user.model';

export interface IList {
  id: number;
  name: string;
  description: string;
  author: IUser;
  isPublic: boolean;
  likes: number;
  movies: number[]
}