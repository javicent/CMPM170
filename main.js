title = "SNOWY DAY";

description = `
Avoid Snow

[Hold] 
Pause Snow
`;

/*
referenced code from 
https://abagames.github.io/crisp-game-lib-games/?liftup
https://github.com/JunoNgx/crisp-game-lib-tutorial#step-01-basic-drawing-and-update-stars
*/

characters = [
  `
llllll
ll l l
ll l l
llllll
 l  l
 l  l
  `,
  `
llllll
ll l l
ll l l
llllll
ll  ll
  `
];

const G = {
  WIDTH: 400,
  HEIGHT: 225,
  STAR_SPEED_MIN: 0.5,
  STAR_SPEED_MAX: 1.0
};

options = {
  viewSize: {x: G.WIDTH, y: G.HEIGHT},
  isPlayingBgm: true,
  isReplayEnabled: true,
  isDrawingScoreFront: true,
  theme: "dark"
};

/**
* @typedef {{
* pos: Vector, speed: number
* }} Star
*/
  
/**
* @type  { Star [] }
*/
let stars = [];
startick = 0;

/** @type {{pos: Vector, vx: number, ty: number}} */
let player;

function update() {
  //startup function
  if (!ticks) {
    //star setup
    stars = [];
    for (let i = 0; i < 8; i++) {
      stars.push({
          pos: vec(G.WIDTH, rnd(0, G.HEIGHT)),
          speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
      });
    }

    player = { pos: vec(G.WIDTH/2, 97), vx: 0, ty: 90 };
  }
  
  color("black")
  const c = char(addWithCharCode("a", floor(ticks / 15) % 2), player.pos, {
    mirror: { x: player.vx < 0 ? -1 : 1 },
  }).isColliding;

  // Update for Star
  stars.forEach((s) => {
    // Move the star downwards
    s.pos.x -= s.speed;
    // Bring the star back to top once it's past the bottom of the screen
    if (s.pos.x < 0) {
      s.pos.x = G.WIDTH;
      s.pos.y = rnd(1, G.HEIGHT - 1);
    }

    // Choose a color to draw
    color("cyan");
    rect(s.pos.x, s.pos.y, 3, 3);

    if (s.pos.y >= player.pos.y - 3.25 && s.pos.y <= player.pos.y + 3.25) {
      if (s.pos.x >= player.pos.x - 3.25 && s.pos.x <= player.pos.x + 3.25) {
        end();
      }
      
    }

  });

  
  
  if (input.isPressed) {
    stars.forEach((s) => {
      s.speed = 0;
    });
  }
  else {
    startick += 1;
    if (startick > 120) {
      stars.push({
      pos: vec(rnd(0, G.WIDTH), 0),
      speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
      });
      startick = 0;
      addScore(1, player.pos);
    }
    stars.forEach((s) => {
      s.speed = rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX);
    });
  }

  color("light_black");
  rect(0, 100, G.WIDTH, 200);
}

addEventListener("load", onLoad);