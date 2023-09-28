
import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import Interface from "./components/Interface";
import './App.css'

function App() {
  return (
    <>
      <Canvas camera={{ position: [2, 1.5, 3.5], fov: 50 }} shadows>
        <Experience />
      </Canvas>
      <Interface />

    </>
  );
}

export default App;


