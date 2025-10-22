import { LoginForm } from "@/components/LoginForm";

export default function loginPage() {
  return (
    <div className="flex flex-col justify-center mt-32">
      <h1 className="text-center text-4xl font-extrabold">Login</h1>
      <LoginForm />
    </div>
  );
}
