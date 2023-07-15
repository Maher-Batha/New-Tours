import React, { useState } from "react";

const SingleTour = (props) => {
  const { name, image, price, info, onDelete } = props;
  const [readMore, setReadMore] = useState(true);
  return (
    <li className="tour">
      <div className="tour-image">
        <img src={image} alt={name} />
        <span className="tour-price">$ {price}</span>
      </div>
      <div className="tour-specifications">
        <h2 className="tour-name">{name}</h2>
        <p className="tour-info">
          {readMore ? `${info.slice(0, 200)}...` : info}{" "}
          <button className="read-more" onClick={() => setReadMore(!readMore)}>
            {readMore ? "read more" : "show less"}
          </button>
        </p>
        <button className="clear-tour" onClick={(id) => onDelete(id)}>
          not interested
        </button>
      </div>
    </li>
  );
};

export default SingleTour;
