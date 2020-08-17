import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

import wordsToNumbers from "words-to-numbers";

import useStyles from "./styles.js";

import { Typography } from "@material-ui/core";
import Modal from "./components/Modal/Modal.js";
import NewsCards from "./components/NewsCards/NewsCards.js";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
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
        } else if (command === "instructions") {
          setIsOpen(true);
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
            console.log("ARTICLE TO OPEN", article);
            window.open(article.url);
            alanBtn().playText("Opening ...");
          }
        }
      },
    });
  }, []);

  const refreshPage = () => {
    window.location.reload(true);
    console.log("REFRESH");
  };

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Open article number [4]
              </Typography>
            </div>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Go back
              </Typography>
            </div>
          </div>
        ) : null}
        <img
          src="https://alan.app/voice/images/previews/preview.jpg"
          className={classes.alanLogo}
          alt="logo"
          onClick={refreshPage}
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <div className={classes.feedback}>
        <Typography variant="body2" color="textSecondary" component="p">
          Wanna give Feedback? Try give feedback
        </Typography>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a
              className={classes.link}
              href="https://www.linkedin.com/in/francoiscoding/"
            >
              {" "}
              Isaiah Francois
            </a>{" "}
            -
            <a
              className={classes.link}
              href="https://francoiscoding.netlify.app/"
            >
              {" "}
              Francois Coding
            </a>
          </Typography>
        </div>
      ) : null}
    </div>
  );
};

export default App;
