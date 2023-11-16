/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import Player from "./IVSPlayerComponent";
import { Button, Input } from "antd";
import axios from "axios";
import ReactPlayer from "react-player";

export default function MediaStreaming() {
  const [channelArn, setChannelArn] = useState("");
  const [channelName, setChannelName] = useState("");

  const handleStartClick = async () => {
    // Make an API request to start the IVS channel and get the channelArn
    const { data } = await axios.get(
      "http://localhost:5000/media-streaming/start"
    );
    // Set the channelArn in state here
    setChannelArn(data.channelArn);
  };

  const handleStopClick = async () => {
    // Make an API request to stop the IVS channel
    const { data } = await axios.get(
      "http://localhost:5000/media-streaming/stop"
    );

    // Clear the channelArn in state here
    setChannelArn("");
  };

  return (
    <div>
      <h1>Amazon IVS Streaming Player</h1>
      {channelArn ? (
        <>
          <Button onClick={handleStopClick}>Stop Streaming</Button>{" "}
          <Player streamKey={channelArn} />
        </>
      ) : (
        <>

          <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
            <span>Enter Channel : </span>
            <Input
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </div>
          <Button onClick={handleStartClick} disabled={!channelName}>Start Streaming</Button>
        </>
      )}
    </div>
  );
}
