"use client";

/**
 * NivoSceneClient: React Server Component Boundary Wrapper for Next.js App Router
 * Exported by @nivo-3d/react (https://nivo.jonave.in)
 */

import { NivoViewer } from './NivoViewer';
import type { NivoSceneClientProps } from './types';

export function NivoSceneClient({
  scene,
  sceneData,
  className,
  style,
  cameraControls = true,
  touchMode = 'scroll-priority',
  sleepWhenHidden = true,
  autoPlay = true,
  lazy = true,
  rootMargin = '200px',
  posterUrl,
  onContextLost,
  onContextRestored,
}: NivoSceneClientProps) {
  const resolvedScene = scene ?? sceneData;

  return (
    <NivoViewer
      scene={resolvedScene}
      className={className}
      style={style}
      cameraControls={cameraControls}
      touchMode={touchMode}
      sleepWhenHidden={sleepWhenHidden}
      autoPlay={autoPlay}
      lazy={lazy}
      rootMargin={rootMargin}
      posterUrl={posterUrl}
      onContextLost={onContextLost}
      onContextRestored={onContextRestored}
    />
  );
}

export default NivoSceneClient;
