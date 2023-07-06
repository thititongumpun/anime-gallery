import type { NextPageWithLayout } from "./_app";
import DefaultLayout from "@/components/common/DefaultLayout";
import ProductList from "@/components/product/ProductList";
import { api } from "@/utils/api";
import Loading from "@/components/common/Loading";
import Heading from "@/components/product/Heading";
import type {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { generateSSGHelper } from "@/server/helpers/ssgHelper";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPageWithLayout<PageProps> = () => {
  const { data: products, isLoading } = api.product.getProductsShow.useQuery(
    undefined,
    { staleTime: 3000, refetchOnMount: false, refetchOnWindowFocus: false }
  );
  if (isLoading) return <Loading />;
  if (!products) return <>Something went Wrong</>;

  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-center">
          <Heading open={true}>
            <h1 className="mx-auto text-center text-3xl font-extrabold leading-relaxed p-2">
              Get Image Collections
            </h1>
            <p className="mx-auto max-w-xl px-2 text-center text-base text-gray-600">
              Times are tough. Liven up your home with some cute Doggy Stickers.
              🐶
            </p>
          </Heading>
        </div>

        <ProductList products={products} />
      </div>
    </>
  );
};

export default Home;

Home.getLayout = function (page: React.ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps =
  async ({}: GetStaticPropsContext) => {
    const ssg = generateSSGHelper();
    await ssg.product.getProductsShow.fetch();
    return {
      props: {
        trpcState: ssg.dehydrate(),
      },
      revalidate: 60,
    };
  };
