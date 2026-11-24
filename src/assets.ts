/**
 * Nivo Asset Resolver for @nivo-3d/react
 * Supports public asset directories, data URIs, CDN origins, and Next.js base paths.
 */

export interface AssetMapEntry {
  id: string;
  originalPath: string;
  publicUrl: string;
  sha256?: string;
}

export function getNivoAssetBaseUrl(): string {
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.NEXT_PUBLIC_NIVO_ASSET_BASE_URL) {
      return process.env.NEXT_PUBLIC_NIVO_ASSET_BASE_URL.replace(/\/$/, '');
    }
    if (process.env.NEXT_PUBLIC_BASE_PATH) {
      return process.env.NEXT_PUBLIC_BASE_PATH.replace(/\/$/, '');
    }
  }
  if (typeof window !== 'undefined' && (window as any).__NIVO_ASSET_BASE_URL__) {
    return String((window as any).__NIVO_ASSET_BASE_URL__).replace(/\/$/, '');
  }
  return '';
}

export function resolveNivoAsset(uriOrId: string, assetMap?: Record<string, AssetMapEntry>): string {
  if (!uriOrId) return '';
  if (
    uriOrId.startsWith('data:') ||
    uriOrId.startsWith('blob:') ||
    uriOrId.startsWith('http://') ||
    uriOrId.startsWith('https://')
  ) {
    return uriOrId;
  }

  if (assetMap && assetMap[uriOrId]) {
    const entry = assetMap[uriOrId];
    const base = getNivoAssetBaseUrl();
    const rel = entry.publicUrl.startsWith('/') ? entry.publicUrl : `/${entry.publicUrl}`;
    return base ? `${base}${rel}` : rel;
  }

  const base = getNivoAssetBaseUrl();
  const path = uriOrId.startsWith('/') ? uriOrId : `/${uriOrId}`;
  return base ? `${base}${path}` : path;
}
