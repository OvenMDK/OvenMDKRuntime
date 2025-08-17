/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ASSETS/defaultIcon.png":
/*!************************************!*\
  !*** ./src/ASSETS/defaultIcon.png ***!
  \************************************/
/***/ ((module) => {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAj0lEQVQ4jWNk+M/wn4ECwESJZgYGBgYWhtOYgv9NsTuK8TQjpgF17YaYKtdhtw2bWpYXLxCcmcfOMTAwMDCkWxlhNQCbPIuEBKZCbGK45FFcgMtmdICsB6sLCAGcLsAF8IUNSS7AphavCwjFCtEuwKeGMc3SkKK8gNcFjesgXqgPwuMFYmIBnxrGukDKvAAAHHArSjk7MrsAAAAASUVORK5CYII=";

/***/ }),

/***/ "./src/classes/core/Helper_func.ts":
/*!*****************************************!*\
  !*** ./src/classes/core/Helper_func.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OvenMDK__defineExecCmdAsGlobal: () => (/* binding */ OvenMDK__defineExecCmdAsGlobal),
/* harmony export */   registerEntityServer: () => (/* binding */ registerEntityServer),
/* harmony export */   registerOvenOreServer: () => (/* binding */ registerOvenOreServer),
/* harmony export */   registerServerBlock: () => (/* binding */ registerServerBlock),
/* harmony export */   registerServerItem: () => (/* binding */ registerServerItem)
/* harmony export */ });
/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Helper_func.ts
    
    Copyright 2025 BendieGames and Block_2222
    Licenced under GNU LGPL-3.0-or-later
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    This file is part of OvenMDK.

    OvenMDK is free software: you can redistribute it and/or modify it under
    the terms of the GNU Lesser General Public License as published by the Free
    Software Foundation, either version 3 of the License, or (at your option)
    any later version.

    OvenMDK is distributed in the hope that it will be useful, but WITHOUT ANY
    WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License along
    with Oven MDK. If not, see <https://www.gnu.org/licenses/>.
*/
function registerServerItem(itemID, itemStack, onRightClick, onItemUse) {
    /*if (isServer === false) {
          console.log("registerServerItem can only be used on the server side.");
          return;
      }*/
    var creativeMiscTab;
    if (ModAPI.is_1_12) {
        creativeMiscTab = ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.MISC;
    }
    else {
        creativeMiscTab = ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabMisc;
    }
    var $$itemGetAttributes = ModAPI.reflect.getClassById("net.minecraft.item.Item").methods.getItemAttributeModifiers.method;
    var itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
    var itemSuper = ModAPI.reflect.getSuper(itemClass, function (fn) { return fn.length === 1; });
    /*if (isServer === true) {
          console.log("using server side registerServerItem");
      }*/
    function nmi_OvenItem() {
        itemSuper(this);
        this.$setCreativeTab(creativeMiscTab);
        this.$maxStackSize = itemStack;
    }
    ModAPI.reflect.prototypeStack(itemClass, nmi_OvenItem);
    if (!ModAPI.is_1_12) {
        nmi_OvenItem.prototype.$onItemRightClick = function ($$itemstack, $$world, $$player) {
            if (!ModAPI.is_1_12)
                $$player.$setItemInUse($$itemstack, 32);
            var $$itemstack, $$world, $$player;
            onRightClick($$itemstack, $$world, $$player);
            if (globalThis.Debug_mode) {
                console.log("server itemstack:");
                console.log($$itemstack);
            }
            return $$itemstack;
        };
    }
    if (ModAPI.is_1_12) {
        var $$ResultEnum = ModAPI.reflect.getClassByName("EnumActionResult").staticVariables;
        var $$ActionResult = ModAPI.reflect.getClassByName("ActionResult").constructors[0];
        nmi_OvenItem.prototype.$onItemRightClick = function ($$world, $$player, $handEnum, $unused) {
            var $$itemstack = $$player.$getHeldItem($handEnum);
            $$player.$setActiveHand($handEnum);
            var $$itemstack, $$world, $$player;
            onRightClick($$itemstack, $$world, $$player);
            if (globalThis.Debug_mode) {
                console.log("server itemstack:");
                console.log($$itemstack);
            }
            return $$ActionResult($$ResultEnum.SUCCESS, $$itemstack);
        };
    }
    if (!ModAPI.is_1_12) {
        nmi_OvenItem.prototype.$onItemUse0 = function ($$itemstack, $$player, $$world, $$blockpos) {
            var $$itemstack, $$world, $$player, $$blockpos;
            if (onItemUse) {
                onItemUse($$itemstack, $$world, $$player, $$blockpos);
            }
            ;
            console.log("client itemstack:");
            if (globalThis.Debug_mode) {
                console.log($$itemstack);
            }
            return 0;
        };
    }
    if (ModAPI.is_1_12) {
        var $$ResultEnum = ModAPI.reflect.getClassByName("EnumActionResult").staticVariables;
        nmi_OvenItem.prototype.$onItemUse = function ($$itemstack, $$player, $$world, $$blockpos) {
            var $$itemstack, $$player, $$world, $$blockpos;
            if (onItemUse) {
                onItemUse($$itemstack, $$world, $$player, $$blockpos);
            }
            return $$ResultEnum.PASS;
        };
    }
    nmi_OvenItem.prototype.$onUpdate = function ($$itemstack, $$world, $$player, $$hotbar_slot, $$is_held) {
        $$is_held = $$is_held ? true : false;
        return $$itemstack;
    };
    nmi_OvenItem.prototype.$onItemUseFinish = function ($$itemstack, $$world, $$player) {
        return $$itemstack;
    };
    nmi_OvenItem.prototype.$getMaxItemUseDuration = function () {
        return 32;
    };
    nmi_OvenItem.prototype.$getItemAttributeModifiers = function () {
        //1.12 works i think
        var $$attributemap = $$itemGetAttributes.apply(this, []);
        return $$attributemap;
    };
    nmi_OvenItem.prototype.$getStrVsBlock = function ($$itemstack, $$block) {
        return 1.0;
    };
    nmi_OvenItem.prototype.$onCreated = function ($$itemstack, $$world, $$player) {
        //1.12 works
        return;
    };
    nmi_OvenItem.prototype.$onBlockDestroyed = function ($$itemstack, $$world, $$block, $$blockpos, $$entity) {
        return 0;
    };
    var internal_reg = function () {
        var itemInstance = new nmi_OvenItem().$setUnlocalizedName(ModAPI.util.str("".concat(itemID)));
        itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("".concat(itemID)), ModAPI.util.str("".concat(itemID)), itemInstance);
        ModAPI.items["".concat(itemID)] = itemInstance;
        if (globalThis.Debug_mode) {
            console.log(itemInstance);
            console.log("Registered OvenMDK item ( Server Side )");
        }
        return itemInstance;
    };
    if (ModAPI.items) {
        return internal_reg();
    }
    else {
        ModAPI.addEventListener("bootstrap", internal_reg);
    }
}
function registerServerBlock(blockID, onBreak) {
    var BlockClass = ModAPI.reflect.getClassById("net.minecraft.block.Block");
    var ItemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
    var creativeTab;
    if (ModAPI.is_1_12) {
        creativeTab = ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.BUILDING_BLOCKS;
    }
    if (!ModAPI.is_1_12) {
        creativeTab = ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabBlock;
    }
    var blockSuper = ModAPI.reflect.getSuper(BlockClass, function (fn) { return fn.length === 2; });
    var breakBlockMethod = BlockClass.methods.breakBlock.method;
    function nmb_Oblock() {
        blockSuper(this, ModAPI.materials.rock.getRef());
        if (!ModAPI.is_1_12) {
            this.$defaultBlockState = this.$blockState.$getBaseState();
        }
        this.$setCreativeTab(creativeTab);
    }
    ModAPI.reflect.prototypeStack(BlockClass, nmb_Oblock);
    nmb_Oblock.prototype.$breakBlock = function ($world, $blockpos, $blockstate) {
        //onBreak($world, $blockpos, $blockstate);
        return breakBlockMethod(this, $world, $blockpos, $blockstate);
    };
    function fixupBlockIds() {
        var blockRegistry = ModAPI.util
            .wrap(ModAPI.reflect.getClassById("net.minecraft.block.Block").staticVariables
            .blockRegistry)
            .getCorrective();
        var BLOCK_STATE_IDS = ModAPI.util
            .wrap(ModAPI.reflect.getClassById("net.minecraft.block.Block").staticVariables
            .BLOCK_STATE_IDS)
            .getCorrective();
        blockRegistry.registryObjects.hashTableKToV.forEach(function (entry) {
            if (entry) {
                var block_1 = entry.value;
                var validStates = block_1.getBlockState().getValidStates();
                var stateArray = validStates.array || [validStates.element];
                stateArray.forEach(function (iblockstate) {
                    var i = (blockRegistry.getIDForObject(block_1.getRef()) << 4) |
                        block_1.getMetaFromState(iblockstate.getRef());
                    BLOCK_STATE_IDS.put(iblockstate.getRef(), i);
                });
            }
        });
    }
    var internalRegister = function () {
        var custom_block;
        if (!ModAPI.is_1_12) {
            custom_block = new nmb_Oblock()
                .$setHardness(3.0)
                .$setStepSound(BlockClass.staticVariables.soundTypePiston)
                .$setUnlocalizedName(ModAPI.util.str(blockID));
        }
        if (ModAPI.is_1_12) {
            custom_block = new nmb_Oblock()
                .$setHardness(3.0)
                .$setSoundType(ModAPI.blockSounds.PLANT.getRef())
                .$setUnlocalizedName(ModAPI.util.str(blockID));
        }
        BlockClass.staticMethods.registerBlock0.method(ModAPI.keygen.block(blockID), ModAPI.util.str(blockID), custom_block);
        ItemClass.staticMethods.registerItemBlock0.method(custom_block);
        fixupBlockIds();
        ModAPI.blocks[blockID] = custom_block;
        if (globalThis.Debug_mode) {
            console.log("Registering block on server side");
            console.log(custom_block);
        }
        return custom_block;
    };
    if (!ModAPI.is_1_12) {
        if (ModAPI.materials) {
            return internalRegister();
        }
        else {
            ModAPI.addEventListener("bootstrap", internalRegister);
        }
    }
    if (ModAPI.is_1_12) {
        var blockClass = ModAPI.reflect.getClassById("net.minecraft.block.Block");
        var itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        ModAPI.addEventListener("bootstrap", function () {
            var custom_block = new nmb_Oblock()
                .$setHardness(3.0)
                .$setSoundType(ModAPI.blockSounds.PLANT.getRef())
                .$setUnlocalizedName(ModAPI.util.str(blockID));
            blockClass.staticMethods.registerBlock0.method(ModAPI.keygen.block(blockID), ModAPI.util.str(blockID), custom_block);
            itemClass.staticMethods.registerItemBlock0.method(custom_block);
            fixupBlockIds();
            ModAPI.blocks[blockID] = custom_block;
            if (globalThis.Debug_mode) {
                console.log("Registering block on server side");
                console.log(custom_block);
            }
        });
    }
}
function registerEntityServer(entityID, entityName, entityModel, entityBreedItem, entityDropItem, eggBase, eggSpots) {
    console.log("entities are not finished yet! Use at your own risk!");
    //return;
    ModAPI.hooks.methods.jl_String_format =
        ModAPI.hooks.methods.nlev_HString_format; //temporary thing to fix an issue in eaglercraft
    // Utils
    function AITask(name, length) {
        return ModAPI.reflect
            .getClassById("net.minecraft.entity.ai." + name)
            .constructors.find(function (x) { return x.length === length; });
    }
    var ResourceLocation = ModAPI.reflect
        .getClassByName("ResourceLocation")
        .constructors.find(function (x) { return x.length === 1; });
    var EntityPlayer = ModAPI.reflect.getClassByName("EntityPlayer");
    var GlStateManager = Object.fromEntries(Object.values(ModAPI.reflect.getClassByName("GlStateManager").staticMethods).map(function (x) { return [x.methodNameShort, x.method]; }));
    var SharedMonsterAttributes = ModAPI.reflect.getClassByName("SharedMonsterAttributes").staticVariables;
    // START CUSTOM ENTITY
    var entitySize1;
    var entitySize2;
    if (entityModel === "ModelChicken") {
        entitySize1 = 0.4; // Chicken
        entitySize2 = 0.7;
    }
    else if (entityModel === "ModelCow") {
        entitySize1 = 0.9; // Cow
        entitySize2 = 1.4;
    }
    else if (entityModel === "ModelMooshroom") {
        entitySize1 = 0.9; // Mooshroom
        entitySize2 = 1.4;
    }
    else if (entityModel === "ModelPig") {
        entitySize1 = 0.9; // Pig
        entitySize2 = 0.9;
    }
    else if (entityModel === "ModelSheep") {
        entitySize1 = 0.9; // Sheep
        entitySize2 = 1.3;
    }
    else if (entityModel === "ModelHorse") {
        entitySize1 = 1.3965; // Horse
        entitySize2 = 1.6; // Height can vary slightly
    }
    else if (entityModel === "ModelRabbit") {
        entitySize1 = 0.4; // Rabbit
        entitySize2 = 0.5;
    }
    else if (entityModel === "ModelSquid") {
        entitySize1 = 0.8; // Squid
        entitySize2 = 0.8;
    }
    else if (entityModel === "ModelBat") {
        entitySize1 = 0.5; // Bat
        entitySize2 = 0.9;
    }
    else if (entityModel === "ModelOcelot") {
        entitySize1 = 0.6; // Ocelot (wild)
        entitySize2 = 0.7;
    }
    else if (entityModel === "ModelWolf") {
        entitySize1 = 0.6; // Wolf
        entitySize2 = 0.85;
    }
    else if (entityModel === "ModelVillager") {
        entitySize1 = 0.6; // Villager
        entitySize2 = 1.95;
    }
    else if (entityModel === "ModelIronGolem") {
        entitySize1 = 1.4; // Iron Golem
        entitySize2 = 2.9;
    }
    else if (entityModel === "ModelSnowman" ||
        entityModel === "ModelSnowGolem") {
        entitySize1 = 0.7; // Snow Golem
        entitySize2 = 1.9;
    }
    var entityClass = ModAPI.reflect.getClassById("net.minecraft.entity.passive.EntityAnimal");
    if (!ModAPI.items) {
        ModAPI.addEventListener("bootstrap", function () {
            if (globalThis.Debug_mode) {
                console.warn("this is entity size on server 1: ".concat(entitySize1, ", this is entity size 2: ").concat(entitySize2, ", breed item ").concat(entityBreedItem));
            }
            var entityDropItem2 = entityDropItem;
            var item_ref = ModAPI.items[entityBreedItem].getRef();
            var entitySuper = ModAPI.reflect.getSuper(entityClass, function (x) { return x.length === 2; });
            var nme_OEntity = function nme_OEntity($worldIn) {
                entitySuper(this, $worldIn);
                this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
                this.wrapped.setSize(entitySize1 || 0.4, entitySize2 || 0.7);
                this.wrapped.tasks.addTask(0, AITask("EntityAISwimming", 1)(this));
                this.wrapped.tasks.addTask(1, AITask("EntityAIPanic", 2)(this, 1.9));
                this.wrapped.tasks.addTask(2, AITask("EntityAIMate", 2)(this, 1.0));
                try {
                    this.wrapped.tasks.addTask(3, AITask("EntityAITempt", 4)(this, 1.5, item_ref, 0));
                }
                catch (e) {
                    console.warn("Failed to add EntityAITempt task for ".concat(this.entityID, ". This may be due to an incorrect item reference, ").concat(item_ref, ", ( item ref), and ").concat(item_ref(), ", (item_ref())"));
                    this.wrapped.tasks.addTask(3, AITask("EntityAITempt", 4)(this, 1.5, item_ref(), 0));
                }
                ;
                this.wrapped.tasks.addTask(4, AITask("EntityAIFollowParent", 2)(this, 1.2));
                this.wrapped.tasks.addTask(5, AITask("EntityAIWander", 2)(this, 1.1));
                this.wrapped.tasks.addTask(6, AITask("EntityAIWatchClosest", 3)(this, ModAPI.util.asClass(EntityPlayer.class), 6));
                this.wrapped.tasks.addTask(7, AITask("EntityAILookIdle", 1)(this));
            };
            ModAPI.reflect.prototypeStack(entityClass, nme_OEntity);
            nme_OEntity.prototype.$getEyeHeight = function () {
                this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
                return this.wrapped.height;
            };
            var originalApplyEntityAttributes = nme_OEntity.prototype.$applyEntityAttributes;
            nme_OEntity.prototype.$applyEntityAttributes = function () {
                this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
                originalApplyEntityAttributes.apply(this, []);
                this.wrapped
                    .getEntityAttribute(SharedMonsterAttributes.maxHealth)
                    .setBaseValue(5);
                this.wrapped
                    .getEntityAttribute(SharedMonsterAttributes.movementSpeed)
                    .setBaseValue(0.25);
            };
            var originalLivingUpdate = nme_OEntity.prototype.$onLivingUpdate;
            nme_OEntity.prototype.$onLivingUpdate = function () {
                this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
                originalLivingUpdate.apply(this, []);
                if (this.wrapped.isInWater()) {
                    this.wrapped.motionY *= 0.5;
                    this.wrapped
                        .getEntityAttribute(SharedMonsterAttributes.movementSpeed)
                        .setBaseValue(1.4);
                }
                else {
                    this.wrapped
                        .getEntityAttribute(SharedMonsterAttributes.movementSpeed)
                        .setBaseValue(0.25);
                }
            };
            nme_OEntity.prototype.$getLivingSound = function () {
                return ModAPI.util.str("mob." + entityID + ".main_sound");
            };
            nme_OEntity.prototype.$getHurtSound = function () {
                return ModAPI.util.str("mob." + entityID + ".main_sound");
            };
            nme_OEntity.prototype.$getDeathSound = function () {
                return ModAPI.util.str("mob." + entityID + ".main_sound");
            };
            nme_OEntity.prototype.$playStepSound = function () {
                this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
                this.wrapped.playSound(ModAPI.util.str("mob." + entityID + ".step"), 0.2, 1);
            };
            nme_OEntity.prototype.$getDropItem = function () {
                return ModAPI.items[entityDropItem2].getRef();
            };
            nme_OEntity.prototype.$createChild = function (otherParent) {
                var _a, _b;
                this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
                return new nme_OEntity((_b = (_a = this.wrapped.worldObj) === null || _a === void 0 ? void 0 : _a.getRef()) !== null && _b !== void 0 ? _b : null);
            };
            nme_OEntity.prototype.$isBreedingItem = function (itemstack) {
                return (itemstack !== null &&
                    itemstack.$getItem() === ModAPI.items[entityBreedItem].getRef());
            };
            // END CUSTOM ENTITY
            // START CUSTOM MODEL
            var modelChickenClass = ModAPI.reflect.getClassById("net.minecraft.client.model.".concat(entityModel));
            var modelChickenSuper = ModAPI.reflect.getSuper(modelChickenClass); //while super isn't used when extending this class, java implies the call.
            var nmcm_OEntityModel = function nmcm_OEntityModel() {
                modelChickenSuper(this);
            };
            ModAPI.reflect.prototypeStack(modelChickenClass, nmcm_OEntityModel);
            // END CUSTOM MhODEL
            // START CUSTOM RENDERER
            var renderClass = ModAPI.reflect.getClassById("net.minecraft.client.renderer.entity.RenderLiving");
            var renderSuper = ModAPI.reflect.getSuper(renderClass, function (x) { return x.length === 4; });
            var duckTextures = ResourceLocation(ModAPI.util.str("textures/entity/".concat(entityID, ".png")));
            var nmcre_RenderOEntity = function nmcre_RenderOEntity(renderManager, modelBaseIn, shadowSizeIn) {
                renderSuper(this, renderManager, modelBaseIn, shadowSizeIn);
            };
            ModAPI.reflect.prototypeStack(renderClass, nmcre_RenderOEntity);
            nmcre_RenderOEntity.prototype.$getEntityTexture = function (entity) {
                return duckTextures;
            };
            nmcre_RenderOEntity.prototype.$handleRotationFloat = function (entity, partialTicks) {
                entity = ModAPI.util.wrap(entity);
                if (!entity.onGround && !entity.isInWater()) {
                    return 2; //falling
                }
                else {
                    return 0;
                }
            };
            var ID = ModAPI.keygen.entity(entityID);
            ModAPI.reflect
                .getClassById("net.minecraft.entity.EntityList")
                .staticMethods.addMapping0.method(ModAPI.util.asClass(nme_OEntity), {
                $createEntity: function ($worldIn) {
                    if (globalThis.Debug_mode) {
                        console.log(new nme_OEntity($worldIn));
                    }
                    return new nme_OEntity($worldIn);
                },
            }, ModAPI.util.str(entityID.toUpperCase()), ID, eggBase || 0x5e3e2d, //egg base
            eggSpots || 0x269166 //egg spots
            );
            var SpawnPlacementType = ModAPI.reflect.getClassById("net.minecraft.entity.EntityLiving$SpawnPlacementType").staticVariables;
            var ENTITY_PLACEMENTS = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.entity.EntitySpawnPlacementRegistry").staticVariables.ENTITY_PLACEMENTS);
            ENTITY_PLACEMENTS.put(ModAPI.util.asClass(nme_OEntity), SpawnPlacementType.ON_GROUND);
            var SpawnListEntry = ModAPI.reflect
                .getClassById("net.minecraft.world.biome.BiomeGenBase$SpawnListEntry")
                .constructors.find(function (x) { return x.length === 4; });
            var BiomeGenSwamp = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.world.biome.BiomeGenBase")
                .staticVariables.swampland);
            var BiomeGenRiver = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.world.biome.BiomeGenBase")
                .staticVariables.river);
            var BiomeGenBeach = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.world.biome.BiomeGenBase")
                .staticVariables.beach);
            var duckSpawnSwamp = SpawnListEntry(ModAPI.util.asClass(nme_OEntity), 22, 3, 5);
            var duckSpawnRiverBed = SpawnListEntry(ModAPI.util.asClass(nme_OEntity), 10, 5, 9);
            var duckSpawnBeach = SpawnListEntry(ModAPI.util.asClass(nme_OEntity), 24, 2, 3);
            BiomeGenSwamp.spawnableCreatureList.add(duckSpawnSwamp);
            BiomeGenRiver.spawnableCreatureList.add(duckSpawnRiverBed);
            BiomeGenBeach.spawnableCreatureList.add(duckSpawnBeach);
        });
    }
    else {
        if (globalThis.Debug_mode) {
            console.warn("this is entity size on server 1: ".concat(entitySize1, ", this is entity size 2: ").concat(entitySize2, ", breed item ").concat(entityBreedItem));
        }
        var entityDropItem2 = entityDropItem;
        var item_ref = ModAPI.items[entityBreedItem].getRef();
        var entitySuper = ModAPI.reflect.getSuper(entityClass, function (x) { return x.length === 2; });
        var nme_OEntity = function nme_OEntity($worldIn) {
            entitySuper(this, $worldIn);
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            this.wrapped.setSize(entitySize1 || 0.4, entitySize2 || 0.7);
            this.wrapped.tasks.addTask(0, AITask("EntityAISwimming", 1)(this));
            this.wrapped.tasks.addTask(1, AITask("EntityAIPanic", 2)(this, 1.9));
            this.wrapped.tasks.addTask(2, AITask("EntityAIMate", 2)(this, 1.0));
            try {
                this.wrapped.tasks.addTask(3, AITask("EntityAITempt", 4)(this, 1.5, item_ref, 0));
            }
            catch (e) {
                console.warn("Failed to add EntityAITempt task for ".concat(this.entityID, ". This may be due to an incorrect item reference, ").concat(item_ref, ", ( item ref), and ").concat(item_ref(), ", (item_ref())"));
                this.wrapped.tasks.addTask(3, AITask("EntityAITempt", 4)(this, 1.5, item_ref(), 0));
            }
            ;
            this.wrapped.tasks.addTask(4, AITask("EntityAIFollowParent", 2)(this, 1.2));
            this.wrapped.tasks.addTask(5, AITask("EntityAIWander", 2)(this, 1.1));
            this.wrapped.tasks.addTask(6, AITask("EntityAIWatchClosest", 3)(this, ModAPI.util.asClass(EntityPlayer.class), 6));
            this.wrapped.tasks.addTask(7, AITask("EntityAILookIdle", 1)(this));
        };
        ModAPI.reflect.prototypeStack(entityClass, nme_OEntity);
        nme_OEntity.prototype.$getEyeHeight = function () {
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            return this.wrapped.height;
        };
        var originalApplyEntityAttributes_1 = nme_OEntity.prototype.$applyEntityAttributes;
        nme_OEntity.prototype.$applyEntityAttributes = function () {
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            originalApplyEntityAttributes_1.apply(this, []);
            this.wrapped
                .getEntityAttribute(SharedMonsterAttributes.maxHealth)
                .setBaseValue(5);
            this.wrapped
                .getEntityAttribute(SharedMonsterAttributes.movementSpeed)
                .setBaseValue(0.25);
        };
        var originalLivingUpdate_1 = nme_OEntity.prototype.$onLivingUpdate;
        nme_OEntity.prototype.$onLivingUpdate = function () {
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            originalLivingUpdate_1.apply(this, []);
            if (this.wrapped.isInWater()) {
                this.wrapped.motionY *= 0.5;
                this.wrapped
                    .getEntityAttribute(SharedMonsterAttributes.movementSpeed)
                    .setBaseValue(1.4);
            }
            else {
                this.wrapped
                    .getEntityAttribute(SharedMonsterAttributes.movementSpeed)
                    .setBaseValue(0.25);
            }
        };
        nme_OEntity.prototype.$getLivingSound = function () {
            return ModAPI.util.str("mob." + entityID + ".main_sound");
        };
        nme_OEntity.prototype.$getHurtSound = function () {
            return ModAPI.util.str("mob." + entityID + ".main_sound");
        };
        nme_OEntity.prototype.$getDeathSound = function () {
            return ModAPI.util.str("mob." + entityID + ".main_sound");
        };
        nme_OEntity.prototype.$playStepSound = function () {
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            this.wrapped.playSound(ModAPI.util.str("mob." + entityID + ".step"), 0.2, 1);
        };
        nme_OEntity.prototype.$getDropItem = function () {
            return ModAPI.items[entityDropItem].getRef();
        };
        nme_OEntity.prototype.$createChild = function (otherParent) {
            var _a, _b;
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            return new nme_OEntity((_b = (_a = this.wrapped.worldObj) === null || _a === void 0 ? void 0 : _a.getRef()) !== null && _b !== void 0 ? _b : null);
        };
        nme_OEntity.prototype.$isBreedingItem = function (itemstack) {
            return (itemstack !== null &&
                itemstack.$getItem() === ModAPI.items[entityBreedItem].getRef());
        };
        // END CUSTOM ENTITY
        // START CUSTOM MODEL
        var modelChickenClass = ModAPI.reflect.getClassById("net.minecraft.client.model.".concat(entityModel));
        var modelChickenSuper = ModAPI.reflect.getSuper(modelChickenClass); //while super isn't used when extending this class, java implies the call.
        var nmcm_OEntityModel = function nmcm_OEntityModel() {
            modelChickenSuper(this);
        };
        ModAPI.reflect.prototypeStack(modelChickenClass, nmcm_OEntityModel);
        // END CUSTOM MODEL
        // START CUSTOM RENDERER
        var renderClass = ModAPI.reflect.getClassById("net.minecraft.client.renderer.entity.RenderLiving");
        var renderSuper = ModAPI.reflect.getSuper(renderClass, function (x) { return x.length === 4; });
        var duckTextures_1 = ResourceLocation(ModAPI.util.str("textures/entity/".concat(entityID, ".png")));
        var nmcre_RenderOEntity = function nmcre_RenderOEntity(renderManager, modelBaseIn, shadowSizeIn) {
            renderSuper(this, renderManager, modelBaseIn, shadowSizeIn);
        };
        ModAPI.reflect.prototypeStack(renderClass, nmcre_RenderOEntity);
        nmcre_RenderOEntity.prototype.$getEntityTexture = function (entity) {
            return duckTextures_1;
        };
        nmcre_RenderOEntity.prototype.$handleRotationFloat = function (entity, partialTicks) {
            entity = ModAPI.util.wrap(entity);
            if (!entity.onGround && !entity.isInWater()) {
                return 2; //falling
            }
            else {
                return 0;
            }
        };
        var ID = ModAPI.keygen.entity(entityID);
        ModAPI.reflect
            .getClassById("net.minecraft.entity.EntityList")
            .staticMethods.addMapping0.method(ModAPI.util.asClass(nme_OEntity), {
            $createEntity: function ($worldIn) {
                return new nme_OEntity($worldIn);
            },
        }, ModAPI.util.str(entityID.toUpperCase()), ID, eggBase || 0x5e3e2d, //egg base
        eggSpots || 0x269166 //egg spots
        );
        var SpawnPlacementType = ModAPI.reflect.getClassById("net.minecraft.entity.EntityLiving$SpawnPlacementType").staticVariables;
        var ENTITY_PLACEMENTS = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.entity.EntitySpawnPlacementRegistry").staticVariables.ENTITY_PLACEMENTS);
        ENTITY_PLACEMENTS.put(ModAPI.util.asClass(nme_OEntity), SpawnPlacementType.ON_GROUND);
        ModAPI.addEventListener("bootstrap", function () {
            var SpawnListEntry = ModAPI.reflect
                .getClassById("net.minecraft.world.biome.BiomeGenBase$SpawnListEntry")
                .constructors.find(function (x) { return x.length === 4; });
            var BiomeGenSwamp = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.world.biome.BiomeGenBase")
                .staticVariables.swampland);
            var BiomeGenRiver = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.world.biome.BiomeGenBase")
                .staticVariables.river);
            var BiomeGenBeach = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.world.biome.BiomeGenBase")
                .staticVariables.beach);
            var duckSpawnSwamp = SpawnListEntry(ModAPI.util.asClass(nme_OEntity), 22, 3, 5);
            var duckSpawnRiverBed = SpawnListEntry(ModAPI.util.asClass(nme_OEntity), 10, 5, 9);
            var duckSpawnBeach = SpawnListEntry(ModAPI.util.asClass(nme_OEntity), 24, 2, 3);
            BiomeGenSwamp.spawnableCreatureList.add(duckSpawnSwamp);
            BiomeGenRiver.spawnableCreatureList.add(duckSpawnRiverBed);
            BiomeGenBeach.spawnableCreatureList.add(duckSpawnBeach);
        });
    }
    ;
}
function OvenMDK__defineExecCmdAsGlobal() {
    var _a;
    // Get server method for different Minecraft versions
    var getServer = (_a = ModAPI.reflect.getClassById("net.minecraft.server.MinecraftServer").staticMethods.getServer) === null || _a === void 0 ? void 0 : _a.method;
    // Define global function
    globalThis.OvenMDK__executeCommandAs =
        function OvenMDK__executeCommandAs($commandsender, command, feedback) {
            var server = getServer
                ? getServer() // 1.8
                : ModAPI.reflect.getClassById("net.minecraft.server.MinecraftServer")
                    .staticVariables.server; // 1.12
            if (!server)
                return;
            if (globalThis.Debug_mode) {
                console.log(server);
            }
            var commandManager = server.$commandManager;
            // Temporarily override permissions
            var originalCanCommand = $commandsender.$canCommandSenderUseCommand;
            $commandsender.$canCommandSenderUseCommand = function () { return 1; };
            var originalFeedback = $commandsender.$sendCommandFeedback;
            $commandsender.$sendCommandFeedback = feedback ? function () { return 1; } : function () { return 0; };
            var notifyOps0 = ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0;
            var notifyOps = ModAPI.hooks.methods.nmc_CommandBase_notifyOperators;
            var addChatMsg = $commandsender.$addChatMessage;
            if (!feedback) {
                ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0 = function () { };
                ModAPI.hooks.methods.nmc_CommandBase_notifyOperators = function () { };
                $commandsender.$addChatMessage = function () { };
            }
            try {
                commandManager.$executeCommand($commandsender, ModAPI.util.str(command));
            }
            catch (error) {
                console.error(error);
            }
            if (!feedback) {
                ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0 = notifyOps0;
                ModAPI.hooks.methods.nmc_CommandBase_notifyOperators = notifyOps;
                $commandsender.$addChatMessage = addChatMsg;
            }
            // Restore original permissions and feedback
            $commandsender.$canCommandSenderUseCommand = originalCanCommand;
            $commandsender.$sendCommandFeedback = originalFeedback;
        };
}
function registerOvenOreServer(block_ID, vienSize, vienCount, minGenerationHeight, maxGenerationHeight) {
    var WorldGenMineable = ModAPI.reflect
        .getClassById("net.minecraft.world.gen.feature.WorldGenMinable")
        .constructors.find(function (x) { return x.length === 2; });
    var BiomeDecorator_decorate = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "decorate");
    var oldDecorate = ModAPI.hooks.methods[BiomeDecorator_decorate];
    ModAPI.hooks.methods[BiomeDecorator_decorate] = function ($this, $world, $random, $biomeGenBase, $blockpos) {
        if (!$this.$currentWorld) {
            $this["$OvenMDK__advanced_block0_483495_BlockGen"] = WorldGenMineable(ModAPI.blocks["".concat(block_ID)].getStateFromMeta(0).getRef(), vienSize);
        }
        return oldDecorate.apply(this, [
            $this,
            $world,
            $random,
            $biomeGenBase,
            $blockpos,
        ]);
    };
    console.log("Cool register " + block_ID);
    var BiomeDecorator_generateOres = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "generateOres");
    var oldGenerateOres = ModAPI.hooks.methods[BiomeDecorator_generateOres];
    ModAPI.hooks.methods[BiomeDecorator_generateOres] = function ($this) {
        $this.$genStandardOre1(vienCount, $this["$OvenMDK__advanced_block0_483495_BlockGen"] || null, minGenerationHeight, maxGenerationHeight);
        return oldGenerateOres.apply(this, [$this]);
    };
}


/***/ }),

/***/ "./src/classes/core/Mod.ts":
/*!*********************************!*\
  !*** ./src/classes/core/Mod.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ASSETS_defaultIcon_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ASSETS/defaultIcon.png */ "./src/ASSETS/defaultIcon.png");
/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Mod.ts
    
    Copyright 2025 BendieGames and Block_2222
    Licenced under GNU LGPL-3.0-or-later
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    This file is part of OvenMDK.

    OvenMDK is free software: you can redistribute it and/or modify it under
    the terms of the GNU Lesser General Public License as published by the Free
    Software Foundation, either version 3 of the License, or (at your option)
    any later version.

    OvenMDK is distributed in the hope that it will be useful, but WITHOUT ANY
    WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License along
    with Oven MDK. If not, see <https://www.gnu.org/licenses/>.
