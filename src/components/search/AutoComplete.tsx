import React, { createElement, Fragment, useEffect, useRef } from "react";
import { autocomplete } from "@algolia/autocomplete-js";
import { createRoot } from "react-dom/client";

export default function AutoComplete(props: any) {
  const containerRef = useRef(null);
  const panelRootRef = useRef<any | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      placeholder: "Search for products",
      renderer: {
        createElement,
        Fragment,
        render: () => {
          null;
        },
      },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      ...props,
      insights: true,
    });

    return () => {
      search.destroy();
    };
  }, [props]);
  return (
    <div
      ref={containerRef}
      className="w-full max-w-screen-md overflow-hidden"
    />
  );
}
