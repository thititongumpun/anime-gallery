import React from "react";
import Layout from "@/components/common/Layout";
import type { NextPageWithLayout } from "@/pages/_app";

const UserPage: NextPageWithLayout = () => {
  return <p>hello world</p>;
};

UserPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default UserPage;
