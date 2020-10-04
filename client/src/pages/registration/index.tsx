import React, { useEffect } from "react";
import { compose, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";
import "./registration.less";
import { user } from "../../services";
import Login from "../../components/login";
import { Button, notification } from "antd";

const RegistrationPage = (props: any) => {
  useEffect(() => {
    document.title = `Register`;
  });

  const { onSubmit, history } = props;
  return (
    <div className={"registration-page"}>
      <div className={"registration-wrapper"}>
        <Login onSubmit={onSubmit} submitText={"Sign Up"} />
        <Button type="link" onClick={() => history.push("/")}>
          {"Back"}
        </Button>
      </div>
    </div>
  );
};

export default compose(
  withRouter,
  withHandlers({
    showNotification: (props: any) => (notice: any) => {
      notification.warning({
        message: "Something went wrong!",
        description: notice?.response?.data || "try again later",
      });
    },
  }),
  withHandlers({
    onSubmit: (props: any) => (username: string, password: string) => {
      const { history, showNotification } = props;

      user
        .register({ username, password })
        .then(() => {
          history.push("/");
        })
        .catch((error) => showNotification(error));
    },
  })
)(RegistrationPage);
