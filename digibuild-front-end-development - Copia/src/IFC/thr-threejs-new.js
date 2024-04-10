/*
let group, axesHelper, lightDirectional, cameraHelper;
let renderer, camera, controls, scene;

const THR = {
	group,
	axesHelper,
	lightDirectional,
	cameraHelper,
	renderer,
	camera,
	controls,
	scene,
};
*/

/*
import {
	THREE
} from './three.min'
*/
import * as THREE from "./three.min";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let group, axesHelper, lightDirectional, cameraHelper;
let renderer, camera, controls, scene;

const THR = {
	group,
	axesHelper,
	lightDirectional,
	cameraHelper,
	renderer,
	camera,
	controls,
	scene,
};

THR.center = new THREE.Vector3( 0, 0, 0 );
THR.radius = 50;

THR.init = function () {
//	console.log('--> THR.init')

	let target = document.getElementById("divContentsNew")
	//let rect = document.getElementById('divContentsNew').getBoundingClientRect();
	//let pippo = document.getElementById('divContentsNew').parentElement;
	let height = document.getElementById('divContentsNew').parentElement.clientHeight;
	let width = document.getElementById('divContentsNew').parentElement.clientWidth;
	//let height = 600;
	//let width = 600;
	
	//console.log('pippo', pippo)
	//console.log('target', target)
	//console.log('height', height)
	//console.log('width', width)
	
	THR.camera = new THREE.PerspectiveCamera( 40, width / height, 1, 1000 );
	THR.camera.position.set( -100, -100, 100 );
	THR.camera.up.set( 0, 0, 1 );

	THR.scene = new THREE.Scene();
	THR.scene.background = new THREE.Color( 0xcce0ff );
	THR.scene.fog = new THREE.Fog( 0xcce0ff, 550, 800 );
	THR.scene.add(THR.camera);

	THR.renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
	THR.renderer.setPixelRatio( window.devicePixelRatio );
	THR.renderer.setSize( width, height );

	THR.renderer.outputEncoding = THREE.sRGBEncoding;
	THR.renderer.shadowMap.enabled = true;
	THR.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	target.appendChild( THR.renderer.domElement );

	THR.controls = new OrbitControls( THR.camera, THR.renderer.domElement );
	THR.controls.minDistance = 1;
	THR.controls.maxDistance = 500;
	THR.controls.autoRotate = true;
	THR.controls.enableDamping = true;
	THR.controls.dampingFactor = 0.08;
	THR.controls.enablePan = true;
	THR.controls.autoRotateSpeed = 5;

	THR.axesHelper = new THREE.AxesHelper( 100 );
	THR.axesHelper.name = "axesHelper";
	THR.scene.add(THR.axesHelper);

	//window.addEventListener( "resize", THR.onWindowResize(target), false );
	//window.addEventListener( "orientationchange", THR.onWindowResize(target), false );
	window.addEventListener( 'resize', () => THR.onWindowResize( target ), false );
	window.addEventListener( 'orientationchange', () => THR.onWindowResize( target ), false );

	window.addEventListener( "keydown", THR.onStart );
	THR.renderer.domElement.addEventListener( "click", THR.onStart );
	THR.renderer.domElement.addEventListener( "touchstart", THR.onStart );
	THR.renderer.domElement.addEventListener( "touchmove", THR.onStart );
	THR.renderer.domElement.addEventListener( "touchend", THR.onStart );
	THR.renderer.domElement.addEventListener( "wheel", THR.onStart );

	let event = new Event( "onloadthree", { bubbles: true, cancelable: false, detail: true } );

	window.addEventListener( "onloadthree", THR.onLoad, false );

	window.dispatchEvent( event );
};

THR.onStart = function () {
	THR.controls.autoRotate = false;

	window.removeEventListener( "keydown", THR.onStart );
	THR.renderer.domElement.removeEventListener( "click", THR.onStart );
	THR.renderer.domElement.removeEventListener( "touchstart", THR.onStart );
	THR.renderer.domElement.removeEventListener( "touchmove", THR.onStart );
	THR.renderer.domElement.removeEventListener( "touchend", THR.onStart );
	THR.renderer.domElement.removeEventListener( "wheel", THR.onStart );
};


THR.setSceneNew = function ( group ) {
//	console.log('--> THR.setSceneNew');

	THR.scene.remove( group );

	group = new THREE.Group();

	THR.scene.add( group );

	return group;

};

