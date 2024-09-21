"use client";
import React from "react";
import { Container } from "../container";
import { Clapperboard } from "lucide-react";
import Link from "next/link";
import { BeatLoader } from "react-spinners";

export const HeaderSkeleton = () => {
  return (
    <nav className="fixed bottom-0 sm:sticky sm:top-0 max-[640px]:fixed max-[640px]:bottom-0 max-[640px]:flex-col z-50 max-h-[90px] w-full px-4 bg-black bg-opacity-50 backdrop-blur-md">
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

        <div className="flex gap-2 items-center">
          <BeatLoader
            loading={true}
            color="white"
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </Container>
    </nav>
  );
};
