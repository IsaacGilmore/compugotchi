    //size of the pixels
    var pixelScale = 12;
    var debug = false;
    var difficulty = 0;
    var cycles = 0;

    //declare a variable for each animation
    var idle_animation;
    var eat_animation;
    var hungry_animation;
    var battery_animation;
    var charge_animation;
    var popUp_animation;
    var popUpFinal_animation;
    var bsod_animation;
    var blueScreen_animation;
    var die_animation;
    var bsodDie_animation;
    var popUpDeath_animation;
    var dead_animation;
    var sentient_animation;
    var sentientFirst_animation;

    //images for the interface
    var bg_image;
    var sentient_text;
    var feed_icon;
    var feed_icon_roll;
    var energy_icon;
    var energy_icon_roll;
    var virus_icon;
    var virus_icon_roll;
    var reboot_icon;
    var reboot_icon_roll;
    var light_on;
    var light_off;

    //sounds
    var eat_sound;
    var hunger_sound;
    var die_sound;

    //declare a variable for each sprite
    //buttons are sprites as well
    var energy;
    var virus;
    var reboot;
    var hungrylight;
    var batterylight;
    var viruslight;
    var rebootlight;


    var dead = false;
    var hunger = 3;
    var charge = 3;
    var MAX_HUNGER = 15;
    var MAX_CHARGE = 15;
    var MAX_CYCLES = 200;
    var virus = false;
    var rebootBool = false;
    var rebootArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
    var popUpBool = false;
    var popUpArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];

    function preload() {

      //load sprite sheet: (file, width, height, number of frames)
      //put it in a variable sprite_sheet which I reuse every time
      sprite_sheet = loadSpriteSheet('assets/idle.png', 32, 32, 10);
      //turn the sprite sheet into an animation
      idle_animation = loadAnimation(sprite_sheet);

      //do the same for the other animations...
      //make sure to change the frame number!

      sprite_sheet = loadSpriteSheet('assets/feed.png', 32, 32, 24);
      eat_animation = loadAnimation(sprite_sheet);

      sprite_sheet = loadSpriteSheet('assets/hungry.png', 32, 32, 24);
      hungry_animation = loadAnimation(sprite_sheet);

      sprite_sheet = loadSpriteSheet('assets/battery.png', 32, 32, 24);
      battery_animation = loadAnimation(sprite_sheet);

      sprite_sheet = loadSpriteSheet('assets/charge.png', 32, 32, 24);
      charge_animation = loadAnimation(sprite_sheet);

      sprite_sheet = loadSpriteSheet('assets/popUp.png', 32, 32, 4);
      popUp_animation = loadAnimation(sprite_sheet);

      sprite_sheet = loadSpriteSheet('assets/popUpFinal.png', 32, 32, 1);
      popUpFinal_animation = loadAnimation(sprite_sheet);

      sprite_sheet = loadSpriteSheet('assets/bsod.png', 32, 32, 4);
      bsod_animation = loadAnimation(sprite_sheet);

      sprite_sheet = loadSpriteSheet('assets/blueScreen.png', 32, 32, 1);
      blueScreen_animation = loadAnimation(sprite_sheet);

      sprite_sheet = loadSpriteSheet('assets/die.png', 32, 32, 4);
      die_animation = loadAnimation(sprite_sheet);

      sprite_sheet = loadSpriteSheet('assets/bsodDie.png', 32, 32, 4);
      bsodDie_animation = loadAnimation(sprite_sheet);

      sprite_sheet = loadSpriteSheet('assets/popUpDeath.png', 32, 32, 4);
      popUpDeath_animation = loadAnimation(sprite_sheet);

      sprite_sheet = loadSpriteSheet('assets/dead.png', 32, 32, 1);
      dead_animation = loadAnimation(sprite_sheet);

      sprite_sheet = loadSpriteSheet('assets/sentient.png', 32, 32, 40);
      sentient_animation = loadAnimation(sprite_sheet);

      sprite_sheet = loadSpriteSheet('assets/sentientFirst.png', 32, 32, 10);
      sentientFirst_animation = loadAnimation(sprite_sheet);

      //load static images
      bg_image = loadImage("assets/background.png");
      sentient_text = loadImage('assets/sentientText.png');
      feed_icon = loadImage("assets/feed_button.png");
      feed_icon_roll = loadImage("assets/feed_button_roll.png");
      energy_icon = loadImage("assets/feed_button.png");
      energy_icon_roll = loadImage("assets/feed_button_roll.png");
      virus_icon = loadImage("assets/feed_button.png");
      virus_icon_roll = loadImage("assets/feed_button_roll.png");
      reboot_icon = loadImage("assets/feed_button.png");
      reboot_icon_roll = loadImage("assets/feed_button_roll.png");
      light_on = loadImage("assets/lightOn.png");
      light_off = loadImage("assets/lightOff.png");


      //load sound

      battery_sound = loadSound('assets/battery.wav');
      die_sound = loadSound("assets/die.wav");
      popUp_sound = loadSound('assets/popup.wav');
      floppy_sound = loadSound('assets/floppy.mp3');
      bsod_sound = loadSound('assets/bsod.mp3');
      sentient_sound = loadSound('assets/sentient.wav');


      //change the speed of the animation, higher delay = slower speed
      idle_animation.frameDelay = 14;
      die_animation.frameDelay = 14;
      hungry_animation.frameDelay = 14;
      charge_animation.frameDelay = 14;
      bsod_animation.frameDelay = 14;
      bsodDie_animation.frameDelay = 14;
      popUp_animation.frameDelay = 14;
      popUpDeath_animation.frameDelay = 14;
      sentient_animation.frameDelay = 8;
      sentientFirst_animation.frameDelay = 22;
    }

    function setup() {
      var canvas = createCanvas(32, 36);
      canvas.style("width", width * pixelScale + "px");
      canvas.style("height", height * pixelScale + "px");
      noSmooth();

      //==============create a sprite character at position x, y, width, height===============
      character = createSprite(16, 16, 32, 32);
      //add all the animations ("label", animation_variable)
      //I will use the label later
      character.addAnimation('idle', idle_animation);
      character.addAnimation('eat', eat_animation);
      character.addAnimation('hungry', hungry_animation);
      character.addAnimation('battery', battery_animation);
      character.addAnimation('charge', charge_animation);
      character.addAnimation('popUp', popUp_animation);
      character.addAnimation('popUpFinal', popUpFinal_animation)
      character.addAnimation('bsod', bsod_animation);
      character.addAnimation('blueScreen', blueScreen_animation);
      character.addAnimation('die', die_animation);
      character.addAnimation('bsodDie', bsodDie_animation);
      character.addAnimation('popUpDeath', popUpDeath_animation);
      character.addAnimation('dead', dead_animation);
      character.addAnimation('sentient', sentient_animation);
      character.addAnimation('sentientFirst', sentientFirst_animation);
      //=================================================================================


      //=======================create a sprite for the button===========================
      feed = createSprite(4, 32, 4, 4);
      energy = createSprite(12, 32, 4, 4);
      virus = createSprite(20, 32, 4, 4);
      reboot = createSprite(28, 32, 4, 4);
      hungrylight = createSprite(11, 22.5, 1, 1);
      batterylight = createSprite(12.25, 22.5, 1, 1);
      viruslight = createSprite(13.75, 22.5, 1, 1);
      rebootlight = createSprite(15.25, 22.5, 1, 1);
      //assign a p5 image as appearance
      feed.addImage(feed_icon);
      energy.addImage(energy_icon);
      virus.addImage(virus_icon);
      reboot.addImage(reboot_icon);
      hungrylight.addImage(light_off);
      batterylight.addImage(light_off);
      viruslight.addImage(light_off);
      rebootlight.addImage(light_off);
      //===================end of sprite loading============================

      //assign a function to be called when the button is clicked
      feed.onMousePressed = function() {
        //feed only if the animation is idle or hungry to avoid cutting off the other animations
        if (character.getAnimationLabel() == "idle" && hunger >= 6) {

          //reduce hunger
          hunger -= int(random(5, 7)) - difficulty;
          hungrylight.addImage(light_off);

          //if fed
          if (hunger >= 0) {
            character.changeAnimation("eat");
            //rewind the animation to make sure it's playing from the beginning
            character.animation.rewind();
            floppy_sound.play();
          }
        }
      }
      energy.onMousePressed = function() {
        //feed only if the animation is idle or hungry to avoid cutting off the other animations
        if (character.getAnimationLabel() == "idle" && charge >= 6) {

          //reduce hunger
          charge -= int(random(5, 7)) - difficulty;
          batterylight.addImage(light_off);

          //if fed
          if (charge >= 0) {
            character.changeAnimation("battery");
            //rewind the animation to make sure it's playing from the beginning
            character.animation.rewind();
            battery_sound.play();
          }
        }
      }
      reboot.onMousePressed = function() {
        //feed only if the animation is idle or hungry to avoid cutting off the other animations
        if (character.getAnimationLabel() == "blueScreen") {

          rebootBool = false;
          difficulty++; //difficulty increases with each BSOD
          rebootlight.addImage(light_off);
          character.changeAnimation("idle");
          character.animation.rewind();
        }
      }
      virus.onMousePressed = function() {
        //feed only if the animation is idle or hungry to avoid cutting off the other animations
        if (character.getAnimationLabel() == "popUpFinal") {

          popUpBool = false;
          difficulty++;
          viruslight.addImage(light_off);
          character.changeAnimation("idle");
          character.animation.rewind();
        }
      }
      //================when the mouse goes on over the button change the image=============
      feed.onMouseOver = function() {
        feed.addImage(feed_icon_roll);
      }
      energy.onMouseOver = function() {
        energy.addImage(energy_icon_roll);
      }
      virus.onMouseOver = function() {
        virus.addImage(virus_icon_roll);
      }
      reboot.onMouseOver = function() {
        reboot.addImage(reboot_icon_roll);
      }

      //when the mouse exits the button restore the image
      feed.onMouseOut = function() {
        feed.addImage(feed_icon);
      }
      energy.onMouseOut = function() {
        energy.addImage(energy_icon);
      }
      virus.onMouseOut = function() {
        virus.addImage(virus_icon);
      }
      reboot.onMouseOut = function() {
        reboot.addImage(reboot_icon);
      }
    } //======================================================

    function draw() {
      background(0);
      image(bg_image, 0, 0);

      //increase hunger every 2 seconds - 60 frames per second
      //frameCount is the number of frames since start
      if (frameCount % 60 * 2 == 0) {
        if (dead == false) {
          hunger++;
          charge++;
          cycles++;
          if (debug == true) {
            print("hunger: " + hunger);
            print("charge: " + charge);
          }
        }

        if (rebootBool == false && character.getAnimationLabel() == "idle") {
          var rand = rebootArray[Math.floor(Math.random() * rebootArray.length)];
          if (rand == 1) {
            rebootBool = true;
          }
          if (debug == true) {
            print("reboot: " + rand);
          }
        }
        if (popUpBool == false && character.getAnimationLabel() == "idle") {
          var rand = popUpArray[Math.floor(Math.random() * popUpArray.length)];
          if (rand == 1) {
            popUpBool = true;
          }
          if (debug == true) {
            print("popUp: " + rand);
          }
        }
      }
      //========update display lights==============================================
      if (hunger >= 6 && dead == false && character.getAnimationLabel() == "idle") {
        hungrylight.addImage(light_on);
      }
      if (charge >= 6 && dead == false && character.getAnimationLabel() == "idle") {
        batterylight.addImage(light_on);
      }
      if (rebootBool == true && dead == false && character.getAnimationLabel() == "idle") {
        rebootlight.addImage(light_on);
        bsod_sound.play();
        character.changeAnimation("bsod");
        character.animation.rewind();
      }
      if (popUpBool == true && dead == false && character.getAnimationLabel() == "idle") {
        viruslight.addImage(light_on);
        popUp_sound.play();
        character.changeAnimation("popUp");
        character.animation.rewind();
      }
      //==============================================================================================
      function deathProcess() {
        dead = true;
        die_sound.play();
        feed.remove(); //remove the button sprite
        energy.remove();
        virus.remove();
        reboot.remove();
        hungrylight.addImage(light_off);
        batterylight.addImage(light_off);
        rebootlight.addImage(light_off);
        viruslight.addImage(light_off);
      }

      //=================================================== end game triggers triggers ===========================================
      if ((hunger >= MAX_HUNGER && dead == false && rebootBool == false && popUpBool == true) || (charge >= MAX_CHARGE && dead == false && rebootBool == false && popUpBool == true)) {
        character.changeAnimation("popUpDeath");
        deathProcess();
      }
      if ((hunger >= MAX_HUNGER && dead == false && rebootBool == false && popUpBool == false) || (charge >= MAX_CHARGE && dead == false && rebootBool == false && popUpBool == false)) {
        character.changeAnimation("die");
        deathProcess();
      }
      if ((hunger >= MAX_HUNGER && dead == false && rebootBool == true && popUpBool == false) || (charge >= MAX_CHARGE && dead == false && rebootBool == true && popUpBool == false)) {
        character.changeAnimation("bsodDie");
        deathProcess();
      }
      if (dead == false && cycles >= MAX_CYCLES) {
        character.changeAnimation("sentientFirst");
        deathProcess();
      }
      //=================================================================================================

      //theres probably a cleaner way to do this, but I'm not sure how to keep an animation static on its last frame
      if (character.getAnimationLabel() == "eat" && character.animation.getFrame() == character.animation.getLastFrame()) {
        character.changeAnimation("idle");
      }
      if (character.getAnimationLabel() == "battery" && character.animation.getFrame() == character.animation.getLastFrame()) {
        character.changeAnimation("idle");
      }
      if (character.getAnimationLabel() == "bsod" && character.animation.getFrame() == character.animation.getLastFrame()) {
        character.changeAnimation("blueScreen");
      }
      if (character.getAnimationLabel() == "popUp" && character.animation.getFrame() == character.animation.getLastFrame()) {
        character.changeAnimation("popUpFinal");
      }
      if (character.getAnimationLabel() == "die" && character.animation.getFrame() == character.animation.getLastFrame()) {
        character.changeAnimation("dead");
      }
      if (character.getAnimationLabel() == "bsodDie" && character.animation.getFrame() == character.animation.getLastFrame()) {
        character.changeAnimation("dead");
      }
      if (character.getAnimationLabel() == "popUpDeath" && character.animation.getFrame() == character.animation.getLastFrame()) {
        character.changeAnimation("dead");
      }
      if (character.getAnimationLabel() == "sentientFirst" && character.animation.getFrame() == character.animation.getLastFrame()) {
        character.changeAnimation("sentient");
      }
      if (character.getAnimationLabel() == "sentient" && character.animation.getFrame() == 6) {
        sentient_sound.play();
      }
      //draw all the sprites: character, button (in order of creation)
      drawSprites();
    }