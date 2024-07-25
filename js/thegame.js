import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.167.0/examples/jsm/controls/OrbitControls.js';
import { createCharacter } from '/js/lib/game/character.js';
import { createCube, updateCubes, cubes } from '/js/lib/game/cube.js';
import { createTree } from '/js/lib/game/tree.js';
import { updateScoreText, initScoreText, scoreText } from '/js/lib/game/ui.js';

// Создание сцены
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Голубое небо

// Создание камеры
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const initialCameraDistance = 10;
camera.position.set(0, 5, initialCameraDistance);

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

// Создание персонажа
const character = createCharacter();
scene.add(character);

// Создание дерева
const tree = createTree();
tree.position.set(10, 0, 10);
scene.add(tree);

// Создание начальных кубиков
createCube(scene, new THREE.Vector3(5, 0.5, 5));
createCube(scene, new THREE.Vector3(-5, 0.5, -5));
createCube(scene, new THREE.Vector3(7, 0.5, -7));

// Создание OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// Инициализация переменных для прыжков и касания
let velocityY = 0;
let isJumping = false;
let isTouching = false;
let touchStartPosition = new THREE.Vector2();
let score = 0;

function animate() {
    requestAnimationFrame(animate);

    // Обработка прыжка
    if (isJumping) {
        velocityY -= 0.01;
        character.position.y += velocityY;

        if (character.position.y <= 1) {
            character.position.y = 1;
            isJumping = false;
            velocityY = 0;
        }
    }

    // Обработка столкновений с кубиками
    updateCubes(character, scene, cubes, () => {
        score++;
        updateScoreText(score);

        // Создание нового кубика при сборе
        const randomX = Math.random() * 90 - 45;
        const randomZ = Math.random() * 90 - 45;
        createCube(scene, new THREE.Vector3(randomX, 0.5, randomZ));
    });

    // Обновление OrbitControls
    controls.target.copy(character.position);
    controls.update();

    // Обновление камеры
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0; // Убираем вертикальную составляющую
    direction.normalize();

    // Обновление позиции камеры
    camera.position.set(character.position.x - direction.x * initialCameraDistance, character.position.y + 5, character.position.z - direction.z * initialCameraDistance);

    // Поворот персонажа к направлению камеры
    character.lookAt(character.position.clone().add(direction));

    // Обновление позиции и ориентации текста счета
    if (scoreText) { // Используем `scoreText` из `ui.js`
        scoreText.position.set(character.position.x, character.position.y + 3, character.position.z);
        scoreText.lookAt(camera.position); // Обеспечиваем, чтобы текст всегда был направлен к камере
    }

    renderer.render(scene, camera);
}

animate();

// Инициализация текста счета
initScoreText(scene);

// Обработка ввода для движения персонажа
window.addEventListener('keydown', (event) => {
    const speed = 0.5;
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0; // Убираем вертикальную составляющую
    direction.normalize();

    // Определяем вектор перемещения
    const forward = direction.clone().multiplyScalar(speed);
    const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), direction).normalize().multiplyScalar(speed);

    switch (event.key) {
        case 'w':
        case 'ArrowUp':
            character.position.add(forward);
            break;
        case 's':
        case 'ArrowDown':
            character.position.add(forward.negate());
            break;
        case 'a':
        case 'ArrowLeft':
            character.position.add(right.negate());
            break;
        case 'd':
        case 'ArrowRight':
            character.position.add(right);
            break;
        case ' ':
            if (!isJumping) {
                velocityY = 0.2;
                isJumping = true;
            }
            break;
    }

    // Обновление камеры
    camera.position.set(character.position.x - direction.x * initialCameraDistance, character.position.y + 5, character.position.z - direction.z * initialCameraDistance);
    controls.update();
});

// Обработка жестов на тачскрине
window.addEventListener('touchstart', (event) => {
    touchStartPosition.set(event.touches[0].clientX, event.touches[0].clientY);
    isTouching = true;
});

window.addEventListener('touchmove', (event) => {
    if (isTouching) {
        const touchEndPosition = new THREE.Vector2(event.touches[0].clientX, event.touches[0].clientY);
        const deltaX = touchEndPosition.x - touchStartPosition.x;
        const deltaY = touchEndPosition.y - touchStartPosition.y;

        const speed = 0.1;
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        direction.y = 0; // Убираем вертикальную составляющую
        direction.normalize();

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                character.position.add(direction.clone().multiplyScalar(speed));
            } else {
                character.position.add(direction.clone().negate().multiplyScalar(speed));
            }
        } else {
            if (deltaY > 0) {
                character.position.add(new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), direction).normalize().multiplyScalar(speed));
            } else {
                character.position.add(new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), direction).negate().normalize().multiplyScalar(speed));
            }
        }

        // Обновление камеры
        camera.position.set(character.position.x - direction.x * initialCameraDistance, character.position.y + 5, character.position.z - direction.z * initialCameraDistance);
        controls.update();
    }
});

window.addEventListener('touchend', () => {
    isTouching = false;
});

// Обработка изменения размера экрана
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
