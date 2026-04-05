export type AuthFormFields = {
  name?: string;
  email: string;
  password: string;
};

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  readBooks: BookResponse[];
}

export interface AuthResponse {
  accessToken: string;
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
  id: number;
  title: string;
  author: string;
  image: string;
  reviews: ReviewResponse[];
  // readByUsers:
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
