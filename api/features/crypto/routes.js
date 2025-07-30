const express = require('express');
const router = express.Router();

/* POST crypto events */
router.post('/events', function(req, res, next) {
  try {
    const { eventType, userId, timestamp, metadata } = req.body;
    
    // Validate required fields
    if (!eventType || !userId || !timestamp) {
      return res.status(400).json({
        error: "Missing required fields: eventType, userId, timestamp"
      });
    }
    
    // Process crypto event
    console.log(`Received ${eventType} event from ${userId} at ${timestamp}`);
    
    // TODO: Save to database
    // TODO: Emit via WebSocket
    
    res.status(200).json({
      success: true,
      message: "Event received successfully",
      event: {
        eventType,
        userId,
        timestamp,
        metadata
      }
    });
    
  } catch (error) {
    console.error('Error processing event:', error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

/* POST callback endpoint for CoinGecko data */
router.post('/callback', function(req, res, next) {
  try {
    const { message, timestamp, source, data } = req.body;
    
    console.log(`Received CoinGecko data from ${source} at ${timestamp}`);
    console.log(`Message: ${message}`);
    console.log(`Assets count: ${data ? data.length : 0}`);
    
    // TODO: Save to database
    // TODO: Emit via WebSocket
    
    res.status(200).json({
      success: true,
      message: "CoinGecko data received successfully",
      received: {
        message,
        timestamp,
        source,
        assetsCount: data ? data.length : 0
      }
    });
    
  } catch (error) {
    console.error('Error processing CoinGecko callback:', error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

module.exports = router; 