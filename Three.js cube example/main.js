// JavaScript Document
var scene = new THREE.Scene();  //Scene()构造函数创建了一个scene场景，它代表了我们尝试显示的整个3D世界

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                         //创建camera，在3D图像中它代表viewer在世界上的位置
                        /*PerspectiveCamera()构造函数有四个参数：1.视野：camera前面的区域应该在屏幕上可见多大，以度为单位
						                                     2.宽高比：通常，这是场景宽度除以场景高度的比率。使用另一个值会扭曲场景（这可能   是你想要的，但通常不是）
															 3.近平面：在我们停止将其渲染到屏幕之前，距离camera对象有多近。考虑一下当你的   指尖越来越接近你眼睛之间的空间时，你最终再也看不到它了
															 4.远平面：在camera不再被渲染之前，距离camera有多远。*/
camera.position.z = 5;  //我们还将camera的位置设置为距离Z轴5个距离单位，与CSS类似，穿过屏幕指向你——viewer

var renderer = new THREE.WebGLRenderer();//使用WebGLRenderer()构造函数创建一个渲染器
renderer.setSize(window.innerWidth, window.innerHeight);//设置渲染器绘制camera视角的大小
document.body.appendChild(renderer.domElement);//将由渲染器创建的<canvas>元素附加到文档的<body>

var cube;//创建一个立方体全局变量，以便我们可以从代码中的任何位置访问我们的立方体
var loader = new THREE.TextureLoader();//创建一个新的TextureLoader对象，然后调用load()
loader.load( 'metal003.png', function (texture) {  //load()需要两个参数（尽管可能需要更多）：我们想要加载的纹理（我们的PNG），以及在加载                                                      纹理时运行的函数
  texture.wrapS = THREE.RepeatWrapping;//使用纹理对象texture的属性来指定我们想要在立方体的所有边上包裹图像的2 x 2重复
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  var geometry = new THREE.BoxGeometry(2.4, 2.4, 2.4);//创建一个新的BoxGeometry对象和一个新的MeshLambertMaterial对象
  var material = new THREE.MeshLambertMaterial( { map: texture, shading: THREE.FlatShading } );
  cube = new THREE.Mesh(geometry, material);//将上面创建的两个对象放在一个Mesh中以创建我们的立方体。一个物体通常需要一个几何体（它是什么形                                               状）和一个材料（它的表面看起来像什么）。
  scene.add(cube);//将立方体添加到scene中
  
  var light = new THREE.AmbientLight('rgb(255, 255, 255)'); //AmbientLight对象是一种柔和的灯光，可以让整个场景变得轻松一些
  scene.add(light);

  var spotLight = new THREE.SpotLight('rgb(255, 255, 255)');//SpotLight对象是一种定向光束，更像手电筒/火炬（实际上是聚光灯）
  spotLight.position.set( 100, 1000, 1000 );
  spotLight.castShadow = true;
  scene.add(spotLight);

  draw();
});

  function draw() {
  	cube.rotation.x += 0.01;//在它的X和Y轴上稍微旋转立方体
  	cube.rotation.y += 0.01;
  	renderer.render(scene, camera);//渲染scene,如camera所看到的

  	requestAnimationFrame(draw);//调用requestAnimationFrame（）来计划绘制下一帧
}