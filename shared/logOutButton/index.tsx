"use client";

import { Button } from "@/components/ui/button";
import { loginOut } from "@/services/auth/logout";
import { useCallback } from "react";

export function LogoutButton() {
  const handleLogout = useCallback(async () => {
    await loginOut();
    window.location.reload();
  }, []);

  return <Button onClick={handleLogout}>Выйти из аккаунта</Button>;
}
