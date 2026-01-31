"use client";

import useUserStore from "@/app/context/useUserStore";
import FullScreenLoader from "../FullScreenLoader";

export default function MainDashboard() {
  const { user } = useUserStore();
  // Si no existe usuario en la store por ejemplo gracias a un logout, que hacemos? 
  if (!user) return <FullScreenLoader/>

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      {/* HEADER */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold">
          Welcome back 👋
        </h1>
        <p className="mt-2 text-white/70">
          You are logged in as{" "}
          <span className="capitalize text-blue-400 font-semibold">
            {user.roles}
          </span>
        </p>
      </header>

      {/* COMMON STATS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <DashboardCard
          title="Account status"
          value="Active"
          description="Your account is ready to use"
        />

        <DashboardCard
          title="Last login"
          value="Today"
          description="Everything looks good"
        />

        <DashboardCard
          title="Profile"
          value="Completed"
          description="You can update it anytime"
        />
      </section>

      {/* ROLE SPECIFIC CONTENT */}
      {user.roles === "buyer" && <BuyerSection />}
      {user.roles === "seller" && <SellerSection />}
      {user.roles === "landlord" && <LandlordSection />}
    </main>
  );
}

/* -------------------------------- */
/* COMPONENTS */
/* -------------------------------- */

function DashboardCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-6">
      <h3 className="text-sm text-white/60">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-sm text-white/50 mt-1">{description}</p>
    </div>
  );
}

/* -------------------------------- */
/* ROLE SECTIONS */
/* -------------------------------- */

function BuyerSection() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        Your buyer activity
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Saved properties"
          value="0"
          description="You haven't saved any properties yet"
        />

        <DashboardCard
          title="Search preferences"
          value="Set"
          description="Price range & location defined"
        />
      </div>

      <ActionHint text="Start exploring properties to save your favorites." />
    </section>
  );
}

function SellerSection() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        Your seller activity
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Active listings"
          value="0"
          description="You haven't listed any properties yet"
        />

        <DashboardCard
          title="Leads"
          value="0"
          description="No buyers have contacted you yet"
        />
      </div>

      <ActionHint text="Create your first property listing to start receiving leads." />
    </section>
  );
}

function LandlordSection() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        Your landlord activity
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Rental properties"
          value="0"
          description="You don't have rentals yet"
        />

        <DashboardCard
          title="Active tenants"
          value="0"
          description="No active tenants"
        />
      </div>

      <ActionHint text="Add your rental properties to start managing tenants." />
    </section>
  );
}

/* -------------------------------- */

function ActionHint({ text }: { text: string }) {
  return (
    <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-400/20 text-blue-300">
      {text}
    </div>
  );
}
