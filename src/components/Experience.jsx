import { OrbitControls, Sky,  Cloud, Grid } from "@react-three/drei";
import Woman from "./Woman";
import * as THREE from 'three';
import { useRef } from 'react';
import { Environment } from '@react-three/drei'
import { useLoader,useThree } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { PerspectiveCamera } from "@react-three/drei";

import React, { useEffect } from 'react';

const Scene = () => {
  const fbx = useLoader(FBXLoader, "./background/stadium.fbx");

  return <primitive object={fbx} scale={0.005} />;
};


const Experience = () => {

  const colorMap2 = useLoader(TextureLoader, './background/stadium.png')
  colorMap2.mipmaps=false
  colorMap2.minFilter = THREE.LinearFilter;


  const lightRef = useRef();

  const colorMap = useLoader(TextureLoader, './background/grass-texture.jpg')
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.repeat.set(50, 50);
  colorMap.offset.set(0.6)
  

  const { camera } = useThree();

  useEffect(() => {
    const handleZoom = () => {
      console.log(`Camera Position: [${camera.position.toArray()}]`);
      console.log(`Camera Position:`,camera);
    };

    window.addEventListener('wheel', handleZoom);

    return () => {
      window.removeEventListener('wheel', handleZoom);
    };
  }, [camera]);


  return (
    <>
      {/* <OrbitControls /> */}

      <axesHelper />
     

      <gridHelper args={[25, 25, 0xff0000, 'teal']} />
      
      {/* <directionalLight
      intensity={0.1}
        position={[-5, 5, 5]}
        castShadow
        ref={lightRef}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      /> */}
      <ambientLight intensity={0.6}/>
      <Sky azimuth={0.1} turbidity={10} rayleigh={0.5} inclination={0.6} distance={1000} />
      {/* <group position={[0, -9.25, 0]} receiveShadow scale={[50, 50, 50]} rotation={[0, Math.PI / 2, 0]}>
        <Scene />
      </group> */}

      {/* <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud segments={40} bounds={[10, 2, 2]} volume={10} color="orange" />
        <Cloud seed={1} scale={2} volume={5} color="hotpink" fade={100} />
      </Clouds> */}
      <PerspectiveCamera
  position={[10.152568946846523,0.8724291420916078,0.297178262421967]} // Set the camera position to have Z coordinate away from the origin
  fov={75}
  makeDefault
  aspect={window.innerWidth / window.innerHeight}
  near={0.1}
  far={1000}
  rotation={[-1.1558136704697521,1.4695222093251072,1.1539150640528741]}
/>
      <group receiveShadow position={[8, 0, 1.3]}  rotation={[0, 1.1 * Math.PI/2, 0]} scale={[0.4,0.4,0.4]}>
      {/* <PerspectiveCamera
          makeDefault
          position={[5, 2, 10]}
          fov={30}
          args={[50, window.innerWidth / window.innerHeight, 0.1, 1000]}
        /> */}
         
        <Woman />
        {/* <Grid sectionSize={10} cellSize={200}/> */}
      </group>
      <mesh
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-1, -3, 0]}
        
      >
        <planeGeometry args={[5, 5, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
      {<mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow
      >
        <planeGeometry args={[20, 20, 1, 1]} />
        <meshBasicMaterial  map={colorMap}  side={THREE.DoubleSide}/>
      </mesh>}

      <mesh rotation={[0, Math.PI / 2, 0]} position={[3, 3, 0]} receiveShadow
      >
        <planeGeometry  args={[10, 10, 1, 1]}/>
        <meshBasicMaterial  map={colorMap2}  />
      </mesh>

    </>
  );
};

export default Experience;
