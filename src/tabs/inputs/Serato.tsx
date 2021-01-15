import { Button, Icon, InputGroup, Label, Spinner } from "@blueprintjs/core";
import React from "react";
import createInputHandler from "../../helpers/create-input-handler";

let timeout: number;

export default () => {
  const [isValid, setValid] = React.useState(false);
  const [spin, setSpin] = React.useState(false);

  const maybeSpinner = spin ? <Spinner size={Icon.SIZE_STANDARD}/> : undefined;

  const handleChange = createInputHandler(value => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(async () => {
      setSpin(true);
      const response = await fetch(`https://serato.com/playlists/${value}`);
      
      setValid(response.status === 200);
      setSpin(false);
    }, 500);
  });

  return (
    <div style={{width: 400}}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        flex: 1
      }}>
        <Label htmlFor="serato.username" style={{lineHeight: 2}}>Serato Username</Label>
        <InputGroup
          asyncControl={true}
          id="serato.username"
          leftIcon="user"
          onChange={handleChange}
          placeholder="Username"
          rightElement={maybeSpinner}
        />
      </div>

      <Button text="Activate" disabled={!isValid}/>
    </div>
  )
}