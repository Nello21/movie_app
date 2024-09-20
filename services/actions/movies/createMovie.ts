import { MovieFormValues } from "@/shared/types/types";

export async function createMovie(data: MovieFormValues) {
  const res = await fetch("/api/movies/create", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Error creating movie");
  }

  return res.json();
}
