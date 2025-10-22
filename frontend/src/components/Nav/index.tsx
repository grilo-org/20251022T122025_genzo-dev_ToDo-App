import { getCurrentUser } from "@/libs/login/manage-login";
import Link from "next/link";
export async function Nav() {
  //TODO:Utilizar CLSX

  const user = await getCurrentUser();

  return (
    <nav className="flex justify-between items-center bg-black text-white p-4">
      <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
        <Link
          href="/"
          className="hover:cursor-pointer hover:brightness-90 transition"
        >
          ToDo App
        </Link>
      </h1>

      <div className="relative flex items-center">
        {user && (
          <h1 className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-extrabold bg-white text-black px-2 rounded hover:brightness-90 transition">
            <Link href="/user" className="hover:cursor-pointer">
              {user.name}
            </Link>
          </h1>
        )}
      </div>
    </nav>
  );
}
