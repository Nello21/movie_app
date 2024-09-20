"use client";

import { Button } from "@/components/ui/button";
import { useAddFavorite, useFetchMovie } from "@/hooks/reactQueryUtils";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function MoviePage() {
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading, error } = useFetchMovie(Number(id));
  const addToFavorites = useAddFavorite();

  if (isLoading) return <div>Loading</div>;
  if (error) return <p>Error loading movie</p>;

  const handleAddToFavorites = () => {
    addToFavorites.mutate(Number(id));
    router.back();
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8 gap-4">
      <div className=" flex items-center w-full md:w-1/2 max-w-[300px]">
        <Image
          src={data.imageUrl}
          width={300}
          height={400}
          alt={`${data.title} poster`}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      <div className="w-full flex flex-col items-start gap-4">
        <h1 className="text-xl md:text-3xl font-bold text-white">
          {data.title}
        </h1>
        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
          {data.description}
        </p>
      </div>
      <Button onClick={handleAddToFavorites} className="w-auto md:w-auto">
        Добавить в избранное
      </Button>
    </div>
  );
}
