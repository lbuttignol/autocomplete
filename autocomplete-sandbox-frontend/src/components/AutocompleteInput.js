import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";

class AutocompleteInput extends Component {
  static propTypes = {
    // You shouldn't change the proptypes!
    address: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  state = {
    loading: false,
    search: "",
    results: []
  };

  componentDidMount() {
    const { address } = this.props;

    if (address)
      this.setState({
        results: [address]
      });
  }

  handleChange = e => {
    const newState = {
      loading: true,
      search: e.target.value
    };

    this.setState(newState);

    setTimeout(async () => {
      // TODO: Implement server call, also make sure to debounce this function,
      // this needs to scale well
      console.log("Calling server");
      console.log(this.state.search);
      // aux = this.state.search;
      const resp = await fetch(`http://localhost:3000/v1/autocomplete?search=${this.state.search}`);
      
      console.log("resp---------");
      console.log(resp);
      console.log("resp---------");
      console.log("resp---------");
      const json = await resp.json();
      console.log("resp---------");
      console.log(json);
      this.setState({
        loading: false,
        results: json
      });

    }, 2000);
  };

  render() {
    const { search, loading } = this.state;

    return (
      <div className="container">
        <div className="row">
          <Input
            value={search}
            loading={loading}
            onChange={this.handleChange}
          />

          <ul>
            
            {this.state.results.map(item => (
              <li key={item.place}>{item.street} {item.city} {item.state} {item.zipcode}</li>
            ))}


          </ul>
        </div>
      </div>
    );
  }
}

export default AutocompleteInput;
