export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

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
}