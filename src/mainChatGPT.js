// 创建场景
import * as THREE from 'three'

var scene = new THREE.Scene();

// 创建相机
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 创建渲染器
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建球体
// var geometry = new THREE.SphereGeometry(1, 32, 32);
const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 );
var material = new THREE.MeshPhongMaterial({color: 0xffffff});
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// 创建灯光
var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 5);
scene.add(light);

// 渲染场景
function render() {
    requestAnimationFrame(render);
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
}
render();