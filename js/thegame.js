import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Проверка наличия WebGL
if (WEBGL.isWebGLAvailable()) {
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

    // Создание дерева
    function createTree() {
        const treeGroup = new THREE.Group();

        // Создание ствола дерева
        const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 5);
        const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 2.5;
        treeGroup.add(trunk);

        // Создание кроны дерева
        const crownGeometry = new THREE.SphereGeometry(3);
        const crownMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
        const crown = new THREE.Mesh(crownGeometry, crownMaterial);
        crown.position.y = 6;
        treeGroup.add(crown);

        return treeGroup;
    }

    // Добавление дерева на карту
    const tree = createTree();
    tree.position.set(10, 0, 10); // Позиция дерева на карте
    scene.add(tree);

    // Создание кубиков для сбора
    const cubes = [];
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

    function createCube(position) {
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.copy(position);
        scene.add(cube);
        cubes.push(cube);
    }

    // Размещение нескольких кубиков
    createCube(new THREE.Vector3(5, 0.5, 5));
    createCube(new THREE.Vector3(-5, 0.5, -5));
    createCube(new THREE.Vector3(7, 0.5, -7));

    // Создание текстовой метки для очков
    const loader = new FontLoader();
    let score = 0;
    let scoreText;

    function updateScoreText() {
        if (scoreText) {
            scene.remove(scoreText);
        }

        loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            const textGeometry = new TextGeometry(`Score: ${score}`, {
                font: font,
                size: 1,
                height: 0.1
            });
            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            scoreText = new THREE.Mesh(textGeometry, textMaterial);
            scoreText.position.set(character.position.x - 2, character.position.y + 4, character.position.z);
            scene.add(scoreText);
        });
    }

    updateScoreText();

    // Инициализация OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // Запретить зум
    controls.enablePan = false; // Запретить панорамирование
    controls.enableDamping = true; // Включить сглаживание
    controls.dampingFactor = 0.25;
    controls.target.set(character.position.x, character.position.y, character.position.z);

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

        // Обработка столкновений с кубиками
        cubes.forEach((cube, index) => {
            if (character.position.distanceTo(cube.position) < 1) {
                scene.remove(cube);
                cubes.splice(index, 1);
                score++;
                updateScoreText();
            }
        });

        controls.update(); // Обновление OrbitControls
        renderer.render(scene, camera);
    }

    animate();

    // Обработка ввода для движения персонажа
    window.addEventListener('keydown', (event) => {
        const speed = 0.5;
        switch (event.key) {
            case 'w':
            case 'ArrowUp':
                character.position.z -= speed;
                break;
            case 's':
            case 'ArrowDown':
                character.position.z += speed;
                break;
            case 'a':
            case 'ArrowLeft':
                character.position.x -= speed;
                break;
            case 'd':
            case 'ArrowRight':
                character.position.x += speed;
                break;
            case ' ':
                if (!isJumping) {
                    velocityY = 0.2;
                    isJumping = true;
                }
                break;
        }

        // Обновление камеры
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
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
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    character.position.x += speed;
                } else {
                    character.position.x -= speed;
                }
            } else {
                if (deltaY > 0) {
                    character.position.z += speed;
                } else {
                    character.position.z -= speed;
                }
            }

            // Обновление камеры
            const direction = new THREE.Vector3();
            camera.getWorldDirection(direction);
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
} else {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}
