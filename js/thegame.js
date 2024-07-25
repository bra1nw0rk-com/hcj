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

    // Создание материалов для персонажа
    const frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const backMaterial = new THREE.MeshBasicMaterial({ color: 0x404040 });
    const sideMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const headMaterial = new THREE.MeshBasicMaterial({ color: 0xffc0cb });
    const armMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });

    // Функция создания персонажа
    function createCharacter() {
        const group = new THREE.Group();

        // Создание тела персонажа
        const bodyGeometry = new THREE.BoxGeometry(1, 2, 1);
        const body = new THREE.Mesh(bodyGeometry, [frontMaterial, backMaterial, sideMaterial, sideMaterial, sideMaterial, sideMaterial]);
        body.position.y = 1;
        group.add(body);

        // Создание головы
        const headGeometry = new THREE.BoxGeometry(1, 1, 1);
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 2.5;
        group.add(head);

        // Создание рук
        const armGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        const rightArm = new THREE.Mesh(armGeometry, armMaterial);

        leftArm.position.set(-0.9, 1.5, 0);
        rightArm.position.set(0.9, 1.5, 0);

        group.add(leftArm);
        group.add(rightArm);

        return group;
    }

    const character = createCharacter();
    scene.add(character);

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

    // Создание группы для вращения мира
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);
    worldGroup.add(character); // Персонаж добавлен в мир, чтобы вращаться вместе с ним

    // Инициализация OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // Запретить зум
    controls.enablePan = false; // Запретить панорамирование
    controls.enableDamping = true; // Включить сглаживание
    controls.dampingFactor = 0.25;
    controls.target.set(character.position.x, character.position.y, character.position.z);

    // Установите начальную позицию камеры
    const initialCameraDistance = 10;
    camera.position.set(character.position.x + initialCameraDistance, character.position.y + 5, character.position.z + initialCameraDistance);
    controls.update(); // Обновление состояния управления после установки начальной позиции

    // Основной цикл
    let velocityY = 0;
    let isJumping = false;
    let isTouching = false;
    let touchStartPosition = new THREE.Vector2();

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

        // Обновление положения мира в зависимости от угла камеры
        worldGroup.rotation.y = -controls.getAzimuthalAngle(); // Поворачиваем мир в противоположную сторону камеры

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

    // Обработка жестов на тачскрине
    window.addEventListener('touchstart', (event) => {
        touchStartPosition.set(event.touches[0].clientX, event.touches[0].clientY);
        isTouching = true;
    });

    window.addEventListener('touchend', () => {
        isTouching = false;
    });

    window.addEventListener('touchmove', (event) => {
        if (!isTouching) return;

        const touchEndPosition = new THREE.Vector2(event.touches[0].clientX, event.touches[0].clientY);
        const deltaY = touchEndPosition.y - touchStartPosition.y;
        const deltaX = touchEndPosition.x - touchStartPosition.x;

        const speed = 0.2;

        // Движение вперед и назад по вертикали
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            if (deltaY < 0) {
                character.position.addScaledVector(getCameraDirection(), speed); // Движение вперед
            } else {
                character.position.addScaledVector(getCameraDirection().negate(), speed); // Движение назад
            }
        }

        // Движение влево и вправо по горизонтали
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            const leftDirection = new THREE.Vector3(-getCameraDirection().z, 0, getCameraDirection().x);
            const rightDirection = new THREE.Vector3(getCameraDirection().z, 0, -getCameraDirection().x);

            if (deltaX < 0) {
                character.position.addScaledVector(leftDirection, speed); // Движение влево
            } else {
                character.position.addScaledVector(rightDirection, speed); // Движение вправо
            }
        }

        // Обновляем начальную позицию касания
        touchStartPosition.copy(touchEndPosition);

        // Проверка на столкновения со стенами
        if (character.position.x < -49) character.position.x = -49;
        if (character.position.x > 49) character.position.x = 49;
        if (character.position.z < -49) character.position.z = -49;
        if (character.position.z > 49) character.position.z = 49;

        // Синхронизация камеры с движением персонажа
        controls.target.set(character.position.x, character.position.y, character.position.z);
        controls.update();
    });

    // Обработка изменения размера экрана
    function onResize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', onResize);
} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}
