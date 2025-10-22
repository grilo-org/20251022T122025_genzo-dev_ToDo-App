"use client";

import { updatePasswordAction } from "@/actions/user/update-password-action";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "../Button";
import { InputText } from "../InputText";
import { logoutAction } from "@/actions/login/logout-action";

export function UpdatePasswordForm() {
  const initialState = {
    formState: {
      currentPassword: "",
      newPassword: "",
    },
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    updatePasswordAction,
    initialState
  );

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach((error) => toast.error(error));
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success("Senha atualizada com sucesso");
      logoutAction();
    }
  }, [state.success]);

  return (
    <form action={action} className="flex flex-col gap-4 py-4 p-1 sm:px-8">
      <InputText
        labelText="Senha atual"
        name="currentPassword"
        type="password"
        placeholder="Digite sua senha atual"
        disabled={isPending}
      />

      <InputText
        labelText="Nova senha"
        name="newPassword"
        type="password"
        placeholder="Digite sua nova senha"
        disabled={isPending}
      />

      <InputText
        labelText="Confirmar nova senha"
        name="newPassword2"
        type="password"
        placeholder="Confirme sua nova senha"
        disabled={isPending}
      />

      <Button
        type="submit"
        variant="default"
        sizes="md"
        className="mt-4 w-fit"
        disabled={isPending}
      >
        Alterar senha
      </Button>
    </form>
  );
}
