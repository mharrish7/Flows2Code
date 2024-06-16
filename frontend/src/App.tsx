import { MantineProvider } from "@mantine/core";
import Router from "@router";

function App() {
  return (
    <MantineProvider withNormalizeCSS >
      <Router />
    </MantineProvider>
  );
}

export default App;
