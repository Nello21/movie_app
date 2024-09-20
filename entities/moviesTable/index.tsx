import { Movie } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMovie } from "@/hooks/reactQueryUtils";

interface MovieTable {
  movies: Movie[];
  isLoading: boolean;
}

export default function MoviesTable({ movies, isLoading }: MovieTable) {
  const { mutate: deleteMovie } = useDeleteMovie();

  const handleDelete = (movieId: number) => {
    if (confirm("Are you sure you want to delete this movie?")) {
      deleteMovie(movieId);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span>Постер</span>
          </TableHead>
          <TableHead>Название</TableHead>
          <TableHead>
            <span>Действия</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movies.length === 0 ? (
          <TableRow className="text-center text-lg">Фильмы не найдены</TableRow>
        ) : (
          movies.map((movie: Movie) => (
            <TableRow key={movie.id}>
              <TableCell className="hidden sm:table-cell">
                <Image
                  src={movie.imageUrl}
                  alt="Постер"
                  width={150}
                  height={250}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/LUBz@BWC-;Rj*0WBoLayXSV@jEof"
                  draggable={false}
                  className="rounded-md h-full w-full object-cover object-center pointer-events-none select-none"
                />
              </TableCell>
              <TableCell className="font-medium">{movie.title}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Меню</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDelete(movie.id)}>
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
