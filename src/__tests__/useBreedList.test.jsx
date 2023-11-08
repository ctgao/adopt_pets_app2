import { expect, test } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBreedList from "../oldUseBreedList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false, //it usually tries 3 times, but if it fails, we want to know it failed
    },
  },
});

test("gives an empty list with no animal provided", () => {
  const { result } = renderHook(() => useBreedList(""), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  const [breedList, status] = result.current;

  expect(breedList).toHaveLength(0);
  expect(status).toBe("loading");
});

test("gives back breeds when given an animal", async () => {
  const testBreeds = [
    "Melusine",
    "Human",
    "Archon",
    "Dragon",
    "Aranara",
    "Hilichurls",
  ];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  fetch.mockResponseOnce(JSON.stringify({ animal: "dog", breeds: testBreeds }));

  const { result } = renderHook(() => useBreedList("dog"), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  // wait for this to happen, or until it times out
  await waitFor(() => expect(result.current[1]).toBe("success"));

  const [breedList] = result.current;
  expect(breedList).toEqual(testBreeds);
});
