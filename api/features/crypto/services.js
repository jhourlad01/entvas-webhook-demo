/**
 * Crypto event processing services
 */

class CryptoEventService {
  /**
   * Process a crypto price update event
   */
  static processPriceUpdate(event) {
    const { eventType, userId, timestamp, metadata } = event;
    
    // Validate crypto-specific data
    if (eventType !== 'crypto_price_update') {
      throw new Error('Invalid event type for crypto service');
    }
    
    if (!metadata || !metadata.source || !metadata.assets_count) {
      throw new Error('Missing required metadata for crypto event');
    }
    
    // Process the event
    const processedEvent = {
      ...event,
      processedAt: new Date().toISOString(),
      processedBy: 'crypto_service'
    };
    
    console.log(`Processed crypto event: ${metadata.assets_count} assets from ${metadata.source}`);
    
    return processedEvent;
  }
  
  /**
   * Validate crypto event data
   */
  static validateEvent(event) {
    const required = ['eventType', 'userId', 'timestamp'];
    const missing = required.filter(field => !event[field]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
    
    return true;
  }
}

module.exports = CryptoEventService; 