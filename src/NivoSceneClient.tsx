"use client";

/**
 * NivoSceneClient: React Server Component Boundary Wrapper for Next.js App Router
 * Exported by @nivo-3d/react (https://nivo.jonave.in)
 */

import { NivoViewer } from './NivoViewer';
import type { NivoSceneClientProps } from './types';

export function NivoSceneClient({
  sceneData,
  className,
  style,
  cameraControls = true,
  autoPlay = true,
  lazy = true,
  rootMargin = '200px',
  posterUrl,
}: NivoSceneClientProps) {
  return (
    <NivoViewer
      scene={sceneData}
      className={className}
      style={style}
      cameraControls={cameraControls}
      autoPlay={autoPlay}
      lazy={lazy}
      rootMargin={rootMargin}
      posterUrl={posterUrl}
    />
  );
}

export default NivoSceneClient;
