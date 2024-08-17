export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface AdminLoginDTO {
  email: string;
  id: string;
  token: string;
}
