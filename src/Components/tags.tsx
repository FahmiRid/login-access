import PropTypes from "prop-types";
import React from "react";
import "../styles/tags.css";

interface Props {
  textOrange: string;
  textGray: string;
  textRed: string;
  textBlue: string;
  textGreen: string;
  state: "grey" | "blue" | "orange" | "green" | "red";
}

export const Tags = ({
  textOrange = "Action Required",
  textGray = "Failed / Dead Case",
  textRed = "Error / Reject / Fail",
  textBlue = "Pending",
  textGreen = "Success",
  state,
}: Props): JSX.Element => {
  return (
    <div className={`tags ${state}`}>
      <div className="success">
        {state === "green" && <>{textGreen}</>}

        {state === "orange" && <>{textOrange}</>}

        {state === "blue" && <>{textBlue}</>}

        {state === "red" && <p className="text-wrapper">{textRed}</p>}

        {state === "grey" && <>{textGray}</>}
      </div>
    </div>
  );
};

Tags.propTypes = {
  textOrange: PropTypes.string,
  textGray: PropTypes.string,
  textRed: PropTypes.string,
  textBlue: PropTypes.string,
  textGreen: PropTypes.string,
  state: PropTypes.oneOf(["grey", "blue", "orange", "green", "red"]),
};