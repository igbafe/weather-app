declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
    password: string
  }
  declare interface User extends CreateUserParams {
    $id: string;
  }