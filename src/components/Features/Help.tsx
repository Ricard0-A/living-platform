const News = () => {
  return (
    <section
      className="relative mt-13 w-full min-h-100 text-white md:mt-20 "
      style={{
        backgroundImage: "url('/homes/news-image-2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: "",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      {/* Content  */}
      <div
        className="
        relative z-10 flex flex-col pt-13 ps-10 h-full max-w-100 gap-12
        md:max-w-170 md:ps-30 "
      >
        <div
          className="
        flex justify-center  py-3 w-[50%] text-2xl
        border-blue-900 bg-blue-500/20 border-2 border-solid
         md:py-4 md:text-4xl
        "
        >
          <h2> Need Help ?</h2>
        </div>
        <p className=" md:text-xl">
          Discover the perfect flat for your lifestyle with guidance and
          exclusive tips from our property experts.
        </p>
        <button className="w-[40%] p-3 bg-white/10 rounded-lg  md:w-[30%]">
          Take Me There
        </button>
      </div>
    </section>
  );
};

export default News;
