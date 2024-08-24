import * as THREE from 'three';

import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class AnimationLogo extends HTMLObject  {
	 constructor() {
        super("");
        let _this = this;
        this.css = "/modules/animations/logo/index.css";
        this.name = "animated-logo";        
        this.template = $(html`
            <img src = "/img/logo_color.svg" alt="bwos logo" data-animated="" class="rotate"/>
               
		    `);
        this.init();
    }
    init() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Add some lighting
        const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);
        // Load the STL file
        const loader = new THREE.STLLoader();
        let mesh;

        loader.load('/img/3d/logo.stl', function (geometry) {
            const material = new THREE.MeshPhongMaterial({ color: 0x0055ff });
            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            // Center the mesh
            geometry.center();

            // Position the camera
            camera.position.z = 100;
        });

        // Infinite rotation animation
        function animate() {
            requestAnimationFrame(animate);

            if (mesh) {
                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.01;
            }

            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize
        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);
    }
}
