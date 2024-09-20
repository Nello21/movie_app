export async function fetchUsers() {
  const res = await fetch("/api/users", { method: "GET" });

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return res.json();
}
