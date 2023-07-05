import React from "react";
import type { NextPageWithLayout } from "../_app";
import Layout from "@/components/common/Layout";

const Dashboard: NextPageWithLayout = () => {
  return <></>;
};

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
