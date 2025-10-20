import Image from "next/image"
import styles from "@/app/login/page.module.css"

const Login = () => {

    const borderTest = {
        borderWidth : "2px",
        borderStyle : "solid",
        borderColor : "lightGray"
    }
    return (
        <section  className={`${styles.loginSection}`}>

            {/* Texto llamativo ( Desktop ) */}
            <div  className="hidden md:block pb-4 text-gray-100 text-4xl ">
                {/* Logo Desktop */}
                <div className="hidden md:flex justify-center">

                    <Image  
                        className="ps-7 scale-160"
                        width={173} height={173} 
                        alt="Main Logo" src={"/logo-brand.png"}
                    />

                </div>
                {/* Texto  */}
                <div className="flex flex-col mt-4 ms-20 gap-14">
                    <p className="font-serif text-shadow-2xs text-center">Make the right move</p>
                    <p className="font-serif text-shadow-2xs">Start living like you deserve</p>
                </div>
            </div>
            

            {/* Logo ( Mobile ) */}
            <div className="md:hidden ps-4 relative -left-4" >
                <Image 
                    className="scale-150" 
                    width={120} height={120}
                    alt="Main Logo" src={"/logo-brand.png"}
                />
            </div>

            {/* Login BOX ( Mobile/Desktop )  */}
            <section className={`${styles.loginBox} `}>
                {/* Cambiar a h1 luego  */}
                <h2 className="
                    self-start inline-block 
                    text-3xl text-shadow-white 
                    font-bold"
                >
                    Sign In
                </h2>
                {/* Input Login */}
                <form className="flex flex-col gap-5" action="">

                    <input className="
                        border-2 border-solid border-gray-300 
                        p-3 bg-white" type="text" placeholder="Email adress"
                     />
                    <input className="
                        border-2 border-solid border-gray-300
                        p-3 bg-white" type="text" placeholder="Password"/>

                    <h2 className="text-blue-900 font-bold">Forgot password?</h2>

                    <div className="mt-2 flex justify-center bg-blue-800 text-white" >
                        <button className="py-2 text-shadow-white font-bold-">Log In</button>
                    </div>
                </form>
                 {/* Info Extra  */}
                 <div className="flex flex-col gap-4 p-4" style={borderTest}>
                    {/* No tienes cuenta? Creala  */}
                    <h2>New over here? <strong className="text-blue-800">Create an account</strong></h2>
                    <p>By sign in you will accept our <strong className="text-blue-800">cookies</strong> to perform a better user experience and protect your privacy</p>
                </div> 
            </section>
        </section>
    )
}

export default Login