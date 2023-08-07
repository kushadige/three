# type of shadows

[![Drop Shadow](https://kushadige.s3.eu-north-1.amazonaws.com/images/drop-shadow.png)]()

#### 1) Core Shadow

It is the shadow that appears on the same mesh due to the presence of a certain type of light.

#### 2) Drop Shadow

It is a visual effect consisting of a drawing element that looks like the shadow of an object.

The drop shadow needs several factors to be shown.

####  First Factor
* To have a drop shadow we need to use specific types of light.

  * `PointLight`
  * `SpotLight`
  * `DirectionalLight`

* The rest types of light will not do any drop shadow.

  * `HemisphereLight`
  * `RectAreaLight`
  * `AmbientLight`

* The reason for that is in order to have a drop shadow the light must have a specific direction.

#### Second Factor
* Identify the elements that caused the shadow to appear.
  ```js
  directionalLight.castShadow = true
  ...
  ...
  boxMesh.castShadow = true
  ```

#### Third Factor
* Identify the elements that will receive the shadow.
  ```js
  planeMesh.receiveShadow = true
  ```

* Tell the renderer to start to render the shadow map.
  ```js
  renderer.shadowMap.enabled = true
  ```

#### Shadow Types
* THREE.BasicShadowMap
* THREE.PCFShadowMap (default)
* THREE.PCFSoftShadowMap
* THREE.VSMShadowMap

To change shadow type:
```js
renderer.shadowMap.type = THREE.BasicShadowMap
```