import { z } from "zod";
import { registerSchema } from "../../shared/shemas/registerSchema";
import { loginSchema } from "@/shared/shemas/loginSchema";
import { movieSchema } from "../shemas/movieSchema";

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;

export type MovieFormValues = z.infer<typeof movieSchema>;

export interface Profile {
  id: number;
  user: object;
  userId: number;
  favorites: Array<string>;
}
