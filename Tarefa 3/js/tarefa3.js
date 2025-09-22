import * as THREE from "three";

let camera, scene, renderer;
let objects = [];

function swing(time, amplitude, speed, phase = 0) {
  return Math.sin(time * speed + phase) * amplitude;
}

function criaBraco(lado) {
  const geometry = new THREE.BoxGeometry(2, 10, 2);
  const material = new THREE.MeshBasicMaterial({ color: 0x888888 });

  let ombro = new THREE.Mesh(
    new THREE.SphereGeometry(2, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0x3366ff }),
  );
  scene.add(ombro);
  objects["ombro_" + lado] = ombro;

  ombro.position.set(lado === "direito" ? 6 : -6, 8, 0);

  let pivoOmbro = new THREE.Group();
  ombro.add(pivoOmbro);
  objects["pivoOmbro_" + lado] = pivoOmbro;

  let braco = new THREE.Mesh(geometry, material);
  pivoOmbro.add(braco);
  braco.position.y -= 5;
  objects["braco_" + lado] = braco;

  let cotovelo = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff6600 }),
  );
  braco.add(cotovelo);
  cotovelo.position.y -= 5;
  objects["cotovelo_" + lado] = cotovelo;

  let pivoCotovelo = new THREE.Group();
  cotovelo.add(pivoCotovelo);
  objects["pivoCotovelo_" + lado] = pivoCotovelo;

  let antebraco = new THREE.Mesh(geometry, material);
  pivoCotovelo.add(antebraco);
  antebraco.position.y -= 5;
  objects["antebraco_" + lado] = antebraco;
}

function criaPerna(lado) {
  const geometry = new THREE.BoxGeometry(2, 10, 2);
  const material = new THREE.MeshBasicMaterial({ color: 0x888888 });

  let bacia = new THREE.Mesh(
    new THREE.SphereGeometry(2, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0x3366ff }),
  );
  scene.add(bacia);
  objects["bacia_" + lado] = bacia;

  bacia.position.set(lado === "direita" ? 3 : -3, -5, 0);

  let pivoBacia = new THREE.Group();
  bacia.add(pivoBacia);
  objects["pivoBacia_" + lado] = pivoBacia;

  let coxa = new THREE.Mesh(geometry, material);
  pivoBacia.add(coxa);
  coxa.position.y -= 5;
  objects["coxa_" + lado] = coxa;

  let joelho = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff6600 }),
  );
  coxa.add(joelho);
  joelho.position.y -= 5;
  objects["joelho_" + lado] = joelho;

  let pivoJoelho = new THREE.Group();
  joelho.add(pivoJoelho);
  objects["pivoJoelho_" + lado] = pivoJoelho;

  let perna = new THREE.Mesh(geometry, material);
  pivoJoelho.add(perna);
  perna.position.y -= 5;
  objects["perna_" + lado] = perna;
}

function criaTronco() {
  let tronco = new THREE.Mesh(
    new THREE.BoxGeometry(6, 12, 4),
    new THREE.MeshBasicMaterial({ color: 0x444444 }),
  );
  scene.add(tronco);
  tronco.position.set(0, 2, 0);
  objects["tronco"] = tronco;
}

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

  criaTronco();
  criaBraco("esquerdo");
  criaBraco("direito");
  criaPerna("esquerda");
  criaPerna("direita");

  camera.position.z = 40;
  renderer.setAnimationLoop(animacao);

  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animacao() {
  let t = Date.now() * 0.002;

  objects["pivoOmbro_esquerdo"].rotation.x = swing(t, Math.PI / 4, 2, 0);
  objects["pivoOmbro_direito"].rotation.x = swing(t, Math.PI / 4, 2, Math.PI);

  objects["pivoOmbro_esquerdo"].rotation.z = swing(
    t,
    Math.PI / 16,
    1.5,
    Math.PI / 2,
  );
  objects["pivoOmbro_direito"].rotation.z = swing(
    t,
    Math.PI / 16,
    1.5,
    Math.PI / 2,
  );

  objects["pivoCotovelo_esquerdo"].rotation.x =
    swing(t, Math.PI / 6, 4, 0) + 0.5;
  objects["pivoCotovelo_direito"].rotation.x =
    swing(t, Math.PI / 6, 4, Math.PI) + 0.5;

  objects["pivoBacia_esquerda"].rotation.x = swing(t, Math.PI / 4, 2, Math.PI);
  objects["pivoBacia_direita"].rotation.x = swing(t, Math.PI / 4, 2, 0);

  objects["pivoBacia_esquerda"].rotation.z = swing(t, Math.PI / 20, 1.2, 0);
  objects["pivoBacia_direita"].rotation.z = swing(
    t,
    Math.PI / 20,
    1.2,
    Math.PI,
  );

  objects["pivoJoelho_esquerda"].rotation.x =
    swing(t, Math.PI / 8, 4, Math.PI) + 0.3;
  objects["pivoJoelho_direita"].rotation.x = swing(t, Math.PI / 8, 4, 0) + 0.3;

  renderer.render(scene, camera);
}
