# lights

To see the light effect we need to use a specific type of material such as the `MeshStandartMaterial` and the `MeshLambertMaterial`.

The lights are used to give the scene more realistic by simulating the light bouncing that light does and that will form a shadow on some parts of the mesh.

We have several types of lights:
  * `AmbientLight`
  * `DirectionalLight`
  * `HemisphereLight`
  * `PointLight`
  * `RectAreaLight`
  * `SpotLight`

#### 1. AmbientLight
The `AmbientLight` will light all the objects inside the scene.

```js
const light = new THREE.AmbientLight(0x404040) // soft white light
scene.add(light)
```

#### 2. DirectionalLight
This type of light is similar to the sunlight. First you have to specify the light position, and if you didn't specify the light location then the light will be in the center of the scene.

The `DirectionalLight` will be straight lines. The light direction will start from the location that you specified and the direction of the light will be towards the center of the scene.

```js
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 2, 0); // above the mesh
scene.add(directionalLight);
```

#### 3. HemisphereLight
The `HemisphereLight` consist of two lights. One on the top and the other on the bottom. Then all the objects will be illuminated from the top and bottom.

```js
const hemisphereLight = new THREE.HemisphereLight(0x00aaff, 0xffff00, 1); // args: topColor, bottomColor, intensity
scene.add(hemisphereLight);
```

#### 4. PointLight
In the `PointLight` the light will be emmitted in all directions. Therefore the light spread will be like this:

[![Point Light](https://kushadige.s3.eu-north-1.amazonaws.com/images/point-light.png)]()

```js
const pointLight = new THREE.PointLight(0xffff00, 0.8, 3);
scene.add(pointLight);
```

#### 5. RectAreaLight
The `ReactAreaLight` will give lighting in the form of a square or rectangle.

[![RectArea Light](https://kushadige.s3.eu-north-1.amazonaws.com/images/reactarea-light.png)]()

#### 6. SpotLight
The `SpotLight` is similar to the flashlight. The light direction is in the form of an angle. `SpotLight` accepts six things.

[![Spot Light](https://kushadige.s3.eu-north-1.amazonaws.com/images/spot-light.png)]()