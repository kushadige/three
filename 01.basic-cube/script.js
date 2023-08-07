// Scene
const scene = new THREE.Scene();

// Group
const group = new THREE.Group();

// Cube1
const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  wireframe: true,
});
const cube1 = new THREE.Mesh(geometry1, material1);
cube1.position.x = 2;
scene.add(cube1);
// Cube2
const geometry2 = new THREE.BoxGeometry(1, 1, 2, 2, 2, 2);
const material2 = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.x = -2;
scene.add(cube2);

// Camera
const camOptions = {
  fov: 90,
  aspectRatio: window.innerWidth / window.innerHeight,
  near: 0.001,
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
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 5;
const animate = function () {
  requestAnimationFrame(animate);
  cube1.rotation.x += 0.01;
  cube1.rotation.y += 0.01;
  cube2.rotation.x += 0.01;
  renderer.render(scene, camera);
};

animate();
