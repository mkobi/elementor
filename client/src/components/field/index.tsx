import React from "react";
import { compose } from "recompose";
import "./field.less";

interface PropsInterface {
  label: string;
  value: string;
}

const Field = (props: PropsInterface) => {
  const { label, value } = props;

  return (
    <div className={"field-component"}>
      <span className="label-text">{label}:&nbsp;</span>
      <span className="value-text">{value}</span>
    </div>
  );
};

export default compose<any, any>()(Field);
