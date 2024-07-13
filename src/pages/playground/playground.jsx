import React from "react";
import photo1 from "./photo.jpg";
import photo2 from "./photo2.jpg";
import photo3 from "./photo3.jpg";
import photo4 from "./photo4.jpg";
import photo5 from "./photo5.jpg";
import photo6 from "./photo6.jpg";
import gologo from "./glogo.png";
import { Flex } from "@radix-ui/themes";

const photoArray = [
  {
    photoUrl: photo1,
    location: "Alor, Anambra Nigeria",
    address: "Off Alor Abatete Rd, Alor 434116, Anambra",
    lat: "6.094712",
    long: "6.958218",
    data: "04/07/24 11:34 PM GMT +01:00",
    // altitude: "",
  },
  {
    photoUrl: photo2,
    location: "Alor, Anambra Nigeria",
    address: "Off Alor Abatete Rd, Alor 434116, Anambra",
    lat: "6.094696",
    long: "6.958335",
    data: "04/07/24 11:35 PM GMT +01:00",
    // altitude: "",
  },
  {
    photoUrl: photo3,
    location: "Alor, Anambra Nigeria",
    address: "Off Alor Abatete Rd, Alor 434116, Anambra",
    lat: "6.094804",
    long: "6.958153",
    data: "04/07/24 11:35 PM GMT +01:00",
    // altitude: "422.6",
  },
  {
    photoUrl: photo4,
    location: "Abatete, Anambra Nigeria",
    address: "Unnamed Road Abatete 434107, Anambra",
    lat: "6.118527",
    long: "6.949934",
    data: "04/07/24 11:38 PM GMT +01:00",
    // altitude: "423.8",
  },
  {
    photoUrl: photo5,
    location: "Alor, Anambra Nigeria",
    address: "Off Alor Abatete Rd, Alor 434116, Anambra",
    lat: "6.094712",
    long: "6.958218",
    data: "04/07/24 11:45 PM GMT +01:00",
    // altitude: "422.7",
  },
  {
    photoUrl: photo6,
    location: "Alor, Anambra Nigeria",
    address: "Off Alor Abatete Rd, Alor 434116, Anambra",
    lat: "6.094708",
    long: "6.958331",
    data: "04/07/24 11:55 PM GMT +01:00",
    // altitude: "442.14",
  },
];

const Playground = () => {
  return (
    <Flex gap="5" wrap="wrap" id="playgorund-app" className="bg-white py-9">
      {photoArray.map((p, i) => (
        <div key={i} className="container w-[600px]">
          <img src={p.photoUrl} alt="" />
          <div className="geo-info">
            <div className="geo-wrapper">
              <img src={gologo} alt="" />
              <div className="geo-details">
                <div className="date-time">
                  <p className="address">{p.location}</p>
                  <p className="line"></p>
                  <p className="address">{p.address}</p>
                  <p className="line"></p>
                  <p>
                    <span className="title">GPS: </span>
                    <span className="gps-coord">{p.lat}</span>,
                    <span className="gps-coord">{p.long}</span>
                  </p>

                  <p className="line"></p>
                  <p>
                    <span className="title">Date: </span>
                    <span>{p.data}</span>
                  </p>
                  <p className="line"></p>
                  {p.altitude && (
                    <p>
                      <span className="title">Altitude: </span>
                      <span>{p.altitude}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Flex>
  );
};

export default Playground;
