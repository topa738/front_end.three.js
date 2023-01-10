

import { DragControls } from './jsm/controls/DragControls.js';
import * as THREE from './three.module.js';
import { FBXLoader } from './jsm/loaders/FBXLoader.js';
import { createText } from './jsm/webxr/Text2D.js';
import {crearcarte} from "./secciones.js";
import {eliminar} from "./eliminar.js";

let container;
var camera, scene, renderer;
let controls, group,group1,group2,group3,group4,group5;
let enableSelection = false;
let mixer;
var mostro=true;

let mousemove,actionScroll,aumento;
let tractor,avaco,hammer;
var video, videoImage, videoImageContext, videoTexture,movieScreen;
var video1, videoImage1, videoImageContext1, videoTexture1,movieScreen1;
let selecion=false;
var seleccion=undefined;

const objects = [];

const mouse = new THREE.Vector2(), raycaster = new THREE.Raycaster();

init();
init2()

//animate();




function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.5, 50);


    scene = new THREE.Scene();
    group = new THREE.Group();
    scene.add(group);
    group1 = new THREE.Group();
    scene.add(group1);
    group2 = new THREE.Group();
    scene.add(group2);
    group3 = new THREE.Group();
    scene.add(group3);
    group4 = new THREE.Group();
    scene.add(group4);
    
    group5 = new THREE.Group();
    scene.add(group5);


    scene.add(new THREE.AmbientLight(0xFF0000));
    //video de backgrpund
    video1 = document.createElement('video',);
    video1.id = "myVideo"

    video1.src = '/img/front_end/Universe.mp4';

    video1.load();



    videoImage1 = document.createElement('canvas');
    videoImage1.width = 1280;
    videoImage1.height = 720;

    videoImageContext1 = videoImage1.getContext('2d');
    // background color if no video present
    videoImageContext1.fillStyle = '#000000';
    videoImageContext1.fillRect(0, 0, videoImage1.width, videoImage1.height);

    videoTexture1 = new THREE.Texture(videoImage1);
    videoTexture1.minFilter = THREE.LinearFilter;
    videoTexture1.magFilter = THREE.LinearFilter;

    var movieMaterial = new THREE.MeshBasicMaterial({map: videoTexture1, overdraw: true, side: THREE.DoubleSide});
    // the geometry on which the movie will be displayed;
    // 		movie image will be scaled to fit these dimensions.
    var movieGeometry = new THREE.PlaneGeometry(7, 4, 2, 4);
    movieScreen1 = new THREE.Mesh(movieGeometry, movieMaterial);
    movieScreen1.position.z = -2
    movieScreen1.position.x = -1.2
    movieScreen1.nombre = 'video'
    scene.add(movieScreen1)


    const sphere = new THREE.SphereGeometry(0.05, 20, 50);
    const light2 = new THREE.PointLight(2, 50);
    light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0x0040ff0})));
    console.log(light2)
    light2.position.z = -1.05
    light2.position.x = -1.2
    light2.name = 'padre'
    objects.push(light2)
    group.add(light2)//movimiento
    //text
    const text = createText( 'Sistemas', 0.1 );
    objects.push(text)
    group.add(text)
    text.position.x=light2.position.x-0.15
    text.position.y=light2.position.y-0.15
    text.position.z=light2.position.z+0.1
    objects.push(text)
    group4.add(text)

    //video de seguridad
    video = document.createElement('video',);
    video.id = "myVideo"

    video.src = '/img/front_end/cat_type.mp4';

    video.load();
    video.crossOriginIsolated = 'anonymous';
    video.playsInline = true;
    video.loop = true
    video.style = 'display:none';


    videoImage = document.createElement('canvas');
    videoImage.width = 480;
    videoImage.height = 480;

    videoImageContext = videoImage.getContext('2d');
    // background color if no video present
    videoImageContext.fillStyle = '#000000';
    videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

    videoTexture = new THREE.Texture(videoImage);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    var movieMaterial3 = new THREE.MeshBasicMaterial({map: videoTexture, overdraw: true, side: THREE.DoubleSide});
    // the geometry on which the movie will be displayed;
    // 		movie image will be scaled to fit these dimensions.
    var movieGeometry3 = new THREE.PlaneGeometry(0.4, 0.4, 2, 4);
    movieScreen = new THREE.Mesh(movieGeometry3, movieMaterial3);
    movieScreen.position.z = -1.05
    movieScreen.position.x = -1.2
    movieScreen.position.y = 0.35
    movieScreen.nombre = 'video'
    group.add(movieScreen)
    movieScreen.padre = light2
    objects.push(movieScreen)//interacciones


    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);

    //mouse
    window.addEventListener("wheel", onMouseWheel)
    window.addEventListener("mousemove", onMouseMove)
    let y = 0;
    let position = 0;

    function onMouseWheel(event) {
        if(actionScroll!=true){
            console.log(event.deltaY)

            if(event.deltaY>0){
                aumento= Math.PI/2
                actionScroll=true
            }else{
                aumento= Math.PI/2
                aumento=aumento*-1
                actionScroll=true
            }
        }


    }

    function onMouseMove(event) {
        mousemove = event

    }

    window.addEventListener('resize', onWindowResize);

    document.addEventListener('click', onClick);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    camera.position.x =-1.3
    const startButton = document.getElementById( 'startButton' );
    startButton.addEventListener( 'click', function () {

        video1.play()
        const overlay = document.getElementById( 'overlay' );
        overlay.remove();
        video.play()
        animate()
    } );




}
async function init2(){
    await agronomia();
    await basicas();
    await abogacia();
    var contenedor = document.getElementById('contenedor_carga');
    console.log(contenedor)
    contenedor.style.visibility='hidden';
    contenedor.style.opacity=0;

}
function abogacia(){
    return new Promise((resolve,reject)=>{
        const sphere = new THREE.SphereGeometry( 0.05, 20, 50 );
        const light5 = new THREE.PointLight( 0x80ff80, 10, 50 );
        light5.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xFFFF00 } ) ) );
        light5.position.z=-1.05
        light5.position.x=1.2
        light5.name='padre'
        group3.add(light5)
        const text = createText( 'Abogacia', 0.1 );
        text.position.x=light5.position.x+0.2
        text.position.y=light5.position.y+0.15
        text.position.z=light5.position.z-0.1
        objects.push(text)
        group3.add(text)

        const loader2 = new FBXLoader();
        loader2.load( './img/front_end/hammer/hammer.fbx', function ( object ) {

            object.traverse( function ( child ) {

                if ( child.isMesh )         {

                    child.castShadow = true;
                    child.receiveShadow = true;

                }} );

            hammer=object
            hammer.position.z=-1
            hammer.scale.set(1,1,1)
            hammer.position.x=1.5
            group3.add( hammer );
            hammer.padre=light5
            objects.push(hammer)
            objects.push(light5)
            resolve();
        });

    } );

}
function agronomia(){
    return new Promise((resolve,reject)=> {
        const sphere = new THREE.SphereGeometry( 0.05, 20, 50 );

        //agronomia
        // model
        const light3 = new THREE.PointLight( 0x80ff80, 2, 50 );
        light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
        light3.position.z=-1.05
        light3.position.y=-1.2
        light3.name='padre'
        group1.add( light3 );
        //text
        const text = createText( 'Agronomia', 0.1 );
        text.position.x=light3.position.x+0.2
        text.position.y=light3.position.y+0.15
        text.position.z=light3.position.z-0.1
        text.rotation.z=Math.PI
        objects.push(text)
        group1.add(text)


        const loader = new FBXLoader();
        loader.load( './img/front_end/tractor/tractor.fbx', function ( object ) {

            object.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );
            tractor=object
            tractor.scale.set(0.004,0.004,0.004)
            tractor.position.z=-1.4
            tractor.position.y=-2

            tractor.rotation.x=-Math.PI/2
            tractor.rotation.z=-Math.PI
            group1.add( tractor );
            tractor.padre=light3
            objects.push(tractor)
            objects.push(light3)


        });
        resolve();
    });


}
function basicas(){
    return new Promise((resolve,reject)=> {
        const sphere = new THREE.SphereGeometry( 0.05, 20, 50 );
        //light 3
        const light4 = new THREE.PointLight( 0x80ff80, 10, 50 );
        light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xFF0000 } ) ) );
        light4.position.z=-1.05
        light4.position.y=1.2
        light4.name='padre'
        group2.add(light4)
        const text = createText( 'Basicas', 0.1 );
        text.position.x=light4.position.x-0.15
        text.position.y=light4.position.y-0.15
        text.position.z=light4.position.z+0.1
        text.rotation.z=Math.PI
        objects.push(text)
        group4.add(text)
        const loader1 = new FBXLoader();
        loader1.load( './img/front_end/Abaco/avaco.fbx', function ( object ) {

            object.traverse( function ( child ) {

                if ( child.isMesh ) {

                    child.castShadow = true;
                    child.receiveShadow = true;

                }} );

            avaco=object
            avaco.position.z=-1.05
            avaco.position.y=1.3
            avaco.position.x=0.1
            avaco.scale.set(0.008,0.008,0.008)
            group2.add( avaco );
            avaco.padre=light4
            objects.push(avaco)
            objects.push(light4)

        } );
        resolve();
    });
}
function animate() {

    renderer.setAnimationLoop( render );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

function onKeyDown( event ) {

    enableSelection = ( event.keyCode === 16 ) ? true : false;

}

function onKeyUp() {

    enableSelection = false;

}

function onClick( event ) {


    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


    raycaster.setFromCamera( mouse, camera );

    const intersections = raycaster.intersectObjects( objects, true );

    if ( intersections.length > 0 ) {

        const object = intersections[ 0 ].object;
        seleccion=object;

    }


}
function getIntersections() {
    mouse.x = ( mousemove.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( mousemove.clientY / window.innerHeight ) * 2 + 1;
    camera.position.x=-1.2+(mouse.x/8)
    camera.position.y=mouse.y/8


    raycaster.setFromCamera( mouse, camera );

    const intersections = raycaster.intersectObjects( objects, true );


    if ( intersections.length > 0 ) {
        selecion=true

        const object = intersections[ 0 ].object;
        if(object.name==='padre'){
            console.log(object)
        }
        else{
            console.log(object.padre)
        }
        if(object.name==='cerrar'){
            console.log('cerrar')
        }

    }else {
        selecion=false
    }

    return undefined

}

function render() {
    renderer.render( scene, camera );

    flotar()

    if(mousemove!=undefined){
        getIntersections();
    }
    if(seleccion!=undefined){
        if(seleccion.name=='cerrar'){
            eliminar(objects,group5)
            group5.clear()
            seleccion=undefined;
            setTimeout(function(){
                mostro=true;
            }, 1000);

        }
        if(camera.position.z>-1) {
            camera.position.z=camera.position.z-0.02
            movieScreen1.position.z=movieScreen1.position.z-0.02;
        }else{
            if(mostro){
                mostrar()
                console.log("Pasa por aca//////////////////////////")
            }
        }

    }else{
        zoom();
    }

    if ( video.readyState === video.HAVE_ENOUGH_DATA )
    {
        videoImageContext.drawImage( video, 0, 0 );
        if ( videoTexture )
            videoTexture.needsUpdate = true;
    }
    if ( video1.readyState === video1.HAVE_ENOUGH_DATA )
    {
        videoImageContext1.drawImage( video1, 0, 0 );
        if ( videoTexture1 )
            videoTexture1.needsUpdate = true;
    }

    if(actionScroll){//accion de scroll
        if(aumento>0){
            scrollauto(0.01)
            aumento=aumento-0.01
            if(aumento<0){desactivar();}
        }
        if(aumento<0){
            scrollauto(-0.01)
            aumento=aumento+0.01
            if(aumento>0){desactivar();}

        }
    }
}
function mostrar(){

    //const cerrar= new CanvasUI(content,config);
    const texture  = new THREE.TextureLoader().load('/img/front_end/img/exis.png');
    const material = new THREE.MeshStandardMaterial( {map: texture,color: 0xffffff, side: THREE.DoubleSide} );
    const plane = new THREE.PlaneGeometry(0.07, 0.05, 2, 4);
   const mesh = new THREE.Mesh( plane, material );
    mesh.position.z=camera.position.z-1.05
    mesh.position.x=camera.position.x-0.5
    mesh.position.y=0.5
    objects.push(mesh)
    group5.add(mesh);
    mesh.name='cerrar'
    mostro=false


    crearcarte(camera,group5);
}

function desactivar(){
    actionScroll=false;
    aumento=0;
    //video1.pause()

}


function zoom(){
    if(selecion){//inicio -1/3
        if(camera.position.z>-0.15){
            camera.position.z=camera.position.z-0.007
            movieScreen1.position.z=movieScreen1.position.z-0.007;
        }
    }else{
        if(camera.position.z<0){
            camera.position.z=camera.position.z+0.007
            movieScreen1.position.z=movieScreen1.position.z+0.007;
        }
    }

}
function flotar(){
    const r = Date.now() * 0.0005;
    group.position.y = 0.04* Math.cos( r );
    group1.position.y = 0.04* Math.cos( r );
    group2.position.y = 0.04* Math.cos( r );
    group3.position.y = 0.04* Math.cos( r );group4.position.y = 0.04* Math.cos( r );
}

function scrollauto(aumento){
    group.rotation.z=group.rotation.z+aumento;
    group.children.forEach((numero) => {
        numero.rotation.z=numero.rotation.z+aumento
    });
    group1.rotation.z=group1.rotation.z+aumento;
    group1.children.forEach((numero) => {
        numero.rotation.z=numero.rotation.z+aumento
    });
    group2.rotation.z=group2.rotation.z+aumento
    group2.children.forEach((numero) => {
        numero.rotation.z=numero.rotation.z+aumento
    });
    group3.rotation.z=group3.rotation.z+aumento
    group3.children.forEach((numero) => {
        numero.rotation.z=numero.rotation.z+aumento
    });
    group4.rotation.z=group4.rotation.z+aumento
    group4.children.forEach((numero) => {
        numero.rotation.z=numero.rotation.z+aumento
    });
    console.log(aumento)
}
