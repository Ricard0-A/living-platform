"use client";

export default function FullScreenLoader() {
  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex flex-col items-center justify-center
        bg-black backdrop-blur-sm
      "
    >
      {/* Spinner */}
      <div
        className="
          h-16 w-16
          rounded-full
          border-4 border-white/30
          border-t-blue-500
          animate-spin
        "
      />

      {/* Texto */}
      <p className="mt-6 text-white text-lg tracking-wide">
        Checking your session…
      </p>
    </div>
  );
}