import React from "react";
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
  type IMessage,
} from "@novu/notification-center";

type Props = {};

export default function NovuHeader({}: Props) {
  function onNotificationClick(message: IMessage) {
    // your logic to handle the notification click
    if (message?.cta?.data?.url) {
      window.location.href = message.cta.data.url;
    }
  }
  return (
    <NovuProvider
      subscriberId={process.env.NEXT_PUBLIC_NOVU_CLIENT_APP_ID as string}
      applicationIdentifier={process.env.NEXT_PUBLIC_APPLICATIONIDENTIFIER as string}
    >
      <PopoverNotificationCenter
        onNotificationClick={onNotificationClick}
        colorScheme="dark"
      >
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
}
