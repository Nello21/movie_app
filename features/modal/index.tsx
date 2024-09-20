"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  id?: string;
  className?: string;
  children: ReactNode;
}

export const Modal: React.FC<Props> = ({ className, children }) => {
  const router = useRouter();

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogTitle>Фильм</DialogTitle>
      <DialogContent
        className={cn(
          "flex flex-col p-0 w-1/2 max-w-[1060px] min-h-[300px] lg:min-h-[400px] bg-slate-600 bg-opacity-50 backdrop-blur-md overflow-hidden",
          className
        )}
      >
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
