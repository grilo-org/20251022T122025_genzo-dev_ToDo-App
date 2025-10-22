"use client";

import { updateUserAction } from "@/actions/user/update-user-action";
import { PublicUserDto } from "@/libs/user/schema";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { InputText } from "../InputText";
import { Button } from "../Button";
import { useRouter } from "next/navigation";

type Props = {
  user: PublicUserDto;
};

export default function UserProfileForm({ user }: Props) {
  const router = useRouter();

  const initialState = {
    formState: {
      name: user.name,
    },
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    updateUserAction,
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
      toast.success("Perfil atualizado com sucesso!");
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={action} className="flex flex-col gap-4 py-4 p-1 sm:px-8">
      <InputText
        labelText="Usuário"
        name="name"
        placeholder={user.name}
        disabled={isPending}
        defaultValue={user.name}
      />

      <Button
        type="submit"
        variant="default"
        sizes="md"
        className="mt-4 w-fit"
        disabled={isPending}
      >
        Alterar dados
      </Button>
    </form>
  );
}
