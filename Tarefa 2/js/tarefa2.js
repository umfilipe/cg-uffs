import * as THREE from "three";

let camera, scene, renderer;

let square, sphere;
let velocity1 = new THREE.Vector2(2.5, 2);
let velocity2 = new THREE.Vector2(-2, 2.5);

let limitX, limitY;

var criaObjetos = function () {
  const geometry1 = new THREE.BoxGeometry(50, 50, 0);
  const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  square = new THREE.Mesh(geometry1, material1);
  square.position.set(-200, 0, 0);
  scene.add(square);

  const geometry2 = new THREE.SphereGeometry(25, 32, 32);
  const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  sphere = new THREE.Mesh(geometry2, material2);
  sphere.position.set(200, 0, 0);
  scene.add(sphere);
};

export function init() {
  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera(
    -window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    -window.innerHeight / 2,
    -1000,
    1000,
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  criaObjetos();

  document.body.appendChild(renderer.domElement);

  onWindowResize();

  animate();

  window.addEventListener("resize", onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);

  square.position.x += velocity1.x;
  square.position.y += velocity1.y;

  sphere.position.x += velocity2.x;
  sphere.position.y += velocity2.y;

  if (square.position.x >= limitX || square.position.x <= -limitX) {
    velocity1.x *= -1;
  }
  if (square.position.y >= limitY || square.position.y <= -limitY) {
    velocity1.y *= -1;
  }

  if (sphere.position.x >= limitX || sphere.position.x <= -limitX) {
    velocity2.x *= -1;
  }
  if (sphere.position.y >= limitY || sphere.position.y <= -limitY) {
    velocity2.y *= -1;
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.left = -window.innerWidth / 2;
  camera.right = window.innerWidth / 2;
  camera.top = window.innerHeight / 2;
  camera.bottom = -window.innerHeight / 2;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  limitX = window.innerWidth / 2 - 25;
  limitY = window.innerHeight / 2 - 25;
}
