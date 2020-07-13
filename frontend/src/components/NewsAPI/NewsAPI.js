import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ItemsCarousel from "react-items-carousel";

import "./NewsApi.css";
import { Animated } from "react-animated-css";

const NewsAPI = (props) => {
  const [articles, setArticles] = useState([]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 10;

  useEffect(() => {
    var convert = require("xml-js");
    const proxyURL = "https://powerful-stream-44018.herokuapp.com/";

    axios
      .get(proxyURL + "https://bing.com/news/search", {
        crossDomain: true,
        params: {
          q: props.selectedCounty + " county california coronavirus",
          format: "rss",
        },
      })
      .then((response) => {
        var json = JSON.parse(
          convert.xml2json(response.data, { compact: true, spaces: 4 })
        );

        setArticles(json.rss.channel.item);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  function renderContent() {
    if ((articles.length > 0) & (props.selectedCounty.length > 1)) {
      return articles.slice(0, 6).map((article) => {
        return (
          <Col md={12} lg={12} className="hovering" style={{}}>
            <div
              style={{
                border: "1px solid black",
                borderRadius: "55px",
                overflow: "hidden",
              }}
            >
              <a
                href={article.link._text}
                className="card"
                style={{
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "row",
                  height: 180,
                }}
              >
                <div className="image">
                  {article["News:Image"] ? (
                    <img
                      src={article["News:Image"]._text}
                      style={{
                        width: 270,
                        height: 180,
                        float: "left",
                        opacity: 1,
                      }}
                    />
                  ) : (
                    <img
                      style={{
                        width: 270,
                        height: 180,
                        float: "left",
                        opacity: 1,
                      }}
                      src="https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"
                    />
                  )}
                </div>
                <Card style={{ color: "black", backgroundColor: "#f9f9f9" }}>
                  <Card.Header
                    style={{
                      fontSize: 20,
                      fontStyle: "bold",
                    }}
                  >
                    {article.title._text}
                  </Card.Header>
                  <Card.Body style={{ fontSize: 8, fontStyle: "normal" }}>
                    <blockquote className="blockquote mb-0">
                      <p style={{ margin: 6 }}> {article.description._text} </p>
                      <footer className="blockquote-footer">
                        {article.pubDate._text}
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              </a>
            </div>
          </Col>
        );
      });
    }
  }

  return (
    <div className="Multi-NewsCards">
      <Container>
        <Row>{renderContent()}</Row>
      </Container>
    </div>
  );
};

export default NewsAPI;
