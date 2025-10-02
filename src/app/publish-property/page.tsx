"use client";

import { useState } from "react";

const PublishProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    type: "Flat",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();

  //     const { data, error } = await supabase
  //       .from("properties")
  //       .insert([formData]);

  //     if (error) {
  //       console.error("Error publishing:", error.message);
  //       alert("Something went wrong while publishing.");
  //     } else {
  //       console.log("Property published:", data);
  //       alert("Property published successfully 🚀");
  //       setFormData({
  //         title: "",
  //         price: "",
  //         location: "",
  //         type: "Flat",
  //         description: "",
  //       });
  //     }
  //   };

  return (
    <section className="flex justify-center items-center py-10">
      <form
        // onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          Publish a Property (UK)
        </h2>

        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg p-2 focus:ring focus:ring-blue-300"
            placeholder="e.g. Modern flat in London"
          />
        </div>

        <div>
          <label className="block font-medium">Price (£)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg p-2 focus:ring focus:ring-blue-300"
            placeholder="e.g. 1200"
          />
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg p-2 focus:ring focus:ring-blue-300"
            placeholder="e.g. London, UK"
          />
        </div>

        <div>
          <label className="block font-medium">Property Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg p-2 focus:ring focus:ring-blue-300"
          >
            <option>Flat</option>
            <option>House</option>
            <option>Office</option>
            <option>Land</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg p-2 focus:ring focus:ring-blue-300"
            rows={3}
            placeholder="Add details about the property..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Publish
        </button>
      </form>
    </section>
  );
};

export default PublishProperty;
