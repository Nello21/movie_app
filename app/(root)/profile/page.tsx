"use client";

import { LogoutButton } from "@/shared/logOutButton";
import { useProfile } from "@/hooks/reactQueryUtils";
import { Movie } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MovieCard } from "@/shared/movieCard";
import Loading from "../loading";

export default function ProfilePage() {
  const { data, error, isLoading } = useProfile();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Ошибка: {(error as Error).message}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text2xl lg:text-3xl font-bold text-center">
              Профиль пользователя
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-wrap">
            {data && (
              <div>
                <p className="text-base lg:text-xl">
                  Имя: <span className="font-semibold">{data.user.name}</span>
                </p>
                <p className="text-base lg:text-xl">
                  Email:{" "}
                  <span className="font-semibold">{data.user.email}</span>
                </p>
              </div>
            )}
            <LogoutButton />
          </CardContent>
        </Card>

        <Card className="mb-6 py-2">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Избранное</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid max-[320px]:grid-cols-1 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data?.favorites.length ? (
                data.favorites.map((movie: Movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    isProfileCard={true}
                    isLoading={isLoading}
                  />
                ))
              ) : (
                <p className="text-center">У вас нет избранных фильмов.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
