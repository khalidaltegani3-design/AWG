// src/app/api/qnas/get-location/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getLocation } from '@/lib/qnas';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const z = Number(body?.zone), s = Number(body?.street), b = Number(body?.building);
    if (!Number.isFinite(z) || !Number.isFinite(s) || !Number.isFinite(b)) {
      return NextResponse.json({ ok: false, error: 'قِيَم المنطقة/الشارع/المبنى غير صالحة.' }, { status: 400 });
    }
    const data = await getLocation(z, s, b);
    return NextResponse.json({ ok: true, data });
  } catch (e: any) {
    // لا نكشف تفاصيل حساسة للمستخدم، لكن نسجّل في السيرفر
    console.error('[QNAS get_location] error:', e?.message);
    return NextResponse.json({ ok: false, error: e?.message ?? 'فشل جلب الموقع من QNAS' }, { status: 400 });
  }
}

    