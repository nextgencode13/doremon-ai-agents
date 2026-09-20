// Doraemon Character Image Assets Registry
// Uses images from public/Doremon-character-img/

export const DORAEMON_IMAGES: Record<string, string> = {
  doraemon: '/Doremon-character-img/doraemon.png',
  nobita: '/Doremon-character-img/nobita.png',
  shizuka: '/Doremon-character-img/shizuka.png',
  gian: '/Doremon-character-img/gian.png',
  suneo: '/Doremon-character-img/suneo.png',
  dorami: '/Doremon-character-img/dorami.png',
  dekisugi: '/Doremon-character-img/dekisugi.png',
  jaiko: '/Doremon-character-img/jaiko.png',
  sensei: '/Doremon-character-img/sensei.png',
  sewashi: '/Doremon-character-img/sewashi.png',
  minidora: '/Doremon-character-img/minidora.png',
  tamako: '/Doremon-character-img/tamako.png',
  nobisuke: '/Doremon-character-img/nobisuke.png',
  gianmom: '/Doremon-character-img/gianmom.png',
  suneomom: '/Doremon-character-img/suneomom.png',
  // Legacy mappings so existing sessions immediately show the authentic Doraemon illustrations
  michael: '/Doremon-character-img/doraemon.png',
  angela: '/Doremon-character-img/shizuka.png',
  kelly: '/Doremon-character-img/nobita.png',
  jim: '/Doremon-character-img/suneo.png',
  dwight: '/Doremon-character-img/gian.png',
  pam: '/Doremon-character-img/dorami.png',
  kevin: '/Doremon-character-img/dekisugi.png',
  stanley: '/Doremon-character-img/sensei.png',
  oscar: '/Doremon-character-img/sewashi.png',
  creed: '/Doremon-character-img/jaiko.png',
  meredith: '/Doremon-character-img/tamako.png',
  toby: '/Doremon-character-img/gianmom.png',
  ryan: '/Doremon-character-img/minidora.png',
  andy: '/Doremon-character-img/suneomom.png',
  phyllis: '/Doremon-character-img/nobisuke.png',
};

export function getDoraemonImageUrl(name?: string): string {
  if (!name) return DORAEMON_IMAGES.doraemon;
  const hit = DORAEMON_IMAGES[name.toLowerCase()];
  return hit || DORAEMON_IMAGES.doraemon;
}
