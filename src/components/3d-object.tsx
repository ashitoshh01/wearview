
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Floating3DObjectProps {
  className?: string;
}

export default function Floating3DObject({ className = '' }: Floating3DObjectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    renderer.setSize(300, 300);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Clear container and append renderer
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);
    
    rendererRef.current = renderer;
    
    // Create geometry
    const clothGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const clothMaterial = new THREE.MeshPhongMaterial({
      color: 0x9b87f5,
      specular: 0xffffff,
      shininess: 100,
      side: THREE.DoubleSide,
    });
    const cloth = new THREE.Mesh(clothGeometry, clothMaterial);
    scene.add(cloth);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Add directional light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      cloth.rotation.x += 0.005;
      cloth.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (rendererRef.current) {
        if (containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }
    };
  }, []);
  
  return <div ref={containerRef} className={`w-[300px] h-[300px] ${className}`} />;
}
