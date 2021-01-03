import React, { Component } from "react";
import classes from "./Form.css";
class Form extends Component {
  render() {
    return (
      <div className={classes.Form}>
        <h1>add the item</h1>
        <input
          type="text"
          placeholder="Write The Item Here"
          onChange={this.props.changed}
          value={this.props.value}
        />
        <button onClick={this.props.clicked}>submit</button>
      </div>
    );
  }
}

export default Form;
