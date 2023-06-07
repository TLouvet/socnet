export type LoginForm = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};
