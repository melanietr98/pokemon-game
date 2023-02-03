const charizard = document.querySelector(".charizard");
const blastoise = document.querySelector(".blastoise");
const venusaur = document.querySelector(".venusaur");
const chooseTitme = document.querySelector(".choose-title");

let pk1, pk2;
function spawn(bool, pokemon) {
  //choosing the pokemon

  // let p = pokemonList[Math.floor(Math.random() * pokemonList.length)];

  //adding the buttons the poweer of selected pokemon
  let pkm;
  if (bool) {
    let p = pokemonList.find((item) => item[0] === pokemon);
    pkm = new Pokemon(p[0], p[1], p[2], p[3]);
    for (i = 0; i < 4; i++) {
      document.getElementById("m" + i).innerHTML = pkm.moves[i][0];
    }
  } else {
    let p = pokemonList[Math.floor(Math.random() * pokemonList.length)];
    pkm = new Pokemon(p[0], p[1], p[2], p[3]);
    console.log(pkm, pk1)
    if(pkm.name === pk1.name){
      while(pkm.name === pk1.name){
        p = pokemonList[Math.floor(Math.random() * pokemonList.length)];
        pkm = new Pokemon(p[0], p[1], p[2], p[3]);
      }
    }
  }

  return pkm;
}

window.addEventListener("load", (event) => {

  document.querySelector(".opponent-turn-button").remove();

  const handleSelectPokemon = (value) => {
    pk1 = spawn(true, value.name);
    basic(pk1);
    charizard.remove();
    blastoise.remove();
    venusaur.remove();
    chooseTitme.remove();

    document.querySelector(".main-container").style.opacity = 1;
  };

  charizard.addEventListener("click", (e) => {
    handleSelectPokemon(e.target);
  });

  blastoise.addEventListener("click", (e) => {
    handleSelectPokemon(e.target);
  });

  venusaur.addEventListener("click", (e) => {
    handleSelectPokemon(e.target);
  });

  event.preventDefault();
});

class Pokemon {
  constructor(name, sprite, hp, moves) {
    this.name = name;

    this.sprite = sprite;

    this.hp = hp;

    this.fullhp = hp;

    this.moves = moves;
  }
}

let pokemonList = [
  [
    "Charizard",
    "https://img.pokemondb.net/sprites/black-white/normal/charizard.png",
    360,
    [
      ["Flamethrower", "fire", 95, 0.95],

      ["Dragon Claw", "dragon", 80, 0.95],

      ["Air slash", "fly", 75, 0.85],

      ["Slash", "normal", 70],
    ],
  ],

  [
    "Blastoise",
    "https://img.pokemondb.net/sprites/black-white/normal/blastoise.png",
    362,
    [
      ["Surf", "water", 90, 0.95],

      ["Crunch", "normal", 80, 0.95],

      ["Ice punch", "ice", 75, 0.95],

      ["Flash cannon", "steel", 80, 0.95],
    ],
  ],

  [
    "Venusaur",
    "https://img.pokemondb.net/sprites/black-white/normal/venusaur-f.png",
    364,
    [
      ["Petal Blizzard", "grass", 90, 0.95],

      ["Sludge bomb", "poison", 90, 0.95],

      ["Earthquake", "ground", 100, 0.95],

      ["Body Slam", "normal", 85, 0.95],
    ],
  ],
];

let typeMatch = {
  Charizard: [["ground"], ["water", "rock"], ["fire", "grass", "steel"]],

  Blastoise: [[""], ["grass"], ["fire", "water"]],

  Venusaur: [["poison"], ["fire", "fly", "ice", "steel"], ["grass", "water"]],
};

//definition of new start_game() function that displays the message of let's begin the game with the user name
const start_game = () => {
  let text;

  let player = document.getElementById("nickName").value;

  text = "Hello " + player + "! Let's start the game.";

  //displaying alert for starting the game
  alert(text);

  //changing the name of the player on the screen
  document.getElementById("player1").innerHTML = player;
};

const basic = (pk1) => {
  s1 = document.createElement("img");

  s1.src = pk1.sprite;

  document.getElementById("pk1").appendChild(s1);

  document.getElementById("hp1").innerHTML = "HP: " + pk1.hp + "/" + pk1.fullhp;

  pk2 = spawn(false, "");

  s2 = document.createElement("img");

  s2.src = pk2.sprite;

  document.getElementById("pk2").appendChild(s2);

  document.getElementById("hp2").innerHTML = "HP: " + pk2.hp + "/" + pk2.fullhp;

  for (i = 0; i < 4; i++) {
    let btn = document.getElementById("m" + i);

    let move = pk1.moves[i];

    function addHandler(btn, move, pk1, pk2) {
      btn.addEventListener("click", function (e) {
        attack(move, pk1, pk2, "hp2", "");

        setTimeout(
          attack,
          3000,
          pk2.moves[Math.floor(Math.random() * 3)],
          pk2,
          pk1,
          "hp1",
          "Foe"
          );
      });
    }

    addHandler(btn, move, pk1, pk2);
  }
};


function attack(move, attacker, receiver, hp, owner) {
  
  if(owner === "Foe"){
    let temp = document.querySelector(".your-turn-button")
    document.querySelector(".your-turn-button").remove();
    temp.className = "btn btn-danger opponent-turn-button"
    temp.innerHTML = "Opponent Turn"
    document.querySelector(".opponent-pokemon-img-container").appendChild(temp)
  }

    document.getElementById("comment").innerHTML =
      "<p>" + owner +" "+ attacker.name + " used " + move[0] + "!</p>";


  if (Math.random() < move[3]) {
    let power = (move[2] += Math.floor(Math.random() * 10));

    let rtype = typeMatch[receiver.name];

    let mtype = move[1];

    let scale = 1;

    for (i = 0; i < rtype.length; i++) {
      if (rtype[i].includes(mtype)) {
        switch (i) {
          case 0:
            scale = 0;

            setTimeout(function () {
              document.getElementById("comment").innerHTML =
                "<p>It had no effect!</p>";
            }, 1500);

            break;

          case 1:
            scale = 2;

            setTimeout(function () {
              document.getElementById("comment").innerHTML =
                "<p>It was super effective!</p>";
            }, 1500);

            break;

          case 2:
            scale = 0.5;

            setTimeout(function () {
              document.getElementById("comment").innerHTML =
                "<p>It was not very effective!</p>";
            }, 1500);

            break;
        }

        break;
      }
    }

    power *= scale;

    receiver.hp -= Math.floor(power);

    document.getElementById(hp).innerHTML =
      "HP: " + receiver.hp + "/" + receiver.fullhp;
  } else {
    setTimeout(function () {
      document.getElementById("comment").innerHTML = "<p>Attack missed!</p>";
    });
  }

  setTimeout(()=>{
    if(owner === "Foe"){
      let temp = document.querySelector(".opponent-turn-button")
      document.querySelector(".opponent-turn-button").remove();
      temp.className = "btn btn-success your-turn-button"
      temp.innerHTML = "Your Turn"
      document.querySelector(".your-pokemon-img-container").appendChild(temp)
    }
  }, 3000)
  checkWinner(hp);
}

function checkWinner(hp) {
  let f = pk1.hp <= 0 ? pk1 : pk2.hp <= 0 ? pk2 : false;
  if (f != false) {
    console.log(f)
    alert("GAME OVER: " + f.name + " fainted!");

    document.getElementById(hp).innerHTML = "HP: 0/" + f.fullhp;

    setTimeout(function () {
      location.reload();
    }, 1500);
  }
}
