import React from "react";
import trash from "../../../assets/img/trash.svg";
const Item = (props) => (
  <div date={props.time} id={props.id}>
    <span>{props.name}</span>
    <img onClick={props.clicked} alt="trash" src={trash} />
  </div>
);

export default Item;
