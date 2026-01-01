"use client";

import { useState, useEffect } from "react";
import { CircleCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Role = "buyer" | "seller" | "landlord";

const ROLE_CONFIG: Record<
  Role,
  {
    introTitle: string;
    step2Description: string;
    showBudget: boolean;
    step3Title: string;
    step3Description: string;
    benefitsTitle: string;
    benefits: string[];
  }
> = {
  buyer: {
    introTitle: "Introducing to Buyer / Tenant",
    step2Description: "We need this to contact you regarding your interests.",
    showBudget: true,
    step3Title: "What is your approximate budget?",
    step3Description: "Set a minimum and maximum price range.",
    benefitsTitle: "Almost there! Complete your data to find your next home",
    benefits: [
      "Fast access to thousands of properties by location.",
      "One-click booking for viewings and appointments.",
      "Easy comparison of prices, areas, and features.",
      "Secure and direct communication with sellers or landlords.",
      "Save favorites and receive personalized alerts.",
    ],
  },
  seller: {
    introTitle: "Introducing to Seller",
    step2Description: "We need this to contact you regarding your properties.",
    showBudget: false,
    step3Title: "Review your information",
    step3Description:
      "Make sure your contact details are correct before continuing.",
    benefitsTitle: "Almost there! Complete your data to get Seller Benefits",
    benefits: [
      "Publish properties and reach serious buyers.",
      "Manage all your listings from one dashboard.",
      "Track interactions and inquiries in real time.",
      "High visibility for your properties.",
      "Direct communication with buyers.",
    ],
  },
  landlord: {
    introTitle: "Introducing to Landlord",
    step2Description: "We need this to manage your rental properties.",
    showBudget: false,
    step3Title: "Review your information",
    step3Description:
      "Confirm your data so you can start managing your rentals.",
    benefitsTitle: "Almost there! Complete your data to manage your rentals",
    benefits: [
      "Full control over rental properties.",
      "Tenant and contract management.",
      "Track maintenance requests.",
      "Centralized rental administration.",
      "Direct communication with tenants.",
    ],
  },
};

const Form = () => {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role") as Role | null;
  const role: Role =
    roleParam && ROLE_CONFIG[roleParam] ? roleParam : "buyer";
  const config = ROLE_CONFIG[role];

  const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];

  const [currentStep, setCurrentStep] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  //  ESTADOS 
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(-1);
  const [isSaving, setIsSaving] = useState(false);

  // Animación de checks
  useEffect(() => {
    if (!registrationCompleted) return;

    let index = 0;
    const interval = setInterval(() => {
      setActiveBenefitIndex(index);
      index++;
      if (index >= config.benefits.length) clearInterval(interval);
    }, 300);

    return () => clearInterval(interval);
  }, [registrationCompleted, config.benefits.length]);

  const handleContinue = async () => {
    if (currentStep === 0) {
      if (!firstName.trim() || !lastName.trim()) {
        alert("Please complete your name and last name");
        return;
      }
    }

    if (currentStep === 1) {
      if (!phone.trim()) {
        alert("Please enter your phone number");
        return;
      }
    }

    if (currentStep === 2 && config.showBudget) {
      if (!minBudget || !maxBudget) {
        alert("Please enter the budget range");
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      //  FINAL: guardamos y actualizamos rol
      setIsSaving(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await supabase
          .from("users")
          .update({
            name: firstName,
            lastname: lastName,
            phone,
            roles: role,
          })
          .eq("id", user.id);
      }

      setIsSaving(false);
      setRegistrationCompleted(true);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const inputClasses =
    "w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 bg-transparent";
  const sectionTitleClasses =
    "text-xl font-semibold mb-6 text-gray-800";

  return (
    <section className="flex flex-col md:flex-row w-full min-h-screen">
      {/* IZQUIERDA */}
      <div className="md:w-1/2 flex flex-col items-center py-10 px-4 md:px-8 lg:px-16">
        <h1 className="text-[29px] self-start md:self-center mb-8 text-gray-800">
          {config.introTitle}
        </h1>

        {/* STEPPER  */}
        <div className="w-full flex items-center justify-center px-4 max-w-4xl mb-12">
          {steps.map((step, index) => {
            const isLastStep = index === steps.length - 1;
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div
                key={index}
                className={`flex items-center ${
                  isLastStep ? "flex-none" : "flex-1"
                }`}
              >
                <div className="relative flex flex-col items-center z-10">
                  <span
                    className={`mb-2 text-sm font-semibold ${
                      isCompleted || isCurrent
                        ? "text-blue-700"
                        : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                      isCompleted
                        ? "border-blue-700 bg-blue-700 text-white"
                        : isCurrent
                        ? "border-blue-700 bg-white text-blue-700"
                        : "border-gray-300 bg-gray-300"
                    }`}
                  >
                    {isCompleted ? "✓" : null}
                  </div>
                </div>
                {!isLastStep && (
                  <div
                    className={`flex-auto border-t-2 mx-2 mt-6 ${
                      isCompleted ? "border-blue-700" : "border-gray-300"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* FORM */}
        <div className="p-8 rounded-lg shadow-md w-full max-w-md min-h-[300px] flex flex-col justify-between">
          <div>
            {currentStep === 0 && (
              <>
                <h2 className={sectionTitleClasses}>What is your name?</h2>
                <input className={inputClasses} placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input className={inputClasses} placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </>
            )}

            {currentStep === 1 && (
              <>
                <h2 className={sectionTitleClasses}>What is your phone number?</h2>
                <p className="text-sm text-gray-500 mb-2">{config.step2Description}</p>
                <input className={inputClasses} placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2 className={sectionTitleClasses}>{config.step3Title}</h2>
                <p className="text-sm text-gray-500 mb-4">{config.step3Description}</p>

                {config.showBudget ? (
                  <>
                    <input className={inputClasses} placeholder="Min price" value={minBudget} onChange={(e) => setMinBudget(e.target.value)} />
                    <input className={inputClasses} placeholder="Max price" value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)} />
                  </>
                ) : (
                  <div className="text-gray-700 text-sm space-y-2">
                    <p><strong>Name:</strong> {firstName} {lastName}</p>
                    <p><strong>Phone:</strong> {phone}</p>
                  </div>
                )}

                {registrationCompleted && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
                    <strong>Registration completed successfully.</strong>
                    <br />
                    You are now registered as{" "}
                    <span className="font-semibold capitalize">{role}</span>.
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mt-8">
            <button
              onClick={handleContinue}
              disabled={isSaving}
              className="w-full bg-[var(--color-primary)] text-white py-3 rounded-md font-semibold"
            >
              {isSaving
                ? "Saving..."
                : currentStep === steps.length - 1
                ? "Finish Registration"
                : "Continue"}
            </button>

            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-md font-semibold mt-4"
              >
                Back
              </button>
            )}
          </div>
        </div>
      </div>

      {/* DERECHA  */}
      <div className="hidden md:flex md:w-1/2 relative flex-col items-center justify-center p-8 text-white bg-slate-800">
        <div className="absolute inset-0 bg-[#0C02A1] opacity-80 z-10" />
        <div className="absolute inset-0 bg-[url('/dashboard/buyer-background.webp')] bg-cover bg-center" />

        <div className="relative z-10 max-w-md text-center">
          <h1 className="pb-10 text-[29px]">{config.benefitsTitle}</h1>
          <ul className="text-left space-y-3">
            {config.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CircleCheck
                  className={`mr-3 mt-1 transition-all duration-300 ${
                    registrationCompleted && index <= activeBenefitIndex
                      ? "text-green-400 scale-110"
                      : "text-white"
                  }`}
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Form;
