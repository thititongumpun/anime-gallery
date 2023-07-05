import type { NextPageWithLayout } from "./_app";
import DefaultLayout from "@/components/common/DefaultLayout";
import ProductList from "@/components/product/ProductList";
import { api } from "@/utils/api";
import Loading from "@/components/common/Loading";
import Heading from "@/components/product/Heading";

const Home: NextPageWithLayout = () => {
  const { data: products, isLoading } = api.product.getProductsShow.useQuery();
  if (isLoading) return <Loading />;
  if (!products) return <>Something went Wrong</>;
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <Heading />
        <ProductList products={products} />
      </div>
    </>
  );
};

export default Home;

Home.getLayout = function (page: React.ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
