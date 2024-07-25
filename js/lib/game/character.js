import * as THREE from 'three';

// Функция создания персонажа
export function createCharacter() {
    const group = new THREE.Group();

    const frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const backMaterial = new THREE.MeshBasicMaterial({ color: 0x404040 });
    const sideMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const headMaterial = new THREE.MeshBasicMaterial({ color: 0xffc0cb });
    const armMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });

    const bodyGeometry = new THREE.BoxGeometry(1, 2, 1);
    const body = new THREE.Mesh(bodyGeometry, [frontMaterial, backMaterial, sideMaterial, sideMaterial, sideMaterial, sideMaterial]);
    body.position.y = 1;
    group.add(body);

    const headGeometry = new THREE.BoxGeometry(1, 1, 1);
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 2.5;
    group.add(head);

    const armGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);

    leftArm.position.set(-0.9, 1.5, 0);
    rightArm.position.set(0.9, 1.5, 0);

    group.add(leftArm);
    group.add(rightArm);

    return group;
}
