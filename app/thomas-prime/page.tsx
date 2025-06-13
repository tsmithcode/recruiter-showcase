'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Howl } from 'howler';

const BRAND = { clay: '#c76b64', taupe: '#9c7c74', mauve: '#9d7c75' };
const CONFIG = {
  ballRadius: 0.45,
  paddleWidth: 3,
  paddleHeight: 0.35,
  spawnInterval: 1800,
  bonusSpawnInterval: 15000,
  gravity: -0.35,
  bounceImpulse: 2.2,
  shrinkFactor: 0.9,
  maxLives: 3,
  hitScore: 10,
  bonusScore: 50,
  pairScore: 25,
  memoryRevealTime: 1200,
  particleCount: 60,
  particleLife: 0.6
};
const SKY = [BRAND.clay, BRAND.taupe, BRAND.mauve];
const SND = {
  hit: new Howl({ src: ['/audio/hit.wav'], volume: 0.4 }),
  miss: new Howl({ src: ['/audio/miss.wav'], volume: 0.4 }),
  bonus: new Howl({ src: ['/audio/bonus.wav'], volume: 0.5 })
};

const rand = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
const clamp = (v: number, mn: number, mx: number) => Math.max(mn, Math.min(mx, v));

export default function ThomasPrime() {
  const mount = useRef<HTMLDivElement | null>(null);
  const paddleRef = useRef<THREE.Mesh>();
  const balls = useRef<THREE.Mesh[]>([]);
  const particles = useRef<THREE.Points[]>([]);
  const memory = useRef<string[]>([]);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(CONFIG.maxLives);
  const [started, setStarted] = useState(false);
  const [over, setOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const resetGame = useCallback(() => {
    setScore(0);
    setLives(CONFIG.maxLives);
    setOver(false);
    setStarted(false);
    memory.current = [];
    balls.current.forEach(disposeMesh);
    particles.current.forEach(disposeParticles);
    balls.current = [];
    particles.current = [];
  }, []);

  useEffect(() => {
    if (!mount.current || !started) return;

    const scene = new THREE.Scene();

    const skyGeo = new THREE.SphereGeometry(50, 32, 32);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        c1: { value: new THREE.Color(SKY[0]) },
        c2: { value: new THREE.Color(SKY[1]) },
        c3: { value: new THREE.Color(SKY[2]) }
      },
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }`,
      fragmentShader: `
        uniform vec3 c1;
        uniform vec3 c2;
        uniform vec3 c3;
        varying vec3 vPos;
        void main() {
          float h = normalize(vPos).y * .5 + .5;
          vec3 col = mix(c1, c2, smoothstep(0.0,0.5,h));
          col = mix(col, c3, smoothstep(0.5,1.0,h));
          gl_FragColor = vec4(col,1.0);
        }`
    });
    scene.add(new THREE.Mesh(skyGeo, skyMat));

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.current.clientWidth / mount.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 4, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.current.clientWidth, mount.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    mount.current.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dir = new THREE.DirectionalLight(0xffffff, 0.4);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    const paddle = new THREE.Mesh(
      new THREE.BoxGeometry(CONFIG.paddleWidth, CONFIG.paddleHeight, 0.6),
      new THREE.MeshStandardMaterial({ color: '#f4f4f4', emissive: '#fff', emissiveIntensity: 0.15 })
    );
    paddle.position.set(0, -2.4, 0);
    scene.add(paddle);
    paddleRef.current = paddle;

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    floor.rotateX(-Math.PI / 2);
    floor.position.y = -3;
    scene.add(floor);

    const getWorldX = (clientX: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const ndc = ((clientX - rect.left) / rect.width) * 2 - 1;
      const frustumHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * (camera.position.z - paddle.position.z);
      const frustumWidth = frustumHeight * camera.aspect;
      return clamp(ndc * (frustumWidth / 2), -4.5, 4.5);
    };

    const handlePointer = (e: MouseEvent | TouchEvent) => {
      if (paused) return;
      const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      paddle.position.x = getWorldX(x);
    };
    window.addEventListener('mousemove', handlePointer);
    window.addEventListener('touchmove', handlePointer, { passive: false });

    const clock = new THREE.Clock();
    let lastSpawn = 0;
    let lastBonus = 0;
    const paddleBox = new THREE.Box3();
    const ballBox = new THREE.Box3();

    const createBall = (bonus = false) => {
      const geo = new THREE.SphereGeometry(bonus ? CONFIG.ballRadius * .8 : CONFIG.ballRadius, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: bonus ? '#ffda6b' : rand([BRAND.clay, BRAND.taupe, BRAND.mauve]),
        emissive: '#fff',
        emissiveIntensity: bonus ? .8 : .08
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((Math.random() - .5) * 6, 4.8, 0);
      (mesh as any).velocity = new THREE.Vector3((Math.random() - .5) * .6, -(1 + Math.random() * 1.5), 0);
      (mesh as any).alive = true;
      (mesh as any).bonus = bonus;
      (mesh as any).id = rand(['A', 'B', 'C', 'D']);
      return mesh;
    };

    const spawnBurst = (pos: THREE.Vector3, color: string) => {
      const count = CONFIG.particleCount;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = pos.x;
        positions[i * 3 + 1] = pos.y;
        positions[i * 3 + 2] = pos.z;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({ size: .1, color, transparent: true, opacity: .9 });
      const pts = new THREE.Points(geo, mat);
      (pts as any).life = CONFIG.particleLife;
      scene.add(pts);
      particles.current.push(pts);
    };

    const animate = () => {
      if (paused) {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
        return;
      }
      const t = clock.getElapsedTime(), dt = clock.getDelta();

      if (t - lastSpawn > CONFIG.spawnInterval / 1000) {
        const b = createBall();
        scene.add(b);
        balls.current.push(b);
        lastSpawn = t;
      }
      if (t - lastBonus > CONFIG.bonusSpawnInterval / 1000) {
        const bo = createBall(true);
        scene.add(bo);
        balls.current.push(bo);
        lastBonus = t;
      }

      paddleBox.setFromObject(paddle);

      balls.current.forEach((b, i) => {
        if (!(b as any).alive) return;
        const v = (b as any).velocity as THREE.Vector3;
        v.y += CONFIG.gravity * dt;
        b.position.addScaledVector(v, dt);

        ballBox.setFromObject(b);
        if (paddleBox.intersectsBox(ballBox)) {
          if ((b as any).bonus) {
            SND.bonus.play();
            spawnBurst(b.position.clone(), '#ffda6b');
            setScore(s => s + CONFIG.bonusScore);
            disposeMesh(b); balls.current.splice(i, 1);
            return;
          }
          if (Math.random() < .2) {
            const id = (b as any).id;
            if (memory.current.includes(id)) {
              setScore(s => s + CONFIG.pairScore);
              memory.current = memory.current.filter(x => x !== id);
            } else {
              memory.current.push(id);
              (b.material as THREE.MeshStandardMaterial).emissiveIntensity = .7;
              setTimeout(() => {
                if (b.material) (b.material as THREE.MeshStandardMaterial).emissiveIntensity = .08;
              }, CONFIG.memoryRevealTime);
            }
          }
          if (Math.random() < .5) {
            v.y = CONFIG.bounceImpulse;
            v.x += (Math.random() - .5) * .4;
            SND.hit.play();
            spawnBurst(b.position.clone(), '#fff');
            setScore(s => s + CONFIG.hitScore);
          } else {
            (b as any).alive = false;
            const shrink = () => {
              b.scale.multiplyScalar(CONFIG.shrinkFactor);
              if (b.scale.x < .05) {
                disposeMesh(b); balls.current.splice(i, 1);
              } else requestAnimationFrame(shrink);
            };
            shrink();
            SND.hit.play();
            setScore(s => s + CONFIG.hitScore);
          }
        }
        if (b.position.y < -2.9) {
          SND.miss.play();
          spawnBurst(b.position.clone(), '#f55');
          setLives(l => {
            const nl = l - 1; if (nl <= 0) setOver(true); return nl;
          });
          disposeMesh(b); balls.current.splice(i, 1);
        }
      });

      particles.current.forEach((p, j) => {
        (p.material as THREE.PointsMaterial).opacity -= dt * 1.5;
        (p as any).life -= dt;
        if ((p as any).life <= 0) {
          disposeParticles(p); particles.current.splice(j, 1);
        }
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.current!.clientWidth, h = mount.current!.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', handlePointer);
      window.removeEventListener('touchmove', handlePointer);
      window.removeEventListener('resize', onResize);
      balls.current.forEach(disposeMesh);
      particles.current.forEach(disposeParticles);
      disposeMesh(paddle);
      scene.clear();
      renderer.dispose();
      mount.current?.removeChild(renderer.domElement);
    };
  }, [started, paused]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ') setPaused(p => !p);
      if (e.key.toLowerCase() === 'r') resetGame();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [resetGame]);

  const hud = started && !over && (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-6 text-white text-lg font-bold">
      <div className="bg-black/50 px-3 py-1 rounded">Score {score}</div>
      <div className="bg-black/50 px-3 py-1 rounded">Lives {lives}</div>
      <div className="bg-black/50 px-3 py-1 rounded">{paused ? 'Paused' : ''}</div>
    </div>
  );

  const intro = !started && (
    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white p-6 gap-6">
      <h1 className="text-4xl font-extrabold">Thomas Prime</h1>
      <p className="max-w-lg text-center">
        Move the paddle with mouse or touch.<br/>
        Block spheres to score (+10).<br/>
        Some bounce, some softly explode.<br/>
        Catch the glowing orb for +50.<br/>
        Match quick flashes for +25.<br/>
        Miss three and game over.<br/>
        Space to pause, R to restart.
      </p>
      <button
        onClick={() => setStarted(true)}
        className="px-8 py-3 bg-white text-black rounded-lg text-lg font-semibold"
      >
        Start
      </button>
    </div>
  );

  const gameOverScreen = over && (
    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white gap-4">
      <h2 className="text-3xl font-bold">Game Over</h2>
      <p className="text-xl">Final Score: {score}</p>
      <button
        onClick={resetGame}
        className="px-8 py-3 bg-white text-black rounded-lg text-lg font-semibold"
      >
        Play Again
      </button>
    </div>
  );

  return (
    <div className="relative w-full h-screen overflow-hidden select-none">
      <div ref={mount} className="absolute inset-0" />
      {hud}
      {intro}
      {gameOverScreen}
    </div>
  );
}

function disposeMesh(m: THREE.Mesh) {
  m.geometry.dispose();
  (m.material as THREE.Material).dispose();
  m.parent?.remove(m);
}
function disposeParticles(p: THREE.Points) {
  p.geometry.dispose();
  (p.material as THREE.Material).dispose();
  p.parent?.remove(p);
}
