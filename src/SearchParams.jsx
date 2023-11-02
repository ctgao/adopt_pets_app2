import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";

import Results from "./Results";
import AdoptedPetContext from "./AdoptedPetContext";

const ANIMALS = ["rabbit", "cat", "dog", "bird", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [pageNum, setPageNum] = useState(0);
  const [animal, setAnimal] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [adoptedPet, _] = useContext(AdoptedPetContext);

  const [breeeeeeds] = useBreedList(animal);
  const results = useQuery(["search", requestParams, pageNum], fetchSearch);
  const pets = results?.data?.pets ?? [];
  const hasNextPage = results?.data?.hasNext ?? false;

  // this is an example of an UNCONTROLLED FORM
  // this is built into HTML Forms/Javascript
  // with uncontrolled forms, you NEED to have a name
  // that is the ONLY WAY that FormData is able to find the necessary data to extract
  return (
    <div className="my-0 mx-auto flex w-11/12 flex-row">
      <form
        className="mb-10 mr-5 flex h-fit w-96 flex-col items-center justify-center rounded-lg bg-purple-100 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
          setPageNum(0);
        }}
      >
        {adoptedPet ? (
          <div className="mb-3 ml-5 mr-2.5 h-60 w-60">
            <img
              className="rounded-full"
              src={adoptedPet.images[0]}
              alt={adoptedPet.name}
            />
          </div>
        ) : null}

        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
            className="search-input"
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            value={animal}
            className="search-input"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            placeholder="Animal"
          >
            <option />
            {ANIMALS.map((singularAnimal) => (
              <option key={singularAnimal}>{singularAnimal}</option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            name="breed"
            disabled={breeeeeeds.length === 0}
            className="search-input grayed-out-disabled"
            placeholder="Breed"
          >
            <option />
            {breeeeeeds.map((singularBreed) => (
              <option key={singularBreed}>{singularBreed}</option>
            ))}
          </select>
        </label>

        <button className="rounded border border-slate-700 bg-fuchsia-400 px-6 py-2 text-2xl leading-none text-white hover:opacity-50">
          Submit
        </button>
      </form>
      <div>
        <Results pets={pets} />
        <div className="mt-10 flex flex-row justify-center space-x-20 text-5xl">
          <button
            className="rounded-2xl bg-fuchsia-400 pt-1.5 pb-2.5 pl-2 pr-3 text-white hover:opacity-90"
            onClick={() => {
              if (pageNum > 0) setPageNum(pageNum - 1);
            }}
          >
            ◀
          </button>
          <button className="rounded-2xl bg-fuchsia-400 pt-1.5 pb-2.5 pr-2 pl-3 text-white hover:opacity-90"
            onClick={() => {
              if (hasNextPage) setPageNum(pageNum + 1);
            }}>
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchParams;
