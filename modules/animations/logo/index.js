/**
 * @author Volodymyr Cherniyevskyy
 * @copyright bra1nw0rk.
 * {@link https://github.com/bra1nw0rk-com/hcj GitHub}.
 * {@link https://www.linkedin.com/in/volodymyr-cherniyevskyy-24962b22b LinkedIn}
 **/
import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import HTMLObject from "../../../js/lib/html/HTMLObject.js";

export default class AnimationLogo extends HTMLObject  {
    camera = new THREE.PerspectiveCamera(25, 1, 0.1, 1000);
    scene;
    renderer;
	 constructor() {
        super("canvas");
        this.css = "/modules/animations/logo/index.css";
        this.name = "animated-logo";
        THREE.ColorManagement.enabled = false;
        this.camera.position.z = 100;

    }
    init() {
/*
        let _this = this;
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xffffff, 0);  // Color is white (#ffffff), and the alpha is 1 (fully opaque)
        renderer.setSize(210, 90);
        this.template = renderer.domElement;

// Create gradient texture (as previously discussed)
        function createGradientTexture() {
            const canvas = document.createElement('canvas');
            console.log(renderer.getSize())
            canvas.width = renderer.getSize().width;
            canvas.height = renderer.getSize().height;
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
            const group = new THREE.Group();
            for ( let i = 0; i < paths.length; i ++ ) {

                const path = paths[ i ];

                const material = new THREE.MeshBasicMaterial( {
                    color: path.color,
                    side: THREE.DoubleSide,
                    depthWrite: false
                } );

                const shapes = SVGLoader.createShapes( path );

                for ( let j = 0; j < shapes.length; j ++ ) {

                    const shape = shapes[ j ];
                    const geometry = new THREE.ShapeGeometry( shape );
                    const mesh = new THREE.Mesh( geometry, material );
                    group.add( mesh );

                }

            }

            scene.add( group );

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




        });

        this.animate();
        */
    }
    animate() {
        /*
        let count = 0;
        const time = performance.now() / 1000;
        this.scene.traverse( function ( child ) {
            child.rotation.y += count + ( time / 3 );
            count ++;
        } );
        this.renderer.render( this.scene, this.camera );
        requestAnimationFrame( this.animate );
        */
    }
}
