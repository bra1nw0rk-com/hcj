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
        // Scene, camera, renderer setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

// Load SVG path data and create shape
        const svgPathData = "M 10 10 H 90 V 90 H 10 L 10 10";
        const shape = new THREE.Shape();
        const path = new THREE.Path();
        path.fromSVGString(svgPathData);
        shape.add(path);

// Extrude the shape to create a 3D object
        const extrudeSettings = {
            depth: 10,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 1
        };
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

// Create a material and mesh
        const material = new THREE.MeshNormalMaterial();
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

// Position camera and start animation loop
        camera.position.z = 100;
        const animate = function () {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();
    }
}
