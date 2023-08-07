import './styles.css';
import * as THREE from 'three';
import {
  MapControls,
  OrbitControls,
} from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new THREE.Scene();

// Loading Manager
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log('Start');
};
loadingManager.onLoad = () => {
  console.log('Loading');
};
loadingManager.onProgress = () => {
  console.log('Progress');
};
loadingManager.onError = () => {
  console.log('Error');
};

// Lights
const ambientLight = new THREE.AmbientLight(new THREE.Color(0xffffff), 0.5);
const pointLight = new THREE.PointLight(new THREE.Color(0xffffff), 0.5);
pointLight.position.set(2, 2, 2);
scene.add(ambientLight, pointLight);

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/texture/mat.png');
const colorTexture = textureLoader.load('/texture/color.jpg');
const bumpTexture = textureLoader.load('/texture/bump.jpg');
const displacementTexture = textureLoader.load('/texture/displacementMap.jpg');

// Cube Texture Loader
const cubeTextureLoader = new THREE.CubeTextureLoader();
const envTexture = cubeTextureLoader.load([
  'texture/env/px.png',
  'texture/env/nx.png',
  'texture/env/py.png',
  'texture/env/ny.png',
  'texture/env/pz.png',
  'texture/env/nz.png',
]);
scene.background = envTexture;

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

// Mesh
const geometry = new THREE.SphereGeometry(1, 128, 64);
// const geometry = new THREE.PlaneGeometry(1, 1);
const material = new THREE.MeshStandardMaterial();
// material.map = colorTexture;
// material.color = new THREE.Color('blue');
// material.transparent = true
// material.opacity = 0.4;
// material.side = THREE.DoubleSide;
// material.visible = false;
// material.matcap = matcapTexture; // available in MeshMatcapMaterial
// material.shininess = 200; // available in MeshPhongMaterial
// material.specular = new THREE.Color("green"); // available in MeshPhongMaterial
material.metalness = 0.9; // available in MeshStandardMaterial
material.roughness = 0.1; // available in MeshStandardMaterial and this type material is requires light
// material.bumpMap = bumpTexture; // available in MeshStandardMaterial
// material.displacementMap = displacementTexture;
// material.displacementScale = 0.025;
material.envMap = envTexture;
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 2;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.draw');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

// OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

// Clock
const clock = new THREE.Clock();

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
