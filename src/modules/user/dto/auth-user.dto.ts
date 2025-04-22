import { Gender } from "@prisma/client";

export type LoginUserDTO = {
    rememberMe?: boolean;
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
    DivisionId: string;
    gender?: Gender; // use your actual Gender enum type here
    groupId?: string;
  }