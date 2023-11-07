import { expect, test } from "vitest";
import { renderHook } from "@testing-library/react";
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

// all of this was a hassle, let's start from SCRATCH!
// function getBreedList(animal) {
//   let list;
//   // our fake test React component
//   function TestComponent() {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//     list = useBreedList(animal);
//     return null;
//   }
//
//   render(
//     <QueryClientProvider client={queryClient}>
//       <TestComponent />
//     </QueryClientProvider>
//   );
//   return list;
// }
//
// test("gives an empty list with no animal provided", () => {
//   const [breedList, status] = getBreedList();
//
//   expect(breedList).toHaveLength(0);
//   expect(status).toBe("loading");
// });

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
