import * as THREE from 'three';

export function createTree() {
    const treeGroup = new THREE.Group();

    // Ствол дерева
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 32);
    const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Коричневый
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 2.5;
    treeGroup.add(trunk);

    // Крона дерева
    const crownGeometry = new THREE.SphereGeometry(2, 32, 32);
    const crownMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Зеленый
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.position.y = 5;
    treeGroup.add(crown);

    return treeGroup;
}
