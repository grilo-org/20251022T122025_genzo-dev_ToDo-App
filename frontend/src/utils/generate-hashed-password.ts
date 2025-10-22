import { hashPassword } from "@/libs/login/manage-login";

//TODO: Avaliar se mantém no sistema
//TODO: Caso manter no sistema, validar (usuário não pode digitar senha vazia)

(async () => {
  const myPassword = ""; //Apague a senha após utilizar
  const hashMyPassword = await hashPassword(myPassword);

  console.log({ hashMyPassword });
})();
