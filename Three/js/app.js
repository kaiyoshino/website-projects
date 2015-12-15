'use strict'

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.OctahedronGeometry();
var material = new THREE.MeshLambertMaterial( {color: 0xCC0000} );
var shape = new THREE.Mesh( geometry, material );
scene.add(shape);

var pointLight = new THREE.PointLight(0xFFFFFF);

pointLight.position.x = 100;
pointLight.position.y = 100;
pointLight.position.z = 1000;

scene.add(pointLight);

camera.position.z = 3;

function render() {
	requestAnimationFrame( render );
	shape.rotation.x += 0.02;
	shape.rotation.y += 0.02;
	renderer.render( scene, camera );
}
render();
