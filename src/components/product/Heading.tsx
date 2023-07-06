import React from "react";
import { useTrail, a } from "@react-spring/web";

type Props = {
  children: React.ReactNode;
  open: boolean;
};

export default function Heading({ children, open }: Props) {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 70 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div
          key={index}
          className="h-auto overflow-hidden pr-1"
          style={style}
        >
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
}
