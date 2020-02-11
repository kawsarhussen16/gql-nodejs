import React from "react";
import { Link } from "react-router-dom";
import "./RecipeItem.style.scss";

const RecipeItem = ({ _id, name, category }) => (
    <div className="item-container">
        <Link to={`recipes/${_id}`}>
            {" "}
            <h4> {name} </h4>{" "}
        </Link>
        <p>
            <strong>{category} </strong>
        </p>
    </div>
);

export default RecipeItem;
