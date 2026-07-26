import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useInView } from "framer-motion";

const FloatingShape = ({ color }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} scale={1.8}>
                <icosahedronGeometry args={[1, 1]} />
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                    wireframe
                />
            </mesh>
        </Float>
    );
};

const readAccent = () =>
    getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#059669";

const Hero3D = () => {
    const wrapperRef = useRef(null);
    const inView = useInView(wrapperRef);
    // Colour comes from the token layer, so the object follows the active theme.
    const [accent, setAccent] = useState(readAccent);

    useEffect(() => {
        const observer = new MutationObserver(() => setAccent(readAccent()));
        observer.observe(document.documentElement, { attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={wrapperRef} className="w-full h-full opacity-60 pointer-events-none">
            <Canvas
                frameloop={inView ? "always" : "never"}
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
                <FloatingShape color={accent} />
            </Canvas>
        </div>
    );
};

export default Hero3D;
