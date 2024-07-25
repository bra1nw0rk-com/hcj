import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

if (WebGL.isWebGLAvailable()) {
    // Создание сцены
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Голубое небо

    // Создание камеры
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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
    controls.enableZoom = false; // Запретить зум
    controls.enablePan = false; // Запретить панорамирование
    controls.enableDamping = true; // Включить сглаживание
    controls.dampingFactor = 0.25;
    controls.target.set(character.position.x, character.position.y, character.position.z);

    // Установите начальную позицию камеры
    const initialCameraDistance = 10;
    camera.position.set(character.position.x, character.position.y + 5, character.position.z + initialCameraDistance);
    controls.update(); // Обновление состояния управления после установки начальной позиции

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

        // Обновление позиции камеры, чтобы поддерживать фиксированное расстояние от персонажа
        camera.position.x = character.position.x + initialCameraDistance * Math.sin(controls.getAzimuthalAngle());
        camera.position.z = character.position.z + initialCameraDistance * Math.cos(controls.getAzimuthalAngle());
        camera.position.y = character.position.y + 5; // Камера всегда над персонажем

        // Камера всегда смотрит на персонажа
        camera.lookAt(character.position);

        // Обновление направления персонажа
        const characterDirection = new THREE.Vector3();
        camera.getWorldDirection(characterDirection);
        characterDirection.y = 0; // Игнорируем вертикальную компоненты
        characterDirection.normalize();
        const angle = Math.atan2(characterDirection.z, characterDirection.x);
        character.rotation.y = angle;

        controls.update(); // Обновление управления камерой
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
    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        controls.update(); // Обновление состояния управления после изменения размера окна
    }

    window.addEventListener('resize', onResize);

    // Инициализация начального размера
    onResize();

} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}
