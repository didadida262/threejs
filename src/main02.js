// 打造酷炫三角形
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
// dracoLoader.setDecoderPath("/three/examples/jsm/loaders/draco/gltf/")
// 动画库
import gsap from 'gsap'
// 用户界面
import * as dat from 'dat.gui'

console.log('THREE>>',THREE)
const gui = new dat.GUI()
const containerWidth = window.innerWidth // 窗口宽度
const containerHeight = window.innerHeight // 窗口高度
const scene = new THREE.Scene()

// 创建几何体
for (let i = 0; i < 50; i++) {
  const geometry = new THREE.BufferGeometry()
  const positionArray = new Float32Array(9)
  for (let j = 0; j < 9; j++) {
    positionArray[j] = Math.random() * 10 - 5
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3))
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(Math.random() ,Math.random(),Math.random()),
    transparent: true,
    opacity: 0.5
  })
  const mesh = new THREE.Mesh(geometry, material)
  console.log('mesh>>', mesh)
  scene.add(mesh)
}


// const material  = new Three.MeshBasicMaterial({})
// material.metalness = 1
// material.roughness = 1
// mesh



const point = new THREE.PointLight(0xffffff, 2)
point.position.set(0, 50, 50)
scene.add(point)
const k = containerWidth / containerHeight // 窗口宽高比
const s = 5 // 三维场景显示范围控制系数，系数越大，显示的范围越大
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
camera.position.set(200, 300, 200) // 设置相机位置
camera.lookAt(scene.position) // 设置相机方向(指向的场景对象)


const axesHelper = new THREE.AxesHelper(500)
axesHelper.setColors('red', 'green', 'orange')
scene.add(axesHelper)

// this.setRender()
const renderer = new THREE.WebGLRenderer()
renderer.setSize(containerWidth, containerHeight)// 设置渲染区域尺寸
renderer.render(scene, camera)
renderer.setClearColor('black')


// const container = document.getElementById('#app')
// console.log('container>>>', container)
document.body.appendChild(renderer.domElement) // body元素中插入canvas对象


const orbit = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
orbit.enableDamping = true

const clock = new THREE.Clock()

// grid
const gridHelper = new THREE.GridHelper(50,50)
// scene.add(gridHelper)

