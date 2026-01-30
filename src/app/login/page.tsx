import Image from "next/image";
import styles from "@/app/login/page.module.css";
import LoginForm from "./LoginForm"

// Flujo 

// Usuario escribe email/password
// - Supabase autentica
// - Supabase guarda sesión (localStorage)
// - AuthListener detecta sesión
// - AuthListener llama fetchUser() ( Fetchuser guarda user en Store )
// - user se guarda en Zustand
// - ClientNavbar reacciona al rol
// - Redirigimos a /account/dashboard

const Login = () => {
    return (
        <section className={`${styles.loginSection}`}>

            {/* Texto llamativo ( Desktop ) */}
            <div className="hidden md:block mb-65 text-gray-100 text-4xl ">
                {/* Logo Desktop */}
                <div className="hidden md:flex justify-center">
                    <Image  
                        className="ps-7 scale-160"
                        width={173} height={173} 
                        alt="Main Logo" src={"/logo-brand.png"}
                    />
                </div>

                {/* Texto */}
                <div className="flex flex-col mt-5 ms-20 gap-11">
                    <h1 className=" text-shadow-2xs text-center">
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
                    width={120} height={120}
                    alt="Main Logo" src={"/logo-brand.png"}
                />
            </div>

            {/* <> Login BOX ( Mobile/Desktop ) */}
            {/* Aquí va el componente Client */}
            <LoginForm />

        </section>
    );
};

export default Login;