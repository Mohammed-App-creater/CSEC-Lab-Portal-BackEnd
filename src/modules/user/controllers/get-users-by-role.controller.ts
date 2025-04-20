import { getUsersByRole } from "../interfaces/user.repository";
import { Request, Response } from "express";
import { RoleType } from "@prisma/client";


export const getUsersByRoleController = async (req: Request, res: Response): Promise<void> => {
    const { role } = req.body;

    if (!role) {
        res.status(400).json({ error: 'Role is required' });
        return;
    }

    if (!["Member", "SuperAdmin", "President", "VicePresident", "DivisionHead", "Coordinator"].includes(role)) {
        res.status(400).json({ error: 'Invalid role' });
        return;
    }

    try {
        const users = await getUsersByRole.getUsersByRole(role as RoleType);
        res.status(200).json(users);
        return
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching users' });
        console.error(error);
        return
    }
}