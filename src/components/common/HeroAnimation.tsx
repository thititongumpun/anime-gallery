import React, { useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import thinkingAnimation from "../../../public/thinking.json";

type Props = {};

export default function HeroAnimation({}: Props) {
  const ref = useRef<LottieRefCurrentProps>(null);
  return (
    <Lottie
      onComplete={() => {
        ref.current?.setDirection(-1);
        ref.current?.play();
      }}
      lottieRef={ref}
      animationData={thinkingAnimation}
    />
  );
}
