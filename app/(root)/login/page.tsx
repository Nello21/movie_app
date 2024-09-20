"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/useToast";
import { LoginFormValues } from "@/shared/types/types";
import { loginSchema } from "@/shared/shemas/loginSchema";
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
import { useLogin } from "@/hooks/reactQueryUtils";

export default function LoginPage() {
  const { mutate: login } = useLogin();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values, {
      onSuccess: () => {
        toast({ title: "Успех!", description: "Авторизация прошла успешно!" });
        router.push("/");
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
    <div className="flex justify-center">
      <div className="flex flex-col bg-black bg-opacity-50 backdrop-blur-sm mt-12 px-6 py-6 rounded-lg my-2 lg:w-2/5 lg:max-w-lg">
        <h1 className="text-4xl mx-auto font-bold mb-4">Авторизация</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full lg:w-4/6">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full lg:w-4/6">
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Пароль" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{"Войти"}</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
