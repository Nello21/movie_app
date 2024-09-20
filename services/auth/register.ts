import { RegisterFormValues } from "@/shared/types/types";

export async function registerUser(data: RegisterFormValues) {
  const res = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return res.json();
}
