/**
 * 20KB Size Gate - Your precision mastery in 10 lines
 * Auto-fails builds that exceed gzipped limits
 */
import { gzipSync } from 'zlib';

export default function sizeGate(maxSizeKB = 20) {
  const maxBytes = maxSizeKB * 1024;
  return {
    name: 'fx-size-gate',
    writeBundle(_, bundle) {
      Object.entries(bundle).forEach(([name, chunk]) => {
        if (chunk.type === 'chunk') {
          const gzipped = gzipSync(chunk.code).length;
          if (gzipped > maxBytes) throw new Error(`💥 ${name}: ${gzipped}B > ${maxBytes}B LIMIT EXCEEDED!`);
          console.log(`✅ ${name}: ${(gzipped/1024).toFixed(1)}KB gzipped`);
        }
      });
    }
  };
}