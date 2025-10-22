"use client";

import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { LogInIcon } from "lucide-react";
import { InputText } from "../InputText";
import { Button } from "../Button";
import Link from "next/link";
import { createUserAction } from "@/actions/user/create-user-action";
import { PublicUserSchema } from "@/libs/user/schema";

// type RegisterFormState = {
//   name: string;
//   password: string;
//   password2: string;
//   error?: string;
// };

export function RegisterForm() {
  const [state, action, isPending] = useActionState(createUserAction, {
    user: PublicUserSchema.parse({}),
    errors: [],
    success: false,
  });

  // const [state, action, isPending] = useActionState<
  //   CreateUserActionState,
  //   FormData
  // >(createUserAction, initialState);

  useEffect(() => {
    toast.dismiss();
    if (state.errors.length > 0) {
      state.errors.forEach((error) => toast.error(error));
    }
  }, [state]);

  return (
    <div className="flex flex-col px-4 py-6">
      <form action={action} className="flex flex-col gap-4">
        <InputText
          type="text"
          name="name"
          labelText="Usuário"
          placeholder="Seu usuário..."
          disabled={isPending}
          defaultValue={state?.user.name}
        />

        <InputText
          type="password"
          name="password"
          labelText="Senha"
          placeholder="Sua senha..."
          disabled={isPending}
        />

        <InputText
          type="password"
          name="password2"
          labelText="Confirmar senha"
          placeholder="Repita sua senha..."
          disabled={isPending}
        />

        <Button type="submit" disabled={isPending} className="mt-6">
          <LogInIcon /> Registrar
        </Button>

        {/* {!!state?.errors && <p className="text-red-600">{state.errors}</p>} */}
      </form>

      <div className="mt-4">
        <Link
          href="/login"
          className="underline hover:decoration-black hover:text-blue-600"
        >
          Já tem uma conta? Entre
        </Link>
      </div>
    </div>
  );
}
