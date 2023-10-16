import {
  CameraControls,
  ContactShadows,
  Environment,
  Text,
  Sky
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { Avatar } from "./Avatar";

const Dots = (props) => {
  const { loading } = useChat();
  const [loadingText, setLoadingText] = useState("");
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText((loadingText) => {
          if (loadingText.length > 2) {
            return ".";
          }
          return loadingText + ".";
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText("");
    }
  }, [loading]);
  if (!loading) return null;
  return (
    <group {...props}>
      <Text fontSize={0.14} anchorX={"left"} anchorY={"bottom"}>
        {loadingText}
        <meshBasicMaterial attach="material" color="black" />
      </Text>
    </group>
  );
};

export const Experience = () => {
  const cameraControls = useRef();
  const { cameraZoomed } = useChat();
  const lightRef = useRef();

  useEffect(() => {
    //cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0);
    cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0, true);
  }, []);

  useEffect(() => {
    if (cameraZoomed) {
      cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0, true);
      //cameraControls.current.setLookAt(0, 1.5, 1.5, 0, 1.5, 0, true);
    } else {
      cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0, true);
//      cameraControls.current.setLookAt(0, 2.2, 5, 0, 1.0, 0, true);
    }
  }, [cameraZoomed]);
  return (
    <>
    <axesHelper/>
    <Sky azimuth={0.1} turbidity={10} rayleigh={0.5} inclination={0.6} distance={1000} />
    <directionalLight
      intensity={0.1}
        position={[-5, 5, 5]}
        castShadow
        ref={lightRef}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    <gridHelper args={[25, 25, 0xff0000, 'teal']} />
      <CameraControls ref={cameraControls} />
      <ambientLight intensity={0.6}/>
      {/* <Environment   files="./environment/spiaggia_di_mondello_4k.hdr" background/> */}
      {/* Wrapping Dots into Suspense to prevent Blink when Troika/Font is loaded */}
      <Suspense>
        <Dots position-y={1.75} position-x={-0.02} />
      </Suspense>
      <Avatar />
      <ContactShadows opacity={0.7} />
    </>
  );
};
