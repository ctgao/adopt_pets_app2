import { Component, MouseEvent } from "react";

// you can call this whatever tbh
interface IProps {
  images: string[];
}

class Carousel extends Component<IProps> {
  // since we set state here, we don't have to set IState up there with IProps inside the <>
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e: MouseEvent<HTMLElement>) => {
    // is e.target an HTML element? All HTML elements have a dataset on it
    if (!(e.target instanceof HTMLElement)) return;

    // does dataset have an index?
    if (e.target.dataset.index) {
      this.setState({
        active: +e.target.dataset.index,
      });
    }
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    const smImgStyle =
      "m-2 inline-block h-24 w-24 cursor-pointer rounded-full border-2 border-stone-800";

    return (
      <div className="flex h-auto items-center justify-around pt-5">
        <img
          data-testid="hero"
          className="max-h-80 max-w-3xl"
          src={images[active]}
          alt="animal hero"
        />
        <div className="w-6/12">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              data-testid={`thumbnail${index}`}
              key={photo}
              data-index={index}
              src={photo}
              className={
                index === active ? smImgStyle + " opacity-60" : smImgStyle
              }
              alt="animal thumnbnail"
              onClick={this.handleIndexClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
