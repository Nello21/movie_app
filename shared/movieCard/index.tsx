"use client";

import Image from "next/image";
import { MovieSkeleton } from "../skeletons/movieSkeleton";
import { Movie } from "@prisma/client";
import Link from "next/link";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteFavorite } from "@/hooks/reactQueryUtils";

interface MovieCardProps {
  isProfileCard?: boolean;
  movie: Movie;
  isLoading: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  isProfileCard,
  movie,
  isLoading,
}) => {
  const addToFavorites = useDeleteFavorite();

  const handleDeleteFromFavorites = () => {
    addToFavorites.mutate(movie.id);
  };

  if (isLoading) {
    return <MovieSkeleton />;
  }

  const CardContent = (
    <>
      {isProfileCard && (
        <Button
          size="icon"
          className="absolute flex items-center top-[-10px] right-[-10px] overflow-hidden rounded-full z-20 hover:scale-105 transition-transform"
          variant={"outline"}
          onClick={handleDeleteFromFavorites}
        >
          <CircleX
            width={25}
            height={25}
            color="darkred"
            className="overflow-hidden rounded-full flex items-center"
          />
        </Button>
      )}
      <div className="relative w-full h-full">
        <Image
          src={movie.imageUrl}
          alt="Постер"
          width={220}
          height={300}
          placeholder="blur"
          blurDataURL={movie.imageUrl}
          draggable={false}
          className="rounded-md h-full w-full object-cover object-center pointer-events-none select-none"
        />
      </div>
      <h1 className="text-md lg:text-xl font-bold">{movie.title}</h1>
    </>
  );

  return isProfileCard ? (
    <div className="relative flex flex-col items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm p-4 gap-2 rounded-md">
      {CardContent}
    </div>
  ) : (
    <Link
      href={`/movie/${movie.id}`}
      key={movie.id}
      shallow={true}
      className="relative flex flex-col items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm p-4 gap-2 rounded-md hover:scale-110 transition-transform"
    >
      {CardContent}
    </Link>
  );
};
