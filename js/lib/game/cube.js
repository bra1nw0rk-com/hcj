import * as THREE from 'three';

const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubes = [];

export function createCube(position) {
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.copy(position);
    scene.add(cube);
    cubes.push(cube);
}

export function updateCubes(character, scene, cubes, onCollect) {
    cubes.forEach((cube, index) => {
        if (character.position.distanceTo(cube.position) < 1) {
            scene.remove(cube);
            cubes.splice(index, 1);
            onCollect();
        }
    });
}
