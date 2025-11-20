"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";

const Form = () => {
  const steps = [
    { label: "Step 1" },
    { label: "Step 2" },
    { label: "Step 3" },
  ];

  // Inicializamos en 0 para empezar desde el paso 1 (Nombres)
  const [currentStep, setCurrentStep] = useState(0);
  
  // Estados de Formulario 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  const handleContinue = () => {
    // Validación por paso antes de avanzar
    if (currentStep === 0) {
      if (!firstName.trim() || !lastName.trim()) {
        alert("Please complete your name and last name"); // Usaremos algun toast mas adelante
        return;
      }
    } else if (currentStep === 1) {
      if (!phone.trim()) {
        alert("Please enter your phone number");
        return;
      }
    } else if (currentStep === 2) {
      if (!minBudget || !maxBudget) {
        alert("Please enter the budget range");
        return;
      }
      // Enviamos la data
      console.log("Form Completed! Data:", {
        firstName,
        lastName,
        phone,
        budget: { min: minBudget, max: maxBudget }
      });
    }

    // Avanzar paso o finalizar formulario si es el ultimo paso
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Mensaje de exito al final 
      alert("Registration Complete!"); 
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const sellerBenefits = [
    "Fast access to thousands of properties by location.",
    "One-click booking for viewings and appointments.",
    "Easy comparison of prices, areas, and features.",
    "Secure and direct communication with sellers or landlords.",
    "Save favorites and receive personalized alerts.",
  ];

  // Clases reutilizables
  const inputClasses = "w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 bg-transparent";
  const sectionTitleClasses = "text-xl font-semibold mb-6 text-gray-800";

  return (
    <section className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Columna Izquierda (Formulario y Stepper) */}
      <div className="md:w-1/2 flex flex-col items-center py-10 px-4 md:px-8 lg:px-16 ">
        <h1 className="text-2xl font-bold mb-8 text-gray-800 self-start md:self-center">Introducing to Seller</h1>

        {/* Contenedor del Stepper */}
        <div className="w-full flex items-center justify-center px-4 max-w-4xl mb-12">
          {steps.map((step, index) => {
            const isLastStep = index === steps.length - 1;
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div
                key={index}
                className={`flex items-center ${isLastStep ? "flex-none" : "flex-1"}`}
              >
                <div className="relative flex flex-col items-center z-10">
                  <span
                    className={`mb-2 text-sm font-semibold whitespace-nowrap ${
                      isCompleted || isCurrent ? "text-blue-700" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>

                  <div
                    className={`
                      flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300
                      ${
                        isCompleted
                          ? "border-blue-700 bg-blue-700 text-white"
                          : isCurrent
                          ? "border-blue-700 bg-white text-blue-700"
                          : "border-gray-300 bg-gray-300"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          isCurrent ? "bg-blue-700" : "hidden"
                        }`}
                      />
                    )}
                  </div>
                </div>

                {!isLastStep && (
                  <div
                    className={`flex-auto border-t-2 transition-all duration-300 mx-2 mt-6 ${
                      isCompleted ? "border-blue-700" : "border-gray-300"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Contenedor del formulario dinámico */}
        <div className="p-8 rounded-lg shadow-md w-full max-w-md   min-h-[300px] flex flex-col justify-between">
          
          {/* Contenido dinámico según el paso actual */}
          <div>
            {currentStep === 0 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className={sectionTitleClasses}>
                  What is your name?
                </h2>
                <div className="space-y-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputClasses}
                    autoFocus
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={inputClasses}
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className={sectionTitleClasses}>
                  What is your phone number?
                </h2>
                <div className="space-y-6">
                  <p className="text-sm text-gray-500 mb-2">We need this to contact you regarding your properties.</p>
                  <input
                    type="tel"
                    placeholder="Phone Number (e.g. +1 234 567)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClasses}
                    autoFocus
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className={sectionTitleClasses}>
                  What is your approximate budget?
                </h2>
                <div className="space-y-6">
                  <p className="text-sm text-gray-500 mb-2">Set a minimum and maximum price range.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                      <label className="text-xs text-gray-500">Min Price</label>
                      <input
                        type="number"
                        placeholder="$ Min"
                        value={minBudget}
                        onChange={(e) => setMinBudget(e.target.value)}
                        className={inputClasses}
                        autoFocus
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-xs text-gray-500">Max Price</label>
                      <input
                        type="number"
                        placeholder="$ Max"
                        value={maxBudget}
                        onChange={(e) => setMaxBudget(e.target.value)}
                        className={inputClasses}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botones de navegación */}
          <div className="mt-8">
            <button
              onClick={handleContinue}
              className="w-full bg-[var(--color-primary)] text-white py-3 rounded-md font-semibold hover:bg-blue-950 transition-colors duration-200 mb-4 shadow-sm"
            >
              {currentStep === steps.length - 1 ? "Finish Registration" : "Continue"}
            </button>

            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors duration-200"
              >
                <span className="flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  Back
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Columna Derecha (Beneficios) */}
      <div
        className="hidden md:flex md:w-1/2 relative flex-col items-center justify-center p-8 text-white min-h-[50vh] md:min-h-screen bg-slate-800"
        style={{ 
            backgroundImage: "url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
        }}
      >
        {/* Capa overlay azul */}
        <div className="absolute inset-0 bg-[#0C02A1] opacity-80"></div>

        {/* Contenido de la Derecha */}
        <div className="relative z-10 text-center max-w-md">
          <h2 className="text-3xl font-bold mb-6">
            Almost there! Complete your data to get the Seller Benefits
          </h2>
          <ul className="text-left space-y-3">
            {sellerBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-3 mt-1 text-white flex-shrink-0">
                    <CircleCheck width={24} height={24} />
                </div>
                <span className="text-lg text-white/90">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Form;

