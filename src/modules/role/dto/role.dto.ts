import { R } from "@faker-js/faker/dist/airline-BUL6NtOJ";
import { Role } from "@prisma/client";


export type RoleDTO = Pick<Role, 'id' | 'name'>; 