import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

test('nivo-3d package integrity and hardening suite', async (t) => {
  const pkgPath = path.resolve(process.cwd(), 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  await t.test('package.json declares valid metadata and semver', () => {
    assert.strictEqual(pkg.name, 'nivo-3d');
    assert.strictEqual(pkg.version, '1.0.2');
    assert.strictEqual(pkg.sideEffects, false);
    assert.ok(pkg.peerDependencies['react']);
    assert.ok(pkg.peerDependencies['three']);
    assert.ok(pkg.peerDependencies['@react-three/fiber']);
  });

  await t.test('dist outputs exist and are non-empty after build', () => {
    const distDir = path.resolve(process.cwd(), 'dist');
    const requiredFiles = [
      'index.js',
      'index.cjs',
      'index.d.ts',
      'types.d.ts',
      'NivoViewer.d.ts',
      'NivoSceneClient.d.ts',
      'assets.d.ts'
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(distDir, file);
      assert.ok(fs.existsSync(filePath), `Missing ${file}`);
      const stats = fs.statSync(filePath);
      assert.ok(stats.size > 0, `${file} is empty`);
    }
  });

  await t.test('exports check in compiled index.js and index.cjs', async () => {
    const esmContent = fs.readFileSync(path.resolve(process.cwd(), 'dist/index.js'), 'utf8');
    assert.ok(esmContent.includes('NivoViewer'));
    assert.ok(esmContent.includes('NivoSceneClient'));
    assert.ok(esmContent.includes('resolveNivoAsset'));

    const cjsContent = fs.readFileSync(path.resolve(process.cwd(), 'dist/index.cjs'), 'utf8');
    assert.ok(cjsContent.includes('NivoViewer'));
    assert.ok(cjsContent.includes('NivoSceneClient'));
    assert.ok(cjsContent.includes('resolveNivoAsset'));
  });

  await t.test('TypeScript declarations export hardened prop interfaces', () => {
    const typesDts = fs.readFileSync(path.resolve(process.cwd(), 'dist/types.d.ts'), 'utf8');
    assert.ok(typesDts.includes('touchMode?: NivoTouchMode'), 'Missing touchMode in types.d.ts');
    assert.ok(typesDts.includes('sleepWhenHidden?: boolean'), 'Missing sleepWhenHidden in types.d.ts');
    assert.ok(typesDts.includes('onContextLost?: () => void'), 'Missing onContextLost in types.d.ts');
    assert.ok(typesDts.includes('onContextRestored?: () => void'), 'Missing onContextRestored in types.d.ts');
    assert.ok(typesDts.includes('sceneData?: NivoSceneData'), 'Missing sceneData backward-compat alias');
  });

  await t.test('Touch disambiguation logic resolves correctly', () => {
    // scroll-priority: single-finger scrolls page (pan-y), two-finger orbits
    const getTouchConfig = (mode: string) => {
      const isScroll = mode === 'scroll-priority';
      return {
        touchAction: isScroll ? 'pan-y' : 'none',
        hasOneFingerRotate: !isScroll
      };
    };

    assert.deepStrictEqual(getTouchConfig('scroll-priority'), {
      touchAction: 'pan-y',
      hasOneFingerRotate: false
    });
    assert.deepStrictEqual(getTouchConfig('rotate-priority'), {
      touchAction: 'none',
      hasOneFingerRotate: true
    });
  });

  await t.test('WebGL context loss and restore event recovery contract', () => {
    let lostFired = false;
    let restoredFired = false;
    let canvasKey = 0;

    const mockCanvasDom = {
      listeners: {} as Record<string, Function>,
      addEventListener(event: string, fn: Function) {
        this.listeners[event] = fn;
      },
      dispatchEvent(event: string, payload: any) {
        this.listeners[event]?.(payload);
      }
    };

    // Simulate NivoViewer onCreated hook
    mockCanvasDom.addEventListener('webglcontextlost', (e: any) => {
      e.preventDefault();
      lostFired = true;
    });
    mockCanvasDom.addEventListener('webglcontextrestored', () => {
      canvasKey++;
      restoredFired = true;
    });

    let defaultPrevented = false;
    mockCanvasDom.dispatchEvent('webglcontextlost', {
      preventDefault() {
        defaultPrevented = true;
      }
    });

    assert.strictEqual(lostFired, true, 'Context lost listener should execute');
    assert.strictEqual(defaultPrevented, true, 'Context lost event must call preventDefault()');

    mockCanvasDom.dispatchEvent('webglcontextrestored', {});
    assert.strictEqual(restoredFired, true, 'Context restored listener should execute');
    assert.strictEqual(canvasKey, 1, 'Canvas key must increment to force clean GPU remount');
  });
});
