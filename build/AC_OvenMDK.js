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
function registerServerBlock(blockID, onBreak, droppedItem) {
    var BlockClass = ModAPI.reflect.getClassById("net.minecraft.block.Block");
    var ItemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
    var getDroppedItem = BlockClass.methods.getItemDropped.method;
    var quantityDropped = BlockClass.methods.quantityDropped.method;
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
    if (droppedItem) {
        nmb_Oblock.prototype.$getItemDropped = function ($$blockstate, $$random, __efb2_arg_forture) {
            var __efb2_arg_forture;
            return ModAPI.items[droppedItem].getRef();
        };
    }
    var $$onBlockDestroyedByPlayerMethod = BlockClass.methods.onBlockDestroyedByPlayer.method;
    nmb_Oblock.prototype.$onBlockDestroyedByPlayer = function ($$world, $$blockpos, $$blockstate) {
        var $$world, $$blockpos, $$blockstate;
        onBreak.call($$world, $$blockpos, $$blockstate);
        return $$onBlockDestroyedByPlayerMethod(this, $$world, $$blockpos, $$blockstate);
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
            if (droppedItem) {
                if (ModAPI.items[droppedItem]) {
                    return internalRegister();
                }
                else {
                    ModAPI.addEventListener("bootstrap", internalRegister);
                }
            }
            else {
                return internalRegister();
            }
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
            $this["$OvenMDK__".concat(block_ID, "_BlockGen")] = WorldGenMineable(ModAPI.blocks["".concat(block_ID)].getStateFromMeta(0).getRef(), vienSize);
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
        $this.$genStandardOre1(vienCount, $this["$OvenMDK__".concat(block_ID, "_BlockGen")] || null, minGenerationHeight, maxGenerationHeight);
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
    function OBlock(blockName, blockID, texture, onBreak, droppedItem, customModel) {
        this.blockName = blockName;
        this.blockID = blockID;
        this.blockTexture = texture;
        this.onBreak = onBreak;
        this.droppedItem = droppedItem;
        this.customModel = customModel;
    }
    OBlock.prototype.register = function () {
        var _this = this;
        var BlockClass = ModAPI.reflect.getClassById("net.minecraft.block.Block");
        var ItemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var getDroppedItem = BlockClass.methods.getItemDropped.method;
        var quantityDropped = BlockClass.methods.quantityDropped.method;
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
        if (self.droppedItem) {
            nmb_Oblock.prototype.$getItemDropped = function ($$blockstate, $$random, __efb2_arg_forture) {
                var __efb2_arg_forture;
                return ModAPI.items[self.droppedItem].getRef();
            };
        }
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
            new globalThis.OvenMDKLogger("Registered block on client: " + _this.blockID);
            new globalThis.OvenMDKLogger(custom_block);
            return custom_block;
        };
        if (!ModAPI.is_1_12) {
            if (ModAPI.materials) {
                if (this.droppedItem) {
                    if (ModAPI.items[this.droppedItem]) {
                        return internalRegister();
                    }
                    else {
                        ModAPI.addEventListener("bootstrap", internalRegister);
                    }
                }
                else {
                    return internalRegister();
                }
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
                    custom_block = new OBlock(this.blockName, this.blockID, this.blockTexture, this.onBreak, this.droppedItem, this.customModel).register();
                }
                if (ModAPI.is_1_12) {
                    nmb_OBlock = new OBlock(this.blockName, this.blockID, this.blockTexture, this.onBreak, this.droppedItem, this.customModel).register();
                    itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
                    blockClass = ModAPI.reflect.getClassById("net.minecraft.block.Block");
                    custom_block = nmb_OBlock;
                    blockClass.staticMethods.registerBlock0.method(ModAPI.keygen.block(this.blockID), ModAPI.util.str(this.blockID), custom_block);
                    itemClass.staticMethods.registerItemBlock0.method(custom_block);
                    new globalThis.OvenMDKLogger(custom_block || "Block registration failed");
                }
                self = this;
                if (!ModAPI.is_1_12) {
                    ModAPI.dedicatedServer.appendCode("globalThis.registerServerBlock(\"".concat(this.blockID, "\", ").concat(this.onBreak, ", \"").concat(this.droppedItem, "\");"));
                    ModAPI.addEventListener("lib:asyncsink", function () { return __awaiter(_this, void 0, void 0, function () {
                        var response, buffer;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    ModAPI.addEventListener("lib:asyncsink:registeritems", function (renderItem) {
                                        renderItem.registerBlock(custom_block, ModAPI.util.str(self.blockID));
                                    });
                                    AsyncSink.L10N.set("tile.".concat(self.blockID, ".name"), self.blockName);
                                    new globalThis.OvenMDKLogger("Set localization for block ".concat(self.blockID));
                                    if (!self.customModel) {
                                        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/block/".concat(self.blockID, ".json"), JSON.stringify({
                                            parent: "block/cube_all",
                                            textures: {
                                                all: "blocks/".concat(self.blockID),
                                            },
                                        }));
                                    }
                                    else {
                                        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/block/".concat(self.blockID, ".json"), self.customModel);
                                    }
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
                                        new globalThis.OvenMDKLogger("cool register block");
                                        new globalThis.OvenMDKLogger(custom_block || "Block registration failed");
                                        renderItem.registerBlock(custom_block, ModAPI.util.str(_this.blockID));
                                    });
                                    AsyncSink.L10N.set("tile." + this.blockID + ".name", this.blockName);
                                    new globalThis.OvenMDKLogger("Set localization for block ".concat(self.blockID));
                                    new globalThis.OvenMDKLogger(custom_block || "Block registration failed");
                                    if (!self.customModel) {
                                        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/block/".concat(self.blockID, ".json"), JSON.stringify({
                                            "parent": "block/cube_all",
                                            "textures": {
                                                "all": "blocks/".concat(self.blockID)
                                            }
                                        }));
                                    }
                                    else {
                                        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/block/".concat(self.blockID, ".json"), self.customModel);
                                    }
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
    function OEntity(entityName, entityID) {
        this.maxHealth = 0;
        this.breedable = false;
        this.entityName = entityName;
        this.entityID = entityID;
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
    OEntity.prototype.setTexture = function (texture) {
        this.entityTexture = texture;
    };
    OEntity.prototype.setModel = function (model) {
        this.entityModel = model;
    };
    OEntity.prototype.createSpawnEgg = function (eggBase, eggSpots) {
        new globalThis.OvenMDKLogger();
    };
    OEntity.prototype.makeBreedable = function (item, delay) {
        this.breedable = true;
        this.entityBreedItem = item;
    };
    // we need to add loot tables, and this will be changed next commit
    OEntity.prototype.addDropItem = function (item, min, max) {
        this.entityDropItem = item;
    };
    OEntity.prototype.setHealth = function (health) {
        this.maxHealth = health;
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
            new globalThis.OvenMDKLogger(nme_OEntity);
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
                            new globalThis.OvenMDKLogger("Loaded OEntity texture into cache.");
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        new globalThis.OvenMDKLogger(data);
        var key = "OEntity.".concat(this.entityID);
        globalThis[key] = data;
    };
    OEntity.prototype.createSpawnegg = function (base, spots) {
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
    function OItem(itemName, itemID, itemStack, texture, onRightClick, onItemUse, customModel) {
        this.itemName = itemName;
        this.itemID = itemID;
        this.itemStack = itemStack;
        this.itemTexture = texture;
        this.onRightClick = onRightClick;
        this.customModel = customModel;
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
                    new globalThis.OvenMDKLogger("client itemstack:");
                    new globalThis.OvenMDKLogger($$itemstack);
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
                    new globalThis.OvenMDKLogger("client itemstack:");
                    new globalThis.OvenMDKLogger($$itemstack);
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
                    new globalThis.OvenMDKLogger("client itemstack:");
                    new globalThis.OvenMDKLogger($$itemstack);
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
            new globalThis.OvenMDKLogger(itemInstance);
            new globalThis.OvenMDKLogger("Registered OvenMDK item ( client side )");
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
                custom_item = new OItem(this.itemName, this.itemID, this.itemStack, this.itemTexture, this.onRightClick, this.onItemUse, this.customModel).registerClient();
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
                                        new globalThis.OvenMDKLogger("cool reg for");
                                        new globalThis.OvenMDKLogger(self.itemID);
                                        renderItem.registerItem(custom_item, ModAPI.util.str(self.itemID));
                                    });
                                    if (globalThis.Debug_mode) {
                                        new globalThis.OvenMDKLogger("registering ".concat(self.itemID));
                                    }
                                    AsyncSink.L10N.set("item.".concat(self.itemID, ".name"), self.itemName);
                                    if (!self.customModel) {
                                        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/".concat(self.itemID, ".json"), JSON.stringify({
                                            "parent": "builtin/generated",
                                            "textures": {
                                                "layer0": "items/".concat(self.itemID)
                                            },
                                            "display": { "thirdperson_righthand": { "rotation": [0, -90, 55], "translation": [0, 4, 0.5], "scale": [0.85, 0.85, 0.85] }, "thirdperson_lefthand": { "rotation": [0, 90, -55], "translation": [0, 4, 0.5], "scale": [0.85, 0.85, 0.85] }, "firstperson_righthand": { "rotation": [0, -90, 25], "translation": [1.13, 3.2, 1.13], "scale": [0.68, 0.68, 0.68] }, "firstperson_lefthand": { "rotation": [0, 90, -25], "translation": [1.13, 3.2, 1.13], "scale": [0.68, 0.68, 0.68] } }
                                        }));
                                    }
                                    else {
                                        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/".concat(self.itemID, ".json"), self.customModel);
                                    }
                                    _b = (_a = globalThis.OvenMDKLogger).bind;
                                    return [4 /*yield*/, (arrayBufferToString(AsyncSink.getFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/".concat(self.itemID, ".json"))))];
                                case 1:
                                    new (_b.apply(_a, [void 0, _c.sent()]))();
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
                                    if (!self.customModel) {
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
                                    }
                                    else {
                                        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/".concat(self.itemID, ".json"), self.customModel);
                                    }
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
        if (ModAPI.is_1_12) {
            var CraftingManager = ModAPI.reflect.getClassByName("CraftingManager");
            var CraftingManagerMethods = CraftingManager.staticMethods;
            var JSONObject = ModAPI.reflect.getClassByName("JSONObject");
            var parseJson = JSONObject.constructors.findLast(function (x) { return x.length === 1; });
            // Convert pattern to 3 lines of 3 characters (rows of crafting grid)
            var rowPatterns = [
                "ABC", "DEF", "GHI"
            ];
            var jsonKey = {};
            for (var i = 0; i < 9; i++) {
                var key = String.fromCharCode(65 + i); // 'A' to 'I'
                var entry = pattern[i];
                if (!entry || entry === "")
                    continue;
                var id = entry;
                var meta = 0;
                if (id.includes("@")) {
                    var parts = id.split("@");
                    id = parts[0];
                    meta = parseInt(parts[1]) || 0;
                }
                jsonKey[key] = {
                    item: id.includes(":") ? id : "minecraft:".concat(id),
                    data: meta
                };
            }
            var resultId = result;
            var resultMeta = 0;
            var resultCount = 1;
            if (result.includes("*")) {
                var parts = result.split("*");
                resultId = parts[0];
                resultCount = parseInt(parts[1]) || 1;
            }
            if (resultId.includes("@")) {
                var parts = resultId.split("@");
                resultId = parts[0];
                resultMeta = parseInt(parts[1]) || 0;
            }
            var recipeJson = {
                type: "crafting_shaped",
                pattern: rowPatterns,
                key: jsonKey,
                result: {
                    item: resultId.includes(":") ? resultId : "minecraft:".concat(resultId),
                    data: resultMeta,
                    count: resultCount
                }
            };
            var jsonData = parseJson(ModAPI.util.str(JSON.stringify(recipeJson)));
            var recipeObj = CraftingManagerMethods.func_193376_a.method(jsonData);
            CraftingManagerMethods.func_193379_a.method(ModAPI.util.str("custom_recipe_".concat(Date.now())), recipeObj);
        }
        else {
            var $$ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;
            var $$ToChar_1 = function (char) {
                return ModAPI.reflect
                    .getClassById("java.lang.Character")
                    .staticMethods.valueOf.method(char.charCodeAt(0));
            };
            var parseEntry_1 = function (entry) {
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
                    else if (id === "") {
                        type = "air";
                    }
                    else {
                        throw new Error("Unknown item/block id: ".concat(entry));
                    }
                }
                return { type: type, id: id, meta: meta };
            };
            var patternEntries = pattern.split(",");
            var $$recipeLegend_1 = {};
            patternEntries.forEach(function (entry, i) {
                $$recipeLegend_1[String.fromCharCode(65 + i)] = parseEntry_1(entry);
            });
            var $$recipePattern = ["ABC", "DEF", "GHI"];
            var $$itemStackFromBlockWithMeta_1 = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[2];
            var $$itemStackFromItem_1 = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[4];
            var $$recipeInternal_1 = [];
            Object.keys($$recipeLegend_1).forEach(function (key) {
                $$recipeInternal_1.push($$ToChar_1(key));
                var ing = $$recipeLegend_1[key];
                var ingredient;
                if (ing.type === "air") {
                    ingredient = "";
                }
                else if (ing.type === "block") {
                    $$itemStackFromBlockWithMeta_1(ModAPI.blocks[ing.id].getRef(), 1, ing.meta);
                }
                else if (ing.type === "item") {
                    $$itemStackFromItem_1(ModAPI.items[ing.id].getRef(), 1, ing.meta || 0);
                }
                $$recipeInternal_1.push(ingredient);
            });
            var $$recipeContents = $$recipePattern.map(function (row) { return ModAPI.util.str(row); });
            var $$recipe = ModAPI.util.makeArray($$ObjectClass, $$recipeContents.concat($$recipeInternal_1));
            // Parse result
            var res = parseEntry_1(result);
            var $$resultItem = (res.type === "block")
                ? $$itemStackFromBlockWithMeta_1(ModAPI.blocks[res.id].getRef(), 1, res.meta)
                : $$itemStackFromItem_1(ModAPI.items[res.id].getRef(), 1, res.meta || 0);
            var $$craftingManager = ModAPI.reflect.getClassById("net.minecraft.item.crafting.CraftingManager")
                .staticMethods.getInstance.method();
            ModAPI.hooks.methods.nmic_CraftingManager_addRecipe($$craftingManager, $$resultItem, $$recipe);
        }
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
    if (!ModAPI.server) {
        ModAPI.dedicatedServer.appendCode("globalThis.registerServerORecipe(\"".concat(patternString, "\", \"").concat(resultItem, "\");"));
    }
    globalThis.registerOvenMDKRecipe(patternString, resultItem);
}
function registerOvenMDKFurnaceRecipe(input_item, resultItem, experience) {
    function $$internalRegister() {
        var ItemStackCtorFromBlock = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[1];
        var ItemStackCtorFromItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[4];
        var FurnaceRecipesInstance = ModAPI.util.wrap(ModAPI.reflect.getClassByName("FurnaceRecipes").staticVariables.smeltingBase);
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
        var $$outputStack = output.type === "block"
            ? ItemStackCtorFromBlock(ModAPI.blocks[output.id].getRef(), 1)
            : ItemStackCtorFromItem(ModAPI.items[output.id].getRef(), 1);
        if (input.type === "block") {
            FurnaceRecipesInstance.addSmeltingRecipeForBlock(ModAPI.blocks[input.id].getRef(), $$outputStack, experience);
        }
        else {
            FurnaceRecipesInstance.addSmelting(ModAPI.items[input.id].getRef(), $$outputStack, experience);
        }
    }
    if (ModAPI.items && ModAPI.blocks) {
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
        ModAPI.dedicatedServer.appendCode("globalThis.registerServerOFurnanceRecipe(\"".concat(input_item, "\", \"").concat(resultItem, "\", ").concat(experience, ");"));
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


/***/ }),

/***/ "./src/classes/core/log.ts":
/*!*********************************!*\
  !*** ./src/classes/core/log.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function defaultTime() {
    var now = new Date();
    var pad = function (n, len) {
        if (len === void 0) { len = 2; }
        return String(n).padStart(len, '0');
    };
    return "".concat(pad(now.getHours()), ":").concat(pad(now.getMinutes()), ":").concat(pad(now.getSeconds()), "+").concat(pad(now.getMilliseconds(), 3));
}
var OvenMDKLogger = /** @class */ (function () {
    function OvenMDKLogger(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.appName, appName = _c === void 0 ? 'OvenMDK' : _c, _d = _b.getTime, getTime = _d === void 0 ? defaultTime : _d;
        this.baseStyle = 'font-weight: bold; border-radius: 4px; padding: 0 8px; font-size: 12px';
        this.levelIcons = {
            log: '📘',
            info: 'ℹ️',
            warn: '⚠️',
            error: '❌',
        };
        this.tagStyles = {
            log: "background: #D6EAFF; color: #003F66; ".concat(this.baseStyle),
            info: "background: #94CCFF; color: #1A237E; ".concat(this.baseStyle),
            warn: "background: #FFF9B0; color: #8A6D00; ".concat(this.baseStyle),
            error: "background: #FF5555; color: #FFFFFF; ".concat(this.baseStyle),
        };
        this.appStyle = "background: linear-gradient(to right, #6A11CB, #2575FC); color: #FFFFFF; ".concat(this.baseStyle);
        this.timeStyle = "background: linear-gradient(to right, #43E97B, #38F9D7); color: #003F3F; ".concat(this.baseStyle);
        this.appName = appName;
        this.getTime = getTime;
    }
    OvenMDKLogger.prototype.logStyled = function (level, content) {
        var levelStyle = this.tagStyles[level];
        var icon = this.levelIcons[level];
        var label = "%c\u2726 ".concat(this.appName, " \u2726%c %c").concat(this.getTime(), "%c %c").concat(icon, " ").concat(level.toUpperCase(), "%c ").concat(content);
        var consoleMethod = console[level] || console.log;
        consoleMethod.call(console, label, this.appStyle, '', this.timeStyle, '', levelStyle, '');
    };
    OvenMDKLogger.prototype.log = function (content) {
        this.logStyled('log', content);
    };
    OvenMDKLogger.prototype.info = function (content) {
        this.logStyled('info', content);
    };
    OvenMDKLogger.prototype.warn = function (content) {
        this.logStyled('warn', content);
    };
    OvenMDKLogger.prototype.error = function (content) {
        this.logStyled('error', content);
    };
    return OvenMDKLogger;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OvenMDKLogger);


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
/* harmony import */ var _classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/core/Helper_func */ "./src/classes/core/Helper_func.ts");
/* harmony import */ var _classes_core_OItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/core/OItem */ "./src/classes/core/OItem.ts");
/* harmony import */ var _classes_core_Mod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/core/Mod */ "./src/classes/core/Mod.ts");
/* harmony import */ var _classes_core_Oven__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./classes/core/Oven */ "./src/classes/core/Oven.ts");
/* harmony import */ var _classes_core_OBlock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./classes/core/OBlock */ "./src/classes/core/OBlock.ts");
/* harmony import */ var _classes_core_commands__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./classes/core/commands */ "./src/classes/core/commands.ts");
/* harmony import */ var _classes_core_OEntity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./classes/core/OEntity */ "./src/classes/core/OEntity.ts");
/* harmony import */ var _classes_core_OvenOre__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./classes/core/OvenOre */ "./src/classes/core/OvenOre.ts");
/* harmony import */ var classes_core_ORecipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! classes/core/ORecipe */ "./src/classes/core/ORecipe.ts");
/* harmony import */ var _classes_core_log__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./classes/core/log */ "./src/classes/core/log.ts");
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
    new _classes_core_log__WEBPACK_IMPORTED_MODULE_10__["default"]({ appName: "OvenMDK" }).log("Initializing OvenMDK Runtime");
    new _classes_core_log__WEBPACK_IMPORTED_MODULE_10__["default"]({ appName: "OvenMDK" }).log("Loading OvenMDK globals");
    function OvenMDK_log_helper(msg) {
        new _classes_core_log__WEBPACK_IMPORTED_MODULE_10__["default"]({ appName: "OvenMDK" }).log(msg);
    }
    globalThis.OvenMDKLogger = OvenMDK_log_helper;
    globalThis.registerServerItem = _classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerServerItem;
    globalThis.registerServerBlock = _classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerServerBlock;
    globalThis.registerEntityServer = _classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerEntityServer;
    globalThis.OItem = _classes_core_OItem__WEBPACK_IMPORTED_MODULE_2__["default"];
    globalThis.OMod = _classes_core_Mod__WEBPACK_IMPORTED_MODULE_3__["default"];
    globalThis.OvenMDK = _classes_core_Oven__WEBPACK_IMPORTED_MODULE_4__["default"];
    globalThis.OBlock = _classes_core_OBlock__WEBPACK_IMPORTED_MODULE_5__["default"];
    globalThis.simplecommand = _classes_core_commands__WEBPACK_IMPORTED_MODULE_6__.simplecommand;
    globalThis.OvenOre = _classes_core_OvenOre__WEBPACK_IMPORTED_MODULE_8__["default"];
    globalThis.registerOvenOreServer = _classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerOvenOreServer;
    globalThis.OEntity = _classes_core_OEntity__WEBPACK_IMPORTED_MODULE_7__["default"];
    globalThis.ORecipe = classes_core_ORecipe__WEBPACK_IMPORTED_MODULE_9__.ORecipe;
    globalThis.registerOvenMDKRecipe = classes_core_ORecipe__WEBPACK_IMPORTED_MODULE_9__.registerOvenMDKRecipe;
    globalThis.OFurnanceRecipe = classes_core_ORecipe__WEBPACK_IMPORTED_MODULE_9__.OFurnanceRecipe;
    globalThis.registerOvenMDKFurnaceRecipe = classes_core_ORecipe__WEBPACK_IMPORTED_MODULE_9__.registerOvenMDKFurnaceRecipe;
    if (ModAPI.is_1_12) {
        if (!devmode) {
            alert("OvenMDK does not fully support 1.12 at this time, please use 1.8.8 for full support");
            new globalThis.OvenMDKLogger("1.12 detected");
            console.error("OvenMDK does not fully support 1.12 at this time, please use 1.8.8 for full support");
        }
    }
    new globalThis.OvenMDKLogger("OvenMDK globals have been set and loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerServerItem = ".concat(_classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerServerItem, ";"));
    new globalThis.OvenMDKLogger("Register Item serverside function loaded");
    /*ModAPI.dedicatedServer.appendCode(
      `new globalThis.OvenMDKLogger = ${OvenMDK_log_helper};`
    );
    */ new globalThis.OvenMDKLogger("server side logger function loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerOvenOreServer = ".concat(_classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerOvenOreServer, ";"));
    new globalThis.OvenMDKLogger("Register Oven Ore serverside function loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerServerORecipe = ".concat(classes_core_ORecipe__WEBPACK_IMPORTED_MODULE_9__.registerOvenMDKRecipe, ";"));
    new globalThis.OvenMDKLogger("Register ORecipe serverside function loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerServerOFurnanceRecipe = ".concat(classes_core_ORecipe__WEBPACK_IMPORTED_MODULE_9__.registerOvenMDKFurnaceRecipe, ";"));
    new globalThis.OvenMDKLogger("Register OFurnanceRecipe serverside function loaded");
    ModAPI.dedicatedServer.appendCode(_classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.OvenMDK__defineExecCmdAsGlobal);
    (0,_classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.OvenMDK__defineExecCmdAsGlobal)();
    new globalThis.OvenMDKLogger("OvenMDK__ExecCmdAsGlobal serverside and clientside function loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerServerBlock = ".concat(_classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerServerBlock, ";"));
    new globalThis.OvenMDKLogger("Register Entity serverside function loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerEntityServer = ".concat(_classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerEntityServer, ";"));
    new globalThis.OvenMDKLogger("Register Block serverside function loaded");
    ModAPI.events.callEvent("lib:OvenMDK:loaded", { version: "v0.4" });
});
ModAPI.addEventListener("lib:OvenMDK:loaded", function (event) {
    new globalThis.OvenMDKLogger("OvenMDK Runtime has finished loading");
    new globalThis.OvenMDKLogger("\n    \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n    \u2502                                   \u2502\n    \u2502   OvenMDK has loaded              \u2502\n    \u2502                                   \u2502\n    \u2502   welcome to ovenMDK              \u2502\n    \u2502                                   \u2502\n    \u2502   A mod dev kit for starters      \u2502\n    \u2502                                   \u2502\n    \u2502   Version: ".concat(event.version, "                   \u2502\n    \u2502                                   \u2502\n    \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n    "));
    (0,_classes_core_commands__WEBPACK_IMPORTED_MODULE_6__.simplecommand)("/ovenmdk", " log_1", function () {
        ModAPI.displayToChat("\n      OvenMDK Runtime v0.1\n      Made by BendieGames and Block_2222\n      - Added basic core classes\n      ( Not much can be documented due to so little being added )");
    });
    (0,_classes_core_commands__WEBPACK_IMPORTED_MODULE_6__.simplecommand)("/ovenmdk", " log_2", function () {
        ModAPI.displayToChat("\n      OvenMDK Runtime v0.2\n      Made by BendieGames and Block_2222\n      - Added support for 1.12\n      - Added support for OvenOre\n      - Added support for OEntity\n      - QOL improvements\n      - Added support for OvenMDK__ExecCmdAsGlobal\n      - Added support for OvenMDK__defineExecCmdAsGlobal\n      - Added support for simplecommands");
    });
    (0,_classes_core_commands__WEBPACK_IMPORTED_MODULE_6__.simplecommand)("/ovenmdk", " log_3", function () {
        ModAPI.displayToChat("\n      OvenMDK Runtime v0.3\n      Made by BendieGames\n      - Added more OEntity customization\n        - Added more support for Model hitboexes\n        - Added custom entity sound support\n        - Added custom crafting recipes however they are not finished yet ( Broken in 1.12)\n        - Attempted to fix items textures on 1.12 with no success");
    });
    (0,_classes_core_commands__WEBPACK_IMPORTED_MODULE_6__.simplecommand)("/ovenmdk", " log_4", function () {
        ModAPI.displayToChat("\n      OvenMDK Runtime v0.4\n      Made by BendieGames\n      - Added custom Block drops\n      - Added better handling for ore generation\n      - Added custom Furnace recipes\n      - Added custom models for blocks, entities, and items\n      - Added more customizations for OItems and OBlocks");
    });
});
ModAPI.addCredit("OvenMDK Runtime", "BendieGames", " - Made OvenMDK\n - Coded most of OvenMDK");
ModAPI.addCredit("OvenMDK Runtime", "Block_2222", " - Founded OvenMDK");
ModAPI.events.callEvent("lib:OvenMDK:load", {});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0ZBQWtGLHdCQUF3QjtBQUMxRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0ZBQWdGO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0ZBQWtGLHdCQUF3QjtBQUMxRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELHdCQUF3QjtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBOEUsd0JBQXdCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEU7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBOEUsd0JBQXdCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCx3QkFBd0I7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNU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dUVBQXFCO0FBQzVELGlDQUFpQyxpRUFBZTtBQUNoRCw4Q0FBOEMsOEVBQTRCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0YseUVBQWtCLElBQUk7QUFDdEc7QUFDQTtBQUNBLHdDQUF3QyxvQkFBb0I7QUFDNUQ7QUFDQTtBQUNBLG1GQUFtRiw0RUFBcUIsSUFBSTtBQUM1RztBQUNBLG1GQUFtRix1RUFBcUIsSUFBSTtBQUM1RztBQUNBLDJGQUEyRiw4RUFBNEIsSUFBSTtBQUMzSDtBQUNBLHNDQUFzQyxxRkFBOEI7QUFDcEUsSUFBSSx5RkFBOEI7QUFDbEM7QUFDQSxpRkFBaUYsMEVBQW1CLElBQUk7QUFDeEc7QUFDQSxrRkFBa0YsMkVBQW9CLElBQUk7QUFDMUc7QUFDQSxvREFBb0QsaUJBQWlCO0FBQ3JFLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxJQUFJLHFFQUFhO0FBQ2pCO0FBQ0EsS0FBSztBQUNMLElBQUkscUVBQWE7QUFDakI7QUFDQSxLQUFLO0FBQ0wsSUFBSSxxRUFBYTtBQUNqQjtBQUNBLEtBQUs7QUFDTCxJQUFJLHFFQUFhO0FBQ2pCO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0EsOENBQThDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lLy4vc3JjL2NsYXNzZXMvY29yZS9IZWxwZXJfZnVuYy50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL01vZC50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL09CbG9jay50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL09FbnRpdHkudHMiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lLy4vc3JjL2NsYXNzZXMvY29yZS9PSXRlbS50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL09SZWNpcGUudHMiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lLy4vc3JjL2NsYXNzZXMvY29yZS9PdmVuLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvT3Zlbk9yZS50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL2NvbW1hbmRzLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvbG9nLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICAgIEhlbHBlcl9mdW5jLnRzXG4gICAgXG4gICAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJTZXJ2ZXJJdGVtKGl0ZW1JRCwgaXRlbVN0YWNrLCBvblJpZ2h0Q2xpY2ssIG9uSXRlbVVzZSkge1xuICAgIC8qaWYgKGlzU2VydmVyID09PSBmYWxzZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVnaXN0ZXJTZXJ2ZXJJdGVtIGNhbiBvbmx5IGJlIHVzZWQgb24gdGhlIHNlcnZlciBzaWRlLlwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICB9Ki9cbiAgICB2YXIgY3JlYXRpdmVNaXNjVGFiO1xuICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICBjcmVhdGl2ZU1pc2NUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMuTUlTQztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNyZWF0aXZlTWlzY1RhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy50YWJNaXNjO1xuICAgIH1cbiAgICB2YXIgJCRpdGVtR2V0QXR0cmlidXRlcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpLm1ldGhvZHMuZ2V0SXRlbUF0dHJpYnV0ZU1vZGlmaWVycy5tZXRob2Q7XG4gICAgdmFyIGl0ZW1DbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpO1xuICAgIHZhciBpdGVtU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihpdGVtQ2xhc3MsIGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZm4ubGVuZ3RoID09PSAxOyB9KTtcbiAgICAvKmlmIChpc1NlcnZlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwidXNpbmcgc2VydmVyIHNpZGUgcmVnaXN0ZXJTZXJ2ZXJJdGVtXCIpO1xuICAgICAgfSovXG4gICAgZnVuY3Rpb24gbm1pX092ZW5JdGVtKCkge1xuICAgICAgICBpdGVtU3VwZXIodGhpcyk7XG4gICAgICAgIHRoaXMuJHNldENyZWF0aXZlVGFiKGNyZWF0aXZlTWlzY1RhYik7XG4gICAgICAgIHRoaXMuJG1heFN0YWNrU2l6ZSA9IGl0ZW1TdGFjaztcbiAgICB9XG4gICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2soaXRlbUNsYXNzLCBubWlfT3Zlbkl0ZW0pO1xuICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtUmlnaHRDbGljayA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpIHtcbiAgICAgICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpXG4gICAgICAgICAgICAgICAgJCRwbGF5ZXIuJHNldEl0ZW1JblVzZSgkJGl0ZW1zdGFjaywgMzIpO1xuICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcjtcbiAgICAgICAgICAgIG9uUmlnaHRDbGljaygkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpO1xuICAgICAgICAgICAgaWYgKGdsb2JhbFRoaXMuRGVidWdfbW9kZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VydmVyIGl0ZW1zdGFjazpcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJCRpdGVtc3RhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICQkaXRlbXN0YWNrO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgdmFyICQkUmVzdWx0RW51bSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiRW51bUFjdGlvblJlc3VsdFwiKS5zdGF0aWNWYXJpYWJsZXM7XG4gICAgICAgIHZhciAkJEFjdGlvblJlc3VsdCA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiQWN0aW9uUmVzdWx0XCIpLmNvbnN0cnVjdG9yc1swXTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtUmlnaHRDbGljayA9IGZ1bmN0aW9uICgkJHdvcmxkLCAkJHBsYXllciwgJGhhbmRFbnVtLCAkdW51c2VkKSB7XG4gICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2sgPSAkJHBsYXllci4kZ2V0SGVsZEl0ZW0oJGhhbmRFbnVtKTtcbiAgICAgICAgICAgICQkcGxheWVyLiRzZXRBY3RpdmVIYW5kKCRoYW5kRW51bSk7XG4gICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyO1xuICAgICAgICAgICAgb25SaWdodENsaWNrKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcik7XG4gICAgICAgICAgICBpZiAoZ2xvYmFsVGhpcy5EZWJ1Z19tb2RlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZXJ2ZXIgaXRlbXN0YWNrOlwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJCRBY3Rpb25SZXN1bHQoJCRSZXN1bHRFbnVtLlNVQ0NFU1MsICQkaXRlbXN0YWNrKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1Vc2UwID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHBsYXllciwgJCR3b3JsZCwgJCRibG9ja3Bvcykge1xuICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRibG9ja3BvcztcbiAgICAgICAgICAgIGlmIChvbkl0ZW1Vc2UpIHtcbiAgICAgICAgICAgICAgICBvbkl0ZW1Vc2UoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGJsb2NrcG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpZW50IGl0ZW1zdGFjazpcIik7XG4gICAgICAgICAgICBpZiAoZ2xvYmFsVGhpcy5EZWJ1Z19tb2RlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJCRpdGVtc3RhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICB2YXIgJCRSZXN1bHRFbnVtID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnVtQWN0aW9uUmVzdWx0XCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtVXNlID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHBsYXllciwgJCR3b3JsZCwgJCRibG9ja3Bvcykge1xuICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHBsYXllciwgJCR3b3JsZCwgJCRibG9ja3BvcztcbiAgICAgICAgICAgIGlmIChvbkl0ZW1Vc2UpIHtcbiAgICAgICAgICAgICAgICBvbkl0ZW1Vc2UoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGJsb2NrcG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkJFJlc3VsdEVudW0uUEFTUztcbiAgICAgICAgfTtcbiAgICB9XG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25VcGRhdGUgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGhvdGJhcl9zbG90LCAkJGlzX2hlbGQpIHtcbiAgICAgICAgJCRpc19oZWxkID0gJCRpc19oZWxkID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICByZXR1cm4gJCRpdGVtc3RhY2s7XG4gICAgfTtcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1Vc2VGaW5pc2ggPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7XG4gICAgICAgIHJldHVybiAkJGl0ZW1zdGFjaztcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldE1heEl0ZW1Vc2VEdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIDMyO1xuICAgIH07XG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kZ2V0SXRlbUF0dHJpYnV0ZU1vZGlmaWVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8xLjEyIHdvcmtzIGkgdGhpbmtcbiAgICAgICAgdmFyICQkYXR0cmlidXRlbWFwID0gJCRpdGVtR2V0QXR0cmlidXRlcy5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgIHJldHVybiAkJGF0dHJpYnV0ZW1hcDtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldFN0clZzQmxvY2sgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkYmxvY2spIHtcbiAgICAgICAgcmV0dXJuIDEuMDtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uQ3JlYXRlZCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpIHtcbiAgICAgICAgLy8xLjEyIHdvcmtzXG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uQmxvY2tEZXN0cm95ZWQgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkYmxvY2ssICQkYmxvY2twb3MsICQkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgdmFyIGludGVybmFsX3JlZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGl0ZW1JbnN0YW5jZSA9IG5ldyBubWlfT3Zlbkl0ZW0oKS4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihcIlwiLmNvbmNhdChpdGVtSUQpKSk7XG4gICAgICAgIGl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbS5tZXRob2QoTW9kQVBJLmtleWdlbi5pdGVtKFwiXCIuY29uY2F0KGl0ZW1JRCkpLCBNb2RBUEkudXRpbC5zdHIoXCJcIi5jb25jYXQoaXRlbUlEKSksIGl0ZW1JbnN0YW5jZSk7XG4gICAgICAgIE1vZEFQSS5pdGVtc1tcIlwiLmNvbmNhdChpdGVtSUQpXSA9IGl0ZW1JbnN0YW5jZTtcbiAgICAgICAgaWYgKGdsb2JhbFRoaXMuRGVidWdfbW9kZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbUluc3RhbmNlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXJlZCBPdmVuTURLIGl0ZW0gKCBTZXJ2ZXIgU2lkZSApXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtSW5zdGFuY2U7XG4gICAgfTtcbiAgICBpZiAoTW9kQVBJLml0ZW1zKSB7XG4gICAgICAgIHJldHVybiBpbnRlcm5hbF9yZWcoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsX3JlZyk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyU2VydmVyQmxvY2soYmxvY2tJRCwgb25CcmVhaywgZHJvcHBlZEl0ZW0pIHtcbiAgICB2YXIgQmxvY2tDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIik7XG4gICAgdmFyIEl0ZW1DbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpO1xuICAgIHZhciBnZXREcm9wcGVkSXRlbSA9IEJsb2NrQ2xhc3MubWV0aG9kcy5nZXRJdGVtRHJvcHBlZC5tZXRob2Q7XG4gICAgdmFyIHF1YW50aXR5RHJvcHBlZCA9IEJsb2NrQ2xhc3MubWV0aG9kcy5xdWFudGl0eURyb3BwZWQubWV0aG9kO1xuICAgIHZhciBjcmVhdGl2ZVRhYjtcbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgY3JlYXRpdmVUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMuQlVJTERJTkdfQkxPQ0tTO1xuICAgIH1cbiAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIGNyZWF0aXZlVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLnRhYkJsb2NrO1xuICAgIH1cbiAgICB2YXIgYmxvY2tTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKEJsb2NrQ2xhc3MsIGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZm4ubGVuZ3RoID09PSAyOyB9KTtcbiAgICB2YXIgYnJlYWtCbG9ja01ldGhvZCA9IEJsb2NrQ2xhc3MubWV0aG9kcy5icmVha0Jsb2NrLm1ldGhvZDtcbiAgICBmdW5jdGlvbiBubWJfT2Jsb2NrKCkge1xuICAgICAgICBibG9ja1N1cGVyKHRoaXMsIE1vZEFQSS5tYXRlcmlhbHMucm9jay5nZXRSZWYoKSk7XG4gICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIHRoaXMuJGRlZmF1bHRCbG9ja1N0YXRlID0gdGhpcy4kYmxvY2tTdGF0ZS4kZ2V0QmFzZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kc2V0Q3JlYXRpdmVUYWIoY3JlYXRpdmVUYWIpO1xuICAgIH1cbiAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhCbG9ja0NsYXNzLCBubWJfT2Jsb2NrKTtcbiAgICBubWJfT2Jsb2NrLnByb3RvdHlwZS4kYnJlYWtCbG9jayA9IGZ1bmN0aW9uICgkd29ybGQsICRibG9ja3BvcywgJGJsb2Nrc3RhdGUpIHtcbiAgICAgICAgLy9vbkJyZWFrKCR3b3JsZCwgJGJsb2NrcG9zLCAkYmxvY2tzdGF0ZSk7XG4gICAgICAgIHJldHVybiBicmVha0Jsb2NrTWV0aG9kKHRoaXMsICR3b3JsZCwgJGJsb2NrcG9zLCAkYmxvY2tzdGF0ZSk7XG4gICAgfTtcbiAgICBpZiAoZHJvcHBlZEl0ZW0pIHtcbiAgICAgICAgbm1iX09ibG9jay5wcm90b3R5cGUuJGdldEl0ZW1Ecm9wcGVkID0gZnVuY3Rpb24gKCQkYmxvY2tzdGF0ZSwgJCRyYW5kb20sIF9fZWZiMl9hcmdfZm9ydHVyZSkge1xuICAgICAgICAgICAgdmFyIF9fZWZiMl9hcmdfZm9ydHVyZTtcbiAgICAgICAgICAgIHJldHVybiBNb2RBUEkuaXRlbXNbZHJvcHBlZEl0ZW1dLmdldFJlZigpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICB2YXIgJCRvbkJsb2NrRGVzdHJveWVkQnlQbGF5ZXJNZXRob2QgPSBCbG9ja0NsYXNzLm1ldGhvZHMub25CbG9ja0Rlc3Ryb3llZEJ5UGxheWVyLm1ldGhvZDtcbiAgICBubWJfT2Jsb2NrLnByb3RvdHlwZS4kb25CbG9ja0Rlc3Ryb3llZEJ5UGxheWVyID0gZnVuY3Rpb24gKCQkd29ybGQsICQkYmxvY2twb3MsICQkYmxvY2tzdGF0ZSkge1xuICAgICAgICB2YXIgJCR3b3JsZCwgJCRibG9ja3BvcywgJCRibG9ja3N0YXRlO1xuICAgICAgICBvbkJyZWFrLmNhbGwoJCR3b3JsZCwgJCRibG9ja3BvcywgJCRibG9ja3N0YXRlKTtcbiAgICAgICAgcmV0dXJuICQkb25CbG9ja0Rlc3Ryb3llZEJ5UGxheWVyTWV0aG9kKHRoaXMsICQkd29ybGQsICQkYmxvY2twb3MsICQkYmxvY2tzdGF0ZSk7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBmaXh1cEJsb2NrSWRzKCkge1xuICAgICAgICB2YXIgYmxvY2tSZWdpc3RyeSA9IE1vZEFQSS51dGlsXG4gICAgICAgICAgICAud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpLnN0YXRpY1ZhcmlhYmxlc1xuICAgICAgICAgICAgLmJsb2NrUmVnaXN0cnkpXG4gICAgICAgICAgICAuZ2V0Q29ycmVjdGl2ZSgpO1xuICAgICAgICB2YXIgQkxPQ0tfU1RBVEVfSURTID0gTW9kQVBJLnV0aWxcbiAgICAgICAgICAgIC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIikuc3RhdGljVmFyaWFibGVzXG4gICAgICAgICAgICAuQkxPQ0tfU1RBVEVfSURTKVxuICAgICAgICAgICAgLmdldENvcnJlY3RpdmUoKTtcbiAgICAgICAgYmxvY2tSZWdpc3RyeS5yZWdpc3RyeU9iamVjdHMuaGFzaFRhYmxlS1RvVi5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGJsb2NrXzEgPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsaWRTdGF0ZXMgPSBibG9ja18xLmdldEJsb2NrU3RhdGUoKS5nZXRWYWxpZFN0YXRlcygpO1xuICAgICAgICAgICAgICAgIHZhciBzdGF0ZUFycmF5ID0gdmFsaWRTdGF0ZXMuYXJyYXkgfHwgW3ZhbGlkU3RhdGVzLmVsZW1lbnRdO1xuICAgICAgICAgICAgICAgIHN0YXRlQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaWJsb2Nrc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoYmxvY2tSZWdpc3RyeS5nZXRJREZvck9iamVjdChibG9ja18xLmdldFJlZigpKSA8PCA0KSB8XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja18xLmdldE1ldGFGcm9tU3RhdGUoaWJsb2Nrc3RhdGUuZ2V0UmVmKCkpO1xuICAgICAgICAgICAgICAgICAgICBCTE9DS19TVEFURV9JRFMucHV0KGlibG9ja3N0YXRlLmdldFJlZigpLCBpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBpbnRlcm5hbFJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY3VzdG9tX2Jsb2NrO1xuICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBuZXcgbm1iX09ibG9jaygpXG4gICAgICAgICAgICAgICAgLiRzZXRIYXJkbmVzcygzLjApXG4gICAgICAgICAgICAgICAgLiRzZXRTdGVwU291bmQoQmxvY2tDbGFzcy5zdGF0aWNWYXJpYWJsZXMuc291bmRUeXBlUGlzdG9uKVxuICAgICAgICAgICAgICAgIC4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihibG9ja0lEKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBuZXcgbm1iX09ibG9jaygpXG4gICAgICAgICAgICAgICAgLiRzZXRIYXJkbmVzcygzLjApXG4gICAgICAgICAgICAgICAgLiRzZXRTb3VuZFR5cGUoTW9kQVBJLmJsb2NrU291bmRzLlBMQU5ULmdldFJlZigpKVxuICAgICAgICAgICAgICAgIC4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihibG9ja0lEKSk7XG4gICAgICAgIH1cbiAgICAgICAgQmxvY2tDbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVyQmxvY2swLm1ldGhvZChNb2RBUEkua2V5Z2VuLmJsb2NrKGJsb2NrSUQpLCBNb2RBUEkudXRpbC5zdHIoYmxvY2tJRCksIGN1c3RvbV9ibG9jayk7XG4gICAgICAgIEl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbUJsb2NrMC5tZXRob2QoY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgZml4dXBCbG9ja0lkcygpO1xuICAgICAgICBNb2RBUEkuYmxvY2tzW2Jsb2NrSURdID0gY3VzdG9tX2Jsb2NrO1xuICAgICAgICBpZiAoZ2xvYmFsVGhpcy5EZWJ1Z19tb2RlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyaW5nIGJsb2NrIG9uIHNlcnZlciBzaWRlXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VzdG9tX2Jsb2NrO1xuICAgIH07XG4gICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICBpZiAoTW9kQVBJLm1hdGVyaWFscykge1xuICAgICAgICAgICAgaWYgKGRyb3BwZWRJdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1vZEFQSS5pdGVtc1tkcm9wcGVkSXRlbV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGludGVybmFsUmVnaXN0ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsUmVnaXN0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbFJlZ2lzdGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImJvb3RzdHJhcFwiLCBpbnRlcm5hbFJlZ2lzdGVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgdmFyIGJsb2NrQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpO1xuICAgICAgICB2YXIgaXRlbUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIik7XG4gICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXN0b21fYmxvY2sgPSBuZXcgbm1iX09ibG9jaygpXG4gICAgICAgICAgICAgICAgLiRzZXRIYXJkbmVzcygzLjApXG4gICAgICAgICAgICAgICAgLiRzZXRTb3VuZFR5cGUoTW9kQVBJLmJsb2NrU291bmRzLlBMQU5ULmdldFJlZigpKVxuICAgICAgICAgICAgICAgIC4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihibG9ja0lEKSk7XG4gICAgICAgICAgICBibG9ja0NsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJCbG9jazAubWV0aG9kKE1vZEFQSS5rZXlnZW4uYmxvY2soYmxvY2tJRCksIE1vZEFQSS51dGlsLnN0cihibG9ja0lEKSwgY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgIGl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbUJsb2NrMC5tZXRob2QoY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgIGZpeHVwQmxvY2tJZHMoKTtcbiAgICAgICAgICAgIE1vZEFQSS5ibG9ja3NbYmxvY2tJRF0gPSBjdXN0b21fYmxvY2s7XG4gICAgICAgICAgICBpZiAoZ2xvYmFsVGhpcy5EZWJ1Z19tb2RlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmluZyBibG9jayBvbiBzZXJ2ZXIgc2lkZVwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJFbnRpdHlTZXJ2ZXIoZW50aXR5SUQsIGVudGl0eU5hbWUsIGVudGl0eU1vZGVsLCBlbnRpdHlCcmVlZEl0ZW0sIGVudGl0eURyb3BJdGVtLCBlZ2dCYXNlLCBlZ2dTcG90cykge1xuICAgIGNvbnNvbGUubG9nKFwiZW50aXRpZXMgYXJlIG5vdCBmaW5pc2hlZCB5ZXQhIFVzZSBhdCB5b3VyIG93biByaXNrIVwiKTtcbiAgICAvL3JldHVybjtcbiAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5qbF9TdHJpbmdfZm9ybWF0ID1cbiAgICAgICAgTW9kQVBJLmhvb2tzLm1ldGhvZHMubmxldl9IU3RyaW5nX2Zvcm1hdDsgLy90ZW1wb3JhcnkgdGhpbmcgdG8gZml4IGFuIGlzc3VlIGluIGVhZ2xlcmNyYWZ0XG4gICAgLy8gVXRpbHNcbiAgICBmdW5jdGlvbiBBSVRhc2sobmFtZSwgbGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LmFpLlwiICsgbmFtZSlcbiAgICAgICAgICAgIC5jb25zdHJ1Y3RvcnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IGxlbmd0aDsgfSk7XG4gICAgfVxuICAgIHZhciBSZXNvdXJjZUxvY2F0aW9uID0gTW9kQVBJLnJlZmxlY3RcbiAgICAgICAgLmdldENsYXNzQnlOYW1lKFwiUmVzb3VyY2VMb2NhdGlvblwiKVxuICAgICAgICAuY29uc3RydWN0b3JzLmZpbmQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSAxOyB9KTtcbiAgICB2YXIgRW50aXR5UGxheWVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnRpdHlQbGF5ZXJcIik7XG4gICAgdmFyIEdsU3RhdGVNYW5hZ2VyID0gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC52YWx1ZXMoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJHbFN0YXRlTWFuYWdlclwiKS5zdGF0aWNNZXRob2RzKS5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIFt4Lm1ldGhvZE5hbWVTaG9ydCwgeC5tZXRob2RdOyB9KSk7XG4gICAgdmFyIFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJTaGFyZWRNb25zdGVyQXR0cmlidXRlc1wiKS5zdGF0aWNWYXJpYWJsZXM7XG4gICAgLy8gU1RBUlQgQ1VTVE9NIEVOVElUWVxuICAgIHZhciBlbnRpdHlTaXplMTtcbiAgICB2YXIgZW50aXR5U2l6ZTI7XG4gICAgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsQ2hpY2tlblwiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC40OyAvLyBDaGlja2VuXG4gICAgICAgIGVudGl0eVNpemUyID0gMC43O1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbENvd1wiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC45OyAvLyBDb3dcbiAgICAgICAgZW50aXR5U2l6ZTIgPSAxLjQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsTW9vc2hyb29tXCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjk7IC8vIE1vb3Nocm9vbVxuICAgICAgICBlbnRpdHlTaXplMiA9IDEuNDtcbiAgICB9XG4gICAgZWxzZSBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxQaWdcIikge1xuICAgICAgICBlbnRpdHlTaXplMSA9IDAuOTsgLy8gUGlnXG4gICAgICAgIGVudGl0eVNpemUyID0gMC45O1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFNoZWVwXCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjk7IC8vIFNoZWVwXG4gICAgICAgIGVudGl0eVNpemUyID0gMS4zO1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbEhvcnNlXCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAxLjM5NjU7IC8vIEhvcnNlXG4gICAgICAgIGVudGl0eVNpemUyID0gMS42OyAvLyBIZWlnaHQgY2FuIHZhcnkgc2xpZ2h0bHlcbiAgICB9XG4gICAgZWxzZSBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxSYWJiaXRcIikge1xuICAgICAgICBlbnRpdHlTaXplMSA9IDAuNDsgLy8gUmFiYml0XG4gICAgICAgIGVudGl0eVNpemUyID0gMC41O1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFNxdWlkXCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjg7IC8vIFNxdWlkXG4gICAgICAgIGVudGl0eVNpemUyID0gMC44O1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbEJhdFwiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC41OyAvLyBCYXRcbiAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsT2NlbG90XCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjY7IC8vIE9jZWxvdCAod2lsZClcbiAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsV29sZlwiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC42OyAvLyBXb2xmXG4gICAgICAgIGVudGl0eVNpemUyID0gMC44NTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxWaWxsYWdlclwiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC42OyAvLyBWaWxsYWdlclxuICAgICAgICBlbnRpdHlTaXplMiA9IDEuOTU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsSXJvbkdvbGVtXCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAxLjQ7IC8vIElyb24gR29sZW1cbiAgICAgICAgZW50aXR5U2l6ZTIgPSAyLjk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsU25vd21hblwiIHx8XG4gICAgICAgIGVudGl0eU1vZGVsID09PSBcIk1vZGVsU25vd0dvbGVtXCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjc7IC8vIFNub3cgR29sZW1cbiAgICAgICAgZW50aXR5U2l6ZTIgPSAxLjk7XG4gICAgfVxuICAgIHZhciBlbnRpdHlDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LnBhc3NpdmUuRW50aXR5QW5pbWFsXCIpO1xuICAgIGlmICghTW9kQVBJLml0ZW1zKSB7XG4gICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChnbG9iYWxUaGlzLkRlYnVnX21vZGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJ0aGlzIGlzIGVudGl0eSBzaXplIG9uIHNlcnZlciAxOiBcIi5jb25jYXQoZW50aXR5U2l6ZTEsIFwiLCB0aGlzIGlzIGVudGl0eSBzaXplIDI6IFwiKS5jb25jYXQoZW50aXR5U2l6ZTIsIFwiLCBicmVlZCBpdGVtIFwiKS5jb25jYXQoZW50aXR5QnJlZWRJdGVtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZW50aXR5RHJvcEl0ZW0yID0gZW50aXR5RHJvcEl0ZW07XG4gICAgICAgICAgICB2YXIgaXRlbV9yZWYgPSBNb2RBUEkuaXRlbXNbZW50aXR5QnJlZWRJdGVtXS5nZXRSZWYoKTtcbiAgICAgICAgICAgIHZhciBlbnRpdHlTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKGVudGl0eUNsYXNzLCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDI7IH0pO1xuICAgICAgICAgICAgdmFyIG5tZV9PRW50aXR5ID0gZnVuY3Rpb24gbm1lX09FbnRpdHkoJHdvcmxkSW4pIHtcbiAgICAgICAgICAgICAgICBlbnRpdHlTdXBlcih0aGlzLCAkd29ybGRJbik7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLnNldFNpemUoZW50aXR5U2l6ZTEgfHwgMC40LCBlbnRpdHlTaXplMiB8fCAwLjcpO1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDAsIEFJVGFzayhcIkVudGl0eUFJU3dpbW1pbmdcIiwgMSkodGhpcykpO1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDEsIEFJVGFzayhcIkVudGl0eUFJUGFuaWNcIiwgMikodGhpcywgMS45KSk7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMiwgQUlUYXNrKFwiRW50aXR5QUlNYXRlXCIsIDIpKHRoaXMsIDEuMCkpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDMsIEFJVGFzayhcIkVudGl0eUFJVGVtcHRcIiwgNCkodGhpcywgMS41LCBpdGVtX3JlZiwgMCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJGYWlsZWQgdG8gYWRkIEVudGl0eUFJVGVtcHQgdGFzayBmb3IgXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiLiBUaGlzIG1heSBiZSBkdWUgdG8gYW4gaW5jb3JyZWN0IGl0ZW0gcmVmZXJlbmNlLCBcIikuY29uY2F0KGl0ZW1fcmVmLCBcIiwgKCBpdGVtIHJlZiksIGFuZCBcIikuY29uY2F0KGl0ZW1fcmVmKCksIFwiLCAoaXRlbV9yZWYoKSlcIikpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygzLCBBSVRhc2soXCJFbnRpdHlBSVRlbXB0XCIsIDQpKHRoaXMsIDEuNSwgaXRlbV9yZWYoKSwgMCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNCwgQUlUYXNrKFwiRW50aXR5QUlGb2xsb3dQYXJlbnRcIiwgMikodGhpcywgMS4yKSk7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNSwgQUlUYXNrKFwiRW50aXR5QUlXYW5kZXJcIiwgMikodGhpcywgMS4xKSk7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNiwgQUlUYXNrKFwiRW50aXR5QUlXYXRjaENsb3Nlc3RcIiwgMykodGhpcywgTW9kQVBJLnV0aWwuYXNDbGFzcyhFbnRpdHlQbGF5ZXIuY2xhc3MpLCA2KSk7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNywgQUlUYXNrKFwiRW50aXR5QUlMb29rSWRsZVwiLCAxKSh0aGlzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2soZW50aXR5Q2xhc3MsIG5tZV9PRW50aXR5KTtcbiAgICAgICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0RXllSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndyYXBwZWQuaGVpZ2h0O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbEFwcGx5RW50aXR5QXR0cmlidXRlcyA9IG5tZV9PRW50aXR5LnByb3RvdHlwZS4kYXBwbHlFbnRpdHlBdHRyaWJ1dGVzO1xuICAgICAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRhcHBseUVudGl0eUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxBcHBseUVudGl0eUF0dHJpYnV0ZXMuYXBwbHkodGhpcywgW10pO1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgICAgICAgICAuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1heEhlYWx0aClcbiAgICAgICAgICAgICAgICAgICAgLnNldEJhc2VWYWx1ZSg1KTtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWRcbiAgICAgICAgICAgICAgICAgICAgLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tb3ZlbWVudFNwZWVkKVxuICAgICAgICAgICAgICAgICAgICAuc2V0QmFzZVZhbHVlKDAuMjUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbExpdmluZ1VwZGF0ZSA9IG5tZV9PRW50aXR5LnByb3RvdHlwZS4kb25MaXZpbmdVcGRhdGU7XG4gICAgICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJG9uTGl2aW5nVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsTGl2aW5nVXBkYXRlLmFwcGx5KHRoaXMsIFtdKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy53cmFwcGVkLmlzSW5XYXRlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZC5tb3Rpb25ZICo9IDAuNTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1vdmVtZW50U3BlZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0QmFzZVZhbHVlKDEuNCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRCYXNlVmFsdWUoMC4yNSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0TGl2aW5nU291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIGVudGl0eUlEICsgXCIubWFpbl9zb3VuZFwiKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldEh1cnRTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgZW50aXR5SUQgKyBcIi5tYWluX3NvdW5kXCIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0RGVhdGhTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgZW50aXR5SUQgKyBcIi5tYWluX3NvdW5kXCIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kcGxheVN0ZXBTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQucGxheVNvdW5kKE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIGVudGl0eUlEICsgXCIuc3RlcFwiKSwgMC4yLCAxKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldERyb3BJdGVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNb2RBUEkuaXRlbXNbZW50aXR5RHJvcEl0ZW0yXS5nZXRSZWYoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGNyZWF0ZUNoaWxkID0gZnVuY3Rpb24gKG90aGVyUGFyZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG5tZV9PRW50aXR5KChfYiA9IChfYSA9IHRoaXMud3JhcHBlZC53b3JsZE9iaikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldFJlZigpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBudWxsKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGlzQnJlZWRpbmdJdGVtID0gZnVuY3Rpb24gKGl0ZW1zdGFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybiAoaXRlbXN0YWNrICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zdGFjay4kZ2V0SXRlbSgpID09PSBNb2RBUEkuaXRlbXNbZW50aXR5QnJlZWRJdGVtXS5nZXRSZWYoKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gRU5EIENVU1RPTSBFTlRJVFlcbiAgICAgICAgICAgIC8vIFNUQVJUIENVU1RPTSBNT0RFTFxuICAgICAgICAgICAgdmFyIG1vZGVsQ2hpY2tlbkNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jbGllbnQubW9kZWwuXCIuY29uY2F0KGVudGl0eU1vZGVsKSk7XG4gICAgICAgICAgICB2YXIgbW9kZWxDaGlja2VuU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihtb2RlbENoaWNrZW5DbGFzcyk7IC8vd2hpbGUgc3VwZXIgaXNuJ3QgdXNlZCB3aGVuIGV4dGVuZGluZyB0aGlzIGNsYXNzLCBqYXZhIGltcGxpZXMgdGhlIGNhbGwuXG4gICAgICAgICAgICB2YXIgbm1jbV9PRW50aXR5TW9kZWwgPSBmdW5jdGlvbiBubWNtX09FbnRpdHlNb2RlbCgpIHtcbiAgICAgICAgICAgICAgICBtb2RlbENoaWNrZW5TdXBlcih0aGlzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhtb2RlbENoaWNrZW5DbGFzcywgbm1jbV9PRW50aXR5TW9kZWwpO1xuICAgICAgICAgICAgLy8gRU5EIENVU1RPTSBNaE9ERUxcbiAgICAgICAgICAgIC8vIFNUQVJUIENVU1RPTSBSRU5ERVJFUlxuICAgICAgICAgICAgdmFyIHJlbmRlckNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jbGllbnQucmVuZGVyZXIuZW50aXR5LlJlbmRlckxpdmluZ1wiKTtcbiAgICAgICAgICAgIHZhciByZW5kZXJTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKHJlbmRlckNsYXNzLCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDQ7IH0pO1xuICAgICAgICAgICAgdmFyIGR1Y2tUZXh0dXJlcyA9IFJlc291cmNlTG9jYXRpb24oTW9kQVBJLnV0aWwuc3RyKFwidGV4dHVyZXMvZW50aXR5L1wiLmNvbmNhdChlbnRpdHlJRCwgXCIucG5nXCIpKSk7XG4gICAgICAgICAgICB2YXIgbm1jcmVfUmVuZGVyT0VudGl0eSA9IGZ1bmN0aW9uIG5tY3JlX1JlbmRlck9FbnRpdHkocmVuZGVyTWFuYWdlciwgbW9kZWxCYXNlSW4sIHNoYWRvd1NpemVJbikge1xuICAgICAgICAgICAgICAgIHJlbmRlclN1cGVyKHRoaXMsIHJlbmRlck1hbmFnZXIsIG1vZGVsQmFzZUluLCBzaGFkb3dTaXplSW4pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKHJlbmRlckNsYXNzLCBubWNyZV9SZW5kZXJPRW50aXR5KTtcbiAgICAgICAgICAgIG5tY3JlX1JlbmRlck9FbnRpdHkucHJvdG90eXBlLiRnZXRFbnRpdHlUZXh0dXJlID0gZnVuY3Rpb24gKGVudGl0eSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkdWNrVGV4dHVyZXM7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbm1jcmVfUmVuZGVyT0VudGl0eS5wcm90b3R5cGUuJGhhbmRsZVJvdGF0aW9uRmxvYXQgPSBmdW5jdGlvbiAoZW50aXR5LCBwYXJ0aWFsVGlja3MpIHtcbiAgICAgICAgICAgICAgICBlbnRpdHkgPSBNb2RBUEkudXRpbC53cmFwKGVudGl0eSk7XG4gICAgICAgICAgICAgICAgaWYgKCFlbnRpdHkub25Hcm91bmQgJiYgIWVudGl0eS5pc0luV2F0ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMjsgLy9mYWxsaW5nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIElEID0gTW9kQVBJLmtleWdlbi5lbnRpdHkoZW50aXR5SUQpO1xuICAgICAgICAgICAgTW9kQVBJLnJlZmxlY3RcbiAgICAgICAgICAgICAgICAuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkuRW50aXR5TGlzdFwiKVxuICAgICAgICAgICAgICAgIC5zdGF0aWNNZXRob2RzLmFkZE1hcHBpbmcwLm1ldGhvZChNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwge1xuICAgICAgICAgICAgICAgICRjcmVhdGVFbnRpdHk6IGZ1bmN0aW9uICgkd29ybGRJbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsVGhpcy5EZWJ1Z19tb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuZXcgbm1lX09FbnRpdHkoJHdvcmxkSW4pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG5tZV9PRW50aXR5KCR3b3JsZEluKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSwgTW9kQVBJLnV0aWwuc3RyKGVudGl0eUlELnRvVXBwZXJDYXNlKCkpLCBJRCwgZWdnQmFzZSB8fCAweDVlM2UyZCwgLy9lZ2cgYmFzZVxuICAgICAgICAgICAgZWdnU3BvdHMgfHwgMHgyNjkxNjYgLy9lZ2cgc3BvdHNcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB2YXIgU3Bhd25QbGFjZW1lbnRUeXBlID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkuRW50aXR5TGl2aW5nJFNwYXduUGxhY2VtZW50VHlwZVwiKS5zdGF0aWNWYXJpYWJsZXM7XG4gICAgICAgICAgICB2YXIgRU5USVRZX1BMQUNFTUVOVFMgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eVNwYXduUGxhY2VtZW50UmVnaXN0cnlcIikuc3RhdGljVmFyaWFibGVzLkVOVElUWV9QTEFDRU1FTlRTKTtcbiAgICAgICAgICAgIEVOVElUWV9QTEFDRU1FTlRTLnB1dChNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgU3Bhd25QbGFjZW1lbnRUeXBlLk9OX0dST1VORCk7XG4gICAgICAgICAgICB2YXIgU3Bhd25MaXN0RW50cnkgPSBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgICAgIC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZSRTcGF3bkxpc3RFbnRyeVwiKVxuICAgICAgICAgICAgICAgIC5jb25zdHJ1Y3RvcnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDQ7IH0pO1xuICAgICAgICAgICAgdmFyIEJpb21lR2VuU3dhbXAgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlXCIpXG4gICAgICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5zd2FtcGxhbmQpO1xuICAgICAgICAgICAgdmFyIEJpb21lR2VuUml2ZXIgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlXCIpXG4gICAgICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5yaXZlcik7XG4gICAgICAgICAgICB2YXIgQmlvbWVHZW5CZWFjaCA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZUdlbkJhc2VcIilcbiAgICAgICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLmJlYWNoKTtcbiAgICAgICAgICAgIHZhciBkdWNrU3Bhd25Td2FtcCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAyMiwgMywgNSk7XG4gICAgICAgICAgICB2YXIgZHVja1NwYXduUml2ZXJCZWQgPSBTcGF3bkxpc3RFbnRyeShNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgMTAsIDUsIDkpO1xuICAgICAgICAgICAgdmFyIGR1Y2tTcGF3bkJlYWNoID0gU3Bhd25MaXN0RW50cnkoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIDI0LCAyLCAzKTtcbiAgICAgICAgICAgIEJpb21lR2VuU3dhbXAuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25Td2FtcCk7XG4gICAgICAgICAgICBCaW9tZUdlblJpdmVyLnNwYXduYWJsZUNyZWF0dXJlTGlzdC5hZGQoZHVja1NwYXduUml2ZXJCZWQpO1xuICAgICAgICAgICAgQmlvbWVHZW5CZWFjaC5zcGF3bmFibGVDcmVhdHVyZUxpc3QuYWRkKGR1Y2tTcGF3bkJlYWNoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoZ2xvYmFsVGhpcy5EZWJ1Z19tb2RlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJ0aGlzIGlzIGVudGl0eSBzaXplIG9uIHNlcnZlciAxOiBcIi5jb25jYXQoZW50aXR5U2l6ZTEsIFwiLCB0aGlzIGlzIGVudGl0eSBzaXplIDI6IFwiKS5jb25jYXQoZW50aXR5U2l6ZTIsIFwiLCBicmVlZCBpdGVtIFwiKS5jb25jYXQoZW50aXR5QnJlZWRJdGVtKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVudGl0eURyb3BJdGVtMiA9IGVudGl0eURyb3BJdGVtO1xuICAgICAgICB2YXIgaXRlbV9yZWYgPSBNb2RBUEkuaXRlbXNbZW50aXR5QnJlZWRJdGVtXS5nZXRSZWYoKTtcbiAgICAgICAgdmFyIGVudGl0eVN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoZW50aXR5Q2xhc3MsIGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gMjsgfSk7XG4gICAgICAgIHZhciBubWVfT0VudGl0eSA9IGZ1bmN0aW9uIG5tZV9PRW50aXR5KCR3b3JsZEluKSB7XG4gICAgICAgICAgICBlbnRpdHlTdXBlcih0aGlzLCAkd29ybGRJbik7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC5zZXRTaXplKGVudGl0eVNpemUxIHx8IDAuNCwgZW50aXR5U2l6ZTIgfHwgMC43KTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDAsIEFJVGFzayhcIkVudGl0eUFJU3dpbW1pbmdcIiwgMSkodGhpcykpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMSwgQUlUYXNrKFwiRW50aXR5QUlQYW5pY1wiLCAyKSh0aGlzLCAxLjkpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDIsIEFJVGFzayhcIkVudGl0eUFJTWF0ZVwiLCAyKSh0aGlzLCAxLjApKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMywgQUlUYXNrKFwiRW50aXR5QUlUZW1wdFwiLCA0KSh0aGlzLCAxLjUsIGl0ZW1fcmVmLCAwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkZhaWxlZCB0byBhZGQgRW50aXR5QUlUZW1wdCB0YXNrIGZvciBcIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIuIFRoaXMgbWF5IGJlIGR1ZSB0byBhbiBpbmNvcnJlY3QgaXRlbSByZWZlcmVuY2UsIFwiKS5jb25jYXQoaXRlbV9yZWYsIFwiLCAoIGl0ZW0gcmVmKSwgYW5kIFwiKS5jb25jYXQoaXRlbV9yZWYoKSwgXCIsIChpdGVtX3JlZigpKVwiKSk7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMywgQUlUYXNrKFwiRW50aXR5QUlUZW1wdFwiLCA0KSh0aGlzLCAxLjUsIGl0ZW1fcmVmKCksIDApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDQsIEFJVGFzayhcIkVudGl0eUFJRm9sbG93UGFyZW50XCIsIDIpKHRoaXMsIDEuMikpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNSwgQUlUYXNrKFwiRW50aXR5QUlXYW5kZXJcIiwgMikodGhpcywgMS4xKSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg2LCBBSVRhc2soXCJFbnRpdHlBSVdhdGNoQ2xvc2VzdFwiLCAzKSh0aGlzLCBNb2RBUEkudXRpbC5hc0NsYXNzKEVudGl0eVBsYXllci5jbGFzcyksIDYpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDcsIEFJVGFzayhcIkVudGl0eUFJTG9va0lkbGVcIiwgMSkodGhpcykpO1xuICAgICAgICB9O1xuICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhlbnRpdHlDbGFzcywgbm1lX09FbnRpdHkpO1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldEV5ZUhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlZC5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvcmlnaW5hbEFwcGx5RW50aXR5QXR0cmlidXRlc18xID0gbm1lX09FbnRpdHkucHJvdG90eXBlLiRhcHBseUVudGl0eUF0dHJpYnV0ZXM7XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kYXBwbHlFbnRpdHlBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICBvcmlnaW5hbEFwcGx5RW50aXR5QXR0cmlidXRlc18xLmFwcGx5KHRoaXMsIFtdKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgICAgIC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubWF4SGVhbHRoKVxuICAgICAgICAgICAgICAgIC5zZXRCYXNlVmFsdWUoNSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWRcbiAgICAgICAgICAgICAgICAuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1vdmVtZW50U3BlZWQpXG4gICAgICAgICAgICAgICAgLnNldEJhc2VWYWx1ZSgwLjI1KTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG9yaWdpbmFsTGl2aW5nVXBkYXRlXzEgPSBubWVfT0VudGl0eS5wcm90b3R5cGUuJG9uTGl2aW5nVXBkYXRlO1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJG9uTGl2aW5nVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICBvcmlnaW5hbExpdmluZ1VwZGF0ZV8xLmFwcGx5KHRoaXMsIFtdKTtcbiAgICAgICAgICAgIGlmICh0aGlzLndyYXBwZWQuaXNJbldhdGVyKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQubW90aW9uWSAqPSAwLjU7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkXG4gICAgICAgICAgICAgICAgICAgIC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZClcbiAgICAgICAgICAgICAgICAgICAgLnNldEJhc2VWYWx1ZSgxLjQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkXG4gICAgICAgICAgICAgICAgICAgIC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZClcbiAgICAgICAgICAgICAgICAgICAgLnNldEJhc2VWYWx1ZSgwLjI1KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXRMaXZpbmdTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBNb2RBUEkudXRpbC5zdHIoXCJtb2IuXCIgKyBlbnRpdHlJRCArIFwiLm1haW5fc291bmRcIik7XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0SHVydFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIGVudGl0eUlEICsgXCIubWFpbl9zb3VuZFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXREZWF0aFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIGVudGl0eUlEICsgXCIubWFpbl9zb3VuZFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRwbGF5U3RlcFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQucGxheVNvdW5kKE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIGVudGl0eUlEICsgXCIuc3RlcFwiKSwgMC4yLCAxKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXREcm9wSXRlbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBNb2RBUEkuaXRlbXNbZW50aXR5RHJvcEl0ZW1dLmdldFJlZigpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGNyZWF0ZUNoaWxkID0gZnVuY3Rpb24gKG90aGVyUGFyZW50KSB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IG5tZV9PRW50aXR5KChfYiA9IChfYSA9IHRoaXMud3JhcHBlZC53b3JsZE9iaikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldFJlZigpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBudWxsKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRpc0JyZWVkaW5nSXRlbSA9IGZ1bmN0aW9uIChpdGVtc3RhY2spIHtcbiAgICAgICAgICAgIHJldHVybiAoaXRlbXN0YWNrICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgaXRlbXN0YWNrLiRnZXRJdGVtKCkgPT09IE1vZEFQSS5pdGVtc1tlbnRpdHlCcmVlZEl0ZW1dLmdldFJlZigpKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gRU5EIENVU1RPTSBFTlRJVFlcbiAgICAgICAgLy8gU1RBUlQgQ1VTVE9NIE1PREVMXG4gICAgICAgIHZhciBtb2RlbENoaWNrZW5DbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY2xpZW50Lm1vZGVsLlwiLmNvbmNhdChlbnRpdHlNb2RlbCkpO1xuICAgICAgICB2YXIgbW9kZWxDaGlja2VuU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihtb2RlbENoaWNrZW5DbGFzcyk7IC8vd2hpbGUgc3VwZXIgaXNuJ3QgdXNlZCB3aGVuIGV4dGVuZGluZyB0aGlzIGNsYXNzLCBqYXZhIGltcGxpZXMgdGhlIGNhbGwuXG4gICAgICAgIHZhciBubWNtX09FbnRpdHlNb2RlbCA9IGZ1bmN0aW9uIG5tY21fT0VudGl0eU1vZGVsKCkge1xuICAgICAgICAgICAgbW9kZWxDaGlja2VuU3VwZXIodGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKG1vZGVsQ2hpY2tlbkNsYXNzLCBubWNtX09FbnRpdHlNb2RlbCk7XG4gICAgICAgIC8vIEVORCBDVVNUT00gTU9ERUxcbiAgICAgICAgLy8gU1RBUlQgQ1VTVE9NIFJFTkRFUkVSXG4gICAgICAgIHZhciByZW5kZXJDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY2xpZW50LnJlbmRlcmVyLmVudGl0eS5SZW5kZXJMaXZpbmdcIik7XG4gICAgICAgIHZhciByZW5kZXJTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKHJlbmRlckNsYXNzLCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDQ7IH0pO1xuICAgICAgICB2YXIgZHVja1RleHR1cmVzXzEgPSBSZXNvdXJjZUxvY2F0aW9uKE1vZEFQSS51dGlsLnN0cihcInRleHR1cmVzL2VudGl0eS9cIi5jb25jYXQoZW50aXR5SUQsIFwiLnBuZ1wiKSkpO1xuICAgICAgICB2YXIgbm1jcmVfUmVuZGVyT0VudGl0eSA9IGZ1bmN0aW9uIG5tY3JlX1JlbmRlck9FbnRpdHkocmVuZGVyTWFuYWdlciwgbW9kZWxCYXNlSW4sIHNoYWRvd1NpemVJbikge1xuICAgICAgICAgICAgcmVuZGVyU3VwZXIodGhpcywgcmVuZGVyTWFuYWdlciwgbW9kZWxCYXNlSW4sIHNoYWRvd1NpemVJbik7XG4gICAgICAgIH07XG4gICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKHJlbmRlckNsYXNzLCBubWNyZV9SZW5kZXJPRW50aXR5KTtcbiAgICAgICAgbm1jcmVfUmVuZGVyT0VudGl0eS5wcm90b3R5cGUuJGdldEVudGl0eVRleHR1cmUgPSBmdW5jdGlvbiAoZW50aXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gZHVja1RleHR1cmVzXzE7XG4gICAgICAgIH07XG4gICAgICAgIG5tY3JlX1JlbmRlck9FbnRpdHkucHJvdG90eXBlLiRoYW5kbGVSb3RhdGlvbkZsb2F0ID0gZnVuY3Rpb24gKGVudGl0eSwgcGFydGlhbFRpY2tzKSB7XG4gICAgICAgICAgICBlbnRpdHkgPSBNb2RBUEkudXRpbC53cmFwKGVudGl0eSk7XG4gICAgICAgICAgICBpZiAoIWVudGl0eS5vbkdyb3VuZCAmJiAhZW50aXR5LmlzSW5XYXRlcigpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7IC8vZmFsbGluZ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBJRCA9IE1vZEFQSS5rZXlnZW4uZW50aXR5KGVudGl0eUlEKTtcbiAgICAgICAgTW9kQVBJLnJlZmxlY3RcbiAgICAgICAgICAgIC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlMaXN0XCIpXG4gICAgICAgICAgICAuc3RhdGljTWV0aG9kcy5hZGRNYXBwaW5nMC5tZXRob2QoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIHtcbiAgICAgICAgICAgICRjcmVhdGVFbnRpdHk6IGZ1bmN0aW9uICgkd29ybGRJbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbm1lX09FbnRpdHkoJHdvcmxkSW4pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSwgTW9kQVBJLnV0aWwuc3RyKGVudGl0eUlELnRvVXBwZXJDYXNlKCkpLCBJRCwgZWdnQmFzZSB8fCAweDVlM2UyZCwgLy9lZ2cgYmFzZVxuICAgICAgICBlZ2dTcG90cyB8fCAweDI2OTE2NiAvL2VnZyBzcG90c1xuICAgICAgICApO1xuICAgICAgICB2YXIgU3Bhd25QbGFjZW1lbnRUeXBlID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkuRW50aXR5TGl2aW5nJFNwYXduUGxhY2VtZW50VHlwZVwiKS5zdGF0aWNWYXJpYWJsZXM7XG4gICAgICAgIHZhciBFTlRJVFlfUExBQ0VNRU5UUyA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkuRW50aXR5U3Bhd25QbGFjZW1lbnRSZWdpc3RyeVwiKS5zdGF0aWNWYXJpYWJsZXMuRU5USVRZX1BMQUNFTUVOVFMpO1xuICAgICAgICBFTlRJVFlfUExBQ0VNRU5UUy5wdXQoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIFNwYXduUGxhY2VtZW50VHlwZS5PTl9HUk9VTkQpO1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImJvb3RzdHJhcFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgU3Bhd25MaXN0RW50cnkgPSBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgICAgIC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZSRTcGF3bkxpc3RFbnRyeVwiKVxuICAgICAgICAgICAgICAgIC5jb25zdHJ1Y3RvcnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDQ7IH0pO1xuICAgICAgICAgICAgdmFyIEJpb21lR2VuU3dhbXAgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlXCIpXG4gICAgICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5zd2FtcGxhbmQpO1xuICAgICAgICAgICAgdmFyIEJpb21lR2VuUml2ZXIgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlXCIpXG4gICAgICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5yaXZlcik7XG4gICAgICAgICAgICB2YXIgQmlvbWVHZW5CZWFjaCA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZUdlbkJhc2VcIilcbiAgICAgICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLmJlYWNoKTtcbiAgICAgICAgICAgIHZhciBkdWNrU3Bhd25Td2FtcCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAyMiwgMywgNSk7XG4gICAgICAgICAgICB2YXIgZHVja1NwYXduUml2ZXJCZWQgPSBTcGF3bkxpc3RFbnRyeShNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgMTAsIDUsIDkpO1xuICAgICAgICAgICAgdmFyIGR1Y2tTcGF3bkJlYWNoID0gU3Bhd25MaXN0RW50cnkoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIDI0LCAyLCAzKTtcbiAgICAgICAgICAgIEJpb21lR2VuU3dhbXAuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25Td2FtcCk7XG4gICAgICAgICAgICBCaW9tZUdlblJpdmVyLnNwYXduYWJsZUNyZWF0dXJlTGlzdC5hZGQoZHVja1NwYXduUml2ZXJCZWQpO1xuICAgICAgICAgICAgQmlvbWVHZW5CZWFjaC5zcGF3bmFibGVDcmVhdHVyZUxpc3QuYWRkKGR1Y2tTcGF3bkJlYWNoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBPdmVuTURLX19kZWZpbmVFeGVjQ21kQXNHbG9iYWwoKSB7XG4gICAgdmFyIF9hO1xuICAgIC8vIEdldCBzZXJ2ZXIgbWV0aG9kIGZvciBkaWZmZXJlbnQgTWluZWNyYWZ0IHZlcnNpb25zXG4gICAgdmFyIGdldFNlcnZlciA9IChfYSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuc2VydmVyLk1pbmVjcmFmdFNlcnZlclwiKS5zdGF0aWNNZXRob2RzLmdldFNlcnZlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1ldGhvZDtcbiAgICAvLyBEZWZpbmUgZ2xvYmFsIGZ1bmN0aW9uXG4gICAgZ2xvYmFsVGhpcy5PdmVuTURLX19leGVjdXRlQ29tbWFuZEFzID1cbiAgICAgICAgZnVuY3Rpb24gT3Zlbk1ES19fZXhlY3V0ZUNvbW1hbmRBcygkY29tbWFuZHNlbmRlciwgY29tbWFuZCwgZmVlZGJhY2spIHtcbiAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSBnZXRTZXJ2ZXJcbiAgICAgICAgICAgICAgICA/IGdldFNlcnZlcigpIC8vIDEuOFxuICAgICAgICAgICAgICAgIDogTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5zZXJ2ZXIuTWluZWNyYWZ0U2VydmVyXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMuc2VydmVyOyAvLyAxLjEyXG4gICAgICAgICAgICBpZiAoIXNlcnZlcilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoZ2xvYmFsVGhpcy5EZWJ1Z19tb2RlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VydmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjb21tYW5kTWFuYWdlciA9IHNlcnZlci4kY29tbWFuZE1hbmFnZXI7XG4gICAgICAgICAgICAvLyBUZW1wb3JhcmlseSBvdmVycmlkZSBwZXJtaXNzaW9uc1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsQ2FuQ29tbWFuZCA9ICRjb21tYW5kc2VuZGVyLiRjYW5Db21tYW5kU2VuZGVyVXNlQ29tbWFuZDtcbiAgICAgICAgICAgICRjb21tYW5kc2VuZGVyLiRjYW5Db21tYW5kU2VuZGVyVXNlQ29tbWFuZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDE7IH07XG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxGZWVkYmFjayA9ICRjb21tYW5kc2VuZGVyLiRzZW5kQ29tbWFuZEZlZWRiYWNrO1xuICAgICAgICAgICAgJGNvbW1hbmRzZW5kZXIuJHNlbmRDb21tYW5kRmVlZGJhY2sgPSBmZWVkYmFjayA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDE7IH0gOiBmdW5jdGlvbiAoKSB7IHJldHVybiAwOyB9O1xuICAgICAgICAgICAgdmFyIG5vdGlmeU9wczAgPSBNb2RBUEkuaG9va3MubWV0aG9kcy5ubWNfQ29tbWFuZEJhc2Vfbm90aWZ5T3BlcmF0b3JzMDtcbiAgICAgICAgICAgIHZhciBub3RpZnlPcHMgPSBNb2RBUEkuaG9va3MubWV0aG9kcy5ubWNfQ29tbWFuZEJhc2Vfbm90aWZ5T3BlcmF0b3JzO1xuICAgICAgICAgICAgdmFyIGFkZENoYXRNc2cgPSAkY29tbWFuZHNlbmRlci4kYWRkQ2hhdE1lc3NhZ2U7XG4gICAgICAgICAgICBpZiAoIWZlZWRiYWNrKSB7XG4gICAgICAgICAgICAgICAgTW9kQVBJLmhvb2tzLm1ldGhvZHMubm1jX0NvbW1hbmRCYXNlX25vdGlmeU9wZXJhdG9yczAgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICAgICAgICAgTW9kQVBJLmhvb2tzLm1ldGhvZHMubm1jX0NvbW1hbmRCYXNlX25vdGlmeU9wZXJhdG9ycyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgICAgICAgICAkY29tbWFuZHNlbmRlci4kYWRkQ2hhdE1lc3NhZ2UgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbW1hbmRNYW5hZ2VyLiRleGVjdXRlQ29tbWFuZCgkY29tbWFuZHNlbmRlciwgTW9kQVBJLnV0aWwuc3RyKGNvbW1hbmQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFmZWVkYmFjaykge1xuICAgICAgICAgICAgICAgIE1vZEFQSS5ob29rcy5tZXRob2RzLm5tY19Db21tYW5kQmFzZV9ub3RpZnlPcGVyYXRvcnMwID0gbm90aWZ5T3BzMDtcbiAgICAgICAgICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5ubWNfQ29tbWFuZEJhc2Vfbm90aWZ5T3BlcmF0b3JzID0gbm90aWZ5T3BzO1xuICAgICAgICAgICAgICAgICRjb21tYW5kc2VuZGVyLiRhZGRDaGF0TWVzc2FnZSA9IGFkZENoYXRNc2c7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZXN0b3JlIG9yaWdpbmFsIHBlcm1pc3Npb25zIGFuZCBmZWVkYmFja1xuICAgICAgICAgICAgJGNvbW1hbmRzZW5kZXIuJGNhbkNvbW1hbmRTZW5kZXJVc2VDb21tYW5kID0gb3JpZ2luYWxDYW5Db21tYW5kO1xuICAgICAgICAgICAgJGNvbW1hbmRzZW5kZXIuJHNlbmRDb21tYW5kRmVlZGJhY2sgPSBvcmlnaW5hbEZlZWRiYWNrO1xuICAgICAgICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyT3Zlbk9yZVNlcnZlcihibG9ja19JRCwgdmllblNpemUsIHZpZW5Db3VudCwgbWluR2VuZXJhdGlvbkhlaWdodCwgbWF4R2VuZXJhdGlvbkhlaWdodCkge1xuICAgIHZhciBXb3JsZEdlbk1pbmVhYmxlID0gTW9kQVBJLnJlZmxlY3RcbiAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuZ2VuLmZlYXR1cmUuV29ybGRHZW5NaW5hYmxlXCIpXG4gICAgICAgIC5jb25zdHJ1Y3RvcnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDI7IH0pO1xuICAgIHZhciBCaW9tZURlY29yYXRvcl9kZWNvcmF0ZSA9IE1vZEFQSS51dGlsLmdldE1ldGhvZEZyb21QYWNrYWdlKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZURlY29yYXRvclwiLCBcImRlY29yYXRlXCIpO1xuICAgIHZhciBvbGREZWNvcmF0ZSA9IE1vZEFQSS5ob29rcy5tZXRob2RzW0Jpb21lRGVjb3JhdG9yX2RlY29yYXRlXTtcbiAgICBNb2RBUEkuaG9va3MubWV0aG9kc1tCaW9tZURlY29yYXRvcl9kZWNvcmF0ZV0gPSBmdW5jdGlvbiAoJHRoaXMsICR3b3JsZCwgJHJhbmRvbSwgJGJpb21lR2VuQmFzZSwgJGJsb2NrcG9zKSB7XG4gICAgICAgIGlmICghJHRoaXMuJGN1cnJlbnRXb3JsZCkge1xuICAgICAgICAgICAgJHRoaXNbXCIkT3Zlbk1ES19fXCIuY29uY2F0KGJsb2NrX0lELCBcIl9CbG9ja0dlblwiKV0gPSBXb3JsZEdlbk1pbmVhYmxlKE1vZEFQSS5ibG9ja3NbXCJcIi5jb25jYXQoYmxvY2tfSUQpXS5nZXRTdGF0ZUZyb21NZXRhKDApLmdldFJlZigpLCB2aWVuU2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9sZERlY29yYXRlLmFwcGx5KHRoaXMsIFtcbiAgICAgICAgICAgICR0aGlzLFxuICAgICAgICAgICAgJHdvcmxkLFxuICAgICAgICAgICAgJHJhbmRvbSxcbiAgICAgICAgICAgICRiaW9tZUdlbkJhc2UsXG4gICAgICAgICAgICAkYmxvY2twb3MsXG4gICAgICAgIF0pO1xuICAgIH07XG4gICAgY29uc29sZS5sb2coXCJDb29sIHJlZ2lzdGVyIFwiICsgYmxvY2tfSUQpO1xuICAgIHZhciBCaW9tZURlY29yYXRvcl9nZW5lcmF0ZU9yZXMgPSBNb2RBUEkudXRpbC5nZXRNZXRob2RGcm9tUGFja2FnZShcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVEZWNvcmF0b3JcIiwgXCJnZW5lcmF0ZU9yZXNcIik7XG4gICAgdmFyIG9sZEdlbmVyYXRlT3JlcyA9IE1vZEFQSS5ob29rcy5tZXRob2RzW0Jpb21lRGVjb3JhdG9yX2dlbmVyYXRlT3Jlc107XG4gICAgTW9kQVBJLmhvb2tzLm1ldGhvZHNbQmlvbWVEZWNvcmF0b3JfZ2VuZXJhdGVPcmVzXSA9IGZ1bmN0aW9uICgkdGhpcykge1xuICAgICAgICAkdGhpcy4kZ2VuU3RhbmRhcmRPcmUxKHZpZW5Db3VudCwgJHRoaXNbXCIkT3Zlbk1ES19fXCIuY29uY2F0KGJsb2NrX0lELCBcIl9CbG9ja0dlblwiKV0gfHwgbnVsbCwgbWluR2VuZXJhdGlvbkhlaWdodCwgbWF4R2VuZXJhdGlvbkhlaWdodCk7XG4gICAgICAgIHJldHVybiBvbGRHZW5lcmF0ZU9yZXMuYXBwbHkodGhpcywgWyR0aGlzXSk7XG4gICAgfTtcbn1cbiIsIi8qXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICAgIE1vZC50c1xuICAgIFxuICAgIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuaW1wb3J0IGRlZmF1bHRJY29uIGZyb20gXCJBU1NFVFMvZGVmYXVsdEljb24ucG5nXCI7XG52YXIgT01vZCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPTW9kKCkge1xuICAgIH1cbiAgICBPTW9kLmNvbmZpZyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBPTW9kLmluaXQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgT01vZC5wb3N0SW5pdCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBPTW9kLnRpdGxlID0gXCJEZWZhdWx0IE5hbWVcIjtcbiAgICBPTW9kLnZlcnNpb24gPSBcIlwiO1xuICAgIE9Nb2QuZGVzY3JpcHRpb24gPSBcIkRlZmF1bHQgT3Zlbk1ESyBEZXNjcmlwdGlvbi4gU2V0ICdkZXNjcmlwdGlvbicgaW4geW91ciBPTW9kIGNsYXNzIVwiO1xuICAgIE9Nb2QuY3JlZGl0cyA9IFwiTm9uZSBHaXZlblwiO1xuICAgIE9Nb2QuaWNvbiA9IGRlZmF1bHRJY29uO1xuICAgIE9Nb2QuYWNjZXB0ZWRNaW5lY3JhZnRWZXJzaW9ucyA9IG51bGw7XG4gICAgT01vZC5hY2NlcHRlZEVhZ2xlclVwZGF0ZXMgPSBudWxsO1xuICAgIE9Nb2QuYWNjZXB0ZWRFRlZlcnNpb25zID0gbnVsbDtcbiAgICBPTW9kLmFjY2VwdGVkRUZGbGF2b3VyID0gXCJpbmplY3RvclwiO1xuICAgIE9Nb2QuY2xpZW50U2lkZU9ubHkgPSBmYWxzZTtcbiAgICBPTW9kLnNlcnZlclNpZGVPbmx5ID0gZmFsc2U7XG4gICAgT01vZC5vbmx5XzFfMTJfMiA9IGZhbHNlO1xuICAgIE9Nb2QuRGVidWdfbW9kZSA9IGZhbHNlO1xuICAgIHJldHVybiBPTW9kO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE9Nb2Q7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuLypcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICBPQmxvY2sudHNcblxuICBDb3B5cmlnaHQgMjAyNSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG52YXIgT0Jsb2NrID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9CbG9jayhibG9ja05hbWUsIGJsb2NrSUQsIHRleHR1cmUsIG9uQnJlYWssIGRyb3BwZWRJdGVtLCBjdXN0b21Nb2RlbCkge1xuICAgICAgICB0aGlzLmJsb2NrTmFtZSA9IGJsb2NrTmFtZTtcbiAgICAgICAgdGhpcy5ibG9ja0lEID0gYmxvY2tJRDtcbiAgICAgICAgdGhpcy5ibG9ja1RleHR1cmUgPSB0ZXh0dXJlO1xuICAgICAgICB0aGlzLm9uQnJlYWsgPSBvbkJyZWFrO1xuICAgICAgICB0aGlzLmRyb3BwZWRJdGVtID0gZHJvcHBlZEl0ZW07XG4gICAgICAgIHRoaXMuY3VzdG9tTW9kZWwgPSBjdXN0b21Nb2RlbDtcbiAgICB9XG4gICAgT0Jsb2NrLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIEJsb2NrQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpO1xuICAgICAgICB2YXIgSXRlbUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIik7XG4gICAgICAgIHZhciBnZXREcm9wcGVkSXRlbSA9IEJsb2NrQ2xhc3MubWV0aG9kcy5nZXRJdGVtRHJvcHBlZC5tZXRob2Q7XG4gICAgICAgIHZhciBxdWFudGl0eURyb3BwZWQgPSBCbG9ja0NsYXNzLm1ldGhvZHMucXVhbnRpdHlEcm9wcGVkLm1ldGhvZDtcbiAgICAgICAgdmFyIGNyZWF0aXZlVGFiO1xuICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjcmVhdGl2ZVRhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy50YWJCbG9jaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIGNyZWF0aXZlVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLkJVSUxESU5HX0JMT0NLUztcbiAgICAgICAgfVxuICAgICAgICB2YXIgYmxvY2tTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKEJsb2NrQ2xhc3MsIGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZm4ubGVuZ3RoID09PSAyOyB9KTtcbiAgICAgICAgdmFyIGJyZWFrQmxvY2tNZXRob2QgPSBCbG9ja0NsYXNzLm1ldGhvZHMuYnJlYWtCbG9jay5tZXRob2Q7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gbm1iX09ibG9jaygpIHtcbiAgICAgICAgICAgIGJsb2NrU3VwZXIodGhpcywgTW9kQVBJLm1hdGVyaWFscy5yb2NrLmdldFJlZigpKTtcbiAgICAgICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRkZWZhdWx0QmxvY2tTdGF0ZSA9IHRoaXMuJGJsb2NrU3RhdGUuJGdldEJhc2VTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kc2V0Q3JlYXRpdmVUYWIoY3JlYXRpdmVUYWIpO1xuICAgICAgICB9XG4gICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKEJsb2NrQ2xhc3MsIG5tYl9PYmxvY2spO1xuICAgICAgICBubWJfT2Jsb2NrLnByb3RvdHlwZS4kYnJlYWtCbG9jayA9IGZ1bmN0aW9uICgkd29ybGQsICRibG9ja3BvcywgJGJsb2Nrc3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBicmVha0Jsb2NrTWV0aG9kKHRoaXMsICR3b3JsZCwgJGJsb2NrcG9zLCAkYmxvY2tzdGF0ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciAkJG9uQmxvY2tEZXN0cm95ZWRCeVBsYXllck1ldGhvZCA9IEJsb2NrQ2xhc3MubWV0aG9kcy5vbkJsb2NrRGVzdHJveWVkQnlQbGF5ZXIubWV0aG9kO1xuICAgICAgICBubWJfT2Jsb2NrLnByb3RvdHlwZS4kb25CbG9ja0Rlc3Ryb3llZEJ5UGxheWVyID0gZnVuY3Rpb24gKCQkd29ybGQsICQkYmxvY2twb3MsICQkYmxvY2tzdGF0ZSkge1xuICAgICAgICAgICAgdmFyICQkd29ybGQsICQkYmxvY2twb3MsICQkYmxvY2tzdGF0ZTtcbiAgICAgICAgICAgIHNlbGYub25CcmVhay5jYWxsKCQkd29ybGQsICQkYmxvY2twb3MsICQkYmxvY2tzdGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gJCRvbkJsb2NrRGVzdHJveWVkQnlQbGF5ZXJNZXRob2QodGhpcywgJCR3b3JsZCwgJCRibG9ja3BvcywgJCRibG9ja3N0YXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHNlbGYuZHJvcHBlZEl0ZW0pIHtcbiAgICAgICAgICAgIG5tYl9PYmxvY2sucHJvdG90eXBlLiRnZXRJdGVtRHJvcHBlZCA9IGZ1bmN0aW9uICgkJGJsb2Nrc3RhdGUsICQkcmFuZG9tLCBfX2VmYjJfYXJnX2ZvcnR1cmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgX19lZmIyX2FyZ19mb3J0dXJlO1xuICAgICAgICAgICAgICAgIHJldHVybiBNb2RBUEkuaXRlbXNbc2VsZi5kcm9wcGVkSXRlbV0uZ2V0UmVmKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbnRlcm5hbFJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1c3RvbV9ibG9jaztcbiAgICAgICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBuZXcgbm1iX09ibG9jaygpXG4gICAgICAgICAgICAgICAgICAgIC4kc2V0SGFyZG5lc3MoMy4wKVxuICAgICAgICAgICAgICAgICAgICAuJHNldFN0ZXBTb3VuZChCbG9ja0NsYXNzLnN0YXRpY1ZhcmlhYmxlcy5zb3VuZFR5cGVQaXN0b24pXG4gICAgICAgICAgICAgICAgICAgIC4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihfdGhpcy5ibG9ja0lEKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBuZXcgbm1iX09ibG9jaygpXG4gICAgICAgICAgICAgICAgICAgIC4kc2V0SGFyZG5lc3MoLTEuMClcbiAgICAgICAgICAgICAgICAgICAgLiRzZXRTb3VuZFR5cGUoTW9kQVBJLmJsb2NrU291bmRzLlBMQU5ULmdldFJlZigpKVxuICAgICAgICAgICAgICAgICAgICAuJHNldFVubG9jYWxpemVkTmFtZShNb2RBUEkudXRpbC5zdHIoX3RoaXMuYmxvY2tJRCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQmxvY2tDbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVyQmxvY2swLm1ldGhvZChNb2RBUEkua2V5Z2VuLmJsb2NrKF90aGlzLmJsb2NrSUQpLCBNb2RBUEkudXRpbC5zdHIoX3RoaXMuYmxvY2tJRCksIGN1c3RvbV9ibG9jayk7XG4gICAgICAgICAgICBJdGVtQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3Rlckl0ZW1CbG9jazAubWV0aG9kKGN1c3RvbV9ibG9jayk7XG4gICAgICAgICAgICBfdGhpcy5maXh1cEJsb2NrSWRzKCk7XG4gICAgICAgICAgICBNb2RBUEkuYmxvY2tzW190aGlzLmJsb2NrSURdID0gY3VzdG9tX2Jsb2NrO1xuICAgICAgICAgICAgX3RoaXMuYmxvY2tJbnN0YW5jZSA9IGN1c3RvbV9ibG9jaztcbiAgICAgICAgICAgIG5ldyBnbG9iYWxUaGlzLk92ZW5NREtMb2dnZXIoXCJSZWdpc3RlcmVkIGJsb2NrIG9uIGNsaWVudDogXCIgKyBfdGhpcy5ibG9ja0lEKTtcbiAgICAgICAgICAgIG5ldyBnbG9iYWxUaGlzLk92ZW5NREtMb2dnZXIoY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgIHJldHVybiBjdXN0b21fYmxvY2s7XG4gICAgICAgIH07XG4gICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIGlmIChNb2RBUEkubWF0ZXJpYWxzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJvcHBlZEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1vZEFQSS5pdGVtc1t0aGlzLmRyb3BwZWRJdGVtXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGludGVybmFsUmVnaXN0ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsUmVnaXN0ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJuYWxSZWdpc3RlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsUmVnaXN0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgaWYgKE1vZEFQSS5ibG9ja3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChuZXcgbm1iX09ibG9jaygpKS4kc2V0SGFyZG5lc3MoLTEuMCkuJHNldFNvdW5kVHlwZShNb2RBUEkuYmxvY2tTb3VuZHMuUExBTlQuZ2V0UmVmKCkpLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKHRoaXMuYmxvY2tJRCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgT0Jsb2NrLnByb3RvdHlwZS5maXh1cEJsb2NrSWRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYmxvY2tSZWdpc3RyeSA9IE1vZEFQSS51dGlsXG4gICAgICAgICAgICAud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpLnN0YXRpY1ZhcmlhYmxlc1xuICAgICAgICAgICAgLmJsb2NrUmVnaXN0cnkpXG4gICAgICAgICAgICAuZ2V0Q29ycmVjdGl2ZSgpO1xuICAgICAgICB2YXIgQkxPQ0tfU1RBVEVfSURTID0gTW9kQVBJLnV0aWxcbiAgICAgICAgICAgIC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIikuc3RhdGljVmFyaWFibGVzXG4gICAgICAgICAgICAuQkxPQ0tfU1RBVEVfSURTKVxuICAgICAgICAgICAgLmdldENvcnJlY3RpdmUoKTtcbiAgICAgICAgYmxvY2tSZWdpc3RyeS5yZWdpc3RyeU9iamVjdHMuaGFzaFRhYmxlS1RvVi5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGJsb2NrXzEgPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsaWRTdGF0ZXMgPSBibG9ja18xLmdldEJsb2NrU3RhdGUoKS5nZXRWYWxpZFN0YXRlcygpO1xuICAgICAgICAgICAgICAgIHZhciBzdGF0ZUFycmF5ID0gdmFsaWRTdGF0ZXMuYXJyYXkgfHwgW3ZhbGlkU3RhdGVzLmVsZW1lbnRdO1xuICAgICAgICAgICAgICAgIHN0YXRlQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaWJsb2Nrc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoYmxvY2tSZWdpc3RyeS5nZXRJREZvck9iamVjdChibG9ja18xLmdldFJlZigpKSA8PCA0KSB8XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja18xLmdldE1ldGFGcm9tU3RhdGUoaWJsb2Nrc3RhdGUuZ2V0UmVmKCkpO1xuICAgICAgICAgICAgICAgICAgICBCTE9DS19TVEFURV9JRFMucHV0KGlibG9ja3N0YXRlLmdldFJlZigpLCBpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPQmxvY2sucHJvdG90eXBlLnJlZ2lzdGVyQmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXN0b21fYmxvY2ssIG5tYl9PQmxvY2ssIGl0ZW1DbGFzcywgYmxvY2tDbGFzcywgc2VsZjtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBuZXcgT0Jsb2NrKHRoaXMuYmxvY2tOYW1lLCB0aGlzLmJsb2NrSUQsIHRoaXMuYmxvY2tUZXh0dXJlLCB0aGlzLm9uQnJlYWssIHRoaXMuZHJvcHBlZEl0ZW0sIHRoaXMuY3VzdG9tTW9kZWwpLnJlZ2lzdGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBubWJfT0Jsb2NrID0gbmV3IE9CbG9jayh0aGlzLmJsb2NrTmFtZSwgdGhpcy5ibG9ja0lELCB0aGlzLmJsb2NrVGV4dHVyZSwgdGhpcy5vbkJyZWFrLCB0aGlzLmRyb3BwZWRJdGVtLCB0aGlzLmN1c3RvbU1vZGVsKS5yZWdpc3RlcigpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIik7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbV9ibG9jayA9IG5tYl9PQmxvY2s7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3RlckJsb2NrMC5tZXRob2QoTW9kQVBJLmtleWdlbi5ibG9jayh0aGlzLmJsb2NrSUQpLCBNb2RBUEkudXRpbC5zdHIodGhpcy5ibG9ja0lEKSwgY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJJdGVtQmxvY2swLm1ldGhvZChjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgICAgICAgICBuZXcgZ2xvYmFsVGhpcy5PdmVuTURLTG9nZ2VyKGN1c3RvbV9ibG9jayB8fCBcIkJsb2NrIHJlZ2lzdHJhdGlvbiBmYWlsZWRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckJsb2NrKFxcXCJcIi5jb25jYXQodGhpcy5ibG9ja0lELCBcIlxcXCIsIFwiKS5jb25jYXQodGhpcy5vbkJyZWFrLCBcIiwgXFxcIlwiKS5jb25jYXQodGhpcy5kcm9wcGVkSXRlbSwgXCJcXFwiKTtcIikpO1xuICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBidWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3Npbms6cmVnaXN0ZXJpdGVtc1wiLCBmdW5jdGlvbiAocmVuZGVySXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckl0ZW0ucmVnaXN0ZXJCbG9jayhjdXN0b21fYmxvY2ssIE1vZEFQSS51dGlsLnN0cihzZWxmLmJsb2NrSUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLkwxME4uc2V0KFwidGlsZS5cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5uYW1lXCIpLCBzZWxmLmJsb2NrTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgZ2xvYmFsVGhpcy5PdmVuTURLTG9nZ2VyKFwiU2V0IGxvY2FsaXphdGlvbiBmb3IgYmxvY2sgXCIuY29uY2F0KHNlbGYuYmxvY2tJRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxmLmN1c3RvbU1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9ibG9jay9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogXCJibG9jay9jdWJlX2FsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsOiBcImJsb2Nrcy9cIi5jb25jYXQoc2VsZi5ibG9ja0lEKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvbW9kZWxzL2Jsb2NrL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLmpzb25cIiksIHNlbGYuY3VzdG9tTW9kZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9pdGVtL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IFwiYmxvY2svXCIuY29uY2F0KHNlbGYuYmxvY2tJRCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlyZHBlcnNvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRpb246IFsxMCwgLTQ1LCAxNzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IFswLCAxLjUsIC0yLjc1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiBbMC4zNzUsIDAuMzc1LCAwLjM3NV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9ibG9ja3N0YXRlcy9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHNlbGYuYmxvY2tJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHNlbGYuYmxvY2tUZXh0dXJlKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9ibG9ja3MvXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIucG5nXCIpLCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBidWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rOnJlZ2lzdGVyaXRlbXNcIiwgZnVuY3Rpb24gKHJlbmRlckl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgZ2xvYmFsVGhpcy5PdmVuTURLTG9nZ2VyKFwiY29vbCByZWdpc3RlciBibG9ja1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgZ2xvYmFsVGhpcy5PdmVuTURLTG9nZ2VyKGN1c3RvbV9ibG9jayB8fCBcIkJsb2NrIHJlZ2lzdHJhdGlvbiBmYWlsZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVySXRlbS5yZWdpc3RlckJsb2NrKGN1c3RvbV9ibG9jaywgTW9kQVBJLnV0aWwuc3RyKF90aGlzLmJsb2NrSUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLkwxME4uc2V0KFwidGlsZS5cIiArIHRoaXMuYmxvY2tJRCArIFwiLm5hbWVcIiwgdGhpcy5ibG9ja05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IGdsb2JhbFRoaXMuT3Zlbk1ES0xvZ2dlcihcIlNldCBsb2NhbGl6YXRpb24gZm9yIGJsb2NrIFwiLmNvbmNhdChzZWxmLmJsb2NrSUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBnbG9iYWxUaGlzLk92ZW5NREtMb2dnZXIoY3VzdG9tX2Jsb2NrIHx8IFwiQmxvY2sgcmVnaXN0cmF0aW9uIGZhaWxlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5jdXN0b21Nb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9tb2RlbHMvYmxvY2svXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmVudFwiOiBcImJsb2NrL2N1YmVfYWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dHVyZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbGxcIjogXCJibG9ja3MvXCIuY29uY2F0KHNlbGYuYmxvY2tJRClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9tb2RlbHMvYmxvY2svXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIuanNvblwiKSwgc2VsZi5jdXN0b21Nb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvbW9kZWxzL2l0ZW0vXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyZW50XCI6IFwiYmxvY2svXCIuY29uY2F0KHNlbGYuYmxvY2tJRClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9ibG9ja3N0YXRlcy9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YXJpYW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm9ybWFsXCI6IHsgXCJtb2RlbFwiOiBcIlwiLmNvbmNhdCh0aGlzLmJsb2NrSUQpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChzZWxmLmJsb2NrVGV4dHVyZSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvdGV4dHVyZXMvYmxvY2tzL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLnBuZ1wiKSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJCbG9jayhcXFwiXCIuY29uY2F0KHRoaXMuYmxvY2tJRCwgXCJcXFwiLCBcIikuY29uY2F0KHRoaXMub25CcmVhaywgXCIpO1wiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYmxvY2tzW3RoaXMuYmxvY2tJRF0gPSBjdXN0b21fYmxvY2s7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIE9CbG9jaztcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBPQmxvY2s7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIE9FbnRpdHkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT0VudGl0eShlbnRpdHlOYW1lLCBlbnRpdHlJRCkge1xuICAgICAgICB0aGlzLm1heEhlYWx0aCA9IDA7XG4gICAgICAgIHRoaXMuYnJlZWRhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW50aXR5TmFtZSA9IGVudGl0eU5hbWU7XG4gICAgICAgIHRoaXMuZW50aXR5SUQgPSBlbnRpdHlJRDtcbiAgICB9XG4gICAgT0VudGl0eS5wcm90b3R5cGUud2FpdEZvclJlbmRlck1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlcywgcmVqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBjaGVjaygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoTW9kQVBJLm1jLnJlbmRlck1hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrLCAxIC8gMjApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9FbnRpdHkucHJvdG90eXBlLnNldFRleHR1cmUgPSBmdW5jdGlvbiAodGV4dHVyZSkge1xuICAgICAgICB0aGlzLmVudGl0eVRleHR1cmUgPSB0ZXh0dXJlO1xuICAgIH07XG4gICAgT0VudGl0eS5wcm90b3R5cGUuc2V0TW9kZWwgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlNb2RlbCA9IG1vZGVsO1xuICAgIH07XG4gICAgT0VudGl0eS5wcm90b3R5cGUuY3JlYXRlU3Bhd25FZ2cgPSBmdW5jdGlvbiAoZWdnQmFzZSwgZWdnU3BvdHMpIHtcbiAgICAgICAgbmV3IGdsb2JhbFRoaXMuT3Zlbk1ES0xvZ2dlcigpO1xuICAgIH07XG4gICAgT0VudGl0eS5wcm90b3R5cGUubWFrZUJyZWVkYWJsZSA9IGZ1bmN0aW9uIChpdGVtLCBkZWxheSkge1xuICAgICAgICB0aGlzLmJyZWVkYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZW50aXR5QnJlZWRJdGVtID0gaXRlbTtcbiAgICB9O1xuICAgIC8vIHdlIG5lZWQgdG8gYWRkIGxvb3QgdGFibGVzLCBhbmQgdGhpcyB3aWxsIGJlIGNoYW5nZWQgbmV4dCBjb21taXRcbiAgICBPRW50aXR5LnByb3RvdHlwZS5hZGREcm9wSXRlbSA9IGZ1bmN0aW9uIChpdGVtLCBtaW4sIG1heCkge1xuICAgICAgICB0aGlzLmVudGl0eURyb3BJdGVtID0gaXRlbTtcbiAgICB9O1xuICAgIE9FbnRpdHkucHJvdG90eXBlLnNldEhlYWx0aCA9IGZ1bmN0aW9uIChoZWFsdGgpIHtcbiAgICAgICAgdGhpcy5tYXhIZWFsdGggPSBoZWFsdGg7XG4gICAgfTtcbiAgICBPRW50aXR5LnByb3RvdHlwZS5yZWdpc3RlckVudGl0eUNsaWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPRW50aXR5cyBhcmUgc3RpbGwgaW4gZGV2ZWxvcG1lbnQsIGV4cGVjdCBidWdzIGFuZCBpc3N1ZXNcIik7XG4gICAgICAgIC8vcmV0dXJuO1xuICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5qbF9TdHJpbmdfZm9ybWF0ID1cbiAgICAgICAgICAgIE1vZEFQSS5ob29rcy5tZXRob2RzLm5sZXZfSFN0cmluZ19mb3JtYXQ7IC8vdGVtcG9yYXJ5IHRoaW5nIHRvIGZpeCBhbiBpc3N1ZSBpbiBlYWdsZXJjcmFmdFxuICAgICAgICAvLyBVdGlsc1xuICAgICAgICBmdW5jdGlvbiBBSVRhc2sobmFtZSwgbGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9kQVBJLnJlZmxlY3RcbiAgICAgICAgICAgICAgICAuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkuYWkuXCIgKyBuYW1lKVxuICAgICAgICAgICAgICAgIC5jb25zdHJ1Y3RvcnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IGxlbmd0aDsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIFJlc291cmNlTG9jYXRpb24gPSBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgLmdldENsYXNzQnlOYW1lKFwiUmVzb3VyY2VMb2NhdGlvblwiKVxuICAgICAgICAgICAgLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gMTsgfSk7XG4gICAgICAgIHZhciBFbnRpdHlQbGF5ZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkVudGl0eVBsYXllclwiKTtcbiAgICAgICAgdmFyIEdsU3RhdGVNYW5hZ2VyID0gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC52YWx1ZXMoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJHbFN0YXRlTWFuYWdlclwiKS5zdGF0aWNNZXRob2RzKS5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIFt4Lm1ldGhvZE5hbWVTaG9ydCwgeC5tZXRob2RdOyB9KSk7XG4gICAgICAgIHZhciBTaGFyZWRNb25zdGVyQXR0cmlidXRlcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXNcIikuc3RhdGljVmFyaWFibGVzO1xuICAgICAgICB2YXIgZW50aXR5QnJlZWRJdGVtMiA9IHRoaXMuZW50aXR5QnJlZWRJdGVtO1xuICAgICAgICB2YXIgZW50aXR5RHJvcEl0ZW0yID0gdGhpcy5lbnRpdHlEcm9wSXRlbTtcbiAgICAgICAgLy8gU1RBUlQgQ1VTVE9NIEVOVElUWVxuICAgICAgICB2YXIgZW50aXR5U2l6ZTE7IC8vIERlZmF1bHQgc2l6ZSBmb3IgbW9zdCBlbnRpdGllc1xuICAgICAgICB2YXIgZW50aXR5U2l6ZTI7XG4gICAgICAgIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsQ2hpY2tlblwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuNDsgLy8gQ2hpY2tlblxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbENvd1wiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuOTsgLy8gQ293XG4gICAgICAgICAgICBlbnRpdHlTaXplMiA9IDEuNDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsTW9vc2hyb29tXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMC45OyAvLyBNb29zaHJvb21cbiAgICAgICAgICAgIGVudGl0eVNpemUyID0gMS40O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZW50aXR5TW9kZWwgPT09IFwiTW9kZWxQaWdcIikge1xuICAgICAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjk7IC8vIFBpZ1xuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFNoZWVwXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMC45OyAvLyBTaGVlcFxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAxLjM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbEhvcnNlXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMS4zOTY1OyAvLyBIb3JzZVxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAxLjY7IC8vIEhlaWdodCBjYW4gdmFyeSBzbGlnaHRseVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZW50aXR5TW9kZWwgPT09IFwiTW9kZWxSYWJiaXRcIikge1xuICAgICAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjQ7IC8vIFJhYmJpdFxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFNxdWlkXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMC44OyAvLyBTcXVpZFxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbEJhdFwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuNTsgLy8gQmF0XG4gICAgICAgICAgICBlbnRpdHlTaXplMiA9IDAuOTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsT2NlbG90XCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMC42OyAvLyBPY2Vsb3QgKHdpbGQpXG4gICAgICAgICAgICBlbnRpdHlTaXplMiA9IDAuNztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsV29sZlwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuNjsgLy8gV29sZlxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjg1O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZW50aXR5TW9kZWwgPT09IFwiTW9kZWxWaWxsYWdlclwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuNjsgLy8gVmlsbGFnZXJcbiAgICAgICAgICAgIGVudGl0eVNpemUyID0gMS45NTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsSXJvbkdvbGVtXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMS40OyAvLyBJcm9uIEdvbGVtXG4gICAgICAgICAgICBlbnRpdHlTaXplMiA9IDIuOTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsU25vd21hblwiIHx8XG4gICAgICAgICAgICB0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsU25vd0dvbGVtXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMC43OyAvLyBTbm93IEdvbGVtXG4gICAgICAgICAgICBlbnRpdHlTaXplMiA9IDEuOTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW50aXR5Q2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5wYXNzaXZlLkVudGl0eUFuaW1hbFwiKTtcbiAgICAgICAgdmFyIGVudGl0eVN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoZW50aXR5Q2xhc3MsIGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gMjsgfSk7XG4gICAgICAgIGlmIChnbG9iYWxUaGlzLkRlYnVnX21vZGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcInRoaXMgaXMgZW50aXR5IHNpemUgMTogXCIuY29uY2F0KGVudGl0eVNpemUxLCBcIiwgdGhpcyBpcyBlbnRpdHkgc2l6ZSAyOiBcIikuY29uY2F0KGVudGl0eVNpemUyLCBcIiwgb2ggdGhlIGJyZWVkaXRlbSBcIikuY29uY2F0KGVudGl0eUJyZWVkSXRlbTIsIFwiLCBhbmQgZHJvcEl0ZW0gXCIpLmNvbmNhdChlbnRpdHlEcm9wSXRlbTIpKTtcbiAgICAgICAgfVxuICAgICAgICA7XG4gICAgICAgIHZhciBlbnRpdHlCcmVlZEl0ZW0yID0gdGhpcy5lbnRpdHlCcmVlZEl0ZW07XG4gICAgICAgIHZhciBlbnRpdHlEcm9wSXRlbTIgPSB0aGlzLmVudGl0eURyb3BJdGVtO1xuICAgICAgICB2YXIgaXRlbV9yZWYgPSBNb2RBUEkuaXRlbXNbZW50aXR5QnJlZWRJdGVtMl0uZ2V0UmVmKCk7XG4gICAgICAgIHZhciBleHRyYV90YXNrcyA9IHRoaXMuZXh0cmFfdGFza3MgfHwgW107XG4gICAgICAgIHZhciBubWVfT0VudGl0eSA9IGZ1bmN0aW9uIG5tZV9PRW50aXR5KCR3b3JsZEluKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgZW50aXR5U3VwZXIodGhpcywgJHdvcmxkSW4pO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQuc2V0U2l6ZShlbnRpdHlTaXplMSB8fCAwLjQsIGVudGl0eVNpemUyIHx8IDAuNyk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygwLCBBSVRhc2soXCJFbnRpdHlBSVN3aW1taW5nXCIsIDEpKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDEsIEFJVGFzayhcIkVudGl0eUFJUGFuaWNcIiwgMikodGhpcywgMS45KSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygyLCBBSVRhc2soXCJFbnRpdHlBSU1hdGVcIiwgMikodGhpcywgMS4wKSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDMsIEFJVGFzayhcIkVudGl0eUFJVGVtcHRcIiwgNCkodGhpcywgMS41LCBpdGVtX3JlZiwgMCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJGYWlsZWQgdG8gYWRkIEVudGl0eUFJVGVtcHQgdGFzayBmb3IgXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiLiBUaGlzIG1heSBiZSBkdWUgdG8gYW4gaW5jb3JyZWN0IGl0ZW0gcmVmZXJlbmNlLCBcIikuY29uY2F0KGl0ZW1fcmVmLCBcIiwgKCBpdGVtIHJlZiksIGFuZCBcIikuY29uY2F0KGl0ZW1fcmVmKCksIFwiLCAoaXRlbV9yZWYoKSlcIikpO1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDMsIEFJVGFzayhcIkVudGl0eUFJVGVtcHRcIiwgNCkodGhpcywgMS41LCBpdGVtX3JlZigpLCAwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg0LCBBSVRhc2soXCJFbnRpdHlBSUZvbGxvd1BhcmVudFwiLCAyKSh0aGlzLCAxLjIpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDUsIEFJVGFzayhcIkVudGl0eUFJV2FuZGVyXCIsIDIpKHRoaXMsIDEuMSkpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNiwgQUlUYXNrKFwiRW50aXR5QUlXYXRjaENsb3Nlc3RcIiwgMykodGhpcywgTW9kQVBJLnV0aWwuYXNDbGFzcyhFbnRpdHlQbGF5ZXIuY2xhc3MpLCA2KSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg3LCBBSVRhc2soXCJFbnRpdHlBSUxvb2tJZGxlXCIsIDEpKHRoaXMpKTtcbiAgICAgICAgICAgIGV4dHJhX3Rhc2tzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50KF90aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRmFpbGVkIHRvIGFkZCBleHRyYSB0YXNrIGZvciBcIi5jb25jYXQoX3RoaXMuZW50aXR5SUQsIFwiLiBUaGlzIG1heSBiZSBkdWUgdG8gYW4gaW5jb3JyZWN0IHRhc2sgZnVuY3Rpb24sIFwiKS5jb25jYXQoZWxlbWVudCwgXCIsIG9yIHRoZSB0YXNrIGZ1bmN0aW9uIG5vdCBiZWluZyBjb21wYXRpYmxlIHdpdGggdGhlIGVudGl0eS5cIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhlbnRpdHlDbGFzcywgbm1lX09FbnRpdHkpO1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldEV5ZUhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlZC5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvcmlnaW5hbEFwcGx5RW50aXR5QXR0cmlidXRlcyA9IG5tZV9PRW50aXR5LnByb3RvdHlwZS4kYXBwbHlFbnRpdHlBdHRyaWJ1dGVzO1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGFwcGx5RW50aXR5QXR0cmlidXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgb3JpZ2luYWxBcHBseUVudGl0eUF0dHJpYnV0ZXMuYXBwbHkodGhpcywgW10pO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkXG4gICAgICAgICAgICAgICAgLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tYXhIZWFsdGgpXG4gICAgICAgICAgICAgICAgLnNldEJhc2VWYWx1ZSg1KTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgICAgIC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZClcbiAgICAgICAgICAgICAgICAuc2V0QmFzZVZhbHVlKDAuMjUpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgb3JpZ2luYWxMaXZpbmdVcGRhdGUgPSBubWVfT0VudGl0eS5wcm90b3R5cGUuJG9uTGl2aW5nVXBkYXRlO1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJG9uTGl2aW5nVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICBvcmlnaW5hbExpdmluZ1VwZGF0ZS5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgICAgICBpZiAodGhpcy53cmFwcGVkLmlzSW5XYXRlcigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLm1vdGlvblkgKj0gMC41O1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgICAgICAgICAuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1vdmVtZW50U3BlZWQpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRCYXNlVmFsdWUoMS40KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgICAgICAgICAuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1vdmVtZW50U3BlZWQpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRCYXNlVmFsdWUoMC4yNSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0TGl2aW5nU291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgdGhpcy5lbnRpdHlJRCArIFwiLm1haW5fc291bmRcIik7XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0SHVydFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIHRoaXMuZW50aXR5SUQgKyBcIi5tYWluX3NvdW5kXCIpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldERlYXRoU291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgdGhpcy5lbnRpdHlJRCArIFwiLm1haW5fc291bmRcIik7XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kcGxheVN0ZXBTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnBsYXlTb3VuZChNb2RBUEkudXRpbC5zdHIoXCJtb2IuXCIgKyB0aGlzLmVudGl0eUlEICsgXCIuc3RlcFwiKSwgMC4yLCAxKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXREcm9wSXRlbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBNb2RBUEkuaXRlbXNbdGhpcy5lbnRpdHlEcm9wSXRlbV0uZ2V0UmVmKCk7XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kY3JlYXRlQ2hpbGQgPSBmdW5jdGlvbiAob3RoZXJQYXJlbnQpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgbm1lX09FbnRpdHkoKF9iID0gKF9hID0gdGhpcy53cmFwcGVkLndvcmxkT2JqKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0UmVmKCkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG51bGwpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGlzQnJlZWRpbmdJdGVtID0gZnVuY3Rpb24gKGl0ZW1zdGFjaykge1xuICAgICAgICAgICAgcmV0dXJuIChpdGVtc3RhY2sgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICBpdGVtc3RhY2suJGdldEl0ZW0oKSA9PT0gTW9kQVBJLml0ZW1zW2VudGl0eUJyZWVkSXRlbTJdLmdldFJlZigpKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gRU5EIENVU1RPTSBFTlRJVFlcbiAgICAgICAgLy8gU1RBUlQgQ1VTVE9NIE1PREVMXG4gICAgICAgIHZhciBtb2RlbENoaWNrZW5DbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY2xpZW50Lm1vZGVsLlwiLmNvbmNhdCh0aGlzLmVudGl0eU1vZGVsKSk7XG4gICAgICAgIHZhciBtb2RlbENoaWNrZW5TdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKG1vZGVsQ2hpY2tlbkNsYXNzKTsgLy93aGlsZSBzdXBlciBpc24ndCB1c2VkIHdoZW4gZXh0ZW5kaW5nIHRoaXMgY2xhc3MsIGphdmEgaW1wbGllcyB0aGUgY2FsbC5cbiAgICAgICAgdmFyIG5tY21fT0VudGl0eU1vZGVsID0gZnVuY3Rpb24gbm1jbV9PRW50aXR5TW9kZWwoKSB7XG4gICAgICAgICAgICBtb2RlbENoaWNrZW5TdXBlcih0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2sobW9kZWxDaGlja2VuQ2xhc3MsIG5tY21fT0VudGl0eU1vZGVsKTtcbiAgICAgICAgLy8gRU5EIENVU1RPTSBNT0RFTFxuICAgICAgICAvLyBTVEFSVCBDVVNUT00gUkVOREVSRVJcbiAgICAgICAgdmFyIHJlbmRlckNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jbGllbnQucmVuZGVyZXIuZW50aXR5LlJlbmRlckxpdmluZ1wiKTtcbiAgICAgICAgdmFyIHJlbmRlclN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIocmVuZGVyQ2xhc3MsIGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gNDsgfSk7XG4gICAgICAgIHZhciBkdWNrVGV4dHVyZXMgPSBSZXNvdXJjZUxvY2F0aW9uKE1vZEFQSS51dGlsLnN0cihcInRleHR1cmVzL2VudGl0eS9cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIucG5nXCIpKSk7XG4gICAgICAgIHZhciBubWNyZV9SZW5kZXJPRW50aXR5ID0gZnVuY3Rpb24gbm1jcmVfUmVuZGVyT0VudGl0eShyZW5kZXJNYW5hZ2VyLCBtb2RlbEJhc2VJbiwgc2hhZG93U2l6ZUluKSB7XG4gICAgICAgICAgICByZW5kZXJTdXBlcih0aGlzLCByZW5kZXJNYW5hZ2VyLCBtb2RlbEJhc2VJbiwgc2hhZG93U2l6ZUluKTtcbiAgICAgICAgfTtcbiAgICAgICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2socmVuZGVyQ2xhc3MsIG5tY3JlX1JlbmRlck9FbnRpdHkpO1xuICAgICAgICBubWNyZV9SZW5kZXJPRW50aXR5LnByb3RvdHlwZS4kZ2V0RW50aXR5VGV4dHVyZSA9IGZ1bmN0aW9uIChlbnRpdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBkdWNrVGV4dHVyZXM7XG4gICAgICAgIH07XG4gICAgICAgIG5tY3JlX1JlbmRlck9FbnRpdHkucHJvdG90eXBlLiRoYW5kbGVSb3RhdGlvbkZsb2F0ID0gZnVuY3Rpb24gKGVudGl0eSwgcGFydGlhbFRpY2tzKSB7XG4gICAgICAgICAgICBlbnRpdHkgPSBNb2RBUEkudXRpbC53cmFwKGVudGl0eSk7XG4gICAgICAgICAgICBpZiAoIWVudGl0eS5vbkdyb3VuZCAmJiAhZW50aXR5LmlzSW5XYXRlcigpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7IC8vZmFsbGluZ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBJRCA9IE1vZEFQSS5rZXlnZW4uZW50aXR5KHRoaXMuZW50aXR5SUQpO1xuICAgICAgICBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eUxpc3RcIilcbiAgICAgICAgICAgIC5zdGF0aWNNZXRob2RzLmFkZE1hcHBpbmcwLm1ldGhvZChNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwge1xuICAgICAgICAgICAgJGNyZWF0ZUVudGl0eTogZnVuY3Rpb24gKCR3b3JsZEluKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBubWVfT0VudGl0eSgkd29ybGRJbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LCBNb2RBUEkudXRpbC5zdHIodGhpcy5lbnRpdHlJRC50b1VwcGVyQ2FzZSgpKSwgSUQsIHRoaXMuZWdnQmFzZSB8fCAweDVlM2UyZCwgLy9lZ2cgYmFzZVxuICAgICAgICB0aGlzLmVnZ1Nwb3RzIHx8IDB4MjY5MTY2IC8vZWdnIHNwb3RzXG4gICAgICAgICk7XG4gICAgICAgIHZhciBTcGF3blBsYWNlbWVudFR5cGUgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlMaXZpbmckU3Bhd25QbGFjZW1lbnRUeXBlXCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgdmFyIEVOVElUWV9QTEFDRU1FTlRTID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlTcGF3blBsYWNlbWVudFJlZ2lzdHJ5XCIpLnN0YXRpY1ZhcmlhYmxlcy5FTlRJVFlfUExBQ0VNRU5UUyk7XG4gICAgICAgIEVOVElUWV9QTEFDRU1FTlRTLnB1dChNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgU3Bhd25QbGFjZW1lbnRUeXBlLk9OX0dST1VORCk7XG4gICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBTcGF3bkxpc3RFbnRyeSA9IE1vZEFQSS5yZWZsZWN0XG4gICAgICAgICAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlJFNwYXduTGlzdEVudHJ5XCIpXG4gICAgICAgICAgICAgICAgLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gNDsgfSk7XG4gICAgICAgICAgICB2YXIgQmlvbWVHZW5Td2FtcCA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZUdlbkJhc2VcIilcbiAgICAgICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLnN3YW1wbGFuZCk7XG4gICAgICAgICAgICB2YXIgQmlvbWVHZW5SaXZlciA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZUdlbkJhc2VcIilcbiAgICAgICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLnJpdmVyKTtcbiAgICAgICAgICAgIHZhciBCaW9tZUdlbkJlYWNoID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMuYmVhY2gpO1xuICAgICAgICAgICAgdmFyIGR1Y2tTcGF3blN3YW1wID0gU3Bhd25MaXN0RW50cnkoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIDIyLCAzLCA1KTtcbiAgICAgICAgICAgIHZhciBkdWNrU3Bhd25SaXZlckJlZCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAxMCwgNSwgOSk7XG4gICAgICAgICAgICB2YXIgZHVja1NwYXduQmVhY2ggPSBTcGF3bkxpc3RFbnRyeShNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgMjQsIDIsIDMpO1xuICAgICAgICAgICAgbmV3IGdsb2JhbFRoaXMuT3Zlbk1ES0xvZ2dlcihubWVfT0VudGl0eSk7XG4gICAgICAgICAgICBCaW9tZUdlblN3YW1wLnNwYXduYWJsZUNyZWF0dXJlTGlzdC5hZGQoZHVja1NwYXduU3dhbXApO1xuICAgICAgICAgICAgQmlvbWVHZW5SaXZlci5zcGF3bmFibGVDcmVhdHVyZUxpc3QuYWRkKGR1Y2tTcGF3blJpdmVyQmVkKTtcbiAgICAgICAgICAgIEJpb21lR2VuQmVhY2guc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25CZWFjaCk7XG4gICAgICAgIH0pO1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIEFzeW5jU2luay5MMTBOLnNldChcImVudGl0eS5cIi5jb25jYXQodGhpcy5lbnRpdHlJRC50b1VwcGVyQ2FzZSgpLCBcIi5uYW1lXCIpLCB0aGlzLmVudGl0eU5hbWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTsgfSk7XG4gICAgICAgIHJldHVybiBfYSA9IHt9LFxuICAgICAgICAgICAgX2FbXCJFbnRpdHlcIi5jb25jYXQodGhpcy5lbnRpdHlJRC50b1VwcGVyQ2FzZSgpKV0gPSBubWVfT0VudGl0eSxcbiAgICAgICAgICAgIF9hW1wiTW9kZWxcIi5jb25jYXQodGhpcy5lbnRpdHlJRC50b1VwcGVyQ2FzZSgpKV0gPSBubWNtX09FbnRpdHlNb2RlbCxcbiAgICAgICAgICAgIF9hW1wiUmVuZGVyXCIuY29uY2F0KHRoaXMuZW50aXR5SUQudG9VcHBlckNhc2UoKSldID0gbm1jcmVfUmVuZGVyT0VudGl0eSxcbiAgICAgICAgICAgIF9hW1wiXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiVGV4dHVyZXNcIildID0gZHVja1RleHR1cmVzLFxuICAgICAgICAgICAgX2E7XG4gICAgfTtcbiAgICBPRW50aXR5LnByb3RvdHlwZS5yZWdpc3Rlck9FbnRpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUud2FybihcIk9FbnRpdHlzIGRvbnQgd29yayBpbiAxLjEyLCBhbmQgb25lIG9mIHlvdXIgbW9kcyBhcmUgdHJ5aW5nIHRvIHVzZSBpdCEgUGxlYXNlIHN3aXRjaCB0byAxLjguOFwiKTtcbiAgICAgICAgfVxuICAgICAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyRW50aXR5U2VydmVyKFxcXCJcIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCJcXFwiLCBcXFwiXCIpLmNvbmNhdCh0aGlzLmVudGl0eU5hbWUsIFwiXFxcIiwgXFxcIlwiKS5jb25jYXQodGhpcy5lbnRpdHlNb2RlbCwgXCJcXFwiLCBcXFwiXCIpLmNvbmNhdCh0aGlzLmVudGl0eUJyZWVkSXRlbSwgXCJcXFwiLCBcXFwiXCIpLmNvbmNhdCh0aGlzLmVudGl0eURyb3BJdGVtLCBcIlxcXCIsIFwiKS5jb25jYXQodGhpcy5lZ2dCYXNlLCBcIiwgXCIpLmNvbmNhdCh0aGlzLmVnZ1Nwb3RzLCBcIik7XCIpKTtcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnJlZ2lzdGVyRW50aXR5Q2xpZW50KCk7XG4gICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2lua1wiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfajtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2spIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9rLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iID0gKF9hID0gQXN5bmNTaW5rKS5zZXRGaWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MgPSBbXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L3RleHR1cmVzL2VudGl0eS9cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIucG5nXCIpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHRoaXMuZW50aXR5VGV4dHVyZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbNCAvKnlpZWxkKi8sIChfay5zZW50KCkpLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5hcHBseShfYSwgX2MuY29uY2F0KFtfay5zZW50KCldKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuaGlkZUZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L3RleHR1cmVzL2VudGl0eS9cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIucG5nLm1jbWV0YVwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLndhaXRGb3JSZW5kZXJNYW5hZ2VyKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfay5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZSA9IChfZCA9IEFzeW5jU2luaykuc2V0RmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9mID0gW1wicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9zb3VuZHMvbW9iL1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi9tYWluX3NvdW5kLm9nZ1wiKV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChcIlwiLmNvbmNhdCh0aGlzLmVudGl0eV9zb3VuZF9tYWluKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbNCAvKnlpZWxkKi8sIChfay5zZW50KCkpLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBfZS5hcHBseShfZCwgX2YuY29uY2F0KFtfay5zZW50KCldKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuQXVkaW8ucmVnaXN0ZXIoXCJtb2IuXCIgKyB0aGlzLmVudGl0eUlEICsgXCIubWFpbl9zb3VuZFwiLCBBc3luY1NpbmsuQXVkaW8uQ2F0ZWdvcnkuQU5JTUFMUywgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogXCJzb3VuZHMvbW9iL1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi9tYWluX3NvdW5kLm9nZ1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGl0Y2g6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvbHVtZTogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiBmYWxzZSwgLy91c2UgZm9yIGxhcmdlIGF1ZGlvIGZpbGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2ggPSAoX2cgPSBBc3luY1NpbmspLnNldEZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfaiA9IFtcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvc291bmRzL21vYi9cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIvc3RlcC5vZ2dcIildO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goXCJkYXRhOmF1ZGlvL29nZztiYXNlNjQsVDJkblV3QUNBQUFBQUFBQUFBQWJQUUFBQUFBQUFMWVpXZElCSGdGMmIzSmlhWE1BQUFBQUFZQStBQUFBQUFBQW1JWUJBQUFBQUFDcEFVOW5aMU1BQUFBQUFBQUFBQUFBR3owQUFBRUFBQUJmS2JOWUQ1RC8vLy8vLy8vLy8vLy8vLy8vNEFOMmIzSmlhWE0wQUFBQVdHbHdhQzVQY21jZ2JHbGlWbTl5WW1seklFa2dNakF5TURBM01EUWdLRkpsWkhWamFXNW5JRVZ1ZG1seWIyNXRaVzUwS1FJQUFBQXpBQUFBVkVsVVRFVTlWR2hsSUZOdmIzUm9hVzVuSUZOdmRXNWtjeUJ2WmlCRVZVTkxJQ016SUNoeWRXNXVhVzVuSUdSMVkyc3BFUUFBQUVGU1ZFbFRWRDF6WlVSVlEwdDBhWFpsQVFWMmIzSmlhWE1rUWtOV0FRQkFBQUFZUWhBcUJhMWpqanJJRlNHTUdhS2dRc29weHgxQzBDR2pKRU9JT3NZMXh4aGpSN2xraWtMSmdkQ1FWUUFBUUFBQXBCeFhVSEpKTGVlY2M2TVlWOHh4NkNEbm5IUGxJR2ZNY1FrbDU1eHpqam5ua25LT01lZWNjNk1ZVnc1eUtTM25uSE9CRkVlS2NhY1k1NXh6cEJ4SGluR29HT2VjYzIweHQ1Snl6am5ubkhQbUlJZFNjcTQxNTV4enBCaG5EbklMSmVlY2M4WWdaOHh4NnlEbm5IT01OYmZVY3M0NTU1eHp6am5ubkhQT09lZWNjNHd4NTV4enpqbm5uSE51TWVjV2M2NDU1NXh6empubkhIUE9PZWVjY3lBMFpCVUFrQUFBb0tFb2l1SW9EaEFhc2dvQXlBQUFFRUJ4RkVlUkZFdXhITXZSSkEwSURWa0ZBQUFCQUFnQUFLQklocVJJaXFWWWptWnBuaVo2b2lpYW9pcXJzbW5Lc2l6THN1dTZMaEFhc2dvQVNBQUFVRkVVeFhBVUJ3Z05XUVVBWkFBQUNHQW9pcU00anVSWWtxVlpuZ2VFaHF3Q0FJQUFBQVFBQUZBTVI3RVVUZkVrei9JOHovTTh6L004ei9NOHovTTh6L004ei9NOERRZ05XUVVBSUFBQUFJSW9aQmdEUWtOV0FRQkFBQUFJSVJvWlE1MVNFbHdLRmtJY0VVTWRRczVEcWFXRDRDbUZKV1BTVTZ4QkNDRjg3ejMzM252dmdkQ1FWUUFBRUFBQVlSUTRpSUhISkFnaGhHSVVKMFJ4cGlBSUlZVGxKRmpLZWVna0NOMkRFRUs0bkh2THVmZmVleUEwWkJVQUFBZ0F3Q0NFRUVJSUlZUVFRZ2dwcEpSU1NDbW1tR0tLS2NjY2M4d3h4eUNERERMb29KTk9Pc21ra2s0NnlpU2pqbEpyS2JVVVUweXg1UlpqcmJYV25IT3ZRU2xqakRIR0dHT01NY1lZWTR3eHhoZ2pDQTFaQlFDQUFBQVFCaGxra0VFSUlZUVVVa2dwcHBoeXpESEhIQU5DUTFZQkFJQUFBQUlBQUFBY1JWSWtSM0lrUjVJa3laSXNTWk04eTdNOHk3TThUZFJFVFJWVjFWVnQxL1p0WC9adDM5VmwzL1psMjlWbFhaWmwzYlZ0WGRaZFhkZDFYZGQxWGRkMVhkZDFYZGQxWGRlQjBKQlZBSUFFQUlDTzVEaU81RGlPNUVpT3BFZ0tFQnF5Q2dDUUFRQVFBSUNqT0lyalNJN2tXSTRsV1pJbWFaWm5lWmFuZVpxb2lSNFFHcklLQUFBRUFCQUFBQUFBQUlDaUtJcWpPSTRrV1phbWFaNm5lcUlvbXFxcWlxYXBxcXBxbXFacG1xWnBtcVpwbXFacG1xWnBtcVpwbXFacG1xWnBtcVpwbXFacG1xWnBBcUVocXdBQUNRQUFIY2R4SEVkeEhNZHhKRWVTSkNBMFpCVUFJQU1BSUFBQVExRWNSWElzeDVJMFM3TTh5OU5Fei9SY1VUWjFVMWR0SURSa0ZRQUFDQUFnQUFBQUFBQUF4M004eDNNOHlaTTh5M004eDVNOFNkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVFFOQ1ExWUNBR1FBQUJ6Rm1IdFNTcW5PUVVneEoyYzd4aHkwbUpzT0ZVSk1XaTAyWklnWUpxM0gwaWxDa0tPYVNzaVFNWXBxS2FWVENDbXBwWlRRTWNha3B0WmFLcVcwSGdnTldSRUFSQUVBQUFnaHhoQmppREVHSVlNUU1jWWdkQkFpeGh5RURFSUdJWlFVU3NrZ2hCSkNTWkZqREVJSElZTVFVZ21oWkJCQ0tTR1ZBZ0FBQWh3QUFBSXNoRUpEVmdRQWNRSUFDRUxPSWNZZ1JJeEJDQ1drRkVKSUtXSU1RdWFjbE13NUthV1Uxa0lwcVVXTVFjaWNrNUk1SnlXVTBsSXBwYlZRU211bGxOWkNLYTIxMW1wTnJjVWFTbWt0bE5KYUthVzExRnFOcmJVYUk4WWdaTTVKeVp5VFVrcHByWlRTV3VZY2xRNUNTaDJFbEVwS0xaYVVXc3ljazlKQlI2V0RrRkpKSmJhU1Vvd2xsZGhLU2pHV2xHSnNMY2JhWXF3MWxOSmFTU1cya2xLTUxiWWFXNHcxUjR4QnlaeVRramtucFpUU1dpbXB0Y3c1S1IyRWxEb0hKWldVWWl3bHRaZzVKNldEa0ZJSElhV1NVbXdscGRoQ0thMlZsR0lzSmJYWVlzeTF0ZGhxS0tuRmtsS01KYVVZVzR5MXR0aHE3S1MwRmxLSkxaVFNZb3V4MXRaYXJhR1VHRXRLTVphVVlvd3gxdHhpckRtVTBtSkpKY2FTVW9zdHRseGJqRFduMW5KdExkYmNZc3cxeGx4N3JiWG4xRnF0cWJWYVc0dzF4eHB6ckxYbTNrRnBMWlFTV3lpcHhkWmFyUzNHV2tNcHNaV1VZaXdseGRoaXpMVzFXSE1vSmNhU1Vvd2xwUmhiakxYR0dITk9yZFhZWXN3MXRWWnJyYlhuR0d2c3FiVmFXNHcxdDlocXJiWDJYblBzdFFBQWdBRUhBSUFBRThwQW9TRXJBWUFvQUFEQ0dLVVlnOUFncEpSakVCcUVsR0lPUXFVVVk4NUpxWlJpekRrcG1XUE9RVWdsWTg0NUNDV0ZFRXBKSmFVUVFpa2xwVlFBQUVDQkF3QkFnQTJhRW9zREZCcXlFZ0FJQ1FBZ0VGS0tNZWNnbEpKU1NoRkNURGtHSVlSU1Vtb3RRa2dwNWh5RVVFcEtyVlZNTWVZY2hCQktTYW0xU2pIR25JTVFRaWtwdFpZNTV4eUVFRXBKS2FYV011YWNneEJDS1NtbDFGb0hJWVFRU2lrbHBkWmE2eUNFRUVJcHBhVFVXbXNoaEJCS0thV2tsRnFMTVlRUVFpbWxwSkpTYXpHV1VrcEpLYVdVVW1zdHhsSktLU21sbEZKTHJjV1lVa29wcGRaYWF5M0dHRk5LS2FYVVdtdXh4UmhqYXEyMTFscUxNY1lZYTAydHRkWmFpekhHR0dPdEJRQUFIRGdBQUFRWVFTY1pWUlpob3drWEhvQkNRMVlFQUZFQUFJQXhpREhFR0hLT1FjaWdSTTR4Q1ptRXlEbEhwWk9TU1FtaGxkWXlLYUdWa2xya25KUFNVY3FvbEpaQ2FabWswbHBvb1FBQXNBTUhBTEFEQzZIUWtKVUFRQjRBQUlHUVVvdzU1eHhTaWpIR25ITU9LYVVZWTg0NXB4aGp6RG5ubkZPTU1lYWNjODR4eHB4enpqbm5HR1BPT2VlY2M4NDU1NXh6RGtMbm5IUE9PUWVoYzg0NTV5Q0UwRG5ubkhNUVFpZ0FBS2pBQVFBZ3dFYVJ6UWxHZ2dvTldRa0FwQUlBQU1ndzVweHpVbEpxbEdJTVFnaWxwTlFveFJpRUVFcEpLWE1PUWdpbHBOUmF4aGgwRWtwSnFiVU9RaWlscE5SYWpCMkVFa3BKcWJVWU93aWxwSlJTYXpGMkVFcEpxYVhXWWl5bHBOUmFhekhXV2twSnFiWFdZcXcxcGRSYWpESFdXbXRLcWJVWVk2eTExZ0lBd0JNY0FJQUtiRmdkNGFSb0xMRFFrSlVBUUFZQXdCQUF3QUVBQUFNT0FBQUJKcFNCUWtOV0FnQ3BBQUNBTVl3NTV4eUVVaHFsbklNUVFpbXBORW81QnlHRVVsTEtuSk5RU2lrcHRaWTVKNldVVWxKcXJZTlFTa29wdFJaakI2R1VsRkpxTGNZT1Fpb3B0UlpqalIyRVVsSnFMY1lZUXlrcHRSWmpqTFdHVWxKcUxjWVlheTBwdFJaampiWG1XbEpxTGNZYWE4MjFBQUNFQmdjQXNBTWJWa2M0S1JvTExEUmtKUUNRQndCQUlNUVlZNHc1aDVSaWpESG5uRU5LTWNhWWM4NHh4aGh6empubkdHT01PZWVjYzR3eDU1eHp6am5HbUhQT09lY2NjODQ1NTV4empqbm5uSFBPT2VlY2M4NDU1NXh6empubm5IUE9DUUFBS25BQUFBaXdVV1J6Z3BHZ1FrTldBZ0RoQUFDQU1ZdzV4eGgwRWxKcW1JSU9RZ2dscE5CQ281aHpFRUlvcGFUVU11aWtwRlJLU3EzRmxqa25wYVJTVWtxdHhRNUNTaW1sMUZxTU1YWVFVa29wcGRaaWpMV0RVRXBLTGNWWVk2MGRoRkpTYXEyMUdHc05wYVRVV213eDFwcHpLQ1dsMWxxTXNkYWFTMHF0eFZoanJibm1YRkpxTGJaWWE2MDE1OVJhakRIV21tdk92YWZXWW95eDFwcHo3cjBBQUpNSEJ3Q29CQnRuV0VrNkt4d05MalJrSlFDUUd3Q0FJTVNZYzg1QkNDR0VFRUlJSVZLS01lY2doQkJDQ0NHVVVrcWtGR1BPUVFnaGhCQkNDQ0dFakRIbm9JTVFRZ2lsbEZKS0tSbGp6a0VJSVlRUVNpaWxoQkk2NTZDREVFSUpwWlJTU2ltbGRNNDVDQ0dFRUVvcHBaUlNTdWtnaEJCQ0NLV1VVa29wcFpUU1FRZ2hoRkJLS2FXVVVrb3BKWVFRUWdpbGxGSktLYVdVVWtvSUlZUVFTaW1sbEZKS0thV1VFRUlJcFpSU1NpbWxsRkpLS1NHRUVFb3BwWlJTU2ltbGxGSkNDS1dVVWtvcHBaUlNTaW1saEJCS0thV1VVa29wcFpSU1NnbWhsRkpLS2FXVVVrb3BwWlFTU2ltbGxGSktLYVdVVWtvcEpaUlNTaW1sbEZKS0thV1VVa29vcFpSU1NpbWxsRkpLS2FXVVVFb3BwWlJTU2ltbGxGSktLYUdVVWtvcHBaUlNTaW1sbEZJS0FBQTZjQUFBQ0RDaTBrTHNOT1BLSTNCRUljTUVWR2pJU2dBZ0hBQUFRQVE2Q0NHRUVFSUlFWE1RUWdnaGhCQkNpSmlERUVJSUlZUVFRZ2doaEJCQ0NLV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FVVUFIV1o0UUFZUFdIakRDdEpaNFdqd1lXR3JBUUEwZ0lBQUdNWVk0d3B5S1N6Rm1PdERXTVFRZ2VkaEJScXFDV21oakVJSVhSUVNrb3R0bGh6QnFHa1VrcEpMY1pZZzgwOWcxQktLYVdrRm1PdE9SZmpRVWdscGRSaXE3WG5ISXp1SUpTU1Vrb3gxcHB6N3IxbzBFbEpxYlZhYys0OUIxODhDS1drMWxxTVBRY2ZqRENpbEpaaXJMSFdISHdSUmhoUlNrc3R4cHA3emIwWVk0UktLY1phZTg2NTUxeU1FVDZsRm1PdXVmY2VmQzdDK09KaXpEbjM0b01QUGdoaGpKQXg1dGh6OEwwWFk0d1B3c2hjY3k3Q0dPT0xNTUw0SUd5dHVRZGZqQkZHR0dOODd6WDRvSHN4d2dnampESENDTjF6MFVYNFlvd3hSaGhmaEFFQXVSRU9BSWdMUmhKU1p4bFdHbkhqQ1JnaWtFSkRWZ0VBTVFBQUJESEdJS1NRVWtvcHhSaGpqREhHR0dPTU1jWVlZNHd4eHB4anpqbm5uQUFBd0FRSEFJQUFLOWlWV1ZxMVVkelVTVjcwUWVBVE9tSXpNdVJTS21aeUl1aVJHbXF4RXV6UUNtN3dBckRRa0pVQUFCa0FBT1NrbEpSYUxScEN5a0ZwTllqSUlPVWt4U1FpWTVDQzBvS25rREdJU2NvZFl3b2hCYWwyMERHRkZLTWFVZ3FaVWdwcXFqbUdqakdvTVNmaFVnbWxCZ0FBUUJBQUlDQWtBTUFBUWNFTUFEQTRRQmc1RU9nSUlIQm9Bd0FNUk1oTVlGQUlEUTR5QWVBQklrSXFBRWhNVUpRdWRFRUlFYVNMSUlzSExweTQ4Y1FOSjNSb2d3QUFBQUFBZ0FDQUR3Q0FoQUtJaUdabXJzTGlBaU5EWTRPancrTURKRVJrSkFBQUFBQUFRQURnQXdBZ0lRRWlvcG1acTdDNHdNalEyT0RvOFBnQUNSRVpDUUFBQUFBQUFBQUFBQUlDQWdBQUFBQUFBUUFBQUFJQ1QyZG5Vd0FFaGd3QUFBQUFBQUFiUFFBQUFnQUFBRGVqMWI4THVidTcrdkx0ZnEzQ0FRSFVwajRvemJ6N1V2ZjBybEJGTWtUM3JzOWpaN0IvSGE2MGtiZVQ1ZHgvaktIRHJQdGhYZDEweVAyaTU5Kzc3WWQ3N1k4L0taWEtVL3BjaGZCdExWSXRoMGhlcTJVUHkyRlp2MU03Mzd5c3duck41YkJFbjkrNnVidkphN1NZSVlNdUpMbE5jYWFvY29ML2Qrd2hmT3NxeTUxZnI5UU5qL0wwNEpVUzdzK2V5MkFsbE40ejExY3pjZHBhOHAzT0gxdlBzWnY4MzV5WUx2eWVMc1VSMitydCszYTE4ck5ia1dPT3AvZVJkNWRqeFpTUzdxNVRXaTdqTGV5eWpSR0xldzZIajgzWHJ5SFhkVy8wMHR2b0pSR2loNmVQN0FXL1J4ZWdMSnpMOG1VZTIvVFIvdW5EaTNkbXVkcDIwdm5UN2g4Y21uUTNFcXExMmxUcm50OTJ0UTl6MmZIaS9jdkR2UFowaHRLMXIzc3YrL0VQblhxVVlDa1JkRlN5T0h1c1BLMjF0V0RBUGFWUDVhNHQ5Qk0vMTg2THNub3ZrZjd6SVpkUFh6NGZQbHB1N0RMbGxYbVYyWWUyR3g3WGxkUHovY2Y5Y2VGNW1ibmFsdHVuN1lwdy93c25WbnBDNkRZbUlwc25iTy9iTm5zZWJoZDdBUURzS0pQNzdqbWN1UGxUdllUZ3NuKzBSc3BucDBPb05uMCttTm1VOTNmZk1IWTdha0wwM0x2M3g1NU92amkydWF6SGJsWmhmVmxJNnMrc080ZEdlVjVyYXVtd0hJN3VMeDhxWU5kZWQ4N3B5SHJmZHZUbmZuWDRkVCtJRDkrbldEK3pBcG02SC92S2tidWVMYmpRVXZ3aWhLcUhXbXBwZWY5Zi9WNDgrMW5MNi9ZWGZPWlcvd3ZkcUtPbUMzK2RyNjZZdTFWc3ZpUU92dU9qMDlkN3o2M1RpWEs2K09SVDRxNFVWODdMM1hpaWNhbGFQWEtNYnl3VnU0MEEya2FMQ0FBQUhFL3RZK3N2anoxMitsZGpSU1IyUDlkYlZ0YlF3c1NBeFpseVg2dWx6UzRJNGI3TG9xQzZkRFhsYVkzdzM3R3A2WG44U2VYSDVleDVVdWlVMVc2M2xZM2JXYlhjWXlmOXpxdktlV3o3OC9UZlVadjgxbXZsNjYrY2FoN29pUGUxbmZrbC9iYkNPZnkzMjAvdEpFa28rOXBoeFhicFc2bjcvbUpudHN2TkkvNHZ2Wms4akFUYWVZcFhPRDVCdlF4YnJXeHptOUQ2UmFYRWlCRWV4c210dVdxNVFReGwwNTJTeTlPd09GMkZKMXoyVzZIWlVKOEtaYUl2U3hMVHJqcnRsYmxGcVhUai91c1g2SXdYZWRTUlRiMk8yN21lQ3ZGNCs3SGdiOGQrMzFmQnBFN1RuanJhZk10U2JmNzZsOHZncXdFQUFKN215Z3dvRFExU045ZGt4dy82c2VQWlMxV1ZyaHB0elQvTkZ1MXEzcXpNWDFPejA2dHNWZ3BWei8zVm4vdkp6MHcrVkh2VzNhK0NadlJueDB6QTJFTkNyOW56c2w5K3I3MzV3dlByQTM4cE9CcU9CTzE1OUlTZWJZem0xVklsN3RkZGNzVTBjblFpa01UVjU0dWhDSGkrOWlkUFpSMWhmTFZ0RU5Md2NuTXJpUHRGV05wbUljcDY5L2VFWjk1TWNmUGl4cmxaM1lBOVY1UmNNZGRUamN5RGNJTlYvejVqUFZqYkxvZVBDdU5KL21vRm0xellyYXIzc1czc256dTB3WCtLS3BSUFdPU0RiZFNFWlY3SEVuZmVobkV4eW1OOTdTdGx1UzQvOVgzemViNWdyeks1VzRTVkJUYXMxeWdHQndBQU5oYUxCTUFCR0IweEJWMk9vbS92ajczd3NadGFsS0FvdTFRdjRLbXNpdk9mTmFNZEZHM2ZWZVhBSTEwVTFtNW5oT2E3VytlblMybGVxTHROc3FJMExMYlVaNWVscVZ3MHRlRUtCYjJ0dVdLVExCZmJUVjZmcm56aDBmejY1ZmU5Yno0L2VaQWJQR2htS3NkLzM4YXk4LzFaRWRaK1dQY25WdXZTRlEwaWphSWkxMTlOeHBKT1V4bjIxM3lqTklhRWRUR2Roa0xMaDMyNk1QdkYvdnVhSUYzamVRUGVKbVZlM2pjd2V0dXcrN2xkNzNCWjNSMHYvZExUcDd3NlIxbm1iYmo0UTgweTgrVFBvOGFkYld5dThrQWlvN2k1YkgwNTdaOHB4dW1wVXRnVysvdE81L0JHK0tERExBQUF6Q2hUTDNSMDZmQjB5MCtKSm9ocXArU2lwMkQ4NWpHSkpiNkhYZ2ZmZzY5alhGTkVsdGRUUGx6RTFiby9iemQvcitlWnNIbmx0SHgxc2NUWm44aWJUVWxGN3N0K2VTcHYzeHU4R3U5TWNvT29pTjF1N3NmUHpiRXVUb2ZqbmY2d1ZsWjlhdFhPZWI3VWY5TGN6bTFlbjkveXlLSkM3RzgrZFRsem5BUUEzQ1Jod1J4MmhNMW5uVlU1MVlaK0h1TnBpNXlPM2JtR3pSb3plV3JuL1k1eVZnOWJGQXYycm5oOWNOeXJUa0kyRDY1VnpPTjF5bGlUYTlWei9kSzUyZWtKNjJhWVVpUXc5cFhjemdwQnk3emFuSTBsQ3BiR2EvYjZyKzdac3ZYczBMNGUvODhLeHVXMFNpMXpsVjAvWFV0SDlXOTFNL0tNcXplY25wUHQwZUo5SVhIKzByUjEvNWY3ZkYyTGV2c3BvL25ldjRlRHRlMnVUbkxhRnRtbm5aUlFjemxMZE5xNWxsUVBCUUNraXVqbW8rbnJibzgrRlU4ODJ5OTgraEE5ZlZoWEg5KzcwRzduY2UvLytjTHgvY3ZWNzcvM3dwUHZYNjQrdnJjTHE5Ky92SEI4QyszKzVRWEhjK0xaZnVIVGgraXBEMjdpSHYyeUgzdDZ1ZnI5ZHhjT0VnVE9QR0hQazBtTXZKN1NYN2ZYK3RYUCt4TlR6N3RWeHo0MGU5cGpEVis4M0htZUsrUE50UzJ2U3ArT216MlZ4c0Q3K0Z6NGV3KzZTOHBvKzlaWno2ajdlWC9mK3pKYnZ1UTR1cDk2MUZjV0ZjL2RaZGp6cnErM25WKzd0NzdkODNyUnRlTmQvZVhhdUcwa0FBb09cIildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbNCAvKnlpZWxkKi8sIChfay5zZW50KCkpLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICBfaC5hcHBseShfZywgX2ouY29uY2F0KFtfay5zZW50KCldKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuQXVkaW8ucmVnaXN0ZXIoXCJtb2IuXCIgKyB0aGlzLmVudGl0eUlEICsgXCIuc3RlcFwiLCBBc3luY1NpbmsuQXVkaW8uQ2F0ZWdvcnkuQU5JTUFMUywgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogXCJzb3VuZHMvbW9iL1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi9zdGVwLm9nZ1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGl0Y2g6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvbHVtZTogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiBmYWxzZSwgLy91c2UgZm9yIGxhcmdlIGF1ZGlvIGZpbGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLm1jLnJlbmRlck1hbmFnZXIuZW50aXR5UmVuZGVyTWFwLnB1dChNb2RBUEkudXRpbC5hc0NsYXNzKGRhdGFbXCJFbnRpdHlcIi5jb25jYXQodGhpcy5lbnRpdHlJRC50b1VwcGVyQ2FzZSgpKV0pLCBuZXcgZGF0YVtcIlJlbmRlclwiLmNvbmNhdCh0aGlzLmVudGl0eUlELnRvVXBwZXJDYXNlKCkpXShNb2RBUEkubWMucmVuZGVyTWFuYWdlci5nZXRSZWYoKSwgbmV3IGRhdGFbXCJNb2RlbFwiLmNvbmNhdCh0aGlzLmVudGl0eUlELnRvVXBwZXJDYXNlKCkpXSgpLCAwLjMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5wcm9taXNpZnkoTW9kQVBJLm1jLnJlbmRlckVuZ2luZS5iaW5kVGV4dHVyZSkoZGF0YVtcIlwiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIlRleHR1cmVzXCIpXSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IGdsb2JhbFRoaXMuT3Zlbk1ES0xvZ2dlcihcIkxvYWRlZCBPRW50aXR5IHRleHR1cmUgaW50byBjYWNoZS5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7IH0pO1xuICAgICAgICBuZXcgZ2xvYmFsVGhpcy5PdmVuTURLTG9nZ2VyKGRhdGEpO1xuICAgICAgICB2YXIga2V5ID0gXCJPRW50aXR5LlwiLmNvbmNhdCh0aGlzLmVudGl0eUlEKTtcbiAgICAgICAgZ2xvYmFsVGhpc1trZXldID0gZGF0YTtcbiAgICB9O1xuICAgIE9FbnRpdHkucHJvdG90eXBlLmNyZWF0ZVNwYXduZWdnID0gZnVuY3Rpb24gKGJhc2UsIHNwb3RzKSB7XG4gICAgfTtcbiAgICByZXR1cm4gT0VudGl0eTtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBPRW50aXR5O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xuICAgIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbi8qXG4gIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cbiAgT0l0ZW0udHNcbiAgICBcbiAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xudmFyIE9JdGVtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9JdGVtKGl0ZW1OYW1lLCBpdGVtSUQsIGl0ZW1TdGFjaywgdGV4dHVyZSwgb25SaWdodENsaWNrLCBvbkl0ZW1Vc2UsIGN1c3RvbU1vZGVsKSB7XG4gICAgICAgIHRoaXMuaXRlbU5hbWUgPSBpdGVtTmFtZTtcbiAgICAgICAgdGhpcy5pdGVtSUQgPSBpdGVtSUQ7XG4gICAgICAgIHRoaXMuaXRlbVN0YWNrID0gaXRlbVN0YWNrO1xuICAgICAgICB0aGlzLml0ZW1UZXh0dXJlID0gdGV4dHVyZTtcbiAgICAgICAgdGhpcy5vblJpZ2h0Q2xpY2sgPSBvblJpZ2h0Q2xpY2s7XG4gICAgICAgIHRoaXMuY3VzdG9tTW9kZWwgPSBjdXN0b21Nb2RlbDtcbiAgICAgICAgLy8gQXNzaWduIG9wdGlvbmFsIG9uSXRlbVVzZSBpZiBwcm92aWRlZFxuICAgICAgICB0aGlzLm9uSXRlbVVzZSA9IG9uSXRlbVVzZTtcbiAgICB9XG4gICAgT0l0ZW0ucHJvdG90eXBlLnJlZ2lzdGVyQ2xpZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgJCRpdGVtR2V0QXR0cmlidXRlcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpLm1ldGhvZHMuZ2V0SXRlbUF0dHJpYnV0ZU1vZGlmaWVycy5tZXRob2Q7XG4gICAgICAgIHZhciBjcmVhdGl2ZU1pc2NUYWI7XG4gICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgY3JlYXRpdmVNaXNjVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLk1JU0M7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjcmVhdGl2ZU1pc2NUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMudGFiTWlzYztcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXRlbUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIik7XG4gICAgICAgIHZhciBpdGVtU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihpdGVtQ2xhc3MsIGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZm4ubGVuZ3RoID09PSAxOyB9KTtcbiAgICAgICAgdmFyIGl0ZW1TdGFjayA9IHRoaXMuaXRlbVN0YWNrO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGZ1bmN0aW9uIG5taV9PdmVuSXRlbSgpIHtcbiAgICAgICAgICAgIGl0ZW1TdXBlcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuJHNldENyZWF0aXZlVGFiKGNyZWF0aXZlTWlzY1RhYik7XG4gICAgICAgICAgICB0aGlzLiRtYXhTdGFja1NpemUgPSAoaXRlbVN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhpdGVtQ2xhc3MsIG5taV9PdmVuSXRlbSk7XG4gICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVJpZ2h0Q2xpY2sgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMilcbiAgICAgICAgICAgICAgICAgICAgKCQkcGxheWVyKS4kc2V0SXRlbUluVXNlKCQkaXRlbXN0YWNrLCAzMik7XG4gICAgICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcjtcbiAgICAgICAgICAgICAgICBzZWxmLm9uUmlnaHRDbGljaygkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpO1xuICAgICAgICAgICAgICAgIGlmIChnbG9iYWxUaGlzLkRlYnVnX21vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3IGdsb2JhbFRoaXMuT3Zlbk1ES0xvZ2dlcihcImNsaWVudCBpdGVtc3RhY2s6XCIpO1xuICAgICAgICAgICAgICAgICAgICBuZXcgZ2xvYmFsVGhpcy5PdmVuTURLTG9nZ2VyKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICgkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIDtcbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICB2YXIgJCRSZXN1bHRFbnVtID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnVtQWN0aW9uUmVzdWx0XCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgICAgIHZhciAkJEFjdGlvblJlc3VsdCA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiQWN0aW9uUmVzdWx0XCIpLmNvbnN0cnVjdG9yc1swXTtcbiAgICAgICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVJpZ2h0Q2xpY2sgPSBmdW5jdGlvbiAoJCR3b3JsZCwgJCRwbGF5ZXIsICRoYW5kRW51bSwgJHVudXNlZCkge1xuICAgICAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjayA9ICgkJHBsYXllcikuJGdldEhlbGRJdGVtKCRoYW5kRW51bSk7XG4gICAgICAgICAgICAgICAgKCQkcGxheWVyKS4kc2V0QWN0aXZlSGFuZCgkaGFuZEVudW0pO1xuICAgICAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXI7XG4gICAgICAgICAgICAgICAgc2VsZi5vblJpZ2h0Q2xpY2soJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsVGhpcy5EZWJ1Z19tb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBnbG9iYWxUaGlzLk92ZW5NREtMb2dnZXIoXCJjbGllbnQgaXRlbXN0YWNrOlwiKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3IGdsb2JhbFRoaXMuT3Zlbk1ES0xvZ2dlcigkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAoJCRBY3Rpb25SZXN1bHQoJCRSZXN1bHRFbnVtLlNVQ0NFU1MsICQkaXRlbXN0YWNrKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVVzZTAgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkcGxheWVyLCAkJHdvcmxkLCAkJGJsb2NrcG9zKSB7XG4gICAgICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRibG9ja3BvcztcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vbkl0ZW1Vc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vbkl0ZW1Vc2UoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGJsb2NrcG9zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgIGlmIChnbG9iYWxUaGlzLkRlYnVnX21vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3IGdsb2JhbFRoaXMuT3Zlbk1ES0xvZ2dlcihcImNsaWVudCBpdGVtc3RhY2s6XCIpO1xuICAgICAgICAgICAgICAgICAgICBuZXcgZ2xvYmFsVGhpcy5PdmVuTURLTG9nZ2VyKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIDtcbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICB2YXIgJCRSZXN1bHRFbnVtID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnVtQWN0aW9uUmVzdWx0XCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVVzZSA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCRwbGF5ZXIsICQkd29ybGQsICQkYmxvY2twb3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2ssICQkcGxheWVyLCAkJHdvcmxkLCAkJGJsb2NrcG9zO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9uSXRlbVVzZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm9uSXRlbVVzZSgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIsICQkYmxvY2twb3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkUmVzdWx0RW51bS5QQVNTO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvblVwZGF0ZSA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIsICQkaG90YmFyX3Nsb3QsICQkaXNfaGVsZCkge1xuICAgICAgICAgICAgJCRpc19oZWxkID0gKCQkaXNfaGVsZCkgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtVXNlRmluaXNoID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcikge1xuICAgICAgICAgICAgcmV0dXJuICgkJGl0ZW1zdGFjayk7XG4gICAgICAgIH07XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldE1heEl0ZW1Vc2VEdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAzMjtcbiAgICAgICAgfTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kZ2V0SXRlbUF0dHJpYnV0ZU1vZGlmaWVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkJGF0dHJpYnV0ZW1hcCA9ICQkaXRlbUdldEF0dHJpYnV0ZXMuYXBwbHkodGhpcywgW10pO1xuICAgICAgICAgICAgcmV0dXJuICQkYXR0cmlidXRlbWFwO1xuICAgICAgICB9O1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRnZXRTdHJWc0Jsb2NrID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJGJsb2NrKSB7XG4gICAgICAgICAgICByZXR1cm4gMS4wO1xuICAgICAgICB9O1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkNyZWF0ZWQgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uQmxvY2tEZXN0cm95ZWQgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkYmxvY2ssICQkYmxvY2twb3MsICQkZW50aXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGludGVybmFsX3JlZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpdGVtSW5zdGFuY2UgPSBuZXcgbm1pX092ZW5JdGVtKCkuJHNldFVubG9jYWxpemVkTmFtZShNb2RBUEkudXRpbC5zdHIoX3RoaXMuaXRlbUlEKSk7XG4gICAgICAgICAgICBpdGVtQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3Rlckl0ZW0ubWV0aG9kKE1vZEFQSS5rZXlnZW4uaXRlbShfdGhpcy5pdGVtSUQpLCBNb2RBUEkudXRpbC5zdHIoX3RoaXMuaXRlbUlEKSwgaXRlbUluc3RhbmNlKTtcbiAgICAgICAgICAgIE1vZEFQSS5pdGVtc1tcIlwiLmNvbmNhdChzZWxmLml0ZW1JRCldID0gaXRlbUluc3RhbmNlO1xuICAgICAgICAgICAgbmV3IGdsb2JhbFRoaXMuT3Zlbk1ES0xvZ2dlcihpdGVtSW5zdGFuY2UpO1xuICAgICAgICAgICAgbmV3IGdsb2JhbFRoaXMuT3Zlbk1ES0xvZ2dlcihcIlJlZ2lzdGVyZWQgT3Zlbk1ESyBpdGVtICggY2xpZW50IHNpZGUgKVwiKTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtSW5zdGFuY2U7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChNb2RBUEkuaXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbF9yZWcoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsX3JlZyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9JdGVtLnByb3RvdHlwZS5yZWdpc3Rlckl0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmLCBjdXN0b21faXRlbTtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgY3VzdG9tX2l0ZW0gPSBuZXcgT0l0ZW0odGhpcy5pdGVtTmFtZSwgdGhpcy5pdGVtSUQsIHRoaXMuaXRlbVN0YWNrLCB0aGlzLml0ZW1UZXh0dXJlLCB0aGlzLm9uUmlnaHRDbGljaywgdGhpcy5vbkl0ZW1Vc2UsIHRoaXMuY3VzdG9tTW9kZWwpLnJlZ2lzdGVyQ2xpZW50KCk7XG4gICAgICAgICAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJJdGVtKFxcXCJcIi5jb25jYXQodGhpcy5pdGVtSUQsIFwiXFxcIiwgXCIpLmNvbmNhdCh0aGlzLml0ZW1TdGFjaywgXCIsIFwiKS5jb25jYXQodGhpcy5vblJpZ2h0Q2xpY2ssIFwiLCBcIikuY29uY2F0KHRoaXMub25JdGVtVXNlLCBcIik7XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFycmF5QnVmZmVyVG9TdHJpbmcoYnVmZmVyLCBlbmNvZGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbmNvZGluZyA9PT0gdm9pZCAwKSB7IGVuY29kaW5nID0gJ3V0Zi04JzsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKGVuY29kaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVjb2Rlci5kZWNvZGUoYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIHJlc3BvbnNlLCBidWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYy5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3Npbms6cmVnaXN0ZXJpdGVtc1wiLCBmdW5jdGlvbiAocmVuZGVySXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBnbG9iYWxUaGlzLk92ZW5NREtMb2dnZXIoXCJjb29sIHJlZyBmb3JcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IGdsb2JhbFRoaXMuT3Zlbk1ES0xvZ2dlcihzZWxmLml0ZW1JRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVySXRlbS5yZWdpc3Rlckl0ZW0oY3VzdG9tX2l0ZW0sIE1vZEFQSS51dGlsLnN0cihzZWxmLml0ZW1JRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsVGhpcy5EZWJ1Z19tb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IGdsb2JhbFRoaXMuT3Zlbk1ES0xvZ2dlcihcInJlZ2lzdGVyaW5nIFwiLmNvbmNhdChzZWxmLml0ZW1JRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLkwxME4uc2V0KFwiaXRlbS5cIi5jb25jYXQoc2VsZi5pdGVtSUQsIFwiLm5hbWVcIiksIHNlbGYuaXRlbU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxmLmN1c3RvbU1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9pdGVtL1wiLmNvbmNhdChzZWxmLml0ZW1JRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmVudFwiOiBcImJ1aWx0aW4vZ2VuZXJhdGVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dHVyZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXllcjBcIjogXCJpdGVtcy9cIi5jb25jYXQoc2VsZi5pdGVtSUQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheVwiOiB7IFwidGhpcmRwZXJzb25fcmlnaHRoYW5kXCI6IHsgXCJyb3RhdGlvblwiOiBbMCwgLTkwLCA1NV0sIFwidHJhbnNsYXRpb25cIjogWzAsIDQsIDAuNV0sIFwic2NhbGVcIjogWzAuODUsIDAuODUsIDAuODVdIH0sIFwidGhpcmRwZXJzb25fbGVmdGhhbmRcIjogeyBcInJvdGF0aW9uXCI6IFswLCA5MCwgLTU1XSwgXCJ0cmFuc2xhdGlvblwiOiBbMCwgNCwgMC41XSwgXCJzY2FsZVwiOiBbMC44NSwgMC44NSwgMC44NV0gfSwgXCJmaXJzdHBlcnNvbl9yaWdodGhhbmRcIjogeyBcInJvdGF0aW9uXCI6IFswLCAtOTAsIDI1XSwgXCJ0cmFuc2xhdGlvblwiOiBbMS4xMywgMy4yLCAxLjEzXSwgXCJzY2FsZVwiOiBbMC42OCwgMC42OCwgMC42OF0gfSwgXCJmaXJzdHBlcnNvbl9sZWZ0aGFuZFwiOiB7IFwicm90YXRpb25cIjogWzAsIDkwLCAtMjVdLCBcInRyYW5zbGF0aW9uXCI6IFsxLjEzLCAzLjIsIDEuMTNdLCBcInNjYWxlXCI6IFswLjY4LCAwLjY4LCAwLjY4XSB9IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvbW9kZWxzL2l0ZW0vXCIuY29uY2F0KHNlbGYuaXRlbUlELCBcIi5qc29uXCIpLCBzZWxmLmN1c3RvbU1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iID0gKF9hID0gZ2xvYmFsVGhpcy5PdmVuTURLTG9nZ2VyKS5iaW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgKGFycmF5QnVmZmVyVG9TdHJpbmcoQXN5bmNTaW5rLmdldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9pdGVtL1wiLmNvbmNhdChzZWxmLml0ZW1JRCwgXCIuanNvblwiKSkpKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyAoX2IuYXBwbHkoX2EsIFt2b2lkIDAsIF9jLnNlbnQoKV0pKSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goc2VsZi5pdGVtVGV4dHVyZSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9jLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBfYy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvdGV4dHVyZXMvaXRlbXMvXCIuY29uY2F0KHNlbGYuaXRlbUlELCBcIi5wbmdcIiksIGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVySXRlbShcXFwiXCIuY29uY2F0KHRoaXMuaXRlbUlELCBcIlxcXCIsIFwiKS5jb25jYXQodGhpcy5pdGVtU3RhY2ssIFwiLCBcIikuY29uY2F0KHRoaXMub25SaWdodENsaWNrLCBcIiwgXCIpLmNvbmNhdCh0aGlzLm9uSXRlbVVzZSwgXCIpO1wiKSk7XG4gICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2lua1wiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UsIGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2luazpyZWdpc3Rlcml0ZW1zXCIsIGZ1bmN0aW9uIChyZW5kZXJJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVySXRlbS5yZWdpc3Rlckl0ZW0oY3VzdG9tX2l0ZW0sIE1vZEFQSS51dGlsLnN0cihzZWxmLml0ZW1JRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuTDEwTi5zZXQoXCJpdGVtLlwiLmNvbmNhdChzZWxmLml0ZW1JRCwgXCIubmFtZVwiKSwgc2VsZi5pdGVtTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGYuY3VzdG9tTW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvbW9kZWxzL2l0ZW0vXCIuY29uY2F0KHNlbGYuaXRlbUlELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyZW50XCI6IFwiYnVpbHRpbi9nZW5lcmF0ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0dXJlc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxheWVyMFwiOiBcIml0ZW1zL1wiLmNvbmNhdChzZWxmLml0ZW1JRClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXNwbGF5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGhpcmRwZXJzb25fcmlnaHRoYW5kXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6IFswLCAtOTAsIDU1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0aW9uXCI6IFswLCA0LCAwLjVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2NhbGVcIjogWzAuODUsIDAuODUsIDAuODVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aGlyZHBlcnNvbl9sZWZ0aGFuZFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOiBbMCwgOTAsIC01NV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGlvblwiOiBbMCwgNCwgMC41XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNjYWxlXCI6IFswLjg1LCAwLjg1LCAwLjg1XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmlyc3RwZXJzb25fcmlnaHRoYW5kXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6IFswLCAtOTAsIDI1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0aW9uXCI6IFsxLjEzLCAzLjIsIDEuMTNdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2NhbGVcIjogWzAuNjgsIDAuNjgsIDAuNjhdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmaXJzdHBlcnNvbl9sZWZ0aGFuZFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOiBbMCwgOTAsIC0yNV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGlvblwiOiBbMS4xMywgMy4yLCAxLjEzXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNjYWxlXCI6IFswLjY4LCAwLjY4LCAwLjY4XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9pdGVtL1wiLmNvbmNhdChzZWxmLml0ZW1JRCwgXCIuanNvblwiKSwgc2VsZi5jdXN0b21Nb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChzZWxmLml0ZW1UZXh0dXJlKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9pdGVtcy9cIi5jb25jYXQoc2VsZi5pdGVtSUQsIFwiLnBuZ1wiKSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gT0l0ZW07XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgT0l0ZW07XG4iLCJleHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJPdmVuTURLUmVjaXBlKHBhdHRlcm4sIHJlc3VsdCkge1xuICAgIGZ1bmN0aW9uICQkaW50ZXJuYWxSZWdpc3RlcigpIHtcbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICB2YXIgQ3JhZnRpbmdNYW5hZ2VyID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJDcmFmdGluZ01hbmFnZXJcIik7XG4gICAgICAgICAgICB2YXIgQ3JhZnRpbmdNYW5hZ2VyTWV0aG9kcyA9IENyYWZ0aW5nTWFuYWdlci5zdGF0aWNNZXRob2RzO1xuICAgICAgICAgICAgdmFyIEpTT05PYmplY3QgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkpTT05PYmplY3RcIik7XG4gICAgICAgICAgICB2YXIgcGFyc2VKc29uID0gSlNPTk9iamVjdC5jb25zdHJ1Y3RvcnMuZmluZExhc3QoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSAxOyB9KTtcbiAgICAgICAgICAgIC8vIENvbnZlcnQgcGF0dGVybiB0byAzIGxpbmVzIG9mIDMgY2hhcmFjdGVycyAocm93cyBvZiBjcmFmdGluZyBncmlkKVxuICAgICAgICAgICAgdmFyIHJvd1BhdHRlcm5zID0gW1xuICAgICAgICAgICAgICAgIFwiQUJDXCIsIFwiREVGXCIsIFwiR0hJXCJcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICB2YXIganNvbktleSA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gU3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpOyAvLyAnQScgdG8gJ0knXG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gcGF0dGVybltpXTtcbiAgICAgICAgICAgICAgICBpZiAoIWVudHJ5IHx8IGVudHJ5ID09PSBcIlwiKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSBlbnRyeTtcbiAgICAgICAgICAgICAgICB2YXIgbWV0YSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQFwiKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBpZC5zcGxpdChcIkBcIik7XG4gICAgICAgICAgICAgICAgICAgIGlkID0gcGFydHNbMF07XG4gICAgICAgICAgICAgICAgICAgIG1ldGEgPSBwYXJzZUludChwYXJ0c1sxXSkgfHwgMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAganNvbktleVtrZXldID0ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtOiBpZC5pbmNsdWRlcyhcIjpcIikgPyBpZCA6IFwibWluZWNyYWZ0OlwiLmNvbmNhdChpZCksXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG1ldGFcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlc3VsdElkID0gcmVzdWx0O1xuICAgICAgICAgICAgdmFyIHJlc3VsdE1ldGEgPSAwO1xuICAgICAgICAgICAgdmFyIHJlc3VsdENvdW50ID0gMTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuaW5jbHVkZXMoXCIqXCIpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gcmVzdWx0LnNwbGl0KFwiKlwiKTtcbiAgICAgICAgICAgICAgICByZXN1bHRJZCA9IHBhcnRzWzBdO1xuICAgICAgICAgICAgICAgIHJlc3VsdENvdW50ID0gcGFyc2VJbnQocGFydHNbMV0pIHx8IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzdWx0SWQuaW5jbHVkZXMoXCJAXCIpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gcmVzdWx0SWQuc3BsaXQoXCJAXCIpO1xuICAgICAgICAgICAgICAgIHJlc3VsdElkID0gcGFydHNbMF07XG4gICAgICAgICAgICAgICAgcmVzdWx0TWV0YSA9IHBhcnNlSW50KHBhcnRzWzFdKSB8fCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlY2lwZUpzb24gPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJjcmFmdGluZ19zaGFwZWRcIixcbiAgICAgICAgICAgICAgICBwYXR0ZXJuOiByb3dQYXR0ZXJucyxcbiAgICAgICAgICAgICAgICBrZXk6IGpzb25LZXksXG4gICAgICAgICAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW06IHJlc3VsdElkLmluY2x1ZGVzKFwiOlwiKSA/IHJlc3VsdElkIDogXCJtaW5lY3JhZnQ6XCIuY29uY2F0KHJlc3VsdElkKSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogcmVzdWx0TWV0YSxcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IHJlc3VsdENvdW50XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBqc29uRGF0YSA9IHBhcnNlSnNvbihNb2RBUEkudXRpbC5zdHIoSlNPTi5zdHJpbmdpZnkocmVjaXBlSnNvbikpKTtcbiAgICAgICAgICAgIHZhciByZWNpcGVPYmogPSBDcmFmdGluZ01hbmFnZXJNZXRob2RzLmZ1bmNfMTkzMzc2X2EubWV0aG9kKGpzb25EYXRhKTtcbiAgICAgICAgICAgIENyYWZ0aW5nTWFuYWdlck1ldGhvZHMuZnVuY18xOTMzNzlfYS5tZXRob2QoTW9kQVBJLnV0aWwuc3RyKFwiY3VzdG9tX3JlY2lwZV9cIi5jb25jYXQoRGF0ZS5ub3coKSkpLCByZWNpcGVPYmopO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyICQkT2JqZWN0Q2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJqYXZhLmxhbmcuT2JqZWN0XCIpLmNsYXNzO1xuICAgICAgICAgICAgdmFyICQkVG9DaGFyXzEgPSBmdW5jdGlvbiAoY2hhcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgICAgICAgICAuZ2V0Q2xhc3NCeUlkKFwiamF2YS5sYW5nLkNoYXJhY3RlclwiKVxuICAgICAgICAgICAgICAgICAgICAuc3RhdGljTWV0aG9kcy52YWx1ZU9mLm1ldGhvZChjaGFyLmNoYXJDb2RlQXQoMCkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBwYXJzZUVudHJ5XzEgPSBmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZTtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSBlbnRyeTtcbiAgICAgICAgICAgICAgICB2YXIgbWV0YSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQFwiKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBpZC5zcGxpdChcIkBcIik7XG4gICAgICAgICAgICAgICAgICAgIGlkID0gcGFydHNbMF07XG4gICAgICAgICAgICAgICAgICAgIG1ldGEgPSBwYXJzZUludChwYXJ0c1sxXSwgMTApIHx8IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpZC5zdGFydHNXaXRoKFwiYmxvY2svXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIGlkID0gaWQucmVwbGFjZShcImJsb2NrL1wiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaWQuc3RhcnRzV2l0aChcIml0ZW0vXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcIml0ZW1cIjtcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBpZC5yZXBsYWNlKFwiaXRlbS9cIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoTW9kQVBJLmJsb2Nrc1tpZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoTW9kQVBJLml0ZW1zW2lkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFwiaXRlbVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlkID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gXCJhaXJcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gaXRlbS9ibG9jayBpZDogXCIuY29uY2F0KGVudHJ5KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogdHlwZSwgaWQ6IGlkLCBtZXRhOiBtZXRhIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHBhdHRlcm5FbnRyaWVzID0gcGF0dGVybi5zcGxpdChcIixcIik7XG4gICAgICAgICAgICB2YXIgJCRyZWNpcGVMZWdlbmRfMSA9IHt9O1xuICAgICAgICAgICAgcGF0dGVybkVudHJpZXMuZm9yRWFjaChmdW5jdGlvbiAoZW50cnksIGkpIHtcbiAgICAgICAgICAgICAgICAkJHJlY2lwZUxlZ2VuZF8xW1N0cmluZy5mcm9tQ2hhckNvZGUoNjUgKyBpKV0gPSBwYXJzZUVudHJ5XzEoZW50cnkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgJCRyZWNpcGVQYXR0ZXJuID0gW1wiQUJDXCIsIFwiREVGXCIsIFwiR0hJXCJdO1xuICAgICAgICAgICAgdmFyICQkaXRlbVN0YWNrRnJvbUJsb2NrV2l0aE1ldGFfMSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtU3RhY2tcIikuY29uc3RydWN0b3JzWzJdO1xuICAgICAgICAgICAgdmFyICQkaXRlbVN0YWNrRnJvbUl0ZW1fMSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtU3RhY2tcIikuY29uc3RydWN0b3JzWzRdO1xuICAgICAgICAgICAgdmFyICQkcmVjaXBlSW50ZXJuYWxfMSA9IFtdO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoJCRyZWNpcGVMZWdlbmRfMSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgJCRyZWNpcGVJbnRlcm5hbF8xLnB1c2goJCRUb0NoYXJfMShrZXkpKTtcbiAgICAgICAgICAgICAgICB2YXIgaW5nID0gJCRyZWNpcGVMZWdlbmRfMVtrZXldO1xuICAgICAgICAgICAgICAgIHZhciBpbmdyZWRpZW50O1xuICAgICAgICAgICAgICAgIGlmIChpbmcudHlwZSA9PT0gXCJhaXJcIikge1xuICAgICAgICAgICAgICAgICAgICBpbmdyZWRpZW50ID0gXCJcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5nLnR5cGUgPT09IFwiYmxvY2tcIikge1xuICAgICAgICAgICAgICAgICAgICAkJGl0ZW1TdGFja0Zyb21CbG9ja1dpdGhNZXRhXzEoTW9kQVBJLmJsb2Nrc1tpbmcuaWRdLmdldFJlZigpLCAxLCBpbmcubWV0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZy50eXBlID09PSBcIml0ZW1cIikge1xuICAgICAgICAgICAgICAgICAgICAkJGl0ZW1TdGFja0Zyb21JdGVtXzEoTW9kQVBJLml0ZW1zW2luZy5pZF0uZ2V0UmVmKCksIDEsIGluZy5tZXRhIHx8IDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkJHJlY2lwZUludGVybmFsXzEucHVzaChpbmdyZWRpZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyICQkcmVjaXBlQ29udGVudHMgPSAkJHJlY2lwZVBhdHRlcm4ubWFwKGZ1bmN0aW9uIChyb3cpIHsgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihyb3cpOyB9KTtcbiAgICAgICAgICAgIHZhciAkJHJlY2lwZSA9IE1vZEFQSS51dGlsLm1ha2VBcnJheSgkJE9iamVjdENsYXNzLCAkJHJlY2lwZUNvbnRlbnRzLmNvbmNhdCgkJHJlY2lwZUludGVybmFsXzEpKTtcbiAgICAgICAgICAgIC8vIFBhcnNlIHJlc3VsdFxuICAgICAgICAgICAgdmFyIHJlcyA9IHBhcnNlRW50cnlfMShyZXN1bHQpO1xuICAgICAgICAgICAgdmFyICQkcmVzdWx0SXRlbSA9IChyZXMudHlwZSA9PT0gXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgID8gJCRpdGVtU3RhY2tGcm9tQmxvY2tXaXRoTWV0YV8xKE1vZEFQSS5ibG9ja3NbcmVzLmlkXS5nZXRSZWYoKSwgMSwgcmVzLm1ldGEpXG4gICAgICAgICAgICAgICAgOiAkJGl0ZW1TdGFja0Zyb21JdGVtXzEoTW9kQVBJLml0ZW1zW3Jlcy5pZF0uZ2V0UmVmKCksIDEsIHJlcy5tZXRhIHx8IDApO1xuICAgICAgICAgICAgdmFyICQkY3JhZnRpbmdNYW5hZ2VyID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLmNyYWZ0aW5nLkNyYWZ0aW5nTWFuYWdlclwiKVxuICAgICAgICAgICAgICAgIC5zdGF0aWNNZXRob2RzLmdldEluc3RhbmNlLm1ldGhvZCgpO1xuICAgICAgICAgICAgTW9kQVBJLmhvb2tzLm1ldGhvZHMubm1pY19DcmFmdGluZ01hbmFnZXJfYWRkUmVjaXBlKCQkY3JhZnRpbmdNYW5hZ2VyLCAkJHJlc3VsdEl0ZW0sICQkcmVjaXBlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICA7XG4gICAgaWYgKE1vZEFQSS5pdGVtcykge1xuICAgICAgICAkJGludGVybmFsUmVnaXN0ZXIoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsICQkaW50ZXJuYWxSZWdpc3Rlcik7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIE9SZWNpcGUoQSwgQiwgQywgRCwgRSwgRiwgRywgSCwgSSwgcmVzdWx0SXRlbSkge1xuICAgIHZhciBwYXR0ZXJuU3RyaW5nID0gXCJcIi5jb25jYXQoQSwgXCIsXCIpLmNvbmNhdChCLCBcIixcIikuY29uY2F0KEMsIFwiLFwiKS5jb25jYXQoRCwgXCIsXCIpLmNvbmNhdChFLCBcIixcIikuY29uY2F0KEYsIFwiLFwiKS5jb25jYXQoRywgXCIsXCIpLmNvbmNhdChILCBcIixcIikuY29uY2F0KEkpO1xuICAgIGlmICghTW9kQVBJLnNlcnZlcikge1xuICAgICAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVyT1JlY2lwZShcXFwiXCIuY29uY2F0KHBhdHRlcm5TdHJpbmcsIFwiXFxcIiwgXFxcIlwiKS5jb25jYXQocmVzdWx0SXRlbSwgXCJcXFwiKTtcIikpO1xuICAgIH1cbiAgICBnbG9iYWxUaGlzLnJlZ2lzdGVyT3Zlbk1ES1JlY2lwZShwYXR0ZXJuU3RyaW5nLCByZXN1bHRJdGVtKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck92ZW5NREtGdXJuYWNlUmVjaXBlKGlucHV0X2l0ZW0sIHJlc3VsdEl0ZW0sIGV4cGVyaWVuY2UpIHtcbiAgICBmdW5jdGlvbiAkJGludGVybmFsUmVnaXN0ZXIoKSB7XG4gICAgICAgIHZhciBJdGVtU3RhY2tDdG9yRnJvbUJsb2NrID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1TdGFja1wiKS5jb25zdHJ1Y3RvcnNbMV07XG4gICAgICAgIHZhciBJdGVtU3RhY2tDdG9yRnJvbUl0ZW0gPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVN0YWNrXCIpLmNvbnN0cnVjdG9yc1s0XTtcbiAgICAgICAgdmFyIEZ1cm5hY2VSZWNpcGVzSW5zdGFuY2UgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiRnVybmFjZVJlY2lwZXNcIikuc3RhdGljVmFyaWFibGVzLnNtZWx0aW5nQmFzZSk7XG4gICAgICAgIHZhciBwYXJzZUVudHJ5ID0gZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICB2YXIgdHlwZTtcbiAgICAgICAgICAgIHZhciBpZCA9IGVudHJ5O1xuICAgICAgICAgICAgdmFyIG1ldGEgPSAwO1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQFwiKSkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IGlkLnNwbGl0KFwiQFwiKTtcbiAgICAgICAgICAgICAgICBpZCA9IHBhcnRzWzBdO1xuICAgICAgICAgICAgICAgIG1ldGEgPSBwYXJzZUludChwYXJ0c1sxXSwgMTApIHx8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuc3RhcnRzV2l0aChcImJsb2NrL1wiKSkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgaWQgPSBpZC5yZXBsYWNlKFwiYmxvY2svXCIsIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaWQuc3RhcnRzV2l0aChcIml0ZW0vXCIpKSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiaXRlbVwiO1xuICAgICAgICAgICAgICAgIGlkID0gaWQucmVwbGFjZShcIml0ZW0vXCIsIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKE1vZEFQSS5ibG9ja3NbaWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKE1vZEFQSS5pdGVtc1tpZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFwiaXRlbVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBpdGVtL2Jsb2NrIGlkOiBcIi5jb25jYXQoZW50cnkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiB0eXBlLCBpZDogaWQsIG1ldGE6IG1ldGEgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGlucHV0ID0gcGFyc2VFbnRyeShpbnB1dF9pdGVtKTtcbiAgICAgICAgdmFyIG91dHB1dCA9IHBhcnNlRW50cnkocmVzdWx0SXRlbSk7XG4gICAgICAgIHZhciAkJG91dHB1dFN0YWNrID0gb3V0cHV0LnR5cGUgPT09IFwiYmxvY2tcIlxuICAgICAgICAgICAgPyBJdGVtU3RhY2tDdG9yRnJvbUJsb2NrKE1vZEFQSS5ibG9ja3Nbb3V0cHV0LmlkXS5nZXRSZWYoKSwgMSlcbiAgICAgICAgICAgIDogSXRlbVN0YWNrQ3RvckZyb21JdGVtKE1vZEFQSS5pdGVtc1tvdXRwdXQuaWRdLmdldFJlZigpLCAxKTtcbiAgICAgICAgaWYgKGlucHV0LnR5cGUgPT09IFwiYmxvY2tcIikge1xuICAgICAgICAgICAgRnVybmFjZVJlY2lwZXNJbnN0YW5jZS5hZGRTbWVsdGluZ1JlY2lwZUZvckJsb2NrKE1vZEFQSS5ibG9ja3NbaW5wdXQuaWRdLmdldFJlZigpLCAkJG91dHB1dFN0YWNrLCBleHBlcmllbmNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIEZ1cm5hY2VSZWNpcGVzSW5zdGFuY2UuYWRkU21lbHRpbmcoTW9kQVBJLml0ZW1zW2lucHV0LmlkXS5nZXRSZWYoKSwgJCRvdXRwdXRTdGFjaywgZXhwZXJpZW5jZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKE1vZEFQSS5pdGVtcyAmJiBNb2RBUEkuYmxvY2tzKSB7XG4gICAgICAgICQkaW50ZXJuYWxSZWdpc3RlcigpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJib290c3RyYXBcIiwgJCRpbnRlcm5hbFJlZ2lzdGVyKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gT0Z1cm5hbmNlUmVjaXBlKGlucHV0X2l0ZW0sIHJlc3VsdEl0ZW0sIGV4cGVyaWVuY2UpIHtcbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT0Z1cm5hY2VSZWNpcGVzIGRvIG5vdCB3b3JrIGluIDEuMTIuMiBwbGVhc2UgdXNlIDEuOCBmb3IgT0Z1cm5hY2VSZWNpcGVzIVwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJPRnVybmFuY2VSZWNpcGUoXFxcIlwiLmNvbmNhdChpbnB1dF9pdGVtLCBcIlxcXCIsIFxcXCJcIikuY29uY2F0KHJlc3VsdEl0ZW0sIFwiXFxcIiwgXCIpLmNvbmNhdChleHBlcmllbmNlLCBcIik7XCIpKTtcbiAgICAgICAgZ2xvYmFsVGhpcy5yZWdpc3Rlck92ZW5NREtGdXJuYWNlUmVjaXBlKGlucHV0X2l0ZW0sIHJlc3VsdEl0ZW0sIGV4cGVyaWVuY2UpO1xuICAgIH1cbiAgICA7XG59XG4iLCIvKlxuICAgIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cbiAgICBPdmVuLnRzXG4gICAgXG4gICAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG52YXIgT3ZlbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPdmVuKCkge1xuICAgIH1cbiAgICBPdmVuLnJlZ2lzdGVyTW9kID0gZnVuY3Rpb24gKG1vZENsYXNzKSB7XG4gICAgICAgIE1vZEFQSS5tZXRhLnRpdGxlKG1vZENsYXNzLnRpdGxlKTtcbiAgICAgICAgTW9kQVBJLm1ldGEudmVyc2lvbihtb2RDbGFzcy52ZXJzaW9uKTtcbiAgICAgICAgTW9kQVBJLm1ldGEuZGVzY3JpcHRpb24obW9kQ2xhc3MuZGVzY3JpcHRpb24pO1xuICAgICAgICBNb2RBUEkubWV0YS5jcmVkaXRzKG1vZENsYXNzLmNyZWRpdHMpO1xuICAgICAgICBNb2RBUEkubWV0YS5pY29uKG1vZENsYXNzLmljb24pO1xuICAgICAgICBNb2RBUEkubWV0YS5jb25maWcobW9kQ2xhc3MuY29uZmlnKTtcbiAgICAgICAgZ2xvYmFsVGhpcy5EZWJ1Z19tb2RlID0gbW9kQ2xhc3MuRGVidWdfbW9kZTtcbiAgICAgICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5EZWJ1Z19tb2RlID0gXCIuY29uY2F0KG1vZENsYXNzLkRlYnVnX21vZGUsIFwiO1wiKSk7XG4gICAgICAgIG1vZENsYXNzLmluaXQoKTtcbiAgICAgICAgdGhpcy5tb2RzLnB1c2gobW9kQ2xhc3MpO1xuICAgIH07XG4gICAgT3Zlbi5tb2RzID0gW107XG4gICAgT3Zlbi51dGlsID0ge1xuICAgICAgICBvZ2d0b0Jhc2U2NHN0cmluZzogZnVuY3Rpb24gKG9nZykge1xuICAgICAgICAgICAgdmFyIGJhc2U2NCA9IGJ0b2EobmV3IFVpbnQ4QXJyYXkob2dnLnNwbGl0KFwiLFwiKS5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHBhcnNlSW50KHgsIDEwKTsgfSkpLnJlZHVjZShmdW5jdGlvbiAoZGF0YSwgYnl0ZSkgeyByZXR1cm4gZGF0YSArIFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZSk7IH0sIFwiXCIpKTtcbiAgICAgICAgICAgIHJldHVybiBiYXNlNjQ7XG4gICAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gT3Zlbjtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBPdmVuO1xuIiwiLypcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICBPdmVuIE1vZCBEZXZlbG9wbWVudCBLaXQgKE92ZW5NREspIFJ1bnRpbWVcbiAgRGV2IGtpdCB1c2VkIGZvciBzaW1wbGlmeWluZyBFYWdsZXJGb3JnZSBtb2QgZGV2ZWxvcG1lbnQuXG4gICAgXG4gIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE92ZW5NREsuXG5cbiAgICBPdmVuTURLIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXJcbiAgICB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWVcbiAgICBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pXG4gICAgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICBPdmVuTURLIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWVxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1NcbiAgICBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYWxvbmdcbiAgICB3aXRoIE92ZW4gTURLLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbnZhciBPdmVuT3JlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE92ZW5PcmUoYmxvY2tJRCwgdmVpblNpemUsIHZlaW5Db3VudCwgbWluR2VuZXJhdGlvbkhlaWdodCwgbWF4R2VuZXJhdGlvbkhlaWdodCkge1xuICAgICAgICB0aGlzLmJsb2NrSUQgPSBibG9ja0lEO1xuICAgICAgICB0aGlzLnZlaW5TaXplID0gdmVpblNpemU7XG4gICAgICAgIHRoaXMudmVpbkNvdW50ID0gdmVpbkNvdW50O1xuICAgICAgICB0aGlzLm1pbkdlbmVyYXRpb25IZWlnaHQgPSBtaW5HZW5lcmF0aW9uSGVpZ2h0O1xuICAgICAgICB0aGlzLm1heEdlbmVyYXRpb25IZWlnaHQgPSBtYXhHZW5lcmF0aW9uSGVpZ2h0O1xuICAgIH1cbiAgICBPdmVuT3JlLnByb3RvdHlwZS5yZWdpc3Rlck92ZW5PcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJPdmVuT3JlU2VydmVyKFxcXCJcIi5jb25jYXQodGhpcy5ibG9ja0lELCBcIlxcXCIsXCIpLmNvbmNhdCh0aGlzLnZlaW5TaXplLCBcIixcIikuY29uY2F0KHRoaXMudmVpbkNvdW50LCBcIixcIikuY29uY2F0KHRoaXMubWluR2VuZXJhdGlvbkhlaWdodCwgXCIsXCIpLmNvbmNhdCh0aGlzLm1heEdlbmVyYXRpb25IZWlnaHQsIFwiKTtcIikpO1xuICAgIH07XG4gICAgcmV0dXJuIE92ZW5PcmU7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgT3Zlbk9yZTtcbiIsIi8qXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICAgIGNvbW1hbmRzLnRzXG4gICAgXG4gICAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5leHBvcnQgZnVuY3Rpb24gc2ltcGxlY29tbWFuZChwcmVmaXgsIG5hbWUsIG9uRXhlY3V0ZSkge1xuICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwic2VuZGNoYXRtZXNzYWdlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLm1lc3NhZ2UudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKFwiXCIuY29uY2F0KHByZWZpeCkuY29uY2F0KG5hbWUpKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XG4gICAgICAgICAgICBvbkV4ZWN1dGUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiZnVuY3Rpb24gZGVmYXVsdFRpbWUoKSB7XG4gICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIHBhZCA9IGZ1bmN0aW9uIChuLCBsZW4pIHtcbiAgICAgICAgaWYgKGxlbiA9PT0gdm9pZCAwKSB7IGxlbiA9IDI7IH1cbiAgICAgICAgcmV0dXJuIFN0cmluZyhuKS5wYWRTdGFydChsZW4sICcwJyk7XG4gICAgfTtcbiAgICByZXR1cm4gXCJcIi5jb25jYXQocGFkKG5vdy5nZXRIb3VycygpKSwgXCI6XCIpLmNvbmNhdChwYWQobm93LmdldE1pbnV0ZXMoKSksIFwiOlwiKS5jb25jYXQocGFkKG5vdy5nZXRTZWNvbmRzKCkpLCBcIitcIikuY29uY2F0KHBhZChub3cuZ2V0TWlsbGlzZWNvbmRzKCksIDMpKTtcbn1cbnZhciBPdmVuTURLTG9nZ2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE92ZW5NREtMb2dnZXIoX2EpIHtcbiAgICAgICAgdmFyIF9iID0gX2EgPT09IHZvaWQgMCA/IHt9IDogX2EsIF9jID0gX2IuYXBwTmFtZSwgYXBwTmFtZSA9IF9jID09PSB2b2lkIDAgPyAnT3Zlbk1ESycgOiBfYywgX2QgPSBfYi5nZXRUaW1lLCBnZXRUaW1lID0gX2QgPT09IHZvaWQgMCA/IGRlZmF1bHRUaW1lIDogX2Q7XG4gICAgICAgIHRoaXMuYmFzZVN0eWxlID0gJ2ZvbnQtd2VpZ2h0OiBib2xkOyBib3JkZXItcmFkaXVzOiA0cHg7IHBhZGRpbmc6IDAgOHB4OyBmb250LXNpemU6IDEycHgnO1xuICAgICAgICB0aGlzLmxldmVsSWNvbnMgPSB7XG4gICAgICAgICAgICBsb2c6ICfwn5OYJyxcbiAgICAgICAgICAgIGluZm86ICfihLnvuI8nLFxuICAgICAgICAgICAgd2FybjogJ+KaoO+4jycsXG4gICAgICAgICAgICBlcnJvcjogJ+KdjCcsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGFnU3R5bGVzID0ge1xuICAgICAgICAgICAgbG9nOiBcImJhY2tncm91bmQ6ICNENkVBRkY7IGNvbG9yOiAjMDAzRjY2OyBcIi5jb25jYXQodGhpcy5iYXNlU3R5bGUpLFxuICAgICAgICAgICAgaW5mbzogXCJiYWNrZ3JvdW5kOiAjOTRDQ0ZGOyBjb2xvcjogIzFBMjM3RTsgXCIuY29uY2F0KHRoaXMuYmFzZVN0eWxlKSxcbiAgICAgICAgICAgIHdhcm46IFwiYmFja2dyb3VuZDogI0ZGRjlCMDsgY29sb3I6ICM4QTZEMDA7IFwiLmNvbmNhdCh0aGlzLmJhc2VTdHlsZSksXG4gICAgICAgICAgICBlcnJvcjogXCJiYWNrZ3JvdW5kOiAjRkY1NTU1OyBjb2xvcjogI0ZGRkZGRjsgXCIuY29uY2F0KHRoaXMuYmFzZVN0eWxlKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hcHBTdHlsZSA9IFwiYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjNkExMUNCLCAjMjU3NUZDKTsgY29sb3I6ICNGRkZGRkY7IFwiLmNvbmNhdCh0aGlzLmJhc2VTdHlsZSk7XG4gICAgICAgIHRoaXMudGltZVN0eWxlID0gXCJiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICM0M0U5N0IsICMzOEY5RDcpOyBjb2xvcjogIzAwM0YzRjsgXCIuY29uY2F0KHRoaXMuYmFzZVN0eWxlKTtcbiAgICAgICAgdGhpcy5hcHBOYW1lID0gYXBwTmFtZTtcbiAgICAgICAgdGhpcy5nZXRUaW1lID0gZ2V0VGltZTtcbiAgICB9XG4gICAgT3Zlbk1ES0xvZ2dlci5wcm90b3R5cGUubG9nU3R5bGVkID0gZnVuY3Rpb24gKGxldmVsLCBjb250ZW50KSB7XG4gICAgICAgIHZhciBsZXZlbFN0eWxlID0gdGhpcy50YWdTdHlsZXNbbGV2ZWxdO1xuICAgICAgICB2YXIgaWNvbiA9IHRoaXMubGV2ZWxJY29uc1tsZXZlbF07XG4gICAgICAgIHZhciBsYWJlbCA9IFwiJWNcXHUyNzI2IFwiLmNvbmNhdCh0aGlzLmFwcE5hbWUsIFwiIFxcdTI3MjYlYyAlY1wiKS5jb25jYXQodGhpcy5nZXRUaW1lKCksIFwiJWMgJWNcIikuY29uY2F0KGljb24sIFwiIFwiKS5jb25jYXQobGV2ZWwudG9VcHBlckNhc2UoKSwgXCIlYyBcIikuY29uY2F0KGNvbnRlbnQpO1xuICAgICAgICB2YXIgY29uc29sZU1ldGhvZCA9IGNvbnNvbGVbbGV2ZWxdIHx8IGNvbnNvbGUubG9nO1xuICAgICAgICBjb25zb2xlTWV0aG9kLmNhbGwoY29uc29sZSwgbGFiZWwsIHRoaXMuYXBwU3R5bGUsICcnLCB0aGlzLnRpbWVTdHlsZSwgJycsIGxldmVsU3R5bGUsICcnKTtcbiAgICB9O1xuICAgIE92ZW5NREtMb2dnZXIucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICAgIHRoaXMubG9nU3R5bGVkKCdsb2cnLCBjb250ZW50KTtcbiAgICB9O1xuICAgIE92ZW5NREtMb2dnZXIucHJvdG90eXBlLmluZm8gPSBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICB0aGlzLmxvZ1N0eWxlZCgnaW5mbycsIGNvbnRlbnQpO1xuICAgIH07XG4gICAgT3Zlbk1ES0xvZ2dlci5wcm90b3R5cGUud2FybiA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICAgIHRoaXMubG9nU3R5bGVkKCd3YXJuJywgY29udGVudCk7XG4gICAgfTtcbiAgICBPdmVuTURLTG9nZ2VyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICAgIHRoaXMubG9nU3R5bGVkKCdlcnJvcicsIGNvbnRlbnQpO1xuICAgIH07XG4gICAgcmV0dXJuIE92ZW5NREtMb2dnZXI7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgT3Zlbk1ES0xvZ2dlcjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICBPdmVuIE1vZCBEZXZlbG9wbWVudCBLaXQgKE92ZW5NREspIFJ1bnRpbWVcbiAgRGV2IGtpdCB1c2VkIGZvciBzaW1wbGlmeWluZyBFYWdsZXJGb3JnZSBtb2QgZGV2ZWxvcG1lbnQuXG4gICAgXG4gIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE92ZW5NREsuXG5cbiAgICBPdmVuTURLIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXJcbiAgICB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWVcbiAgICBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pXG4gICAgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICBPdmVuTURLIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWVxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1NcbiAgICBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYWxvbmdcbiAgICB3aXRoIE92ZW4gTURLLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbmltcG9ydCBpY29uIGZyb20gXCJBU1NFVFMvZGVmYXVsdEljb24ucG5nXCI7XG5Nb2RBUEkubWV0YS50aXRsZShcIk92ZW5NREsgUnVudGltZVwiKTtcbk1vZEFQSS5tZXRhLnZlcnNpb24oXCJBbHBoYSB2MC4zXCIpO1xuTW9kQVBJLm1ldGEuZGVzY3JpcHRpb24oXCJVbm9mZmljaWFsIGRldiBraXQgdXNlZCBmb3Igc2ltcGxpZnlpbmcgRWFnbGVyRm9yZ2UgbW9kIGRldmVsb3BtZW50LlwiKTtcbk1vZEFQSS5tZXRhLmNyZWRpdHMoXCJCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlwiKTtcbk1vZEFQSS5tZXRhLmljb24oaWNvbik7XG5pbXBvcnQgeyByZWdpc3RlclNlcnZlckl0ZW0sIHJlZ2lzdGVyU2VydmVyQmxvY2ssIHJlZ2lzdGVyRW50aXR5U2VydmVyLCBPdmVuTURLX19kZWZpbmVFeGVjQ21kQXNHbG9iYWwsIHJlZ2lzdGVyT3Zlbk9yZVNlcnZlciwgfSBmcm9tIFwiLi9jbGFzc2VzL2NvcmUvSGVscGVyX2Z1bmNcIjtcbmltcG9ydCBPSXRlbSBmcm9tIFwiLi9jbGFzc2VzL2NvcmUvT0l0ZW1cIjtcbmltcG9ydCBPTW9kIGZyb20gXCIuL2NsYXNzZXMvY29yZS9Nb2RcIjtcbmltcG9ydCBPdmVuIGZyb20gXCIuL2NsYXNzZXMvY29yZS9PdmVuXCI7XG5pbXBvcnQgT0Jsb2NrIGZyb20gXCIuL2NsYXNzZXMvY29yZS9PQmxvY2tcIjtcbmltcG9ydCB7IHNpbXBsZWNvbW1hbmQgfSBmcm9tIFwiLi9jbGFzc2VzL2NvcmUvY29tbWFuZHNcIjtcbmltcG9ydCBPRW50aXR5IGZyb20gXCIuL2NsYXNzZXMvY29yZS9PRW50aXR5XCI7XG5pbXBvcnQgT3Zlbk9yZSBmcm9tIFwiLi9jbGFzc2VzL2NvcmUvT3Zlbk9yZVwiO1xuaW1wb3J0IHsgT1JlY2lwZSwgcmVnaXN0ZXJPdmVuTURLUmVjaXBlLCBPRnVybmFuY2VSZWNpcGUsIHJlZ2lzdGVyT3Zlbk1ES0Z1cm5hY2VSZWNpcGUgfSBmcm9tIFwiY2xhc3Nlcy9jb3JlL09SZWNpcGVcIjtcbmltcG9ydCBPdmVuTURLTG9nZ2VyIGZyb20gXCIuL2NsYXNzZXMvY29yZS9sb2dcIjtcbnZhciBkZXZtb2RlID0gdHJ1ZTtcbk1vZEFQSS5ldmVudHMubmV3RXZlbnQoXCJsaWI6T3Zlbk1ESzpsb2FkXCIpO1xuTW9kQVBJLmV2ZW50cy5uZXdFdmVudChcImxpYjpPdmVuTURLOmxvYWRlZFwiKTtcbk1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOk92ZW5NREs6bG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgbmV3IE92ZW5NREtMb2dnZXIoeyBhcHBOYW1lOiBcIk92ZW5NREtcIiB9KS5sb2coXCJJbml0aWFsaXppbmcgT3Zlbk1ESyBSdW50aW1lXCIpO1xuICAgIG5ldyBPdmVuTURLTG9nZ2VyKHsgYXBwTmFtZTogXCJPdmVuTURLXCIgfSkubG9nKFwiTG9hZGluZyBPdmVuTURLIGdsb2JhbHNcIik7XG4gICAgZnVuY3Rpb24gT3Zlbk1ES19sb2dfaGVscGVyKG1zZykge1xuICAgICAgICBuZXcgT3Zlbk1ES0xvZ2dlcih7IGFwcE5hbWU6IFwiT3Zlbk1ES1wiIH0pLmxvZyhtc2cpO1xuICAgIH1cbiAgICBnbG9iYWxUaGlzLk92ZW5NREtMb2dnZXIgPSBPdmVuTURLX2xvZ19oZWxwZXI7XG4gICAgZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckl0ZW0gPSByZWdpc3RlclNlcnZlckl0ZW07XG4gICAgZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckJsb2NrID0gcmVnaXN0ZXJTZXJ2ZXJCbG9jaztcbiAgICBnbG9iYWxUaGlzLnJlZ2lzdGVyRW50aXR5U2VydmVyID0gcmVnaXN0ZXJFbnRpdHlTZXJ2ZXI7XG4gICAgZ2xvYmFsVGhpcy5PSXRlbSA9IE9JdGVtO1xuICAgIGdsb2JhbFRoaXMuT01vZCA9IE9Nb2Q7XG4gICAgZ2xvYmFsVGhpcy5PdmVuTURLID0gT3ZlbjtcbiAgICBnbG9iYWxUaGlzLk9CbG9jayA9IE9CbG9jaztcbiAgICBnbG9iYWxUaGlzLnNpbXBsZWNvbW1hbmQgPSBzaW1wbGVjb21tYW5kO1xuICAgIGdsb2JhbFRoaXMuT3Zlbk9yZSA9IE92ZW5PcmU7XG4gICAgZ2xvYmFsVGhpcy5yZWdpc3Rlck92ZW5PcmVTZXJ2ZXIgPSByZWdpc3Rlck92ZW5PcmVTZXJ2ZXI7XG4gICAgZ2xvYmFsVGhpcy5PRW50aXR5ID0gT0VudGl0eTtcbiAgICBnbG9iYWxUaGlzLk9SZWNpcGUgPSBPUmVjaXBlO1xuICAgIGdsb2JhbFRoaXMucmVnaXN0ZXJPdmVuTURLUmVjaXBlID0gcmVnaXN0ZXJPdmVuTURLUmVjaXBlO1xuICAgIGdsb2JhbFRoaXMuT0Z1cm5hbmNlUmVjaXBlID0gT0Z1cm5hbmNlUmVjaXBlO1xuICAgIGdsb2JhbFRoaXMucmVnaXN0ZXJPdmVuTURLRnVybmFjZVJlY2lwZSA9IHJlZ2lzdGVyT3Zlbk1ES0Z1cm5hY2VSZWNpcGU7XG4gICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIGlmICghZGV2bW9kZSkge1xuICAgICAgICAgICAgYWxlcnQoXCJPdmVuTURLIGRvZXMgbm90IGZ1bGx5IHN1cHBvcnQgMS4xMiBhdCB0aGlzIHRpbWUsIHBsZWFzZSB1c2UgMS44LjggZm9yIGZ1bGwgc3VwcG9ydFwiKTtcbiAgICAgICAgICAgIG5ldyBnbG9iYWxUaGlzLk92ZW5NREtMb2dnZXIoXCIxLjEyIGRldGVjdGVkXCIpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk92ZW5NREsgZG9lcyBub3QgZnVsbHkgc3VwcG9ydCAxLjEyIGF0IHRoaXMgdGltZSwgcGxlYXNlIHVzZSAxLjguOCBmb3IgZnVsbCBzdXBwb3J0XCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG5ldyBnbG9iYWxUaGlzLk92ZW5NREtMb2dnZXIoXCJPdmVuTURLIGdsb2JhbHMgaGF2ZSBiZWVuIHNldCBhbmQgbG9hZGVkXCIpO1xuICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJJdGVtID0gXCIuY29uY2F0KHJlZ2lzdGVyU2VydmVySXRlbSwgXCI7XCIpKTtcbiAgICBuZXcgZ2xvYmFsVGhpcy5PdmVuTURLTG9nZ2VyKFwiUmVnaXN0ZXIgSXRlbSBzZXJ2ZXJzaWRlIGZ1bmN0aW9uIGxvYWRlZFwiKTtcbiAgICAvKk1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcbiAgICAgIGBuZXcgZ2xvYmFsVGhpcy5PdmVuTURLTG9nZ2VyID0gJHtPdmVuTURLX2xvZ19oZWxwZXJ9O2BcbiAgICApO1xuICAgICovIG5ldyBnbG9iYWxUaGlzLk92ZW5NREtMb2dnZXIoXCJzZXJ2ZXIgc2lkZSBsb2dnZXIgZnVuY3Rpb24gbG9hZGVkXCIpO1xuICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJPdmVuT3JlU2VydmVyID0gXCIuY29uY2F0KHJlZ2lzdGVyT3Zlbk9yZVNlcnZlciwgXCI7XCIpKTtcbiAgICBuZXcgZ2xvYmFsVGhpcy5PdmVuTURLTG9nZ2VyKFwiUmVnaXN0ZXIgT3ZlbiBPcmUgc2VydmVyc2lkZSBmdW5jdGlvbiBsb2FkZWRcIik7XG4gICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlck9SZWNpcGUgPSBcIi5jb25jYXQocmVnaXN0ZXJPdmVuTURLUmVjaXBlLCBcIjtcIikpO1xuICAgIG5ldyBnbG9iYWxUaGlzLk92ZW5NREtMb2dnZXIoXCJSZWdpc3RlciBPUmVjaXBlIHNlcnZlcnNpZGUgZnVuY3Rpb24gbG9hZGVkXCIpO1xuICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJPRnVybmFuY2VSZWNpcGUgPSBcIi5jb25jYXQocmVnaXN0ZXJPdmVuTURLRnVybmFjZVJlY2lwZSwgXCI7XCIpKTtcbiAgICBuZXcgZ2xvYmFsVGhpcy5PdmVuTURLTG9nZ2VyKFwiUmVnaXN0ZXIgT0Z1cm5hbmNlUmVjaXBlIHNlcnZlcnNpZGUgZnVuY3Rpb24gbG9hZGVkXCIpO1xuICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShPdmVuTURLX19kZWZpbmVFeGVjQ21kQXNHbG9iYWwpO1xuICAgIE92ZW5NREtfX2RlZmluZUV4ZWNDbWRBc0dsb2JhbCgpO1xuICAgIG5ldyBnbG9iYWxUaGlzLk92ZW5NREtMb2dnZXIoXCJPdmVuTURLX19FeGVjQ21kQXNHbG9iYWwgc2VydmVyc2lkZSBhbmQgY2xpZW50c2lkZSBmdW5jdGlvbiBsb2FkZWRcIik7XG4gICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckJsb2NrID0gXCIuY29uY2F0KHJlZ2lzdGVyU2VydmVyQmxvY2ssIFwiO1wiKSk7XG4gICAgbmV3IGdsb2JhbFRoaXMuT3Zlbk1ES0xvZ2dlcihcIlJlZ2lzdGVyIEVudGl0eSBzZXJ2ZXJzaWRlIGZ1bmN0aW9uIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyRW50aXR5U2VydmVyID0gXCIuY29uY2F0KHJlZ2lzdGVyRW50aXR5U2VydmVyLCBcIjtcIikpO1xuICAgIG5ldyBnbG9iYWxUaGlzLk92ZW5NREtMb2dnZXIoXCJSZWdpc3RlciBCbG9jayBzZXJ2ZXJzaWRlIGZ1bmN0aW9uIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZXZlbnRzLmNhbGxFdmVudChcImxpYjpPdmVuTURLOmxvYWRlZFwiLCB7IHZlcnNpb246IFwidjAuNFwiIH0pO1xufSk7XG5Nb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjpPdmVuTURLOmxvYWRlZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBuZXcgZ2xvYmFsVGhpcy5PdmVuTURLTG9nZ2VyKFwiT3Zlbk1ESyBSdW50aW1lIGhhcyBmaW5pc2hlZCBsb2FkaW5nXCIpO1xuICAgIG5ldyBnbG9iYWxUaGlzLk92ZW5NREtMb2dnZXIoXCJcXG4gICAgXFx1MjUwQ1xcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUxMFxcbiAgICBcXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICBPdmVuTURLIGhhcyBsb2FkZWQgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgd2VsY29tZSB0byBvdmVuTURLICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgIEEgbW9kIGRldiBraXQgZm9yIHN0YXJ0ZXJzICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICBWZXJzaW9uOiBcIi5jb25jYXQoZXZlbnQudmVyc2lvbiwgXCIgICAgICAgICAgICAgICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MTRcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MThcXG4gICAgXCIpKTtcbiAgICBzaW1wbGVjb21tYW5kKFwiL292ZW5tZGtcIiwgXCIgbG9nXzFcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBNb2RBUEkuZGlzcGxheVRvQ2hhdChcIlxcbiAgICAgIE92ZW5NREsgUnVudGltZSB2MC4xXFxuICAgICAgTWFkZSBieSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxcbiAgICAgIC0gQWRkZWQgYmFzaWMgY29yZSBjbGFzc2VzXFxuICAgICAgKCBOb3QgbXVjaCBjYW4gYmUgZG9jdW1lbnRlZCBkdWUgdG8gc28gbGl0dGxlIGJlaW5nIGFkZGVkIClcIik7XG4gICAgfSk7XG4gICAgc2ltcGxlY29tbWFuZChcIi9vdmVubWRrXCIsIFwiIGxvZ18yXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgTW9kQVBJLmRpc3BsYXlUb0NoYXQoXCJcXG4gICAgICBPdmVuTURLIFJ1bnRpbWUgdjAuMlxcbiAgICAgIE1hZGUgYnkgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcXG4gICAgICAtIEFkZGVkIHN1cHBvcnQgZm9yIDEuMTJcXG4gICAgICAtIEFkZGVkIHN1cHBvcnQgZm9yIE92ZW5PcmVcXG4gICAgICAtIEFkZGVkIHN1cHBvcnQgZm9yIE9FbnRpdHlcXG4gICAgICAtIFFPTCBpbXByb3ZlbWVudHNcXG4gICAgICAtIEFkZGVkIHN1cHBvcnQgZm9yIE92ZW5NREtfX0V4ZWNDbWRBc0dsb2JhbFxcbiAgICAgIC0gQWRkZWQgc3VwcG9ydCBmb3IgT3Zlbk1ES19fZGVmaW5lRXhlY0NtZEFzR2xvYmFsXFxuICAgICAgLSBBZGRlZCBzdXBwb3J0IGZvciBzaW1wbGVjb21tYW5kc1wiKTtcbiAgICB9KTtcbiAgICBzaW1wbGVjb21tYW5kKFwiL292ZW5tZGtcIiwgXCIgbG9nXzNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBNb2RBUEkuZGlzcGxheVRvQ2hhdChcIlxcbiAgICAgIE92ZW5NREsgUnVudGltZSB2MC4zXFxuICAgICAgTWFkZSBieSBCZW5kaWVHYW1lc1xcbiAgICAgIC0gQWRkZWQgbW9yZSBPRW50aXR5IGN1c3RvbWl6YXRpb25cXG4gICAgICAgIC0gQWRkZWQgbW9yZSBzdXBwb3J0IGZvciBNb2RlbCBoaXRib2V4ZXNcXG4gICAgICAgIC0gQWRkZWQgY3VzdG9tIGVudGl0eSBzb3VuZCBzdXBwb3J0XFxuICAgICAgICAtIEFkZGVkIGN1c3RvbSBjcmFmdGluZyByZWNpcGVzIGhvd2V2ZXIgdGhleSBhcmUgbm90IGZpbmlzaGVkIHlldCAoIEJyb2tlbiBpbiAxLjEyKVxcbiAgICAgICAgLSBBdHRlbXB0ZWQgdG8gZml4IGl0ZW1zIHRleHR1cmVzIG9uIDEuMTIgd2l0aCBubyBzdWNjZXNzXCIpO1xuICAgIH0pO1xuICAgIHNpbXBsZWNvbW1hbmQoXCIvb3Zlbm1ka1wiLCBcIiBsb2dfNFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIE1vZEFQSS5kaXNwbGF5VG9DaGF0KFwiXFxuICAgICAgT3Zlbk1ESyBSdW50aW1lIHYwLjRcXG4gICAgICBNYWRlIGJ5IEJlbmRpZUdhbWVzXFxuICAgICAgLSBBZGRlZCBjdXN0b20gQmxvY2sgZHJvcHNcXG4gICAgICAtIEFkZGVkIGJldHRlciBoYW5kbGluZyBmb3Igb3JlIGdlbmVyYXRpb25cXG4gICAgICAtIEFkZGVkIGN1c3RvbSBGdXJuYWNlIHJlY2lwZXNcXG4gICAgICAtIEFkZGVkIGN1c3RvbSBtb2RlbHMgZm9yIGJsb2NrcywgZW50aXRpZXMsIGFuZCBpdGVtc1xcbiAgICAgIC0gQWRkZWQgbW9yZSBjdXN0b21pemF0aW9ucyBmb3IgT0l0ZW1zIGFuZCBPQmxvY2tzXCIpO1xuICAgIH0pO1xufSk7XG5Nb2RBUEkuYWRkQ3JlZGl0KFwiT3Zlbk1ESyBSdW50aW1lXCIsIFwiQmVuZGllR2FtZXNcIiwgXCIgLSBNYWRlIE92ZW5NREtcXG4gLSBDb2RlZCBtb3N0IG9mIE92ZW5NREtcIik7XG5Nb2RBUEkuYWRkQ3JlZGl0KFwiT3Zlbk1ESyBSdW50aW1lXCIsIFwiQmxvY2tfMjIyMlwiLCBcIiAtIEZvdW5kZWQgT3Zlbk1ES1wiKTtcbk1vZEFQSS5ldmVudHMuY2FsbEV2ZW50KFwibGliOk92ZW5NREs6bG9hZFwiLCB7fSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=