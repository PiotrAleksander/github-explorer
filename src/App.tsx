import React from "react";

import ThemeProvider from "ThemeProvider";
import StateProvider from "StateProvider";
import SearchBox from "containers/SearchBox";
import UsersList from "containers/UsersList";

function App() {
  return (
    <StateProvider>
      <ThemeProvider>
        <header>
          <SearchBox />
          <UsersList />
        </header>
      </ThemeProvider>
    </StateProvider>
  );
}

export default App;
