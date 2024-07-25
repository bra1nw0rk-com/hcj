import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

if (WebGL.isWebGLAvailable()) {
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

    // Инициализация OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(character.position.x, character.position.y, character.position.z);
    controls.update();

    // Основной цикл
    let velocityY = 0;
    let isJumping = false;

    function animate() {
        requestAnimationFrame(animate);

        // Обработка прыжка
        if (isJumping) {
            velocityY -= 0.01; // Гравитация
            character.position.y += velocityY;

            // Остановка прыжка
            if (character.position.y <= 1) {
                character.position.y = 1;
                isJumping = false;
                velocityY = 0;
            }
        }

        // Обновление управления камерой
        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    // Функция для получения направления камеры
    function getCameraDirection() {
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        direction.y = 0; // Игнорируем вертикальную компоненты
        direction.normalize(); // Нормализуем направление
        return direction;
    }

    // Обработка ввода для движения персонажа
    window.addEventListener('keydown', (event) => {
        const speed = 0.5;
        const direction = getCameraDirection(); // Получаем направление камеры

        switch (event.key) {
            case 'w':
            case 'ArrowUp':
                character.position.addScaledVector(direction, speed); // Движение вперед
                break;
            case 's':
            case 'ArrowDown':
                character.position.addScaledVector(direction.negate(), speed); // Движение назад
                break;
            case 'a':
            case 'ArrowLeft':
                // Поворот на 90 градусов влево от направления камеры
                const leftDirection = new THREE.Vector3(-direction.z, 0, direction.x);
                character.position.addScaledVector(leftDirection, speed);
                break;
            case 'd':
            case 'ArrowRight':
                // Поворот на 90 градусов вправо от направления камеры
                const rightDirection = new THREE.Vector3(direction.z, 0, -direction.x);
                character.position.addScaledVector(rightDirection, speed);
                break;
            case ' ':
                if (!isJumping) {
                    velocityY = 0.2;
                    isJumping = true;
                }
                break;
        }

        // Проверка на столкновения со стенами
        if (character.position.x < -49) character.position.x = -49;
        if (character.position.x > 49) character.position.x = 49;
        if (character.position.z < -49) character.position.z = -49;
        if (character.position.z > 49) character.position.z = 49;

        // Синхронизация камеры с движением персонажа
        controls.target.set(character.position.x, character.position.y, character.position.z);
        controls.update();
    });

    // Обработка изменения размера окна
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}
