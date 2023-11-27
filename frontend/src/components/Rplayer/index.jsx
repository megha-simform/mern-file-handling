// VideoPlayer.js
import React, { useState, useEffect } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

const Rplayer = () => {
  const [videoChunks, setVideoChunks] = useState([]);
  const [videoSource, setVideoSource] = useState(null);

  useEffect(() => {
    // Fetch video chunks from your API
    const fetchVideoChunks = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT");
        const reader = response.body.getReader();

        // Read video chunks and append to the array
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          setVideoChunks((prevChunks) => [...prevChunks, value]);
        }
      } catch (error) {
        console.error("Error fetching video chunks:", error);
      }
    };

    fetchVideoChunks();
  }, []); // Ensure this effect runs only once

  useEffect(() => {
    // Create a Blob from the accumulated chunks
    if (videoChunks.length > 0) {
      const videoBlob = new Blob(videoChunks, { type: "video/mp4" });

      // Create a data URL from the Blob
      const videoDataURL = URL.createObjectURL(videoBlob);

      // Set the video source
      setVideoSource({
        type: "video",
        sources: [
          {
            src: videoDataURL,
            provider: "html5",
          },
        ],
      });
    }
  }, [videoChunks]);

  return <div>{videoSource && <Plyr source={videoSource} />}</div>;
};

export default Rplayer;
