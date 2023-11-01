import Pet from "./Pet";

// <Pet {...pet} key={pet.id} />
// the {...pet} is a SPREAD function
// it passes everything along to the component or js object that it's being used for
// do we want to pass everything? the REAL questions
const Results = ({ pets }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pets.length ? (
        pets.map((p) => (
          <Pet
            key={p.id}
            id={p.id}
            animal={p.animal}
            name={p.name}
            breed={p.breed}
            location={`${p.city}, ${p.state}`}
            images={p.images}
          />
        ))
      ) : (
        <h1>No Pets Found</h1>
      )}
    </div>
  );
};

export default Results;
