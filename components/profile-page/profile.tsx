import { FC, useState } from "react";
import ProfileSidebar from "./profile-sidebar";
import ProfileInfo from "./profile-info";
import ChangePassword from "./change-password";
import UserCourses from "./user-courses";
import UserLeaningProgress from "./user-learning-progress";

interface Props {}

const Profile: FC<Props> = (props): JSX.Element => {
  const [active, setActive] = useState(1);

  return (
    <div className="flex gap-8 max-[600px]:gap-3">
      <ProfileSidebar active={active} setActive={setActive} />

      <div className="flex-1">
        {active === 1 ? (
          <ProfileInfo />
        ) : active === 2 ? (
          <ChangePassword />
        ) : active === 3 ? (
          <UserCourses />
        ) : active === 4 ? (
          <UserLeaningProgress />
        ) : (
            ""
        )}
      </div>
    </div>
  );
};

export default Profile;
