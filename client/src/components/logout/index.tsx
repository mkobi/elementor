import { Button } from "antd";
import React from "react";
import { compose, withHandlers } from "recompose";
import "./logout.less";
import { user } from "../../services";
import { withRouter } from "react-router";

interface PropsInterface {
  handleSubmit: any;
}

const Logout = (props: PropsInterface) => {
  const { handleSubmit } = props;
  return (
    <div className={"logout-component"}>
      <Button type="link" onClick={handleSubmit}>
        Log out
      </Button>
    </div>
  );
};

export default compose<any, any>(
  withRouter,
  withHandlers({
    handleSubmit: (props: any) => () => {
      const { history } = props;
      const userId = window.localStorage.getItem("elementor_user_id");
      const sessionId = window.localStorage.getItem("elementor_session_id");
      user.logout({ userId, sessionId }).then(() => {
        window.localStorage.removeItem("elementor_user_id");
        window.localStorage.removeItem("elementor_session_id");
        history.push("/");
      });
    },
  })
)(Logout);
