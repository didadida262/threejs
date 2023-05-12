/*
 * @Author: Hhvcg
 * @Date: 2023-05-12 09:29:37
 * @LastEditors: Hhvcg
 * description: threejs模板文件
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
// 动画库
import gsap from 'gsap'
// 用户界面
import * as dat from 'dat.gui'




// 配置gui
// const gui = new dat.GUI()
// // datGUI
// gui.add(mesh.position, "x")
//   .min(0)
//   .max(10)
//   .step(0.01)
//   .name('移动x')
//   .onChange((val) => {
//     console.log('x修改>>>', val)
//   })
//   .onFinishChange((val) => {
//     // 防抖版本...
//   })
//   const params = {
//     color: '#000000',
//     fn: () => {
//       gsap.to(mesh.position, { x: 5, duration: 2, yoyo: true, repeat: -1})
//     }
//   }
//   gui.add(mesh.position, "y")
//   .min(0)
//   .max(10)
//   .step(0.01)
//   .name('移动y')
//   .onChange((val) => {
//     console.log('y修改>>>', val)
//   })
//   .onFinishChange((val) => {
//     // 防抖版本...
//   })
//   gui.add(mesh.position, "z")
//   .min(0)
//   .max(10)
//   .step(0.01)
//   .name('移动z')
//   .onChange((val) => {
//     console.log('z修改>>>', val)
//   })
//   .onFinishChange((val) => {
//     // 防抖版本...
//   })
// gui.addColor(params, "color").onChange((val) => {
//   console.log('颜色修改>>>', val)
//   mesh.material.color.set(val)
// })
// gui.add(mesh, "visible").name('show')
// // add fn
// gui.add(params, "fn").name("run") 
// // set folder
// const folder = gui.addFolder("设置立方体")
// folder.add(mesh.material, "wireframe")

const containerWidth = window.innerWidth // 窗口宽度
const containerHeight = window.innerHeight // 窗口高度
const scene = new THREE.Scene()


// 相机
const point = new THREE.PointLight(0xffffff, 2)
point.position.set(0, 50, 50)
scene.add(point)
const k = containerWidth / containerHeight // 窗口宽高比
const s = 5 // 三维场景显示范围控制系数，系数越大，显示的范围越大
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
camera.position.set(200, 300, 200) // 设置相机位置
camera.lookAt(scene.position) // 设置相机方向(指向的场景对象)


// 坐标系
const axesHelper = new THREE.AxesHelper(500)
axesHelper.setColors('red', 'green', 'orange')
scene.add(axesHelper)

// 渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(containerWidth, containerHeight)// 设置渲染区域尺寸
renderer.render(scene, camera)
renderer.setClearColor('black')
document.body.appendChild(renderer.domElement) // body元素中插入canvas对象

// 轨道
const orbit = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
orbit.enableDamping = true

// 时钟
const clock = new THREE.Clock()

// 网格平面
const gridHelper = new THREE.GridHelper(50,50)
scene.add(gridHelper)

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
    orbit.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animated)
  }
  animated()
