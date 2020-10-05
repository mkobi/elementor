import React from "react";
import { compose, withHandlers } from "recompose";
import "./card.less";
import TimeReference from "../timeReference";

interface PropsInterface {
  username: string;
  ip: string;
  sessionStartTime: string;
  handleClick: any;
}

const Card = (props: PropsInterface) => {
  const { username, ip, sessionStartTime, handleClick } = props;

  return (
    <div className={"card"}>
      <div className={"card-container"} onClick={handleClick}>
        <div className={"text-section"}>
          <span className={"username-text"}>{username}</span>
          <span className={"normal-text"}>{`IP: ${ip}`}</span>
          <TimeReference
            time={sessionStartTime}
            wrapperClass={"time-reference-wrapper"}
          />
        </div>
      </div>
    </div>
  );
};

export default compose<any, any>(
  withHandlers({
    handleClick: (props: any) => () => {
      const { onClick, sessionId } = props;
      onClick(sessionId);
    },
  })
)(Card);
