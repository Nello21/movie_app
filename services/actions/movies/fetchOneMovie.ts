export const fetchMovieById = async (id: number) => {
  const res = await fetch(`/api/movies/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch movie");
  }
  return res.json();
};
