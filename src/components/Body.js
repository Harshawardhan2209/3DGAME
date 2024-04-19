import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import GameScene from "./GameScene";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Body = () => {
  const canvasRef = useRef();
  useEffect(() => {
    const scene = new THREE.Scene();
    const fov = 45;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 5, 0);
    controls.update();

    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);
    const cubeSize = 4;
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const materialThanos = new THREE.MeshPhongMaterial({ color: "#8AC" });
    const materialStark = new THREE.MeshPhongMaterial({ color: 0x2233ff });
    const materialThor = new THREE.MeshPhongMaterial({ color: 0x888888 });

    const cubeThanos = new THREE.Mesh(geometry, materialThanos);
    const cubeStark = new THREE.Mesh(geometry, materialStark);
    const cubeThor = new THREE.Mesh(geometry, materialThor);

    cubeThanos.position.set(-10, 7, 0);
    cubeStark.position.set(0, 7, 0);
    cubeThor.position.set(10, 7, 0);

    scene.add(cubeThanos);
    scene.add(cubeStark);
    scene.add(cubeThor);

    const skyColor = 0xb1e1ff;
    const groundColor = 0xb97a20;
    const intensity = 5;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);

    const animate = function () {
      requestAnimationFrame(animate);

      cubeThanos.rotation.x += 0.01;
      cubeThanos.rotation.y += 0.01;
      cubeThanos.rotation.z += 0.01;

      cubeStark.rotation.x += 0.01;
      cubeStark.rotation.y += 0.01;
      cubeStark.rotation.z += 0.01;

      cubeThor.rotation.x += 0.01;
      cubeThor.rotation.y += 0.01;
      cubeThor.rotation.z += 0.01;

      renderer.render(scene, camera);
    };

    // Create Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Handle Mouse Clicks
    window.addEventListener("click", onClick);

    function onClick(event) {
      // Calculate mouse coordinates in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(scene.children, true);

      // Check if intersection occurred
      if (intersects.length > 0) {
        // Perform actions for intersected objects
        const intersectedObject = intersects[0].object;
        console.log("Clicked on object:", intersectedObject);
        // Perform additional actions as needed
      }
    }

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div className="items-center px-4" ref={canvasRef}>
    <div className="font-semibold p-5 m-3 items-center flex justify-between">
      <h2 className="m-l-6">Collect Stones</h2>
      <h2>Build Suite</h2>
      <h2 className="">Mold Axe</h2>
    </div>
  </div>;
};

export default Body;
