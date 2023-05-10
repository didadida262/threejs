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

//  

const containerWidth = window.innerWidth // 窗口宽度
const containerHeight = window.innerHeight // 窗口高度
const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(10, 10, 10)
const material = new THREE.MeshStandardMaterial()
// const material  = new Three.MeshBasicMaterial({})
material.metalness = 0.7
material.roughness = 0.2
material.color = new THREE.Color('red')
const mesh = new THREE.Mesh(geometry, material)
gui.add(mesh.position, "x")
  .min(0)
  .max(10)
  .step(0.01)
  .name('移动x')
  .onChange((val) => {
    console.log('x修改>>>', val)
  })
  .onFinishChange((val) => {
    // 防抖版本...
  })
scene.add(mesh)
// this.moveGeo()


// this.setPoint()
const point = new THREE.PointLight(0xffffff, 2)
point.position.set(2, 200, 300)
scene.add(point)
// 测试点
// const point2 = new THREE.PointLight(0xffffff, 2)
// point2.position.set(100, 0, 0)
// this.scene.add(point2)



// // // 环境光
// let ambient = new Three.AmbientLight(0x444444);
// this.scene.add(ambient);


// this.setCamera()
const k = containerWidth / containerHeight // 窗口宽高比
const s = 200 // 三维场景显示范围控制系数，系数越大，显示的范围越大
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


// const container = document.getElementById('#app')
// console.log('container>>>', container)
document.body.appendChild(renderer.domElement) // body元素中插入canvas对象


const orbit = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
orbit.enableDamping = true

const clock = new THREE.Clock()

// grid
const gridHelper = new THREE.GridHelper(50,50)
scene.add(gridHelper)

// 导入模型
const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
// three/examples/js/libs/draco/gltf
dracoLoader.setDecoderPath("./draco/")
console.log('dracoLoader>>',dracoLoader)
loader.setDRACOLoader(dracoLoader)
loader.load('./air.glb', (gltf) => {
  console.log('success!!!')
  const air = gltf.scene
  scene.add(air)
})


// 设置动画
// gsap.to(mesh.position, { duration: 2.5, ease: "power1.inOut", y: -200})
// gsap.to(mesh.position, { duration: 2.5, y: 200})
// gsap.to(mesh.position, {
//    duration: 2.5, 
//    ease: "power1.inOut", 
//    y: -200,
//    onComplete: () => {
//     console.log('Completed!!!')
//    },
//    onStart: () => {
//     console.log('start!!!')
//    }
//   })

// gsap.to(mesh.rotation, {
//    duration: 1, 
//    ease: "power1.inOut", 
//    x: 2 * Math.PI,
//    repeat: -1,
//   //  往返运动
//    yoyo: true,
//    delay: 2
//   })
  const ani1 = gsap.to(mesh.position, {
   duration: 1, 
   ease: "power1.inOut",
   x: 400,
   repeat: -1,
   yoyo: true,
  //  delay: 2
  })
  window.addEventListener("dblclick", () => {
    if (ani1.isActive()) {
      ani1.pause()
    } else {
      ani1.resume()
    }
  })
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
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
    orbit.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animated)
  }
  animated()
// this.setAxes()
