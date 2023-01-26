import * as THREE from './three.module.js';
import { createText } from './jsm/webxr/Text2D.js';
//import { CanvasUI } from './libs2/CanvasUI.js';




  

export function crearcarte(camera,group,name,decripcion,nombrearchivo){
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
    var plane = new THREE.PlaneGeometry(0.5, 0.14, 1, 2);
    const mesh = new THREE.Mesh( plane, material );
    mesh.position.z=camera.position.z-1.05
    mesh.position.x=camera.position.x
    mesh.position.y=0.25
    
    const config = {
        panelSize: { width: 0.5, height:  0.14},
        width: 512, height: 512,
       
        body:{
    
          type: "text",
          position:{ top:0.1,left:1},
          height:512,
          fontSize:35,
          paddingLeft: 30,
          width:512,// default height is 512 so this is 512 - header height:70 - footer height:70
          backgroundColor: "#f7f9fb",
          fontColor: "#000",
    
          main:{
    
            backgroundColor: '#f7f9fb',
            width: 20,
            position:{ top:200,left:200},
            height:20,
            type:"text",
            fontFamily:'italic',
          }
        },
      }
    
      const content = {
        body: '',
        main:'',
      }

    const tagui = new THREE.CanvasUI(content,config);

    
    //nombre
    const nombre = createText( name, 0.05 );
    nombre.position.z=mesh.position.z+0.05
    nombre.position.x=mesh.position.x-0.1
    nombre.position.y=mesh.position.y+0.04

    const descripcion = createText( decripcion, 0.035 );
    descripcion.position.z=mesh.position.z+0.05
    descripcion.position.x=mesh.position.x-0.1
    descripcion.position.y=mesh.position.y

    group.add(tagui)
    group.add(descripcion)
    group.add(nombre);
    group.add(mesh)
}

export function bajar(group){
    group.children.forEach((obj) => {
        if(obj.name!='cerrar'){
            obj.position.y=obj.position.y-0.16
        }
        
    });
}
