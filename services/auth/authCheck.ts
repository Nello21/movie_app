export async function authCheck() {
  const res = await fetch("/api/user/me");

  if (!res.ok) {
    throw new Error("Ошибка верификации");
  }
  return res.json();
}
