import React from "react";
import { Composition } from "remotion";
import { HeroVideo } from "./HeroVideo";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroVideo"
        component={HeroVideo}
        durationInFrames={2520}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="HeroVideoLandscape"
        component={HeroVideo}
        durationInFrames={2520}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
