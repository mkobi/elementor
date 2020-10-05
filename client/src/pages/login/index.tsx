import { Button, notification } from "antd";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose, lifecycle, withHandlers } from "recompose";
import Login from "../../components/login";
import { user } from "../../services";
import "./login.less";

const List = (props: any) => {
  useEffect(() => {
    document.title = `Login`;
  });

  const { onSubmit, onRegister } = props;

  return (
    <div className="login-page">
      <div className="login-register-wrapper">
        <Login onSubmit={onSubmit} />
        <Button type="link" onClick={onRegister}>
          {"Not a member? Sign up here"}
        </Button>
      </div>
    </div>
  );
};

export default compose(
  withRouter,
  lifecycle({
    componentDidMount() {
      const { history }: any = this.props;
      const userId = window.localStorage.getItem("elementor_user_id");
      const sessionId = window.localStorage.getItem("elementor_session_id");

      if (userId && sessionId) {
        history.push("/users");
      }
    },
  }),
  withHandlers({
    showNotification: () => (notice: any) => {
      notification.warning({
        message: "Something went wrong!",
        description: notice?.response?.data || "try again later",
      });
    },
    saveInLocalStorage: () => (userId: string, sessionId: string) => {
      window.localStorage.setItem("elementor_user_id", userId);
      window.localStorage.setItem("elementor_session_id", sessionId);
    },
  }),
  withHandlers({
    onSubmit: (props: any) => (username: string, password: string) => {
      const { history, showNotification, saveInLocalStorage } = props;

      user
        .login({ username, password })
        .then((result) => {
          const { userId, sessionId } = result?.data;
          saveInLocalStorage(userId, sessionId);
          history.push("/users");
        })
        .catch((error) => showNotification(error));
    },
    onRegister: (props: any) => () => {
      const { history } = props;
      history.push("/registration");
    },
  }),
)(List);
