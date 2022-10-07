title = "Dodgey";

description = `

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
  SPEED: 1,
  WIDTH_MIN: 5,
  WIDTH_MAX: 20,
  HEIGHT_MIN: 5,
  HEIGHT_MAX: 20,
};

options = {
  viewSize: {x: G.WIDTH, y: G.HEIGHT},
  isPlayingBgm: true,
  isReplayEnabled: true,
  isDrawingScoreFront: true,
  theme: "blue"
};

/**
* @typedef {{
* pos: Vector, size: Vector
* }} Star
*/
  
/**
* @type  { Star [] }
*/
let stars = [];
startick = 0;

/** @type {{pos: Vector, size: Vector}} */
let player;

function update() {
  //startup function
  if (!ticks) {
    //star setup
    stars = [];
    for (let i = 0; i < 7; i++) {
      stars.push({
          pos: vec(rnd(G.WIDTH, G.WIDTH + 500), rnd(0, G.HEIGHT/2)),
//          size: vec(100,100),
          size: vec(rnd(G.WIDTH_MIN,G.WIDTH_MAX),rnd(G.HEIGHT_MIN,G.HEIGHT_MAX)),
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
    s.pos.x -= G.SPEED;
    // Bring the star back to top once it's past the bottom of the screen
    if (s.pos.x < 0) {
      s.pos.x = G.WIDTH;
      s.pos.y = rnd(1, G.HEIGHT - 1);
    }
    // Choose a color to draw
    color("cyan");
    rect(s.pos.x, s.pos.y, s.size.x, s.size.y);

    if (s.pos.y >= player.pos.y - s.size.y - 5 && s.pos.y <= player.pos.y + 5) {
      if (s.pos.x >= player.pos.x - s.size.x + 5 && s.pos.x <= player.pos.x + s.size.x/2 - 5) {
        end();
      }
    }
    if(player.pos.x > s.pos.x){

    }
  });

  if (input.isPressed && player.pos.y > 5) {
    player.pos.y -= 1;
  }else{
    if(player.pos.y < G.HEIGHT-102){
      player.pos.y += 1;
    }
  }


  color("light_black");
  rect(0, G.HEIGHT-100, G.WIDTH, 100);
}

addEventListener("load", onLoad);
