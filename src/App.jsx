import React from "react";
import Child from "./Child";
import Title from "./Title";
import Home from "./Home";
import { UserContext } from "./context/Context";

function App() {
  const fruits = {
    apple: "red",
    banana: "yellow",
    grape: "purple",
  };

  return (
    <UserContext.Provider value={fruits}>
      <Home />
      <Title />
    </UserContext.Provider>
  );
}

export default App;
