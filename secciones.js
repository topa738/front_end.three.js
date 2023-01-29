
  import * as THREE from 'three';
  import {createText} from "./node_modules/three/examples/jsm/webxr/Text2D.js";


export function crearcarte(camera,group,objects,desde,name,decripcion,nombrearchivo){
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
    var plane = new THREE.PlaneGeometry(0.5, 0.14, 1, 2);
    const mesh = new THREE.Mesh( plane, material );

    mesh.href='http://localhost:8080/'+desde+'/descargar/'+nombrearchivo
    mesh.name='seleccionar'
    mesh.position.z=camera.position.z-1.05
    mesh.position.x=camera.position.x
    mesh.position.y=0.25
    


    
    //nombre
    const nombre = createText( name, 0.05 );
    nombre.position.z=mesh.position.z+0.05
    nombre.position.x=mesh.position.x-0.1
    nombre.position.y=mesh.position.y+0.04

    const descripcion = createText( decripcion, 0.035 );
    descripcion.position.z=mesh.position.z+0.05
    descripcion.position.x=mesh.position.x-0.1
    descripcion.position.y=mesh.position.y 
    

    group.add(descripcion);
    group.add(nombre);
    group.add(mesh);
    objects.push(mesh);
}

export function bajar(group){
    group.children.forEach((obj) => {
        if(obj.name!='cerrar'){
            obj.position.y=obj.position.y-0.16
        }
        
    });
}
