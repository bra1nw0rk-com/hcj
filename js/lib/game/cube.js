import * as THREE from 'three';

export const cubes = [];

// Функция для создания нового кубика
export function createCube(scene, position) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffa500 }); // Оранжевый цвет
    const cube = new THREE.Mesh(geometry, material);
    cube.position.copy(position);
    scene.add(cube);
    cubes.push(cube);
}

// Функция для генерации случайной позиции
function getRandomPosition() {
    const x = Math.floor(Math.random() * 100) - 50; // диапазон от -50 до 50
    const z = Math.floor(Math.random() * 100) - 50; // диапазон от -50 до 50
    return new THREE.Vector3(x, 0.5, z);
}

// Функция для обновления кубиков и проверки на столкновение
export function updateCubes(character, scene, cubes, onCollect) {
    const characterBox = new THREE.Box3().setFromObject(character);

    cubes.forEach((cube, index) => {
        const cubeBox = new THREE.Box3().setFromObject(cube);
        if (characterBox.intersectsBox(cubeBox)) {
            // Удалить кубик со сцены и из массива
            scene.remove(cube);
            cubes.splice(index, 1);

            // Создать новый кубик в случайном месте
            const newPosition = getRandomPosition();
            createCube(scene, newPosition);

            // Вызвать callback
            onCollect();
        }
    });
}
