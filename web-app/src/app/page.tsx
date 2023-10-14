'use client'

import Image from 'next/image'
import ClientComponent from './client-component'
import BalanceComponent from './balance-component'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { scrollSepolia, sepolia } from 'wagmi/chains'

const projectId = '8c36df97fd315516a1df9892c67ab079';

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [scrollSepolia, sepolia]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

export default function App() {

  return (
    <WagmiConfig config={wagmiConfig}>
      <ClientComponent />
      <BalanceComponent />
    </WagmiConfig>
  )
}
