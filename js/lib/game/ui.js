import * as THREE from 'three';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three@0.167.0/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.167.0/examples/jsm/geometries/TextGeometry.js';

const fontLoader = new FontLoader();
let scoreText;
let font;

// Функция для создания текста
function createScoreText(font, scene) {
    const geometry = new TextGeometry('Score: 0', {
        font: font,
        size: 1,
        height: 0.1,
    });

    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    scoreText = new THREE.Mesh(geometry, material);
    scoreText.position.set(-10, 8, 0);
    scene.add(scoreText);
}

// Загрузка шрифта и создание начального текста
fontLoader.load('https://cdn.jsdelivr.net/npm/three@0.167.0/examples/fonts/helvetiker_regular.typeface.json', (loadedFont) => {
    font = loadedFont;
    // Убедитесь, что `scene` доступна
    // Передача `scene` должна быть выполнена при инициализации
});

export function updateScoreText(score) {
    if (scoreText && font) {
        scoreText.geometry.dispose();
        scoreText.geometry = new TextGeometry(`Score: ${score}`, {
            font: font,
            size: 1,
            height: 0.1,
        });
    }
}

export function initScoreText(scene) {
    if (font) {
        createScoreText(font, scene);
    } else {
        fontLoader.load('https://cdn.jsdelivr.net/npm/three@0.167.0/examples/fonts/helvetiker_regular.typeface.json', (loadedFont) => {
            font = loadedFont;
            createScoreText(font, scene);
        });
    }
}