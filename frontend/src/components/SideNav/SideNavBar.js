import React from "react";
import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";

class SideNavBar extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundImage:
            "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1789&q=80",
        }}
      >
        <Sidebar.Pusher style={{ opacity: 0.4 }}>
          <Sidebar
            as={Menu}
            animation="push"
            direction="left"
            icon="labeled"
            inverted
            visible="true"
            vertical
            width="thin"
          >
            <Menu.Item
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              as="a"
            >
              <Icon name="home" />
              Home
            </Menu.Item>

            <Menu.Item
              onClick={() => {
                window.scrollTo({ top: 850, behavior: "smooth" });
              }}
              as="a"
            >
              <Icon name="chart line" />
              Case Statistics
            </Menu.Item>

            <Menu.Item
              onClick={() => {
                window.scrollTo({ top: 1760, behavior: "smooth" });
              }}
              as="a"
            >
              <Icon name="newspaper outline" />
              News
            </Menu.Item>

            <Menu.Item
              onClick={() => {
                window.scrollTo({ top: 2580, behavior: "smooth" });
              }}
              as="a"
            >
              <Icon name="food" />
              Restaurants
            </Menu.Item>

            <Menu.Item
              onClick={() => {
                window.scrollTo({ top: 3400, behavior: "smooth" });
              }}
              as="a"
            >
              <Icon name="youtube play" />
              Governor Livestreams
            </Menu.Item>

            <Menu.Item
              onClick={() => {
                window.scrollTo({ top: 4270, behavior: "smooth" });
              }}
              as="a"
            >
              <Icon name="map marker alternate" />
              Testing Sites
            </Menu.Item>
          </Sidebar>
        </Sidebar.Pusher>
      </div>
    );
  }
}

export default SideNavBar;
