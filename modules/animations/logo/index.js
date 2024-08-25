import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
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
        // Scene, camera, and renderer setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        camera.position.z = 1000;

        // Load the SVG file
        const loader = new SVGLoader();
        loader.load('/img/logo_color.svg', function(data) {
            const paths = data.paths;
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide, depthWrite: false });

            paths.forEach((path) => {
                const shapes = path.toShapes(true);
                shapes.forEach((shape) => {
                    const extrudeSettings = {
                        depth: 5,
                        bevelEnabled: true,
                        bevelThickness: 0.5,
                        bevelSize: 0.5,
                        bevelSegments: 1
                    };
                    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                    const mesh = new THREE.Mesh(geometry, material);
                    scene.add(mesh);
                });
            });

            animate();
        });

        const animate = function() {
            requestAnimationFrame(animate);
            scene.children.forEach(mesh => {
                mesh.rotation.x += 0;
                mesh.rotation.y += 0.01;
            });
            renderer.render(scene, camera);
        };
    }
}
