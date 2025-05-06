import { Outlet, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FrameContainer from "./components/layout/FrameContainer";
import { UpProvider } from "./components/upProvider";

// Create a client
const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <QueryClientProvider client={queryClient}>
      <UpProvider>
        <div
          className={`min-h-screen ${
            isLandingPage
              ? ""
              : "bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8"
          }`}
        >
          {isLandingPage ? (
            <Outlet />
          ) : (
            <FrameContainer>
              <Outlet />
            </FrameContainer>
          )}
        </div>
      </UpProvider>
    </QueryClientProvider>
  );
}

export default App;
