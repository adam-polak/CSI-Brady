import { Component } from "react";
import { useParams } from "react-router-dom";
import NavHeader from "../header/NavHeader";
import Image from "./Image";
import { LoadingSpinner } from "../loading/Loading";

/**
 * image object
 * {
 *     Date,
 *     Violations[],
 *     FirstName,
 *     LastName,
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

export function ImagesPageWrapper() {
  const { areaId, productId } = useParams();

  return <ImagesPage areaId={areaId} productId={productId} />;
}

export class ImagesPage extends Component {
  constructor(props) {
    super(props);

    this.state = { images: [], loading: true }
  }

  async componentDidMount() {
    const images = await this.loadImageObjs();
    this.loadImages(images);
  }

  async loadImageObjs() {
    const { productId } = this.props;
    const result = await fetch(`/imageapi/product/${productId}`);
    const images = JSON.parse(await result.text());
    return images.reverse();
  }

  async loadImages(images) {
    const { areaId } = this.props;

    for(let i = 0; i < images.length; i++) {
      const result = await fetch(`/imageapi/image/${areaId}/${images[i].Id}`);
      const imgSrc = await result.text();
      images[i].ImageSrc = imgSrc;
    }

    this.setState({ images: images, loading: false });
  }

  render() {
    const { images, loading } = this.state;

    return (
      <div className="bg-grey" style={{ height: "94vh" }}>
        <NavHeader />
        <div className="p-3" style={{ height: "80%", overflowY: "scroll" }}>
          {loading && <LoadingSpinner />}
          {images.map((image, i) => (
            <div key={"" + i} className={i === 0 ? "" : "mt-4"}>
              <Image image={image} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
