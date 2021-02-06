import Lottie, { AnimationDirection, AnimationItem } from "lottie-web";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import data from "./DarkModeAnimationData";

const NightToggleContainer = styled.div`
  height: 24px;
  width: 24px;

  :hover {
    .paintable {
      fill: teal;
      stroke: teal;
    }
  }

  .paintable {
    transition: fill 0.2s linear, stroke 0.2s linear;
    fill: var(--text1);
    stroke: var(--text1);
  }
`;

export default function DarkModeButton() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<AnimationDirection>(1);
  const [animation, setAnimation] = useState<AnimationItem>();

  useEffect(() => {
    const current = buttonRef.current;

    if (current) {
      const body = document.getElementsByTagName("body")[0];

      setAnimation(
        Lottie.loadAnimation({
          container: current,
          renderer: "svg",
          loop: false,
          autoplay: body.classList.contains("dark"),
          animationData: data,
        })
      );

      return () => {
        if (current?.firstChild) {
          current.removeChild(current.firstChild);
        }
      };
    }
  }, []);

  return (
    <NightToggleContainer
      ref={buttonRef}
      onClick={() => {
        if (animation) {
          const body = document.getElementsByTagName("body")[0];

          if (body.classList.contains("dark")) {
            body.classList.remove("dark");
          } else {
            body.classList.add("dark");
          }

          setDirection(-direction as AnimationDirection);
          animation.setDirection(direction);
          animation.play();
        }
      }}
    ></NightToggleContainer>
  );
}
