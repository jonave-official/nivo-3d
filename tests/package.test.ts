import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

test('nivo-3d package integrity suite', async (t) => {
  await t.test('package.json declares valid metadata', () => {
    const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'));
    assert.strictEqual(pkg.name, 'nivo-3d');
    assert.strictEqual(pkg.version, '1.0.0');
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

  await t.test('exports check in compiled index.js', async () => {
    const indexPath = path.resolve(process.cwd(), 'dist/index.js');
    const content = fs.readFileSync(indexPath, 'utf8');
    assert.ok(content.includes('NivoViewer'));
    assert.ok(content.includes('NivoSceneClient'));
    assert.ok(content.includes('resolveNivoAsset'));
  });
});
