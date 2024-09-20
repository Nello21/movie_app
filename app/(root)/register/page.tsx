"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/useToast";
import { registerSchema } from "@/shared/shemas/registerSchema";
import { RegisterFormValues } from "@/shared/types/types";
import { useRegister } from "@/hooks/reactQueryUtils";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function RegisterPage() {
  const { mutate: register, isLoading } = useRegister();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    register(values, {
      onSuccess: () => {
        toast({ title: "Успех!", description: "Регистрация прошла успешно!" });
        router.push("/login");
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
        <h1 className="text-4xl mx-auto font-bold mb-4">Регистрация</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full lg:w-4/6">
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Имя" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger>Зарегистрированы?</AccordionTrigger>
                <AccordionContent className="w-full">
                  <Button type="button" onClick={() => router.push("/login")}>
                    Войти в аккаунт
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </form>
        </Form>
      </div>
    </div>
  );
}
