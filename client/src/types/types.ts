export type AuthFormFields = {
  name?: string;
  email: string;
  password: string;
};

export interface User {
  id: number;
  email: string;
  isAdmin: boolean;
  password: string;
  name: string;
  readBooks: BookResponse[];
  addedBooks:BookResponse[];
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface GetUserData {
  id: number;
}

export interface Book {
  title: string;
  author: string;
  image: FileList;
}

export interface BookResponse {
  addedBy: User;
  id: number;
  title: string;
  author: string;
  image: string;
  reviews: ReviewResponse[];
  readByUsers: User;
}

export interface Review {
  content: string;
  rating: number;
}

export interface ReviewResponse {
  id: number;
  content: string;
  rating: number;
  user: User;
}
