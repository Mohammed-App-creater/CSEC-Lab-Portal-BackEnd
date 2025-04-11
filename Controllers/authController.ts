import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Application, Request, Response } from "express";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.user_roles, // or flatten role if needed
            },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                division_id: user.division_id,
                status: user.status,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const signup = async (req: Request, res: Response): Promise<void> => {
    const {
      first_name,
      last_name,
      email,
      password,
      division_id,
      phone_number,
      telegram_username,
      birth_date,
      expected_graduation_year,
      year,
      university_department,
      specialty
    } = req.body;
  
    try {
      if (!email || !password || !first_name || !last_name) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
  
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        res.status(409).json({ message: "Email already exists" });
        return;
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: {
          first_name,
          last_name,
          email,
          password: hashedPassword,
          division_id,
          phone_number,
          telegram_username,
          birth_date,
          expected_graduation_year,
          year,
          University_Department: university_department,
          specialty,
          status: "Active", // default
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
  
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d",
      });
  
      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          division_id: user.division_id,
          status: user.status,
        },
      });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };