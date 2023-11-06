import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetPetQuery } from "./petApiService";
import { adopt } from "./adoptedPetSlice";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import { Pet } from "./APIResponsesTypes";

const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  if (!id) {
    throw new Error("Why no ID? I want an ID!!!");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
  const { isLoading, data: pet }: { isLoading: boolean; data: Pet } =
    useGetPetQuery(id);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <h2 className="m-0 animate-spin p-0 text-8xl">waiting</h2>
      </div>
    );
  }

  if (!pet) {
    throw new Error("no pet :(");
  }

  return (
    <div className="my-0 mx-auto mb-6 w-9/12 rounded-md bg-rose-50 p-4 pt-0 shadow-lg">
      <Carousel images={pet.images} />
      <div className="mx-0 my-2">
        <h1 className="mb-4 text-center text-6xl text-stone-800">{pet.name}</h1>
        <h2 className="mb-1 text-center">
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
        </h2>
        <button
          className="mx-auto mb-4 block cursor-pointer rounded border border-slate-700 bg-fuchsia-400 px-6 py-1 text-xl leading-none text-white hover:opacity-50"
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
                    dispatch(adopt(pet));
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

// since there are no props being passed down, we can just remove that.
// but it's good practice to keep the props being passed through the Specific ErrorBoundary to the
// the component inside
function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
