import * as THREE from './three.module.js';
import { createText } from './jsm/webxr/Text2D.js';

export function crearcarte(camera,group){
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
    var plane = new THREE.PlaneGeometry(0.5, 0.2, 2, 4);
    const mesh = new THREE.Mesh( plane, material );
    mesh.position.z=camera.position.z-1.05
    mesh.position.x=camera.position.x
    group.add(mesh)
}
