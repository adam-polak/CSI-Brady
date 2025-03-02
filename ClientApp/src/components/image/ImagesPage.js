import { Component } from "react";
import { useParams } from "react-router-dom";
import NavHeader from "../header/NavHeader";
import Image from "./Image";

/**
 * image object
 * {
 *     Date,
 *     Violations[],
 *     TakenBy,
 *     ImageSrc,
 * },
 *
 * violation object
 * {
 *      Name,
 *      Summary,
 *      Link,
 * }
 */

const violation1 = {
  Name: "Osha 1920.2.5",
  Summary:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  Link: "https://www.lipsum.com/",
};

const violation2 = {
  Name: "ANSI 367.e.5",
  Summary:
    "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  Link: "https://www.google.com/",
};

const image1 = {
  Date: "10/27/24",
  Violations: [violation1, violation2],
  TakenBy: "Turbo Johnson",
  ImageSrc: "Pipe.JPG",
};

const images = [image1, image1, image1];

export function ImagesPageWrapper() {
  const { areaId, productId } = useParams();

  return <ImagesPage areaId={areaId} productId={productId} />;
}

export class ImagesPage extends Component {
  render() {
    return (
      <div className="bg-grey" style={{ height: "94vh" }}>
        <NavHeader />
        <div className="p-3" style={{ height: "80%", overflowY: "scroll" }}>
          {images.map((image, i) => (
            <div className={i === 0 ? "" : "mt-4"}>
              <Image image={image} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
