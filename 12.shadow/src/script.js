import './styles.css';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new THREE.Scene();

// Box Mesh
const boxGeometry = new THREE.TorusKnotGeometry(0.2, 0.05);
const boxMaterial = new THREE.MeshStandardMaterial();
boxMaterial.color = new THREE.Color(0xeeee11);
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
boxMesh.position.y = 0.7;
scene.add(boxMesh);

// Plane Mesh
const planeGeometry = new THREE.PlaneGeometry(2.75, 2.75);
const planeMaterial = new THREE.MeshStandardMaterial();
planeMaterial.color = new THREE.Color(0xffffff);
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.rotation.x = -Math.PI * 0.5;
scene.add(planeMesh);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.castShadow = true;
directionalLight.position.set(0, 2, 0);
scene.add(ambientLight, directionalLight);
// DirectionalLightHelper
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight
);
scene.add(directionalLightHelper);

// Optimize ShadowMap Size
directionalLight.shadow.mapSize.width = 1024; // 512 default
directionalLight.shadow.mapSize.height = 1024; // 512 default

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
camera.position.set(1, 2.25, 3.5);
scene.add(camera);

// Renderer
const canvas = document.querySelector('.draw');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.shadowMap.enabled = true;
renderer.setSize(aspect.width, aspect.height);
renderer.setClearColor(new THREE.Color(0x232323));

// Debugger
const gui = new dat.GUI();

// Orbit Controls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.autoRotate = false;
orbitControls.enableDamping = true;
gui.add(orbitControls, 'autoRotate').name('Toggle Orbit Rotate');

// Clock
const clock = new THREE.Clock();

// Animate
const animate = function () {
  // Get Elapsed Time
  const elapsedTime = clock.getElapsedTime();

  // Rotate Directional Light
  directionalLight.position.x = Math.sin(elapsedTime);
  directionalLight.position.z = Math.cos(elapsedTime);

  // Rotate TorusKnot
  boxMesh.rotation.x = elapsedTime;

  // Render
  renderer.render(scene, camera);
  orbitControls.update();

  // RequestAnimationFrame
  requestAnimationFrame(animate);
};
animate();
