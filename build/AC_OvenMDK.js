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
    console.warn("this is entity size on server btwww 1: ".concat(entitySize1, ", this is entity size 2: ").concat(entitySize2));
    var entityBreedItem2 = entityBreedItem;
    var entityDropItem2 = entityDropItem;
    var item_ref = ModAPI.items[entityBreedItem2];
    var entitySuper = ModAPI.reflect.getSuper(entityClass, function (x) { return x.length === 2; });
    var nme_OEntity = function nme_OEntity($worldIn) {
        entitySuper(this, $worldIn);
        this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
        this.wrapped.setSize(entitySize1 || 0.4, entitySize2 || 0.7);
        this.wrapped.tasks.addTask(0, AITask("EntityAISwimming", 1)(this));
        this.wrapped.tasks.addTask(1, AITask("EntityAIPanic", 2)(this, 1.9));
        this.wrapped.tasks.addTask(2, AITask("EntityAIMate", 2)(this, 1.0));
        this.wrapped.tasks.addTask(3, AITask("EntityAITempt", 4)(this, 1.5, item_ref.getRef(), 0)); //won't cause a problem as the bread is obtained when the entity is constructed.
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
            itemstack.$getItem() === ModAPI.items[entityBreedItem2].getRef());
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
    return _a = {},
        _a["Entity".concat(entityID.toUpperCase())] = nme_OEntity,
        _a["Model".concat(entityID.toUpperCase())] = nmcm_OEntityModel,
        _a["Render".concat(entityID.toUpperCase())] = nmcre_RenderOEntity,
        _a["".concat(entityID, "Textures")] = duckTextures,
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
        console.warn("this is entity size 1: ".concat(entitySize1, ", this is entity size 2: ").concat(entitySize2, ", oh the breeditem ").concat(entityBreedItem2, ", and dropItem ").concat(entityDropItem2));
        var entityBreedItem2 = this.entityBreedItem;
        var entityDropItem2 = this.entityDropItem;
        var item_ref = ModAPI.items[entityBreedItem2];
        var nme_OEntity = function nme_OEntity($worldIn) {
            entitySuper(this, $worldIn);
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            this.wrapped.setSize(entitySize1 || 0.4, entitySize2 || 0.7);
            this.wrapped.tasks.addTask(0, AITask("EntityAISwimming", 1)(this));
            this.wrapped.tasks.addTask(1, AITask("EntityAIPanic", 2)(this, 1.9));
            this.wrapped.tasks.addTask(2, AITask("EntityAIMate", 2)(this, 1.0));
            this.wrapped.tasks.addTask(3, AITask("EntityAITempt", 4)(this, 1.5, item_ref.getRef(), 0)); //won't cause a problem as the bread is obtained when the entity is constructed.
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
            return ModAPI.items[entityDropItem2].getRef();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dW50aW1lLy4vc3JjL2NsYXNzZXMvY29yZS9IZWxwZXJfZnVuYy50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL01vZC50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL09CbG9jay50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL09FbnRpdHkudHMiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lLy4vc3JjL2NsYXNzZXMvY29yZS9PSXRlbS50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL092ZW4udHMiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lLy4vc3JjL2NsYXNzZXMvY29yZS9PdmVuT3JlLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvY29tbWFuZHMudHMiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lLy4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4gICAgSGVscGVyX2Z1bmMudHNcbiAgICBcbiAgICBDb3B5cmlnaHQgMjAyNSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICAgIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE92ZW5NREsuXG5cbiAgICBPdmVuTURLIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXJcbiAgICB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWVcbiAgICBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pXG4gICAgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICBPdmVuTURLIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWVxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1NcbiAgICBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYWxvbmdcbiAgICB3aXRoIE92ZW4gTURLLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclNlcnZlckl0ZW0oaXRlbUlELCBpdGVtU3RhY2ssIG9uUmlnaHRDbGljaywgb25JdGVtVXNlKSB7XG4gICAgLyppZiAoaXNTZXJ2ZXIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWdpc3RlclNlcnZlckl0ZW0gY2FuIG9ubHkgYmUgdXNlZCBvbiB0aGUgc2VydmVyIHNpZGUuXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH0qL1xuICAgIHZhciBjcmVhdGl2ZU1pc2NUYWI7XG4gICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIGNyZWF0aXZlTWlzY1RhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy5NSVNDO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY3JlYXRpdmVNaXNjVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLnRhYk1pc2M7XG4gICAgfVxuICAgIHZhciAkJGl0ZW1HZXRBdHRyaWJ1dGVzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIikubWV0aG9kcy5nZXRJdGVtQXR0cmlidXRlTW9kaWZpZXJzLm1ldGhvZDtcbiAgICB2YXIgaXRlbUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIik7XG4gICAgdmFyIGl0ZW1TdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKGl0ZW1DbGFzcywgZnVuY3Rpb24gKGZuKSB7IHJldHVybiBmbi5sZW5ndGggPT09IDE7IH0pO1xuICAgIC8qaWYgKGlzU2VydmVyID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJ1c2luZyBzZXJ2ZXIgc2lkZSByZWdpc3RlclNlcnZlckl0ZW1cIik7XG4gICAgICB9Ki9cbiAgICBmdW5jdGlvbiBubWlfT3Zlbkl0ZW0oKSB7XG4gICAgICAgIGl0ZW1TdXBlcih0aGlzKTtcbiAgICAgICAgdGhpcy4kc2V0Q3JlYXRpdmVUYWIoY3JlYXRpdmVNaXNjVGFiKTtcbiAgICAgICAgdGhpcy4kbWF4U3RhY2tTaXplID0gaXRlbVN0YWNrO1xuICAgIH1cbiAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhpdGVtQ2xhc3MsIG5taV9PdmVuSXRlbSk7XG4gICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1SaWdodENsaWNrID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcikge1xuICAgICAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMilcbiAgICAgICAgICAgICAgICAkJHBsYXllci4kc2V0SXRlbUluVXNlKCQkaXRlbXN0YWNrLCAzMik7XG4gICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyO1xuICAgICAgICAgICAgb25SaWdodENsaWNrKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlcnZlciBpdGVtc3RhY2s6XCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJCRpdGVtc3RhY2spO1xuICAgICAgICAgICAgcmV0dXJuICQkaXRlbXN0YWNrO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgdmFyICQkUmVzdWx0RW51bSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiRW51bUFjdGlvblJlc3VsdFwiKS5zdGF0aWNWYXJpYWJsZXM7XG4gICAgICAgIHZhciAkJEFjdGlvblJlc3VsdCA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiQWN0aW9uUmVzdWx0XCIpLmNvbnN0cnVjdG9yc1swXTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtUmlnaHRDbGljayA9IGZ1bmN0aW9uICgkJHdvcmxkLCAkJHBsYXllciwgJGhhbmRFbnVtLCAkdW51c2VkKSB7XG4gICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2sgPSAkJHBsYXllci4kZ2V0SGVsZEl0ZW0oJGhhbmRFbnVtKTtcbiAgICAgICAgICAgICQkcGxheWVyLiRzZXRBY3RpdmVIYW5kKCRoYW5kRW51bSk7XG4gICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyO1xuICAgICAgICAgICAgb25SaWdodENsaWNrKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICByZXR1cm4gJCRBY3Rpb25SZXN1bHQoJCRSZXN1bHRFbnVtLlNVQ0NFU1MsICQkaXRlbXN0YWNrKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1Vc2UwID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHBsYXllciwgJCR3b3JsZCwgJCRibG9ja3Bvcykge1xuICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRibG9ja3BvcztcbiAgICAgICAgICAgIG9uSXRlbVVzZSgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIsICQkYmxvY2twb3MpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGllbnQgaXRlbXN0YWNrOlwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgdmFyICQkUmVzdWx0RW51bSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiRW51bUFjdGlvblJlc3VsdFwiKS5zdGF0aWNWYXJpYWJsZXM7XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVVzZSA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCRwbGF5ZXIsICQkd29ybGQsICQkYmxvY2twb3MpIHtcbiAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCRwbGF5ZXIsICQkd29ybGQsICQkYmxvY2twb3M7XG4gICAgICAgICAgICBpZiAob25JdGVtVXNlKSB7XG4gICAgICAgICAgICAgICAgb25JdGVtVXNlKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRibG9ja3Bvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJCRSZXN1bHRFbnVtLlBBU1M7XG4gICAgICAgIH07XG4gICAgfVxuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uVXBkYXRlID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRob3RiYXJfc2xvdCwgJCRpc19oZWxkKSB7XG4gICAgICAgICQkaXNfaGVsZCA9ICQkaXNfaGVsZCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgcmV0dXJuICQkaXRlbXN0YWNrO1xuICAgIH07XG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtVXNlRmluaXNoID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcikge1xuICAgICAgICByZXR1cm4gJCRpdGVtc3RhY2s7XG4gICAgfTtcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRnZXRNYXhJdGVtVXNlRHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAzMjtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldEl0ZW1BdHRyaWJ1dGVNb2RpZmllcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vMS4xMiB3b3JrcyBpIHRoaW5rXG4gICAgICAgIHZhciAkJGF0dHJpYnV0ZW1hcCA9ICQkaXRlbUdldEF0dHJpYnV0ZXMuYXBwbHkodGhpcywgW10pO1xuICAgICAgICByZXR1cm4gJCRhdHRyaWJ1dGVtYXA7XG4gICAgfTtcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRnZXRTdHJWc0Jsb2NrID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJGJsb2NrKSB7XG4gICAgICAgIHJldHVybiAxLjA7XG4gICAgfTtcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkNyZWF0ZWQgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7XG4gICAgICAgIC8vMS4xMiB3b3Jrc1xuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkJsb2NrRGVzdHJveWVkID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJGJsb2NrLCAkJGJsb2NrcG9zLCAkJGVudGl0eSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xuICAgIHZhciBpbnRlcm5hbF9yZWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpdGVtSW5zdGFuY2UgPSBuZXcgbm1pX092ZW5JdGVtKCkuJHNldFVubG9jYWxpemVkTmFtZShNb2RBUEkudXRpbC5zdHIoXCJcIi5jb25jYXQoaXRlbUlEKSkpO1xuICAgICAgICBpdGVtQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3Rlckl0ZW0ubWV0aG9kKE1vZEFQSS5rZXlnZW4uaXRlbShcIlwiLmNvbmNhdChpdGVtSUQpKSwgTW9kQVBJLnV0aWwuc3RyKFwiXCIuY29uY2F0KGl0ZW1JRCkpLCBpdGVtSW5zdGFuY2UpO1xuICAgICAgICBNb2RBUEkuaXRlbXNbXCJcIi5jb25jYXQoaXRlbUlEKV0gPSBpdGVtSW5zdGFuY2U7XG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1JbnN0YW5jZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXJlZCBPdmVuTURLIGl0ZW0gKCBTZXJ2ZXIgU2lkZSApXCIpO1xuICAgICAgICByZXR1cm4gaXRlbUluc3RhbmNlO1xuICAgIH07XG4gICAgaWYgKE1vZEFQSS5pdGVtcykge1xuICAgICAgICByZXR1cm4gaW50ZXJuYWxfcmVnKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImJvb3RzdHJhcFwiLCBpbnRlcm5hbF9yZWcpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclNlcnZlckJsb2NrKGJsb2NrSUQsIG9uQnJlYWspIHtcbiAgICAvKmlmIChNb2RBUEkuaXNTZXJ2ZXIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJyZWdpc3RlclNlcnZlckJsb2NrIGNhbiBvbmx5IGJlIHVzZWQgb24gdGhlIHNlcnZlciBzaWRlLlwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICB9Ki9cbiAgICB2YXIgQmxvY2tDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIik7XG4gICAgdmFyIEl0ZW1DbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpO1xuICAgIHZhciBjcmVhdGl2ZVRhYjtcbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgY3JlYXRpdmVUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMuQlVJTERJTkdfQkxPQ0tTO1xuICAgIH1cbiAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIGNyZWF0aXZlVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLnRhYkJsb2NrO1xuICAgIH1cbiAgICB2YXIgYmxvY2tTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKEJsb2NrQ2xhc3MsIGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZm4ubGVuZ3RoID09PSAyOyB9KTtcbiAgICB2YXIgYnJlYWtCbG9ja01ldGhvZCA9IEJsb2NrQ2xhc3MubWV0aG9kcy5icmVha0Jsb2NrLm1ldGhvZDtcbiAgICBmdW5jdGlvbiBubWJfT2Jsb2NrKCkge1xuICAgICAgICBibG9ja1N1cGVyKHRoaXMsIE1vZEFQSS5tYXRlcmlhbHMucm9jay5nZXRSZWYoKSk7XG4gICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIHRoaXMuJGRlZmF1bHRCbG9ja1N0YXRlID0gdGhpcy4kYmxvY2tTdGF0ZS4kZ2V0QmFzZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kc2V0Q3JlYXRpdmVUYWIoY3JlYXRpdmVUYWIpO1xuICAgIH1cbiAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhCbG9ja0NsYXNzLCBubWJfT2Jsb2NrKTtcbiAgICBubWJfT2Jsb2NrLnByb3RvdHlwZS4kYnJlYWtCbG9jayA9IGZ1bmN0aW9uICgkd29ybGQsICRibG9ja3BvcywgJGJsb2Nrc3RhdGUpIHtcbiAgICAgICAgLy9vbkJyZWFrKCR3b3JsZCwgJGJsb2NrcG9zLCAkYmxvY2tzdGF0ZSk7XG4gICAgICAgIHJldHVybiBicmVha0Jsb2NrTWV0aG9kKHRoaXMsICR3b3JsZCwgJGJsb2NrcG9zLCAkYmxvY2tzdGF0ZSk7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBmaXh1cEJsb2NrSWRzKCkge1xuICAgICAgICB2YXIgYmxvY2tSZWdpc3RyeSA9IE1vZEFQSS51dGlsXG4gICAgICAgICAgICAud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpLnN0YXRpY1ZhcmlhYmxlc1xuICAgICAgICAgICAgLmJsb2NrUmVnaXN0cnkpXG4gICAgICAgICAgICAuZ2V0Q29ycmVjdGl2ZSgpO1xuICAgICAgICB2YXIgQkxPQ0tfU1RBVEVfSURTID0gTW9kQVBJLnV0aWxcbiAgICAgICAgICAgIC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIikuc3RhdGljVmFyaWFibGVzXG4gICAgICAgICAgICAuQkxPQ0tfU1RBVEVfSURTKVxuICAgICAgICAgICAgLmdldENvcnJlY3RpdmUoKTtcbiAgICAgICAgYmxvY2tSZWdpc3RyeS5yZWdpc3RyeU9iamVjdHMuaGFzaFRhYmxlS1RvVi5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGJsb2NrXzEgPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsaWRTdGF0ZXMgPSBibG9ja18xLmdldEJsb2NrU3RhdGUoKS5nZXRWYWxpZFN0YXRlcygpO1xuICAgICAgICAgICAgICAgIHZhciBzdGF0ZUFycmF5ID0gdmFsaWRTdGF0ZXMuYXJyYXkgfHwgW3ZhbGlkU3RhdGVzLmVsZW1lbnRdO1xuICAgICAgICAgICAgICAgIHN0YXRlQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaWJsb2Nrc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoYmxvY2tSZWdpc3RyeS5nZXRJREZvck9iamVjdChibG9ja18xLmdldFJlZigpKSA8PCA0KSB8XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja18xLmdldE1ldGFGcm9tU3RhdGUoaWJsb2Nrc3RhdGUuZ2V0UmVmKCkpO1xuICAgICAgICAgICAgICAgICAgICBCTE9DS19TVEFURV9JRFMucHV0KGlibG9ja3N0YXRlLmdldFJlZigpLCBpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBpbnRlcm5hbFJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY3VzdG9tX2Jsb2NrO1xuICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBuZXcgbm1iX09ibG9jaygpXG4gICAgICAgICAgICAgICAgLiRzZXRIYXJkbmVzcygzLjApXG4gICAgICAgICAgICAgICAgLiRzZXRTdGVwU291bmQoQmxvY2tDbGFzcy5zdGF0aWNWYXJpYWJsZXMuc291bmRUeXBlUGlzdG9uKVxuICAgICAgICAgICAgICAgIC4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihibG9ja0lEKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBuZXcgbm1iX09ibG9jaygpXG4gICAgICAgICAgICAgICAgLiRzZXRIYXJkbmVzcygzLjApXG4gICAgICAgICAgICAgICAgLiRzZXRTb3VuZFR5cGUoTW9kQVBJLmJsb2NrU291bmRzLlBMQU5ULmdldFJlZigpKVxuICAgICAgICAgICAgICAgIC4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihibG9ja0lEKSk7XG4gICAgICAgIH1cbiAgICAgICAgQmxvY2tDbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVyQmxvY2swLm1ldGhvZChNb2RBUEkua2V5Z2VuLmJsb2NrKGJsb2NrSUQpLCBNb2RBUEkudXRpbC5zdHIoYmxvY2tJRCksIGN1c3RvbV9ibG9jayk7XG4gICAgICAgIEl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbUJsb2NrMC5tZXRob2QoY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgZml4dXBCbG9ja0lkcygpO1xuICAgICAgICBNb2RBUEkuYmxvY2tzW2Jsb2NrSURdID0gY3VzdG9tX2Jsb2NrO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyaW5nIGJsb2NrIG9uIHNlcnZlciBzaWRlXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXN0b21fYmxvY2spO1xuICAgICAgICByZXR1cm4gY3VzdG9tX2Jsb2NrO1xuICAgIH07XG4gICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICBpZiAoTW9kQVBJLm1hdGVyaWFscykge1xuICAgICAgICAgICAgcmV0dXJuIGludGVybmFsUmVnaXN0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsUmVnaXN0ZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICB2YXIgYmxvY2tDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIik7XG4gICAgICAgIHZhciBpdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJib290c3RyYXBcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1c3RvbV9ibG9jayA9IG5ldyBubWJfT2Jsb2NrKClcbiAgICAgICAgICAgICAgICAuJHNldEhhcmRuZXNzKDMuMClcbiAgICAgICAgICAgICAgICAuJHNldFNvdW5kVHlwZShNb2RBUEkuYmxvY2tTb3VuZHMuUExBTlQuZ2V0UmVmKCkpXG4gICAgICAgICAgICAgICAgLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKGJsb2NrSUQpKTtcbiAgICAgICAgICAgIGJsb2NrQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3RlckJsb2NrMC5tZXRob2QoTW9kQVBJLmtleWdlbi5ibG9jayhibG9ja0lEKSwgTW9kQVBJLnV0aWwuc3RyKGJsb2NrSUQpLCBjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgaXRlbUNsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJJdGVtQmxvY2swLm1ldGhvZChjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgZml4dXBCbG9ja0lkcygpO1xuICAgICAgICAgICAgTW9kQVBJLmJsb2Nrc1tibG9ja0lEXSA9IGN1c3RvbV9ibG9jaztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXJpbmcgYmxvY2sgb24gc2VydmVyIHNpZGVcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjdXN0b21fYmxvY2spO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJFbnRpdHlTZXJ2ZXIoZW50aXR5SUQsIGVudGl0eU5hbWUsIGVudGl0eU1vZGVsLCBlbnRpdHlCcmVlZEl0ZW0sIGVudGl0eURyb3BJdGVtLCBlZ2dCYXNlLCBlZ2dTcG90cykge1xuICAgIHZhciBfYTtcbiAgICBjb25zb2xlLmxvZyhcImVudGl0aWVzIGFyZSBub3QgZmluaXNoZWQgeWV0ISBVc2UgYXQgeW91ciBvd24gcmlzayFcIik7XG4gICAgLy9yZXR1cm47XG4gICAgTW9kQVBJLmhvb2tzLm1ldGhvZHMuamxfU3RyaW5nX2Zvcm1hdCA9XG4gICAgICAgIE1vZEFQSS5ob29rcy5tZXRob2RzLm5sZXZfSFN0cmluZ19mb3JtYXQ7IC8vdGVtcG9yYXJ5IHRoaW5nIHRvIGZpeCBhbiBpc3N1ZSBpbiBlYWdsZXJjcmFmdFxuICAgIC8vIFV0aWxzXG4gICAgZnVuY3Rpb24gQUlUYXNrKG5hbWUsIGxlbmd0aCkge1xuICAgICAgICByZXR1cm4gTW9kQVBJLnJlZmxlY3RcbiAgICAgICAgICAgIC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5haS5cIiArIG5hbWUpXG4gICAgICAgICAgICAuY29uc3RydWN0b3JzLmZpbmQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSBsZW5ndGg7IH0pO1xuICAgIH1cbiAgICB2YXIgUmVzb3VyY2VMb2NhdGlvbiA9IE1vZEFQSS5yZWZsZWN0XG4gICAgICAgIC5nZXRDbGFzc0J5TmFtZShcIlJlc291cmNlTG9jYXRpb25cIilcbiAgICAgICAgLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gMTsgfSk7XG4gICAgdmFyIEVudGl0eVBsYXllciA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiRW50aXR5UGxheWVyXCIpO1xuICAgIHZhciBHbFN0YXRlTWFuYWdlciA9IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QudmFsdWVzKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiR2xTdGF0ZU1hbmFnZXJcIikuc3RhdGljTWV0aG9kcykubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiBbeC5tZXRob2ROYW1lU2hvcnQsIHgubWV0aG9kXTsgfSkpO1xuICAgIHZhciBTaGFyZWRNb25zdGVyQXR0cmlidXRlcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXNcIikuc3RhdGljVmFyaWFibGVzO1xuICAgIC8vIFNUQVJUIENVU1RPTSBFTlRJVFlcbiAgICB2YXIgZW50aXR5U2l6ZTE7XG4gICAgdmFyIGVudGl0eVNpemUyO1xuICAgIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbENoaWNrZW5cIikge1xuICAgICAgICBlbnRpdHlTaXplMSA9IDAuNDsgLy8gQ2hpY2tlblxuICAgICAgICBlbnRpdHlTaXplMiA9IDAuNztcbiAgICB9XG4gICAgZWxzZSBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxDb3dcIikge1xuICAgICAgICBlbnRpdHlTaXplMSA9IDAuOTsgLy8gQ293XG4gICAgICAgIGVudGl0eVNpemUyID0gMS40O1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbE1vb3Nocm9vbVwiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC45OyAvLyBNb29zaHJvb21cbiAgICAgICAgZW50aXR5U2l6ZTIgPSAxLjQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsUGlnXCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjk7IC8vIFBpZ1xuICAgICAgICBlbnRpdHlTaXplMiA9IDAuOTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxTaGVlcFwiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC45OyAvLyBTaGVlcFxuICAgICAgICBlbnRpdHlTaXplMiA9IDEuMztcbiAgICB9XG4gICAgZWxzZSBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxIb3JzZVwiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMS4zOTY1OyAvLyBIb3JzZVxuICAgICAgICBlbnRpdHlTaXplMiA9IDEuNjsgLy8gSGVpZ2h0IGNhbiB2YXJ5IHNsaWdodGx5XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsUmFiYml0XCIpIHtcbiAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjQ7IC8vIFJhYmJpdFxuICAgICAgICBlbnRpdHlTaXplMiA9IDAuNTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxTcXVpZFwiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC44OyAvLyBTcXVpZFxuICAgICAgICBlbnRpdHlTaXplMiA9IDAuODtcbiAgICB9XG4gICAgZWxzZSBpZiAoZW50aXR5TW9kZWwgPT09IFwiTW9kZWxCYXRcIikge1xuICAgICAgICBlbnRpdHlTaXplMSA9IDAuNTsgLy8gQmF0XG4gICAgICAgIGVudGl0eVNpemUyID0gMC45O1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbE9jZWxvdFwiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC42OyAvLyBPY2Vsb3QgKHdpbGQpXG4gICAgICAgIGVudGl0eVNpemUyID0gMC43O1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFdvbGZcIikge1xuICAgICAgICBlbnRpdHlTaXplMSA9IDAuNjsgLy8gV29sZlxuICAgICAgICBlbnRpdHlTaXplMiA9IDAuODU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVudGl0eU1vZGVsID09PSBcIk1vZGVsVmlsbGFnZXJcIikge1xuICAgICAgICBlbnRpdHlTaXplMSA9IDAuNjsgLy8gVmlsbGFnZXJcbiAgICAgICAgZW50aXR5U2l6ZTIgPSAxLjk1O1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbElyb25Hb2xlbVwiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMS40OyAvLyBJcm9uIEdvbGVtXG4gICAgICAgIGVudGl0eVNpemUyID0gMi45O1xuICAgIH1cbiAgICBlbHNlIGlmIChlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFNub3dtYW5cIiB8fFxuICAgICAgICBlbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFNub3dHb2xlbVwiKSB7XG4gICAgICAgIGVudGl0eVNpemUxID0gMC43OyAvLyBTbm93IEdvbGVtXG4gICAgICAgIGVudGl0eVNpemUyID0gMS45O1xuICAgIH1cbiAgICB2YXIgZW50aXR5Q2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5wYXNzaXZlLkVudGl0eUFuaW1hbFwiKTtcbiAgICBjb25zb2xlLndhcm4oXCJ0aGlzIGlzIGVudGl0eSBzaXplIG9uIHNlcnZlciBidHd3dyAxOiBcIi5jb25jYXQoZW50aXR5U2l6ZTEsIFwiLCB0aGlzIGlzIGVudGl0eSBzaXplIDI6IFwiKS5jb25jYXQoZW50aXR5U2l6ZTIpKTtcbiAgICB2YXIgZW50aXR5QnJlZWRJdGVtMiA9IGVudGl0eUJyZWVkSXRlbTtcbiAgICB2YXIgZW50aXR5RHJvcEl0ZW0yID0gZW50aXR5RHJvcEl0ZW07XG4gICAgdmFyIGl0ZW1fcmVmID0gTW9kQVBJLml0ZW1zW2VudGl0eUJyZWVkSXRlbTJdO1xuICAgIHZhciBlbnRpdHlTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKGVudGl0eUNsYXNzLCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDI7IH0pO1xuICAgIHZhciBubWVfT0VudGl0eSA9IGZ1bmN0aW9uIG5tZV9PRW50aXR5KCR3b3JsZEluKSB7XG4gICAgICAgIGVudGl0eVN1cGVyKHRoaXMsICR3b3JsZEluKTtcbiAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgIHRoaXMud3JhcHBlZC5zZXRTaXplKGVudGl0eVNpemUxIHx8IDAuNCwgZW50aXR5U2l6ZTIgfHwgMC43KTtcbiAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMCwgQUlUYXNrKFwiRW50aXR5QUlTd2ltbWluZ1wiLCAxKSh0aGlzKSk7XG4gICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDEsIEFJVGFzayhcIkVudGl0eUFJUGFuaWNcIiwgMikodGhpcywgMS45KSk7XG4gICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDIsIEFJVGFzayhcIkVudGl0eUFJTWF0ZVwiLCAyKSh0aGlzLCAxLjApKTtcbiAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMywgQUlUYXNrKFwiRW50aXR5QUlUZW1wdFwiLCA0KSh0aGlzLCAxLjUsIGl0ZW1fcmVmLmdldFJlZigpLCAwKSk7IC8vd29uJ3QgY2F1c2UgYSBwcm9ibGVtIGFzIHRoZSBicmVhZCBpcyBvYnRhaW5lZCB3aGVuIHRoZSBlbnRpdHkgaXMgY29uc3RydWN0ZWQuXG4gICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDQsIEFJVGFzayhcIkVudGl0eUFJRm9sbG93UGFyZW50XCIsIDIpKHRoaXMsIDEuMikpO1xuICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg1LCBBSVRhc2soXCJFbnRpdHlBSVdhbmRlclwiLCAyKSh0aGlzLCAxLjEpKTtcbiAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNiwgQUlUYXNrKFwiRW50aXR5QUlXYXRjaENsb3Nlc3RcIiwgMykodGhpcywgTW9kQVBJLnV0aWwuYXNDbGFzcyhFbnRpdHlQbGF5ZXIuY2xhc3MpLCA2KSk7XG4gICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDcsIEFJVGFzayhcIkVudGl0eUFJTG9va0lkbGVcIiwgMSkodGhpcykpO1xuICAgIH07XG4gICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2soZW50aXR5Q2xhc3MsIG5tZV9PRW50aXR5KTtcbiAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldEV5ZUhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLndyYXBwZWQuaGVpZ2h0O1xuICAgIH07XG4gICAgdmFyIG9yaWdpbmFsQXBwbHlFbnRpdHlBdHRyaWJ1dGVzID0gbm1lX09FbnRpdHkucHJvdG90eXBlLiRhcHBseUVudGl0eUF0dHJpYnV0ZXM7XG4gICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRhcHBseUVudGl0eUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICBvcmlnaW5hbEFwcGx5RW50aXR5QXR0cmlidXRlcy5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tYXhIZWFsdGgpXG4gICAgICAgICAgICAuc2V0QmFzZVZhbHVlKDUpO1xuICAgICAgICB0aGlzLndyYXBwZWRcbiAgICAgICAgICAgIC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZClcbiAgICAgICAgICAgIC5zZXRCYXNlVmFsdWUoMC4yNSk7XG4gICAgfTtcbiAgICB2YXIgb3JpZ2luYWxMaXZpbmdVcGRhdGUgPSBubWVfT0VudGl0eS5wcm90b3R5cGUuJG9uTGl2aW5nVXBkYXRlO1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kb25MaXZpbmdVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICBvcmlnaW5hbExpdmluZ1VwZGF0ZS5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgIGlmICh0aGlzLndyYXBwZWQuaXNJbldhdGVyKCkpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC5tb3Rpb25ZICo9IDAuNTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgICAgIC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZClcbiAgICAgICAgICAgICAgICAuc2V0QmFzZVZhbHVlKDEuNCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWRcbiAgICAgICAgICAgICAgICAuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1vdmVtZW50U3BlZWQpXG4gICAgICAgICAgICAgICAgLnNldEJhc2VWYWx1ZSgwLjI1KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXRMaXZpbmdTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIGVudGl0eUlEICsgXCIubWFpbl9zb3VuZFwiKTtcbiAgICB9O1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0SHVydFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgZW50aXR5SUQgKyBcIi5tYWluX3NvdW5kXCIpO1xuICAgIH07XG4gICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXREZWF0aFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgZW50aXR5SUQgKyBcIi5tYWluX3NvdW5kXCIpO1xuICAgIH07XG4gICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRwbGF5U3RlcFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgdGhpcy53cmFwcGVkLnBsYXlTb3VuZChNb2RBUEkudXRpbC5zdHIoXCJtb2IuXCIgKyBlbnRpdHlJRCArIFwiLnN0ZXBcIiksIDAuMiwgMSk7XG4gICAgfTtcbiAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldERyb3BJdGVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gTW9kQVBJLml0ZW1zW2VudGl0eURyb3BJdGVtMl0uZ2V0UmVmKCk7XG4gICAgfTtcbiAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGNyZWF0ZUNoaWxkID0gZnVuY3Rpb24gKG90aGVyUGFyZW50KSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICByZXR1cm4gbmV3IG5tZV9PRW50aXR5KChfYiA9IChfYSA9IHRoaXMud3JhcHBlZC53b3JsZE9iaikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldFJlZigpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBudWxsKTtcbiAgICB9O1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kaXNCcmVlZGluZ0l0ZW0gPSBmdW5jdGlvbiAoaXRlbXN0YWNrKSB7XG4gICAgICAgIHJldHVybiAoaXRlbXN0YWNrICE9PSBudWxsICYmXG4gICAgICAgICAgICBpdGVtc3RhY2suJGdldEl0ZW0oKSA9PT0gTW9kQVBJLml0ZW1zW2VudGl0eUJyZWVkSXRlbTJdLmdldFJlZigpKTtcbiAgICB9O1xuICAgIC8vIEVORCBDVVNUT00gRU5USVRZXG4gICAgLy8gU1RBUlQgQ1VTVE9NIE1PREVMXG4gICAgdmFyIG1vZGVsQ2hpY2tlbkNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jbGllbnQubW9kZWwuXCIuY29uY2F0KGVudGl0eU1vZGVsKSk7XG4gICAgdmFyIG1vZGVsQ2hpY2tlblN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIobW9kZWxDaGlja2VuQ2xhc3MpOyAvL3doaWxlIHN1cGVyIGlzbid0IHVzZWQgd2hlbiBleHRlbmRpbmcgdGhpcyBjbGFzcywgamF2YSBpbXBsaWVzIHRoZSBjYWxsLlxuICAgIHZhciBubWNtX09FbnRpdHlNb2RlbCA9IGZ1bmN0aW9uIG5tY21fT0VudGl0eU1vZGVsKCkge1xuICAgICAgICBtb2RlbENoaWNrZW5TdXBlcih0aGlzKTtcbiAgICB9O1xuICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKG1vZGVsQ2hpY2tlbkNsYXNzLCBubWNtX09FbnRpdHlNb2RlbCk7XG4gICAgLy8gRU5EIENVU1RPTSBNaE9ERUxcbiAgICAvLyBTVEFSVCBDVVNUT00gUkVOREVSRVJcbiAgICB2YXIgcmVuZGVyQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNsaWVudC5yZW5kZXJlci5lbnRpdHkuUmVuZGVyTGl2aW5nXCIpO1xuICAgIHZhciByZW5kZXJTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKHJlbmRlckNsYXNzLCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDQ7IH0pO1xuICAgIHZhciBkdWNrVGV4dHVyZXMgPSBSZXNvdXJjZUxvY2F0aW9uKE1vZEFQSS51dGlsLnN0cihcInRleHR1cmVzL2VudGl0eS9cIi5jb25jYXQoZW50aXR5SUQsIFwiLnBuZ1wiKSkpO1xuICAgIHZhciBubWNyZV9SZW5kZXJPRW50aXR5ID0gZnVuY3Rpb24gbm1jcmVfUmVuZGVyT0VudGl0eShyZW5kZXJNYW5hZ2VyLCBtb2RlbEJhc2VJbiwgc2hhZG93U2l6ZUluKSB7XG4gICAgICAgIHJlbmRlclN1cGVyKHRoaXMsIHJlbmRlck1hbmFnZXIsIG1vZGVsQmFzZUluLCBzaGFkb3dTaXplSW4pO1xuICAgIH07XG4gICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2socmVuZGVyQ2xhc3MsIG5tY3JlX1JlbmRlck9FbnRpdHkpO1xuICAgIG5tY3JlX1JlbmRlck9FbnRpdHkucHJvdG90eXBlLiRnZXRFbnRpdHlUZXh0dXJlID0gZnVuY3Rpb24gKGVudGl0eSkge1xuICAgICAgICByZXR1cm4gZHVja1RleHR1cmVzO1xuICAgIH07XG4gICAgbm1jcmVfUmVuZGVyT0VudGl0eS5wcm90b3R5cGUuJGhhbmRsZVJvdGF0aW9uRmxvYXQgPSBmdW5jdGlvbiAoZW50aXR5LCBwYXJ0aWFsVGlja3MpIHtcbiAgICAgICAgZW50aXR5ID0gTW9kQVBJLnV0aWwud3JhcChlbnRpdHkpO1xuICAgICAgICBpZiAoIWVudGl0eS5vbkdyb3VuZCAmJiAhZW50aXR5LmlzSW5XYXRlcigpKSB7XG4gICAgICAgICAgICByZXR1cm4gMjsgLy9mYWxsaW5nXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIElEID0gTW9kQVBJLmtleWdlbi5lbnRpdHkoZW50aXR5SUQpO1xuICAgIE1vZEFQSS5yZWZsZWN0XG4gICAgICAgIC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlMaXN0XCIpXG4gICAgICAgIC5zdGF0aWNNZXRob2RzLmFkZE1hcHBpbmcwLm1ldGhvZChNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwge1xuICAgICAgICAkY3JlYXRlRW50aXR5OiBmdW5jdGlvbiAoJHdvcmxkSW4pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgbm1lX09FbnRpdHkoJHdvcmxkSW4pO1xuICAgICAgICB9LFxuICAgIH0sIE1vZEFQSS51dGlsLnN0cihlbnRpdHlJRC50b1VwcGVyQ2FzZSgpKSwgSUQsIGVnZ0Jhc2UgfHwgMHg1ZTNlMmQsIC8vZWdnIGJhc2VcbiAgICBlZ2dTcG90cyB8fCAweDI2OTE2NiAvL2VnZyBzcG90c1xuICAgICk7XG4gICAgdmFyIFNwYXduUGxhY2VtZW50VHlwZSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eUxpdmluZyRTcGF3blBsYWNlbWVudFR5cGVcIikuc3RhdGljVmFyaWFibGVzO1xuICAgIHZhciBFTlRJVFlfUExBQ0VNRU5UUyA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkuRW50aXR5U3Bhd25QbGFjZW1lbnRSZWdpc3RyeVwiKS5zdGF0aWNWYXJpYWJsZXMuRU5USVRZX1BMQUNFTUVOVFMpO1xuICAgIEVOVElUWV9QTEFDRU1FTlRTLnB1dChNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgU3Bhd25QbGFjZW1lbnRUeXBlLk9OX0dST1VORCk7XG4gICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJib290c3RyYXBcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgU3Bhd25MaXN0RW50cnkgPSBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlJFNwYXduTGlzdEVudHJ5XCIpXG4gICAgICAgICAgICAuY29uc3RydWN0b3JzLmZpbmQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSA0OyB9KTtcbiAgICAgICAgdmFyIEJpb21lR2VuU3dhbXAgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlXCIpXG4gICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLnN3YW1wbGFuZCk7XG4gICAgICAgIHZhciBCaW9tZUdlblJpdmVyID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5yaXZlcik7XG4gICAgICAgIHZhciBCaW9tZUdlbkJlYWNoID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5iZWFjaCk7XG4gICAgICAgIHZhciBkdWNrU3Bhd25Td2FtcCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAyMiwgMywgNSk7XG4gICAgICAgIHZhciBkdWNrU3Bhd25SaXZlckJlZCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAxMCwgNSwgOSk7XG4gICAgICAgIHZhciBkdWNrU3Bhd25CZWFjaCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAyNCwgMiwgMyk7XG4gICAgICAgIEJpb21lR2VuU3dhbXAuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25Td2FtcCk7XG4gICAgICAgIEJpb21lR2VuUml2ZXIuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25SaXZlckJlZCk7XG4gICAgICAgIEJpb21lR2VuQmVhY2guc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25CZWFjaCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIF9hID0ge30sXG4gICAgICAgIF9hW1wiRW50aXR5XCIuY29uY2F0KGVudGl0eUlELnRvVXBwZXJDYXNlKCkpXSA9IG5tZV9PRW50aXR5LFxuICAgICAgICBfYVtcIk1vZGVsXCIuY29uY2F0KGVudGl0eUlELnRvVXBwZXJDYXNlKCkpXSA9IG5tY21fT0VudGl0eU1vZGVsLFxuICAgICAgICBfYVtcIlJlbmRlclwiLmNvbmNhdChlbnRpdHlJRC50b1VwcGVyQ2FzZSgpKV0gPSBubWNyZV9SZW5kZXJPRW50aXR5LFxuICAgICAgICBfYVtcIlwiLmNvbmNhdChlbnRpdHlJRCwgXCJUZXh0dXJlc1wiKV0gPSBkdWNrVGV4dHVyZXMsXG4gICAgICAgIF9hO1xufVxuLypleHBvcnQgZnVuY3Rpb24gaXNTZXJ2ZXJTaWRlKCkge1xuICAgIGZ1bmN0aW9uIHN1YmZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImlzU2VydmVyU2lkZSBmdW5jdGlvbiBjYWxsZWRcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGBpc1NlcnZlclNpZGU6ICR7TW9kQVBJLmlzU2VydmVyfWApO1xuICAgICAgICBjb25zb2xlLmxvZyhNb2RBUEkuaXNTZXJ2ZXIpO1xuICAgIH1cbiAgICBzdWJmdW5jdGlvbigpO1xuICAgIGNvbnNvbGUubG9nKGBpc1NlcnZlclNpZGU6ICR7TW9kQVBJLmlzU2VydmVyfWApO1xufSovXG5leHBvcnQgZnVuY3Rpb24gT3Zlbk1ES19fZGVmaW5lRXhlY0NtZEFzR2xvYmFsKCkge1xuICAgIHZhciBfYTtcbiAgICAvLyBHZXQgc2VydmVyIG1ldGhvZCBmb3IgZGlmZmVyZW50IE1pbmVjcmFmdCB2ZXJzaW9uc1xuICAgIHZhciBnZXRTZXJ2ZXIgPSAoX2EgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LnNlcnZlci5NaW5lY3JhZnRTZXJ2ZXJcIikuc3RhdGljTWV0aG9kcy5nZXRTZXJ2ZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tZXRob2Q7XG4gICAgLy8gRGVmaW5lIGdsb2JhbCBmdW5jdGlvblxuICAgIGdsb2JhbFRoaXMuT3Zlbk1ES19fZXhlY3V0ZUNvbW1hbmRBcyA9XG4gICAgICAgIGZ1bmN0aW9uIE92ZW5NREtfX2V4ZWN1dGVDb21tYW5kQXMoJGNvbW1hbmRzZW5kZXIsIGNvbW1hbmQsIGZlZWRiYWNrKSB7XG4gICAgICAgICAgICB2YXIgc2VydmVyID0gZ2V0U2VydmVyXG4gICAgICAgICAgICAgICAgPyBnZXRTZXJ2ZXIoKSAvLyAxLjhcbiAgICAgICAgICAgICAgICA6IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuc2VydmVyLk1pbmVjcmFmdFNlcnZlclwiKVxuICAgICAgICAgICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLnNlcnZlcjsgLy8gMS4xMlxuICAgICAgICAgICAgaWYgKCFzZXJ2ZXIpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc29sZS5sb2coc2VydmVyKTtcbiAgICAgICAgICAgIHZhciBjb21tYW5kTWFuYWdlciA9IHNlcnZlci4kY29tbWFuZE1hbmFnZXI7XG4gICAgICAgICAgICAvLyBUZW1wb3JhcmlseSBvdmVycmlkZSBwZXJtaXNzaW9uc1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsQ2FuQ29tbWFuZCA9ICRjb21tYW5kc2VuZGVyLiRjYW5Db21tYW5kU2VuZGVyVXNlQ29tbWFuZDtcbiAgICAgICAgICAgICRjb21tYW5kc2VuZGVyLiRjYW5Db21tYW5kU2VuZGVyVXNlQ29tbWFuZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDE7IH07XG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxGZWVkYmFjayA9ICRjb21tYW5kc2VuZGVyLiRzZW5kQ29tbWFuZEZlZWRiYWNrO1xuICAgICAgICAgICAgJGNvbW1hbmRzZW5kZXIuJHNlbmRDb21tYW5kRmVlZGJhY2sgPSBmZWVkYmFjayA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDE7IH0gOiBmdW5jdGlvbiAoKSB7IHJldHVybiAwOyB9O1xuICAgICAgICAgICAgdmFyIG5vdGlmeU9wczAgPSBNb2RBUEkuaG9va3MubWV0aG9kcy5ubWNfQ29tbWFuZEJhc2Vfbm90aWZ5T3BlcmF0b3JzMDtcbiAgICAgICAgICAgIHZhciBub3RpZnlPcHMgPSBNb2RBUEkuaG9va3MubWV0aG9kcy5ubWNfQ29tbWFuZEJhc2Vfbm90aWZ5T3BlcmF0b3JzO1xuICAgICAgICAgICAgdmFyIGFkZENoYXRNc2cgPSAkY29tbWFuZHNlbmRlci4kYWRkQ2hhdE1lc3NhZ2U7XG4gICAgICAgICAgICBpZiAoIWZlZWRiYWNrKSB7XG4gICAgICAgICAgICAgICAgTW9kQVBJLmhvb2tzLm1ldGhvZHMubm1jX0NvbW1hbmRCYXNlX25vdGlmeU9wZXJhdG9yczAgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICAgICAgICAgTW9kQVBJLmhvb2tzLm1ldGhvZHMubm1jX0NvbW1hbmRCYXNlX25vdGlmeU9wZXJhdG9ycyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgICAgICAgICAkY29tbWFuZHNlbmRlci4kYWRkQ2hhdE1lc3NhZ2UgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbW1hbmRNYW5hZ2VyLiRleGVjdXRlQ29tbWFuZCgkY29tbWFuZHNlbmRlciwgTW9kQVBJLnV0aWwuc3RyKGNvbW1hbmQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFmZWVkYmFjaykge1xuICAgICAgICAgICAgICAgIE1vZEFQSS5ob29rcy5tZXRob2RzLm5tY19Db21tYW5kQmFzZV9ub3RpZnlPcGVyYXRvcnMwID0gbm90aWZ5T3BzMDtcbiAgICAgICAgICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5ubWNfQ29tbWFuZEJhc2Vfbm90aWZ5T3BlcmF0b3JzID0gbm90aWZ5T3BzO1xuICAgICAgICAgICAgICAgICRjb21tYW5kc2VuZGVyLiRhZGRDaGF0TWVzc2FnZSA9IGFkZENoYXRNc2c7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZXN0b3JlIG9yaWdpbmFsIHBlcm1pc3Npb25zIGFuZCBmZWVkYmFja1xuICAgICAgICAgICAgJGNvbW1hbmRzZW5kZXIuJGNhbkNvbW1hbmRTZW5kZXJVc2VDb21tYW5kID0gb3JpZ2luYWxDYW5Db21tYW5kO1xuICAgICAgICAgICAgJGNvbW1hbmRzZW5kZXIuJHNlbmRDb21tYW5kRmVlZGJhY2sgPSBvcmlnaW5hbEZlZWRiYWNrO1xuICAgICAgICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyT3Zlbk9yZVNlcnZlcihibG9ja19JRCwgdmllblNpemUsIHZpZW5Db3VudCwgbWluR2VuZXJhdGlvbkhlaWdodCwgbWF4R2VuZXJhdGlvbkhlaWdodCkge1xuICAgIHZhciBXb3JsZEdlbk1pbmVhYmxlID0gTW9kQVBJLnJlZmxlY3RcbiAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuZ2VuLmZlYXR1cmUuV29ybGRHZW5NaW5hYmxlXCIpXG4gICAgICAgIC5jb25zdHJ1Y3RvcnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDI7IH0pO1xuICAgIHZhciBCaW9tZURlY29yYXRvcl9kZWNvcmF0ZSA9IE1vZEFQSS51dGlsLmdldE1ldGhvZEZyb21QYWNrYWdlKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZURlY29yYXRvclwiLCBcImRlY29yYXRlXCIpO1xuICAgIHZhciBvbGREZWNvcmF0ZSA9IE1vZEFQSS5ob29rcy5tZXRob2RzW0Jpb21lRGVjb3JhdG9yX2RlY29yYXRlXTtcbiAgICBNb2RBUEkuaG9va3MubWV0aG9kc1tCaW9tZURlY29yYXRvcl9kZWNvcmF0ZV0gPSBmdW5jdGlvbiAoJHRoaXMsICR3b3JsZCwgJHJhbmRvbSwgJGJpb21lR2VuQmFzZSwgJGJsb2NrcG9zKSB7XG4gICAgICAgIGlmICghJHRoaXMuJGN1cnJlbnRXb3JsZCkge1xuICAgICAgICAgICAgJHRoaXNbXCIkT3Zlbk1ES19fYWR2YW5jZWRfYmxvY2swXzQ4MzQ5NV9CbG9ja0dlblwiXSA9IFdvcmxkR2VuTWluZWFibGUoTW9kQVBJLmJsb2Nrc1tcIlwiLmNvbmNhdChibG9ja19JRCldLmdldFN0YXRlRnJvbU1ldGEoMCkuZ2V0UmVmKCksIHZpZW5TaXplKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2xkRGVjb3JhdGUuYXBwbHkodGhpcywgW1xuICAgICAgICAgICAgJHRoaXMsXG4gICAgICAgICAgICAkd29ybGQsXG4gICAgICAgICAgICAkcmFuZG9tLFxuICAgICAgICAgICAgJGJpb21lR2VuQmFzZSxcbiAgICAgICAgICAgICRibG9ja3BvcyxcbiAgICAgICAgXSk7XG4gICAgfTtcbiAgICB2YXIgQmlvbWVEZWNvcmF0b3JfZ2VuZXJhdGVPcmVzID0gTW9kQVBJLnV0aWwuZ2V0TWV0aG9kRnJvbVBhY2thZ2UoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lRGVjb3JhdG9yXCIsIFwiZ2VuZXJhdGVPcmVzXCIpO1xuICAgIHZhciBvbGRHZW5lcmF0ZU9yZXMgPSBNb2RBUEkuaG9va3MubWV0aG9kc1tCaW9tZURlY29yYXRvcl9nZW5lcmF0ZU9yZXNdO1xuICAgIE1vZEFQSS5ob29rcy5tZXRob2RzW0Jpb21lRGVjb3JhdG9yX2dlbmVyYXRlT3Jlc10gPSBmdW5jdGlvbiAoJHRoaXMpIHtcbiAgICAgICAgJHRoaXMuJGdlblN0YW5kYXJkT3JlMSh2aWVuQ291bnQsICR0aGlzW1wiJE92ZW5NREtfX2FkdmFuY2VkX2Jsb2NrMF80ODM0OTVfQmxvY2tHZW5cIl0gfHwgbnVsbCwgbWluR2VuZXJhdGlvbkhlaWdodCwgbWF4R2VuZXJhdGlvbkhlaWdodCk7XG4gICAgICAgIHJldHVybiBvbGRHZW5lcmF0ZU9yZXMuYXBwbHkodGhpcywgWyR0aGlzXSk7XG4gICAgfTtcbn1cbiIsIi8qXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICAgIE1vZC50c1xuICAgIFxuICAgIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuaW1wb3J0IGRlZmF1bHRJY29uIGZyb20gXCJBU1NFVFMvZGVmYXVsdEljb24ucG5nXCI7XG52YXIgT01vZCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPTW9kKCkge1xuICAgIH1cbiAgICBPTW9kLmNvbmZpZyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBPTW9kLmluaXQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgT01vZC5wb3N0SW5pdCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBPTW9kLnRpdGxlID0gXCJEZWZhdWx0IE5hbWVcIjtcbiAgICBPTW9kLnZlcnNpb24gPSBcIlwiO1xuICAgIE9Nb2QuZGVzY3JpcHRpb24gPSBcIkRlZmF1bHQgT3Zlbk1ESyBEZXNjcmlwdGlvbi4gU2V0ICdkZXNjcmlwdGlvbicgaW4geW91ciBPTW9kIGNsYXNzIVwiO1xuICAgIE9Nb2QuY3JlZGl0cyA9IFwiTm9uZSBHaXZlblwiO1xuICAgIE9Nb2QuaWNvbiA9IGRlZmF1bHRJY29uO1xuICAgIE9Nb2QuYWNjZXB0ZWRNaW5lY3JhZnRWZXJzaW9ucyA9IG51bGw7XG4gICAgT01vZC5hY2NlcHRlZEVhZ2xlclVwZGF0ZXMgPSBudWxsO1xuICAgIE9Nb2QuYWNjZXB0ZWRFRlZlcnNpb25zID0gbnVsbDtcbiAgICBPTW9kLmFjY2VwdGVkRUZGbGF2b3VyID0gXCJpbmplY3RvclwiO1xuICAgIE9Nb2QuY2xpZW50U2lkZU9ubHkgPSBmYWxzZTtcbiAgICBPTW9kLnNlcnZlclNpZGVPbmx5ID0gZmFsc2U7XG4gICAgT01vZC5vbmx5XzFfMTJfMiA9IGZhbHNlO1xuICAgIE9Nb2QuRGVidWdfbW9kZSA9IGZhbHNlO1xuICAgIHJldHVybiBPTW9kO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE9Nb2Q7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuLypcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICBPQmxvY2sudHNcblxuICBDb3B5cmlnaHQgMjAyNSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG52YXIgT0Jsb2NrID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9CbG9jayhibG9ja05hbWUsIGJsb2NrSUQsIHRleHR1cmUsIG9uQnJlYWspIHtcbiAgICAgICAgdGhpcy5ibG9ja05hbWUgPSBibG9ja05hbWU7XG4gICAgICAgIHRoaXMuYmxvY2tJRCA9IGJsb2NrSUQ7XG4gICAgICAgIHRoaXMuYmxvY2tUZXh0dXJlID0gdGV4dHVyZTtcbiAgICAgICAgdGhpcy5vbkJyZWFrID0gb25CcmVhaztcbiAgICB9XG4gICAgT0Jsb2NrLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIEJsb2NrQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpO1xuICAgICAgICB2YXIgSXRlbUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIik7XG4gICAgICAgIHZhciBjcmVhdGl2ZVRhYjtcbiAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgY3JlYXRpdmVUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMudGFiQmxvY2s7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjcmVhdGl2ZVRhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy5CVUlMRElOR19CTE9DS1M7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJsb2NrU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihCbG9ja0NsYXNzLCBmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuLmxlbmd0aCA9PT0gMjsgfSk7XG4gICAgICAgIHZhciBicmVha0Jsb2NrTWV0aG9kID0gQmxvY2tDbGFzcy5tZXRob2RzLmJyZWFrQmxvY2subWV0aG9kO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGZ1bmN0aW9uIG5tYl9PYmxvY2soKSB7XG4gICAgICAgICAgICBibG9ja1N1cGVyKHRoaXMsIE1vZEFQSS5tYXRlcmlhbHMucm9jay5nZXRSZWYoKSk7XG4gICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZGVmYXVsdEJsb2NrU3RhdGUgPSB0aGlzLiRibG9ja1N0YXRlLiRnZXRCYXNlU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHNldENyZWF0aXZlVGFiKGNyZWF0aXZlVGFiKTtcbiAgICAgICAgfVxuICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhCbG9ja0NsYXNzLCBubWJfT2Jsb2NrKTtcbiAgICAgICAgbm1iX09ibG9jay5wcm90b3R5cGUuJGJyZWFrQmxvY2sgPSBmdW5jdGlvbiAoJHdvcmxkLCAkYmxvY2twb3MsICRibG9ja3N0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gYnJlYWtCbG9ja01ldGhvZCh0aGlzLCAkd29ybGQsICRibG9ja3BvcywgJGJsb2Nrc3RhdGUpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgJCRvbkJsb2NrRGVzdHJveWVkQnlQbGF5ZXJNZXRob2QgPSBCbG9ja0NsYXNzLm1ldGhvZHMub25CbG9ja0Rlc3Ryb3llZEJ5UGxheWVyLm1ldGhvZDtcbiAgICAgICAgbm1iX09ibG9jay5wcm90b3R5cGUuJG9uQmxvY2tEZXN0cm95ZWRCeVBsYXllciA9IGZ1bmN0aW9uICgkJHdvcmxkLCAkJGJsb2NrcG9zLCAkJGJsb2Nrc3RhdGUpIHtcbiAgICAgICAgICAgIHZhciAkJHdvcmxkLCAkJGJsb2NrcG9zLCAkJGJsb2Nrc3RhdGU7XG4gICAgICAgICAgICBzZWxmLm9uQnJlYWsuY2FsbCgkJHdvcmxkLCAkJGJsb2NrcG9zLCAkJGJsb2Nrc3RhdGUpO1xuICAgICAgICAgICAgcmV0dXJuICQkb25CbG9ja0Rlc3Ryb3llZEJ5UGxheWVyTWV0aG9kKHRoaXMsICQkd29ybGQsICQkYmxvY2twb3MsICQkYmxvY2tzdGF0ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBpbnRlcm5hbFJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1c3RvbV9ibG9jaztcbiAgICAgICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBuZXcgbm1iX09ibG9jaygpXG4gICAgICAgICAgICAgICAgICAgIC4kc2V0SGFyZG5lc3MoMy4wKVxuICAgICAgICAgICAgICAgICAgICAuJHNldFN0ZXBTb3VuZChCbG9ja0NsYXNzLnN0YXRpY1ZhcmlhYmxlcy5zb3VuZFR5cGVQaXN0b24pXG4gICAgICAgICAgICAgICAgICAgIC4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihfdGhpcy5ibG9ja0lEKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBuZXcgbm1iX09ibG9jaygpXG4gICAgICAgICAgICAgICAgICAgIC4kc2V0SGFyZG5lc3MoLTEuMClcbiAgICAgICAgICAgICAgICAgICAgLiRzZXRTb3VuZFR5cGUoTW9kQVBJLmJsb2NrU291bmRzLlBMQU5ULmdldFJlZigpKVxuICAgICAgICAgICAgICAgICAgICAuJHNldFVubG9jYWxpemVkTmFtZShNb2RBUEkudXRpbC5zdHIoX3RoaXMuYmxvY2tJRCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQmxvY2tDbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVyQmxvY2swLm1ldGhvZChNb2RBUEkua2V5Z2VuLmJsb2NrKF90aGlzLmJsb2NrSUQpLCBNb2RBUEkudXRpbC5zdHIoX3RoaXMuYmxvY2tJRCksIGN1c3RvbV9ibG9jayk7XG4gICAgICAgICAgICBJdGVtQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3Rlckl0ZW1CbG9jazAubWV0aG9kKGN1c3RvbV9ibG9jayk7XG4gICAgICAgICAgICBfdGhpcy5maXh1cEJsb2NrSWRzKCk7XG4gICAgICAgICAgICBNb2RBUEkuYmxvY2tzW190aGlzLmJsb2NrSURdID0gY3VzdG9tX2Jsb2NrO1xuICAgICAgICAgICAgX3RoaXMuYmxvY2tJbnN0YW5jZSA9IGN1c3RvbV9ibG9jaztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXJlZCBibG9jayBvbiBjbGllbnQ6IFwiICsgX3RoaXMuYmxvY2tJRCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgcmV0dXJuIGN1c3RvbV9ibG9jaztcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgaWYgKE1vZEFQSS5tYXRlcmlhbHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJuYWxSZWdpc3RlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJib290c3RyYXBcIiwgaW50ZXJuYWxSZWdpc3Rlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBpZiAoTW9kQVBJLmJsb2Nrcykge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKG5ldyBubWJfT2Jsb2NrKCkpLiRzZXRIYXJkbmVzcygtMS4wKS4kc2V0U291bmRUeXBlKE1vZEFQSS5ibG9ja1NvdW5kcy5QTEFOVC5nZXRSZWYoKSkuJHNldFVubG9jYWxpemVkTmFtZShNb2RBUEkudXRpbC5zdHIodGhpcy5ibG9ja0lEKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBPQmxvY2sucHJvdG90eXBlLmZpeHVwQmxvY2tJZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBibG9ja1JlZ2lzdHJ5ID0gTW9kQVBJLnV0aWxcbiAgICAgICAgICAgIC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIikuc3RhdGljVmFyaWFibGVzXG4gICAgICAgICAgICAuYmxvY2tSZWdpc3RyeSlcbiAgICAgICAgICAgIC5nZXRDb3JyZWN0aXZlKCk7XG4gICAgICAgIHZhciBCTE9DS19TVEFURV9JRFMgPSBNb2RBUEkudXRpbFxuICAgICAgICAgICAgLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5ibG9jay5CbG9ja1wiKS5zdGF0aWNWYXJpYWJsZXNcbiAgICAgICAgICAgIC5CTE9DS19TVEFURV9JRFMpXG4gICAgICAgICAgICAuZ2V0Q29ycmVjdGl2ZSgpO1xuICAgICAgICBibG9ja1JlZ2lzdHJ5LnJlZ2lzdHJ5T2JqZWN0cy5oYXNoVGFibGVLVG9WLmZvckVhY2goZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmxvY2tfMSA9IGVudHJ5LnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciB2YWxpZFN0YXRlcyA9IGJsb2NrXzEuZ2V0QmxvY2tTdGF0ZSgpLmdldFZhbGlkU3RhdGVzKCk7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXRlQXJyYXkgPSB2YWxpZFN0YXRlcy5hcnJheSB8fCBbdmFsaWRTdGF0ZXMuZWxlbWVudF07XG4gICAgICAgICAgICAgICAgc3RhdGVBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpYmxvY2tzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IChibG9ja1JlZ2lzdHJ5LmdldElERm9yT2JqZWN0KGJsb2NrXzEuZ2V0UmVmKCkpIDw8IDQpIHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrXzEuZ2V0TWV0YUZyb21TdGF0ZShpYmxvY2tzdGF0ZS5nZXRSZWYoKSk7XG4gICAgICAgICAgICAgICAgICAgIEJMT0NLX1NUQVRFX0lEUy5wdXQoaWJsb2Nrc3RhdGUuZ2V0UmVmKCksIGkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9CbG9jay5wcm90b3R5cGUucmVnaXN0ZXJCbG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1c3RvbV9ibG9jaywgbm1iX09CbG9jaywgaXRlbUNsYXNzLCBibG9ja0NsYXNzLCBzZWxmO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbV9ibG9jayA9IG5ldyBPQmxvY2sodGhpcy5ibG9ja05hbWUsIHRoaXMuYmxvY2tJRCwgdGhpcy5ibG9ja1RleHR1cmUsIHRoaXMub25CcmVhaykucmVnaXN0ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5tYl9PQmxvY2sgPSBuZXcgT0Jsb2NrKHRoaXMuYmxvY2tOYW1lLCB0aGlzLmJsb2NrSUQsIHRoaXMuYmxvY2tUZXh0dXJlLCB0aGlzLm9uQnJlYWspLnJlZ2lzdGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpO1xuICAgICAgICAgICAgICAgICAgICBibG9ja0NsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5ibG9jay5CbG9ja1wiKTtcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tX2Jsb2NrID0gbm1iX09CbG9jaztcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tDbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVyQmxvY2swLm1ldGhvZChNb2RBUEkua2V5Z2VuLmJsb2NrKHRoaXMuYmxvY2tJRCksIE1vZEFQSS51dGlsLnN0cih0aGlzLmJsb2NrSUQpLCBjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3Rlckl0ZW1CbG9jazAubWV0aG9kKGN1c3RvbV9ibG9jayk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1c3RvbV9ibG9jayB8fCBcIkJsb2NrIHJlZ2lzdHJhdGlvbiBmYWlsZWRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckJsb2NrKFxcXCJcIi5jb25jYXQodGhpcy5ibG9ja0lELCBcIlxcXCIsIFwiKS5jb25jYXQodGhpcy5vbkJyZWFrLCBcIik7XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSwgYnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rOnJlZ2lzdGVyaXRlbXNcIiwgZnVuY3Rpb24gKHJlbmRlckl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJJdGVtLnJlZ2lzdGVyQmxvY2soY3VzdG9tX2Jsb2NrLCBNb2RBUEkudXRpbC5zdHIoc2VsZi5ibG9ja0lEKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5MMTBOLnNldChcInRpbGUuXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIubmFtZVwiKSwgc2VsZi5ibG9ja05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZXQgbG9jYWxpemF0aW9uIGZvciBibG9jayBcIi5jb25jYXQoc2VsZi5ibG9ja0lEKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvbW9kZWxzL2Jsb2NrL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IFwiYmxvY2svY3ViZV9hbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGw6IFwiYmxvY2tzL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvbW9kZWxzL2l0ZW0vXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogXCJibG9jay9cIi5jb25jYXQoc2VsZi5ibG9ja0lEKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXJkcGVyc29uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGlvbjogWzEwLCAtNDUsIDE3MF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbjogWzAsIDEuNSwgLTIuNzVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGU6IFswLjM3NSwgMC4zNzUsIDAuMzc1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L2Jsb2Nrc3RhdGVzL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3JtYWw6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogc2VsZi5ibG9ja0lELFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goc2VsZi5ibG9ja1RleHR1cmUpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L3RleHR1cmVzL2Jsb2Nrcy9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5wbmdcIiksIGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2lua1wiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UsIGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3Npbms6cmVnaXN0ZXJpdGVtc1wiLCBmdW5jdGlvbiAocmVuZGVySXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29vbCByZWdpc3RlciBibG9ja1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXN0b21fYmxvY2sgfHwgXCJCbG9jayByZWdpc3RyYXRpb24gZmFpbGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckl0ZW0ucmVnaXN0ZXJCbG9jayhjdXN0b21fYmxvY2ssIE1vZEFQSS51dGlsLnN0cihfdGhpcy5ibG9ja0lEKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5MMTBOLnNldChcInRpbGUuXCIgKyB0aGlzLmJsb2NrSUQgKyBcIi5uYW1lXCIsIHRoaXMuYmxvY2tOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2V0IGxvY2FsaXphdGlvbiBmb3IgYmxvY2sgXCIuY29uY2F0KHNlbGYuYmxvY2tJRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3VzdG9tX2Jsb2NrIHx8IFwiQmxvY2sgcmVnaXN0cmF0aW9uIGZhaWxlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9tb2RlbHMvYmxvY2svXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyZW50XCI6IFwiYmxvY2svY3ViZV9hbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHR1cmVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhbGxcIjogXCJibG9ja3MvXCIuY29uY2F0KHNlbGYuYmxvY2tJRClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvbW9kZWxzL2l0ZW0vXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyZW50XCI6IFwiYmxvY2svXCIuY29uY2F0KHNlbGYuYmxvY2tJRClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9ibG9ja3N0YXRlcy9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YXJpYW50c1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm9ybWFsXCI6IHsgXCJtb2RlbFwiOiBcIlwiLmNvbmNhdCh0aGlzLmJsb2NrSUQpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChzZWxmLmJsb2NrVGV4dHVyZSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvdGV4dHVyZXMvYmxvY2tzL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLnBuZ1wiKSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJCbG9jayhcXFwiXCIuY29uY2F0KHRoaXMuYmxvY2tJRCwgXCJcXFwiLCBcIikuY29uY2F0KHRoaXMub25CcmVhaywgXCIpO1wiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYmxvY2tzW3RoaXMuYmxvY2tJRF0gPSBjdXN0b21fYmxvY2s7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIE9CbG9jaztcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBPQmxvY2s7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuaW1wb3J0IE9JdGVtIGZyb20gXCIuL09JdGVtXCI7XG52YXIgT0VudGl0eSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPRW50aXR5KGVudGl0eU5hbWUsIGVudGl0eUlELCBlbnRpdHlUZXh0dXJlLCBlbnRpdHlNb2RlbCwgZW50aXR5X3NvdW5kX21haW4sIGVudGl0eUJyZWVkSXRlbSwgZW50aXR5RHJvcEl0ZW0sIGVnZ0Jhc2UsIGVnZ1Nwb3RzKSB7XG4gICAgICAgIHRoaXMuZW50aXR5TmFtZSA9IGVudGl0eU5hbWU7XG4gICAgICAgIHRoaXMuZW50aXR5SUQgPSBlbnRpdHlJRDtcbiAgICAgICAgdGhpcy5lbnRpdHlUZXh0dXJlID0gZW50aXR5VGV4dHVyZTtcbiAgICAgICAgdGhpcy5lbnRpdHlNb2RlbCA9IGVudGl0eU1vZGVsO1xuICAgICAgICB0aGlzLmVudGl0eV9zb3VuZF9tYWluID0gZW50aXR5X3NvdW5kX21haW47XG4gICAgICAgIHRoaXMuZW50aXR5QnJlZWRJdGVtID0gZW50aXR5QnJlZWRJdGVtIHx8IFwid2hlYXRcIjsgLy9kZWZhdWx0IGJyZWVkIGl0ZW1cbiAgICAgICAgdGhpcy5lbnRpdHlEcm9wSXRlbSA9IGVudGl0eURyb3BJdGVtIHx8IFwiZmVhdGhlclwiOyAvL2RlZmF1bHQgZHJvcCBpdGVtXG4gICAgICAgIHRoaXMuZWdnQmFzZSA9IGVnZ0Jhc2UgfHwgMHg1ZTNlMmQ7IC8vZGVmYXVsdCBlZ2cgYmFzZSBjb2xvclxuICAgICAgICB0aGlzLmVnZ1Nwb3RzID0gZWdnU3BvdHMgfHwgMHgyNjkxNjY7IC8vZGVmYXVsdCBlZ2cgc3BvdHMgY29sb3JcbiAgICB9XG4gICAgT0VudGl0eS5wcm90b3R5cGUud2FpdEZvclJlbmRlck1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlcywgcmVqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBjaGVjaygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoTW9kQVBJLm1jLnJlbmRlck1hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrLCAxIC8gMjApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9FbnRpdHkucHJvdG90eXBlLnJlZ2lzdGVyRW50aXR5Q2xpZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT0VudGl0eSBkb2VzIG5vdCBzdXBwb3J0IDEuMTIsIHBsZWFzZSB1c2UgMS44LjggZm9yIGZ1bGwgc3VwcG9ydFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLndhcm4oXCJlbnRpdGllcyBhcmUgbm90IGZpbmlzaGVkIHlldCEgVXNlIGF0IHlvdXIgb3duIHJpc2shXCIpO1xuICAgICAgICAvL3JldHVybjtcbiAgICAgICAgTW9kQVBJLmhvb2tzLm1ldGhvZHMuamxfU3RyaW5nX2Zvcm1hdCA9XG4gICAgICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5ubGV2X0hTdHJpbmdfZm9ybWF0OyAvL3RlbXBvcmFyeSB0aGluZyB0byBmaXggYW4gaXNzdWUgaW4gZWFnbGVyY3JhZnRcbiAgICAgICAgLy8gVXRpbHNcbiAgICAgICAgZnVuY3Rpb24gQUlUYXNrKG5hbWUsIGxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS5yZWZsZWN0XG4gICAgICAgICAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LmFpLlwiICsgbmFtZSlcbiAgICAgICAgICAgICAgICAuY29uc3RydWN0b3JzLmZpbmQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSBsZW5ndGg7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBSZXNvdXJjZUxvY2F0aW9uID0gTW9kQVBJLnJlZmxlY3RcbiAgICAgICAgICAgIC5nZXRDbGFzc0J5TmFtZShcIlJlc291cmNlTG9jYXRpb25cIilcbiAgICAgICAgICAgIC5jb25zdHJ1Y3RvcnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDE7IH0pO1xuICAgICAgICB2YXIgRW50aXR5UGxheWVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnRpdHlQbGF5ZXJcIik7XG4gICAgICAgIHZhciBHbFN0YXRlTWFuYWdlciA9IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QudmFsdWVzKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiR2xTdGF0ZU1hbmFnZXJcIikuc3RhdGljTWV0aG9kcykubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiBbeC5tZXRob2ROYW1lU2hvcnQsIHgubWV0aG9kXTsgfSkpO1xuICAgICAgICB2YXIgU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIlNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzXCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgdmFyIGVudGl0eUJyZWVkSXRlbTIgPSB0aGlzLmVudGl0eUJyZWVkSXRlbTtcbiAgICAgICAgdmFyIGVudGl0eURyb3BJdGVtMiA9IHRoaXMuZW50aXR5RHJvcEl0ZW07XG4gICAgICAgIC8vIFNUQVJUIENVU1RPTSBFTlRJVFlcbiAgICAgICAgdmFyIGVudGl0eVNpemUxOyAvLyBEZWZhdWx0IHNpemUgZm9yIG1vc3QgZW50aXRpZXNcbiAgICAgICAgdmFyIGVudGl0eVNpemUyO1xuICAgICAgICBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbENoaWNrZW5cIikge1xuICAgICAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjQ7IC8vIENoaWNrZW5cbiAgICAgICAgICAgIGVudGl0eVNpemUyID0gMC43O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZW50aXR5TW9kZWwgPT09IFwiTW9kZWxDb3dcIikge1xuICAgICAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjk7IC8vIENvd1xuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAxLjQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbE1vb3Nocm9vbVwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuOTsgLy8gTW9vc2hyb29tXG4gICAgICAgICAgICBlbnRpdHlTaXplMiA9IDEuNDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsUGlnXCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMC45OyAvLyBQaWdcbiAgICAgICAgICAgIGVudGl0eVNpemUyID0gMC45O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZW50aXR5TW9kZWwgPT09IFwiTW9kZWxTaGVlcFwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuOTsgLy8gU2hlZXBcbiAgICAgICAgICAgIGVudGl0eVNpemUyID0gMS4zO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZW50aXR5TW9kZWwgPT09IFwiTW9kZWxIb3JzZVwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDEuMzk2NTsgLy8gSG9yc2VcbiAgICAgICAgICAgIGVudGl0eVNpemUyID0gMS42OyAvLyBIZWlnaHQgY2FuIHZhcnkgc2xpZ2h0bHlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsUmFiYml0XCIpIHtcbiAgICAgICAgICAgIGVudGl0eVNpemUxID0gMC40OyAvLyBSYWJiaXRcbiAgICAgICAgICAgIGVudGl0eVNpemUyID0gMC41O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZW50aXR5TW9kZWwgPT09IFwiTW9kZWxTcXVpZFwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuODsgLy8gU3F1aWRcbiAgICAgICAgICAgIGVudGl0eVNpemUyID0gMC44O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZW50aXR5TW9kZWwgPT09IFwiTW9kZWxCYXRcIikge1xuICAgICAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjU7IC8vIEJhdFxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbE9jZWxvdFwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuNjsgLy8gT2NlbG90ICh3aWxkKVxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAwLjc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFdvbGZcIikge1xuICAgICAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjY7IC8vIFdvbGZcbiAgICAgICAgICAgIGVudGl0eVNpemUyID0gMC44NTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVudGl0eU1vZGVsID09PSBcIk1vZGVsVmlsbGFnZXJcIikge1xuICAgICAgICAgICAgZW50aXR5U2l6ZTEgPSAwLjY7IC8vIFZpbGxhZ2VyXG4gICAgICAgICAgICBlbnRpdHlTaXplMiA9IDEuOTU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbElyb25Hb2xlbVwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDEuNDsgLy8gSXJvbiBHb2xlbVxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAyLjk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFNub3dtYW5cIiB8fFxuICAgICAgICAgICAgdGhpcy5lbnRpdHlNb2RlbCA9PT0gXCJNb2RlbFNub3dHb2xlbVwiKSB7XG4gICAgICAgICAgICBlbnRpdHlTaXplMSA9IDAuNzsgLy8gU25vdyBHb2xlbVxuICAgICAgICAgICAgZW50aXR5U2l6ZTIgPSAxLjk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVudGl0eUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkucGFzc2l2ZS5FbnRpdHlBbmltYWxcIik7XG4gICAgICAgIHZhciBlbnRpdHlTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKGVudGl0eUNsYXNzLCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDI7IH0pO1xuICAgICAgICBjb25zb2xlLndhcm4oXCJ0aGlzIGlzIGVudGl0eSBzaXplIDE6IFwiLmNvbmNhdChlbnRpdHlTaXplMSwgXCIsIHRoaXMgaXMgZW50aXR5IHNpemUgMjogXCIpLmNvbmNhdChlbnRpdHlTaXplMiwgXCIsIG9oIHRoZSBicmVlZGl0ZW0gXCIpLmNvbmNhdChlbnRpdHlCcmVlZEl0ZW0yLCBcIiwgYW5kIGRyb3BJdGVtIFwiKS5jb25jYXQoZW50aXR5RHJvcEl0ZW0yKSk7XG4gICAgICAgIHZhciBlbnRpdHlCcmVlZEl0ZW0yID0gdGhpcy5lbnRpdHlCcmVlZEl0ZW07XG4gICAgICAgIHZhciBlbnRpdHlEcm9wSXRlbTIgPSB0aGlzLmVudGl0eURyb3BJdGVtO1xuICAgICAgICB2YXIgaXRlbV9yZWYgPSBNb2RBUEkuaXRlbXNbZW50aXR5QnJlZWRJdGVtMl07XG4gICAgICAgIHZhciBubWVfT0VudGl0eSA9IGZ1bmN0aW9uIG5tZV9PRW50aXR5KCR3b3JsZEluKSB7XG4gICAgICAgICAgICBlbnRpdHlTdXBlcih0aGlzLCAkd29ybGRJbik7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC5zZXRTaXplKGVudGl0eVNpemUxIHx8IDAuNCwgZW50aXR5U2l6ZTIgfHwgMC43KTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDAsIEFJVGFzayhcIkVudGl0eUFJU3dpbW1pbmdcIiwgMSkodGhpcykpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMSwgQUlUYXNrKFwiRW50aXR5QUlQYW5pY1wiLCAyKSh0aGlzLCAxLjkpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDIsIEFJVGFzayhcIkVudGl0eUFJTWF0ZVwiLCAyKSh0aGlzLCAxLjApKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDMsIEFJVGFzayhcIkVudGl0eUFJVGVtcHRcIiwgNCkodGhpcywgMS41LCBpdGVtX3JlZi5nZXRSZWYoKSwgMCkpOyAvL3dvbid0IGNhdXNlIGEgcHJvYmxlbSBhcyB0aGUgYnJlYWQgaXMgb2J0YWluZWQgd2hlbiB0aGUgZW50aXR5IGlzIGNvbnN0cnVjdGVkLlxuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNCwgQUlUYXNrKFwiRW50aXR5QUlGb2xsb3dQYXJlbnRcIiwgMikodGhpcywgMS4yKSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg1LCBBSVRhc2soXCJFbnRpdHlBSVdhbmRlclwiLCAyKSh0aGlzLCAxLjEpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDYsIEFJVGFzayhcIkVudGl0eUFJV2F0Y2hDbG9zZXN0XCIsIDMpKHRoaXMsIE1vZEFQSS51dGlsLmFzQ2xhc3MoRW50aXR5UGxheWVyLmNsYXNzKSwgNikpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNywgQUlUYXNrKFwiRW50aXR5QUlMb29rSWRsZVwiLCAxKSh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKGVudGl0eUNsYXNzLCBubWVfT0VudGl0eSk7XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0RXllSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy53cmFwcGVkLmhlaWdodDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG9yaWdpbmFsQXBwbHlFbnRpdHlBdHRyaWJ1dGVzID0gbm1lX09FbnRpdHkucHJvdG90eXBlLiRhcHBseUVudGl0eUF0dHJpYnV0ZXM7XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kYXBwbHlFbnRpdHlBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICBvcmlnaW5hbEFwcGx5RW50aXR5QXR0cmlidXRlcy5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWRcbiAgICAgICAgICAgICAgICAuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1heEhlYWx0aClcbiAgICAgICAgICAgICAgICAuc2V0QmFzZVZhbHVlKDUpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkXG4gICAgICAgICAgICAgICAgLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tb3ZlbWVudFNwZWVkKVxuICAgICAgICAgICAgICAgIC5zZXRCYXNlVmFsdWUoMC4yNSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvcmlnaW5hbExpdmluZ1VwZGF0ZSA9IG5tZV9PRW50aXR5LnByb3RvdHlwZS4kb25MaXZpbmdVcGRhdGU7XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kb25MaXZpbmdVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIG9yaWdpbmFsTGl2aW5nVXBkYXRlLmFwcGx5KHRoaXMsIFtdKTtcbiAgICAgICAgICAgIGlmICh0aGlzLndyYXBwZWQuaXNJbldhdGVyKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQubW90aW9uWSAqPSAwLjU7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkXG4gICAgICAgICAgICAgICAgICAgIC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZClcbiAgICAgICAgICAgICAgICAgICAgLnNldEJhc2VWYWx1ZSgxLjQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkXG4gICAgICAgICAgICAgICAgICAgIC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZClcbiAgICAgICAgICAgICAgICAgICAgLnNldEJhc2VWYWx1ZSgwLjI1KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXRMaXZpbmdTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBNb2RBUEkudXRpbC5zdHIoXCJtb2IuXCIgKyB0aGlzLmVudGl0eUlEICsgXCIubWFpbl9zb3VuZFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXRIdXJ0U291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgdGhpcy5lbnRpdHlJRCArIFwiLm1haW5fc291bmRcIik7XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0RGVhdGhTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBNb2RBUEkudXRpbC5zdHIoXCJtb2IuXCIgKyB0aGlzLmVudGl0eUlEICsgXCIubWFpbl9zb3VuZFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRwbGF5U3RlcFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQucGxheVNvdW5kKE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIHRoaXMuZW50aXR5SUQgKyBcIi5zdGVwXCIpLCAwLjIsIDEpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldERyb3BJdGVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS5pdGVtc1tlbnRpdHlEcm9wSXRlbTJdLmdldFJlZigpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGNyZWF0ZUNoaWxkID0gZnVuY3Rpb24gKG90aGVyUGFyZW50KSB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IG5tZV9PRW50aXR5KChfYiA9IChfYSA9IHRoaXMud3JhcHBlZC53b3JsZE9iaikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldFJlZigpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBudWxsKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRpc0JyZWVkaW5nSXRlbSA9IGZ1bmN0aW9uIChpdGVtc3RhY2spIHtcbiAgICAgICAgICAgIHJldHVybiAoaXRlbXN0YWNrICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgaXRlbXN0YWNrLiRnZXRJdGVtKCkgPT09IE1vZEFQSS5pdGVtc1tlbnRpdHlCcmVlZEl0ZW0yXS5nZXRSZWYoKSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIEVORCBDVVNUT00gRU5USVRZXG4gICAgICAgIC8vIFNUQVJUIENVU1RPTSBNT0RFTFxuICAgICAgICB2YXIgbW9kZWxDaGlja2VuQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNsaWVudC5tb2RlbC5cIi5jb25jYXQodGhpcy5lbnRpdHlNb2RlbCkpO1xuICAgICAgICB2YXIgbW9kZWxDaGlja2VuU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihtb2RlbENoaWNrZW5DbGFzcyk7IC8vd2hpbGUgc3VwZXIgaXNuJ3QgdXNlZCB3aGVuIGV4dGVuZGluZyB0aGlzIGNsYXNzLCBqYXZhIGltcGxpZXMgdGhlIGNhbGwuXG4gICAgICAgIHZhciBubWNtX09FbnRpdHlNb2RlbCA9IGZ1bmN0aW9uIG5tY21fT0VudGl0eU1vZGVsKCkge1xuICAgICAgICAgICAgbW9kZWxDaGlja2VuU3VwZXIodGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKG1vZGVsQ2hpY2tlbkNsYXNzLCBubWNtX09FbnRpdHlNb2RlbCk7XG4gICAgICAgIC8vIEVORCBDVVNUT00gTU9ERUxcbiAgICAgICAgLy8gU1RBUlQgQ1VTVE9NIFJFTkRFUkVSXG4gICAgICAgIHZhciByZW5kZXJDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY2xpZW50LnJlbmRlcmVyLmVudGl0eS5SZW5kZXJMaXZpbmdcIik7XG4gICAgICAgIHZhciByZW5kZXJTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKHJlbmRlckNsYXNzLCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDQ7IH0pO1xuICAgICAgICB2YXIgZHVja1RleHR1cmVzID0gUmVzb3VyY2VMb2NhdGlvbihNb2RBUEkudXRpbC5zdHIoXCJ0ZXh0dXJlcy9lbnRpdHkvXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiLnBuZ1wiKSkpO1xuICAgICAgICB2YXIgbm1jcmVfUmVuZGVyT0VudGl0eSA9IGZ1bmN0aW9uIG5tY3JlX1JlbmRlck9FbnRpdHkocmVuZGVyTWFuYWdlciwgbW9kZWxCYXNlSW4sIHNoYWRvd1NpemVJbikge1xuICAgICAgICAgICAgcmVuZGVyU3VwZXIodGhpcywgcmVuZGVyTWFuYWdlciwgbW9kZWxCYXNlSW4sIHNoYWRvd1NpemVJbik7XG4gICAgICAgIH07XG4gICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKHJlbmRlckNsYXNzLCBubWNyZV9SZW5kZXJPRW50aXR5KTtcbiAgICAgICAgbm1jcmVfUmVuZGVyT0VudGl0eS5wcm90b3R5cGUuJGdldEVudGl0eVRleHR1cmUgPSBmdW5jdGlvbiAoZW50aXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gZHVja1RleHR1cmVzO1xuICAgICAgICB9O1xuICAgICAgICBubWNyZV9SZW5kZXJPRW50aXR5LnByb3RvdHlwZS4kaGFuZGxlUm90YXRpb25GbG9hdCA9IGZ1bmN0aW9uIChlbnRpdHksIHBhcnRpYWxUaWNrcykge1xuICAgICAgICAgICAgZW50aXR5ID0gTW9kQVBJLnV0aWwud3JhcChlbnRpdHkpO1xuICAgICAgICAgICAgaWYgKCFlbnRpdHkub25Hcm91bmQgJiYgIWVudGl0eS5pc0luV2F0ZXIoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAyOyAvL2ZhbGxpbmdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgSUQgPSBNb2RBUEkua2V5Z2VuLmVudGl0eSh0aGlzLmVudGl0eUlEKTtcbiAgICAgICAgTW9kQVBJLnJlZmxlY3RcbiAgICAgICAgICAgIC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlMaXN0XCIpXG4gICAgICAgICAgICAuc3RhdGljTWV0aG9kcy5hZGRNYXBwaW5nMC5tZXRob2QoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIHtcbiAgICAgICAgICAgICRjcmVhdGVFbnRpdHk6IGZ1bmN0aW9uICgkd29ybGRJbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbm1lX09FbnRpdHkoJHdvcmxkSW4pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSwgTW9kQVBJLnV0aWwuc3RyKHRoaXMuZW50aXR5SUQudG9VcHBlckNhc2UoKSksIElELCB0aGlzLmVnZ0Jhc2UgfHwgMHg1ZTNlMmQsIC8vZWdnIGJhc2VcbiAgICAgICAgdGhpcy5lZ2dTcG90cyB8fCAweDI2OTE2NiAvL2VnZyBzcG90c1xuICAgICAgICApO1xuICAgICAgICB2YXIgU3Bhd25QbGFjZW1lbnRUeXBlID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkuRW50aXR5TGl2aW5nJFNwYXduUGxhY2VtZW50VHlwZVwiKS5zdGF0aWNWYXJpYWJsZXM7XG4gICAgICAgIHZhciBFTlRJVFlfUExBQ0VNRU5UUyA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkuRW50aXR5U3Bhd25QbGFjZW1lbnRSZWdpc3RyeVwiKS5zdGF0aWNWYXJpYWJsZXMuRU5USVRZX1BMQUNFTUVOVFMpO1xuICAgICAgICBFTlRJVFlfUExBQ0VNRU5UUy5wdXQoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIFNwYXduUGxhY2VtZW50VHlwZS5PTl9HUk9VTkQpO1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImJvb3RzdHJhcFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgU3Bhd25MaXN0RW50cnkgPSBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgICAgIC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZSRTcGF3bkxpc3RFbnRyeVwiKVxuICAgICAgICAgICAgICAgIC5jb25zdHJ1Y3RvcnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDQ7IH0pO1xuICAgICAgICAgICAgdmFyIEJpb21lR2VuU3dhbXAgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlXCIpXG4gICAgICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5zd2FtcGxhbmQpO1xuICAgICAgICAgICAgdmFyIEJpb21lR2VuUml2ZXIgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlXCIpXG4gICAgICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5yaXZlcik7XG4gICAgICAgICAgICB2YXIgQmlvbWVHZW5CZWFjaCA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZUdlbkJhc2VcIilcbiAgICAgICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLmJlYWNoKTtcbiAgICAgICAgICAgIHZhciBkdWNrU3Bhd25Td2FtcCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAyMiwgMywgNSk7XG4gICAgICAgICAgICB2YXIgZHVja1NwYXduUml2ZXJCZWQgPSBTcGF3bkxpc3RFbnRyeShNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgMTAsIDUsIDkpO1xuICAgICAgICAgICAgdmFyIGR1Y2tTcGF3bkJlYWNoID0gU3Bhd25MaXN0RW50cnkoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIDI0LCAyLCAzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5tZV9PRW50aXR5KTtcbiAgICAgICAgICAgIEJpb21lR2VuU3dhbXAuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25Td2FtcCk7XG4gICAgICAgICAgICBCaW9tZUdlblJpdmVyLnNwYXduYWJsZUNyZWF0dXJlTGlzdC5hZGQoZHVja1NwYXduUml2ZXJCZWQpO1xuICAgICAgICAgICAgQmlvbWVHZW5CZWFjaC5zcGF3bmFibGVDcmVhdHVyZUxpc3QuYWRkKGR1Y2tTcGF3bkJlYWNoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2lua1wiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgQXN5bmNTaW5rLkwxME4uc2V0KFwiZW50aXR5LlwiLmNvbmNhdCh0aGlzLmVudGl0eUlELnRvVXBwZXJDYXNlKCksIFwiLm5hbWVcIiksIHRoaXMuZW50aXR5TmFtZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pOyB9KTtcbiAgICAgICAgcmV0dXJuIF9hID0ge30sXG4gICAgICAgICAgICBfYVtcIkVudGl0eVwiLmNvbmNhdCh0aGlzLmVudGl0eUlELnRvVXBwZXJDYXNlKCkpXSA9IG5tZV9PRW50aXR5LFxuICAgICAgICAgICAgX2FbXCJNb2RlbFwiLmNvbmNhdCh0aGlzLmVudGl0eUlELnRvVXBwZXJDYXNlKCkpXSA9IG5tY21fT0VudGl0eU1vZGVsLFxuICAgICAgICAgICAgX2FbXCJSZW5kZXJcIi5jb25jYXQodGhpcy5lbnRpdHlJRC50b1VwcGVyQ2FzZSgpKV0gPSBubWNyZV9SZW5kZXJPRW50aXR5LFxuICAgICAgICAgICAgX2FbXCJcIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCJUZXh0dXJlc1wiKV0gPSBkdWNrVGV4dHVyZXMsXG4gICAgICAgICAgICBfYTtcbiAgICB9O1xuICAgIE9FbnRpdHkucHJvdG90eXBlLnJlZ2lzdGVyT0VudGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlckVudGl0eVNlcnZlcihcXFwiXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiXFxcIiwgXFxcIlwiKS5jb25jYXQodGhpcy5lbnRpdHlOYW1lLCBcIlxcXCIsIFxcXCJcIikuY29uY2F0KHRoaXMuZW50aXR5TW9kZWwsIFwiXFxcIiwgXCIpLmNvbmNhdCh0aGlzLmVnZ0Jhc2UsIFwiLCBcIikuY29uY2F0KHRoaXMuZWdnU3BvdHMsIFwiKTtcIikpO1xuICAgICAgICB2YXIgZGF0YSA9IHRoaXMucmVnaXN0ZXJFbnRpdHlDbGllbnQoKTtcbiAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfaykge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2subGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2IgPSAoX2EgPSBBc3luY1NpbmspLnNldEZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYyA9IFtcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvdGV4dHVyZXMvZW50aXR5L1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi5wbmdcIildO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2godGhpcy5lbnRpdHlUZXh0dXJlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFs0IC8qeWllbGQqLywgKF9rLnNlbnQoKSkuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmFwcGx5KF9hLCBfYy5jb25jYXQoW19rLnNlbnQoKV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5oaWRlRmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvdGV4dHVyZXMvZW50aXR5L1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi5wbmcubWNtZXRhXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMud2FpdEZvclJlbmRlck1hbmFnZXIoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9rLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lID0gKF9kID0gQXN5bmNTaW5rKS5zZXRGaWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2YgPSBbXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L3NvdW5kcy9tb2IvXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiL21haW5fc291bmQub2dnXCIpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKFwiXCIuY29uY2F0KHRoaXMuZW50aXR5X3NvdW5kX21haW4pKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFs0IC8qeWllbGQqLywgKF9rLnNlbnQoKSkuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lLmFwcGx5KF9kLCBfZi5jb25jYXQoW19rLnNlbnQoKV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5BdWRpby5yZWdpc3RlcihcIm1vYi5cIiArIHRoaXMuZW50aXR5SUQgKyBcIi5tYWluX3NvdW5kXCIsIEFzeW5jU2luay5BdWRpby5DYXRlZ29yeS5BTklNQUxTLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBcInNvdW5kcy9tb2IvXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiL21haW5fc291bmQub2dnXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXRjaDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9sdW1lOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IGZhbHNlLCAvL3VzZSBmb3IgbGFyZ2UgYXVkaW8gZmlsZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfaCA9IChfZyA9IEFzeW5jU2luaykuc2V0RmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9qID0gW1wicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9zb3VuZHMvbW9iL1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi9zdGVwLm9nZ1wiKV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChcImRhdGE6YXVkaW8vb2dnO2Jhc2U2NCxUMmRuVXdBQ0FBQUFBQUFBQUFBYlBRQUFBQUFBQUxZWldkSUJIZ0YyYjNKaWFYTUFBQUFBQVlBK0FBQUFBQUFBbUlZQkFBQUFBQUNwQVU5bloxTUFBQUFBQUFBQUFBQUFHejBBQUFFQUFBQmZLYk5ZRDVELy8vLy8vLy8vLy8vLy8vLy80QU4yYjNKaWFYTTBBQUFBV0dsd2FDNVBjbWNnYkdsaVZtOXlZbWx6SUVrZ01qQXlNREEzTURRZ0tGSmxaSFZqYVc1bklFVnVkbWx5YjI1dFpXNTBLUUlBQUFBekFBQUFWRWxVVEVVOVZHaGxJRk52YjNSb2FXNW5JRk52ZFc1a2N5QnZaaUJFVlVOTElDTXpJQ2h5ZFc1dWFXNW5JR1IxWTJzcEVRQUFBRUZTVkVsVFZEMXpaVVJWUTB0MGFYWmxBUVYyYjNKaWFYTWtRa05XQVFCQUFBQVlRaEFxQmExampqcklGU0dNR2FLZ1Fzb3B4eDFDMENHakpFT0lPc1kxeHhoalI3bGtpa0xKZ2RDUVZRQUFRQUFBcEJ4WFVISkpMZWVjYzZNWVY4eHg2Q0RubkhQbElHZk1jUWtsNTV4empqbm5rbktPTWVlY2M2TVlWdzV5S1Mzbm5IT0JGRWVLY2FjWTU1eHpwQnhIaW5Hb0dPZWNjMjB4dDVKeXpqbm5uSFBtSUlkU2NxNDE1NXh6cEJobkRuSUxKZWVjYzhZZ1o4eHg2eURubkhPTU5iZlVjczQ1NTV4enpqbm5uSFBPT2VlY2M0d3g1NXh6empubm5ITnVNZWNXYzY0NTU1eHp6am5uSEhQT09lZWNjeUEwWkJVQWtBQUFvS0VvaXVJb0RoQWFzZ29BeUFBQUVFQnhGRWVSRkV1eEhNdlJKQTBJRFZrRkFBQUJBQWdBQUtCSWhxUklpcVZZam1acG5pWjZvaWlhb2lxcnNtbktzaXpMc3V1NkxoQWFzZ29BU0FBQVVGRVV4WEFVQndnTldRVUFaQUFBQ0dBb2lxTTRqdVJZa3FWWm5nZUVocXdDQUlBQUFBUUFBRkFNUjdFVVRmRWt6L0k4ei9NOHovTTh6L004ei9NOHovTTh6L004RFFnTldRVUFJQUFBQUlJb1pCZ0RRa05XQVFCQUFBQUlJUm9aUTUxU0Vsd0tGa0ljRVVNZFFzNURxYVdENENtRkpXUFNVNnhCQ0NGODd6MzMzbnZ2Z2RDUVZRQUFFQUFBWVJRNGlJSEhKQWdoaEdJVUowUnhwaUFJSVlUbEpGaktlZWdrQ04yREVFSzRuSHZMdWZmZWV5QTBaQlVBQUFnQXdDQ0VFRUlJSVlRUVFnZ3BwSlJTU0NtbW1HS0tLY2NjYzh3eHh5Q0RERExvb0pOT09zbWtrazQ2eWlTampsSnJLYlVVVTB5eDVSWmpyYlhXbkhPdlFTbGpqREhHR0dPTU1jWVlZNHd4eGhnakNBMVpCUUNBQUFBUUJobGtrRUVJSVlRVVVrZ3BwcGh5ekRISEhBTkNRMVlCQUlBQUFBSUFBQUFjUlZJa1IzSWtSNUlreVpJc1NaTTh5N004eTdNOFRkUkVUUlZWMVZWdDEvWnRYL1p0MzlWbDMvWmwyOVZsWFpabDNiVnRYZFpkWGRkMVhkZDFYZGQxWGRkMVhkZDFYZGVCMEpCVkFJQUVBSUNPNURpTzVEaU81RWlPcEVnS0VCcXlDZ0NRQVFBUUFJQ2pPSXJqU0k3a1dJNGxXWkltYVpabmVaYW5lWnFvaVI0UUdySUtBQUFFQUJBQUFBQUFBSUNpS0lxak9JNGtXWmFtYVo2bmVxSW9tcXFxaXFhcHFxcHFtcVpwbXFacG1xWnBtcVpwbXFacG1xWnBtcVpwbXFacG1xWnBtcVpwbXFacEFxRWhxd0FBQ1FBQUhjZHhIRWR4SE1keEpFZVNKQ0EwWkJVQUlBTUFJQUFBUTFFY1JYSXN4NUkwUzdNOHk5TkV6L1JjVVRaMVUxZHRJRFJrRlFBQUNBQWdBQUFBQUFBQXgzTTh4M004eVpNOHkzTTh4NU04U2RNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUUU5DUTFZQ0FHUUFBQnpGbUh0U1Nxbk9RVWd4SjJjN3hoeTBtSnNPRlVKTVdpMDJaSWdZSnEzSDBpbENrS09hU3NpUU1ZcHFLYVZUQ0NtcHBaVFFNY2FrcHRaYUtxVzBIZ2dOV1JFQVJBRUFBQWdoeGhCamlERUdJWU1RTWNZZ2RCQWl4aHlFREVJR0laUVVTc2tnaEJKQ1NaRmpERUlISVlNUVVnbWhaQkJDS1NHVkFnQUFBaHdBQUFJc2hFSkRWZ1FBY1FJQUNFTE9JY1lnUkl4QkNDV2tGRUpJS1dJTVF1YWNsTXc1S2FXVTFrSXBxVVdNUWNpY2s1STVKeVdVMGxJcHBiVlFTbXVsbE5aQ0thMjExbXBOcmNVYVNta3RsTkphS2FXMTFGcU5yYlVhSThZZ1pNNUp5WnlUVWtwcHJaVFNXdVljbFE1Q1NoMkVsRXBLTFphVVdzeWNrOUpCUjZXRGtGSkpKYmFTVW93bGxkaEtTakdXbEdKc0xjYmFZcXcxbE5KYVNTVzJrbEtNTGJZYVc0dzFSNHhCeVp5VGtqa25wWlRTV2ltcHRjdzVLUjJFbERvSEpaV1VZaXdsdFpnNUo2V0RrRklISWFXU1Vtd2xwZGhDS2EyVmxHSXNKYlhZWXN5MXRkaHFLS25Ga2xLTUphVVlXNHkxdHRocTdLUzBGbEtKTFpUU1lvdXgxdFphcmFHVUdFdEtNWmFVWW93eDF0eGlyRG1VMG1KSkpjYVNVb3N0dGx4YmpEV24xbkp0TGRiY1lzdzF4bHg3cmJYbjFGcXRxYlZhVzR3MXh4cHpyTFhtM2tGcExaUVNXeWlweGRaYXJTM0dXa01wc1pXVVlpd2x4ZGhpekxXMVdITW9KY2FTVW93bHBSaGJqTFhHR0hOT3JkWFlZc3cxdFZacnJiWG5HR3ZzcWJWYVc0dzF0OWhxcmJYMlhuUHN0UUFBZ0FFSEFJQUFFOHBBb1NFckFZQW9BQURDR0tVWWc5QWdwSlJqRUJxRWxHSU9RcVVVWTg1SnFaUml6RGtwbVdQT1FVZ2xZODQ1Q0NXRkVFcEpKYVVRUWlrbHBWUUFBRUNCQXdCQWdBMmFFb3NERkJxeUVnQUlDUUFnRUZLS01lY2dsSkpTU2hGQ1REa0dJWVJTVW1vdFFrZ3A1aHlFVUVwS3JWVk1NZVljaEJCS1NhbTFTakhHbklNUVFpa3B0Wlk1NXh5RUVFcEpLYVhXTXVhY2d4QkNLU21sMUZvSElZUVFTaWtscGRaYTZ5Q0VFRUlwcGFUVVdtc2hoQkJLS2FXa2xGcUxNWVFRUWltbHBKSlNhekdXVWtwSkthV1VVbXN0eGxKS0tTbWxsRkpMcmNXWVVrb3BwZFphYXkzR0dGTktLYVhVV211eHhSaGphcTIxMWxxTE1jWVlhMDJ0dGRaYWl6SEdHR090QlFBQUhEZ0FBQVFZUVNjWlZSWmhvd2tYSG9CQ1ExWUVBRkVBQUlBeGlESEVHSEtPUWNpZ1JNNHhDWm1FeURsSHBaT1NTUW1obGRZeUthR1ZrbHJrbkpQU1VjcW9sSlpDYVptazBscG9vUUFBc0FNSEFMQURDNkhRa0pVQVFCNEFBSUdRVW93NTV4eFNpakhHbkhNT0thVVlZODQ1cHhoanpEbm5uRk9NTWVhY2M4NHh4cHh6empubkdHUE9PZWVjYzg0NTU1eHpEa0xubkhQT09RZWhjODQ1NXlDRTBEbm5uSE1RUWlnQUFLakFBUUFnd0VhUnpRbEdnZ29OV1FrQXBBSUFBTWd3NXB4elVsSnFsR0lNUWdpbHBOUW94UmlFRUVwSktYTU9RZ2lscE5SYXhoaDBFa3BKcWJVT1FpaWxwTlJhakIyRUVrcEpxYlVZT3dpbHBKUlNhekYyRUVwSnFhWFdZaXlscE5SYWF6SFdXa3BKcWJYV1lxdzFwZFJhakRIV1dtdEtxYlVZWTZ5MTFnSUF3Qk1jQUlBS2JGZ2Q0YVJvTExEUWtKVUFRQVlBd0JBQXdBRUFBQU1PQUFBQkpwU0JRa05XQWdDcEFBQ0FNWXc1NXh5RVVocWxuSU1RUWltcE5FbzVCeUdFVWxMS25KTlFTaWtwdFpZNUo2V1VVbEpxcllOUVNrb3B0UlpqQjZHVWxGSnFMY1lPUWlvcHRSWmpqUjJFVWxKcUxjWVlReWtwdFJaampMV0dVbEpxTGNZWWF5MHB0UlpqamJYbVdsSnFMY1lhYTgyMUFBQ0VCZ2NBc0FNYlZrYzRLUm9MTERSa0pRQ1FCd0JBSU1RWVk0dzVoNVJpakRIbm5FTktNY2FZYzg0eHhoaHp6am5uR0dPTU9lZWNjNHd4NTV4enpqbkdtSFBPT2VjY2M4NDU1NXh6ampubm5IUE9PZWVjYzg0NTU1eHp6am5ubkhQT0NRQUFLbkFBQUFpd1VXUnpncEdnUWtOV0FnRGhBQUNBTVl3NXh4aDBFbEpxbUlJT1FnZ2xwTkJDbzVoekVFSW9wYVRVTXVpa3BGUktTcTNGbGprbnBhUlNVa3F0eFE1Q1NpbWwxRnFNTVhZUVVrb3BwZFppakxXRFVFcEtMY1ZZWTYwZGhGSlNhcTIxR0dzTnBhVFVXbXd4MXBwektDV2wxbHFNc2RhYVMwcXR4VmhqcmJubVhGSnFMYlpZYTYwMTU5UmFqREhXbW12T3ZhZldZb3l4MXBwejdyMEFBSk1IQndDb0JCdG5XRWs2S3h3TkxqUmtKUUNRR3dDQUlNU1ljODVCQ0NHRUVFSUlJVktLTWVjZ2hCQkNDQ0dVVWtxa0ZHUE9RUWdoaEJCQ0NDR0VqREhub0lNUVFnaWxsRkpLS1JsanprRUlJWVFRU2lpbGhCSTY1NkNERUVJSnBaUlNTaW1sZE00NUNDR0VFRW9wcFpSU1N1a2doQkJDQ0tXVVVrb3BwWlRTUVFnaGhGQktLYVdVVWtvcEpZUVFRZ2lsbEZKS0thV1VVa29JSVlRUVNpbWxsRkpLS2FXVUVFSUlwWlJTU2ltbGxGSktLU0dFRUVvcHBaUlNTaW1sbEZKQ0NLV1VVa29wcFpSU1NpbWxoQkJLS2FXVVVrb3BwWlJTU2dtaGxGSktLYVdVVWtvcHBaUVNTaW1sbEZKS0thV1VVa29wSlpSU1NpbWxsRkpLS2FXVVVrb29wWlJTU2ltbGxGSktLYVdVVUVvcHBaUlNTaW1sbEZKS0thR1VVa29wcFpSU1NpbWxsRklLQUFBNmNBQUFDRENpMGtMc05PUEtJM0JFSWNNRVZHaklTZ0FnSEFBQVFBUTZDQ0dFRUVJSUVYTVFRZ2doaEJCQ2lKaURFRUlJSVlRUVFnZ2hoQkJDQ0tXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVVVQUhXWjRRQVlQV0hqREN0Slo0V2p3WVdHckFRQTBnSUFBR01ZWTR3cHlLU3pGbU90RFdNUVFnZWRoQlJxcUNXbWhqRUlJWFJRU2tvdHRsaHpCcUdrVWtwSkxjWllnODA5ZzFCS0thV2tGbU90T1JmalFVZ2xwZFJpcTdYbkhJenVJSlNTVWtveDFwcHo3cjFvMEVsSnFiVmFjKzQ5QjE4OENLV2sxbHFNUFFjZmpEQ2lsSlppckxIV0hId1JSaGhSU2tzdHhwcDd6YjBZWTRSS0tjWmFlODY1NTF5TUVUNmxGbU91dWZjZWZDN0MrT0ppekRuMzRvTVBQZ2hoakpBeDV0aHo4TDBYWTR3UHdzaGNjeTdDR09PTE1NTDRJR3l0dVFkZmpCRkdHR044N3pYNG9Ic3h3Z2dqakRIQ0NOMXowVVg0WW93eFJoaGZoQUVBdVJFT0FJZ0xSaEpTWnhsV0duSGpDUmdpa0VKRFZnRUFNUUFBQkRIR0lLU1FVa29weFJoampESEdHR09NTWNZWVk0d3h4cHhqempubm5BQUF3QVFIQUlBQUs5aVZXVnExVWR6VVNWNzBRZUFUT21Jek11UlNLbVp5SXVpUkdtcXhFdXpRQ203d0FyRFFrSlVBQUJrQUFPU2tsSlJhTFJwQ3lrRnBOWWpJSU9Va3hTUWlZNUNDMG9LbmtER0lTY29kWXdvaEJhbDIwREdGRktNYVVncVpVZ3BxcWptR2pqR29NU2ZoVWdtbEJnQUFRQkFBSUNBa0FNQUFRY0VNQURBNFFCZzVFT2dJSUhCb0F3QU1STWhNWUZBSURRNHlBZUFCSWtJcUFFaE1VSlF1ZEVFSUVhU0xJSXNITHB5NDhjUU5KM1JvZ3dBQUFBQUFnQUNBRHdDQWhBS0lpR1ptcnNMaUFpTkRZNE9qdytNREpFUmtKQUFBQUFBQVFBRGdBd0FnSVFFaW9wbVpxN0M0d01qUTJPRG84UGdBQ1JFWkNRQUFBQUFBQUFBQUFBSUNBZ0FBQUFBQUFRQUFBQUlDVDJkblV3QUVoZ3dBQUFBQUFBQWJQUUFBQWdBQUFEZWoxYjhMdWJ1Nyt2THRmcTNDQVFIVXBqNG96Yno3VXZmMHJsQkZNa1QzcnM5alo3Qi9IYTYwa2JlVDVkeC9qS0hEclB0aFhkMTB5UDJpNTkrNzdZZDc3WTgvS1pYS1UvcGNoZkJ0TFZJdGgwaGVxMlVQeTJGWnYxTTczN3lzd25yTjViQkVuOSs2dWJ2SmE3U1lJWU11SkxsTmNhYW9jb0wvZCt3aGZPc3F5NTFmcjlRTmovTDA0SlVTN3MrZXkyQWxsTjR6MTFjemNkcGE4cDNPSDF2UHNadjgzNXlZTHZ5ZUxzVVIyK3J0KzNhMThyTmJrV09PcC9lUmQ1ZGp4WlNTN3E1VFdpN2pMZXl5alJHTGV3NkhqODNYcnlIWGRXLzAwdHZvSlJHaWg2ZVA3QVcvUnhlZ0xKekw4bVVlMi9UUi91bkRpM2RtdWRwMjB2blQ3aDhjbW5RM0VxcTEybFRybnQ5MnRROXoyZkhpL2N2RHZQWjBodEsxcjNzdisvRVBuWHFVWUNrUmRGU3lPSHVzUEsyMXRXREFQYVZQNWE0dDlCTS8xODZMc25vdmtmN3pJWmRQWHo0ZlBscHU3RExsbFhtVjJZZTJHeDdYbGRQei9jZjljZUY1bWJuYWx0dW43WXB3L3dzblZucEM2RFltSXBzbmJPL2JObnNlYmhkN0FRRHNLSlA3N2ptY3VQbFR2WVRnc24rMFJzcG5wME9vTm4wK21ObVU5M2ZmTUhZN2FrTDAzTHYzeDU1T3ZqaTJ1YXpIYmxaaGZWbEk2cytzTzRkR2VWNXJhdW13SEk3dUx4OHFZTmRlZDg3cHlIcmZkdlRuZm5YNGRUK0lEOStuV0QrekFwbTZIL3ZLa2J1ZUxialFVdndpaEtxSFdtcHBlZjlmL1Y0OCsxbkw2L1lYZk9aVy93dmRxS09tQzMrZHI2Nll1MVZzdmlRT3Z1T2owOWQ3ejYzVGlYSzYrT1JUNHE0VVY4N0wzWGlpY2FsYVBYS01ieXdWdTQwQTJrYUxDQUFBSEUvdFkrc3ZqejEyK2xkalJTUjJQOWRiVnRiUXdzU0F4Wmx5WDZ1bHpTNEk0YjdMb3FDNmREWGxhWTN3MzdHcDZYbjhTZVhINWV4NVV1aVUxVzYzbFkzYldiWGNZeWY5enF2S2VXejc4L1RmVVp2ODFtdmw2NitjYWg3b2lQZTFuZmtsL2JiQ09meTMyMC90SkVrbys5cGh4WGJwVzZuNy9tSm50c3ZOSS80dnZaazhqQVRhZVlwWE9ENUJ2UXhicld4em05RDZSYVhFaUJFZXhzbXR1V3E1UVF4bDA1MlN5OU93T0YyRkoxejJXNkhaVUo4S1phSXZTeExUcmpydGxibEZxWFRqL3VzWDZJd1hlZFNSVGIyTzI3bWVDdkY0KzdIZ2I4ZCszMWZCcEU3VG5qcmFmTXRTYmY3Nmw4dmdxd0VBQUo3bXlnd29EUTFTTjlka3h3LzZzZVBaUzFXVnJocHR6VC9ORnUxcTNxek1YMU96MDZ0c1ZncFZ6LzNWbi92SnowdytWSHZXM2ErQ1p2Um54MHpBMkVOQ3I5bnpzbDkrcjczNXd2UHJBMzhwT0JxT0JPMTU5SVNlYll6bTFWSWw3dGRkY3NVMGNuUWlrTVRWNTR1aENIaSs5aWRQWlIxaGZMVnRFTkx3Y25NcmlQdEZXTnBtSWNwNjkvZUVaOTVNY2ZQaXhybFozWUE5VjVSY01kZFRqY3lEY0lOVi96NWpQVmpiTG9lUEN1TkovbW9GbTF6WXJhcjNzVzNzbnp1MHdYK0tLcFJQV09TRGJkU0VaVjdIRW5mZWhuRXh5bU45N1N0bHVTNC85WDN6ZWI1Z3J6SzVXNFNWQlRhczF5Z0dCd0FBTmhhTEJNQUJHQjB4QlYyT29tL3ZqNzN3c1p0YWxLQW91MVF2NEttc2l2T2ZOYU1kRkczZlZlWEFJMTBVMW01bmhPYTdXK2VuUzJsZXFMdE5zcUkwTExiVVo1ZWxxVncwdGVFS0JiMnR1V0tUTEJmYlRWNmZybnpoMGZ6NjVmZTliejQvZVpBYlBHaG1Lc2QvMzhheTgvMVpFZForV1BjblZ1dlNGUTBpamFJaTExOU54cEpPVXhuMjEzeWpOSWFFZFRHZGhrTExoMzI2TVB2Ri92dWFJRjNqZVFQZUptVmUzamN3ZXR1dys3bGQ3M0JaM1Iwdi9kTFRwN3c2UjFubWJiajRRODB5OCtUUG84YWRiV3l1OGtBaW83aTViSDA1N1o4cHh1bXBVdGdXKy90TzUvQkcrS0RETEFBQXpDaFRMM1IwNmZCMHkwK0pKb2hxcCtTaXAyRDg1akdKSmI2SFhnZmZnNjlqWEZORWx0ZFRQbHpFMWJvL2J6ZC9yK2Vac0hubHRIeDFzY1RabjhpYlRVbEY3c3QrZVNwdjN4dThHdTlNY29Pb2lOMXU3c2ZQemJFdVRvZmpuZjZ3VmxaOWF0WE9lYjdVZjlMY3ptMWVuOS95eUtKQzdHOCtkVGx6bkFRQTNDUmh3UngyaE0xbm5WVTUxWVorSHVOcGk1eU8zYm1HelJvemVXcm4vWTV5Vmc5YkZBdjJybmg5Y055clRrSTJENjVWek9OMXlsaVRhOVZ6L2RLNTJla0o2MmFZVWlRdzlwWGN6Z3BCeTd6YW5JMGxDcGJHYS9iNnIrN1pzdlhzMEw0ZS84OEt4dVcwU2kxemxWMC9YVXRIOVc5MU0vS01xemVjbnBQdDBlSjlJWEgrMHJSMS81ZjdmRjJMZXZzcG8vbmV2NGVEdGUydVRuTGFGdG1ublpSUWN6bExkTnE1bGxRUEJRQ2tpdWptbytucmJvOCtGVTg4Mnk5OCtoQTlmVmhYSDkrNzBHN25jZS8vK2NMeC9jdlY3Ny8zd3BQdlg2NCt2cmNMcTkrL3ZIQjhDKzMrNVFYSGMrTFpmdUhUaCtpcEQyN2lIdjJ5SDN0NnVmcjlkeGNPRWdUT1BHSFBrMG1Ndko3U1g3ZlgrdFhQK3hOVHo3dFZ4ejQwZTlwakRWKzgzSG1lSytQTnRTMnZTcCtPbXoyVnhzRDcrRno0ZXcrNlM4cG8rOVpaejZqN2VYL2YrekpidnVRNHVwOTYxRmNXRmMvZFpkanpycSszblYrN3Q3N2Q4M3JSdGVOZC9lWGF1RzBrQUFvT1wiKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFs0IC8qeWllbGQqLywgKF9rLnNlbnQoKSkuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9oLmFwcGx5KF9nLCBfai5jb25jYXQoW19rLnNlbnQoKV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5BdWRpby5yZWdpc3RlcihcIm1vYi5cIiArIHRoaXMuZW50aXR5SUQgKyBcIi5zdGVwXCIsIEFzeW5jU2luay5BdWRpby5DYXRlZ29yeS5BTklNQUxTLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBcInNvdW5kcy9tb2IvXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiL3N0ZXAub2dnXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXRjaDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9sdW1lOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IGZhbHNlLCAvL3VzZSBmb3IgbGFyZ2UgYXVkaW8gZmlsZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkubWMucmVuZGVyTWFuYWdlci5lbnRpdHlSZW5kZXJNYXAucHV0KE1vZEFQSS51dGlsLmFzQ2xhc3MoZGF0YVtcIkVudGl0eVwiLmNvbmNhdCh0aGlzLmVudGl0eUlELnRvVXBwZXJDYXNlKCkpXSksIG5ldyBkYXRhW1wiUmVuZGVyXCIuY29uY2F0KHRoaXMuZW50aXR5SUQudG9VcHBlckNhc2UoKSldKE1vZEFQSS5tYy5yZW5kZXJNYW5hZ2VyLmdldFJlZigpLCBuZXcgZGF0YVtcIk1vZGVsXCIuY29uY2F0KHRoaXMuZW50aXR5SUQudG9VcHBlckNhc2UoKSldKCksIDAuMykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLnByb21pc2lmeShNb2RBUEkubWMucmVuZGVyRW5naW5lLmJpbmRUZXh0dXJlKShkYXRhW1wiXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiVGV4dHVyZXNcIildKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvYWRlZCBPRW50aXR5IHRleHR1cmUgaW50byBjYWNoZS5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7IH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgdmFyIGtleSA9IFwiT0VudGl0eS5cIi5jb25jYXQodGhpcy5lbnRpdHlJRCk7XG4gICAgICAgIGdsb2JhbFRoaXNba2V5XSA9IGRhdGE7XG4gICAgfTtcbiAgICBPRW50aXR5LnByb3RvdHlwZS5jcmVhdGVTcGF3bmVnZyA9IGZ1bmN0aW9uICh0ZXh0dXJlKSB7XG4gICAgICAgIGlmICghdGV4dHVyZSkge1xuICAgICAgICAgICAgdGV4dHVyZSA9IFwidGV4dHVyZXMvZW50aXR5L1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi5wbmdcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwiU3Bhd24gZWdncyBhcmUgYnVpbHQgaW4hXCIpO1xuICAgICAgICB2YXIgc3Bhd25FZ2cgPSBuZXcgT0l0ZW0oXCJTcGF3biBcIi5jb25jYXQodGhpcy5lbnRpdHlOYW1lKSwgXCJzcGF3bmVnZ19cIi5jb25jYXQodGhpcy5lbnRpdHlJRCksIDY0LCB0ZXh0dXJlLCBmdW5jdGlvbiAoKSB7IH0sIGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIsICQkYmxvY2twb3MpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCQkYmxvY2twb3MpO1xuICAgICAgICAgICAgdmFyIHNwYXduX3ggPSAkJGJsb2NrcG9zLiR4O1xuICAgICAgICAgICAgdmFyIHNwYXduX3kgPSAkJGJsb2NrcG9zLiR5ICsgMTtcbiAgICAgICAgICAgIHZhciBzcGF3bl96ID0gJCRibG9ja3Bvcy4kejtcbiAgICAgICAgICAgIE92ZW5NREtfX2V4ZWN1dGVDb21tYW5kQXMoJCRwbGF5ZXIsIFwiL3N1bW1vbiBFeGFtcGxlT0VudGl0eSBcIi5jb25jYXQoc3Bhd25feCwgXCIgXCIpLmNvbmNhdChzcGF3bl95LCBcIiBcIikuY29uY2F0KHNwYXduX3opLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNwYXduRWdnLnJlZ2lzdGVySXRlbSgpO1xuICAgICAgICByZXR1cm4gc3Bhd25FZ2c7XG4gICAgfTtcbiAgICByZXR1cm4gT0VudGl0eTtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBPRW50aXR5O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xuICAgIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbi8qXG4gIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cbiAgT0l0ZW0udHNcbiAgICBcbiAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xudmFyIE9JdGVtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9JdGVtKGl0ZW1OYW1lLCBpdGVtSUQsIGl0ZW1TdGFjaywgdGV4dHVyZSwgb25SaWdodENsaWNrLCBvbkl0ZW1Vc2UpIHtcbiAgICAgICAgdGhpcy5pdGVtTmFtZSA9IGl0ZW1OYW1lO1xuICAgICAgICB0aGlzLml0ZW1JRCA9IGl0ZW1JRDtcbiAgICAgICAgdGhpcy5pdGVtU3RhY2sgPSBpdGVtU3RhY2s7XG4gICAgICAgIHRoaXMuaXRlbVRleHR1cmUgPSB0ZXh0dXJlO1xuICAgICAgICB0aGlzLm9uUmlnaHRDbGljayA9IG9uUmlnaHRDbGljaztcbiAgICAgICAgLy8gQXNzaWduIG9wdGlvbmFsIG9uSXRlbVVzZSBpZiBwcm92aWRlZFxuICAgICAgICBpZiAob25JdGVtVXNlKVxuICAgICAgICAgICAgdGhpcy5vbkl0ZW1Vc2UgPSBvbkl0ZW1Vc2U7XG4gICAgfVxuICAgIE9JdGVtLnByb3RvdHlwZS5yZWdpc3RlckNsaWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyICQkaXRlbUdldEF0dHJpYnV0ZXMgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKS5tZXRob2RzLmdldEl0ZW1BdHRyaWJ1dGVNb2RpZmllcnMubWV0aG9kO1xuICAgICAgICB2YXIgY3JlYXRpdmVNaXNjVGFiO1xuICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIGNyZWF0aXZlTWlzY1RhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy5NSVNDO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3JlYXRpdmVNaXNjVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLnRhYk1pc2M7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGl0ZW1DbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpO1xuICAgICAgICB2YXIgaXRlbVN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoaXRlbUNsYXNzLCBmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuLmxlbmd0aCA9PT0gMTsgfSk7XG4gICAgICAgIHZhciBpdGVtU3RhY2sgPSB0aGlzLml0ZW1TdGFjaztcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBmdW5jdGlvbiBubWlfT3Zlbkl0ZW0oKSB7XG4gICAgICAgICAgICBpdGVtU3VwZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLiRzZXRDcmVhdGl2ZVRhYihjcmVhdGl2ZU1pc2NUYWIpO1xuICAgICAgICAgICAgdGhpcy4kbWF4U3RhY2tTaXplID0gKGl0ZW1TdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2soaXRlbUNsYXNzLCBubWlfT3Zlbkl0ZW0pO1xuICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1SaWdodENsaWNrID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcikge1xuICAgICAgICAgICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpXG4gICAgICAgICAgICAgICAgICAgICgkJHBsYXllcikuJHNldEl0ZW1JblVzZSgkJGl0ZW1zdGFjaywgMzIpO1xuICAgICAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXI7XG4gICAgICAgICAgICAgICAgc2VsZi5vblJpZ2h0Q2xpY2soJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWVudCBpdGVtc3RhY2s6XCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgO1xuICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIHZhciAkJFJlc3VsdEVudW0gPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkVudW1BY3Rpb25SZXN1bHRcIikuc3RhdGljVmFyaWFibGVzO1xuICAgICAgICAgICAgdmFyICQkQWN0aW9uUmVzdWx0ID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJBY3Rpb25SZXN1bHRcIikuY29uc3RydWN0b3JzWzBdO1xuICAgICAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtUmlnaHRDbGljayA9IGZ1bmN0aW9uICgkJHdvcmxkLCAkJHBsYXllciwgJGhhbmRFbnVtLCAkdW51c2VkKSB7XG4gICAgICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrID0gKCQkcGxheWVyKS4kZ2V0SGVsZEl0ZW0oJGhhbmRFbnVtKTtcbiAgICAgICAgICAgICAgICAoJCRwbGF5ZXIpLiRzZXRBY3RpdmVIYW5kKCRoYW5kRW51bSk7XG4gICAgICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcjtcbiAgICAgICAgICAgICAgICBzZWxmLm9uUmlnaHRDbGljaygkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpZW50IGl0ZW1zdGFjazpcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJCRpdGVtc3RhY2spO1xuICAgICAgICAgICAgICAgIHJldHVybiAoJCRBY3Rpb25SZXN1bHQoJCRSZXN1bHRFbnVtLlNVQ0NFU1MsICQkaXRlbXN0YWNrKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVVzZTAgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkcGxheWVyLCAkJHdvcmxkLCAkJGJsb2NrcG9zKSB7XG4gICAgICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRibG9ja3BvcztcbiAgICAgICAgICAgICAgICBzZWxmLm9uSXRlbVVzZSgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIsICQkYmxvY2twb3MpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpZW50IGl0ZW1zdGFjazpcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJCRpdGVtc3RhY2spO1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICA7XG4gICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgdmFyICQkUmVzdWx0RW51bSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiRW51bUFjdGlvblJlc3VsdFwiKS5zdGF0aWNWYXJpYWJsZXM7XG4gICAgICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1Vc2UgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkcGxheWVyLCAkJHdvcmxkLCAkJGJsb2NrcG9zKSB7XG4gICAgICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHBsYXllciwgJCR3b3JsZCwgJCRibG9ja3BvcztcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vbkl0ZW1Vc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vbkl0ZW1Vc2UoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGJsb2NrcG9zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkUmVzdWx0RW51bS5QQVNTO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvblVwZGF0ZSA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIsICQkaG90YmFyX3Nsb3QsICQkaXNfaGVsZCkge1xuICAgICAgICAgICAgJCRpc19oZWxkID0gKCQkaXNfaGVsZCkgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtVXNlRmluaXNoID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcikge1xuICAgICAgICAgICAgcmV0dXJuICgkJGl0ZW1zdGFjayk7XG4gICAgICAgIH07XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldE1heEl0ZW1Vc2VEdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAzMjtcbiAgICAgICAgfTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kZ2V0SXRlbUF0dHJpYnV0ZU1vZGlmaWVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkJGF0dHJpYnV0ZW1hcCA9ICQkaXRlbUdldEF0dHJpYnV0ZXMuYXBwbHkodGhpcywgW10pO1xuICAgICAgICAgICAgcmV0dXJuICQkYXR0cmlidXRlbWFwO1xuICAgICAgICB9O1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRnZXRTdHJWc0Jsb2NrID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJGJsb2NrKSB7XG4gICAgICAgICAgICByZXR1cm4gMS4wO1xuICAgICAgICB9O1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkNyZWF0ZWQgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uQmxvY2tEZXN0cm95ZWQgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkYmxvY2ssICQkYmxvY2twb3MsICQkZW50aXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGludGVybmFsX3JlZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpdGVtSW5zdGFuY2UgPSBuZXcgbm1pX092ZW5JdGVtKCkuJHNldFVubG9jYWxpemVkTmFtZShNb2RBUEkudXRpbC5zdHIoX3RoaXMuaXRlbUlEKSk7XG4gICAgICAgICAgICBpdGVtQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3Rlckl0ZW0ubWV0aG9kKE1vZEFQSS5rZXlnZW4uaXRlbShfdGhpcy5pdGVtSUQpLCBNb2RBUEkudXRpbC5zdHIoX3RoaXMuaXRlbUlEKSwgaXRlbUluc3RhbmNlKTtcbiAgICAgICAgICAgIE1vZEFQSS5pdGVtc1tcIlwiLmNvbmNhdChzZWxmLml0ZW1JRCldID0gaXRlbUluc3RhbmNlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbUluc3RhbmNlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXJlZCBPdmVuTURLIGl0ZW0gKCBjbGllbnQgc2lkZSApXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1JbnN0YW5jZTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKE1vZEFQSS5pdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIGludGVybmFsX3JlZygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJib290c3RyYXBcIiwgaW50ZXJuYWxfcmVnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT0l0ZW0ucHJvdG90eXBlLnJlZ2lzdGVySXRlbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNlbGYsIGN1c3RvbV9pdGVtO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBjdXN0b21faXRlbSA9IG5ldyBPSXRlbSh0aGlzLml0ZW1OYW1lLCB0aGlzLml0ZW1JRCwgdGhpcy5pdGVtU3RhY2ssIHRoaXMuaXRlbVRleHR1cmUsIHRoaXMub25SaWdodENsaWNrLCB0aGlzLm9uSXRlbVVzZSkucmVnaXN0ZXJDbGllbnQoKTtcbiAgICAgICAgICAgICAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVySXRlbShcXFwiXCIuY29uY2F0KHRoaXMuaXRlbUlELCBcIlxcXCIsIFwiKS5jb25jYXQodGhpcy5pdGVtU3RhY2ssIFwiLCBcIikuY29uY2F0KHRoaXMub25SaWdodENsaWNrLCBcIiwgXCIpLmNvbmNhdCh0aGlzLm9uSXRlbVVzZSwgXCIpO1wiKSk7XG4gICAgICAgICAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2lua1wiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UsIGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2luazpyZWdpc3Rlcml0ZW1zXCIsIGZ1bmN0aW9uIChyZW5kZXJJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVySXRlbS5yZWdpc3Rlckl0ZW0oY3VzdG9tX2l0ZW0sIE1vZEFQSS51dGlsLnN0cihcIlwiLmNvbmNhdChzZWxmLml0ZW1JRCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLkwxME4uc2V0KFwiaXRlbS5cIi5jb25jYXQoc2VsZi5pdGVtSUQsIFwiLm5hbWVcIiksIFwiXCIuY29uY2F0KHNlbGYuaXRlbU5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9tb2RlbHMvaXRlbS9cIi5jb25jYXQoc2VsZi5pdGVtSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmVudFwiOiBcIml0ZW0vZ2VuZXJhdGVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0dXJlc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGF5ZXIwXCI6IFwiaXRlbXMvXCIuY29uY2F0KHRoaXMuaXRlbUlEKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHNlbGYuaXRlbVRleHR1cmUpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L3RleHR1cmVzL2l0ZW1zL1wiICsgc2VsZi5pdGVtSUQgKyBcIi5wbmdcIiwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2lua1wiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UsIGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2luazpyZWdpc3Rlcml0ZW1zXCIsIGZ1bmN0aW9uIChyZW5kZXJJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVySXRlbS5yZWdpc3Rlckl0ZW0oY3VzdG9tX2l0ZW0sIE1vZEFQSS51dGlsLnN0cihzZWxmLml0ZW1JRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuTDEwTi5zZXQoXCJpdGVtLlwiLmNvbmNhdChzZWxmLml0ZW1JRCwgXCIubmFtZVwiKSwgc2VsZi5pdGVtTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvbW9kZWxzL2l0ZW0vXCIuY29uY2F0KHNlbGYuaXRlbUlELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJlbnRcIjogXCJidWlsdGluL2dlbmVyYXRlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dHVyZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxheWVyMFwiOiBcIml0ZW1zL1wiLmNvbmNhdChzZWxmLml0ZW1JRClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGhpcmRwZXJzb25fcmlnaHRoYW5kXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjogWzAsIC05MCwgNTVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGlvblwiOiBbMCwgNCwgMC41XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2NhbGVcIjogWzAuODUsIDAuODUsIDAuODVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGhpcmRwZXJzb25fbGVmdGhhbmRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOiBbMCwgOTAsIC01NV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0aW9uXCI6IFswLCA0LCAwLjVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzY2FsZVwiOiBbMC44NSwgMC44NSwgMC44NV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmaXJzdHBlcnNvbl9yaWdodGhhbmRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOiBbMCwgLTkwLCAyNV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0aW9uXCI6IFsxLjEzLCAzLjIsIDEuMTNdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzY2FsZVwiOiBbMC42OCwgMC42OCwgMC42OF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmaXJzdHBlcnNvbl9sZWZ0aGFuZFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6IFswLCA5MCwgLTI1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRpb25cIjogWzEuMTMsIDMuMiwgMS4xM10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNjYWxlXCI6IFswLjY4LCAwLjY4LCAwLjY4XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goc2VsZi5pdGVtVGV4dHVyZSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvdGV4dHVyZXMvaXRlbXMvXCIuY29uY2F0KHNlbGYuaXRlbUlELCBcIi5wbmdcIiksIGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIE9JdGVtO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE9JdGVtO1xuIiwiLypcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4gICAgT3Zlbi50c1xuICAgIFxuICAgIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xudmFyIE92ZW4gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT3ZlbigpIHtcbiAgICB9XG4gICAgT3Zlbi5yZWdpc3Rlck1vZCA9IGZ1bmN0aW9uIChtb2RDbGFzcykge1xuICAgICAgICBNb2RBUEkubWV0YS50aXRsZShtb2RDbGFzcy50aXRsZSk7XG4gICAgICAgIE1vZEFQSS5tZXRhLnZlcnNpb24obW9kQ2xhc3MudmVyc2lvbik7XG4gICAgICAgIE1vZEFQSS5tZXRhLmRlc2NyaXB0aW9uKG1vZENsYXNzLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgTW9kQVBJLm1ldGEuY3JlZGl0cyhtb2RDbGFzcy5jcmVkaXRzKTtcbiAgICAgICAgTW9kQVBJLm1ldGEuaWNvbihtb2RDbGFzcy5pY29uKTtcbiAgICAgICAgTW9kQVBJLm1ldGEuY29uZmlnKG1vZENsYXNzLmNvbmZpZygpKTtcbiAgICAgICAgbW9kQ2xhc3MuaW5pdCgpO1xuICAgICAgICBnbG9iYWxUaGlzLkRlYnVnX21vZGUgPSBtb2RDbGFzcy5EZWJ1Z19tb2RlO1xuICAgICAgICAvKmlmIChtb2RDbGFzcy5vbmx5XzFfMTJfMiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIElsbCBkbyBzb21lIG1vcmUgc3R1ZmYgbGF0ZXJcbiAgICAgICAgfSovXG4gICAgICAgIHRoaXMubW9kcy5wdXNoKG1vZENsYXNzKTtcbiAgICB9O1xuICAgIE92ZW4ubW9kcyA9IFtdO1xuICAgIE92ZW4udXRpbCA9IHtcbiAgICAgICAgb2dndG9CYXNlNjRzdHJpbmc6IGZ1bmN0aW9uIChvZ2cpIHtcbiAgICAgICAgICAgIHZhciBiYXNlNjQgPSBidG9hKG5ldyBVaW50OEFycmF5KG9nZy5zcGxpdChcIixcIikubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiBwYXJzZUludCh4LCAxMCk7IH0pKS5yZWR1Y2UoZnVuY3Rpb24gKGRhdGEsIGJ5dGUpIHsgcmV0dXJuIGRhdGEgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGUpOyB9LCBcIlwiKSk7XG4gICAgICAgICAgICByZXR1cm4gYmFzZTY0O1xuICAgICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIE92ZW47XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgT3ZlbjtcbiIsIi8qXG4gIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cbiAgT3ZlbiBNb2QgRGV2ZWxvcG1lbnQgS2l0IChPdmVuTURLKSBSdW50aW1lXG4gIERldiBraXQgdXNlZCBmb3Igc2ltcGxpZnlpbmcgRWFnbGVyRm9yZ2UgbW9kIGRldmVsb3BtZW50LlxuICAgIFxuICBDb3B5cmlnaHQgMjAyNSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG52YXIgT3Zlbk9yZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPdmVuT3JlKGJsb2NrSUQsIHZlaW5TaXplLCB2ZWluQ291bnQsIG1pbkdlbmVyYXRpb25IZWlnaHQsIG1heEdlbmVyYXRpb25IZWlnaHQpIHtcbiAgICAgICAgdGhpcy5ibG9ja0lEID0gYmxvY2tJRDtcbiAgICAgICAgdGhpcy52ZWluU2l6ZSA9IHZlaW5TaXplO1xuICAgICAgICB0aGlzLnZlaW5Db3VudCA9IHZlaW5Db3VudDtcbiAgICAgICAgdGhpcy5taW5HZW5lcmF0aW9uSGVpZ2h0ID0gbWluR2VuZXJhdGlvbkhlaWdodDtcbiAgICAgICAgdGhpcy5tYXhHZW5lcmF0aW9uSGVpZ2h0ID0gbWF4R2VuZXJhdGlvbkhlaWdodDtcbiAgICB9XG4gICAgT3Zlbk9yZS5wcm90b3R5cGUucmVnaXN0ZXJPdmVuT3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyT3Zlbk9yZVNlcnZlcihcXFwiXCIuY29uY2F0KHRoaXMuYmxvY2tJRCwgXCJcXFwiLFwiKS5jb25jYXQodGhpcy52ZWluU2l6ZSwgXCIsXCIpLmNvbmNhdCh0aGlzLnZlaW5Db3VudCwgXCIsXCIpLmNvbmNhdCh0aGlzLm1pbkdlbmVyYXRpb25IZWlnaHQsIFwiLFwiKS5jb25jYXQodGhpcy5tYXhHZW5lcmF0aW9uSGVpZ2h0LCBcIik7XCIpKTtcbiAgICB9O1xuICAgIHJldHVybiBPdmVuT3JlO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE92ZW5PcmU7XG4iLCIvKlxuICAgIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cbiAgICBjb21tYW5kcy50c1xuICAgIFxuICAgIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHNpbXBsZWNvbW1hbmQocHJlZml4LCBuYW1lLCBvbkV4ZWN1dGUpIHtcbiAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcInNlbmRjaGF0bWVzc2FnZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS5tZXNzYWdlLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChcIlwiLmNvbmNhdChwcmVmaXgpLmNvbmNhdChuYW1lKSkpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQgPSB0cnVlO1xuICAgICAgICAgICAgb25FeGVjdXRlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICBPdmVuIE1vZCBEZXZlbG9wbWVudCBLaXQgKE92ZW5NREspIFJ1bnRpbWVcbiAgRGV2IGtpdCB1c2VkIGZvciBzaW1wbGlmeWluZyBFYWdsZXJGb3JnZSBtb2QgZGV2ZWxvcG1lbnQuXG4gICAgXG4gIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE92ZW5NREsuXG5cbiAgICBPdmVuTURLIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXJcbiAgICB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWVcbiAgICBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pXG4gICAgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICBPdmVuTURLIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWVxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1NcbiAgICBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYWxvbmdcbiAgICB3aXRoIE92ZW4gTURLLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbmltcG9ydCBpY29uIGZyb20gXCJBU1NFVFMvZGVmYXVsdEljb24ucG5nXCI7XG5Nb2RBUEkubWV0YS50aXRsZShcIk92ZW5NREsgUnVudGltZVwiKTtcbk1vZEFQSS5tZXRhLnZlcnNpb24oXCJBbHBoYSB2MC4zXCIpO1xuTW9kQVBJLm1ldGEuZGVzY3JpcHRpb24oXCJVbm9mZmljaWFsIGRldiBraXQgdXNlZCBmb3Igc2ltcGxpZnlpbmcgRWFnbGVyRm9yZ2UgbW9kIGRldmVsb3BtZW50LlwiKTtcbk1vZEFQSS5tZXRhLmNyZWRpdHMoXCJCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlwiKTtcbk1vZEFQSS5tZXRhLmljb24oaWNvbik7XG5pbXBvcnQgeyByZWdpc3RlclNlcnZlckl0ZW0sIHJlZ2lzdGVyU2VydmVyQmxvY2ssIHJlZ2lzdGVyRW50aXR5U2VydmVyLCBPdmVuTURLX19kZWZpbmVFeGVjQ21kQXNHbG9iYWwsIHJlZ2lzdGVyT3Zlbk9yZVNlcnZlciwgfSBmcm9tIFwiY2xhc3Nlcy9jb3JlL0hlbHBlcl9mdW5jXCI7XG5pbXBvcnQgT0l0ZW0gZnJvbSBcImNsYXNzZXMvY29yZS9PSXRlbVwiO1xuaW1wb3J0IE9Nb2QgZnJvbSBcImNsYXNzZXMvY29yZS9Nb2RcIjtcbmltcG9ydCBPdmVuIGZyb20gXCJjbGFzc2VzL2NvcmUvT3ZlblwiO1xuaW1wb3J0IE9CbG9jayBmcm9tIFwiY2xhc3Nlcy9jb3JlL09CbG9ja1wiO1xuaW1wb3J0IHsgc2ltcGxlY29tbWFuZCB9IGZyb20gXCJjbGFzc2VzL2NvcmUvY29tbWFuZHNcIjtcbmltcG9ydCBPRW50aXR5IGZyb20gXCIuL2NsYXNzZXMvY29yZS9PRW50aXR5XCI7XG5pbXBvcnQgT3Zlbk9yZSBmcm9tIFwiY2xhc3Nlcy9jb3JlL092ZW5PcmVcIjtcbnZhciBkZXZtb2RlID0gdHJ1ZTtcbk1vZEFQSS5ldmVudHMubmV3RXZlbnQoXCJsaWI6T3Zlbk1ESzpsb2FkXCIpO1xuTW9kQVBJLmV2ZW50cy5uZXdFdmVudChcImxpYjpPdmVuTURLOmxvYWRlZFwiKTtcbk1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOk92ZW5NREs6bG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coXCJPdmVuTURLIFJ1bnRpbWUgaXMgbG9hZGluZ1wiKTtcbiAgICBjb25zb2xlLmxvZyhcIkxvYWRpbmcgT3Zlbk1ESyBnbG9iYWxzXCIpO1xuICAgIGdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJJdGVtID0gcmVnaXN0ZXJTZXJ2ZXJJdGVtO1xuICAgIGdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJCbG9jayA9IHJlZ2lzdGVyU2VydmVyQmxvY2s7XG4gICAgZ2xvYmFsVGhpcy5yZWdpc3RlckVudGl0eVNlcnZlciA9IHJlZ2lzdGVyRW50aXR5U2VydmVyO1xuICAgIGdsb2JhbFRoaXMuT0l0ZW0gPSBPSXRlbTtcbiAgICBnbG9iYWxUaGlzLk9Nb2QgPSBPTW9kO1xuICAgIGdsb2JhbFRoaXMuT3Zlbk1ESyA9IE92ZW47XG4gICAgZ2xvYmFsVGhpcy5PQmxvY2sgPSBPQmxvY2s7XG4gICAgZ2xvYmFsVGhpcy5zaW1wbGVjb21tYW5kID0gc2ltcGxlY29tbWFuZDtcbiAgICBnbG9iYWxUaGlzLk92ZW5PcmUgPSBPdmVuT3JlO1xuICAgIGdsb2JhbFRoaXMucmVnaXN0ZXJPdmVuT3JlU2VydmVyID0gcmVnaXN0ZXJPdmVuT3JlU2VydmVyO1xuICAgIGdsb2JhbFRoaXMuT0VudGl0eSA9IE9FbnRpdHk7XG4gICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIGlmICghZGV2bW9kZSkge1xuICAgICAgICAgICAgYWxlcnQoXCJPdmVuTURLIGRvZXMgbm90IGZ1bGx5IHN1cHBvcnQgMS4xMiBhdCB0aGlzIHRpbWUsIHBsZWFzZSB1c2UgMS44LjggZm9yIGZ1bGwgc3VwcG9ydFwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiMS4xMiBkZXRlY3RlZFwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJPdmVuTURLIGRvZXMgbm90IGZ1bGx5IHN1cHBvcnQgMS4xMiBhdCB0aGlzIHRpbWUsIHBsZWFzZSB1c2UgMS44LjggZm9yIGZ1bGwgc3VwcG9ydFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIk92ZW5NREsgZ2xvYmFscyBoYXZlIGJlZW4gc2V0IGFuZCBsb2FkZWRcIik7XG4gICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckl0ZW0gPSBcIi5jb25jYXQocmVnaXN0ZXJTZXJ2ZXJJdGVtLCBcIjtcIikpO1xuICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXIgSXRlbSBzZXJ2ZXJzaWRlIGZ1bmN0aW9uIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyT3Zlbk9yZVNlcnZlciA9IFwiLmNvbmNhdChyZWdpc3Rlck92ZW5PcmVTZXJ2ZXIsIFwiO1wiKSk7XG4gICAgY29uc29sZS5sb2coXCJSZWdpc3RlciBPdmVuIE9yZSBzZXJ2ZXJzaWRlIGZ1bmN0aW9uIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoT3Zlbk1ES19fZGVmaW5lRXhlY0NtZEFzR2xvYmFsKTtcbiAgICBPdmVuTURLX19kZWZpbmVFeGVjQ21kQXNHbG9iYWwoKTtcbiAgICBjb25zb2xlLmxvZyhcIk92ZW5NREtfX0V4ZWNDbWRBc0dsb2JhbCBzZXJ2ZXJzaWRlIGFuZCBjbGllbnRzaWRlIGZ1bmN0aW9uIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVyQmxvY2sgPSBcIi5jb25jYXQocmVnaXN0ZXJTZXJ2ZXJCbG9jaywgXCI7XCIpKTtcbiAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyIEVudGl0eSBzZXJ2ZXJzaWRlIGZ1bmN0aW9uIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyRW50aXR5U2VydmVyID0gXCIuY29uY2F0KHJlZ2lzdGVyRW50aXR5U2VydmVyLCBcIjtcIikpO1xuICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXIgQmxvY2sgc2VydmVyc2lkZSBmdW5jdGlvbiBsb2FkZWRcIik7XG4gICAgTW9kQVBJLmV2ZW50cy5jYWxsRXZlbnQoXCJsaWI6T3Zlbk1ESzpsb2FkZWRcIiwge30pO1xufSk7XG5Nb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjpPdmVuTURLOmxvYWRlZFwiLCBmdW5jdGlvbiAodmVyc2lvbikge1xuICAgIGNvbnNvbGUubG9nKFwiT3Zlbk1ESyBSdW50aW1lIGhhcyBmaW5pc2hlZCBsb2FkaW5nXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiXFxuICAgIFxcdTI1MENcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MTBcXG4gICAgXFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgT3Zlbk1ESyBoYXMgbG9hZGVkICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgIHdlbGNvbWUgdG8gb3Zlbk1ESyAgICAgICAgICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICBBIG1vZCBkZXYga2l0IGZvciBzdGFydGVycyAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgVmVyc2lvbjogXCIuY29uY2F0KHZlcnNpb24sIFwiICAgICAgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTE0XFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTE4XFxuICAgIFwiKSk7XG4gICAgc2ltcGxlY29tbWFuZChcIi9vdmVubWRrXCIsIFwiIGxvZ18xXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgTW9kQVBJLmRpc3BsYXlUb0NoYXQoXCJcXG4gICAgICBPdmVuTURLIFJ1bnRpbWUgdjAuMVxcbiAgICAgIE1hZGUgYnkgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcXG4gICAgICAtIEFkZGVkIGJhc2ljIGNvcmUgY2xhc3Nlc1xcbiAgICAgICggTm90IG11Y2ggY2FuIGJlIGRvY3VtZW50ZWQgZHVlIHRvIHNvIGxpdHRsZSBiZWluZyBhZGRlZCApXCIpO1xuICAgIH0pO1xuICAgIHNpbXBsZWNvbW1hbmQoXCIvb3Zlbm1ka1wiLCBcIiBsb2dfMlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIE1vZEFQSS5kaXNwbGF5VG9DaGF0KFwiXFxuICAgICAgT3Zlbk1ESyBSdW50aW1lIHYwLjJcXG4gICAgICBNYWRlIGJ5IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXFxuICAgICAgLSBBZGRlZCBzdXBwb3J0IGZvciAxLjEyXFxuICAgICAgLSBBZGRlZCBzdXBwb3J0IGZvciBPdmVuT3JlXFxuICAgICAgLSBBZGRlZCBzdXBwb3J0IGZvciBPRW50aXR5XFxuICAgICAgLSBRT0wgaW1wcm92ZW1lbnRzXFxuICAgICAgLSBBZGRlZCBzdXBwb3J0IGZvciBPdmVuTURLX19FeGVjQ21kQXNHbG9iYWxcXG4gICAgICAtIEFkZGVkIHN1cHBvcnQgZm9yIE92ZW5NREtfX2RlZmluZUV4ZWNDbWRBc0dsb2JhbFxcbiAgICAgIC0gQWRkZWQgc3VwcG9ydCBmb3Igc2ltcGxlY29tbWFuZHNcIik7XG4gICAgfSk7XG4gICAgc2ltcGxlY29tbWFuZChcIi9vdmVubWRrXCIsIFwiIGxvZ18zXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgTW9kQVBJLmRpc3BsYXlUb0NoYXQoXCJcXG4gICAgICBPdmVuTURLIFJ1bnRpbWUgdjAuM1xcbiAgICAgIE1hZGUgYnkgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcXG4gICAgICAtIEFkZGVkIG1vcmUgT0VudGl0eSBjdXN0b21pemF0aW9uXFxuICAgICAgICAtIEFkZGVkIG1vcmUgc3VwcG9ydCBmb3IgTW9kZWwgaGl0Ym9leGVzXFxuICAgICAgICAtIEFkZGVkIGN1c3RvbSBlbnRpdHkgc291bmQgc3VwcG9ydFwiKTtcbiAgICB9KTtcbn0pO1xuTW9kQVBJLmFkZENyZWRpdChcIk92ZW5NREsgUnVudGltZVwiLCBcIkJlbmRpZUdhbWVzXCIsIFwiIC0gTWFkZSBPdmVuTURLXFxuIC0gQ29kZWQgbW9zdCBvZiBPdmVuTURLXCIpO1xuTW9kQVBJLmFkZENyZWRpdChcIk92ZW5NREsgUnVudGltZVwiLCBcIkJsb2NrXzIyMjJcIiwgXCIgLSBGb3VuZGVkIE92ZW5NREtcIik7XG5Nb2RBUEkuZXZlbnRzLmNhbGxFdmVudChcImxpYjpPdmVuTURLOmxvYWRcIiwgeyB2ZXJzaW9uOiBcInYwLjNcIiB9KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==