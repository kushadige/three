import './styles.css';
import * as THREE from 'three';
import gsap from 'gsap';

// Scene
const scene = new THREE.Scene();

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 1; // (static motion), repeative motion
scene.add(mesh);

// gsap
gsap.to(mesh.position, { duration: 1, delay: 1, x: 1 });
gsap.to(mesh.position, { duration: 2, delay: 3, x: -1 });

// Camera
const camOptions = {
  fov: 45,
  aspect: window.innerWidth / window.innerHeight,
  near: 1,
  far: 100,
};
const camera = new THREE.PerspectiveCamera(
  camOptions.fov,
  camOptions.aspect,
  camOptions.near,
  camOptions.far
);
camera.position.z = 5;
scene.add(camera);

// Clock
const clock = new THREE.Clock();

// Axes Helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Renderer
const canvas = document.querySelector('.draw');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x232323));

const animate = function () {
  // Get Elapsed Time
  const elapsedTime = clock.getElapsedTime();

  // Update Rotation On X Axis
  mesh.rotation.x = elapsedTime * Math.PI; // half cycle rotation per second
  // mesh.position.x = 2 - elapsedTime * 0.25; // 0.25 -> movement speed
  // mesh.position.y = elapsedTime * 0.25;
  // mesh.position.x = Math.sin(elapsedTime) * 1.5;
  // mesh.position.y = Math.cos(elapsedTime) * 1.5;
  // mesh.position.y = Math.tan(elapsedTime);

  // Renderer
  renderer.render(scene, camera);

  // RequestAnimationFrame
  requestAnimationFrame(animate);
};
animate();

// function will get called 60 time per seconds on some devices 0.01 * 60 = 0.6 on X
// function will get called 120 time per seconds on some devices 0.01 * 120 = 1.2 on X
