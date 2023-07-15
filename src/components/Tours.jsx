import React, { useEffect, useState } from "react";
import "../app.css";
import SingleTour from "./SingleTour";
import Loading from "./Loading";

const Tours = () => {
  const toursUrl = "https://course-api.com/react-tours-project";
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tours, setTours] = useState([]);
  const fetchData = async (url) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const responseData = await response.json();
      setTours(responseData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };
  useEffect(() => {
    fetchData(toursUrl);
  }, []);
  const deleteTour = (id) => {
    setTours((prevState) => {
      return prevState.filter((item) => {
        return item.id !== id;
      });
    });
  };
  if (isLoading) {
    return (
      <div className="tours-project">
        <div className="container">
          <div className="title">our tours</div>
          <ul className="tours">
            <Loading />
          </ul>
        </div>
      </div>
    );
  }
  if (isError) {
    return <h1>Error</h1>;
  } else {
    return (
      <div className="tours-project">
        <div className="container">
          <div className="title">our tours</div>
          {tours.length > 0 ? (
            <ul className="tours">
              {tours.map((tour) => {
                const { id, name, info, image, price } = tour;
                return (
                  <SingleTour
                    key={id}
                    name={name}
                    info={info}
                    image={image}
                    price={price}
                    onDelete={() => deleteTour(id)}
                  />
                );
              })}
            </ul>
          ) : (
            <button className="refetch" onClick={() => fetchData(toursUrl)}>
              Re-explore Tours
            </button>
          )}
        </div>
      </div>
    );
  }
};

export default Tours;
