import './styles.css';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new THREE.Scene();

// Mesh
const geometry = new THREE.TorusGeometry(0.3, 0.2, 64, 64);
const material = new THREE.MeshStandardMaterial();
material.color = new THREE.Color(0xffffff);
const mesh = new THREE.Mesh(geometry, material);

// Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 4;
scene.add(camera, mesh);

// Renderer
const canvas = document.querySelector('.draw');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

// OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

// Clock
const clock = new THREE.Clock();

// Debugging
const gui = new dat.GUI();
gui.add(mesh.position, 'x').min(-3).max(3).step(0.1).name('Mesh X');

// Lights
// 1) AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff, 0);
scene.add(ambientLight);
gui
  .add(ambientLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.01)
  .name('Ambient Int.');

// 2) DirectionalLight
const directionalLight = new THREE.DirectionalLight(0xffffff, 0);
directionalLight.position.set(0, 2, 0); // above the mesh
scene.add(directionalLight);
gui
  .add(directionalLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.01)
  .name('Directional Int.');
gui
  .add(directionalLight.position, 'x')
  .min(-3)
  .max(3)
  .step(0.1)
  .name('Directional X');
gui
  .add(directionalLight.position, 'y')
  .min(-3)
  .max(3)
  .step(0.1)
  .name('Directional Y');
// DirectionalLightHelper
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight
);
directionalLightHelper.visible = false;
scene.add(directionalLightHelper);
gui.add(directionalLightHelper, 'visible').name('DirectionalHelper');

// 3) HemisphereLight
const hemisphereLight = new THREE.HemisphereLight(0x00aaff, 0xffff00, 0);
scene.add(hemisphereLight);
gui
  .add(hemisphereLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.01)
  .name('Hemisphre Int.');
// HemisphereLightHelper
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight);
hemisphereLightHelper.visible = false;
scene.add(hemisphereLightHelper);
gui.add(hemisphereLightHelper, 'visible').name('HemisphreHelper');

// 4) PointLight
const pointLight = new THREE.PointLight(0xffff00, 0, 3);
scene.add(pointLight);
gui
  .add(pointLight, 'intensity')
  .min(0)
  .max(1)
  .step(0.01)
  .name('PointLight Int.');
gui.add(pointLight.position, 'x').min(-3).max(3).step(0.1).name('PointLight X');
gui.add(pointLight.position, 'y').min(-3).max(3).step(0.1).name('PointLight Y');
gui.add(pointLight.position, 'z').min(-3).max(3).step(0.1).name('PointLight Z');
// PointLightHelper
const pointLightHelper = new THREE.PointLightHelper(pointLight);
pointLightHelper.visible = false;
scene.add(pointLightHelper);
gui.add(pointLightHelper, 'visible').name('PointLightHelper');

// 5) RectAreaLight
const rectAreaLight = new THREE.RectAreaLight(0x5d3fd3, 0, 2, 2);
rectAreaLight.position.z = 0.5;
scene.add(rectAreaLight);

// 6) SpotLight
const spotLight = new THREE.SpotLight(0xffffff, 1, 8, Math.PI * 0.25, 0.1, 1);
spotLight.position.z = 2;
scene.add(spotLight);
gui.add(spotLight, 'intensity').min(0).max(1).step(0.01).name('SpotLight Int.');
gui.add(spotLight.position, 'z').min(-3).max(3).step(0.1).name('Spot Z');
gui.add(spotLight, 'angle').min(0).max(3).step(0.1).name('Spot Angle');
gui.add(spotLight, 'penumbra').min(0).max(1).step(0.1).name('Spot Penumbra');
// SpotLightHelper
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
gui.add(spotLightHelper, 'visible').name('SpotLightHelper');

const animate = () => {
  // Get Elapsed Time
  const elapsedTime = clock.getElapsedTime();

  // Update Controls
  orbitControls.update();

  // Renderer
  renderer.render(scene, camera);

  // RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();

// Resizing
window.addEventListener('resize', () => {
  // Update Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  // New Aspect Ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  // New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
