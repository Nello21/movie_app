import { registerUser } from "@/services/auth/register";
import { loginUser } from "@/services/auth/login";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchMovies } from "@/services/actions/movies/fetchMovies";
import { fetchProfile } from "@/services/actions/profile/fetchProfile";
import { fetchMovieById } from "@/services/actions/movies/fetchOneMovie";
import { addToFavorites } from "@/services/actions/profile/addFavorite";
import { fetchUsers } from "@/services/actions/users/fetchUsers";
import { deleteMovie } from "@/services/actions/movies/deleteMovie";
import { createMovie } from "@/services/actions/movies/createMovie";
import { MovieFormValues } from "@/shared/types/types";
import { deleteFromFavorites } from "@/services/actions/profile/deleteFavorite";

export function useRegister() {
  return useMutation(registerUser);
}

export function useLogin() {
  return useMutation(loginUser);
}

export function useFetchMovies() {
  return useQuery("movies", fetchMovies);
}

export const useFetchMovie = (id: number) => {
  return useQuery(["movie", id], () => fetchMovieById(id));
};

export function useCreateMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MovieFormValues) => createMovie(data),
    onSuccess: () => {
      queryClient.invalidateQueries("movies");
    },
    onError: (error) => {
      console.error("Failed to create movie:", error);
    },
  });
}

export function useDeleteMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: number) => deleteMovie(movieId),
    onSuccess: () => {
      queryClient.invalidateQueries("movies");
    },
    onError: (error) => {
      console.error("Failed to delete movie:", error);
    },
  });
}

export function useUsers() {
  return useQuery("users", fetchUsers);
}

export function useProfile() {
  return useQuery("profile", fetchProfile);
}

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation(addToFavorites, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
    onError: (error) => {
      console.error("Failed to add movie:", error);
    },
  });
};

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteFromFavorites, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
    onError: (error) => {
      console.error("Failed to delete movie:", error);
    },
  });
};
