import * as THREE from 'three';

const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Зеленый кубик
export const cubes = [];

export function createCube(scene, position) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const cube = new THREE.Mesh(geometry, cubeMaterial);
    cube.position.copy(position);
    cubes.push(cube);
    scene.add(cube);
}

export function updateCubes(character, scene, cubes, onCollect) {
    const characterBox = new THREE.Box3().setFromObject(character);

    cubes.forEach((cube, index) => {
        const cubeBox = new THREE.Box3().setFromObject(cube);

        if (characterBox.intersectsBox(cubeBox)) {
            scene.remove(cube);
            cubes.splice(index, 1);
            onCollect();
        }
    });
}
