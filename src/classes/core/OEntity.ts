import OItem from "./OItem";
import OSpawnegg from "./OSpawnegg";

export default class OEntity {
  public entityTexture: string;
  private entityName: string;
  private entityID: string;
  public entityModel: string;
  private entity_sound_main: string;
  public entityBreedItem: string;
  public entityDropItem: string;
  private eggBase: any;
  private eggSpots: any;
  private extra_tasks: any[];
  constructor(
    entityName: string,
    entityID: string,
  ) {
    this.entityName = entityName;
    this.entityID = entityID;
  }
  private async waitForRenderManager() {
    return new Promise((res: any, rej: any) => {
      function check() {
        if (ModAPI.mc.renderManager) {
          res();
        } else {
          setTimeout(check, 1 / 20);
        }
      }
      check();
    });
  }



  private registerEntityClient() {
    console.warn("OEntitys are still in development, expect bugs and issues");
    //return;
    ModAPI.hooks.methods.jl_String_format =
      ModAPI.hooks.methods.nlev_HString_format; //temporary thing to fix an issue in eaglercraft
    // Utils
    function AITask(name, length) {
      return ModAPI.reflect
        .getClassById("net.minecraft.entity.ai." + name)
        .constructors.find((x) => x.length === length);
    }
    const ResourceLocation = ModAPI.reflect
      .getClassByName("ResourceLocation")
      .constructors.find((x) => x.length === 1);
    const EntityPlayer = ModAPI.reflect.getClassByName("EntityPlayer");
    const GlStateManager = Object.fromEntries(
      Object.values(
        ModAPI.reflect.getClassByName("GlStateManager").staticMethods
      ).map((x) => [x.methodNameShort, x.method])
    );
    const SharedMonsterAttributes = ModAPI.reflect.getClassByName(
      "SharedMonsterAttributes"
    ).staticVariables;
    var entityBreedItem2: string = this.entityBreedItem;
    var entityDropItem2: string = this.entityDropItem;
    // START CUSTOM ENTITY
    let entitySize1: number; // Default size for most entities
    let entitySize2: number;

    if (this.entityModel === "ModelChicken") {
      entitySize1 = 0.4; // Chicken
      entitySize2 = 0.7;
    } else if (this.entityModel === "ModelCow") {
      entitySize1 = 0.9; // Cow
      entitySize2 = 1.4;
    } else if (this.entityModel === "ModelMooshroom") {
      entitySize1 = 0.9; // Mooshroom
      entitySize2 = 1.4;
    } else if (this.entityModel === "ModelPig") {
      entitySize1 = 0.9; // Pig
      entitySize2 = 0.9;
    } else if (this.entityModel === "ModelSheep") {
      entitySize1 = 0.9; // Sheep
      entitySize2 = 1.3;
    } else if (this.entityModel === "ModelHorse") {
      entitySize1 = 1.3965; // Horse
      entitySize2 = 1.6; // Height can vary slightly
    } else if (this.entityModel === "ModelRabbit") {
      entitySize1 = 0.4; // Rabbit
      entitySize2 = 0.5;
    } else if (this.entityModel === "ModelSquid") {
      entitySize1 = 0.8; // Squid
      entitySize2 = 0.8;
    } else if (this.entityModel === "ModelBat") {
      entitySize1 = 0.5; // Bat
      entitySize2 = 0.9;
    } else if (this.entityModel === "ModelOcelot") {
      entitySize1 = 0.6; // Ocelot (wild)
      entitySize2 = 0.7;
    } else if (this.entityModel === "ModelWolf") {
      entitySize1 = 0.6; // Wolf
      entitySize2 = 0.85;
    } else if (this.entityModel === "ModelVillager") {
      entitySize1 = 0.6; // Villager
      entitySize2 = 1.95;
    } else if (this.entityModel === "ModelIronGolem") {
      entitySize1 = 1.4; // Iron Golem
      entitySize2 = 2.9;
    } else if (
      this.entityModel === "ModelSnowman" ||
      this.entityModel === "ModelSnowGolem"
    ) {
      entitySize1 = 0.7; // Snow Golem
      entitySize2 = 1.9;
    }

    var entityClass = ModAPI.reflect.getClassById(
      "net.minecraft.entity.passive.EntityAnimal"
    );
    var entitySuper = ModAPI.reflect.getSuper(
      entityClass,
      (x) => x.length === 2
    );
    if (globalThis.Debug_mode) {
      console.warn(
        `this is entity size 1: ${entitySize1}, this is entity size 2: ${entitySize2}, oh the breeditem ${entityBreedItem2}, and dropItem ${entityDropItem2}`
      );
    };
    var entityBreedItem2: string = this.entityBreedItem;
    var entityDropItem2: string = this.entityDropItem;
    var item_ref = ModAPI.items[entityBreedItem2].getRef();
    var extra_tasks = this.extra_tasks || [];
    var nme_OEntity = function nme_OEntity($worldIn) {
      entitySuper(this, $worldIn);
      this.wrapped ||= ModAPI.util.wrap(this).getCorrective();

      this.wrapped.setSize(entitySize1 || 0.4, entitySize2 || 0.7);
      this.wrapped.tasks.addTask(0, AITask("EntityAISwimming", 1)(this));
      this.wrapped.tasks.addTask(1, AITask("EntityAIPanic", 2)(this, 1.9));
      this.wrapped.tasks.addTask(2, AITask("EntityAIMate", 2)(this, 1.0));
      try {
        this.wrapped.tasks.addTask(
          3,
          AITask("EntityAITempt", 4)(this, 1.5, item_ref, 0)
        );
      } catch (e) {
        console.warn(
          `Failed to add EntityAITempt task for ${this.entityID}. This may be due to an incorrect item reference, ${item_ref}, ( item ref), and ${item_ref()}, (item_ref())`
        );
        this.wrapped.tasks.addTask(
          3,
          AITask("EntityAITempt", 4)(this, 1.5, item_ref(), 0)
        );
      };
      this.wrapped.tasks.addTask(
        4,
        AITask("EntityAIFollowParent", 2)(this, 1.2)
      );
      this.wrapped.tasks.addTask(5, AITask("EntityAIWander", 2)(this, 1.1));
      this.wrapped.tasks.addTask(
        6,
        AITask("EntityAIWatchClosest", 3)(
          this,
          ModAPI.util.asClass(EntityPlayer.class),
          6
        )
      );
      this.wrapped.tasks.addTask(7, AITask("EntityAILookIdle", 1)(this));
      extra_tasks.forEach(element => {
        try {
          element(this);
        } catch (e) {
          console.warn(
            `Failed to add extra task for ${this.entityID}. This may be due to an incorrect task function, ${element}, or the task function not being compatible with the entity.`
          );
        }
      });
    };
    ModAPI.reflect.prototypeStack(entityClass, nme_OEntity);
    nme_OEntity.prototype.$getEyeHeight = function () {
      this.wrapped ||= ModAPI.util.wrap(this).getCorrective();
      return this.wrapped.height;
    };

    const originalApplyEntityAttributes =
      nme_OEntity.prototype.$applyEntityAttributes;
    nme_OEntity.prototype.$applyEntityAttributes = function () {
      this.wrapped ||= ModAPI.util.wrap(this).getCorrective();
      originalApplyEntityAttributes.apply(this, []);
      this.wrapped
        .getEntityAttribute(SharedMonsterAttributes.maxHealth)
        .setBaseValue(5);
      this.wrapped
        .getEntityAttribute(SharedMonsterAttributes.movementSpeed)
        .setBaseValue(0.25);
    };

    const originalLivingUpdate = nme_OEntity.prototype.$onLivingUpdate;
    nme_OEntity.prototype.$onLivingUpdate = function () {
      this.wrapped ||= ModAPI.util.wrap(this).getCorrective();
      originalLivingUpdate.apply(this, []);
      if (this.wrapped.isInWater()) {
        this.wrapped.motionY *= 0.5;
        this.wrapped
          .getEntityAttribute(SharedMonsterAttributes.movementSpeed)
          .setBaseValue(1.4);
      } else {
        this.wrapped
          .getEntityAttribute(SharedMonsterAttributes.movementSpeed)
          .setBaseValue(0.25);
      }
    };

    nme_OEntity.prototype.$getLivingSound = function () {
      return ModAPI.util.str("mob." + this.entityID + ".main_sound");
    };
    nme_OEntity.prototype.$getHurtSound = function () {
      return ModAPI.util.str("mob." + this.entityID + ".main_sound");
    };
    nme_OEntity.prototype.$getDeathSound = function () {
      return ModAPI.util.str("mob." + this.entityID + ".main_sound");
    };
    nme_OEntity.prototype.$playStepSound = function () {
      this.wrapped ||= ModAPI.util.wrap(this).getCorrective();
      this.wrapped.playSound(
        ModAPI.util.str("mob." + this.entityID + ".step"),
        0.2,
        1
      );
    };
    nme_OEntity.prototype.$getDropItem = function () {
      return ModAPI.items[this.entityDropItem].getRef();
    };
    nme_OEntity.prototype.$createChild = function (otherParent) {
      this.wrapped ||= ModAPI.util.wrap(this).getCorrective();
      return new nme_OEntity(this.wrapped.worldObj?.getRef() ?? null);
    };

    nme_OEntity.prototype.$isBreedingItem = function (itemstack) {
      return (
        itemstack !== null &&
        itemstack.$getItem() === ModAPI.items[entityBreedItem2].getRef()
      );
    };
    // END CUSTOM ENTITY

    // START CUSTOM MODEL
    var modelChickenClass = ModAPI.reflect.getClassById(
      `net.minecraft.client.model.${this.entityModel}`
    );
    var modelChickenSuper = ModAPI.reflect.getSuper(modelChickenClass); //while super isn't used when extending this class, java implies the call.
    var nmcm_OEntityModel = function nmcm_OEntityModel() {
      modelChickenSuper(this);
    };
    ModAPI.reflect.prototypeStack(modelChickenClass, nmcm_OEntityModel);
    // END CUSTOM MODEL

    // START CUSTOM RENDERER
    var renderClass = ModAPI.reflect.getClassById(
      "net.minecraft.client.renderer.entity.RenderLiving"
    );
    var renderSuper = ModAPI.reflect.getSuper(
      renderClass,
      (x) => x.length === 4
    );
    const duckTextures = ResourceLocation(
      ModAPI.util.str(`textures/entity/${this.entityID}.png`)
    );
    var nmcre_RenderOEntity = function nmcre_RenderOEntity(
      renderManager,
      modelBaseIn,
      shadowSizeIn
    ) {
      renderSuper(this, renderManager, modelBaseIn, shadowSizeIn);
    };
    ModAPI.reflect.prototypeStack(renderClass, nmcre_RenderOEntity);
    nmcre_RenderOEntity.prototype.$getEntityTexture = function (entity) {
      return duckTextures;
    };
    nmcre_RenderOEntity.prototype.$handleRotationFloat = function (
      entity,
      partialTicks
    ) {
      entity = ModAPI.util.wrap(entity);
      if (!entity.onGround && !entity.isInWater()) {
        return 2; //falling
      } else {
        return 0;
      }
    };

    const ID = ModAPI.keygen.entity(this.entityID);
    ModAPI.reflect
      .getClassById("net.minecraft.entity.EntityList")
      .staticMethods.addMapping0.method(
        ModAPI.util.asClass(nme_OEntity),
        {
          $createEntity: function ($worldIn) {
            return new nme_OEntity($worldIn);
          },
        },
        ModAPI.util.str(this.entityID.toUpperCase()),
        ID,
        this.eggBase || 0x5e3e2d, //egg base
        this.eggSpots || 0x269166 //egg spots
      );

    const SpawnPlacementType = ModAPI.reflect.getClassById(
      "net.minecraft.entity.EntityLiving$SpawnPlacementType"
    ).staticVariables;
    const ENTITY_PLACEMENTS = ModAPI.util.wrap(
      ModAPI.reflect.getClassById(
        "net.minecraft.entity.EntitySpawnPlacementRegistry"
      ).staticVariables.ENTITY_PLACEMENTS
    );
    ENTITY_PLACEMENTS.put(
      ModAPI.util.asClass(nme_OEntity),
      SpawnPlacementType.ON_GROUND
    );
    ModAPI.addEventListener("bootstrap", () => {
      const SpawnListEntry = ModAPI.reflect
        .getClassById("net.minecraft.world.biome.BiomeGenBase$SpawnListEntry")
        .constructors.find((x) => x.length === 4);
      const BiomeGenSwamp = ModAPI.util.wrap(
        ModAPI.reflect.getClassById("net.minecraft.world.biome.BiomeGenBase")
          .staticVariables.swampland
      );
      const BiomeGenRiver = ModAPI.util.wrap(
        ModAPI.reflect.getClassById("net.minecraft.world.biome.BiomeGenBase")
          .staticVariables.river
      );
      const BiomeGenBeach = ModAPI.util.wrap(
        ModAPI.reflect.getClassById("net.minecraft.world.biome.BiomeGenBase")
          .staticVariables.beach
      );
      const duckSpawnSwamp = SpawnListEntry(
        ModAPI.util.asClass(nme_OEntity),
        22,
        3,
        5
      );
      const duckSpawnRiverBed = SpawnListEntry(
        ModAPI.util.asClass(nme_OEntity),
        10,
        5,
        9
      );
      const duckSpawnBeach = SpawnListEntry(
        ModAPI.util.asClass(nme_OEntity),
        24,
        2,
        3
      );
      console.log(nme_OEntity);
      BiomeGenSwamp.spawnableCreatureList.add(duckSpawnSwamp);
      BiomeGenRiver.spawnableCreatureList.add(duckSpawnRiverBed);
      BiomeGenBeach.spawnableCreatureList.add(duckSpawnBeach);
    });

    ModAPI.addEventListener("lib:asyncsink", async () => {
      AsyncSink.L10N.set(
        `entity.${this.entityID.toUpperCase()}.name`,
        this.entityName
      );
    });

    return {
      [`Entity${this.entityID.toUpperCase()}`]: nme_OEntity,
      [`Model${this.entityID.toUpperCase()}`]: nmcm_OEntityModel,
      [`Render${this.entityID.toUpperCase()}`]: nmcre_RenderOEntity,
      [`${this.entityID}Textures`]: duckTextures,
    };
  }

