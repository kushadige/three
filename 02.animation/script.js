// Scene
const scene = new THREE.Scene();

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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

// Renderer
const canvas = document.querySelector('.draw');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x232323));

const animate = function () {
  // Get Elapsed Time
  const elapsedTime = clock.getElapsedTime();

  // Update Rotation On X Axis
  mesh.rotation.x = elapsedTime * Math.PI;

  // Renderer
  renderer.render(scene, camera);

  // RequestAnimationFrame
  requestAnimationFrame(animate);
};
animate();

// function will get called 60 time per seconds on some devices 0.01 * 60 = 0.6 on X
// function will get called 120 time per seconds on some devices 0.01 * 120 = 1.2 on X
