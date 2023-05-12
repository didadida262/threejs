/*
 * @Author: Hhvcg
 * @Date: 2023-05-11 17:50:16
 * @LastEditors: Hhvcg
 * description: 测试灯光
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
// 动画库
import gsap from 'gsap'
// 用户界面
import * as dat from 'dat.gui'



const containerWidth = window.innerWidth // 窗口宽度
const containerHeight = window.innerHeight // 窗口高度
const scene = new THREE.Scene()


// 灯光配置
const pointLight = new THREE.PointLight(0xffffff,1, 100)
pointLight.position.set(0, 5, 0)
scene.add(pointLight)
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize, 'white' );
scene.add( pointLightHelper );

// 相机
// const k = containerWidth / containerHeight // 窗口宽高比
// const s = 5 // 三维场景显示范围控制系数，系数越大，显示的范围越大
// const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
// camera.position.set(200, 300, 200) // 设置相机位置
// camera.lookAt(scene.position) // 设置相机方向(指向的场景对象)
const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
camera.position.z = 5;

// 坐标系
const axesHelper = new THREE.AxesHelper(500)
axesHelper.setColors('red', 'green', 'orange')
scene.add(axesHelper)

// 渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(containerWidth, containerHeight)// 设置渲染区域尺寸
renderer.render(scene, camera)
renderer.setClearColor('gray')

document.body.appendChild(renderer.domElement) // body元素中插入canvas对象


const orbit = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
orbit.enableDamping = true

const clock = new THREE.Clock()

// 网格平面
const gridHelper = new THREE.GridHelper(50,50)
// scene.add(gridHelper)


// 纹理
const texttureLoader = new THREE.TextureLoader()
// const pi = texttureLoader.load('./OutdoorHDRI078_1K-HDR.exr')
const pi = texttureLoader.load('./door.jpg')

// 物体
// const geometry = new THREE.SphereGeometry(1, 32, 32); 
const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 );

// geometry.computeVertexNormals()
const mesh = new THREE.MeshPhongMaterial({
  // map: pi
  color: 0xffffff,
})
// var material = new THREE.MeshPhongMaterial({color: 0xffffff});

// const mesh = new THREE.MeshStandardMaterial()
// const material  = new Three.MeshBasicMaterial({})
// mesh.metalness = 0.7
// mesh.roughness = 0.2
const cube = new THREE.Mesh(geometry, mesh)
scene.add(cube)
console.log('cube>>>',cube)


// scene.add(point)
// // 环境光 ---无效
// const ambient = new THREE.AmbientLight(0xffffff)
// scene.add(ambient)

// 配置gui
const gui = new dat.GUI()
// datGUI
gui.add(cube.position, "x")
  .min(0)
  .max(10)
  .step(0.01)
  .name('移动x')
  .onChange((val) => {
  })
  .onFinishChange((val) => {
  })
gui.add(cube.position, "y")
  .min(0)
  .max(10)
  .step(0.01)
  .name('移动y')
  .onChange((val) => {
  })
  .onFinishChange((val) => {
    // 防抖版本...
  })
gui.add(cube.position, "z")
  .min(0)
  .max(10)
  .step(0.01)
  .name('移动z')
  .onChange((val) => {
  })
  .onFinishChange((val) => {
    // 防抖版本...
  })
const params = {
  color: '#000000',
  fn: () => {
    gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1})
  }
}


gui.add(cube, "visible").name('show')
// add fn
gui.add(params, "fn").name("run") 
// set folder
const folder = gui.addFolder("设置立方体")
folder.add(cube.material, "wireframe")
folder.addColor(params, "color")
  .onChange((val) => {
    cube.material.color.set(val)
  })



function animated() {
  // const time = clock.getElapsedTime()
  const delta = clock.getDelta()
  // console.log('总时间>>', time) 
  // console.log('间隔实践>>', delta)
    // mesh.position.x += 1
    // // mesh.rotation.set(Math.PI / 4, 0,0)
    // mesh.rotateX(30)
    // // mesh.scale.x = mesh.scale.x - 0.01
    // if (mesh.position.x >= 300) {
    //     mesh.position.x = 0
    //     mesh.position.y = 0
    //     // mesh.scale.x = 1
    // }
    // mesh.rotation.z += 0.01
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    orbit.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animated)
  }
  animated()
