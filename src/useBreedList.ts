import { useGetBreedsQuery } from "./petApiService";
import { Animal } from "./APIResponsesTypes";

export default function useBreedList(animal: Animal) {
  const { data: breeds, isLoading }: { data?: string[]; isLoading: boolean } =
    // what we're doing here is using this "skip" property to tell our function to not run this query
    // when the condition isn't met, thereby saving tons of time
    useGetBreedsQuery(animal, { skip: !animal });

  if (!animal) return [[], "loaded"] as [string[], string];

  return [breeds ?? [], isLoading ? "loading" : "loaded"] as [string[], string];
}
