import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import GameScene from "./GalaxyView";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Link } from "react-router-dom";

const Body = () => {
  const canvasRef = useRef();

  const [isOpenGalaxyView, setOpenGalaxyView] = useState(false);

  const stoneHandler = () => {
    console.log("CLicke!!!");
    setOpenGalaxyView(!isOpenGalaxyView);
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const fov = 45;
    const aspect = 2;
    const nearOld = 0.1;
    const farOld = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, nearOld, farOld);
    camera.position.set(0, 10, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 5, 0);
    controls.update();

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "stone.jpg"
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    scene.background = texture;

    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);
    const cubeSize = 4;
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const materialThanos = new THREE.MeshPhongMaterial({ color: "#8AC" });
    const materialStark = new THREE.MeshPhongMaterial({ color: 0x2233ff });
    materialStark.flatShading=true;
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

    function addStar() {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

      star.position.set(x, y, z);
      scene.add(star);
    }

    Array(200).fill().forEach(addStar);

    // Background

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

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div className="items-center px-4" ref={canvasRef}>
      <div className="font-semibold p-5 m-3 items-center flex justify-between">
        <h2 className="m-l-6"><Link to="/galaxy">Collect Infinity Stones </Link></h2>
        <h2> <Link to="/galaxy">Build Ironman Suite</Link></h2>
        <h2 className="">Mold Thor's Axe</h2>
      </div>
    </div>
  );
};

export default Body;

// // Create Raycaster
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// // Handle Mouse Clicks
// window.addEventListener("click", onClick);

// function onClick(event) {
//   // Calculate mouse coordinates in normalized device coordinates
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//   // Update the picking ray with the camera and mouse position
//   raycaster.setFromCamera(mouse, camera);

//   // Calculate objects intersecting the picking ray
//   const intersects = raycaster.intersectObjects(scene.children, true);

//   // Check if intersection occurred
//   if (intersects.length > 0) {
//     // Perform actions for intersected objects
//     const intersectedObject = intersects[0].object;
//     console.log("Clicked on object:", intersectedObject);
//     // Perform additional actions as needed
//   }
// }
