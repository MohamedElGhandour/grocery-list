import React, { Component } from "react";
import Item from "./Item/Item";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./Items.css";
class Items extends Component {
  render() {
    let items;
    if (
      Object.keys(this.props.items).length === 0 &&
      this.props.items.constructor === Object
    ) {
      items = <p style={{ fontSize: "17px" }}>Add Some Item Please</p>;
    } else {
      items = Object.keys(this.props.items).map((itemObj, index) => {
        const item = this.props.items[itemObj];
        return (
          <Item
            clicked={this.props.trashClicked}
            key={index}
            id={index}
            time={item.date}
            name={item.item}
          />
        );
      });
    }
    return (
      <div className={classes.Items}>
        <h1>The Items</h1>
        {this.props.waiting ? (
          <Spinner />
        ) : (
          <div className={classes.List}>{items}</div>
        )}
        <button onClick={this.props.clicked}>Clear Items</button>
      </div>
    );
  }
}
export default Items;
