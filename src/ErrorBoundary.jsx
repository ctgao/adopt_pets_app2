import { Component } from "react";
import { Link } from "react-router-dom";

// MUST BE PUT AT THE TOP MOST LEVEL!
// ErrorBoundary can only catch errors that are inside of it
class ErrorBoundary extends Component {
  state = { hasError: false };

  // changes the state after the error, so you return what the new state should be
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // typically you should log this error out to something like TrackJS or NewRelic
    console.error("ErrorBoundary component caught an error!", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          ERROR!!! Click <Link to={"/"}>here</Link> to go back to the home page.
        </h2>
      );
    }

    // YOU HAVE TO RETURN SOMETHING!!! Otherwise the render breaks and nothing EVER gets rendered
    return this.props.children;
  }
}

export default ErrorBoundary;
