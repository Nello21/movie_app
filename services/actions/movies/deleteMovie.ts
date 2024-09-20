export async function deleteMovie(movieId: number) {
  const res = await fetch(`/api/movies/${movieId}/delete`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Error deleting movie");
  }
}
