import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/tasks/all");

  return null;
}

/* PODE SER NECESSÁRIO NO FUTURO: */

// import { redirect } from "next/navigation";

// export default async function HomePage() {
//   // Pode buscar dados do backend aqui antes de redirecionar
//   // await fetchAlgumaCoisa();

//   redirect("/tasks/all");
//   return null;
// }
