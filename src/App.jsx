
import { Canvas,useThree  } from "@react-three/fiber";
import Experience from "./components/Experience";
import Interface from "./components/Interface";
import './App.css'
import React, { useEffect } from 'react';

function App() {
  const newAspect = window.innerWidth / window.innerHeight;

 
  return (
    <>
      <Canvas camera={{  near: 0.1, far: 1000, position: [10, 1, 1], rotation: [-Math.PI / 4, 0, 0] }} shadows>
        <Experience />
      </Canvas>
      <Interface />

    </>
  );
}

export default App;