THR.updateScene = function ( group = THR.group ) {
//	console.log('--> THR.updateScene');


//  console.log( "group", THR.group  );

	if ( !THR.group.children.length ) {
		return;
	}

	THR.zoomObjectBoundingSphere( group );

};

//////////

THR.zoomObjectBoundingSphere = function ( obj = THR.group ) {
	//console.log( "obj", obj );

	THR.center = new THREE.Vector3( 0, 0, 0 );
	THR.radius = 50;
	THR.bottom = 0;

	const bbox = new THREE.Box3().setFromObject( obj );
	//console.log( 'bbox', bbox );

	if ( bbox.max.x !== Infinity ) {
		const sphere = bbox.getBoundingSphere( new THREE.Sphere() );

		THR.center = sphere.center;
		THR.radius = sphere.radius;
		THR.bottom = bbox.min.z;
	}

	THR.controls.target.copy( THR.center ); // needed because model may be far from origin
	THR.controls.maxDistance = 50 * THR.radius;
	THR.controls.update();

	THR.camera.position.copy(
		THR.center.clone().add( new THREE.Vector3( -1.5 * THR.radius, -1 * THR.radius, 1.5 * THR.radius ) )
	);
	THR.camera.near = 0.001 * THR.radius; //2 * camera.position.length();
	THR.camera.far = 50 * THR.radius; //2 * camera.position.length();
	THR.camera.updateProjectionMatrix();

	THR.scene.fog.near = THR.radius * 7;
	THR.scene.fog.far = THR.radius * 8;

	THR.axesHelper.position.copy( THR.center );

	if ( THR.ground ) {

		THR.ground.position.set( THR.center.x, THR.center.y, THR.bottom - 0.5 );

	}

	// if (window.HRT) {
	// 	HRT.heart.position.set(THR.center.x, THR.center.y, THR.bottom - 1 * THR.radius);
	// }

	if ( THR.lightDirectional ) {
		THR.lightDirectional.position.copy(
			THR.center.clone().add( new THREE.Vector3( -1.5 * THR.radius, -1.5 * THR.radius, 1.5 * THR.radius ) )
		);

		THR.lightDirectional.shadow.camera.scale.set( 0.01 * THR.radius, 0.01 * THR.radius, 0.01 * THR.radius );

		THR.lightDirectional.target = THR.axesHelper;

		THR.scene.remove( THR.cameraHelper );
		THR.cameraHelper = new THREE.CameraHelper( THR.lightDirectional.shadow.camera );
		THR.scene.add( THR.cameraHelper );
		THR.cameraHelper.visible = false;
	}

	//let event = new Event("onresetthree", { bubbles: true, cancelable: false, detail: true });
	//window.addEventListener( "onrresetthree", doThings, false );
	//window.dispatchEvent(event);
};

THR.zoomToFitObject = function ( object = THR.group, fitOffset = 1 ) {

	const box = new THREE.Box3().setFromObject( object );
	const size = box.getSize( new THREE.Vector3() );
	const center = box.getCenter( new THREE.Vector3() );

	const maxSize = Math.max( size.x, size.y, size.z );
	const fitHeightDistance = maxSize / ( 2 * Math.atan( ( Math.PI * THR.camera.fov ) / 360 ) );
	const fitWidthDistance = fitHeightDistance / THR.camera.aspect;
	const distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );

	const direction = THR.controls.target.clone().sub( THR.camera.position ).normalize().multiplyScalar( distance );

	THR.controls.maxDistance = distance * 10;
	THR.controls.target.copy( center );

	THR.camera.near = distance / 100;
	THR.camera.far = distance * 100;
	THR.camera.updateProjectionMatrix();

	THR.scene.fog.near = distance * 2;
	THR.scene.fog.far = distance * 2.5;

	THR.distance = distance;

	THR.camera.position.copy( THR.controls.target ).sub( direction );

	THR.controls.update();

	//let event = new Event("onresetthree", { bubbles: true, cancelable: false, detail: true });
	//window.addEventListener( "onrresetthree", doThings, false );
	//window.dispatchEvent(event);
};



THR.setAllVisible = function () {

	//THRU.tellTaleReset();

	THR.group.children.forEach( mesh => ( mesh.visible = true ) );
};

//////////

