import React from "react";
import type { NextPageWithLayout } from "../_app";
import Layout from "@/components/common/Layout";
import LineChart from "@/components/chart/LineChart";
import axios from "axios";

const Dashboard: NextPageWithLayout = () => {
  const test = async () => {
    const res = await axios.post('/api/novu');
    console.log(res);
  }
  return (
    <section className="flex flex-wrap justify-center items-center">
      <div className="mb-12 w-full px-4 xl:mb-0 xl:w-8/12">
        <LineChart />
      </div>
      <button onClick={test}>haha</button>
    </section>
  );
};

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
