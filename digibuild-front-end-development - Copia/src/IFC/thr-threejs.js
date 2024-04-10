/* global THREE, divContents */
// jshint esversion: 6
// jshint loopfunc: true
import {
	Object3D,
	Triangle,
	Group,
	MeshPhongMaterial,
	MeshBasicMaterial,
	BufferGeometry,
	Mesh,
	Vector3,
	Color,
	ShapeUtils,
	Plane,
	WebGLRenderer,
	PerspectiveCamera,
	Scene,	
} from './three.min'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class THR {}

//let divContents = document.getElementById("divContents")

THR.getThreejs = function ( target = document.getElementById("divContents") ) {

	target = document.getElementById("divContents")
	
		THR.renderer = new WebGLRenderer( { alpha: 1, antialias: true } );
		THR.renderer.setPixelRatio( window.devicePixelRatio );
		THR.renderer.setSize( target.clientWidth, target.clientHeight );

		target.appendChild( THR.renderer.domElement );

		THR.camera = new PerspectiveCamera( 40, target.clientWidth / target.clientHeight, 0.1, 1000 );
		THR.camera.position.set( - 100, - 100, 100 );
		THR.camera.up.set( 0, 0, 1 );

		THR.controls = new OrbitControls( THR.camera, THR.renderer.domElement );

		THR.scene = new Scene();

		window.addEventListener( 'resize', () => THR.onWindowResize( target ), false );
		window.addEventListener( 'orientationchange', () => THR.onWindowResize( target ), false );
	
	

};



THR.onWindowResize = function( target = divContents ) {

	THR.camera.aspect = target.clientWidth / target.clientHeight;
	THR.camera.updateProjectionMatrix();
	THR.renderer.setSize( target.clientWidth, target.clientHeight );
	//THR.controls.handleResize(); // trackball only

	//console.log( 'onWindowResize  target.innerWidth', target.innerWidth );

};



THR.animate = function() {

	requestAnimationFrame( THR.animate );
	THR.renderer.render( THR.scene, THR.camera );
	THR.controls.update();

};