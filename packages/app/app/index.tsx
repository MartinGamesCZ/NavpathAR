import { Text, View } from "react-native";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { THREE } from "expo-three";
import { CameraView } from "expo-camera";

function Box(props: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
  });

  return (
    <mesh {...props} ref={ref} scale={1}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <CameraView
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[0, 0, 0]} />
      </Canvas>
    </View>
  );
}
