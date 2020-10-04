import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import _ from "lodash";
import React from "react";
import { compose, withHandlers, withState } from "recompose";
import "./login.less";

interface PropsInterface {
  id?: string;
  onSubmit: any;
  submitText?: string;
  onUsernameChange: any;
  onPasswordChange: any;
  isDisabled: boolean;
  usernameValue: string;
  passwordValue: string;
  handleSubmit: any;
}

const Login = (props: PropsInterface) => {
  const {
    isDisabled,
    onUsernameChange,
    onPasswordChange,
    usernameValue,
    passwordValue,
    handleSubmit,
    submitText,
  } = props;
  return (
    <div className={"login-component"}>
      <div className={"login-container"}>
        <Input
          className={"form-input"}
          placeholder="Username or Email"
          value={usernameValue}
          onChange={onUsernameChange}
        />
        <Input.Password
          className={"form-input"}
          placeholder="Password"
          value={passwordValue}
          onChange={onPasswordChange}
        />
        <div className="login-button-section">
          <Button
            type="primary"
            className={"add-button"}
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            {submitText || "Sign in"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default compose<any, any>(
  withState("isDisabled", "setIsDisabled", true),
  withState("usernameValue", "updateUsernameValue", ""),
  withState("passwordValue", "updatePasswordValue", ""),
  withHandlers({
    markIfValid: (props: any) => () => {
      const { usernameValue, passwordValue, setIsDisabled } = props;
      const isValid = !_.isEmpty(usernameValue) && !_.isEmpty(passwordValue);
      setIsDisabled(!isValid);
    },
  }),
  withHandlers({
    onUsernameChange: (props: any) => (input: any) => {
      const { updateUsernameValue, markIfValid } = props;
      markIfValid();
      updateUsernameValue(input.target.value);
    },
    onPasswordChange: (props: any) => (input: any) => {
      const { updatePasswordValue, markIfValid } = props;
      markIfValid();
      updatePasswordValue(input.target.value);
    },
    handleSubmit: (props: any) => () => {
      const { onSubmit, usernameValue, passwordValue } = props;
      onSubmit(usernameValue, passwordValue);
    },
  })
)(Login);
