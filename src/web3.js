import { useMemo } from 'react';
import Web3 from 'web3';
import { useClient, useConnectorClient } from 'wagmi';

/**
 * Converts a Wagmi client into a Web3.js instance.
 * @param {Object} client - The Wagmi client object.
 * @returns {Web3} - A Web3.js instance.
 */
function clientToWeb3js(client) {
    if (!client) {
        // Return a default Web3 instance if no client is provided.
        return new Web3();
    }

    const { transport } = client;
    
    // Handle 'fallback' transport type.
    if (transport.type === 'fallback') {
        // Use the URL of the first transport in the fallback transports array.
        return new Web3(transport.transports[0].value.url);
    }

    // Return a new Web3 instance using the provided transport.
    return new Web3(transport);
}

/**
 * Custom hook to create a Web3.js instance for read-only operations.
 * @param {Object} options - The options object.
 * @param {number} options.chainId - The chain ID to connect to.
 * @returns {Web3} - A Web3.js instance.
 */
export function useWeb3js({ chainId } = {}) {
    // Retrieve the client using useClient from Wagmi (read-only access).
    const client = useClient({ chainId });

    // Memoize the Web3.js instance created from the client.
    return useMemo(() => clientToWeb3js(client), [client]);
}

/**
 * Custom hook to create a Web3.js instance for write operations (transactions).
 * @param {Object} options - The options object.
 * @param {number} options.chainId - The chain ID to connect to.
 * @returns {Web3} - A Web3.js instance.
 */
export function useWeb3jsSigner({ chainId } = {}) {
    // Retrieve the connector client using useConnectorClient from Wagmi (write access).
    const { data: client } = useConnectorClient({ chainId });

    // Memoize the Web3.js instance created from the connector client.
    return useMemo(() => clientToWeb3js(client), [client]);
}
