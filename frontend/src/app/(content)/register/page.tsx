import { RegisterForm } from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col justify-center mt-20">
      <h1 className="text-center text-4xl font-extrabold">Registrar</h1>
      <RegisterForm />
    </div>
  );
}
