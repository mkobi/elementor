import React from "react";
import moment from "moment";
import { compose } from "recompose";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./time-reference.less";

interface PropsInterface {
  time: string;
  prefix: string;
  wrapperClass?: string;
  timeFormat?: string;
}

const TimeReference = (props: PropsInterface) => {
  const { time, prefix, wrapperClass, timeFormat } = props;
  const formattedTime = moment(time).format(`${timeFormat || "HH:mm"}`);
  const relativeTime = moment(time).fromNow();

  return (
    <div className={`time-reference-component ${wrapperClass || ""}`}>
      <span className={"normal-text"}>{`${
        prefix || "Logged in"
      } ${relativeTime} - at `}</span>
      <span className={"time-text"}>&nbsp;{formattedTime}</span>
    </div>
  );
};

export default compose<any, any>()(TimeReference);