*/

var OMod = /** @class */ (function () {
    function OMod() {
    }
    OMod.config = function () { };
    OMod.init = function () { };
    OMod.postInit = function () { };
    OMod.title = "Default Name";
    OMod.version = "";
    OMod.description = "Default OvenMDK Description. Set 'description' in your OMod class!";
    OMod.credits = "None Given";
    OMod.icon = ASSETS_defaultIcon_png__WEBPACK_IMPORTED_MODULE_0__;
    OMod.acceptedMinecraftVersions = null;
    OMod.acceptedEaglerUpdates = null;
    OMod.acceptedEFVersions = null;
    OMod.acceptedEFFlavour = "injector";
    OMod.clientSideOnly = false;
    OMod.serverSideOnly = false;
    OMod.only_1_12_2 = false;
    OMod.Debug_mode = false;
    return OMod;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OMod);


/***/ }),

/***/ "./src/classes/core/OBlock.ts":
/*!************************************!*\
  !*** ./src/classes/core/OBlock.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  OBlock.ts

  Copyright 2025 BendieGames and Block_2222
    Licenced under GNU LGPL-3.0-or-later
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    This file is part of OvenMDK.

    OvenMDK is free software: you can redistribute it and/or modify it under
    the terms of the GNU Lesser General Public License as published by the Free
    Software Foundation, either version 3 of the License, or (at your option)
    any later version.

    OvenMDK is distributed in the hope that it will be useful, but WITHOUT ANY
    WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License along
    with Oven MDK. If not, see <https://www.gnu.org/licenses/>.
*/
var OBlock = /** @class */ (function () {
    function OBlock(blockName, blockID, texture, onBreak) {
        this.blockName = blockName;
        this.blockID = blockID;
        this.blockTexture = texture;
        this.onBreak = onBreak;
    }
    OBlock.prototype.register = function () {
        var _this = this;
        var BlockClass = ModAPI.reflect.getClassById("net.minecraft.block.Block");
        var ItemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var creativeTab;
        if (!ModAPI.is_1_12) {
            creativeTab = ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabBlock;
        }
        if (ModAPI.is_1_12) {
            creativeTab = ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.BUILDING_BLOCKS;
        }
        var blockSuper = ModAPI.reflect.getSuper(BlockClass, function (fn) { return fn.length === 2; });
        var breakBlockMethod = BlockClass.methods.breakBlock.method;
        var self = this;
        function nmb_Oblock() {
            blockSuper(this, ModAPI.materials.rock.getRef());
            if (!ModAPI.is_1_12) {
                this.$defaultBlockState = this.$blockState.$getBaseState();
            }
            this.$setCreativeTab(creativeTab);
        }
        ModAPI.reflect.prototypeStack(BlockClass, nmb_Oblock);
        nmb_Oblock.prototype.$breakBlock = function ($world, $blockpos, $blockstate) {
            return breakBlockMethod(this, $world, $blockpos, $blockstate);
        };
        var $$onBlockDestroyedByPlayerMethod = BlockClass.methods.onBlockDestroyedByPlayer.method;
        nmb_Oblock.prototype.$onBlockDestroyedByPlayer = function ($$world, $$blockpos, $$blockstate) {
            var $$world, $$blockpos, $$blockstate;
            self.onBreak.call($$world, $$blockpos, $$blockstate);
            return $$onBlockDestroyedByPlayerMethod(this, $$world, $$blockpos, $$blockstate);
        };
        /*
        nmb_Oblock.prototype.$getItemDropped = function (){
          return getDroppedItem(this, ${ getDroppedItemHandler.args.join(", ") });
        }
          I will do it when I come back
        */
        var internalRegister = function () {
            var custom_block;
            if (!ModAPI.is_1_12) {
                custom_block = new nmb_Oblock()
                    .$setHardness(3.0)
                    .$setStepSound(BlockClass.staticVariables.soundTypePiston)
                    .$setUnlocalizedName(ModAPI.util.str(_this.blockID));
            }
            if (ModAPI.is_1_12) {
                custom_block = new nmb_Oblock()
                    .$setHardness(-1.0)
                    .$setSoundType(ModAPI.blockSounds.PLANT.getRef())
                    .$setUnlocalizedName(ModAPI.util.str(_this.blockID));
            }
            BlockClass.staticMethods.registerBlock0.method(ModAPI.keygen.block(_this.blockID), ModAPI.util.str(_this.blockID), custom_block);
            ItemClass.staticMethods.registerItemBlock0.method(custom_block);
            _this.fixupBlockIds();
            ModAPI.blocks[_this.blockID] = custom_block;
            _this.blockInstance = custom_block;
            console.log("Registered block on client: " + _this.blockID);
            console.log(custom_block);
            return custom_block;
        };
        if (!ModAPI.is_1_12) {
            if (ModAPI.materials) {
                return internalRegister();
            }
            else {
                ModAPI.addEventListener("bootstrap", internalRegister);
            }
        }
        if (ModAPI.is_1_12) {
            if (ModAPI.blocks) {
                return ((new nmb_Oblock()).$setHardness(-1.0).$setSoundType(ModAPI.blockSounds.PLANT.getRef()).$setUnlocalizedName(ModAPI.util.str(this.blockID)));
            }
        }
    };
    OBlock.prototype.fixupBlockIds = function () {
        var blockRegistry = ModAPI.util
            .wrap(ModAPI.reflect.getClassById("net.minecraft.block.Block").staticVariables
            .blockRegistry)
            .getCorrective();
        var BLOCK_STATE_IDS = ModAPI.util
            .wrap(ModAPI.reflect.getClassById("net.minecraft.block.Block").staticVariables
            .BLOCK_STATE_IDS)
            .getCorrective();
        blockRegistry.registryObjects.hashTableKToV.forEach(function (entry) {
            if (entry) {
                var block_1 = entry.value;
                var validStates = block_1.getBlockState().getValidStates();
                var stateArray = validStates.array || [validStates.element];
                stateArray.forEach(function (iblockstate) {
                    var i = (blockRegistry.getIDForObject(block_1.getRef()) << 4) |
                        block_1.getMetaFromState(iblockstate.getRef());
                    BLOCK_STATE_IDS.put(iblockstate.getRef(), i);
                });
            }
        });
    };
    OBlock.prototype.registerBlock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var custom_block, nmb_OBlock, itemClass, blockClass, self;
            var _this = this;
            return __generator(this, function (_a) {
                if (!ModAPI.is_1_12) {
                    custom_block = new OBlock(this.blockName, this.blockID, this.blockTexture, this.onBreak).register();
                }
                if (ModAPI.is_1_12) {
                    nmb_OBlock = new OBlock(this.blockName, this.blockID, this.blockTexture, this.onBreak).register();
                    itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
                    blockClass = ModAPI.reflect.getClassById("net.minecraft.block.Block");
                    custom_block = nmb_OBlock;
                    blockClass.staticMethods.registerBlock0.method(ModAPI.keygen.block(this.blockID), ModAPI.util.str(this.blockID), custom_block);
                    itemClass.staticMethods.registerItemBlock0.method(custom_block);
                    console.log(custom_block || "Block registration failed");
                }
                self = this;
                if (!ModAPI.is_1_12) {
                    ModAPI.dedicatedServer.appendCode("globalThis.registerServerBlock(\"".concat(this.blockID, "\", ").concat(this.onBreak, ");"));
                    ModAPI.addEventListener("lib:asyncsink", function () { return __awaiter(_this, void 0, void 0, function () {
                        var response, buffer;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    ModAPI.addEventListener("lib:asyncsink:registeritems", function (renderItem) {
                                        renderItem.registerBlock(custom_block, ModAPI.util.str(self.blockID));
                                    });
                                    AsyncSink.L10N.set("tile.".concat(self.blockID, ".name"), self.blockName);
                                    console.log("Set localization for block ".concat(self.blockID));
                                    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/block/".concat(self.blockID, ".json"), JSON.stringify({
                                        parent: "block/cube_all",
                                        textures: {
                                            all: "blocks/".concat(self.blockID),
                                        },
                                    }));
                                    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/".concat(self.blockID, ".json"), JSON.stringify({
                                        parent: "block/".concat(self.blockID),
                                        display: {
                                            thirdperson: {
                                                rotation: [10, -45, 170],
                                                translation: [0, 1.5, -2.75],
                                                scale: [0.375, 0.375, 0.375],
                                            },
                                        },
                                    }));
                                    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/blockstates/".concat(self.blockID, ".json"), JSON.stringify({
                                        variants: {
                                            normal: [
                                                {
                                                    model: self.blockID,
                                                },
                                            ],
                                        },
                                    }));
                                    return [4 /*yield*/, fetch(self.blockTexture)];
                                case 1:
                                    response = _a.sent();
                                    return [4 /*yield*/, response.arrayBuffer()];
                                case 2:
                                    buffer = _a.sent();
                                    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/blocks/".concat(self.blockID, ".png"), buffer);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                if (ModAPI.is_1_12) {
                    ModAPI.addEventListener("lib:asyncsink", function () { return __awaiter(_this, void 0, void 0, function () {
                        var response, buffer;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    ModAPI.addEventListener("lib:asyncsink:registeritems", function (renderItem) {
                                        console.log("cool register block");
                                        console.log(custom_block || "Block registration failed");
                                        renderItem.registerBlock(custom_block, ModAPI.util.str(_this.blockID));
                                    });
                                    AsyncSink.L10N.set("tile." + this.blockID + ".name", this.blockName);
                                    console.log("Set localization for block ".concat(self.blockID));
                                    console.log(custom_block || "Block registration failed");
                                    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/block/".concat(self.blockID, ".json"), JSON.stringify({
                                        "parent": "block/cube_all",
                                        "textures": {
                                            "all": "blocks/".concat(self.blockID)
                                        }
                                    }));
                                    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/".concat(self.blockID, ".json"), JSON.stringify({
                                        "parent": "block/".concat(self.blockID)
                                    }));
                                    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/blockstates/".concat(self.blockID, ".json"), JSON.stringify({
                                        "variants": {
                                            "normal": { "model": "".concat(this.blockID) }
                                        }
                                    }));
                                    return [4 /*yield*/, fetch(self.blockTexture)];
                                case 1:
                                    response = _a.sent();
                                    return [4 /*yield*/, response.arrayBuffer()];
                                case 2:
                                    buffer = _a.sent();
                                    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/blocks/".concat(self.blockID, ".png"), buffer);
                                    ModAPI.dedicatedServer.appendCode("globalThis.registerServerBlock(\"".concat(this.blockID, "\", ").concat(this.onBreak, ");"));
                                    ModAPI.blocks[this.blockID] = custom_block;
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [2 /*return*/];
            });
        });
    };
    return OBlock;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OBlock);


/***/ }),

/***/ "./src/classes/core/OEntity.ts":
/*!*************************************!*\
  !*** ./src/classes/core/OEntity.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _OItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OItem */ "./src/classes/core/OItem.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var OEntity = /** @class */ (function () {
    function OEntity(entityName, entityID, entityTexture, entityModel, entity_sound_main, entityBreedItem, entityDropItem, eggBase, eggSpots, extra_tasks) {
        this.entityName = entityName;
        this.entityID = entityID;
        this.entityTexture = entityTexture;
        this.entityModel = entityModel;
        this.entity_sound_main = entity_sound_main;
        this.entityBreedItem = entityBreedItem || "wheat"; //default breed item
        this.entityDropItem = entityDropItem || "feather"; //default drop item
        this.eggBase = eggBase || 0x5e3e2d; //default egg base color
        this.eggSpots = eggSpots || 0x269166; //default egg spots color
        this.extra_tasks = extra_tasks;
    }
    OEntity.prototype.waitForRenderManager = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        function check() {
                            if (ModAPI.mc.renderManager) {
                                res();
                            }
                            else {
                                setTimeout(check, 1 / 20);
                            }
                        }
                        check();
                    })];
            });
        });
    };
    OEntity.prototype.registerEntityClient = function () {
        var _a;
        var _this = this;
        console.warn("OEntitys are still in development, expect bugs and issues");
        //return;
        ModAPI.hooks.methods.jl_String_format =
            ModAPI.hooks.methods.nlev_HString_format; //temporary thing to fix an issue in eaglercraft
        // Utils
        function AITask(name, length) {
            return ModAPI.reflect
                .getClassById("net.minecraft.entity.ai." + name)
                .constructors.find(function (x) { return x.length === length; });
        }
        var ResourceLocation = ModAPI.reflect
            .getClassByName("ResourceLocation")
            .constructors.find(function (x) { return x.length === 1; });
        var EntityPlayer = ModAPI.reflect.getClassByName("EntityPlayer");
        var GlStateManager = Object.fromEntries(Object.values(ModAPI.reflect.getClassByName("GlStateManager").staticMethods).map(function (x) { return [x.methodNameShort, x.method]; }));
        var SharedMonsterAttributes = ModAPI.reflect.getClassByName("SharedMonsterAttributes").staticVariables;
        var entityBreedItem2 = this.entityBreedItem;
        var entityDropItem2 = this.entityDropItem;
        // START CUSTOM ENTITY
        var entitySize1; // Default size for most entities
        var entitySize2;
        if (this.entityModel === "ModelChicken") {
            entitySize1 = 0.4; // Chicken
            entitySize2 = 0.7;
        }
        else if (this.entityModel === "ModelCow") {
            entitySize1 = 0.9; // Cow
            entitySize2 = 1.4;
        }
        else if (this.entityModel === "ModelMooshroom") {
            entitySize1 = 0.9; // Mooshroom
            entitySize2 = 1.4;
        }
        else if (this.entityModel === "ModelPig") {
            entitySize1 = 0.9; // Pig
            entitySize2 = 0.9;
        }
        else if (this.entityModel === "ModelSheep") {
            entitySize1 = 0.9; // Sheep
            entitySize2 = 1.3;
        }
        else if (this.entityModel === "ModelHorse") {
            entitySize1 = 1.3965; // Horse
            entitySize2 = 1.6; // Height can vary slightly
        }
        else if (this.entityModel === "ModelRabbit") {
            entitySize1 = 0.4; // Rabbit
            entitySize2 = 0.5;
        }
        else if (this.entityModel === "ModelSquid") {
            entitySize1 = 0.8; // Squid
            entitySize2 = 0.8;
        }
        else if (this.entityModel === "ModelBat") {
            entitySize1 = 0.5; // Bat
            entitySize2 = 0.9;
        }
        else if (this.entityModel === "ModelOcelot") {
            entitySize1 = 0.6; // Ocelot (wild)
            entitySize2 = 0.7;
        }
        else if (this.entityModel === "ModelWolf") {
            entitySize1 = 0.6; // Wolf
            entitySize2 = 0.85;
        }
        else if (this.entityModel === "ModelVillager") {
            entitySize1 = 0.6; // Villager
            entitySize2 = 1.95;
        }
        else if (this.entityModel === "ModelIronGolem") {
            entitySize1 = 1.4; // Iron Golem
            entitySize2 = 2.9;
        }
        else if (this.entityModel === "ModelSnowman" ||
            this.entityModel === "ModelSnowGolem") {
            entitySize1 = 0.7; // Snow Golem
            entitySize2 = 1.9;
        }
        var entityClass = ModAPI.reflect.getClassById("net.minecraft.entity.passive.EntityAnimal");
        var entitySuper = ModAPI.reflect.getSuper(entityClass, function (x) { return x.length === 2; });
        if (globalThis.Debug_mode) {
            console.warn("this is entity size 1: ".concat(entitySize1, ", this is entity size 2: ").concat(entitySize2, ", oh the breeditem ").concat(entityBreedItem2, ", and dropItem ").concat(entityDropItem2));
        }
        ;
        var entityBreedItem2 = this.entityBreedItem;
        var entityDropItem2 = this.entityDropItem;
        var item_ref = ModAPI.items[entityBreedItem2].getRef();
        var extra_tasks = this.extra_tasks || [];
        var nme_OEntity = function nme_OEntity($worldIn) {
            var _this = this;
            entitySuper(this, $worldIn);
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            this.wrapped.setSize(entitySize1 || 0.4, entitySize2 || 0.7);
            this.wrapped.tasks.addTask(0, AITask("EntityAISwimming", 1)(this));
            this.wrapped.tasks.addTask(1, AITask("EntityAIPanic", 2)(this, 1.9));
            this.wrapped.tasks.addTask(2, AITask("EntityAIMate", 2)(this, 1.0));
            try {
                this.wrapped.tasks.addTask(3, AITask("EntityAITempt", 4)(this, 1.5, item_ref, 0));
            }
            catch (e) {
                console.warn("Failed to add EntityAITempt task for ".concat(this.entityID, ". This may be due to an incorrect item reference, ").concat(item_ref, ", ( item ref), and ").concat(item_ref(), ", (item_ref())"));
                this.wrapped.tasks.addTask(3, AITask("EntityAITempt", 4)(this, 1.5, item_ref(), 0));
            }
            ;
            this.wrapped.tasks.addTask(4, AITask("EntityAIFollowParent", 2)(this, 1.2));
            this.wrapped.tasks.addTask(5, AITask("EntityAIWander", 2)(this, 1.1));
            this.wrapped.tasks.addTask(6, AITask("EntityAIWatchClosest", 3)(this, ModAPI.util.asClass(EntityPlayer.class), 6));
            this.wrapped.tasks.addTask(7, AITask("EntityAILookIdle", 1)(this));
            extra_tasks.forEach(function (element) {
                try {
                    element(_this);
                }
                catch (e) {
                    console.warn("Failed to add extra task for ".concat(_this.entityID, ". This may be due to an incorrect task function, ").concat(element, ", or the task function not being compatible with the entity."));
                }
            });
        };
        ModAPI.reflect.prototypeStack(entityClass, nme_OEntity);
        nme_OEntity.prototype.$getEyeHeight = function () {
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            return this.wrapped.height;
        };
        var originalApplyEntityAttributes = nme_OEntity.prototype.$applyEntityAttributes;
        nme_OEntity.prototype.$applyEntityAttributes = function () {
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            originalApplyEntityAttributes.apply(this, []);
            this.wrapped
                .getEntityAttribute(SharedMonsterAttributes.maxHealth)
                .setBaseValue(5);
            this.wrapped
                .getEntityAttribute(SharedMonsterAttributes.movementSpeed)
                .setBaseValue(0.25);
        };
        var originalLivingUpdate = nme_OEntity.prototype.$onLivingUpdate;
        nme_OEntity.prototype.$onLivingUpdate = function () {
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            originalLivingUpdate.apply(this, []);
            if (this.wrapped.isInWater()) {
                this.wrapped.motionY *= 0.5;
                this.wrapped
                    .getEntityAttribute(SharedMonsterAttributes.movementSpeed)
                    .setBaseValue(1.4);
            }
            else {
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
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            this.wrapped.playSound(ModAPI.util.str("mob." + this.entityID + ".step"), 0.2, 1);
        };
        nme_OEntity.prototype.$getDropItem = function () {
            return ModAPI.items[this.entityDropItem].getRef();
        };
        nme_OEntity.prototype.$createChild = function (otherParent) {
            var _a, _b;
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            return new nme_OEntity((_b = (_a = this.wrapped.worldObj) === null || _a === void 0 ? void 0 : _a.getRef()) !== null && _b !== void 0 ? _b : null);
        };
        nme_OEntity.prototype.$isBreedingItem = function (itemstack) {
            return (itemstack !== null &&
                itemstack.$getItem() === ModAPI.items[entityBreedItem2].getRef());
        };
        // END CUSTOM ENTITY
        // START CUSTOM MODEL
        var modelChickenClass = ModAPI.reflect.getClassById("net.minecraft.client.model.".concat(this.entityModel));
        var modelChickenSuper = ModAPI.reflect.getSuper(modelChickenClass); //while super isn't used when extending this class, java implies the call.
        var nmcm_OEntityModel = function nmcm_OEntityModel() {
            modelChickenSuper(this);
        };
        ModAPI.reflect.prototypeStack(modelChickenClass, nmcm_OEntityModel);
        // END CUSTOM MODEL
        // START CUSTOM RENDERER
        var renderClass = ModAPI.reflect.getClassById("net.minecraft.client.renderer.entity.RenderLiving");
        var renderSuper = ModAPI.reflect.getSuper(renderClass, function (x) { return x.length === 4; });
        var duckTextures = ResourceLocation(ModAPI.util.str("textures/entity/".concat(this.entityID, ".png")));
        var nmcre_RenderOEntity = function nmcre_RenderOEntity(renderManager, modelBaseIn, shadowSizeIn) {
            renderSuper(this, renderManager, modelBaseIn, shadowSizeIn);
        };
        ModAPI.reflect.prototypeStack(renderClass, nmcre_RenderOEntity);
        nmcre_RenderOEntity.prototype.$getEntityTexture = function (entity) {
            return duckTextures;
        };
        nmcre_RenderOEntity.prototype.$handleRotationFloat = function (entity, partialTicks) {
            entity = ModAPI.util.wrap(entity);
            if (!entity.onGround && !entity.isInWater()) {
                return 2; //falling
            }
            else {
                return 0;
            }
        };
        var ID = ModAPI.keygen.entity(this.entityID);
        ModAPI.reflect
            .getClassById("net.minecraft.entity.EntityList")
            .staticMethods.addMapping0.method(ModAPI.util.asClass(nme_OEntity), {
            $createEntity: function ($worldIn) {
                return new nme_OEntity($worldIn);
            },
        }, ModAPI.util.str(this.entityID.toUpperCase()), ID, this.eggBase || 0x5e3e2d, //egg base
        this.eggSpots || 0x269166 //egg spots
        );
        var SpawnPlacementType = ModAPI.reflect.getClassById("net.minecraft.entity.EntityLiving$SpawnPlacementType").staticVariables;
        var ENTITY_PLACEMENTS = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.entity.EntitySpawnPlacementRegistry").staticVariables.ENTITY_PLACEMENTS);
        ENTITY_PLACEMENTS.put(ModAPI.util.asClass(nme_OEntity), SpawnPlacementType.ON_GROUND);
        ModAPI.addEventListener("bootstrap", function () {
            var SpawnListEntry = ModAPI.reflect
                .getClassById("net.minecraft.world.biome.BiomeGenBase$SpawnListEntry")
                .constructors.find(function (x) { return x.length === 4; });
            var BiomeGenSwamp = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.world.biome.BiomeGenBase")
                .staticVariables.swampland);
            var BiomeGenRiver = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.world.biome.BiomeGenBase")
                .staticVariables.river);
            var BiomeGenBeach = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.world.biome.BiomeGenBase")
                .staticVariables.beach);
            var duckSpawnSwamp = SpawnListEntry(ModAPI.util.asClass(nme_OEntity), 22, 3, 5);
            var duckSpawnRiverBed = SpawnListEntry(ModAPI.util.asClass(nme_OEntity), 10, 5, 9);
            var duckSpawnBeach = SpawnListEntry(ModAPI.util.asClass(nme_OEntity), 24, 2, 3);
            console.log(nme_OEntity);
            BiomeGenSwamp.spawnableCreatureList.add(duckSpawnSwamp);
            BiomeGenRiver.spawnableCreatureList.add(duckSpawnRiverBed);
            BiomeGenBeach.spawnableCreatureList.add(duckSpawnBeach);
        });
        ModAPI.addEventListener("lib:asyncsink", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                AsyncSink.L10N.set("entity.".concat(this.entityID.toUpperCase(), ".name"), this.entityName);
                return [2 /*return*/];
            });
        }); });
        return _a = {},
            _a["Entity".concat(this.entityID.toUpperCase())] = nme_OEntity,
            _a["Model".concat(this.entityID.toUpperCase())] = nmcm_OEntityModel,
            _a["Render".concat(this.entityID.toUpperCase())] = nmcre_RenderOEntity,
            _a["".concat(this.entityID, "Textures")] = duckTextures,
            _a;
    };
    OEntity.prototype.registerOEntity = function () {
        var _this = this;
        if (ModAPI.is_1_12) {
            return console.warn("OEntitys dont work in 1.12, and one of your mods are trying to use it! Please switch to 1.8.8");
        }
        ModAPI.dedicatedServer.appendCode("globalThis.registerEntityServer(\"".concat(this.entityID, "\", \"").concat(this.entityName, "\", \"").concat(this.entityModel, "\", \"").concat(this.entityBreedItem, "\", \"").concat(this.entityDropItem, "\", ").concat(this.eggBase, ", ").concat(this.eggSpots, ");"));
        var data = this.registerEntityClient();
        ModAPI.addEventListener("lib:asyncsink", function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _b = (_a = AsyncSink).setFile;
                        _c = ["resourcepacks/AsyncSinkLib/assets/minecraft/textures/entity/".concat(this.entityID, ".png")];
                        return [4 /*yield*/, fetch(this.entityTexture)];
                    case 1: return [4 /*yield*/, (_k.sent()).arrayBuffer()];
                    case 2:
                        _b.apply(_a, _c.concat([_k.sent()]));
                        AsyncSink.hideFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/entity/".concat(this.entityID, ".png.mcmeta"));
                        return [4 /*yield*/, this.waitForRenderManager()];
                    case 3:
                        _k.sent();
                        _e = (_d = AsyncSink).setFile;
                        _f = ["resourcepacks/AsyncSinkLib/assets/minecraft/sounds/mob/".concat(this.entityID, "/main_sound.ogg")];
                        return [4 /*yield*/, fetch("".concat(this.entity_sound_main))];
                    case 4: return [4 /*yield*/, (_k.sent()).arrayBuffer()];
                    case 5:
                        _e.apply(_d, _f.concat([_k.sent()]));
                        AsyncSink.Audio.register("mob." + this.entityID + ".main_sound", AsyncSink.Audio.Category.ANIMALS, [
                            {
                                path: "sounds/mob/".concat(this.entityID, "/main_sound.ogg"),
                                pitch: 1,
                                volume: 1,
                                streaming: false, //use for large audio files
                            },
                        ]);
                        _h = (_g = AsyncSink).setFile;
                        _j = ["resourcepacks/AsyncSinkLib/assets/minecraft/sounds/mob/".concat(this.entityID, "/step.ogg")];
                        return [4 /*yield*/, fetch("data:audio/ogg;base64,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LbZYa60159RajDHWmmvOvafWYoyx1ppz7r0AAJMHBwCoBBtnWEk6KxwNLjRkJQCQGwCAIMSYc85BCCGEEEIIIVKKMecghBBCCCGUUkqkFGPOQQghhBBCCCGEjDHnoIMQQgillFJKKRljzkEIIYQQSiilhBI656CDEEIJpZRSSimldM45CCGEEEoppZRSSukghBBCCKWUUkoppZTSQQghhFBKKaWUUkopJYQQQgillFJKKaWUUkoIIYQQSimllFJKKaWUEEIIpZRSSimllFJKKSGEEEoppZRSSimllFJCCKWUUkoppZRSSimlhBBKKaWUUkoppZRSSgmhlFJKKaWUUkoppZQSSimllFJKKaWUUkopJZRSSimllFJKKaWUUkoopZRSSimllFJKKaWUUEoppZRSSimllFJKKaGUUkoppZRSSimllFIKAAA6cAAACDCi0kLsNOPKI3BEIcMEVGjISgAgHAAAQAQ6CCGEEEIIEXMQQgghhBBCiJiDEEIIIYQQQgghhBBCCKWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaUUAHWZ4QAYPWHjDCtJZ4WjwYWGrAQA0gIAAGMYY4wpyKSzFmOtDWMQQgedhBRqqCWmhjEIIXRQSkottlhzBqGkUkpJLcZYg809g1BKKaWkFmOtORfjQUglpdRiq7XnHIzuIJSSUkox1ppz7r1o0ElJqbVac+49B188CKWk1lqMPQcfjDCilJZirLHWHHwRRhhRSkstxpp7zb0YY4RKKcZae86551yMET6lFmOuufcefC7C+OJizDn34oMPPghhjJAx5thz8L0XY4wPwshccy7CGOOLMML4IGytuQdfjBFGGGN87zX4oHsxwggjjDHCCN1z0UX4YowxRhhfhAEAuREOAIgLRhJSZxlWGnHjCRgikEJDVgEAMQAABDHGIKSQUkopxRhjjDHGGGOMMcYYY4wxxpxjzjnnnAAAwAQHAIAAK9iVWVq1UdzUSV70QeATOmIzMuRSKmZyIuiRGmqxEuzQCm7wArDQkJUAABkAAOSklJRaLRpCykFpNYjIIOUkxSQiY5CC0oKnkDGIScodYwohBal2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")];
                    case 6: return [4 /*yield*/, (_k.sent()).arrayBuffer()];
                    case 7:
                        _h.apply(_g, _j.concat([_k.sent()]));
                        AsyncSink.Audio.register("mob." + this.entityID + ".step", AsyncSink.Audio.Category.ANIMALS, [
                            {
                                path: "sounds/mob/".concat(this.entityID, "/step.ogg"),
                                pitch: 1,
                                volume: 1,
                                streaming: false, //use for large audio files
                            },
                        ]);
                        ModAPI.mc.renderManager.entityRenderMap.put(ModAPI.util.asClass(data["Entity".concat(this.entityID.toUpperCase())]), new data["Render".concat(this.entityID.toUpperCase())](ModAPI.mc.renderManager.getRef(), new data["Model".concat(this.entityID.toUpperCase())](), 0.3));
                        ModAPI.promisify(ModAPI.mc.renderEngine.bindTexture)(data["".concat(this.entityID, "Textures")]).then(function () {
                            console.log("Loaded OEntity texture into cache.");
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        console.log(data);
        var key = "OEntity.".concat(this.entityID);
        globalThis[key] = data;
    };
    OEntity.prototype.createSpawnegg = function (texture) {
        if (!texture) {
            texture = "textures/entity/".concat(this.entityID, ".png");
        }
        return console.log("Spawn eggs are built in!");
        // removed by dead control flow
{ var spawnEgg; }
        // removed by dead control flow
{}
        // removed by dead control flow
{}
    };
    return OEntity;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OEntity);


/***/ }),

