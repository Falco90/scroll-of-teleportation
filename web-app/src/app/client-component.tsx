'use client'
 
import { useState } from 'react'
 
export default function ClientComponent({
}: {
}) {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <w3m-button />
    </>
  )
}