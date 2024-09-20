import { LoginFormValues } from "@/shared/types/types";

export async function loginUser(data: LoginFormValues) {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  window.location.reload();
  return res.json();
}
