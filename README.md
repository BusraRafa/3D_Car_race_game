# GridAuto Drive(threejs)
**I. INTRODUCTION**
 
Grid Auto Drive is an action-packed arcade-style game
 that combines precision driving and tactical decision-making.
 In this futuristic world, the player takes on the role of
 a skilled pilot controlling an advanced autonomous vehicle
 designed to navigate through complex grids. The mission
 is to overcome obstacles, reach the finish line, and achieve
 the highest score possible.Each level is an intricate maze of
 interconnected grids with various layouts and difficulty levels.
 Some grids are straightforward, while others present mind
boggling twists and turns.Testing the players speed and agility
 in Time Attack mode, where he must complete the grids within
 the shortest time possible. Alternatively, challenge yourself in
 Endless Mode, where the grids become progressively more
 challenging, and the goal is to survive for as long as the player
 can.The player immerges in the futuristic world of Grid Auto
 Drive with eye-catching graphics and a pulsating soundtrack
 that intensifies as you race through the grids.
 

The game offers an exhilarating and challenging gaming
 experience that will keep the player hooked for hours. With
 its intricate grid mazes, diverse obstacles, and engaging power
ups, the game ensures every moment is filled with excitement
 and suspense. As the player strive to achieve the highest scores
 and climb the global leaderboards, he’ll discover the thrill of
 mastering precision driving and tactical decision-making. The
 stunning visuals and pulsating soundtrack add to the immersive
 atmosphere, pulling players deeper into the futuristic world of
 Grid Auto Drive. So, buckle up and prepare to embark on an
 unforgettable journey where the skills and determination will
 determine players place among the grid-driving elite


**II. PROPOSED METHODOLOGY**


Our project named “GridAuto Drive” is a car speed con
troller game. With starting the game, the player will be able
 to control the speed of the car and on the right side, other
 obstacles will be moving at their own speed. The goal of the
 player will be to control the speed of the car and to avoid
 as many obstacles as possible. So, avoiding collision will be
 difficult. To prevent collision and control the speed of the car
 player will need to accelerate or decelerate the speed of the
 car by using the up and down arrow buttons. When the player
 hits an obstacle it will deduct the score and when the player
 does not collide the it will be added to the score. We will try
 to implement the game using Three.js along with HTML and
 CSS. After setting up the scene, the lights and the camera we
 will try to build a three-dimensional car by putting together
 four or more boxes. There will be two types of objects. One
 will be the car and the other will be the obstacles. The obstacle
 will appear randomly and the car have to avoid all the obstacle.
 We will try to render the objects by implementing WebGL
 rendering. Some more detailed information:
 **Scene Setup:** Setting up a 3D scene using Three.js to render
 the game environment. Creating a camera that follows the car’s
 movements and provides a dynamic view of the race track. Set
 up lighting to illuminate the scene realistically.
 **Car and Controls:** Designing and modelling a 3D car
 object using Three.js geometries and materials. Implementing
 keyboard controls to allow the player to move the car up,
 down, left, and right. Implementing a mechanism to increase
 the car’s speed gradually as the player maneuvers successfully.
 **Obstacles Generation:** Generating a variety of obstacles
 (e.g., barriers, other vehicles) using Three.js geometries and
 materials. Placing obstacles on the race track at random
 intervals and positions to create challenge and excitement.
 Collision Detection: Implementing collision detection logic
 to detect collisions between the car and obstacles. Upon
 collision, decrease the player’s score, slow down the car, and
 trigger visual/audio effects.
 **Scoring Mechanism:** Initializing the player’s score to 0 at
 the start of the game. Increment the score as the car success
fully navigates through the obstacles. Display the current score
 prominently on the screen using HTML elements.
**Game Over Conditions:** Monitoring the score continuously
 during gameplay. If the score reaches-1000 or 1000, end the
 game. Displaying a ”Game Over” message at the center of the
 screen when the game ends.
 **Optimizations and Enhancements:** Implementing collision
 avoidance AI for computer-controlled opponents if desired.
 Add acceleration and deceleration mechanics to enhance the
 car’s movement realism. Implement visual effects like particle
 systems for skid marks, smoke, and exhaust. Design an en
gaging race track environment with textures, decorations, and
 dynamic elements.
 **User Interface and Feedback:** Designing a user interface for
 starting, pausing, and restarting the game. Provide feedback to
 the player through sounds, visual effects, and UI messages.
 **Game Loop:** Implementing a game loop using request
 AnimationFrame to continuously update the game’s state and
 render the scene.
 **User Experience and Testing:** Testing the game thoroughly
 to ensure smooth gameplay, collision accuracy, and proper
 functioning of game mechanics. Optimize performance for a
 smooth experience across various devices and browsers.
 **Deployment:** Hosting the game on a web server or platform
 for players to access and enjoy

[click here to play](http://noiron.github.io/race-game-threejs/)
