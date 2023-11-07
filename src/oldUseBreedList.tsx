import { QueryStatus, useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";
import { Animal } from "./APIResponsesTypes";

export default function useBreedList(animal: Animal) {
  const results = useQuery(["breeds", animal], fetchBreedList);

  // if i don't have results yet, give me an empty array
  // OTHERWISE give me the data like so
  return [results?.data?.breeds ?? [], results.status] as [
    string[],
    QueryStatus
  ];
  // before we added this, useBreedList could potentially return EITHER an array of breeds OR an array of
  // statuses. This is not what we want!!!
  // this is specifically a tuple where the first value is a string array, the second is a status
}