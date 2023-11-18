import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Loader from "./components/Loader";
import Island from "./models/Island"
import Sky from "./models/Sky";
import Plane from "./models/Plane";

function App() {
  const [isRotating, setisRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const adjustPlaneForScreenSize = () => {
    let screenScale ,screenPosition;
    if(window.innerWidth < 768) {
      screenScale = [.8, .8, .8];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition]
  }

  const adjustIslandForScreenSize = () => {
    let rotation = [.1, 4.7, 0];
    let screenScale = null;
    let screenPosition = [0, -6.5, -43]
    if(window.innerWidth < 768) {
      screenScale = [.8, .8, .8];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation]
  }

  const [islandScale, islandPosition, islandrRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();
  return (
    <main>
      <section className="w-full h-screen relative bg-[#d4eaf7]">
        <div className="w-full h-screen text-white absolute left-0 right-0 z-10 flex items-center justify-center">
          <Canvas
            className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing':'cursor-grab'}`}
            camera={{ near: 0.1, far: 1000 }}
          >
            <Suspense fallback={<Loader />}>
              <directionalLight position={[10, 10, 1]} intensity={2}/>
              <ambientLight intensity={0.5}/>
              <hemisphereLight skyColor="#b1e1ff" groundColor="#000000"/>
              
              <Plane 
                isRotating={isRotating}
                planeScale={planeScale} 
                planePosition={planePosition}
                rotation={[.4, 20, .2]}
              />
              <Sky
                isRotating={isRotating}
              />
              <Island 
                position={islandPosition}
                scale={islandScale}
                rotation={islandrRotation}
                isRotating={isRotating}
                setisRotating={setisRotating}
                setCurrentStage={setCurrentStage}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>
    </main>
  );
}

export default App;
