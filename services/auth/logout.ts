export async function loginOut() {
  const res = await fetch("/api/logout", {
    method: "POST",
  });

  if (!res.ok) {
    console.error("Ошибка при выходе из аккаунта");
    return;
  }

  return res.json();
}
