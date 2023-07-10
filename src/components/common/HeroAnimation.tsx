import React, { useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import thinkingAnimation from "../../../public/thinking.json";

type Props = {};

export default function HeroAnimation({}: Props) {
  const ref = useRef<LottieRefCurrentProps>(null);
  return (
    <section className="flex w-full">
    <Lottie
      lottieRef={ref}
      animationData={thinkingAnimation}
    />
    </section>
  );
}
