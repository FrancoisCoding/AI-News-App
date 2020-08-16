import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

const App = () => {
  const [newArticles, setNewsArticles] = useState([]);
  const alanKey =
    "02c15c3b2c68587db38042b771d735652e956eca572e1d8b807a3e2338fdd0dc/stage";
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
        }
      },
    });
  }, []);
  return (
    <div>
      <h1>Alan AI News Application</h1>
    </div>
  );
};

export default App;
