// src/features/auth/types/auth.types.ts
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}