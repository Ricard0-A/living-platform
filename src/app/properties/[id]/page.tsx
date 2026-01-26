"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Modal + form
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        router.push("/properties");
        return;
      }

      setProperty(data);
      setLoading(false);
    };

    fetchProperty();
  }, [id, router]);

  const handleCreateAppointment = async () => {
    if (!date || !time) {
      alert("Please complete date and time");
      return;
    }

    setSubmitting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.from("appointments").insert({
      property_id: property.id,
      client_id: user.id,
      seller_id: property.seller_id,
      date,
      time,
      status: "pending",
    });

    setSubmitting(false);

    if (error) {
      console.error(error);
      alert("Error scheduling appointment");
      return;
    }

    setShowAppointmentModal(false);
    setDate("");
    setTime("");
    alert("Request sent to the seller");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1c2d] text-white">
        Loading property...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1c2d] text-white">
      {/* HERO */}
      <div className="relative h-[55vh] w-full">
        <Image
          src={property.main_image}
          alt={property.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-8 left-8">
          <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
          <p className="text-lg text-gray-200">{property.location}</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* MAIN */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-[#112a45] rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-200 leading-relaxed">
              {property.description}
            </p>
          </section>

          <section className="bg-[#112a45] rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <DetailItem label="Bedrooms" value={property.bedrooms} />
              <DetailItem label="Bathrooms" value={property.bathrooms} />
              <DetailItem label="Area" value={`${"130"} m²`} />
              <DetailItem label="Type" value={"Flat"} />
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="bg-[#112a45] rounded-2xl p-6 space-y-6 h-fit">
          <div>
            <p className="text-gray-400 text-sm">Price</p>
            <p className="text-3xl font-bold text-blue-400">
              ${property.price}
            </p>
          </div>

          <button
            onClick={() => setShowAppointmentModal(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold"
          >
            Schedule visit
          </button>

          <button
            onClick={() => router.push("/properties")}
            className="w-full border border-blue-500 rounded-xl py-3 hover:bg-blue-500/10"
          >
            Back to properties
          </button>
        </aside>
      </div>

      {/* MODAL */}
      {showAppointmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#112a45] rounded-2xl w-full max-w-md p-6 space-y-6">
            <h3 className="text-2xl font-semibold text-center">
              Schedule visit
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl bg-[#0b1c2d] border border-blue-500/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-xl bg-[#0b1c2d] border border-blue-500/30 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="w-full border border-blue-500 rounded-xl py-2 hover:bg-blue-500/10"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateAppointment}
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-2 font-semibold disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-[#0b1c2d] rounded-xl p-4">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
