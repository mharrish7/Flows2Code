import { MantineProvider } from "@mantine/core";
import Router from "@router";
import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider >
      <Router />
    </MantineProvider>
  );
}

export default App;
