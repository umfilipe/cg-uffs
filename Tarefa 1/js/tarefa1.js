import * as THREE from "three";

let camera, scene, renderer;

let sphere, cone, torus;

var criaObjetos = function () {
  const geometrySphere = new THREE.SphereGeometry(1.5, 32, 32);
  const materialSphere = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  sphere = new THREE.Mesh(geometrySphere, materialSphere);
  sphere.position.x = -3;
  scene.add(sphere);

  const geometryCone = new THREE.ConeGeometry(1.5, 3, 32);
  const materialCone = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cone = new THREE.Mesh(geometryCone, materialCone);
  cone.position.x = 3;
  scene.add(cone);

  const geometryTorus = new THREE.TorusGeometry(1, 0.4, 16, 100);
  const materialTorus = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  torus = new THREE.Mesh(geometryTorus, materialTorus);
  torus.position.y = -3;
  scene.add(torus);
};

export function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  criaObjetos();

  camera.position.z = 10;

  document.body.appendChild(renderer.domElement);

  renderer.render(scene, camera);

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
