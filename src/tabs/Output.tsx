import React from "react";
import { Tab, Tabs } from "@blueprintjs/core";
import Twitch from "./outputs/Twitch";

export default () => (
  <Tabs animate={false}>
    <Tab id="twitch" title="Twitch" panel={<Twitch/>}/>
    <Tab id="txt" title=".txt files" panel={<p>Virtual DJ</p>}/>
    <Tab disabled id="rest" title="HTTP/REST" panel={<p>Henlo</p>}/>
    <Tab disabled id="socket" title="socket.io" panel={<p>Henlo</p>}/>
  </Tabs>
)