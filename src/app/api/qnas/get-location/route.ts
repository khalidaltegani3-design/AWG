// src/app/api/qnas/get-location/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getLocation } from '@/lib/qnas';

export async function POST(req: NextRequest) {
  try {
    const { zone, street, building } = await req.json();
    if (!zone || !street || !building) {
      return NextResponse.json({ ok: false, error: 'Missing zone/street/building' }, { status: 400 });
    }

    const data = await getLocation(zone, street, building);
    return NextResponse.json({ ok: true, data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message ?? 'QNAS error' }, { status: 400 });
  }
}
