import { ethers } from 'ethers';

// Standard Chainlink Aggregator Interface
const AGGREGATOR_ABI = [
  "function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)"
];

/**
 * @service OracleService
 * @dev Brdiges real-world data (prices, weather, yield) to the blockchain platform.
 */
export class OracleService {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL || 'https://rpc-amoy.polygon.technology/');
  }

  /**
   * Fetches the latest price for a given asset from Chainlink.
   * Example: BRENT/USD feed
   */
  async getLatestAssetPrice(feedAddress: string): Promise<number> {
    console.log(`[Oracle] Fetching price from feed: ${feedAddress}`);
    
    try {
      const priceFeed = new ethers.Contract(feedAddress, AGGREGATOR_ABI, this.provider);
      const data = await priceFeed.latestRoundData();
      
      // Chainlink prices usually have 8 decimals for non-ETH feeds
      const price = Number(data.answer) / 10**8;
      return price;
    } catch (error) {
      console.error(`[Oracle] Failed to fetch price:`, error);
      // Fallback to a reliable centralized API or cache if needed
      return 0;
    }
  }

  /**
   * Verified Petro-Yield data for distribution.
   */
  async getPetroYieldData() {
    // This address would be the BRENT/USD feed on Polygon
    const BRENT_USD_FEED = '0x0000000000000000000000000000000000000000'; 
    return this.getLatestAssetPrice(BRENT_USD_FEED);
  }
}
