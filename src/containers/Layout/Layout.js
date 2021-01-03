import React, { Component } from "react";
import Form from "../../components/Form/Form";
import Items from "../../components/Items/Items";
import axios from "../../axios";
import Aux from "../../hoc/Aux";
// import classes from "./Layout.css";
class Layout extends Component {
  state = {
    items: [],
    itemObject: {},
    itemValue: "",
    wait: true,
  };

  componentDidMount() {
    axios
      .get("/items.json")
      .then((response) => {
        // handle success
        if (response.data)
          this.setState({ wait: false, itemObject: response.data });
        else this.setState({ wait: false, itemObject: {} });
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });
  }
  shouldComponentUpdate(prevProps, prevState) {
    if (
      this.state.itemObject !== prevState.itemObject ||
      this.state.itemValue !== prevState.itemValue
    )
      return true;
    else return false;
  }
  formChangeHandler = (e) => this.setState({ itemValue: e.target.value });
  addItemHandler = () => {
    if (!(this.state.itemValue === "")) {
      const obj = {
        item: this.state.itemValue,
        date: Date(),
      };
      axios
        .post("/items.json", obj)
        .then((response) => {
          this.setState({
            itemObject: { ...this.state.itemObject, [response.data.name]: obj },
            itemValue: "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Enter Item's Name");
    }
  };

  deleteItemsHandler = () => {
    axios
      .delete("/items.json")
      .then((response) => {
        this.setState({ itemObject: {} });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteItemHandler = (e) => {
    const id = parseInt(e.target.parentElement.getAttribute("id"));
    axios
      .delete(`/items/${Object.keys(this.state.itemObject)[id]}.json`)
      .then((response) => {
        const newItemObject = { ...this.state.itemObject };
        delete newItemObject[Object.keys(this.state.itemObject)[id]];
        if (
          Object.keys(newItemObject).length === 0 &&
          newItemObject.constructor === Object
        )
          this.setState({ itemObject: {} });
        else this.setState({ itemObject: newItemObject });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <Aux>
        <Form
          clicked={this.addItemHandler}
          value={this.state.itemValue}
          changed={(e) => this.formChangeHandler(e)}
        />
        <Items
          clicked={this.deleteItemsHandler}
          trashClicked={(e) => this.deleteItemHandler(e)}
          items={this.state.itemObject}
          waiting={this.state.wait}
        />
      </Aux>
    );
  }
}

export default Layout;
