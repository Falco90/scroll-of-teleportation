'use client'
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useState } from 'react'
import "@scroll-tech/contracts/L1/gateways/IL1ETHGateway.sol";

const abi = [{ "inputs": [], "name": "increment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "number", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "newNumber", "type": "uint256" }], "name": "setNumber", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

export default function BalanceComponent() {
    const [number, setNumber] = useState(0)
    useContractRead({
        address: '0x22F47b234ec74E6A425d401c6aA95371A51c4448',
        functionName: 'number',
        abi: abi,
        onSuccess(data) {
            console.log(data)
            setNumber(Number(data));
        }
    })


    const { config } = usePrepareContractWrite({
        address: '0x22F47b234ec74E6A425d401c6aA95371A51c4448',
        abi: abi,
        functionName: 'increment',
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)

    return <>
        <div>
            {number}
            <button disabled={!write} onClick={() => write?.()}>
                Increment
            </button>
            {isLoading && <div>Check Wallet</div>}
            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        </div>
    </>
}