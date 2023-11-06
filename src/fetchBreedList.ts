import { QueryFunction } from "@tanstack/react-query";
import { Animal, BreedListAPIResponse } from "./APIResponsesTypes";

const fetchBreedList: QueryFunction<
  BreedListAPIResponse,
  ["breeds", Animal]
> = async ({ queryKey }) => {
  const type = queryKey[0];
  // no if-statement type checking necessary since typescript will not let you compile!
  const animal = queryKey[1];

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );

  // if the response is not okay, then throw an error
  if (!apiRes.ok) {
    throw new Error(`${type}/${animal} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchBreedList;
