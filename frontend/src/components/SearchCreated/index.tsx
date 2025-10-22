"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function SearchCreated() {
  const searchParams = useSearchParams();
  const created = searchParams.get("created");
  const router = useRouter();

  useEffect(() => {
    console.log("SearchCreated montado");

    if (created === "1") {
      toast.dismiss();
      toast.success("Tarefa criado com sucesso");
      const url = new URL(window.location.href);
      url.searchParams.delete("created");
      router.replace(url.toString());
    }
  }, [created, router]);

  return null;
}
