import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Создание сцены
const scene = new THREE.Scene();

// Создание камеры
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Создание рендера
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Создание плоскости
const geometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI / 2;
scene.add(plane);

// Основной цикл
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Обработка ввода для движения камеры
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            camera.position.z -= 0.1;
            break;
        case 's':
            camera.position.z += 0.1;
            break;
        case 'a':
            camera.position.x -= 0.1;
            break;
        case 'd':
            camera.position.x += 0.1;
            break;
    }
});