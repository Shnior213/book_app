export type CreateUserDetails = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserDetails = { id: number } & CreateUserDetails;
