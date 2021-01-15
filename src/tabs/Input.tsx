import React from "react";
import { Tab, Tabs } from "@blueprintjs/core";
import Serato from "./inputs/Serato";

export default () => (
  <Tabs animate={false}>
    <Tab id={"serato"} title={"Serato"} panel={<Serato/>}/>
    <Tab disabled id={"virtual-dj"} title={"Virtual DJ"} panel={<p>Virtual DJ</p>}/>
    <Tab disabled id={"traktor"} title={"Traktor"} panel={<p>Henlo</p>}/>
    <Tab disabled id={"kuvo"} title={"Rekordbox (Performance Mode)"} panel={<p>Henlo</p>}/>
    <Tab disabled id={"pro-dj-link"} title={"Pro DJ Link"} panel={<p>Henlo</p>}/>
  </Tabs>
)