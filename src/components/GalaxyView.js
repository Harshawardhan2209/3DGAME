import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const GalaxyView = () => {
  useEffect(() => {
    const canvas = document.querySelector("#c");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      logarithmicDepthBuffer: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    const fov = 45;
    const aspect = 2; // the canvas default
    const near = 0.00001;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(10, 6, 10);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");

    {
      const planeSize = 40;

      const loader = new THREE.TextureLoader();
      const texture = loader.load(
        "https://threejs.org/manual/examples/resources/images/checker.png"
      );
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      texture.colorSpace = THREE.SRGBColorSpace;
      const repeats = planeSize / 2;
      texture.repeat.set(repeats, repeats);

      const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
      const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.rotation.x = Math.PI * -0.5;
      scene.add(mesh);
    }
    {
      const sphereRadius = 3;
      const sphereWidthDivisions = 32;
      const sphereHeightDivisions = 16;
      const sphereGeo = new THREE.SphereGeometry(
        sphereRadius,
        sphereWidthDivisions,
        sphereHeightDivisions
      );
      const numSpheres = 5;
      for (let i = 0; i < numSpheres; ++i) {
        const sphereMat = new THREE.MeshPhongMaterial({ color: "#8B4513"});
        sphereMat.color.setHSL(i * 0.73, 1, 0.5);
        const mesh = new THREE.Mesh(sphereGeo, sphereMat);
        mesh.position.set(
          -sphereRadius - 1,
          sphereRadius + 2,
          i * sphereRadius * -2.2
        );
        scene.add(mesh);
      }
    }

    {
      const color = 0xffffff;
      const intensity = 3;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(0, 10, 0);
      light.target.position.set(-5, 0, 0);
      scene.add(light);
      scene.add(light.target);
    }

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }

      return needResize;
    }

    function render() {
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }, []);

  return <canvas id="c"></canvas>;
};

export default GalaxyView;
