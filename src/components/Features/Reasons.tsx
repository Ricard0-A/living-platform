import { useState } from "react";
import Card from "./Card";

const Features = () => {
  const [touchedIndex, setTouchedIndex] = useState<number | null>(null);

  const cardsData = [
    {
      value: "92%",
      text: "92% of listed properties receive inquiries within the first 48 hours.",
    },
    {
      value: "1350+",
      text: "More than 1,350 clients satisfied , thanks to our friendly service and professional management",
    },
    {
      value: "5000",
      text: "Over 5,000 apartments and houses listed for sale and rent, all verified for safety and reliability.",
    },
  ];

  // 1- Unificar luego el title "What Make Us Different" y su contenido, es necesario hacerlo

  return (
    <section className="mt-40  md:mt-20">
      {/* Title */}
      <div className="flex justify-between items-center mb-12 md:justify-evenly md:mb-18 ">
        {/* Desktop Line  */}
        <div className="md:hidden h-3 w-10  bg-[#B8C9D6]" />
        {/* Mobile Line  */}
        <div className="hidden md:flex justify-center gap-9 w-[20%] rounded ">
          <div className="h-7 w-7 rounded-4xl bg-[#B8C9D6]" />
          <div className="h-7 w-7 rounded-4xl bg-[#B8C9D6]" />
          <div className="h-7 w-7 rounded-4xl bg-[#B8C9D6]" />
        </div>
        <h2
          style={{
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.25)",
          }}
          className=" text-2xl  text-[#112D6F] md:text-3xl"
        >
          What Makes Us Different
        </h2>
        {/* Desktop Line  */}
        <div className="md:hidden h-3 w-10 rounded bg-[#B8C9D6]" />
        {/* Mobile Line  */}
        <div className="hidden md:flex justify-center gap-9 w-[20%] rounded ">
          <div className="h-7 w-7 rounded-4xl bg-[#B8C9D6]" />
          <div className="h-7 w-7 rounded-4xl bg-[#B8C9D6]" />
          <div className="h-7 w-7 rounded-4xl bg-[#B8C9D6]" />
        </div>
      </div>

      {/* Cards */}
      <div className=" px-5 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-[300px_300px_300px] lg:justify-evenly lg:min-h-80 ">
        {/* Da el indice de cada objeto  */}
        {cardsData.map((card, index) => (
          <Card
            key={index}
            value={card.value}
            text={card.text}
            isTouched={touchedIndex === index}
            onActivate={() => setTouchedIndex(index)}
            onDesactivate={() => setTouchedIndex(null)}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
