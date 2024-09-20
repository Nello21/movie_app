"use client";

import Image from "next/image";
import { MovieSkeleton } from "../skeletons/movieSkeleton";
import { Movie } from "@prisma/client";
import Link from "next/link";

interface MovieCardProps {
  movie: Movie;
  isLoading: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, isLoading }) => {
  if (isLoading) {
    return <MovieSkeleton />;
  }

  return (
    <Link
      href={`/movie/${movie.id}`}
      key={movie.id}
      shallow={true}
      className="flex flex-col items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm p-4 gap-2 rounded-md hover:scale-110 transition-transform"
    >
      <div className="relative w-full h-full">
        <Image
          src={movie.imageUrl}
          alt="Постер"
          width={220}
          height={300}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/LUBz@BWC-;Rj*0WBoLayXSV@jEof"
          draggable={false}
          className="rounded-md h-full w-full object-cover object-center pointer-events-none select-none"
        />
      </div>
      <h1 className="text-md lg:text-xl font-bold">{movie.title}</h1>
    </Link>
  );
};
