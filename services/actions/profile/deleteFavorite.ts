export const deleteFromFavorites = async (movieId: number) => {
  const res = await fetch(`/api/movies/${movieId}/favorite`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movieId }),
  });

  if (!res.ok) {
    throw new Error("Ошибка удаления из избранного");
  }

  return res.json();
};
