import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import "./NewsApi.css";
import { Animated } from "react-animated-css";

export default class NewsAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], titles: [], images: [] };
  }

  componentDidMount() {
    var convert = require("xml-js");
    const proxyURL = "https://cors-anywhere.herokuapp.com/";

    axios
      .get(proxyURL + "https://news.google.com/rss/search", {
        params: {
          q: this.props.selectedCounty + " california coronavirus",
        },
      })
      .then((response) => {
        var json = JSON.parse(
          convert.xml2json(response.data, { compact: true, spaces: 4 })
        );

        this.setState({ articles: json.rss.channel.item });
      });
  }

  renderContent(i) {
    if (
      (this.state.articles.length > 0) &
      (this.props.selectedCounty.length > 1)
    ) {
      return (
        <Row>
          <a href={this.state.articles[i].link._text}>
            <Card
              className="bg-dark text-white text-white hovering"
              style={{
                width: "600px",
                height: "100px",
                background: "linear-gradient(to right, red, white)",
              }}
            >
              <Card.Title style={{ color: "black" }}>
                <em>{this.state.articles[i].title._text}</em>
              </Card.Title>

              <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card>
          </a>
        </Row>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="content" style={{ border: "5 px solid black" }}>
          <img
            src="https://images.unsplash.com/photo-1560177112-fbfd5fde9566?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
            style={{ width: "600px", height: "600px", float: "left" }}
          />

          <div className="Multi-NewsCards" style={{}}>
            {this.renderContent(0)}
            {this.renderContent(1)}
            {this.renderContent(2)}
            {this.renderContent(3)}
            {this.renderContent(4)}
            {this.renderContent(5)}
          </div>
        </div>
      </div>
    );
  }
}
