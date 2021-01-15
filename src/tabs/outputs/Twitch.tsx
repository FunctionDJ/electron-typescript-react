import { Button, Icon, InputGroup, Label, Spinner } from "@blueprintjs/core";
import React, { useEffect } from "react";
import { Client } from "tmi.js";
import createInputHandler from "../../helpers/create-input-handler";

let clientTimeout: number;
let channelTimeout: number;

export default function twitch() {
  const [isValid, setValid] = React.useState(false);
  const [username, setUsername] = React.useState<string>("FunctionDJ");
  const [token, setToken] = React.useState<string>("oauth:9o53xbh6knt3ifgolmse7wqka0q8wf");
  const [target, setTarget] = React.useState<string>("");

  const [client, setClient] = React.useState<Client>();

  const [isCheckingCredentials, setCheckingCredentials] = React.useState(false);
  const [isCheckingTarget, setCheckingTarget] = React.useState(false);
  
  const maybeCredentialsSpinner = isCheckingCredentials ? <Spinner size={Icon.SIZE_STANDARD}/> : undefined;
  const maybeTargetSpinner = isCheckingTarget ? <Spinner size={Icon.SIZE_STANDARD}/> : undefined;

  useEffect(() => {
    window.clearTimeout(clientTimeout);
    clientTimeout = window.setTimeout(() => {
      if (!username || !token) {
        return;
      }

      setCheckingCredentials(true);
  
      const newClient = Client({
        identity: {
          username,
          password: token
        }
      });
  
      setClient(newClient);
  
      newClient.connect().finally(() => setCheckingCredentials(false));
    }, 500);
  }, [username, token]);

  useEffect(() => {
    window.clearTimeout(channelTimeout);
    channelTimeout = window.setTimeout(async () => {
      if (!client || !target) {
        return;
      }
      
      setCheckingTarget(true);
  
      // Leave all channels
      await Promise.all(client.getChannels().map(channel => {
        client.part(channel);
      }));

      client.join(target)
        .then(() => setValid(true))
        .catch(e => {setValid(false); throw e})
        .finally(() => setCheckingTarget(false));
    }, 500);
  }, [target]);

  const createInvalidatingHandler = (handler: (value: string) => void) => createInputHandler(value => {
    setValid(false);
    handler(value);
  });

  const handleTargetChange = createInvalidatingHandler(setTarget);
  const handleUserNameChange = createInvalidatingHandler(setUsername);
  const handleTokenChange = createInvalidatingHandler(setToken);

  return (
    <div style={{width: 400}}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        flex: 1
      }}>
        <Label htmlFor="twitch.username" style={{lineHeight: 2}}>Twitch username</Label>
        <InputGroup
          id="twitch.username"
          leftIcon="user"
          onChange={handleUserNameChange}
          onPaste={handleUserNameChange}
          placeholder="Username"
          rightElement={maybeCredentialsSpinner}
          value={username}
        />
      </div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        flex: 1
      }}>
        <Label htmlFor="twitch.token" style={{lineHeight: 2}}>Twitch token</Label>
        <InputGroup
          id="twitch.token"
          leftIcon="lock"
          onChange={handleTokenChange}
          onPaste={handleTokenChange}
          placeholder="Token"
          rightElement={maybeCredentialsSpinner}
          value={token}
        />
      </div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        flex: 1
      }}>
        <Label htmlFor="twitch.target" style={{lineHeight: 2}}>Target Twitch channel</Label>
        <InputGroup
          id="twitch.target"
          leftIcon="tick-circle"
          onChange={handleTargetChange}
          onPaste={handleTargetChange}
          placeholder="Target"
          rightElement={maybeTargetSpinner}
          value={target}
        />
      </div>

      <Button text="Activate" disabled={!isValid}/>
    </div>
  )
}