/***/ "./src/classes/core/OItem.ts":
/*!***********************************!*\
  !*** ./src/classes/core/OItem.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  OItem.ts
    
  Copyright 2025 BendieGames and Block_2222
    Licenced under GNU LGPL-3.0-or-later
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    This file is part of OvenMDK.

    OvenMDK is free software: you can redistribute it and/or modify it under
    the terms of the GNU Lesser General Public License as published by the Free
    Software Foundation, either version 3 of the License, or (at your option)
    any later version.

    OvenMDK is distributed in the hope that it will be useful, but WITHOUT ANY
    WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License along
    with Oven MDK. If not, see <https://www.gnu.org/licenses/>.
*/
var OItem = /** @class */ (function () {
    function OItem(itemName, itemID, itemStack, texture, onRightClick, onItemUse) {
        this.itemName = itemName;
        this.itemID = itemID;
        this.itemStack = itemStack;
        this.itemTexture = texture;
        this.onRightClick = onRightClick;
        // Assign optional onItemUse if provided
        this.onItemUse = onItemUse;
    }
    OItem.prototype.registerClient = function () {
        var _this = this;
        var $$itemGetAttributes = ModAPI.reflect.getClassById("net.minecraft.item.Item").methods.getItemAttributeModifiers.method;
        var creativeMiscTab;
        if (ModAPI.is_1_12) {
            creativeMiscTab = ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.MISC;
        }
        else {
            creativeMiscTab = ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabMisc;
        }
        var itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var itemSuper = ModAPI.reflect.getSuper(itemClass, function (fn) { return fn.length === 1; });
        var itemStack = this.itemStack;
        var self = this;
        function nmi_OvenItem() {
            itemSuper(this);
            this.$setCreativeTab(creativeMiscTab);
            this.$maxStackSize = (itemStack);
        }
        ModAPI.reflect.prototypeStack(itemClass, nmi_OvenItem);
        if (!ModAPI.is_1_12) {
            nmi_OvenItem.prototype.$onItemRightClick = function ($$itemstack, $$world, $$player) {
                if (!ModAPI.is_1_12)
                    ($$player).$setItemInUse($$itemstack, 32);
                var $$itemstack, $$world, $$player;
                self.onRightClick($$itemstack, $$world, $$player);
                if (globalThis.Debug_mode) {
                    console.log("client itemstack:");
                    console.log($$itemstack);
                }
                return ($$itemstack);
            };
        }
        ;
        if (ModAPI.is_1_12) {
            var $$ResultEnum = ModAPI.reflect.getClassByName("EnumActionResult").staticVariables;
            var $$ActionResult = ModAPI.reflect.getClassByName("ActionResult").constructors[0];
            nmi_OvenItem.prototype.$onItemRightClick = function ($$world, $$player, $handEnum, $unused) {
                var $$itemstack = ($$player).$getHeldItem($handEnum);
                ($$player).$setActiveHand($handEnum);
                var $$itemstack, $$world, $$player;
                self.onRightClick($$itemstack, $$world, $$player);
                if (globalThis.Debug_mode) {
                    console.log("client itemstack:");
                    console.log($$itemstack);
                }
                return ($$ActionResult($$ResultEnum.SUCCESS, $$itemstack));
            };
        }
        if (!ModAPI.is_1_12) {
            nmi_OvenItem.prototype.$onItemUse0 = function ($$itemstack, $$player, $$world, $$blockpos) {
                var $$itemstack, $$world, $$player, $$blockpos;
                if (self.onItemUse) {
                    self.onItemUse($$itemstack, $$world, $$player, $$blockpos);
                }
                ;
                if (globalThis.Debug_mode) {
                    console.log("client itemstack:");
                    console.log($$itemstack);
                }
                return 0;
            };
        }
        ;
        if (ModAPI.is_1_12) {
            var $$ResultEnum = ModAPI.reflect.getClassByName("EnumActionResult").staticVariables;
            nmi_OvenItem.prototype.$onItemUse = function ($$itemstack, $$player, $$world, $$blockpos) {
                var $$itemstack, $$player, $$world, $$blockpos;
                if (self.onItemUse) {
                    self.onItemUse($$itemstack, $$world, $$player, $$blockpos);
                }
                ;
                return $$ResultEnum.PASS;
            };
        }
        nmi_OvenItem.prototype.$onUpdate = function ($$itemstack, $$world, $$player, $$hotbar_slot, $$is_held) {
            $$is_held = ($$is_held) ? true : false;
            return ($$itemstack);
        };
        nmi_OvenItem.prototype.$onItemUseFinish = function ($$itemstack, $$world, $$player) {
            return ($$itemstack);
        };
        nmi_OvenItem.prototype.$getMaxItemUseDuration = function () {
            return 32;
        };
        nmi_OvenItem.prototype.$getItemAttributeModifiers = function () {
            var $$attributemap = $$itemGetAttributes.apply(this, []);
            return $$attributemap;
        };
        nmi_OvenItem.prototype.$getStrVsBlock = function ($$itemstack, $$block) {
            return 1.0;
        };
        nmi_OvenItem.prototype.$onCreated = function ($$itemstack, $$world, $$player) {
            return;
        };
        nmi_OvenItem.prototype.$onBlockDestroyed = function ($$itemstack, $$world, $$block, $$blockpos, $$entity) {
            return 0;
        };
        var internal_reg = function () {
            var itemInstance = new nmi_OvenItem().$setUnlocalizedName(ModAPI.util.str(_this.itemID));
            itemClass.staticMethods.registerItem.method(ModAPI.keygen.item(_this.itemID), ModAPI.util.str(_this.itemID), itemInstance);
            ModAPI.items["".concat(self.itemID)] = itemInstance;
            console.log(itemInstance);
            console.log("Registered OvenMDK item ( client side )");
            return itemInstance;
        };
        if (ModAPI.items) {
            return internal_reg();
        }
        else {
            ModAPI.addEventListener("bootstrap", internal_reg);
        }
    };
    OItem.prototype.registerItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, custom_item;
            var _this = this;
            return __generator(this, function (_a) {
                self = this;
                custom_item = new OItem(this.itemName, this.itemID, this.itemStack, this.itemTexture, this.onRightClick, this.onItemUse).registerClient();
                if (ModAPI.is_1_12) {
                    ModAPI.dedicatedServer.appendCode("globalThis.registerServerItem(\"".concat(this.itemID, "\", ").concat(this.itemStack, ", ").concat(this.onRightClick, ", ").concat(this.onItemUse, ");"));
                    ModAPI.addEventListener("lib:asyncsink", function () { return __awaiter(_this, void 0, void 0, function () {
                        function arrayBufferToString(buffer, encoding) {
                            if (encoding === void 0) { encoding = 'utf-8'; }
                            var decoder = new TextDecoder(encoding);
                            return decoder.decode(buffer);
                        }
                        var _a, _b, response, buffer;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    ModAPI.addEventListener("lib:asyncsink:registeritems", function (renderItem) {
                                        console.log("cool reg for");
                                        console.log(self.itemID);
                                        renderItem.registerItem(custom_item, ModAPI.util.str(self.itemID));
                                    });
                                    if (globalThis.Debug_mode) {
                                        console.log("registering ".concat(self.itemID));
                                    }
                                    AsyncSink.L10N.set("item.".concat(self.itemID, ".name"), self.itemName);
                                    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/".concat(self.itemID, ".json"), JSON.stringify({
                                        "parent": "builtin/generated",
                                        "textures": {
                                            "layer0": "items/".concat(self.itemID)
                                        },
                                        "display": { "thirdperson_righthand": { "rotation": [0, -90, 55], "translation": [0, 4, 0.5], "scale": [0.85, 0.85, 0.85] }, "thirdperson_lefthand": { "rotation": [0, 90, -55], "translation": [0, 4, 0.5], "scale": [0.85, 0.85, 0.85] }, "firstperson_righthand": { "rotation": [0, -90, 25], "translation": [1.13, 3.2, 1.13], "scale": [0.68, 0.68, 0.68] }, "firstperson_lefthand": { "rotation": [0, 90, -25], "translation": [1.13, 3.2, 1.13], "scale": [0.68, 0.68, 0.68] } }
                                    }));
                                    _b = (_a = console).log;
                                    return [4 /*yield*/, (arrayBufferToString(AsyncSink.getFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/".concat(self.itemID, ".json"))))];
                                case 1:
                                    _b.apply(_a, [_c.sent()]);
                                    return [4 /*yield*/, fetch(self.itemTexture)];
                                case 2:
                                    response = _c.sent();
                                    return [4 /*yield*/, response.arrayBuffer()];
                                case 3:
                                    buffer = _c.sent();
                                    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/".concat(self.itemID, ".png"), buffer);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                if (!ModAPI.is_1_12) {
                    ModAPI.dedicatedServer.appendCode("globalThis.registerServerItem(\"".concat(this.itemID, "\", ").concat(this.itemStack, ", ").concat(this.onRightClick, ", ").concat(this.onItemUse, ");"));
                    ModAPI.addEventListener("lib:asyncsink", function () { return __awaiter(_this, void 0, void 0, function () {
                        var response, buffer;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    ModAPI.addEventListener("lib:asyncsink:registeritems", function (renderItem) {
                                        renderItem.registerItem(custom_item, ModAPI.util.str(self.itemID));
                                    });
                                    AsyncSink.L10N.set("item.".concat(self.itemID, ".name"), self.itemName);
                                    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/".concat(self.itemID, ".json"), JSON.stringify({
                                        "parent": "builtin/generated",
                                        "textures": {
                                            "layer0": "items/".concat(self.itemID)
                                        },
                                        "display": {
                                            "thirdperson_righthand": {
                                                "rotation": [0, -90, 55],
                                                "translation": [0, 4, 0.5],
                                                "scale": [0.85, 0.85, 0.85]
                                            },
                                            "thirdperson_lefthand": {
                                                "rotation": [0, 90, -55],
                                                "translation": [0, 4, 0.5],
                                                "scale": [0.85, 0.85, 0.85]
                                            },
                                            "firstperson_righthand": {
                                                "rotation": [0, -90, 25],
                                                "translation": [1.13, 3.2, 1.13],
                                                "scale": [0.68, 0.68, 0.68]
                                            },
                                            "firstperson_lefthand": {
                                                "rotation": [0, 90, -25],
                                                "translation": [1.13, 3.2, 1.13],
                                                "scale": [0.68, 0.68, 0.68]
                                            }
                                        }
                                    }));
                                    return [4 /*yield*/, fetch(self.itemTexture)];
                                case 1:
                                    response = _a.sent();
                                    return [4 /*yield*/, response.arrayBuffer()];
                                case 2:
                                    buffer = _a.sent();
                                    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/".concat(self.itemID, ".png"), buffer);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [2 /*return*/];
            });
        });
    };
    return OItem;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OItem);


/***/ }),

/***/ "./src/classes/core/ORecipe.ts":
/*!*************************************!*\
  !*** ./src/classes/core/ORecipe.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OFurnanceRecipe: () => (/* binding */ OFurnanceRecipe),
/* harmony export */   ORecipe: () => (/* binding */ ORecipe),
/* harmony export */   registerOvenMDKFurnaceRecipe: () => (/* binding */ registerOvenMDKFurnaceRecipe),
/* harmony export */   registerOvenMDKRecipe: () => (/* binding */ registerOvenMDKRecipe)
/* harmony export */ });
function registerOvenMDKRecipe(pattern, result) {
    function $$internalRegister() {
        var $$ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;
        var $$ToChar = function (char) {
            return ModAPI.reflect
                .getClassById("java.lang.Character")
                .staticMethods.valueOf.method(char.charCodeAt(0));
        };
        var parseEntry = function (entry) {
            var type;
            var id = entry;
            var meta = 0;
            if (id.includes("@")) {
                var parts = id.split("@");
                id = parts[0];
                meta = parseInt(parts[1], 10) || 0;
            }
            if (id.startsWith("block/")) {
                type = "block";
                id = id.replace("block/", "");
            }
            else if (id.startsWith("item/")) {
                type = "item";
                id = id.replace("item/", "");
            }
            else {
                if (ModAPI.blocks[id]) {
                    type = "block";
                }
                else if (ModAPI.items[id]) {
                    type = "item";
                }
                else {
                    throw new Error("Unknown item/block id: ".concat(entry));
                }
            }
            return { type: type, id: id, meta: meta };
        };
        var patternEntries = pattern.split(",");
        var $$recipeLegend = {};
        patternEntries.forEach(function (entry, i) {
            $$recipeLegend[String.fromCharCode(65 + i)] = parseEntry(entry);
        });
        var $$recipePattern = ["ABC", "DEF", "GHI"];
        var $$itemStackFromBlockWithMeta = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[2];
        var $$itemStackFromItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[4];
        var $$recipeInternal = [];
        Object.keys($$recipeLegend).forEach(function (key) {
            $$recipeInternal.push($$ToChar(key));
            var ing = $$recipeLegend[key];
            var ingredient = (ing.type === "block")
                ? $$itemStackFromBlockWithMeta(ModAPI.blocks[ing.id].getRef(), 1, ing.meta)
                : $$itemStackFromItem(ModAPI.items[ing.id].getRef(), 1, ing.meta || 0);
            $$recipeInternal.push(ingredient);
        });
        var $$recipeContents = $$recipePattern.map(function (row) { return ModAPI.util.str(row); });
        var $$recipe = ModAPI.util.makeArray($$ObjectClass, $$recipeContents.concat($$recipeInternal));
        // Parse result
        var res = parseEntry(result);
        var $$resultItem = (res.type === "block")
            ? $$itemStackFromBlockWithMeta(ModAPI.blocks[res.id].getRef(), 1, res.meta)
            : $$itemStackFromItem(ModAPI.items[res.id].getRef(), 1, res.meta || 0);
        var $$craftingManager = ModAPI.reflect.getClassById("net.minecraft.item.crafting.CraftingManager")
            .staticMethods.getInstance.method();
        ModAPI.hooks.methods.nmic_CraftingManager_addRecipe($$craftingManager, $$resultItem, $$recipe);
    }
    ;
    if (ModAPI.items) {
        $$internalRegister();
    }
    else {
        ModAPI.addEventListener("bootstrap", $$internalRegister);
    }
}
function ORecipe(A, B, C, D, E, F, G, H, I, resultItem) {
    var patternString = "".concat(A, ",").concat(B, ",").concat(C, ",").concat(D, ",").concat(E, ",").concat(F, ",").concat(G, ",").concat(H, ",").concat(I);
    if (ModAPI.is_1_12) {
        console.warn("ORecipes do not work in 1.12.2 please use 1.8 for ORecipes!");
    }
    else {
        if (!ModAPI.server) {
            ModAPI.dedicatedServer.appendCode("globalThis.registerServerORecipe(\"".concat(patternString, "\", \"").concat(resultItem, "\");"));
        }
        globalThis.registerOvenMDKRecipe(patternString, resultItem);
    }
    ;
}
function registerOvenMDKFurnaceRecipe(input_item, resultItem, experience) {
    function $$internalRegister() {
        var $$itemStackFromBlockWithMeta = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[2];
        var $$itemStackFromItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[4];
        var parseEntry = function (entry) {
            var type;
            var id = entry;
            var meta = 0;
            if (id.includes("@")) {
                var parts = id.split("@");
                id = parts[0];
                meta = parseInt(parts[1], 10) || 0;
            }
            if (id.startsWith("block/")) {
                type = "block";
                id = id.replace("block/", "");
            }
            else if (id.startsWith("item/")) {
                type = "item";
                id = id.replace("item/", "");
            }
            else {
                if (ModAPI.blocks[id]) {
                    type = "block";
                }
                else if (ModAPI.items[id]) {
                    type = "item";
                }
                else {
                    throw new Error("Unknown item/block id: ".concat(entry));
                }
            }
            return { type: type, id: id, meta: meta };
        };
        var input = parseEntry(input_item);
        var output = parseEntry(resultItem);
        var $$inputStack = (input.type === "block")
            ? $$itemStackFromBlockWithMeta(ModAPI.blocks[input.id].getRef(), 1, input.meta)
            : $$itemStackFromItem(ModAPI.items[input.id].getRef(), 1, input.meta || 0);
        var $$outputStack = (output.type === "block")
            ? $$itemStackFromBlockWithMeta(ModAPI.blocks[output.id].getRef(), 1, output.meta)
            : $$itemStackFromItem(ModAPI.items[output.id].getRef(), 1, output.meta || 0);
        var $$furnaceRecipes = ModAPI.reflect.getClassById("net.minecraft.item.crafting.FurnaceRecipes")
            .staticMethods.instance.method();
        ModAPI.hooks.methods.nmic_FurnaceRecipes_addSmelting($$furnaceRecipes, $$inputStack, $$outputStack, experience);
    }
    if (ModAPI.items) {
        $$internalRegister();
    }
    else {
        ModAPI.addEventListener("bootstrap", $$internalRegister);
    }
}
function OFurnanceRecipe(input_item, resultItem, experience) {
    if (ModAPI.is_1_12) {
        console.warn("OFurnaceRecipes do not work in 1.12.2 please use 1.8 for OFurnaceRecipes!");
    }
    else {
        if (!ModAPI.server) {
            ModAPI.dedicatedServer.appendCode("globalThis.registerServerORecipe(\"".concat(input_item, "\", \"").concat(resultItem, "\", ").concat(experience, ");"));
        }
        globalThis.registerOvenMDKFurnaceRecipe(input_item, resultItem, experience);
    }
    ;
}


/***/ }),

/***/ "./src/classes/core/Oven.ts":
/*!**********************************!*\
  !*** ./src/classes/core/Oven.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Oven.ts
    
    Copyright 2025 BendieGames and Block_2222
    Licenced under GNU LGPL-3.0-or-later
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    This file is part of OvenMDK.

    OvenMDK is free software: you can redistribute it and/or modify it under
    the terms of the GNU Lesser General Public License as published by the Free
    Software Foundation, either version 3 of the License, or (at your option)
    any later version.

    OvenMDK is distributed in the hope that it will be useful, but WITHOUT ANY
    WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License along
    with Oven MDK. If not, see <https://www.gnu.org/licenses/>.
*/
var Oven = /** @class */ (function () {
    function Oven() {
    }
    Oven.registerMod = function (modClass) {
        ModAPI.meta.title(modClass.title);
        ModAPI.meta.version(modClass.version);
        ModAPI.meta.description(modClass.description);
        ModAPI.meta.credits(modClass.credits);
        ModAPI.meta.icon(modClass.icon);
        ModAPI.meta.config(modClass.config);
        globalThis.Debug_mode = modClass.Debug_mode;
        ModAPI.dedicatedServer.appendCode("globalThis.Debug_mode = ".concat(modClass.Debug_mode, ";"));
        modClass.init();
        this.mods.push(modClass);
    };
    Oven.mods = [];
    Oven.util = {
        oggtoBase64string: function (ogg) {
            var base64 = btoa(new Uint8Array(ogg.split(",").map(function (x) { return parseInt(x, 10); })).reduce(function (data, byte) { return data + String.fromCharCode(byte); }, ""));
            return base64;
        },
    };
    return Oven;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Oven);


/***/ }),

/***/ "./src/classes/core/OvenOre.ts":
/*!*************************************!*\
  !*** ./src/classes/core/OvenOre.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Oven Mod Development Kit (OvenMDK) Runtime
  Dev kit used for simplifying EaglerForge mod development.
    
  Copyright 2025 BendieGames and Block_2222
    Licenced under GNU LGPL-3.0-or-later
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    This file is part of OvenMDK.

    OvenMDK is free software: you can redistribute it and/or modify it under
    the terms of the GNU Lesser General Public License as published by the Free
    Software Foundation, either version 3 of the License, or (at your option)
    any later version.

    OvenMDK is distributed in the hope that it will be useful, but WITHOUT ANY
    WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License along
    with Oven MDK. If not, see <https://www.gnu.org/licenses/>.
*/
var OvenOre = /** @class */ (function () {
    function OvenOre(blockID, veinSize, veinCount, minGenerationHeight, maxGenerationHeight) {
        this.blockID = blockID;
        this.veinSize = veinSize;
        this.veinCount = veinCount;
        this.minGenerationHeight = minGenerationHeight;
        this.maxGenerationHeight = maxGenerationHeight;
    }
    OvenOre.prototype.registerOvenOre = function () {
        ModAPI.dedicatedServer.appendCode("globalThis.registerOvenOreServer(\"".concat(this.blockID, "\",").concat(this.veinSize, ",").concat(this.veinCount, ",").concat(this.minGenerationHeight, ",").concat(this.maxGenerationHeight, ");"));
    };
    return OvenOre;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OvenOre);


/***/ }),

/***/ "./src/classes/core/commands.ts":
/*!**************************************!*\
  !*** ./src/classes/core/commands.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   simplecommand: () => (/* binding */ simplecommand)
/* harmony export */ });
/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    commands.ts
    
    Copyright 2025 BendieGames and Block_2222
    Licenced under GNU LGPL-3.0-or-later
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    This file is part of OvenMDK.

    OvenMDK is free software: you can redistribute it and/or modify it under
    the terms of the GNU Lesser General Public License as published by the Free
    Software Foundation, either version 3 of the License, or (at your option)
    any later version.

    OvenMDK is distributed in the hope that it will be useful, but WITHOUT ANY
    WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License along
    with Oven MDK. If not, see <https://www.gnu.org/licenses/>.
*/
function simplecommand(prefix, name, onExecute) {
    ModAPI.addEventListener("sendchatmessage", function (e) {
        if (e.message.toLowerCase().startsWith("".concat(prefix).concat(name))) {
            e.preventDefault = true;
            onExecute();
        }
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ASSETS_defaultIcon_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ASSETS/defaultIcon.png */ "./src/ASSETS/defaultIcon.png");
/* harmony import */ var classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classes/core/Helper_func */ "./src/classes/core/Helper_func.ts");
/* harmony import */ var classes_core_OItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classes/core/OItem */ "./src/classes/core/OItem.ts");
/* harmony import */ var classes_core_Mod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classes/core/Mod */ "./src/classes/core/Mod.ts");
/* harmony import */ var classes_core_Oven__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classes/core/Oven */ "./src/classes/core/Oven.ts");
/* harmony import */ var classes_core_OBlock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classes/core/OBlock */ "./src/classes/core/OBlock.ts");
/* harmony import */ var classes_core_commands__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! classes/core/commands */ "./src/classes/core/commands.ts");
/* harmony import */ var _classes_core_OEntity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./classes/core/OEntity */ "./src/classes/core/OEntity.ts");
/* harmony import */ var classes_core_OvenOre__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! classes/core/OvenOre */ "./src/classes/core/OvenOre.ts");
/* harmony import */ var classes_core_ORecipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! classes/core/ORecipe */ "./src/classes/core/ORecipe.ts");
/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Oven Mod Development Kit (OvenMDK) Runtime
  Dev kit used for simplifying EaglerForge mod development.
    
  Copyright 2025 BendieGames and Block_2222
    Licenced under GNU LGPL-3.0-or-later
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    This file is part of OvenMDK.

    OvenMDK is free software: you can redistribute it and/or modify it under
    the terms of the GNU Lesser General Public License as published by the Free
    Software Foundation, either version 3 of the License, or (at your option)
    any later version.

    OvenMDK is distributed in the hope that it will be useful, but WITHOUT ANY
    WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License along
    with Oven MDK. If not, see <https://www.gnu.org/licenses/>.
*/

ModAPI.meta.title("OvenMDK Runtime");
ModAPI.meta.version("Alpha v0.3");
ModAPI.meta.description("Unofficial dev kit used for simplifying EaglerForge mod development.");
ModAPI.meta.credits("BendieGames and Block_2222");
ModAPI.meta.icon(ASSETS_defaultIcon_png__WEBPACK_IMPORTED_MODULE_0__);









