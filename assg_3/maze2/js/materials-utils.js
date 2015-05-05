// materials
var materials;

// all materials in a multimaterials
var multimaterials;

function initMaterials() {

    var filenames_c = [
        "brick-c.jpg",
        "floor1.png",
        "fieldstone-c.jpg",
        "layingrock-c.jpg"
    ];

    var filenames_n = [
        "brick-n.jpg",
        null,
        "fieldstone-n.jpg",
        "layingrock-n.jpg"
    ];

    materials = [];
    var mat_def, filename_c, filename_n, tex_c, tex_n, spec_mat;
    for (var x = 0; x < filenames_c.length; x++) {
        filename_c = filenames_c[x];
        if (filename_c == null) continue;

        tex_c = THREE.ImageUtils.loadTexture("textures/" + filename_c);
        mat_def = {
            map: tex_c,
            side: THREE.DoubleSide
        };

        if (filenames_n[x] != null) {
            filename_n = filenames_n[x];
            console.log("Found normal map " + filename_n);
            tex_n = THREE.ImageUtils.loadTexture("textures/" + filename_n);
            mat_def.normalMap = tex_n;
        }

        spec_mat = new THREE.MeshPhongMaterial(mat_def);
        materials[x + 1] = spec_mat;
    }

    multimaterials = new THREE.MeshFaceMaterial(materials);
}

function materialFromTexture(filename) {
    console.log("Loading texture " + filename);
    var tex = THREE.ImageUtils.loadTexture(filename);
    return new THREE.MeshPhongMaterial({
        map: tex,
        side: THREE.DoubleSide
    });
}