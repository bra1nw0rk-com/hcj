import * as THREE from 'three';

const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubes = []; // Глобальный массив для хранения кубиков

export function createCube(position, scene) {
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.copy(position);
    scene.add(cube);
    cubes.push(cube); // Добавление кубика в массив
}

export function updateCubes(character, scene, onCollect) {
    cubes.forEach((cube, index) => {
        if (character.position.distanceTo(cube.position) < 1) {
            scene.remove(cube);
            cubes.splice(index, 1);
            onCollect();
        }
    });
}

export { cubes }; // Экспорт массива кубиков
