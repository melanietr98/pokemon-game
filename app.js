const Pokemons = [];
const endSound = document.getElementById("game_end");
let pokemon1I = -1;
let pokemon2I = -1;
let gameStarted = false;

class Pokemon{

    constructor(name, sprite, hp, moves, btn_styles){
    
    
    
    this.name = name;
    
    this.sprite = sprite;
    
    this.hp = hp;
    
    this.fullhp = hp;
        this.moves = moves;
    this.btn_styles = btn_styles;
    Pokemons.push(this);
    this.index = Pokemons.length-1;
    }
    
    }
    
        /*
        
        <div style="display:relative;" class="bg-white shadow-lg"><span style="
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 25px;
    font-weight: bold;
    color: darkorange;
">HP: 360/360</span>
    <div class="bg-danger shadow-lg rounded-lg text-white" id="hp1_style" style="width: 30%;">
      <span id="hp1" style="height: 5px;display: inline-block;"></span>
    </div>
  </div>
        
        https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0ca72937-3885-42a2-949b-094db4306a6a/darum7k-230b5ab4-7fe6-4d5f-9835-24965dd1a856.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBjYTcyOTM3LTM4ODUtNDJhMi05NDliLTA5NGRiNDMwNmE2YVwvZGFydW03ay0yMzBiNWFiNC03ZmU2LTRkNWYtOTgzNS0yNDk2NWRkMWE4NTYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.jF66knzZM40Kmj342z6ma7IJLesIYBZxrfindIqr4Cc
        
        https://img.favpng.com/23/16/16/pok-mon-trading-card-game-pok-mon-tcg-online-pok-mon-box-ruby-sapphire-charizard-png-favpng-F5ZSx6rMeb3VZpfx1hy7jK0y3_t.jpg
        
        
        
        
        --back
        https://c.tenor.com/o9kP15g6AugAAAAM/charizard-pokemon.gif
        
        
        https://media.tenor.com/QkKXbs5rBKcAAAAM/charizard-sprite-rage.gif
    
    ['https://media.tenor.com/QkKXbs5rBKcAAAAM/charizard-sprite-rage.gif', 'https://c.tenor.com/o9kP15g6AugAAAAM/charizard-pokemon.gif']
    
        transform: translateX(150px);
        
        moving  (80 move forward) (11 move down)
        trix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 80, 11, 1, 1)
        
        rotating 3d
        rotate3d(1, 1, 1 ,48deg)
    */
    
    
    let pkmList = [
    
    ['Charizard', 'https://i.ibb.co/KsrkVXm/output-onlinegiftools-3.gif', 360,[
    
    ['Flamethrower', 'fire', 95, 0.95],
    
    ['Dragon Claw', 'dragon', 80, 0.95],
    
    ['Air slash', 'fly', 75, 0.85],
    
    ['Slash', 'normal', 70, ]
    
    ], 'danger'],
    
    ['Blastoise', 'https://vignette.wikia.nocookie.net/horadeaventura/images/4/4a/Blastoise.gif/revision/latest?cb=20160214204447&path-prefix=es', 362,[
    
    ['Surf', 'water', 90, 0.95],
    
    ['Crunch', 'normal', 80, 0.95],
    
    ['Ice punch', 'ice', 75, 0.95],
    
    ['Flash cannon', 'steel', 80, 0.95]
    
    ], 'primary'],
    
    ['Venusaur', 'https://i.gifer.com/4o45.gif', 364,[
    
    ['Petal Blizzard', 'grass', 90, 0.95],
    
    ['Sludge bomb', 'poison', 90, 0.95],
    
    ['Earthquake', 'ground', 100, 0.95],
    
    ['Body Slam', 'normal', 85, 0.95]
    
    ], 'success']
    
    ];
    
    let typeMatch = {
    
    'Charizard': [['ground'],['water', 'rock'], ['fire', 'grass', 'steel']],
    
    'Blastoise':[[''],['grass'],['fire', 'water']],
    
    'Venusaur':[['poison'],['fire', 'fly', 'ice', 'steel'],['grass', 'water']],
    
    }
    
    //definition of new start_game() function that displays the message of let's begin the game with the user name
	
    function start_game(){
    
    let text;
    
    let player = document.getElementById("nickName").value;
    
    text = "Hello " +  player + "! Let's start the game.";
    
    //displaying alert for starting the game
    alert(text);
    
    //changing the name of the player on the screen
    document.getElementById("player1").innerHTML = player;
    
    }
    
    function spawn(bool, i=-1){
    
    let selectedI = Math.floor(Math.random()*pkmList.length);
    if (i != -1 && i >= 0 && i < pkmList.length){
       selectedI = i;
    }
    let p = pkmList[selectedI];
    
    let pkm = new Pokemon(p[0], p[1], p[2], p[3], p[4]);

    if(bool){
    
    for(i=0; i<4; i++){

        const btn = document.getElementById('m'+i);
    btn.value = pkm.moves[i][0];
    btn.className = `btn btn-outline-${p[4]}`;
    
    }
    
    }
    
    return pkm;
    
    }
    
    let pk1, pk2 = null;
    
    function pokemonsPicker(pk1I, pk2I){
    

    pk1 = spawn(true, pk1I);

    
    document.getElementById('pk1').innerHTML = 
    `
    <div class="d-flex flex-column flex-nowrap justify-content-center align-items-center "><img class="sprite1" src="${pk1.sprite}" alt="Pokment named ${pk1.name}" />
        <span class="label_pk">Player: 1 </span>
       </div>
      `;

    document.getElementById('hp1').innerHTML = '<p>HP: ' + pk1.hp + '/' + pk1.fullhp + '</p>';
    
    
    pk2 = spawn(false, pk2I);
    
       const campImage2 = Array.isArray(pk2.sprite) && pk2.sprite.length > pk2.index ? pk2.sprite[pk2.index] : pk2.sprite; 
    document.getElementById('pk2').innerHTML = 
    `
    <div class="d-flex flex-column flex-nowrap justify-content-center align-items-center "><img class="sprite2" src="${campImage2}" alt="Pokment named ${pk2.name}" />
        <span>Player: 2 </span>
       </div>
      `;
      
           
    document.getElementById('hp2').innerHTML = '<p>HP: ' + pk2.hp + '/' + pk2.fullhp + '</p>';
    
    for(i=0; i<4; i++){
    
    let btn = document.getElementById('m'+i);
    
    let move = pk1.moves[i];
    
    function addHandler(btn, move, pk1, pk2){
    
    btn.addEventListener('click', function(e){
    
    attack(move, pk1, pk2, 'hp2', '');
    
    setTimeout(attack,2000, pk2.moves[Math.floor(Math.random()*3)], pk2, pk1, 'hp1', 'Foe ');
    
    });
    
    }
        
    addHandler(btn, move, pk1, pk2);
    
    }
    
    }
    

    
    function attack(move, attacker, receiver, hp, owner){
    
	if (!gameStarted){
	  return false;
	}
	
	 
    document.getElementById('comment').innerHTML = '<p>' + owner + attacker.name + ' used ' + move[0] + '!</p>';
    
	
    if(Math.random() < move[3]){
    
    let power = move[2] += Math.floor(Math.random()*10);
    
    let rtype = typeMatch[receiver.name];
    
    let mtype = move[1];
    
    let scale = 1;


    for(i=0; i<rtype.length; i++){
    
    if(rtype[i].includes(mtype)){
    
    switch(i){
    
    case 0:
    
    scale = 0;
    
    setTimeout(function(){
    document.getElementById('comment').innerHTML = '<p>It had no effect!</p>';

	
	
    
    },1000);
    
    break;
    
    case 1:
    
    scale = 2;
    
    setTimeout(function(){
    
    document.getElementById('comment').innerHTML = '<p>It was super effective!</p>';
	
    },1000);
    
    break;	
    
    case 2:
    
    scale = 0.5;
    
    setTimeout(function(){ 
    document.getElementById('comment').innerHTML = '<p>It was not very effective!</p>';
    
    },1000);
	
    break;
    
    }
    break;
    
    }
    
    }

    power *= scale;
    
    receiver.hp -= Math.floor(power);
    
    document.getElementById(hp).innerHTML = '<p>HP: ' + receiver.hp + '/' + receiver.fullhp + '</p>';
    updateHealthBar(receiver);
    
    }
    
    else{
    
    setTimeout(function(){
    
    document.getElementById('comment').innerHTML = '<p>Attack missed!</p>';
    
    })
    
    }
    
    checkWinner(hp);
    
    
    }
    
	let completed =false;
    
    function checkWinner(hp){
	if (completed){return false;}
    
    let f = (pk1.hp <=0) ? pk1 : (pk2.hp<=0) ? pk2 : false;
    
    if(f!=false){
        if (endSound){
         endSound.play();
        }
	completed = true;
	updateHealthBar(f);
    return dieEffect(f,50, 5, ()=>{
	   /* callback that run after die effect completed when ever it complete */
	  alert('GAME OVER: ' + f.name +' fainted!' );
    
      document.getElementById(hp).innerHTML = '<p>HP: 0/' + f.fullhp + '</p>';
    
      setTimeout(function(){
    
        location.reload();
    
      },1500);
    
      
	   });

      }
    }
    
    function isNumeric(num){
      return !isNaN(parseInt(num)) && typeof(parseInt(num)) === 'number';
    }

    function updateHealthBar(pokmen={}){
      if (typeof(pokmen.index) === 'undefined' || !isNumeric(pokmen.fullhp) || !isNumeric(pokmen.hp) ){
        return false;
      }
      const healthBarId = pokmen.index === 0 ? 'hp1_range' : 'hp2_range';
      const healthBar = document.getElementById(healthBarId);
      
      if (!healthBar){
         return false;
      }

      


      let newHealthPrec = Math.floor((pokmen.hp/pokmen.fullhp)*100);
	  if (newHealthPrec < 0){
	     newHealthPrec = 0;
	  }	  

      healthBar.style.width = `${newHealthPrec}%`;
    }
    




