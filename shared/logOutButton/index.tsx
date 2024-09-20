"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "@/services/auth/logout";
import { useCallback } from "react";

export function LogoutButton() {
  const handleLogout = useCallback(async () => {
    await logOut();
    window.location.reload();
  }, []);

  return <Button onClick={handleLogout}>Выйти из аккаунта</Button>;
}
