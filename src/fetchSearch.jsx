async function fetchSearch({ queryKey }) {
  const { animal, location, breed } = queryKey[1];
  const pageNum = queryKey[2];

  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}&page=${pageNum}`
  );

  if (!res.ok) {
    throw new Error(`pet search not okay w/ ${animal}, ${location}, ${breed}`);
  }

  return res.json();
}

export default fetchSearch;
