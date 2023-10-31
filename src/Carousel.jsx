// THE OLD WAY OF WRITING REACT
import { Component } from "react";

// CLASS COMPONENTS AND HOOKS DO NOT MIX!!!
// Pick one or the other plz :)

// class components aren't deprecated, so they are still supported
// you can technically mix and match? in an application, not in components themselves
class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  // NOTES HERE! these below are called LIFECYCLE METHODS
  // useEffect() takes care of all of these by bundling them together
  // componentDidMount() -> this function gets run ONCE when it gets first displayed
  // componentDidUpdate() -> this function gets run when the state updates
  // componentWillUnmount() -> this function gets run when it gets yeeted
  // shouldComponentUpdate() -> choosing when to render???

  // returns UNDEFINED!!! This function creates new SCOPE!
  // ARROW functions captures the scope of wherever it was written
  // handleIndexClick(){
  //   console.log(this);
  // }

  handleIndexClick = (e) => {
    this.setState({
      // everything that comes out of the DOM is a string
      // so we have to add the '+' to make this into a NUMBER for the later comparison
      // UNARY PLUS is what this is called
      active: +e.target.dataset.index,
    });
  };

  render() {
    // mutable state
    const { active } = this.state;
    // read-only props from the parent component
    const { images } = this.props;
    // CONTEXT!! THIS is such an important key word

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal hero" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
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
