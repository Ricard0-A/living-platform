import { ChevronDown, ChevronsRight } from "lucide-react";

type CardProps = {
  value: string;
  text: string;
  isTouched: boolean;
  onActivate: () => void;
  onDesactivate: () => void;
};

const Card = ({
  value,
  text,
  isTouched,
  onActivate,
  onDesactivate,
}: CardProps) => {
  return (
    // Padre de todas las Cards
    <div
      className="relative flex flex-col items-center justify-center w-full min-h-[250px] transition-all bg-blue-900/20"
      onPointerDown={onActivate}
      onPointerUp={onDesactivate}
      onPointerEnter={onActivate}
      onPointerLeave={onDesactivate}
    >
      {/* Arrow's Box */}
      <div
        className={`flex justify-between absolute top-1 md:top-0 w-[99%] ${
          isTouched ? "scale-x-[1.02]" : "scale-x-[0.99]"
        } transition-transform duration-200 ease-in-out `}
      >
        <ChevronDown
          className={`rotate-[130deg] ${
            isTouched ? "scale-110" : ""
          } transition-transform duration-300 ease-in-out`}
          size={40}
          color="blue"
          absoluteStrokeWidth
        />
        <ChevronDown
          className={`rotate-[-130deg] ${
            isTouched ? "scale-110" : ""
          } transition-transform duration-300 ease-in-out`}
          size={40}
          color="blue"
          absoluteStrokeWidth
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 items-center justify-center w-[95%] px-7 pb-7.5">
        <h2 className="text-4xl text-[#2746A5]">{value}</h2>
        <p className="text-center">{text}</p>
      </div>

      {/* Play Button */}
      <div className="absolute bottom-6 w-full flex justify-center">
        {/* Mobil */}
        <div
          className={`${
            isTouched ? "scale-110" : ""
          } hidden md:block text-lg text-[#2746A5] transition-transform duration-200 ease-in-out`}
        >
          <p>See more details</p>
        </div>
        {/* Desktop */}
        <ChevronsRight
          className={`md:hidden ${
            isTouched ? "opacity-100" : "opacity-40"
          } transition-opacity duration-300 ease-in-out text-blue-800 `}
          size={35}
        />
      </div>
    </div>
  );
};

export default Card;
