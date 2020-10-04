import React, { useEffect } from "react";
import { compose, withHandlers, lifecycle, withState } from "recompose";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import "./onlineUsers.less";
import { user } from "../../services";
import { notification } from "antd";
import Logout from "../../components/logout";

const OnlineUsersPage = (props: any) => {
  useEffect(() => {
    document.title = `Register`;
  });

  const { onlineUsersList } = props;
  return (
    <div className={"online-users-page"}>
      <div className="logout-button-wrapper">
        <Logout />
      </div>
      <div className={"online-users-wrapper"}>
        {_.map(onlineUsersList, (onlineUser) => (
          <div>{onlineUser.username}</div>
        ))}
      </div>
    </div>
  );
};

export default compose(
  withState("onlineUsersList", "setOnlineUsersList", {}),
  withHandlers({
    showNotification: () => () => {
      notification.error({
        message: "Something went wrong!",
        description: "An error occured while fetching the online users..",
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      const { setOnlineUsersList, showNotification }: any = this.props;
      user
        .onlineUsers()
        .then((result) => {
          setOnlineUsersList(result?.data?.onlineUsers);
        })
        .catch((error) => showNotification(error));
    },
  })
)(OnlineUsersPage);
