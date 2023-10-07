/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';
import { IVSPlayer, PlayerEventType } from 'amazon-ivs-player';

const IVSPlayerComponent = ({ streamKey }) => {
  const videoRef = useRef(null);
  const player = useRef(null);

   // Initialize the IVS Player
   player.current = new IVSPlayer.create({
    techOrder: ['AmazonIVS'],
    autoplay: true,
    bufferedReplay: true,
    controls: true,
    width: '100%',
    height: '100%',
  });
  
  useEffect(() => {
    if (!videoRef.current) return;

    player.current.attachHTMLVideoElement(videoRef.current);
    player.current.load(`https://${streamKey}.us-west-2.playback.live-video.net/api/video`);

    // Add event listeners
    player.current.addEventListener(PlayerEventType.ERROR, (err) => {
      console.error('Player Error:', err);
    });

    return () => {
      // Clean up when the component unmounts
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [streamKey]);

  return (
    <div>
      <video ref={videoRef} playsInline controls />
    </div>
  );
};

export default IVSPlayerComponent;
