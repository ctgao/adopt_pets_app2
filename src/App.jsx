import { useState, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AdoptedPetContext from "./AdoptedPetContext";

// we're gonna load this LATER
const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPetHook = useState(null);

  return (
    <div
      className="m-0 p-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperB.jpg)",
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-4">
                <h2 className="m-0 animate-spin p-0 text-8xl">loading</h2>
              </div>
            }
          >
            <AdoptedPetContext.Provider value={adoptedPetHook}>
              <header className="mb-6 w-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-6 text-center">
                <Link
                  className="text-5xl text-white hover:text-gray-200"
                  to={"/"}
                >
                  Adopt Me Please!
                </Link>
              </header>
              <Routes>
                <Route index element={<SearchParams />} />
                <Route path="/details/:id" element={<Details />} />
              </Routes>
            </AdoptedPetContext.Provider>
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
