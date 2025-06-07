/**
 * Cloudflare Worker - ERC721 License Verification
 * Your micro-service + blockchain expertise combined
 */
interface Env {
  ALCHEMY_KEY: string;
  CONTRACT_ADDRESS: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }
    
    const { address } = await request.json();
    if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return new Response(JSON.stringify({ hasAccess: false, error: 'Invalid address' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    try {
      const response = await fetch(`https://eth-mainnet.g.alchemy.com/v2/${env.ALCHEMY_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_call',
          params: [{
            to: env.CONTRACT_ADDRESS,
            data: `0x7c5b4a9c000000000000000000000000${address.slice(2)}`
          }, 'latest'],
          id: 1
        })
      });
      
      const result = await response.json();
      const hasAccess = result.result !== '0x0000000000000000000000000000000000000000000000000000000000000000';
      
      return new Response(JSON.stringify({ hasAccess }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ hasAccess: false, error: 'RPC call failed' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};