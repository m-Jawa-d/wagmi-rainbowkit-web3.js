import { useMemo } from 'react';
import Web3 from 'web3';
import { useClient, useConnectorClient } from 'wagmi';

/**
 * Converts a Wagmi client into a Web3.js instance.
 * @param {Object} client - The Wagmi client object.
 * @returns {Object} - A Web3.js instance.
 */
function clientToWeb3js(client) {
    if (!client) {
        // If no client is provided, return a default Web3 instance.
        return new Web3();
    }

    const { transport } = client;
    // Check if the transport type is 'fallback'.
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
 * @returns {Object} - A Web3.js instance.
 */
export function useWeb3js({ chainId } = {}) {
    // Get the client using useClient from Wagmi. This client does not have access to private keys.
    const client = useClient({ chainId });
    // Use useMemo to memoize the Web3.js instance created from the client.
    return useMemo(() => clientToWeb3js(client), [client]);
}

/**
 * Custom hook to create a Web3.js instance for write operations (transactions).
 * @param {Object} options - The options object.
 * @param {number} options.chainId - The chain ID to connect to.
 * @returns {Object} - A Web3.js instance.
 */
export function useWeb3jsSigner({ chainId } = {}) {
    // Get the connector client using useConnectorClient from Wagmi. This client has access to private keys.
    const { data: client } = useConnectorClient({ chainId });
    // Use useMemo to memoize the Web3.js instance created from the connector client.
    return useMemo(() => clientToWeb3js(client), [client]);
}
