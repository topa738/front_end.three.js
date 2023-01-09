
export function eliminar(objects,group5) {
    group5.children.forEach(obj => {

        const filteredLibraries = objects.filter((item) => item !== obj)
        objects = filteredLibraries
    })

}
