// this is a fetch query that is ready to be used with React Query
const fetchPet = async ({ queryKey }) => {
  const type = queryKey[0];
  const id = queryKey[1];

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  // if the response is not okay, then throw an error
  if (!apiRes.ok) {
    throw new Error(`${type}/${id} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchPet;
