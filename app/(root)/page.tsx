"use client";
import { useFetchMovies } from "@/hooks/reactQueryUtils";
import { Movie } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { SearchBar } from "@/features/searchBar";
import { motion } from "framer-motion";
import { MovieCard } from "@/shared/movieCard";

export default function MoviesPage() {
  const { data, error, isLoading } = useFetchMovies();
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const filteredMovies = useMemo(() => {
    if (!data) return [];
    return data.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(query)
    );
  }, [data, query]);

  if (isLoading) {
    return <div>загрузка</div>;
  }

  if (error) {
    return <div>Error loading movies</div>;
  }

  return (
    <div className="min-h-screen bg-black bg-opacity-50">
      <div className="flex flex-col gap-8 items-center container mx-auto py-8 px-4 lg:px-8 lg:max-w-[1128px]">
        <h1 className="text text-4xl lg:text-5xl uppercase mb-4 font-bold">
          фильмы
        </h1>

        <SearchBar className="mb-6" />

        {filteredMovies.length === 0 ? (
          <div className="text-center text-lg">Фильмы не найдены</div>
        ) : (
          <motion.div layout>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredMovies.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} isLoading={isLoading} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
