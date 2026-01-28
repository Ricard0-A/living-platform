"use client";
// RHF and Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Extras
import Image from "next/image";
import styles from "@/app/register/page.module.css";
// Supabase
import { supabase } from "@/lib/supabaseClient";

import { useState } from "react";
import Link from "next/link";

const Register = () => {
  // Similar a cuando validamos objetos en typescript con type
  // Si te fijas tenemos 3 validaciones : email, passsword y confirmpassword
  // cada uno valida el tipo de dato que espera, lo ves ?

  // Ahora z.email ya valida que sea un string con zod V4, Sin embargo
  // con password al parecer aun No

  const registerSchema = z
    .object({
      email: z.email("Email inválido"),
      password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    });

  type RegisterFormData = z.infer<typeof registerSchema>;

  // Que muestro mientras mando el registro ? un spinner ?
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // ✅ nuevo: estado para toast flotante
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // usa este schema de Zod para validar los datos automáticamente cuando el usuario envíe el formulario
  // React hook Form conectado a zod

  // console.log(useForm) = objeto de keys gigante
  // Propiedades como register, handlesubmit o incluso propiedades que tienen
  // como valor objetos, son destructurados de este Custom Hook

  // ( Fijate como vamos usando las keys de useForm en todo el archivo )
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    // Cada vez que alguien haga submit, validame los datos usando este esquema de Zod
    resolver: zodResolver(registerSchema),
  });

  // Logica al enviar el formulario
  //   Data === Objeto de useForm que almacena los inputs evaluados con ...Register(<any>)
  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setToastMsg(null);

    const { email, password } = data;

    // 1️⃣ Crear usuario en auth
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // 2️⃣ No insertamos aún en users — solo mostramos el mensaje de confirmación
    setSuccessMsg(
      "Cuenta creada exitosamente. Verifica tu correo electrónico."
    );
    setToastMsg("Te enviamos un correo de confirmación. Verifica tu bandeja.");
    reset();
    setLoading(false);

    // 3️⃣ Ocultamos el toast después de 5 segundos
    setTimeout(() => setToastMsg(null), 5000);
  };

  return (
    <section className={`${styles.registerSection}`}>
      {/* Texto llamativo ( Desktop ) */}
      <div className="hidden md:block mb-65 pb-4 text-gray-100 text-4xl ">
        {/* Logo Desktop */}
        <div className="hidden md:flex justify-center">
          <Image
            className="ps-7 scale-160"
            width={173}
            height={173}
            alt="Main Logo"
            src={"/logo-brand.png"}
          />
        </div>
        {/* Texto  */}
        <div className="flex flex-col mt-4 ms-20 gap-11">
          <h1 className="text-shadow-2xs text-center">
            Make the right move
          </h1>
          <h1 className="text-shadow-2xs">
            Start living like you deserve
          </h1>
        </div>
      </div>

      {/* Logo ( Mobile ) */}
      <div className="md:hidden ps-4 relative -left-4">
        <Image
          className="scale-150"
          width={120}
          height={120}
          alt="Main Logo"
          src={"/logo-brand.png"}
        />
      </div>

      {/* Register box ( Mobile/Desktop )  */}
      <section className={`${styles.registerBox} `}>
        {/* Cambiar a h1 luego  */}
        <h2
          className="
                    self-start inline-block 
                    text-3xl text-shadow-white 
                    font-bold"
        >
          Create an account
        </h2>
        {/* Input Register */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="border-2 border-solid border-gray-300 p-3 bg-white"
            type="email"
            placeholder="Email adress"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 text-sm"> {errors.email.message} </p>
          )}
          <input
            className="border-2 border-solid border-gray-300 p-3 bg-white"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}

          <input
            className="border-2 border-solid border-gray-300 p-3 bg-white"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm">
              {" "}
              {errors.confirmPassword.message}
            </p>
          )}

          <div className="mt-2 flex justify-center bg-blue-800 text-white">
            <button
              disabled={loading}
              className={`flex items-center justify-center gap-2 py-2 text-shadow-white font-bold ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading && (
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
              )}
              {loading ? "Creating account..." : "Register"}
            </button>
          </div>
        </form>

        {/* Mensajes globales */}
        {errorMsg && <p className="text-red-600 mt-2">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}

        {/* Info Extra  */}
        <div className="flex flex-col gap-4 p-3 border-2 border-solid border-gray-300">
          <h2>
            Already have an account?{" "}
            <Link href="/login">
              <strong className="ps-2 text-blue-800"> Sign In</strong>
            </Link>
          </h2>
          <p>
            By signing in, you accept our
            <strong className="text-blue-800">cookies</strong>
            policy to improve your experience.
          </p>
        </div>
      </section>
    </section>
  );
};
export default Register;
