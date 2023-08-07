import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

// Scene
const scene = new THREE.Scene();

// Debugging
const gui = new dat.GUI();

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const materialColor = {
  color: 0xff00ff,
};

// 1) Range
gui.add(mesh.position, 'x').min(-3).max(3).step(0.1).name('X MeshOne');
// 2) Boolean
gui.add(material, 'wireframe');
// 3) Color
gui.addColor(materialColor, 'color').onChange(() => {
  material.color.set(materialColor.color);
});

// Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camOptions = {
  fov: 75,
  aspect: aspect.width / aspect.height,
  near: 1,
  far: 100,
};

const camera = new THREE.PerspectiveCamera(
  camOptions.fov,
  camOptions.aspect,
  camOptions.near,
  camOptions.far
);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const canvas = document.querySelector('.draw');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);
renderer.setClearColor(new THREE.Color(0x232323));

// Orbit Controls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.1;

// Resizing
window.addEventListener('resize', () => {
  // New Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  // New Aspect Ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  // New Renderer Size
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Clock
const clock = new THREE.Clock();

// Axes Helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const animate = function () {
  // Get Elapsed Time
  const elapsedTime = clock.getElapsedTime();

  orbitControls.update();
  mesh.rotation.y = elapsedTime;

  // Renderer
  renderer.render(scene, camera);

  // RequestAnimationFrame
  requestAnimationFrame(animate);
};
animate();
