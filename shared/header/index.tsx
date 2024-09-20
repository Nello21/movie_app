"use client";
import { cn } from "@/lib/utils";
import React, { FC } from "react";
import { Container } from "../container";
import { Clapperboard, User } from "lucide-react";
import { MonitorCog } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCookAuth } from "@/hooks/useAuth";

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {
  const { isAuth, isAdmin } = useCookAuth();
  console.log(isAuth, isAdmin);

  return (
    <nav
      className={cn(
        "fixed bottom-0 sm:sticky sm:top-0 max-[640px]:fixed max-[640px]:bottom-0 max-[640px]:flex-col z-50 max-h-[90px] w-full px-4 bg-black bg-opacity-50 backdrop-blur-md",
        className
      )}
    >
      <Container className="h-full flex content-center justify-between py-4">
        <Link
          href="/"
          className="flex items-center space-x-1 hover:scale-105 transition-transform"
        >
          <Clapperboard width={30} height={30} />
          <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase max-[640px]:hidden">
            Кинолента
          </h2>
        </Link>

        <div className="flex gap-2">
          {isAuth ? (
            <Link href="/profile">
              <Button variant="outline" className="flex gap-1 items-center">
                <User width={20} height={20} />
                <span className="max-[640px]:hidden">Профиль</span>
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="flex gap-1 items-center">
                <User width={20} height={20} />
                <span className="max-[640px]:hidden">Войти</span>
              </Button>
            </Link>
          )}

          {isAdmin && (
            <Link href="/dashboard">
              <Button variant="outline" className="flex gap-1 items-center">
                <MonitorCog width={20} height={20} />
                <span className="max-[640px]:hidden">Админ панель</span>
              </Button>
            </Link>
          )}
        </div>
      </Container>
    </nav>
  );
};
