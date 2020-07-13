import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "./TestingMap.css";

const Map = ReactMapboxGl({
  minZoom: 5,
  maxZoom: 10,
  accessToken:
    "pk.eyJ1IjoibmVlbGtrIiwiYSI6ImNrY2NoaW85bzA0bnMyem54ZnRoNXo3NWQifQ.8YM4J2KD1rR8BABC34Yvww",
});

const TestingMap = (props) => {
  const [locations, setLocations] = useState([]);
  const [locationDet, setLocationDet] = useState([]);
  let flag = true;
  const [mapAttr, setMap] = useState({
    active: null,
    center: [-119.42, 36.77],
    zoom: [5],
    index: -1,
  });
  var markers = [];
  var locDetails = [];

  const flyToOptions = {
    speed: 0.8,
  };

  useEffect(() => {
    const proxyURL = "https://powerful-stream-44018.herokuapp.com/";
    axios
      .get(proxyURL + "https://covid19aggregation.web.app/testing", {
        crossDomain: true,
      })
      .then((response) => {
        setLocations(response.data.centers);
        setLocationDet(response.data.centerDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (locations.length > 0 && flag) {
    markers = locations.map((location, index) => (
      <Feature
        onClick={() => {
          setMap({
            active: location,
            center: location,
            zoom: [13],
            index: index,
          });
        }}
        coordinates={location}
      />
    ));

    locDetails = locationDet.map((loc, index) => {
      return (
        <Card
          style={{
            color: "black",
            backgroundColor: "#f9f9f9",
            width: 550,
            height: 200,
            border: "1px solid black",
          }}
          onClick={() => {
            setMap({
              active: locations[index],
              center: locations[index],
              zoom: [13],
              index: index,
            });
          }}
        >
          <Card.Header
            style={{
              fontSize: 12,
              fontStyle: "bold",
            }}
          >
            {loc.name}
          </Card.Header>
          <Card.Body style={{ fontSize: 13, fontStyle: "normal" }}>
            <p> {loc.description} </p>
            <footer className="blockquote-footer">
              {loc.physical_address[0].address_1 +
                " " +
                loc.physical_address[0].city +
                " " +
                loc.physical_address[0].country}
            </footer>
          </Card.Body>
        </Card>
      );
    });

    flag = false;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "130px" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            maxHeight: 500,
            overflow: "auto",
          }}
        >
          {locations.length > 0 ? locDetails : null}
        </div>
        <div>
          <Map
            style="mapbox://styles/neelkk/ckci6l60k28751ipef75evguy"
            center={mapAttr.center}
            containerStyle={{ width: 680, height: 500 }}
            zoom={mapAttr.zoom}
            flyToOptions={flyToOptions}
          >
            {locations.length > 0 ? (
              <Layer
                type="circle"
                id="marker"
                paint={{
                  "circle-color": "#ff5200",
                  "circle-stroke-width": 1,
                  "circle-stroke-color": "#fff",
                  "circle-stroke-opacity": 1,
                }}
              >
                {markers}
              </Layer>
            ) : null}
            {mapAttr.active ? (
              <Popup
                coordinates={mapAttr.active}
                onClose={() => setMap(...mapAttr, { active: null })}
              >
                <div>
                  <p>
                    <b>{locationDet[mapAttr.index].name}</b>
                  </p>
                  <p>
                    <b>
                      {locationDet[mapAttr.index].phones.length > 0
                        ? locationDet[mapAttr.index].phones[0].number
                        : null}
                    </b>
                  </p>
                  <p>
                    <b>
                      {locationDet[mapAttr.index].physical_address[0]
                        .address_1 +
                        " " +
                        locationDet[mapAttr.index].physical_address[0].city +
                        " " +
                        locationDet[mapAttr.index].physical_address[0].country}
                    </b>
                  </p>
                </div>
              </Popup>
            ) : null}
          </Map>
        </div>
      </div>
    </div>
  );
};
export default TestingMap;
