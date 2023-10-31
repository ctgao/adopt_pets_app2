import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal){
  const results = useQuery(["breeds", animal] ,fetchBreedList);

  // if i don't have results yet, give me an empty array
  // OTHERWISE give me the data like so
  return [results?.data?.breeds ?? [], results.status];
}