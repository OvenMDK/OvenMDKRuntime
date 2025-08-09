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
            console.log("server itemstack:");
            console.log($$itemstack);
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
            console.log($$itemstack);
            return $$ActionResult($$ResultEnum.SUCCESS, $$itemstack);
        };
    }
    if (!ModAPI.is_1_12) {
        nmi_OvenItem.prototype.$onItemUse0 = function ($$itemstack, $$player, $$world, $$blockpos) {
            var $$itemstack, $$world, $$player, $$blockpos;
            onItemUse($$itemstack, $$world, $$player, $$blockpos);
            console.log("client itemstack:");
            console.log($$itemstack);
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
        console.log(itemInstance);
        console.log("Registered OvenMDK item ( Server Side )");
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
    /*if (ModAPI.isServer === false) {
          console.log("registerServerBlock can only be used on the server side.");
          return;
      }*/
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
        console.log("Registering block on server side");
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
            console.log("Registering block on server side");
            console.log(custom_block);
        });
    }
}
function registerEntityServer(entityID, entityName, entityModel, entityBreedItem, entityDropItem, eggBase, eggSpots) {
    var _a;
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
    var entitySize1 = 0.4;
    var entitySize2 = 0.7;
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
    else if (entityModel === "ModelSnowman" || entityModel === "ModelSnowGolem") {
        entitySize1 = 0.7; // Snow Golem
        entitySize2 = 1.9;
    }
    var entityClass = ModAPI.reflect.getClassById("net.minecraft.entity.passive.EntityAnimal");
    var entitySuper = ModAPI.reflect.getSuper(entityClass, function (x) { return x.length === 2; });
    var nme_OEntity = function nme_OEntity($worldIn) {
        entitySuper(this, $worldIn);
        this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
        this.wrapped.setSize(entitySize1, entitySize2);
        this.wrapped.tasks.addTask(0, AITask("EntityAISwimming", 1)(this));
        this.wrapped.tasks.addTask(1, AITask("EntityAIPanic", 2)(this, 1.9));
        this.wrapped.tasks.addTask(2, AITask("EntityAIMate", 2)(this, 1.0));
        this.wrapped.tasks.addTask(3, AITask("EntityAITempt", 4)(this, 1.5, ModAPI.items["".concat(entityBreedItem)].getRef(), 0)); //won't cause a problem as the bread is obtained when the entity is constructed.
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
        return ModAPI.items["".concat(entityDropItem)].getRef();
    };
    nme_OEntity.prototype.$createChild = function (otherParent) {
        var _a, _b;
        this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
        return new nme_OEntity((_b = (_a = this.wrapped.worldObj) === null || _a === void 0 ? void 0 : _a.getRef()) !== null && _b !== void 0 ? _b : null);
    };
    nme_OEntity.prototype.$isBreedingItem = function (itemstack) {
        return (itemstack !== null && itemstack.$getItem() === ModAPI.items["".concat(entityBreedItem)].getRef());
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
    ModAPI.reflect8a
        .getClassById("net.minecraft.entity.EntityList")
        .staticMethods.addMapping0.method(ModAPI.util.asClass(nme_OEntity), {
        $createEntity: function ($worldIn) {
            return new nme_OEntity($worldIn);
        },
    }, ModAPI.util.str(entityName), ID, eggBase || 0x5e3e2d, //egg base
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
    return _a = {},
        _a["Entity".concat(this.entityID)] = nme_OEntity,
        _a["Model".concat(this.entityID)] = nmcm_OEntityModel,
        _a["Render".concat(this.entityID)] = nmcre_RenderOEntity,
        _a["".concat(this.entityID, "Textures")] = duckTextures,
        _a;
}
/*export function isServerSide() {
    function subfunction() {
        console.log("isServerSide function called");
        console.log(`isServerSide: ${ModAPI.isServer}`);
        console.log(ModAPI.isServer);
    }
    subfunction();
    console.log(`isServerSide: ${ModAPI.isServer}`);
}*/
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
            console.log(server);
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
    function OEntity(entityName, entityID, entityTexture, entityModel, entity_sound_main, entityBreedItem, entityDropItem, eggBase, eggSpots) {
        this.entityName = entityName;
        this.entityID = entityID;
        this.entityTexture = entityTexture;
        this.entityModel = entityModel;
        this.entity_sound_main = entity_sound_main;
        this.entityBreedItem = entityBreedItem || "wheat"; //default breed item
        this.entityDropItem = entityDropItem || "feather"; //default drop item
        this.eggBase = eggBase || 0x5e3e2d; //default egg base color
        this.eggSpots = eggSpots || 0x269166; //default egg spots color
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
        if (ModAPI.is_1_12) {
            throw new Error("OEntity does not support 1.12, please use 1.8.8 for full support");
        }
        console.warn("entities are not finished yet! Use at your own risk!");
        //return;
        ModAPI.hooks.methods.jl_String_format = ModAPI.hooks.methods.nlev_HString_format; //temporary thing to fix an issue in eaglercraft
        // Utils
        function AITask(name, length) {
            return ModAPI.reflect.getClassById("net.minecraft.entity.ai." + name).constructors.find(function (x) { return x.length === length; });
        }
        var ResourceLocation = ModAPI.reflect.getClassByName("ResourceLocation").constructors.find(function (x) { return x.length === 1; });
        var EntityPlayer = ModAPI.reflect.getClassByName("EntityPlayer");
        var GlStateManager = Object.fromEntries(Object.values(ModAPI.reflect.getClassByName("GlStateManager").staticMethods).map(function (x) { return [x.methodNameShort, x.method]; }));
        var SharedMonsterAttributes = ModAPI.reflect.getClassByName("SharedMonsterAttributes").staticVariables;
        // START CUSTOM ENTITY
        var entitySize1 = 0.4; // Default size for most entities
        var entitySize2 = 0.7;
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
        else if (this.entityModel === "ModelSnowman" || this.entityModel === "ModelSnowGolem") {
            entitySize1 = 0.7; // Snow Golem
            entitySize2 = 1.9;
        }
        ;
        var entityBreedItem = this.entityBreedItem;
        var entityDropItem = this.entityDropItem;
        var entityClass = ModAPI.reflect.getClassById("net.minecraft.entity.passive.EntityAnimal");
        var entitySuper = ModAPI.reflect.getSuper(entityClass, function (x) { return x.length === 2; });
        var nme_OEntity = function nme_OEntity($worldIn) {
            entitySuper(this, $worldIn);
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            this.wrapped.setSize(entitySize1, entitySize2);
            this.wrapped.tasks.addTask(0, AITask("EntityAISwimming", 1)(this));
            this.wrapped.tasks.addTask(1, AITask("EntityAIPanic", 2)(this, 1.9));
            this.wrapped.tasks.addTask(2, AITask("EntityAIMate", 2)(this, 1.0));
            this.wrapped.tasks.addTask(3, AITask("EntityAITempt", 4)(this, 1.5, ModAPI.items["".concat(entityBreedItem)].getRef(), 0)); //won't cause a problem as the bread is obtained when the entity is constructed.
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
            this.wrapped.getEntityAttribute(SharedMonsterAttributes.maxHealth).setBaseValue(5);
            this.wrapped.getEntityAttribute(SharedMonsterAttributes.movementSpeed).setBaseValue(0.25);
        };
        var originalLivingUpdate = nme_OEntity.prototype.$onLivingUpdate;
        nme_OEntity.prototype.$onLivingUpdate = function () {
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            originalLivingUpdate.apply(this, []);
            if (this.wrapped.isInWater()) {
                this.wrapped.motionY *= 0.5;
                this.wrapped.getEntityAttribute(SharedMonsterAttributes.movementSpeed).setBaseValue(1.4);
            }
            else {
                this.wrapped.getEntityAttribute(SharedMonsterAttributes.movementSpeed).setBaseValue(0.25);
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
            return ModAPI.items["".concat(entityDropItem)].getRef();
        };
        nme_OEntity.prototype.$createChild = function (otherParent) {
            var _a, _b;
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            return new nme_OEntity((_b = (_a = this.wrapped.worldObj) === null || _a === void 0 ? void 0 : _a.getRef()) !== null && _b !== void 0 ? _b : null);
        };
        nme_OEntity.prototype.$isBreedingItem = function (itemstack) {
            return itemstack !== null && itemstack.$getItem() === ModAPI.items["".concat(entityBreedItem)].getRef();
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
            if ((!entity.onGround) && (!entity.isInWater())) {
                return 2; //falling
            }
            else {
                return 0;
            }
        };
        var ID = ModAPI.keygen.entity(this.entityID);
        ModAPI.reflect.getClassById("net.minecraft.entity.EntityList").staticMethods.addMapping0.method(ModAPI.util.asClass(nme_OEntity), {
            $createEntity: function ($worldIn) {
                return new nme_OEntity($worldIn);
            }
        }, ModAPI.util.str(this.entityName), ID, this.eggBase || 0x5e3e2d, //egg base
        this.eggSpots || 0x269166 //egg spots
        );
        var SpawnPlacementType = ModAPI.reflect.getClassById("net.minecraft.entity.EntityLiving$SpawnPlacementType").staticVariables;
        var ENTITY_PLACEMENTS = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.entity.EntitySpawnPlacementRegistry")
            .staticVariables.ENTITY_PLACEMENTS);
        ENTITY_PLACEMENTS.put(ModAPI.util.asClass(nme_OEntity), SpawnPlacementType.ON_GROUND);
        ModAPI.addEventListener('bootstrap', function () {
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
                AsyncSink.L10N.set("entity.".concat(this.entityName, ".name"), this.entityName);
                return [2 /*return*/];
            });
        }); });
        return _a = {},
            _a["Entity".concat(this.entityID)] = nme_OEntity,
            _a["Model".concat(this.entityID)] = nmcm_OEntityModel,
            _a["Render".concat(this.entityID)] = nmcre_RenderOEntity,
            _a["".concat(this.entityID, "Textures")] = duckTextures,
            _a;
    };
    OEntity.prototype.registerOEntity = function () {
        var _this = this;
        ModAPI.dedicatedServer.appendCode("globalThis.registerEntityServer(\"".concat(this.entityID, "\", \"").concat(this.entityName, "\", \"").concat(this.entityModel, "\", ").concat(this.eggBase, ", ").concat(this.eggSpots, ");"));
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
                                streaming: false //use for large audio files
                            }
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
                                streaming: false //use for large audio files
                            }
                        ]);
                        ModAPI.mc.renderManager.entityRenderMap.put(ModAPI.util.asClass(data["Entity".concat(this.entityID)]), new data["Render".concat(this.entityID)](ModAPI.mc.renderManager.getRef(), new data["Model".concat(this.entityID)](), 0.3));
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
        if (onItemUse)
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
                console.log("client itemstack:");
                console.log($$itemstack);
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
                console.log("client itemstack:");
                console.log($$itemstack);
                return ($$ActionResult($$ResultEnum.SUCCESS, $$itemstack));
            };
        }
        if (!ModAPI.is_1_12) {
            nmi_OvenItem.prototype.$onItemUse0 = function ($$itemstack, $$player, $$world, $$blockpos) {
                var $$itemstack, $$world, $$player, $$blockpos;
                self.onItemUse($$itemstack, $$world, $$player, $$blockpos);
                console.log("client itemstack:");
                console.log($$itemstack);
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
                ModAPI.dedicatedServer.appendCode("globalThis.registerServerItem(\"".concat(this.itemID, "\", ").concat(this.itemStack, ", ").concat(this.onRightClick, ", ").concat(this.onItemUse, ");"));
                if (ModAPI.is_1_12) {
                    ModAPI.addEventListener("lib:asyncsink", function () { return __awaiter(_this, void 0, void 0, function () {
                        var response, buffer;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    ModAPI.addEventListener("lib:asyncsink:registeritems", function (renderItem) {
                                        renderItem.registerItem(custom_item, ModAPI.util.str("".concat(self.itemID)));
                                    });
                                    AsyncSink.L10N.set("item.".concat(self.itemID, ".name"), "".concat(self.itemName));
                                    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/".concat(self.itemID, ".json"), JSON.stringify({
                                        "parent": "item/generated",
                                        "textures": {
                                            "layer0": "items/".concat(this.itemID)
                                        }
                                    }));
                                    return [4 /*yield*/, fetch(self.itemTexture)];
                                case 1:
                                    response = _a.sent();
                                    return [4 /*yield*/, response.arrayBuffer()];
                                case 2:
                                    buffer = _a.sent();
                                    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/" + self.itemID + ".png", buffer);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                if (!ModAPI.is_1_12) {
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
        ModAPI.meta.config(modClass.config());
        modClass.init();
        globalThis.Debug_mode = modClass.Debug_mode;
        /*if (modClass.only_1_12_2 === true) {
          // Ill do some more stuff later
        }*/
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
    ModAPI.dedicatedServer.appendCode(classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.OvenMDK__defineExecCmdAsGlobal);
    (0,classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.OvenMDK__defineExecCmdAsGlobal)();
    console.log("OvenMDK__ExecCmdAsGlobal serverside and clientside function loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerServerBlock = ".concat(classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerServerBlock, ";"));
    console.log("Register Entity serverside function loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerEntityServer = ".concat(classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerEntityServer, ";"));
    console.log("Register Block serverside function loaded");
    ModAPI.events.callEvent("lib:OvenMDK:loaded", {});
});
ModAPI.addEventListener("lib:OvenMDK:loaded", function (version) {
    console.log("OvenMDK Runtime has finished loading");
    console.log("\n    \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n    \u2502                                   \u2502\n    \u2502   OvenMDK has loaded              \u2502\n    \u2502                                   \u2502\n    \u2502   welcome to ovenMDK              \u2502\n    \u2502                                   \u2502\n    \u2502   A mod dev kit for starters      \u2502\n    \u2502                                   \u2502\n    \u2502   Version: ".concat(version, "                   \u2502\n    \u2502                                   \u2502\n    \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n    "));
    (0,classes_core_commands__WEBPACK_IMPORTED_MODULE_6__.simplecommand)("/ovenmdk", " log_1", function () {
        ModAPI.displayToChat("\n      OvenMDK Runtime v0.1\n      Made by BendieGames and Block_2222\n      - Added basic core classes\n      ( Not much can be documented due to so little being added )");
    });
    (0,classes_core_commands__WEBPACK_IMPORTED_MODULE_6__.simplecommand)("/ovenmdk", " log_2", function () {
        ModAPI.displayToChat("\n      OvenMDK Runtime v0.2\n      Made by BendieGames and Block_2222\n      - Added support for 1.12\n      - Added support for OvenOre\n      - Added support for OEntity\n      - QOL improvements\n      - Added support for OvenMDK__ExecCmdAsGlobal\n      - Added support for OvenMDK__defineExecCmdAsGlobal\n      - Added support for simplecommands");
    });
    (0,classes_core_commands__WEBPACK_IMPORTED_MODULE_6__.simplecommand)("/ovenmdk", " log_3", function () {
        ModAPI.displayToChat("\n      OvenMDK Runtime v0.3\n      Made by BendieGames and Block_2222\n      - Added more OEntity customization\n        - Added more support for Model hitboexes\n        - Added custom entity sound support");
    });
});
ModAPI.addCredit("OvenMDK Runtime", "BendieGames", " - Made OvenMDK\n - Coded most of OvenMDK");
ModAPI.addCredit("OvenMDK Runtime", "Block_2222", " - Founded OvenMDK");
ModAPI.events.callEvent("lib:OvenMDK:load", { version: "v0.3" });

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEMsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhFQUE4RSx3QkFBd0I7QUFDdEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3SUFBd0k7QUFDeEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhFQUE4RSx3QkFBd0I7QUFDdEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFD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O0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQzBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG1EQUFJO0FBQzRJO0FBQzFIO0FBQ0g7QUFDQztBQUNJO0FBQ2E7QUFDVDtBQUNGO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyx3RUFBa0I7QUFDdEQscUNBQXFDLHlFQUFtQjtBQUN4RCxzQ0FBc0MsMEVBQW9CO0FBQzFELHVCQUF1QiwwREFBSztBQUM1QixzQkFBc0Isd0RBQUk7QUFDMUIseUJBQXlCLHlEQUFJO0FBQzdCLHdCQUF3QiwyREFBTTtBQUM5QiwrQkFBK0IsZ0VBQWE7QUFDNUMseUJBQXlCLDREQUFPO0FBQ2hDLHVDQUF1QywyRUFBcUI7QUFDNUQseUJBQXlCLDZEQUFPO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0Ysd0VBQWtCLElBQUk7QUFDdEc7QUFDQSxtRkFBbUYsMkVBQXFCLElBQUk7QUFDNUc7QUFDQSxzQ0FBc0Msb0ZBQThCO0FBQ3BFLElBQUksd0ZBQThCO0FBQ2xDO0FBQ0EsaUZBQWlGLHlFQUFtQixJQUFJO0FBQ3hHO0FBQ0Esa0ZBQWtGLDBFQUFvQixJQUFJO0FBQzFHO0FBQ0Esb0RBQW9EO0FBQ3BELENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxJQUFJLG9FQUFhO0FBQ2pCO0FBQ0EsS0FBSztBQUNMLElBQUksb0VBQWE7QUFDakI7QUFDQSxLQUFLO0FBQ0wsSUFBSSxvRUFBYTtBQUNqQjtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBLDhDQUE4QyxpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL0hlbHBlcl9mdW5jLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvTW9kLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvT0Jsb2NrLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvT0VudGl0eS50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL09JdGVtLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvT3Zlbi50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL092ZW5PcmUudHMiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lLy4vc3JjL2NsYXNzZXMvY29yZS9jb21tYW5kcy50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICAgIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cbiAgICBIZWxwZXJfZnVuYy50c1xuICAgIFxuICAgIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyU2VydmVySXRlbShpdGVtSUQsIGl0ZW1TdGFjaywgb25SaWdodENsaWNrLCBvbkl0ZW1Vc2UpIHtcbiAgICAvKmlmIChpc1NlcnZlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlZ2lzdGVyU2VydmVySXRlbSBjYW4gb25seSBiZSB1c2VkIG9uIHRoZSBzZXJ2ZXIgc2lkZS5cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfSovXG4gICAgdmFyIGNyZWF0aXZlTWlzY1RhYjtcbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgY3JlYXRpdmVNaXNjVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLk1JU0M7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjcmVhdGl2ZU1pc2NUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMudGFiTWlzYztcbiAgICB9XG4gICAgdmFyICQkaXRlbUdldEF0dHJpYnV0ZXMgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKS5tZXRob2RzLmdldEl0ZW1BdHRyaWJ1dGVNb2RpZmllcnMubWV0aG9kO1xuICAgIHZhciBpdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICB2YXIgaXRlbVN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoaXRlbUNsYXNzLCBmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuLmxlbmd0aCA9PT0gMTsgfSk7XG4gICAgLyppZiAoaXNTZXJ2ZXIgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInVzaW5nIHNlcnZlciBzaWRlIHJlZ2lzdGVyU2VydmVySXRlbVwiKTtcbiAgICAgIH0qL1xuICAgIGZ1bmN0aW9uIG5taV9PdmVuSXRlbSgpIHtcbiAgICAgICAgaXRlbVN1cGVyKHRoaXMpO1xuICAgICAgICB0aGlzLiRzZXRDcmVhdGl2ZVRhYihjcmVhdGl2ZU1pc2NUYWIpO1xuICAgICAgICB0aGlzLiRtYXhTdGFja1NpemUgPSBpdGVtU3RhY2s7XG4gICAgfVxuICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKGl0ZW1DbGFzcywgbm1pX092ZW5JdGVtKTtcbiAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVJpZ2h0Q2xpY2sgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7XG4gICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKVxuICAgICAgICAgICAgICAgICQkcGxheWVyLiRzZXRJdGVtSW5Vc2UoJCRpdGVtc3RhY2ssIDMyKTtcbiAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXI7XG4gICAgICAgICAgICBvblJpZ2h0Q2xpY2soJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VydmVyIGl0ZW1zdGFjazpcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICByZXR1cm4gJCRpdGVtc3RhY2s7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICB2YXIgJCRSZXN1bHRFbnVtID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnVtQWN0aW9uUmVzdWx0XCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgdmFyICQkQWN0aW9uUmVzdWx0ID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJBY3Rpb25SZXN1bHRcIikuY29uc3RydWN0b3JzWzBdO1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1SaWdodENsaWNrID0gZnVuY3Rpb24gKCQkd29ybGQsICQkcGxheWVyLCAkaGFuZEVudW0sICR1bnVzZWQpIHtcbiAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjayA9ICQkcGxheWVyLiRnZXRIZWxkSXRlbSgkaGFuZEVudW0pO1xuICAgICAgICAgICAgJCRwbGF5ZXIuJHNldEFjdGl2ZUhhbmQoJGhhbmRFbnVtKTtcbiAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXI7XG4gICAgICAgICAgICBvblJpZ2h0Q2xpY2soJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgIHJldHVybiAkJEFjdGlvblJlc3VsdCgkJFJlc3VsdEVudW0uU1VDQ0VTUywgJCRpdGVtc3RhY2spO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVVzZTAgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkcGxheWVyLCAkJHdvcmxkLCAkJGJsb2NrcG9zKSB7XG4gICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGJsb2NrcG9zO1xuICAgICAgICAgICAgb25JdGVtVXNlKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRibG9ja3Bvcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWVudCBpdGVtc3RhY2s6XCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJCRpdGVtc3RhY2spO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICB2YXIgJCRSZXN1bHRFbnVtID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnVtQWN0aW9uUmVzdWx0XCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtVXNlID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHBsYXllciwgJCR3b3JsZCwgJCRibG9ja3Bvcykge1xuICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHBsYXllciwgJCR3b3JsZCwgJCRibG9ja3BvcztcbiAgICAgICAgICAgIGlmIChvbkl0ZW1Vc2UpIHtcbiAgICAgICAgICAgICAgICBvbkl0ZW1Vc2UoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGJsb2NrcG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkJFJlc3VsdEVudW0uUEFTUztcbiAgICAgICAgfTtcbiAgICB9XG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25VcGRhdGUgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGhvdGJhcl9zbG90LCAkJGlzX2hlbGQpIHtcbiAgICAgICAgJCRpc19oZWxkID0gJCRpc19oZWxkID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICByZXR1cm4gJCRpdGVtc3RhY2s7XG4gICAgfTtcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1Vc2VGaW5pc2ggPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7XG4gICAgICAgIHJldHVybiAkJGl0ZW1zdGFjaztcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldE1heEl0ZW1Vc2VEdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIDMyO1xuICAgIH07XG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kZ2V0SXRlbUF0dHJpYnV0ZU1vZGlmaWVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8xLjEyIHdvcmtzIGkgdGhpbmtcbiAgICAgICAgdmFyICQkYXR0cmlidXRlbWFwID0gJCRpdGVtR2V0QXR0cmlidXRlcy5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgIHJldHVybiAkJGF0dHJpYnV0ZW1hcDtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldFN0clZzQmxvY2sgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkYmxvY2spIHtcbiAgICAgICAgcmV0dXJuIDEuMDtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uQ3JlYXRlZCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpIHtcbiAgICAgICAgLy8xLjEyIHdvcmtzXG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uQmxvY2tEZXN0cm95ZWQgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkYmxvY2ssICQkYmxvY2twb3MsICQkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgdmFyIGludGVybmFsX3JlZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGl0ZW1JbnN0YW5jZSA9IG5ldyBubWlfT3Zlbkl0ZW0oKS4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihcIlwiLmNvbmNhdChpdGVtSUQpKSk7XG4gICAgICAgIGl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbS5tZXRob2QoTW9kQVBJLmtleWdlbi5pdGVtKFwiXCIuY29uY2F0KGl0ZW1JRCkpLCBNb2RBUEkudXRpbC5zdHIoXCJcIi5jb25jYXQoaXRlbUlEKSksIGl0ZW1JbnN0YW5jZSk7XG4gICAgICAgIE1vZEFQSS5pdGVtc1tcIlwiLmNvbmNhdChpdGVtSUQpXSA9IGl0ZW1JbnN0YW5jZTtcbiAgICAgICAgY29uc29sZS5sb2coaXRlbUluc3RhbmNlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmVkIE92ZW5NREsgaXRlbSAoIFNlcnZlciBTaWRlIClcIik7XG4gICAgICAgIHJldHVybiBpdGVtSW5zdGFuY2U7XG4gICAgfTtcbiAgICBpZiAoTW9kQVBJLml0ZW1zKSB7XG4gICAgICAgIHJldHVybiBpbnRlcm5hbF9yZWcoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsX3JlZyk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyU2VydmVyQmxvY2soYmxvY2tJRCwgb25CcmVhaykge1xuICAgIC8qaWYgKE1vZEFQSS5pc1NlcnZlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlZ2lzdGVyU2VydmVyQmxvY2sgY2FuIG9ubHkgYmUgdXNlZCBvbiB0aGUgc2VydmVyIHNpZGUuXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH0qL1xuICAgIHZhciBCbG9ja0NsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5ibG9jay5CbG9ja1wiKTtcbiAgICB2YXIgSXRlbUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIik7XG4gICAgdmFyIGNyZWF0aXZlVGFiO1xuICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICBjcmVhdGl2ZVRhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy5CVUlMRElOR19CTE9DS1M7XG4gICAgfVxuICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgY3JlYXRpdmVUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMudGFiQmxvY2s7XG4gICAgfVxuICAgIHZhciBibG9ja1N1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoQmxvY2tDbGFzcywgZnVuY3Rpb24gKGZuKSB7IHJldHVybiBmbi5sZW5ndGggPT09IDI7IH0pO1xuICAgIHZhciBicmVha0Jsb2NrTWV0aG9kID0gQmxvY2tDbGFzcy5tZXRob2RzLmJyZWFrQmxvY2subWV0aG9kO1xuICAgIGZ1bmN0aW9uIG5tYl9PYmxvY2soKSB7XG4gICAgICAgIGJsb2NrU3VwZXIodGhpcywgTW9kQVBJLm1hdGVyaWFscy5yb2NrLmdldFJlZigpKTtcbiAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgdGhpcy4kZGVmYXVsdEJsb2NrU3RhdGUgPSB0aGlzLiRibG9ja1N0YXRlLiRnZXRCYXNlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRzZXRDcmVhdGl2ZVRhYihjcmVhdGl2ZVRhYik7XG4gICAgfVxuICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKEJsb2NrQ2xhc3MsIG5tYl9PYmxvY2spO1xuICAgIG5tYl9PYmxvY2sucHJvdG90eXBlLiRicmVha0Jsb2NrID0gZnVuY3Rpb24gKCR3b3JsZCwgJGJsb2NrcG9zLCAkYmxvY2tzdGF0ZSkge1xuICAgICAgICAvL29uQnJlYWsoJHdvcmxkLCAkYmxvY2twb3MsICRibG9ja3N0YXRlKTtcbiAgICAgICAgcmV0dXJuIGJyZWFrQmxvY2tNZXRob2QodGhpcywgJHdvcmxkLCAkYmxvY2twb3MsICRibG9ja3N0YXRlKTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGZpeHVwQmxvY2tJZHMoKSB7XG4gICAgICAgIHZhciBibG9ja1JlZ2lzdHJ5ID0gTW9kQVBJLnV0aWxcbiAgICAgICAgICAgIC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIikuc3RhdGljVmFyaWFibGVzXG4gICAgICAgICAgICAuYmxvY2tSZWdpc3RyeSlcbiAgICAgICAgICAgIC5nZXRDb3JyZWN0aXZlKCk7XG4gICAgICAgIHZhciBCTE9DS19TVEFURV9JRFMgPSBNb2RBUEkudXRpbFxuICAgICAgICAgICAgLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5ibG9jay5CbG9ja1wiKS5zdGF0aWNWYXJpYWJsZXNcbiAgICAgICAgICAgIC5CTE9DS19TVEFURV9JRFMpXG4gICAgICAgICAgICAuZ2V0Q29ycmVjdGl2ZSgpO1xuICAgICAgICBibG9ja1JlZ2lzdHJ5LnJlZ2lzdHJ5T2JqZWN0cy5oYXNoVGFibGVLVG9WLmZvckVhY2goZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmxvY2tfMSA9IGVudHJ5LnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciB2YWxpZFN0YXRlcyA9IGJsb2NrXzEuZ2V0QmxvY2tTdGF0ZSgpLmdldFZhbGlkU3RhdGVzKCk7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXRlQXJyYXkgPSB2YWxpZFN0YXRlcy5hcnJheSB8fCBbdmFsaWRTdGF0ZXMuZWxlbWVudF07XG4gICAgICAgICAgICAgICAgc3RhdGVBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpYmxvY2tzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IChibG9ja1JlZ2lzdHJ5LmdldElERm9yT2JqZWN0KGJsb2NrXzEuZ2V0UmVmKCkpIDw8IDQpIHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrXzEuZ2V0TWV0YUZyb21TdGF0ZShpYmxvY2tzdGF0ZS5nZXRSZWYoKSk7XG4gICAgICAgICAgICAgICAgICAgIEJMT0NLX1NUQVRFX0lEUy5wdXQoaWJsb2Nrc3RhdGUuZ2V0UmVmKCksIGkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFyIGludGVybmFsUmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjdXN0b21fYmxvY2s7XG4gICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIGN1c3RvbV9ibG9jayA9IG5ldyBubWJfT2Jsb2NrKClcbiAgICAgICAgICAgICAgICAuJHNldEhhcmRuZXNzKDMuMClcbiAgICAgICAgICAgICAgICAuJHNldFN0ZXBTb3VuZChCbG9ja0NsYXNzLnN0YXRpY1ZhcmlhYmxlcy5zb3VuZFR5cGVQaXN0b24pXG4gICAgICAgICAgICAgICAgLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKGJsb2NrSUQpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIGN1c3RvbV9ibG9jayA9IG5ldyBubWJfT2Jsb2NrKClcbiAgICAgICAgICAgICAgICAuJHNldEhhcmRuZXNzKDMuMClcbiAgICAgICAgICAgICAgICAuJHNldFNvdW5kVHlwZShNb2RBUEkuYmxvY2tTb3VuZHMuUExBTlQuZ2V0UmVmKCkpXG4gICAgICAgICAgICAgICAgLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKGJsb2NrSUQpKTtcbiAgICAgICAgfVxuICAgICAgICBCbG9ja0NsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJCbG9jazAubWV0aG9kKE1vZEFQSS5rZXlnZW4uYmxvY2soYmxvY2tJRCksIE1vZEFQSS51dGlsLnN0cihibG9ja0lEKSwgY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgSXRlbUNsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJJdGVtQmxvY2swLm1ldGhvZChjdXN0b21fYmxvY2spO1xuICAgICAgICBmaXh1cEJsb2NrSWRzKCk7XG4gICAgICAgIE1vZEFQSS5ibG9ja3NbYmxvY2tJRF0gPSBjdXN0b21fYmxvY2s7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXJpbmcgYmxvY2sgb24gc2VydmVyIHNpZGVcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGN1c3RvbV9ibG9jayk7XG4gICAgICAgIHJldHVybiBjdXN0b21fYmxvY2s7XG4gICAgfTtcbiAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIGlmIChNb2RBUEkubWF0ZXJpYWxzKSB7XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJuYWxSZWdpc3RlcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJib290c3RyYXBcIiwgaW50ZXJuYWxSZWdpc3Rlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIHZhciBibG9ja0NsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5ibG9jay5CbG9ja1wiKTtcbiAgICAgICAgdmFyIGl0ZW1DbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpO1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImJvb3RzdHJhcFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VzdG9tX2Jsb2NrID0gbmV3IG5tYl9PYmxvY2soKVxuICAgICAgICAgICAgICAgIC4kc2V0SGFyZG5lc3MoMy4wKVxuICAgICAgICAgICAgICAgIC4kc2V0U291bmRUeXBlKE1vZEFQSS5ibG9ja1NvdW5kcy5QTEFOVC5nZXRSZWYoKSlcbiAgICAgICAgICAgICAgICAuJHNldFVubG9jYWxpemVkTmFtZShNb2RBUEkudXRpbC5zdHIoYmxvY2tJRCkpO1xuICAgICAgICAgICAgYmxvY2tDbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVyQmxvY2swLm1ldGhvZChNb2RBUEkua2V5Z2VuLmJsb2NrKGJsb2NrSUQpLCBNb2RBUEkudXRpbC5zdHIoYmxvY2tJRCksIGN1c3RvbV9ibG9jayk7XG4gICAgICAgICAgICBpdGVtQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3Rlckl0ZW1CbG9jazAubWV0aG9kKGN1c3RvbV9ibG9jayk7XG4gICAgICAgICAgICBmaXh1cEJsb2NrSWRzKCk7XG4gICAgICAgICAgICBNb2RBUEkuYmxvY2tzW2Jsb2NrSURdID0gY3VzdG9tX2Jsb2NrO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmluZyBibG9jayBvbiBzZXJ2ZXIgc2lkZVwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1c3RvbV9ibG9jayk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckVudGl0eVNlcnZlcihlbnRpdHlJRCwgZW50aXR5TmFtZSwgZW50aXR5TW9kZWwsIGVudGl0eUJyZWVkSXRlbSwgZW50aXR5RHJvcEl0ZW0sIGVnZ0Jhc2UsIGVnZ1Nwb3RzKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnNvbGUubG9nKFwiZW50aXRpZXMgYXJlIG5vdCBmaW5pc2hlZCB5ZXQhIFVzZSBhdCB5b3VyIG93biByaXNrIVwiKTtcbiAgICAvL3JldHVybjtcbiAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5qbF9TdHJpbmdfZm9ybWF0ID1cbiAgICAgICAgTW9kQVBJLmhvb2tzLm1ldGhvZHMubmxldl9IU3RyaW5nX2Zvcm1hdDsgLy90ZW1wb3JhcnkgdGhpbmcgdG8gZml4IGFuIGlzc3VlIGluIGVhZ2xlcmNyYWZ0XG4gICAgLy8gVXRpbHNcbiAgICBmdW5jdGlvbiBBSVRhc2sobmFtZSwgbGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LmFpLlwiICsgbmFtZSlcbiAgICAgICAgICAgIC5jb25zdHJ1Y3RvcnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IGxlbmd0aDsgfSk7XG4gICAgfVxuICAgIHZhciBSZXNvdXJjZUxvY2F0aW9uID0gTW9kQVBJLnJlZmxlY3RcbiAgICAgICAgLmdldENsYXNzQnlOYW1lKFwiUmVzb3VyY2VMb2NhdGlvblwiKVxuICAgICAgICAuY29uc3RydWN0b3JzLmZpbmQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSAxOyB9KTtcbiAgICB2YXIgRW50aXR5UGxheWVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnRpdHlQbGF5ZXJcIik7XG4gICAgdmFyIEdsU3RhdGVNYW5hZ2VyID0gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC52YWx1ZXMoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJHbFN0YXRlTWFuYWdlclwiKS5zdGF0aWNNZXRob2RzKS5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIFt4Lm1ldGhvZE5hbWVTaG9ydCwgeC5tZXRob2RdOyB9KSk7XG4gICAgdmFyIFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJTaGFyZWRNb25zdGVyQXR0cmlidXRlc1wiKS5zdGF0aWNWYXJpYWJsZXM7XG4gICAgLy8gU1RBUlQgQ1VTVE9NIEVOVElUWVxuICAgIHZhciBlbnRpdHlTaXplMSA9IDAuNDtcbiAgICB2YXIgZW50aXR5U2l6ZTIgPSAwLjc7XG4gICAgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsQ2hpY2tlblwiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC40OyAvLyBDaGlja2VuXG4gICAgICAgIGVudGl0eVNpemUyID0gMC43O1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbENvd1wiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC45OyAvLyBDb3dcbiAgICAgICAgZW50aXR5U2l6ZTIgPSAxLjQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsTW9vc2hyb29tXCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjk7IC8vIE1vb3Nocm9vbVxuICAgICAgICBlbnRpdHlTaXplMiA9IDEuNDtcbiAgICB9XG4gICAgZWxzZSBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxQaWdcIikge1xuICAgICAgICBlbnRpdHlTaXplMSA9IDAuOTsgLy8gUGlnXG4gICAgICAgIGVudGl0eVNpemUyID0gMC45O1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFNoZWVwXCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjk7IC8vIFNoZWVwXG4gICAgICAgIGVudGl0eVNpemUyID0gMS4zO1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbEhvcnNlXCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAxLjM5NjU7IC8vIEhvcnNlXG4gICAgICAgIGVudGl0eVNpemUyID0gMS42OyAvLyBIZWlnaHQgY2FuIHZhcnkgc2xpZ2h0bHlcbiAgICB9XG4gICAgZWxzZSBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxSYWJiaXRcIikge1xuICAgICAgICBlbnRpdHlTaXplMSA9IDAuNDsgLy8gUmFiYml0XG4gICAgICAgIGVudGl0eVNpemUyID0gMC41O1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFNxdWlkXCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjg7IC8vIFNxdWlkXG4gICAgICAgIGVudGl0eVNpemUyID0gMC44O1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbEJhdFwiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC41OyAvLyBCYXRcbiAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsT2NlbG90XCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjY7IC8vIE9jZWxvdCAod2lsZClcbiAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsV29sZlwiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC42OyAvLyBXb2xmXG4gICAgICAgIGVudGl0eVNpemUyID0gMC44NTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxWaWxsYWdlclwiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC42OyAvLyBWaWxsYWdlclxuICAgICAgICBlbnRpdHlTaXplMiA9IDEuOTU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsSXJvbkdvbGVtXCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAxLjQ7IC8vIElyb24gR29sZW1cbiAgICAgICAgZW50aXR5U2l6ZTIgPSAyLjk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsU25vd21hblwiIHx8IGVudGl0eU1vZGVsID09PSBcIk1vZGVsU25vd0dvbGVtXCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjc7IC8vIFNub3cgR29sZW1cbiAgICAgICAgZW50aXR5U2l6ZTIgPSAxLjk7XG4gICAgfVxuICAgIHZhciBlbnRpdHlDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LnBhc3NpdmUuRW50aXR5QW5pbWFsXCIpO1xuICAgIHZhciBlbnRpdHlTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKGVudGl0eUNsYXNzLCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDI7IH0pO1xuICAgIHZhciBubWVfT0VudGl0eSA9IGZ1bmN0aW9uIG5tZV9PRW50aXR5KCR3b3JsZEluKSB7XG4gICAgICAgIGVudGl0eVN1cGVyKHRoaXMsICR3b3JsZEluKTtcbiAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgIHRoaXMud3JhcHBlZC5zZXRTaXplKGVudGl0eVNpemUxLCBlbnRpdHlTaXplMik7XG4gICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDAsIEFJVGFzayhcIkVudGl0eUFJU3dpbW1pbmdcIiwgMSkodGhpcykpO1xuICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygxLCBBSVRhc2soXCJFbnRpdHlBSVBhbmljXCIsIDIpKHRoaXMsIDEuOSkpO1xuICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygyLCBBSVRhc2soXCJFbnRpdHlBSU1hdGVcIiwgMikodGhpcywgMS4wKSk7XG4gICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDMsIEFJVGFzayhcIkVudGl0eUFJVGVtcHRcIiwgNCkodGhpcywgMS41LCBNb2RBUEkuaXRlbXNbXCJcIi5jb25jYXQoZW50aXR5QnJlZWRJdGVtKV0uZ2V0UmVmKCksIDApKTsgLy93b24ndCBjYXVzZSBhIHByb2JsZW0gYXMgdGhlIGJyZWFkIGlzIG9idGFpbmVkIHdoZW4gdGhlIGVudGl0eSBpcyBjb25zdHJ1Y3RlZC5cbiAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNCwgQUlUYXNrKFwiRW50aXR5QUlGb2xsb3dQYXJlbnRcIiwgMikodGhpcywgMS4yKSk7XG4gICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDUsIEFJVGFzayhcIkVudGl0eUFJV2FuZGVyXCIsIDIpKHRoaXMsIDEuMSkpO1xuICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg2LCBBSVRhc2soXCJFbnRpdHlBSVdhdGNoQ2xvc2VzdFwiLCAzKSh0aGlzLCBNb2RBUEkudXRpbC5hc0NsYXNzKEVudGl0eVBsYXllci5jbGFzcyksIDYpKTtcbiAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNywgQUlUYXNrKFwiRW50aXR5QUlMb29rSWRsZVwiLCAxKSh0aGlzKSk7XG4gICAgfTtcbiAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhlbnRpdHlDbGFzcywgbm1lX09FbnRpdHkpO1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0RXllSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlZC5oZWlnaHQ7XG4gICAgfTtcbiAgICB2YXIgb3JpZ2luYWxBcHBseUVudGl0eUF0dHJpYnV0ZXMgPSBubWVfT0VudGl0eS5wcm90b3R5cGUuJGFwcGx5RW50aXR5QXR0cmlidXRlcztcbiAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGFwcGx5RW50aXR5QXR0cmlidXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgIG9yaWdpbmFsQXBwbHlFbnRpdHlBdHRyaWJ1dGVzLmFwcGx5KHRoaXMsIFtdKTtcbiAgICAgICAgdGhpcy53cmFwcGVkXG4gICAgICAgICAgICAuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1heEhlYWx0aClcbiAgICAgICAgICAgIC5zZXRCYXNlVmFsdWUoNSk7XG4gICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tb3ZlbWVudFNwZWVkKVxuICAgICAgICAgICAgLnNldEJhc2VWYWx1ZSgwLjI1KTtcbiAgICB9O1xuICAgIHZhciBvcmlnaW5hbExpdmluZ1VwZGF0ZSA9IG5tZV9PRW50aXR5LnByb3RvdHlwZS4kb25MaXZpbmdVcGRhdGU7XG4gICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRvbkxpdmluZ1VwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgIG9yaWdpbmFsTGl2aW5nVXBkYXRlLmFwcGx5KHRoaXMsIFtdKTtcbiAgICAgICAgaWYgKHRoaXMud3JhcHBlZC5pc0luV2F0ZXIoKSkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLm1vdGlvblkgKj0gMC41O1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkXG4gICAgICAgICAgICAgICAgLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tb3ZlbWVudFNwZWVkKVxuICAgICAgICAgICAgICAgIC5zZXRCYXNlVmFsdWUoMS40KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgICAgIC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZClcbiAgICAgICAgICAgICAgICAuc2V0QmFzZVZhbHVlKDAuMjUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldExpdmluZ1NvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgZW50aXR5SUQgKyBcIi5tYWluX3NvdW5kXCIpO1xuICAgIH07XG4gICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXRIdXJ0U291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBNb2RBUEkudXRpbC5zdHIoXCJtb2IuXCIgKyBlbnRpdHlJRCArIFwiLm1haW5fc291bmRcIik7XG4gICAgfTtcbiAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldERlYXRoU291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBNb2RBUEkudXRpbC5zdHIoXCJtb2IuXCIgKyBlbnRpdHlJRCArIFwiLm1haW5fc291bmRcIik7XG4gICAgfTtcbiAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJHBsYXlTdGVwU291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICB0aGlzLndyYXBwZWQucGxheVNvdW5kKE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIGVudGl0eUlEICsgXCIuc3RlcFwiKSwgMC4yLCAxKTtcbiAgICB9O1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0RHJvcEl0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBNb2RBUEkuaXRlbXNbXCJcIi5jb25jYXQoZW50aXR5RHJvcEl0ZW0pXS5nZXRSZWYoKTtcbiAgICB9O1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kY3JlYXRlQ2hpbGQgPSBmdW5jdGlvbiAob3RoZXJQYXJlbnQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgIHJldHVybiBuZXcgbm1lX09FbnRpdHkoKF9iID0gKF9hID0gdGhpcy53cmFwcGVkLndvcmxkT2JqKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0UmVmKCkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG51bGwpO1xuICAgIH07XG4gICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRpc0JyZWVkaW5nSXRlbSA9IGZ1bmN0aW9uIChpdGVtc3RhY2spIHtcbiAgICAgICAgcmV0dXJuIChpdGVtc3RhY2sgIT09IG51bGwgJiYgaXRlbXN0YWNrLiRnZXRJdGVtKCkgPT09IE1vZEFQSS5pdGVtc1tcIlwiLmNvbmNhdChlbnRpdHlCcmVlZEl0ZW0pXS5nZXRSZWYoKSk7XG4gICAgfTtcbiAgICAvLyBFTkQgQ1VTVE9NIEVOVElUWVxuICAgIC8vIFNUQVJUIENVU1RPTSBNT0RFTFxuICAgIHZhciBtb2RlbENoaWNrZW5DbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY2xpZW50Lm1vZGVsLlwiLmNvbmNhdChlbnRpdHlNb2RlbCkpO1xuICAgIHZhciBtb2RlbENoaWNrZW5TdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKG1vZGVsQ2hpY2tlbkNsYXNzKTsgLy93aGlsZSBzdXBlciBpc24ndCB1c2VkIHdoZW4gZXh0ZW5kaW5nIHRoaXMgY2xhc3MsIGphdmEgaW1wbGllcyB0aGUgY2FsbC5cbiAgICB2YXIgbm1jbV9PRW50aXR5TW9kZWwgPSBmdW5jdGlvbiBubWNtX09FbnRpdHlNb2RlbCgpIHtcbiAgICAgICAgbW9kZWxDaGlja2VuU3VwZXIodGhpcyk7XG4gICAgfTtcbiAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhtb2RlbENoaWNrZW5DbGFzcywgbm1jbV9PRW50aXR5TW9kZWwpO1xuICAgIC8vIEVORCBDVVNUT00gTWhPREVMXG4gICAgLy8gU1RBUlQgQ1VTVE9NIFJFTkRFUkVSXG4gICAgdmFyIHJlbmRlckNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jbGllbnQucmVuZGVyZXIuZW50aXR5LlJlbmRlckxpdmluZ1wiKTtcbiAgICB2YXIgcmVuZGVyU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihyZW5kZXJDbGFzcywgZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSA0OyB9KTtcbiAgICB2YXIgZHVja1RleHR1cmVzID0gUmVzb3VyY2VMb2NhdGlvbihNb2RBUEkudXRpbC5zdHIoXCJ0ZXh0dXJlcy9lbnRpdHkvXCIuY29uY2F0KGVudGl0eUlELCBcIi5wbmdcIikpKTtcbiAgICB2YXIgbm1jcmVfUmVuZGVyT0VudGl0eSA9IGZ1bmN0aW9uIG5tY3JlX1JlbmRlck9FbnRpdHkocmVuZGVyTWFuYWdlciwgbW9kZWxCYXNlSW4sIHNoYWRvd1NpemVJbikge1xuICAgICAgICByZW5kZXJTdXBlcih0aGlzLCByZW5kZXJNYW5hZ2VyLCBtb2RlbEJhc2VJbiwgc2hhZG93U2l6ZUluKTtcbiAgICB9O1xuICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKHJlbmRlckNsYXNzLCBubWNyZV9SZW5kZXJPRW50aXR5KTtcbiAgICBubWNyZV9SZW5kZXJPRW50aXR5LnByb3RvdHlwZS4kZ2V0RW50aXR5VGV4dHVyZSA9IGZ1bmN0aW9uIChlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIGR1Y2tUZXh0dXJlcztcbiAgICB9O1xuICAgIG5tY3JlX1JlbmRlck9FbnRpdHkucHJvdG90eXBlLiRoYW5kbGVSb3RhdGlvbkZsb2F0ID0gZnVuY3Rpb24gKGVudGl0eSwgcGFydGlhbFRpY2tzKSB7XG4gICAgICAgIGVudGl0eSA9IE1vZEFQSS51dGlsLndyYXAoZW50aXR5KTtcbiAgICAgICAgaWYgKCFlbnRpdHkub25Hcm91bmQgJiYgIWVudGl0eS5pc0luV2F0ZXIoKSkge1xuICAgICAgICAgICAgcmV0dXJuIDI7IC8vZmFsbGluZ1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciBJRCA9IE1vZEFQSS5rZXlnZW4uZW50aXR5KGVudGl0eUlEKTtcbiAgICBNb2RBUEkucmVmbGVjdDhhXG4gICAgICAgIC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlMaXN0XCIpXG4gICAgICAgIC5zdGF0aWNNZXRob2RzLmFkZE1hcHBpbmcwLm1ldGhvZChNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwge1xuICAgICAgICAkY3JlYXRlRW50aXR5OiBmdW5jdGlvbiAoJHdvcmxkSW4pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgbm1lX09FbnRpdHkoJHdvcmxkSW4pO1xuICAgICAgICB9LFxuICAgIH0sIE1vZEFQSS51dGlsLnN0cihlbnRpdHlOYW1lKSwgSUQsIGVnZ0Jhc2UgfHwgMHg1ZTNlMmQsIC8vZWdnIGJhc2VcbiAgICBlZ2dTcG90cyB8fCAweDI2OTE2NiAvL2VnZyBzcG90c1xuICAgICk7XG4gICAgdmFyIFNwYXduUGxhY2VtZW50VHlwZSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eUxpdmluZyRTcGF3blBsYWNlbWVudFR5cGVcIikuc3RhdGljVmFyaWFibGVzO1xuICAgIHZhciBFTlRJVFlfUExBQ0VNRU5UUyA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkuRW50aXR5U3Bhd25QbGFjZW1lbnRSZWdpc3RyeVwiKS5zdGF0aWNWYXJpYWJsZXMuRU5USVRZX1BMQUNFTUVOVFMpO1xuICAgIEVOVElUWV9QTEFDRU1FTlRTLnB1dChNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgU3Bhd25QbGFjZW1lbnRUeXBlLk9OX0dST1VORCk7XG4gICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJib290c3RyYXBcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgU3Bhd25MaXN0RW50cnkgPSBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlJFNwYXduTGlzdEVudHJ5XCIpXG4gICAgICAgICAgICAuY29uc3RydWN0b3JzLmZpbmQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSA0OyB9KTtcbiAgICAgICAgdmFyIEJpb21lR2VuU3dhbXAgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlXCIpXG4gICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLnN3YW1wbGFuZCk7XG4gICAgICAgIHZhciBCaW9tZUdlblJpdmVyID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5yaXZlcik7XG4gICAgICAgIHZhciBCaW9tZUdlbkJlYWNoID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5iZWFjaCk7XG4gICAgICAgIHZhciBkdWNrU3Bhd25Td2FtcCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAyMiwgMywgNSk7XG4gICAgICAgIHZhciBkdWNrU3Bhd25SaXZlckJlZCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAxMCwgNSwgOSk7XG4gICAgICAgIHZhciBkdWNrU3Bhd25CZWFjaCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAyNCwgMiwgMyk7XG4gICAgICAgIEJpb21lR2VuU3dhbXAuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25Td2FtcCk7XG4gICAgICAgIEJpb21lR2VuUml2ZXIuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25SaXZlckJlZCk7XG4gICAgICAgIEJpb21lR2VuQmVhY2guc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25CZWFjaCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIF9hID0ge30sXG4gICAgICAgIF9hW1wiRW50aXR5XCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXSA9IG5tZV9PRW50aXR5LFxuICAgICAgICBfYVtcIk1vZGVsXCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXSA9IG5tY21fT0VudGl0eU1vZGVsLFxuICAgICAgICBfYVtcIlJlbmRlclwiLmNvbmNhdCh0aGlzLmVudGl0eUlEKV0gPSBubWNyZV9SZW5kZXJPRW50aXR5LFxuICAgICAgICBfYVtcIlwiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIlRleHR1cmVzXCIpXSA9IGR1Y2tUZXh0dXJlcyxcbiAgICAgICAgX2E7XG59XG4vKmV4cG9ydCBmdW5jdGlvbiBpc1NlcnZlclNpZGUoKSB7XG4gICAgZnVuY3Rpb24gc3ViZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXNTZXJ2ZXJTaWRlIGZ1bmN0aW9uIGNhbGxlZFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coYGlzU2VydmVyU2lkZTogJHtNb2RBUEkuaXNTZXJ2ZXJ9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKE1vZEFQSS5pc1NlcnZlcik7XG4gICAgfVxuICAgIHN1YmZ1bmN0aW9uKCk7XG4gICAgY29uc29sZS5sb2coYGlzU2VydmVyU2lkZTogJHtNb2RBUEkuaXNTZXJ2ZXJ9YCk7XG59Ki9cbmV4cG9ydCBmdW5jdGlvbiBPdmVuTURLX19kZWZpbmVFeGVjQ21kQXNHbG9iYWwoKSB7XG4gICAgdmFyIF9hO1xuICAgIC8vIEdldCBzZXJ2ZXIgbWV0aG9kIGZvciBkaWZmZXJlbnQgTWluZWNyYWZ0IHZlcnNpb25zXG4gICAgdmFyIGdldFNlcnZlciA9IChfYSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuc2VydmVyLk1pbmVjcmFmdFNlcnZlclwiKS5zdGF0aWNNZXRob2RzLmdldFNlcnZlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1ldGhvZDtcbiAgICAvLyBEZWZpbmUgZ2xvYmFsIGZ1bmN0aW9uXG4gICAgZ2xvYmFsVGhpcy5PdmVuTURLX19leGVjdXRlQ29tbWFuZEFzID1cbiAgICAgICAgZnVuY3Rpb24gT3Zlbk1ES19fZXhlY3V0ZUNvbW1hbmRBcygkY29tbWFuZHNlbmRlciwgY29tbWFuZCwgZmVlZGJhY2spIHtcbiAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSBnZXRTZXJ2ZXJcbiAgICAgICAgICAgICAgICA/IGdldFNlcnZlcigpIC8vIDEuOFxuICAgICAgICAgICAgICAgIDogTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5zZXJ2ZXIuTWluZWNyYWZ0U2VydmVyXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMuc2VydmVyOyAvLyAxLjEyXG4gICAgICAgICAgICBpZiAoIXNlcnZlcilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZXJ2ZXIpO1xuICAgICAgICAgICAgdmFyIGNvbW1hbmRNYW5hZ2VyID0gc2VydmVyLiRjb21tYW5kTWFuYWdlcjtcbiAgICAgICAgICAgIC8vIFRlbXBvcmFyaWx5IG92ZXJyaWRlIHBlcm1pc3Npb25zXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxDYW5Db21tYW5kID0gJGNvbW1hbmRzZW5kZXIuJGNhbkNvbW1hbmRTZW5kZXJVc2VDb21tYW5kO1xuICAgICAgICAgICAgJGNvbW1hbmRzZW5kZXIuJGNhbkNvbW1hbmRTZW5kZXJVc2VDb21tYW5kID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gMTsgfTtcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbEZlZWRiYWNrID0gJGNvbW1hbmRzZW5kZXIuJHNlbmRDb21tYW5kRmVlZGJhY2s7XG4gICAgICAgICAgICAkY29tbWFuZHNlbmRlci4kc2VuZENvbW1hbmRGZWVkYmFjayA9IGZlZWRiYWNrID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gMTsgfSA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDA7IH07XG4gICAgICAgICAgICB2YXIgbm90aWZ5T3BzMCA9IE1vZEFQSS5ob29rcy5tZXRob2RzLm5tY19Db21tYW5kQmFzZV9ub3RpZnlPcGVyYXRvcnMwO1xuICAgICAgICAgICAgdmFyIG5vdGlmeU9wcyA9IE1vZEFQSS5ob29rcy5tZXRob2RzLm5tY19Db21tYW5kQmFzZV9ub3RpZnlPcGVyYXRvcnM7XG4gICAgICAgICAgICB2YXIgYWRkQ2hhdE1zZyA9ICRjb21tYW5kc2VuZGVyLiRhZGRDaGF0TWVzc2FnZTtcbiAgICAgICAgICAgIGlmICghZmVlZGJhY2spIHtcbiAgICAgICAgICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5ubWNfQ29tbWFuZEJhc2Vfbm90aWZ5T3BlcmF0b3JzMCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5ubWNfQ29tbWFuZEJhc2Vfbm90aWZ5T3BlcmF0b3JzID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICAgICAgICAgICRjb21tYW5kc2VuZGVyLiRhZGRDaGF0TWVzc2FnZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29tbWFuZE1hbmFnZXIuJGV4ZWN1dGVDb21tYW5kKCRjb21tYW5kc2VuZGVyLCBNb2RBUEkudXRpbC5zdHIoY29tbWFuZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWZlZWRiYWNrKSB7XG4gICAgICAgICAgICAgICAgTW9kQVBJLmhvb2tzLm1ldGhvZHMubm1jX0NvbW1hbmRCYXNlX25vdGlmeU9wZXJhdG9yczAgPSBub3RpZnlPcHMwO1xuICAgICAgICAgICAgICAgIE1vZEFQSS5ob29rcy5tZXRob2RzLm5tY19Db21tYW5kQmFzZV9ub3RpZnlPcGVyYXRvcnMgPSBub3RpZnlPcHM7XG4gICAgICAgICAgICAgICAgJGNvbW1hbmRzZW5kZXIuJGFkZENoYXRNZXNzYWdlID0gYWRkQ2hhdE1zZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJlc3RvcmUgb3JpZ2luYWwgcGVybWlzc2lvbnMgYW5kIGZlZWRiYWNrXG4gICAgICAgICAgICAkY29tbWFuZHNlbmRlci4kY2FuQ29tbWFuZFNlbmRlclVzZUNvbW1hbmQgPSBvcmlnaW5hbENhbkNvbW1hbmQ7XG4gICAgICAgICAgICAkY29tbWFuZHNlbmRlci4kc2VuZENvbW1hbmRGZWVkYmFjayA9IG9yaWdpbmFsRmVlZGJhY2s7XG4gICAgICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJPdmVuT3JlU2VydmVyKGJsb2NrX0lELCB2aWVuU2l6ZSwgdmllbkNvdW50LCBtaW5HZW5lcmF0aW9uSGVpZ2h0LCBtYXhHZW5lcmF0aW9uSGVpZ2h0KSB7XG4gICAgdmFyIFdvcmxkR2VuTWluZWFibGUgPSBNb2RBUEkucmVmbGVjdFxuICAgICAgICAuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5nZW4uZmVhdHVyZS5Xb3JsZEdlbk1pbmFibGVcIilcbiAgICAgICAgLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gMjsgfSk7XG4gICAgdmFyIEJpb21lRGVjb3JhdG9yX2RlY29yYXRlID0gTW9kQVBJLnV0aWwuZ2V0TWV0aG9kRnJvbVBhY2thZ2UoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lRGVjb3JhdG9yXCIsIFwiZGVjb3JhdGVcIik7XG4gICAgdmFyIG9sZERlY29yYXRlID0gTW9kQVBJLmhvb2tzLm1ldGhvZHNbQmlvbWVEZWNvcmF0b3JfZGVjb3JhdGVdO1xuICAgIE1vZEFQSS5ob29rcy5tZXRob2RzW0Jpb21lRGVjb3JhdG9yX2RlY29yYXRlXSA9IGZ1bmN0aW9uICgkdGhpcywgJHdvcmxkLCAkcmFuZG9tLCAkYmlvbWVHZW5CYXNlLCAkYmxvY2twb3MpIHtcbiAgICAgICAgaWYgKCEkdGhpcy4kY3VycmVudFdvcmxkKSB7XG4gICAgICAgICAgICAkdGhpc1tcIiRPdmVuTURLX19hZHZhbmNlZF9ibG9jazBfNDgzNDk1X0Jsb2NrR2VuXCJdID0gV29ybGRHZW5NaW5lYWJsZShNb2RBUEkuYmxvY2tzW1wiXCIuY29uY2F0KGJsb2NrX0lEKV0uZ2V0U3RhdGVGcm9tTWV0YSgwKS5nZXRSZWYoKSwgdmllblNpemUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvbGREZWNvcmF0ZS5hcHBseSh0aGlzLCBbXG4gICAgICAgICAgICAkdGhpcyxcbiAgICAgICAgICAgICR3b3JsZCxcbiAgICAgICAgICAgICRyYW5kb20sXG4gICAgICAgICAgICAkYmlvbWVHZW5CYXNlLFxuICAgICAgICAgICAgJGJsb2NrcG9zLFxuICAgICAgICBdKTtcbiAgICB9O1xuICAgIHZhciBCaW9tZURlY29yYXRvcl9nZW5lcmF0ZU9yZXMgPSBNb2RBUEkudXRpbC5nZXRNZXRob2RGcm9tUGFja2FnZShcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVEZWNvcmF0b3JcIiwgXCJnZW5lcmF0ZU9yZXNcIik7XG4gICAgdmFyIG9sZEdlbmVyYXRlT3JlcyA9IE1vZEFQSS5ob29rcy5tZXRob2RzW0Jpb21lRGVjb3JhdG9yX2dlbmVyYXRlT3Jlc107XG4gICAgTW9kQVBJLmhvb2tzLm1ldGhvZHNbQmlvbWVEZWNvcmF0b3JfZ2VuZXJhdGVPcmVzXSA9IGZ1bmN0aW9uICgkdGhpcykge1xuICAgICAgICAkdGhpcy4kZ2VuU3RhbmRhcmRPcmUxKHZpZW5Db3VudCwgJHRoaXNbXCIkT3Zlbk1ES19fYWR2YW5jZWRfYmxvY2swXzQ4MzQ5NV9CbG9ja0dlblwiXSB8fCBudWxsLCBtaW5HZW5lcmF0aW9uSGVpZ2h0LCBtYXhHZW5lcmF0aW9uSGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIG9sZEdlbmVyYXRlT3Jlcy5hcHBseSh0aGlzLCBbJHRoaXNdKTtcbiAgICB9O1xufVxuIiwiLypcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4gICAgTW9kLnRzXG4gICAgXG4gICAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5pbXBvcnQgZGVmYXVsdEljb24gZnJvbSBcIkFTU0VUUy9kZWZhdWx0SWNvbi5wbmdcIjtcbnZhciBPTW9kID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9Nb2QoKSB7XG4gICAgfVxuICAgIE9Nb2QuY29uZmlnID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIE9Nb2QuaW5pdCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBPTW9kLnBvc3RJbml0ID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIE9Nb2QudGl0bGUgPSBcIkRlZmF1bHQgTmFtZVwiO1xuICAgIE9Nb2QudmVyc2lvbiA9IFwiXCI7XG4gICAgT01vZC5kZXNjcmlwdGlvbiA9IFwiRGVmYXVsdCBPdmVuTURLIERlc2NyaXB0aW9uLiBTZXQgJ2Rlc2NyaXB0aW9uJyBpbiB5b3VyIE9Nb2QgY2xhc3MhXCI7XG4gICAgT01vZC5jcmVkaXRzID0gXCJOb25lIEdpdmVuXCI7XG4gICAgT01vZC5pY29uID0gZGVmYXVsdEljb247XG4gICAgT01vZC5hY2NlcHRlZE1pbmVjcmFmdFZlcnNpb25zID0gbnVsbDtcbiAgICBPTW9kLmFjY2VwdGVkRWFnbGVyVXBkYXRlcyA9IG51bGw7XG4gICAgT01vZC5hY2NlcHRlZEVGVmVyc2lvbnMgPSBudWxsO1xuICAgIE9Nb2QuYWNjZXB0ZWRFRkZsYXZvdXIgPSBcImluamVjdG9yXCI7XG4gICAgT01vZC5jbGllbnRTaWRlT25seSA9IGZhbHNlO1xuICAgIE9Nb2Quc2VydmVyU2lkZU9ubHkgPSBmYWxzZTtcbiAgICBPTW9kLm9ubHlfMV8xMl8yID0gZmFsc2U7XG4gICAgT01vZC5EZWJ1Z19tb2RlID0gZmFsc2U7XG4gICAgcmV0dXJuIE9Nb2Q7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgT01vZDtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcbiAgICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG4vKlxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4gIE9CbG9jay50c1xuXG4gIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE92ZW5NREsuXG5cbiAgICBPdmVuTURLIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXJcbiAgICB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWVcbiAgICBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pXG4gICAgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICBPdmVuTURLIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWVxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1NcbiAgICBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYWxvbmdcbiAgICB3aXRoIE92ZW4gTURLLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbnZhciBPQmxvY2sgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT0Jsb2NrKGJsb2NrTmFtZSwgYmxvY2tJRCwgdGV4dHVyZSwgb25CcmVhaykge1xuICAgICAgICB0aGlzLmJsb2NrTmFtZSA9IGJsb2NrTmFtZTtcbiAgICAgICAgdGhpcy5ibG9ja0lEID0gYmxvY2tJRDtcbiAgICAgICAgdGhpcy5ibG9ja1RleHR1cmUgPSB0ZXh0dXJlO1xuICAgICAgICB0aGlzLm9uQnJlYWsgPSBvbkJyZWFrO1xuICAgIH1cbiAgICBPQmxvY2sucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgQmxvY2tDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIik7XG4gICAgICAgIHZhciBJdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICAgICAgdmFyIGNyZWF0aXZlVGFiO1xuICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjcmVhdGl2ZVRhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy50YWJCbG9jaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIGNyZWF0aXZlVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLkJVSUxESU5HX0JMT0NLUztcbiAgICAgICAgfVxuICAgICAgICB2YXIgYmxvY2tTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKEJsb2NrQ2xhc3MsIGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZm4ubGVuZ3RoID09PSAyOyB9KTtcbiAgICAgICAgdmFyIGJyZWFrQmxvY2tNZXRob2QgPSBCbG9ja0NsYXNzLm1ldGhvZHMuYnJlYWtCbG9jay5tZXRob2Q7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gbm1iX09ibG9jaygpIHtcbiAgICAgICAgICAgIGJsb2NrU3VwZXIodGhpcywgTW9kQVBJLm1hdGVyaWFscy5yb2NrLmdldFJlZigpKTtcbiAgICAgICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRkZWZhdWx0QmxvY2tTdGF0ZSA9IHRoaXMuJGJsb2NrU3RhdGUuJGdldEJhc2VTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kc2V0Q3JlYXRpdmVUYWIoY3JlYXRpdmVUYWIpO1xuICAgICAgICB9XG4gICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKEJsb2NrQ2xhc3MsIG5tYl9PYmxvY2spO1xuICAgICAgICBubWJfT2Jsb2NrLnByb3RvdHlwZS4kYnJlYWtCbG9jayA9IGZ1bmN0aW9uICgkd29ybGQsICRibG9ja3BvcywgJGJsb2Nrc3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBicmVha0Jsb2NrTWV0aG9kKHRoaXMsICR3b3JsZCwgJGJsb2NrcG9zLCAkYmxvY2tzdGF0ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciAkJG9uQmxvY2tEZXN0cm95ZWRCeVBsYXllck1ldGhvZCA9IEJsb2NrQ2xhc3MubWV0aG9kcy5vbkJsb2NrRGVzdHJveWVkQnlQbGF5ZXIubWV0aG9kO1xuICAgICAgICBubWJfT2Jsb2NrLnByb3RvdHlwZS4kb25CbG9ja0Rlc3Ryb3llZEJ5UGxheWVyID0gZnVuY3Rpb24gKCQkd29ybGQsICQkYmxvY2twb3MsICQkYmxvY2tzdGF0ZSkge1xuICAgICAgICAgICAgdmFyICQkd29ybGQsICQkYmxvY2twb3MsICQkYmxvY2tzdGF0ZTtcbiAgICAgICAgICAgIHNlbGYub25CcmVhay5jYWxsKCQkd29ybGQsICQkYmxvY2twb3MsICQkYmxvY2tzdGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gJCRvbkJsb2NrRGVzdHJveWVkQnlQbGF5ZXJNZXRob2QodGhpcywgJCR3b3JsZCwgJCRibG9ja3BvcywgJCRibG9ja3N0YXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGludGVybmFsUmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VzdG9tX2Jsb2NrO1xuICAgICAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgIGN1c3RvbV9ibG9jayA9IG5ldyBubWJfT2Jsb2NrKClcbiAgICAgICAgICAgICAgICAgICAgLiRzZXRIYXJkbmVzcygzLjApXG4gICAgICAgICAgICAgICAgICAgIC4kc2V0U3RlcFNvdW5kKEJsb2NrQ2xhc3Muc3RhdGljVmFyaWFibGVzLnNvdW5kVHlwZVBpc3RvbilcbiAgICAgICAgICAgICAgICAgICAgLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKF90aGlzLmJsb2NrSUQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgIGN1c3RvbV9ibG9jayA9IG5ldyBubWJfT2Jsb2NrKClcbiAgICAgICAgICAgICAgICAgICAgLiRzZXRIYXJkbmVzcygtMS4wKVxuICAgICAgICAgICAgICAgICAgICAuJHNldFNvdW5kVHlwZShNb2RBUEkuYmxvY2tTb3VuZHMuUExBTlQuZ2V0UmVmKCkpXG4gICAgICAgICAgICAgICAgICAgIC4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihfdGhpcy5ibG9ja0lEKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBCbG9ja0NsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJCbG9jazAubWV0aG9kKE1vZEFQSS5rZXlnZW4uYmxvY2soX3RoaXMuYmxvY2tJRCksIE1vZEFQSS51dGlsLnN0cihfdGhpcy5ibG9ja0lEKSwgY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgIEl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbUJsb2NrMC5tZXRob2QoY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgIF90aGlzLmZpeHVwQmxvY2tJZHMoKTtcbiAgICAgICAgICAgIE1vZEFQSS5ibG9ja3NbX3RoaXMuYmxvY2tJRF0gPSBjdXN0b21fYmxvY2s7XG4gICAgICAgICAgICBfdGhpcy5ibG9ja0luc3RhbmNlID0gY3VzdG9tX2Jsb2NrO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmVkIGJsb2NrIG9uIGNsaWVudDogXCIgKyBfdGhpcy5ibG9ja0lEKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1c3RvbV9ibG9jayk7XG4gICAgICAgICAgICByZXR1cm4gY3VzdG9tX2Jsb2NrO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBpZiAoTW9kQVBJLm1hdGVyaWFscykge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbFJlZ2lzdGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImJvb3RzdHJhcFwiLCBpbnRlcm5hbFJlZ2lzdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIGlmIChNb2RBUEkuYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgobmV3IG5tYl9PYmxvY2soKSkuJHNldEhhcmRuZXNzKC0xLjApLiRzZXRTb3VuZFR5cGUoTW9kQVBJLmJsb2NrU291bmRzLlBMQU5ULmdldFJlZigpKS4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cih0aGlzLmJsb2NrSUQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9CbG9jay5wcm90b3R5cGUuZml4dXBCbG9ja0lkcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJsb2NrUmVnaXN0cnkgPSBNb2RBUEkudXRpbFxuICAgICAgICAgICAgLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5ibG9jay5CbG9ja1wiKS5zdGF0aWNWYXJpYWJsZXNcbiAgICAgICAgICAgIC5ibG9ja1JlZ2lzdHJ5KVxuICAgICAgICAgICAgLmdldENvcnJlY3RpdmUoKTtcbiAgICAgICAgdmFyIEJMT0NLX1NUQVRFX0lEUyA9IE1vZEFQSS51dGlsXG4gICAgICAgICAgICAud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpLnN0YXRpY1ZhcmlhYmxlc1xuICAgICAgICAgICAgLkJMT0NLX1NUQVRFX0lEUylcbiAgICAgICAgICAgIC5nZXRDb3JyZWN0aXZlKCk7XG4gICAgICAgIGJsb2NrUmVnaXN0cnkucmVnaXN0cnlPYmplY3RzLmhhc2hUYWJsZUtUb1YuZm9yRWFjaChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIHZhciBibG9ja18xID0gZW50cnkudmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIHZhbGlkU3RhdGVzID0gYmxvY2tfMS5nZXRCbG9ja1N0YXRlKCkuZ2V0VmFsaWRTdGF0ZXMoKTtcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGVBcnJheSA9IHZhbGlkU3RhdGVzLmFycmF5IHx8IFt2YWxpZFN0YXRlcy5lbGVtZW50XTtcbiAgICAgICAgICAgICAgICBzdGF0ZUFycmF5LmZvckVhY2goZnVuY3Rpb24gKGlibG9ja3N0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gKGJsb2NrUmVnaXN0cnkuZ2V0SURGb3JPYmplY3QoYmxvY2tfMS5nZXRSZWYoKSkgPDwgNCkgfFxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tfMS5nZXRNZXRhRnJvbVN0YXRlKGlibG9ja3N0YXRlLmdldFJlZigpKTtcbiAgICAgICAgICAgICAgICAgICAgQkxPQ0tfU1RBVEVfSURTLnB1dChpYmxvY2tzdGF0ZS5nZXRSZWYoKSwgaSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT0Jsb2NrLnByb3RvdHlwZS5yZWdpc3RlckJsb2NrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VzdG9tX2Jsb2NrLCBubWJfT0Jsb2NrLCBpdGVtQ2xhc3MsIGJsb2NrQ2xhc3MsIHNlbGY7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tX2Jsb2NrID0gbmV3IE9CbG9jayh0aGlzLmJsb2NrTmFtZSwgdGhpcy5ibG9ja0lELCB0aGlzLmJsb2NrVGV4dHVyZSwgdGhpcy5vbkJyZWFrKS5yZWdpc3RlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgbm1iX09CbG9jayA9IG5ldyBPQmxvY2sodGhpcy5ibG9ja05hbWUsIHRoaXMuYmxvY2tJRCwgdGhpcy5ibG9ja1RleHR1cmUsIHRoaXMub25CcmVhaykucmVnaXN0ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIik7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpO1xuICAgICAgICAgICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBubWJfT0Jsb2NrO1xuICAgICAgICAgICAgICAgICAgICBibG9ja0NsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJCbG9jazAubWV0aG9kKE1vZEFQSS5rZXlnZW4uYmxvY2sodGhpcy5ibG9ja0lEKSwgTW9kQVBJLnV0aWwuc3RyKHRoaXMuYmxvY2tJRCksIGN1c3RvbV9ibG9jayk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbUJsb2NrMC5tZXRob2QoY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3VzdG9tX2Jsb2NrIHx8IFwiQmxvY2sgcmVnaXN0cmF0aW9uIGZhaWxlZFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVyQmxvY2soXFxcIlwiLmNvbmNhdCh0aGlzLmJsb2NrSUQsIFwiXFxcIiwgXCIpLmNvbmNhdCh0aGlzLm9uQnJlYWssIFwiKTtcIikpO1xuICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBidWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3Npbms6cmVnaXN0ZXJpdGVtc1wiLCBmdW5jdGlvbiAocmVuZGVySXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckl0ZW0ucmVnaXN0ZXJCbG9jayhjdXN0b21fYmxvY2ssIE1vZEFQSS51dGlsLnN0cihzZWxmLmJsb2NrSUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLkwxME4uc2V0KFwidGlsZS5cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5uYW1lXCIpLCBzZWxmLmJsb2NrTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNldCBsb2NhbGl6YXRpb24gZm9yIGJsb2NrIFwiLmNvbmNhdChzZWxmLmJsb2NrSUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9tb2RlbHMvYmxvY2svXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogXCJibG9jay9jdWJlX2FsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbDogXCJibG9ja3MvXCIuY29uY2F0KHNlbGYuYmxvY2tJRCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9tb2RlbHMvaXRlbS9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBcImJsb2NrL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcmRwZXJzb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBbMTAsIC00NSwgMTcwXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBbMCwgMS41LCAtMi43NV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTogWzAuMzc1LCAwLjM3NSwgMC4zNzVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvYmxvY2tzdGF0ZXMvXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBzZWxmLmJsb2NrSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChzZWxmLmJsb2NrVGV4dHVyZSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvdGV4dHVyZXMvYmxvY2tzL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLnBuZ1wiKSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSwgYnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2luazpyZWdpc3Rlcml0ZW1zXCIsIGZ1bmN0aW9uIChyZW5kZXJJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb29sIHJlZ2lzdGVyIGJsb2NrXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1c3RvbV9ibG9jayB8fCBcIkJsb2NrIHJlZ2lzdHJhdGlvbiBmYWlsZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVySXRlbS5yZWdpc3RlckJsb2NrKGN1c3RvbV9ibG9jaywgTW9kQVBJLnV0aWwuc3RyKF90aGlzLmJsb2NrSUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLkwxME4uc2V0KFwidGlsZS5cIiArIHRoaXMuYmxvY2tJRCArIFwiLm5hbWVcIiwgdGhpcy5ibG9ja05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZXQgbG9jYWxpemF0aW9uIGZvciBibG9jayBcIi5jb25jYXQoc2VsZi5ibG9ja0lEKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXN0b21fYmxvY2sgfHwgXCJCbG9jayByZWdpc3RyYXRpb24gZmFpbGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9ibG9jay9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJlbnRcIjogXCJibG9jay9jdWJlX2FsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dHVyZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFsbFwiOiBcImJsb2Nrcy9cIi5jb25jYXQoc2VsZi5ibG9ja0lEKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9tb2RlbHMvaXRlbS9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJlbnRcIjogXCJibG9jay9cIi5jb25jYXQoc2VsZi5ibG9ja0lEKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L2Jsb2Nrc3RhdGVzL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhcmlhbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJub3JtYWxcIjogeyBcIm1vZGVsXCI6IFwiXCIuY29uY2F0KHRoaXMuYmxvY2tJRCkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHNlbGYuYmxvY2tUZXh0dXJlKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9ibG9ja3MvXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIucG5nXCIpLCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckJsb2NrKFxcXCJcIi5jb25jYXQodGhpcy5ibG9ja0lELCBcIlxcXCIsIFwiKS5jb25jYXQodGhpcy5vbkJyZWFrLCBcIik7XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5ibG9ja3NbdGhpcy5ibG9ja0lEXSA9IGN1c3RvbV9ibG9jaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gT0Jsb2NrO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE9CbG9jaztcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcbiAgICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgT0l0ZW0gZnJvbSBcIi4vT0l0ZW1cIjtcbnZhciBPRW50aXR5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9FbnRpdHkoZW50aXR5TmFtZSwgZW50aXR5SUQsIGVudGl0eVRleHR1cmUsIGVudGl0eU1vZGVsLCBlbnRpdHlfc291bmRfbWFpbiwgZW50aXR5QnJlZWRJdGVtLCBlbnRpdHlEcm9wSXRlbSwgZWdnQmFzZSwgZWdnU3BvdHMpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlOYW1lID0gZW50aXR5TmFtZTtcbiAgICAgICAgdGhpcy5lbnRpdHlJRCA9IGVudGl0eUlEO1xuICAgICAgICB0aGlzLmVudGl0eVRleHR1cmUgPSBlbnRpdHlUZXh0dXJlO1xuICAgICAgICB0aGlzLmVudGl0eU1vZGVsID0gZW50aXR5TW9kZWw7XG4gICAgICAgIHRoaXMuZW50aXR5X3NvdW5kX21haW4gPSBlbnRpdHlfc291bmRfbWFpbjtcbiAgICAgICAgdGhpcy5lbnRpdHlCcmVlZEl0ZW0gPSBlbnRpdHlCcmVlZEl0ZW0gfHwgXCJ3aGVhdFwiOyAvL2RlZmF1bHQgYnJlZWQgaXRlbVxuICAgICAgICB0aGlzLmVudGl0eURyb3BJdGVtID0gZW50aXR5RHJvcEl0ZW0gfHwgXCJmZWF0aGVyXCI7IC8vZGVmYXVsdCBkcm9wIGl0ZW1cbiAgICAgICAgdGhpcy5lZ2dCYXNlID0gZWdnQmFzZSB8fCAweDVlM2UyZDsgLy9kZWZhdWx0IGVnZyBiYXNlIGNvbG9yXG4gICAgICAgIHRoaXMuZWdnU3BvdHMgPSBlZ2dTcG90cyB8fCAweDI2OTE2NjsgLy9kZWZhdWx0IGVnZyBzcG90cyBjb2xvclxuICAgIH1cbiAgICBPRW50aXR5LnByb3RvdHlwZS53YWl0Rm9yUmVuZGVyTWFuYWdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzLCByZWopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNb2RBUEkubWMucmVuZGVyTWFuYWdlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2ssIDEgLyAyMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT0VudGl0eS5wcm90b3R5cGUucmVnaXN0ZXJFbnRpdHlDbGllbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPRW50aXR5IGRvZXMgbm90IHN1cHBvcnQgMS4xMiwgcGxlYXNlIHVzZSAxLjguOCBmb3IgZnVsbCBzdXBwb3J0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUud2FybihcImVudGl0aWVzIGFyZSBub3QgZmluaXNoZWQgeWV0ISBVc2UgYXQgeW91ciBvd24gcmlzayFcIik7XG4gICAgICAgIC8vcmV0dXJuO1xuICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5qbF9TdHJpbmdfZm9ybWF0ID0gTW9kQVBJLmhvb2tzLm1ldGhvZHMubmxldl9IU3RyaW5nX2Zvcm1hdDsgLy90ZW1wb3JhcnkgdGhpbmcgdG8gZml4IGFuIGlzc3VlIGluIGVhZ2xlcmNyYWZ0XG4gICAgICAgIC8vIFV0aWxzXG4gICAgICAgIGZ1bmN0aW9uIEFJVGFzayhuYW1lLCBsZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5haS5cIiArIG5hbWUpLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gbGVuZ3RoOyB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgUmVzb3VyY2VMb2NhdGlvbiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiUmVzb3VyY2VMb2NhdGlvblwiKS5jb25zdHJ1Y3RvcnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDE7IH0pO1xuICAgICAgICB2YXIgRW50aXR5UGxheWVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnRpdHlQbGF5ZXJcIik7XG4gICAgICAgIHZhciBHbFN0YXRlTWFuYWdlciA9IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QudmFsdWVzKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiR2xTdGF0ZU1hbmFnZXJcIikuc3RhdGljTWV0aG9kcykubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiBbeC5tZXRob2ROYW1lU2hvcnQsIHgubWV0aG9kXTsgfSkpO1xuICAgICAgICB2YXIgU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIlNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzXCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgLy8gU1RBUlQgQ1VTVE9NIEVOVElUWVxuICAgICAgICB2YXIgZW50aXR5U2l6ZTEgPSAwLjQ7IC8vIERlZmF1bHQgc2l6ZSBmb3IgbW9zdCBlbnRpdGllc1xuICAgICAgICB2YXIgZW50aXR5U2l6ZTIgPSAwLjc7XG4gICAgICAgIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsQ2hpY2tlblwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuNDsgLy8gQ2hpY2tlblxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbENvd1wiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuOTsgLy8gQ293XG4gICAgICAgICAgICBlbnRpdHlTaXplMiA9IDEuNDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsTW9vc2hyb29tXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMC45OyAvLyBNb29zaHJvb21cbiAgICAgICAgICAgIGVudGl0eVNpemUyID0gMS40O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZW50aXR5TW9kZWwgPT09IFwiTW9kZWxQaWdcIikge1xuICAgICAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjk7IC8vIFBpZ1xuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFNoZWVwXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMC45OyAvLyBTaGVlcFxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAxLjM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbEhvcnNlXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMS4zOTY1OyAvLyBIb3JzZVxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAxLjY7IC8vIEhlaWdodCBjYW4gdmFyeSBzbGlnaHRseVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZW50aXR5TW9kZWwgPT09IFwiTW9kZWxSYWJiaXRcIikge1xuICAgICAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjQ7IC8vIFJhYmJpdFxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFNxdWlkXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMC44OyAvLyBTcXVpZFxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbEJhdFwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuNTsgLy8gQmF0XG4gICAgICAgICAgICBlbnRpdHlTaXplMiA9IDAuOTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsT2NlbG90XCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMC42OyAvLyBPY2Vsb3QgKHdpbGQpXG4gICAgICAgICAgICBlbnRpdHlTaXplMiA9IDAuNztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsV29sZlwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuNjsgLy8gV29sZlxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjg1O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZW50aXR5TW9kZWwgPT09IFwiTW9kZWxWaWxsYWdlclwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuNjsgLy8gVmlsbGFnZXJcbiAgICAgICAgICAgIGVudGl0eVNpemUyID0gMS45NTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsSXJvbkdvbGVtXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMS40OyAvLyBJcm9uIEdvbGVtXG4gICAgICAgICAgICBlbnRpdHlTaXplMiA9IDIuOTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsU25vd21hblwiIHx8IHRoaXMuZW50aXR5TW9kZWwgPT09IFwiTW9kZWxTbm93R29sZW1cIikge1xuICAgICAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjc7IC8vIFNub3cgR29sZW1cbiAgICAgICAgICAgIGVudGl0eVNpemUyID0gMS45O1xuICAgICAgICB9XG4gICAgICAgIDtcbiAgICAgICAgdmFyIGVudGl0eUJyZWVkSXRlbSA9IHRoaXMuZW50aXR5QnJlZWRJdGVtO1xuICAgICAgICB2YXIgZW50aXR5RHJvcEl0ZW0gPSB0aGlzLmVudGl0eURyb3BJdGVtO1xuICAgICAgICB2YXIgZW50aXR5Q2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5wYXNzaXZlLkVudGl0eUFuaW1hbFwiKTtcbiAgICAgICAgdmFyIGVudGl0eVN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoZW50aXR5Q2xhc3MsIGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gMjsgfSk7XG4gICAgICAgIHZhciBubWVfT0VudGl0eSA9IGZ1bmN0aW9uIG5tZV9PRW50aXR5KCR3b3JsZEluKSB7XG4gICAgICAgICAgICBlbnRpdHlTdXBlcih0aGlzLCAkd29ybGRJbik7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC5zZXRTaXplKGVudGl0eVNpemUxLCBlbnRpdHlTaXplMik7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygwLCBBSVRhc2soXCJFbnRpdHlBSVN3aW1taW5nXCIsIDEpKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDEsIEFJVGFzayhcIkVudGl0eUFJUGFuaWNcIiwgMikodGhpcywgMS45KSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygyLCBBSVRhc2soXCJFbnRpdHlBSU1hdGVcIiwgMikodGhpcywgMS4wKSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygzLCBBSVRhc2soXCJFbnRpdHlBSVRlbXB0XCIsIDQpKHRoaXMsIDEuNSwgTW9kQVBJLml0ZW1zW1wiXCIuY29uY2F0KGVudGl0eUJyZWVkSXRlbSldLmdldFJlZigpLCAwKSk7IC8vd29uJ3QgY2F1c2UgYSBwcm9ibGVtIGFzIHRoZSBicmVhZCBpcyBvYnRhaW5lZCB3aGVuIHRoZSBlbnRpdHkgaXMgY29uc3RydWN0ZWQuXG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg0LCBBSVRhc2soXCJFbnRpdHlBSUZvbGxvd1BhcmVudFwiLCAyKSh0aGlzLCAxLjIpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDUsIEFJVGFzayhcIkVudGl0eUFJV2FuZGVyXCIsIDIpKHRoaXMsIDEuMSkpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNiwgQUlUYXNrKFwiRW50aXR5QUlXYXRjaENsb3Nlc3RcIiwgMykodGhpcywgTW9kQVBJLnV0aWwuYXNDbGFzcyhFbnRpdHlQbGF5ZXIuY2xhc3MpLCA2KSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg3LCBBSVRhc2soXCJFbnRpdHlBSUxvb2tJZGxlXCIsIDEpKHRoaXMpKTtcbiAgICAgICAgfTtcbiAgICAgICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2soZW50aXR5Q2xhc3MsIG5tZV9PRW50aXR5KTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXRFeWVIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLndyYXBwZWQuaGVpZ2h0O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgb3JpZ2luYWxBcHBseUVudGl0eUF0dHJpYnV0ZXMgPSBubWVfT0VudGl0eS5wcm90b3R5cGUuJGFwcGx5RW50aXR5QXR0cmlidXRlcztcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRhcHBseUVudGl0eUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIG9yaWdpbmFsQXBwbHlFbnRpdHlBdHRyaWJ1dGVzLmFwcGx5KHRoaXMsIFtdKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubWF4SGVhbHRoKS5zZXRCYXNlVmFsdWUoNSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1vdmVtZW50U3BlZWQpLnNldEJhc2VWYWx1ZSgwLjI1KTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG9yaWdpbmFsTGl2aW5nVXBkYXRlID0gbm1lX09FbnRpdHkucHJvdG90eXBlLiRvbkxpdmluZ1VwZGF0ZTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRvbkxpdmluZ1VwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgb3JpZ2luYWxMaXZpbmdVcGRhdGUuYXBwbHkodGhpcywgW10pO1xuICAgICAgICAgICAgaWYgKHRoaXMud3JhcHBlZC5pc0luV2F0ZXIoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZC5tb3Rpb25ZICo9IDAuNTtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1vdmVtZW50U3BlZWQpLnNldEJhc2VWYWx1ZSgxLjQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tb3ZlbWVudFNwZWVkKS5zZXRCYXNlVmFsdWUoMC4yNSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0TGl2aW5nU291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgdGhpcy5lbnRpdHlJRCArIFwiLm1haW5fc291bmRcIik7XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0SHVydFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIHRoaXMuZW50aXR5SUQgKyBcIi5tYWluX3NvdW5kXCIpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldERlYXRoU291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgdGhpcy5lbnRpdHlJRCArIFwiLm1haW5fc291bmRcIik7XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kcGxheVN0ZXBTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnBsYXlTb3VuZChNb2RBUEkudXRpbC5zdHIoXCJtb2IuXCIgKyB0aGlzLmVudGl0eUlEICsgXCIuc3RlcFwiKSwgMC4yLCAxKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXREcm9wSXRlbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBNb2RBUEkuaXRlbXNbXCJcIi5jb25jYXQoZW50aXR5RHJvcEl0ZW0pXS5nZXRSZWYoKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRjcmVhdGVDaGlsZCA9IGZ1bmN0aW9uIChvdGhlclBhcmVudCkge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBubWVfT0VudGl0eSgoX2IgPSAoX2EgPSB0aGlzLndyYXBwZWQud29ybGRPYmopID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRSZWYoKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogbnVsbCk7XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kaXNCcmVlZGluZ0l0ZW0gPSBmdW5jdGlvbiAoaXRlbXN0YWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbXN0YWNrICE9PSBudWxsICYmIGl0ZW1zdGFjay4kZ2V0SXRlbSgpID09PSBNb2RBUEkuaXRlbXNbXCJcIi5jb25jYXQoZW50aXR5QnJlZWRJdGVtKV0uZ2V0UmVmKCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIEVORCBDVVNUT00gRU5USVRZXG4gICAgICAgIC8vIFNUQVJUIENVU1RPTSBNT0RFTFxuICAgICAgICB2YXIgbW9kZWxDaGlja2VuQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNsaWVudC5tb2RlbC5cIi5jb25jYXQodGhpcy5lbnRpdHlNb2RlbCkpO1xuICAgICAgICB2YXIgbW9kZWxDaGlja2VuU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihtb2RlbENoaWNrZW5DbGFzcyk7IC8vd2hpbGUgc3VwZXIgaXNuJ3QgdXNlZCB3aGVuIGV4dGVuZGluZyB0aGlzIGNsYXNzLCBqYXZhIGltcGxpZXMgdGhlIGNhbGwuXG4gICAgICAgIHZhciBubWNtX09FbnRpdHlNb2RlbCA9IGZ1bmN0aW9uIG5tY21fT0VudGl0eU1vZGVsKCkge1xuICAgICAgICAgICAgbW9kZWxDaGlja2VuU3VwZXIodGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKG1vZGVsQ2hpY2tlbkNsYXNzLCBubWNtX09FbnRpdHlNb2RlbCk7XG4gICAgICAgIC8vIEVORCBDVVNUT00gTU9ERUxcbiAgICAgICAgLy8gU1RBUlQgQ1VTVE9NIFJFTkRFUkVSXG4gICAgICAgIHZhciByZW5kZXJDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY2xpZW50LnJlbmRlcmVyLmVudGl0eS5SZW5kZXJMaXZpbmdcIik7XG4gICAgICAgIHZhciByZW5kZXJTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKHJlbmRlckNsYXNzLCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDQ7IH0pO1xuICAgICAgICB2YXIgZHVja1RleHR1cmVzID0gUmVzb3VyY2VMb2NhdGlvbihNb2RBUEkudXRpbC5zdHIoXCJ0ZXh0dXJlcy9lbnRpdHkvXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiLnBuZ1wiKSkpO1xuICAgICAgICB2YXIgbm1jcmVfUmVuZGVyT0VudGl0eSA9IGZ1bmN0aW9uIG5tY3JlX1JlbmRlck9FbnRpdHkocmVuZGVyTWFuYWdlciwgbW9kZWxCYXNlSW4sIHNoYWRvd1NpemVJbikge1xuICAgICAgICAgICAgcmVuZGVyU3VwZXIodGhpcywgcmVuZGVyTWFuYWdlciwgbW9kZWxCYXNlSW4sIHNoYWRvd1NpemVJbik7XG4gICAgICAgIH07XG4gICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKHJlbmRlckNsYXNzLCBubWNyZV9SZW5kZXJPRW50aXR5KTtcbiAgICAgICAgbm1jcmVfUmVuZGVyT0VudGl0eS5wcm90b3R5cGUuJGdldEVudGl0eVRleHR1cmUgPSBmdW5jdGlvbiAoZW50aXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gZHVja1RleHR1cmVzO1xuICAgICAgICB9O1xuICAgICAgICBubWNyZV9SZW5kZXJPRW50aXR5LnByb3RvdHlwZS4kaGFuZGxlUm90YXRpb25GbG9hdCA9IGZ1bmN0aW9uIChlbnRpdHksIHBhcnRpYWxUaWNrcykge1xuICAgICAgICAgICAgZW50aXR5ID0gTW9kQVBJLnV0aWwud3JhcChlbnRpdHkpO1xuICAgICAgICAgICAgaWYgKCghZW50aXR5Lm9uR3JvdW5kKSAmJiAoIWVudGl0eS5pc0luV2F0ZXIoKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMjsgLy9mYWxsaW5nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIElEID0gTW9kQVBJLmtleWdlbi5lbnRpdHkodGhpcy5lbnRpdHlJRCk7XG4gICAgICAgIE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eUxpc3RcIikuc3RhdGljTWV0aG9kcy5hZGRNYXBwaW5nMC5tZXRob2QoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIHtcbiAgICAgICAgICAgICRjcmVhdGVFbnRpdHk6IGZ1bmN0aW9uICgkd29ybGRJbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbm1lX09FbnRpdHkoJHdvcmxkSW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBNb2RBUEkudXRpbC5zdHIodGhpcy5lbnRpdHlOYW1lKSwgSUQsIHRoaXMuZWdnQmFzZSB8fCAweDVlM2UyZCwgLy9lZ2cgYmFzZVxuICAgICAgICB0aGlzLmVnZ1Nwb3RzIHx8IDB4MjY5MTY2IC8vZWdnIHNwb3RzXG4gICAgICAgICk7XG4gICAgICAgIHZhciBTcGF3blBsYWNlbWVudFR5cGUgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlMaXZpbmckU3Bhd25QbGFjZW1lbnRUeXBlXCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgdmFyIEVOVElUWV9QTEFDRU1FTlRTID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlTcGF3blBsYWNlbWVudFJlZ2lzdHJ5XCIpXG4gICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLkVOVElUWV9QTEFDRU1FTlRTKTtcbiAgICAgICAgRU5USVRZX1BMQUNFTUVOVFMucHV0KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCBTcGF3blBsYWNlbWVudFR5cGUuT05fR1JPVU5EKTtcbiAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoJ2Jvb3RzdHJhcCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBTcGF3bkxpc3RFbnRyeSA9IE1vZEFQSS5yZWZsZWN0XG4gICAgICAgICAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlJFNwYXduTGlzdEVudHJ5XCIpXG4gICAgICAgICAgICAgICAgLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gNDsgfSk7XG4gICAgICAgICAgICB2YXIgQmlvbWVHZW5Td2FtcCA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZUdlbkJhc2VcIilcbiAgICAgICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLnN3YW1wbGFuZCk7XG4gICAgICAgICAgICB2YXIgQmlvbWVHZW5SaXZlciA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZUdlbkJhc2VcIilcbiAgICAgICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLnJpdmVyKTtcbiAgICAgICAgICAgIHZhciBCaW9tZUdlbkJlYWNoID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMuYmVhY2gpO1xuICAgICAgICAgICAgdmFyIGR1Y2tTcGF3blN3YW1wID0gU3Bhd25MaXN0RW50cnkoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIDIyLCAzLCA1KTtcbiAgICAgICAgICAgIHZhciBkdWNrU3Bhd25SaXZlckJlZCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAxMCwgNSwgOSk7XG4gICAgICAgICAgICB2YXIgZHVja1NwYXduQmVhY2ggPSBTcGF3bkxpc3RFbnRyeShNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgMjQsIDIsIDMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobm1lX09FbnRpdHkpO1xuICAgICAgICAgICAgQmlvbWVHZW5Td2FtcC5zcGF3bmFibGVDcmVhdHVyZUxpc3QuYWRkKGR1Y2tTcGF3blN3YW1wKTtcbiAgICAgICAgICAgIEJpb21lR2VuUml2ZXIuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25SaXZlckJlZCk7XG4gICAgICAgICAgICBCaW9tZUdlbkJlYWNoLnNwYXduYWJsZUNyZWF0dXJlTGlzdC5hZGQoZHVja1NwYXduQmVhY2gpO1xuICAgICAgICB9KTtcbiAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBBc3luY1NpbmsuTDEwTi5zZXQoXCJlbnRpdHkuXCIuY29uY2F0KHRoaXMuZW50aXR5TmFtZSwgXCIubmFtZVwiKSwgdGhpcy5lbnRpdHlOYW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7IH0pO1xuICAgICAgICByZXR1cm4gX2EgPSB7fSxcbiAgICAgICAgICAgIF9hW1wiRW50aXR5XCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXSA9IG5tZV9PRW50aXR5LFxuICAgICAgICAgICAgX2FbXCJNb2RlbFwiLmNvbmNhdCh0aGlzLmVudGl0eUlEKV0gPSBubWNtX09FbnRpdHlNb2RlbCxcbiAgICAgICAgICAgIF9hW1wiUmVuZGVyXCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXSA9IG5tY3JlX1JlbmRlck9FbnRpdHksXG4gICAgICAgICAgICBfYVtcIlwiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIlRleHR1cmVzXCIpXSA9IGR1Y2tUZXh0dXJlcyxcbiAgICAgICAgICAgIF9hO1xuICAgIH07XG4gICAgT0VudGl0eS5wcm90b3R5cGUucmVnaXN0ZXJPRW50aXR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyRW50aXR5U2VydmVyKFxcXCJcIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCJcXFwiLCBcXFwiXCIpLmNvbmNhdCh0aGlzLmVudGl0eU5hbWUsIFwiXFxcIiwgXFxcIlwiKS5jb25jYXQodGhpcy5lbnRpdHlNb2RlbCwgXCJcXFwiLCBcIikuY29uY2F0KHRoaXMuZWdnQmFzZSwgXCIsIFwiKS5jb25jYXQodGhpcy5lZ2dTcG90cywgXCIpO1wiKSk7XG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5yZWdpc3RlckVudGl0eUNsaWVudCgpO1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2o7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9rKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfay5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYiA9IChfYSA9IEFzeW5jU2luaykuc2V0RmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jID0gW1wicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9lbnRpdHkvXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiLnBuZ1wiKV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaCh0aGlzLmVudGl0eVRleHR1cmUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzQgLyp5aWVsZCovLCAoX2suc2VudCgpKS5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2IuYXBwbHkoX2EsIF9jLmNvbmNhdChbX2suc2VudCgpXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLmhpZGVGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9lbnRpdHkvXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiLnBuZy5tY21ldGFcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy53YWl0Rm9yUmVuZGVyTWFuYWdlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2suc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2UgPSAoX2QgPSBBc3luY1NpbmspLnNldEZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZiA9IFtcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvc291bmRzL21vYi9cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIvbWFpbl9zb3VuZC5vZ2dcIildO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goXCJcIi5jb25jYXQodGhpcy5lbnRpdHlfc291bmRfbWFpbikpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzQgLyp5aWVsZCovLCAoX2suc2VudCgpKS5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgX2UuYXBwbHkoX2QsIF9mLmNvbmNhdChbX2suc2VudCgpXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLkF1ZGlvLnJlZ2lzdGVyKFwibW9iLlwiICsgdGhpcy5lbnRpdHlJRCArIFwiLm1haW5fc291bmRcIiwgQXN5bmNTaW5rLkF1ZGlvLkNhdGVnb3J5LkFOSU1BTFMsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IFwic291bmRzL21vYi9cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIvbWFpbl9zb3VuZC5vZ2dcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpdGNoOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2x1bWU6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzogZmFsc2UgLy91c2UgZm9yIGxhcmdlIGF1ZGlvIGZpbGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfaCA9IChfZyA9IEFzeW5jU2luaykuc2V0RmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9qID0gW1wicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9zb3VuZHMvbW9iL1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi9zdGVwLm9nZ1wiKV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChcImRhdGE6YXVkaW8vb2dnO2Jhc2U2NCxUMmRuVXdBQ0FBQUFBQUFBQUFBYlBRQUFBQUFBQUxZWldkSUJIZ0YyYjNKaWFYTUFBQUFBQVlBK0FBQUFBQUFBbUlZQkFBQUFBQUNwQVU5bloxTUFBQUFBQUFBQUFBQUFHejBBQUFFQUFBQmZLYk5ZRDVELy8vLy8vLy8vLy8vLy8vLy80QU4yYjNKaWFYTTBBQUFBV0dsd2FDNVBjbWNnYkdsaVZtOXlZbWx6SUVrZ01qQXlNREEzTURRZ0tGSmxaSFZqYVc1bklFVnVkbWx5YjI1dFpXNTBLUUlBQUFBekFBQUFWRWxVVEVVOVZHaGxJRk52YjNSb2FXNW5JRk52ZFc1a2N5QnZaaUJFVlVOTElDTXpJQ2h5ZFc1dWFXNW5JR1IxWTJzcEVRQUFBRUZTVkVsVFZEMXpaVVJWUTB0MGFYWmxBUVYyYjNKaWFYTWtRa05XQVFCQUFBQVlRaEFxQmExampqcklGU0dNR2FLZ1Fzb3B4eDFDMENHakpFT0lPc1kxeHhoalI3bGtpa0xKZ2RDUVZRQUFRQUFBcEJ4WFVISkpMZWVjYzZNWVY4eHg2Q0RubkhQbElHZk1jUWtsNTV4empqbm5rbktPTWVlY2M2TVlWdzV5S1Mzbm5IT0JGRWVLY2FjWTU1eHpwQnhIaW5Hb0dPZWNjMjB4dDVKeXpqbm5uSFBtSUlkU2NxNDE1NXh6cEJobkRuSUxKZWVjYzhZZ1o4eHg2eURubkhPTU5iZlVjczQ1NTV4enpqbm5uSFBPT2VlY2M0d3g1NXh6empubm5ITnVNZWNXYzY0NTU1eHp6am5uSEhQT09lZWNjeUEwWkJVQWtBQUFvS0VvaXVJb0RoQWFzZ29BeUFBQUVFQnhGRWVSRkV1eEhNdlJKQTBJRFZrRkFBQUJBQWdBQUtCSWhxUklpcVZZam1acG5pWjZvaWlhb2lxcnNtbktzaXpMc3V1NkxoQWFzZ29BU0FBQVVGRVV4WEFVQndnTldRVUFaQUFBQ0dBb2lxTTRqdVJZa3FWWm5nZUVocXdDQUlBQUFBUUFBRkFNUjdFVVRmRWt6L0k4ei9NOHovTTh6L004ei9NOHovTTh6L004RFFnTldRVUFJQUFBQUlJb1pCZ0RRa05XQVFCQUFBQUlJUm9aUTUxU0Vsd0tGa0ljRVVNZFFzNURxYVdENENtRkpXUFNVNnhCQ0NGODd6MzMzbnZ2Z2RDUVZRQUFFQUFBWVJRNGlJSEhKQWdoaEdJVUowUnhwaUFJSVlUbEpGaktlZWdrQ04yREVFSzRuSHZMdWZmZWV5QTBaQlVBQUFnQXdDQ0VFRUlJSVlRUVFnZ3BwSlJTU0NtbW1HS0tLY2NjYzh3eHh5Q0RERExvb0pOT09zbWtrazQ2eWlTampsSnJLYlVVVTB5eDVSWmpyYlhXbkhPdlFTbGpqREhHR0dPTU1jWVlZNHd4eGhnakNBMVpCUUNBQUFBUUJobGtrRUVJSVlRVVVrZ3BwcGh5ekRISEhBTkNRMVlCQUlBQUFBSUFBQUFjUlZJa1IzSWtSNUlreVpJc1NaTTh5N004eTdNOFRkUkVUUlZWMVZWdDEvWnRYL1p0MzlWbDMvWmwyOVZsWFpabDNiVnRYZFpkWGRkMVhkZDFYZGQxWGRkMVhkZDFYZGVCMEpCVkFJQUVBSUNPNURpTzVEaU81RWlPcEVnS0VCcXlDZ0NRQVFBUUFJQ2pPSXJqU0k3a1dJNGxXWkltYVpabmVaYW5lWnFvaVI0UUdySUtBQUFFQUJBQUFBQUFBSUNpS0lxak9JNGtXWmFtYVo2bmVxSW9tcXFxaXFhcHFxcHFtcVpwbXFacG1xWnBtcVpwbXFacG1xWnBtcVpwbXFacG1xWnBtcVpwbXFacEFxRWhxd0FBQ1FBQUhjZHhIRWR4SE1keEpFZVNKQ0EwWkJVQUlBTUFJQUFBUTFFY1JYSXN4NUkwUzdNOHk5TkV6L1JjVVRaMVUxZHRJRFJrRlFBQUNBQWdBQUFBQUFBQXgzTTh4M004eVpNOHkzTTh4NU04U2RNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUUU5DUTFZQ0FHUUFBQnpGbUh0U1Nxbk9RVWd4SjJjN3hoeTBtSnNPRlVKTVdpMDJaSWdZSnEzSDBpbENrS09hU3NpUU1ZcHFLYVZUQ0NtcHBaVFFNY2FrcHRaYUtxVzBIZ2dOV1JFQVJBRUFBQWdoeGhCamlERUdJWU1RTWNZZ2RCQWl4aHlFREVJR0laUVVTc2tnaEJKQ1NaRmpERUlISVlNUVVnbWhaQkJDS1NHVkFnQUFBaHdBQUFJc2hFSkRWZ1FBY1FJQUNFTE9JY1lnUkl4QkNDV2tGRUpJS1dJTVF1YWNsTXc1S2FXVTFrSXBxVVdNUWNpY2s1STVKeVdVMGxJcHBiVlFTbXVsbE5aQ0thMjExbXBOcmNVYVNta3RsTkphS2FXMTFGcU5yYlVhSThZZ1pNNUp5WnlUVWtwcHJaVFNXdVljbFE1Q1NoMkVsRXBLTFphVVdzeWNrOUpCUjZXRGtGSkpKYmFTVW93bGxkaEtTakdXbEdKc0xjYmFZcXcxbE5KYVNTVzJrbEtNTGJZYVc0dzFSNHhCeVp5VGtqa25wWlRTV2ltcHRjdzVLUjJFbERvSEpaV1VZaXdsdFpnNUo2V0RrRklISWFXU1Vtd2xwZGhDS2EyVmxHSXNKYlhZWXN5MXRkaHFLS25Ga2xLTUphVVlXNHkxdHRocTdLUzBGbEtKTFpUU1lvdXgxdFphcmFHVUdFdEtNWmFVWW93eDF0eGlyRG1VMG1KSkpjYVNVb3N0dGx4YmpEV24xbkp0TGRiY1lzdzF4bHg3cmJYbjFGcXRxYlZhVzR3MXh4cHpyTFhtM2tGcExaUVNXeWlweGRaYXJTM0dXa01wc1pXVVlpd2x4ZGhpekxXMVdITW9KY2FTVW93bHBSaGJqTFhHR0hOT3JkWFlZc3cxdFZacnJiWG5HR3ZzcWJWYVc0dzF0OWhxcmJYMlhuUHN0UUFBZ0FFSEFJQUFFOHBBb1NFckFZQW9BQURDR0tVWWc5QWdwSlJqRUJxRWxHSU9RcVVVWTg1SnFaUml6RGtwbVdQT1FVZ2xZODQ1Q0NXRkVFcEpKYVVRUWlrbHBWUUFBRUNCQXdCQWdBMmFFb3NERkJxeUVnQUlDUUFnRUZLS01lY2dsSkpTU2hGQ1REa0dJWVJTVW1vdFFrZ3A1aHlFVUVwS3JWVk1NZVljaEJCS1NhbTFTakhHbklNUVFpa3B0Wlk1NXh5RUVFcEpLYVhXTXVhY2d4QkNLU21sMUZvSElZUVFTaWtscGRaYTZ5Q0VFRUlwcGFUVVdtc2hoQkJLS2FXa2xGcUxNWVFRUWltbHBKSlNhekdXVWtwSkthV1VVbXN0eGxKS0tTbWxsRkpMcmNXWVVrb3BwZFphYXkzR0dGTktLYVhVV211eHhSaGphcTIxMWxxTE1jWVlhMDJ0dGRaYWl6SEdHR090QlFBQUhEZ0FBQVFZUVNjWlZSWmhvd2tYSG9CQ1ExWUVBRkVBQUlBeGlESEVHSEtPUWNpZ1JNNHhDWm1FeURsSHBaT1NTUW1obGRZeUthR1ZrbHJrbkpQU1VjcW9sSlpDYVptazBscG9vUUFBc0FNSEFMQURDNkhRa0pVQVFCNEFBSUdRVW93NTV4eFNpakhHbkhNT0thVVlZODQ1cHhoanpEbm5uRk9NTWVhY2M4NHh4cHh6empubkdHUE9PZWVjYzg0NTU1eHpEa0xubkhQT09RZWhjODQ1NXlDRTBEbm5uSE1RUWlnQUFLakFBUUFnd0VhUnpRbEdnZ29OV1FrQXBBSUFBTWd3NXB4elVsSnFsR0lNUWdpbHBOUW94UmlFRUVwSktYTU9RZ2lscE5SYXhoaDBFa3BKcWJVT1FpaWxwTlJhakIyRUVrcEpxYlVZT3dpbHBKUlNhekYyRUVwSnFhWFdZaXlscE5SYWF6SFdXa3BKcWJYV1lxdzFwZFJhakRIV1dtdEtxYlVZWTZ5MTFnSUF3Qk1jQUlBS2JGZ2Q0YVJvTExEUWtKVUFRQVlBd0JBQXdBRUFBQU1PQUFBQkpwU0JRa05XQWdDcEFBQ0FNWXc1NXh5RVVocWxuSU1RUWltcE5FbzVCeUdFVWxMS25KTlFTaWtwdFpZNUo2V1VVbEpxcllOUVNrb3B0UlpqQjZHVWxGSnFMY1lPUWlvcHRSWmpqUjJFVWxKcUxjWVlReWtwdFJaampMV0dVbEpxTGNZWWF5MHB0UlpqamJYbVdsSnFMY1lhYTgyMUFBQ0VCZ2NBc0FNYlZrYzRLUm9MTERSa0pRQ1FCd0JBSU1RWVk0dzVoNVJpakRIbm5FTktNY2FZYzg0eHhoaHp6am5uR0dPTU9lZWNjNHd4NTV4enpqbkdtSFBPT2VjY2M4NDU1NXh6ampubm5IUE9PZWVjYzg0NTU1eHp6am5ubkhQT0NRQUFLbkFBQUFpd1VXUnpncEdnUWtOV0FnRGhBQUNBTVl3NXh4aDBFbEpxbUlJT1FnZ2xwTkJDbzVoekVFSW9wYVRVTXVpa3BGUktTcTNGbGprbnBhUlNVa3F0eFE1Q1NpbWwxRnFNTVhZUVVrb3BwZFppakxXRFVFcEtMY1ZZWTYwZGhGSlNhcTIxR0dzTnBhVFVXbXd4MXBwektDV2wxbHFNc2RhYVMwcXR4VmhqcmJubVhGSnFMYlpZYTYwMTU5UmFqREhXbW12T3ZhZldZb3l4MXBwejdyMEFBSk1IQndDb0JCdG5XRWs2S3h3TkxqUmtKUUNRR3dDQUlNU1ljODVCQ0NHRUVFSUlJVktLTWVjZ2hCQkNDQ0dVVWtxa0ZHUE9RUWdoaEJCQ0NDR0VqREhub0lNUVFnaWxsRkpLS1JsanprRUlJWVFRU2lpbGhCSTY1NkNERUVJSnBaUlNTaW1sZE00NUNDR0VFRW9wcFpSU1N1a2doQkJDQ0tXVVVrb3BwWlRTUVFnaGhGQktLYVdVVWtvcEpZUVFRZ2lsbEZKS0thV1VVa29JSVlRUVNpbWxsRkpLS2FXVUVFSUlwWlJTU2ltbGxGSktLU0dFRUVvcHBaUlNTaW1sbEZKQ0NLV1VVa29wcFpSU1NpbWxoQkJLS2FXVVVrb3BwWlJTU2dtaGxGSktLYVdVVWtvcHBaUVNTaW1sbEZKS0thV1VVa29wSlpSU1NpbWxsRkpLS2FXVVVrb29wWlJTU2ltbGxGSktLYVdVVUVvcHBaUlNTaW1sbEZKS0thR1VVa29wcFpSU1NpbWxsRklLQUFBNmNBQUFDRENpMGtMc05PUEtJM0JFSWNNRVZHaklTZ0FnSEFBQVFBUTZDQ0dFRUVJSUVYTVFRZ2doaEJCQ2lKaURFRUlJSVlRUVFnZ2hoQkJDQ0tXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVVVQUhXWjRRQVlQV0hqREN0Slo0V2p3WVdHckFRQTBnSUFBR01ZWTR3cHlLU3pGbU90RFdNUVFnZWRoQlJxcUNXbWhqRUlJWFJRU2tvdHRsaHpCcUdrVWtwSkxjWllnODA5ZzFCS0thV2tGbU90T1JmalFVZ2xwZFJpcTdYbkhJenVJSlNTVWtveDFwcHo3cjFvMEVsSnFiVmFjKzQ5QjE4OENLV2sxbHFNUFFjZmpEQ2lsSlppckxIV0hId1JSaGhSU2tzdHhwcDd6YjBZWTRSS0tjWmFlODY1NTF5TUVUNmxGbU91dWZjZWZDN0MrT0ppekRuMzRvTVBQZ2hoakpBeDV0aHo4TDBYWTR3UHdzaGNjeTdDR09PTE1NTDRJR3l0dVFkZmpCRkdHR044N3pYNG9Ic3h3Z2dqakRIQ0NOMXowVVg0WW93eFJoaGZoQUVBdVJFT0FJZ0xSaEpTWnhsV0duSGpDUmdpa0VKRFZnRUFNUUFBQkRIR0lLU1FVa29weFJoampESEdHR09NTWNZWVk0d3h4cHhqempubm5BQUF3QVFIQUlBQUs5aVZXVnExVWR6VVNWNzBRZUFUT21Jek11UlNLbVp5SXVpUkdtcXhFdXpRQ203d0FyRFFrSlVBQUJrQUFPU2tsSlJhTFJwQ3lrRnBOWWpJSU9Va3hTUWlZNUNDMG9LbmtER0lTY29kWXdvaEJhbDIwREdGRktNYVVncVpVZ3BxcWptR2pqR29NU2ZoVWdtbEJnQUFRQkFBSUNBa0FNQUFRY0VNQURBNFFCZzVFT2dJSUhCb0F3QU1STWhNWUZBSURRNHlBZUFCSWtJcUFFaE1VSlF1ZEVFSUVhU0xJSXNITHB5NDhjUU5KM1JvZ3dBQUFBQUFnQUNBRHdDQWhBS0lpR1ptcnNMaUFpTkRZNE9qdytNREpFUmtKQUFBQUFBQVFBRGdBd0FnSVFFaW9wbVpxN0M0d01qUTJPRG84UGdBQ1JFWkNRQUFBQUFBQUFBQUFBSUNBZ0FBQUFBQUFRQUFBQUlDVDJkblV3QUVoZ3dBQUFBQUFBQWJQUUFBQWdBQUFEZWoxYjhMdWJ1Nyt2THRmcTNDQVFIVXBqNG96Yno3VXZmMHJsQkZNa1QzcnM5alo3Qi9IYTYwa2JlVDVkeC9qS0hEclB0aFhkMTB5UDJpNTkrNzdZZDc3WTgvS1pYS1UvcGNoZkJ0TFZJdGgwaGVxMlVQeTJGWnYxTTczN3lzd25yTjViQkVuOSs2dWJ2SmE3U1lJWU11SkxsTmNhYW9jb0wvZCt3aGZPc3F5NTFmcjlRTmovTDA0SlVTN3MrZXkyQWxsTjR6MTFjemNkcGE4cDNPSDF2UHNadjgzNXlZTHZ5ZUxzVVIyK3J0KzNhMThyTmJrV09PcC9lUmQ1ZGp4WlNTN3E1VFdpN2pMZXl5alJHTGV3NkhqODNYcnlIWGRXLzAwdHZvSlJHaWg2ZVA3QVcvUnhlZ0xKekw4bVVlMi9UUi91bkRpM2RtdWRwMjB2blQ3aDhjbW5RM0VxcTEybFRybnQ5MnRROXoyZkhpL2N2RHZQWjBodEsxcjNzdisvRVBuWHFVWUNrUmRGU3lPSHVzUEsyMXRXREFQYVZQNWE0dDlCTS8xODZMc25vdmtmN3pJWmRQWHo0ZlBscHU3RExsbFhtVjJZZTJHeDdYbGRQei9jZjljZUY1bWJuYWx0dW43WXB3L3dzblZucEM2RFltSXBzbmJPL2JObnNlYmhkN0FRRHNLSlA3N2ptY3VQbFR2WVRnc24rMFJzcG5wME9vTm4wK21ObVU5M2ZmTUhZN2FrTDAzTHYzeDU1T3ZqaTJ1YXpIYmxaaGZWbEk2cytzTzRkR2VWNXJhdW13SEk3dUx4OHFZTmRlZDg3cHlIcmZkdlRuZm5YNGRUK0lEOStuV0QrekFwbTZIL3ZLa2J1ZUxialFVdndpaEtxSFdtcHBlZjlmL1Y0OCsxbkw2L1lYZk9aVy93dmRxS09tQzMrZHI2Nll1MVZzdmlRT3Z1T2owOWQ3ejYzVGlYSzYrT1JUNHE0VVY4N0wzWGlpY2FsYVBYS01ieXdWdTQwQTJrYUxDQUFBSEUvdFkrc3ZqejEyK2xkalJTUjJQOWRiVnRiUXdzU0F4Wmx5WDZ1bHpTNEk0YjdMb3FDNmREWGxhWTN3MzdHcDZYbjhTZVhINWV4NVV1aVUxVzYzbFkzYldiWGNZeWY5enF2S2VXejc4L1RmVVp2ODFtdmw2NitjYWg3b2lQZTFuZmtsL2JiQ09meTMyMC90SkVrbys5cGh4WGJwVzZuNy9tSm50c3ZOSS80dnZaazhqQVRhZVlwWE9ENUJ2UXhicld4em05RDZSYVhFaUJFZXhzbXR1V3E1UVF4bDA1MlN5OU93T0YyRkoxejJXNkhaVUo4S1phSXZTeExUcmpydGxibEZxWFRqL3VzWDZJd1hlZFNSVGIyTzI3bWVDdkY0KzdIZ2I4ZCszMWZCcEU3VG5qcmFmTXRTYmY3Nmw4dmdxd0VBQUo3bXlnd29EUTFTTjlka3h3LzZzZVBaUzFXVnJocHR6VC9ORnUxcTNxek1YMU96MDZ0c1ZncFZ6LzNWbi92SnowdytWSHZXM2ErQ1p2Um54MHpBMkVOQ3I5bnpzbDkrcjczNXd2UHJBMzhwT0JxT0JPMTU5SVNlYll6bTFWSWw3dGRkY3NVMGNuUWlrTVRWNTR1aENIaSs5aWRQWlIxaGZMVnRFTkx3Y25NcmlQdEZXTnBtSWNwNjkvZUVaOTVNY2ZQaXhybFozWUE5VjVSY01kZFRqY3lEY0lOVi96NWpQVmpiTG9lUEN1TkovbW9GbTF6WXJhcjNzVzNzbnp1MHdYK0tLcFJQV09TRGJkU0VaVjdIRW5mZWhuRXh5bU45N1N0bHVTNC85WDN6ZWI1Z3J6SzVXNFNWQlRhczF5Z0dCd0FBTmhhTEJNQUJHQjB4QlYyT29tL3ZqNzN3c1p0YWxLQW91MVF2NEttc2l2T2ZOYU1kRkczZlZlWEFJMTBVMW01bmhPYTdXK2VuUzJsZXFMdE5zcUkwTExiVVo1ZWxxVncwdGVFS0JiMnR1V0tUTEJmYlRWNmZybnpoMGZ6NjVmZTliejQvZVpBYlBHaG1Lc2QvMzhheTgvMVpFZForV1BjblZ1dlNGUTBpamFJaTExOU54cEpPVXhuMjEzeWpOSWFFZFRHZGhrTExoMzI2TVB2Ri92dWFJRjNqZVFQZUptVmUzamN3ZXR1dys3bGQ3M0JaM1Iwdi9kTFRwN3c2UjFubWJiajRRODB5OCtUUG84YWRiV3l1OGtBaW83aTViSDA1N1o4cHh1bXBVdGdXKy90TzUvQkcrS0RETEFBQXpDaFRMM1IwNmZCMHkwK0pKb2hxcCtTaXAyRDg1akdKSmI2SFhnZmZnNjlqWEZORWx0ZFRQbHpFMWJvL2J6ZC9yK2Vac0hubHRIeDFzY1RabjhpYlRVbEY3c3QrZVNwdjN4dThHdTlNY29Pb2lOMXU3c2ZQemJFdVRvZmpuZjZ3VmxaOWF0WE9lYjdVZjlMY3ptMWVuOS95eUtKQzdHOCtkVGx6bkFRQTNDUmh3UngyaE0xbm5WVTUxWVorSHVOcGk1eU8zYm1HelJvemVXcm4vWTV5Vmc5YkZBdjJybmg5Y055clRrSTJENjVWek9OMXlsaVRhOVZ6L2RLNTJla0o2MmFZVWlRdzlwWGN6Z3BCeTd6YW5JMGxDcGJHYS9iNnIrN1pzdlhzMEw0ZS84OEt4dVcwU2kxemxWMC9YVXRIOVc5MU0vS01xemVjbnBQdDBlSjlJWEgrMHJSMS81ZjdmRjJMZXZzcG8vbmV2NGVEdGUydVRuTGFGdG1ublpSUWN6bExkTnE1bGxRUEJRQ2tpdWptbytucmJvOCtGVTg4Mnk5OCtoQTlmVmhYSDkrNzBHN25jZS8vK2NMeC9jdlY3Ny8zd3BQdlg2NCt2cmNMcTkrL3ZIQjhDKzMrNVFYSGMrTFpmdUhUaCtpcEQyN2lIdjJ5SDN0NnVmcjlkeGNPRWdUT1BHSFBrMG1Ndko3U1g3ZlgrdFhQK3hOVHo3dFZ4ejQwZTlwakRWKzgzSG1lSytQTnRTMnZTcCtPbXoyVnhzRDcrRno0ZXcrNlM4cG8rOVpaejZqN2VYL2YrekpidnVRNHVwOTYxRmNXRmMvZFpkanpycSszblYrN3Q3N2Q4M3JSdGVOZC9lWGF1RzBrQUFvT1wiKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFs0IC8qeWllbGQqLywgKF9rLnNlbnQoKSkuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9oLmFwcGx5KF9nLCBfai5jb25jYXQoW19rLnNlbnQoKV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5BdWRpby5yZWdpc3RlcihcIm1vYi5cIiArIHRoaXMuZW50aXR5SUQgKyBcIi5zdGVwXCIsIEFzeW5jU2luay5BdWRpby5DYXRlZ29yeS5BTklNQUxTLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBcInNvdW5kcy9tb2IvXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiL3N0ZXAub2dnXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXRjaDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9sdW1lOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IGZhbHNlIC8vdXNlIGZvciBsYXJnZSBhdWRpbyBmaWxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLm1jLnJlbmRlck1hbmFnZXIuZW50aXR5UmVuZGVyTWFwLnB1dChNb2RBUEkudXRpbC5hc0NsYXNzKGRhdGFbXCJFbnRpdHlcIi5jb25jYXQodGhpcy5lbnRpdHlJRCldKSwgbmV3IGRhdGFbXCJSZW5kZXJcIi5jb25jYXQodGhpcy5lbnRpdHlJRCldKE1vZEFQSS5tYy5yZW5kZXJNYW5hZ2VyLmdldFJlZigpLCBuZXcgZGF0YVtcIk1vZGVsXCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXSgpLCAwLjMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5wcm9taXNpZnkoTW9kQVBJLm1jLnJlbmRlckVuZ2luZS5iaW5kVGV4dHVyZSkoZGF0YVtcIlwiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIlRleHR1cmVzXCIpXSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2FkZWQgT0VudGl0eSB0ZXh0dXJlIGludG8gY2FjaGUuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pOyB9KTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHZhciBrZXkgPSBcIk9FbnRpdHkuXCIuY29uY2F0KHRoaXMuZW50aXR5SUQpO1xuICAgICAgICBnbG9iYWxUaGlzW2tleV0gPSBkYXRhO1xuICAgIH07XG4gICAgT0VudGl0eS5wcm90b3R5cGUuY3JlYXRlU3Bhd25lZ2cgPSBmdW5jdGlvbiAodGV4dHVyZSkge1xuICAgICAgICBpZiAoIXRleHR1cmUpIHtcbiAgICAgICAgICAgIHRleHR1cmUgPSBcInRleHR1cmVzL2VudGl0eS9cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIucG5nXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcIlNwYXduIGVnZ3MgYXJlIGJ1aWx0IGluIVwiKTtcbiAgICAgICAgdmFyIHNwYXduRWdnID0gbmV3IE9JdGVtKFwiU3Bhd24gXCIuY29uY2F0KHRoaXMuZW50aXR5TmFtZSksIFwic3Bhd25lZ2dfXCIuY29uY2F0KHRoaXMuZW50aXR5SUQpLCA2NCwgdGV4dHVyZSwgZnVuY3Rpb24gKCkgeyB9LCBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGJsb2NrcG9zKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkJGJsb2NrcG9zKTtcbiAgICAgICAgICAgIHZhciBzcGF3bl94ID0gJCRibG9ja3Bvcy4keDtcbiAgICAgICAgICAgIHZhciBzcGF3bl95ID0gJCRibG9ja3Bvcy4keSArIDE7XG4gICAgICAgICAgICB2YXIgc3Bhd25feiA9ICQkYmxvY2twb3MuJHo7XG4gICAgICAgICAgICBPdmVuTURLX19leGVjdXRlQ29tbWFuZEFzKCQkcGxheWVyLCBcIi9zdW1tb24gRXhhbXBsZU9FbnRpdHkgXCIuY29uY2F0KHNwYXduX3gsIFwiIFwiKS5jb25jYXQoc3Bhd25feSwgXCIgXCIpLmNvbmNhdChzcGF3bl96KSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzcGF3bkVnZy5yZWdpc3Rlckl0ZW0oKTtcbiAgICAgICAgcmV0dXJuIHNwYXduRWdnO1xuICAgIH07XG4gICAgcmV0dXJuIE9FbnRpdHk7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgT0VudGl0eTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcbiAgICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG4vKlxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4gIE9JdGVtLnRzXG4gICAgXG4gIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE92ZW5NREsuXG5cbiAgICBPdmVuTURLIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXJcbiAgICB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWVcbiAgICBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pXG4gICAgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICBPdmVuTURLIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWVxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1NcbiAgICBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYWxvbmdcbiAgICB3aXRoIE92ZW4gTURLLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbnZhciBPSXRlbSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPSXRlbShpdGVtTmFtZSwgaXRlbUlELCBpdGVtU3RhY2ssIHRleHR1cmUsIG9uUmlnaHRDbGljaywgb25JdGVtVXNlKSB7XG4gICAgICAgIHRoaXMuaXRlbU5hbWUgPSBpdGVtTmFtZTtcbiAgICAgICAgdGhpcy5pdGVtSUQgPSBpdGVtSUQ7XG4gICAgICAgIHRoaXMuaXRlbVN0YWNrID0gaXRlbVN0YWNrO1xuICAgICAgICB0aGlzLml0ZW1UZXh0dXJlID0gdGV4dHVyZTtcbiAgICAgICAgdGhpcy5vblJpZ2h0Q2xpY2sgPSBvblJpZ2h0Q2xpY2s7XG4gICAgICAgIC8vIEFzc2lnbiBvcHRpb25hbCBvbkl0ZW1Vc2UgaWYgcHJvdmlkZWRcbiAgICAgICAgaWYgKG9uSXRlbVVzZSlcbiAgICAgICAgICAgIHRoaXMub25JdGVtVXNlID0gb25JdGVtVXNlO1xuICAgIH1cbiAgICBPSXRlbS5wcm90b3R5cGUucmVnaXN0ZXJDbGllbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciAkJGl0ZW1HZXRBdHRyaWJ1dGVzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIikubWV0aG9kcy5nZXRJdGVtQXR0cmlidXRlTW9kaWZpZXJzLm1ldGhvZDtcbiAgICAgICAgdmFyIGNyZWF0aXZlTWlzY1RhYjtcbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjcmVhdGl2ZU1pc2NUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMuTUlTQztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNyZWF0aXZlTWlzY1RhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy50YWJNaXNjO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICAgICAgdmFyIGl0ZW1TdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKGl0ZW1DbGFzcywgZnVuY3Rpb24gKGZuKSB7IHJldHVybiBmbi5sZW5ndGggPT09IDE7IH0pO1xuICAgICAgICB2YXIgaXRlbVN0YWNrID0gdGhpcy5pdGVtU3RhY2s7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gbm1pX092ZW5JdGVtKCkge1xuICAgICAgICAgICAgaXRlbVN1cGVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kc2V0Q3JlYXRpdmVUYWIoY3JlYXRpdmVNaXNjVGFiKTtcbiAgICAgICAgICAgIHRoaXMuJG1heFN0YWNrU2l6ZSA9IChpdGVtU3RhY2spO1xuICAgICAgICB9XG4gICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKGl0ZW1DbGFzcywgbm1pX092ZW5JdGVtKTtcbiAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtUmlnaHRDbGljayA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKVxuICAgICAgICAgICAgICAgICAgICAoJCRwbGF5ZXIpLiRzZXRJdGVtSW5Vc2UoJCRpdGVtc3RhY2ssIDMyKTtcbiAgICAgICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyO1xuICAgICAgICAgICAgICAgIHNlbGYub25SaWdodENsaWNrKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGllbnQgaXRlbXN0YWNrOlwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIDtcbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICB2YXIgJCRSZXN1bHRFbnVtID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnVtQWN0aW9uUmVzdWx0XCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgICAgIHZhciAkJEFjdGlvblJlc3VsdCA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiQWN0aW9uUmVzdWx0XCIpLmNvbnN0cnVjdG9yc1swXTtcbiAgICAgICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVJpZ2h0Q2xpY2sgPSBmdW5jdGlvbiAoJCR3b3JsZCwgJCRwbGF5ZXIsICRoYW5kRW51bSwgJHVudXNlZCkge1xuICAgICAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjayA9ICgkJHBsYXllcikuJGdldEhlbGRJdGVtKCRoYW5kRW51bSk7XG4gICAgICAgICAgICAgICAgKCQkcGxheWVyKS4kc2V0QWN0aXZlSGFuZCgkaGFuZEVudW0pO1xuICAgICAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXI7XG4gICAgICAgICAgICAgICAgc2VsZi5vblJpZ2h0Q2xpY2soJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWVudCBpdGVtc3RhY2s6XCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCQkQWN0aW9uUmVzdWx0KCQkUmVzdWx0RW51bS5TVUNDRVNTLCAkJGl0ZW1zdGFjaykpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1Vc2UwID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHBsYXllciwgJCR3b3JsZCwgJCRibG9ja3Bvcykge1xuICAgICAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIsICQkYmxvY2twb3M7XG4gICAgICAgICAgICAgICAgc2VsZi5vbkl0ZW1Vc2UoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGJsb2NrcG9zKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWVudCBpdGVtc3RhY2s6XCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgO1xuICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIHZhciAkJFJlc3VsdEVudW0gPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkVudW1BY3Rpb25SZXN1bHRcIikuc3RhdGljVmFyaWFibGVzO1xuICAgICAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtVXNlID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHBsYXllciwgJCR3b3JsZCwgJCRibG9ja3Bvcykge1xuICAgICAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCRwbGF5ZXIsICQkd29ybGQsICQkYmxvY2twb3M7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub25JdGVtVXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub25JdGVtVXNlKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRibG9ja3Bvcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAkJFJlc3VsdEVudW0uUEFTUztcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25VcGRhdGUgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGhvdGJhcl9zbG90LCAkJGlzX2hlbGQpIHtcbiAgICAgICAgICAgICQkaXNfaGVsZCA9ICgkJGlzX2hlbGQpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuICgkJGl0ZW1zdGFjayk7XG4gICAgICAgIH07XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVVzZUZpbmlzaCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoJCRpdGVtc3RhY2spO1xuICAgICAgICB9O1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRnZXRNYXhJdGVtVXNlRHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gMzI7XG4gICAgICAgIH07XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldEl0ZW1BdHRyaWJ1dGVNb2RpZmllcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJCRhdHRyaWJ1dGVtYXAgPSAkJGl0ZW1HZXRBdHRyaWJ1dGVzLmFwcGx5KHRoaXMsIFtdKTtcbiAgICAgICAgICAgIHJldHVybiAkJGF0dHJpYnV0ZW1hcDtcbiAgICAgICAgfTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kZ2V0U3RyVnNCbG9jayA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCRibG9jaykge1xuICAgICAgICAgICAgcmV0dXJuIDEuMDtcbiAgICAgICAgfTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25DcmVhdGVkID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkJsb2NrRGVzdHJveWVkID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJGJsb2NrLCAkJGJsb2NrcG9zLCAkJGVudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBpbnRlcm5hbF9yZWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaXRlbUluc3RhbmNlID0gbmV3IG5taV9PdmVuSXRlbSgpLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKF90aGlzLml0ZW1JRCkpO1xuICAgICAgICAgICAgaXRlbUNsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJJdGVtLm1ldGhvZChNb2RBUEkua2V5Z2VuLml0ZW0oX3RoaXMuaXRlbUlEKSwgTW9kQVBJLnV0aWwuc3RyKF90aGlzLml0ZW1JRCksIGl0ZW1JbnN0YW5jZSk7XG4gICAgICAgICAgICBNb2RBUEkuaXRlbXNbXCJcIi5jb25jYXQoc2VsZi5pdGVtSUQpXSA9IGl0ZW1JbnN0YW5jZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW1JbnN0YW5jZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyZWQgT3Zlbk1ESyBpdGVtICggY2xpZW50IHNpZGUgKVwiKTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtSW5zdGFuY2U7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChNb2RBUEkuaXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbF9yZWcoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsX3JlZyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9JdGVtLnByb3RvdHlwZS5yZWdpc3Rlckl0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmLCBjdXN0b21faXRlbTtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgY3VzdG9tX2l0ZW0gPSBuZXcgT0l0ZW0odGhpcy5pdGVtTmFtZSwgdGhpcy5pdGVtSUQsIHRoaXMuaXRlbVN0YWNrLCB0aGlzLml0ZW1UZXh0dXJlLCB0aGlzLm9uUmlnaHRDbGljaywgdGhpcy5vbkl0ZW1Vc2UpLnJlZ2lzdGVyQ2xpZW50KCk7XG4gICAgICAgICAgICAgICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckl0ZW0oXFxcIlwiLmNvbmNhdCh0aGlzLml0ZW1JRCwgXCJcXFwiLCBcIikuY29uY2F0KHRoaXMuaXRlbVN0YWNrLCBcIiwgXCIpLmNvbmNhdCh0aGlzLm9uUmlnaHRDbGljaywgXCIsIFwiKS5jb25jYXQodGhpcy5vbkl0ZW1Vc2UsIFwiKTtcIikpO1xuICAgICAgICAgICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBidWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3Npbms6cmVnaXN0ZXJpdGVtc1wiLCBmdW5jdGlvbiAocmVuZGVySXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckl0ZW0ucmVnaXN0ZXJJdGVtKGN1c3RvbV9pdGVtLCBNb2RBUEkudXRpbC5zdHIoXCJcIi5jb25jYXQoc2VsZi5pdGVtSUQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5MMTBOLnNldChcIml0ZW0uXCIuY29uY2F0KHNlbGYuaXRlbUlELCBcIi5uYW1lXCIpLCBcIlwiLmNvbmNhdChzZWxmLml0ZW1OYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvbW9kZWxzL2l0ZW0vXCIuY29uY2F0KHNlbGYuaXRlbUlELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJlbnRcIjogXCJpdGVtL2dlbmVyYXRlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dHVyZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxheWVyMFwiOiBcIml0ZW1zL1wiLmNvbmNhdCh0aGlzLml0ZW1JRClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChzZWxmLml0ZW1UZXh0dXJlKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9pdGVtcy9cIiArIHNlbGYuaXRlbUlEICsgXCIucG5nXCIsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBidWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3Npbms6cmVnaXN0ZXJpdGVtc1wiLCBmdW5jdGlvbiAocmVuZGVySXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckl0ZW0ucmVnaXN0ZXJJdGVtKGN1c3RvbV9pdGVtLCBNb2RBUEkudXRpbC5zdHIoc2VsZi5pdGVtSUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLkwxME4uc2V0KFwiaXRlbS5cIi5jb25jYXQoc2VsZi5pdGVtSUQsIFwiLm5hbWVcIiksIHNlbGYuaXRlbU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9pdGVtL1wiLmNvbmNhdChzZWxmLml0ZW1JRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyZW50XCI6IFwiYnVpbHRpbi9nZW5lcmF0ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHR1cmVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXllcjBcIjogXCJpdGVtcy9cIi5jb25jYXQoc2VsZi5pdGVtSUQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpc3BsYXlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRoaXJkcGVyc29uX3JpZ2h0aGFuZFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6IFswLCAtOTAsIDU1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRpb25cIjogWzAsIDQsIDAuNV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNjYWxlXCI6IFswLjg1LCAwLjg1LCAwLjg1XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRoaXJkcGVyc29uX2xlZnRoYW5kXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjogWzAsIDkwLCAtNTVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGlvblwiOiBbMCwgNCwgMC41XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2NhbGVcIjogWzAuODUsIDAuODUsIDAuODVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmlyc3RwZXJzb25fcmlnaHRoYW5kXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjogWzAsIC05MCwgMjVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGlvblwiOiBbMS4xMywgMy4yLCAxLjEzXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2NhbGVcIjogWzAuNjgsIDAuNjgsIDAuNjhdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmlyc3RwZXJzb25fbGVmdGhhbmRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOiBbMCwgOTAsIC0yNV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0aW9uXCI6IFsxLjEzLCAzLjIsIDEuMTNdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzY2FsZVwiOiBbMC42OCwgMC42OCwgMC42OF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHNlbGYuaXRlbVRleHR1cmUpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L3RleHR1cmVzL2l0ZW1zL1wiLmNvbmNhdChzZWxmLml0ZW1JRCwgXCIucG5nXCIpLCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBPSXRlbTtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBPSXRlbTtcbiIsIi8qXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICAgIE92ZW4udHNcbiAgICBcbiAgICBDb3B5cmlnaHQgMjAyNSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICAgIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE92ZW5NREsuXG5cbiAgICBPdmVuTURLIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXJcbiAgICB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWVcbiAgICBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pXG4gICAgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICBPdmVuTURLIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWVxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1NcbiAgICBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYWxvbmdcbiAgICB3aXRoIE92ZW4gTURLLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbnZhciBPdmVuID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE92ZW4oKSB7XG4gICAgfVxuICAgIE92ZW4ucmVnaXN0ZXJNb2QgPSBmdW5jdGlvbiAobW9kQ2xhc3MpIHtcbiAgICAgICAgTW9kQVBJLm1ldGEudGl0bGUobW9kQ2xhc3MudGl0bGUpO1xuICAgICAgICBNb2RBUEkubWV0YS52ZXJzaW9uKG1vZENsYXNzLnZlcnNpb24pO1xuICAgICAgICBNb2RBUEkubWV0YS5kZXNjcmlwdGlvbihtb2RDbGFzcy5kZXNjcmlwdGlvbik7XG4gICAgICAgIE1vZEFQSS5tZXRhLmNyZWRpdHMobW9kQ2xhc3MuY3JlZGl0cyk7XG4gICAgICAgIE1vZEFQSS5tZXRhLmljb24obW9kQ2xhc3MuaWNvbik7XG4gICAgICAgIE1vZEFQSS5tZXRhLmNvbmZpZyhtb2RDbGFzcy5jb25maWcoKSk7XG4gICAgICAgIG1vZENsYXNzLmluaXQoKTtcbiAgICAgICAgZ2xvYmFsVGhpcy5EZWJ1Z19tb2RlID0gbW9kQ2xhc3MuRGVidWdfbW9kZTtcbiAgICAgICAgLyppZiAobW9kQ2xhc3Mub25seV8xXzEyXzIgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBJbGwgZG8gc29tZSBtb3JlIHN0dWZmIGxhdGVyXG4gICAgICAgIH0qL1xuICAgICAgICB0aGlzLm1vZHMucHVzaChtb2RDbGFzcyk7XG4gICAgfTtcbiAgICBPdmVuLm1vZHMgPSBbXTtcbiAgICBPdmVuLnV0aWwgPSB7XG4gICAgICAgIG9nZ3RvQmFzZTY0c3RyaW5nOiBmdW5jdGlvbiAob2dnKSB7XG4gICAgICAgICAgICB2YXIgYmFzZTY0ID0gYnRvYShuZXcgVWludDhBcnJheShvZ2cuc3BsaXQoXCIsXCIpLm1hcChmdW5jdGlvbiAoeCkgeyByZXR1cm4gcGFyc2VJbnQoeCwgMTApOyB9KSkucmVkdWNlKGZ1bmN0aW9uIChkYXRhLCBieXRlKSB7IHJldHVybiBkYXRhICsgU3RyaW5nLmZyb21DaGFyQ29kZShieXRlKTsgfSwgXCJcIikpO1xuICAgICAgICAgICAgcmV0dXJuIGJhc2U2NDtcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiBPdmVuO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE92ZW47XG4iLCIvKlxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4gIE92ZW4gTW9kIERldmVsb3BtZW50IEtpdCAoT3Zlbk1ESykgUnVudGltZVxuICBEZXYga2l0IHVzZWQgZm9yIHNpbXBsaWZ5aW5nIEVhZ2xlckZvcmdlIG1vZCBkZXZlbG9wbWVudC5cbiAgICBcbiAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xudmFyIE92ZW5PcmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3Zlbk9yZShibG9ja0lELCB2ZWluU2l6ZSwgdmVpbkNvdW50LCBtaW5HZW5lcmF0aW9uSGVpZ2h0LCBtYXhHZW5lcmF0aW9uSGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuYmxvY2tJRCA9IGJsb2NrSUQ7XG4gICAgICAgIHRoaXMudmVpblNpemUgPSB2ZWluU2l6ZTtcbiAgICAgICAgdGhpcy52ZWluQ291bnQgPSB2ZWluQ291bnQ7XG4gICAgICAgIHRoaXMubWluR2VuZXJhdGlvbkhlaWdodCA9IG1pbkdlbmVyYXRpb25IZWlnaHQ7XG4gICAgICAgIHRoaXMubWF4R2VuZXJhdGlvbkhlaWdodCA9IG1heEdlbmVyYXRpb25IZWlnaHQ7XG4gICAgfVxuICAgIE92ZW5PcmUucHJvdG90eXBlLnJlZ2lzdGVyT3Zlbk9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3Rlck92ZW5PcmVTZXJ2ZXIoXFxcIlwiLmNvbmNhdCh0aGlzLmJsb2NrSUQsIFwiXFxcIixcIikuY29uY2F0KHRoaXMudmVpblNpemUsIFwiLFwiKS5jb25jYXQodGhpcy52ZWluQ291bnQsIFwiLFwiKS5jb25jYXQodGhpcy5taW5HZW5lcmF0aW9uSGVpZ2h0LCBcIixcIikuY29uY2F0KHRoaXMubWF4R2VuZXJhdGlvbkhlaWdodCwgXCIpO1wiKSk7XG4gICAgfTtcbiAgICByZXR1cm4gT3Zlbk9yZTtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBPdmVuT3JlO1xuIiwiLypcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4gICAgY29tbWFuZHMudHNcbiAgICBcbiAgICBDb3B5cmlnaHQgMjAyNSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICAgIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE92ZW5NREsuXG5cbiAgICBPdmVuTURLIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXJcbiAgICB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWVcbiAgICBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pXG4gICAgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICBPdmVuTURLIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWVxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1NcbiAgICBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYWxvbmdcbiAgICB3aXRoIE92ZW4gTURLLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbmV4cG9ydCBmdW5jdGlvbiBzaW1wbGVjb21tYW5kKHByZWZpeCwgbmFtZSwgb25FeGVjdXRlKSB7XG4gICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJzZW5kY2hhdG1lc3NhZ2VcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUubWVzc2FnZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoXCJcIi5jb25jYXQocHJlZml4KS5jb25jYXQobmFtZSkpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgIG9uRXhlY3V0ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qXG4gIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cbiAgT3ZlbiBNb2QgRGV2ZWxvcG1lbnQgS2l0IChPdmVuTURLKSBSdW50aW1lXG4gIERldiBraXQgdXNlZCBmb3Igc2ltcGxpZnlpbmcgRWFnbGVyRm9yZ2UgbW9kIGRldmVsb3BtZW50LlxuICAgIFxuICBDb3B5cmlnaHQgMjAyNSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5pbXBvcnQgaWNvbiBmcm9tIFwiQVNTRVRTL2RlZmF1bHRJY29uLnBuZ1wiO1xuTW9kQVBJLm1ldGEudGl0bGUoXCJPdmVuTURLIFJ1bnRpbWVcIik7XG5Nb2RBUEkubWV0YS52ZXJzaW9uKFwiQWxwaGEgdjAuM1wiKTtcbk1vZEFQSS5tZXRhLmRlc2NyaXB0aW9uKFwiVW5vZmZpY2lhbCBkZXYga2l0IHVzZWQgZm9yIHNpbXBsaWZ5aW5nIEVhZ2xlckZvcmdlIG1vZCBkZXZlbG9wbWVudC5cIik7XG5Nb2RBUEkubWV0YS5jcmVkaXRzKFwiQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcIik7XG5Nb2RBUEkubWV0YS5pY29uKGljb24pO1xuaW1wb3J0IHsgcmVnaXN0ZXJTZXJ2ZXJJdGVtLCByZWdpc3RlclNlcnZlckJsb2NrLCByZWdpc3RlckVudGl0eVNlcnZlciwgT3Zlbk1ES19fZGVmaW5lRXhlY0NtZEFzR2xvYmFsLCByZWdpc3Rlck92ZW5PcmVTZXJ2ZXIsIH0gZnJvbSBcImNsYXNzZXMvY29yZS9IZWxwZXJfZnVuY1wiO1xuaW1wb3J0IE9JdGVtIGZyb20gXCJjbGFzc2VzL2NvcmUvT0l0ZW1cIjtcbmltcG9ydCBPTW9kIGZyb20gXCJjbGFzc2VzL2NvcmUvTW9kXCI7XG5pbXBvcnQgT3ZlbiBmcm9tIFwiY2xhc3Nlcy9jb3JlL092ZW5cIjtcbmltcG9ydCBPQmxvY2sgZnJvbSBcImNsYXNzZXMvY29yZS9PQmxvY2tcIjtcbmltcG9ydCB7IHNpbXBsZWNvbW1hbmQgfSBmcm9tIFwiY2xhc3Nlcy9jb3JlL2NvbW1hbmRzXCI7XG5pbXBvcnQgT0VudGl0eSBmcm9tIFwiLi9jbGFzc2VzL2NvcmUvT0VudGl0eVwiO1xuaW1wb3J0IE92ZW5PcmUgZnJvbSBcImNsYXNzZXMvY29yZS9PdmVuT3JlXCI7XG52YXIgZGV2bW9kZSA9IHRydWU7XG5Nb2RBUEkuZXZlbnRzLm5ld0V2ZW50KFwibGliOk92ZW5NREs6bG9hZFwiKTtcbk1vZEFQSS5ldmVudHMubmV3RXZlbnQoXCJsaWI6T3Zlbk1ESzpsb2FkZWRcIik7XG5Nb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjpPdmVuTURLOmxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFwiT3Zlbk1ESyBSdW50aW1lIGlzIGxvYWRpbmdcIik7XG4gICAgY29uc29sZS5sb2coXCJMb2FkaW5nIE92ZW5NREsgZ2xvYmFsc1wiKTtcbiAgICBnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVySXRlbSA9IHJlZ2lzdGVyU2VydmVySXRlbTtcbiAgICBnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVyQmxvY2sgPSByZWdpc3RlclNlcnZlckJsb2NrO1xuICAgIGdsb2JhbFRoaXMucmVnaXN0ZXJFbnRpdHlTZXJ2ZXIgPSByZWdpc3RlckVudGl0eVNlcnZlcjtcbiAgICBnbG9iYWxUaGlzLk9JdGVtID0gT0l0ZW07XG4gICAgZ2xvYmFsVGhpcy5PTW9kID0gT01vZDtcbiAgICBnbG9iYWxUaGlzLk92ZW5NREsgPSBPdmVuO1xuICAgIGdsb2JhbFRoaXMuT0Jsb2NrID0gT0Jsb2NrO1xuICAgIGdsb2JhbFRoaXMuc2ltcGxlY29tbWFuZCA9IHNpbXBsZWNvbW1hbmQ7XG4gICAgZ2xvYmFsVGhpcy5PdmVuT3JlID0gT3Zlbk9yZTtcbiAgICBnbG9iYWxUaGlzLnJlZ2lzdGVyT3Zlbk9yZVNlcnZlciA9IHJlZ2lzdGVyT3Zlbk9yZVNlcnZlcjtcbiAgICBnbG9iYWxUaGlzLk9FbnRpdHkgPSBPRW50aXR5O1xuICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICBpZiAoIWRldm1vZGUpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiT3Zlbk1ESyBkb2VzIG5vdCBmdWxseSBzdXBwb3J0IDEuMTIgYXQgdGhpcyB0aW1lLCBwbGVhc2UgdXNlIDEuOC44IGZvciBmdWxsIHN1cHBvcnRcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIjEuMTIgZGV0ZWN0ZWRcIik7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiT3Zlbk1ESyBkb2VzIG5vdCBmdWxseSBzdXBwb3J0IDEuMTIgYXQgdGhpcyB0aW1lLCBwbGVhc2UgdXNlIDEuOC44IGZvciBmdWxsIHN1cHBvcnRcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJPdmVuTURLIGdsb2JhbHMgaGF2ZSBiZWVuIHNldCBhbmQgbG9hZGVkXCIpO1xuICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJJdGVtID0gXCIuY29uY2F0KHJlZ2lzdGVyU2VydmVySXRlbSwgXCI7XCIpKTtcbiAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyIEl0ZW0gc2VydmVyc2lkZSBmdW5jdGlvbiBsb2FkZWRcIik7XG4gICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3Rlck92ZW5PcmVTZXJ2ZXIgPSBcIi5jb25jYXQocmVnaXN0ZXJPdmVuT3JlU2VydmVyLCBcIjtcIikpO1xuICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXIgT3ZlbiBPcmUgc2VydmVyc2lkZSBmdW5jdGlvbiBsb2FkZWRcIik7XG4gICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKE92ZW5NREtfX2RlZmluZUV4ZWNDbWRBc0dsb2JhbCk7XG4gICAgT3Zlbk1ES19fZGVmaW5lRXhlY0NtZEFzR2xvYmFsKCk7XG4gICAgY29uc29sZS5sb2coXCJPdmVuTURLX19FeGVjQ21kQXNHbG9iYWwgc2VydmVyc2lkZSBhbmQgY2xpZW50c2lkZSBmdW5jdGlvbiBsb2FkZWRcIik7XG4gICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckJsb2NrID0gXCIuY29uY2F0KHJlZ2lzdGVyU2VydmVyQmxvY2ssIFwiO1wiKSk7XG4gICAgY29uc29sZS5sb2coXCJSZWdpc3RlciBFbnRpdHkgc2VydmVyc2lkZSBmdW5jdGlvbiBsb2FkZWRcIik7XG4gICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlckVudGl0eVNlcnZlciA9IFwiLmNvbmNhdChyZWdpc3RlckVudGl0eVNlcnZlciwgXCI7XCIpKTtcbiAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyIEJsb2NrIHNlcnZlcnNpZGUgZnVuY3Rpb24gbG9hZGVkXCIpO1xuICAgIE1vZEFQSS5ldmVudHMuY2FsbEV2ZW50KFwibGliOk92ZW5NREs6bG9hZGVkXCIsIHt9KTtcbn0pO1xuTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6T3Zlbk1ESzpsb2FkZWRcIiwgZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICBjb25zb2xlLmxvZyhcIk92ZW5NREsgUnVudGltZSBoYXMgZmluaXNoZWQgbG9hZGluZ1wiKTtcbiAgICBjb25zb2xlLmxvZyhcIlxcbiAgICBcXHUyNTBDXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTEwXFxuICAgIFxcdTI1MDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgIE92ZW5NREsgaGFzIGxvYWRlZCAgICAgICAgICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICB3ZWxjb21lIHRvIG92ZW5NREsgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgQSBtb2QgZGV2IGtpdCBmb3Igc3RhcnRlcnMgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgIFZlcnNpb246IFwiLmNvbmNhdCh2ZXJzaW9uLCBcIiAgICAgICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUxNFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUxOFxcbiAgICBcIikpO1xuICAgIHNpbXBsZWNvbW1hbmQoXCIvb3Zlbm1ka1wiLCBcIiBsb2dfMVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIE1vZEFQSS5kaXNwbGF5VG9DaGF0KFwiXFxuICAgICAgT3Zlbk1ESyBSdW50aW1lIHYwLjFcXG4gICAgICBNYWRlIGJ5IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXFxuICAgICAgLSBBZGRlZCBiYXNpYyBjb3JlIGNsYXNzZXNcXG4gICAgICAoIE5vdCBtdWNoIGNhbiBiZSBkb2N1bWVudGVkIGR1ZSB0byBzbyBsaXR0bGUgYmVpbmcgYWRkZWQgKVwiKTtcbiAgICB9KTtcbiAgICBzaW1wbGVjb21tYW5kKFwiL292ZW5tZGtcIiwgXCIgbG9nXzJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBNb2RBUEkuZGlzcGxheVRvQ2hhdChcIlxcbiAgICAgIE92ZW5NREsgUnVudGltZSB2MC4yXFxuICAgICAgTWFkZSBieSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxcbiAgICAgIC0gQWRkZWQgc3VwcG9ydCBmb3IgMS4xMlxcbiAgICAgIC0gQWRkZWQgc3VwcG9ydCBmb3IgT3Zlbk9yZVxcbiAgICAgIC0gQWRkZWQgc3VwcG9ydCBmb3IgT0VudGl0eVxcbiAgICAgIC0gUU9MIGltcHJvdmVtZW50c1xcbiAgICAgIC0gQWRkZWQgc3VwcG9ydCBmb3IgT3Zlbk1ES19fRXhlY0NtZEFzR2xvYmFsXFxuICAgICAgLSBBZGRlZCBzdXBwb3J0IGZvciBPdmVuTURLX19kZWZpbmVFeGVjQ21kQXNHbG9iYWxcXG4gICAgICAtIEFkZGVkIHN1cHBvcnQgZm9yIHNpbXBsZWNvbW1hbmRzXCIpO1xuICAgIH0pO1xuICAgIHNpbXBsZWNvbW1hbmQoXCIvb3Zlbm1ka1wiLCBcIiBsb2dfM1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIE1vZEFQSS5kaXNwbGF5VG9DaGF0KFwiXFxuICAgICAgT3Zlbk1ESyBSdW50aW1lIHYwLjNcXG4gICAgICBNYWRlIGJ5IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXFxuICAgICAgLSBBZGRlZCBtb3JlIE9FbnRpdHkgY3VzdG9taXphdGlvblxcbiAgICAgICAgLSBBZGRlZCBtb3JlIHN1cHBvcnQgZm9yIE1vZGVsIGhpdGJvZXhlc1xcbiAgICAgICAgLSBBZGRlZCBjdXN0b20gZW50aXR5IHNvdW5kIHN1cHBvcnRcIik7XG4gICAgfSk7XG59KTtcbk1vZEFQSS5hZGRDcmVkaXQoXCJPdmVuTURLIFJ1bnRpbWVcIiwgXCJCZW5kaWVHYW1lc1wiLCBcIiAtIE1hZGUgT3Zlbk1ES1xcbiAtIENvZGVkIG1vc3Qgb2YgT3Zlbk1ES1wiKTtcbk1vZEFQSS5hZGRDcmVkaXQoXCJPdmVuTURLIFJ1bnRpbWVcIiwgXCJCbG9ja18yMjIyXCIsIFwiIC0gRm91bmRlZCBPdmVuTURLXCIpO1xuTW9kQVBJLmV2ZW50cy5jYWxsRXZlbnQoXCJsaWI6T3Zlbk1ESzpsb2FkXCIsIHsgdmVyc2lvbjogXCJ2MC4zXCIgfSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=