"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { XR, createXRStore, useXR } from "@react-three/xr";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const store = createXRStore();

function GroundPosition() {
  const { origin } = useXR();
  const groundPosition = useRef<THREE.Vector3 | null>(null);

  useEffect(() => {
    if (origin && groundPosition.current) {
      groundPosition.current = origin.position;
    }
  }, [origin]);

  return (
    <group>
      {groundPosition.current && (
        <mesh position={groundPosition.current} scale={[0.1, 0.1, 0.1]}>
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh>
      )}
    </group>
  );
}

function Box() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      // Rotate the box around its Y-axis
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      pointerEventsType={{ deny: "grab" }}
      position={[0, 1, -1]}
      ref={ref}
      scale={[0.25, 0.25, 0.25]}
    >
      <boxGeometry />
      <meshBasicMaterial color={"orange"} />
    </mesh>
  );
}

export default function App() {
  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas>
        <XR store={store}>
          <ambientLight intensity={0.8} />
          <directionalLight intensity={5} position={[100, 60, 100]} />
          <Box />
          <GroundPosition />
        </XR>
      </Canvas>
    </>
  );
}
