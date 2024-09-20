export const addToFavorites = async (movieId: number) => {
  const res = await fetch(`/api/movies/${movieId}/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movieId }),
  });

  if (!res.ok) {
    throw new Error("Ошибка добавления в избранное");
  }

  return res.json();
};
