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
        this.$maxStackSize = (itemStack);
    }
    ModAPI.reflect.prototypeStack(itemClass, nmi_OvenItem);
    if (!ModAPI.is_1_12) {
        nmi_OvenItem.prototype.$onItemRightClick = function ($$itemstack, $$world, $$player) {
            if (!ModAPI.is_1_12)
                ($$player).$setItemInUse($$itemstack, 32);
            var $$itemstack, $$world, $$player;
            onRightClick($$itemstack, $$world, $$player);
            console.log("server itemstack:");
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
            onRightClick($$itemstack, $$world, $$player);
            console.log($$itemstack);
            return ($$ActionResult($$ResultEnum.SUCCESS, $$itemstack));
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
    ;
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
        var itemInstance = (new nmi_OvenItem()).$setUnlocalizedName(ModAPI.util.str("".concat(itemID)));
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
function registerEntityServer(entityID, entityName, entityModel) {
    var _a;
    console.log("entities are not finished yet! Use at your own risk!");
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
    var entityClass = ModAPI.reflect.getClassById("net.minecraft.entity.passive.EntityAnimal");
    var entitySuper = ModAPI.reflect.getSuper(entityClass, function (x) { return x.length === 2; });
    var nme_OEntity = function nme_OEntity($worldIn) {
        entitySuper(this, $worldIn);
        this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
        this.wrapped.setSize(0.4, 0.7);
        this.wrapped.tasks.addTask(0, AITask("EntityAISwimming", 1)(this));
        this.wrapped.tasks.addTask(1, AITask("EntityAIPanic", 2)(this, 1.9));
        this.wrapped.tasks.addTask(2, AITask("EntityAIMate", 2)(this, 1.0));
        this.wrapped.tasks.addTask(3, AITask("EntityAITempt", 4)(this, 1.5, ModAPI.items.bread.getRef(), 0)); //won't cause a problem as the bread is obtained when the entity is constructed.
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
        return ModAPI.util.str("mob." + entityID + ".quack");
    };
    nme_OEntity.prototype.$getHurtSound = function () {
        return ModAPI.util.str("mob." + entityID + ".quack");
    };
    nme_OEntity.prototype.$getDeathSound = function () {
        return ModAPI.util.str("mob." + entityID + ".quack");
    };
    nme_OEntity.prototype.$playStepSound = function () {
        this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
        this.wrapped.playSound(ModAPI.util.str("mob." + entityID + ".step"), 0.2, 1);
    };
    nme_OEntity.prototype.$getDropItem = function () {
        return ModAPI.items.feather.getRef();
    };
    nme_OEntity.prototype.$createChild = function (otherParent) {
        var _a, _b;
        this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
        return new nme_OEntity((_b = (_a = this.wrapped.worldObj) === null || _a === void 0 ? void 0 : _a.getRef()) !== null && _b !== void 0 ? _b : null);
    };
    nme_OEntity.prototype.$isBreedingItem = function (itemstack) {
        return itemstack !== null && itemstack.$getItem() === ModAPI.items.bread.getRef();
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
        if ((!entity.onGround) && (!entity.isInWater())) {
            return 2; //falling
        }
        else {
            return 0;
        }
    };
    var ID = ModAPI.keygen.entity(entityID);
    ModAPI.reflect.getClassById("net.minecraft.entity.EntityList").staticMethods.addMapping0.method(ModAPI.util.asClass(nme_OEntity), {
        $createEntity: function ($worldIn) {
            return new nme_OEntity($worldIn);
        }
    }, ModAPI.util.str(entityName), ID, 0x5e3e2d, //egg base
    0x269166 //egg spots
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
    globalThis.OvenMDK__executeCommandAs = function OvenMDK__executeCommandAs($commandsender, command, feedback) {
        var server = getServer
            ? getServer() // 1.8
            : ModAPI.reflect.getClassById("net.minecraft.server.MinecraftServer").staticVariables.server; // 1.12
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
    function OEntity(entityName, entityID, entityTexture, entityModel, entityBreedItem, entityDropItem) {
        this.entityName = entityName;
        this.entityID = entityID;
        this.entityTexture = entityTexture;
        this.entityModel = entityModel;
        this.entityBreedItem = entityBreedItem || "wheat"; //default breed item
        this.entityDropItem = entityDropItem || "feather"; //default drop item
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
        var entityClass = ModAPI.reflect.getClassById("net.minecraft.entity.passive.EntityAnimal");
        var entitySuper = ModAPI.reflect.getSuper(entityClass, function (x) { return x.length === 2; });
        var nme_OEntity = function nme_OEntity($worldIn) {
            entitySuper(this, $worldIn);
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            this.wrapped.setSize(0.4, 0.7);
            this.wrapped.tasks.addTask(0, AITask("EntityAISwimming", 1)(this));
            this.wrapped.tasks.addTask(1, AITask("EntityAIPanic", 2)(this, 1.9));
            this.wrapped.tasks.addTask(2, AITask("EntityAIMate", 2)(this, 1.0));
            this.wrapped.tasks.addTask(3, AITask("EntityAITempt", 4)(this, 1.5, ModAPI.items.bread.getRef(), 0)); //won't cause a problem as the bread is obtained when the entity is constructed.
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
            return ModAPI.util.str("mob." + this.entityID + ".quack");
        };
        nme_OEntity.prototype.$getHurtSound = function () {
            return ModAPI.util.str("mob." + this.entityID + ".quack");
        };
        nme_OEntity.prototype.$getDeathSound = function () {
            return ModAPI.util.str("mob." + this.entityID + ".quack");
        };
        nme_OEntity.prototype.$playStepSound = function () {
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            this.wrapped.playSound(ModAPI.util.str("mob." + this.entityID + ".step"), 0.2, 1);
        };
        nme_OEntity.prototype.$getDropItem = function () {
            return ModAPI.items.feather.getRef();
        };
        nme_OEntity.prototype.$createChild = function (otherParent) {
            var _a, _b;
            this.wrapped || (this.wrapped = ModAPI.util.wrap(this).getCorrective());
            return new nme_OEntity((_b = (_a = this.wrapped.worldObj) === null || _a === void 0 ? void 0 : _a.getRef()) !== null && _b !== void 0 ? _b : null);
        };
        nme_OEntity.prototype.$isBreedingItem = function (itemstack) {
            return itemstack !== null && itemstack.$getItem() === ModAPI.items["".concat(this.entityBreedItem)].getRef();
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
        }, ModAPI.util.str(this.entityID), ID, 0x5e3e2d, //egg base
        0x269166 //egg spots
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
                AsyncSink.L10N.set("entity.".concat(this.entityID, ".name"), this.entityName);
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
        ModAPI.dedicatedServer.appendCode("globalThis.registerEntityServer(\"".concat(this.entityID, "\", \"").concat(this.entityName, "\", \"").concat(this.entityModel, "\");"));
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
                        AsyncSink.hideFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/entity/duck.png.mcmeta");
                        return [4 /*yield*/, this.waitForRenderManager()];
                    case 3:
                        _k.sent();
                        _e = (_d = AsyncSink).setFile;
                        _f = ["resourcepacks/AsyncSinkLib/assets/minecraft/sounds/mob/".concat(this.entityID, "/quack.ogg")];
                        return [4 /*yield*/, fetch("data:audio/ogg;base64,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Mdaaa869p9ZijLHWmnPuvQAAkwcHAKgEG2dYSTorHA0uNGQlAJAbAIAgxJhzzkEIIYQQQgghUoox5yCEEEIIIZRSSqQUY85BCCGEEEIIIYSMMeeggxBCCKWUUkopGWPOQQghhBBKKKWEEjrnoIMQQgmllFJKKaV0zjkIIYQQSimllFJK6SCEEEIIpZRSSimllNJBCCGEUEoppZRSSiklhBBCCKWUUkoppZRSSgghhBBKKaWUUkoppZQQQgillFJKKaWUUkopIYQQSimllFJKKaWUUkIIpZRSSimllFJKKaWEEEoppZRSSimllFJKCaGUUkoppZRSSimllBJKKaWUUkoppZRSSikllFJKKaWUUkoppZRSSiillFJKKaWUUkoppZRQSimllFJKKaWUUkopoZRSSimllFJKKaWUUgoAADpwAAAIMKLSQuw048ojcEQhwwRUaMhKACAcAABABDoIIYQQQggRcxBCCCGEEEKImIMQQgghhBBCCCGEEEIIpZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppRQAdZnhABg9YeMMK0lnhaPBhYasBADSAgAAYxhjjCnIpLMWY60NYxBCB52EFGqoJaaGMQghdFBKSi22WHMGoaRSSkktxliDzT2DUEoppaQWY605F+NBSCWl1GKrteccjO4glJJSSjHWmnPuvWjQSUmptVpz7j0HXzwIpaTWWow9Bx+MMKKUlmKssdYcfBFGGFFKSy3GmnvNvRhjhEopxlp7zrnnXIwRPqUWY6659x58LsL44mLMOffigw8+CGGMkDHm2HPwvRdjjA/CyFxzLsIY44swwvggbK25B1+MEUYYY3zvNfigezHCCCOMMcII3XPRRfhijDFGGF+EAQC5EQ4AiAtGElJnGVYaceMJGCKQQkNWAQAxAAAEMcYgpJBSSinFGGOMMcYYY4wxxhhjjDHGnGPOOeecAADABAcAgAAr2JVZWrVR3NRJXvRB4BM6YjMy5FIqZnIi6JEaarES7NAKbvACsNCQlQAAGQAA5KSUlFotGkLKQWk1iMgg5STFJCJjkILSgqeQMYhJyh1jCiEFqXbQMYUUoxpSCplS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")];
                    case 4: return [4 /*yield*/, (_k.sent()).arrayBuffer()];
                    case 5:
                        _e.apply(_d, _f.concat([_k.sent()]));
                        AsyncSink.Audio.register("mob." + this.entityID + ".quack", AsyncSink.Audio.Category.ANIMALS, [
                            {
                                path: "sounds/mob/".concat(this.entityID, "/quack.ogg"),
                                pitch: 1,
                                volume: 1,
                                streaming: false //use for large audio files
                            }
                        ]);
                        _h = (_g = AsyncSink).setFile;
                        _j = ["resourcepacks/AsyncSinkLib/assets/minecraft/sounds/mob/".concat(this.entityID, "/step.ogg")];
                        return [4 /*yield*/, fetch("data:audio/ogg;base64,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LbZYa60159RajDHWmmvOvafWYoyx1ppz7r0AAJMHBwCoBBtnWEk6KxwNLjRkJQCQGwCAIMSYc85BCCGEEEIIIVKKMecghBBCCCGUUkqkFGPOQQghhBBCCCGEjDHnoIMQQgillFJKKRljzkEIIYQQSiilhBI656CDEEIJpZRSSimldM45CCGEEEoppZRSSukghBBCCKWUUkoppZTSQQghhFBKKaWUUkopJYQQQgillFJKKaWUUkoIIYQQSimllFJKKaWUEEIIpZRSSimllFJKKSGEEEoppZRSSimllFJCCKWUUkoppZRSSimlhBBKKaWUUkoppZRSSgmhlFJKKaWUUkoppZQSSimllFJKKaWUUkopJZRSSimllFJKKaWUUkoopZRSSimllFJKKaWUUEoppZRSSimllFJKKaGUUkoppZRSSimllFIKAAA6cAAACDCi0kLsNOPKI3BEIcMEVGjISgAgHAAAQAQ6CCGEEEIIEXMQQgghhBBCiJiDEEIIIYQQQgghhBBCCKWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaUUAHWZ4QAYPWHjDCtJZ4WjwYWGrAQA0gIAAGMYY4wpyKSzFmOtDWMQQgedhBRqqCWmhjEIIXRQSkottlhzBqGkUkpJLcZYg809g1BKKaWkFmOtORfjQUglpdRiq7XnHIzuIJSSUkox1ppz7r1o0ElJqbVac+49B188CKWk1lqMPQcfjDCilJZirLHWHHwRRhhRSkstxpp7zb0YY4RKKcZae86551yMET6lFmOuufcefC7C+OJizDn34oMPPghhjJAx5thz8L0XY4wPwshccy7CGOOLMML4IGytuQdfjBFGGGN87zX4oHsxwggjjDHCCN1z0UX4YowxRhhfhAEAuREOAIgLRhJSZxlWGnHjCRgikEJDVgEAMQAABDHGIKSQUkopxRhjjDHGGGOMMcYYY4wxxpxjzjnnnAAAwAQHAIAAK9iVWVq1UdzUSV70QeATOmIzMuRSKmZyIuiRGmqxEuzQCm7wArDQkJUAABkAAOSklJRaLRpCykFpNYjIIOUkxSQiY5CC0oKnkDGIScodYwohBal20DGFFKMaUgqZUgpqqjmGjjGoMSfhUgmlBgAAQBAAICAkAMAAQcEMADA4QBg5EOgIIHBoAwAMRMhMYFAIDQ4yAeABIkIqAEhMUJQudEEIEaSLIIsHLpy48cQNJ3RogwAAAAAAgACADwCAhAKIiGZmrsLiAiNDY4Ojw+MDJERkJAAAAAAAQADgAwAgIQEiopmZq7C4wMjQ2ODo8PgACREZCQAAAAAAAAAAAAICAgAAAAAAAQAAAAICT2dnUwAEhgwAAAAAAAAbPQAAAgAAADej1b8Lubu7+vLtfq3CAQHUpj4ozbz7Uvf0rlBFMkT3rs9jZ7B/Ha60kbeT5dx/jKHDrPthXd10yP2i59+77Yd77Y8/KZXKU/pchfBtLVIth0heq2UPy2FZv1M737yswnrN5bBEn9+6ubvJa7SYIYMuJLlNcaaocoL/d+whfOsqy51fr9QNj/L04JUS7s+ey2AllN4z11czcdpa8p3OH1vPsZv835yYLvyeLsUR2+rt+3a18rNbkWOOp/eRd5djxZSS7q5TWi7jLeyyjRGLew6Hj83XryHXdW/00tvoJRGih6eP7AW/RxegLJzL8mUe2/TR/unDi3dmudp20vnT7h8cmnQ3Eqq12lTrnt92tQ9z2fHi/cvDvPZ0htK1r3sv+/EPnXqUYCkRdFSyOHusPK21tWDAPaVP5a4t9BM/186Lsnovkf7zIZdPXz4fPlpu7DLllXmV2Ye2Gx7XldPz/cf9ceF5mbnaltun7Ypw/wsnVnpC6DYmIpsnbO/bNnsebhd7AQDsKJP77jmcuPlTvYTgsn+0Rspnp0OoNn0+mNmU93ffMHY7akL03Lv3x55Ovji2uazHblZhfVlI6s+sO4dGeV5raumwHI7uLx8qYNded87pyHrfdvTnfnX4dT+ID9+nWD+zApm6H/vKkbueLbjQUvwihKqHWmppef9f/V48+1nL6/YXfOZW/wvdqKOmC3+dr66Yu1VsviQOvuOj09d7z63TiXK6+ORT4q4UV87L3XiicalaPXKMbywVu40A2kaLCAAAHE/tY+svjz12+ldjRSR2P9dbVtbQwsSAxZlyX6ulzS4I4b7LoqC6dDXlaY3w37Gp6Xn8SeXH5ex5UuiU1W63lY3bWbXcYyf9zqvKeWz78/TfUZv81mvl66+cah7oiPe1nfkl/bbCOfy320/tJEko+9phxXbpW6n7/mJntsvNI/4vvZk8jATaeYpXOD5BvQxbrWxzm9D6RaXEiBEexsmtuWq5QQxl052Sy9OwOF2FJ1z2W6HZUJ8KZaIvSxLTrjrtlblFqXTj/usX6IwXedSRTb2O27meCvF4+7Hgb8d+31fBpE7TnjrafMtSbf76l8vgqwEAAJ7mygwoDQ1SN9dkxw/6sePZS1WVrhptzT/NFu1q3qzMX1Oz06tsVgpVz/3Vn/vJz0w+VHvW3a+CZvRnx0zA2ENCr9nzsl9+r735wvPrA38pOBqOBO159ISebYzm1VIl7tddcsU0cnQikMTV54uhCHi+9idPZR1hfLVtENLwcnMriPtFWNpmIcp69/eEZ95McfPixrlZ3YA9V5RcMddTjcyDcINV/z5jPVjbLoePCuNJ/moFm1zYrar3sW3snzu0wX+KKpRPWOSDbdSEZV7HEnfehnExymN97StluS4/9X3zeb5grzK5W4SVBTas1ygGBwAANhaLBMABGB0xBV2Oom/vj73wsZtalKAou1Qv4KmsivOfNaMdFG3fVeXAI10U1m5nhOa7W+enS2leqLtNsqI0LLbUZ5elqVw0teEKBb2tuWKTLBfbTV6frnzh0fz65fe9bz4/eZAbPGhmKsd/38ay8/1ZEdZ+WPcnVuvSFQ0ijaIi119NxpJOUxn213yjNIaEdTGdhkLLh326MPvF/vuaIF3jeQPeJmVe3jcwetuw+7ld73BZ3R0v/dLTp7w6R1nmbbj4Q80y8+TPo8adbWyu8kAio7i5bH057Z8pxumpUtgW+/tO5/BG+KDDLAAAzChTL3R06fB0y0+JJohqp+Sip2D85jGJJb6HXgffg69jXFNEltdTPlzE1bo/bzd/r+eZsHnltHx1scTZn8ibTUlF7st+eSpv3xu8Gu9McoOoiN1u7sfPzbEuTofjnf6wVlZ9atXOeb7Uf9Lczm1en9/yyKJC7G8+dTlznAQA3CRhwRx2hM1nnVU51YZ+HuNpi5yO3bmGzRozeWrn/Y5yVg9bFAv2rnh9cNyrTkI2D65VzON1yliTa9Vz/dK52ekJ62aYUiQw9pXczgpBy7zanI0lCpbGa/b6r+7ZsvXs0L4e/88KxuW0Si1zlV0/XUtH9W91M/KMqzecnpPt0eJ9IXH+0rR1/5f7fF2Levspo/nev4eDte2uTnLaFtmnnZRQczlLdNq5llQPBQCkiujmo+nrbo8+FU882y98+hA9fVhXH9+70G7nce//+cLx/cvV77/3wpPvX64+vrcLq9+/vHB8C+3+5QXHc+LZfuHTh+ipD27iHv2yH3t6ufr9dxcOEgTOPGHPk0mMvJ7SX7fX+tXP+xNTz7tVxz40e9pjDV+83HmeK+PNtS2vSp+Omz2VxsD7+Fz4ew+6S8po+9ZZz6j7eX/f+zJbvuQ4up961FcWFc/dZdjzrq+3nV+7t77d83rRteNd/eXauG0kAAoO")];
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
    return Oven;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Oven);


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
ModAPI.meta.version("Alpha v0.2");
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
    ModAPI.dedicatedServer.appendCode(classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.OvenMDK__defineExecCmdAsGlobal);
    (0,classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.OvenMDK__defineExecCmdAsGlobal)();
    console.log("OvenMDK__ExecCmdAsGlobal serverside and clientside function loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerServerBlock = ".concat(classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerServerBlock, ";"));
    console.log("Register Entity serverside function loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerEntityServer = ".concat(classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerEntityServer, ";"));
    console.log("Register Block serverside function loaded");
    ModAPI.events.callEvent("lib:OvenMDK:loaded", {});
});
ModAPI.addEventListener("lib:OvenMDK:loaded", function () {
    console.log("OvenMDK Runtime has finished loading");
    console.log("\n    \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n    \u2502                                   \u2502\n    \u2502   OvenMDK has loaded              \u2502\n    \u2502                                   \u2502\n    \u2502   welcome to ovenMDK              \u2502\n    \u2502                                   \u2502\n    \u2502   A mod dev kit for starters      \u2502\n    \u2502                                   \u2502\n    \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n    ");
});
ModAPI.events.callEvent("lib:OvenMDK:load", {});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VSxZQUFZLGFBQWEsU0FBUyxVQUFVO0FBQ3RELG9DQUFvQyxTQUFTO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRSx5QkFBeUI7QUFDcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdNQUF3TTtBQUN4TTtBQUNBLDJFQUEyRTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFD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Y2xhc3Nlcy9jb3JlL0hlbHBlcl9mdW5jLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvTW9kLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvT0Jsb2NrLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvT0VudGl0eS50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL09JdGVtLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvT3Zlbi50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL2NvbW1hbmRzLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICAgIEhlbHBlcl9mdW5jLnRzXG4gICAgXG4gICAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJTZXJ2ZXJJdGVtKGl0ZW1JRCwgaXRlbVN0YWNrLCBvblJpZ2h0Q2xpY2ssIG9uSXRlbVVzZSkge1xuICAgIC8qaWYgKGlzU2VydmVyID09PSBmYWxzZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlZ2lzdGVyU2VydmVySXRlbSBjYW4gb25seSBiZSB1c2VkIG9uIHRoZSBzZXJ2ZXIgc2lkZS5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9Ki9cbiAgICB2YXIgY3JlYXRpdmVNaXNjVGFiO1xuICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICBjcmVhdGl2ZU1pc2NUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMuTUlTQztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNyZWF0aXZlTWlzY1RhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy50YWJNaXNjO1xuICAgIH1cbiAgICB2YXIgJCRpdGVtR2V0QXR0cmlidXRlcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpLm1ldGhvZHMuZ2V0SXRlbUF0dHJpYnV0ZU1vZGlmaWVycy5tZXRob2Q7XG4gICAgdmFyIGl0ZW1DbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpO1xuICAgIHZhciBpdGVtU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihpdGVtQ2xhc3MsIGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZm4ubGVuZ3RoID09PSAxOyB9KTtcbiAgICAvKmlmIChpc1NlcnZlciA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInVzaW5nIHNlcnZlciBzaWRlIHJlZ2lzdGVyU2VydmVySXRlbVwiKTtcbiAgICB9Ki9cbiAgICBmdW5jdGlvbiBubWlfT3Zlbkl0ZW0oKSB7XG4gICAgICAgIGl0ZW1TdXBlcih0aGlzKTtcbiAgICAgICAgdGhpcy4kc2V0Q3JlYXRpdmVUYWIoY3JlYXRpdmVNaXNjVGFiKTtcbiAgICAgICAgdGhpcy4kbWF4U3RhY2tTaXplID0gKGl0ZW1TdGFjayk7XG4gICAgfVxuICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKGl0ZW1DbGFzcywgbm1pX092ZW5JdGVtKTtcbiAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVJpZ2h0Q2xpY2sgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7XG4gICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKVxuICAgICAgICAgICAgICAgICgkJHBsYXllcikuJHNldEl0ZW1JblVzZSgkJGl0ZW1zdGFjaywgMzIpO1xuICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcjtcbiAgICAgICAgICAgIG9uUmlnaHRDbGljaygkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZXJ2ZXIgaXRlbXN0YWNrOlwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgIHJldHVybiAoJCRpdGVtc3RhY2spO1xuICAgICAgICB9O1xuICAgIH1cbiAgICA7XG4gICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIHZhciAkJFJlc3VsdEVudW0gPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkVudW1BY3Rpb25SZXN1bHRcIikuc3RhdGljVmFyaWFibGVzO1xuICAgICAgICB2YXIgJCRBY3Rpb25SZXN1bHQgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkFjdGlvblJlc3VsdFwiKS5jb25zdHJ1Y3RvcnNbMF07XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVJpZ2h0Q2xpY2sgPSBmdW5jdGlvbiAoJCR3b3JsZCwgJCRwbGF5ZXIsICRoYW5kRW51bSwgJHVudXNlZCkge1xuICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrID0gKCQkcGxheWVyKS4kZ2V0SGVsZEl0ZW0oJGhhbmRFbnVtKTtcbiAgICAgICAgICAgICgkJHBsYXllcikuJHNldEFjdGl2ZUhhbmQoJGhhbmRFbnVtKTtcbiAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXI7XG4gICAgICAgICAgICBvblJpZ2h0Q2xpY2soJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgIHJldHVybiAoJCRBY3Rpb25SZXN1bHQoJCRSZXN1bHRFbnVtLlNVQ0NFU1MsICQkaXRlbXN0YWNrKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtVXNlMCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCRwbGF5ZXIsICQkd29ybGQsICQkYmxvY2twb3MpIHtcbiAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIsICQkYmxvY2twb3M7XG4gICAgICAgICAgICBvbkl0ZW1Vc2UoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGJsb2NrcG9zKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpZW50IGl0ZW1zdGFjazpcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgO1xuICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICB2YXIgJCRSZXN1bHRFbnVtID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnVtQWN0aW9uUmVzdWx0XCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtVXNlID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHBsYXllciwgJCR3b3JsZCwgJCRibG9ja3Bvcykge1xuICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHBsYXllciwgJCR3b3JsZCwgJCRibG9ja3BvcztcbiAgICAgICAgICAgIGlmIChvbkl0ZW1Vc2UpIHtcbiAgICAgICAgICAgICAgICBvbkl0ZW1Vc2UoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGJsb2NrcG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkJFJlc3VsdEVudW0uUEFTUztcbiAgICAgICAgfTtcbiAgICB9XG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25VcGRhdGUgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGhvdGJhcl9zbG90LCAkJGlzX2hlbGQpIHtcbiAgICAgICAgJCRpc19oZWxkID0gKCQkaXNfaGVsZCkgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHJldHVybiAoJCRpdGVtc3RhY2spO1xuICAgIH07XG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtVXNlRmluaXNoID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcikge1xuICAgICAgICByZXR1cm4gKCQkaXRlbXN0YWNrKTtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldE1heEl0ZW1Vc2VEdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIDMyO1xuICAgIH07XG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kZ2V0SXRlbUF0dHJpYnV0ZU1vZGlmaWVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICQkYXR0cmlidXRlbWFwID0gJCRpdGVtR2V0QXR0cmlidXRlcy5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgIHJldHVybiAkJGF0dHJpYnV0ZW1hcDtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldFN0clZzQmxvY2sgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkYmxvY2spIHtcbiAgICAgICAgcmV0dXJuIDEuMDtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uQ3JlYXRlZCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25CbG9ja0Rlc3Ryb3llZCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRibG9jaywgJCRibG9ja3BvcywgJCRlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICB2YXIgaW50ZXJuYWxfcmVnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaXRlbUluc3RhbmNlID0gKG5ldyBubWlfT3Zlbkl0ZW0oKSkuJHNldFVubG9jYWxpemVkTmFtZShNb2RBUEkudXRpbC5zdHIoXCJcIi5jb25jYXQoaXRlbUlEKSkpO1xuICAgICAgICBpdGVtQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3Rlckl0ZW0ubWV0aG9kKE1vZEFQSS5rZXlnZW4uaXRlbShcIlwiLmNvbmNhdChpdGVtSUQpKSwgTW9kQVBJLnV0aWwuc3RyKFwiXCIuY29uY2F0KGl0ZW1JRCkpLCBpdGVtSW5zdGFuY2UpO1xuICAgICAgICBNb2RBUEkuaXRlbXNbXCJcIi5jb25jYXQoaXRlbUlEKV0gPSBpdGVtSW5zdGFuY2U7XG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW1JbnN0YW5jZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXJlZCBPdmVuTURLIGl0ZW0gKCBTZXJ2ZXIgU2lkZSApXCIpO1xuICAgICAgICByZXR1cm4gaXRlbUluc3RhbmNlO1xuICAgIH07XG4gICAgaWYgKE1vZEFQSS5pdGVtcykge1xuICAgICAgICByZXR1cm4gaW50ZXJuYWxfcmVnKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImJvb3RzdHJhcFwiLCBpbnRlcm5hbF9yZWcpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlclNlcnZlckJsb2NrKGJsb2NrSUQsIG9uQnJlYWspIHtcbiAgICAvKmlmIChNb2RBUEkuaXNTZXJ2ZXIgPT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVnaXN0ZXJTZXJ2ZXJCbG9jayBjYW4gb25seSBiZSB1c2VkIG9uIHRoZSBzZXJ2ZXIgc2lkZS5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9Ki9cbiAgICB2YXIgQmxvY2tDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIik7XG4gICAgdmFyIEl0ZW1DbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpO1xuICAgIHZhciBjcmVhdGl2ZVRhYjtcbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgY3JlYXRpdmVUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMuQlVJTERJTkdfQkxPQ0tTO1xuICAgIH1cbiAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIGNyZWF0aXZlVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLnRhYkJsb2NrO1xuICAgIH1cbiAgICB2YXIgYmxvY2tTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKEJsb2NrQ2xhc3MsIGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZm4ubGVuZ3RoID09PSAyOyB9KTtcbiAgICB2YXIgYnJlYWtCbG9ja01ldGhvZCA9IEJsb2NrQ2xhc3MubWV0aG9kcy5icmVha0Jsb2NrLm1ldGhvZDtcbiAgICBmdW5jdGlvbiBubWJfT2Jsb2NrKCkge1xuICAgICAgICBibG9ja1N1cGVyKHRoaXMsIE1vZEFQSS5tYXRlcmlhbHMucm9jay5nZXRSZWYoKSk7XG4gICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIHRoaXMuJGRlZmF1bHRCbG9ja1N0YXRlID0gdGhpcy4kYmxvY2tTdGF0ZS4kZ2V0QmFzZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kc2V0Q3JlYXRpdmVUYWIoY3JlYXRpdmVUYWIpO1xuICAgIH1cbiAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhCbG9ja0NsYXNzLCBubWJfT2Jsb2NrKTtcbiAgICBubWJfT2Jsb2NrLnByb3RvdHlwZS4kYnJlYWtCbG9jayA9IGZ1bmN0aW9uICgkd29ybGQsICRibG9ja3BvcywgJGJsb2Nrc3RhdGUpIHtcbiAgICAgICAgLy9vbkJyZWFrKCR3b3JsZCwgJGJsb2NrcG9zLCAkYmxvY2tzdGF0ZSk7XG4gICAgICAgIHJldHVybiBicmVha0Jsb2NrTWV0aG9kKHRoaXMsICR3b3JsZCwgJGJsb2NrcG9zLCAkYmxvY2tzdGF0ZSk7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBmaXh1cEJsb2NrSWRzKCkge1xuICAgICAgICB2YXIgYmxvY2tSZWdpc3RyeSA9IE1vZEFQSS51dGlsXG4gICAgICAgICAgICAud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpLnN0YXRpY1ZhcmlhYmxlc1xuICAgICAgICAgICAgLmJsb2NrUmVnaXN0cnkpXG4gICAgICAgICAgICAuZ2V0Q29ycmVjdGl2ZSgpO1xuICAgICAgICB2YXIgQkxPQ0tfU1RBVEVfSURTID0gTW9kQVBJLnV0aWxcbiAgICAgICAgICAgIC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIikuc3RhdGljVmFyaWFibGVzXG4gICAgICAgICAgICAuQkxPQ0tfU1RBVEVfSURTKVxuICAgICAgICAgICAgLmdldENvcnJlY3RpdmUoKTtcbiAgICAgICAgYmxvY2tSZWdpc3RyeS5yZWdpc3RyeU9iamVjdHMuaGFzaFRhYmxlS1RvVi5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGJsb2NrXzEgPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsaWRTdGF0ZXMgPSBibG9ja18xLmdldEJsb2NrU3RhdGUoKS5nZXRWYWxpZFN0YXRlcygpO1xuICAgICAgICAgICAgICAgIHZhciBzdGF0ZUFycmF5ID0gdmFsaWRTdGF0ZXMuYXJyYXkgfHwgW3ZhbGlkU3RhdGVzLmVsZW1lbnRdO1xuICAgICAgICAgICAgICAgIHN0YXRlQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaWJsb2Nrc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoYmxvY2tSZWdpc3RyeS5nZXRJREZvck9iamVjdChibG9ja18xLmdldFJlZigpKSA8PCA0KSB8XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja18xLmdldE1ldGFGcm9tU3RhdGUoaWJsb2Nrc3RhdGUuZ2V0UmVmKCkpO1xuICAgICAgICAgICAgICAgICAgICBCTE9DS19TVEFURV9JRFMucHV0KGlibG9ja3N0YXRlLmdldFJlZigpLCBpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBpbnRlcm5hbFJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY3VzdG9tX2Jsb2NrO1xuICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBuZXcgbm1iX09ibG9jaygpXG4gICAgICAgICAgICAgICAgLiRzZXRIYXJkbmVzcygzLjApXG4gICAgICAgICAgICAgICAgLiRzZXRTdGVwU291bmQoQmxvY2tDbGFzcy5zdGF0aWNWYXJpYWJsZXMuc291bmRUeXBlUGlzdG9uKVxuICAgICAgICAgICAgICAgIC4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihibG9ja0lEKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBuZXcgbm1iX09ibG9jaygpXG4gICAgICAgICAgICAgICAgLiRzZXRIYXJkbmVzcygzLjApXG4gICAgICAgICAgICAgICAgLiRzZXRTb3VuZFR5cGUoTW9kQVBJLmJsb2NrU291bmRzLlBMQU5ULmdldFJlZigpKVxuICAgICAgICAgICAgICAgIC4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihibG9ja0lEKSk7XG4gICAgICAgIH1cbiAgICAgICAgQmxvY2tDbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVyQmxvY2swLm1ldGhvZChNb2RBUEkua2V5Z2VuLmJsb2NrKGJsb2NrSUQpLCBNb2RBUEkudXRpbC5zdHIoYmxvY2tJRCksIGN1c3RvbV9ibG9jayk7XG4gICAgICAgIEl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbUJsb2NrMC5tZXRob2QoY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgZml4dXBCbG9ja0lkcygpO1xuICAgICAgICBNb2RBUEkuYmxvY2tzW2Jsb2NrSURdID0gY3VzdG9tX2Jsb2NrO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyaW5nIGJsb2NrIG9uIHNlcnZlciBzaWRlXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXN0b21fYmxvY2spO1xuICAgICAgICByZXR1cm4gY3VzdG9tX2Jsb2NrO1xuICAgIH07XG4gICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICBpZiAoTW9kQVBJLm1hdGVyaWFscykge1xuICAgICAgICAgICAgcmV0dXJuIGludGVybmFsUmVnaXN0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsUmVnaXN0ZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICB2YXIgYmxvY2tDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIik7XG4gICAgICAgIHZhciBpdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJib290c3RyYXBcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1c3RvbV9ibG9jayA9IG5ldyBubWJfT2Jsb2NrKClcbiAgICAgICAgICAgICAgICAuJHNldEhhcmRuZXNzKDMuMClcbiAgICAgICAgICAgICAgICAuJHNldFNvdW5kVHlwZShNb2RBUEkuYmxvY2tTb3VuZHMuUExBTlQuZ2V0UmVmKCkpXG4gICAgICAgICAgICAgICAgLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKGJsb2NrSUQpKTtcbiAgICAgICAgICAgIGJsb2NrQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3RlckJsb2NrMC5tZXRob2QoTW9kQVBJLmtleWdlbi5ibG9jayhibG9ja0lEKSwgTW9kQVBJLnV0aWwuc3RyKGJsb2NrSUQpLCBjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgaXRlbUNsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJJdGVtQmxvY2swLm1ldGhvZChjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgZml4dXBCbG9ja0lkcygpO1xuICAgICAgICAgICAgTW9kQVBJLmJsb2Nrc1tibG9ja0lEXSA9IGN1c3RvbV9ibG9jaztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXJpbmcgYmxvY2sgb24gc2VydmVyIHNpZGVcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjdXN0b21fYmxvY2spO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJFbnRpdHlTZXJ2ZXIoZW50aXR5SUQsIGVudGl0eU5hbWUsIGVudGl0eU1vZGVsKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnNvbGUubG9nKFwiZW50aXRpZXMgYXJlIG5vdCBmaW5pc2hlZCB5ZXQhIFVzZSBhdCB5b3VyIG93biByaXNrIVwiKTtcbiAgICAvL3JldHVybjtcbiAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5qbF9TdHJpbmdfZm9ybWF0ID0gTW9kQVBJLmhvb2tzLm1ldGhvZHMubmxldl9IU3RyaW5nX2Zvcm1hdDsgLy90ZW1wb3JhcnkgdGhpbmcgdG8gZml4IGFuIGlzc3VlIGluIGVhZ2xlcmNyYWZ0XG4gICAgLy8gVXRpbHNcbiAgICBmdW5jdGlvbiBBSVRhc2sobmFtZSwgbGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5haS5cIiArIG5hbWUpLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gbGVuZ3RoOyB9KTtcbiAgICB9XG4gICAgdmFyIFJlc291cmNlTG9jYXRpb24gPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIlJlc291cmNlTG9jYXRpb25cIikuY29uc3RydWN0b3JzLmZpbmQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSAxOyB9KTtcbiAgICB2YXIgRW50aXR5UGxheWVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnRpdHlQbGF5ZXJcIik7XG4gICAgdmFyIEdsU3RhdGVNYW5hZ2VyID0gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC52YWx1ZXMoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJHbFN0YXRlTWFuYWdlclwiKS5zdGF0aWNNZXRob2RzKS5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIFt4Lm1ldGhvZE5hbWVTaG9ydCwgeC5tZXRob2RdOyB9KSk7XG4gICAgdmFyIFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJTaGFyZWRNb25zdGVyQXR0cmlidXRlc1wiKS5zdGF0aWNWYXJpYWJsZXM7XG4gICAgLy8gU1RBUlQgQ1VTVE9NIEVOVElUWVxuICAgIHZhciBlbnRpdHlDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LnBhc3NpdmUuRW50aXR5QW5pbWFsXCIpO1xuICAgIHZhciBlbnRpdHlTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKGVudGl0eUNsYXNzLCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDI7IH0pO1xuICAgIHZhciBubWVfT0VudGl0eSA9IGZ1bmN0aW9uIG5tZV9PRW50aXR5KCR3b3JsZEluKSB7XG4gICAgICAgIGVudGl0eVN1cGVyKHRoaXMsICR3b3JsZEluKTtcbiAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgIHRoaXMud3JhcHBlZC5zZXRTaXplKDAuNCwgMC43KTtcbiAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMCwgQUlUYXNrKFwiRW50aXR5QUlTd2ltbWluZ1wiLCAxKSh0aGlzKSk7XG4gICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDEsIEFJVGFzayhcIkVudGl0eUFJUGFuaWNcIiwgMikodGhpcywgMS45KSk7XG4gICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDIsIEFJVGFzayhcIkVudGl0eUFJTWF0ZVwiLCAyKSh0aGlzLCAxLjApKTtcbiAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMywgQUlUYXNrKFwiRW50aXR5QUlUZW1wdFwiLCA0KSh0aGlzLCAxLjUsIE1vZEFQSS5pdGVtcy5icmVhZC5nZXRSZWYoKSwgMCkpOyAvL3dvbid0IGNhdXNlIGEgcHJvYmxlbSBhcyB0aGUgYnJlYWQgaXMgb2J0YWluZWQgd2hlbiB0aGUgZW50aXR5IGlzIGNvbnN0cnVjdGVkLlxuICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg0LCBBSVRhc2soXCJFbnRpdHlBSUZvbGxvd1BhcmVudFwiLCAyKSh0aGlzLCAxLjIpKTtcbiAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNSwgQUlUYXNrKFwiRW50aXR5QUlXYW5kZXJcIiwgMikodGhpcywgMS4xKSk7XG4gICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDYsIEFJVGFzayhcIkVudGl0eUFJV2F0Y2hDbG9zZXN0XCIsIDMpKHRoaXMsIE1vZEFQSS51dGlsLmFzQ2xhc3MoRW50aXR5UGxheWVyLmNsYXNzKSwgNikpO1xuICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg3LCBBSVRhc2soXCJFbnRpdHlBSUxvb2tJZGxlXCIsIDEpKHRoaXMpKTtcbiAgICB9O1xuICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKGVudGl0eUNsYXNzLCBubWVfT0VudGl0eSk7XG4gICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXRFeWVIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICByZXR1cm4gdGhpcy53cmFwcGVkLmhlaWdodDtcbiAgICB9O1xuICAgIHZhciBvcmlnaW5hbEFwcGx5RW50aXR5QXR0cmlidXRlcyA9IG5tZV9PRW50aXR5LnByb3RvdHlwZS4kYXBwbHlFbnRpdHlBdHRyaWJ1dGVzO1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kYXBwbHlFbnRpdHlBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgb3JpZ2luYWxBcHBseUVudGl0eUF0dHJpYnV0ZXMuYXBwbHkodGhpcywgW10pO1xuICAgICAgICB0aGlzLndyYXBwZWQuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1heEhlYWx0aCkuc2V0QmFzZVZhbHVlKDUpO1xuICAgICAgICB0aGlzLndyYXBwZWQuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1vdmVtZW50U3BlZWQpLnNldEJhc2VWYWx1ZSgwLjI1KTtcbiAgICB9O1xuICAgIHZhciBvcmlnaW5hbExpdmluZ1VwZGF0ZSA9IG5tZV9PRW50aXR5LnByb3RvdHlwZS4kb25MaXZpbmdVcGRhdGU7XG4gICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRvbkxpdmluZ1VwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgIG9yaWdpbmFsTGl2aW5nVXBkYXRlLmFwcGx5KHRoaXMsIFtdKTtcbiAgICAgICAgaWYgKHRoaXMud3JhcHBlZC5pc0luV2F0ZXIoKSkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLm1vdGlvblkgKj0gMC41O1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tb3ZlbWVudFNwZWVkKS5zZXRCYXNlVmFsdWUoMS40KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZCkuc2V0QmFzZVZhbHVlKDAuMjUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldExpdmluZ1NvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgZW50aXR5SUQgKyBcIi5xdWFja1wiKTtcbiAgICB9O1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0SHVydFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgZW50aXR5SUQgKyBcIi5xdWFja1wiKTtcbiAgICB9O1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0RGVhdGhTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIGVudGl0eUlEICsgXCIucXVhY2tcIik7XG4gICAgfTtcbiAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJHBsYXlTdGVwU291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICB0aGlzLndyYXBwZWQucGxheVNvdW5kKE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIGVudGl0eUlEICsgXCIuc3RlcFwiKSwgMC4yLCAxKTtcbiAgICB9O1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0RHJvcEl0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBNb2RBUEkuaXRlbXMuZmVhdGhlci5nZXRSZWYoKTtcbiAgICB9O1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kY3JlYXRlQ2hpbGQgPSBmdW5jdGlvbiAob3RoZXJQYXJlbnQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgIHJldHVybiBuZXcgbm1lX09FbnRpdHkoKF9iID0gKF9hID0gdGhpcy53cmFwcGVkLndvcmxkT2JqKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0UmVmKCkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG51bGwpO1xuICAgIH07XG4gICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRpc0JyZWVkaW5nSXRlbSA9IGZ1bmN0aW9uIChpdGVtc3RhY2spIHtcbiAgICAgICAgcmV0dXJuIGl0ZW1zdGFjayAhPT0gbnVsbCAmJiBpdGVtc3RhY2suJGdldEl0ZW0oKSA9PT0gTW9kQVBJLml0ZW1zLmJyZWFkLmdldFJlZigpO1xuICAgIH07XG4gICAgLy8gRU5EIENVU1RPTSBFTlRJVFlcbiAgICAvLyBTVEFSVCBDVVNUT00gTU9ERUxcbiAgICB2YXIgbW9kZWxDaGlja2VuQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNsaWVudC5tb2RlbC5cIi5jb25jYXQoZW50aXR5TW9kZWwpKTtcbiAgICB2YXIgbW9kZWxDaGlja2VuU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihtb2RlbENoaWNrZW5DbGFzcyk7IC8vd2hpbGUgc3VwZXIgaXNuJ3QgdXNlZCB3aGVuIGV4dGVuZGluZyB0aGlzIGNsYXNzLCBqYXZhIGltcGxpZXMgdGhlIGNhbGwuXG4gICAgdmFyIG5tY21fT0VudGl0eU1vZGVsID0gZnVuY3Rpb24gbm1jbV9PRW50aXR5TW9kZWwoKSB7XG4gICAgICAgIG1vZGVsQ2hpY2tlblN1cGVyKHRoaXMpO1xuICAgIH07XG4gICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2sobW9kZWxDaGlja2VuQ2xhc3MsIG5tY21fT0VudGl0eU1vZGVsKTtcbiAgICAvLyBFTkQgQ1VTVE9NIE1oT0RFTFxuICAgIC8vIFNUQVJUIENVU1RPTSBSRU5ERVJFUlxuICAgIHZhciByZW5kZXJDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY2xpZW50LnJlbmRlcmVyLmVudGl0eS5SZW5kZXJMaXZpbmdcIik7XG4gICAgdmFyIHJlbmRlclN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIocmVuZGVyQ2xhc3MsIGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gNDsgfSk7XG4gICAgdmFyIGR1Y2tUZXh0dXJlcyA9IFJlc291cmNlTG9jYXRpb24oTW9kQVBJLnV0aWwuc3RyKFwidGV4dHVyZXMvZW50aXR5L1wiLmNvbmNhdChlbnRpdHlJRCwgXCIucG5nXCIpKSk7XG4gICAgdmFyIG5tY3JlX1JlbmRlck9FbnRpdHkgPSBmdW5jdGlvbiBubWNyZV9SZW5kZXJPRW50aXR5KHJlbmRlck1hbmFnZXIsIG1vZGVsQmFzZUluLCBzaGFkb3dTaXplSW4pIHtcbiAgICAgICAgcmVuZGVyU3VwZXIodGhpcywgcmVuZGVyTWFuYWdlciwgbW9kZWxCYXNlSW4sIHNoYWRvd1NpemVJbik7XG4gICAgfTtcbiAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhyZW5kZXJDbGFzcywgbm1jcmVfUmVuZGVyT0VudGl0eSk7XG4gICAgbm1jcmVfUmVuZGVyT0VudGl0eS5wcm90b3R5cGUuJGdldEVudGl0eVRleHR1cmUgPSBmdW5jdGlvbiAoZW50aXR5KSB7XG4gICAgICAgIHJldHVybiBkdWNrVGV4dHVyZXM7XG4gICAgfTtcbiAgICBubWNyZV9SZW5kZXJPRW50aXR5LnByb3RvdHlwZS4kaGFuZGxlUm90YXRpb25GbG9hdCA9IGZ1bmN0aW9uIChlbnRpdHksIHBhcnRpYWxUaWNrcykge1xuICAgICAgICBlbnRpdHkgPSBNb2RBUEkudXRpbC53cmFwKGVudGl0eSk7XG4gICAgICAgIGlmICgoIWVudGl0eS5vbkdyb3VuZCkgJiYgKCFlbnRpdHkuaXNJbldhdGVyKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gMjsgLy9mYWxsaW5nXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIElEID0gTW9kQVBJLmtleWdlbi5lbnRpdHkoZW50aXR5SUQpO1xuICAgIE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eUxpc3RcIikuc3RhdGljTWV0aG9kcy5hZGRNYXBwaW5nMC5tZXRob2QoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIHtcbiAgICAgICAgJGNyZWF0ZUVudGl0eTogZnVuY3Rpb24gKCR3b3JsZEluKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IG5tZV9PRW50aXR5KCR3b3JsZEluKTtcbiAgICAgICAgfVxuICAgIH0sIE1vZEFQSS51dGlsLnN0cihlbnRpdHlOYW1lKSwgSUQsIDB4NWUzZTJkLCAvL2VnZyBiYXNlXG4gICAgMHgyNjkxNjYgLy9lZ2cgc3BvdHNcbiAgICApO1xuICAgIHZhciBTcGF3blBsYWNlbWVudFR5cGUgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlMaXZpbmckU3Bhd25QbGFjZW1lbnRUeXBlXCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICB2YXIgRU5USVRZX1BMQUNFTUVOVFMgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eVNwYXduUGxhY2VtZW50UmVnaXN0cnlcIilcbiAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5FTlRJVFlfUExBQ0VNRU5UUyk7XG4gICAgRU5USVRZX1BMQUNFTUVOVFMucHV0KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCBTcGF3blBsYWNlbWVudFR5cGUuT05fR1JPVU5EKTtcbiAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcignYm9vdHN0cmFwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgU3Bhd25MaXN0RW50cnkgPSBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlJFNwYXduTGlzdEVudHJ5XCIpXG4gICAgICAgICAgICAuY29uc3RydWN0b3JzLmZpbmQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSA0OyB9KTtcbiAgICAgICAgdmFyIEJpb21lR2VuU3dhbXAgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlXCIpXG4gICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLnN3YW1wbGFuZCk7XG4gICAgICAgIHZhciBCaW9tZUdlblJpdmVyID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5yaXZlcik7XG4gICAgICAgIHZhciBCaW9tZUdlbkJlYWNoID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5iZWFjaCk7XG4gICAgICAgIHZhciBkdWNrU3Bhd25Td2FtcCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAyMiwgMywgNSk7XG4gICAgICAgIHZhciBkdWNrU3Bhd25SaXZlckJlZCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAxMCwgNSwgOSk7XG4gICAgICAgIHZhciBkdWNrU3Bhd25CZWFjaCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAyNCwgMiwgMyk7XG4gICAgICAgIEJpb21lR2VuU3dhbXAuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25Td2FtcCk7XG4gICAgICAgIEJpb21lR2VuUml2ZXIuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25SaXZlckJlZCk7XG4gICAgICAgIEJpb21lR2VuQmVhY2guc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25CZWFjaCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIF9hID0ge30sXG4gICAgICAgIF9hW1wiRW50aXR5XCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXSA9IG5tZV9PRW50aXR5LFxuICAgICAgICBfYVtcIk1vZGVsXCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXSA9IG5tY21fT0VudGl0eU1vZGVsLFxuICAgICAgICBfYVtcIlJlbmRlclwiLmNvbmNhdCh0aGlzLmVudGl0eUlEKV0gPSBubWNyZV9SZW5kZXJPRW50aXR5LFxuICAgICAgICBfYVtcIlwiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIlRleHR1cmVzXCIpXSA9IGR1Y2tUZXh0dXJlcyxcbiAgICAgICAgX2E7XG59XG4vKmV4cG9ydCBmdW5jdGlvbiBpc1NlcnZlclNpZGUoKSB7XG4gICAgZnVuY3Rpb24gc3ViZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXNTZXJ2ZXJTaWRlIGZ1bmN0aW9uIGNhbGxlZFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coYGlzU2VydmVyU2lkZTogJHtNb2RBUEkuaXNTZXJ2ZXJ9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKE1vZEFQSS5pc1NlcnZlcik7XG4gICAgfVxuICAgIHN1YmZ1bmN0aW9uKCk7XG4gICAgY29uc29sZS5sb2coYGlzU2VydmVyU2lkZTogJHtNb2RBUEkuaXNTZXJ2ZXJ9YCk7XG59Ki9cbmV4cG9ydCBmdW5jdGlvbiBPdmVuTURLX19kZWZpbmVFeGVjQ21kQXNHbG9iYWwoKSB7XG4gICAgdmFyIF9hO1xuICAgIC8vIEdldCBzZXJ2ZXIgbWV0aG9kIGZvciBkaWZmZXJlbnQgTWluZWNyYWZ0IHZlcnNpb25zXG4gICAgdmFyIGdldFNlcnZlciA9IChfYSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuc2VydmVyLk1pbmVjcmFmdFNlcnZlclwiKS5zdGF0aWNNZXRob2RzLmdldFNlcnZlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1ldGhvZDtcbiAgICAvLyBEZWZpbmUgZ2xvYmFsIGZ1bmN0aW9uXG4gICAgZ2xvYmFsVGhpcy5PdmVuTURLX19leGVjdXRlQ29tbWFuZEFzID0gZnVuY3Rpb24gT3Zlbk1ES19fZXhlY3V0ZUNvbW1hbmRBcygkY29tbWFuZHNlbmRlciwgY29tbWFuZCwgZmVlZGJhY2spIHtcbiAgICAgICAgdmFyIHNlcnZlciA9IGdldFNlcnZlclxuICAgICAgICAgICAgPyBnZXRTZXJ2ZXIoKSAvLyAxLjhcbiAgICAgICAgICAgIDogTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5zZXJ2ZXIuTWluZWNyYWZ0U2VydmVyXCIpLnN0YXRpY1ZhcmlhYmxlcy5zZXJ2ZXI7IC8vIDEuMTJcbiAgICAgICAgaWYgKCFzZXJ2ZXIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnNvbGUubG9nKHNlcnZlcik7XG4gICAgICAgIHZhciBjb21tYW5kTWFuYWdlciA9IHNlcnZlci4kY29tbWFuZE1hbmFnZXI7XG4gICAgICAgIC8vIFRlbXBvcmFyaWx5IG92ZXJyaWRlIHBlcm1pc3Npb25zXG4gICAgICAgIHZhciBvcmlnaW5hbENhbkNvbW1hbmQgPSAkY29tbWFuZHNlbmRlci4kY2FuQ29tbWFuZFNlbmRlclVzZUNvbW1hbmQ7XG4gICAgICAgICRjb21tYW5kc2VuZGVyLiRjYW5Db21tYW5kU2VuZGVyVXNlQ29tbWFuZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDE7IH07XG4gICAgICAgIHZhciBvcmlnaW5hbEZlZWRiYWNrID0gJGNvbW1hbmRzZW5kZXIuJHNlbmRDb21tYW5kRmVlZGJhY2s7XG4gICAgICAgICRjb21tYW5kc2VuZGVyLiRzZW5kQ29tbWFuZEZlZWRiYWNrID0gZmVlZGJhY2sgPyBmdW5jdGlvbiAoKSB7IHJldHVybiAxOyB9IDogZnVuY3Rpb24gKCkgeyByZXR1cm4gMDsgfTtcbiAgICAgICAgdmFyIG5vdGlmeU9wczAgPSBNb2RBUEkuaG9va3MubWV0aG9kcy5ubWNfQ29tbWFuZEJhc2Vfbm90aWZ5T3BlcmF0b3JzMDtcbiAgICAgICAgdmFyIG5vdGlmeU9wcyA9IE1vZEFQSS5ob29rcy5tZXRob2RzLm5tY19Db21tYW5kQmFzZV9ub3RpZnlPcGVyYXRvcnM7XG4gICAgICAgIHZhciBhZGRDaGF0TXNnID0gJGNvbW1hbmRzZW5kZXIuJGFkZENoYXRNZXNzYWdlO1xuICAgICAgICBpZiAoIWZlZWRiYWNrKSB7XG4gICAgICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5ubWNfQ29tbWFuZEJhc2Vfbm90aWZ5T3BlcmF0b3JzMCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgICAgIE1vZEFQSS5ob29rcy5tZXRob2RzLm5tY19Db21tYW5kQmFzZV9ub3RpZnlPcGVyYXRvcnMgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICAgICAkY29tbWFuZHNlbmRlci4kYWRkQ2hhdE1lc3NhZ2UgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbW1hbmRNYW5hZ2VyLiRleGVjdXRlQ29tbWFuZCgkY29tbWFuZHNlbmRlciwgTW9kQVBJLnV0aWwuc3RyKGNvbW1hbmQpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZmVlZGJhY2spIHtcbiAgICAgICAgICAgIE1vZEFQSS5ob29rcy5tZXRob2RzLm5tY19Db21tYW5kQmFzZV9ub3RpZnlPcGVyYXRvcnMwID0gbm90aWZ5T3BzMDtcbiAgICAgICAgICAgIE1vZEFQSS5ob29rcy5tZXRob2RzLm5tY19Db21tYW5kQmFzZV9ub3RpZnlPcGVyYXRvcnMgPSBub3RpZnlPcHM7XG4gICAgICAgICAgICAkY29tbWFuZHNlbmRlci4kYWRkQ2hhdE1lc3NhZ2UgPSBhZGRDaGF0TXNnO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlc3RvcmUgb3JpZ2luYWwgcGVybWlzc2lvbnMgYW5kIGZlZWRiYWNrXG4gICAgICAgICRjb21tYW5kc2VuZGVyLiRjYW5Db21tYW5kU2VuZGVyVXNlQ29tbWFuZCA9IG9yaWdpbmFsQ2FuQ29tbWFuZDtcbiAgICAgICAgJGNvbW1hbmRzZW5kZXIuJHNlbmRDb21tYW5kRmVlZGJhY2sgPSBvcmlnaW5hbEZlZWRiYWNrO1xuICAgIH07XG59XG4iLCIvKlxuICAgIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cbiAgICBNb2QudHNcbiAgICBcbiAgICBDb3B5cmlnaHQgMjAyNSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICAgIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE92ZW5NREsuXG5cbiAgICBPdmVuTURLIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXJcbiAgICB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWVcbiAgICBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pXG4gICAgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICBPdmVuTURLIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWVxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1NcbiAgICBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYWxvbmdcbiAgICB3aXRoIE92ZW4gTURLLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbmltcG9ydCBkZWZhdWx0SWNvbiBmcm9tIFwiQVNTRVRTL2RlZmF1bHRJY29uLnBuZ1wiO1xudmFyIE9Nb2QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT01vZCgpIHtcbiAgICB9XG4gICAgT01vZC5jb25maWcgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgT01vZC5pbml0ID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIE9Nb2QucG9zdEluaXQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgT01vZC50aXRsZSA9IFwiRGVmYXVsdCBOYW1lXCI7XG4gICAgT01vZC52ZXJzaW9uID0gXCJcIjtcbiAgICBPTW9kLmRlc2NyaXB0aW9uID0gXCJEZWZhdWx0IE92ZW5NREsgRGVzY3JpcHRpb24uIFNldCAnZGVzY3JpcHRpb24nIGluIHlvdXIgT01vZCBjbGFzcyFcIjtcbiAgICBPTW9kLmNyZWRpdHMgPSBcIk5vbmUgR2l2ZW5cIjtcbiAgICBPTW9kLmljb24gPSBkZWZhdWx0SWNvbjtcbiAgICBPTW9kLmFjY2VwdGVkTWluZWNyYWZ0VmVyc2lvbnMgPSBudWxsO1xuICAgIE9Nb2QuYWNjZXB0ZWRFYWdsZXJVcGRhdGVzID0gbnVsbDtcbiAgICBPTW9kLmFjY2VwdGVkRUZWZXJzaW9ucyA9IG51bGw7XG4gICAgT01vZC5hY2NlcHRlZEVGRmxhdm91ciA9IFwiaW5qZWN0b3JcIjtcbiAgICBPTW9kLmNsaWVudFNpZGVPbmx5ID0gZmFsc2U7XG4gICAgT01vZC5zZXJ2ZXJTaWRlT25seSA9IGZhbHNlO1xuICAgIE9Nb2Qub25seV8xXzEyXzIgPSBmYWxzZTtcbiAgICBPTW9kLkRlYnVnX21vZGUgPSBmYWxzZTtcbiAgICByZXR1cm4gT01vZDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBPTW9kO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xuICAgIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbi8qXG4gIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cbiAgT0Jsb2NrLnRzXG5cbiAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xudmFyIE9CbG9jayA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPQmxvY2soYmxvY2tOYW1lLCBibG9ja0lELCB0ZXh0dXJlLCBvbkJyZWFrKSB7XG4gICAgICAgIHRoaXMuYmxvY2tOYW1lID0gYmxvY2tOYW1lO1xuICAgICAgICB0aGlzLmJsb2NrSUQgPSBibG9ja0lEO1xuICAgICAgICB0aGlzLmJsb2NrVGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICAgIHRoaXMub25CcmVhayA9IG9uQnJlYWs7XG4gICAgfVxuICAgIE9CbG9jay5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBCbG9ja0NsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5ibG9jay5CbG9ja1wiKTtcbiAgICAgICAgdmFyIEl0ZW1DbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpO1xuICAgICAgICB2YXIgY3JlYXRpdmVUYWI7XG4gICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIGNyZWF0aXZlVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLnRhYkJsb2NrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgY3JlYXRpdmVUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMuQlVJTERJTkdfQkxPQ0tTO1xuICAgICAgICB9XG4gICAgICAgIHZhciBibG9ja1N1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoQmxvY2tDbGFzcywgZnVuY3Rpb24gKGZuKSB7IHJldHVybiBmbi5sZW5ndGggPT09IDI7IH0pO1xuICAgICAgICB2YXIgYnJlYWtCbG9ja01ldGhvZCA9IEJsb2NrQ2xhc3MubWV0aG9kcy5icmVha0Jsb2NrLm1ldGhvZDtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBmdW5jdGlvbiBubWJfT2Jsb2NrKCkge1xuICAgICAgICAgICAgYmxvY2tTdXBlcih0aGlzLCBNb2RBUEkubWF0ZXJpYWxzLnJvY2suZ2V0UmVmKCkpO1xuICAgICAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgIHRoaXMuJGRlZmF1bHRCbG9ja1N0YXRlID0gdGhpcy4kYmxvY2tTdGF0ZS4kZ2V0QmFzZVN0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRzZXRDcmVhdGl2ZVRhYihjcmVhdGl2ZVRhYik7XG4gICAgICAgIH1cbiAgICAgICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2soQmxvY2tDbGFzcywgbm1iX09ibG9jayk7XG4gICAgICAgIG5tYl9PYmxvY2sucHJvdG90eXBlLiRicmVha0Jsb2NrID0gZnVuY3Rpb24gKCR3b3JsZCwgJGJsb2NrcG9zLCAkYmxvY2tzdGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGJyZWFrQmxvY2tNZXRob2QodGhpcywgJHdvcmxkLCAkYmxvY2twb3MsICRibG9ja3N0YXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyICQkb25CbG9ja0Rlc3Ryb3llZEJ5UGxheWVyTWV0aG9kID0gQmxvY2tDbGFzcy5tZXRob2RzLm9uQmxvY2tEZXN0cm95ZWRCeVBsYXllci5tZXRob2Q7XG4gICAgICAgIG5tYl9PYmxvY2sucHJvdG90eXBlLiRvbkJsb2NrRGVzdHJveWVkQnlQbGF5ZXIgPSBmdW5jdGlvbiAoJCR3b3JsZCwgJCRibG9ja3BvcywgJCRibG9ja3N0YXRlKSB7XG4gICAgICAgICAgICB2YXIgJCR3b3JsZCwgJCRibG9ja3BvcywgJCRibG9ja3N0YXRlO1xuICAgICAgICAgICAgc2VsZi5vbkJyZWFrLmNhbGwoJCR3b3JsZCwgJCRibG9ja3BvcywgJCRibG9ja3N0YXRlKTtcbiAgICAgICAgICAgIHJldHVybiAkJG9uQmxvY2tEZXN0cm95ZWRCeVBsYXllck1ldGhvZCh0aGlzLCAkJHdvcmxkLCAkJGJsb2NrcG9zLCAkJGJsb2Nrc3RhdGUpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgaW50ZXJuYWxSZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXN0b21fYmxvY2s7XG4gICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgY3VzdG9tX2Jsb2NrID0gbmV3IG5tYl9PYmxvY2soKVxuICAgICAgICAgICAgICAgICAgICAuJHNldEhhcmRuZXNzKDMuMClcbiAgICAgICAgICAgICAgICAgICAgLiRzZXRTdGVwU291bmQoQmxvY2tDbGFzcy5zdGF0aWNWYXJpYWJsZXMuc291bmRUeXBlUGlzdG9uKVxuICAgICAgICAgICAgICAgICAgICAuJHNldFVubG9jYWxpemVkTmFtZShNb2RBUEkudXRpbC5zdHIoX3RoaXMuYmxvY2tJRCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgY3VzdG9tX2Jsb2NrID0gbmV3IG5tYl9PYmxvY2soKVxuICAgICAgICAgICAgICAgICAgICAuJHNldEhhcmRuZXNzKC0xLjApXG4gICAgICAgICAgICAgICAgICAgIC4kc2V0U291bmRUeXBlKE1vZEFQSS5ibG9ja1NvdW5kcy5QTEFOVC5nZXRSZWYoKSlcbiAgICAgICAgICAgICAgICAgICAgLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKF90aGlzLmJsb2NrSUQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEJsb2NrQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3RlckJsb2NrMC5tZXRob2QoTW9kQVBJLmtleWdlbi5ibG9jayhfdGhpcy5ibG9ja0lEKSwgTW9kQVBJLnV0aWwuc3RyKF90aGlzLmJsb2NrSUQpLCBjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgSXRlbUNsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJJdGVtQmxvY2swLm1ldGhvZChjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgX3RoaXMuZml4dXBCbG9ja0lkcygpO1xuICAgICAgICAgICAgTW9kQVBJLmJsb2Nrc1tfdGhpcy5ibG9ja0lEXSA9IGN1c3RvbV9ibG9jaztcbiAgICAgICAgICAgIF90aGlzLmJsb2NrSW5zdGFuY2UgPSBjdXN0b21fYmxvY2s7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyZWQgYmxvY2sgb24gY2xpZW50OiBcIiArIF90aGlzLmJsb2NrSUQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgIHJldHVybiBjdXN0b21fYmxvY2s7XG4gICAgICAgIH07XG4gICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIGlmIChNb2RBUEkubWF0ZXJpYWxzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVybmFsUmVnaXN0ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsUmVnaXN0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgaWYgKE1vZEFQSS5ibG9ja3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChuZXcgbm1iX09ibG9jaygpKS4kc2V0SGFyZG5lc3MoLTEuMCkuJHNldFNvdW5kVHlwZShNb2RBUEkuYmxvY2tTb3VuZHMuUExBTlQuZ2V0UmVmKCkpLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKHRoaXMuYmxvY2tJRCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgT0Jsb2NrLnByb3RvdHlwZS5maXh1cEJsb2NrSWRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYmxvY2tSZWdpc3RyeSA9IE1vZEFQSS51dGlsXG4gICAgICAgICAgICAud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpLnN0YXRpY1ZhcmlhYmxlc1xuICAgICAgICAgICAgLmJsb2NrUmVnaXN0cnkpXG4gICAgICAgICAgICAuZ2V0Q29ycmVjdGl2ZSgpO1xuICAgICAgICB2YXIgQkxPQ0tfU1RBVEVfSURTID0gTW9kQVBJLnV0aWxcbiAgICAgICAgICAgIC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIikuc3RhdGljVmFyaWFibGVzXG4gICAgICAgICAgICAuQkxPQ0tfU1RBVEVfSURTKVxuICAgICAgICAgICAgLmdldENvcnJlY3RpdmUoKTtcbiAgICAgICAgYmxvY2tSZWdpc3RyeS5yZWdpc3RyeU9iamVjdHMuaGFzaFRhYmxlS1RvVi5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGJsb2NrXzEgPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsaWRTdGF0ZXMgPSBibG9ja18xLmdldEJsb2NrU3RhdGUoKS5nZXRWYWxpZFN0YXRlcygpO1xuICAgICAgICAgICAgICAgIHZhciBzdGF0ZUFycmF5ID0gdmFsaWRTdGF0ZXMuYXJyYXkgfHwgW3ZhbGlkU3RhdGVzLmVsZW1lbnRdO1xuICAgICAgICAgICAgICAgIHN0YXRlQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaWJsb2Nrc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoYmxvY2tSZWdpc3RyeS5nZXRJREZvck9iamVjdChibG9ja18xLmdldFJlZigpKSA8PCA0KSB8XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja18xLmdldE1ldGFGcm9tU3RhdGUoaWJsb2Nrc3RhdGUuZ2V0UmVmKCkpO1xuICAgICAgICAgICAgICAgICAgICBCTE9DS19TVEFURV9JRFMucHV0KGlibG9ja3N0YXRlLmdldFJlZigpLCBpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPQmxvY2sucHJvdG90eXBlLnJlZ2lzdGVyQmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXN0b21fYmxvY2ssIG5tYl9PQmxvY2ssIGl0ZW1DbGFzcywgYmxvY2tDbGFzcywgc2VsZjtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBuZXcgT0Jsb2NrKHRoaXMuYmxvY2tOYW1lLCB0aGlzLmJsb2NrSUQsIHRoaXMuYmxvY2tUZXh0dXJlLCB0aGlzLm9uQnJlYWspLnJlZ2lzdGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBubWJfT0Jsb2NrID0gbmV3IE9CbG9jayh0aGlzLmJsb2NrTmFtZSwgdGhpcy5ibG9ja0lELCB0aGlzLmJsb2NrVGV4dHVyZSwgdGhpcy5vbkJyZWFrKS5yZWdpc3RlcigpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIik7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbV9ibG9jayA9IG5tYl9PQmxvY2s7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3RlckJsb2NrMC5tZXRob2QoTW9kQVBJLmtleWdlbi5ibG9jayh0aGlzLmJsb2NrSUQpLCBNb2RBUEkudXRpbC5zdHIodGhpcy5ibG9ja0lEKSwgY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJJdGVtQmxvY2swLm1ldGhvZChjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXN0b21fYmxvY2sgfHwgXCJCbG9jayByZWdpc3RyYXRpb24gZmFpbGVkXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJCbG9jayhcXFwiXCIuY29uY2F0KHRoaXMuYmxvY2tJRCwgXCJcXFwiLCBcIikuY29uY2F0KHRoaXMub25CcmVhaywgXCIpO1wiKSk7XG4gICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2lua1wiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UsIGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2luazpyZWdpc3Rlcml0ZW1zXCIsIGZ1bmN0aW9uIChyZW5kZXJJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVySXRlbS5yZWdpc3RlckJsb2NrKGN1c3RvbV9ibG9jaywgTW9kQVBJLnV0aWwuc3RyKHNlbGYuYmxvY2tJRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuTDEwTi5zZXQoXCJ0aWxlLlwiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLm5hbWVcIiksIHNlbGYuYmxvY2tOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2V0IGxvY2FsaXphdGlvbiBmb3IgYmxvY2sgXCIuY29uY2F0KHNlbGYuYmxvY2tJRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9ibG9jay9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBcImJsb2NrL2N1YmVfYWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsOiBcImJsb2Nrcy9cIi5jb25jYXQoc2VsZi5ibG9ja0lEKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9pdGVtL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IFwiYmxvY2svXCIuY29uY2F0KHNlbGYuYmxvY2tJRCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlyZHBlcnNvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRpb246IFsxMCwgLTQ1LCAxNzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IFswLCAxLjUsIC0yLjc1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiBbMC4zNzUsIDAuMzc1LCAwLjM3NV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9ibG9ja3N0YXRlcy9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHNlbGYuYmxvY2tJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHNlbGYuYmxvY2tUZXh0dXJlKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9ibG9ja3MvXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIucG5nXCIpLCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBidWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rOnJlZ2lzdGVyaXRlbXNcIiwgZnVuY3Rpb24gKHJlbmRlckl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvb2wgcmVnaXN0ZXIgYmxvY2tcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3VzdG9tX2Jsb2NrIHx8IFwiQmxvY2sgcmVnaXN0cmF0aW9uIGZhaWxlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJJdGVtLnJlZ2lzdGVyQmxvY2soY3VzdG9tX2Jsb2NrLCBNb2RBUEkudXRpbC5zdHIoX3RoaXMuYmxvY2tJRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuTDEwTi5zZXQoXCJ0aWxlLlwiICsgdGhpcy5ibG9ja0lEICsgXCIubmFtZVwiLCB0aGlzLmJsb2NrTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNldCBsb2NhbGl6YXRpb24gZm9yIGJsb2NrIFwiLmNvbmNhdChzZWxmLmJsb2NrSUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1c3RvbV9ibG9jayB8fCBcIkJsb2NrIHJlZ2lzdHJhdGlvbiBmYWlsZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvbW9kZWxzL2Jsb2NrL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmVudFwiOiBcImJsb2NrL2N1YmVfYWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0dXJlc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWxsXCI6IFwiYmxvY2tzL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9pdGVtL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmVudFwiOiBcImJsb2NrL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvYmxvY2tzdGF0ZXMvXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFyaWFudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5vcm1hbFwiOiB7IFwibW9kZWxcIjogXCJcIi5jb25jYXQodGhpcy5ibG9ja0lEKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goc2VsZi5ibG9ja1RleHR1cmUpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L3RleHR1cmVzL2Jsb2Nrcy9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5wbmdcIiksIGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVyQmxvY2soXFxcIlwiLmNvbmNhdCh0aGlzLmJsb2NrSUQsIFwiXFxcIiwgXCIpLmNvbmNhdCh0aGlzLm9uQnJlYWssIFwiKTtcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmJsb2Nrc1t0aGlzLmJsb2NrSURdID0gY3VzdG9tX2Jsb2NrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBPQmxvY2s7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgT0Jsb2NrO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xuICAgIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBPRW50aXR5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9FbnRpdHkoZW50aXR5TmFtZSwgZW50aXR5SUQsIGVudGl0eVRleHR1cmUsIGVudGl0eU1vZGVsLCBlbnRpdHlCcmVlZEl0ZW0sIGVudGl0eURyb3BJdGVtKSB7XG4gICAgICAgIHRoaXMuZW50aXR5TmFtZSA9IGVudGl0eU5hbWU7XG4gICAgICAgIHRoaXMuZW50aXR5SUQgPSBlbnRpdHlJRDtcbiAgICAgICAgdGhpcy5lbnRpdHlUZXh0dXJlID0gZW50aXR5VGV4dHVyZTtcbiAgICAgICAgdGhpcy5lbnRpdHlNb2RlbCA9IGVudGl0eU1vZGVsO1xuICAgICAgICB0aGlzLmVudGl0eUJyZWVkSXRlbSA9IGVudGl0eUJyZWVkSXRlbSB8fCBcIndoZWF0XCI7IC8vZGVmYXVsdCBicmVlZCBpdGVtXG4gICAgICAgIHRoaXMuZW50aXR5RHJvcEl0ZW0gPSBlbnRpdHlEcm9wSXRlbSB8fCBcImZlYXRoZXJcIjsgLy9kZWZhdWx0IGRyb3AgaXRlbVxuICAgIH1cbiAgICBPRW50aXR5LnByb3RvdHlwZS53YWl0Rm9yUmVuZGVyTWFuYWdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzLCByZWopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNb2RBUEkubWMucmVuZGVyTWFuYWdlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2ssIDEgLyAyMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT0VudGl0eS5wcm90b3R5cGUucmVnaXN0ZXJFbnRpdHlDbGllbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPRW50aXR5IGRvZXMgbm90IHN1cHBvcnQgMS4xMiwgcGxlYXNlIHVzZSAxLjguOCBmb3IgZnVsbCBzdXBwb3J0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUud2FybihcImVudGl0aWVzIGFyZSBub3QgZmluaXNoZWQgeWV0ISBVc2UgYXQgeW91ciBvd24gcmlzayFcIik7XG4gICAgICAgIC8vcmV0dXJuO1xuICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5qbF9TdHJpbmdfZm9ybWF0ID0gTW9kQVBJLmhvb2tzLm1ldGhvZHMubmxldl9IU3RyaW5nX2Zvcm1hdDsgLy90ZW1wb3JhcnkgdGhpbmcgdG8gZml4IGFuIGlzc3VlIGluIGVhZ2xlcmNyYWZ0XG4gICAgICAgIC8vIFV0aWxzXG4gICAgICAgIGZ1bmN0aW9uIEFJVGFzayhuYW1lLCBsZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5haS5cIiArIG5hbWUpLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gbGVuZ3RoOyB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgUmVzb3VyY2VMb2NhdGlvbiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiUmVzb3VyY2VMb2NhdGlvblwiKS5jb25zdHJ1Y3RvcnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDE7IH0pO1xuICAgICAgICB2YXIgRW50aXR5UGxheWVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnRpdHlQbGF5ZXJcIik7XG4gICAgICAgIHZhciBHbFN0YXRlTWFuYWdlciA9IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QudmFsdWVzKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiR2xTdGF0ZU1hbmFnZXJcIikuc3RhdGljTWV0aG9kcykubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiBbeC5tZXRob2ROYW1lU2hvcnQsIHgubWV0aG9kXTsgfSkpO1xuICAgICAgICB2YXIgU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIlNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzXCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgLy8gU1RBUlQgQ1VTVE9NIEVOVElUWVxuICAgICAgICB2YXIgZW50aXR5Q2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5wYXNzaXZlLkVudGl0eUFuaW1hbFwiKTtcbiAgICAgICAgdmFyIGVudGl0eVN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoZW50aXR5Q2xhc3MsIGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gMjsgfSk7XG4gICAgICAgIHZhciBubWVfT0VudGl0eSA9IGZ1bmN0aW9uIG5tZV9PRW50aXR5KCR3b3JsZEluKSB7XG4gICAgICAgICAgICBlbnRpdHlTdXBlcih0aGlzLCAkd29ybGRJbik7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC5zZXRTaXplKDAuNCwgMC43KTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDAsIEFJVGFzayhcIkVudGl0eUFJU3dpbW1pbmdcIiwgMSkodGhpcykpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMSwgQUlUYXNrKFwiRW50aXR5QUlQYW5pY1wiLCAyKSh0aGlzLCAxLjkpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDIsIEFJVGFzayhcIkVudGl0eUFJTWF0ZVwiLCAyKSh0aGlzLCAxLjApKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDMsIEFJVGFzayhcIkVudGl0eUFJVGVtcHRcIiwgNCkodGhpcywgMS41LCBNb2RBUEkuaXRlbXMuYnJlYWQuZ2V0UmVmKCksIDApKTsgLy93b24ndCBjYXVzZSBhIHByb2JsZW0gYXMgdGhlIGJyZWFkIGlzIG9idGFpbmVkIHdoZW4gdGhlIGVudGl0eSBpcyBjb25zdHJ1Y3RlZC5cbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDQsIEFJVGFzayhcIkVudGl0eUFJRm9sbG93UGFyZW50XCIsIDIpKHRoaXMsIDEuMikpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNSwgQUlUYXNrKFwiRW50aXR5QUlXYW5kZXJcIiwgMikodGhpcywgMS4xKSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg2LCBBSVRhc2soXCJFbnRpdHlBSVdhdGNoQ2xvc2VzdFwiLCAzKSh0aGlzLCBNb2RBUEkudXRpbC5hc0NsYXNzKEVudGl0eVBsYXllci5jbGFzcyksIDYpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDcsIEFJVGFzayhcIkVudGl0eUFJTG9va0lkbGVcIiwgMSkodGhpcykpO1xuICAgICAgICB9O1xuICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhlbnRpdHlDbGFzcywgbm1lX09FbnRpdHkpO1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldEV5ZUhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlZC5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvcmlnaW5hbEFwcGx5RW50aXR5QXR0cmlidXRlcyA9IG5tZV9PRW50aXR5LnByb3RvdHlwZS4kYXBwbHlFbnRpdHlBdHRyaWJ1dGVzO1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGFwcGx5RW50aXR5QXR0cmlidXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgb3JpZ2luYWxBcHBseUVudGl0eUF0dHJpYnV0ZXMuYXBwbHkodGhpcywgW10pO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tYXhIZWFsdGgpLnNldEJhc2VWYWx1ZSg1KTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZCkuc2V0QmFzZVZhbHVlKDAuMjUpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgb3JpZ2luYWxMaXZpbmdVcGRhdGUgPSBubWVfT0VudGl0eS5wcm90b3R5cGUuJG9uTGl2aW5nVXBkYXRlO1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJG9uTGl2aW5nVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICBvcmlnaW5hbExpdmluZ1VwZGF0ZS5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgICAgICBpZiAodGhpcy53cmFwcGVkLmlzSW5XYXRlcigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLm1vdGlvblkgKj0gMC41O1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZCkuc2V0QmFzZVZhbHVlKDEuNCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1vdmVtZW50U3BlZWQpLnNldEJhc2VWYWx1ZSgwLjI1KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXRMaXZpbmdTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBNb2RBUEkudXRpbC5zdHIoXCJtb2IuXCIgKyB0aGlzLmVudGl0eUlEICsgXCIucXVhY2tcIik7XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0SHVydFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIHRoaXMuZW50aXR5SUQgKyBcIi5xdWFja1wiKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXREZWF0aFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIHRoaXMuZW50aXR5SUQgKyBcIi5xdWFja1wiKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRwbGF5U3RlcFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQucGxheVNvdW5kKE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIHRoaXMuZW50aXR5SUQgKyBcIi5zdGVwXCIpLCAwLjIsIDEpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldERyb3BJdGVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS5pdGVtcy5mZWF0aGVyLmdldFJlZigpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGNyZWF0ZUNoaWxkID0gZnVuY3Rpb24gKG90aGVyUGFyZW50KSB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IG5tZV9PRW50aXR5KChfYiA9IChfYSA9IHRoaXMud3JhcHBlZC53b3JsZE9iaikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldFJlZigpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBudWxsKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRpc0JyZWVkaW5nSXRlbSA9IGZ1bmN0aW9uIChpdGVtc3RhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtc3RhY2sgIT09IG51bGwgJiYgaXRlbXN0YWNrLiRnZXRJdGVtKCkgPT09IE1vZEFQSS5pdGVtc1tcIlwiLmNvbmNhdCh0aGlzLmVudGl0eUJyZWVkSXRlbSldLmdldFJlZigpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBFTkQgQ1VTVE9NIEVOVElUWVxuICAgICAgICAvLyBTVEFSVCBDVVNUT00gTU9ERUxcbiAgICAgICAgdmFyIG1vZGVsQ2hpY2tlbkNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jbGllbnQubW9kZWwuXCIuY29uY2F0KHRoaXMuZW50aXR5TW9kZWwpKTtcbiAgICAgICAgdmFyIG1vZGVsQ2hpY2tlblN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIobW9kZWxDaGlja2VuQ2xhc3MpOyAvL3doaWxlIHN1cGVyIGlzbid0IHVzZWQgd2hlbiBleHRlbmRpbmcgdGhpcyBjbGFzcywgamF2YSBpbXBsaWVzIHRoZSBjYWxsLlxuICAgICAgICB2YXIgbm1jbV9PRW50aXR5TW9kZWwgPSBmdW5jdGlvbiBubWNtX09FbnRpdHlNb2RlbCgpIHtcbiAgICAgICAgICAgIG1vZGVsQ2hpY2tlblN1cGVyKHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhtb2RlbENoaWNrZW5DbGFzcywgbm1jbV9PRW50aXR5TW9kZWwpO1xuICAgICAgICAvLyBFTkQgQ1VTVE9NIE1PREVMXG4gICAgICAgIC8vIFNUQVJUIENVU1RPTSBSRU5ERVJFUlxuICAgICAgICB2YXIgcmVuZGVyQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNsaWVudC5yZW5kZXJlci5lbnRpdHkuUmVuZGVyTGl2aW5nXCIpO1xuICAgICAgICB2YXIgcmVuZGVyU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihyZW5kZXJDbGFzcywgZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSA0OyB9KTtcbiAgICAgICAgdmFyIGR1Y2tUZXh0dXJlcyA9IFJlc291cmNlTG9jYXRpb24oTW9kQVBJLnV0aWwuc3RyKFwidGV4dHVyZXMvZW50aXR5L1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi5wbmdcIikpKTtcbiAgICAgICAgdmFyIG5tY3JlX1JlbmRlck9FbnRpdHkgPSBmdW5jdGlvbiBubWNyZV9SZW5kZXJPRW50aXR5KHJlbmRlck1hbmFnZXIsIG1vZGVsQmFzZUluLCBzaGFkb3dTaXplSW4pIHtcbiAgICAgICAgICAgIHJlbmRlclN1cGVyKHRoaXMsIHJlbmRlck1hbmFnZXIsIG1vZGVsQmFzZUluLCBzaGFkb3dTaXplSW4pO1xuICAgICAgICB9O1xuICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhyZW5kZXJDbGFzcywgbm1jcmVfUmVuZGVyT0VudGl0eSk7XG4gICAgICAgIG5tY3JlX1JlbmRlck9FbnRpdHkucHJvdG90eXBlLiRnZXRFbnRpdHlUZXh0dXJlID0gZnVuY3Rpb24gKGVudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuIGR1Y2tUZXh0dXJlcztcbiAgICAgICAgfTtcbiAgICAgICAgbm1jcmVfUmVuZGVyT0VudGl0eS5wcm90b3R5cGUuJGhhbmRsZVJvdGF0aW9uRmxvYXQgPSBmdW5jdGlvbiAoZW50aXR5LCBwYXJ0aWFsVGlja3MpIHtcbiAgICAgICAgICAgIGVudGl0eSA9IE1vZEFQSS51dGlsLndyYXAoZW50aXR5KTtcbiAgICAgICAgICAgIGlmICgoIWVudGl0eS5vbkdyb3VuZCkgJiYgKCFlbnRpdHkuaXNJbldhdGVyKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7IC8vZmFsbGluZ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBJRCA9IE1vZEFQSS5rZXlnZW4uZW50aXR5KHRoaXMuZW50aXR5SUQpO1xuICAgICAgICBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlMaXN0XCIpLnN0YXRpY01ldGhvZHMuYWRkTWFwcGluZzAubWV0aG9kKE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCB7XG4gICAgICAgICAgICAkY3JlYXRlRW50aXR5OiBmdW5jdGlvbiAoJHdvcmxkSW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG5tZV9PRW50aXR5KCR3b3JsZEluKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgTW9kQVBJLnV0aWwuc3RyKHRoaXMuZW50aXR5SUQpLCBJRCwgMHg1ZTNlMmQsIC8vZWdnIGJhc2VcbiAgICAgICAgMHgyNjkxNjYgLy9lZ2cgc3BvdHNcbiAgICAgICAgKTtcbiAgICAgICAgdmFyIFNwYXduUGxhY2VtZW50VHlwZSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eUxpdmluZyRTcGF3blBsYWNlbWVudFR5cGVcIikuc3RhdGljVmFyaWFibGVzO1xuICAgICAgICB2YXIgRU5USVRZX1BMQUNFTUVOVFMgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eVNwYXduUGxhY2VtZW50UmVnaXN0cnlcIilcbiAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMuRU5USVRZX1BMQUNFTUVOVFMpO1xuICAgICAgICBFTlRJVFlfUExBQ0VNRU5UUy5wdXQoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIFNwYXduUGxhY2VtZW50VHlwZS5PTl9HUk9VTkQpO1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcignYm9vdHN0cmFwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIFNwYXduTGlzdEVudHJ5ID0gTW9kQVBJLnJlZmxlY3RcbiAgICAgICAgICAgICAgICAuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZUdlbkJhc2UkU3Bhd25MaXN0RW50cnlcIilcbiAgICAgICAgICAgICAgICAuY29uc3RydWN0b3JzLmZpbmQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSA0OyB9KTtcbiAgICAgICAgICAgIHZhciBCaW9tZUdlblN3YW1wID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMuc3dhbXBsYW5kKTtcbiAgICAgICAgICAgIHZhciBCaW9tZUdlblJpdmVyID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMucml2ZXIpO1xuICAgICAgICAgICAgdmFyIEJpb21lR2VuQmVhY2ggPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlXCIpXG4gICAgICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5iZWFjaCk7XG4gICAgICAgICAgICB2YXIgZHVja1NwYXduU3dhbXAgPSBTcGF3bkxpc3RFbnRyeShNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgMjIsIDMsIDUpO1xuICAgICAgICAgICAgdmFyIGR1Y2tTcGF3blJpdmVyQmVkID0gU3Bhd25MaXN0RW50cnkoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIDEwLCA1LCA5KTtcbiAgICAgICAgICAgIHZhciBkdWNrU3Bhd25CZWFjaCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAyNCwgMiwgMyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhubWVfT0VudGl0eSk7XG4gICAgICAgICAgICBCaW9tZUdlblN3YW1wLnNwYXduYWJsZUNyZWF0dXJlTGlzdC5hZGQoZHVja1NwYXduU3dhbXApO1xuICAgICAgICAgICAgQmlvbWVHZW5SaXZlci5zcGF3bmFibGVDcmVhdHVyZUxpc3QuYWRkKGR1Y2tTcGF3blJpdmVyQmVkKTtcbiAgICAgICAgICAgIEJpb21lR2VuQmVhY2guc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25CZWFjaCk7XG4gICAgICAgIH0pO1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIEFzeW5jU2luay5MMTBOLnNldChcImVudGl0eS5cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIubmFtZVwiKSwgdGhpcy5lbnRpdHlOYW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7IH0pO1xuICAgICAgICByZXR1cm4gX2EgPSB7fSxcbiAgICAgICAgICAgIF9hW1wiRW50aXR5XCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXSA9IG5tZV9PRW50aXR5LFxuICAgICAgICAgICAgX2FbXCJNb2RlbFwiLmNvbmNhdCh0aGlzLmVudGl0eUlEKV0gPSBubWNtX09FbnRpdHlNb2RlbCxcbiAgICAgICAgICAgIF9hW1wiUmVuZGVyXCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXSA9IG5tY3JlX1JlbmRlck9FbnRpdHksXG4gICAgICAgICAgICBfYVtcIlwiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIlRleHR1cmVzXCIpXSA9IGR1Y2tUZXh0dXJlcyxcbiAgICAgICAgICAgIF9hO1xuICAgIH07XG4gICAgT0VudGl0eS5wcm90b3R5cGUucmVnaXN0ZXJPRW50aXR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyRW50aXR5U2VydmVyKFxcXCJcIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCJcXFwiLCBcXFwiXCIpLmNvbmNhdCh0aGlzLmVudGl0eU5hbWUsIFwiXFxcIiwgXFxcIlwiKS5jb25jYXQodGhpcy5lbnRpdHlNb2RlbCwgXCJcXFwiKTtcIikpO1xuICAgICAgICB2YXIgZGF0YSA9IHRoaXMucmVnaXN0ZXJFbnRpdHlDbGllbnQoKTtcbiAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfaykge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2subGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2IgPSAoX2EgPSBBc3luY1NpbmspLnNldEZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYyA9IFtcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvdGV4dHVyZXMvZW50aXR5L1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi5wbmdcIildO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2godGhpcy5lbnRpdHlUZXh0dXJlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFs0IC8qeWllbGQqLywgKF9rLnNlbnQoKSkuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmFwcGx5KF9hLCBfYy5jb25jYXQoW19rLnNlbnQoKV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5oaWRlRmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvdGV4dHVyZXMvZW50aXR5L2R1Y2sucG5nLm1jbWV0YVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMud2FpdEZvclJlbmRlck1hbmFnZXIoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9rLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lID0gKF9kID0gQXN5bmNTaW5rKS5zZXRGaWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2YgPSBbXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L3NvdW5kcy9tb2IvXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiL3F1YWNrLm9nZ1wiKV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChcImRhdGE6YXVkaW8vb2dnO2Jhc2U2NCxUMmRuVXdBQ0FBQUFBQUFBQUFEVlBRQUFBQUFBQU1nQWZ1RUJIZ0YyYjNKaWFYTUFBQUFBQVlBK0FBQUFBQUFBbUlZQkFBQUFBQUNwQVU5bloxTUFBQUFBQUFBQUFBQUExVDBBQUFFQUFBQTVEMTR1RDRiLy8vLy8vLy8vLy8vLy8vLy80QU4yYjNKaWFYTTBBQUFBV0dsd2FDNVBjbWNnYkdsaVZtOXlZbWx6SUVrZ01qQXlNREEzTURRZ0tGSmxaSFZqYVc1bklFVnVkbWx5YjI1dFpXNTBLUUlBQUFBa0FBQUFWRWxVVEVVOVJIVmpheUJSZFdGamF5QXRJRk52ZFc1a0lFVm1abVZqZENBb1NFUXBGZ0FBQUVGU1ZFbFRWRDFIWVcxcGJtY2dVMjkxYm1RZ1JsZ0JCWFp2Y21KcGN5UkNRMVlCQUVBQUFCaENFQ29GcldPT09zZ1ZJWXdab3FCQ3lpbkhIVUxRSWFNa1E0ZzZ4alhIR0dOSHVXU0tRc21CMEpCVkFBQkFBQUNrSEZkUWNra3Q1NXh6b3hoWHpISG9JT2VjYytVZ1o4eHhDU1hubkhPT09lZVNjbzR4NTV4em94aFhEbklwTGVlY2M0RVVSNHB4cHhqbm5IT2tIRWVLY2FnWTU1eHpiVEcza25MT09lZWNjK1lnaDFKeXJqWG5uSE9rR0djT2Nnc2w1NXh6eGlCbnpISHJJT2VjYzR3MXQ5Unl6am5ubkhQT09lZWNjODQ1NTV4empESG5uSFBPT2VlY2MyNHg1eFp6cmpubm5IUE9PZWNjYzg0NTU1eHpJRFJrRlFDUUFBQ2dvU2lLNGlnT0VCcXlDZ0RJQUFBUVFIRVVSNUVVUzdFY3k5RWtEUWdOV1FVQUFBRUFDQUFBb0VpR3BFaUtwVmlPWm1tZUpucWlLSnFpS3F1eWFjcXlMTXV5NjdvdUVCcXlDZ0JJQUFCUVVSVEZjQlFIQ0ExWkJRQmtBQUFJWUNpS296aU81RmlTcFZtZUI0U0dyQUlBZ0FBQUJBQUFVQXhIc1JSTjhTVFA4anpQOHp6UDh6elA4enpQOHp6UDh6elA4endOQ0ExWkJRQWdBQUFBZ2loa0dBTkNRMVlCQUVBQUFBZ2hHaGxEblZJU1hBb1dRaHdSUXgxQ3prT3BwWVBnS1lVbFk5SlRyRUVJSVh6dlBmZmVlKytCMEpCVkFBQVFBQUJoRkRpSWdjY2tDQ0dFWWhRblJIR21JQWdoaE9Va1dNcDU2Q1FJM1lNUVFyaWNlOHU1OTk1N0lEUmtGUUFBQ0FEQUlJUVFRZ2doaEJCQ0NDbWtsRkpJS2FhWVlvb3B4eHh6ekRISElJTU1NdWlnazA0NnlhU1NUanJLSktPT1Vtc3B0UlJUVExIbEZtT3R0ZGFjYzY5QktXT01NY1lZWTR3eHhoaGpqREhHR0NNSURWa0ZBSUFBQUJBR0dXU1FRUWdoaEJSU1NDbW1tSExNTWNjY0EwSkRWZ0VBZ0FBQUFnQUFBQnhGVWlSSGNpUkhraVRKa2l4Smt6ekxzenpMc3p4TjFFUk5GVlhWVlczWDltMWY5bTNmMVdYZjltWGIxV1ZkbG1YZHRXMWQxbDFkMTNWZDEzVmQxM1ZkMTNWZDEzVmQxNEhRa0ZVQWdBUUFnSTdrT0k3a09JN2tTSTZrU0FvUUdySUtBSkFCQUJBQWdLTTRpdU5JanVSWWppVlpraVpwbG1kNWxxZDVtcWlKSGhBYXNnb0FBQVFBRUFBQUFBQUFnS0lvaXFNNGppUlpscVpwbnFkNm9paWFxcXFLcHFtcXFtcWFwbW1hcG1tYXBtbWFwbW1hcG1tYXBtbWFwbW1hcG1tYXBtbWFwbW1hcG1rQ29TR3JBQUFKQUFBZHgzRWNSM0VjeDNFa1I1SWtJRFJrRlFBZ0F3QWdBQUJEVVJ4RmNpekhralJMc3p6TDAwVFA5RnhSTm5WVFYyMGdOR1FWQUFBSUFDQUFBQUFBQUFESGN6ekhjenpKa3p6TGN6ekhrenhKMHpSTjB6Uk4welJOMHpSTjB6Uk4welJOMHpSTjB6Uk4welJOMHpSTjB6Uk4welJOMHpSTjB6Uk5BMEpEVmdJQVpBQUFITVdZZTFKS3FjNUJTREVuWnp2R0hMU1ltdzRWUWt4YUxUWmtpQmdtcmNmU0tVS1FvNXBLeUpBeGltb3BwVk1JS2FtbGxOQXh4cVNtMWxvcXBiUWVDQTFaRVFCRUFRQUFDQ0hHRUdPSU1RWWhneEF4eGlCMEVDTEdISVFNUWdZaGxCUkt5U0NFRWtKSmtXTU1RZ2NoZ3hCU0NhRmtFRUlwSVpVQ0FBQUNIQUFBQWl5RVFrTldCQUJ4QWdBSVFzNGh4aUJFakVFSUphUVVRa2dwWWd4QzVweVV6RGtwcFpUV1FpbXBSWXhCeUp5VGtqa25KWlRTVWltbHRWQkthNldVMWtJcHJiWFdhazJ0eFJwS2FTMlUwbG9wcGJYVVdvMnR0Um9qeGlCa3prbkpuSk5TU21tdGxOSmE1aHlWRGtKS0hZU1VTa290bHBSYXpKeVQwa0ZIcFlPUVVra2x0cEpTakNXVjJFcEtNWmFVWW13dHh0cGlyRFdVMGxwSkpiYVNVb3d0dGhwYmpEVkhqRUhKbkpPU09TZWxsTkphS2FtMXpEa3BIWVNVT2djbGxaUmlMQ1cxbURrbnBZT1FVZ2NocFpKU2JDV2wyRUlwclpXVVlpd2x0ZGhpekxXMTJHb29xY1dTVW93bHBSaGJqTFcyMkdyc3BMUVdVb2t0bE5KaWk3SFcxbHF0b1pRWVMwb3hscFJpakRIVzNHS3NPWlRTWWtrbHhwSlNpeTIyWEZ1TU5hZldjbTB0MXR4aXpEWEdYSHV0dGVmVVdxMnB0VnBiakRYSEduT3N0ZWJlUVdrdGxCSmJLS25GMWxxdExjWmFReW14bFpSaUxDWEYyR0xNdGJWWWN5Z2x4cEpTakNXbEdGdU10Y1lZYzA2dDFkaGl6RFcxVm11dHRlY1lhK3lwdFZwYmpEVzMyR3F0dGZaZWMreTFBQUNBQVFjQWdBQVR5a0NoSVNzQmdDZ0FBTUlZcFJpRDBDQ2tsR01RR29TVVlnNUNwUlJqemttcGxHTE1PU21aWTg1QlNDVmp6amtJSllVUVNra2xwUkJDS1NXbFZBQUFRSUVEQUVDQURab1Npd01VR3JJU0FBZ0pBQ0FRVW9veDV5Q1VrbEpLRVVKTU9RWWhoRkpTYWkxQ1NDbm1ISVJRU2txdFZVd3g1aHlFRUVwSnFiVktNY2FjZ3hCQ0tTbTFsam5uSElRUVNra3BwZFl5NXB5REVFSXBLYVhVV2djaGhCQktLU1dsMWxycklJUVFRaW1scE5SYWF5R0VFRW9wcGFTVVdvc3hoQkJDS2FXa2tsSnJNWlpTU2trcHBaUlNheTNHVWtvcEthV1VVa3V0eFpoU1NpbWwxbHByTGNZWVUwb3BwZFJhYTdIRkdHTnFyYlhXV29zeHhoaHJUYTIxMWxxTE1jWVlZNjBGQUFBY09BQUFCQmhCSnhsVkZtR2pDUmNlZ0VKRFZnUUFVUUFBZ0RHSU1jUVljbzVCeUtCRXpqRUptWVRJT1VlbGs1SkpDYUdWMWpJcG9aV1NXdVNjazlKUnlxaVVsa0pwbWFUU1dtaWhBQUN3QXdjQXNBTUxvZENRbFFCQUhnQUFnWkJTakRubkhGS0tNY2FjY3c0cHBSaGp6am1uR0dQTU9lZWNVNHd4NXB4enpqSEduSFBPT2VjWVk4NDU1NXh6empubm5ITU9RdWVjYzg0NUI2Rnp6am5uSUlUUU9lZWNjeEJDS0FBQXFNQUJBQ0RBUnBITkNVYUNDZzFaQ1FDa0FnQUF5RERtbkhOU1VtcVVZZ3hDQ0tXazFDakZHSVFRU2trcGN3NUNDS1drMUZyR0dIUVNTa21wdFE1Q0tLV2sxRnFNSFlRU1NrbXB0Umc3Q0tXa2xGSnJNWFlRU2ttcHBkWmlMS1drMUZwck1kWmFTa21wdGRaaXJEV2wxRnFNTWRaYWEwcXB0UmhqckxYV0FnREFFeHdBZ0Fwc1dCM2hwR2dzc05DUWxRQkFCZ0RBRUFEQUFRQUFBdzRBQUFFbWxJRkNRMVlDQUtrQUFJQXhqRG5uSElSU0dxV2NneEJDS2FrMFNqa0hJWVJTVXNxY2sxQktLU20xbGprbnBaUlNVbXF0ZzFCS1NpbTFGbU1Ib1pTVVVtb3R4ZzVDS2ltMUZtT05IWVJTVW1vdHhoaERLU20xRm1PTXRZWlNVbW90eGhockxTbTFGbU9OdGVaYVVtb3R4aHByemJVQUFJUUdCd0N3QXh0V1J6Z3BHZ3NzTkdRbEFKQUhBRUFneEJoampEbUhsR0tNTWVlY1Ewb3h4cGh6empIR0dIUE9PZWNZWTR3NTU1eHpqREhubkhQT09jYVljODQ1NXh4enpqbm5uSE9PT2VlY2M4NDU1NXh6empubm5IUE9PZWVjYzg0SkFBQXFjQUFBQ0xCUlpIT0NrYUJDUTFZQ0FPRUFBSUF4akRuSEdIUVNVbXFZZ2c1Q0NDV2swRUtqbUhNUVFpaWxwTlF5NktTa1ZFcEtyY1dXT1NlbHBGSlNTcTNGRGtKS0thWFVXb3d4ZGhCU1NpbWwxbUtNdFlOUVNrb3R4VmhqclIyRVVsSnFyYlVZYXcybHBOUmFiREhXbW5Nb0phWFdXb3l4MXBwTFNxM0ZXR090dWVaY1Vtb3R0bGhyclRYbjFGcU1NZGFhYTg2OXA5WmlqTEhXbW5QdXZRQUFrd2NIQUtnRUcyZFlTVG9ySEEwdU5HUWxBSkFiQUlBZ3hKaHp6a0VJSVlRUVFnZ2hVb294NXlDRUVFSUlJWlJTU3FRVVk4NUJDQ0dFRUVJSUlZU01NZWVnZ3hCQ0NLV1VVa29wR1dQT1FRZ2hoQkJLS0tXRUVqcm5vSU1RUWdtbGxGSktLYVYwemprSUlZUVFTaW1sbEZKSzZTQ0VFRUlJcFpSU1NpbWxsTkpCQ0NHRVVFb3BwWlJTU2lrbGhCQkNDS1dVVWtvcHBaUlNTZ2doaEJCS0thV1VVa29wcFpRUVFnaWxsRkpLS2FXVVVrb3BJWVFRU2ltbGxGSktLYVdVVWtJSXBaUlNTaW1sbEZKS0thV0VFRW9wcFpSU1NpbWxsRkpLQ2FHVVVrb3BwWlJTU2ltbGxCSktLYVdVVWtvcHBaUlNTaWtsbEZKS0thV1VVa29wcFpSU1NpaWxsRkpLS2FXVVVrb3BwWlJRU2ltbGxGSktLYVdVVWtvcG9aUlNTaW1sbEZKS0thV1VVZ29BQURwd0FBQUlNS0xTUXV3MDQ4b2pjRVFod3dSVWFNaEtBQ0FjQUFCQUJEb0lJWVFRUWdnUmN4QkNDQ0dFRUVLSW1JTVFRZ2doaEJCQ0NDR0VFRUlJcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwUlFBZFpuaEFCZzlZZU1NSzBsbmhhUEJoWWFzQkFEU0FnQUFZeGhqakNuSXBMTVdZNjBOWXhCQ0I1MkVGR3FvSmFhR01RZ2hkRkJLU2kyMldITUdvYVJTU2trdHhsaUR6VDJEVUVvcHBhUVdZNjA1RitOQlNDV2wxR0tydGVjY2pPNGdsSkpTU2pIV21uUHV2V2pRU1VtcHRWcHo3ajBIWHp3SXBhVFdXb3c5QngrTU1LS1VsbUtzc2RZY2ZCRkdHRkZLU3kzR21udk52UmhqaEVvcHhscDd6cm5uWEl3UlBxVVdZNjY1OXg1OExzTDQ0bUxNT2ZmaWd3OCtDR0dNa0RIbTJIUHd2UmRqakEvQ3lGeHpMc0lZNDRzd3d2Z2diSzI1QjErTUVVWVlZM3p2TmZpZ2V6SENDQ09NTWNJSTNYUFJSZmhpakRGR0dGK0VBUUM1RVE0QWlBdEdFbEpuR1ZZYWNlTUpHQ0tRUWtOV0FRQXhBQUFFTWNZZ3BKQlNTaW5GR0dPTU1jWVlZNHd4eGhoampESEduR1BPT2VlY0FBREFCQWNBZ0FBcjJKVlpXclZSM05SSlh2UkI0Qk02WWpNeTVGSXFabklpNkpFYWFyRVM3TkFLYnZBQ3NOQ1FsUUFBR1FBQTVLU1VsRm90R2tMS1FXazFpTWdnNVNURkpDSmprSUxTZ3FlUU1ZaEp5aDFqQ2lFRnFYYlFNWVVVb3hwU0NwbFNDbXFxT1lhT01hZ3hKK0ZTQ2FVR0FBQkFFQUFnSUNRQXdBQkJ3UXdBTURoQUdEa1E2QWdnY0dnREFBeEV5RXhnVUFnTkRqSUI0QUVpUWlvQVNFeFFsQzUwUVFnUnBJc2dpd2N1bkxqeHhBMG5kR2lEQUFBQUFBQ0FBSUFQQUlDRUFvaUlabWF1d3VJQ0kwTmpnNlBENHdNa1JHUWtBQUFBQUFCQUFPQURBQ0FoQVNLaW1abXJzTGpBeU5EWTRPancrQUFKRVJrSkFBQUFBQUFBQUFBQUFnSUNBQUFBQUFBQkFBQUFBZ0pQWjJkVEFBUlFDd0FBQUFBQUFOVTlBQUFDQUFBQU1NbHNRQXU1dHJxMi9mOEUrcmk4dXpTZk5qUnQ3czByMzMzMUs3ZTJ5dEN2UDZhNFg2UzBydXZhRHpmZnFUMnkzRXp1RjJkTllhN3J2SHgxdFB5VnIvNU9HTEZxSGg0UHMzYjQ5dFY1ZmVWbTdWQWY4ZXZzL004cHc5cDd3M1c3WDN6KzNSM2w5QWduVlZaQnFhbk1TNkVHVVRxcGxYYVRGOW5KRTFyK2ZacWtaVlY5bVRIRzN2cy9GRGRrUGYwOFBEWlVsMS9aU1VXYVBteU1yZTlzOUVwL3FucDRYM20vODNmcC8xN25tbVBsVVZScmpLOVpkMytONmZubWJjVjNqM2Q4NlVnN1ZDSUFWS3ZsYjVRLzEyRjJpd1NOK2lPekxjdmVYMjVxZXhiYU1iTXR0TW92VVovMVUvODR2TFp6eitxYm9zcnV1SC92ZEFGTzFTc1p1YVVGT2RFSnl5dmZmYmorVnU1YnIrNWVNa0ZrNzRFNUxjR2ppbkxLb2RQL2JYdEd6Zi9maUZ2UGZxbHBFWlhvM2hOTFdjZXRwZGx4aHgzL0xXWk9lMmVIaVkxamg5VTNuU3RUbldsZTdzbHRhOEhnZWZucFl0dWFUZG4vM1VhWmk3Yi9zWitaYmQycW1HdzFSTzJoeVNaYWFjM3BhSWFKS2FhVjVVaENTQUJFcjhFbVBEZVZwdytSemJySjV0bGwvOVcxSURKMysxak1jcmRZdW0xZ0Y2ZE9QRGh4eE0yV3VXYmh5SHF3TGZOeHd6WHUxQTg5NWxyNEtaOTJIZnZ1dCt0M2JyZlgycXlIRVJQNzQ3ZlBUMDJ4dVRsSFovMzIvUHdhVGVqMjNqNVpHMit4N0UyNXEwaHUzVjdTTEMzK3RFZXJOR0ovbmhvcE9pWUx6NXhxOUYrTlBGLyt1VlhVK2VPZWJJVEIvdC8wMHVUVWlrbVVtNnFaelhvOWcxWHU2NWVuc2pNYjBZV1F0Z2lFbldFVmJlMlJUOVFsdEg4amVnQXNxeEZ3Vjcvd3JMOVRBbWxBSHVuNDZsL2M4ekRSYlhsWWF2dVVnbW5XcXQ4WDJuNGJuWU15RldNdXpqWnhGL3RHUE8wQzZweSt6TzkzNnhjdDYzbC8zYjlsMStkVDlYRWMyNGJvOFVNNGRxaWRWRFhrMm1MNUErV0VyRlNudjVLaFZmWTgrZHNqT1d0eVQrMzVISTJULy8wV3d1cFNxZmJ2UEVLczlHNUlPV1oxenAzLzYrUmhweWYvV2FuSzBPbDkwM04xbVp0NnZWaFgwRjNxMmZQalA1NS9Ibzg3cFdkS3ZycFdEcU5BeDVGcjhLNENBUG9JS3lvUXpIV0RGdmZ0THJqNXN3ZDkvTUlLd2U1TWx2STExakJ6MnhaelNjTytQMzJxanFxc3F0SzNSTXJweGRURHkvMzVUS1RzM0xsaHErbWYwUHl3TXBudUhsMWp5LzFVYUxVY3ZSUnU2M1RQNGVEbjlhdk8wQ3BHRVczWDNKdFhSOXNKaXdxdDJvd0hPV3hMMDc1UHM4SlJueTNhN3E2bnZvNmZvdXlJaGpyYVlUa2RtcjFnV0JiWGg4WmVZNnJYcncyOWM5cHRKRTg2RHk1YjVlbXk0MzR0aTZHK0dzem1NaGtqNDZJaml0ejNXa3lTZEM4dk5OVzZ0djlvZFJTaHNjZ3pCei93dHUwV3g1VTdTeGVXamFZZFJiYk5wcFB2WEVSdmI0MnJweDdkRTY0dlBMUGJkTTdyMW5weGNQTDJldy9zZk1zbGowa0FBQUJlQ05PclFKbkRDUnF1aCtpenNTVnMzd0s2Q0ZzS25Td3FYc1VyN1lXUGpWV2x0MG5zRHlZVEwxMTFRSjN6ek5QbUpRL3poMS8xMkNrMUdOWktmVXhhU2M1b3R1MmwzbGpMQ3NaQzA5T1YzNmJUR2RJcU5NNmMvWE8vbmxEN1RsbWFLc0pBVk9SRHBjeWFNdGlsZjFFaUN1OU5wa1dNSDNSdnUrekRJNDFsdC96cXIrcW1EN2F4bEp1WC9aRDcray9RZWRXUHUvaDkzUXg2emRyQWlpYWVNZXEyOWRMR3BjbnErNTF3OUJKMUhsQmtOeFYwN2JGNW85Tjk1VkdYbng3VHVHSFI5WFdEMFBvM3BmQjYwa1gzcXNZenA5UTE5ZWc2bDg1VExqdWZkczNhb0ZlQ1NiOU85VGRXL043ZlhjMnpsYU16bmZmT1M1MUhBdmZtcElpb0FRQUExc2l5RTZERXl3SWRzUCswM1QvVStYOU85L1g1Lzcva0tNODRaLzNhVEljYVpldlBTdGRNdWxKWGhYY3Q2dW0weFpqTk8yUHlYdWZkZjc5eDJVbDNkWFNzeWZTNVhEb1dUNG1DdmJkK3FWVjFvOTluTWJYYnVlbjFnM24vV0tlMXN5Ry8zcU4wNlExOUY1RGxTeFhPQktOalZHOHovZFdzRktyckd6T0lkN1IzZGlvLytVclY0YnFJdVVJWUZrSTdtdVY4ZksvaGJHbXMySzJzMzlYV3Z2eVROSmYxRXIyS2NaUFJER0szQnlWMTJkNVVLNVBtcWhCelBkdVZqamp1dmZ0alE2ZGJPdXFXcGZ4cU9VLzJkbXVLQ1VzbndmNTNkWFdQYVhpcUNuUGsyNUtIWHM2OGJKdmhjbW5ySm4vWTNYdlBhMzBuWmdRQUFCd2xVaVBtNXFtNlJ4dVJOVjJvYjVsRWxqWjI5Mi9OMjdGbmhVOWVLTEpqczMvczFLUEhpYlNxblFhemFiSno4MTVrVnd1Uktub09ZWE9VODdjNWRxNk9UZzAzeThOY0g5UVQ3dFo3UEhSYkRmb3ZDbE11WXpxWDFsZlNlUFI4ZWs5WmVVTjcwcnUxNzl3ZTNqcnVmOGV6YzV0UFpQOFkxdkMrcXUyYjNVNG5meiswVElxSysxY3UxNlphNWNXbmg3WDcxT05SZFVmRlY3STYrZlpzN1Y3NWI0aGppWEsxbWk4bW0rdit4bG4xazY3M2p0dVVKQUFVRzJOb1ozUHNJeDk2TkhwWnFzclJTZEhURzF5YzhYbjEvZEJKRSs1OGRQdC9IcitwekF2ZnN6azZjU3c2TC83NWJZYzdUOVJVNUNWVVI0NEtuMCtmMm84KzlrUFA3TjNvMUg5UXE1MWo3anlIT2Z6U296Y3ZuRDdsOHVpSkIxbGJRSFJQOUg2bVQ4LzRGVTJoS1V6QmFCcUh6ZHZxUTdUOVk2UUxpbTJYY092VnB1Tk0xcXNuZy8xdW1KR3lscWN1NzUvclRweHovOVpPUDh2NU9hbmx0ZlU3QjkrdlZpVmJFYVYyczdKMjc5WS9XbDdjbUt0MFBXRnZVN3dHNjBPZW8rM0hYeFU1cXMzU2R6NmFMMndhOW9vZkR2Wll6dW5OMFltOG5OcTFhdjN6eHkrUFJWL1lMM3o2UHZhRitvZm8wdG5JMm9yUGw3NEgxVnJWdmwzNWU3c3dhdm5kUGwvdlA3aGRQV0Y4UkdkbFNvbTdEbHNydzVLeTUzbmVaYTJUMXBuTVhJM0w2bUVVS2FpNTFJL0JxTGFMck8zczcrSDgzMzZ6bUt6b3FwallPUW5yN3F2UFZxKzdhcVh6ZWlXNytXcnI4c2E3Ly9ZK3MzM3o2djFsNUg5bDQxVnBxai9JL1BCOHlyaGYzcDliVWNmUTNRQT1cIildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbNCAvKnlpZWxkKi8sIChfay5zZW50KCkpLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBfZS5hcHBseShfZCwgX2YuY29uY2F0KFtfay5zZW50KCldKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuQXVkaW8ucmVnaXN0ZXIoXCJtb2IuXCIgKyB0aGlzLmVudGl0eUlEICsgXCIucXVhY2tcIiwgQXN5bmNTaW5rLkF1ZGlvLkNhdGVnb3J5LkFOSU1BTFMsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IFwic291bmRzL21vYi9cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIvcXVhY2sub2dnXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXRjaDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9sdW1lOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IGZhbHNlIC8vdXNlIGZvciBsYXJnZSBhdWRpbyBmaWxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2ggPSAoX2cgPSBBc3luY1NpbmspLnNldEZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfaiA9IFtcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvc291bmRzL21vYi9cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIvc3RlcC5vZ2dcIildO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goXCJkYXRhOmF1ZGlvL29nZztiYXNlNjQsVDJkblV3QUNBQUFBQUFBQUFBQWJQUUFBQUFBQUFMWVpXZElCSGdGMmIzSmlhWE1BQUFBQUFZQStBQUFBQUFBQW1JWUJBQUFBQUFDcEFVOW5aMU1BQUFBQUFBQUFBQUFBR3owQUFBRUFBQUJmS2JOWUQ1RC8vLy8vLy8vLy8vLy8vLy8vNEFOMmIzSmlhWE0wQUFBQVdHbHdhQzVQY21jZ2JHbGlWbTl5WW1seklFa2dNakF5TURBM01EUWdLRkpsWkhWamFXNW5JRVZ1ZG1seWIyNXRaVzUwS1FJQUFBQXpBQUFBVkVsVVRFVTlWR2hsSUZOdmIzUm9hVzVuSUZOdmRXNWtjeUJ2WmlCRVZVTkxJQ016SUNoeWRXNXVhVzVuSUdSMVkyc3BFUUFBQUVGU1ZFbFRWRDF6WlVSVlEwdDBhWFpsQVFWMmIzSmlhWE1rUWtOV0FRQkFBQUFZUWhBcUJhMWpqanJJRlNHTUdhS2dRc29weHgxQzBDR2pKRU9JT3NZMXh4aGpSN2xraWtMSmdkQ1FWUUFBUUFBQXBCeFhVSEpKTGVlY2M2TVlWOHh4NkNEbm5IUGxJR2ZNY1FrbDU1eHpqam5ua25LT01lZWNjNk1ZVnc1eUtTM25uSE9CRkVlS2NhY1k1NXh6cEJ4SGluR29HT2VjYzIweHQ1Snl6am5ubkhQbUlJZFNjcTQxNTV4enBCaG5EbklMSmVlY2M4WWdaOHh4NnlEbm5IT01OYmZVY3M0NTU1eHp6am5ubkhQT09lZWNjNHd4NTV4enpqbm5uSE51TWVjV2M2NDU1NXh6empubkhIUE9PZWVjY3lBMFpCVUFrQUFBb0tFb2l1SW9EaEFhc2dvQXlBQUFFRUJ4RkVlUkZFdXhITXZSSkEwSURWa0ZBQUFCQUFnQUFLQklocVJJaXFWWWptWnBuaVo2b2lpYW9pcXJzbW5Lc2l6THN1dTZMaEFhc2dvQVNBQUFVRkVVeFhBVUJ3Z05XUVVBWkFBQUNHQW9pcU00anVSWWtxVlpuZ2VFaHF3Q0FJQUFBQVFBQUZBTVI3RVVUZkVrei9JOHovTTh6L004ei9NOHovTTh6L004ei9NOERRZ05XUVVBSUFBQUFJSW9aQmdEUWtOV0FRQkFBQUFJSVJvWlE1MVNFbHdLRmtJY0VVTWRRczVEcWFXRDRDbUZKV1BTVTZ4QkNDRjg3ejMzM252dmdkQ1FWUUFBRUFBQVlSUTRpSUhISkFnaGhHSVVKMFJ4cGlBSUlZVGxKRmpLZWVna0NOMkRFRUs0bkh2THVmZmVleUEwWkJVQUFBZ0F3Q0NFRUVJSUlZUVFRZ2dwcEpSU1NDbW1tR0tLS2NjY2M4d3h4eUNERERMb29KTk9Pc21ra2s0NnlpU2pqbEpyS2JVVVUweXg1UlpqcmJYV25IT3ZRU2xqakRIR0dHT01NY1lZWTR3eHhoZ2pDQTFaQlFDQUFBQVFCaGxra0VFSUlZUVVVa2dwcHBoeXpESEhIQU5DUTFZQkFJQUFBQUlBQUFBY1JWSWtSM0lrUjVJa3laSXNTWk04eTdNOHk3TThUZFJFVFJWVjFWVnQxL1p0WC9adDM5VmwzL1psMjlWbFhaWmwzYlZ0WGRaZFhkZDFYZGQxWGRkMVhkZDFYZGQxWGRlQjBKQlZBSUFFQUlDTzVEaU81RGlPNUVpT3BFZ0tFQnF5Q2dDUUFRQVFBSUNqT0lyalNJN2tXSTRsV1pJbWFaWm5lWmFuZVpxb2lSNFFHcklLQUFBRUFCQUFBQUFBQUlDaUtJcWpPSTRrV1phbWFaNm5lcUlvbXFxcWlxYXBxcXBxbXFacG1xWnBtcVpwbXFacG1xWnBtcVpwbXFacG1xWnBtcVpwbXFacG1xWnBBcUVocXdBQUNRQUFIY2R4SEVkeEhNZHhKRWVTSkNBMFpCVUFJQU1BSUFBQVExRWNSWElzeDVJMFM3TTh5OU5Fei9SY1VUWjFVMWR0SURSa0ZRQUFDQUFnQUFBQUFBQUF4M004eDNNOHlaTTh5M004eDVNOFNkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVFFOQ1ExWUNBR1FBQUJ6Rm1IdFNTcW5PUVVneEoyYzd4aHkwbUpzT0ZVSk1XaTAyWklnWUpxM0gwaWxDa0tPYVNzaVFNWXBxS2FWVENDbXBwWlRRTWNha3B0WmFLcVcwSGdnTldSRUFSQUVBQUFnaHhoQmppREVHSVlNUU1jWWdkQkFpeGh5RURFSUdJWlFVU3NrZ2hCSkNTWkZqREVJSElZTVFVZ21oWkJCQ0tTR1ZBZ0FBQWh3QUFBSXNoRUpEVmdRQWNRSUFDRUxPSWNZZ1JJeEJDQ1drRkVKSUtXSU1RdWFjbE13NUthV1Uxa0lwcVVXTVFjaWNrNUk1SnlXVTBsSXBwYlZRU211bGxOWkNLYTIxMW1wTnJjVWFTbWt0bE5KYUthVzExRnFOcmJVYUk4WWdaTTVKeVp5VFVrcHByWlRTV3VZY2xRNUNTaDJFbEVwS0xaYVVXc3ljazlKQlI2V0RrRkpKSmJhU1Vvd2xsZGhLU2pHV2xHSnNMY2JhWXF3MWxOSmFTU1cya2xLTUxiWWFXNHcxUjR4QnlaeVRramtucFpUU1dpbXB0Y3c1S1IyRWxEb0hKWldVWWl3bHRaZzVKNldEa0ZJSElhV1NVbXdscGRoQ0thMlZsR0lzSmJYWVlzeTF0ZGhxS0tuRmtsS01KYVVZVzR5MXR0aHE3S1MwRmxLSkxaVFNZb3V4MXRaYXJhR1VHRXRLTVphVVlvd3gxdHhpckRtVTBtSkpKY2FTVW9zdHRseGJqRFduMW5KdExkYmNZc3cxeGx4N3JiWG4xRnF0cWJWYVc0dzF4eHB6ckxYbTNrRnBMWlFTV3lpcHhkWmFyUzNHV2tNcHNaV1VZaXdseGRoaXpMVzFXSE1vSmNhU1Vvd2xwUmhiakxYR0dITk9yZFhZWXN3MXRWWnJyYlhuR0d2c3FiVmFXNHcxdDlocXJiWDJYblBzdFFBQWdBRUhBSUFBRThwQW9TRXJBWUFvQUFEQ0dLVVlnOUFncEpSakVCcUVsR0lPUXFVVVk4NUpxWlJpekRrcG1XUE9RVWdsWTg0NUNDV0ZFRXBKSmFVUVFpa2xwVlFBQUVDQkF3QkFnQTJhRW9zREZCcXlFZ0FJQ1FBZ0VGS0tNZWNnbEpKU1NoRkNURGtHSVlSU1Vtb3RRa2dwNWh5RVVFcEtyVlZNTWVZY2hCQktTYW0xU2pIR25JTVFRaWtwdFpZNTV4eUVFRXBKS2FYV011YWNneEJDS1NtbDFGb0hJWVFRU2lrbHBkWmE2eUNFRUVJcHBhVFVXbXNoaEJCS0thV2tsRnFMTVlRUVFpbWxwSkpTYXpHV1VrcEpLYVdVVW1zdHhsSktLU21sbEZKTHJjV1lVa29wcGRaYWF5M0dHRk5LS2FYVVdtdXh4UmhqYXEyMTFscUxNY1lZYTAydHRkWmFpekhHR0dPdEJRQUFIRGdBQUFRWVFTY1pWUlpob3drWEhvQkNRMVlFQUZFQUFJQXhpREhFR0hLT1FjaWdSTTR4Q1ptRXlEbEhwWk9TU1FtaGxkWXlLYUdWa2xya25KUFNVY3FvbEpaQ2FabWswbHBvb1FBQXNBTUhBTEFEQzZIUWtKVUFRQjRBQUlHUVVvdzU1eHhTaWpIR25ITU9LYVVZWTg0NXB4aGp6RG5ubkZPTU1lYWNjODR4eHB4enpqbm5HR1BPT2VlY2M4NDU1NXh6RGtMbm5IUE9PUWVoYzg0NTV5Q0UwRG5ubkhNUVFpZ0FBS2pBQVFBZ3dFYVJ6UWxHZ2dvTldRa0FwQUlBQU1ndzVweHpVbEpxbEdJTVFnaWxwTlFveFJpRUVFcEpLWE1PUWdpbHBOUmF4aGgwRWtwSnFiVU9RaWlscE5SYWpCMkVFa3BKcWJVWU93aWxwSlJTYXpGMkVFcEpxYVhXWWl5bHBOUmFhekhXV2twSnFiWFdZcXcxcGRSYWpESFdXbXRLcWJVWVk2eTExZ0lBd0JNY0FJQUtiRmdkNGFSb0xMRFFrSlVBUUFZQXdCQUF3QUVBQUFNT0FBQUJKcFNCUWtOV0FnQ3BBQUNBTVl3NTV4eUVVaHFsbklNUVFpbXBORW81QnlHRVVsTEtuSk5RU2lrcHRaWTVKNldVVWxKcXJZTlFTa29wdFJaakI2R1VsRkpxTGNZT1Fpb3B0UlpqalIyRVVsSnFMY1lZUXlrcHRSWmpqTFdHVWxKcUxjWVlheTBwdFJaampiWG1XbEpxTGNZYWE4MjFBQUNFQmdjQXNBTWJWa2M0S1JvTExEUmtKUUNRQndCQUlNUVlZNHc1aDVSaWpESG5uRU5LTWNhWWM4NHh4aGh6empubkdHT01PZWVjYzR3eDU1eHp6am5HbUhQT09lY2NjODQ1NTV4empqbm5uSFBPT2VlY2M4NDU1NXh6empubm5IUE9DUUFBS25BQUFBaXdVV1J6Z3BHZ1FrTldBZ0RoQUFDQU1ZdzV4eGgwRWxKcW1JSU9RZ2dscE5CQ281aHpFRUlvcGFUVU11aWtwRlJLU3EzRmxqa25wYVJTVWtxdHhRNUNTaW1sMUZxTU1YWVFVa29wcGRaaWpMV0RVRXBLTGNWWVk2MGRoRkpTYXEyMUdHc05wYVRVV213eDFwcHpLQ1dsMWxxTXNkYWFTMHF0eFZoanJibm1YRkpxTGJaWWE2MDE1OVJhakRIV21tdk92YWZXWW95eDFwcHo3cjBBQUpNSEJ3Q29CQnRuV0VrNkt4d05MalJrSlFDUUd3Q0FJTVNZYzg1QkNDR0VFRUlJSVZLS01lY2doQkJDQ0NHVVVrcWtGR1BPUVFnaGhCQkNDQ0dFakRIbm9JTVFRZ2lsbEZKS0tSbGp6a0VJSVlRUVNpaWxoQkk2NTZDREVFSUpwWlJTU2ltbGRNNDVDQ0dFRUVvcHBaUlNTdWtnaEJCQ0NLV1VVa29wcFpUU1FRZ2hoRkJLS2FXVVVrb3BKWVFRUWdpbGxGSktLYVdVVWtvSUlZUVFTaW1sbEZKS0thV1VFRUlJcFpSU1NpbWxsRkpLS1NHRUVFb3BwWlJTU2ltbGxGSkNDS1dVVWtvcHBaUlNTaW1saEJCS0thV1VVa29wcFpSU1NnbWhsRkpLS2FXVVVrb3BwWlFTU2ltbGxGSktLYVdVVWtvcEpaUlNTaW1sbEZKS0thV1VVa29vcFpSU1NpbWxsRkpLS2FXVVVFb3BwWlJTU2ltbGxGSktLYUdVVWtvcHBaUlNTaW1sbEZJS0FBQTZjQUFBQ0RDaTBrTHNOT1BLSTNCRUljTUVWR2pJU2dBZ0hBQUFRQVE2Q0NHRUVFSUlFWE1RUWdnaGhCQkNpSmlERUVJSUlZUVFRZ2doaEJCQ0NLV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FVVUFIV1o0UUFZUFdIakRDdEpaNFdqd1lXR3JBUUEwZ0lBQUdNWVk0d3B5S1N6Rm1PdERXTVFRZ2VkaEJScXFDV21oakVJSVhSUVNrb3R0bGh6QnFHa1VrcEpMY1pZZzgwOWcxQktLYVdrRm1PdE9SZmpRVWdscGRSaXE3WG5ISXp1SUpTU1Vrb3gxcHB6N3IxbzBFbEpxYlZhYys0OUIxODhDS1drMWxxTVBRY2ZqRENpbEpaaXJMSFdISHdSUmhoUlNrc3R4cHA3emIwWVk0UktLY1phZTg2NTUxeU1FVDZsRm1PdXVmY2VmQzdDK09KaXpEbjM0b01QUGdoaGpKQXg1dGh6OEwwWFk0d1B3c2hjY3k3Q0dPT0xNTUw0SUd5dHVRZGZqQkZHR0dOODd6WDRvSHN4d2dnampESENDTjF6MFVYNFlvd3hSaGhmaEFFQXVSRU9BSWdMUmhKU1p4bFdHbkhqQ1JnaWtFSkRWZ0VBTVFBQUJESEdJS1NRVWtvcHhSaGpqREhHR0dPTU1jWVlZNHd4eHB4anpqbm5uQUFBd0FRSEFJQUFLOWlWV1ZxMVVkelVTVjcwUWVBVE9tSXpNdVJTS21aeUl1aVJHbXF4RXV6UUNtN3dBckRRa0pVQUFCa0FBT1NrbEpSYUxScEN5a0ZwTllqSUlPVWt4U1FpWTVDQzBvS25rREdJU2NvZFl3b2hCYWwyMERHRkZLTWFVZ3FaVWdwcXFqbUdqakdvTVNmaFVnbWxCZ0FBUUJBQUlDQWtBTUFBUWNFTUFEQTRRQmc1RU9nSUlIQm9Bd0FNUk1oTVlGQUlEUTR5QWVBQklrSXFBRWhNVUpRdWRFRUlFYVNMSUlzSExweTQ4Y1FOSjNSb2d3QUFBQUFBZ0FDQUR3Q0FoQUtJaUdabXJzTGlBaU5EWTRPancrTURKRVJrSkFBQUFBQUFRQURnQXdBZ0lRRWlvcG1acTdDNHdNalEyT0RvOFBnQUNSRVpDUUFBQUFBQUFBQUFBQUlDQWdBQUFBQUFBUUFBQUFJQ1QyZG5Vd0FFaGd3QUFBQUFBQUFiUFFBQUFnQUFBRGVqMWI4THVidTcrdkx0ZnEzQ0FRSFVwajRvemJ6N1V2ZjBybEJGTWtUM3JzOWpaN0IvSGE2MGtiZVQ1ZHgvaktIRHJQdGhYZDEweVAyaTU5Kzc3WWQ3N1k4L0taWEtVL3BjaGZCdExWSXRoMGhlcTJVUHkyRlp2MU03Mzd5c3duck41YkJFbjkrNnVidkphN1NZSVlNdUpMbE5jYWFvY29ML2Qrd2hmT3NxeTUxZnI5UU5qL0wwNEpVUzdzK2V5MkFsbE40ejExY3pjZHBhOHAzT0gxdlBzWnY4MzV5WUx2eWVMc1VSMitydCszYTE4ck5ia1dPT3AvZVJkNWRqeFpTUzdxNVRXaTdqTGV5eWpSR0xldzZIajgzWHJ5SFhkVy8wMHR2b0pSR2loNmVQN0FXL1J4ZWdMSnpMOG1VZTIvVFIvdW5EaTNkbXVkcDIwdm5UN2g4Y21uUTNFcXExMmxUcm50OTJ0UTl6MmZIaS9jdkR2UFowaHRLMXIzc3YrL0VQblhxVVlDa1JkRlN5T0h1c1BLMjF0V0RBUGFWUDVhNHQ5Qk0vMTg2THNub3ZrZjd6SVpkUFh6NGZQbHB1N0RMbGxYbVYyWWUyR3g3WGxkUHovY2Y5Y2VGNW1ibmFsdHVuN1lwdy93c25WbnBDNkRZbUlwc25iTy9iTm5zZWJoZDdBUURzS0pQNzdqbWN1UGxUdllUZ3NuKzBSc3BucDBPb05uMCttTm1VOTNmZk1IWTdha0wwM0x2M3g1NU92amkydWF6SGJsWmhmVmxJNnMrc080ZEdlVjVyYXVtd0hJN3VMeDhxWU5kZWQ4N3B5SHJmZHZUbmZuWDRkVCtJRDkrbldEK3pBcG02SC92S2tidWVMYmpRVXZ3aWhLcUhXbXBwZWY5Zi9WNDgrMW5MNi9ZWGZPWlcvd3ZkcUtPbUMzK2RyNjZZdTFWc3ZpUU92dU9qMDlkN3o2M1RpWEs2K09SVDRxNFVWODdMM1hpaWNhbGFQWEtNYnl3VnU0MEEya2FMQ0FBQUhFL3RZK3N2anoxMitsZGpSU1IyUDlkYlZ0YlF3c1NBeFpseVg2dWx6UzRJNGI3TG9xQzZkRFhsYVkzdzM3R3A2WG44U2VYSDVleDVVdWlVMVc2M2xZM2JXYlhjWXlmOXpxdktlV3o3OC9UZlVadjgxbXZsNjYrY2FoN29pUGUxbmZrbC9iYkNPZnkzMjAvdEpFa28rOXBoeFhicFc2bjcvbUpudHN2TkkvNHZ2Wms4akFUYWVZcFhPRDVCdlF4YnJXeHptOUQ2UmFYRWlCRWV4c210dVdxNVFReGwwNTJTeTlPd09GMkZKMXoyVzZIWlVKOEtaYUl2U3hMVHJqcnRsYmxGcVhUai91c1g2SXdYZWRTUlRiMk8yN21lQ3ZGNCs3SGdiOGQrMzFmQnBFN1RuanJhZk10U2JmNzZsOHZncXdFQUFKN215Z3dvRFExU045ZGt4dy82c2VQWlMxV1ZyaHB0elQvTkZ1MXEzcXpNWDFPejA2dHNWZ3BWei8zVm4vdkp6MHcrVkh2VzNhK0NadlJueDB6QTJFTkNyOW56c2w5K3I3MzV3dlByQTM4cE9CcU9CTzE1OUlTZWJZem0xVklsN3RkZGNzVTBjblFpa01UVjU0dWhDSGkrOWlkUFpSMWhmTFZ0RU5Md2NuTXJpUHRGV05wbUljcDY5L2VFWjk1TWNmUGl4cmxaM1lBOVY1UmNNZGRUamN5RGNJTlYvejVqUFZqYkxvZVBDdU5KL21vRm0xellyYXIzc1czc256dTB3WCtLS3BSUFdPU0RiZFNFWlY3SEVuZmVobkV4eW1OOTdTdGx1UzQvOVgzemViNWdyeks1VzRTVkJUYXMxeWdHQndBQU5oYUxCTUFCR0IweEJWMk9vbS92ajczd3NadGFsS0FvdTFRdjRLbXNpdk9mTmFNZEZHM2ZWZVhBSTEwVTFtNW5oT2E3VytlblMybGVxTHROc3FJMExMYlVaNWVscVZ3MHRlRUtCYjJ0dVdLVExCZmJUVjZmcm56aDBmejY1ZmU5Yno0L2VaQWJQR2htS3NkLzM4YXk4LzFaRWRaK1dQY25WdXZTRlEwaWphSWkxMTlOeHBKT1V4bjIxM3lqTklhRWRUR2Roa0xMaDMyNk1QdkYvdnVhSUYzamVRUGVKbVZlM2pjd2V0dXcrN2xkNzNCWjNSMHYvZExUcDd3NlIxbm1iYmo0UTgweTgrVFBvOGFkYld5dThrQWlvN2k1YkgwNTdaOHB4dW1wVXRnVysvdE81L0JHK0tERExBQUF6Q2hUTDNSMDZmQjB5MCtKSm9ocXArU2lwMkQ4NWpHSkpiNkhYZ2ZmZzY5alhGTkVsdGRUUGx6RTFiby9iemQvcitlWnNIbmx0SHgxc2NUWm44aWJUVWxGN3N0K2VTcHYzeHU4R3U5TWNvT29pTjF1N3NmUHpiRXVUb2ZqbmY2d1ZsWjlhdFhPZWI3VWY5TGN6bTFlbjkveXlLSkM3RzgrZFRsem5BUUEzQ1Jod1J4MmhNMW5uVlU1MVlaK0h1TnBpNXlPM2JtR3pSb3plV3JuL1k1eVZnOWJGQXYycm5oOWNOeXJUa0kyRDY1VnpPTjF5bGlUYTlWei9kSzUyZWtKNjJhWVVpUXc5cFhjemdwQnk3emFuSTBsQ3BiR2EvYjZyKzdac3ZYczBMNGUvODhLeHVXMFNpMXpsVjAvWFV0SDlXOTFNL0tNcXplY25wUHQwZUo5SVhIKzByUjEvNWY3ZkYyTGV2c3BvL25ldjRlRHRlMnVUbkxhRnRtbm5aUlFjemxMZE5xNWxsUVBCUUNraXVqbW8rbnJibzgrRlU4ODJ5OTgraEE5ZlZoWEg5KzcwRzduY2UvLytjTHgvY3ZWNzcvM3dwUHZYNjQrdnJjTHE5Ky92SEI4QyszKzVRWEhjK0xaZnVIVGgraXBEMjdpSHYyeUgzdDZ1ZnI5ZHhjT0VnVE9QR0hQazBtTXZKN1NYN2ZYK3RYUCt4TlR6N3RWeHo0MGU5cGpEVis4M0htZUsrUE50UzJ2U3ArT216MlZ4c0Q3K0Z6NGV3KzZTOHBvKzlaWno2ajdlWC9mK3pKYnZ1UTR1cDk2MUZjV0ZjL2RaZGp6cnErM25WKzd0NzdkODNyUnRlTmQvZVhhdUcwa0FBb09cIildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbNCAvKnlpZWxkKi8sIChfay5zZW50KCkpLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICBfaC5hcHBseShfZywgX2ouY29uY2F0KFtfay5zZW50KCldKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuQXVkaW8ucmVnaXN0ZXIoXCJtb2IuXCIgKyB0aGlzLmVudGl0eUlEICsgXCIuc3RlcFwiLCBBc3luY1NpbmsuQXVkaW8uQ2F0ZWdvcnkuQU5JTUFMUywgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogXCJzb3VuZHMvbW9iL1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi9zdGVwLm9nZ1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGl0Y2g6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvbHVtZTogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiBmYWxzZSAvL3VzZSBmb3IgbGFyZ2UgYXVkaW8gZmlsZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5tYy5yZW5kZXJNYW5hZ2VyLmVudGl0eVJlbmRlck1hcC5wdXQoTW9kQVBJLnV0aWwuYXNDbGFzcyhkYXRhW1wiRW50aXR5XCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXSksIG5ldyBkYXRhW1wiUmVuZGVyXCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXShNb2RBUEkubWMucmVuZGVyTWFuYWdlci5nZXRSZWYoKSwgbmV3IGRhdGFbXCJNb2RlbFwiLmNvbmNhdCh0aGlzLmVudGl0eUlEKV0oKSwgMC4zKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkucHJvbWlzaWZ5KE1vZEFQSS5tYy5yZW5kZXJFbmdpbmUuYmluZFRleHR1cmUpKGRhdGFbXCJcIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCJUZXh0dXJlc1wiKV0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGVkIE9FbnRpdHkgdGV4dHVyZSBpbnRvIGNhY2hlLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTsgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB2YXIga2V5ID0gXCJPRW50aXR5LlwiLmNvbmNhdCh0aGlzLmVudGl0eUlEKTtcbiAgICAgICAgZ2xvYmFsVGhpc1trZXldID0gZGF0YTtcbiAgICB9O1xuICAgIHJldHVybiBPRW50aXR5O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE9FbnRpdHk7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuLypcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICBPSXRlbS50c1xuICAgIFxuICBDb3B5cmlnaHQgMjAyNSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG52YXIgT0l0ZW0gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT0l0ZW0oaXRlbU5hbWUsIGl0ZW1JRCwgaXRlbVN0YWNrLCB0ZXh0dXJlLCBvblJpZ2h0Q2xpY2ssIG9uSXRlbVVzZSkge1xuICAgICAgICB0aGlzLml0ZW1OYW1lID0gaXRlbU5hbWU7XG4gICAgICAgIHRoaXMuaXRlbUlEID0gaXRlbUlEO1xuICAgICAgICB0aGlzLml0ZW1TdGFjayA9IGl0ZW1TdGFjaztcbiAgICAgICAgdGhpcy5pdGVtVGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICAgIHRoaXMub25SaWdodENsaWNrID0gb25SaWdodENsaWNrO1xuICAgICAgICAvLyBBc3NpZ24gb3B0aW9uYWwgb25JdGVtVXNlIGlmIHByb3ZpZGVkXG4gICAgICAgIGlmIChvbkl0ZW1Vc2UpXG4gICAgICAgICAgICB0aGlzLm9uSXRlbVVzZSA9IG9uSXRlbVVzZTtcbiAgICB9XG4gICAgT0l0ZW0ucHJvdG90eXBlLnJlZ2lzdGVyQ2xpZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgJCRpdGVtR2V0QXR0cmlidXRlcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpLm1ldGhvZHMuZ2V0SXRlbUF0dHJpYnV0ZU1vZGlmaWVycy5tZXRob2Q7XG4gICAgICAgIHZhciBjcmVhdGl2ZU1pc2NUYWI7XG4gICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgY3JlYXRpdmVNaXNjVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLk1JU0M7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjcmVhdGl2ZU1pc2NUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMudGFiTWlzYztcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXRlbUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIik7XG4gICAgICAgIHZhciBpdGVtU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihpdGVtQ2xhc3MsIGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZm4ubGVuZ3RoID09PSAxOyB9KTtcbiAgICAgICAgdmFyIGl0ZW1TdGFjayA9IHRoaXMuaXRlbVN0YWNrO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGZ1bmN0aW9uIG5taV9PdmVuSXRlbSgpIHtcbiAgICAgICAgICAgIGl0ZW1TdXBlcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuJHNldENyZWF0aXZlVGFiKGNyZWF0aXZlTWlzY1RhYik7XG4gICAgICAgICAgICB0aGlzLiRtYXhTdGFja1NpemUgPSAoaXRlbVN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhpdGVtQ2xhc3MsIG5taV9PdmVuSXRlbSk7XG4gICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVJpZ2h0Q2xpY2sgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMilcbiAgICAgICAgICAgICAgICAgICAgKCQkcGxheWVyKS4kc2V0SXRlbUluVXNlKCQkaXRlbXN0YWNrLCAzMik7XG4gICAgICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcjtcbiAgICAgICAgICAgICAgICBzZWxmLm9uUmlnaHRDbGljaygkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpZW50IGl0ZW1zdGFjazpcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJCRpdGVtc3RhY2spO1xuICAgICAgICAgICAgICAgIHJldHVybiAoJCRpdGVtc3RhY2spO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICA7XG4gICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgdmFyICQkUmVzdWx0RW51bSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiRW51bUFjdGlvblJlc3VsdFwiKS5zdGF0aWNWYXJpYWJsZXM7XG4gICAgICAgICAgICB2YXIgJCRBY3Rpb25SZXN1bHQgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkFjdGlvblJlc3VsdFwiKS5jb25zdHJ1Y3RvcnNbMF07XG4gICAgICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1SaWdodENsaWNrID0gZnVuY3Rpb24gKCQkd29ybGQsICQkcGxheWVyLCAkaGFuZEVudW0sICR1bnVzZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2sgPSAoJCRwbGF5ZXIpLiRnZXRIZWxkSXRlbSgkaGFuZEVudW0pO1xuICAgICAgICAgICAgICAgICgkJHBsYXllcikuJHNldEFjdGl2ZUhhbmQoJGhhbmRFbnVtKTtcbiAgICAgICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyO1xuICAgICAgICAgICAgICAgIHNlbGYub25SaWdodENsaWNrKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGllbnQgaXRlbXN0YWNrOlwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgkJEFjdGlvblJlc3VsdCgkJFJlc3VsdEVudW0uU1VDQ0VTUywgJCRpdGVtc3RhY2spKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtVXNlMCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCRwbGF5ZXIsICQkd29ybGQsICQkYmxvY2twb3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGJsb2NrcG9zO1xuICAgICAgICAgICAgICAgIHNlbGYub25JdGVtVXNlKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRibG9ja3Bvcyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGllbnQgaXRlbXN0YWNrOlwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIDtcbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICB2YXIgJCRSZXN1bHRFbnVtID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnVtQWN0aW9uUmVzdWx0XCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVVzZSA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCRwbGF5ZXIsICQkd29ybGQsICQkYmxvY2twb3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2ssICQkcGxheWVyLCAkJHdvcmxkLCAkJGJsb2NrcG9zO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9uSXRlbVVzZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm9uSXRlbVVzZSgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIsICQkYmxvY2twb3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gJCRSZXN1bHRFbnVtLlBBU1M7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uVXBkYXRlID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRob3RiYXJfc2xvdCwgJCRpc19oZWxkKSB7XG4gICAgICAgICAgICAkJGlzX2hlbGQgPSAoJCRpc19oZWxkKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiAoJCRpdGVtc3RhY2spO1xuICAgICAgICB9O1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1Vc2VGaW5pc2ggPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kZ2V0TWF4SXRlbVVzZUR1cmF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIDMyO1xuICAgICAgICB9O1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRnZXRJdGVtQXR0cmlidXRlTW9kaWZpZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICQkYXR0cmlidXRlbWFwID0gJCRpdGVtR2V0QXR0cmlidXRlcy5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgICAgICByZXR1cm4gJCRhdHRyaWJ1dGVtYXA7XG4gICAgICAgIH07XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldFN0clZzQmxvY2sgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkYmxvY2spIHtcbiAgICAgICAgICAgIHJldHVybiAxLjA7XG4gICAgICAgIH07XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uQ3JlYXRlZCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25CbG9ja0Rlc3Ryb3llZCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRibG9jaywgJCRibG9ja3BvcywgJCRlbnRpdHkpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgaW50ZXJuYWxfcmVnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGl0ZW1JbnN0YW5jZSA9IG5ldyBubWlfT3Zlbkl0ZW0oKS4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihfdGhpcy5pdGVtSUQpKTtcbiAgICAgICAgICAgIGl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbS5tZXRob2QoTW9kQVBJLmtleWdlbi5pdGVtKF90aGlzLml0ZW1JRCksIE1vZEFQSS51dGlsLnN0cihfdGhpcy5pdGVtSUQpLCBpdGVtSW5zdGFuY2UpO1xuICAgICAgICAgICAgTW9kQVBJLml0ZW1zW1wiXCIuY29uY2F0KHNlbGYuaXRlbUlEKV0gPSBpdGVtSW5zdGFuY2U7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtSW5zdGFuY2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmVkIE92ZW5NREsgaXRlbSAoIGNsaWVudCBzaWRlIClcIik7XG4gICAgICAgICAgICByZXR1cm4gaXRlbUluc3RhbmNlO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoTW9kQVBJLml0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJuYWxfcmVnKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImJvb3RzdHJhcFwiLCBpbnRlcm5hbF9yZWcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPSXRlbS5wcm90b3R5cGUucmVnaXN0ZXJJdGVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiwgY3VzdG9tX2l0ZW07XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGN1c3RvbV9pdGVtID0gbmV3IE9JdGVtKHRoaXMuaXRlbU5hbWUsIHRoaXMuaXRlbUlELCB0aGlzLml0ZW1TdGFjaywgdGhpcy5pdGVtVGV4dHVyZSwgdGhpcy5vblJpZ2h0Q2xpY2ssIHRoaXMub25JdGVtVXNlKS5yZWdpc3RlckNsaWVudCgpO1xuICAgICAgICAgICAgICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJJdGVtKFxcXCJcIi5jb25jYXQodGhpcy5pdGVtSUQsIFwiXFxcIiwgXCIpLmNvbmNhdCh0aGlzLml0ZW1TdGFjaywgXCIsIFwiKS5jb25jYXQodGhpcy5vblJpZ2h0Q2xpY2ssIFwiLCBcIikuY29uY2F0KHRoaXMub25JdGVtVXNlLCBcIik7XCIpKTtcbiAgICAgICAgICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSwgYnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rOnJlZ2lzdGVyaXRlbXNcIiwgZnVuY3Rpb24gKHJlbmRlckl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJJdGVtLnJlZ2lzdGVySXRlbShjdXN0b21faXRlbSwgTW9kQVBJLnV0aWwuc3RyKFwiXCIuY29uY2F0KHNlbGYuaXRlbUlEKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuTDEwTi5zZXQoXCJpdGVtLlwiLmNvbmNhdChzZWxmLml0ZW1JRCwgXCIubmFtZVwiKSwgXCJcIi5jb25jYXQoc2VsZi5pdGVtTmFtZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9pdGVtL1wiLmNvbmNhdChzZWxmLml0ZW1JRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyZW50XCI6IFwiaXRlbS9nZW5lcmF0ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHR1cmVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXllcjBcIjogXCJpdGVtcy9cIi5jb25jYXQodGhpcy5pdGVtSUQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goc2VsZi5pdGVtVGV4dHVyZSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvdGV4dHVyZXMvaXRlbXMvXCIgKyBzZWxmLml0ZW1JRCArIFwiLnBuZ1wiLCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSwgYnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rOnJlZ2lzdGVyaXRlbXNcIiwgZnVuY3Rpb24gKHJlbmRlckl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJJdGVtLnJlZ2lzdGVySXRlbShjdXN0b21faXRlbSwgTW9kQVBJLnV0aWwuc3RyKHNlbGYuaXRlbUlEKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5MMTBOLnNldChcIml0ZW0uXCIuY29uY2F0KHNlbGYuaXRlbUlELCBcIi5uYW1lXCIpLCBzZWxmLml0ZW1OYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9tb2RlbHMvaXRlbS9cIi5jb25jYXQoc2VsZi5pdGVtSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmVudFwiOiBcImJ1aWx0aW4vZ2VuZXJhdGVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0dXJlc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGF5ZXIwXCI6IFwiaXRlbXMvXCIuY29uY2F0KHNlbGYuaXRlbUlEKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXNwbGF5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aGlyZHBlcnNvbl9yaWdodGhhbmRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOiBbMCwgLTkwLCA1NV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0aW9uXCI6IFswLCA0LCAwLjVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzY2FsZVwiOiBbMC44NSwgMC44NSwgMC44NV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aGlyZHBlcnNvbl9sZWZ0aGFuZFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6IFswLCA5MCwgLTU1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRpb25cIjogWzAsIDQsIDAuNV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNjYWxlXCI6IFswLjg1LCAwLjg1LCAwLjg1XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZpcnN0cGVyc29uX3JpZ2h0aGFuZFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6IFswLCAtOTAsIDI1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRpb25cIjogWzEuMTMsIDMuMiwgMS4xM10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNjYWxlXCI6IFswLjY4LCAwLjY4LCAwLjY4XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZpcnN0cGVyc29uX2xlZnRoYW5kXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjogWzAsIDkwLCAtMjVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGlvblwiOiBbMS4xMywgMy4yLCAxLjEzXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2NhbGVcIjogWzAuNjgsIDAuNjgsIDAuNjhdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChzZWxmLml0ZW1UZXh0dXJlKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9pdGVtcy9cIi5jb25jYXQoc2VsZi5pdGVtSUQsIFwiLnBuZ1wiKSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gT0l0ZW07XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgT0l0ZW07XG4iLCIvKlxuICAgIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cbiAgICBPdmVuLnRzXG4gICAgXG4gICAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG52YXIgT3ZlbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPdmVuKCkge1xuICAgIH1cbiAgICBPdmVuLnJlZ2lzdGVyTW9kID0gZnVuY3Rpb24gKG1vZENsYXNzKSB7XG4gICAgICAgIE1vZEFQSS5tZXRhLnRpdGxlKG1vZENsYXNzLnRpdGxlKTtcbiAgICAgICAgTW9kQVBJLm1ldGEudmVyc2lvbihtb2RDbGFzcy52ZXJzaW9uKTtcbiAgICAgICAgTW9kQVBJLm1ldGEuZGVzY3JpcHRpb24obW9kQ2xhc3MuZGVzY3JpcHRpb24pO1xuICAgICAgICBNb2RBUEkubWV0YS5jcmVkaXRzKG1vZENsYXNzLmNyZWRpdHMpO1xuICAgICAgICBNb2RBUEkubWV0YS5pY29uKG1vZENsYXNzLmljb24pO1xuICAgICAgICBNb2RBUEkubWV0YS5jb25maWcobW9kQ2xhc3MuY29uZmlnKCkpO1xuICAgICAgICBtb2RDbGFzcy5pbml0KCk7XG4gICAgICAgIGdsb2JhbFRoaXMuRGVidWdfbW9kZSA9IG1vZENsYXNzLkRlYnVnX21vZGU7XG4gICAgICAgIC8qaWYgKG1vZENsYXNzLm9ubHlfMV8xMl8yID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gSWxsIGRvIHNvbWUgbW9yZSBzdHVmZiBsYXRlclxuICAgICAgICB9Ki9cbiAgICAgICAgdGhpcy5tb2RzLnB1c2gobW9kQ2xhc3MpO1xuICAgIH07XG4gICAgT3Zlbi5tb2RzID0gW107XG4gICAgcmV0dXJuIE92ZW47XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgT3ZlbjtcbiIsIi8qXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICAgIGNvbW1hbmRzLnRzXG4gICAgXG4gICAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5leHBvcnQgZnVuY3Rpb24gc2ltcGxlY29tbWFuZChwcmVmaXgsIG5hbWUsIG9uRXhlY3V0ZSkge1xuICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwic2VuZGNoYXRtZXNzYWdlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLm1lc3NhZ2UudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKFwiXCIuY29uY2F0KHByZWZpeCkuY29uY2F0KG5hbWUpKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XG4gICAgICAgICAgICBvbkV4ZWN1dGUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4gIE92ZW4gTW9kIERldmVsb3BtZW50IEtpdCAoT3Zlbk1ESykgUnVudGltZVxuICBEZXYga2l0IHVzZWQgZm9yIHNpbXBsaWZ5aW5nIEVhZ2xlckZvcmdlIG1vZCBkZXZlbG9wbWVudC5cbiAgICBcbiAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuaW1wb3J0IGljb24gZnJvbSBcIkFTU0VUUy9kZWZhdWx0SWNvbi5wbmdcIjtcbk1vZEFQSS5tZXRhLnRpdGxlKFwiT3Zlbk1ESyBSdW50aW1lXCIpO1xuTW9kQVBJLm1ldGEudmVyc2lvbihcIkFscGhhIHYwLjJcIik7XG5Nb2RBUEkubWV0YS5kZXNjcmlwdGlvbihcIlVub2ZmaWNpYWwgZGV2IGtpdCB1c2VkIGZvciBzaW1wbGlmeWluZyBFYWdsZXJGb3JnZSBtb2QgZGV2ZWxvcG1lbnQuXCIpO1xuTW9kQVBJLm1ldGEuY3JlZGl0cyhcIkJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXCIpO1xuTW9kQVBJLm1ldGEuaWNvbihpY29uKTtcbmltcG9ydCB7IHJlZ2lzdGVyU2VydmVySXRlbSwgcmVnaXN0ZXJTZXJ2ZXJCbG9jaywgcmVnaXN0ZXJFbnRpdHlTZXJ2ZXIsIE92ZW5NREtfX2RlZmluZUV4ZWNDbWRBc0dsb2JhbCwgfSBmcm9tIFwiY2xhc3Nlcy9jb3JlL0hlbHBlcl9mdW5jXCI7XG5pbXBvcnQgT0l0ZW0gZnJvbSBcImNsYXNzZXMvY29yZS9PSXRlbVwiO1xuaW1wb3J0IE9Nb2QgZnJvbSBcImNsYXNzZXMvY29yZS9Nb2RcIjtcbmltcG9ydCBPdmVuIGZyb20gXCJjbGFzc2VzL2NvcmUvT3ZlblwiO1xuaW1wb3J0IE9CbG9jayBmcm9tIFwiY2xhc3Nlcy9jb3JlL09CbG9ja1wiO1xuaW1wb3J0IHsgc2ltcGxlY29tbWFuZCB9IGZyb20gXCJjbGFzc2VzL2NvcmUvY29tbWFuZHNcIjtcbmltcG9ydCBPRW50aXR5IGZyb20gXCIuL2NsYXNzZXMvY29yZS9PRW50aXR5XCI7XG52YXIgZGV2bW9kZSA9IHRydWU7XG5Nb2RBUEkuZXZlbnRzLm5ld0V2ZW50KFwibGliOk92ZW5NREs6bG9hZFwiKTtcbk1vZEFQSS5ldmVudHMubmV3RXZlbnQoXCJsaWI6T3Zlbk1ESzpsb2FkZWRcIik7XG5Nb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjpPdmVuTURLOmxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKFwiT3Zlbk1ESyBSdW50aW1lIGlzIGxvYWRpbmdcIik7XG4gICAgY29uc29sZS5sb2coXCJMb2FkaW5nIE92ZW5NREsgZ2xvYmFsc1wiKTtcbiAgICBnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVySXRlbSA9IHJlZ2lzdGVyU2VydmVySXRlbTtcbiAgICBnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVyQmxvY2sgPSByZWdpc3RlclNlcnZlckJsb2NrO1xuICAgIGdsb2JhbFRoaXMucmVnaXN0ZXJFbnRpdHlTZXJ2ZXIgPSByZWdpc3RlckVudGl0eVNlcnZlcjtcbiAgICBnbG9iYWxUaGlzLk9JdGVtID0gT0l0ZW07XG4gICAgZ2xvYmFsVGhpcy5PTW9kID0gT01vZDtcbiAgICBnbG9iYWxUaGlzLk92ZW5NREsgPSBPdmVuO1xuICAgIGdsb2JhbFRoaXMuT0Jsb2NrID0gT0Jsb2NrO1xuICAgIGdsb2JhbFRoaXMuc2ltcGxlY29tbWFuZCA9IHNpbXBsZWNvbW1hbmQ7XG4gICAgZ2xvYmFsVGhpcy5PRW50aXR5ID0gT0VudGl0eTtcbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgaWYgKCFkZXZtb2RlKSB7XG4gICAgICAgICAgICBhbGVydChcIk92ZW5NREsgZG9lcyBub3QgZnVsbHkgc3VwcG9ydCAxLjEyIGF0IHRoaXMgdGltZSwgcGxlYXNlIHVzZSAxLjguOCBmb3IgZnVsbCBzdXBwb3J0XCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCIxLjEyIGRldGVjdGVkXCIpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk92ZW5NREsgZG9lcyBub3QgZnVsbHkgc3VwcG9ydCAxLjEyIGF0IHRoaXMgdGltZSwgcGxlYXNlIHVzZSAxLjguOCBmb3IgZnVsbCBzdXBwb3J0XCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiT3Zlbk1ESyBnbG9iYWxzIGhhdmUgYmVlbiBzZXQgYW5kIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVySXRlbSA9IFwiLmNvbmNhdChyZWdpc3RlclNlcnZlckl0ZW0sIFwiO1wiKSk7XG4gICAgY29uc29sZS5sb2coXCJSZWdpc3RlciBJdGVtIHNlcnZlcnNpZGUgZnVuY3Rpb24gbG9hZGVkXCIpO1xuICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShPdmVuTURLX19kZWZpbmVFeGVjQ21kQXNHbG9iYWwpO1xuICAgIE92ZW5NREtfX2RlZmluZUV4ZWNDbWRBc0dsb2JhbCgpO1xuICAgIGNvbnNvbGUubG9nKFwiT3Zlbk1ES19fRXhlY0NtZEFzR2xvYmFsIHNlcnZlcnNpZGUgYW5kIGNsaWVudHNpZGUgZnVuY3Rpb24gbG9hZGVkXCIpO1xuICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJCbG9jayA9IFwiLmNvbmNhdChyZWdpc3RlclNlcnZlckJsb2NrLCBcIjtcIikpO1xuICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXIgRW50aXR5IHNlcnZlcnNpZGUgZnVuY3Rpb24gbG9hZGVkXCIpO1xuICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJFbnRpdHlTZXJ2ZXIgPSBcIi5jb25jYXQocmVnaXN0ZXJFbnRpdHlTZXJ2ZXIsIFwiO1wiKSk7XG4gICAgY29uc29sZS5sb2coXCJSZWdpc3RlciBCbG9jayBzZXJ2ZXJzaWRlIGZ1bmN0aW9uIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZXZlbnRzLmNhbGxFdmVudChcImxpYjpPdmVuTURLOmxvYWRlZFwiLCB7fSk7XG59KTtcbk1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOk92ZW5NREs6bG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhcIk92ZW5NREsgUnVudGltZSBoYXMgZmluaXNoZWQgbG9hZGluZ1wiKTtcbiAgICBjb25zb2xlLmxvZyhcIlxcbiAgICBcXHUyNTBDXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTEwXFxuICAgIFxcdTI1MDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgIE92ZW5NREsgaGFzIGxvYWRlZCAgICAgICAgICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICB3ZWxjb21lIHRvIG92ZW5NREsgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgQSBtb2QgZGV2IGtpdCBmb3Igc3RhcnRlcnMgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUxNFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUxOFxcbiAgICBcIik7XG59KTtcbk1vZEFQSS5ldmVudHMuY2FsbEV2ZW50KFwibGliOk92ZW5NREs6bG9hZFwiLCB7fSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=