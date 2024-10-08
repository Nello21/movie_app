import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/useToast";
import { useCreateMovie } from "@/hooks/reactQueryUtils";
import { movieSchema } from "@/shared/shemas/movieSchema";
import { MovieFormValues } from "@/shared/types/types";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

export const MovieForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: createMovie, isLoading } = useCreateMovie();

  const form = useForm({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: "",
      description: "",
      genre: [],
      imageUrl: "",
      rating: 0,
    },
  });

  const onSubmit = (values: MovieFormValues) => {
    createMovie(values, {
      onSuccess: () => {
        toast({ title: "Успех!", description: "Фильм успешно добавлен!" });
        router.push("/dashboard");
      },

      onError: (error) => {
        if (error instanceof Error) {
          toast({
            title: "Ошибка",
            description: error.message,
            variant: "destructive",
          });
        }
      },
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Добавить фильм</Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto max-w-full z-50">
        <div className="flex justify-center w-full">
          <div className="flex flex-col bg-black bg-opacity-50 backdrop-blur-sm mt-12 px-4 py-6 rounded-lg w-full max-w-lg">
            <h1 className="text-xl md:text-3xl mx-auto font-bold mb-4 text-center">
              Добавить Фильм
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Название</FormLabel>
                      <FormControl>
                        <Input placeholder="Название фильма" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Описание</FormLabel>
                      <FormControl>
                        <Input
                          type="textarea"
                          placeholder="Описание фильма"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Жанры (через запятую)</FormLabel>
                      <FormControl>
                        <Input placeholder="Жанры" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>URL изображения</FormLabel>
                      <FormControl>
                        <Input placeholder="URL изображения" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Рейтинг</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          max={10}
                          placeholder="Рейтинг (0-10)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="mt-4 w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Загрузка..." : "Добавить Фильм"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
