import './styles.css';
import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

// Mesh 1
const geometry1 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material1 = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const mesh1 = new THREE.Mesh(geometry1, material1);
mesh1.position.x = 1;
// Mesh 2
const geometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.x = -1;
// Mesh 3
const geometry3 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material3 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh3 = new THREE.Mesh(geometry3, material3);
// Mesh 4
const geometry4 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material4 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const mesh4 = new THREE.Mesh(geometry4, material4);
mesh4.position.set(1, 1, 0);
// Mesh 5
const geometry5 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material5 = new THREE.MeshBasicMaterial({ color: 0xff0044 });
const mesh5 = new THREE.Mesh(geometry5, material5);
mesh5.position.set(-1, 1, 0);
// Mesh 6
const geometry6 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material6 = new THREE.MeshBasicMaterial({ color: 0x0044ff });
const mesh6 = new THREE.Mesh(geometry6, material6);
mesh6.position.set(0, 1, 0);

scene.add(mesh1, mesh2, mesh3, mesh4, mesh5, mesh6);
mesh2.lookAt(mesh6.position);
mesh1.lookAt(mesh5.position);

// Mouse Listener
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / window.innerWidth - 0.5;
  cursor.y = e.clientY / window.innerHeight - 0.5;
});

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
// camera.lookAt(mesh2.position);

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

  // Rotate Mesh With Mouse Position
  // mesh6.rotation.x = cursor.y;
  // mesh6.rotation.y = cursor.x;
  mesh3.lookAt(new THREE.Vector3(cursor.x, -cursor.y, 1));

  // Renderer
  renderer.render(scene, camera);

  // RequestAnimationFrame
  requestAnimationFrame(animate);
};
animate();
