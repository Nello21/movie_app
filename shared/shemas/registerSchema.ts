import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Имя должно быть минимум из 2 символов"),
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен быть минимум из 6 символов"),
});
