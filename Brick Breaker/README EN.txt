Brick Breaker Game
This project is a fully functional "Brick Breaker" game developed using p5.js. It includes all core mechanics, such as paddle and ball movement, collision detection, and win/lose conditions, as well as several bonus features for enhanced gameplay.

Core Features:
I implemented the game’s essential mechanics, including a paddle that follows the mouse, ball physics (bouncing off walls, the paddle, and bricks), and a game-over screen when the ball falls off the bottom edge. The game also includes a win condition when all bricks are destroyed.

Bonus Features:
I added advanced features such as bricks of varying colors and sizes, a scoring system, and customizable settings (e.g., paddle color and ball size). I also introduced special bricks that change color dynamically, which required solving a technical challenge to ensure only specific bricks were affected without altering others.

Technical Challenges:
One of the most complex aspects was implementing the functionality to change the color of special bricks without affecting all bricks on the canvas. This required careful manipulation of the brick array and collision logic, which I successfully resolved.

Technologies Used:
The game was built using JavaScript and the p5.js library, following best practices such as the Separation of Concerns principle to organize the code into modular functions.