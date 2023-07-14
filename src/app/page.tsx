"use client";
import React, { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import Image from "next/image";
import poke from "../../public/pokeball-pokemon-svgrepo-com.svg";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  id: number;
  types: {
    type: {
      name: string;
    };
  }[];
}

const Pokedex: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonCardList, setPokemonCardList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(10); // New state for cards per page
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  const fetchPokemonData = async (page?: number, cardspage?: number) => {
    try {
      setIsLoading(true); // Start loading indicator
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${cardspage ?? cardsPerPage}&offset=${
          ((page ?? currentPage) - 1) * cardsPerPage
        }`
      );
      const data = await response.json();
      setPokemonList(data.results);
      setTotalPages(Math.ceil(data.count / (cardspage ?? cardsPerPage)));
      setIsLoading(false); // Stop loading indicator
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setIsLoading(false); // Stop loading indicator in case of error
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const pokemonWithDetails = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const data: PokemonDetails = await response.json();
          return { ...pokemon, details: data };
        })
      );
      setPokemonCardList(pokemonWithDetails);
    };

    fetchPokemonDetails();
  }, [pokemonList]);

  const handlePrevPage = () => {
    fetchPokemonData(currentPage - 1);
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    fetchPokemonData(currentPage + 1);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(event.target.value);
    if (newPage >= 1 && newPage <= totalPages) {
      fetchPokemonData(newPage);
      setCurrentPage(newPage);
    }
  };

  const handleCardsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCardsPerPage = parseInt(event.target.value);
    setCardsPerPage(newCardsPerPage);
    fetchPokemonData(1, newCardsPerPage); // Fetch data for the first page with the new cards per page value
    setCurrentPage(1); // Reset current page to 1
  };

  return (
    <div className="to-red-800 from-red-600 from-10% to-100% bg-gradient-to-b min-h-screen">
      <h1 className="text-5xl md:text-[80px] font-semibold mb-4 text-center text-white drop-shadow">
        Pokédex
      </h1>
      <div className="flex justify-center items-center mb-5">
        <label htmlFor="cardsPerPage" className="text-white mr-2">
          Cards per Page:
        </label>
        <select
          id="cardsPerPage"
          className="bg-white text-red-800 font-semibold py-2 px-4 rounded hover:bg-red-800 hover:text-white"
          value={cardsPerPage}
          onChange={handleCardsPerPageChange}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="flex pb-5 justify-center mt-4 sm:text-base text-sm mx-auto w-[90vw] sm:w-fit">
        <button
          className="bg-white text-red-800 font-semibold py-2 px-4 rounded-l hover:bg-red-800 hover:text-white"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <input
          type="number"
          className="bg-white text-red-800 font-semibold py-2 px-4 text-center w-20"
          min={1}
          max={totalPages}
          value={currentPage}
          onChange={handlePageChange}
        />
        <span className="bg-white text-red-800 font-semibold py-2 px-4">
          of {totalPages}
        </span>
        <button
          className="bg-white text-red-800 font-semibold py-2 px-4 rounded-r hover:bg-red-800 hover:text-white"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="flex flex-wrap gap-4 justify-evenly px-10">
        {isLoading ? (
          <div className="text-white">Loading...</div>
        ) : (
          pokemonCardList.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              id={pokemon.details?.id}
              imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.details?.id}.png`}
              types={pokemon.details?.types.map((type: any) => type.type.name)}
            />
          ))
        )}
      </div>

      <div className="flex pb-5 justify-center mt-4 sm:text-base text-sm mx-auto w-[90vw] sm:w-fit">
        <button
          className="bg-white text-red-800 font-semibold py-2 px-4 rounded-l hover:bg-red-800 hover:text-white"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <input
          type="number"
          className="bg-white text-red-800 font-semibold py-2 px-4 text-center w-20"
          min={1}
          max={totalPages}
          value={currentPage}
          onChange={handlePageChange}
        />
        <span className="bg-white text-red-800 font-semibold py-2 px-4">
          of {totalPages}
        </span>
        <button
          className="bg-white text-red-800 font-semibold py-2 px-4 rounded-r hover:bg-red-800 hover:text-white"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pokedex;
