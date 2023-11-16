const express = require("express");
const AWS = require("aws-sdk");

const router = express.Router();

// configure AWS credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
});

const IVS = new AWS.IVS();

// Store the channel ARN in memory (this should be a database in a production application)
let channelArn = '';

// Start the IVS channel
const startStream = async (req,res) => {
    const {channel} = req.query ;
    if(!channel){
        res.status(500).json({error: "Channel is missing"})
    }
    try {
        const createChannelResponse = await IVS.createChannel({ name: channel }).promise();
        channelArn = createChannelResponse.channel.arn;
        res.status(200).json({ message: 'Channel started successfully', channelArn });
      } catch (error) {
        console.error('Error starting the channel:', error);
        res.status(500).json({ error: 'Failed to start the channel' });
      }
  };


  // Stop the IVS channel
  const stopStream = async (req,res) => {
    if (!channelArn) {
        res.status(400).json({ error: 'No active channel to stop' });
        return;
      }
    
      try {
        await IVS.stopChannel({ arn: channelArn }).promise();
        channelArn = '';
        res.status(200).json({ message: 'Channel stopped successfully' });
      } catch (error) {
        console.error('Error stopping the channel:', error);
        res.status(500).json({ error: 'Failed to stop the channel' });
      }
  };


router.get("/start", startStream);

router.get("/stop", stopStream)

module.exports = router;
