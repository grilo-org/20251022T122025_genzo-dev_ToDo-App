import clsx from "clsx";
import Link from "next/link";

export default function NotFoundContent() {
  return (
    <div
      className={clsx(
        "min-h-screen bg-black text-white",
        "flex items-center justify-center",
        "text-center"
      )}
    >
      <div>
        <h1 className="text-7xl/tight mb-4 font-extrabold">404</h1>
        <p>
          Error 404 - A página que você está tentando acessar não existe neste
          site
        </p>
        <p>
          Retornar para&nbsp;
          <Link
            href="/"
            className="underline hover:decoration-white hover:text-blue-700"
          >
            página inicial
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
