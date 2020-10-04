import React, { useEffect } from "react";
import { compose, withHandlers, lifecycle, withState } from "recompose";
import moment from "moment";
import _ from "lodash";
import "./onlineUsers.less";
import { user } from "../../services";
import { Modal, notification } from "antd";
import Logout from "../../components/logout";
import Card from "../../components/card";
import Field from "../../components/field";
import TimeReference from "../../components/timeReference";

const OnlineUsersPage = (props: any) => {
  useEffect(() => {
    document.title = `Online Users`;
  });

  const {
    onlineUsersList,
    onUserClick,
    isModalOpen,
    hideModal,
    currentUserData,
    lastFetchTime,
  } = props;
  return (
    <div className={"online-users-page"}>
      <Modal
        title="Online user info"
        className="user-info-modal"
        visible={isModalOpen}
        onOk={hideModal}
        mask={true}
        maskClosable={true}
        closable={false}
        cancelButtonProps={{ hidden: true }}
      >
        <div className="modal-content-container">
          <Field
            label={"Registration Time"}
            value={currentUserData?.formattedRegistrationTime}
          />
          <Field
            label={"Logins Count"}
            value={currentUserData?.sessionsCount}
          />
          <br />
          <Field label={"User Agent"} value={currentUserData?.userAgent} />
        </div>
      </Modal>

      <div className="logout-button-wrapper">
        <Logout />
      </div>

      <TimeReference
        time={lastFetchTime}
        timeFormat={"HH:mm:ss"}
        prefix={"Refreshed"}
        wrapperClass={"time-reference-wrapper"}
      />
      <div className={"online-users-wrapper"}>
        {_.map(onlineUsersList, (onlineUser, key) => (
          <Card
            key={key}
            onClick={onUserClick}
            sessionId={onlineUser.sessionId}
            ip={onlineUser.ip}
            username={onlineUser.username}
            sessionStartTime={onlineUser.sessionStartTime}
          />
        ))}
      </div>
    </div>
  );
};

export default compose(
  withState("onlineUsersList", "setOnlineUsersList", {}),
  withState("isModalOpen", "setIsModalOpen", false),
  withState("currentUserData", "setCurrentUserData", {}),
  withState("lastFetchTime", "setLastFetchTime", moment()),
  withHandlers({
    showNotification: () => (notice: string) => {
      notification.error({
        message: "Something went wrong!",
        description:
          notice || "An error occured while fetching the online users..",
      });
    },
    hideModal: (props: any) => () => {
      const { setIsModalOpen } = props;
      setIsModalOpen(false);
    },
    onUserClick: (props: any) => (sessionId: string) => {
      const { showNotification, setIsModalOpen, setCurrentUserData } = props;
      user
        .getUserData(sessionId)
        .then((result) => {
          setIsModalOpen(true);
          const formattedRegistrationTime = moment(
            result.data?.registrationTime
          ).format();
          setCurrentUserData({ ...result.data, formattedRegistrationTime });
        })
        .catch((error) => showNotification(error?.response?.message));
    },
    getOnlineUsers: (props: any) => () => {
      const {
        setOnlineUsersList,
        setLastFetchTime,
        showNotification,
      }: any = props;
      user
        .onlineUsers()
        .then((result) => {
          setLastFetchTime(moment());
          setOnlineUsersList(result?.data?.onlineUsers);
        })
        .catch((error) => showNotification(error));
    },
  }),
  lifecycle({
    componentDidMount() {
      const { getOnlineUsers }: any = this.props;
      getOnlineUsers();
      console.log("*** process.env.REACT_APP_ONLINE_USERS_REFRESH_INTERVAL: ", process.env);
      setInterval(getOnlineUsers, 10000);
    },
  })
)(OnlineUsersPage);
