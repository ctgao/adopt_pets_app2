import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Animal, Pet } from "./APIResponsesTypes";

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com" }),
  endpoints: (builder) => ({
    getPet: builder.query({
      query: (id: number | string) => ({ url: "pets", params: { id } }),
      transformResponse: (response: { pets: Pet[] }) => response.pets[0],
    }),
    getBreeds: builder.query({
      query: (animal: Animal) => ({ url: "breeds", params: { animal } }),
      transformResponse: (response: { breeds: string[] }) => response.breeds,
    }),
    search: builder.query({
      query: ({
        animal,
        breed,
        location,
        page,
      }: {
        animal: Animal;
        breed: string;
        location: string;
        page: number;
      }) => ({
        url: "pets",
        params: { animal, breed, location, page },
      }),
      transformResponse: (response: { pets: Pet[]; hasNext: boolean }) => {
        return { pets: response.pets, hasNextPage: response.hasNext };
      },
    }),
  }),
});

export const { useGetPetQuery, useGetBreedsQuery, useSearchQuery } = petApi;