  private registerOEntity() {
    if (ModAPI.is_1_12) {
      return console.warn("OEntitys dont work in 1.12, and one of your mods are trying to use it! Please switch to 1.8.8")
    }
    ModAPI.dedicatedServer.appendCode(
      `globalThis.registerEntityServer("${this.entityID}", "${this.entityName}", "${this.entityModel}", "${this.entityBreedItem}", "${this.entityDropItem}", ${this.eggBase}, ${this.eggSpots});`
    );
    var data = this.registerEntityClient();

    ModAPI.addEventListener("lib:asyncsink", async () => {
      AsyncSink.setFile(
        `resourcepacks/AsyncSinkLib/assets/minecraft/textures/entity/${this.entityID}.png`,
        await (await fetch(this.entityTexture)).arrayBuffer()
      );
      AsyncSink.hideFile(
        `resourcepacks/AsyncSinkLib/assets/minecraft/textures/entity/${this.entityID}.png.mcmeta`
      );

      await this.waitForRenderManager();

      AsyncSink.setFile(
        `resourcepacks/AsyncSinkLib/assets/minecraft/sounds/mob/${this.entityID}/main_sound.ogg`,
        await (await fetch(`${this.entity_sound_main}`)).arrayBuffer()
      );
      AsyncSink.Audio.register(
        "mob." + this.entityID + ".main_sound",
        AsyncSink.Audio.Category.ANIMALS,
        [
          {
            path: `sounds/mob/${this.entityID}/main_sound.ogg`,
            pitch: 1,
            volume: 1,
            streaming: false, //use for large audio files
          },
        ]
      );
      AsyncSink.setFile(
        `resourcepacks/AsyncSinkLib/assets/minecraft/sounds/mob/${this.entityID}/step.ogg`,
        await (
          await fetch(
            "data:audio/ogg;base64,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LbZYa60159RajDHWmmvOvafWYoyx1ppz7r0AAJMHBwCoBBtnWEk6KxwNLjRkJQCQGwCAIMSYc85BCCGEEEIIIVKKMecghBBCCCGUUkqkFGPOQQghhBBCCCGEjDHnoIMQQgillFJKKRljzkEIIYQQSiilhBI656CDEEIJpZRSSimldM45CCGEEEoppZRSSukghBBCCKWUUkoppZTSQQghhFBKKaWUUkopJYQQQgillFJKKaWUUkoIIYQQSimllFJKKaWUEEIIpZRSSimllFJKKSGEEEoppZRSSimllFJCCKWUUkoppZRSSimlhBBKKaWUUkoppZRSSgmhlFJKKaWUUkoppZQSSimllFJKKaWUUkopJZRSSimllFJKKaWUUkoopZRSSimllFJKKaWUUEoppZRSSimllFJKKaGUUkoppZRSSimllFIKAAA6cAAACDCi0kLsNOPKI3BEIcMEVGjISgAgHAAAQAQ6CCGEEEIIEXMQQgghhBBCiJiDEEIIIYQQQgghhBBCCKWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaUUAHWZ4QAYPWHjDCtJZ4WjwYWGrAQA0gIAAGMYY4wpyKSzFmOtDWMQQgedhBRqqCWmhjEIIXRQSkottlhzBqGkUkpJLcZYg809g1BKKaWkFmOtORfjQUglpdRiq7XnHIzuIJSSUkox1ppz7r1o0ElJqbVac+49B188CKWk1lqMPQcfjDCilJZirLHWHHwRRhhRSkstxpp7zb0YY4RKKcZae86551yMET6lFmOuufcefC7C+OJizDn34oMPPghhjJAx5thz8L0XY4wPwshccy7CGOOLMML4IGytuQdfjBFGGGN87zX4oHsxwggjjDHCCN1z0UX4YowxRhhfhAEAuREOAIgLRhJSZxlWGnHjCRgikEJDVgEAMQAABDHGIKSQUkopxRhjjDHGGGOMMcYYY4wxxpxjzjnnnAAAwAQHAIAAK9iVWVq1UdzUSV70QeATOmIzMuRSKmZyIuiRGmqxEuzQCm7wArDQkJUAABkAAOSklJRaLRpCykFpNYjIIOUkxSQiY5CC0oKnkDGIScodYwohBal2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"
          )
        ).arrayBuffer()
      );
      AsyncSink.Audio.register(
        "mob." + this.entityID + ".step",
        AsyncSink.Audio.Category.ANIMALS,
        [
          {
            path: `sounds/mob/${this.entityID}/step.ogg`,
            pitch: 1,
            volume: 1,
            streaming: false, //use for large audio files
          },
        ]
      );

      ModAPI.mc.renderManager.entityRenderMap.put(
        ModAPI.util.asClass(data[`Entity${this.entityID.toUpperCase()}`]),
        new data[`Render${this.entityID.toUpperCase()}`](
          ModAPI.mc.renderManager.getRef(),
          new data[`Model${this.entityID.toUpperCase()}`](),
          0.3
        )
      );
      ModAPI.promisify(ModAPI.mc.renderEngine.bindTexture)(
        data[`${this.entityID}Textures`]
      ).then(() => {
        console.log("Loaded OEntity texture into cache.");
      });
    });
    console.log(data);
    const key = `OEntity.${this.entityID}`;
    globalThis[key] = data;
  }

  public createSpawnegg(base, spots) {
    
  }
}
