"use client";

import { useEffect, useState } from "react";
import useUserStore from "@/app/context/useUserStore";
import { supabase } from "@/lib/supabaseClient";
import FullScreenLoader from "@/components/FullScreenLoader";

type UnsplashPhoto = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
};

export default function CreatePropertyForm() {
  const { user } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [imagesLoading, setImagesLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    bedrooms: 1,
    bathrooms: 1,
  });

  const [unsplashImages, setUnsplashImages] = useState<UnsplashPhoto[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // ==============================
  // Fetch Unsplash images
  // ==============================
  const fetchImages = async () => {
    setImagesLoading(true);

    const res = await fetch("/api/unsplash?query=apartment");
    const data = await res.json();

    setUnsplashImages(data.results);
    setImagesLoading(false);
  };

  // ==============================
  // Toggle image selection
  // ==============================
  const toggleImage = (url: string) => {
    setSelectedImages((prev) =>
      prev.includes(url)
        ? prev.filter((img) => img !== url)
        : [...prev, url]
    );
  };

  // ==============================
  // Submit property
  // ==============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    setLoading(true);

    const payload = {
      seller_id: user.id,
      title: form.title,
      price: Number(form.price),
      description: form.description,
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      images: selectedImages,
      main_image: selectedImages[0] || null,
    };

    const { error } = await supabase
      .from("properties")
      .insert(payload);

    setLoading(false);

    if (error) {
      console.error("Error creating property:", error.message);
      return;
    }

    // Reset
    setForm({
      title: "",
      price: "",
      description: "",
      bedrooms: 1,
      bathrooms: 1,
    });
    setSelectedImages([]);
    setUnsplashImages([]);

    alert("Propiedad publicada con éxito 🚀");
  };

  if (!user) return <FullScreenLoader/>

  return (
    <div className="bg-[url('/dashboard/client-first-image.jpg')] relative bg-cover min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="inset-0 bg-black/50 opacity-80 absolute " />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8 space-y-8"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Publicar propiedad
          </h1>
          <p className="text-slate-500">
            Completa la información del departamento
          </p>
        </div>

        {/* Title */}
        <input
          type="text"
          placeholder="Título del anuncio"
          className="w-full border rounded-xl p-4"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Precio"
          className="w-full border rounded-xl p-4"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-2 gap-4">
          <select
            className="border rounded-xl p-4"
            value={form.bedrooms}
            onChange={(e) =>
              setForm({ ...form, bedrooms: Number(e.target.value) })
            }
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} dormitorios
              </option>
            ))}
          </select>

          <select
            className="border rounded-xl p-4"
            value={form.bathrooms}
            onChange={(e) =>
              setForm({ ...form, bathrooms: Number(e.target.value) })
            }
          >
            {[1, 2, 3].map((n) => (
              <option key={n} value={n}>
                {n} baños
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <textarea
          placeholder="Descripción"
          className="w-full border rounded-xl p-4 min-h-[120px]"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        {/* Images */}
        <div>
          <button
            type="button"
            onClick={fetchImages}
            className="mb-4 px-4 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700"
          >
            {imagesLoading ? "Cargando..." : "Buscar imágenes (Unsplash)"}
          </button>

          <div className="grid grid-cols-3 gap-4">
            {unsplashImages.map((img) => (
              <div
                key={img.id}
                className={`cursor-pointer rounded-xl overflow-hidden border-4 ${
                  selectedImages.includes(img.urls.regular)
                    ? "border-blue-600"
                    : "border-transparent"
                }`}
                onClick={() => toggleImage(img.urls.regular)}
              >
                <img
                  src={img.urls.small}
                  alt=""
                  className="w-full h-32 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-blue-900 text-white text-lg font-semibold hover:bg-blue-800"
        >
          {loading ? "Publicando..." : "Publicar propiedad"}
        </button>
      </form>
    </div>
  );
}
