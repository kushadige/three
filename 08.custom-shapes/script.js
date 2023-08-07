import { Chair } from './chair.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(new THREE.Color(0xaabbff));
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const cameraOptions = {
  fov: 30,
  aspectRatio: window.innerWidth / window.innerHeight,
  near: 1,
  far: 500,
};
const camera = new THREE.PerspectiveCamera(
  cameraOptions.fov,
  cameraOptions.aspectRatio,
  cameraOptions.near,
  cameraOptions.far
);

// Custom line nesnemiz
const material = new THREE.LineBasicMaterial({
  color: 0x0000ff,
});

const points = [];
points.push(new THREE.Vector3(-10, 0, 0)); // çizginin başlangıç noktası
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));
points.push(new THREE.Vector3(-10, 0, 0));
const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);
// scene.add(line);

// Chairs
const chair1 = Chair();
chair1.position.set(6, -3, 0);
scene.add(chair1);
const chair2 = Chair();
chair2.position.set(-6, -3, 0);
scene.add(chair2);

camera.position.set(10, 20, 40);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
