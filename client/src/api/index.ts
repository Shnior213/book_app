import axios, { type InternalAxiosRequestConfig } from "axios";

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    password: string;
    name: string;
  };
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
  // readByUsers:
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post(import.meta.env.VITE_API_URL + "/auth/refresh", {
          refreshToken,
        });

        const { accessToken } = res.data;

        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Session expired, logging out...");
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export const registerUser = async (
  userData: RegisterData,
): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", userData);

  return res.data;
};

export const login = async (credentials: LoginData): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", credentials);
  const userId = res.data.user.id;
  localStorage.setItem("accessToken", res.data.accessToken);
  localStorage.setItem("refreshToken", res.data.refreshToken);
  localStorage.setItem("userId", userId.toString());
  return res.data;
};

export const logout = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      await api.post("/auth/logout", { refreshToken });
    }
  } catch (error) {
    console.error("Logout failed", error);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    
  }
};

export const getAllBooks = async (): Promise<BookResponse[]> => {
  const res = await api.get("/books");

  return res.data;
};

export const addBook = async (book: FormData) => {
  const res = await api.post("/books", book);
  console.log("sdf");

  return res.data;
};
