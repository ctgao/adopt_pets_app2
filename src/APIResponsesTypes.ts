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
