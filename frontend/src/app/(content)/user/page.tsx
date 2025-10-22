import { getCurrentUser } from "@/libs/login/manage-login";

import UserProfileForm from "@/components/UserProfileForm";
import Link from "next/link";
import { DeleteUserButton } from "@/components/DeleteUserButton";

export default async function userPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <p>Usuário não autenticado</p>;
  }

  return (
    //TODO: Estilizar a página
    <div>
      <h1>Página de usuário</h1>
      <UserProfileForm user={user} />

      <Link href="/user/update-password">Alterar senha</Link>
      <DeleteUserButton />
    </div>
  );
}
