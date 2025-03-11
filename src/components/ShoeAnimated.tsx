
import React, { useEffect, useRef } from 'react';

interface ShoeAnimatedProps {
  modelSrc?: string;
  className?: string;
}

const ShoeAnimated: React.FC<ShoeAnimatedProps> = ({ 
  modelSrc = "https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@camera/public/object/shoe/scene.gltf", 
  className 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Load Three.js dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    
    script.onload = () => {
      if (!containerRef.current) return;
      
      // This code runs after Three.js loads
      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      // Set up scene
      const scene = new window.THREE.Scene();
      scene.background = new window.THREE.Color(0x000000);
      
      // Add ambient light
      const ambientLight = new window.THREE.AmbientLight(0x404040, 2);
      scene.add(ambientLight);
      
      // Add directional light
      const dirLight1 = new window.THREE.DirectionalLight(0xffffff, 3);
      dirLight1.position.set(1, 1, 1);
      scene.add(dirLight1);
      
      const dirLight2 = new window.THREE.DirectionalLight(0x8b5cf6, 3); // Purple light
      dirLight2.position.set(-1, -1, -1);
      scene.add(dirLight2);
      
      // Add spotlight
      const spotLight = new window.THREE.SpotLight(0xffffff, 5);
      spotLight.position.set(0, 5, 0);
      spotLight.angle = Math.PI / 4;
      spotLight.penumbra = 0.1;
      spotLight.decay = 2;
      spotLight.distance = 200;
      scene.add(spotLight);
      
      // Camera setup
      const camera = new window.THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 5);
      
      // Renderer
      const renderer = new window.THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.shadowMap.enabled = true;
      
      // Clear container and add new renderer
      container.innerHTML = '';
      container.appendChild(renderer.domElement);
      
      // Add a placeholder sphere while model loads
      const geometry = new window.THREE.SphereGeometry(1, 32, 32);
      const material = new window.THREE.MeshStandardMaterial({ 
        color: 0x8b5cf6, 
        metalness: 0.7,
        roughness: 0.3,
      });
      const sphere = new window.THREE.Mesh(geometry, material);
      scene.add(sphere);
      
      // Rotate the scene
      const rotateScene = () => {
        scene.rotation.y += 0.005;
        renderer.render(scene, camera);
        requestAnimationFrame(rotateScene);
      };
      
      // Start animation
      rotateScene();
      
      // Responsive handling
      const handleResize = () => {
        if (!containerRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      };
    };
    
    document.body.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className={`w-full h-80 rounded-xl overflow-hidden bg-gradient-to-b from-gray-900 to-black ${className}`}
    />
  );
};

export default ShoeAnimated;
