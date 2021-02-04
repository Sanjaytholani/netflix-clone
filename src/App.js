import React, { useEffect, useState } from "react";
import "./App.css";
import HomeScreen from "./components/HomeScreen";
import Intro from "./components/Intro";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      await setLoading(false);
    }, 5500);
  }, []);
  return loading ? (
    <Intro />
  ) : (
    <div className="app">
      <HomeScreen />
    </div>
  );
}

export default App;
