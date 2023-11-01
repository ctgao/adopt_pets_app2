import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    const smImgStyle = "m-2 inline-block h-24 w-24 cursor-pointer rounded-full border-2 border-stone-800";

    return (
      <div className="flex h-auto pt-5 items-center justify-around">
        <img
          className="max-h-80 max-w-3xl"
          src={images[active]}
          alt="animal hero"
        />
        <div className="w-6/12">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              data-index={index}
              src={photo}
              className={index === active ? smImgStyle + " opacity-60" : smImgStyle}
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
