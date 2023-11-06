import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

// typescript will need for you to have a default value, but right now we don't need one
// haha we're on typescript now so that above comment came true!
const AdoptedPetContext = createContext<
  [Pet | null, (adoptedPet: Pet) => void]
>([
  {
    id: 1827,
    name: "Peppy",
    animal: "dog",
    description: "Asta's puppy! But Arlan is taking care of them",
    breed: "White Pomeranian",
    images: [],
    city: "Master Control Zone",
    state: "Herta's Space Station",
  },
  () => {},
]);
// setting the type like this means this CANNOT be null!!!

export default AdoptedPetContext;
