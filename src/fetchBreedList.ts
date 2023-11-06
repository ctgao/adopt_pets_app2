import { QueryFunction } from "@tanstack/react-query";
import { Animal, BreedListAPIResponse } from "./APIResponsesTypes";

const fetchBreedList: QueryFunction<
  BreedListAPIResponse,
  ["breeds", Animal]
> = async ({ queryKey }) => {
  const type = queryKey[0];
  const animal = queryKey[1];

  // no if-statement type checking necessary since typescript will not let you compile!
  // THE ABOVE STATEMENT IS A LIE!!! I GOT ERRORS!!!
  // Why? because when animal is first declared and passed into this query, animal is "" meaning that all
  // API calls return 400 (Bad Request). We need this statement to REFUSE the fetch statement when animal
  // doesn't have a value even though it's considered "valid" since we did some typechecking earlier
  if(!animal) return [];

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
