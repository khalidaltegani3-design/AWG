// src/lib/qnas.ts (server-only)
const BASE = process.env.QNAS_API_BASE || 'https://api.qnas.qa/v1';
const TOKEN = process.env.QNAS_API_TOKEN || '';
const DOMAIN = process.env.QNAS_API_DOMAIN || '';
const ENFORCE_QATAR_BOUNDS = process.env.QNAS_ENFORCE_QATAR_BOUNDS === '1';

function headers() {
  if (!TOKEN || !DOMAIN) {
      throw new Error('QNAS is not configured on the server. Missing API token or domain.');
  }
  return {
    'X-Token': TOKEN,
    'X-Domain': DOMAIN,
    'Accept': 'application/json',
  };
}

function toNum(x: any): number | null {
  if (typeof x === 'number') return x;
  if (typeof x === 'string') {
    const n = Number(x);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function parseCoords(j: any): { lat: number; lng: number } {
  // نحاول أكثر من شكل محتمل
  const candidates = [
    { lat: j?.lat, lng: j?.lng },
    { lat: j?.latitude, lng: j?.longitude },
    { lat: j?.location?.lat, lng: j?.location?.lng },
    { lat: j?.data?.lat, lng: j?.data?.lng },
  ];
  for (const c of candidates) {
    const lat = toNum(c.lat), lng = toNum(c.lng);
    if (lat != null && lng != null) return { lat, lng };
  }
  throw new Error('رد QNAS لا يحتوي على إحداثيات lat/lng معروفة');
}

async function getJSON(path: string) {
  // Normalize Arabic numerals to Western numerals if present
  const normalizeNumerals = (text: string) => {
    return text.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
  };
  const normalizedPath = normalizeNumerals(path);

  const url = `${BASE}${normalizedPath}`;
  const res = await fetch(url, { headers: headers(), cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 429) throw new Error('تم تجاوز حد المعدّل، حاول بعد لحظات.');
    const txt = await res.text().catch(() => res.statusText);
    throw new Error(`خطأ من QNAS: ${res.status} ${txt}`);
  }
  const json = await res.json();
  if (json?.status && json.status !== 'success') {
    throw new Error(json.message || 'QNAS: استجابة غير ناجحة');
  }
  return json;
}

export async function getZones() {
  return getJSON('/get_zones');
}
export async function getStreets(zone: string|number) {
  return getJSON(`/get_streets/${zone}`);
}
export async function getBuildings(zone: string|number, street: string|number) {
  return getJSON(`/get_buildings/${zone}/${street}`);
}
export async function getLocation(zone: number, street: number, building: number) {
  const j = await getJSON(`/get_location/${zone}/${street}/${building}`);
  const { lat, lng } = parseCoords(j);

  // (اختياري) حارس قطر
  if (ENFORCE_QATAR_BOUNDS) {
    if (lat < 24 || lat > 27.8 || lng < 50.4 || lng > 52.6) {
      throw new Error('الإحداثيات خارج حدود قطر المتوقعة.');
    }
  }
  return { lat, lng };
}

    