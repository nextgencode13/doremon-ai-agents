import { useEffect, useRef, useState } from 'react';
import { paintCastPortrait, type OfficeCharacterName } from '@/scene/office/cast';
import { PORTRAIT_W, PORTRAIT_H } from '@/scene/office/portraitArt';
import { getDoraemonImageUrl } from '@/assets/doraemon';

const FRAME_W = PORTRAIT_W;
const FRAME_H = PORTRAIT_H;

export interface SpritePortraitProps {
  character: OfficeCharacterName;
  /** Pixels per source pixel. Whole numbers are exact; half-steps (1.5, 2.5)
   *  double every other row, which pixel art survives. */
  scale?: number;
  background?: string;
  /** Force procedural pixel art canvas instead of high-res image */
  pixelArt?: boolean;
}

/** Static standing portrait of an Office cast member (High-Res Doraemon Art or pixel avatar). */
export function SpritePortrait({
  character,
  scale = 2,
  background = 'transparent',
  pixelArt = false
}: SpritePortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgFailed, setImgFailed] = useState(false);
  const imageUrl = !pixelArt ? getDoraemonImageUrl(character) : undefined;

  useEffect(() => {
    setImgFailed(false);
  }, [character]);

  useEffect(() => {
    if (imageUrl && !imgFailed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (background !== 'transparent') {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    paintCastPortrait(ctx, character, scale).catch(() => { /* asset load race */ });
  }, [character, scale, background, imageUrl, imgFailed]);

  const w = Math.round(FRAME_W * scale);
  const h = Math.round(FRAME_H * scale);

  if (imageUrl && !imgFailed) {
    return (
      <img
        src={imageUrl}
        alt={character}
        onError={() => setImgFailed(true)}
        style={{
          width: w,
          height: h,
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          display: 'block',
          background: background !== 'transparent' ? background : undefined,
          userSelect: 'none',
          pointerEvents: 'none'
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={w}
      height={h}
      style={{
        width: w,
        height: h,
        imageRendering: 'pixelated',
        display: 'block'
      }}
    />
  );
}
