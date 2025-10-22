"use client";

import { loginAction } from "@/actions/login/login-action";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { InputText } from "../InputText";
import { Button } from "../Button";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const initialState = {
    name: "",
    errors: [],
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userChanged = searchParams.get("userChanged");
  const created = searchParams.get("created");

  useEffect(() => {
    if (state?.errors) {
      toast.dismiss();
      toast.error(state.errors);
    }
  }, [state]);

  useEffect(() => {
    if (userChanged === "1") {
      toast.dismiss();
      toast.success("Seu usuário foi modificado. Faça login novamente.");
      const url = new URL(window.location.href);
      url.searchParams.delete("userChanged");
      router.replace(url.toString());
    }

    if (created === "1") {
      toast.dismiss();
      toast.success("Seu usuário criado.");
      const url = new URL(window.location.href);
      url.searchParams.delete("created");
      router.replace(url.toString());
    }
  }, [userChanged, created, router]);

  return (
    <div className="flex flex-col px-4 py-6">
      <form action={action} className="flex flex-col gap-4">
        <InputText
          type="text"
          name="name"
          labelText="Usuário"
          placeholder="Seu usuário..."
          disabled={isPending}
          defaultValue={state?.name}
        />

        <InputText
          type="password"
          name="password"
          labelText="Senha"
          placeholder="Sua senha"
          disabled={isPending}
        />

        <Button disabled={isPending} type="submit" className="mt-6">
          <LogInIcon />
          Entrar
        </Button>

        {!!state?.errors && <p className="text-red-600">{state.errors}</p>}
      </form>
      <div className="mt-4">
        <Link
          href="/register"
          className="underline hover:decoration-black hover:text-blue-600"
        >
          Ainda não tem uma conta? Crie uma
        </Link>
      </div>
    </div>
  );
}
