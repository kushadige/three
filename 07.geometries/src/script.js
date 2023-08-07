import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new THREE.Scene();

// Mesh
const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffaa,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Custom Mesh
const bufferGeometry = new THREE.BufferGeometry();
const vertices = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
const positions = new THREE.BufferAttribute(vertices, 3);
bufferGeometry.setAttribute('position', positions);
const customMesh = new THREE.Mesh(bufferGeometry, material);
customMesh.position.y = -2;
scene.add(customMesh);

// Axes Helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

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
scene.add(camera);

// Renderer
const canvas = document.querySelector('.draw');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setClearColor(new THREE.Color(0x232323));
renderer.setSize(aspect.width, aspect.height);

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

// Orbit Controls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

camera.position.z = 2.5;
const animate = function () {
  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();
