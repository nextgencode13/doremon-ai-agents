import { PixelPanel } from '@/components/PixelPanel';
import { getDoraemonImageUrl } from '@/assets/doraemon';

/**
 * Loader shown on the empty floor while the god agent ("Doraemon") is clocking
 * in on launch.
 */
export function DoraemonBooting() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none'
    }}>
      <div style={{ pointerEvents: 'auto', width: 380 }}>
        <PixelPanel variant="dialog" title="4D POCKET INITIALIZING" noPadding>
          <div style={{
            padding: 20,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14
          }}>
            <img
              src={getDoraemonImageUrl('doraemon')}
              alt="Doraemon"
              style={{ width: 64, height: 64, objectFit: 'contain' }}
            />
            {/* Stepped pixel blocks — staggered blink */}
            <div style={{ display: 'flex', gap: 6 }}>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  style={{
                    width: 14, height: 14,
                    background: '#1C86EE',
                    boxShadow: 'var(--cth-shadow-hard)',
                    animation: 'cth-blink 1s steps(1, end) infinite',
                    animationDelay: `${i * 0.2}s`,
                    borderRadius: 3
                  }}
                />
              ))}
            </div>
            <p style={{
              margin: 0, fontSize: 13, lineHeight: '20px', textAlign: 'center',
              color: 'var(--cth-ink-700)'
            }}>
              Doraemon is opening the 4D Pocket and getting the squad ready.
              Hang tight…
            </p>
          </div>
        </PixelPanel>
      </div>
    </div>
  );
}


