import { gsap } from 'gsap';
import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new THREE.Scene();

// Mesh 1
const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial();
material1.color = new THREE.Color(0xffffff);
const mesh1 = new THREE.Mesh(geometry1, material1);
mesh1.position.x = 1;

// Mesh 2
const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial();
material2.color = new THREE.Color(0xffffff);
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.x = -1;

scene.add(mesh1, mesh2);

// Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camOptions = {
  fov: 75,
  aspect: aspect.width / aspect.height,
  near: 0.01,
  far: 100,
};
const camera = new THREE.PerspectiveCamera(
  camOptions.fov,
  camOptions.aspect,
  camOptions.near,
  camOptions.far
);
camera.position.z = 3;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.draw');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);
renderer.setClearColor(new THREE.Color(0x232323));

// Axes Helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const meshes = [mesh1, mesh2];
window.addEventListener('mousemove', (e) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

  // Casting Ray
  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(meshes);

  if (intersects.length > 0) {
    intersects[0].object.material.color.set(0xffee11);
    gsap.to(intersects[0].object.scale, {
      duration: 0.5,
      x: 1.25,
      y: 1.25,
      z: 1.25,
    });
    for (let i = 0; i < meshes.length; i++) {
      if (meshes[i].uuid !== intersects[0].object.uuid) {
        meshes[i].material.color.set(0xffffff);
        gsap.to(meshes[i].scale, {
          duration: 0.5,
          x: 1,
          y: 1,
          z: 1,
        });
      }
    }
  } else {
    for (let i = 0; i < meshes.length; i++) {
      meshes[i].material.color.set(0xffffff);
      gsap.to(meshes[i].scale, {
        duration: 0.5,
        x: 1,
        y: 1,
        z: 1,
      });
    }
  }
});

// Orbit Controls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

// Clock
const clock = new THREE.Clock();

// Animate
const animate = function () {
  // Get Elapsed Time
  const elapsedTime = clock.getElapsedTime();

  // Render
  renderer.render(scene, camera);
  orbitControls.update();

  // RequestAnimationFrame
  requestAnimationFrame(animate);
};
animate();
