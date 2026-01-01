import { useRef, memo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const LiquidSphere = memo(({ tier }: { tier: 'high' | 'low' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const isHighTier = tier === 'high';
  
  useFrame((state) => {
    if (meshRef.current && isHighTier) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime / 2) * 0.2;
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={isHighTier ? 2 : 0} rotationIntensity={isHighTier ? 1 : 0} floatIntensity={isHighTier ? 1 : 0}>
      <mesh ref={meshRef} scale={2}>
        <sphereGeometry args={[1, isHighTier ? 64 : 32, isHighTier ? 64 : 32]} />
        <MeshTransmissionMaterial
            backside
            backsideThickness={5}
            thickness={2}
            roughness={0}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.1}
            anisotropy={isHighTier ? 1 : 0}
            distortion={isHighTier ? 0.5 : 0}
            distortionScale={0.5}
            temporalDistortion={isHighTier ? 0.5 : 0}
            color="#d4af35"
            resolution={isHighTier ? 512 : 256}
            samples={isHighTier ? 6 : 2}
        />
      </mesh>
    </Float>
  );
});

export const LiquidSphereWrapper = memo(({ tier }: { tier: 'high' | 'low' }) => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={tier === 'high' ? [1, 2] : [1, 1.2]} performance={{ min: 0.5 }} gl={{ powerPreference: "high-performance", antialias: tier === "high" }}>
        <Environment preset="city" />
        <Suspense fallback={null}>
            <LiquidSphere tier={tier} />
        </Suspense>
      </Canvas>
    </div>
  );
});
