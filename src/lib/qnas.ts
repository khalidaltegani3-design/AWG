// src/lib/qnas.ts (server-only)
const BASE = process.env.QNAS_API_BASE || 'https://api.qnas.qa/v1';
const TOKEN = process.env.QNAS_API_TOKEN!;
const DOMAIN = process.env.QNAS_API_DOMAIN!;

function headers() {
  return {
    'X-Token': TOKEN,
    'X-Domain': DOMAIN,
    'Accept': 'application/json',
  };
}

async function getJSON(path: string) {
  if (!TOKEN || !DOMAIN) {
      throw new Error('QNAS API token or domain is not configured in environment variables.');
  }
  // Normalize Arabic numerals to Western numerals if present
  const normalizeNumerals = (text: string) => {
    return text.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
  };
  const normalizedPath = normalizeNumerals(path);

  const res = await fetch(`${BASE}${normalizedPath}`, { headers: headers(), cache: 'no-store' });

  if (!res.ok) {
    const msg = await res.text().catch(()=>res.statusText);
    throw new Error(`QNAS API Error ${res.status}: ${msg}`);
  }
  const json = await res.json();
  if (json.status !== 'success' && res.status === 200) { // QNAS might return 200 OK with an error message
    throw new Error(json.message ?? 'QNAS returned an error');
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
export async function getLocation(zone: string|number, street: string|number, building: string|number) {
  const j = await getJSON(`/get_location/${zone}/${street}/${building}`);
  const lat = parseFloat(j.lat);
  const lng = parseFloat(j.lng);
  
  if (isNaN(lat) || isNaN(lng) || lat < 24 || lat > 27.5 || lng < 50.5 || lng > 52.5) {
    throw new Error('Coordinates are invalid or out of Qatar bounds');
  }
  return { lat, lng };
}
