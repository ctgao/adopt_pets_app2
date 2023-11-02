import { Link } from "react-router-dom";

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`details/${id}`} className="relative block h-fit">
      <div className="float-left my-0 ml-5 mr-2.5">
        <img src={hero} alt={name} />
      </div>
      <div className="absolute bottom-0 left-5 bg-gradient-to-tr from-white to-transparent pr-2 pt-1 pl-1.5 pb-0.5">
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {location}
        </h2>
      </div>
    </Link>
  );
};

export default Pet;
