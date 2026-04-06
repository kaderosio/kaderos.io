import React from "react";
import { Composition } from "remotion";
import { HeroVideo } from "./HeroVideo";
import { TikTok01_PunchyRoles } from "./TikTok01_PunchyRoles";
import { TikTok02_BeforeAfter } from "./TikTok02_BeforeAfter";
import { T1_Dashboard } from "./T1_Dashboard";
import { T2_ZahlenPunch } from "./T2_ZahlenPunch";
import { T5_Terminal } from "./T5_Terminal";
import { V2_KaderPunch } from "./V2_KaderPunch";
import { ScriptRenderer } from "./ScriptRenderer";
import { AppleStartup } from "./AppleStartup";
import { T6_DieRechnung } from "./T6_DieRechnung";
import { T7_DieBewerbung } from "./T7_DieBewerbung";
import { T8_DreiUhrMorgens } from "./T8_DreiUhrMorgens";
import { T9_EhrlicheRechnung } from "./T9_EhrlicheRechnung";
import { TikTok03_FuenfAiTools } from "./TikTok03_FuenfAiTools";
import { TikTok04_AiCto } from "./TikTok04_AiCto";
import { TikTok05_Prompter } from "./TikTok05_Prompter";
import { TikTok06_SwissMade } from "./TikTok06_SwissMade";
import { TikTok07_ZahlenPunch } from "./TikTok07_ZahlenPunch";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroVideo"
        component={HeroVideo}
        durationInFrames={2660}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="HeroVideoLandscape"
        component={HeroVideo}
        durationInFrames={2660}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="tiktok01-punchy-roles"
        component={TikTok01_PunchyRoles}
        durationInFrames={1200}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="tiktok02-before-after"
        component={TikTok02_BeforeAfter}
        durationInFrames={1320}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="t1-dashboard"
        component={T1_Dashboard}
        durationInFrames={480}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="t2-zahlen-punch"
        component={T2_ZahlenPunch}
        durationInFrames={600}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="t5-terminal"
        component={T5_Terminal}
        durationInFrames={720}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="script-renderer"
        component={ScriptRenderer}
        durationInFrames={420}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
      <Composition
        id="v2-kader-punch"
        component={V2_KaderPunch}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="apple-startup"
        component={AppleStartup}
        durationInFrames={2400}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="t6-die-rechnung"
        component={T6_DieRechnung}
        durationInFrames={3180}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="t7-die-bewerbung"
        component={T7_DieBewerbung}
        durationInFrames={2640}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="t8-drei-uhr-morgens"
        component={T8_DreiUhrMorgens}
        durationInFrames={2340}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="t9-ehrliche-rechnung"
        component={T9_EhrlicheRechnung}
        durationInFrames={2340}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="tiktok03-fuenf-ai-tools"
        component={TikTok03_FuenfAiTools}
        durationInFrames={2484}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="tiktok04-ai-cto"
        component={TikTok04_AiCto}
        durationInFrames={2658}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="tiktok05-prompter"
        component={TikTok05_Prompter}
        durationInFrames={1734}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="tiktok06-swiss-made"
        component={TikTok06_SwissMade}
        durationInFrames={3090}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="tiktok07-zahlen-punch"
        component={TikTok07_ZahlenPunch}
        durationInFrames={900}
        fps={60}
        width={1080}
        height={1920}
      />
    </>
  );
};
