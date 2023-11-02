import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext";

// can't await in a render function, it cannot be async
const Details = () => {
  const { id } = useParams();

  // the program controls where you go; don't have to create a link to send the user somehwere
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  const results = useQuery(["details", id], fetchPet);
  const [showModal, setShowModal] = useState(false);
  // placing the modal HERE in details is great because then we can just use the pet information
  // that already exists in the details component and send it along to the modal and CUSTOMIZE it

  if (results.isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <h2 className="m-0 animate-spin p-0 text-8xl">waiting</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="my-0 mx-auto mb-6 w-9/12 rounded-md bg-rose-50 p-4 pt-0 shadow-lg">
      <Carousel images={pet.images} />
      <div className="mx-0 my-2">
        <h1 className="text-center text-6xl text-stone-800">{pet.name}</h1>
        <h2 className="text-center">
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
        </h2>
        <button
          className="mx-auto mb-4 block cursor-pointer rounded border border-slate-700 bg-fuchsia-400 px-6 py-1 leading-none text-white hover:opacity-50"
          onClick={() => setShowModal(true)}
        >
          Adopt {pet.name}
        </button>
        <p className="py-0 px-4 leading-normal">{pet.description}</p>
        {showModal ? (
          <Modal>
            <div className="relative top-1/4 max-h-24 max-w-lg rounded-xl bg-white p-4 text-center">
              <h1 className="mb-2">Would you like to adopt {pet.name}?</h1>
              <div className="space-x-3">
                <button
                  className="inline-block cursor-pointer rounded border border-slate-700 bg-fuchsia-400 px-6 py-1 leading-none text-white hover:opacity-70"
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button
                  className="inline-block cursor-pointer rounded border border-slate-700 bg-fuchsia-400 px-6 py-1 leading-none text-white hover:opacity-70"
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
