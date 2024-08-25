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
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        camera.position.z = 100;

// Load the SVG file
        const loader = new SVGLoader();
        loader.load('/img/logo_color.svg', function(data) {
            const paths = data.paths;

            paths.forEach((path) => {
                const shapes = path.toShapes(true);
                shapes.forEach((shape) => {
                    const extrudeSettings = {
                        depth: 5, // Reduce depth for a thinner object
                        bevelEnabled: true,
                        bevelThickness: 1,
                        bevelSize: 0.5,
                        bevelSegments: 1
                    };
                    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

                    // Compute the bounding box
                    geometry.computeBoundingBox();

                    // Calculate the offset to center the geometry
                    const boundingBox = geometry.boundingBox;
                    const offsetX = -0.5 * (boundingBox.max.x + boundingBox.min.x);
                    const offsetY = -0.5 * (boundingBox.max.y + boundingBox.min.y);
                    const offsetZ = -0.5 * (boundingBox.max.z + boundingBox.min.z);

                    // Apply the offset to the geometry
                    geometry.translate(offsetX, offsetY, offsetZ);

                    // Extract the color from the SVG path
                    const material = new THREE.MeshBasicMaterial({
                        color: path.color, // Use the path's color
                        side: THREE.DoubleSide
                    });

                    const mesh = new THREE.Mesh(geometry, material);
                    mesh.scale.set(0.25, 0.25, 0.25); // Scale down the object
                    scene.add(mesh);
                });
            });

            animate();
        });

        const animate = function() {
            requestAnimationFrame(animate);
            scene.children.forEach(mesh => {
                // Rotate the mesh on the y-axis
                mesh.rotation.y += 0.01;
            });
            renderer.render(scene, camera);
        };

// Add lighting for better shading and visibility
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 0, 100).normalize();
        scene.add(directionalLight);


    }
}
