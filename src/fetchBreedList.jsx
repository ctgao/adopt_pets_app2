// this is a fetch query that is ready to be used with React Query
const fetchBreedList = async ({ queryKey }) => {
  const type = queryKey[0];
  const animal = queryKey[1];

  // just in case you have an error where there is no animal specified
  if(!animal) return [];

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);

  // if the response is not okay, then throw an error
  if (!apiRes.ok) {
    throw new Error(`${type}/${animal} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchBreedList;
