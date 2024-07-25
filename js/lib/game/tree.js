import * as THREE from 'three';

const treeGeometry = new THREE.ConeGeometry(1, 3, 8);
const treeMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 8);
const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });

export function createTree() {
    const tree = new THREE.Group();

    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 1;
    tree.add(trunk);

    const foliage = new THREE.Mesh(treeGeometry, treeMaterial);
    foliage.position.y = 3;
    tree.add(foliage);

    return tree;
}
