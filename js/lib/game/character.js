import * as THREE from 'three';

export function createCharacter() {
    const characterGroup = new THREE.Group();

    // Персонаж
    const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Коричневый
    const headMaterial = new THREE.MeshBasicMaterial({ color: 0xffc0cb }); // Розовый
    const handMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 }); // Оранжевый
    const footMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 }); // Темно-серый

    // Тело
    const bodyGeometry = new THREE.BoxGeometry(1, 2, 1);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1;
    characterGroup.add(body);

    // Голова
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 2.2;
    characterGroup.add(head);

    // Руки
    const armGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 32);
    const leftArm = new THREE.Mesh(armGeometry, handMaterial);
    leftArm.rotation.z = Math.PI / 2;
    leftArm.position.set(-0.8, 1.5, 0);
    characterGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, handMaterial);
    rightArm.rotation.z = Math.PI / 2;
    rightArm.position.set(0.8, 1.5, 0);
    characterGroup.add(rightArm);

    // Ноги
    const footGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32);
    const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
    leftFoot.position.set(-0.5, 0, 0);
    characterGroup.add(leftFoot);

    const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
    rightFoot.position.set(0.5, 0, 0);
    characterGroup.add(rightFoot);

    return characterGroup;
}
