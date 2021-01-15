import React from "react"
import { render } from "react-dom"
import "normalize.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "./App.css"
import { Tab, Tabs } from "@blueprintjs/core"
import Input from "./tabs/Input"
import Output from "./tabs/Output"

const App = () => {
  return (
    <Tabs animate={false} defaultSelectedTabId={"output"}>
      <Tab id="input" title="Input" panel={<Input/>}/>
      <Tab id="output" title="Output" panel={<Output/>}/>
    </Tabs>
  )
}

const root = document.createElement("div");
root.classList.add("bp3-dark");
document.body.appendChild(root);

render(<App />, root)
