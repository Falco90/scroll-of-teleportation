import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

export async function GET() {
  return NextResponse.json({ name: 'Anuj Singh' });
}