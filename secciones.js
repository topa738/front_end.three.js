
  import * as THREE from 'three';
    import { Color } from 'three';
  import {createText} from "./node_modules/three/examples/jsm/webxr/Text2D.js";
  import { CanvasUI } from './node_modules/three/examples/jsm/CanvasUI/CanvasUI.js';
export function crearcarte(camera,group,objects,desde,name,decripcion,nombrearchivo){
    const color= new Color('Black')
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide,transparent:true} );
    var plane = new THREE.PlaneGeometry(0.5, 0.14, 1, 2);
    const mesh = new THREE.Mesh( plane, material );
    const config = {
        panelSize: { width: 0.5, height: 0.14},
        width: 212, height: 112,opacity:1,
        
        body:{

            type: "text",
            position:{ top:0.1,left:0.5},
            height:100,
            fontSize:25,
            
            paddingLeft: 55,
            borderRadius: 20,
            width:200,// default height is 512 so this is 512 - header height:70 - footer height:70
            backgroundColor: "#ffffff",
            fontColor: "#000",
            border: "#000"
  
          }
      }

      const content = {
        body: '',
        main:'',
      }
      const tagui = new CanvasUI(content,config);
      tagui.mesh.href='http://localhost:8080/'+desde+'/descargar/'+nombrearchivo
      tagui.mesh.name='seleccionar'
      tagui.mesh.position.z=camera.position.z-1.05
      tagui.mesh.position.x=camera.position.x
      tagui.mesh.position.y=0.25

     tagui.mesh.href='http://localhost:8080/'+desde+'/descargar/'+nombrearchivo
     tagui.mesh.name='seleccionar'
     tagui.mesh.position.z=camera.position.z-1.05
     tagui.mesh.position.x=camera.position.x
     tagui.mesh.position.y=0.25
    


    
    //nombre
    const nombre = createText( name, 0.05 );
    nombre.position.z= tagui.mesh.position.z+0.05
    nombre.position.x= tagui.mesh.position.x-0.1
    nombre.position.y= tagui.mesh.position.y+0.03
    nombre.material.color=color

    const descripcion = createText('Desc:'+decripcion, 0.035 );
    descripcion.position.z= tagui.mesh.position.z+0.05
    descripcion.position.x= tagui.mesh.position.x-0.1
    descripcion.position.y= tagui.mesh.position.y 
    descripcion.material.color=color
    
    //group.add(tagui.mesh);
    group.add(descripcion);
    group.add(nombre);
    group.add(tagui.mesh);
    objects.push(tagui.mesh);
}

export function bajar(group){
    group.children.forEach((obj) => {
        if(obj.name!='cerrar'){
            obj.position.y=obj.position.y-0.16
        }
        
    });
}
