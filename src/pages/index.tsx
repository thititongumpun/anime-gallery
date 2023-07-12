import type { NextPageWithLayout } from "./_app";
import DefaultLayout from "@/components/common/DefaultLayout";
import { api } from "@/utils/api";
import Loading from "@/components/common/Loading";
import type {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { generateSSGHelper } from "@/server/helpers/ssgHelper";
import Hero from "@/components/common/Hero";
import dynamic from "next/dynamic";
const DynamicSlider = dynamic(() => import("@/components/common/Slider"));
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
      <div className="container mx-auto max-w-7xl">
        <Hero />
        <DynamicSlider products={products} />
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
