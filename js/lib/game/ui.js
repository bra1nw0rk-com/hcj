import * as THREE from 'three';

const fontLoader = new THREE.FontLoader();
let scoreText;

fontLoader.load('https://cdn.jsdelivr.net/npm/three@0.167.0/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const geometry = new THREE.TextGeometry('Score: 0', {
        font: font,
        size: 1,
        height: 0.1,
    });

    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    scoreText = new THREE.Mesh(geometry, material);
    scoreText.position.set(-10, 8, 0);
    scene.add(scoreText);
});

export function updateScoreText(score) {
    if (scoreText) {
        scoreText.geometry.dispose();
        scoreText.geometry = new THREE.TextGeometry(`Score: ${score}`, {
            font: fontLoader.font,
            size: 1,
            height: 0.1,
        });
    }
}
