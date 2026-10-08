import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;

            // Dress the 3D character in black clothing and natural skin tone on face
            const shirtMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#111114"), // Deep matte black streetwear tee
              roughness: 0.75,
              metalness: 0.05,
              side: THREE.DoubleSide,
            });
            const pantMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#09090b"), // Jet black cargo pants
              roughness: 0.85,
              metalness: 0.02,
              side: THREE.DoubleSide,
            });
            const shoeMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#141417"), // Sleek black sneakers
              roughness: 0.45,
              metalness: 0.1,
              side: THREE.DoubleSide,
            });
            const soleMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#060608"), // Black rubber sneaker sole
              roughness: 0.7,
              metalness: 0.05,
              side: THREE.DoubleSide,
            });
            const skinMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#dfaa8e"), // Warm natural skin tone for face and skin
              roughness: 0.58,
              metalness: 0.0,
              side: THREE.DoubleSide,
            });
            const hairMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#141212"), // Natural dark hair
              roughness: 0.6,
              metalness: 0.05,
              side: THREE.DoubleSide,
            });

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                const name = (child.name || "").toLowerCase().replace(/[\._\-]/g, "");
                const rawName = (child.userData?.name || "").toLowerCase().replace(/[\._\-]/g, "");
                const isMatch = (keyword: string) =>
                  name.includes(keyword) || rawName.includes(keyword);

                // Black T-Shirt
                if (
                  child.name === "BODY.SHIRT" ||
                  child.name === "BODYSHIRT" ||
                  child.userData?.name === "BODY.SHIRT" ||
                  isMatch("bodyshirt") ||
                  isMatch("shirt")
                ) {
                  mesh.material = shirtMaterial;
                }
                // Black Pants
                else if (isMatch("pant")) {
                  mesh.material = pantMaterial;
                }
                // Black Shoes
                else if (isMatch("shoe")) {
                  mesh.material = shoeMaterial;
                }
                // Black Soles
                else if (isMatch("sole")) {
                  mesh.material = soleMaterial;
                }
                // Natural skin tone on Face, Neck, Ears, Hands
                else if (
                  child.name === "Plane.007" ||
                  child.name === "Plane007" ||
                  child.userData?.name === "Plane.007" ||
                  isMatch("plane007") ||
                  isMatch("face") ||
                  isMatch("neck") ||
                  isMatch("ear") ||
                  isMatch("hand")
                ) {
                  mesh.material = skinMaterial;
                }
                // Dark hair and eyebrows
                else if (isMatch("hair") || isMatch("eyebrow")) {
                  mesh.material = hairMaterial;
                }
              }
            });

            await renderer.compileAsync(character, camera, scene);
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
