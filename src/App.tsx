import SeacrhPage from "./components/SearchPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const query = new QueryClient();

  return (
    <QueryClientProvider client={query}>
      <SeacrhPage />
    </QueryClientProvider>
  );
}

export default App;