var devmode = true;
ModAPI.events.newEvent("lib:OvenMDK:load");
ModAPI.events.newEvent("lib:OvenMDK:loaded");
ModAPI.addEventListener("lib:OvenMDK:load", function () {
    console.log("OvenMDK Runtime is loading");
    console.log("Loading OvenMDK globals");
    globalThis.registerServerItem = classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerServerItem;
    globalThis.registerServerBlock = classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerServerBlock;
    globalThis.registerEntityServer = classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerEntityServer;
    globalThis.OItem = classes_core_OItem__WEBPACK_IMPORTED_MODULE_2__["default"];
    globalThis.OMod = classes_core_Mod__WEBPACK_IMPORTED_MODULE_3__["default"];
    globalThis.OvenMDK = classes_core_Oven__WEBPACK_IMPORTED_MODULE_4__["default"];
    globalThis.OBlock = classes_core_OBlock__WEBPACK_IMPORTED_MODULE_5__["default"];
    globalThis.simplecommand = classes_core_commands__WEBPACK_IMPORTED_MODULE_6__.simplecommand;
    globalThis.OvenOre = classes_core_OvenOre__WEBPACK_IMPORTED_MODULE_8__["default"];
    globalThis.registerOvenOreServer = classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerOvenOreServer;
    globalThis.OEntity = _classes_core_OEntity__WEBPACK_IMPORTED_MODULE_7__["default"];
    globalThis.ORecipe = classes_core_ORecipe__WEBPACK_IMPORTED_MODULE_9__.ORecipe;
    globalThis.registerOvenMDKRecipe = classes_core_ORecipe__WEBPACK_IMPORTED_MODULE_9__.registerOvenMDKRecipe;
    globalThis.OFurnanceRecipe = classes_core_ORecipe__WEBPACK_IMPORTED_MODULE_9__.OFurnanceRecipe;
    globalThis.registerOvenMDKFurnaceRecipe = classes_core_ORecipe__WEBPACK_IMPORTED_MODULE_9__.registerOvenMDKFurnaceRecipe;
    if (ModAPI.is_1_12) {
        if (!devmode) {
            alert("OvenMDK does not fully support 1.12 at this time, please use 1.8.8 for full support");
            console.log("1.12 detected");
            console.error("OvenMDK does not fully support 1.12 at this time, please use 1.8.8 for full support");
        }
    }
    console.log("OvenMDK globals have been set and loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerServerItem = ".concat(classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerServerItem, ";"));
    console.log("Register Item serverside function loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerOvenOreServer = ".concat(classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerOvenOreServer, ";"));
    console.log("Register Oven Ore serverside function loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerServerORecipe = ".concat(classes_core_ORecipe__WEBPACK_IMPORTED_MODULE_9__.registerOvenMDKRecipe, ";"));
    console.log("Register ORecipe serverside function loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerServerOFurnanceRecipe = ".concat(classes_core_ORecipe__WEBPACK_IMPORTED_MODULE_9__.registerOvenMDKFurnaceRecipe, ";"));
    console.log("Register OFurnanceRecipe serverside function loaded");
    ModAPI.dedicatedServer.appendCode(classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.OvenMDK__defineExecCmdAsGlobal);
    (0,classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.OvenMDK__defineExecCmdAsGlobal)();
    console.log("OvenMDK__ExecCmdAsGlobal serverside and clientside function loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerServerBlock = ".concat(classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerServerBlock, ";"));
    console.log("Register Entity serverside function loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerEntityServer = ".concat(classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerEntityServer, ";"));
    console.log("Register Block serverside function loaded");
    ModAPI.events.callEvent("lib:OvenMDK:loaded", { version: "v0.4" });
});
ModAPI.addEventListener("lib:OvenMDK:loaded", function (event) {
    console.log("OvenMDK Runtime has finished loading");
    console.log("\n    \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n    \u2502                                   \u2502\n    \u2502   OvenMDK has loaded              \u2502\n    \u2502                                   \u2502\n    \u2502   welcome to ovenMDK              \u2502\n    \u2502                                   \u2502\n    \u2502   A mod dev kit for starters      \u2502\n    \u2502                                   \u2502\n    \u2502   Version: ".concat(event.version, "                   \u2502\n    \u2502                                   \u2502\n    \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n    "));
    (0,classes_core_commands__WEBPACK_IMPORTED_MODULE_6__.simplecommand)("/ovenmdk", " log_1", function () {
        ModAPI.displayToChat("\n      OvenMDK Runtime v0.1\n      Made by BendieGames and Block_2222\n      - Added basic core classes\n      ( Not much can be documented due to so little being added )");
    });
    (0,classes_core_commands__WEBPACK_IMPORTED_MODULE_6__.simplecommand)("/ovenmdk", " log_2", function () {
        ModAPI.displayToChat("\n      OvenMDK Runtime v0.2\n      Made by BendieGames and Block_2222\n      - Added support for 1.12\n      - Added support for OvenOre\n      - Added support for OEntity\n      - QOL improvements\n      - Added support for OvenMDK__ExecCmdAsGlobal\n      - Added support for OvenMDK__defineExecCmdAsGlobal\n      - Added support for simplecommands");
    });
    (0,classes_core_commands__WEBPACK_IMPORTED_MODULE_6__.simplecommand)("/ovenmdk", " log_3", function () {
        ModAPI.displayToChat("\n      OvenMDK Runtime v0.3\n      Made by BendieGames\n      - Added more OEntity customization\n        - Added more support for Model hitboexes\n        - Added custom entity sound support\n        - Added custom crafting recipes however they are not finished yet ( Broken in 1.12)\n        - Attempted to fix items textures on 1.12 with no success");
    });
});
ModAPI.addCredit("OvenMDK Runtime", "BendieGames", " - Made OvenMDK\n - Coded most of OvenMDK");
ModAPI.addCredit("OvenMDK Runtime", "Block_2222", " - Founded OvenMDK");
ModAPI.events.callEvent("lib:OvenMDK:load", {});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0ZBQWtGLHdCQUF3QjtBQUMxRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0ZBQWdGO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0ZBQWtGLHdCQUF3QjtBQUMxRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELHdCQUF3QjtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBOEUsd0JBQXdCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEU7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBOEUsd0JBQXdCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCx3QkFBd0I7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1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QUMvQjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQywrQkFBK0I7QUFDL0I7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQSw4RUFBOEUsd0JBQXdCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEU7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBOEUsd0JBQXdCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCx3QkFBd0I7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsK0RBQStEO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTLElBQUk7QUFDYixzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1UQUFtVDtBQUNuVDtBQUNBLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTLElBQUk7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQUEsaUJBTUc7QUFDWCxRQUFRO0FBQUEsRUFBd0I7QUFDaEMsUUFBUTtBQUFBLEVBQWdCO0FBQ3hCO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM1WXZCLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBLG1CQUFtQixTQUFJLElBQUksU0FBSTtBQUMvQixjQUFjLDZCQUE2QiwwQkFBMEIsY0FBYyxxQkFBcUI7QUFDeEcsNklBQTZJLGNBQWM7QUFDM0osdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMsbUNBQW1DLFNBQVM7QUFDNUMsbUNBQW1DLFdBQVcsVUFBVTtBQUN4RCwwQ0FBMEMsY0FBYztBQUN4RDtBQUNBLDhHQUE4RyxPQUFPO0FBQ3JILGlGQUFpRixpQkFBaUI7QUFDbEcseURBQXlELGdCQUFnQixRQUFRO0FBQ2pGLCtDQUErQyxnQkFBZ0IsZ0JBQWdCO0FBQy9FO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxVQUFVLFlBQVksYUFBYSxTQUFTLFVBQVU7QUFDdEQsb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRSx5QkFBeUI7QUFDcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0TUFBNE07QUFDNU0sMkVBQTJFO0FBQzNFO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QyxxREFBcUQsMkJBQTJCLG1GQUFtRiw0QkFBNEIsbUZBQW1GLDZCQUE2Qix5RkFBeUYsNEJBQTRCO0FBQ3BhLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixxQkFBcUIsSUFBSTtBQUN6QjtBQUNBO0FBQ0EsNE1BQTRNO0FBQzVNLDJFQUEyRTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIscUJBQXFCLElBQUk7QUFDekI7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRCxpRUFBZSxLQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pTZDtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULG9FQUFvRSw4QkFBOEI7QUFDbEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0SUFBNEk7QUFDNUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtLQUFrSztBQUNsSztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN2SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1HQUFtRztBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0UseUJBQXlCLGtDQUFrQywwQ0FBMEM7QUFDcEw7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRCxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzlDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2T0FBNk87QUFDN087QUFDQTtBQUNBLENBQUM7QUFDRCxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3BDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7O1VDN0JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsbURBQUk7QUFDNEk7QUFDMUg7QUFDSDtBQUNDO0FBQ0k7QUFDYTtBQUNUO0FBQ0Y7QUFDMEU7QUFDckg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHdFQUFrQjtBQUN0RCxxQ0FBcUMseUVBQW1CO0FBQ3hELHNDQUFzQywwRUFBb0I7QUFDMUQsdUJBQXVCLDBEQUFLO0FBQzVCLHNCQUFzQix3REFBSTtBQUMxQix5QkFBeUIseURBQUk7QUFDN0Isd0JBQXdCLDJEQUFNO0FBQzlCLCtCQUErQixnRUFBYTtBQUM1Qyx5QkFBeUIsNERBQU87QUFDaEMsdUNBQXVDLDJFQUFxQjtBQUM1RCx5QkFBeUIsNkRBQU87QUFDaEMseUJBQXlCLHlEQUFPO0FBQ2hDLHVDQUF1Qyx1RUFBcUI7QUFDNUQsaUNBQWlDLGlFQUFlO0FBQ2hELDhDQUE4Qyw4RUFBNEI7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdGQUFnRix3RUFBa0IsSUFBSTtBQUN0RztBQUNBLG1GQUFtRiwyRUFBcUIsSUFBSTtBQUM1RztBQUNBLG1GQUFtRix1RUFBcUIsSUFBSTtBQUM1RztBQUNBLDJGQUEyRiw4RUFBNEIsSUFBSTtBQUMzSDtBQUNBLHNDQUFzQyxvRkFBOEI7QUFDcEUsSUFBSSx3RkFBOEI7QUFDbEM7QUFDQSxpRkFBaUYseUVBQW1CLElBQUk7QUFDeEc7QUFDQSxrRkFBa0YsMEVBQW9CLElBQUk7QUFDMUc7QUFDQSxvREFBb0QsaUJBQWlCO0FBQ3JFLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxJQUFJLG9FQUFhO0FBQ2pCO0FBQ0EsS0FBSztBQUNMLElBQUksb0VBQWE7QUFDakI7QUFDQSxLQUFLO0FBQ0wsSUFBSSxvRUFBYTtBQUNqQjtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBLDhDQUE4QyIsInNvdXJjZXMiOlsid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvSGVscGVyX2Z1bmMudHMiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lLy4vc3JjL2NsYXNzZXMvY29yZS9Nb2QudHMiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lLy4vc3JjL2NsYXNzZXMvY29yZS9PQmxvY2sudHMiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lLy4vc3JjL2NsYXNzZXMvY29yZS9PRW50aXR5LnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvT0l0ZW0udHMiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lLy4vc3JjL2NsYXNzZXMvY29yZS9PUmVjaXBlLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvT3Zlbi50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL092ZW5PcmUudHMiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lLy4vc3JjL2NsYXNzZXMvY29yZS9jb21tYW5kcy50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICAgIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cbiAgICBIZWxwZXJfZnVuYy50c1xuICAgIFxuICAgIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyU2VydmVySXRlbShpdGVtSUQsIGl0ZW1TdGFjaywgb25SaWdodENsaWNrLCBvbkl0ZW1Vc2UpIHtcbiAgICAvKmlmIChpc1NlcnZlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlZ2lzdGVyU2VydmVySXRlbSBjYW4gb25seSBiZSB1c2VkIG9uIHRoZSBzZXJ2ZXIgc2lkZS5cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfSovXG4gICAgdmFyIGNyZWF0aXZlTWlzY1RhYjtcbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgY3JlYXRpdmVNaXNjVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLk1JU0M7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjcmVhdGl2ZU1pc2NUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMudGFiTWlzYztcbiAgICB9XG4gICAgdmFyICQkaXRlbUdldEF0dHJpYnV0ZXMgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKS5tZXRob2RzLmdldEl0ZW1BdHRyaWJ1dGVNb2RpZmllcnMubWV0aG9kO1xuICAgIHZhciBpdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICB2YXIgaXRlbVN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoaXRlbUNsYXNzLCBmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuLmxlbmd0aCA9PT0gMTsgfSk7XG4gICAgLyppZiAoaXNTZXJ2ZXIgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInVzaW5nIHNlcnZlciBzaWRlIHJlZ2lzdGVyU2VydmVySXRlbVwiKTtcbiAgICAgIH0qL1xuICAgIGZ1bmN0aW9uIG5taV9PdmVuSXRlbSgpIHtcbiAgICAgICAgaXRlbVN1cGVyKHRoaXMpO1xuICAgICAgICB0aGlzLiRzZXRDcmVhdGl2ZVRhYihjcmVhdGl2ZU1pc2NUYWIpO1xuICAgICAgICB0aGlzLiRtYXhTdGFja1NpemUgPSBpdGVtU3RhY2s7XG4gICAgfVxuICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKGl0ZW1DbGFzcywgbm1pX092ZW5JdGVtKTtcbiAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVJpZ2h0Q2xpY2sgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7XG4gICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKVxuICAgICAgICAgICAgICAgICQkcGxheWVyLiRzZXRJdGVtSW5Vc2UoJCRpdGVtc3RhY2ssIDMyKTtcbiAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXI7XG4gICAgICAgICAgICBvblJpZ2h0Q2xpY2soJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKTtcbiAgICAgICAgICAgIGlmIChnbG9iYWxUaGlzLkRlYnVnX21vZGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlcnZlciBpdGVtc3RhY2s6XCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkJGl0ZW1zdGFjaztcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIHZhciAkJFJlc3VsdEVudW0gPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkVudW1BY3Rpb25SZXN1bHRcIikuc3RhdGljVmFyaWFibGVzO1xuICAgICAgICB2YXIgJCRBY3Rpb25SZXN1bHQgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkFjdGlvblJlc3VsdFwiKS5jb25zdHJ1Y3RvcnNbMF07XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVJpZ2h0Q2xpY2sgPSBmdW5jdGlvbiAoJCR3b3JsZCwgJCRwbGF5ZXIsICRoYW5kRW51bSwgJHVudXNlZCkge1xuICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrID0gJCRwbGF5ZXIuJGdldEhlbGRJdGVtKCRoYW5kRW51bSk7XG4gICAgICAgICAgICAkJHBsYXllci4kc2V0QWN0aXZlSGFuZCgkaGFuZEVudW0pO1xuICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcjtcbiAgICAgICAgICAgIG9uUmlnaHRDbGljaygkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpO1xuICAgICAgICAgICAgaWYgKGdsb2JhbFRoaXMuRGVidWdfbW9kZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VydmVyIGl0ZW1zdGFjazpcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJCRpdGVtc3RhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICQkQWN0aW9uUmVzdWx0KCQkUmVzdWx0RW51bS5TVUNDRVNTLCAkJGl0ZW1zdGFjayk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtVXNlMCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCRwbGF5ZXIsICQkd29ybGQsICQkYmxvY2twb3MpIHtcbiAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIsICQkYmxvY2twb3M7XG4gICAgICAgICAgICBpZiAob25JdGVtVXNlKSB7XG4gICAgICAgICAgICAgICAgb25JdGVtVXNlKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRibG9ja3Bvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWVudCBpdGVtc3RhY2s6XCIpO1xuICAgICAgICAgICAgaWYgKGdsb2JhbFRoaXMuRGVidWdfbW9kZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgdmFyICQkUmVzdWx0RW51bSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiRW51bUFjdGlvblJlc3VsdFwiKS5zdGF0aWNWYXJpYWJsZXM7XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVVzZSA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCRwbGF5ZXIsICQkd29ybGQsICQkYmxvY2twb3MpIHtcbiAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCRwbGF5ZXIsICQkd29ybGQsICQkYmxvY2twb3M7XG4gICAgICAgICAgICBpZiAob25JdGVtVXNlKSB7XG4gICAgICAgICAgICAgICAgb25JdGVtVXNlKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRibG9ja3Bvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJCRSZXN1bHRFbnVtLlBBU1M7XG4gICAgICAgIH07XG4gICAgfVxuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uVXBkYXRlID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRob3RiYXJfc2xvdCwgJCRpc19oZWxkKSB7XG4gICAgICAgICQkaXNfaGVsZCA9ICQkaXNfaGVsZCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgcmV0dXJuICQkaXRlbXN0YWNrO1xuICAgIH07XG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtVXNlRmluaXNoID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcikge1xuICAgICAgICByZXR1cm4gJCRpdGVtc3RhY2s7XG4gICAgfTtcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRnZXRNYXhJdGVtVXNlRHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAzMjtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldEl0ZW1BdHRyaWJ1dGVNb2RpZmllcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vMS4xMiB3b3JrcyBpIHRoaW5rXG4gICAgICAgIHZhciAkJGF0dHJpYnV0ZW1hcCA9ICQkaXRlbUdldEF0dHJpYnV0ZXMuYXBwbHkodGhpcywgW10pO1xuICAgICAgICByZXR1cm4gJCRhdHRyaWJ1dGVtYXA7XG4gICAgfTtcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRnZXRTdHJWc0Jsb2NrID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJGJsb2NrKSB7XG4gICAgICAgIHJldHVybiAxLjA7XG4gICAgfTtcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkNyZWF0ZWQgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7XG4gICAgICAgIC8vMS4xMiB3b3Jrc1xuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkJsb2NrRGVzdHJveWVkID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJGJsb2NrLCAkJGJsb2NrcG9zLCAkJGVudGl0eSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xuICAgIHZhciBpbnRlcm5hbF9yZWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpdGVtSW5zdGFuY2UgPSBuZXcgbm1pX092ZW5JdGVtKCkuJHNldFVubG9jYWxpemVkTmFtZShNb2RBUEkudXRpbC5zdHIoXCJcIi5jb25jYXQoaXRlbUlEKSkpO1xuICAgICAgICBpdGVtQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3Rlckl0ZW0ubWV0aG9kKE1vZEFQSS5rZXlnZW4uaXRlbShcIlwiLmNvbmNhdChpdGVtSUQpKSwgTW9kQVBJLnV0aWwuc3RyKFwiXCIuY29uY2F0KGl0ZW1JRCkpLCBpdGVtSW5zdGFuY2UpO1xuICAgICAgICBNb2RBUEkuaXRlbXNbXCJcIi5jb25jYXQoaXRlbUlEKV0gPSBpdGVtSW5zdGFuY2U7XG4gICAgICAgIGlmIChnbG9iYWxUaGlzLkRlYnVnX21vZGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW1JbnN0YW5jZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyZWQgT3Zlbk1ESyBpdGVtICggU2VydmVyIFNpZGUgKVwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbUluc3RhbmNlO1xuICAgIH07XG4gICAgaWYgKE1vZEFQSS5pdGVtcykge1xuICAgICAgICByZXR1cm4gaW50ZXJuYWxfcmVnKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImJvb3RzdHJhcFwiLCBpbnRlcm5hbF9yZWcpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclNlcnZlckJsb2NrKGJsb2NrSUQsIG9uQnJlYWspIHtcbiAgICB2YXIgQmxvY2tDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIik7XG4gICAgdmFyIEl0ZW1DbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpO1xuICAgIHZhciBjcmVhdGl2ZVRhYjtcbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgY3JlYXRpdmVUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMuQlVJTERJTkdfQkxPQ0tTO1xuICAgIH1cbiAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIGNyZWF0aXZlVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLnRhYkJsb2NrO1xuICAgIH1cbiAgICB2YXIgYmxvY2tTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKEJsb2NrQ2xhc3MsIGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZm4ubGVuZ3RoID09PSAyOyB9KTtcbiAgICB2YXIgYnJlYWtCbG9ja01ldGhvZCA9IEJsb2NrQ2xhc3MubWV0aG9kcy5icmVha0Jsb2NrLm1ldGhvZDtcbiAgICBmdW5jdGlvbiBubWJfT2Jsb2NrKCkge1xuICAgICAgICBibG9ja1N1cGVyKHRoaXMsIE1vZEFQSS5tYXRlcmlhbHMucm9jay5nZXRSZWYoKSk7XG4gICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIHRoaXMuJGRlZmF1bHRCbG9ja1N0YXRlID0gdGhpcy4kYmxvY2tTdGF0ZS4kZ2V0QmFzZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kc2V0Q3JlYXRpdmVUYWIoY3JlYXRpdmVUYWIpO1xuICAgIH1cbiAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhCbG9ja0NsYXNzLCBubWJfT2Jsb2NrKTtcbiAgICBubWJfT2Jsb2NrLnByb3RvdHlwZS4kYnJlYWtCbG9jayA9IGZ1bmN0aW9uICgkd29ybGQsICRibG9ja3BvcywgJGJsb2Nrc3RhdGUpIHtcbiAgICAgICAgLy9vbkJyZWFrKCR3b3JsZCwgJGJsb2NrcG9zLCAkYmxvY2tzdGF0ZSk7XG4gICAgICAgIHJldHVybiBicmVha0Jsb2NrTWV0aG9kKHRoaXMsICR3b3JsZCwgJGJsb2NrcG9zLCAkYmxvY2tzdGF0ZSk7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBmaXh1cEJsb2NrSWRzKCkge1xuICAgICAgICB2YXIgYmxvY2tSZWdpc3RyeSA9IE1vZEFQSS51dGlsXG4gICAgICAgICAgICAud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpLnN0YXRpY1ZhcmlhYmxlc1xuICAgICAgICAgICAgLmJsb2NrUmVnaXN0cnkpXG4gICAgICAgICAgICAuZ2V0Q29ycmVjdGl2ZSgpO1xuICAgICAgICB2YXIgQkxPQ0tfU1RBVEVfSURTID0gTW9kQVBJLnV0aWxcbiAgICAgICAgICAgIC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIikuc3RhdGljVmFyaWFibGVzXG4gICAgICAgICAgICAuQkxPQ0tfU1RBVEVfSURTKVxuICAgICAgICAgICAgLmdldENvcnJlY3RpdmUoKTtcbiAgICAgICAgYmxvY2tSZWdpc3RyeS5yZWdpc3RyeU9iamVjdHMuaGFzaFRhYmxlS1RvVi5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGJsb2NrXzEgPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsaWRTdGF0ZXMgPSBibG9ja18xLmdldEJsb2NrU3RhdGUoKS5nZXRWYWxpZFN0YXRlcygpO1xuICAgICAgICAgICAgICAgIHZhciBzdGF0ZUFycmF5ID0gdmFsaWRTdGF0ZXMuYXJyYXkgfHwgW3ZhbGlkU3RhdGVzLmVsZW1lbnRdO1xuICAgICAgICAgICAgICAgIHN0YXRlQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaWJsb2Nrc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoYmxvY2tSZWdpc3RyeS5nZXRJREZvck9iamVjdChibG9ja18xLmdldFJlZigpKSA8PCA0KSB8XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja18xLmdldE1ldGFGcm9tU3RhdGUoaWJsb2Nrc3RhdGUuZ2V0UmVmKCkpO1xuICAgICAgICAgICAgICAgICAgICBCTE9DS19TVEFURV9JRFMucHV0KGlibG9ja3N0YXRlLmdldFJlZigpLCBpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBpbnRlcm5hbFJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY3VzdG9tX2Jsb2NrO1xuICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBuZXcgbm1iX09ibG9jaygpXG4gICAgICAgICAgICAgICAgLiRzZXRIYXJkbmVzcygzLjApXG4gICAgICAgICAgICAgICAgLiRzZXRTdGVwU291bmQoQmxvY2tDbGFzcy5zdGF0aWNWYXJpYWJsZXMuc291bmRUeXBlUGlzdG9uKVxuICAgICAgICAgICAgICAgIC4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihibG9ja0lEKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBuZXcgbm1iX09ibG9jaygpXG4gICAgICAgICAgICAgICAgLiRzZXRIYXJkbmVzcygzLjApXG4gICAgICAgICAgICAgICAgLiRzZXRTb3VuZFR5cGUoTW9kQVBJLmJsb2NrU291bmRzLlBMQU5ULmdldFJlZigpKVxuICAgICAgICAgICAgICAgIC4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihibG9ja0lEKSk7XG4gICAgICAgIH1cbiAgICAgICAgQmxvY2tDbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVyQmxvY2swLm1ldGhvZChNb2RBUEkua2V5Z2VuLmJsb2NrKGJsb2NrSUQpLCBNb2RBUEkudXRpbC5zdHIoYmxvY2tJRCksIGN1c3RvbV9ibG9jayk7XG4gICAgICAgIEl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbUJsb2NrMC5tZXRob2QoY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgZml4dXBCbG9ja0lkcygpO1xuICAgICAgICBNb2RBUEkuYmxvY2tzW2Jsb2NrSURdID0gY3VzdG9tX2Jsb2NrO1xuICAgICAgICBpZiAoZ2xvYmFsVGhpcy5EZWJ1Z19tb2RlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyaW5nIGJsb2NrIG9uIHNlcnZlciBzaWRlXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VzdG9tX2Jsb2NrO1xuICAgIH07XG4gICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICBpZiAoTW9kQVBJLm1hdGVyaWFscykge1xuICAgICAgICAgICAgcmV0dXJuIGludGVybmFsUmVnaXN0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsUmVnaXN0ZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICB2YXIgYmxvY2tDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIik7XG4gICAgICAgIHZhciBpdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJib290c3RyYXBcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1c3RvbV9ibG9jayA9IG5ldyBubWJfT2Jsb2NrKClcbiAgICAgICAgICAgICAgICAuJHNldEhhcmRuZXNzKDMuMClcbiAgICAgICAgICAgICAgICAuJHNldFNvdW5kVHlwZShNb2RBUEkuYmxvY2tTb3VuZHMuUExBTlQuZ2V0UmVmKCkpXG4gICAgICAgICAgICAgICAgLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKGJsb2NrSUQpKTtcbiAgICAgICAgICAgIGJsb2NrQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3RlckJsb2NrMC5tZXRob2QoTW9kQVBJLmtleWdlbi5ibG9jayhibG9ja0lEKSwgTW9kQVBJLnV0aWwuc3RyKGJsb2NrSUQpLCBjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgaXRlbUNsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJJdGVtQmxvY2swLm1ldGhvZChjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgZml4dXBCbG9ja0lkcygpO1xuICAgICAgICAgICAgTW9kQVBJLmJsb2Nrc1tibG9ja0lEXSA9IGN1c3RvbV9ibG9jaztcbiAgICAgICAgICAgIGlmIChnbG9iYWxUaGlzLkRlYnVnX21vZGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyaW5nIGJsb2NrIG9uIHNlcnZlciBzaWRlXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1c3RvbV9ibG9jayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckVudGl0eVNlcnZlcihlbnRpdHlJRCwgZW50aXR5TmFtZSwgZW50aXR5TW9kZWwsIGVudGl0eUJyZWVkSXRlbSwgZW50aXR5RHJvcEl0ZW0sIGVnZ0Jhc2UsIGVnZ1Nwb3RzKSB7XG4gICAgY29uc29sZS5sb2coXCJlbnRpdGllcyBhcmUgbm90IGZpbmlzaGVkIHlldCEgVXNlIGF0IHlvdXIgb3duIHJpc2shXCIpO1xuICAgIC8vcmV0dXJuO1xuICAgIE1vZEFQSS5ob29rcy5tZXRob2RzLmpsX1N0cmluZ19mb3JtYXQgPVxuICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5ubGV2X0hTdHJpbmdfZm9ybWF0OyAvL3RlbXBvcmFyeSB0aGluZyB0byBmaXggYW4gaXNzdWUgaW4gZWFnbGVyY3JhZnRcbiAgICAvLyBVdGlsc1xuICAgIGZ1bmN0aW9uIEFJVGFzayhuYW1lLCBsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIE1vZEFQSS5yZWZsZWN0XG4gICAgICAgICAgICAuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkuYWkuXCIgKyBuYW1lKVxuICAgICAgICAgICAgLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gbGVuZ3RoOyB9KTtcbiAgICB9XG4gICAgdmFyIFJlc291cmNlTG9jYXRpb24gPSBNb2RBUEkucmVmbGVjdFxuICAgICAgICAuZ2V0Q2xhc3NCeU5hbWUoXCJSZXNvdXJjZUxvY2F0aW9uXCIpXG4gICAgICAgIC5jb25zdHJ1Y3RvcnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDE7IH0pO1xuICAgIHZhciBFbnRpdHlQbGF5ZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkVudGl0eVBsYXllclwiKTtcbiAgICB2YXIgR2xTdGF0ZU1hbmFnZXIgPSBPYmplY3QuZnJvbUVudHJpZXMoT2JqZWN0LnZhbHVlcyhNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkdsU3RhdGVNYW5hZ2VyXCIpLnN0YXRpY01ldGhvZHMpLm1hcChmdW5jdGlvbiAoeCkgeyByZXR1cm4gW3gubWV0aG9kTmFtZVNob3J0LCB4Lm1ldGhvZF07IH0pKTtcbiAgICB2YXIgU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIlNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzXCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAvLyBTVEFSVCBDVVNUT00gRU5USVRZXG4gICAgdmFyIGVudGl0eVNpemUxO1xuICAgIHZhciBlbnRpdHlTaXplMjtcbiAgICBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxDaGlja2VuXCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjQ7IC8vIENoaWNrZW5cbiAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsQ293XCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjk7IC8vIENvd1xuICAgICAgICBlbnRpdHlTaXplMiA9IDEuNDtcbiAgICB9XG4gICAgZWxzZSBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxNb29zaHJvb21cIikge1xuICAgICAgICBlbnRpdHlTaXplMSA9IDAuOTsgLy8gTW9vc2hyb29tXG4gICAgICAgIGVudGl0eVNpemUyID0gMS40O1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFBpZ1wiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC45OyAvLyBQaWdcbiAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsU2hlZXBcIikge1xuICAgICAgICBlbnRpdHlTaXplMSA9IDAuOTsgLy8gU2hlZXBcbiAgICAgICAgZW50aXR5U2l6ZTIgPSAxLjM7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsSG9yc2VcIikge1xuICAgICAgICBlbnRpdHlTaXplMSA9IDEuMzk2NTsgLy8gSG9yc2VcbiAgICAgICAgZW50aXR5U2l6ZTIgPSAxLjY7IC8vIEhlaWdodCBjYW4gdmFyeSBzbGlnaHRseVxuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFJhYmJpdFwiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC40OyAvLyBSYWJiaXRcbiAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsU3F1aWRcIikge1xuICAgICAgICBlbnRpdHlTaXplMSA9IDAuODsgLy8gU3F1aWRcbiAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjg7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsQmF0XCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjU7IC8vIEJhdFxuICAgICAgICBlbnRpdHlTaXplMiA9IDAuOTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxPY2Vsb3RcIikge1xuICAgICAgICBlbnRpdHlTaXplMSA9IDAuNjsgLy8gT2NlbG90ICh3aWxkKVxuICAgICAgICBlbnRpdHlTaXplMiA9IDAuNztcbiAgICB9XG4gICAgZWxzZSBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxXb2xmXCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjY7IC8vIFdvbGZcbiAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjg1O1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFZpbGxhZ2VyXCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjY7IC8vIFZpbGxhZ2VyXG4gICAgICAgIGVudGl0eVNpemUyID0gMS45NTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxJcm9uR29sZW1cIikge1xuICAgICAgICBlbnRpdHlTaXplMSA9IDEuNDsgLy8gSXJvbiBHb2xlbVxuICAgICAgICBlbnRpdHlTaXplMiA9IDIuOTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxTbm93bWFuXCIgfHxcbiAgICAgICAgZW50aXR5TW9kZWwgPT09IFwiTW9kZWxTbm93R29sZW1cIikge1xuICAgICAgICBlbnRpdHlTaXplMSA9IDAuNzsgLy8gU25vdyBHb2xlbVxuICAgICAgICBlbnRpdHlTaXplMiA9IDEuOTtcbiAgICB9XG4gICAgdmFyIGVudGl0eUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkucGFzc2l2ZS5FbnRpdHlBbmltYWxcIik7XG4gICAgaWYgKCFNb2RBUEkuaXRlbXMpIHtcbiAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJib290c3RyYXBcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGdsb2JhbFRoaXMuRGVidWdfbW9kZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcInRoaXMgaXMgZW50aXR5IHNpemUgb24gc2VydmVyIDE6IFwiLmNvbmNhdChlbnRpdHlTaXplMSwgXCIsIHRoaXMgaXMgZW50aXR5IHNpemUgMjogXCIpLmNvbmNhdChlbnRpdHlTaXplMiwgXCIsIGJyZWVkIGl0ZW0gXCIpLmNvbmNhdChlbnRpdHlCcmVlZEl0ZW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBlbnRpdHlEcm9wSXRlbTIgPSBlbnRpdHlEcm9wSXRlbTtcbiAgICAgICAgICAgIHZhciBpdGVtX3JlZiA9IE1vZEFQSS5pdGVtc1tlbnRpdHlCcmVlZEl0ZW1dLmdldFJlZigpO1xuICAgICAgICAgICAgdmFyIGVudGl0eVN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoZW50aXR5Q2xhc3MsIGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gMjsgfSk7XG4gICAgICAgICAgICB2YXIgbm1lX09FbnRpdHkgPSBmdW5jdGlvbiBubWVfT0VudGl0eSgkd29ybGRJbikge1xuICAgICAgICAgICAgICAgIGVudGl0eVN1cGVyKHRoaXMsICR3b3JsZEluKTtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQuc2V0U2l6ZShlbnRpdHlTaXplMSB8fCAwLjQsIGVudGl0eVNpemUyIHx8IDAuNyk7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMCwgQUlUYXNrKFwiRW50aXR5QUlTd2ltbWluZ1wiLCAxKSh0aGlzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMSwgQUlUYXNrKFwiRW50aXR5QUlQYW5pY1wiLCAyKSh0aGlzLCAxLjkpKTtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygyLCBBSVRhc2soXCJFbnRpdHlBSU1hdGVcIiwgMikodGhpcywgMS4wKSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMywgQUlUYXNrKFwiRW50aXR5QUlUZW1wdFwiLCA0KSh0aGlzLCAxLjUsIGl0ZW1fcmVmLCAwKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkZhaWxlZCB0byBhZGQgRW50aXR5QUlUZW1wdCB0YXNrIGZvciBcIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIuIFRoaXMgbWF5IGJlIGR1ZSB0byBhbiBpbmNvcnJlY3QgaXRlbSByZWZlcmVuY2UsIFwiKS5jb25jYXQoaXRlbV9yZWYsIFwiLCAoIGl0ZW0gcmVmKSwgYW5kIFwiKS5jb25jYXQoaXRlbV9yZWYoKSwgXCIsIChpdGVtX3JlZigpKVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDMsIEFJVGFzayhcIkVudGl0eUFJVGVtcHRcIiwgNCkodGhpcywgMS41LCBpdGVtX3JlZigpLCAwKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg0LCBBSVRhc2soXCJFbnRpdHlBSUZvbGxvd1BhcmVudFwiLCAyKSh0aGlzLCAxLjIpKTtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg1LCBBSVRhc2soXCJFbnRpdHlBSVdhbmRlclwiLCAyKSh0aGlzLCAxLjEpKTtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg2LCBBSVRhc2soXCJFbnRpdHlBSVdhdGNoQ2xvc2VzdFwiLCAzKSh0aGlzLCBNb2RBUEkudXRpbC5hc0NsYXNzKEVudGl0eVBsYXllci5jbGFzcyksIDYpKTtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg3LCBBSVRhc2soXCJFbnRpdHlBSUxvb2tJZGxlXCIsIDEpKHRoaXMpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhlbnRpdHlDbGFzcywgbm1lX09FbnRpdHkpO1xuICAgICAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXRFeWVIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlZC5oZWlnaHQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsQXBwbHlFbnRpdHlBdHRyaWJ1dGVzID0gbm1lX09FbnRpdHkucHJvdG90eXBlLiRhcHBseUVudGl0eUF0dHJpYnV0ZXM7XG4gICAgICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGFwcGx5RW50aXR5QXR0cmlidXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEFwcGx5RW50aXR5QXR0cmlidXRlcy5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkXG4gICAgICAgICAgICAgICAgICAgIC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubWF4SGVhbHRoKVxuICAgICAgICAgICAgICAgICAgICAuc2V0QmFzZVZhbHVlKDUpO1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgICAgICAgICAuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1vdmVtZW50U3BlZWQpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRCYXNlVmFsdWUoMC4yNSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsTGl2aW5nVXBkYXRlID0gbm1lX09FbnRpdHkucHJvdG90eXBlLiRvbkxpdmluZ1VwZGF0ZTtcbiAgICAgICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kb25MaXZpbmdVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxMaXZpbmdVcGRhdGUuYXBwbHkodGhpcywgW10pO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLndyYXBwZWQuaXNJbldhdGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLm1vdGlvblkgKj0gMC41O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRCYXNlVmFsdWUoMS40KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tb3ZlbWVudFNwZWVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldEJhc2VWYWx1ZSgwLjI1KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXRMaXZpbmdTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgZW50aXR5SUQgKyBcIi5tYWluX3NvdW5kXCIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0SHVydFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNb2RBUEkudXRpbC5zdHIoXCJtb2IuXCIgKyBlbnRpdHlJRCArIFwiLm1haW5fc291bmRcIik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXREZWF0aFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNb2RBUEkudXRpbC5zdHIoXCJtb2IuXCIgKyBlbnRpdHlJRCArIFwiLm1haW5fc291bmRcIik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRwbGF5U3RlcFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZC5wbGF5U291bmQoTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgZW50aXR5SUQgKyBcIi5zdGVwXCIpLCAwLjIsIDEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0RHJvcEl0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS5pdGVtc1tlbnRpdHlEcm9wSXRlbTJdLmdldFJlZigpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kY3JlYXRlQ2hpbGQgPSBmdW5jdGlvbiAob3RoZXJQYXJlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbm1lX09FbnRpdHkoKF9iID0gKF9hID0gdGhpcy53cmFwcGVkLndvcmxkT2JqKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0UmVmKCkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG51bGwpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kaXNCcmVlZGluZ0l0ZW0gPSBmdW5jdGlvbiAoaXRlbXN0YWNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChpdGVtc3RhY2sgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgaXRlbXN0YWNrLiRnZXRJdGVtKCkgPT09IE1vZEFQSS5pdGVtc1tlbnRpdHlCcmVlZEl0ZW1dLmdldFJlZigpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBFTkQgQ1VTVE9NIEVOVElUWVxuICAgICAgICAgICAgLy8gU1RBUlQgQ1VTVE9NIE1PREVMXG4gICAgICAgICAgICB2YXIgbW9kZWxDaGlja2VuQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNsaWVudC5tb2RlbC5cIi5jb25jYXQoZW50aXR5TW9kZWwpKTtcbiAgICAgICAgICAgIHZhciBtb2RlbENoaWNrZW5TdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKG1vZGVsQ2hpY2tlbkNsYXNzKTsgLy93aGlsZSBzdXBlciBpc24ndCB1c2VkIHdoZW4gZXh0ZW5kaW5nIHRoaXMgY2xhc3MsIGphdmEgaW1wbGllcyB0aGUgY2FsbC5cbiAgICAgICAgICAgIHZhciBubWNtX09FbnRpdHlNb2RlbCA9IGZ1bmN0aW9uIG5tY21fT0VudGl0eU1vZGVsKCkge1xuICAgICAgICAgICAgICAgIG1vZGVsQ2hpY2tlblN1cGVyKHRoaXMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKG1vZGVsQ2hpY2tlbkNsYXNzLCBubWNtX09FbnRpdHlNb2RlbCk7XG4gICAgICAgICAgICAvLyBFTkQgQ1VTVE9NIE1oT0RFTFxuICAgICAgICAgICAgLy8gU1RBUlQgQ1VTVE9NIFJFTkRFUkVSXG4gICAgICAgICAgICB2YXIgcmVuZGVyQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNsaWVudC5yZW5kZXJlci5lbnRpdHkuUmVuZGVyTGl2aW5nXCIpO1xuICAgICAgICAgICAgdmFyIHJlbmRlclN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIocmVuZGVyQ2xhc3MsIGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gNDsgfSk7XG4gICAgICAgICAgICB2YXIgZHVja1RleHR1cmVzID0gUmVzb3VyY2VMb2NhdGlvbihNb2RBUEkudXRpbC5zdHIoXCJ0ZXh0dXJlcy9lbnRpdHkvXCIuY29uY2F0KGVudGl0eUlELCBcIi5wbmdcIikpKTtcbiAgICAgICAgICAgIHZhciBubWNyZV9SZW5kZXJPRW50aXR5ID0gZnVuY3Rpb24gbm1jcmVfUmVuZGVyT0VudGl0eShyZW5kZXJNYW5hZ2VyLCBtb2RlbEJhc2VJbiwgc2hhZG93U2l6ZUluKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyU3VwZXIodGhpcywgcmVuZGVyTWFuYWdlciwgbW9kZWxCYXNlSW4sIHNoYWRvd1NpemVJbik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2socmVuZGVyQ2xhc3MsIG5tY3JlX1JlbmRlck9FbnRpdHkpO1xuICAgICAgICAgICAgbm1jcmVfUmVuZGVyT0VudGl0eS5wcm90b3R5cGUuJGdldEVudGl0eVRleHR1cmUgPSBmdW5jdGlvbiAoZW50aXR5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGR1Y2tUZXh0dXJlcztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBubWNyZV9SZW5kZXJPRW50aXR5LnByb3RvdHlwZS4kaGFuZGxlUm90YXRpb25GbG9hdCA9IGZ1bmN0aW9uIChlbnRpdHksIHBhcnRpYWxUaWNrcykge1xuICAgICAgICAgICAgICAgIGVudGl0eSA9IE1vZEFQSS51dGlsLndyYXAoZW50aXR5KTtcbiAgICAgICAgICAgICAgICBpZiAoIWVudGl0eS5vbkdyb3VuZCAmJiAhZW50aXR5LmlzSW5XYXRlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAyOyAvL2ZhbGxpbmdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgSUQgPSBNb2RBUEkua2V5Z2VuLmVudGl0eShlbnRpdHlJRCk7XG4gICAgICAgICAgICBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgICAgIC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlMaXN0XCIpXG4gICAgICAgICAgICAgICAgLnN0YXRpY01ldGhvZHMuYWRkTWFwcGluZzAubWV0aG9kKE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCB7XG4gICAgICAgICAgICAgICAgJGNyZWF0ZUVudGl0eTogZnVuY3Rpb24gKCR3b3JsZEluKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnbG9iYWxUaGlzLkRlYnVnX21vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ldyBubWVfT0VudGl0eSgkd29ybGRJbikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbm1lX09FbnRpdHkoJHdvcmxkSW4pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LCBNb2RBUEkudXRpbC5zdHIoZW50aXR5SUQudG9VcHBlckNhc2UoKSksIElELCBlZ2dCYXNlIHx8IDB4NWUzZTJkLCAvL2VnZyBiYXNlXG4gICAgICAgICAgICBlZ2dTcG90cyB8fCAweDI2OTE2NiAvL2VnZyBzcG90c1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHZhciBTcGF3blBsYWNlbWVudFR5cGUgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlMaXZpbmckU3Bhd25QbGFjZW1lbnRUeXBlXCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgICAgIHZhciBFTlRJVFlfUExBQ0VNRU5UUyA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkuRW50aXR5U3Bhd25QbGFjZW1lbnRSZWdpc3RyeVwiKS5zdGF0aWNWYXJpYWJsZXMuRU5USVRZX1BMQUNFTUVOVFMpO1xuICAgICAgICAgICAgRU5USVRZX1BMQUNFTUVOVFMucHV0KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCBTcGF3blBsYWNlbWVudFR5cGUuT05fR1JPVU5EKTtcbiAgICAgICAgICAgIHZhciBTcGF3bkxpc3RFbnRyeSA9IE1vZEFQSS5yZWZsZWN0XG4gICAgICAgICAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlJFNwYXduTGlzdEVudHJ5XCIpXG4gICAgICAgICAgICAgICAgLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gNDsgfSk7XG4gICAgICAgICAgICB2YXIgQmlvbWVHZW5Td2FtcCA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZUdlbkJhc2VcIilcbiAgICAgICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLnN3YW1wbGFuZCk7XG4gICAgICAgICAgICB2YXIgQmlvbWVHZW5SaXZlciA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZUdlbkJhc2VcIilcbiAgICAgICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLnJpdmVyKTtcbiAgICAgICAgICAgIHZhciBCaW9tZUdlbkJlYWNoID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMuYmVhY2gpO1xuICAgICAgICAgICAgdmFyIGR1Y2tTcGF3blN3YW1wID0gU3Bhd25MaXN0RW50cnkoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIDIyLCAzLCA1KTtcbiAgICAgICAgICAgIHZhciBkdWNrU3Bhd25SaXZlckJlZCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAxMCwgNSwgOSk7XG4gICAgICAgICAgICB2YXIgZHVja1NwYXduQmVhY2ggPSBTcGF3bkxpc3RFbnRyeShNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgMjQsIDIsIDMpO1xuICAgICAgICAgICAgQmlvbWVHZW5Td2FtcC5zcGF3bmFibGVDcmVhdHVyZUxpc3QuYWRkKGR1Y2tTcGF3blN3YW1wKTtcbiAgICAgICAgICAgIEJpb21lR2VuUml2ZXIuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25SaXZlckJlZCk7XG4gICAgICAgICAgICBCaW9tZUdlbkJlYWNoLnNwYXduYWJsZUNyZWF0dXJlTGlzdC5hZGQoZHVja1NwYXduQmVhY2gpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChnbG9iYWxUaGlzLkRlYnVnX21vZGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcInRoaXMgaXMgZW50aXR5IHNpemUgb24gc2VydmVyIDE6IFwiLmNvbmNhdChlbnRpdHlTaXplMSwgXCIsIHRoaXMgaXMgZW50aXR5IHNpemUgMjogXCIpLmNvbmNhdChlbnRpdHlTaXplMiwgXCIsIGJyZWVkIGl0ZW0gXCIpLmNvbmNhdChlbnRpdHlCcmVlZEl0ZW0pKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW50aXR5RHJvcEl0ZW0yID0gZW50aXR5RHJvcEl0ZW07XG4gICAgICAgIHZhciBpdGVtX3JlZiA9IE1vZEFQSS5pdGVtc1tlbnRpdHlCcmVlZEl0ZW1dLmdldFJlZigpO1xuICAgICAgICB2YXIgZW50aXR5U3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihlbnRpdHlDbGFzcywgZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSAyOyB9KTtcbiAgICAgICAgdmFyIG5tZV9PRW50aXR5ID0gZnVuY3Rpb24gbm1lX09FbnRpdHkoJHdvcmxkSW4pIHtcbiAgICAgICAgICAgIGVudGl0eVN1cGVyKHRoaXMsICR3b3JsZEluKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnNldFNpemUoZW50aXR5U2l6ZTEgfHwgMC40LCBlbnRpdHlTaXplMiB8fCAwLjcpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMCwgQUlUYXNrKFwiRW50aXR5QUlTd2ltbWluZ1wiLCAxKSh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygxLCBBSVRhc2soXCJFbnRpdHlBSVBhbmljXCIsIDIpKHRoaXMsIDEuOSkpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMiwgQUlUYXNrKFwiRW50aXR5QUlNYXRlXCIsIDIpKHRoaXMsIDEuMCkpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygzLCBBSVRhc2soXCJFbnRpdHlBSVRlbXB0XCIsIDQpKHRoaXMsIDEuNSwgaXRlbV9yZWYsIDApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRmFpbGVkIHRvIGFkZCBFbnRpdHlBSVRlbXB0IHRhc2sgZm9yIFwiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi4gVGhpcyBtYXkgYmUgZHVlIHRvIGFuIGluY29ycmVjdCBpdGVtIHJlZmVyZW5jZSwgXCIpLmNvbmNhdChpdGVtX3JlZiwgXCIsICggaXRlbSByZWYpLCBhbmQgXCIpLmNvbmNhdChpdGVtX3JlZigpLCBcIiwgKGl0ZW1fcmVmKCkpXCIpKTtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygzLCBBSVRhc2soXCJFbnRpdHlBSVRlbXB0XCIsIDQpKHRoaXMsIDEuNSwgaXRlbV9yZWYoKSwgMCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNCwgQUlUYXNrKFwiRW50aXR5QUlGb2xsb3dQYXJlbnRcIiwgMikodGhpcywgMS4yKSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg1LCBBSVRhc2soXCJFbnRpdHlBSVdhbmRlclwiLCAyKSh0aGlzLCAxLjEpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDYsIEFJVGFzayhcIkVudGl0eUFJV2F0Y2hDbG9zZXN0XCIsIDMpKHRoaXMsIE1vZEFQSS51dGlsLmFzQ2xhc3MoRW50aXR5UGxheWVyLmNsYXNzKSwgNikpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNywgQUlUYXNrKFwiRW50aXR5QUlMb29rSWRsZVwiLCAxKSh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKGVudGl0eUNsYXNzLCBubWVfT0VudGl0eSk7XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0RXllSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy53cmFwcGVkLmhlaWdodDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG9yaWdpbmFsQXBwbHlFbnRpdHlBdHRyaWJ1dGVzXzEgPSBubWVfT0VudGl0eS5wcm90b3R5cGUuJGFwcGx5RW50aXR5QXR0cmlidXRlcztcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRhcHBseUVudGl0eUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIG9yaWdpbmFsQXBwbHlFbnRpdHlBdHRyaWJ1dGVzXzEuYXBwbHkodGhpcywgW10pO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkXG4gICAgICAgICAgICAgICAgLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tYXhIZWFsdGgpXG4gICAgICAgICAgICAgICAgLnNldEJhc2VWYWx1ZSg1KTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgICAgIC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZClcbiAgICAgICAgICAgICAgICAuc2V0QmFzZVZhbHVlKDAuMjUpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgb3JpZ2luYWxMaXZpbmdVcGRhdGVfMSA9IG5tZV9PRW50aXR5LnByb3RvdHlwZS4kb25MaXZpbmdVcGRhdGU7XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kb25MaXZpbmdVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIG9yaWdpbmFsTGl2aW5nVXBkYXRlXzEuYXBwbHkodGhpcywgW10pO1xuICAgICAgICAgICAgaWYgKHRoaXMud3JhcHBlZC5pc0luV2F0ZXIoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZC5tb3Rpb25ZICo9IDAuNTtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWRcbiAgICAgICAgICAgICAgICAgICAgLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tb3ZlbWVudFNwZWVkKVxuICAgICAgICAgICAgICAgICAgICAuc2V0QmFzZVZhbHVlKDEuNCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWRcbiAgICAgICAgICAgICAgICAgICAgLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tb3ZlbWVudFNwZWVkKVxuICAgICAgICAgICAgICAgICAgICAuc2V0QmFzZVZhbHVlKDAuMjUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldExpdmluZ1NvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIGVudGl0eUlEICsgXCIubWFpbl9zb3VuZFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXRIdXJ0U291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgZW50aXR5SUQgKyBcIi5tYWluX3NvdW5kXCIpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldERlYXRoU291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgZW50aXR5SUQgKyBcIi5tYWluX3NvdW5kXCIpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJHBsYXlTdGVwU291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC5wbGF5U291bmQoTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgZW50aXR5SUQgKyBcIi5zdGVwXCIpLCAwLjIsIDEpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldERyb3BJdGVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS5pdGVtc1tlbnRpdHlEcm9wSXRlbV0uZ2V0UmVmKCk7XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kY3JlYXRlQ2hpbGQgPSBmdW5jdGlvbiAob3RoZXJQYXJlbnQpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgbm1lX09FbnRpdHkoKF9iID0gKF9hID0gdGhpcy53cmFwcGVkLndvcmxkT2JqKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0UmVmKCkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG51bGwpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGlzQnJlZWRpbmdJdGVtID0gZnVuY3Rpb24gKGl0ZW1zdGFjaykge1xuICAgICAgICAgICAgcmV0dXJuIChpdGVtc3RhY2sgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICBpdGVtc3RhY2suJGdldEl0ZW0oKSA9PT0gTW9kQVBJLml0ZW1zW2VudGl0eUJyZWVkSXRlbV0uZ2V0UmVmKCkpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBFTkQgQ1VTVE9NIEVOVElUWVxuICAgICAgICAvLyBTVEFSVCBDVVNUT00gTU9ERUxcbiAgICAgICAgdmFyIG1vZGVsQ2hpY2tlbkNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jbGllbnQubW9kZWwuXCIuY29uY2F0KGVudGl0eU1vZGVsKSk7XG4gICAgICAgIHZhciBtb2RlbENoaWNrZW5TdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKG1vZGVsQ2hpY2tlbkNsYXNzKTsgLy93aGlsZSBzdXBlciBpc24ndCB1c2VkIHdoZW4gZXh0ZW5kaW5nIHRoaXMgY2xhc3MsIGphdmEgaW1wbGllcyB0aGUgY2FsbC5cbiAgICAgICAgdmFyIG5tY21fT0VudGl0eU1vZGVsID0gZnVuY3Rpb24gbm1jbV9PRW50aXR5TW9kZWwoKSB7XG4gICAgICAgICAgICBtb2RlbENoaWNrZW5TdXBlcih0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2sobW9kZWxDaGlja2VuQ2xhc3MsIG5tY21fT0VudGl0eU1vZGVsKTtcbiAgICAgICAgLy8gRU5EIENVU1RPTSBNT0RFTFxuICAgICAgICAvLyBTVEFSVCBDVVNUT00gUkVOREVSRVJcbiAgICAgICAgdmFyIHJlbmRlckNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jbGllbnQucmVuZGVyZXIuZW50aXR5LlJlbmRlckxpdmluZ1wiKTtcbiAgICAgICAgdmFyIHJlbmRlclN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIocmVuZGVyQ2xhc3MsIGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gNDsgfSk7XG4gICAgICAgIHZhciBkdWNrVGV4dHVyZXNfMSA9IFJlc291cmNlTG9jYXRpb24oTW9kQVBJLnV0aWwuc3RyKFwidGV4dHVyZXMvZW50aXR5L1wiLmNvbmNhdChlbnRpdHlJRCwgXCIucG5nXCIpKSk7XG4gICAgICAgIHZhciBubWNyZV9SZW5kZXJPRW50aXR5ID0gZnVuY3Rpb24gbm1jcmVfUmVuZGVyT0VudGl0eShyZW5kZXJNYW5hZ2VyLCBtb2RlbEJhc2VJbiwgc2hhZG93U2l6ZUluKSB7XG4gICAgICAgICAgICByZW5kZXJTdXBlcih0aGlzLCByZW5kZXJNYW5hZ2VyLCBtb2RlbEJhc2VJbiwgc2hhZG93U2l6ZUluKTtcbiAgICAgICAgfTtcbiAgICAgICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2socmVuZGVyQ2xhc3MsIG5tY3JlX1JlbmRlck9FbnRpdHkpO1xuICAgICAgICBubWNyZV9SZW5kZXJPRW50aXR5LnByb3RvdHlwZS4kZ2V0RW50aXR5VGV4dHVyZSA9IGZ1bmN0aW9uIChlbnRpdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBkdWNrVGV4dHVyZXNfMTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1jcmVfUmVuZGVyT0VudGl0eS5wcm90b3R5cGUuJGhhbmRsZVJvdGF0aW9uRmxvYXQgPSBmdW5jdGlvbiAoZW50aXR5LCBwYXJ0aWFsVGlja3MpIHtcbiAgICAgICAgICAgIGVudGl0eSA9IE1vZEFQSS51dGlsLndyYXAoZW50aXR5KTtcbiAgICAgICAgICAgIGlmICghZW50aXR5Lm9uR3JvdW5kICYmICFlbnRpdHkuaXNJbldhdGVyKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMjsgLy9mYWxsaW5nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIElEID0gTW9kQVBJLmtleWdlbi5lbnRpdHkoZW50aXR5SUQpO1xuICAgICAgICBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eUxpc3RcIilcbiAgICAgICAgICAgIC5zdGF0aWNNZXRob2RzLmFkZE1hcHBpbmcwLm1ldGhvZChNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwge1xuICAgICAgICAgICAgJGNyZWF0ZUVudGl0eTogZnVuY3Rpb24gKCR3b3JsZEluKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBubWVfT0VudGl0eSgkd29ybGRJbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LCBNb2RBUEkudXRpbC5zdHIoZW50aXR5SUQudG9VcHBlckNhc2UoKSksIElELCBlZ2dCYXNlIHx8IDB4NWUzZTJkLCAvL2VnZyBiYXNlXG4gICAgICAgIGVnZ1Nwb3RzIHx8IDB4MjY5MTY2IC8vZWdnIHNwb3RzXG4gICAgICAgICk7XG4gICAgICAgIHZhciBTcGF3blBsYWNlbWVudFR5cGUgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlMaXZpbmckU3Bhd25QbGFjZW1lbnRUeXBlXCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgdmFyIEVOVElUWV9QTEFDRU1FTlRTID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlTcGF3blBsYWNlbWVudFJlZ2lzdHJ5XCIpLnN0YXRpY1ZhcmlhYmxlcy5FTlRJVFlfUExBQ0VNRU5UUyk7XG4gICAgICAgIEVOVElUWV9QTEFDRU1FTlRTLnB1dChNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgU3Bhd25QbGFjZW1lbnRUeXBlLk9OX0dST1VORCk7XG4gICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBTcGF3bkxpc3RFbnRyeSA9IE1vZEFQSS5yZWZsZWN0XG4gICAgICAgICAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlJFNwYXduTGlzdEVudHJ5XCIpXG4gICAgICAgICAgICAgICAgLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gNDsgfSk7XG4gICAgICAgICAgICB2YXIgQmlvbWVHZW5Td2FtcCA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZUdlbkJhc2VcIilcbiAgICAgICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLnN3YW1wbGFuZCk7XG4gICAgICAgICAgICB2YXIgQmlvbWVHZW5SaXZlciA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZUdlbkJhc2VcIilcbiAgICAgICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLnJpdmVyKTtcbiAgICAgICAgICAgIHZhciBCaW9tZUdlbkJlYWNoID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMuYmVhY2gpO1xuICAgICAgICAgICAgdmFyIGR1Y2tTcGF3blN3YW1wID0gU3Bhd25MaXN0RW50cnkoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIDIyLCAzLCA1KTtcbiAgICAgICAgICAgIHZhciBkdWNrU3Bhd25SaXZlckJlZCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAxMCwgNSwgOSk7XG4gICAgICAgICAgICB2YXIgZHVja1NwYXduQmVhY2ggPSBTcGF3bkxpc3RFbnRyeShNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgMjQsIDIsIDMpO1xuICAgICAgICAgICAgQmlvbWVHZW5Td2FtcC5zcGF3bmFibGVDcmVhdHVyZUxpc3QuYWRkKGR1Y2tTcGF3blN3YW1wKTtcbiAgICAgICAgICAgIEJpb21lR2VuUml2ZXIuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25SaXZlckJlZCk7XG4gICAgICAgICAgICBCaW9tZUdlbkJlYWNoLnNwYXduYWJsZUNyZWF0dXJlTGlzdC5hZGQoZHVja1NwYXduQmVhY2gpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgO1xufVxuZXhwb3J0IGZ1bmN0aW9uIE92ZW5NREtfX2RlZmluZUV4ZWNDbWRBc0dsb2JhbCgpIHtcbiAgICB2YXIgX2E7XG4gICAgLy8gR2V0IHNlcnZlciBtZXRob2QgZm9yIGRpZmZlcmVudCBNaW5lY3JhZnQgdmVyc2lvbnNcbiAgICB2YXIgZ2V0U2VydmVyID0gKF9hID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5zZXJ2ZXIuTWluZWNyYWZ0U2VydmVyXCIpLnN0YXRpY01ldGhvZHMuZ2V0U2VydmVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWV0aG9kO1xuICAgIC8vIERlZmluZSBnbG9iYWwgZnVuY3Rpb25cbiAgICBnbG9iYWxUaGlzLk92ZW5NREtfX2V4ZWN1dGVDb21tYW5kQXMgPVxuICAgICAgICBmdW5jdGlvbiBPdmVuTURLX19leGVjdXRlQ29tbWFuZEFzKCRjb21tYW5kc2VuZGVyLCBjb21tYW5kLCBmZWVkYmFjaykge1xuICAgICAgICAgICAgdmFyIHNlcnZlciA9IGdldFNlcnZlclxuICAgICAgICAgICAgICAgID8gZ2V0U2VydmVyKCkgLy8gMS44XG4gICAgICAgICAgICAgICAgOiBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LnNlcnZlci5NaW5lY3JhZnRTZXJ2ZXJcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5zZXJ2ZXI7IC8vIDEuMTJcbiAgICAgICAgICAgIGlmICghc2VydmVyKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmIChnbG9iYWxUaGlzLkRlYnVnX21vZGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZXJ2ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNvbW1hbmRNYW5hZ2VyID0gc2VydmVyLiRjb21tYW5kTWFuYWdlcjtcbiAgICAgICAgICAgIC8vIFRlbXBvcmFyaWx5IG92ZXJyaWRlIHBlcm1pc3Npb25zXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxDYW5Db21tYW5kID0gJGNvbW1hbmRzZW5kZXIuJGNhbkNvbW1hbmRTZW5kZXJVc2VDb21tYW5kO1xuICAgICAgICAgICAgJGNvbW1hbmRzZW5kZXIuJGNhbkNvbW1hbmRTZW5kZXJVc2VDb21tYW5kID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gMTsgfTtcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbEZlZWRiYWNrID0gJGNvbW1hbmRzZW5kZXIuJHNlbmRDb21tYW5kRmVlZGJhY2s7XG4gICAgICAgICAgICAkY29tbWFuZHNlbmRlci4kc2VuZENvbW1hbmRGZWVkYmFjayA9IGZlZWRiYWNrID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gMTsgfSA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDA7IH07XG4gICAgICAgICAgICB2YXIgbm90aWZ5T3BzMCA9IE1vZEFQSS5ob29rcy5tZXRob2RzLm5tY19Db21tYW5kQmFzZV9ub3RpZnlPcGVyYXRvcnMwO1xuICAgICAgICAgICAgdmFyIG5vdGlmeU9wcyA9IE1vZEFQSS5ob29rcy5tZXRob2RzLm5tY19Db21tYW5kQmFzZV9ub3RpZnlPcGVyYXRvcnM7XG4gICAgICAgICAgICB2YXIgYWRkQ2hhdE1zZyA9ICRjb21tYW5kc2VuZGVyLiRhZGRDaGF0TWVzc2FnZTtcbiAgICAgICAgICAgIGlmICghZmVlZGJhY2spIHtcbiAgICAgICAgICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5ubWNfQ29tbWFuZEJhc2Vfbm90aWZ5T3BlcmF0b3JzMCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5ubWNfQ29tbWFuZEJhc2Vfbm90aWZ5T3BlcmF0b3JzID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICAgICAgICAgICRjb21tYW5kc2VuZGVyLiRhZGRDaGF0TWVzc2FnZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29tbWFuZE1hbmFnZXIuJGV4ZWN1dGVDb21tYW5kKCRjb21tYW5kc2VuZGVyLCBNb2RBUEkudXRpbC5zdHIoY29tbWFuZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWZlZWRiYWNrKSB7XG4gICAgICAgICAgICAgICAgTW9kQVBJLmhvb2tzLm1ldGhvZHMubm1jX0NvbW1hbmRCYXNlX25vdGlmeU9wZXJhdG9yczAgPSBub3RpZnlPcHMwO1xuICAgICAgICAgICAgICAgIE1vZEFQSS5ob29rcy5tZXRob2RzLm5tY19Db21tYW5kQmFzZV9ub3RpZnlPcGVyYXRvcnMgPSBub3RpZnlPcHM7XG4gICAgICAgICAgICAgICAgJGNvbW1hbmRzZW5kZXIuJGFkZENoYXRNZXNzYWdlID0gYWRkQ2hhdE1zZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJlc3RvcmUgb3JpZ2luYWwgcGVybWlzc2lvbnMgYW5kIGZlZWRiYWNrXG4gICAgICAgICAgICAkY29tbWFuZHNlbmRlci4kY2FuQ29tbWFuZFNlbmRlclVzZUNvbW1hbmQgPSBvcmlnaW5hbENhbkNvbW1hbmQ7XG4gICAgICAgICAgICAkY29tbWFuZHNlbmRlci4kc2VuZENvbW1hbmRGZWVkYmFjayA9IG9yaWdpbmFsRmVlZGJhY2s7XG4gICAgICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJPdmVuT3JlU2VydmVyKGJsb2NrX0lELCB2aWVuU2l6ZSwgdmllbkNvdW50LCBtaW5HZW5lcmF0aW9uSGVpZ2h0LCBtYXhHZW5lcmF0aW9uSGVpZ2h0KSB7XG4gICAgdmFyIFdvcmxkR2VuTWluZWFibGUgPSBNb2RBUEkucmVmbGVjdFxuICAgICAgICAuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5nZW4uZmVhdHVyZS5Xb3JsZEdlbk1pbmFibGVcIilcbiAgICAgICAgLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gMjsgfSk7XG4gICAgdmFyIEJpb21lRGVjb3JhdG9yX2RlY29yYXRlID0gTW9kQVBJLnV0aWwuZ2V0TWV0aG9kRnJvbVBhY2thZ2UoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lRGVjb3JhdG9yXCIsIFwiZGVjb3JhdGVcIik7XG4gICAgdmFyIG9sZERlY29yYXRlID0gTW9kQVBJLmhvb2tzLm1ldGhvZHNbQmlvbWVEZWNvcmF0b3JfZGVjb3JhdGVdO1xuICAgIE1vZEFQSS5ob29rcy5tZXRob2RzW0Jpb21lRGVjb3JhdG9yX2RlY29yYXRlXSA9IGZ1bmN0aW9uICgkdGhpcywgJHdvcmxkLCAkcmFuZG9tLCAkYmlvbWVHZW5CYXNlLCAkYmxvY2twb3MpIHtcbiAgICAgICAgaWYgKCEkdGhpcy4kY3VycmVudFdvcmxkKSB7XG4gICAgICAgICAgICAkdGhpc1tcIiRPdmVuTURLX19hZHZhbmNlZF9ibG9jazBfNDgzNDk1X0Jsb2NrR2VuXCJdID0gV29ybGRHZW5NaW5lYWJsZShNb2RBUEkuYmxvY2tzW1wiXCIuY29uY2F0KGJsb2NrX0lEKV0uZ2V0U3RhdGVGcm9tTWV0YSgwKS5nZXRSZWYoKSwgdmllblNpemUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvbGREZWNvcmF0ZS5hcHBseSh0aGlzLCBbXG4gICAgICAgICAgICAkdGhpcyxcbiAgICAgICAgICAgICR3b3JsZCxcbiAgICAgICAgICAgICRyYW5kb20sXG4gICAgICAgICAgICAkYmlvbWVHZW5CYXNlLFxuICAgICAgICAgICAgJGJsb2NrcG9zLFxuICAgICAgICBdKTtcbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKFwiQ29vbCByZWdpc3RlciBcIiArIGJsb2NrX0lEKTtcbiAgICB2YXIgQmlvbWVEZWNvcmF0b3JfZ2VuZXJhdGVPcmVzID0gTW9kQVBJLnV0aWwuZ2V0TWV0aG9kRnJvbVBhY2thZ2UoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lRGVjb3JhdG9yXCIsIFwiZ2VuZXJhdGVPcmVzXCIpO1xuICAgIHZhciBvbGRHZW5lcmF0ZU9yZXMgPSBNb2RBUEkuaG9va3MubWV0aG9kc1tCaW9tZURlY29yYXRvcl9nZW5lcmF0ZU9yZXNdO1xuICAgIE1vZEFQSS5ob29rcy5tZXRob2RzW0Jpb21lRGVjb3JhdG9yX2dlbmVyYXRlT3Jlc10gPSBmdW5jdGlvbiAoJHRoaXMpIHtcbiAgICAgICAgJHRoaXMuJGdlblN0YW5kYXJkT3JlMSh2aWVuQ291bnQsICR0aGlzW1wiJE92ZW5NREtfX2FkdmFuY2VkX2Jsb2NrMF80ODM0OTVfQmxvY2tHZW5cIl0gfHwgbnVsbCwgbWluR2VuZXJhdGlvbkhlaWdodCwgbWF4R2VuZXJhdGlvbkhlaWdodCk7XG4gICAgICAgIHJldHVybiBvbGRHZW5lcmF0ZU9yZXMuYXBwbHkodGhpcywgWyR0aGlzXSk7XG4gICAgfTtcbn1cbiIsIi8qXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICAgIE1vZC50c1xuICAgIFxuICAgIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuaW1wb3J0IGRlZmF1bHRJY29uIGZyb20gXCJBU1NFVFMvZGVmYXVsdEljb24ucG5nXCI7XG52YXIgT01vZCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPTW9kKCkge1xuICAgIH1cbiAgICBPTW9kLmNvbmZpZyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBPTW9kLmluaXQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgT01vZC5wb3N0SW5pdCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBPTW9kLnRpdGxlID0gXCJEZWZhdWx0IE5hbWVcIjtcbiAgICBPTW9kLnZlcnNpb24gPSBcIlwiO1xuICAgIE9Nb2QuZGVzY3JpcHRpb24gPSBcIkRlZmF1bHQgT3Zlbk1ESyBEZXNjcmlwdGlvbi4gU2V0ICdkZXNjcmlwdGlvbicgaW4geW91ciBPTW9kIGNsYXNzIVwiO1xuICAgIE9Nb2QuY3JlZGl0cyA9IFwiTm9uZSBHaXZlblwiO1xuICAgIE9Nb2QuaWNvbiA9IGRlZmF1bHRJY29uO1xuICAgIE9Nb2QuYWNjZXB0ZWRNaW5lY3JhZnRWZXJzaW9ucyA9IG51bGw7XG4gICAgT01vZC5hY2NlcHRlZEVhZ2xlclVwZGF0ZXMgPSBudWxsO1xuICAgIE9Nb2QuYWNjZXB0ZWRFRlZlcnNpb25zID0gbnVsbDtcbiAgICBPTW9kLmFjY2VwdGVkRUZGbGF2b3VyID0gXCJpbmplY3RvclwiO1xuICAgIE9Nb2QuY2xpZW50U2lkZU9ubHkgPSBmYWxzZTtcbiAgICBPTW9kLnNlcnZlclNpZGVPbmx5ID0gZmFsc2U7XG4gICAgT01vZC5vbmx5XzFfMTJfMiA9IGZhbHNlO1xuICAgIE9Nb2QuRGVidWdfbW9kZSA9IGZhbHNlO1xuICAgIHJldHVybiBPTW9kO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE9Nb2Q7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuLypcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICBPQmxvY2sudHNcblxuICBDb3B5cmlnaHQgMjAyNSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG52YXIgT0Jsb2NrID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9CbG9jayhibG9ja05hbWUsIGJsb2NrSUQsIHRleHR1cmUsIG9uQnJlYWspIHtcbiAgICAgICAgdGhpcy5ibG9ja05hbWUgPSBibG9ja05hbWU7XG4gICAgICAgIHRoaXMuYmxvY2tJRCA9IGJsb2NrSUQ7XG4gICAgICAgIHRoaXMuYmxvY2tUZXh0dXJlID0gdGV4dHVyZTtcbiAgICAgICAgdGhpcy5vbkJyZWFrID0gb25CcmVhaztcbiAgICB9XG4gICAgT0Jsb2NrLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIEJsb2NrQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpO1xuICAgICAgICB2YXIgSXRlbUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIik7XG4gICAgICAgIHZhciBjcmVhdGl2ZVRhYjtcbiAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgY3JlYXRpdmVUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMudGFiQmxvY2s7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjcmVhdGl2ZVRhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy5CVUlMRElOR19CTE9DS1M7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJsb2NrU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihCbG9ja0NsYXNzLCBmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuLmxlbmd0aCA9PT0gMjsgfSk7XG4gICAgICAgIHZhciBicmVha0Jsb2NrTWV0aG9kID0gQmxvY2tDbGFzcy5tZXRob2RzLmJyZWFrQmxvY2subWV0aG9kO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGZ1bmN0aW9uIG5tYl9PYmxvY2soKSB7XG4gICAgICAgICAgICBibG9ja1N1cGVyKHRoaXMsIE1vZEFQSS5tYXRlcmlhbHMucm9jay5nZXRSZWYoKSk7XG4gICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZGVmYXVsdEJsb2NrU3RhdGUgPSB0aGlzLiRibG9ja1N0YXRlLiRnZXRCYXNlU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHNldENyZWF0aXZlVGFiKGNyZWF0aXZlVGFiKTtcbiAgICAgICAgfVxuICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhCbG9ja0NsYXNzLCBubWJfT2Jsb2NrKTtcbiAgICAgICAgbm1iX09ibG9jay5wcm90b3R5cGUuJGJyZWFrQmxvY2sgPSBmdW5jdGlvbiAoJHdvcmxkLCAkYmxvY2twb3MsICRibG9ja3N0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gYnJlYWtCbG9ja01ldGhvZCh0aGlzLCAkd29ybGQsICRibG9ja3BvcywgJGJsb2Nrc3RhdGUpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgJCRvbkJsb2NrRGVzdHJveWVkQnlQbGF5ZXJNZXRob2QgPSBCbG9ja0NsYXNzLm1ldGhvZHMub25CbG9ja0Rlc3Ryb3llZEJ5UGxheWVyLm1ldGhvZDtcbiAgICAgICAgbm1iX09ibG9jay5wcm90b3R5cGUuJG9uQmxvY2tEZXN0cm95ZWRCeVBsYXllciA9IGZ1bmN0aW9uICgkJHdvcmxkLCAkJGJsb2NrcG9zLCAkJGJsb2Nrc3RhdGUpIHtcbiAgICAgICAgICAgIHZhciAkJHdvcmxkLCAkJGJsb2NrcG9zLCAkJGJsb2Nrc3RhdGU7XG4gICAgICAgICAgICBzZWxmLm9uQnJlYWsuY2FsbCgkJHdvcmxkLCAkJGJsb2NrcG9zLCAkJGJsb2Nrc3RhdGUpO1xuICAgICAgICAgICAgcmV0dXJuICQkb25CbG9ja0Rlc3Ryb3llZEJ5UGxheWVyTWV0aG9kKHRoaXMsICQkd29ybGQsICQkYmxvY2twb3MsICQkYmxvY2tzdGF0ZSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qXG4gICAgICAgIG5tYl9PYmxvY2sucHJvdG90eXBlLiRnZXRJdGVtRHJvcHBlZCA9IGZ1bmN0aW9uICgpe1xuICAgICAgICAgIHJldHVybiBnZXREcm9wcGVkSXRlbSh0aGlzLCAkeyBnZXREcm9wcGVkSXRlbUhhbmRsZXIuYXJncy5qb2luKFwiLCBcIikgfSk7XG4gICAgICAgIH1cbiAgICAgICAgICBJIHdpbGwgZG8gaXQgd2hlbiBJIGNvbWUgYmFja1xuICAgICAgICAqL1xuICAgICAgICB2YXIgaW50ZXJuYWxSZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXN0b21fYmxvY2s7XG4gICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgY3VzdG9tX2Jsb2NrID0gbmV3IG5tYl9PYmxvY2soKVxuICAgICAgICAgICAgICAgICAgICAuJHNldEhhcmRuZXNzKDMuMClcbiAgICAgICAgICAgICAgICAgICAgLiRzZXRTdGVwU291bmQoQmxvY2tDbGFzcy5zdGF0aWNWYXJpYWJsZXMuc291bmRUeXBlUGlzdG9uKVxuICAgICAgICAgICAgICAgICAgICAuJHNldFVubG9jYWxpemVkTmFtZShNb2RBUEkudXRpbC5zdHIoX3RoaXMuYmxvY2tJRCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgY3VzdG9tX2Jsb2NrID0gbmV3IG5tYl9PYmxvY2soKVxuICAgICAgICAgICAgICAgICAgICAuJHNldEhhcmRuZXNzKC0xLjApXG4gICAgICAgICAgICAgICAgICAgIC4kc2V0U291bmRUeXBlKE1vZEFQSS5ibG9ja1NvdW5kcy5QTEFOVC5nZXRSZWYoKSlcbiAgICAgICAgICAgICAgICAgICAgLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKF90aGlzLmJsb2NrSUQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEJsb2NrQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3RlckJsb2NrMC5tZXRob2QoTW9kQVBJLmtleWdlbi5ibG9jayhfdGhpcy5ibG9ja0lEKSwgTW9kQVBJLnV0aWwuc3RyKF90aGlzLmJsb2NrSUQpLCBjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgSXRlbUNsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJJdGVtQmxvY2swLm1ldGhvZChjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgX3RoaXMuZml4dXBCbG9ja0lkcygpO1xuICAgICAgICAgICAgTW9kQVBJLmJsb2Nrc1tfdGhpcy5ibG9ja0lEXSA9IGN1c3RvbV9ibG9jaztcbiAgICAgICAgICAgIF90aGlzLmJsb2NrSW5zdGFuY2UgPSBjdXN0b21fYmxvY2s7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyZWQgYmxvY2sgb24gY2xpZW50OiBcIiArIF90aGlzLmJsb2NrSUQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgIHJldHVybiBjdXN0b21fYmxvY2s7XG4gICAgICAgIH07XG4gICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIGlmIChNb2RBUEkubWF0ZXJpYWxzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVybmFsUmVnaXN0ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsUmVnaXN0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgaWYgKE1vZEFQSS5ibG9ja3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChuZXcgbm1iX09ibG9jaygpKS4kc2V0SGFyZG5lc3MoLTEuMCkuJHNldFNvdW5kVHlwZShNb2RBUEkuYmxvY2tTb3VuZHMuUExBTlQuZ2V0UmVmKCkpLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKHRoaXMuYmxvY2tJRCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgT0Jsb2NrLnByb3RvdHlwZS5maXh1cEJsb2NrSWRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYmxvY2tSZWdpc3RyeSA9IE1vZEFQSS51dGlsXG4gICAgICAgICAgICAud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpLnN0YXRpY1ZhcmlhYmxlc1xuICAgICAgICAgICAgLmJsb2NrUmVnaXN0cnkpXG4gICAgICAgICAgICAuZ2V0Q29ycmVjdGl2ZSgpO1xuICAgICAgICB2YXIgQkxPQ0tfU1RBVEVfSURTID0gTW9kQVBJLnV0aWxcbiAgICAgICAgICAgIC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIikuc3RhdGljVmFyaWFibGVzXG4gICAgICAgICAgICAuQkxPQ0tfU1RBVEVfSURTKVxuICAgICAgICAgICAgLmdldENvcnJlY3RpdmUoKTtcbiAgICAgICAgYmxvY2tSZWdpc3RyeS5yZWdpc3RyeU9iamVjdHMuaGFzaFRhYmxlS1RvVi5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGJsb2NrXzEgPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsaWRTdGF0ZXMgPSBibG9ja18xLmdldEJsb2NrU3RhdGUoKS5nZXRWYWxpZFN0YXRlcygpO1xuICAgICAgICAgICAgICAgIHZhciBzdGF0ZUFycmF5ID0gdmFsaWRTdGF0ZXMuYXJyYXkgfHwgW3ZhbGlkU3RhdGVzLmVsZW1lbnRdO1xuICAgICAgICAgICAgICAgIHN0YXRlQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaWJsb2Nrc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoYmxvY2tSZWdpc3RyeS5nZXRJREZvck9iamVjdChibG9ja18xLmdldFJlZigpKSA8PCA0KSB8XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja18xLmdldE1ldGFGcm9tU3RhdGUoaWJsb2Nrc3RhdGUuZ2V0UmVmKCkpO1xuICAgICAgICAgICAgICAgICAgICBCTE9DS19TVEFURV9JRFMucHV0KGlibG9ja3N0YXRlLmdldFJlZigpLCBpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPQmxvY2sucHJvdG90eXBlLnJlZ2lzdGVyQmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXN0b21fYmxvY2ssIG5tYl9PQmxvY2ssIGl0ZW1DbGFzcywgYmxvY2tDbGFzcywgc2VsZjtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBuZXcgT0Jsb2NrKHRoaXMuYmxvY2tOYW1lLCB0aGlzLmJsb2NrSUQsIHRoaXMuYmxvY2tUZXh0dXJlLCB0aGlzLm9uQnJlYWspLnJlZ2lzdGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBubWJfT0Jsb2NrID0gbmV3IE9CbG9jayh0aGlzLmJsb2NrTmFtZSwgdGhpcy5ibG9ja0lELCB0aGlzLmJsb2NrVGV4dHVyZSwgdGhpcy5vbkJyZWFrKS5yZWdpc3RlcigpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIik7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbV9ibG9jayA9IG5tYl9PQmxvY2s7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3RlckJsb2NrMC5tZXRob2QoTW9kQVBJLmtleWdlbi5ibG9jayh0aGlzLmJsb2NrSUQpLCBNb2RBUEkudXRpbC5zdHIodGhpcy5ibG9ja0lEKSwgY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJJdGVtQmxvY2swLm1ldGhvZChjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXN0b21fYmxvY2sgfHwgXCJCbG9jayByZWdpc3RyYXRpb24gZmFpbGVkXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJCbG9jayhcXFwiXCIuY29uY2F0KHRoaXMuYmxvY2tJRCwgXCJcXFwiLCBcIikuY29uY2F0KHRoaXMub25CcmVhaywgXCIpO1wiKSk7XG4gICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2lua1wiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UsIGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2luazpyZWdpc3Rlcml0ZW1zXCIsIGZ1bmN0aW9uIChyZW5kZXJJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVySXRlbS5yZWdpc3RlckJsb2NrKGN1c3RvbV9ibG9jaywgTW9kQVBJLnV0aWwuc3RyKHNlbGYuYmxvY2tJRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuTDEwTi5zZXQoXCJ0aWxlLlwiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLm5hbWVcIiksIHNlbGYuYmxvY2tOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2V0IGxvY2FsaXphdGlvbiBmb3IgYmxvY2sgXCIuY29uY2F0KHNlbGYuYmxvY2tJRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9ibG9jay9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBcImJsb2NrL2N1YmVfYWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsOiBcImJsb2Nrcy9cIi5jb25jYXQoc2VsZi5ibG9ja0lEKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9pdGVtL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IFwiYmxvY2svXCIuY29uY2F0KHNlbGYuYmxvY2tJRCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlyZHBlcnNvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRpb246IFsxMCwgLTQ1LCAxNzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IFswLCAxLjUsIC0yLjc1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiBbMC4zNzUsIDAuMzc1LCAwLjM3NV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9ibG9ja3N0YXRlcy9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHNlbGYuYmxvY2tJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHNlbGYuYmxvY2tUZXh0dXJlKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9ibG9ja3MvXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIucG5nXCIpLCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBidWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rOnJlZ2lzdGVyaXRlbXNcIiwgZnVuY3Rpb24gKHJlbmRlckl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvb2wgcmVnaXN0ZXIgYmxvY2tcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3VzdG9tX2Jsb2NrIHx8IFwiQmxvY2sgcmVnaXN0cmF0aW9uIGZhaWxlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJJdGVtLnJlZ2lzdGVyQmxvY2soY3VzdG9tX2Jsb2NrLCBNb2RBUEkudXRpbC5zdHIoX3RoaXMuYmxvY2tJRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuTDEwTi5zZXQoXCJ0aWxlLlwiICsgdGhpcy5ibG9ja0lEICsgXCIubmFtZVwiLCB0aGlzLmJsb2NrTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNldCBsb2NhbGl6YXRpb24gZm9yIGJsb2NrIFwiLmNvbmNhdChzZWxmLmJsb2NrSUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1c3RvbV9ibG9jayB8fCBcIkJsb2NrIHJlZ2lzdHJhdGlvbiBmYWlsZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvbW9kZWxzL2Jsb2NrL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmVudFwiOiBcImJsb2NrL2N1YmVfYWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0dXJlc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWxsXCI6IFwiYmxvY2tzL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9pdGVtL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmVudFwiOiBcImJsb2NrL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvYmxvY2tzdGF0ZXMvXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFyaWFudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5vcm1hbFwiOiB7IFwibW9kZWxcIjogXCJcIi5jb25jYXQodGhpcy5ibG9ja0lEKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goc2VsZi5ibG9ja1RleHR1cmUpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L3RleHR1cmVzL2Jsb2Nrcy9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5wbmdcIiksIGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVyQmxvY2soXFxcIlwiLmNvbmNhdCh0aGlzLmJsb2NrSUQsIFwiXFxcIiwgXCIpLmNvbmNhdCh0aGlzLm9uQnJlYWssIFwiKTtcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmJsb2Nrc1t0aGlzLmJsb2NrSURdID0gY3VzdG9tX2Jsb2NrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBPQmxvY2s7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgT0Jsb2NrO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xuICAgIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbmltcG9ydCBPSXRlbSBmcm9tIFwiLi9PSXRlbVwiO1xudmFyIE9FbnRpdHkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT0VudGl0eShlbnRpdHlOYW1lLCBlbnRpdHlJRCwgZW50aXR5VGV4dHVyZSwgZW50aXR5TW9kZWwsIGVudGl0eV9zb3VuZF9tYWluLCBlbnRpdHlCcmVlZEl0ZW0sIGVudGl0eURyb3BJdGVtLCBlZ2dCYXNlLCBlZ2dTcG90cywgZXh0cmFfdGFza3MpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlOYW1lID0gZW50aXR5TmFtZTtcbiAgICAgICAgdGhpcy5lbnRpdHlJRCA9IGVudGl0eUlEO1xuICAgICAgICB0aGlzLmVudGl0eVRleHR1cmUgPSBlbnRpdHlUZXh0dXJlO1xuICAgICAgICB0aGlzLmVudGl0eU1vZGVsID0gZW50aXR5TW9kZWw7XG4gICAgICAgIHRoaXMuZW50aXR5X3NvdW5kX21haW4gPSBlbnRpdHlfc291bmRfbWFpbjtcbiAgICAgICAgdGhpcy5lbnRpdHlCcmVlZEl0ZW0gPSBlbnRpdHlCcmVlZEl0ZW0gfHwgXCJ3aGVhdFwiOyAvL2RlZmF1bHQgYnJlZWQgaXRlbVxuICAgICAgICB0aGlzLmVudGl0eURyb3BJdGVtID0gZW50aXR5RHJvcEl0ZW0gfHwgXCJmZWF0aGVyXCI7IC8vZGVmYXVsdCBkcm9wIGl0ZW1cbiAgICAgICAgdGhpcy5lZ2dCYXNlID0gZWdnQmFzZSB8fCAweDVlM2UyZDsgLy9kZWZhdWx0IGVnZyBiYXNlIGNvbG9yXG4gICAgICAgIHRoaXMuZWdnU3BvdHMgPSBlZ2dTcG90cyB8fCAweDI2OTE2NjsgLy9kZWZhdWx0IGVnZyBzcG90cyBjb2xvclxuICAgICAgICB0aGlzLmV4dHJhX3Rhc2tzID0gZXh0cmFfdGFza3M7XG4gICAgfVxuICAgIE9FbnRpdHkucHJvdG90eXBlLndhaXRGb3JSZW5kZXJNYW5hZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXMsIHJlaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2soKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1vZEFQSS5tYy5yZW5kZXJNYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVjaywgMSAvIDIwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPRW50aXR5LnByb3RvdHlwZS5yZWdpc3RlckVudGl0eUNsaWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPRW50aXR5cyBhcmUgc3RpbGwgaW4gZGV2ZWxvcG1lbnQsIGV4cGVjdCBidWdzIGFuZCBpc3N1ZXNcIik7XG4gICAgICAgIC8vcmV0dXJuO1xuICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5qbF9TdHJpbmdfZm9ybWF0ID1cbiAgICAgICAgICAgIE1vZEFQSS5ob29rcy5tZXRob2RzLm5sZXZfSFN0cmluZ19mb3JtYXQ7IC8vdGVtcG9yYXJ5IHRoaW5nIHRvIGZpeCBhbiBpc3N1ZSBpbiBlYWdsZXJjcmFmdFxuICAgICAgICAvLyBVdGlsc1xuICAgICAgICBmdW5jdGlvbiBBSVRhc2sobmFtZSwgbGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9kQVBJLnJlZmxlY3RcbiAgICAgICAgICAgICAgICAuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkuYWkuXCIgKyBuYW1lKVxuICAgICAgICAgICAgICAgIC5jb25zdHJ1Y3RvcnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IGxlbmd0aDsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIFJlc291cmNlTG9jYXRpb24gPSBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgLmdldENsYXNzQnlOYW1lKFwiUmVzb3VyY2VMb2NhdGlvblwiKVxuICAgICAgICAgICAgLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gMTsgfSk7XG4gICAgICAgIHZhciBFbnRpdHlQbGF5ZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkVudGl0eVBsYXllclwiKTtcbiAgICAgICAgdmFyIEdsU3RhdGVNYW5hZ2VyID0gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC52YWx1ZXMoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJHbFN0YXRlTWFuYWdlclwiKS5zdGF0aWNNZXRob2RzKS5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIFt4Lm1ldGhvZE5hbWVTaG9ydCwgeC5tZXRob2RdOyB9KSk7XG4gICAgICAgIHZhciBTaGFyZWRNb25zdGVyQXR0cmlidXRlcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXNcIikuc3RhdGljVmFyaWFibGVzO1xuICAgICAgICB2YXIgZW50aXR5QnJlZWRJdGVtMiA9IHRoaXMuZW50aXR5QnJlZWRJdGVtO1xuICAgICAgICB2YXIgZW50aXR5RHJvcEl0ZW0yID0gdGhpcy5lbnRpdHlEcm9wSXRlbTtcbiAgICAgICAgLy8gU1RBUlQgQ1VTVE9NIEVOVElUWVxuICAgICAgICB2YXIgZW50aXR5U2l6ZTE7IC8vIERlZmF1bHQgc2l6ZSBmb3IgbW9zdCBlbnRpdGllc1xuICAgICAgICB2YXIgZW50aXR5U2l6ZTI7XG4gICAgICAgIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsQ2hpY2tlblwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuNDsgLy8gQ2hpY2tlblxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbENvd1wiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuOTsgLy8gQ293XG4gICAgICAgICAgICBlbnRpdHlTaXplMiA9IDEuNDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsTW9vc2hyb29tXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMC45OyAvLyBNb29zaHJvb21cbiAgICAgICAgICAgIGVudGl0eVNpemUyID0gMS40O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZW50aXR5TW9kZWwgPT09IFwiTW9kZWxQaWdcIikge1xuICAgICAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjk7IC8vIFBpZ1xuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFNoZWVwXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMC45OyAvLyBTaGVlcFxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAxLjM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbEhvcnNlXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMS4zOTY1OyAvLyBIb3JzZVxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAxLjY7IC8vIEhlaWdodCBjYW4gdmFyeSBzbGlnaHRseVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZW50aXR5TW9kZWwgPT09IFwiTW9kZWxSYWJiaXRcIikge1xuICAgICAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjQ7IC8vIFJhYmJpdFxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFNxdWlkXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMC44OyAvLyBTcXVpZFxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbEJhdFwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuNTsgLy8gQmF0XG4gICAgICAgICAgICBlbnRpdHlTaXplMiA9IDAuOTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsT2NlbG90XCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMC42OyAvLyBPY2Vsb3QgKHdpbGQpXG4gICAgICAgICAgICBlbnRpdHlTaXplMiA9IDAuNztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsV29sZlwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuNjsgLy8gV29sZlxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjg1O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZW50aXR5TW9kZWwgPT09IFwiTW9kZWxWaWxsYWdlclwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuNjsgLy8gVmlsbGFnZXJcbiAgICAgICAgICAgIGVudGl0eVNpemUyID0gMS45NTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsSXJvbkdvbGVtXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMS40OyAvLyBJcm9uIEdvbGVtXG4gICAgICAgICAgICBlbnRpdHlTaXplMiA9IDIuOTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsU25vd21hblwiIHx8XG4gICAgICAgICAgICB0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsU25vd0dvbGVtXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMC43OyAvLyBTbm93IEdvbGVtXG4gICAgICAgICAgICBlbnRpdHlTaXplMiA9IDEuOTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW50aXR5Q2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5wYXNzaXZlLkVudGl0eUFuaW1hbFwiKTtcbiAgICAgICAgdmFyIGVudGl0eVN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoZW50aXR5Q2xhc3MsIGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gMjsgfSk7XG4gICAgICAgIGlmIChnbG9iYWxUaGlzLkRlYnVnX21vZGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcInRoaXMgaXMgZW50aXR5IHNpemUgMTogXCIuY29uY2F0KGVudGl0eVNpemUxLCBcIiwgdGhpcyBpcyBlbnRpdHkgc2l6ZSAyOiBcIikuY29uY2F0KGVudGl0eVNpemUyLCBcIiwgb2ggdGhlIGJyZWVkaXRlbSBcIikuY29uY2F0KGVudGl0eUJyZWVkSXRlbTIsIFwiLCBhbmQgZHJvcEl0ZW0gXCIpLmNvbmNhdChlbnRpdHlEcm9wSXRlbTIpKTtcbiAgICAgICAgfVxuICAgICAgICA7XG4gICAgICAgIHZhciBlbnRpdHlCcmVlZEl0ZW0yID0gdGhpcy5lbnRpdHlCcmVlZEl0ZW07XG4gICAgICAgIHZhciBlbnRpdHlEcm9wSXRlbTIgPSB0aGlzLmVudGl0eURyb3BJdGVtO1xuICAgICAgICB2YXIgaXRlbV9yZWYgPSBNb2RBUEkuaXRlbXNbZW50aXR5QnJlZWRJdGVtMl0uZ2V0UmVmKCk7XG4gICAgICAgIHZhciBleHRyYV90YXNrcyA9IHRoaXMuZXh0cmFfdGFza3MgfHwgW107XG4gICAgICAgIHZhciBubWVfT0VudGl0eSA9IGZ1bmN0aW9uIG5tZV9PRW50aXR5KCR3b3JsZEluKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgZW50aXR5U3VwZXIodGhpcywgJHdvcmxkSW4pO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQuc2V0U2l6ZShlbnRpdHlTaXplMSB8fCAwLjQsIGVudGl0eVNpemUyIHx8IDAuNyk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygwLCBBSVRhc2soXCJFbnRpdHlBSVN3aW1taW5nXCIsIDEpKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDEsIEFJVGFzayhcIkVudGl0eUFJUGFuaWNcIiwgMikodGhpcywgMS45KSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygyLCBBSVRhc2soXCJFbnRpdHlBSU1hdGVcIiwgMikodGhpcywgMS4wKSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDMsIEFJVGFzayhcIkVudGl0eUFJVGVtcHRcIiwgNCkodGhpcywgMS41LCBpdGVtX3JlZiwgMCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJGYWlsZWQgdG8gYWRkIEVudGl0eUFJVGVtcHQgdGFzayBmb3IgXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiLiBUaGlzIG1heSBiZSBkdWUgdG8gYW4gaW5jb3JyZWN0IGl0ZW0gcmVmZXJlbmNlLCBcIikuY29uY2F0KGl0ZW1fcmVmLCBcIiwgKCBpdGVtIHJlZiksIGFuZCBcIikuY29uY2F0KGl0ZW1fcmVmKCksIFwiLCAoaXRlbV9yZWYoKSlcIikpO1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDMsIEFJVGFzayhcIkVudGl0eUFJVGVtcHRcIiwgNCkodGhpcywgMS41LCBpdGVtX3JlZigpLCAwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg0LCBBSVRhc2soXCJFbnRpdHlBSUZvbGxvd1BhcmVudFwiLCAyKSh0aGlzLCAxLjIpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDUsIEFJVGFzayhcIkVudGl0eUFJV2FuZGVyXCIsIDIpKHRoaXMsIDEuMSkpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNiwgQUlUYXNrKFwiRW50aXR5QUlXYXRjaENsb3Nlc3RcIiwgMykodGhpcywgTW9kQVBJLnV0aWwuYXNDbGFzcyhFbnRpdHlQbGF5ZXIuY2xhc3MpLCA2KSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg3LCBBSVRhc2soXCJFbnRpdHlBSUxvb2tJZGxlXCIsIDEpKHRoaXMpKTtcbiAgICAgICAgICAgIGV4dHJhX3Rhc2tzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50KF90aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRmFpbGVkIHRvIGFkZCBleHRyYSB0YXNrIGZvciBcIi5jb25jYXQoX3RoaXMuZW50aXR5SUQsIFwiLiBUaGlzIG1heSBiZSBkdWUgdG8gYW4gaW5jb3JyZWN0IHRhc2sgZnVuY3Rpb24sIFwiKS5jb25jYXQoZWxlbWVudCwgXCIsIG9yIHRoZSB0YXNrIGZ1bmN0aW9uIG5vdCBiZWluZyBjb21wYXRpYmxlIHdpdGggdGhlIGVudGl0eS5cIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhlbnRpdHlDbGFzcywgbm1lX09FbnRpdHkpO1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldEV5ZUhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlZC5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvcmlnaW5hbEFwcGx5RW50aXR5QXR0cmlidXRlcyA9IG5tZV9PRW50aXR5LnByb3RvdHlwZS4kYXBwbHlFbnRpdHlBdHRyaWJ1dGVzO1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGFwcGx5RW50aXR5QXR0cmlidXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgb3JpZ2luYWxBcHBseUVudGl0eUF0dHJpYnV0ZXMuYXBwbHkodGhpcywgW10pO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkXG4gICAgICAgICAgICAgICAgLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tYXhIZWFsdGgpXG4gICAgICAgICAgICAgICAgLnNldEJhc2VWYWx1ZSg1KTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgICAgIC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZClcbiAgICAgICAgICAgICAgICAuc2V0QmFzZVZhbHVlKDAuMjUpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgb3JpZ2luYWxMaXZpbmdVcGRhdGUgPSBubWVfT0VudGl0eS5wcm90b3R5cGUuJG9uTGl2aW5nVXBkYXRlO1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJG9uTGl2aW5nVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICBvcmlnaW5hbExpdmluZ1VwZGF0ZS5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgICAgICBpZiAodGhpcy53cmFwcGVkLmlzSW5XYXRlcigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLm1vdGlvblkgKj0gMC41O1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgICAgICAgICAuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1vdmVtZW50U3BlZWQpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRCYXNlVmFsdWUoMS40KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgICAgICAgICAuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1vdmVtZW50U3BlZWQpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRCYXNlVmFsdWUoMC4yNSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0TGl2aW5nU291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgdGhpcy5lbnRpdHlJRCArIFwiLm1haW5fc291bmRcIik7XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0SHVydFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIHRoaXMuZW50aXR5SUQgKyBcIi5tYWluX3NvdW5kXCIpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldERlYXRoU291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgdGhpcy5lbnRpdHlJRCArIFwiLm1haW5fc291bmRcIik7XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kcGxheVN0ZXBTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnBsYXlTb3VuZChNb2RBUEkudXRpbC5zdHIoXCJtb2IuXCIgKyB0aGlzLmVudGl0eUlEICsgXCIuc3RlcFwiKSwgMC4yLCAxKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXREcm9wSXRlbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBNb2RBUEkuaXRlbXNbdGhpcy5lbnRpdHlEcm9wSXRlbV0uZ2V0UmVmKCk7XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kY3JlYXRlQ2hpbGQgPSBmdW5jdGlvbiAob3RoZXJQYXJlbnQpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgbm1lX09FbnRpdHkoKF9iID0gKF9hID0gdGhpcy53cmFwcGVkLndvcmxkT2JqKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0UmVmKCkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG51bGwpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGlzQnJlZWRpbmdJdGVtID0gZnVuY3Rpb24gKGl0ZW1zdGFjaykge1xuICAgICAgICAgICAgcmV0dXJuIChpdGVtc3RhY2sgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICBpdGVtc3RhY2suJGdldEl0ZW0oKSA9PT0gTW9kQVBJLml0ZW1zW2VudGl0eUJyZWVkSXRlbTJdLmdldFJlZigpKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gRU5EIENVU1RPTSBFTlRJVFlcbiAgICAgICAgLy8gU1RBUlQgQ1VTVE9NIE1PREVMXG4gICAgICAgIHZhciBtb2RlbENoaWNrZW5DbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY2xpZW50Lm1vZGVsLlwiLmNvbmNhdCh0aGlzLmVudGl0eU1vZGVsKSk7XG4gICAgICAgIHZhciBtb2RlbENoaWNrZW5TdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKG1vZGVsQ2hpY2tlbkNsYXNzKTsgLy93aGlsZSBzdXBlciBpc24ndCB1c2VkIHdoZW4gZXh0ZW5kaW5nIHRoaXMgY2xhc3MsIGphdmEgaW1wbGllcyB0aGUgY2FsbC5cbiAgICAgICAgdmFyIG5tY21fT0VudGl0eU1vZGVsID0gZnVuY3Rpb24gbm1jbV9PRW50aXR5TW9kZWwoKSB7XG4gICAgICAgICAgICBtb2RlbENoaWNrZW5TdXBlcih0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2sobW9kZWxDaGlja2VuQ2xhc3MsIG5tY21fT0VudGl0eU1vZGVsKTtcbiAgICAgICAgLy8gRU5EIENVU1RPTSBNT0RFTFxuICAgICAgICAvLyBTVEFSVCBDVVNUT00gUkVOREVSRVJcbiAgICAgICAgdmFyIHJlbmRlckNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jbGllbnQucmVuZGVyZXIuZW50aXR5LlJlbmRlckxpdmluZ1wiKTtcbiAgICAgICAgdmFyIHJlbmRlclN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIocmVuZGVyQ2xhc3MsIGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gNDsgfSk7XG4gICAgICAgIHZhciBkdWNrVGV4dHVyZXMgPSBSZXNvdXJjZUxvY2F0aW9uKE1vZEFQSS51dGlsLnN0cihcInRleHR1cmVzL2VudGl0eS9cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIucG5nXCIpKSk7XG4gICAgICAgIHZhciBubWNyZV9SZW5kZXJPRW50aXR5ID0gZnVuY3Rpb24gbm1jcmVfUmVuZGVyT0VudGl0eShyZW5kZXJNYW5hZ2VyLCBtb2RlbEJhc2VJbiwgc2hhZG93U2l6ZUluKSB7XG4gICAgICAgICAgICByZW5kZXJTdXBlcih0aGlzLCByZW5kZXJNYW5hZ2VyLCBtb2RlbEJhc2VJbiwgc2hhZG93U2l6ZUluKTtcbiAgICAgICAgfTtcbiAgICAgICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2socmVuZGVyQ2xhc3MsIG5tY3JlX1JlbmRlck9FbnRpdHkpO1xuICAgICAgICBubWNyZV9SZW5kZXJPRW50aXR5LnByb3RvdHlwZS4kZ2V0RW50aXR5VGV4dHVyZSA9IGZ1bmN0aW9uIChlbnRpdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBkdWNrVGV4dHVyZXM7XG4gICAgICAgIH07XG4gICAgICAgIG5tY3JlX1JlbmRlck9FbnRpdHkucHJvdG90eXBlLiRoYW5kbGVSb3RhdGlvbkZsb2F0ID0gZnVuY3Rpb24gKGVudGl0eSwgcGFydGlhbFRpY2tzKSB7XG4gICAgICAgICAgICBlbnRpdHkgPSBNb2RBUEkudXRpbC53cmFwKGVudGl0eSk7XG4gICAgICAgICAgICBpZiAoIWVudGl0eS5vbkdyb3VuZCAmJiAhZW50aXR5LmlzSW5XYXRlcigpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7IC8vZmFsbGluZ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBJRCA9IE1vZEFQSS5rZXlnZW4uZW50aXR5KHRoaXMuZW50aXR5SUQpO1xuICAgICAgICBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eUxpc3RcIilcbiAgICAgICAgICAgIC5zdGF0aWNNZXRob2RzLmFkZE1hcHBpbmcwLm1ldGhvZChNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwge1xuICAgICAgICAgICAgJGNyZWF0ZUVudGl0eTogZnVuY3Rpb24gKCR3b3JsZEluKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBubWVfT0VudGl0eSgkd29ybGRJbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LCBNb2RBUEkudXRpbC5zdHIodGhpcy5lbnRpdHlJRC50b1VwcGVyQ2FzZSgpKSwgSUQsIHRoaXMuZWdnQmFzZSB8fCAweDVlM2UyZCwgLy9lZ2cgYmFzZVxuICAgICAgICB0aGlzLmVnZ1Nwb3RzIHx8IDB4MjY5MTY2IC8vZWdnIHNwb3RzXG4gICAgICAgICk7XG4gICAgICAgIHZhciBTcGF3blBsYWNlbWVudFR5cGUgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlMaXZpbmckU3Bhd25QbGFjZW1lbnRUeXBlXCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgdmFyIEVOVElUWV9QTEFDRU1FTlRTID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlTcGF3blBsYWNlbWVudFJlZ2lzdHJ5XCIpLnN0YXRpY1ZhcmlhYmxlcy5FTlRJVFlfUExBQ0VNRU5UUyk7XG4gICAgICAgIEVOVElUWV9QTEFDRU1FTlRTLnB1dChNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgU3Bhd25QbGFjZW1lbnRUeXBlLk9OX0dST1VORCk7XG4gICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBTcGF3bkxpc3RFbnRyeSA9IE1vZEFQSS5yZWZsZWN0XG4gICAgICAgICAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlJFNwYXduTGlzdEVudHJ5XCIpXG4gICAgICAgICAgICAgICAgLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gNDsgfSk7XG4gICAgICAgICAgICB2YXIgQmlvbWVHZW5Td2FtcCA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZUdlbkJhc2VcIilcbiAgICAgICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLnN3YW1wbGFuZCk7XG4gICAgICAgICAgICB2YXIgQmlvbWVHZW5SaXZlciA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZUdlbkJhc2VcIilcbiAgICAgICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLnJpdmVyKTtcbiAgICAgICAgICAgIHZhciBCaW9tZUdlbkJlYWNoID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMuYmVhY2gpO1xuICAgICAgICAgICAgdmFyIGR1Y2tTcGF3blN3YW1wID0gU3Bhd25MaXN0RW50cnkoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIDIyLCAzLCA1KTtcbiAgICAgICAgICAgIHZhciBkdWNrU3Bhd25SaXZlckJlZCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAxMCwgNSwgOSk7XG4gICAgICAgICAgICB2YXIgZHVja1NwYXduQmVhY2ggPSBTcGF3bkxpc3RFbnRyeShNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgMjQsIDIsIDMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobm1lX09FbnRpdHkpO1xuICAgICAgICAgICAgQmlvbWVHZW5Td2FtcC5zcGF3bmFibGVDcmVhdHVyZUxpc3QuYWRkKGR1Y2tTcGF3blN3YW1wKTtcbiAgICAgICAgICAgIEJpb21lR2VuUml2ZXIuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25SaXZlckJlZCk7XG4gICAgICAgICAgICBCaW9tZUdlbkJlYWNoLnNwYXduYWJsZUNyZWF0dXJlTGlzdC5hZGQoZHVja1NwYXduQmVhY2gpO1xuICAgICAgICB9KTtcbiAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBBc3luY1NpbmsuTDEwTi5zZXQoXCJlbnRpdHkuXCIuY29uY2F0KHRoaXMuZW50aXR5SUQudG9VcHBlckNhc2UoKSwgXCIubmFtZVwiKSwgdGhpcy5lbnRpdHlOYW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7IH0pO1xuICAgICAgICByZXR1cm4gX2EgPSB7fSxcbiAgICAgICAgICAgIF9hW1wiRW50aXR5XCIuY29uY2F0KHRoaXMuZW50aXR5SUQudG9VcHBlckNhc2UoKSldID0gbm1lX09FbnRpdHksXG4gICAgICAgICAgICBfYVtcIk1vZGVsXCIuY29uY2F0KHRoaXMuZW50aXR5SUQudG9VcHBlckNhc2UoKSldID0gbm1jbV9PRW50aXR5TW9kZWwsXG4gICAgICAgICAgICBfYVtcIlJlbmRlclwiLmNvbmNhdCh0aGlzLmVudGl0eUlELnRvVXBwZXJDYXNlKCkpXSA9IG5tY3JlX1JlbmRlck9FbnRpdHksXG4gICAgICAgICAgICBfYVtcIlwiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIlRleHR1cmVzXCIpXSA9IGR1Y2tUZXh0dXJlcyxcbiAgICAgICAgICAgIF9hO1xuICAgIH07XG4gICAgT0VudGl0eS5wcm90b3R5cGUucmVnaXN0ZXJPRW50aXR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oXCJPRW50aXR5cyBkb250IHdvcmsgaW4gMS4xMiwgYW5kIG9uZSBvZiB5b3VyIG1vZHMgYXJlIHRyeWluZyB0byB1c2UgaXQhIFBsZWFzZSBzd2l0Y2ggdG8gMS44LjhcIik7XG4gICAgICAgIH1cbiAgICAgICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlckVudGl0eVNlcnZlcihcXFwiXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiXFxcIiwgXFxcIlwiKS5jb25jYXQodGhpcy5lbnRpdHlOYW1lLCBcIlxcXCIsIFxcXCJcIikuY29uY2F0KHRoaXMuZW50aXR5TW9kZWwsIFwiXFxcIiwgXFxcIlwiKS5jb25jYXQodGhpcy5lbnRpdHlCcmVlZEl0ZW0sIFwiXFxcIiwgXFxcIlwiKS5jb25jYXQodGhpcy5lbnRpdHlEcm9wSXRlbSwgXCJcXFwiLCBcIikuY29uY2F0KHRoaXMuZWdnQmFzZSwgXCIsIFwiKS5jb25jYXQodGhpcy5lZ2dTcG90cywgXCIpO1wiKSk7XG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5yZWdpc3RlckVudGl0eUNsaWVudCgpO1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2o7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9rKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfay5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYiA9IChfYSA9IEFzeW5jU2luaykuc2V0RmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jID0gW1wicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9lbnRpdHkvXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiLnBuZ1wiKV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaCh0aGlzLmVudGl0eVRleHR1cmUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzQgLyp5aWVsZCovLCAoX2suc2VudCgpKS5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2IuYXBwbHkoX2EsIF9jLmNvbmNhdChbX2suc2VudCgpXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLmhpZGVGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9lbnRpdHkvXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiLnBuZy5tY21ldGFcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy53YWl0Rm9yUmVuZGVyTWFuYWdlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2suc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2UgPSAoX2QgPSBBc3luY1NpbmspLnNldEZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZiA9IFtcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvc291bmRzL21vYi9cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIvbWFpbl9zb3VuZC5vZ2dcIildO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goXCJcIi5jb25jYXQodGhpcy5lbnRpdHlfc291bmRfbWFpbikpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzQgLyp5aWVsZCovLCAoX2suc2VudCgpKS5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgX2UuYXBwbHkoX2QsIF9mLmNvbmNhdChbX2suc2VudCgpXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLkF1ZGlvLnJlZ2lzdGVyKFwibW9iLlwiICsgdGhpcy5lbnRpdHlJRCArIFwiLm1haW5fc291bmRcIiwgQXN5bmNTaW5rLkF1ZGlvLkNhdGVnb3J5LkFOSU1BTFMsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IFwic291bmRzL21vYi9cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIvbWFpbl9zb3VuZC5vZ2dcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpdGNoOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2x1bWU6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzogZmFsc2UsIC8vdXNlIGZvciBsYXJnZSBhdWRpbyBmaWxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9oID0gKF9nID0gQXN5bmNTaW5rKS5zZXRGaWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2ogPSBbXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L3NvdW5kcy9tb2IvXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiL3N0ZXAub2dnXCIpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKFwiZGF0YTphdWRpby9vZ2c7YmFzZTY0LFQyZG5Vd0FDQUFBQUFBQUFBQUFiUFFBQUFBQUFBTFlaV2RJQkhnRjJiM0ppYVhNQUFBQUFBWUErQUFBQUFBQUFtSVlCQUFBQUFBQ3BBVTluWjFNQUFBQUFBQUFBQUFBQUd6MEFBQUVBQUFCZktiTllENUQvLy8vLy8vLy8vLy8vLy8vLzRBTjJiM0ppYVhNMEFBQUFXR2x3YUM1UGNtY2diR2xpVm05eVltbHpJRWtnTWpBeU1EQTNNRFFnS0ZKbFpIVmphVzVuSUVWdWRtbHliMjV0Wlc1MEtRSUFBQUF6QUFBQVZFbFVURVU5VkdobElGTnZiM1JvYVc1bklGTnZkVzVrY3lCdlppQkVWVU5MSUNNeklDaHlkVzV1YVc1bklHUjFZMnNwRVFBQUFFRlNWRWxUVkQxelpVUlZRMHQwYVhabEFRVjJiM0ppYVhNa1FrTldBUUJBQUFBWVFoQXFCYTFqampySUZTR01HYUtnUXNvcHh4MUMwQ0dqSkVPSU9zWTF4eGhqUjdsa2lrTEpnZENRVlFBQVFBQUFwQnhYVUhKSkxlZWNjNk1ZVjh4eDZDRG5uSFBsSUdmTWNRa2w1NXh6ampubmtuS09NZWVjYzZNWVZ3NXlLUzNubkhPQkZFZUtjYWNZNTV4enBCeEhpbkdvR09lY2MyMHh0NUp5empubm5IUG1JSWRTY3E0MTU1eHpwQmhuRG5JTEplZWNjOFlnWjh4eDZ5RG5uSE9NTmJmVWNzNDU1NXh6empubm5IUE9PZWVjYzR3eDU1eHp6am5ubkhOdU1lY1djNjQ1NTV4enpqbm5ISFBPT2VlY2N5QTBaQlVBa0FBQW9LRW9pdUlvRGhBYXNnb0F5QUFBRUVCeEZFZVJGRXV4SE12UkpBMElEVmtGQUFBQkFBZ0FBS0JJaHFSSWlxVllqbVpwbmlaNm9paWFvaXFyc21uS3NpekxzdXU2TGhBYXNnb0FTQUFBVUZFVXhYQVVCd2dOV1FVQVpBQUFDR0FvaXFNNGp1UllrcVZabmdlRWhxd0NBSUFBQUFRQUFGQU1SN0VVVGZFa3ovSTh6L004ei9NOHovTTh6L004ei9NOHovTThEUWdOV1FVQUlBQUFBSUlvWkJnRFFrTldBUUJBQUFBSUlSb1pRNTFTRWx3S0ZrSWNFVU1kUXM1RHFhV0Q0Q21GSldQU1U2eEJDQ0Y4N3ozMzNudnZnZENRVlFBQUVBQUFZUlE0aUlISEpBZ2hoR0lVSjBSeHBpQUlJWVRsSkZqS2VlZ2tDTjJERUVLNG5Idkx1ZmZlZXlBMFpCVUFBQWdBd0NDRUVFSUlJWVFRUWdncHBKUlNTQ21tbUdLS0tjY2NjOHd4eHlDRERETG9vSk5PT3Nta2trNDZ5aVNqamxKcktiVVVVMHl4NVJaanJiWFduSE92UVNsampESEdHR09NTWNZWVk0d3h4aGdqQ0ExWkJRQ0FBQUFRQmhsa2tFRUlJWVFVVWtncHBwaHl6REhISEFOQ1ExWUJBSUFBQUFJQUFBQWNSVklrUjNJa1I1SWt5WklzU1pNOHk3TTh5N004VGRSRVRSVlYxVlZ0MS9adFgvWnQzOVZsMy9abDI5VmxYWlpsM2JWdFhkWmRYZGQxWGRkMVhkZDFYZGQxWGRkMVhkZUIwSkJWQUlBRUFJQ081RGlPNURpTzVFaU9wRWdLRUJxeUNnQ1FBUUFRQUlDak9JcmpTSTdrV0k0bFdaSW1hWlpuZVphbmVacW9pUjRRR3JJS0FBQUVBQkFBQUFBQUFJQ2lLSXFqT0k0a1daYW1hWjZuZXFJb21xcXFpcWFwcXFwcW1xWnBtcVpwbXFacG1xWnBtcVpwbXFacG1xWnBtcVpwbXFacG1xWnBtcVpwQXFFaHF3QUFDUUFBSGNkeEhFZHhITWR4SkVlU0pDQTBaQlVBSUFNQUlBQUFRMUVjUlhJc3g1STBTN004eTlORXovUmNVVFoxVTFkdElEUmtGUUFBQ0FBZ0FBQUFBQUFBeDNNOHgzTTh5Wk04eTNNOHg1TThTZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRRTkNRMVlDQUdRQUFCekZtSHRTU3FuT1FVZ3hKMmM3eGh5MG1Kc09GVUpNV2kwMlpJZ1lKcTNIMGlsQ2tLT2FTc2lRTVlwcUthVlRDQ21wcFpUUU1jYWtwdFphS3FXMEhnZ05XUkVBUkFFQUFBZ2h4aEJqaURFR0lZTVFNY1lnZEJBaXhoeUVERUlHSVpRVVNza2doQkpDU1pGakRFSUhJWU1RVWdtaFpCQkNLU0dWQWdBQUFod0FBQUlzaEVKRFZnUUFjUUlBQ0VMT0ljWWdSSXhCQ0NXa0ZFSklLV0lNUXVhY2xNdzVLYVdVMWtJcHFVV01RY2ljazVJNUp5V1UwbElwcGJWUVNtdWxsTlpDS2EyMTFtcE5yY1VhU21rdGxOSmFLYVcxMUZxTnJiVWFJOFlnWk01SnlaeVRVa3BwclpUU1d1WWNsUTVDU2gyRWxFcEtMWmFVV3N5Y2s5SkJSNldEa0ZKSkpiYVNVb3dsbGRoS1NqR1dsR0pzTGNiYVlxdzFsTkphU1NXMmtsS01MYllhVzR3MVI0eEJ5WnlUa2prbnBaVFNXaW1wdGN3NUtSMkVsRG9ISlpXVVlpd2x0Wmc1SjZXRGtGSUhJYVdTVW13bHBkaENLYTJWbEdJc0piWFlZc3kxdGRocUtLbkZrbEtNSmFVWVc0eTF0dGhxN0tTMEZsS0pMWlRTWW91eDF0WmFyYUdVR0V0S01aYVVZb3d4MXR4aXJEbVUwbUpKSmNhU1Vvc3R0bHhiakRXbjFuSnRMZGJjWXN3MXhseDdyYlhuMUZxdHFiVmFXNHcxeHhwenJMWG0za0ZwTFpRU1d5aXB4ZFphclMzR1drTXBzWldVWWl3bHhkaGl6TFcxV0hNb0pjYVNVb3dscFJoYmpMWEdHSE5PcmRYWVlzdzF0VlpycmJYbkdHdnNxYlZhVzR3MXQ5aHFyYlgyWG5Qc3RRQUFnQUVIQUlBQUU4cEFvU0VyQVlBb0FBRENHS1VZZzlBZ3BKUmpFQnFFbEdJT1FxVVVZODVKcVpSaXpEa3BtV1BPUVVnbFk4NDVDQ1dGRUVwSkphVVFRaWtscFZRQUFFQ0JBd0JBZ0EyYUVvc0RGQnF5RWdBSUNRQWdFRktLTWVjZ2xKSlNTaEZDVERrR0lZUlNVbW90UWtncDVoeUVVRXBLclZWTU1lWWNoQkJLU2FtMVNqSEduSU1RUWlrcHRaWTU1eHlFRUVwSkthWFdNdWFjZ3hCQ0tTbWwxRm9ISVlRUVNpa2xwZFphNnlDRUVFSXBwYVRVV21zaGhCQktLYVdrbEZxTE1ZUVFRaW1scEpKU2F6R1dVa3BKS2FXVVVtc3R4bEpLS1NtbGxGSkxyY1dZVWtvcHBkWmFheTNHR0ZOS0thWFVXbXV4eFJoamFxMjExbHFMTWNZWWEwMnR0ZFphaXpIR0dHT3RCUUFBSERnQUFBUVlRU2NaVlJaaG93a1hIb0JDUTFZRUFGRUFBSUF4aURIRUdIS09RY2lnUk00eENabUV5RGxIcFpPU1NRbWhsZFl5S2FHVmtscmtuSlBTVWNxb2xKWkNhWm1rMGxwb29RQUFzQU1IQUxBREM2SFFrSlVBUUI0QUFJR1FVb3c1NXh4U2lqSEduSE1PS2FVWVk4NDVweGhqekRubm5GT01NZWFjYzg0eHhweHp6am5uR0dQT09lZWNjODQ1NTV4ekRrTG5uSFBPT1FlaGM4NDU1eUNFMERubm5ITVFRaWdBQUtqQUFRQWd3RWFSelFsR2dnb05XUWtBcEFJQUFNZ3c1cHh6VWxKcWxHSU1RZ2lscE5Rb3hSaUVFRXBKS1hNT1FnaWxwTlJheGhoMEVrcEpxYlVPUWlpbHBOUmFqQjJFRWtwSnFiVVlPd2lscEpSU2F6RjJFRXBKcWFYV1lpeWxwTlJhYXpIV1drcEpxYlhXWXF3MXBkUmFqREhXV210S3FiVVlZNnkxMWdJQXdCTWNBSUFLYkZnZDRhUm9MTERRa0pVQVFBWUF3QkFBd0FFQUFBTU9BQUFCSnBTQlFrTldBZ0NwQUFDQU1ZdzU1eHlFVWhxbG5JTVFRaW1wTkVvNUJ5R0VVbExLbkpOUVNpa3B0Wlk1SjZXVVVsSnFyWU5RU2tvcHRSWmpCNkdVbEZKcUxjWU9RaW9wdFJaampSMkVVbEpxTGNZWVF5a3B0UlpqakxXR1VsSnFMY1lZYXkwcHRSWmpqYlhtV2xKcUxjWWFhODIxQUFDRUJnY0FzQU1iVmtjNEtSb0xMRFJrSlFDUUJ3QkFJTVFZWTR3NWg1UmlqREhubkVOS01jYVljODR4eGhoenpqbm5HR09NT2VlY2M0d3g1NXh6empuR21IUE9PZWNjYzg0NTU1eHpqam5ubkhQT09lZWNjODQ1NTV4enpqbm5uSFBPQ1FBQUtuQUFBQWl3VVdSemdwR2dRa05XQWdEaEFBQ0FNWXc1eHhoMEVsSnFtSUlPUWdnbHBOQkNvNWh6RUVJb3BhVFVNdWlrcEZSS1NxM0ZsamtucGFSU1VrcXR4UTVDU2ltbDFGcU1NWFlRVWtvcHBkWmlqTFdEVUVwS0xjVllZNjBkaEZKU2FxMjFHR3NOcGFUVVdtd3gxcHB6S0NXbDFscU1zZGFhUzBxdHhWaGpyYm5tWEZKcUxiWllhNjAxNTlSYWpESFdtbXZPdmFmV1lveXgxcHB6N3IwQUFKTUhCd0NvQkJ0bldFazZLeHdOTGpSa0pRQ1FHd0NBSU1TWWM4NUJDQ0dFRUVJSUlWS0tNZWNnaEJCQ0NDR1VVa3FrRkdQT1FRZ2hoQkJDQ0NHRWpESG5vSU1RUWdpbGxGSktLUmxqemtFSUlZUVFTaWlsaEJJNjU2Q0RFRUlKcFpSU1NpbWxkTTQ1Q0NHRUVFb3BwWlJTU3VrZ2hCQkNDS1dVVWtvcHBaVFNRUWdoaEZCS0thV1VVa29wSllRUVFnaWxsRkpLS2FXVVVrb0lJWVFRU2ltbGxGSktLYVdVRUVJSXBaUlNTaW1sbEZKS0tTR0VFRW9wcFpSU1NpbWxsRkpDQ0tXVVVrb3BwWlJTU2ltbGhCQktLYVdVVWtvcHBaUlNTZ21obEZKS0thV1VVa29wcFpRU1NpbWxsRkpLS2FXVVVrb3BKWlJTU2ltbGxGSktLYVdVVWtvb3BaUlNTaW1sbEZKS0thV1VVRW9wcFpSU1NpbWxsRkpLS2FHVVVrb3BwWlJTU2ltbGxGSUtBQUE2Y0FBQUNEQ2kwa0xzTk9QS0kzQkVJY01FVkdqSVNnQWdIQUFBUUFRNkNDR0VFRUlJRVhNUVFnZ2hoQkJDaUppREVFSUlJWVFRUWdnaGhCQkNDS1dVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thVVVBSFdaNFFBWVBXSGpEQ3RKWjRXandZV0dyQVFBMGdJQUFHTVlZNHdweUtTekZtT3REV01RUWdlZGhCUnFxQ1dtaGpFSUlYUlFTa290dGxoekJxR2tVa3BKTGNaWWc4MDlnMUJLS2FXa0ZtT3RPUmZqUVVnbHBkUmlxN1huSEl6dUlKU1NVa294MXBwejdyMW8wRWxKcWJWYWMrNDlCMTg4Q0tXazFscU1QUWNmakRDaWxKWmlyTEhXSEh3UlJoaFJTa3N0eHBwN3piMFlZNFJLS2NaYWU4NjU1MXlNRVQ2bEZtT3V1ZmNlZkM3QytPSml6RG4zNG9NUFBnaGhqSkF4NXRoejhMMFhZNHdQd3NoY2N5N0NHT09MTU1MNElHeXR1UWRmakJGR0dHTjg3elg0b0hzeHdnZ2pqREhDQ04xejBVWDRZb3d4UmhoZmhBRUF1UkVPQUlnTFJoSlNaeGxXR25IakNSZ2lrRUpEVmdFQU1RQUFCREhHSUtTUVVrb3B4UmhqakRIR0dHT01NY1lZWTR3eHhweGp6am5ubkFBQXdBUUhBSUFBSzlpVldWcTFVZHpVU1Y3MFFlQVRPbUl6TXVSU0ttWnlJdWlSR21xeEV1elFDbTd3QXJEUWtKVUFBQmtBQU9Ta2xKUmFMUnBDeWtGcE5ZaklJT1VreFNRaVk1Q0Mwb0tua0RHSVNjb2RZd29oQmFsMjBER0ZGS01hVWdxWlVncHFxam1HampHb01TZmhVZ21sQmdBQVFCQUFJQ0FrQU1BQVFjRU1BREE0UUJnNUVPZ0lJSEJvQXdBTVJNaE1ZRkFJRFE0eUFlQUJJa0lxQUVoTVVKUXVkRUVJRWFTTElJc0hMcHk0OGNRTkozUm9nd0FBQUFBQWdBQ0FEd0NBaEFLSWlHWm1yc0xpQWlORFk0T2p3K01ESkVSa0pBQUFBQUFBUUFEZ0F3QWdJUUVpb3BtWnE3QzR3TWpRMk9EbzhQZ0FDUkVaQ1FBQUFBQUFBQUFBQUFJQ0FnQUFBQUFBQVFBQUFBSUNUMmRuVXdBRWhnd0FBQUFBQUFBYlBRQUFBZ0FBQURlajFiOEx1YnU3K3ZMdGZxM0NBUUhVcGo0b3piejdVdmYwcmxCRk1rVDNyczlqWjdCL0hhNjBrYmVUNWR4L2pLSERyUHRoWGQxMHlQMmk1OSs3N1lkNzdZOC9LWlhLVS9wY2hmQnRMVkl0aDBoZXEyVVB5MkZadjFNNzM3eXN3bnJONWJCRW45KzZ1YnZKYTdTWUlZTXVKTGxOY2Fhb2NvTC9kK3doZk9zcXk1MWZyOVFOai9MMDRKVVM3cytleTJBbGxONHoxMWN6Y2RwYThwM09IMXZQc1p2ODM1eVlMdnllTHNVUjIrcnQrM2ExOHJOYmtXT09wL2VSZDVkanhaU1M3cTVUV2k3akxleXlqUkdMZXc2SGo4M1hyeUhYZFcvMDB0dm9KUkdpaDZlUDdBVy9SeGVnTEp6TDhtVWUyL1RSL3VuRGkzZG11ZHAyMHZuVDdoOGNtblEzRXFxMTJsVHJudDkydFE5ejJmSGkvY3ZEdlBaMGh0SzFyM3N2Ky9FUG5YcVVZQ2tSZEZTeU9IdXNQSzIxdFdEQVBhVlA1YTR0OUJNLzE4Nkxzbm92a2Y3eklaZFBYejRmUGxwdTdETGxsWG1WMlllMkd4N1hsZFB6L2NmOWNlRjVtYm5hbHR1bjdZcHcvd3NuVm5wQzZEWW1JcHNuYk8vYk5uc2ViaGQ3QVFEc0tKUDc3am1jdVBsVHZZVGdzbiswUnNwbnAwT29ObjArbU5tVTkzZmZNSFk3YWtMMDNMdjN4NTVPdmppMnVhekhibFpoZlZsSTZzK3NPNGRHZVY1cmF1bXdISTd1THg4cVlOZGVkODdweUhyZmR2VG5mblg0ZFQrSUQ5K25XRCt6QXBtNkgvdktrYnVlTGJqUVV2d2loS3FIV21wcGVmOWYvVjQ4KzFuTDYvWVhmT1pXL3d2ZHFLT21DMytkcjY2WXUxVnN2aVFPdnVPajA5ZDd6NjNUaVhLNitPUlQ0cTRVVjg3TDNYaWljYWxhUFhLTWJ5d1Z1NDBBMmthTENBQUFIRS90WStzdmp6MTIrbGRqUlNSMlA5ZGJWdGJRd3NTQXhabHlYNnVselM0STRiN0xvcUM2ZERYbGFZM3czN0dwNlhuOFNlWEg1ZXg1VXVpVTFXNjNsWTNiV2JYY1l5Zjl6cXZLZVd6NzgvVGZVWnY4MW12bDY2K2NhaDdvaVBlMW5ma2wvYmJDT2Z5MzIwL3RKRWtvKzlwaHhYYnBXNm43L21KbnRzdk5JLzR2dlprOGpBVGFlWXBYT0Q1QnZReGJyV3h6bTlENlJhWEVpQkVleHNtdHVXcTVRUXhsMDUyU3k5T3dPRjJGSjF6Mlc2SFpVSjhLWmFJdlN4TFRyanJ0bGJsRnFYVGovdXNYNkl3WGVkU1JUYjJPMjdtZUN2RjQrN0hnYjhkKzMxZkJwRTdUbmpyYWZNdFNiZjc2bDh2Z3F3RUFBSjdteWd3b0RRMVNOOWRreHcvNnNlUFpTMVdWcmhwdHpUL05GdTFxM3F6TVgxT3owNnRzVmdwVnovM1ZuL3ZKejB3K1ZIdlczYStDWnZSbngwekEyRU5DcjluenNsOStyNzM1d3ZQckEzOHBPQnFPQk8xNTlJU2ViWXptMVZJbDd0ZGRjc1UwY25RaWtNVFY1NHVoQ0hpKzlpZFBaUjFoZkxWdEVOTHdjbk1yaVB0RldOcG1JY3A2OS9lRVo5NU1jZlBpeHJsWjNZQTlWNVJjTWRkVGpjeURjSU5WL3o1alBWamJMb2VQQ3VOSi9tb0ZtMXpZcmFyM3NXM3NuenUwd1grS0twUlBXT1NEYmRTRVpWN0hFbmZlaG5FeHltTjk3U3RsdVM0LzlYM3plYjVncnpLNVc0U1ZCVGFzMXlnR0J3QUFOaGFMQk1BQkdCMHhCVjJPb20vdmo3M3dzWnRhbEtBb3UxUXY0S21zaXZPZk5hTWRGRzNmVmVYQUkxMFUxbTVuaE9hN1crZW5TMmxlcUx0TnNxSTBMTGJVWjVlbHFWdzB0ZUVLQmIydHVXS1RMQmZiVFY2ZnJuemgwZno2NWZlOWJ6NC9lWkFiUEdobUtzZC8zOGF5OC8xWkVkWitXUGNuVnV2U0ZRMGlqYUlpMTE5TnhwSk9VeG4yMTN5ak5JYUVkVEdkaGtMTGgzMjZNUHZGL3Z1YUlGM2plUVBlSm1WZTNqY3dldHV3KzdsZDczQlozUjB2L2RMVHA3dzZSMW5tYmJqNFE4MHk4K1RQbzhhZGJXeXU4a0FpbzdpNWJIMDU3WjhweHVtcFV0Z1crL3RPNS9CRytLRERMQUFBekNoVEwzUjA2ZkIweTArSkpvaHFwK1NpcDJEODVqR0pKYjZIWGdmZmc2OWpYRk5FbHRkVFBsekUxYm8vYnpkL3IrZVpzSG5sdEh4MXNjVFpuOGliVFVsRjdzdCtlU3B2M3h1OEd1OU1jb09vaU4xdTdzZlB6YkV1VG9mam5mNndWbFo5YXRYT2ViN1VmOUxjem0xZW45L3l5S0pDN0c4K2RUbHpuQVFBM0NSaHdSeDJoTTFublZVNTFZWitIdU5waTV5TzNibUd6Um96ZVdybi9ZNXlWZzliRkF2MnJuaDljTnlyVGtJMkQ2NVZ6T04xeWxpVGE5VnovZEs1MmVrSjYyYVlVaVF3OXBYY3pncEJ5N3phbkkwbENwYkdhL2I2cis3WnN2WHMwTDRlLzg4S3h1VzBTaTF6bFYwL1hVdEg5VzkxTS9LTXF6ZWNucFB0MGVKOUlYSCswclIxLzVmN2ZGMkxldnNwby9uZXY0ZUR0ZTJ1VG5MYUZ0bW5uWlJRY3psTGROcTVsbFFQQlFDa2l1am1vK25yYm84K0ZVODgyeTk4K2hBOWZWaFhIOSs3MEc3bmNlLy8rY0x4L2N2Vjc3LzN3cFB2WDY0K3ZyY0xxOSsvdkhCOEMrMys1UVhIYytMWmZ1SFRoK2lwRDI3aUh2MnlIM3Q2dWZyOWR4Y09FZ1RPUEdIUGswbU12SjdTWDdmWCt0WFAreE5Uejd0Vnh6NDBlOXBqRFYrODNIbWVLK1BOdFMydlNwK09tejJWeHNENytGejRldys2Uzhwbys5Wlp6Nmo3ZVgvZit6SmJ2dVE0dXA5NjFGY1dGYy9kWmRqenJxKzNuVis3dDc3ZDgzclJ0ZU5kL2VYYXVHMGtBQW9PXCIpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzQgLyp5aWVsZCovLCAoX2suc2VudCgpKS5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgX2guYXBwbHkoX2csIF9qLmNvbmNhdChbX2suc2VudCgpXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLkF1ZGlvLnJlZ2lzdGVyKFwibW9iLlwiICsgdGhpcy5lbnRpdHlJRCArIFwiLnN0ZXBcIiwgQXN5bmNTaW5rLkF1ZGlvLkNhdGVnb3J5LkFOSU1BTFMsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IFwic291bmRzL21vYi9cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIvc3RlcC5vZ2dcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpdGNoOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2x1bWU6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzogZmFsc2UsIC8vdXNlIGZvciBsYXJnZSBhdWRpbyBmaWxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5tYy5yZW5kZXJNYW5hZ2VyLmVudGl0eVJlbmRlck1hcC5wdXQoTW9kQVBJLnV0aWwuYXNDbGFzcyhkYXRhW1wiRW50aXR5XCIuY29uY2F0KHRoaXMuZW50aXR5SUQudG9VcHBlckNhc2UoKSldKSwgbmV3IGRhdGFbXCJSZW5kZXJcIi5jb25jYXQodGhpcy5lbnRpdHlJRC50b1VwcGVyQ2FzZSgpKV0oTW9kQVBJLm1jLnJlbmRlck1hbmFnZXIuZ2V0UmVmKCksIG5ldyBkYXRhW1wiTW9kZWxcIi5jb25jYXQodGhpcy5lbnRpdHlJRC50b1VwcGVyQ2FzZSgpKV0oKSwgMC4zKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkucHJvbWlzaWZ5KE1vZEFQSS5tYy5yZW5kZXJFbmdpbmUuYmluZFRleHR1cmUpKGRhdGFbXCJcIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCJUZXh0dXJlc1wiKV0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGVkIE9FbnRpdHkgdGV4dHVyZSBpbnRvIGNhY2hlLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTsgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB2YXIga2V5ID0gXCJPRW50aXR5LlwiLmNvbmNhdCh0aGlzLmVudGl0eUlEKTtcbiAgICAgICAgZ2xvYmFsVGhpc1trZXldID0gZGF0YTtcbiAgICB9O1xuICAgIE9FbnRpdHkucHJvdG90eXBlLmNyZWF0ZVNwYXduZWdnID0gZnVuY3Rpb24gKHRleHR1cmUpIHtcbiAgICAgICAgaWYgKCF0ZXh0dXJlKSB7XG4gICAgICAgICAgICB0ZXh0dXJlID0gXCJ0ZXh0dXJlcy9lbnRpdHkvXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiLnBuZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJTcGF3biBlZ2dzIGFyZSBidWlsdCBpbiFcIik7XG4gICAgICAgIHZhciBzcGF3bkVnZyA9IG5ldyBPSXRlbShcIlNwYXduIFwiLmNvbmNhdCh0aGlzLmVudGl0eU5hbWUpLCBcInNwYXduZWdnX1wiLmNvbmNhdCh0aGlzLmVudGl0eUlEKSwgNjQsIHRleHR1cmUsIGZ1bmN0aW9uICgpIHsgfSwgZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRibG9ja3Bvcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJCRibG9ja3Bvcyk7XG4gICAgICAgICAgICB2YXIgc3Bhd25feCA9ICQkYmxvY2twb3MuJHg7XG4gICAgICAgICAgICB2YXIgc3Bhd25feSA9ICQkYmxvY2twb3MuJHkgKyAxO1xuICAgICAgICAgICAgdmFyIHNwYXduX3ogPSAkJGJsb2NrcG9zLiR6O1xuICAgICAgICAgICAgT3Zlbk1ES19fZXhlY3V0ZUNvbW1hbmRBcygkJHBsYXllciwgXCIvc3VtbW9uIEV4YW1wbGVPRW50aXR5IFwiLmNvbmNhdChzcGF3bl94LCBcIiBcIikuY29uY2F0KHNwYXduX3ksIFwiIFwiKS5jb25jYXQoc3Bhd25feiksIHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3Bhd25FZ2cucmVnaXN0ZXJJdGVtKCk7XG4gICAgICAgIHJldHVybiBzcGF3bkVnZztcbiAgICB9O1xuICAgIHJldHVybiBPRW50aXR5O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE9FbnRpdHk7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuLypcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICBPSXRlbS50c1xuICAgIFxuICBDb3B5cmlnaHQgMjAyNSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG52YXIgT0l0ZW0gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT0l0ZW0oaXRlbU5hbWUsIGl0ZW1JRCwgaXRlbVN0YWNrLCB0ZXh0dXJlLCBvblJpZ2h0Q2xpY2ssIG9uSXRlbVVzZSkge1xuICAgICAgICB0aGlzLml0ZW1OYW1lID0gaXRlbU5hbWU7XG4gICAgICAgIHRoaXMuaXRlbUlEID0gaXRlbUlEO1xuICAgICAgICB0aGlzLml0ZW1TdGFjayA9IGl0ZW1TdGFjaztcbiAgICAgICAgdGhpcy5pdGVtVGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICAgIHRoaXMub25SaWdodENsaWNrID0gb25SaWdodENsaWNrO1xuICAgICAgICAvLyBBc3NpZ24gb3B0aW9uYWwgb25JdGVtVXNlIGlmIHByb3ZpZGVkXG4gICAgICAgIHRoaXMub25JdGVtVXNlID0gb25JdGVtVXNlO1xuICAgIH1cbiAgICBPSXRlbS5wcm90b3R5cGUucmVnaXN0ZXJDbGllbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciAkJGl0ZW1HZXRBdHRyaWJ1dGVzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIikubWV0aG9kcy5nZXRJdGVtQXR0cmlidXRlTW9kaWZpZXJzLm1ldGhvZDtcbiAgICAgICAgdmFyIGNyZWF0aXZlTWlzY1RhYjtcbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjcmVhdGl2ZU1pc2NUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMuTUlTQztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNyZWF0aXZlTWlzY1RhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy50YWJNaXNjO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICAgICAgdmFyIGl0ZW1TdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKGl0ZW1DbGFzcywgZnVuY3Rpb24gKGZuKSB7IHJldHVybiBmbi5sZW5ndGggPT09IDE7IH0pO1xuICAgICAgICB2YXIgaXRlbVN0YWNrID0gdGhpcy5pdGVtU3RhY2s7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gbm1pX092ZW5JdGVtKCkge1xuICAgICAgICAgICAgaXRlbVN1cGVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kc2V0Q3JlYXRpdmVUYWIoY3JlYXRpdmVNaXNjVGFiKTtcbiAgICAgICAgICAgIHRoaXMuJG1heFN0YWNrU2l6ZSA9IChpdGVtU3RhY2spO1xuICAgICAgICB9XG4gICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKGl0ZW1DbGFzcywgbm1pX092ZW5JdGVtKTtcbiAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtUmlnaHRDbGljayA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKVxuICAgICAgICAgICAgICAgICAgICAoJCRwbGF5ZXIpLiRzZXRJdGVtSW5Vc2UoJCRpdGVtc3RhY2ssIDMyKTtcbiAgICAgICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyO1xuICAgICAgICAgICAgICAgIHNlbGYub25SaWdodENsaWNrKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcik7XG4gICAgICAgICAgICAgICAgaWYgKGdsb2JhbFRoaXMuRGVidWdfbW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWVudCBpdGVtc3RhY2s6XCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAoJCRpdGVtc3RhY2spO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICA7XG4gICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgdmFyICQkUmVzdWx0RW51bSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiRW51bUFjdGlvblJlc3VsdFwiKS5zdGF0aWNWYXJpYWJsZXM7XG4gICAgICAgICAgICB2YXIgJCRBY3Rpb25SZXN1bHQgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkFjdGlvblJlc3VsdFwiKS5jb25zdHJ1Y3RvcnNbMF07XG4gICAgICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1SaWdodENsaWNrID0gZnVuY3Rpb24gKCQkd29ybGQsICQkcGxheWVyLCAkaGFuZEVudW0sICR1bnVzZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2sgPSAoJCRwbGF5ZXIpLiRnZXRIZWxkSXRlbSgkaGFuZEVudW0pO1xuICAgICAgICAgICAgICAgICgkJHBsYXllcikuJHNldEFjdGl2ZUhhbmQoJGhhbmRFbnVtKTtcbiAgICAgICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyO1xuICAgICAgICAgICAgICAgIHNlbGYub25SaWdodENsaWNrKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcik7XG4gICAgICAgICAgICAgICAgaWYgKGdsb2JhbFRoaXMuRGVidWdfbW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWVudCBpdGVtc3RhY2s6XCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAoJCRBY3Rpb25SZXN1bHQoJCRSZXN1bHRFbnVtLlNVQ0NFU1MsICQkaXRlbXN0YWNrKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVVzZTAgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkcGxheWVyLCAkJHdvcmxkLCAkJGJsb2NrcG9zKSB7XG4gICAgICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRibG9ja3BvcztcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vbkl0ZW1Vc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vbkl0ZW1Vc2UoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGJsb2NrcG9zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgIGlmIChnbG9iYWxUaGlzLkRlYnVnX21vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGllbnQgaXRlbXN0YWNrOlwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJCRpdGVtc3RhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgO1xuICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIHZhciAkJFJlc3VsdEVudW0gPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkVudW1BY3Rpb25SZXN1bHRcIikuc3RhdGljVmFyaWFibGVzO1xuICAgICAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtVXNlID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHBsYXllciwgJCR3b3JsZCwgJCRibG9ja3Bvcykge1xuICAgICAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCRwbGF5ZXIsICQkd29ybGQsICQkYmxvY2twb3M7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub25JdGVtVXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub25JdGVtVXNlKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRibG9ja3Bvcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICByZXR1cm4gJCRSZXN1bHRFbnVtLlBBU1M7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uVXBkYXRlID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRob3RiYXJfc2xvdCwgJCRpc19oZWxkKSB7XG4gICAgICAgICAgICAkJGlzX2hlbGQgPSAoJCRpc19oZWxkKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiAoJCRpdGVtc3RhY2spO1xuICAgICAgICB9O1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1Vc2VGaW5pc2ggPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kZ2V0TWF4SXRlbVVzZUR1cmF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIDMyO1xuICAgICAgICB9O1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRnZXRJdGVtQXR0cmlidXRlTW9kaWZpZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICQkYXR0cmlidXRlbWFwID0gJCRpdGVtR2V0QXR0cmlidXRlcy5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgICAgICByZXR1cm4gJCRhdHRyaWJ1dGVtYXA7XG4gICAgICAgIH07XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldFN0clZzQmxvY2sgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkYmxvY2spIHtcbiAgICAgICAgICAgIHJldHVybiAxLjA7XG4gICAgICAgIH07XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uQ3JlYXRlZCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25CbG9ja0Rlc3Ryb3llZCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRibG9jaywgJCRibG9ja3BvcywgJCRlbnRpdHkpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgaW50ZXJuYWxfcmVnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGl0ZW1JbnN0YW5jZSA9IG5ldyBubWlfT3Zlbkl0ZW0oKS4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihfdGhpcy5pdGVtSUQpKTtcbiAgICAgICAgICAgIGl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbS5tZXRob2QoTW9kQVBJLmtleWdlbi5pdGVtKF90aGlzLml0ZW1JRCksIE1vZEFQSS51dGlsLnN0cihfdGhpcy5pdGVtSUQpLCBpdGVtSW5zdGFuY2UpO1xuICAgICAgICAgICAgTW9kQVBJLml0ZW1zW1wiXCIuY29uY2F0KHNlbGYuaXRlbUlEKV0gPSBpdGVtSW5zdGFuY2U7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtSW5zdGFuY2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmVkIE92ZW5NREsgaXRlbSAoIGNsaWVudCBzaWRlIClcIik7XG4gICAgICAgICAgICByZXR1cm4gaXRlbUluc3RhbmNlO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoTW9kQVBJLml0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJuYWxfcmVnKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImJvb3RzdHJhcFwiLCBpbnRlcm5hbF9yZWcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPSXRlbS5wcm90b3R5cGUucmVnaXN0ZXJJdGVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiwgY3VzdG9tX2l0ZW07XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGN1c3RvbV9pdGVtID0gbmV3IE9JdGVtKHRoaXMuaXRlbU5hbWUsIHRoaXMuaXRlbUlELCB0aGlzLml0ZW1TdGFjaywgdGhpcy5pdGVtVGV4dHVyZSwgdGhpcy5vblJpZ2h0Q2xpY2ssIHRoaXMub25JdGVtVXNlKS5yZWdpc3RlckNsaWVudCgpO1xuICAgICAgICAgICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVySXRlbShcXFwiXCIuY29uY2F0KHRoaXMuaXRlbUlELCBcIlxcXCIsIFwiKS5jb25jYXQodGhpcy5pdGVtU3RhY2ssIFwiLCBcIikuY29uY2F0KHRoaXMub25SaWdodENsaWNrLCBcIiwgXCIpLmNvbmNhdCh0aGlzLm9uSXRlbVVzZSwgXCIpO1wiKSk7XG4gICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2lua1wiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBhcnJheUJ1ZmZlclRvU3RyaW5nKGJ1ZmZlciwgZW5jb2RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW5jb2RpbmcgPT09IHZvaWQgMCkgeyBlbmNvZGluZyA9ICd1dGYtOCc7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcihlbmNvZGluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZXIuZGVjb2RlKGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCByZXNwb25zZSwgYnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2MubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rOnJlZ2lzdGVyaXRlbXNcIiwgZnVuY3Rpb24gKHJlbmRlckl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvb2wgcmVnIGZvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLml0ZW1JRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVySXRlbS5yZWdpc3Rlckl0ZW0oY3VzdG9tX2l0ZW0sIE1vZEFQSS51dGlsLnN0cihzZWxmLml0ZW1JRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsVGhpcy5EZWJ1Z19tb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWdpc3RlcmluZyBcIi5jb25jYXQoc2VsZi5pdGVtSUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5MMTBOLnNldChcIml0ZW0uXCIuY29uY2F0KHNlbGYuaXRlbUlELCBcIi5uYW1lXCIpLCBzZWxmLml0ZW1OYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9tb2RlbHMvaXRlbS9cIi5jb25jYXQoc2VsZi5pdGVtSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmVudFwiOiBcImJ1aWx0aW4vZ2VuZXJhdGVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0dXJlc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGF5ZXIwXCI6IFwiaXRlbXMvXCIuY29uY2F0KHNlbGYuaXRlbUlEKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXNwbGF5XCI6IHsgXCJ0aGlyZHBlcnNvbl9yaWdodGhhbmRcIjogeyBcInJvdGF0aW9uXCI6IFswLCAtOTAsIDU1XSwgXCJ0cmFuc2xhdGlvblwiOiBbMCwgNCwgMC41XSwgXCJzY2FsZVwiOiBbMC44NSwgMC44NSwgMC44NV0gfSwgXCJ0aGlyZHBlcnNvbl9sZWZ0aGFuZFwiOiB7IFwicm90YXRpb25cIjogWzAsIDkwLCAtNTVdLCBcInRyYW5zbGF0aW9uXCI6IFswLCA0LCAwLjVdLCBcInNjYWxlXCI6IFswLjg1LCAwLjg1LCAwLjg1XSB9LCBcImZpcnN0cGVyc29uX3JpZ2h0aGFuZFwiOiB7IFwicm90YXRpb25cIjogWzAsIC05MCwgMjVdLCBcInRyYW5zbGF0aW9uXCI6IFsxLjEzLCAzLjIsIDEuMTNdLCBcInNjYWxlXCI6IFswLjY4LCAwLjY4LCAwLjY4XSB9LCBcImZpcnN0cGVyc29uX2xlZnRoYW5kXCI6IHsgXCJyb3RhdGlvblwiOiBbMCwgOTAsIC0yNV0sIFwidHJhbnNsYXRpb25cIjogWzEuMTMsIDMuMiwgMS4xM10sIFwic2NhbGVcIjogWzAuNjgsIDAuNjgsIDAuNjhdIH0gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IgPSAoX2EgPSBjb25zb2xlKS5sb2c7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCAoYXJyYXlCdWZmZXJUb1N0cmluZyhBc3luY1NpbmsuZ2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvbW9kZWxzL2l0ZW0vXCIuY29uY2F0KHNlbGYuaXRlbUlELCBcIi5qc29uXCIpKSkpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IuYXBwbHkoX2EsIFtfYy5zZW50KCldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHNlbGYuaXRlbVRleHR1cmUpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gX2Muc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L3RleHR1cmVzL2l0ZW1zL1wiLmNvbmNhdChzZWxmLml0ZW1JRCwgXCIucG5nXCIpLCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckl0ZW0oXFxcIlwiLmNvbmNhdCh0aGlzLml0ZW1JRCwgXCJcXFwiLCBcIikuY29uY2F0KHRoaXMuaXRlbVN0YWNrLCBcIiwgXCIpLmNvbmNhdCh0aGlzLm9uUmlnaHRDbGljaywgXCIsIFwiKS5jb25jYXQodGhpcy5vbkl0ZW1Vc2UsIFwiKTtcIikpO1xuICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBidWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3Npbms6cmVnaXN0ZXJpdGVtc1wiLCBmdW5jdGlvbiAocmVuZGVySXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckl0ZW0ucmVnaXN0ZXJJdGVtKGN1c3RvbV9pdGVtLCBNb2RBUEkudXRpbC5zdHIoc2VsZi5pdGVtSUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLkwxME4uc2V0KFwiaXRlbS5cIi5jb25jYXQoc2VsZi5pdGVtSUQsIFwiLm5hbWVcIiksIHNlbGYuaXRlbU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9pdGVtL1wiLmNvbmNhdChzZWxmLml0ZW1JRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyZW50XCI6IFwiYnVpbHRpbi9nZW5lcmF0ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHR1cmVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXllcjBcIjogXCJpdGVtcy9cIi5jb25jYXQoc2VsZi5pdGVtSUQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpc3BsYXlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRoaXJkcGVyc29uX3JpZ2h0aGFuZFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6IFswLCAtOTAsIDU1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRpb25cIjogWzAsIDQsIDAuNV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNjYWxlXCI6IFswLjg1LCAwLjg1LCAwLjg1XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRoaXJkcGVyc29uX2xlZnRoYW5kXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjogWzAsIDkwLCAtNTVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGlvblwiOiBbMCwgNCwgMC41XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2NhbGVcIjogWzAuODUsIDAuODUsIDAuODVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmlyc3RwZXJzb25fcmlnaHRoYW5kXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjogWzAsIC05MCwgMjVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGlvblwiOiBbMS4xMywgMy4yLCAxLjEzXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2NhbGVcIjogWzAuNjgsIDAuNjgsIDAuNjhdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmlyc3RwZXJzb25fbGVmdGhhbmRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOiBbMCwgOTAsIC0yNV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0aW9uXCI6IFsxLjEzLCAzLjIsIDEuMTNdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzY2FsZVwiOiBbMC42OCwgMC42OCwgMC42OF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHNlbGYuaXRlbVRleHR1cmUpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L3RleHR1cmVzL2l0ZW1zL1wiLmNvbmNhdChzZWxmLml0ZW1JRCwgXCIucG5nXCIpLCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBPSXRlbTtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBPSXRlbTtcbiIsImV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck92ZW5NREtSZWNpcGUocGF0dGVybiwgcmVzdWx0KSB7XG4gICAgZnVuY3Rpb24gJCRpbnRlcm5hbFJlZ2lzdGVyKCkge1xuICAgICAgICB2YXIgJCRPYmplY3RDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcImphdmEubGFuZy5PYmplY3RcIikuY2xhc3M7XG4gICAgICAgIHZhciAkJFRvQ2hhciA9IGZ1bmN0aW9uIChjaGFyKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9kQVBJLnJlZmxlY3RcbiAgICAgICAgICAgICAgICAuZ2V0Q2xhc3NCeUlkKFwiamF2YS5sYW5nLkNoYXJhY3RlclwiKVxuICAgICAgICAgICAgICAgIC5zdGF0aWNNZXRob2RzLnZhbHVlT2YubWV0aG9kKGNoYXIuY2hhckNvZGVBdCgwKSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBwYXJzZUVudHJ5ID0gZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICB2YXIgdHlwZTtcbiAgICAgICAgICAgIHZhciBpZCA9IGVudHJ5O1xuICAgICAgICAgICAgdmFyIG1ldGEgPSAwO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQFwiKSkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IGlkLnNwbGl0KFwiQFwiKTtcbiAgICAgICAgICAgICAgICBpZCA9IHBhcnRzWzBdO1xuICAgICAgICAgICAgICAgIG1ldGEgPSBwYXJzZUludChwYXJ0c1sxXSwgMTApIHx8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuc3RhcnRzV2l0aChcImJsb2NrL1wiKSkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgaWQgPSBpZC5yZXBsYWNlKFwiYmxvY2svXCIsIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaWQuc3RhcnRzV2l0aChcIml0ZW0vXCIpKSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiaXRlbVwiO1xuICAgICAgICAgICAgICAgIGlkID0gaWQucmVwbGFjZShcIml0ZW0vXCIsIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKE1vZEFQSS5ibG9ja3NbaWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKE1vZEFQSS5pdGVtc1tpZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFwiaXRlbVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBpdGVtL2Jsb2NrIGlkOiBcIi5jb25jYXQoZW50cnkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiB0eXBlLCBpZDogaWQsIG1ldGE6IG1ldGEgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHBhdHRlcm5FbnRyaWVzID0gcGF0dGVybi5zcGxpdChcIixcIik7XG4gICAgICAgIHZhciAkJHJlY2lwZUxlZ2VuZCA9IHt9O1xuICAgICAgICBwYXR0ZXJuRW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSwgaSkge1xuICAgICAgICAgICAgJCRyZWNpcGVMZWdlbmRbU3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpXSA9IHBhcnNlRW50cnkoZW50cnkpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyICQkcmVjaXBlUGF0dGVybiA9IFtcIkFCQ1wiLCBcIkRFRlwiLCBcIkdISVwiXTtcbiAgICAgICAgdmFyICQkaXRlbVN0YWNrRnJvbUJsb2NrV2l0aE1ldGEgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVN0YWNrXCIpLmNvbnN0cnVjdG9yc1syXTtcbiAgICAgICAgdmFyICQkaXRlbVN0YWNrRnJvbUl0ZW0gPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVN0YWNrXCIpLmNvbnN0cnVjdG9yc1s0XTtcbiAgICAgICAgdmFyICQkcmVjaXBlSW50ZXJuYWwgPSBbXTtcbiAgICAgICAgT2JqZWN0LmtleXMoJCRyZWNpcGVMZWdlbmQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgJCRyZWNpcGVJbnRlcm5hbC5wdXNoKCQkVG9DaGFyKGtleSkpO1xuICAgICAgICAgICAgdmFyIGluZyA9ICQkcmVjaXBlTGVnZW5kW2tleV07XG4gICAgICAgICAgICB2YXIgaW5ncmVkaWVudCA9IChpbmcudHlwZSA9PT0gXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgID8gJCRpdGVtU3RhY2tGcm9tQmxvY2tXaXRoTWV0YShNb2RBUEkuYmxvY2tzW2luZy5pZF0uZ2V0UmVmKCksIDEsIGluZy5tZXRhKVxuICAgICAgICAgICAgICAgIDogJCRpdGVtU3RhY2tGcm9tSXRlbShNb2RBUEkuaXRlbXNbaW5nLmlkXS5nZXRSZWYoKSwgMSwgaW5nLm1ldGEgfHwgMCk7XG4gICAgICAgICAgICAkJHJlY2lwZUludGVybmFsLnB1c2goaW5ncmVkaWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgJCRyZWNpcGVDb250ZW50cyA9ICQkcmVjaXBlUGF0dGVybi5tYXAoZnVuY3Rpb24gKHJvdykgeyByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKHJvdyk7IH0pO1xuICAgICAgICB2YXIgJCRyZWNpcGUgPSBNb2RBUEkudXRpbC5tYWtlQXJyYXkoJCRPYmplY3RDbGFzcywgJCRyZWNpcGVDb250ZW50cy5jb25jYXQoJCRyZWNpcGVJbnRlcm5hbCkpO1xuICAgICAgICAvLyBQYXJzZSByZXN1bHRcbiAgICAgICAgdmFyIHJlcyA9IHBhcnNlRW50cnkocmVzdWx0KTtcbiAgICAgICAgdmFyICQkcmVzdWx0SXRlbSA9IChyZXMudHlwZSA9PT0gXCJibG9ja1wiKVxuICAgICAgICAgICAgPyAkJGl0ZW1TdGFja0Zyb21CbG9ja1dpdGhNZXRhKE1vZEFQSS5ibG9ja3NbcmVzLmlkXS5nZXRSZWYoKSwgMSwgcmVzLm1ldGEpXG4gICAgICAgICAgICA6ICQkaXRlbVN0YWNrRnJvbUl0ZW0oTW9kQVBJLml0ZW1zW3Jlcy5pZF0uZ2V0UmVmKCksIDEsIHJlcy5tZXRhIHx8IDApO1xuICAgICAgICB2YXIgJCRjcmFmdGluZ01hbmFnZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uY3JhZnRpbmcuQ3JhZnRpbmdNYW5hZ2VyXCIpXG4gICAgICAgICAgICAuc3RhdGljTWV0aG9kcy5nZXRJbnN0YW5jZS5tZXRob2QoKTtcbiAgICAgICAgTW9kQVBJLmhvb2tzLm1ldGhvZHMubm1pY19DcmFmdGluZ01hbmFnZXJfYWRkUmVjaXBlKCQkY3JhZnRpbmdNYW5hZ2VyLCAkJHJlc3VsdEl0ZW0sICQkcmVjaXBlKTtcbiAgICB9XG4gICAgO1xuICAgIGlmIChNb2RBUEkuaXRlbXMpIHtcbiAgICAgICAgJCRpbnRlcm5hbFJlZ2lzdGVyKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImJvb3RzdHJhcFwiLCAkJGludGVybmFsUmVnaXN0ZXIpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBPUmVjaXBlKEEsIEIsIEMsIEQsIEUsIEYsIEcsIEgsIEksIHJlc3VsdEl0ZW0pIHtcbiAgICB2YXIgcGF0dGVyblN0cmluZyA9IFwiXCIuY29uY2F0KEEsIFwiLFwiKS5jb25jYXQoQiwgXCIsXCIpLmNvbmNhdChDLCBcIixcIikuY29uY2F0KEQsIFwiLFwiKS5jb25jYXQoRSwgXCIsXCIpLmNvbmNhdChGLCBcIixcIikuY29uY2F0KEcsIFwiLFwiKS5jb25jYXQoSCwgXCIsXCIpLmNvbmNhdChJKTtcbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT1JlY2lwZXMgZG8gbm90IHdvcmsgaW4gMS4xMi4yIHBsZWFzZSB1c2UgMS44IGZvciBPUmVjaXBlcyFcIik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoIU1vZEFQSS5zZXJ2ZXIpIHtcbiAgICAgICAgICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJPUmVjaXBlKFxcXCJcIi5jb25jYXQocGF0dGVyblN0cmluZywgXCJcXFwiLCBcXFwiXCIpLmNvbmNhdChyZXN1bHRJdGVtLCBcIlxcXCIpO1wiKSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2xvYmFsVGhpcy5yZWdpc3Rlck92ZW5NREtSZWNpcGUocGF0dGVyblN0cmluZywgcmVzdWx0SXRlbSk7XG4gICAgfVxuICAgIDtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck92ZW5NREtGdXJuYWNlUmVjaXBlKGlucHV0X2l0ZW0sIHJlc3VsdEl0ZW0sIGV4cGVyaWVuY2UpIHtcbiAgICBmdW5jdGlvbiAkJGludGVybmFsUmVnaXN0ZXIoKSB7XG4gICAgICAgIHZhciAkJGl0ZW1TdGFja0Zyb21CbG9ja1dpdGhNZXRhID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1TdGFja1wiKS5jb25zdHJ1Y3RvcnNbMl07XG4gICAgICAgIHZhciAkJGl0ZW1TdGFja0Zyb21JdGVtID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1TdGFja1wiKS5jb25zdHJ1Y3RvcnNbNF07XG4gICAgICAgIHZhciBwYXJzZUVudHJ5ID0gZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICB2YXIgdHlwZTtcbiAgICAgICAgICAgIHZhciBpZCA9IGVudHJ5O1xuICAgICAgICAgICAgdmFyIG1ldGEgPSAwO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQFwiKSkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IGlkLnNwbGl0KFwiQFwiKTtcbiAgICAgICAgICAgICAgICBpZCA9IHBhcnRzWzBdO1xuICAgICAgICAgICAgICAgIG1ldGEgPSBwYXJzZUludChwYXJ0c1sxXSwgMTApIHx8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuc3RhcnRzV2l0aChcImJsb2NrL1wiKSkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgaWQgPSBpZC5yZXBsYWNlKFwiYmxvY2svXCIsIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaWQuc3RhcnRzV2l0aChcIml0ZW0vXCIpKSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiaXRlbVwiO1xuICAgICAgICAgICAgICAgIGlkID0gaWQucmVwbGFjZShcIml0ZW0vXCIsIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKE1vZEFQSS5ibG9ja3NbaWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKE1vZEFQSS5pdGVtc1tpZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFwiaXRlbVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBpdGVtL2Jsb2NrIGlkOiBcIi5jb25jYXQoZW50cnkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiB0eXBlLCBpZDogaWQsIG1ldGE6IG1ldGEgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGlucHV0ID0gcGFyc2VFbnRyeShpbnB1dF9pdGVtKTtcbiAgICAgICAgdmFyIG91dHB1dCA9IHBhcnNlRW50cnkocmVzdWx0SXRlbSk7XG4gICAgICAgIHZhciAkJGlucHV0U3RhY2sgPSAoaW5wdXQudHlwZSA9PT0gXCJibG9ja1wiKVxuICAgICAgICAgICAgPyAkJGl0ZW1TdGFja0Zyb21CbG9ja1dpdGhNZXRhKE1vZEFQSS5ibG9ja3NbaW5wdXQuaWRdLmdldFJlZigpLCAxLCBpbnB1dC5tZXRhKVxuICAgICAgICAgICAgOiAkJGl0ZW1TdGFja0Zyb21JdGVtKE1vZEFQSS5pdGVtc1tpbnB1dC5pZF0uZ2V0UmVmKCksIDEsIGlucHV0Lm1ldGEgfHwgMCk7XG4gICAgICAgIHZhciAkJG91dHB1dFN0YWNrID0gKG91dHB1dC50eXBlID09PSBcImJsb2NrXCIpXG4gICAgICAgICAgICA/ICQkaXRlbVN0YWNrRnJvbUJsb2NrV2l0aE1ldGEoTW9kQVBJLmJsb2Nrc1tvdXRwdXQuaWRdLmdldFJlZigpLCAxLCBvdXRwdXQubWV0YSlcbiAgICAgICAgICAgIDogJCRpdGVtU3RhY2tGcm9tSXRlbShNb2RBUEkuaXRlbXNbb3V0cHV0LmlkXS5nZXRSZWYoKSwgMSwgb3V0cHV0Lm1ldGEgfHwgMCk7XG4gICAgICAgIHZhciAkJGZ1cm5hY2VSZWNpcGVzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLmNyYWZ0aW5nLkZ1cm5hY2VSZWNpcGVzXCIpXG4gICAgICAgICAgICAuc3RhdGljTWV0aG9kcy5pbnN0YW5jZS5tZXRob2QoKTtcbiAgICAgICAgTW9kQVBJLmhvb2tzLm1ldGhvZHMubm1pY19GdXJuYWNlUmVjaXBlc19hZGRTbWVsdGluZygkJGZ1cm5hY2VSZWNpcGVzLCAkJGlucHV0U3RhY2ssICQkb3V0cHV0U3RhY2ssIGV4cGVyaWVuY2UpO1xuICAgIH1cbiAgICBpZiAoTW9kQVBJLml0ZW1zKSB7XG4gICAgICAgICQkaW50ZXJuYWxSZWdpc3RlcigpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJib290c3RyYXBcIiwgJCRpbnRlcm5hbFJlZ2lzdGVyKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gT0Z1cm5hbmNlUmVjaXBlKGlucHV0X2l0ZW0sIHJlc3VsdEl0ZW0sIGV4cGVyaWVuY2UpIHtcbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT0Z1cm5hY2VSZWNpcGVzIGRvIG5vdCB3b3JrIGluIDEuMTIuMiBwbGVhc2UgdXNlIDEuOCBmb3IgT0Z1cm5hY2VSZWNpcGVzIVwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICghTW9kQVBJLnNlcnZlcikge1xuICAgICAgICAgICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlck9SZWNpcGUoXFxcIlwiLmNvbmNhdChpbnB1dF9pdGVtLCBcIlxcXCIsIFxcXCJcIikuY29uY2F0KHJlc3VsdEl0ZW0sIFwiXFxcIiwgXCIpLmNvbmNhdChleHBlcmllbmNlLCBcIik7XCIpKTtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxUaGlzLnJlZ2lzdGVyT3Zlbk1ES0Z1cm5hY2VSZWNpcGUoaW5wdXRfaXRlbSwgcmVzdWx0SXRlbSwgZXhwZXJpZW5jZSk7XG4gICAgfVxuICAgIDtcbn1cbiIsIi8qXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICAgIE92ZW4udHNcbiAgICBcbiAgICBDb3B5cmlnaHQgMjAyNSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICAgIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE92ZW5NREsuXG5cbiAgICBPdmVuTURLIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXJcbiAgICB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWVcbiAgICBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pXG4gICAgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICBPdmVuTURLIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWVxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1NcbiAgICBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYWxvbmdcbiAgICB3aXRoIE92ZW4gTURLLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbnZhciBPdmVuID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE92ZW4oKSB7XG4gICAgfVxuICAgIE92ZW4ucmVnaXN0ZXJNb2QgPSBmdW5jdGlvbiAobW9kQ2xhc3MpIHtcbiAgICAgICAgTW9kQVBJLm1ldGEudGl0bGUobW9kQ2xhc3MudGl0bGUpO1xuICAgICAgICBNb2RBUEkubWV0YS52ZXJzaW9uKG1vZENsYXNzLnZlcnNpb24pO1xuICAgICAgICBNb2RBUEkubWV0YS5kZXNjcmlwdGlvbihtb2RDbGFzcy5kZXNjcmlwdGlvbik7XG4gICAgICAgIE1vZEFQSS5tZXRhLmNyZWRpdHMobW9kQ2xhc3MuY3JlZGl0cyk7XG4gICAgICAgIE1vZEFQSS5tZXRhLmljb24obW9kQ2xhc3MuaWNvbik7XG4gICAgICAgIE1vZEFQSS5tZXRhLmNvbmZpZyhtb2RDbGFzcy5jb25maWcpO1xuICAgICAgICBnbG9iYWxUaGlzLkRlYnVnX21vZGUgPSBtb2RDbGFzcy5EZWJ1Z19tb2RlO1xuICAgICAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLkRlYnVnX21vZGUgPSBcIi5jb25jYXQobW9kQ2xhc3MuRGVidWdfbW9kZSwgXCI7XCIpKTtcbiAgICAgICAgbW9kQ2xhc3MuaW5pdCgpO1xuICAgICAgICB0aGlzLm1vZHMucHVzaChtb2RDbGFzcyk7XG4gICAgfTtcbiAgICBPdmVuLm1vZHMgPSBbXTtcbiAgICBPdmVuLnV0aWwgPSB7XG4gICAgICAgIG9nZ3RvQmFzZTY0c3RyaW5nOiBmdW5jdGlvbiAob2dnKSB7XG4gICAgICAgICAgICB2YXIgYmFzZTY0ID0gYnRvYShuZXcgVWludDhBcnJheShvZ2cuc3BsaXQoXCIsXCIpLm1hcChmdW5jdGlvbiAoeCkgeyByZXR1cm4gcGFyc2VJbnQoeCwgMTApOyB9KSkucmVkdWNlKGZ1bmN0aW9uIChkYXRhLCBieXRlKSB7IHJldHVybiBkYXRhICsgU3RyaW5nLmZyb21DaGFyQ29kZShieXRlKTsgfSwgXCJcIikpO1xuICAgICAgICAgICAgcmV0dXJuIGJhc2U2NDtcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiBPdmVuO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE92ZW47XG4iLCIvKlxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4gIE92ZW4gTW9kIERldmVsb3BtZW50IEtpdCAoT3Zlbk1ESykgUnVudGltZVxuICBEZXYga2l0IHVzZWQgZm9yIHNpbXBsaWZ5aW5nIEVhZ2xlckZvcmdlIG1vZCBkZXZlbG9wbWVudC5cbiAgICBcbiAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xudmFyIE92ZW5PcmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3Zlbk9yZShibG9ja0lELCB2ZWluU2l6ZSwgdmVpbkNvdW50LCBtaW5HZW5lcmF0aW9uSGVpZ2h0LCBtYXhHZW5lcmF0aW9uSGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuYmxvY2tJRCA9IGJsb2NrSUQ7XG4gICAgICAgIHRoaXMudmVpblNpemUgPSB2ZWluU2l6ZTtcbiAgICAgICAgdGhpcy52ZWluQ291bnQgPSB2ZWluQ291bnQ7XG4gICAgICAgIHRoaXMubWluR2VuZXJhdGlvbkhlaWdodCA9IG1pbkdlbmVyYXRpb25IZWlnaHQ7XG4gICAgICAgIHRoaXMubWF4R2VuZXJhdGlvbkhlaWdodCA9IG1heEdlbmVyYXRpb25IZWlnaHQ7XG4gICAgfVxuICAgIE92ZW5PcmUucHJvdG90eXBlLnJlZ2lzdGVyT3Zlbk9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3Rlck92ZW5PcmVTZXJ2ZXIoXFxcIlwiLmNvbmNhdCh0aGlzLmJsb2NrSUQsIFwiXFxcIixcIikuY29uY2F0KHRoaXMudmVpblNpemUsIFwiLFwiKS5jb25jYXQodGhpcy52ZWluQ291bnQsIFwiLFwiKS5jb25jYXQodGhpcy5taW5HZW5lcmF0aW9uSGVpZ2h0LCBcIixcIikuY29uY2F0KHRoaXMubWF4R2VuZXJhdGlvbkhlaWdodCwgXCIpO1wiKSk7XG4gICAgfTtcbiAgICByZXR1cm4gT3Zlbk9yZTtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBPdmVuT3JlO1xuIiwiLypcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4gICAgY29tbWFuZHMudHNcbiAgICBcbiAgICBDb3B5cmlnaHQgMjAyNSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICAgIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE92ZW5NREsuXG5cbiAgICBPdmVuTURLIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXJcbiAgICB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWVcbiAgICBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pXG4gICAgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICBPdmVuTURLIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWVxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1NcbiAgICBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYWxvbmdcbiAgICB3aXRoIE92ZW4gTURLLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbmV4cG9ydCBmdW5jdGlvbiBzaW1wbGVjb21tYW5kKHByZWZpeCwgbmFtZSwgb25FeGVjdXRlKSB7XG4gICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJzZW5kY2hhdG1lc3NhZ2VcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUubWVzc2FnZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoXCJcIi5jb25jYXQocHJlZml4KS5jb25jYXQobmFtZSkpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgIG9uRXhlY3V0ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qXG4gIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cbiAgT3ZlbiBNb2QgRGV2ZWxvcG1lbnQgS2l0IChPdmVuTURLKSBSdW50aW1lXG4gIERldiBraXQgdXNlZCBmb3Igc2ltcGxpZnlpbmcgRWFnbGVyRm9yZ2UgbW9kIGRldmVsb3BtZW50LlxuICAgIFxuICBDb3B5cmlnaHQgMjAyNSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5pbXBvcnQgaWNvbiBmcm9tIFwiQVNTRVRTL2RlZmF1bHRJY29uLnBuZ1wiO1xuTW9kQVBJLm1ldGEudGl0bGUoXCJPdmVuTURLIFJ1bnRpbWVcIik7XG5Nb2RBUEkubWV0YS52ZXJzaW9uKFwiQWxwaGEgdjAuM1wiKTtcbk1vZEFQSS5tZXRhLmRlc2NyaXB0aW9uKFwiVW5vZmZpY2lhbCBkZXYga2l0IHVzZWQgZm9yIHNpbXBsaWZ5aW5nIEVhZ2xlckZvcmdlIG1vZCBkZXZlbG9wbWVudC5cIik7XG5Nb2RBUEkubWV0YS5jcmVkaXRzKFwiQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcIik7XG5Nb2RBUEkubWV0YS5pY29uKGljb24pO1xuaW1wb3J0IHsgcmVnaXN0ZXJTZXJ2ZXJJdGVtLCByZWdpc3RlclNlcnZlckJsb2NrLCByZWdpc3RlckVudGl0eVNlcnZlciwgT3Zlbk1ES19fZGVmaW5lRXhlY0NtZEFzR2xvYmFsLCByZWdpc3Rlck92ZW5PcmVTZXJ2ZXIsIH0gZnJvbSBcImNsYXNzZXMvY29yZS9IZWxwZXJfZnVuY1wiO1xuaW1wb3J0IE9JdGVtIGZyb20gXCJjbGFzc2VzL2NvcmUvT0l0ZW1cIjtcbmltcG9ydCBPTW9kIGZyb20gXCJjbGFzc2VzL2NvcmUvTW9kXCI7XG5pbXBvcnQgT3ZlbiBmcm9tIFwiY2xhc3Nlcy9jb3JlL092ZW5cIjtcbmltcG9ydCBPQmxvY2sgZnJvbSBcImNsYXNzZXMvY29yZS9PQmxvY2tcIjtcbmltcG9ydCB7IHNpbXBsZWNvbW1hbmQgfSBmcm9tIFwiY2xhc3Nlcy9jb3JlL2NvbW1hbmRzXCI7XG5pbXBvcnQgT0VudGl0eSBmcm9tIFwiLi9jbGFzc2VzL2NvcmUvT0VudGl0eVwiO1xuaW1wb3J0IE92ZW5PcmUgZnJvbSBcImNsYXNzZXMvY29yZS9PdmVuT3JlXCI7XG5pbXBvcnQgeyBPUmVjaXBlLCByZWdpc3Rlck92ZW5NREtSZWNpcGUsIE9GdXJuYW5jZVJlY2lwZSwgcmVnaXN0ZXJPdmVuTURLRnVybmFjZVJlY2lwZSB9IGZyb20gXCJjbGFzc2VzL2NvcmUvT1JlY2lwZVwiO1xudmFyIGRldm1vZGUgPSB0cnVlO1xuTW9kQVBJLmV2ZW50cy5uZXdFdmVudChcImxpYjpPdmVuTURLOmxvYWRcIik7XG5Nb2RBUEkuZXZlbnRzLm5ld0V2ZW50KFwibGliOk92ZW5NREs6bG9hZGVkXCIpO1xuTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6T3Zlbk1ESzpsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhcIk92ZW5NREsgUnVudGltZSBpcyBsb2FkaW5nXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiTG9hZGluZyBPdmVuTURLIGdsb2JhbHNcIik7XG4gICAgZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckl0ZW0gPSByZWdpc3RlclNlcnZlckl0ZW07XG4gICAgZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckJsb2NrID0gcmVnaXN0ZXJTZXJ2ZXJCbG9jaztcbiAgICBnbG9iYWxUaGlzLnJlZ2lzdGVyRW50aXR5U2VydmVyID0gcmVnaXN0ZXJFbnRpdHlTZXJ2ZXI7XG4gICAgZ2xvYmFsVGhpcy5PSXRlbSA9IE9JdGVtO1xuICAgIGdsb2JhbFRoaXMuT01vZCA9IE9Nb2Q7XG4gICAgZ2xvYmFsVGhpcy5PdmVuTURLID0gT3ZlbjtcbiAgICBnbG9iYWxUaGlzLk9CbG9jayA9IE9CbG9jaztcbiAgICBnbG9iYWxUaGlzLnNpbXBsZWNvbW1hbmQgPSBzaW1wbGVjb21tYW5kO1xuICAgIGdsb2JhbFRoaXMuT3Zlbk9yZSA9IE92ZW5PcmU7XG4gICAgZ2xvYmFsVGhpcy5yZWdpc3Rlck92ZW5PcmVTZXJ2ZXIgPSByZWdpc3Rlck92ZW5PcmVTZXJ2ZXI7XG4gICAgZ2xvYmFsVGhpcy5PRW50aXR5ID0gT0VudGl0eTtcbiAgICBnbG9iYWxUaGlzLk9SZWNpcGUgPSBPUmVjaXBlO1xuICAgIGdsb2JhbFRoaXMucmVnaXN0ZXJPdmVuTURLUmVjaXBlID0gcmVnaXN0ZXJPdmVuTURLUmVjaXBlO1xuICAgIGdsb2JhbFRoaXMuT0Z1cm5hbmNlUmVjaXBlID0gT0Z1cm5hbmNlUmVjaXBlO1xuICAgIGdsb2JhbFRoaXMucmVnaXN0ZXJPdmVuTURLRnVybmFjZVJlY2lwZSA9IHJlZ2lzdGVyT3Zlbk1ES0Z1cm5hY2VSZWNpcGU7XG4gICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIGlmICghZGV2bW9kZSkge1xuICAgICAgICAgICAgYWxlcnQoXCJPdmVuTURLIGRvZXMgbm90IGZ1bGx5IHN1cHBvcnQgMS4xMiBhdCB0aGlzIHRpbWUsIHBsZWFzZSB1c2UgMS44LjggZm9yIGZ1bGwgc3VwcG9ydFwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiMS4xMiBkZXRlY3RlZFwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJPdmVuTURLIGRvZXMgbm90IGZ1bGx5IHN1cHBvcnQgMS4xMiBhdCB0aGlzIHRpbWUsIHBsZWFzZSB1c2UgMS44LjggZm9yIGZ1bGwgc3VwcG9ydFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIk92ZW5NREsgZ2xvYmFscyBoYXZlIGJlZW4gc2V0IGFuZCBsb2FkZWRcIik7XG4gICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckl0ZW0gPSBcIi5jb25jYXQocmVnaXN0ZXJTZXJ2ZXJJdGVtLCBcIjtcIikpO1xuICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXIgSXRlbSBzZXJ2ZXJzaWRlIGZ1bmN0aW9uIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyT3Zlbk9yZVNlcnZlciA9IFwiLmNvbmNhdChyZWdpc3Rlck92ZW5PcmVTZXJ2ZXIsIFwiO1wiKSk7XG4gICAgY29uc29sZS5sb2coXCJSZWdpc3RlciBPdmVuIE9yZSBzZXJ2ZXJzaWRlIGZ1bmN0aW9uIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVyT1JlY2lwZSA9IFwiLmNvbmNhdChyZWdpc3Rlck92ZW5NREtSZWNpcGUsIFwiO1wiKSk7XG4gICAgY29uc29sZS5sb2coXCJSZWdpc3RlciBPUmVjaXBlIHNlcnZlcnNpZGUgZnVuY3Rpb24gbG9hZGVkXCIpO1xuICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJPRnVybmFuY2VSZWNpcGUgPSBcIi5jb25jYXQocmVnaXN0ZXJPdmVuTURLRnVybmFjZVJlY2lwZSwgXCI7XCIpKTtcbiAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyIE9GdXJuYW5jZVJlY2lwZSBzZXJ2ZXJzaWRlIGZ1bmN0aW9uIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoT3Zlbk1ES19fZGVmaW5lRXhlY0NtZEFzR2xvYmFsKTtcbiAgICBPdmVuTURLX19kZWZpbmVFeGVjQ21kQXNHbG9iYWwoKTtcbiAgICBjb25zb2xlLmxvZyhcIk92ZW5NREtfX0V4ZWNDbWRBc0dsb2JhbCBzZXJ2ZXJzaWRlIGFuZCBjbGllbnRzaWRlIGZ1bmN0aW9uIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVyQmxvY2sgPSBcIi5jb25jYXQocmVnaXN0ZXJTZXJ2ZXJCbG9jaywgXCI7XCIpKTtcbiAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyIEVudGl0eSBzZXJ2ZXJzaWRlIGZ1bmN0aW9uIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyRW50aXR5U2VydmVyID0gXCIuY29uY2F0KHJlZ2lzdGVyRW50aXR5U2VydmVyLCBcIjtcIikpO1xuICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXIgQmxvY2sgc2VydmVyc2lkZSBmdW5jdGlvbiBsb2FkZWRcIik7XG4gICAgTW9kQVBJLmV2ZW50cy5jYWxsRXZlbnQoXCJsaWI6T3Zlbk1ESzpsb2FkZWRcIiwgeyB2ZXJzaW9uOiBcInYwLjRcIiB9KTtcbn0pO1xuTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6T3Zlbk1ESzpsb2FkZWRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coXCJPdmVuTURLIFJ1bnRpbWUgaGFzIGZpbmlzaGVkIGxvYWRpbmdcIik7XG4gICAgY29uc29sZS5sb2coXCJcXG4gICAgXFx1MjUwQ1xcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUxMFxcbiAgICBcXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICBPdmVuTURLIGhhcyBsb2FkZWQgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgd2VsY29tZSB0byBvdmVuTURLICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgIEEgbW9kIGRldiBraXQgZm9yIHN0YXJ0ZXJzICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICBWZXJzaW9uOiBcIi5jb25jYXQoZXZlbnQudmVyc2lvbiwgXCIgICAgICAgICAgICAgICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MTRcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MThcXG4gICAgXCIpKTtcbiAgICBzaW1wbGVjb21tYW5kKFwiL292ZW5tZGtcIiwgXCIgbG9nXzFcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBNb2RBUEkuZGlzcGxheVRvQ2hhdChcIlxcbiAgICAgIE92ZW5NREsgUnVudGltZSB2MC4xXFxuICAgICAgTWFkZSBieSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxcbiAgICAgIC0gQWRkZWQgYmFzaWMgY29yZSBjbGFzc2VzXFxuICAgICAgKCBOb3QgbXVjaCBjYW4gYmUgZG9jdW1lbnRlZCBkdWUgdG8gc28gbGl0dGxlIGJlaW5nIGFkZGVkIClcIik7XG4gICAgfSk7XG4gICAgc2ltcGxlY29tbWFuZChcIi9vdmVubWRrXCIsIFwiIGxvZ18yXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgTW9kQVBJLmRpc3BsYXlUb0NoYXQoXCJcXG4gICAgICBPdmVuTURLIFJ1bnRpbWUgdjAuMlxcbiAgICAgIE1hZGUgYnkgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcXG4gICAgICAtIEFkZGVkIHN1cHBvcnQgZm9yIDEuMTJcXG4gICAgICAtIEFkZGVkIHN1cHBvcnQgZm9yIE92ZW5PcmVcXG4gICAgICAtIEFkZGVkIHN1cHBvcnQgZm9yIE9FbnRpdHlcXG4gICAgICAtIFFPTCBpbXByb3ZlbWVudHNcXG4gICAgICAtIEFkZGVkIHN1cHBvcnQgZm9yIE92ZW5NREtfX0V4ZWNDbWRBc0dsb2JhbFxcbiAgICAgIC0gQWRkZWQgc3VwcG9ydCBmb3IgT3Zlbk1ES19fZGVmaW5lRXhlY0NtZEFzR2xvYmFsXFxuICAgICAgLSBBZGRlZCBzdXBwb3J0IGZvciBzaW1wbGVjb21tYW5kc1wiKTtcbiAgICB9KTtcbiAgICBzaW1wbGVjb21tYW5kKFwiL292ZW5tZGtcIiwgXCIgbG9nXzNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBNb2RBUEkuZGlzcGxheVRvQ2hhdChcIlxcbiAgICAgIE92ZW5NREsgUnVudGltZSB2MC4zXFxuICAgICAgTWFkZSBieSBCZW5kaWVHYW1lc1xcbiAgICAgIC0gQWRkZWQgbW9yZSBPRW50aXR5IGN1c3RvbWl6YXRpb25cXG4gICAgICAgIC0gQWRkZWQgbW9yZSBzdXBwb3J0IGZvciBNb2RlbCBoaXRib2V4ZXNcXG4gICAgICAgIC0gQWRkZWQgY3VzdG9tIGVudGl0eSBzb3VuZCBzdXBwb3J0XFxuICAgICAgICAtIEFkZGVkIGN1c3RvbSBjcmFmdGluZyByZWNpcGVzIGhvd2V2ZXIgdGhleSBhcmUgbm90IGZpbmlzaGVkIHlldCAoIEJyb2tlbiBpbiAxLjEyKVxcbiAgICAgICAgLSBBdHRlbXB0ZWQgdG8gZml4IGl0ZW1zIHRleHR1cmVzIG9uIDEuMTIgd2l0aCBubyBzdWNjZXNzXCIpO1xuICAgIH0pO1xufSk7XG5Nb2RBUEkuYWRkQ3JlZGl0KFwiT3Zlbk1ESyBSdW50aW1lXCIsIFwiQmVuZGllR2FtZXNcIiwgXCIgLSBNYWRlIE92ZW5NREtcXG4gLSBDb2RlZCBtb3N0IG9mIE92ZW5NREtcIik7XG5Nb2RBUEkuYWRkQ3JlZGl0KFwiT3Zlbk1ESyBSdW50aW1lXCIsIFwiQmxvY2tfMjIyMlwiLCBcIiAtIEZvdW5kZWQgT3Zlbk1ES1wiKTtcbk1vZEFQSS5ldmVudHMuY2FsbEV2ZW50KFwibGliOk92ZW5NREs6bG9hZFwiLCB7fSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=