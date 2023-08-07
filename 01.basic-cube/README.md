# basic-cube

Three.js ile temel scene, camera kurulumu ve nesneler oluşturarak sahne içerisinde temel animasyonların gerçekleştirilmesi


#### Camera FOV
[![Camera FOV](https://kushadige.s3.eu-north-1.amazonaws.com/images/camera-fov-pos.png)](test)

#### Cube Rotation
[![Cube Rotation](https://kushadige.s3.eu-north-1.amazonaws.com/images/cube-rotation.png)](test)

---

* three.js kütüphanesinin manuel olarak projeye entegre edilmesi
  ```
  https://github.com/mrdoob/three.js/archive/master.zip
  ```

* scene    -> THREE.Scene()
* camera   -> THREE.PerspectiveCamera(field of view, aspect ratio, near, far)
* renderer -> THREE.WebGLRenderer()
* mesh     -> THREE.Mesh(geometry, material)

---

#### FPS işlemleri

```js
const fpsElem = document.querySelector("#fps");
const avgElem = document.querySelector("#avg");

const frameTimes = [];
let   frameCursor = 0;
let   numFrames = 0;   
const maxFrames = 20;
let   totalFPS = 0;

let then = 0;
function render(now) {
  now *= 0.001;                          // convert to seconds
  const deltaTime = now - then;          // compute time since last frame
  then = now;                            // remember time for next frame
  const fps = 1 / deltaTime;             // compute frames per second
  
  fpsElem.textContent = fps.toFixed(1);  // update fps display
  
  // add the current fps and remove the oldest fps
  totalFPS += fps - (frameTimes[frameCursor] || 0);
  
  // record the newest fps
  frameTimes[frameCursor++] = fps;
  
  // needed so the first N frames, before we have maxFrames, is correct.
  numFrames = Math.max(numFrames, frameCursor);
  
  // wrap the cursor
  frameCursor %= maxFrames;
    
  const averageFPS = totalFPS / numFrames;

  avgElem.textContent = averageFPS.toFixed(1);  // update avg display
  
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
```

---

[three.js documentation](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry)