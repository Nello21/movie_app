import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  genre: z
    .string()
    .min(1, "Жанры обязательны")
    .transform((val) => val.split(",").map((g) => g.trim())),
  rating: z.number().min(0, "Минимум 0").max(10, "Максимум 10"),
  imageUrl: z.string().min(1, "URL обязателен"),
});
