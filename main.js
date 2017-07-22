$(document).ready(function () {
  // $('#pressplay').hide();
  $('.container').hide();
  $('#attackOrShop').hide();

  var heros = []
  var monsters = []
  var shop = []
  var thisHero = null;
  var currentMonster = 0;
  var itemChoice = null;
  var currentMessage = " ";

  // Use this function to get a random number within a range.
  function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Weapon Constructor
  var Weapon = function (name, min, max, cost) {
    this.name = name;
    this.minDamage = min;
    this.maxDamage = max;
    this.cost = cost || 50;
    this.type = "Weapon"
  }

  // Armor Constructor
  var Armor = function (name, absorb, cost) {
    this.name = name;
    this.absorb = absorb;
    this.cost = cost || 50;
    this.type = "Armor"
  }

  // Heal Potion Constructor
  var Heal = function (name, health, cost) {
    this.name = name;
    this.health = health;
    this.cost = cost;
    this.type = "Heal"
  }

  // Monster Constructor
  var Monster = function (name, health, hpTotal, strength, gold, weaponName, weaponMin, weaponMax, armorName, armorAbsorb) {
    this.name = name;
    this.health = health;
    this.hpTotal = hpTotal;
    this.strength = strength;
    this.gold = gold;
    this.weapon = new Weapon(weaponName, weaponMin, weaponMax)
    this.armor = new Armor(armorName, armorAbsorb)
  }
  Monster.prototype.isAlive = function () {
    return this.health > 0;
  }
  // Hero Constructor
  var Hero = function (name, health, hpTotal, strength, gold, weaponName, weaponMin, weaponMax, armorName, armorAbsorb) {
    this.name = name;
    this.health = health;
    this.hpTotal = hpTotal;
    this.strength = strength;
    this.gold = gold;
    this.weapon = new Weapon(weaponName, weaponMin, weaponMax)
    this.armor = new Armor(armorName, armorAbsorb)
    this.isAlive = function () {
      return this.health > 0;
    }

    this.print = function () {
      console.log('Name: ' + this.name);
      console.log('Health: ' + this.health);
      console.log('Strength: ' + this.strength);
      console.log('Gold: ' + this.gold);
      console.log('Weapon: ' + this.weapon.name + ' (' + this.weapon.minDamage + '-' + this.weapon.maxDamage + ')');
      console.log('Armor: ' + this.armor.name + ' has a ' + Math.floor((this.armor.absorb * 100)) + '% absorption.');
    }
  }

  function gameReset() {
    heros = []
    monsters = []
    shop = []
    thisHero = null;
    currentMonster = 0;
    itemChoice = null;
    currentMessage = " ";

    heros.push(new Hero("Cornelius", 400, 400, 10, randomInRange(450, 600), "Rusted Sword", randomInRange(2, 4), randomInRange(6, 8), "Cloth Rags", .07))
    heros.push(new Hero("Braxton", 350, 350, 20, randomInRange(600, 750), "Minecraft Replica Sword", randomInRange(3, 5), randomInRange(7, 9), "Cloth Rags", .08))
    heros.push(new Hero("Archibald", 200, 200, 40, randomInRange(750, 900), "Samurai Sword", randomInRange(4, 6), randomInRange(8, 10), "Hero Cloth Rags", .09))

    // Create our monsters
    monsters.push(new Monster("Evil Smash Mouth super fan!", 50, 50, 20, randomInRange(100, 250), "Needle", randomInRange(1, 3), randomInRange(4, 5), "Cloth Rags", .05))
    monsters.push(new Monster("Evil Hanson fan!!", 75, 75, 35, randomInRange(200, 350), "Sharp Dagger", randomInRange(2, 4), randomInRange(5, 7), "Cloth Rags", .06))
    monsters.push(new Monster("REALLY evil Chumbawumba fan!!!", 100, 100, 55, randomInRange(300, 450), "Piercing Dagger", randomInRange(3, 5), randomInRange(6, 8), "Cloth Rags", .07))
    monsters.push(new Monster("BOSS of Bad Dudes", 150, 150, 70, 125, "Piercing Dagger", randomInRange(6, 8), randomInRange(9, 11), "Cloth Rags", .1))

    // Create our Shop
    shop.push(new Weapon("Heartsbane", 6, 12, 50))
    shop.push(new Weapon("Dark Sister", 6, 15, 80))
    shop.push(new Weapon("Needle", 12, 30, 150))
    shop.push(new Weapon("Oathkeeper", 20, 40, 250))
    shop.push(new Weapon("Longclaw", 40, 60, 500))

    shop.push(new Armor("Neckless chain with a tiny Shield", .14, 200))
    shop.push(new Armor("Roman war Sandals ", .24, 300))
    shop.push(new Armor("Sword Proof Vest", .32, 450))
    shop.push(new Armor("Samurai Armor", .45, 600))

    shop.push(new Heal("Angel Tears", 20, 10))
    shop.push(new Heal("Bite Size Elixer", 50, 25))
    shop.push(new Heal("Jumbo Elixer", 100, 50))
    shop.push(new Heal("supercalifragilistic Elixer", 250, 125))
    shop.push(new Heal("Elixer Of Eternity", 500, 250))
  }
  // To check and make sure the code ran properly and so we can see what we have access to.
  console.log(heros);
  console.log(monsters);
  console.log(shop);

  // DOM MANIPULATION
  function heroReset() {
    var heroDiv = $(".heros");
    heroDiv.html("");

    var heroHeaderHeader = $('.heroHeader');
    heroHeaderHeader.html("");
  }

  function resultReset() {
    var youWon = $('.youWon');
    youWon.html('');
  }

  function monsterReset() {
    var monsterDiv = $(".monsters");
    monsterDiv.html("");

    var monsterHeaderHeader = $('.monsterHeader');
    monsterHeaderHeader.html("");
  }

  function shopReset() {
    var shopDiv = $(".shopItem");
    shopDiv.html("");

    var shopHeaderHeader = $('.shopHeader');
    shopHeaderHeader.html("");

    var heroDiv = $(".heros");
    heroDiv.html("");

    var heroHeaderHeader = $('.heroHeader');
    heroHeaderHeader.html("");

    var typeDiv = $('.shopHeader');
    typeDiv.html("");

  }

  function printHero() {
    var heroDiv = $(".heros");
    heroDiv.html("");
    var heroHeaderHeader = $('.heroHeader');
    heroHeaderHeader.html("");

    var chooseHero = $('<h2 id="chooseHero" class="header">PLEASE CHOOSE YOUR HERO</h2>');
    var spacing = $('<div class=" spacing col-xs-1" ></div>');
    heroDiv.append(spacing);

    for (var i = 0; i < heros.length; i++) {
      var heroContainer = $('<button class=" hero heroContainer  pressToGo heroChoose col-xs-3" data-interval="' + i + '"></button>');

      var heroHeader = $('<div class="header">');
      var heroName = $('<h4>' + heros[i].name + '</h4>');

      var contentBody = $('<div class="body"></div>');

      var heroHealth = $('<p><strong>Total Health: </strong>' + heros[i].health + '</p>');
      var heroStrength = $('<p><strong>Strength: </strong>' + heros[i].strength + '</p>');
      var heroGold = $(' <p><strong>Gold: </strong>' + heros[i].gold + '</p>');
      var heroWeapon = $('<p><strong>Weapon: </strong>' + heros[i].weapon.name + '  ( Min Dam: ' + heros[i].weapon.minDamage + ', Max Dam: ' + heros[i].weapon.maxDamage + ')' + '</p>');
      var heroArmor = $('<p><strong>Armor: </strong>' + heros[i].armor.name + ' (Absorbs: ' + Math.floor(heros[i].armor.absorb * 100) + '%)</p>');


      heroHeaderHeader.append(chooseHero);
      heroContainer.append(heroHeader);
      heroContainer.append(contentBody);

      heroHeader.append(heroName);
      contentBody.append(heroHealth);
      contentBody.append(heroStrength);
      contentBody.append(heroGold);
      contentBody.append(heroWeapon);
      contentBody.append(heroArmor);

      heroDiv.append(heroContainer);

    }
  }

  function printChosenHero() {
    var heroDiv = $(".heros");
    heroDiv.html("");
    var heroHeaderHeader = $('.heroHeader');
    heroHeaderHeader.html("");

    var chosenHero = $('<div class="gameHeader col-xs-6">HERO</div>')
    var heroContainer = $('<div class="hero chosen heroContainer col-xs-6"</div>');

    var heroHeader = $('<div class="header">');
    var heroName = $('<h4>' + heros[thisHero].name + '</h4>');

    var contentBody = $('<div class="body"></div>');

    var heroHealth = $('<p><strong>Remaining Health: </strong>' + heros[thisHero].health + '</p>');
    var heroTotHealth = $('<p><strong>Total Health: </strong>' + heros[thisHero].hpTotal + '</p>');
    var heroStrength = $('<p><strong>Strength: </strong>' + heros[thisHero].strength + '</p>');
    var heroGold = $(' <p><strong>Gold: </strong>' + heros[thisHero].gold + '</p>');
    var heroWeapon = $('<p><strong>Weapon: </strong>' + heros[thisHero].weapon.name + '( Min Dam: ' + heros[thisHero].weapon.minDamage + ', Max Dam: ' + heros[thisHero].weapon.maxDamage + ')' + '</p>');
    var heroArmor = $('<p><strong>Armor: </strong>' + heros[thisHero].armor.name + ' (Absorbs: ' + Math.floor(heros[thisHero].armor.absorb * 100) + '%)</p>');

    var progressBar = $('<div class="progress"></div>');
    var hpBar = $('<div class="progress-bar active" role="progressbar" aria-valuenow="' + Math.floor(heros[thisHero].health / heros[thisHero].hpTotal * 100) + '%" aria-valuemin="0" aria-valuemax="' + heros[thisHero].hpTotal + '" style="width: ' + Math.floor(heros[thisHero].health / heros[thisHero].hpTotal * 100) + '%">' + heros[thisHero].health + 'HP </div>');

    progressBar.append(hpBar);
    contentBody.append(progressBar);

    heroHeaderHeader.append(chosenHero);
    heroContainer.append(heroHeader);
    heroContainer.append(contentBody);

    heroHeader.append(heroName);
    contentBody.append(heroHealth);
    contentBody.append(heroTotHealth);
    contentBody.append(heroStrength);
    contentBody.append(heroGold);
    contentBody.append(heroWeapon);
    contentBody.append(heroArmor);

    heroDiv.append(heroContainer);
  }

  function printMonsters() {

    var monsterDiv = $(".monsters");
    monsterDiv.html("");

    var monsterHeaderHeader = $('.monsterHeader');
    monsterHeaderHeader.html("");

    var allMonsters = $('<h2>MONSTERS</h2>')

    for (var i = 0; i < monsters.length; i++) {


      var monsterContainer = $('<div class=" monster monsterContainer col-md-3" data-interval="' + i + '"></div>');

      var monsterHeader = $('<div class="header">');
      var monsterName = $('<h4>' + monsters[i].name + '</h4>');

      var contentBody = $('<div class="body"></div>');

      var monsterHealth = $('<p><strong>Health: </strong>' + monsters[i].health + '</p>');
      var monsterStrength = $('<p><strong>Strength: </strong>' + monsters[i].strength + '</p>');
      var monsterGold = $(' <p><strong>Gold: </strong>' + monsters[i].gold + '</p>');
      var monsterWeapon = $('<p><strong>Weapon: </strong>' + monsters[i].weapon.name + '</p>');
      var monsterArmor = $('<p><strong>Armor: </strong>' + monsters[i].armor.name + '</p>');


      monsterHeaderHeader.append(allMonsters);

      monsterContainer.append(monsterHeader);
      monsterContainer.append(contentBody);

      monsterHeader.append(monsterName);
      contentBody.append(monsterHealth);
      contentBody.append(monsterStrength);
      contentBody.append(monsterGold);
      contentBody.append(monsterWeapon);
      contentBody.append(monsterArmor);

      monsterDiv.append(monsterContainer);
    }
  }

  function printCurrentMonster() {


    var herosDiv = $(".heros");

    // Putting Current monster Title side by side to Hero
    var heroHeaderHeader = $('.heroHeader');


    var theMonster = $('<div class="gameHeader col-xs-6 col-xs-offset-1">CURRENT MONSTER</div>')

    var monsterContainer = $('<div class="monster monsterContainer col-xs-6 col-xs-offset-1" data-interval="' + currentMonster + '"></div>');

    var monsterHeader = $('<div class="header">');
    var monsterName = $('<h4>' + monsters[currentMonster].name + '</h4>');

    var contentBody = $('<div class="body"></div>');

    var monsterHealth = $('<p class="text-center"><strong>Health: </strong>' + monsters[currentMonster].health + '</p>');
    var monsterStrength = $('<p class="text-center"><strong>Strength: </strong>' + monsters[currentMonster].strength + '</p>');
    var monsterGold = $(' <p class="text-center"><strong>Gold: </strong>' + monsters[currentMonster].gold + '</p>');
    var monsterWeapon = $('<p class="text-center"><strong>Weapon: </strong>' + monsters[currentMonster].weapon.name + '</p>');
    var monsterArmor = $('<p class="text-center"><strong>Armor: </strong>' + monsters[currentMonster].armor.name + '</p>');

    var progressBar = $('<div class="progress"></div>');
    var hpBar = $('<div class="progress-bar active" role="progressbar" aria-valuenow="' + Math.floor(monsters[currentMonster].health / monsters[currentMonster].hpTotal * 100) + '%" aria-valuemin="0" aria-valuemax="' + monsters[currentMonster].hpTotal + '" style="width: ' + Math.floor(monsters[currentMonster].health / monsters[currentMonster].hpTotal * 100) + '%">' + monsters[currentMonster].health + 'HP </div>');

    progressBar.append(hpBar);
    contentBody.append(progressBar);

    heroHeaderHeader.append(theMonster);
    monsterContainer.append(monsterHeader);
    monsterContainer.append(contentBody);

    monsterHeader.append(monsterName);
    contentBody.append(monsterHealth);
    contentBody.append(monsterStrength);
    contentBody.append(monsterGold);
    contentBody.append(monsterWeapon);
    contentBody.append(monsterArmor);

    herosDiv.append(monsterContainer);

    printGameInfo()
    addEventListerners();
  }


  function printGameInfo() {
    //on buttons on attack page, the function is called within the printCurrentMonser function.
    var infoDiv = $('.monsters');
    infoDiv.html("");
    // currentMessage = " ";
    var attackButton = $('<button id="attacking" type="button" class="col-xs-2 btn btn-primary btn-lg" data-cmd="attacking">Attack!</button>')
    var exitButton = $('<button id="exiting" type="button" class="col-xs-2 col-xs-offset-1 btn btn-primary btn-lg "data-cmd="exiting">Exit!</button>')

    infoDiv.append(attackButton);
    infoDiv.append(exitButton);

    //This is the log that prints out the attacks. I put it a row below the buttons.
    var typeDiv = $('.shopHeader');
    typeDiv.html("");
    var typeWriterDiv = $(' <div id="attacklog"> </div>');
    var typeWriterHeader = $('<h4 class="header">Attack log</h4>');
    var typeWriter = $('<p>' + currentMessage + '</p>');

    typeWriterDiv.append(typeWriterHeader);
    typeWriterDiv.append(typeWriter);
    typeDiv.append(typeWriterDiv);
  }

  function printShop() {
    var shopDiv = $(".shopItem");
    shopDiv.html("");
    var shopHeaderHeader = $('.shopHeader');
    shopHeaderHeader.html("");
    var typeDiv = $('.shopHeader');
    typeDiv.html("");
    var heroDiv = $(".heros");
    var heroContainer = $('<div   id= "gold" class="goldStat col-xs-3"</div>');
    var heroHeader = $('<div class="header">');
    var heroGold = $('<div class="gold"> GOLD:' + heros[thisHero].gold + '</div>');
    var contentBody = $('<div class="body"></div>');

    heroContainer.append(heroHeader);
    heroContainer.append(contentBody);
    heroHeader.append(heroGold);
    heroDiv.append(heroContainer)


    var exitDiv = $(".heros");
    var exitContainer = $('<button id="exit" class="exit col-xs-3" data-exit="0" data-cmd="exit"</button>');
    var exitHeader = $('<div class="header">');
    var exitE = $('<h4><strong>E</strong></h4>');
    var exitX = $('<h4><strong>X</strong></h4>');
    var exitI = $('<h4><strong>I</strong></h4>');
    var exitT = $('<h4><strong>T</strong></h4>');
    var contentBody = $('<div class="body"></div>');
    exitContainer.append(exitHeader);
    exitContainer.append(contentBody);
    contentBody.append(exitE);
    contentBody.append(exitX);
    contentBody.append(exitI);
    contentBody.append(exitT);
    exitDiv.append(exitContainer)

    //add a log that shows messages, attach string to a variable and append them at the end of the shop function
    var typeWriterDiv = $(' <div id="attacklog"> </div>');
    var typeWriterHeader = $('<h4 class="header">Shop log</h4>');
    var typeWriter = $('<p>' + currentMessage + '</p>')

    typeWriterDiv.append(typeWriterHeader);
    typeWriterDiv.append(typeWriter)
    typeDiv.append(typeWriterDiv);

    var itemsHeader = $('<div class="gameHeader col-xs-6">SHOP</div>');

    for (var i = 0; i < shop.length; i++) {
      if (shop[i].type == "Weapon") {

        var shopContainer = $('<button class="shop weapon col-md-3" data-interval="' + i + '"></button>');

        var shopHeader = $('<div class="header">');
        var contentBody = $('<div class="body"></div>');

        var shopName = $('<h4>' + shop[i].name + '</h4>');


        var itemType = $('<p class="type"><strong>' + shop[i].type + '</strong></p>');
        var shopminDamage = $('<p><strong>Minimum Damage: </strong>' + shop[i].minDamage + '</p>');
        var shopMaxDamage = $(' <p><strong>Max Damage: </strong>' + shop[i].maxDamage + '</p>');
        var shopCost = $('<p><strong>Cost: </strong>' + shop[i].cost + '</p>');

        shopHeaderHeader.append(itemsHeader);

        shopContainer.append(shopHeader);
        shopContainer.append(contentBody);

        shopHeader.append(shopName);
        contentBody.append(itemType);
        contentBody.append(shopminDamage);
        contentBody.append(shopMaxDamage);
        contentBody.append(shopCost);

        shopDiv.append(shopContainer);

      } else if (shop[i].type == "Armor") {

        var shopContainer = $('<button class="shop armor col-md-3" data-interval="' + i + '"></button>');

        var shopHeader = $('<div class="header">');
        var shopName = $('<h4>' + shop[i].name + '</h4>');

        var contentBody = $('<div class="body"></div>');

        var itemType = $('<p class="type"><strong>' + shop[i].type + '</strong></p>');
        var shopAbsorb = $('<p><strong>Absorb: </strong>' + shop[i].absorb + '</p>');
        var shopCost = $(' <p><strong>Gold: </strong>' + shop[i].cost + '</p>');


        shopContainer.append(shopHeader);
        shopContainer.append(contentBody);

        shopHeader.append(shopName);
        contentBody.append(itemType);
        contentBody.append(shopAbsorb);
        contentBody.append(shopCost);

        shopDiv.append(shopContainer);

      } else {
        var shopContainer = $('<button class= "shop potion col-md-3" data-interval="' + i + '"></button>');

        var shopHeader = $('<div class="header">');
        var shopName = $('<h4>' + shop[i].name + '</h4>');

        var contentBody = $('<div class="body"></div>');

        var itemType = $('<p class="type"><strong>' + shop[i].type + '</strong></p>');
        var shopHealth = $('<p><strong>Health: </strong>' + shop[i].health + '</p>');
        var shopCost = $('<p><strong>Cost: </strong>' + shop[i].cost + '</p>');

        shopContainer.append(shopHeader);
        shopContainer.append(contentBody);

        shopHeader.append(shopName);
        contentBody.append(itemType);
        contentBody.append(shopHealth);
        contentBody.append(shopCost);

        shopDiv.append(shopContainer);
      }
    }
  }

  function printWinner() {
    var winnerBody = $(".winOrLose");
    var imgContainer = $('<div class=" youWon row text-center"></div>');
    var theImg = $('<h1> You WON!!</h1>');
    var buttonDiv = $('<div class="playAgain"></div>');
    var theButton = $('<button id="playAgain1" type="button" class="btn btn-lg btn-success">PLAY AGAIN?</button>');

    imgContainer.append(theImg);
    buttonDiv.append(theButton);
    winnerBody.append(imgContainer);
    winnerBody.append(buttonDiv);

    $("#playAgain1").on('click', function () {
      console.log("Registers click")
      heroReset();
      monsterReset();
      shopReset();
      resultReset()
      $(this).hide();
      $('.container').show();
      gameReset();
      printHero();
      $(".hero").on('click', function () {
        thisHero = $(this).data('interval');
        $('#attackOrShop').show();
        $('.container').hide();
        heroReset();
      })
      addEventListerners()
    })
  }

  function printLoser() {
    var loserBody = $(".winOrLose");
    var imgContainer = $('<div class=" youWon row text-center"></div>');
    var theImg = $('<h1> You LOST!!</h1>');
    var buttonDiv = $('<div class="playAgain"></div>');
    var theButton = $('<button id="playAgain" type="button" class="btn btn-lg btn-success">PLAY AGAIN?</button>');

    imgContainer.append(theImg);
    buttonDiv.append(theButton);
    loserBody.append(imgContainer);
    loserBody.append(buttonDiv);

    $("#playAgain").on('click', function () {
      heroReset();
      monsterReset();
      shopReset();
      resultReset()
      $(this).hide();
      $('.container').show();
      gameReset();
      printHero();
      $(".hero").on('click', function () {
        thisHero = $(this).data('interval');
        $('#attackOrShop').show();
        $('.container').hide();
        heroReset();
      })
      addEventListerners()
    })
  }

  function buyItem(index) {
    currentMessage = " ";
    if ((shop[index].type == "Weapon" && heros[thisHero].weapon.maxDamage <= shop[index].maxDamage) && (heros[thisHero].gold >= shop[index].cost)) {
      currentMessage = " Sold, good sir!";
      currentMessage += " You just bought a " + shop[index].name + ". ";
      heros[thisHero].gold -= shop[index].cost;
      heros[thisHero].weapon = shop[index];
      shop.splice(index, 1);

    } else if ((shop[index].type == "Armor" && heros[thisHero].armor.absorb < shop[index].absorb) && (heros[thisHero].gold >= shop[index].cost)) {
      currentMessage = " Sold, good sir!";
      currentMessage += " You just bought a " + shop[index].name + ". ";
      heros[thisHero].gold -= shop[index].cost;
      heros[thisHero].armor = shop[index];
      shop.splice(index, 1);

    } else if ((shop[index].type == "Heal") && (heros[thisHero].gold >= shop[index].cost)) {
      currentMessage = " Sold, good sir!";
      currentMessage += " You just bought a " + shop[index].name + " and were healed for " + shop[index].health + "!";
      heros[thisHero].gold -= shop[index].cost;
      heros[thisHero].health += shop[index].health;
      shop.splice(index, 1);

    } else if (heros[thisHero].gold < shop[index].cost) {
      currentMessage = "You cant afford the " + shop[index].name + ".";


    } else {
      currentMessage = " Sorry its against moral judgement to sell you equipment that is currently weaker than what you already have.";

    }

  }


  function heroAttackMonsterNew(theHero, theMonster) {
    var dmg = (theHero.strength + randomInRange(theHero.weapon.minDamage, theHero.weapon.maxDamage)); // unpacking this, it's just a simple formula (total damage is the AttRange plus a value between min and max damage)'
    currentMessage = "";
    currentMessage += "Your hero attacks " + theMonster.name + " for " + dmg + " damage. ";
    theMonster.health -= dmg;

    if (theMonster.health >= 0) {
      currentMessage += " " + theMonster.name + " now has " + theMonster.health + " health." + " ";
    } else {
      currentMessage += " " + theMonster.name + " now has " + 0 + " health. ";
    }
    if (theMonster.isAlive() == false) { // we are calling the .isAlive() function which will evaluate if the monster's health is 0 or less and return a boolean true if it isn't and false if it is
      currentMessage += " " + "Holy mole " + theHero.name + " killed " + theMonster.name + "!!!";
      theHero.gold += theMonster.gold;
      currentMessage += " " + "You got all of the monster's " + theMonster.gold + " gold";
      currentMonster += 1;
      if (currentMonster < monsters.length) {
        monsterReset();
        printCurrentMonster();
      } else {
        $('.container').hide();
        printWinner();
      }
    } else {
      monsterAttackHeroNew(theMonster, theHero);
      if (theHero.isAlive() == false) {
        $('.container').hide();
        printLoser();
      }
    }

  }

  function monsterAttackHeroNew(ourMonster, ourHero) {

    var monsterAttack = ourMonster.strength + randomInRange(ourMonster.weapon.minDamage, ourMonster.weapon.maxDamage);

    currentMessage += ourMonster.name + " attacks our hero for " + monsterAttack + " damage and took " + monsterAttack + " gold." + " ";
    ourHero.health = ourHero.health - monsterAttack;
    currentMessage += " " + ourHero.name + " now has " + ourHero.health + " health.";

    ourHero.gold -= monsterAttack;

    if (ourHero.gold < 0) {
      ourHero.gold = 0;
      heroReset();
      monsterReset();
      printChosenHero();
      printCurrentMonster();
    }
  }



  $('#pressplay').on('click', function () {
    $(this).hide();
    $('.container').show();
    gameReset();
    printHero();


    $(".hero").on('click', function () {
      thisHero = $(this).data('interval');
      $('#attackOrShop').show();
      $('.container').hide();
      heroReset();
    })
    addEventListerners()
  })



  $("#attackNow").on('click', function () {
    $('.container').show();
    $('#attackOrShop').hide();
    printChosenHero();
    printCurrentMonster();
  })
  $('#shopNow').on('click', function () {
    console.log("it's working");
    $('#attackOrShop').hide();
    $('.container').show();
    printChosenHero();
    printShop();
    addEventListerners();
  })


  function addEventListerners() {

    $(".shop").on('click', function () {
      var itemChoice = $(this).data('interval');
      console.log(itemChoice);
      buyItem(itemChoice);
      heroReset();
      shopReset()
      printChosenHero();
      printShop()
      addEventListerners();
    })
    $('#exit').on('click', function () {
      var exit = $(this).data('cmd')
      currentMessage = " ";
      heroReset()
      shopReset();
      $('.container').hide();
      $('#attackOrShop').show();
    })
    $("#attackNow").on('click', function () {
      $('.container').show();
      $('#attackOrShop').hide();
    })
    $('#shopNow').on('click', function () {
      console.log("it's working");
      $('#attackOrShop').hide();
      $('.container').show();

      printChosenHero();
      printShop();
      addEventListerners();
    })
    $('#exiting').on('click', function () {
      var exiting = $(this).data('cmd')
      heroReset();
      shopReset();
      monsterReset();
      $('.container').hide();
      $('#attackOrShop').show();
      console.log(exiting);
    })
    $('#attacking').on('click', function () {
      var attacking = $(this).data('cmd');
      heroAttackMonsterNew(heros[thisHero], monsters[currentMonster]);
      heroReset();
      monsterReset();
      printChosenHero();
      printCurrentMonster();

      console.log(attacking)
    })
  }

})