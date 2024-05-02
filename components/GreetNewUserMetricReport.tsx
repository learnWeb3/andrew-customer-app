import { PropsWithChildren, useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { useAppSelector } from "../store/hooks";
import { selectNotificationsByType } from "../store/reducers/notifications.reducer";
import { NotificationType } from "../lib/notification-type.enum";

export interface GreetNewUserMetricReportProps extends PropsWithChildren {}

export function GreetNewUserMetricReport({
  children,
}: GreetNewUserMetricReportProps) {
  const GREET_TRESHOLD = 75;
  const [toggled, setToggled] = useState<boolean>(false);
  const { width, height } = useWindowSize();

  const newDeviceMetricsReportNotifications = useAppSelector((state) =>
    selectNotificationsByType(
      state,
      NotificationType.NEW_DEVICE_METRICS_REPORT_AVAILABLE
    )
  );

  useEffect(() => {
    if (
      !toggled &&
      newDeviceMetricsReportNotifications?.filter(
        (notification) =>
          notification.data?.report?.driving_session
            ?.driver_behaviour_class_int >= GREET_TRESHOLD
      ).length
    ) {
      setToggled(true);
    }
  }, [newDeviceMetricsReportNotifications, toggled]);

  return (
    <>
      {children}
      {toggled ? (
        <Confetti
          width={width}
          height={height}
          run={true}
          recycle={false}
          onConfettiComplete={() => {
            setToggled(false);
          }}
        />
      ) : (
        false
      )}
    </>
  );
}
