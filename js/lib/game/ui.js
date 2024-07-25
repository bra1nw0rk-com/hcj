import * as THREE from 'three';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three@0.167.0/examples/jsm/loaders/FontLoader.js';

const fontLoader = new FontLoader();  // Создаем экземпляр FontLoader
let scoreText;
let font;

// Функция для создания текста
function createScoreText(font) {
    const geometry = new THREE.TextGeometry('Score: 0', {
        font: font,
        size: 1,
        height: 0.1,
    });

    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    scoreText = new THREE.Mesh(geometry, material);
    scoreText.position.set(-10, 8, 0);
    return scoreText;
}

// Загрузка шрифта и создание начального текста
fontLoader.load('https://cdn.jsdelivr.net/npm/three@0.167.0/examples/fonts/helvetiker_regular.typeface.json', (loadedFont) => {
    font = loadedFont;
    scoreText = createScoreText(font);
    scene.add(scoreText);
});

export function updateScoreText(score) {
    if (scoreText && font) {
        scoreText.geometry.dispose();
        scoreText.geometry = new THREE.TextGeometry(`Score: ${score}`, {
            font: font,
            size: 1,
            height: 0.1,
        });
    }
}
