"use client"

import styles from "@/app/login/page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

// Flujo 

// Usuario escribe email/password
// - Supabase autentica
// - Supabase guarda sesión (localStorage)
// - AuthListener detecta sesión
// - AuthListener llama fetchUser() ( Fetchuser guarda user en Store )
// - user se guarda en Zustand
// - ClientNavbar reacciona al rol
// - Redirigimos a /account/dashboard

const LoginForm = () => {

    const router = useRouter();

    // ------------------------------
    // Estado local del formulario
    // ------------------------------
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const borderTest = {
        borderWidth : "2px",
        borderStyle : "solid",
        borderColor : "lightGray"
    };

    // ------------------------------
    // LOGIN CON SUPABASE
    // ------------------------------
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        // - Supabase ya guardó la sesión
        // - AuthListener va a detectar esto
        // - fetchUser() se ejecutará solo
        // - Solo redirigimos
        router.push("/account/dashboard");
    };

    return (
        <section className={`${styles.loginBox}`}>

            <h2
                className="
                    self-start inline-block 
                    text-3xl text-shadow-white 
                    font-bold
                "
            >
                Sign In
            </h2>

            {/* FORM LOGIN */}
            <form
                className="flex flex-col gap-5"
                onSubmit={handleLogin}
            >
                <input
                    className="
                        border-2 border-solid border-gray-300 
                        p-3 bg-white
                    "
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    className="
                        border-2 border-solid border-gray-300
                        p-3 bg-white
                    "
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <h2 className="text-blue-900 font-bold cursor-pointer">
                    Forgot password?
                </h2>

                {error && (
                    <p className="text-red-600 text-sm">
                        {error}
                    </p>
                )}

                <div className="mt-2 flex justify-center bg-blue-800 text-white">
                    <button
                        type="submit"
                        disabled={loading}
                        className="py-2 font-bold w-full"
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </div>
            </form>

            {/* Info Extra */}
            <div className="flex flex-col gap-4" style={borderTest}>
                <h2>
                    New over here?{" "}
                    <Link href={"/register"}>
                        <strong className="text-blue-800">
                            Create an account
                        </strong>
                    </Link>
                </h2>

                <p className="text-sm">
                    By sign in you will accept our{" "}
                    <strong className="text-blue-800">
                        cookies
                    </strong>{" "}
                    to perform a better user experience and protect your privacy
                </p>
            </div>

        </section>
    );
};

export default LoginForm;
