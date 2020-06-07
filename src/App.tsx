import React from "react";
import Container from "@material-ui/core/Container";

import ThemeProvider from "ThemeProvider";
import StateProvider from "StateProvider";
import SearchBox from "containers/SearchBox";
import UsersList from "containers/UsersList";

function App() {
  return (
    <StateProvider>
      <ThemeProvider>
        <Container maxWidth="sm">
          <header>
            <SearchBox />
          </header>
          <main>
            <UsersList />
          </main>
        </Container>
      </ThemeProvider>
    </StateProvider>
  );
}

export default App;
