"use client";

import Link from "next/link";
import { Home, Film, Users2, User as UserIcon } from "lucide-react";
import { useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/features/searchBar";
import { loginOut } from "@/services/auth/logout";
import { useSearchParams } from "next/navigation";
import { useFetchMovies, useUsers } from "@/hooks/reactQueryUtils";
import { Movie, User } from "@prisma/client";
import UserTable from "@/entities/userTable";
import MoviesTable from "@/entities/moviesTable";
import MovieForm from "@/features/addMovieForm";

export default function Dashboard() {
  const { data: users, isLoading: usersIsloading } = useUsers();
  const { data: movies, isLoading: moviesIsloading } = useFetchMovies();
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const [activeTable, setActiveTable] = useState<"users" | "movies">("users");

  const filteredUsers = useMemo(() => {
    if (!users || users.length === 0) return [];
    return users.filter((user: User) =>
      user.name?.toLowerCase().includes(query)
    );
  }, [users, query]);

  const filteredMovies = useMemo(() => {
    if (!movies || movies.length === 0) return [];
    return movies.filter((movie: Movie) =>
      movie.title?.toLowerCase().includes(query)
    );
  }, [movies, query]);

  const handleLogout = async () => {
    await loginOut();
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            <Home className="h-5 w-5" />
            <span className="sr-only">Админ Панель</span>
          </Link>

          <div
            onClick={() => setActiveTable("users")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
          >
            <Users2 className="h-5 w-5" />
            <span className="sr-only">Пользователи</span>
          </div>

          <div
            onClick={() => setActiveTable("movies")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
          >
            <Film className="h-5 w-5" />
            <span className="sr-only">Фильмы</span>
          </div>
        </nav>
      </aside>

      <div className="flex flex-col sm:gap-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4">
          <div className="relative ml-auto">
            <SearchBar
              placeholder={
                activeTable === "users" ? "Найти пользователя" : "Найти фильм"
              }
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <UserIcon
                  width={30}
                  height={30}
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/profile">Мой аккаунт</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Выйти</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="relative grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
          <div className="flex items-center">
            {activeTable === "movies" && (
              <div className="ml-auto flex items-center gap-2">
                <MovieForm />
              </div>
            )}
          </div>

          {activeTable === "users" ? (
            <UserTable users={filteredUsers} isLoading={usersIsloading} />
          ) : (
            <MoviesTable movies={filteredMovies} isLoading={moviesIsloading} />
          )}
        </main>
      </div>
    </div>
  );
}
