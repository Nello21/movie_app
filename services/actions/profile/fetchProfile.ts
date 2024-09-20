export async function fetchProfile() {
  const res = await fetch("/api/profile");

  if (!res.ok) {
    throw new Error("Ошибка при получении профиля");
  }
  return res.json();
}
