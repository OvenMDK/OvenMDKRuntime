
var example = new OEntity('Example', 'example');

//this is meant as an exmaple to show that this can be done through both functions and direct property access
//none of this has been actually implemented yet

//base64 png image
example.setTexture('');
example.entityTexture = '';

//json model
example.setModel('{}');
example.entityModel = '{}';

//spawn egg (base, spot colors)
example.createSpawnEgg(0x5e3e2d, 0x269166);

//item needed, delay in ticks
example.makeBreedable('wheat', 2000);
example.setBreedingCooldown(2000); //ticks
example.breedable = true;
example.breedItem = 'wheat';
example.breedingCooldown = 2000; //ticks

//loot tables will be added later
//item, min amount, max amount
example.addDropItem('feather', 0, 2);
example.dropItem = 'feather';

example.setHealth(20);
example.maxHealth = 20;

//wip
var sounds = example.createSoundObject('random');
sounds.addSound('1', 'soundfile');
example.setMainSound(sounds); //whis will be changed later

example.registerOEntity();