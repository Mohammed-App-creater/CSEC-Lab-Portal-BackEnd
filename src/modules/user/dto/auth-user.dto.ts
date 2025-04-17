export type LoginUserDTO = {
    email: string;
    password: string;
  };
  
export type LoginUserResponseDTO = {
    token: string;
    user: {
      id: string;
      name: string;
      role: string;
    };
  };

  export type RegisterUserDTO = {
    email: string;
    password: string;
  }