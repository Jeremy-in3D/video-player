import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useVideoTexture } from "@react-three/drei";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
    };

    window.addEventListener("resize", updateHeight);
    updateHeight();

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <>
      <div style={{ height: "100%" }}>
        <VidViewer videoSrc={"/new_comprs.mp4"} />
      </div>
    </>
  );
}

export default App;

const VideoSphere = ({ videoSrc }) => {
  const videoTexture = useVideoTexture(videoSrc);
  const sphereRef = useRef();

  return (
    <mesh ref={sphereRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 50, 35]} />
      <meshBasicMaterial map={videoTexture} side={THREE.BackSide} />
    </mesh>
  );
};

const VidViewer = ({ videoSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <>
      {!isPlaying && (
        <button
          onClick={handlePlayVideo}
          style={{ position: "absolute", zIndex: 1 }}
        >
          Play Video
        </button>
      )}
      <Canvas style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.5} />
        {isPlaying && <VideoSphere videoSrc={videoSrc} />}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </>
  );
};

// export default VidViewer;
