'use client';

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useRef } from 'react'
import { Mesh } from 'three'

export default function SpinningGlobe() {
    const globeRef = useRef<Mesh>(null)

    return (
        <Canvas className="w-[500px] h-[500px] absolute text-blue-900 z-0 mx-auto">
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />

            <mesh ref={globeRef} rotation={[0, 0, 0]}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshStandardMaterial color="skyblue" wireframe={false} />
            </mesh>

            <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
            <Stars />
        </Canvas>
    )
}