THR.addLights = function () {
	//scene.add( new THREE.AmbientLight( 0x404040 ) );
	THR.scene.add( new THREE.AmbientLight( 0xaaaaaa ) );

	const pointLight = new THREE.PointLight( 0xffffff, 1 );
	pointLight.position.copy( THR.camera.position );
	THR.camera.add( pointLight );

	// lightDirectional = new THREE.DirectionalLight( 0xdffffff, 0 );
	// lightDirectional.position.set( -50, -200, 100 );
	// scene.add( lightDirectional );
};

THR.addLights = function () {
//	console.log('--> addLights');
	
	//scene.add( new THREE.AmbientLight( 0x404040 ) );
	THR.scene.add( new THREE.AmbientLight( 0x888888 ) );

	const pointLight = new THREE.PointLight( 0xffffff, 0.2 );
	pointLight.position.copy( THR.camera.position );
	pointLight.shadow.radius = 2;
	//pointLight.castShadow = true;
	THR.camera.add( pointLight );

	THR.lightDirectional = new THREE.DirectionalLight( 0xdffffff, 0.5 );
	THR.lightDirectional.position.set( -0, -200, 100 );
	THR.lightDirectional.castShadow = true;
	// lightDirectional.shadow.mapSize.width = 1024;
	// lightDirectional.shadow.mapSize.height = 1024;

	let d = 100;
	THR.lightDirectional.shadow.camera.left = -d;
	THR.lightDirectional.shadow.camera.right = d;
	THR.lightDirectional.shadow.camera.top = d;
	THR.lightDirectional.shadow.camera.bottom = -d;
	THR.lightDirectional.shadow.camera.far = 500;
	THR.scene.add(THR.lightDirectional );

};

THR.addGround = function ( position = new THREE.Vector3( 0, 0, 0 ) ) {
//	console.log('--> addGround');
	const geometry = new THREE.PlaneBufferGeometry( 5000, 5000 );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( position.x, position.y, position.z ) );
	const material = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, side: 0 } );
	THR.ground = new THREE.Mesh( geometry, material );
	//THR.ground.position.copy(position);
	THR.ground.receiveShadow = true;

	THR.scene.add( THR.ground );

	// const geo = new THREE.PlaneGeometry(50, 20);
	// const mat = new THREE.MeshPhongMaterial({
	// 	color: "pink",
	// 	polygonOffset: true,
	// 	polygonOffsetFactor: -0.2,
	// 	side: 2,
	// });
	// THR.ground.add(new THREE.Mesh(geo, mat));
};

THR.setStats = function () {
	const script = document.head.appendChild( document.createElement( "script" ) );
	script.onload = () => {
		const stats = new Stats();
		const statsDom = document.body.appendChild( stats.dom );
		statsDom.style.left = "";
		statsDom.style.right = "0px";
		requestAnimationFrame( function loop () {
			stats.update();
			requestAnimationFrame( loop );
		} );
	};

	script.src = "https://mrdoob.github.io/stats.js/build/stats.min.js";

	const render = THR.renderer.info.render;

	detFile.open = true;
	if ( !window.divLog ) {
		divLog = detFile.body.appendChild( document.createElement( "div" ) );
	}
	divLog.innerHTML = `
<p>
Three.js renderer statistics<br>
Draw calls: ${ render.calls }<br>
Triangles: ${ render.triangles.toLocaleString() }<br>
</p>`;
};

THR.onWindowResize = function( target = divContentsNew ) {
//	console.log('--> onWindowResize');
	//THR.camera.aspect = target.innerWidth / target.innerHeight;
//	console.log('target.clientWidth ', target.clientWidth );
//	console.log('target.clientHeight ', target.clientHeight );
	
	//THR.camera.aspect = target.clientWidth / target.clientHeight;
	THR.camera.aspect = target.clientWidth / target.clientWidth;
	//THR.camera.aspect = 600 / 600;

	THR.camera.updateProjectionMatrix();

	//THR.controls.reset();
	//THR.renderer.setSize( 600, 600);
	//THR.renderer.setSize( target.clientWidth, target.clientHeight );
	THR.renderer.setSize( target.clientWidth, target.clientWidth );

	//THR.zoomObjectBoundingSphere();

};

THR.animate = function () {
//	console.log('--> animate');
	requestAnimationFrame( THR.animate );
	THR.renderer.render( THR.scene, THR.camera );
	THR.controls.update();
};

export default THR;
