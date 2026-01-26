"use client"

import Image from "next/image";
import styles from "@/app/login/page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";


// Flujo 

// Usuario escribe email/password
// → Supabase autentica
// → Supabase guarda sesión (localStorage)
// → AuthListener detecta sesión
// → AuthListener llama fetchUser() ( Fetchuser guarda user en Store )
// → user se guarda en Zustand
// → ClientNavbar reacciona al rol
// → Redirigimos a /account/dashboard

const Login = () => {

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
        <section className={`${styles.loginSection}`}>

            {/* Texto llamativo ( Desktop ) */}
            <div className="hidden md:block pb-4 text-gray-100 text-4xl ">
                {/* Logo Desktop */}
                <div className="hidden md:flex justify-center">
                    <Image  
                        className="ps-7 scale-160"
                        width={173} height={173} 
                        alt="Main Logo" src={"/logo-brand.png"}
                    />
                </div>

                {/* Texto */}
                <div className="flex flex-col mt-4 ms-20 gap-14">
                    <h1 className=" text-shadow-2xs text-center">
                        Make the right move
                    </h1>
                    <h1 className="font-serif text-shadow-2xs">
                        Start living like you deserve
                    </h1>
                </div>
            </div>

            {/* Logo ( Mobile ) */}
            <div className="md:hidden ps-4 relative -left-4">
                <Image 
                    className="scale-150" 
                    width={120} height={120}
                    alt="Main Logo" src={"/logo-brand.png"}
                />
            </div>

            {/* Login BOX ( Mobile/Desktop ) */}
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
                        <strong className="text-blue-800">
                            Create an account
                        </strong>
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
        </section>
    );
};

export default Login;