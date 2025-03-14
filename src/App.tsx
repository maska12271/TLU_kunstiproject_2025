import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { TRPCProvider } from "./utils/trpc.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppRouter } from "../server/trpc/routers/_app.js";

import RegistrationPage from "./Pages/RegistrationPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import UnexcitingPage from "./Pages/UnexcitingPage.jsx";
import MainLayout from "./Pages/MainLayout.jsx";

//change later
import TestPageToLogin from "./Pages/TestPageToLogin.jsx";
import AdminPanelPage from "./Pages/AdminPanelPage";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
export default function App() {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: "http://localhost:2022",
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
            });
          },
        }),
      ],
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <BrowserRouter basename={"/TLU_kunstiproject_2025"}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<TestPageToLogin />} />
              <Route path="/admin" element={<AdminPanelPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/*" element={<UnexcitingPage />} />
          </Routes>
        </BrowserRouter>
      </TRPCProvider>
    </QueryClientProvider>
  );
}
