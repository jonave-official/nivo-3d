import React from 'react';

export interface AssetMapEntry {
  id: string;
  originalPath: string;
  publicUrl: string;
  sha256?: string;
}

export type NivoJsonPrimitive = string | number | boolean | null;
export type NivoJsonValue = NivoJsonPrimitive | NivoJsonValue[] | { [key: string]: NivoJsonValue };

export interface NivoTransform {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export interface NivoSceneObject {
  id: string;
  name: string;
  type: 'mesh' | 'model' | 'light' | 'camera' | 'group' | 'text' | string;
  meshType?: 'box' | 'sphere' | 'cylinder' | 'plane' | 'torus' | 'cone' | 'dodecahedron' | 'icosahedron';
  transform: NivoTransform;
  color?: string;
  roughness?: number;
  metalness?: number;
  opacity?: number;
  transparent?: boolean;
  wireframe?: boolean;
  visible?: boolean;
  modelUrl?: string;
  lightType?: 'directional' | 'point' | 'spot' | 'ambient';
  intensity?: number;
  children?: string[];
  isWebOnly?: boolean;
  [key: string]: any;
}

export interface NivoKeyframe {
  id: string;
  time: number;
  value: number;
  easing?: string;
}

export interface NivoAnimationTrack {
  id: string;
  objectId: string;
  property: string;
  keyframes: NivoKeyframe[];
  enabled?: boolean;
}

export interface NivoSceneData {
  version: string;
  metadata?: {
    generator?: string;
    generatorUrl?: string;
    exportedAt?: string;
    title?: string;
  };
  objects: NivoSceneObject[];
  tracks?: NivoAnimationTrack[];
  cameraBookmarks?: any[];
  activeCameraId?: string;
  globalEnvironment?: {
    background?: string;
    environmentMap?: string;
    ambientIntensity?: number;
    [key: string]: any;
  };
}

export interface NivoViewerProps {
  /**
   * The declarative scene data object exported from Nivo 3D Studio.
   */
  scene?: NivoSceneData;
  /**
   * Optional URL to load scene.json dynamically from a CDN or cloud storage.
   */
  src?: string;
  /**
   * CSS class name for the wrapper container.
   */
  className?: string;
  /**
   * Inline style object for the wrapper container.
   */
  style?: React.CSSProperties;
  /**
   * Whether to enable user interactive orbit controls (pan, rotate, zoom).
   * @default true
   */
  cameraControls?: boolean;
  /**
   * Whether to auto-play scene animations.
   * @default true
   */
  autoPlay?: boolean;
  /**
   * Whether to wait until the component scrolls into viewport before creating WebGL context.
   * @default true
   */
  lazy?: boolean;
  /**
   * IntersectionObserver rootMargin bounding threshold for pre-initialization.
   * @default '200px'
   */
  rootMargin?: string;
  /**
   * Static poster image URL to display before the WebGL canvas mounts or while loading.
   */
  posterUrl?: string;
  /**
   * Callback fired when the 3D scene finishes loading.
   */
  onLoad?: (scene: NivoSceneData) => void;
  /**
   * Fallback UI to render while loading.
   */
  fallback?: React.ReactNode;
}

export interface NivoSceneClientProps {
  /**
   * Required serializable scene data passed across the React Server Component boundary.
   */
  sceneData: NivoSceneData;
  /**
   * Optional CSS class name for the wrapper container.
   */
  className?: string;
  /**
   * Inline style object for the wrapper container.
   */
  style?: React.CSSProperties;
  /**
   * Whether to enable user interactive orbit controls (pan, rotate, zoom).
   * @default true
   */
  cameraControls?: boolean;
  /**
   * Whether to auto-play scene animations.
   * @default true
   */
  autoPlay?: boolean;
  /**
   * Whether to wait until the component scrolls into viewport before creating WebGL context.
   * @default true
   */
  lazy?: boolean;
  /**
   * IntersectionObserver rootMargin bounding threshold for pre-initialization.
   * @default '200px'
   */
  rootMargin?: string;
  /**
   * Static poster image URL to display before the WebGL canvas mounts or while loading.
   */
  posterUrl?: string;
}
