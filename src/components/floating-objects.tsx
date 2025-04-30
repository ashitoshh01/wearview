
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FloatingObjectsProps {
  className?: string;
}

export default function FloatingObjects({ className = '' }: FloatingObjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 20;
    
    // Create renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Clear container and append renderer
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);
    
    rendererRef.current = renderer;
    
    // Create multiple geometric shapes
    const shapes: THREE.Mesh[] = [];
    
    // Create a sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x9b87f5,
      shininess: 100,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-15, 8, -5);
    scene.add(sphere);
    shapes.push(sphere);
    
    // Create a cube
    const cubeGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x8a2be2,
      shininess: 100,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(10, 5, -3);
    scene.add(cube);
    shapes.push(cube);
    
    // Create a torus
    const torusGeometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshPhongMaterial({
      color: 0x6e42ff,
      shininess: 100,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-10, -8, -2);
    scene.add(torus);
    shapes.push(torus);
    
    // Create a cone
    const coneGeometry = new THREE.ConeGeometry(0.8, 1.5, 32);
    const coneMaterial = new THREE.MeshPhongMaterial({
      color: 0xb19cd9,
      shininess: 100,
    });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.set(15, -6, -4);
    scene.add(cone);
    shapes.push(cone);
    
    // Create a dodecahedron
    const dodecahedronGeometry = new THREE.DodecahedronGeometry(1);
    const dodecahedronMaterial = new THREE.MeshPhongMaterial({
      color: 0x9370db,
      shininess: 100,
    });
    const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
    dodecahedron.position.set(0, 12, -5);
    scene.add(dodecahedron);
    shapes.push(dodecahedron);
    
    // Additional shapes to match the reference image
    const octahedronGeometry = new THREE.OctahedronGeometry(0.8);
    const octahedronMaterial = new THREE.MeshPhongMaterial({
      color: 0xb19cd9,
      shininess: 100,
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.set(-18, -5, -3);
    scene.add(octahedron);
    shapes.push(octahedron);
    
    const tetrahedronGeometry = new THREE.TetrahedronGeometry(0.9);
    const tetrahedronMaterial = new THREE.MeshPhongMaterial({
      color: 0x8a2be2,
      shininess: 100,
    });
    const tetrahedron = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterial);
    tetrahedron.position.set(18, 8, -4);
    scene.add(tetrahedron);
    shapes.push(tetrahedron);
    
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
      
      // Animate each shape differently
      shapes.forEach((shape, i) => {
        // Different rotation speeds for each shape
        shape.rotation.x += 0.003 * (i % 3 + 1);
        shape.rotation.y += 0.004 * ((i + 1) % 3 + 1);
        
        // Floating animation
        shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current) {
        if (containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }
    };
  }, []);
  
  return <div ref={containerRef} className={`absolute inset-0 -z-10 overflow-hidden ${className}`} />;
}
