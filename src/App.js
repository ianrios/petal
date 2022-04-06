import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Plant from "./Plant";
import styled from "styled-components";

function App() {



  return (

    <Wrapper className="App">
      <h1 style={{ textAlign: 'center' }}>Petal</h1>
      <h3 style={{ textAlign: 'center' }}>a virtual instrument by ian rios</h3>
      <Canvas>

        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        <Suspense fallback={null}>
          <Plant />
        </Suspense>
      </Canvas>

    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 20px;
  position: relative;
  background: #ffffff;
  
  canvas {
    height: 100vh;
  }
`

export default App;
