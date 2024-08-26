import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class AnimationLogo extends HTMLObject  {
    #camera = new THREE.PerspectiveCamera(25, 1, 0.1, 1000);
	 constructor() {
        super("");
        this.css = "/modules/animations/logo/index.css";
        this.name = "animated-logo";
    }
    init() {
        let _this = this;
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer();
        // Set the background color to opaque (e.g., white)

        renderer.setClearColor(0xffffff, 0);  // Color is white (#ffffff), and the alpha is 1 (fully opaque)

        renderer.setSize(210, 90);
        this.template = renderer.domElement;

        this.#camera.position.z = 100;

// Create gradient texture (as previously discussed)
        function createGradientTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const context = canvas.getContext('2d');

            // Create gradient
            const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop(0, '#FF8E3D');
            gradient.addColorStop(0.495838, '#FFFFFF');
            gradient.addColorStop(0.98, '#0064D9');

            // Fill the canvas with the gradient
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Use the canvas as a texture
            const texture = new THREE.CanvasTexture(canvas);
            return texture;
        }

// Load the SVG file
        const loader = new SVGLoader();
        loader.load('/img/logo_color.svg', function(data) {
            const paths = data.paths;

            const gradientTexture = createGradientTexture();

            paths.forEach((path) => {
                const shapes = path.toShapes(true);
                shapes.forEach((shape) => {
                    const extrudeSettings = {
                        depth: 15,
                        bevelEnabled: true,
                        bevelThickness: 0.5,
                        bevelSize: 0.5,
                        bevelSegments: 100,
                        curveSegments: 50 // Increase for smoother curves
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

                    // Apply gradient texture as a material
                    const material = new THREE.MeshBasicMaterial({
                        map: gradientTexture,
                        side: THREE.DoubleSide
                    });

                    const mesh = new THREE.Mesh(geometry, material);
                    mesh.scale.set(0.05, 0.1, 0.1); // Scale down the object
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
            renderer.render(scene, _this.#camera);
        };

// Add lighting for better shading and visibility
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 0, 100).normalize();
        scene.add(directionalLight);


    }
}
