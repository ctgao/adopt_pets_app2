import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-api.com" }),
  endPoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    getPet: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      query: (id) => ({ url: "pets", params: { id } }),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
      transformResponse: (response) => response.pets[0],
    }),
  }),
});

export const { useGetPetQuery } = petApi;
