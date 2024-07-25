import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// Создание сцены
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Голубое небо

// Создание камеры
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

// Создание рендера
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Создание пола
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Создание персонажа (простая коробка)
const characterGeometry = new THREE.BoxGeometry(1, 2, 1);
const characterMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const character = new THREE.Mesh(characterGeometry, characterMaterial);
character.position.y = 1; // Поднять персонажа на пол
scene.add(character);

// Создание стен
const wallGeometry = new THREE.BoxGeometry(1, 10, 100);
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });

// Левая стена
const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
leftWall.position.set(-50, 5, 0);
scene.add(leftWall);

// Правая стена
const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
rightWall.position.set(50, 5, 0);
scene.add(rightWall);

// Задняя стена
const backWall = new THREE.Mesh(new THREE.BoxGeometry(100, 10, 1), wallMaterial);
backWall.position.set(0, 5, -50);
scene.add(backWall);

// Основной цикл
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Обработка ввода для движения камеры
window.addEventListener('keydown', (event) => {
    const speed = 0.5;
    switch (event.key) {
        case 'w':
            character.position.z -= speed;
            break;
        case 's':
            character.position.z += speed;
            break;
        case 'a':
            character.position.x -= speed;
            break;
        case 'd':
            character.position.x += speed;
            break;
    }

    // Синхронизация камеры с движением персонажа
    camera.position.x = character.position.x;
    camera.position.z = character.position.z + 10;
});