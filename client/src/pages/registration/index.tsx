import { Button, notification } from "antd";
import { NotificationApi } from "antd/lib/notification";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose, withHandlers } from "recompose";
import Login from "../../components/login";
import { user } from "../../services";
import "./registration.less";

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
    showErrorNotification: (props: any) => (notice: any) => {
      notification.warning({
        message: "Something went wrong!",
        description: notice?.response?.data || "try again later",
      });
    },
    showSuccessNotification: (props: any) => (message: any) => {
      notification.success({
        message: "Success!",
        description: message,
      });
    },
  }),
  withHandlers({
    onSubmit: (props: any) => (username: string, password: string) => {
      const { history, showSuccessNotification, showErrorNotification } = props;

      user
        .register({ username, password })
        .then(() => {
          showSuccessNotification("User registered successfully!");
          history.push("/");
        })
        .catch((error) => showErrorNotification(error));
    },
  })
)(RegistrationPage);
