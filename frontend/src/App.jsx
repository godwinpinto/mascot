import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import { Conversation } from "./components/Conversation";

function App() {
  return (
    <>
      <Loader />
      <Leva hidden/>
      {/* <UI  /> */}
      <Conversation/>
      {/* <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }} orthographic> */}
      <Canvas shadows camera={{left: window.innerWidth/-2,
        right:window.innerWidth/2,
        top:window.innerHeight/-2,
      bottom:window.innerHeight/2,
      far:10000,
       near:-50000,
       zoom:100.09101562981732,
       position: [0, 2, 5]}} orthographic>
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
