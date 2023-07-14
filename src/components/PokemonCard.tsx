import { getPokemonColor } from "@/app/utils/functions";
import React from "react";

interface PokemonCardProps {
  name: string;
  id: number;
  imageUrl: string;
  types: string[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  id,
  imageUrl,
  types,
}) => {
  return (
    <div className=" shadow-inner min-w-[200px] shadow-slate-600 bg-slate-300 w-1/6 rounded-lg p-4 transition-all duration-300 hover:scale-125 cursor-pointer hover:shadow-lg hover:bg-slate-100">
      <img src={imageUrl} alt={name} className="mx-auto" />
      <h2 className="text-center font-semibold text-lg mt-2">{name}</h2>
      <p className="text-center">ID: {id}</p>
      <div className="flex justify-center mt-4">
        {types.map((type) => {
          const color = getPokemonColor(type);
          return (
            <span
              key={type}
              className={
                "rounded-ful px-4 py-1 text-sm font-semibold text-gray-100 drop-shadow mr-2 rounded-lg " + `${color}`
              }
            >
              {type}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonCard;
