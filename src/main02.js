/*
 * @Author: Hhvcg
 * @Date: 2023-05-11 17:50:16
 * @LastEditors: Hhvcg
 */
import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);
var light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );
var loader = new GLTFLoader();
    loader.load( './air.glb', function ( gltf ) {
        console.log('加载成功！！！', gltf)
    scene.add( gltf.scene );
}, undefined, function ( error ) {
    console.error( error );
} );
renderer.render(scene, camera);