// src/app/api/qnas/get-location/route.ts

// تشغيل الراوت على بيئة Node (وليس Edge)
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getLocation } from '@/lib/qnas';

export async function POST(req: NextRequest) {
  try {
    // ✅ تحقق من المتغيرات الضرورية (عشان ما ينهار الراوت قبل الرد)
    if (!process.env.QNAS_API_TOKEN || !process.env.QNAS_API_DOMAIN) {
      console.error('[QNAS get_location] fatal: QNAS service is not configured on the server. Missing QNAS_API_TOKEN or QNAS_API_DOMAIN.');
      return NextResponse.json(
        { ok: false, error: 'خدمة تحديد الموقع غير مهيأة على الخادم.' },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const z = Number(body?.zone), s = Number(body?.street), b = Number(body?.building);
    if (!Number.isFinite(z) || !Number.isFinite(s) || !Number.isFinite(b)) {
      return NextResponse.json({ ok: false, error: 'قِيَم المنطقة/الشارع/المبنى غير صالحة.' }, { status: 400 });
    }

    const data = await getLocation(z, s, b);
    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (e: any) {
    console.error('[QNAS get_location] fatal:', e?.stack || e?.message || e);
    // ⚠️ مهم: نرجع رد JSON دايمًا (بدل crash) عشان ما يصير fetch failed
    return NextResponse.json({ ok: false, error: e?.message ?? 'فشل جلب الموقع من QNAS' }, { status: 502 });
  }
}

    