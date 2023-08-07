import './styles.css';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new THREE.Scene();

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('/textures/alphaSnow.jpg');

// Mesh
const geometry = new THREE.BufferGeometry();
const verticesAmount = 10000;
const positionArray = new Float32Array(verticesAmount * 3); // we need 3000 slot
for (let i = 0; i < verticesAmount * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 8;
}
geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

const material = new THREE.PointsMaterial();
// material.color = new THREE.Color('skyblue');
material.transparent = true;
material.alphaMap = particleTexture;
material.depthTest = false;
material.size = 0.04;
const points = new THREE.Points(geometry, material);
scene.add(points);

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
camera.position.z = 2;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.draw');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(aspect.width, aspect.height);

// Debugger
// const gui = new dat.GUI();

// Orbit Controls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.autoRotateSpeed = 0.5;
orbitControls.autoRotate = true;
orbitControls.enableDamping = true;
orbitControls.enableZoom = false;
orbitControls.enableRotate = false;
// gui.add(orbitControls, 'autoRotate').name('Toggle Orbit Rotate');

// Clock
const clock = new THREE.Clock();

// Animate
const animate = function () {
  // Get Elapsed Time
  const elapsedTime = clock.getElapsedTime();

  // Animate Particles
  points.rotation.x = elapsedTime * 0.05;
  points.rotation.y = elapsedTime * 0.05;

  // Render
  renderer.render(scene, camera);
  orbitControls.update();

  // RequestAnimationFrame
  requestAnimationFrame(animate);
};
animate();
