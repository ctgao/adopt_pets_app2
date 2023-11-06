// typing animal like this might not be worth it IF animal types keep getting added
// for our case, we'll only ever have these types so this is fine
export type Animal = "dog" | "cat" | "bird" | "reptile" | "rabbit";

// some people like calling it IPet (might be a .NET thing)
// hey that's funny, JHipster does that :O
export interface Pet {
  id: number;
  name: string;
  animal: Animal;
  description: string;
  breed: string;
  images: string[];
  city: string;
  state: string;
}

export interface PetAPIResponse {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: Pet[];
}

export interface BreedListAPIResponse {
  animal: Animal;
  breeds: string[];
}
