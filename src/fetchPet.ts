import { QueryFunction } from "@tanstack/react-query";
import { PetAPIResponse } from "./APIResponsesTypes";

// if we try to call up fetchPet with incorrect queryKey input, then we'll get an error!
const fetchPet: QueryFunction<PetAPIResponse, ["details", string]> = async ({
  queryKey,
}) => {
  const type = queryKey[0];
  // specifying the details at the top enforces the type down here
  const id = queryKey[1];

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  // if the response is not okay, then throw an error
  if (!apiRes.ok) {
    throw new Error(`${type}/${id} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchPet;
