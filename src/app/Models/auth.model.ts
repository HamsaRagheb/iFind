// SignUpUser Interface
export interface SignUpUser {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
// SignInUser Interface
export interface SignInUser {
  email: string;
  password: string;
}
// AuthResponse Interface
export interface AuthResponse {
  message: string;
  statusMsg?: string;
  user?: {
    name: string;
    email: string;
    role: string;
  };
  token?: string;
}
// VerifyTokenResponse Interface
export interface VerifyTokenResponse {
  statusMsg?: string;
  message: string;
  decoded?: {
    id: string;
    name: string;
    role: string;
    iat: number;
    exp: number;
  };
}
// UsersResponse Interface
export interface UsersResponse {
  totalUsers: number;
  metadata: object;
  users: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
  }[];
}

export interface ChangePasswordPayload {
  currentPassword: string;
  password: string;
  rePassword: string;
}

// Forgot Password Response
export interface ForgetPasswordResponse {
  statusMsg: string;
  message: string;
}
// Verify Reset Code Response
export interface VerifyResetCodeResponse {
  statusMsg: string;
  message: string;
}
