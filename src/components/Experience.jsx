import { OrbitControls } from "@react-three/drei";
import Woman from "./Woman";
import * as THREE from 'three';
import { useRef } from 'react';

const Experience = () => {

  const lightRef = useRef();

  return (
    <>
      <OrbitControls />
      <axesHelper />
      <gridHelper args={[50, 50, 0xff0000, 'teal']} />
      <ambientLight />
      <directionalLight
        position={[-5, 5, 5]}
        castShadow
        ref={lightRef}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <group position={[-1, 0.01, 0]} receiveShadow>
        <Woman />
      </group>
      <mesh
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-1, 0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 10, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}
      >
        <planeGeometry args={[10, 10, 1, 1]} />
        <meshBasicMaterial color={'yellow'} side={THREE.DoubleSide} />
      </mesh>

    </>
  );
};

export default Experience;
