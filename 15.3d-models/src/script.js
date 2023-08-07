import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// Scene
const scene = new THREE.Scene();

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.8);
directionalLight.position.z = 2;
scene.add(ambientLight, directionalLight);

// OBJLoader
// const objloader = new OBJLoader();

// Loading Monkey Model
// objloader.load(
//   'models/monkey.obj',
//   (object) => {
//     // object.position.y = 1;
//     // object.children[0].position.z = -3;
//     object.children[0].material = new THREE.MeshNormalMaterial();
//     scene.add(object);
//   },
//   (xhr) => [console.log((xhr.loaded / xhr.total) * 100 + '% Loaded')]
// );

// GTLFLoader
const gltfloader = new GLTFLoader();

// DRACOLoader
const dracoloader = new DRACOLoader();
dracoloader.setDecoderPath('/draco/');
gltfloader.setDRACOLoader(dracoloader);

// FBXLoader
const fbxloader = new FBXLoader();

// Loading GLTF Model
let animationMixer = null;
gltfloader.load('models/mymodel.glb', (glb) => {
  // animationMixer = new THREE.AnimationMixer(glb.scene);
  // const clipAction = animationMixer.clipAction(glb.animations[3]);
  // clipAction.play();
  glb.scene.position.y = -0.8;
  // glb.scene.scale.set(0.5, 0.5, 0.5);
  scene.add(glb.scene);
});

// Loading FBX Model
// fbxloader.load('models/taunt.fbx', (fbx) => {
//   animationMixer = new THREE.AnimationMixer(fbx);
//   const clipAction = animationMixer.clipAction(fbx.animations[0]);
//   clipAction.play();
//   fbx.position.y = -1;
//   fbx.scale.set(0.01, 0.01, 0.01);
//   scene.add(fbx);
// });

// Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camOptions = {
  fov: 75,
  aspect: aspect.width / aspect.height,
  near: 0.01,
  far: 1000,
};
const camera = new THREE.PerspectiveCamera(
  camOptions.fov,
  camOptions.aspect,
  camOptions.near,
  camOptions.far
);
camera.position.set(0, 0.5, 1.5);
scene.add(camera);

// Renderer
const canvas = document.querySelector('.draw');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.physicallyCorrectLights = true;
renderer.outputColorSpace = THREE.SRGBColorSpace;
// renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor(new THREE.Color(0x232323));
renderer.setSize(aspect.width, aspect.height);

// Resizing
window.addEventListener('resize', () => {
  // New Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  // New Aspect
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  // New Renderer Size
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
});

// Clock
const clock = new THREE.Clock();
let previousTime = 0;

// Orbit Controls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

// Animate
const animate = function () {
  // Get Elapsed Time
  const elapsedTime = clock.getElapsedTime();
  const frameTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Update AnimationMixer
  if (animationMixer) {
    animationMixer.update(frameTime);
  }

  // Update Orbit Controls
  orbitControls.update();

  // Render
  renderer.render(scene, camera);

  // RequestAnimationFrame
  requestAnimationFrame(animate);
};
animate();
