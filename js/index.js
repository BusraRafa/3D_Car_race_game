var container, scene, camera, renderer, controls;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock;

var movingCar;
var collideMeshList = [];
var cubes = [];
var message = document.getElementById("message");
var crash = false;
var score = 0;
var scoreText = document.getElementById("score");
var id = 0;
var crashId = " ";
var lastCrashId = " ";

init();
animate();

function init() {
    // Scene
    scene = new THREE.Scene();
    // Camera
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, screenWidth / screenHeight, 1, 20000);
    camera.position.set(0, 170, 400);

    // Renderer
    if (Detector.webgl) {
        renderer = new THREE.WebGLRenderer({ antialias: true });
    } else {
        renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize(screenWidth * 0.85, screenHeight * 0.85);
    container = document.getElementById("ThreeJS");
    container.appendChild(renderer.domElement);

    THREEx.WindowResize(renderer, camera);
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    //to join two lines
    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-250, -1, -3000));
    geometry.vertices.push(new THREE.Vector3(-300, -1, 200));
    material = new THREE.LineBasicMaterial({
        color: 0x6699FF, linewidth: 5, fog: true
    });
    var line1 = new THREE.Line(geometry, material);
    scene.add(line1);
    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(250, -1, -3000));
    geometry.vertices.push(new THREE.Vector3(300, -1, 200));
    var line2 = new THREE.Line(geometry, material);
    scene.add(line2);


    
     // Create car
     var carWidth = 60;
     var carHeight = 40;
     var carDepth = 50;
     var carGeometry = new THREE.BoxGeometry(carWidth, carHeight, carDepth);
     var carMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFF00 });

     movingCar = new THREE.Mesh(carGeometry, carMaterial);
     movingCar.position.set(0, carHeight / 1.5, 0);
     scene.add(movingCar);


     // wheels 
     var wheelRadius = 8;
     var wheelThickness = 9;
     var wheelGeometry = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelThickness, 50);
     var wheelMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
     var backWheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
     var backWheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
     backWheel1.rotation.z = Math.PI / 2;
     backWheel2.rotation.z = Math.PI / 2;
     backWheel1.position.set(-carWidth / 2, -carHeight / 2, -carDepth / 2);
     backWheel2.position.set(carWidth / 2, -carHeight / 2, -carDepth / 2);
     movingCar.add(backWheel1);
     movingCar.add(backWheel2);

     // two wheels front
     var frontWheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
     var frontWheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
     frontWheel1.rotation.z = Math.PI / 2;
     frontWheel2.rotation.z = Math.PI / 2;
     frontWheel1.position.set(-carWidth / 2, -carHeight / 2, carDepth / 2);
     frontWheel2.position.set(carWidth / 2, -carHeight / 2, carDepth / 2);
     movingCar.add(frontWheel1);
     movingCar.add(frontWheel2);

     // lighting scene
     var ambientLight = new THREE.AmbientLight(0x999999);
     scene.add(ambientLight);
     var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
     directionalLight.position.set(1, 1, 1);
     scene.add(directionalLight);

}

function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);

    if (gameOverMessage.style.display === "none") {
        requestAnimationFrame(animate);
        update();
        renderer.render(scene, camera);
    }
}

function endGame() {
    cancelAnimationFrame(animate);
    for (var i = 0; i < cubes.length; i++) {
        scene.remove(cubes[i]);
    }
    cubes = [];
    collideMeshList = [];
    var gameOverMessage = document.getElementById("gameOverMessage");
    gameOverMessage.style.display = "block";
}




function update() {
    var delta = clock.getDelta();
    var moveDistance = 200 * delta;
    var rotateAngle = Math.PI / 2 * delta;
    if (score <= -500 || score >= 1000) {
        scoreText.innerText = "Score:" + Math.floor(score) + "\n" + "Game Over!!!";
        endGame();
        return; 
    }


    if (keyboard.pressed("left") || keyboard.pressed("A")) {
        if (movingCar.position.x > -270)
            movingCar.position.x -= moveDistance;
        if (camera.position.x > -150) {
            camera.position.x -= moveDistance * 0.6;
            if (camera.rotation.z > -5 * Math.PI / 180) {
                camera.rotation.z -= 0.2 * Math.PI / 180;
            }
        }
    }
    if (keyboard.pressed("right") || keyboard.pressed("D")) {
        if (movingCar.position.x < 270)
            movingCar.position.x += moveDistance;
        if (camera.position.x < 150) {
            camera.position.x += moveDistance * 0.6;
            if (camera.rotation.z < 5 * Math.PI / 180) {
                camera.rotation.z += 0.2 * Math.PI / 180;
            }
        }
    }
    if (keyboard.pressed("up") || keyboard.pressed("W")) {
        movingCar.position.z -= moveDistance;
    }
    if (keyboard.pressed("down") || keyboard.pressed("S")) {
        movingCar.position.z += moveDistance;
    }

    if (!(keyboard.pressed("left") || keyboard.pressed("right") ||
        keyboard.pressed("A") || keyboard.pressed("D"))) {
        delta = camera.rotation.z;
        camera.rotation.z -= delta / 10;
    }


    var originPoint = movingCar.position.clone();

    for (var vertexIndex = 0; vertexIndex < movingCar.geometry.vertices.length; vertexIndex++) {
        // Vertex original coordinates
        var localVertex = movingCar.geometry.vertices[vertexIndex].clone();
        // The transformed coordinates of the vertices
        var globalVertex = localVertex.applyMatrix4(movingCar.matrix);
        var directionVector = globalVertex.sub(movingCar.position);

        var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
        var collisionResults = ray.intersectObjects(collideMeshList);
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
            crash = true;
            crashId = collisionResults[0].object.name;
            break;
        }
        crash = false;
    }

    if (crash) {
        movingCar.material.color.setHex(0xFFFF00);
        console.log("Crash");
        if (crashId !== lastCrashId) {
            score -= 100;
            lastCrashId = crashId;
        }

        document.getElementById('explode_sound').play()
    } else {
        movingCar.material.color.setHex(0xFFFF00);
    }

    if (Math.random() < 0.03 && cubes.length < 30) {
        makeRandomCube();
    }

    for (i = 0; i < cubes.length; i++) {
        if (cubes[i].position.z > camera.position.z) {
            scene.remove(cubes[i]);
            cubes.splice(i, 1);
            collideMeshList.splice(i, 1);
        } else {
            cubes[i].position.z += 10;
        }
    }
    score += 0.1;
    scoreText.innerText = "Score:" + Math.floor(score);
    
}


//Returns a random number between min and max
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// Returns an integer random number between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function makeRandomCube() {
    var a = 1 * 50,
        b = getRandomInt(1, 3) * 50,
        c = 1 * 50;
    var geometry = new THREE.CubeGeometry(a, b, c);
    var material = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff,
        size: 3
    });


    var object = new THREE.Mesh(geometry, material);
    var box = new THREE.BoxHelper(object);
    box.material.color.setHex(0xff0000);

    box.position.x = getRandomArbitrary(-250, 250);
    box.position.y = 1 + b / 2;
    box.position.z = getRandomArbitrary(-800, -1200);
    cubes.push(box);
    box.name = "box_" + id;
    id++;
    collideMeshList.push(box);

    scene.add(box);
}