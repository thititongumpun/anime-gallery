import { getAlgoliaResults } from "@algolia/autocomplete-js";
import algoliasearch from "algoliasearch/lite";
import { useRouter } from "next/router";
import Autocomplete from "./AutoComplete";
import { SearchItem } from "./SearchItem";

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPID || "",
  process.env.NEXT_PUBLIC_ALGOLIA_APISECRET || ""
);

export default function Search() {
  const router = useRouter();
  return (
    <Autocomplete
      classNames={{
        list: "",
        item: "",
        input: "xl:w-full",
        label: "",
        button: "placeholder:opacity-0",
      }}
      getSources={({ query }: { query: string }) => [
        {
          sourceId: "products",
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: "anime_gallery",
                  query,
                },
              ],
            });
          },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          onSelect({ item }) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            void router.push(`/products/${item.id}`);
          },

          templates: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            item({ item, components }) {
              return <SearchItem hit={item} components={components} />;
            },
          },

          params: {
            attributesToSnippet: ["product_name"],
            hitsPerPage: 5,
            attributesToHighlight: ["product_name"],
          },
        },
      ]}
    />
  );
}
