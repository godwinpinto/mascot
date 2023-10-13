import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const StadiumFbx = () => {
  const fbx = useLoader(FBXLoader, './background/stadium.fbx')
  return (
    <primitive object={fbx} />
  );
};

export default StadiumFbx;
