import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Pet } from "./APIResponsesTypes";

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com" }),
  endpoints: (builder) => ({
    getPet: builder.query({
      query: (id: number | string) => ({ url: "pets", params: { id } }),
      transformResponse: (response: { pets: Pet[] }) => response.pets[0],
    }),
  }),
});

export const { useGetPetQuery } = petApi;
