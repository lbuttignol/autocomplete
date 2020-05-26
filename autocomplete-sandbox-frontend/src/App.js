import React, { Component } from "react";
import AutocompleteInput from "./components/AutocompleteInput";

class App extends Component {
  state = {address: {}}

  render() {
    const { address } = this.state;

    return (
      <React.Fragment>
        <h2>Autocomplete Demo</h2>

        <AutocompleteInput
          address={address}
          onChange={address => {
            this.setState({ address });
          }}
        />

        <h4>{address.street}</h4>
      </React.Fragment>
    );
  }
}

export default App;
