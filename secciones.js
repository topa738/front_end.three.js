import * as THREE from './three.module.js';
import { createText } from './jsm/webxr/Text2D.js';

export function crearcarte(camera,group){
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
    var plane = new THREE.PlaneGeometry(0.5, 0.2, 2, 4);
    const mesh = new THREE.Mesh( plane, material );
    mesh.position.z=camera.position.z-1.05
    mesh.position.x=camera.position.x
    //nombre
    const nombre = createText( 'Nombre', 0.05 );
    nombre.position.z=mesh.position.z+0.05
    nombre.position.x=mesh.position.x-0.1
    nombre.position.y=mesh.position.y+0.04

    const descripcion = createText( 'Descripcion', 0.035 );
    descripcion.position.z=mesh.position.z+0.05
    descripcion.position.x=mesh.position.x-0.1
    descripcion.position.y=mesh.position.y





    group.add(nombre);
    group.add(mesh)
}