let transformI = 0;
let itration = 0;
function dieEffect(obj, waitTime, maxItration, callback){
if (!obj || !isNumeric(obj.index)){return false;}
  
  const spritSelc = obj.index === 0 ? '.sprite1' : '.sprite2';
  const currnDOmSPrite = document.querySelector(spritSelc);

  

  currnDOmSPrite.style.transform = `rotateX(${transformI}deg)`;
  transformI += 80;
  if (transformI > 360){
    itration += 1;
    transformI = 0;
  }
  
  if (itration >=maxItration ){
  
     if (obj.index === 0){
	    currnDOmSPrite.style.transform = 'rotateY(145deg)';
	 } else {
	    currnDOmSPrite.style.transform = 'rotateY(0deg)';
	 }
	 transformI = 0;
	 itration = 0;
	 
     return callback();
  }
  setTimeout(()=>{
    dieEffect(obj, waitTime, maxItration, callback);
  }, waitTime);
 }
 
 
 /* champ pick part  select_msg */
 
  const selectMsg = document.querySelector('#select_msg');
 const allPokemonSelect = document.querySelectorAll('.champ_select');
 allPokemonSelect.forEach( (pok)=>{
   pok.addEventListener("click", pickChamp);
 });
 function pickChamp(e){

   const selectedPokemonI = parseInt(e.currentTarget.getAttribute('data-pokemon'));

   
   if (pokemon1I === -1){
     selectMsg.innerText = 'Please Select Enemy Pokemon';
     selectMsg.classList.add('bg-danger', 'text-white');
     pokemon1I = selectedPokemonI;
     
   } else if (pokemon1I != -1 && pokemon2I === -1){  
     pokemon2I = selectedPokemonI;
     play(pokemon1I, pokemon2I);
   } else {
     return false;
   }
 }
 
 function play(pk1I=-1, pk2I=-1){
    if (endSound){
         endSound.pause();
    }
    const selectPokemonCont = document.querySelector("#pokemon_select");
    const healthBars = document.querySelectorAll(".h_bar_cont");
    healthBars.forEach( (hBar)=>{
      hBar.style.display = "block";
    });
    if (selectPokemonCont){
      selectPokemonCont.style.display = "none";
    }
    pokemonsPicker(pk1I, pk2I);
    gameStarted = true;
 }

//repeater(30, 1,50, '.sprite1')
/*
setTimeout(()=>{
repeater(40, 5, 90, Pokemons[1]);
}, 1000);
*/

