import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

import wordsToNumbers from "words-to-numbers";

import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles.js";

const App = () => {
  const [newArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();

  const alanKey =
    "02c15c3b2c68587db38042b771d735652e956eca572e1d8b807a3e2338fdd0dc/stage";
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText("Please select a smaller number and try again");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening ...");
          }
        }
      },
    });
  }, []);
  return (
    <div className={classes.main}>
      <div className={classes.logoContainer}>
        <img
          src="https://alan.app/voice/images/previews/preview.jpg"
          alt="Alan AI Logo"
          className={classes.alanLogo}
        />
      </div>
      <NewsCards articles={newArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
