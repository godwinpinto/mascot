
import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import Interface from "./components/Interface";
import './App.css'

function App() {
  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold text-yellow-600">
          Install & Setup Vite + React + Typescript + Tailwind CSS 3
        </h1>
      </div>
      <Canvas camera={{ position: [2, 1.5, 3.5], fov: 30 }} shadows>
        <Experience />
      </Canvas>
      <Interface />

    </>
  );
}

export default App;


