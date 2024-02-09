import React, { useState, useEffect } from "react";
import MoveCard from "./components/MoveCard";
import "./App.css";

// Define an interface for the structure of each headline item
interface Headline {
  headline: string;
  paragraph: string;
}

function App() {
  // Use the Headline interface to type the initial state
  const [headlines, setHeadlines] = useState<Headline[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/headlines")
      .then((response) => response.json())
      .then((data) => {
        // Assuming data.headlines is an array of objects conforming to the Headline interface
        setHeadlines(data.headlines);
      })
      .catch((error) => console.error("Error fetching headlines:", error));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 xl:grid-cols-4">
      {headlines.slice(0, -2).map((move, index) => (
        <MoveCard
          key={index}
          titleName={move.headline} // Access the 'headline' property
          description={move.paragraph} // Access the 'paragraph' property
        />
      ))}
    </div>
  );
}

export default App;
