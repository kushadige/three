class IChair {
  constructor() {
    this.chair = new THREE.Group();

    // LEGS
    this.chairLegGeometry = new THREE.BoxGeometry(1, 5, 1);
    this.chairLegMaterial = new THREE.MeshBasicMaterial({
      color: 0xaaff00,
      wireframe: true,
    });

    this.frontLeg1 = new THREE.Mesh(
      this.chairLegGeometry,
      this.chairLegMaterial
    );
    this.frontLeg2 = new THREE.Mesh(
      this.chairLegGeometry,
      this.chairLegMaterial
    );
    this.rearLeg1 = new THREE.Mesh(
      this.chairLegGeometry,
      this.chairLegMaterial
    );
    this.rearLeg2 = new THREE.Mesh(
      this.chairLegGeometry,
      this.chairLegMaterial
    );

    this.frontLeg1.position.set(2.5, 0, 2.5);
    this.frontLeg2.position.set(-2.5, 0, 2.5);
    this.rearLeg1.position.set(2.5, 0, -2.5);
    this.rearLeg2.position.set(-2.5, 0, -2.5);

    this.chair.add(this.frontLeg1);
    this.chair.add(this.frontLeg2);
    this.chair.add(this.rearLeg1);
    this.chair.add(this.rearLeg2);

    // SEAT
    this.chairSeatGeometry = new THREE.BoxGeometry(6, 1, 6);
    this.chairSeatMaterial = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      wireframe: true,
    });
    this.chairSeat = new THREE.Mesh(
      this.chairSeatGeometry,
      this.chairSeatMaterial
    );
    this.chairSeat.position.set(0, 3, 0);
    this.chair.add(this.chairSeat);

    // BACK
    this.chairBackGeometry = new THREE.BoxGeometry(6, 6, 1);
    this.chairBackMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    this.chairBack = new THREE.Mesh(
      this.chairBackGeometry,
      this.chairBackMaterial
    );
    this.chairBack.position.set(0, 6.5, -2.5);
    this.chair.add(this.chairBack);
  }
}

export function Chair() {
  return new IChair().chair;
}
