"use client";

import ThemeSwitcher from "@/components/layout/theme-switcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotifcationStatusMutation,
} from "@/store/notification/notification-api";
import { FC, useState, useEffect } from "react";
import { IoMdNotificationsOutline, IoMdCheckmarkCircleOutline } from "react-icons/io";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

interface Props { }

const AdminHeader: FC<Props> = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotifcationStatusMutation();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (data) {
      console.log("Fetched notifications:", data);
      setNotifications(data.notifications || []);
    }
  }, [data]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
    refetch();
  };

  return (
    <div className="flex items-center justify-end fixed p-6 top-9 right-8 z-[1000]">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-dark_text text-black -mt-1" />
        <span className="absolute -top-[10px] -right-2 bg-[#3ccba0] rounded-full w-5 h-5 text-xs flex items-center justify-center text-dark_text">
          {notifications.length}
        </span>
      </div>

      {open && (
        <div className="fixed top-20 right-8 z-[10000]">
          <div className="w-[350px] max-h-[450px] dark:bg-[#111C43] bg-white shadow-xl border dark:border-slate-700 rounded overflow-hidden">
            <h5 className="text-center text-[20px] text-white dark:text-dark_text py-3 bg-[#45cba0] rounded-t">
              Notifications
            </h5>

            <div className="h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-center text-tertiary dark:text-dark_text mt-4">
                  No notifications
                </p>
              ) : (
                notifications.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="dark:bg-[#2d3a4ea1] bg-[#00000013] border-b dark:border-b-[#ffffff47] border-b-[#0000000f] transition-transform transform hover:scale-105"
                  >
                    <div className="w-full flex items-center justify-between p-3">
                      <p className="text-tertiary dark:text-dark_text font-semibold">
                        {item.title}
                      </p>
                      {item.read ? (
                        <IoMdCheckmarkCircleOutline
                          className="text-green-500 cursor-pointer"
                          onClick={() => handleNotificationStatusChange(item._id)}
                        />
                      ) : (
                        <p
                          className="text-tertiary dark:text-dark_text cursor-pointer hover:text-gray-300"
                          onClick={() => handleNotificationStatusChange(item._id)}
                        >
                          <IoCheckmarkDoneSharp />
                        </p>
                      )}
                    </div>

                    <p className="px-3 text-tertiary dark:text-dark_text text-sm">
                      {item.message}
                    </p>
                    <p className="px-3 pb-3 text-tertiary dark:text-dark_text text-xs">
                      {timeAgo.format(new Date(item.createdAt))}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHeader;
