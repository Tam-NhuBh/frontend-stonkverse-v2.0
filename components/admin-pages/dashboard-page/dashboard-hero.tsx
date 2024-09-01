import { FC, useState } from "react";
import DashboardWidgets from "./dashboard-widgets";

interface Props {
  isDashboard?: boolean;
}

const DashboardHero: FC<Props> = ({ isDashboard }): JSX.Element => {
  return <div>{isDashboard && <DashboardWidgets />}</div>;
};

export default DashboardHero;
