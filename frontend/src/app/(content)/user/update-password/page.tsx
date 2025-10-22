import { UpdatePasswordForm } from "@/components/UpdatePasswordForm";
import { getCurrentUser } from "@/libs/login/manage-login";

export default async function UpdatePasswordPage() {
  const user = getCurrentUser();

  if (!user) {
    return <p>Usuário não autenticado</p>;
  }

  return (
    <div>
      Atualizar senha do usuário
      <UpdatePasswordForm />
    </div>
  );
}
