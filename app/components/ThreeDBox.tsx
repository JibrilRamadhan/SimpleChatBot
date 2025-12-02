"use client";

import * as THREE from "three";
import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";

/**
 * Komponen untuk memuat dan menampilkan model 3D kotak.
 */
function BoxModel() {
  const { nodes } = useGLTF("/models/package_box_mockup.glb");
  const texture = useTexture("/models/BG.png");
  texture.flipY = false;

  const groupRef = useRef(null);

  const meshes = useMemo(
    () => Object.values(nodes).filter((node) => node.isMesh),
    [nodes]
  );

  // Animasi rotasi
  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={14} dispose={null}>
      {meshes.map((mesh, index) => (
        <mesh
          key={index}
          geometry={mesh.geometry}
          position={mesh.position}
          rotation={mesh.rotation}
          scale={mesh.scale}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            map={texture}
            roughness={0.8}   // lebih matte, biar ga silau
            metalness={0.1}   // lebih non-metallic
          />
        </mesh>
      ))}
    </group>
  );
}

useGLTF.preload("/models/package_box_mockup.glb");
useTexture.preload("/package_box_mockup/textures/Desain tanpa judul.png");

export default function ThreeDBox() {
  return (
    <div className="w-full h-[400px] md:h-[550px] rounded-lg overflow-hidden">
      <Canvas shadows camera={{ position: [4, 3, 6], fov: 35 }}>
        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <Suspense fallback={null}>
          <BoxModel />
        </Suspense>
        <OrbitControls
          makeDefault
          autoRotate={false}
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}


{/*
      <div className="relative z-10 w-full md:w-1/2 mt-10 ml-9 md:mt-0">
        <ThreeDBox />
      </div>*/}