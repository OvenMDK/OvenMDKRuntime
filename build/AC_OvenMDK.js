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
function registerServerItem(itemID, itemStack, onRightClick) {
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
            //onRightClick($$itemstack);
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
            //onRightClick($$itemstack);
            console.log($$itemstack);
            return ($$ActionResult($$ResultEnum.SUCCESS, $$itemstack));
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
    return {
        EntityDuck: nme_OEntity,
        ModelDuck: nmcm_OEntityModel,
        RenderDuck: nmcre_RenderOEntity,
        duckTextures: duckTextures
    };
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
            this.onBreak($$world, $$blockpos, $$blockstate);
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
    function OEntity(entityName, entityID, entityTexture, entityModel) {
        this.entityName = entityName;
        this.entityID = entityID;
        this.entityTexture = entityTexture;
        this.entityModel = entityModel;
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
        var _this = this;
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
            return itemstack !== null && itemstack.$getItem() === ModAPI.items.bread.getRef();
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
        return {
            EntityDuck: nme_OEntity,
            ModelDuck: nmcm_OEntityModel,
            RenderDuck: nmcre_RenderOEntity,
            duckTextures: duckTextures
        };
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
                        ModAPI.mc.renderManager.entityRenderMap.put(ModAPI.util.asClass(data.EntityDuck), new data.RenderDuck(ModAPI.mc.renderManager.getRef(), new data.ModelDuck(), 0.3));
                        ModAPI.promisify(ModAPI.mc.renderEngine.bindTexture)(data.duckTextures).then(function () {
                            console.log("Loaded OEntity texture into cache.");
                        });
                        return [2 /*return*/];
                }
            });
        }); });
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
    function OItem(itemName, itemID, itemStack, texture, onRightClick) {
        this.itemName = itemName;
        this.itemID = itemID;
        this.itemStack = itemStack;
        this.itemTexture = texture;
        this.onRightClick = onRightClick;
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
                self.onRightClick($$itemstack);
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
                self.onRightClick($$itemstack);
                console.log($$itemstack);
                return ($$ActionResult($$ResultEnum.SUCCESS, $$itemstack));
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
                custom_item = new OItem(this.itemName, this.itemID, this.itemStack, this.itemTexture, this.onRightClick).registerClient();
                ModAPI.dedicatedServer.appendCode("globalThis.registerServerItem(\"".concat(this.itemID, "\", ").concat(this.itemStack, ", ").concat(this.onRightClick, ");"));
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
    ModAPI.dedicatedServer.appendCode("globalThis.registerServerBlock = ".concat(classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerServerBlock, ";"));
    console.log("Register Entity serverside function loaded");
    ModAPI.dedicatedServer.appendCode("globalThis.registerEntityServer = ".concat(classes_core_Helper_func__WEBPACK_IMPORTED_MODULE_1__.registerEntityServer, ";"));
    console.log("Register Block serverside function loaded");
    ModAPI.events.callEvent("lib:OvenMDK:loaded", {});
});
ModAPI.addEventListener("lib:OvenMDK:loaded", function () {
    console.log("OvenMDK Runtime has finished loading");
    console.log("\n    \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n    \u2502                                   \u2502\n    \u2502   OvenMDK has loaded              \u2502\n    \u2502                                   \u2502\n    \u2502   welcome to ovenMDK              \u2502\n    \u2502                                   \u2502\n    \u2502   A mod maker kit for starters    \u2502\n    \u2502                                   \u2502\n    \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n    ");
});
ModAPI.events.callEvent("lib:OvenMDK:load", {});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXlCLHlEQUFJO0FBQzdCLHdCQUF3QiwyREFBTTtBQUM5QiwrQkFBK0IsZ0VBQWE7QUFDNUMseUJBQXlCLDZEQUFPO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0Ysd0VBQWtCLElBQUk7QUFDdEc7QUFDQSxpRkFBaUYseUVBQW1CLElBQUk7QUFDeEc7QUFDQSxrRkFBa0YsMEVBQW9CLElBQUk7QUFDMUc7QUFDQSxvREFBb0Q7QUFDcEQsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCw4Q0FBOEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL0hlbHBlcl9mdW5jLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvTW9kLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvT0Jsb2NrLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvT0VudGl0eS50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL09JdGVtLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvT3Zlbi50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL2NvbW1hbmRzLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICAgIEhlbHBlcl9mdW5jLnRzXG4gICAgXG4gICAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJTZXJ2ZXJJdGVtKGl0ZW1JRCwgaXRlbVN0YWNrLCBvblJpZ2h0Q2xpY2spIHtcbiAgICAvKmlmIChpc1NlcnZlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJyZWdpc3RlclNlcnZlckl0ZW0gY2FuIG9ubHkgYmUgdXNlZCBvbiB0aGUgc2VydmVyIHNpZGUuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfSovXG4gICAgdmFyIGNyZWF0aXZlTWlzY1RhYjtcbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgY3JlYXRpdmVNaXNjVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLk1JU0M7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjcmVhdGl2ZU1pc2NUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMudGFiTWlzYztcbiAgICB9XG4gICAgdmFyICQkaXRlbUdldEF0dHJpYnV0ZXMgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKS5tZXRob2RzLmdldEl0ZW1BdHRyaWJ1dGVNb2RpZmllcnMubWV0aG9kO1xuICAgIHZhciBpdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICB2YXIgaXRlbVN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoaXRlbUNsYXNzLCBmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuLmxlbmd0aCA9PT0gMTsgfSk7XG4gICAgLyppZiAoaXNTZXJ2ZXIgPT09IHRydWUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ1c2luZyBzZXJ2ZXIgc2lkZSByZWdpc3RlclNlcnZlckl0ZW1cIik7XG4gICAgfSovXG4gICAgZnVuY3Rpb24gbm1pX092ZW5JdGVtKCkge1xuICAgICAgICBpdGVtU3VwZXIodGhpcyk7XG4gICAgICAgIHRoaXMuJHNldENyZWF0aXZlVGFiKGNyZWF0aXZlTWlzY1RhYik7XG4gICAgICAgIHRoaXMuJG1heFN0YWNrU2l6ZSA9IChpdGVtU3RhY2spO1xuICAgIH1cbiAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhpdGVtQ2xhc3MsIG5taV9PdmVuSXRlbSk7XG4gICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1SaWdodENsaWNrID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcikge1xuICAgICAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMilcbiAgICAgICAgICAgICAgICAoJCRwbGF5ZXIpLiRzZXRJdGVtSW5Vc2UoJCRpdGVtc3RhY2ssIDMyKTtcbiAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXI7XG4gICAgICAgICAgICAvL29uUmlnaHRDbGljaygkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlcnZlciBpdGVtc3RhY2s6XCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJCRpdGVtc3RhY2spO1xuICAgICAgICAgICAgcmV0dXJuICgkJGl0ZW1zdGFjayk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIDtcbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgdmFyICQkUmVzdWx0RW51bSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiRW51bUFjdGlvblJlc3VsdFwiKS5zdGF0aWNWYXJpYWJsZXM7XG4gICAgICAgIHZhciAkJEFjdGlvblJlc3VsdCA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiQWN0aW9uUmVzdWx0XCIpLmNvbnN0cnVjdG9yc1swXTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtUmlnaHRDbGljayA9IGZ1bmN0aW9uICgkJHdvcmxkLCAkJHBsYXllciwgJGhhbmRFbnVtLCAkdW51c2VkKSB7XG4gICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2sgPSAoJCRwbGF5ZXIpLiRnZXRIZWxkSXRlbSgkaGFuZEVudW0pO1xuICAgICAgICAgICAgKCQkcGxheWVyKS4kc2V0QWN0aXZlSGFuZCgkaGFuZEVudW0pO1xuICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcjtcbiAgICAgICAgICAgIC8vb25SaWdodENsaWNrKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgIHJldHVybiAoJCRBY3Rpb25SZXN1bHQoJCRSZXN1bHRFbnVtLlNVQ0NFU1MsICQkaXRlbXN0YWNrKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uVXBkYXRlID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRob3RiYXJfc2xvdCwgJCRpc19oZWxkKSB7XG4gICAgICAgICQkaXNfaGVsZCA9ICgkJGlzX2hlbGQpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICByZXR1cm4gKCQkaXRlbXN0YWNrKTtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVVzZUZpbmlzaCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuICgkJGl0ZW1zdGFjayk7XG4gICAgfTtcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRnZXRNYXhJdGVtVXNlRHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAzMjtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldEl0ZW1BdHRyaWJ1dGVNb2RpZmllcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkJGF0dHJpYnV0ZW1hcCA9ICQkaXRlbUdldEF0dHJpYnV0ZXMuYXBwbHkodGhpcywgW10pO1xuICAgICAgICByZXR1cm4gJCRhdHRyaWJ1dGVtYXA7XG4gICAgfTtcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRnZXRTdHJWc0Jsb2NrID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJGJsb2NrKSB7XG4gICAgICAgIHJldHVybiAxLjA7XG4gICAgfTtcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkNyZWF0ZWQgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uQmxvY2tEZXN0cm95ZWQgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkYmxvY2ssICQkYmxvY2twb3MsICQkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgdmFyIGludGVybmFsX3JlZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGl0ZW1JbnN0YW5jZSA9IChuZXcgbm1pX092ZW5JdGVtKCkpLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKFwiXCIuY29uY2F0KGl0ZW1JRCkpKTtcbiAgICAgICAgaXRlbUNsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJJdGVtLm1ldGhvZChNb2RBUEkua2V5Z2VuLml0ZW0oXCJcIi5jb25jYXQoaXRlbUlEKSksIE1vZEFQSS51dGlsLnN0cihcIlwiLmNvbmNhdChpdGVtSUQpKSwgaXRlbUluc3RhbmNlKTtcbiAgICAgICAgTW9kQVBJLml0ZW1zW1wiXCIuY29uY2F0KGl0ZW1JRCldID0gaXRlbUluc3RhbmNlO1xuICAgICAgICBjb25zb2xlLmxvZyhpdGVtSW5zdGFuY2UpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyZWQgT3Zlbk1ESyBpdGVtICggU2VydmVyIFNpZGUgKVwiKTtcbiAgICAgICAgcmV0dXJuIGl0ZW1JbnN0YW5jZTtcbiAgICB9O1xuICAgIGlmIChNb2RBUEkuaXRlbXMpIHtcbiAgICAgICAgcmV0dXJuIGludGVybmFsX3JlZygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJib290c3RyYXBcIiwgaW50ZXJuYWxfcmVnKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJTZXJ2ZXJCbG9jayhibG9ja0lELCBvbkJyZWFrKSB7XG4gICAgLyppZiAoTW9kQVBJLmlzU2VydmVyID09PSBmYWxzZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlZ2lzdGVyU2VydmVyQmxvY2sgY2FuIG9ubHkgYmUgdXNlZCBvbiB0aGUgc2VydmVyIHNpZGUuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfSovXG4gICAgdmFyIEJsb2NrQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpO1xuICAgIHZhciBJdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICB2YXIgY3JlYXRpdmVUYWI7XG4gICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIGNyZWF0aXZlVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLkJVSUxESU5HX0JMT0NLUztcbiAgICB9XG4gICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICBjcmVhdGl2ZVRhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy50YWJCbG9jaztcbiAgICB9XG4gICAgdmFyIGJsb2NrU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihCbG9ja0NsYXNzLCBmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuLmxlbmd0aCA9PT0gMjsgfSk7XG4gICAgdmFyIGJyZWFrQmxvY2tNZXRob2QgPSBCbG9ja0NsYXNzLm1ldGhvZHMuYnJlYWtCbG9jay5tZXRob2Q7XG4gICAgZnVuY3Rpb24gbm1iX09ibG9jaygpIHtcbiAgICAgICAgYmxvY2tTdXBlcih0aGlzLCBNb2RBUEkubWF0ZXJpYWxzLnJvY2suZ2V0UmVmKCkpO1xuICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICB0aGlzLiRkZWZhdWx0QmxvY2tTdGF0ZSA9IHRoaXMuJGJsb2NrU3RhdGUuJGdldEJhc2VTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJHNldENyZWF0aXZlVGFiKGNyZWF0aXZlVGFiKTtcbiAgICB9XG4gICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2soQmxvY2tDbGFzcywgbm1iX09ibG9jayk7XG4gICAgbm1iX09ibG9jay5wcm90b3R5cGUuJGJyZWFrQmxvY2sgPSBmdW5jdGlvbiAoJHdvcmxkLCAkYmxvY2twb3MsICRibG9ja3N0YXRlKSB7XG4gICAgICAgIC8vb25CcmVhaygkd29ybGQsICRibG9ja3BvcywgJGJsb2Nrc3RhdGUpO1xuICAgICAgICByZXR1cm4gYnJlYWtCbG9ja01ldGhvZCh0aGlzLCAkd29ybGQsICRibG9ja3BvcywgJGJsb2Nrc3RhdGUpO1xuICAgIH07XG4gICAgZnVuY3Rpb24gZml4dXBCbG9ja0lkcygpIHtcbiAgICAgICAgdmFyIGJsb2NrUmVnaXN0cnkgPSBNb2RBUEkudXRpbFxuICAgICAgICAgICAgLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5ibG9jay5CbG9ja1wiKS5zdGF0aWNWYXJpYWJsZXNcbiAgICAgICAgICAgIC5ibG9ja1JlZ2lzdHJ5KVxuICAgICAgICAgICAgLmdldENvcnJlY3RpdmUoKTtcbiAgICAgICAgdmFyIEJMT0NLX1NUQVRFX0lEUyA9IE1vZEFQSS51dGlsXG4gICAgICAgICAgICAud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpLnN0YXRpY1ZhcmlhYmxlc1xuICAgICAgICAgICAgLkJMT0NLX1NUQVRFX0lEUylcbiAgICAgICAgICAgIC5nZXRDb3JyZWN0aXZlKCk7XG4gICAgICAgIGJsb2NrUmVnaXN0cnkucmVnaXN0cnlPYmplY3RzLmhhc2hUYWJsZUtUb1YuZm9yRWFjaChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIHZhciBibG9ja18xID0gZW50cnkudmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIHZhbGlkU3RhdGVzID0gYmxvY2tfMS5nZXRCbG9ja1N0YXRlKCkuZ2V0VmFsaWRTdGF0ZXMoKTtcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGVBcnJheSA9IHZhbGlkU3RhdGVzLmFycmF5IHx8IFt2YWxpZFN0YXRlcy5lbGVtZW50XTtcbiAgICAgICAgICAgICAgICBzdGF0ZUFycmF5LmZvckVhY2goZnVuY3Rpb24gKGlibG9ja3N0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gKGJsb2NrUmVnaXN0cnkuZ2V0SURGb3JPYmplY3QoYmxvY2tfMS5nZXRSZWYoKSkgPDwgNCkgfFxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tfMS5nZXRNZXRhRnJvbVN0YXRlKGlibG9ja3N0YXRlLmdldFJlZigpKTtcbiAgICAgICAgICAgICAgICAgICAgQkxPQ0tfU1RBVEVfSURTLnB1dChpYmxvY2tzdGF0ZS5nZXRSZWYoKSwgaSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgaW50ZXJuYWxSZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGN1c3RvbV9ibG9jaztcbiAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgY3VzdG9tX2Jsb2NrID0gbmV3IG5tYl9PYmxvY2soKVxuICAgICAgICAgICAgICAgIC4kc2V0SGFyZG5lc3MoMy4wKVxuICAgICAgICAgICAgICAgIC4kc2V0U3RlcFNvdW5kKEJsb2NrQ2xhc3Muc3RhdGljVmFyaWFibGVzLnNvdW5kVHlwZVBpc3RvbilcbiAgICAgICAgICAgICAgICAuJHNldFVubG9jYWxpemVkTmFtZShNb2RBUEkudXRpbC5zdHIoYmxvY2tJRCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgY3VzdG9tX2Jsb2NrID0gbmV3IG5tYl9PYmxvY2soKVxuICAgICAgICAgICAgICAgIC4kc2V0SGFyZG5lc3MoMy4wKVxuICAgICAgICAgICAgICAgIC4kc2V0U291bmRUeXBlKE1vZEFQSS5ibG9ja1NvdW5kcy5QTEFOVC5nZXRSZWYoKSlcbiAgICAgICAgICAgICAgICAuJHNldFVubG9jYWxpemVkTmFtZShNb2RBUEkudXRpbC5zdHIoYmxvY2tJRCkpO1xuICAgICAgICB9XG4gICAgICAgIEJsb2NrQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3RlckJsb2NrMC5tZXRob2QoTW9kQVBJLmtleWdlbi5ibG9jayhibG9ja0lEKSwgTW9kQVBJLnV0aWwuc3RyKGJsb2NrSUQpLCBjdXN0b21fYmxvY2spO1xuICAgICAgICBJdGVtQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3Rlckl0ZW1CbG9jazAubWV0aG9kKGN1c3RvbV9ibG9jayk7XG4gICAgICAgIGZpeHVwQmxvY2tJZHMoKTtcbiAgICAgICAgTW9kQVBJLmJsb2Nrc1tibG9ja0lEXSA9IGN1c3RvbV9ibG9jaztcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmluZyBibG9jayBvbiBzZXJ2ZXIgc2lkZVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgcmV0dXJuIGN1c3RvbV9ibG9jaztcbiAgICB9O1xuICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgaWYgKE1vZEFQSS5tYXRlcmlhbHMpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbFJlZ2lzdGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImJvb3RzdHJhcFwiLCBpbnRlcm5hbFJlZ2lzdGVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgdmFyIGJsb2NrQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpO1xuICAgICAgICB2YXIgaXRlbUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIik7XG4gICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXN0b21fYmxvY2sgPSBuZXcgbm1iX09ibG9jaygpXG4gICAgICAgICAgICAgICAgLiRzZXRIYXJkbmVzcygzLjApXG4gICAgICAgICAgICAgICAgLiRzZXRTb3VuZFR5cGUoTW9kQVBJLmJsb2NrU291bmRzLlBMQU5ULmdldFJlZigpKVxuICAgICAgICAgICAgICAgIC4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihibG9ja0lEKSk7XG4gICAgICAgICAgICBibG9ja0NsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJCbG9jazAubWV0aG9kKE1vZEFQSS5rZXlnZW4uYmxvY2soYmxvY2tJRCksIE1vZEFQSS51dGlsLnN0cihibG9ja0lEKSwgY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgIGl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbUJsb2NrMC5tZXRob2QoY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgIGZpeHVwQmxvY2tJZHMoKTtcbiAgICAgICAgICAgIE1vZEFQSS5ibG9ja3NbYmxvY2tJRF0gPSBjdXN0b21fYmxvY2s7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyaW5nIGJsb2NrIG9uIHNlcnZlciBzaWRlXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRW50aXR5U2VydmVyKGVudGl0eUlELCBlbnRpdHlOYW1lLCBlbnRpdHlNb2RlbCkge1xuICAgIGNvbnNvbGUubG9nKFwiZW50aXRpZXMgYXJlIG5vdCBmaW5pc2hlZCB5ZXQhIFVzZSBhdCB5b3VyIG93biByaXNrIVwiKTtcbiAgICAvL3JldHVybjtcbiAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5qbF9TdHJpbmdfZm9ybWF0ID0gTW9kQVBJLmhvb2tzLm1ldGhvZHMubmxldl9IU3RyaW5nX2Zvcm1hdDsgLy90ZW1wb3JhcnkgdGhpbmcgdG8gZml4IGFuIGlzc3VlIGluIGVhZ2xlcmNyYWZ0XG4gICAgLy8gVXRpbHNcbiAgICBmdW5jdGlvbiBBSVRhc2sobmFtZSwgbGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5haS5cIiArIG5hbWUpLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gbGVuZ3RoOyB9KTtcbiAgICB9XG4gICAgdmFyIFJlc291cmNlTG9jYXRpb24gPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIlJlc291cmNlTG9jYXRpb25cIikuY29uc3RydWN0b3JzLmZpbmQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSAxOyB9KTtcbiAgICB2YXIgRW50aXR5UGxheWVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnRpdHlQbGF5ZXJcIik7XG4gICAgdmFyIEdsU3RhdGVNYW5hZ2VyID0gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC52YWx1ZXMoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJHbFN0YXRlTWFuYWdlclwiKS5zdGF0aWNNZXRob2RzKS5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIFt4Lm1ldGhvZE5hbWVTaG9ydCwgeC5tZXRob2RdOyB9KSk7XG4gICAgdmFyIFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJTaGFyZWRNb25zdGVyQXR0cmlidXRlc1wiKS5zdGF0aWNWYXJpYWJsZXM7XG4gICAgLy8gU1RBUlQgQ1VTVE9NIEVOVElUWVxuICAgIHZhciBlbnRpdHlDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LnBhc3NpdmUuRW50aXR5QW5pbWFsXCIpO1xuICAgIHZhciBlbnRpdHlTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKGVudGl0eUNsYXNzLCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDI7IH0pO1xuICAgIHZhciBubWVfT0VudGl0eSA9IGZ1bmN0aW9uIG5tZV9PRW50aXR5KCR3b3JsZEluKSB7XG4gICAgICAgIGVudGl0eVN1cGVyKHRoaXMsICR3b3JsZEluKTtcbiAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgIHRoaXMud3JhcHBlZC5zZXRTaXplKDAuNCwgMC43KTtcbiAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMCwgQUlUYXNrKFwiRW50aXR5QUlTd2ltbWluZ1wiLCAxKSh0aGlzKSk7XG4gICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDEsIEFJVGFzayhcIkVudGl0eUFJUGFuaWNcIiwgMikodGhpcywgMS45KSk7XG4gICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDIsIEFJVGFzayhcIkVudGl0eUFJTWF0ZVwiLCAyKSh0aGlzLCAxLjApKTtcbiAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMywgQUlUYXNrKFwiRW50aXR5QUlUZW1wdFwiLCA0KSh0aGlzLCAxLjUsIE1vZEFQSS5pdGVtcy5icmVhZC5nZXRSZWYoKSwgMCkpOyAvL3dvbid0IGNhdXNlIGEgcHJvYmxlbSBhcyB0aGUgYnJlYWQgaXMgb2J0YWluZWQgd2hlbiB0aGUgZW50aXR5IGlzIGNvbnN0cnVjdGVkLlxuICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg0LCBBSVRhc2soXCJFbnRpdHlBSUZvbGxvd1BhcmVudFwiLCAyKSh0aGlzLCAxLjIpKTtcbiAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNSwgQUlUYXNrKFwiRW50aXR5QUlXYW5kZXJcIiwgMikodGhpcywgMS4xKSk7XG4gICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDYsIEFJVGFzayhcIkVudGl0eUFJV2F0Y2hDbG9zZXN0XCIsIDMpKHRoaXMsIE1vZEFQSS51dGlsLmFzQ2xhc3MoRW50aXR5UGxheWVyLmNsYXNzKSwgNikpO1xuICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg3LCBBSVRhc2soXCJFbnRpdHlBSUxvb2tJZGxlXCIsIDEpKHRoaXMpKTtcbiAgICB9O1xuICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKGVudGl0eUNsYXNzLCBubWVfT0VudGl0eSk7XG4gICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXRFeWVIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICByZXR1cm4gdGhpcy53cmFwcGVkLmhlaWdodDtcbiAgICB9O1xuICAgIHZhciBvcmlnaW5hbEFwcGx5RW50aXR5QXR0cmlidXRlcyA9IG5tZV9PRW50aXR5LnByb3RvdHlwZS4kYXBwbHlFbnRpdHlBdHRyaWJ1dGVzO1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kYXBwbHlFbnRpdHlBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgb3JpZ2luYWxBcHBseUVudGl0eUF0dHJpYnV0ZXMuYXBwbHkodGhpcywgW10pO1xuICAgICAgICB0aGlzLndyYXBwZWQuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1heEhlYWx0aCkuc2V0QmFzZVZhbHVlKDUpO1xuICAgICAgICB0aGlzLndyYXBwZWQuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1vdmVtZW50U3BlZWQpLnNldEJhc2VWYWx1ZSgwLjI1KTtcbiAgICB9O1xuICAgIHZhciBvcmlnaW5hbExpdmluZ1VwZGF0ZSA9IG5tZV9PRW50aXR5LnByb3RvdHlwZS4kb25MaXZpbmdVcGRhdGU7XG4gICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRvbkxpdmluZ1VwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgIG9yaWdpbmFsTGl2aW5nVXBkYXRlLmFwcGx5KHRoaXMsIFtdKTtcbiAgICAgICAgaWYgKHRoaXMud3JhcHBlZC5pc0luV2F0ZXIoKSkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLm1vdGlvblkgKj0gMC41O1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tb3ZlbWVudFNwZWVkKS5zZXRCYXNlVmFsdWUoMS40KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZCkuc2V0QmFzZVZhbHVlKDAuMjUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldExpdmluZ1NvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgZW50aXR5SUQgKyBcIi5xdWFja1wiKTtcbiAgICB9O1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0SHVydFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgZW50aXR5SUQgKyBcIi5xdWFja1wiKTtcbiAgICB9O1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0RGVhdGhTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIGVudGl0eUlEICsgXCIucXVhY2tcIik7XG4gICAgfTtcbiAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJHBsYXlTdGVwU291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICB0aGlzLndyYXBwZWQucGxheVNvdW5kKE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIGVudGl0eUlEICsgXCIuc3RlcFwiKSwgMC4yLCAxKTtcbiAgICB9O1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0RHJvcEl0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBNb2RBUEkuaXRlbXMuZmVhdGhlci5nZXRSZWYoKTtcbiAgICB9O1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kY3JlYXRlQ2hpbGQgPSBmdW5jdGlvbiAob3RoZXJQYXJlbnQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgIHJldHVybiBuZXcgbm1lX09FbnRpdHkoKF9iID0gKF9hID0gdGhpcy53cmFwcGVkLndvcmxkT2JqKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0UmVmKCkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG51bGwpO1xuICAgIH07XG4gICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRpc0JyZWVkaW5nSXRlbSA9IGZ1bmN0aW9uIChpdGVtc3RhY2spIHtcbiAgICAgICAgcmV0dXJuIGl0ZW1zdGFjayAhPT0gbnVsbCAmJiBpdGVtc3RhY2suJGdldEl0ZW0oKSA9PT0gTW9kQVBJLml0ZW1zLmJyZWFkLmdldFJlZigpO1xuICAgIH07XG4gICAgLy8gRU5EIENVU1RPTSBFTlRJVFlcbiAgICAvLyBTVEFSVCBDVVNUT00gTU9ERUxcbiAgICB2YXIgbW9kZWxDaGlja2VuQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNsaWVudC5tb2RlbC5cIi5jb25jYXQoZW50aXR5TW9kZWwpKTtcbiAgICB2YXIgbW9kZWxDaGlja2VuU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihtb2RlbENoaWNrZW5DbGFzcyk7IC8vd2hpbGUgc3VwZXIgaXNuJ3QgdXNlZCB3aGVuIGV4dGVuZGluZyB0aGlzIGNsYXNzLCBqYXZhIGltcGxpZXMgdGhlIGNhbGwuXG4gICAgdmFyIG5tY21fT0VudGl0eU1vZGVsID0gZnVuY3Rpb24gbm1jbV9PRW50aXR5TW9kZWwoKSB7XG4gICAgICAgIG1vZGVsQ2hpY2tlblN1cGVyKHRoaXMpO1xuICAgIH07XG4gICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2sobW9kZWxDaGlja2VuQ2xhc3MsIG5tY21fT0VudGl0eU1vZGVsKTtcbiAgICAvLyBFTkQgQ1VTVE9NIE1oT0RFTFxuICAgIC8vIFNUQVJUIENVU1RPTSBSRU5ERVJFUlxuICAgIHZhciByZW5kZXJDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY2xpZW50LnJlbmRlcmVyLmVudGl0eS5SZW5kZXJMaXZpbmdcIik7XG4gICAgdmFyIHJlbmRlclN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIocmVuZGVyQ2xhc3MsIGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gNDsgfSk7XG4gICAgdmFyIGR1Y2tUZXh0dXJlcyA9IFJlc291cmNlTG9jYXRpb24oTW9kQVBJLnV0aWwuc3RyKFwidGV4dHVyZXMvZW50aXR5L1wiLmNvbmNhdChlbnRpdHlJRCwgXCIucG5nXCIpKSk7XG4gICAgdmFyIG5tY3JlX1JlbmRlck9FbnRpdHkgPSBmdW5jdGlvbiBubWNyZV9SZW5kZXJPRW50aXR5KHJlbmRlck1hbmFnZXIsIG1vZGVsQmFzZUluLCBzaGFkb3dTaXplSW4pIHtcbiAgICAgICAgcmVuZGVyU3VwZXIodGhpcywgcmVuZGVyTWFuYWdlciwgbW9kZWxCYXNlSW4sIHNoYWRvd1NpemVJbik7XG4gICAgfTtcbiAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhyZW5kZXJDbGFzcywgbm1jcmVfUmVuZGVyT0VudGl0eSk7XG4gICAgbm1jcmVfUmVuZGVyT0VudGl0eS5wcm90b3R5cGUuJGdldEVudGl0eVRleHR1cmUgPSBmdW5jdGlvbiAoZW50aXR5KSB7XG4gICAgICAgIHJldHVybiBkdWNrVGV4dHVyZXM7XG4gICAgfTtcbiAgICBubWNyZV9SZW5kZXJPRW50aXR5LnByb3RvdHlwZS4kaGFuZGxlUm90YXRpb25GbG9hdCA9IGZ1bmN0aW9uIChlbnRpdHksIHBhcnRpYWxUaWNrcykge1xuICAgICAgICBlbnRpdHkgPSBNb2RBUEkudXRpbC53cmFwKGVudGl0eSk7XG4gICAgICAgIGlmICgoIWVudGl0eS5vbkdyb3VuZCkgJiYgKCFlbnRpdHkuaXNJbldhdGVyKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gMjsgLy9mYWxsaW5nXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIElEID0gTW9kQVBJLmtleWdlbi5lbnRpdHkoZW50aXR5SUQpO1xuICAgIE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eUxpc3RcIikuc3RhdGljTWV0aG9kcy5hZGRNYXBwaW5nMC5tZXRob2QoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIHtcbiAgICAgICAgJGNyZWF0ZUVudGl0eTogZnVuY3Rpb24gKCR3b3JsZEluKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IG5tZV9PRW50aXR5KCR3b3JsZEluKTtcbiAgICAgICAgfVxuICAgIH0sIE1vZEFQSS51dGlsLnN0cihlbnRpdHlOYW1lKSwgSUQsIDB4NWUzZTJkLCAvL2VnZyBiYXNlXG4gICAgMHgyNjkxNjYgLy9lZ2cgc3BvdHNcbiAgICApO1xuICAgIHZhciBTcGF3blBsYWNlbWVudFR5cGUgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlMaXZpbmckU3Bhd25QbGFjZW1lbnRUeXBlXCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICB2YXIgRU5USVRZX1BMQUNFTUVOVFMgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eVNwYXduUGxhY2VtZW50UmVnaXN0cnlcIilcbiAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5FTlRJVFlfUExBQ0VNRU5UUyk7XG4gICAgRU5USVRZX1BMQUNFTUVOVFMucHV0KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCBTcGF3blBsYWNlbWVudFR5cGUuT05fR1JPVU5EKTtcbiAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcignYm9vdHN0cmFwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgU3Bhd25MaXN0RW50cnkgPSBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlJFNwYXduTGlzdEVudHJ5XCIpXG4gICAgICAgICAgICAuY29uc3RydWN0b3JzLmZpbmQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSA0OyB9KTtcbiAgICAgICAgdmFyIEJpb21lR2VuU3dhbXAgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlXCIpXG4gICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLnN3YW1wbGFuZCk7XG4gICAgICAgIHZhciBCaW9tZUdlblJpdmVyID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5yaXZlcik7XG4gICAgICAgIHZhciBCaW9tZUdlbkJlYWNoID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5iZWFjaCk7XG4gICAgICAgIHZhciBkdWNrU3Bhd25Td2FtcCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAyMiwgMywgNSk7XG4gICAgICAgIHZhciBkdWNrU3Bhd25SaXZlckJlZCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAxMCwgNSwgOSk7XG4gICAgICAgIHZhciBkdWNrU3Bhd25CZWFjaCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAyNCwgMiwgMyk7XG4gICAgICAgIEJpb21lR2VuU3dhbXAuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25Td2FtcCk7XG4gICAgICAgIEJpb21lR2VuUml2ZXIuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25SaXZlckJlZCk7XG4gICAgICAgIEJpb21lR2VuQmVhY2guc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25CZWFjaCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgRW50aXR5RHVjazogbm1lX09FbnRpdHksXG4gICAgICAgIE1vZGVsRHVjazogbm1jbV9PRW50aXR5TW9kZWwsXG4gICAgICAgIFJlbmRlckR1Y2s6IG5tY3JlX1JlbmRlck9FbnRpdHksXG4gICAgICAgIGR1Y2tUZXh0dXJlczogZHVja1RleHR1cmVzXG4gICAgfTtcbn1cbi8qZXhwb3J0IGZ1bmN0aW9uIGlzU2VydmVyU2lkZSgpIHtcbiAgICBmdW5jdGlvbiBzdWJmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJpc1NlcnZlclNpZGUgZnVuY3Rpb24gY2FsbGVkXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhgaXNTZXJ2ZXJTaWRlOiAke01vZEFQSS5pc1NlcnZlcn1gKTtcbiAgICAgICAgY29uc29sZS5sb2coTW9kQVBJLmlzU2VydmVyKTtcbiAgICB9XG4gICAgc3ViZnVuY3Rpb24oKTtcbiAgICBjb25zb2xlLmxvZyhgaXNTZXJ2ZXJTaWRlOiAke01vZEFQSS5pc1NlcnZlcn1gKTtcbn0qLyBcbiIsIi8qXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICAgIE1vZC50c1xuICAgIFxuICAgIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuaW1wb3J0IGRlZmF1bHRJY29uIGZyb20gXCJBU1NFVFMvZGVmYXVsdEljb24ucG5nXCI7XG52YXIgT01vZCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPTW9kKCkge1xuICAgIH1cbiAgICBPTW9kLmNvbmZpZyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBPTW9kLmluaXQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgT01vZC5wb3N0SW5pdCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBPTW9kLnRpdGxlID0gXCJEZWZhdWx0IE5hbWVcIjtcbiAgICBPTW9kLnZlcnNpb24gPSBcIlwiO1xuICAgIE9Nb2QuZGVzY3JpcHRpb24gPSBcIkRlZmF1bHQgT3Zlbk1ESyBEZXNjcmlwdGlvbi4gU2V0ICdkZXNjcmlwdGlvbicgaW4geW91ciBPTW9kIGNsYXNzIVwiO1xuICAgIE9Nb2QuY3JlZGl0cyA9IFwiTm9uZSBHaXZlblwiO1xuICAgIE9Nb2QuaWNvbiA9IGRlZmF1bHRJY29uO1xuICAgIE9Nb2QuYWNjZXB0ZWRNaW5lY3JhZnRWZXJzaW9ucyA9IG51bGw7XG4gICAgT01vZC5hY2NlcHRlZEVhZ2xlclVwZGF0ZXMgPSBudWxsO1xuICAgIE9Nb2QuYWNjZXB0ZWRFRlZlcnNpb25zID0gbnVsbDtcbiAgICBPTW9kLmFjY2VwdGVkRUZGbGF2b3VyID0gXCJpbmplY3RvclwiO1xuICAgIE9Nb2QuY2xpZW50U2lkZU9ubHkgPSBmYWxzZTtcbiAgICBPTW9kLnNlcnZlclNpZGVPbmx5ID0gZmFsc2U7XG4gICAgT01vZC5vbmx5XzFfMTJfMiA9IGZhbHNlO1xuICAgIE9Nb2QuRGVidWdfbW9kZSA9IGZhbHNlO1xuICAgIHJldHVybiBPTW9kO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE9Nb2Q7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuLypcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICBPQmxvY2sudHNcblxuICBDb3B5cmlnaHQgMjAyNSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG52YXIgT0Jsb2NrID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9CbG9jayhibG9ja05hbWUsIGJsb2NrSUQsIHRleHR1cmUsIG9uQnJlYWspIHtcbiAgICAgICAgdGhpcy5ibG9ja05hbWUgPSBibG9ja05hbWU7XG4gICAgICAgIHRoaXMuYmxvY2tJRCA9IGJsb2NrSUQ7XG4gICAgICAgIHRoaXMuYmxvY2tUZXh0dXJlID0gdGV4dHVyZTtcbiAgICAgICAgdGhpcy5vbkJyZWFrID0gb25CcmVhaztcbiAgICB9XG4gICAgT0Jsb2NrLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIEJsb2NrQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpO1xuICAgICAgICB2YXIgSXRlbUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIik7XG4gICAgICAgIHZhciBjcmVhdGl2ZVRhYjtcbiAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgY3JlYXRpdmVUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMudGFiQmxvY2s7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjcmVhdGl2ZVRhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy5CVUlMRElOR19CTE9DS1M7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJsb2NrU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihCbG9ja0NsYXNzLCBmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuLmxlbmd0aCA9PT0gMjsgfSk7XG4gICAgICAgIHZhciBicmVha0Jsb2NrTWV0aG9kID0gQmxvY2tDbGFzcy5tZXRob2RzLmJyZWFrQmxvY2subWV0aG9kO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGZ1bmN0aW9uIG5tYl9PYmxvY2soKSB7XG4gICAgICAgICAgICBibG9ja1N1cGVyKHRoaXMsIE1vZEFQSS5tYXRlcmlhbHMucm9jay5nZXRSZWYoKSk7XG4gICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZGVmYXVsdEJsb2NrU3RhdGUgPSB0aGlzLiRibG9ja1N0YXRlLiRnZXRCYXNlU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHNldENyZWF0aXZlVGFiKGNyZWF0aXZlVGFiKTtcbiAgICAgICAgfVxuICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhCbG9ja0NsYXNzLCBubWJfT2Jsb2NrKTtcbiAgICAgICAgbm1iX09ibG9jay5wcm90b3R5cGUuJGJyZWFrQmxvY2sgPSBmdW5jdGlvbiAoJHdvcmxkLCAkYmxvY2twb3MsICRibG9ja3N0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gYnJlYWtCbG9ja01ldGhvZCh0aGlzLCAkd29ybGQsICRibG9ja3BvcywgJGJsb2Nrc3RhdGUpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgJCRvbkJsb2NrRGVzdHJveWVkQnlQbGF5ZXJNZXRob2QgPSBCbG9ja0NsYXNzLm1ldGhvZHMub25CbG9ja0Rlc3Ryb3llZEJ5UGxheWVyLm1ldGhvZDtcbiAgICAgICAgbm1iX09ibG9jay5wcm90b3R5cGUuJG9uQmxvY2tEZXN0cm95ZWRCeVBsYXllciA9IGZ1bmN0aW9uICgkJHdvcmxkLCAkJGJsb2NrcG9zLCAkJGJsb2Nrc3RhdGUpIHtcbiAgICAgICAgICAgIHZhciAkJHdvcmxkLCAkJGJsb2NrcG9zLCAkJGJsb2Nrc3RhdGU7XG4gICAgICAgICAgICB0aGlzLm9uQnJlYWsoJCR3b3JsZCwgJCRibG9ja3BvcywgJCRibG9ja3N0YXRlKTtcbiAgICAgICAgICAgIHJldHVybiAkJG9uQmxvY2tEZXN0cm95ZWRCeVBsYXllck1ldGhvZCh0aGlzLCAkJHdvcmxkLCAkJGJsb2NrcG9zLCAkJGJsb2Nrc3RhdGUpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgaW50ZXJuYWxSZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXN0b21fYmxvY2s7XG4gICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgY3VzdG9tX2Jsb2NrID0gbmV3IG5tYl9PYmxvY2soKVxuICAgICAgICAgICAgICAgICAgICAuJHNldEhhcmRuZXNzKDMuMClcbiAgICAgICAgICAgICAgICAgICAgLiRzZXRTdGVwU291bmQoQmxvY2tDbGFzcy5zdGF0aWNWYXJpYWJsZXMuc291bmRUeXBlUGlzdG9uKVxuICAgICAgICAgICAgICAgICAgICAuJHNldFVubG9jYWxpemVkTmFtZShNb2RBUEkudXRpbC5zdHIoX3RoaXMuYmxvY2tJRCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgY3VzdG9tX2Jsb2NrID0gbmV3IG5tYl9PYmxvY2soKVxuICAgICAgICAgICAgICAgICAgICAuJHNldEhhcmRuZXNzKC0xLjApXG4gICAgICAgICAgICAgICAgICAgIC4kc2V0U291bmRUeXBlKE1vZEFQSS5ibG9ja1NvdW5kcy5QTEFOVC5nZXRSZWYoKSlcbiAgICAgICAgICAgICAgICAgICAgLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKF90aGlzLmJsb2NrSUQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEJsb2NrQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3RlckJsb2NrMC5tZXRob2QoTW9kQVBJLmtleWdlbi5ibG9jayhfdGhpcy5ibG9ja0lEKSwgTW9kQVBJLnV0aWwuc3RyKF90aGlzLmJsb2NrSUQpLCBjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgSXRlbUNsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJJdGVtQmxvY2swLm1ldGhvZChjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgX3RoaXMuZml4dXBCbG9ja0lkcygpO1xuICAgICAgICAgICAgTW9kQVBJLmJsb2Nrc1tfdGhpcy5ibG9ja0lEXSA9IGN1c3RvbV9ibG9jaztcbiAgICAgICAgICAgIF90aGlzLmJsb2NrSW5zdGFuY2UgPSBjdXN0b21fYmxvY2s7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyZWQgYmxvY2sgb24gY2xpZW50OiBcIiArIF90aGlzLmJsb2NrSUQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgIHJldHVybiBjdXN0b21fYmxvY2s7XG4gICAgICAgIH07XG4gICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIGlmIChNb2RBUEkubWF0ZXJpYWxzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVybmFsUmVnaXN0ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsUmVnaXN0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgaWYgKE1vZEFQSS5ibG9ja3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChuZXcgbm1iX09ibG9jaygpKS4kc2V0SGFyZG5lc3MoLTEuMCkuJHNldFNvdW5kVHlwZShNb2RBUEkuYmxvY2tTb3VuZHMuUExBTlQuZ2V0UmVmKCkpLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKHRoaXMuYmxvY2tJRCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgT0Jsb2NrLnByb3RvdHlwZS5maXh1cEJsb2NrSWRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYmxvY2tSZWdpc3RyeSA9IE1vZEFQSS51dGlsXG4gICAgICAgICAgICAud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpLnN0YXRpY1ZhcmlhYmxlc1xuICAgICAgICAgICAgLmJsb2NrUmVnaXN0cnkpXG4gICAgICAgICAgICAuZ2V0Q29ycmVjdGl2ZSgpO1xuICAgICAgICB2YXIgQkxPQ0tfU1RBVEVfSURTID0gTW9kQVBJLnV0aWxcbiAgICAgICAgICAgIC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIikuc3RhdGljVmFyaWFibGVzXG4gICAgICAgICAgICAuQkxPQ0tfU1RBVEVfSURTKVxuICAgICAgICAgICAgLmdldENvcnJlY3RpdmUoKTtcbiAgICAgICAgYmxvY2tSZWdpc3RyeS5yZWdpc3RyeU9iamVjdHMuaGFzaFRhYmxlS1RvVi5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGJsb2NrXzEgPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsaWRTdGF0ZXMgPSBibG9ja18xLmdldEJsb2NrU3RhdGUoKS5nZXRWYWxpZFN0YXRlcygpO1xuICAgICAgICAgICAgICAgIHZhciBzdGF0ZUFycmF5ID0gdmFsaWRTdGF0ZXMuYXJyYXkgfHwgW3ZhbGlkU3RhdGVzLmVsZW1lbnRdO1xuICAgICAgICAgICAgICAgIHN0YXRlQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaWJsb2Nrc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoYmxvY2tSZWdpc3RyeS5nZXRJREZvck9iamVjdChibG9ja18xLmdldFJlZigpKSA8PCA0KSB8XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja18xLmdldE1ldGFGcm9tU3RhdGUoaWJsb2Nrc3RhdGUuZ2V0UmVmKCkpO1xuICAgICAgICAgICAgICAgICAgICBCTE9DS19TVEFURV9JRFMucHV0KGlibG9ja3N0YXRlLmdldFJlZigpLCBpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPQmxvY2sucHJvdG90eXBlLnJlZ2lzdGVyQmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdXN0b21fYmxvY2ssIG5tYl9PQmxvY2ssIGl0ZW1DbGFzcywgYmxvY2tDbGFzcywgc2VsZjtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBuZXcgT0Jsb2NrKHRoaXMuYmxvY2tOYW1lLCB0aGlzLmJsb2NrSUQsIHRoaXMuYmxvY2tUZXh0dXJlLCB0aGlzLm9uQnJlYWspLnJlZ2lzdGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBubWJfT0Jsb2NrID0gbmV3IE9CbG9jayh0aGlzLmJsb2NrTmFtZSwgdGhpcy5ibG9ja0lELCB0aGlzLmJsb2NrVGV4dHVyZSwgdGhpcy5vbkJyZWFrKS5yZWdpc3RlcigpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIik7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbV9ibG9jayA9IG5tYl9PQmxvY2s7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3RlckJsb2NrMC5tZXRob2QoTW9kQVBJLmtleWdlbi5ibG9jayh0aGlzLmJsb2NrSUQpLCBNb2RBUEkudXRpbC5zdHIodGhpcy5ibG9ja0lEKSwgY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJJdGVtQmxvY2swLm1ldGhvZChjdXN0b21fYmxvY2spO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXN0b21fYmxvY2sgfHwgXCJCbG9jayByZWdpc3RyYXRpb24gZmFpbGVkXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICAgICAgICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJCbG9jayhcXFwiXCIuY29uY2F0KHRoaXMuYmxvY2tJRCwgXCJcXFwiLCBcIikuY29uY2F0KHRoaXMub25CcmVhaywgXCIpO1wiKSk7XG4gICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2lua1wiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UsIGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2luazpyZWdpc3Rlcml0ZW1zXCIsIGZ1bmN0aW9uIChyZW5kZXJJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVySXRlbS5yZWdpc3RlckJsb2NrKGN1c3RvbV9ibG9jaywgTW9kQVBJLnV0aWwuc3RyKHNlbGYuYmxvY2tJRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuTDEwTi5zZXQoXCJ0aWxlLlwiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLm5hbWVcIiksIHNlbGYuYmxvY2tOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2V0IGxvY2FsaXphdGlvbiBmb3IgYmxvY2sgXCIuY29uY2F0KHNlbGYuYmxvY2tJRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9ibG9jay9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBcImJsb2NrL2N1YmVfYWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsOiBcImJsb2Nrcy9cIi5jb25jYXQoc2VsZi5ibG9ja0lEKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9pdGVtL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IFwiYmxvY2svXCIuY29uY2F0KHNlbGYuYmxvY2tJRCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlyZHBlcnNvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRpb246IFsxMCwgLTQ1LCAxNzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb246IFswLCAxLjUsIC0yLjc1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiBbMC4zNzUsIDAuMzc1LCAwLjM3NV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9ibG9ja3N0YXRlcy9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHNlbGYuYmxvY2tJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHNlbGYuYmxvY2tUZXh0dXJlKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9ibG9ja3MvXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIucG5nXCIpLCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBidWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rOnJlZ2lzdGVyaXRlbXNcIiwgZnVuY3Rpb24gKHJlbmRlckl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvb2wgcmVnaXN0ZXIgYmxvY2tcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3VzdG9tX2Jsb2NrIHx8IFwiQmxvY2sgcmVnaXN0cmF0aW9uIGZhaWxlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJJdGVtLnJlZ2lzdGVyQmxvY2soY3VzdG9tX2Jsb2NrLCBNb2RBUEkudXRpbC5zdHIoX3RoaXMuYmxvY2tJRCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuTDEwTi5zZXQoXCJ0aWxlLlwiICsgdGhpcy5ibG9ja0lEICsgXCIubmFtZVwiLCB0aGlzLmJsb2NrTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNldCBsb2NhbGl6YXRpb24gZm9yIGJsb2NrIFwiLmNvbmNhdChzZWxmLmJsb2NrSUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1c3RvbV9ibG9jayB8fCBcIkJsb2NrIHJlZ2lzdHJhdGlvbiBmYWlsZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvbW9kZWxzL2Jsb2NrL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmVudFwiOiBcImJsb2NrL2N1YmVfYWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0dXJlc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWxsXCI6IFwiYmxvY2tzL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9pdGVtL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmVudFwiOiBcImJsb2NrL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvYmxvY2tzdGF0ZXMvXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFyaWFudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5vcm1hbFwiOiB7IFwibW9kZWxcIjogXCJcIi5jb25jYXQodGhpcy5ibG9ja0lEKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goc2VsZi5ibG9ja1RleHR1cmUpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L3RleHR1cmVzL2Jsb2Nrcy9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5wbmdcIiksIGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVyQmxvY2soXFxcIlwiLmNvbmNhdCh0aGlzLmJsb2NrSUQsIFwiXFxcIiwgXCIpLmNvbmNhdCh0aGlzLm9uQnJlYWssIFwiKTtcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmJsb2Nrc1t0aGlzLmJsb2NrSURdID0gY3VzdG9tX2Jsb2NrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBPQmxvY2s7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgT0Jsb2NrO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xuICAgIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBPRW50aXR5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9FbnRpdHkoZW50aXR5TmFtZSwgZW50aXR5SUQsIGVudGl0eVRleHR1cmUsIGVudGl0eU1vZGVsKSB7XG4gICAgICAgIHRoaXMuZW50aXR5TmFtZSA9IGVudGl0eU5hbWU7XG4gICAgICAgIHRoaXMuZW50aXR5SUQgPSBlbnRpdHlJRDtcbiAgICAgICAgdGhpcy5lbnRpdHlUZXh0dXJlID0gZW50aXR5VGV4dHVyZTtcbiAgICAgICAgdGhpcy5lbnRpdHlNb2RlbCA9IGVudGl0eU1vZGVsO1xuICAgIH1cbiAgICBPRW50aXR5LnByb3RvdHlwZS53YWl0Rm9yUmVuZGVyTWFuYWdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzLCByZWopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNb2RBUEkubWMucmVuZGVyTWFuYWdlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2ssIDEgLyAyMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT0VudGl0eS5wcm90b3R5cGUucmVnaXN0ZXJFbnRpdHlDbGllbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZW50aXRpZXMgYXJlIG5vdCBmaW5pc2hlZCB5ZXQhIFVzZSBhdCB5b3VyIG93biByaXNrIVwiKTtcbiAgICAgICAgLy9yZXR1cm47XG4gICAgICAgIE1vZEFQSS5ob29rcy5tZXRob2RzLmpsX1N0cmluZ19mb3JtYXQgPSBNb2RBUEkuaG9va3MubWV0aG9kcy5ubGV2X0hTdHJpbmdfZm9ybWF0OyAvL3RlbXBvcmFyeSB0aGluZyB0byBmaXggYW4gaXNzdWUgaW4gZWFnbGVyY3JhZnRcbiAgICAgICAgLy8gVXRpbHNcbiAgICAgICAgZnVuY3Rpb24gQUlUYXNrKG5hbWUsIGxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LmFpLlwiICsgbmFtZSkuY29uc3RydWN0b3JzLmZpbmQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSBsZW5ndGg7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBSZXNvdXJjZUxvY2F0aW9uID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJSZXNvdXJjZUxvY2F0aW9uXCIpLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gMTsgfSk7XG4gICAgICAgIHZhciBFbnRpdHlQbGF5ZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkVudGl0eVBsYXllclwiKTtcbiAgICAgICAgdmFyIEdsU3RhdGVNYW5hZ2VyID0gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC52YWx1ZXMoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJHbFN0YXRlTWFuYWdlclwiKS5zdGF0aWNNZXRob2RzKS5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIFt4Lm1ldGhvZE5hbWVTaG9ydCwgeC5tZXRob2RdOyB9KSk7XG4gICAgICAgIHZhciBTaGFyZWRNb25zdGVyQXR0cmlidXRlcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXNcIikuc3RhdGljVmFyaWFibGVzO1xuICAgICAgICAvLyBTVEFSVCBDVVNUT00gRU5USVRZXG4gICAgICAgIHZhciBlbnRpdHlDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LnBhc3NpdmUuRW50aXR5QW5pbWFsXCIpO1xuICAgICAgICB2YXIgZW50aXR5U3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihlbnRpdHlDbGFzcywgZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSAyOyB9KTtcbiAgICAgICAgdmFyIG5tZV9PRW50aXR5ID0gZnVuY3Rpb24gbm1lX09FbnRpdHkoJHdvcmxkSW4pIHtcbiAgICAgICAgICAgIGVudGl0eVN1cGVyKHRoaXMsICR3b3JsZEluKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnNldFNpemUoMC40LCAwLjcpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMCwgQUlUYXNrKFwiRW50aXR5QUlTd2ltbWluZ1wiLCAxKSh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygxLCBBSVRhc2soXCJFbnRpdHlBSVBhbmljXCIsIDIpKHRoaXMsIDEuOSkpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMiwgQUlUYXNrKFwiRW50aXR5QUlNYXRlXCIsIDIpKHRoaXMsIDEuMCkpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMywgQUlUYXNrKFwiRW50aXR5QUlUZW1wdFwiLCA0KSh0aGlzLCAxLjUsIE1vZEFQSS5pdGVtcy5icmVhZC5nZXRSZWYoKSwgMCkpOyAvL3dvbid0IGNhdXNlIGEgcHJvYmxlbSBhcyB0aGUgYnJlYWQgaXMgb2J0YWluZWQgd2hlbiB0aGUgZW50aXR5IGlzIGNvbnN0cnVjdGVkLlxuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNCwgQUlUYXNrKFwiRW50aXR5QUlGb2xsb3dQYXJlbnRcIiwgMikodGhpcywgMS4yKSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg1LCBBSVRhc2soXCJFbnRpdHlBSVdhbmRlclwiLCAyKSh0aGlzLCAxLjEpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDYsIEFJVGFzayhcIkVudGl0eUFJV2F0Y2hDbG9zZXN0XCIsIDMpKHRoaXMsIE1vZEFQSS51dGlsLmFzQ2xhc3MoRW50aXR5UGxheWVyLmNsYXNzKSwgNikpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNywgQUlUYXNrKFwiRW50aXR5QUlMb29rSWRsZVwiLCAxKSh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKGVudGl0eUNsYXNzLCBubWVfT0VudGl0eSk7XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0RXllSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy53cmFwcGVkLmhlaWdodDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG9yaWdpbmFsQXBwbHlFbnRpdHlBdHRyaWJ1dGVzID0gbm1lX09FbnRpdHkucHJvdG90eXBlLiRhcHBseUVudGl0eUF0dHJpYnV0ZXM7XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kYXBwbHlFbnRpdHlBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICBvcmlnaW5hbEFwcGx5RW50aXR5QXR0cmlidXRlcy5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1heEhlYWx0aCkuc2V0QmFzZVZhbHVlKDUpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tb3ZlbWVudFNwZWVkKS5zZXRCYXNlVmFsdWUoMC4yNSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvcmlnaW5hbExpdmluZ1VwZGF0ZSA9IG5tZV9PRW50aXR5LnByb3RvdHlwZS4kb25MaXZpbmdVcGRhdGU7XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kb25MaXZpbmdVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIG9yaWdpbmFsTGl2aW5nVXBkYXRlLmFwcGx5KHRoaXMsIFtdKTtcbiAgICAgICAgICAgIGlmICh0aGlzLndyYXBwZWQuaXNJbldhdGVyKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQubW90aW9uWSAqPSAwLjU7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tb3ZlbWVudFNwZWVkKS5zZXRCYXNlVmFsdWUoMS40KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZCkuc2V0QmFzZVZhbHVlKDAuMjUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldExpdmluZ1NvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIHRoaXMuZW50aXR5SUQgKyBcIi5xdWFja1wiKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXRIdXJ0U291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgdGhpcy5lbnRpdHlJRCArIFwiLnF1YWNrXCIpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldERlYXRoU291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgdGhpcy5lbnRpdHlJRCArIFwiLnF1YWNrXCIpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJHBsYXlTdGVwU291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC5wbGF5U291bmQoTW9kQVBJLnV0aWwuc3RyKFwibW9iLlwiICsgdGhpcy5lbnRpdHlJRCArIFwiLnN0ZXBcIiksIDAuMiwgMSk7XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0RHJvcEl0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gTW9kQVBJLml0ZW1zLmZlYXRoZXIuZ2V0UmVmKCk7XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kY3JlYXRlQ2hpbGQgPSBmdW5jdGlvbiAob3RoZXJQYXJlbnQpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgbm1lX09FbnRpdHkoKF9iID0gKF9hID0gdGhpcy53cmFwcGVkLndvcmxkT2JqKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0UmVmKCkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG51bGwpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGlzQnJlZWRpbmdJdGVtID0gZnVuY3Rpb24gKGl0ZW1zdGFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zdGFjayAhPT0gbnVsbCAmJiBpdGVtc3RhY2suJGdldEl0ZW0oKSA9PT0gTW9kQVBJLml0ZW1zLmJyZWFkLmdldFJlZigpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBFTkQgQ1VTVE9NIEVOVElUWVxuICAgICAgICAvLyBTVEFSVCBDVVNUT00gTU9ERUxcbiAgICAgICAgdmFyIG1vZGVsQ2hpY2tlbkNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jbGllbnQubW9kZWwuXCIuY29uY2F0KHRoaXMuZW50aXR5TW9kZWwpKTtcbiAgICAgICAgdmFyIG1vZGVsQ2hpY2tlblN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIobW9kZWxDaGlja2VuQ2xhc3MpOyAvL3doaWxlIHN1cGVyIGlzbid0IHVzZWQgd2hlbiBleHRlbmRpbmcgdGhpcyBjbGFzcywgamF2YSBpbXBsaWVzIHRoZSBjYWxsLlxuICAgICAgICB2YXIgbm1jbV9PRW50aXR5TW9kZWwgPSBmdW5jdGlvbiBubWNtX09FbnRpdHlNb2RlbCgpIHtcbiAgICAgICAgICAgIG1vZGVsQ2hpY2tlblN1cGVyKHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhtb2RlbENoaWNrZW5DbGFzcywgbm1jbV9PRW50aXR5TW9kZWwpO1xuICAgICAgICAvLyBFTkQgQ1VTVE9NIE1PREVMXG4gICAgICAgIC8vIFNUQVJUIENVU1RPTSBSRU5ERVJFUlxuICAgICAgICB2YXIgcmVuZGVyQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNsaWVudC5yZW5kZXJlci5lbnRpdHkuUmVuZGVyTGl2aW5nXCIpO1xuICAgICAgICB2YXIgcmVuZGVyU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihyZW5kZXJDbGFzcywgZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSA0OyB9KTtcbiAgICAgICAgdmFyIGR1Y2tUZXh0dXJlcyA9IFJlc291cmNlTG9jYXRpb24oTW9kQVBJLnV0aWwuc3RyKFwidGV4dHVyZXMvZW50aXR5L1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi5wbmdcIikpKTtcbiAgICAgICAgdmFyIG5tY3JlX1JlbmRlck9FbnRpdHkgPSBmdW5jdGlvbiBubWNyZV9SZW5kZXJPRW50aXR5KHJlbmRlck1hbmFnZXIsIG1vZGVsQmFzZUluLCBzaGFkb3dTaXplSW4pIHtcbiAgICAgICAgICAgIHJlbmRlclN1cGVyKHRoaXMsIHJlbmRlck1hbmFnZXIsIG1vZGVsQmFzZUluLCBzaGFkb3dTaXplSW4pO1xuICAgICAgICB9O1xuICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhyZW5kZXJDbGFzcywgbm1jcmVfUmVuZGVyT0VudGl0eSk7XG4gICAgICAgIG5tY3JlX1JlbmRlck9FbnRpdHkucHJvdG90eXBlLiRnZXRFbnRpdHlUZXh0dXJlID0gZnVuY3Rpb24gKGVudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuIGR1Y2tUZXh0dXJlcztcbiAgICAgICAgfTtcbiAgICAgICAgbm1jcmVfUmVuZGVyT0VudGl0eS5wcm90b3R5cGUuJGhhbmRsZVJvdGF0aW9uRmxvYXQgPSBmdW5jdGlvbiAoZW50aXR5LCBwYXJ0aWFsVGlja3MpIHtcbiAgICAgICAgICAgIGVudGl0eSA9IE1vZEFQSS51dGlsLndyYXAoZW50aXR5KTtcbiAgICAgICAgICAgIGlmICgoIWVudGl0eS5vbkdyb3VuZCkgJiYgKCFlbnRpdHkuaXNJbldhdGVyKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7IC8vZmFsbGluZ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBJRCA9IE1vZEFQSS5rZXlnZW4uZW50aXR5KHRoaXMuZW50aXR5SUQpO1xuICAgICAgICBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlMaXN0XCIpLnN0YXRpY01ldGhvZHMuYWRkTWFwcGluZzAubWV0aG9kKE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCB7XG4gICAgICAgICAgICAkY3JlYXRlRW50aXR5OiBmdW5jdGlvbiAoJHdvcmxkSW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG5tZV9PRW50aXR5KCR3b3JsZEluKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgTW9kQVBJLnV0aWwuc3RyKHRoaXMuZW50aXR5SUQpLCBJRCwgMHg1ZTNlMmQsIC8vZWdnIGJhc2VcbiAgICAgICAgMHgyNjkxNjYgLy9lZ2cgc3BvdHNcbiAgICAgICAgKTtcbiAgICAgICAgdmFyIFNwYXduUGxhY2VtZW50VHlwZSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eUxpdmluZyRTcGF3blBsYWNlbWVudFR5cGVcIikuc3RhdGljVmFyaWFibGVzO1xuICAgICAgICB2YXIgRU5USVRZX1BMQUNFTUVOVFMgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eVNwYXduUGxhY2VtZW50UmVnaXN0cnlcIilcbiAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMuRU5USVRZX1BMQUNFTUVOVFMpO1xuICAgICAgICBFTlRJVFlfUExBQ0VNRU5UUy5wdXQoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIFNwYXduUGxhY2VtZW50VHlwZS5PTl9HUk9VTkQpO1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcignYm9vdHN0cmFwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIFNwYXduTGlzdEVudHJ5ID0gTW9kQVBJLnJlZmxlY3RcbiAgICAgICAgICAgICAgICAuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZUdlbkJhc2UkU3Bhd25MaXN0RW50cnlcIilcbiAgICAgICAgICAgICAgICAuY29uc3RydWN0b3JzLmZpbmQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSA0OyB9KTtcbiAgICAgICAgICAgIHZhciBCaW9tZUdlblN3YW1wID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMuc3dhbXBsYW5kKTtcbiAgICAgICAgICAgIHZhciBCaW9tZUdlblJpdmVyID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMucml2ZXIpO1xuICAgICAgICAgICAgdmFyIEJpb21lR2VuQmVhY2ggPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlXCIpXG4gICAgICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5iZWFjaCk7XG4gICAgICAgICAgICB2YXIgZHVja1NwYXduU3dhbXAgPSBTcGF3bkxpc3RFbnRyeShNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgMjIsIDMsIDUpO1xuICAgICAgICAgICAgdmFyIGR1Y2tTcGF3blJpdmVyQmVkID0gU3Bhd25MaXN0RW50cnkoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIDEwLCA1LCA5KTtcbiAgICAgICAgICAgIHZhciBkdWNrU3Bhd25CZWFjaCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAyNCwgMiwgMyk7XG4gICAgICAgICAgICBCaW9tZUdlblN3YW1wLnNwYXduYWJsZUNyZWF0dXJlTGlzdC5hZGQoZHVja1NwYXduU3dhbXApO1xuICAgICAgICAgICAgQmlvbWVHZW5SaXZlci5zcGF3bmFibGVDcmVhdHVyZUxpc3QuYWRkKGR1Y2tTcGF3blJpdmVyQmVkKTtcbiAgICAgICAgICAgIEJpb21lR2VuQmVhY2guc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25CZWFjaCk7XG4gICAgICAgIH0pO1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIEFzeW5jU2luay5MMTBOLnNldChcImVudGl0eS5cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIubmFtZVwiKSwgdGhpcy5lbnRpdHlOYW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7IH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgRW50aXR5RHVjazogbm1lX09FbnRpdHksXG4gICAgICAgICAgICBNb2RlbER1Y2s6IG5tY21fT0VudGl0eU1vZGVsLFxuICAgICAgICAgICAgUmVuZGVyRHVjazogbm1jcmVfUmVuZGVyT0VudGl0eSxcbiAgICAgICAgICAgIGR1Y2tUZXh0dXJlczogZHVja1RleHR1cmVzXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBPRW50aXR5LnByb3RvdHlwZS5yZWdpc3Rlck9FbnRpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJFbnRpdHlTZXJ2ZXIoXFxcIlwiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIlxcXCIsIFxcXCJcIikuY29uY2F0KHRoaXMuZW50aXR5TmFtZSwgXCJcXFwiLCBcXFwiXCIpLmNvbmNhdCh0aGlzLmVudGl0eU1vZGVsLCBcIlxcXCIpO1wiKSk7XG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5yZWdpc3RlckVudGl0eUNsaWVudCgpO1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2o7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9rKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfay5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYiA9IChfYSA9IEFzeW5jU2luaykuc2V0RmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jID0gW1wicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9lbnRpdHkvXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiLnBuZ1wiKV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaCh0aGlzLmVudGl0eVRleHR1cmUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzQgLyp5aWVsZCovLCAoX2suc2VudCgpKS5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2IuYXBwbHkoX2EsIF9jLmNvbmNhdChbX2suc2VudCgpXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLmhpZGVGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9lbnRpdHkvZHVjay5wbmcubWNtZXRhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy53YWl0Rm9yUmVuZGVyTWFuYWdlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2suc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2UgPSAoX2QgPSBBc3luY1NpbmspLnNldEZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZiA9IFtcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvc291bmRzL21vYi9cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIvcXVhY2sub2dnXCIpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKFwiZGF0YTphdWRpby9vZ2c7YmFzZTY0LFQyZG5Vd0FDQUFBQUFBQUFBQURWUFFBQUFBQUFBTWdBZnVFQkhnRjJiM0ppYVhNQUFBQUFBWUErQUFBQUFBQUFtSVlCQUFBQUFBQ3BBVTluWjFNQUFBQUFBQUFBQUFBQTFUMEFBQUVBQUFBNUQxNHVENGIvLy8vLy8vLy8vLy8vLy8vLzRBTjJiM0ppYVhNMEFBQUFXR2x3YUM1UGNtY2diR2xpVm05eVltbHpJRWtnTWpBeU1EQTNNRFFnS0ZKbFpIVmphVzVuSUVWdWRtbHliMjV0Wlc1MEtRSUFBQUFrQUFBQVZFbFVURVU5UkhWamF5QlJkV0ZqYXlBdElGTnZkVzVrSUVWbVptVmpkQ0FvU0VRcEZnQUFBRUZTVkVsVFZEMUhZVzFwYm1jZ1UyOTFibVFnUmxnQkJYWnZjbUpwY3lSQ1ExWUJBRUFBQUJoQ0VDb0ZyV09PT3NnVklZd1pvcUJDeWluSEhVTFFJYU1rUTRnNnhqWEhHR05IdVdTS1FzbUIwSkJWQUFCQUFBQ2tIRmRRY2trdDU1eHpveGhYekhIb0lPZWNjK1VnWjh4eENTWG5uSE9PT2VlU2NvNHg1NXh6b3hoWERuSXBMZWVjYzRFVVI0cHhweGpubkhPa0hFZUtjYWdZNTV4emJURzNrbkxPT2VlY2MrWWdoMUp5cmpYbm5IT2tHR2NPY2dzbDU1eHp4aUJuekhIcklPZWNjNHcxdDlSeXpqbm5uSFBPT2VlY2M4NDU1NXh6akRIbm5IUE9PZWVjYzI0eDV4Wnpyam5ubkhQT09lY2NjODQ1NTV4eklEUmtGUUNRQUFDZ29TaUs0aWdPRUJxeUNnRElBQUFRUUhFVVI1RVVTN0VjeTlFa0RRZ05XUVVBQUFFQUNBQUFvRWlHcEVpS3BWaU9abW1lSm5xaUtKcWlLcXV5YWNxeUxNdXk2N291RUJxeUNnQklBQUJRVVJURmNCUUhDQTFaQlFCa0FBQUlZQ2lLb3ppTzVGaVNwVm1lQjRTR3JBSUFnQUFBQkFBQVVBeEhzUlJOOFNUUDhqelA4enpQOHp6UDh6elA4enpQOHp6UDh6d05DQTFaQlFBZ0FBQUFnaWhrR0FOQ1ExWUJBRUFBQUFnaEdobERuVklTWEFvV1Fod1JReDFDemtPcHBZUGdLWVVsWTlKVHJFRUlJWHp2UGZmZWUrK0IwSkJWQUFBUUFBQmhGRGlJZ2Nja0NDR0VZaFFuUkhHbUlBZ2hoT1VrV01wNTZDUUkzWU1RUXJpY2U4dTU5OTU3SURSa0ZRQUFDQURBSUlRUVFnZ2hoQkJDQ0Nta2xGSklLYWFZWW9vcHh4eHp6REhISUlNTU11aWdrMDQ2eWFTU1RqcktKS09PVW1zcHRSUlRUTEhsRm1PdHRkYWNjNjlCS1dPTU1jWVlZNHd4eGhoampESEdHQ01JRFZrRkFJQUFBQkFHR1dTUVFRZ2hoQlJTU0NtbW1ITE1NY2NjQTBKRFZnRUFnQUFBQWdBQUFCeEZVaVJIY2lSSGtpVEpraXhKa3p6THN6ekxzenhOMUVSTkZWWFZWVzNYOW0xZjltM2YxV1hmOW1YYjFXVmRsbVhkdFcxZDFsMWQxM1ZkMTNWZDEzVmQxM1ZkMTNWZDE0SFFrRlVBZ0FRQWdJN2tPSTdrT0k3a1NJNmtTQW9RR3JJS0FKQUJBQkFBZ0tNNGl1TklqdVJZamlWWmtpWnBsbWQ1bHFkNW1xaUpIaEFhc2dvQUFBUUFFQUFBQUFBQWdLSW9pcU00amlSWmxxWnBucWQ2b2lpYXFxcUtwcW1xcW1xYXBtbWFwbW1hcG1tYXBtbWFwbW1hcG1tYXBtbWFwbW1hcG1tYXBtbWFwbWtDb1NHckFBQUpBQUFkeDNFY1IzRWN4M0VrUjVJa0lEUmtGUUFnQXdBZ0FBQkRVUnhGY2l6SGtqUkxzenpMMDBUUDlGeFJOblZUVjIwZ05HUVZBQUFJQUNBQUFBQUFBQURIY3p6SGN6ekprenpMY3p6SGt6eEowelJOMHpSTjB6Uk4welJOMHpSTjB6Uk4welJOMHpSTjB6Uk4welJOMHpSTjB6Uk4welJOMHpSTkEwSkRWZ0lBWkFBQUhNV1llMUpLcWM1QlNERW5aenZHSExTWW13NFZRa3hhTFRaa2lCZ21yY2ZTS1VLUW81cEt5SkF4aW1vcHBWTUlLYW1sbE5BeHhxU20xbG9xcGJRZUNBMVpFUUJFQVFBQUNDSEdFR09JTVFZaGd4QXh4aUIwRUNMR0hJUU1RZ1lobEJSS3lTQ0VFa0pKa1dNTVFnY2hneEJTQ2FGa0VFSXBJWlVDQUFBQ0hBQUFBaXlFUWtOV0JBQnhBZ0FJUXM0aHhpQkVqRUVJSmFRVVFrZ3BZZ3hDNXB5VXpEa3BwWlRXUWltcFJZeEJ5SnlUa2prbkpaVFNVaW1sdFZCS2E2V1Uxa0lwcmJYV2FrMnR4UnBLYVMyVTBsb3BwYlhVV28ydHRSb2p4aUJremtuSm5KTlNTbW10bE5KYTVoeVZEa0pLSFlTVVNrb3RscFJhekp5VDBrRkhwWU9RVWtrbHRwSlNqQ1dWMkVwS01aYVVZbXd0eHRwaXJEV1UwbHBKSmJhU1Vvd3R0aHBiakRWSGpFSEpuSk9TT1NlbGxOSmFLYW0xekRrcEhZU1VPZ2NsbFpSaUxDVzFtRGtucFlPUVVnY2hwWkpTYkNXbDJFSXByWldVWWl3bHRkaGl6TFcxMkdvb3FjV1NVb3dscFJoYmpMVzIyR3JzcExRV1Vva3RsTkppaTdIVzFscXRvWlFZUzBveGxwUmlqREhXM0dLc09aVFNZa2tseHBKU2l5MjJYRnVNTmFmV2NtMHQxdHhpekRYR1hIdXR0ZWZVV3EycHRWcGJqRFhIR25Pc3RlYmVRV2t0bEJKYktLbkYxbHF0TGNaYVF5bXhsWlJpTENYRjJHTE10YlZZY3lnbHhwSlNqQ1dsR0Z1TXRjWVljMDZ0MWRoaXpEVzFWbXV0dGVjWWEreXB0VnBiakRXMzJHcXR0ZlplYyt5MUFBQ0FBUWNBZ0FBVHlrQ2hJU3NCZ0NnQUFNSVlwUmlEMENDa2xHTVFHb1NVWWc1Q3BSUmp6a21wbEdMTU9TbVpZODVCU0NWanpqa0lKWVVRU2trbHBSQkNLU1dsVkFBQVFJRURBRUNBRFpvU2l3TVVHcklTQUFnSkFDQVFVb294NXlDVWtsSktFVUpNT1FZaGhGSlNhaTFDU0NubUhJUlFTa3F0VlV3eDVoeUVFRXBKcWJWS01jYWNneEJDS1NtMWxqbm5ISVFRU2trcHBkWXk1cHlERUVJcEthWFVXZ2NoaEJCS0tTV2wxbHJySUlRUVFpbWxwTlJhYXlHRUVFb3BwYVNVV29zeGhCQkNLYVdra2xKck1aWlNTa2twcFpSU2F5M0dVa29wS2FXVVVrdXR4WmhTU2ltbDFscHJMY1lZVTBvcHBkUmFhN0hGR0dOcXJiWFdXb3N4eGhoclRhMjExbHFMTWNZWVk2MEZBQUFjT0FBQUJCaEJKeGxWRm1HakNSY2VnRUpEVmdRQVVRQUFnREdJTWNRWWNvNUJ5S0JFempFSm1ZVElPVWVsazVKSkNhR1Yxaklwb1pXU1d1U2NrOUpSeXFpVWxrSnBtYVRTV21paEFBQ3dBd2NBc0FNTG9kQ1FsUUJBSGdBQWdaQlNqRG5uSEZLS01jYWNjdzRwcFJoanpqbW5HR1BNT2VlY1U0d3g1cHh6empIR25IUE9PZWNZWTg0NTU1eHp6am5ubkhNT1F1ZWNjODQ1QjZGenpqbm5JSVRRT2VlY2N4QkNLQUFBcU1BQkFDREFScEhOQ1VhQ0NnMVpDUUNrQWdBQXlERG1uSE5TVW1xVVlneENDS1drMUNqRkdJUVFTa2twY3c1Q0NLV2sxRnJHR0hRU1NrbXB0UTVDS0tXazFGcU1IWVFTU2ttcHRSZzdDS1drbEZKck1YWVFTa21wcGRaaUxLV2sxRnByTWRaYVNrbXB0ZFppckRXbDFGcU1NZFphYTBxcHRSaGpyTFhXQWdEQUV4d0FnQXBzV0IzaHBHZ3NzTkNRbFFCQUJnREFFQURBQVFBQUF3NEFBQUVtbElGQ1ExWUNBS2tBQUlBeGpEbm5ISVJTR3FXY2d4QkNLYWswU2prSElZUlNVc3FjazFCS0tTbTFsamtucFpSU1VtcXRnMUJLU2ltMUZtTUhvWlNVVW1vdHhnNUNLaW0xRm1PTkhZUlNVbW90eGhoREtTbTFGbU9NdFlaU1Vtb3R4aGhyTFNtMUZtT050ZVphVW1vdHhocHJ6YlVBQUlRR0J3Q3dBeHRXUnpncEdnc3NOR1FsQUpBSEFFQWd4QmhqakRtSGxHS01NZWVjUTBveHhwaHp6akhHR0hQT09lY1lZNHc1NTV4empESG5uSFBPT2NhWWM4NDU1eHh6empubm5IT09PZWVjYzg0NTU1eHp6am5ubkhQT09lZWNjODRKQUFBcWNBQUFDTEJSWkhPQ2thQkNRMVlDQU9FQUFJQXhqRG5IR0hRU1VtcVlnZzVDQ0NXazBFS2ptSE1RUWlpbHBOUXk2S1NrVkVwS3JjV1dPU2VscEZKU1NxM0ZEa0pLS2FYVVdvd3hkaEJTU2ltbDFtS010WU5RU2tvdHhWaGpyUjJFVWxKcXJiVVlhdzJscE5SYWJESFdtbk1vSmFYV1dveXgxcHBMU3EzRldHT3R1ZVpjVW1vdHRsaHJyVFhuMUZxTU1kYWFhODY5cDlaaWpMSFdtblB1dlFBQWt3Y0hBS2dFRzJkWVNUb3JIQTB1TkdRbEFKQWJBSUFneEpoenprRUlJWVFRUWdnaFVvb3g1eUNFRUVJSUlaUlNTcVFVWTg1QkNDR0VFRUlJSVlTTU1lZWdneEJDQ0tXVVVrb3BHV1BPUVFnaGhCQktLS1dFRWpybm9JTVFRZ21sbEZKS0thVjB6amtJSVlRUVNpbWxsRkpLNlNDRUVFSUlwWlJTU2ltbGxOSkJDQ0dFVUVvcHBaUlNTaWtsaEJCQ0NLV1VVa29wcFpSU1NnZ2hoQkJLS2FXVVVrb3BwWlFRUWdpbGxGSktLYVdVVWtvcElZUVFTaW1sbEZKS0thV1VVa0lJcFpSU1NpbWxsRkpLS2FXRUVFb3BwWlJTU2ltbGxGSktDYUdVVWtvcHBaUlNTaW1sbEJKS0thV1VVa29wcFpSU1Npa2xsRkpLS2FXVVVrb3BwWlJTU2lpbGxGSktLYVdVVWtvcHBaUlFTaW1sbEZKS0thV1VVa29wb1pSU1NpbWxsRkpLS2FXVVVnb0FBRHB3QUFBSU1LTFNRdXcwNDhvamNFUWh3d1JVYU1oS0FDQWNBQUJBQkRvSUlZUVFRZ2dSY3hCQ0NDR0VFRUtJbUlNUVFnZ2hoQkJDQ0NHRUVFSUlwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBSUUFkWm5oQUJnOVllTU1LMGxuaGFQQmhZYXNCQURTQWdBQVl4aGpqQ25JcExNV1k2ME5ZeEJDQjUyRUZHcW9KYWFHTVFnaGRGQktTaTIyV0hNR29hUlNTa2t0eGxpRHpUMkRVRW9wcGFRV1k2MDVGK05CU0NXbDFHS3J0ZWNjak80Z2xKSlNTakhXbW5QdXZXalFTVW1wdFZwejdqMEhYendJcGFUV1dvdzlCeCtNTUtLVWxtS3NzZFljZkJGR0dGRktTeTNHbW52TnZSaGpoRW9weGxwN3pybm5YSXdSUHFVV1k2NjU5eDU4THNMNDRtTE1PZmZpZ3c4K0NHR01rREhtMkhQd3ZSZGpqQS9DeUZ4ekxzSVk0NHN3d3ZnZ2JLMjVCMStNRVVZWVkzenZOZmlnZXpIQ0NDT01NY0lJM1hQUlJmaGlqREZHR0YrRUFRQzVFUTRBaUF0R0VsSm5HVllhY2VNSkdDS1FRa05XQVFBeEFBQUVNY1lncEpCU1NpbkZHR09NTWNZWVk0d3h4aGhqakRIR25HUE9PZWVjQUFEQUJBY0FnQUFyMkpWWldyVlIzTlJKWHZSQjRCTTZZak15NUZJcVpuSWk2SkVhYXJFUzdOQUtidkFDc05DUWxRQUFHUUFBNUtTVWxGb3RHa0xLUVdrMWlNZ2c1U1RGSkNKamtJTFNncWVRTVloSnloMWpDaUVGcVhiUU1ZVVVveHBTQ3BsU0NtcXFPWWFPTWFneEorRlNDYVVHQUFCQUVBQWdJQ1FBd0FCQndRd0FNRGhBR0RrUTZBZ2djR2dEQUF4RXlFeGdVQWdORGpJQjRBRWlRaW9BU0V4UWxDNTBRUWdScElzZ2l3Y3VuTGp4eEEwbmRHaURBQUFBQUFDQUFJQVBBSUNFQW9pSVptYXV3dUlDSTBOamc2UEQ0d01rUkdRa0FBQUFBQUJBQU9BREFDQWhBU0tpbVptcnNMakF5TkRZNE9qdytBQUpFUmtKQUFBQUFBQUFBQUFBQWdJQ0FBQUFBQUFCQUFBQUFnSlBaMmRUQUFSUUN3QUFBQUFBQU5VOUFBQUNBQUFBTU1sc1FBdTV0cnEyL2Y4RStyaTh1elNmTmpSdDdzMHIzMzMxSzdlMnl0Q3ZQNmE0WDZTMHJ1dmFEemZmcVQyeTNFenVGMmROWWE3cnZIeDF0UHlWci81T0dMRnFIaDRQczNiNDl0VjVmZVZtN1ZBZjhldnMvTThwdzlwN3czVzdYM3orM1IzbDlBZ25WVlpCcWFuTVM2RUdVVHFwbFhhVEY5bkpFMXIrZlpxa1pWVjltVEhHM3ZzL0ZEZGtQZjA4UERaVWwxL1pTVVdhUG15TXJlOXM5RXAvcW5wNFgzbS84M2ZwLzE3bm1tUGxVVlJyaks5WmQzK042Zm5tYmNWM2ozZDg2VWc3VkNJQVZLdmxiNVEvMTJGMml3U04raU96TGN2ZVgyNXFleGJhTWJNdHRNb3ZVWi8xVS84NHZMWnp6K3Fib3NydXVIL3ZkQUZPMVNzWnVhVUZPZEVKeXl2ZmZiaitWdTVicis1ZU1rRms3NEU1TGNHamluTEtvZFAvYlh0R3pmL2ZpRnZQZnFscEVaWG8zaE5MV2NldHBkbHhoeDMvTFdaT2UyZUhpWTFqaDlVM25TdFRuV2xlN3NsdGE4SGdlZm5wWXR1YVRkbi8zVWFaaTdiL3NaK1piZDJxbUd3MVJPMmh5U1phYWMzcGFJYUpLYWFWNVVoQ1NBQkVyOEVtUERlVnB3K1J6YnJKNXRsbC85VzFJREozKzFqTWNyZFl1bTFnRjZkT1BEaHh4TTJXdVdiaHlIcXdMZk54d3pYdTFBODk1bHI0S1o5MkhmdnV0K3QzYnJmWDJxeUhFUlA3NDdmUFQwMnh1VGxIWi8zMi9Qd2FUZWoyM2o1WkcyK3g3RTI1cTBodTNWN1NMQzMrdEVlck5HSi9uaG9wT2lZTHo1eHE5RitOUEYvK3VWWFUrZU9lYklUQi90LzAwdVRVaWttVW02cVp6WG85ZzFYdTY1ZW5zak1iMFlXUXRnaUVuV0VWYmUyUlQ5UWx0SDhqZWdBc3F4RndWNy93ckw5VEFtbEFIdW40NmwvYzh6RFJiWGxZYXZ1VWdtbldxdDhYMm40Ym5ZTXlGV011empaeEYvdEdQTzBDNnB5K3pPOTM2eGN0NjNsLzNiOWwxK2RUOVhFYzI0Ym84VU00ZHFpZFZEWGsybUw1QStXRXJGU252NUtoVmZZOCtkc2pPV3R5VCszNUhJMlQvLzBXd3VwU3FmYnZQRUtzOUc1SU9XWjF6cDMvNitSaHB5Zi9XYW5LME9sOTAzTjFtWnQ2dlZoWDBGM3EyZlBqUDU1L0hvODdwV2RLdnJwV0RxTkF4NUZyOEs0Q0FQb0lLeW9RekhXREZ2ZnRMcmo1c3dkOS9NSUt3ZTVNbHZJMTFqQnoyeFp6U2NPK1AzMnFqcXFzcXRLM1JNcnB4ZFREeS8zNVRLVHMzTGxocSttZjBQeXdNcG51SGwxankvMVVhTFVjdlJSdTYzVFA0ZURuOWF2TzBDcEdFVzNYM0p0WFI5c0ppd3F0Mm93SE9XeEwwNzVQczhKUm55M2E3cTZudm82Zm91eUloanJhWVRrZG1yMWdXQmJYaDhaZVk2clhydzI5YzlwdEpFODZEeTViNWVteTQzNHRpNkcrR3N6bU1oa2o0NklqaXR6M1dreVNkQzh2Tk5XNnR2OW9kUlNoc2NnekJ6L3d0dTBXeDVVN1N4ZVdqYVlkUmJiTnBwUHZYRVJ2YjQycnB4N2RFNjR2UExQYmRNN3IxbnB4Y1BMMmV3L3NmTXNsajBrQUFBQmVDTk9yUUpuRENScXVoK2l6c1NWczN3SzZDRnNLblN3cVhzVXI3WVdQalZXbHQwbnNEeVlUTDExMVFKM3p6TlBtSlEvemgxLzEyQ2sxR05aS2ZVeGFTYzVvdHUybDNsakxDc1pDMDlPVjM2YlRHZElxTk02Yy9YTy9ubEQ3VGxtYUtzSkFWT1JEcGN5YU10aWxmMUVpQ3U5TnBrV01IM1J2dSt6REk0MWx0L3pxcitxbUQ3YXhsSnVYL1pENytrL1FlZFdQdS9oOTNReDZ6ZHJBaWlhZU1lcTI5ZExHcGNucSs1MXc5QkoxSGxCa054VjA3YkY1bzlOOTVWR1hueDdUdUdIUjlYV0QwUG8zcGZCNjBrWDNxc1l6cDlRMTllZzZsODVUTGp1ZmRzM2FvRmVDU2I5TzlUZFcvTjdmWGMyemxhTXpuZmZPUzUxSEF2Zm1wSWlvQVFBQTFzaXlFNkRFeXdJZHNQKzAzVC9VK1g5TzkvWDUvNy9rS004NFovM2FUSWNhWmV2UFN0ZE11bEpYaFhjdDZ1bTB4WmpOTzJQeVh1ZmRmNzl4MlVsM2RYU3N5ZlM1WERvV1Q0bUN2YmQrcVZWMW85OW5NYlhidWVuMWczbi9XS2Uxc3lHLzNxTjA2UTE5RjVEbFN4WE9CS05qVkc4ei9kV3NGS3JyR3pPSWQ3UjNkaW8vK1VyVjRicUl1VUlZRmtJN211VjhmSy9oYkdtczJLMnMzOVhXdnZ5VE5KZjFFcjJLY1pQUkRHSzNCeVYxMmQ1VUs1UG1xaEJ6UGR1VmpqanV2ZnRqUTZkYk91cVdwZnhxT1UvMmRtdUtDVXNud2Y1M2RYV1BhWGlxQ25QazI1S0hYczY4Ykp2aGNtbnJKbi9ZM1h2UGEzMG5aZ1FBQUJ3bFVpUG01cW02Unh1Uk5WMm9iNWxFbGpaMjkyL04yN0ZuaFU5ZUtMSmpzMy9zMUtQSGliU3FuUWF6YWJKejgxNWtWd3VSS25vT1lYT1U4N2M1ZHE2T1RnMDN5OE5jSDlRVDd0WjdQSFJiRGZvdkNsTXVZenFYMWxmU2VQUjhlazlaZVVONzBydTE3OXdlM2pydWY4ZXpjNXRQWlA4WTF2QytxdTJiM1U0bmZ6KzBUSXFLKzFjdTE2WmE1Y1duaDdYNzFPTlJkVWZGVjdJNitmWnM3Vjc1YjRoamlYSzFtaThtbSt2K3hsbjFrNjczanR1VUpBQVVHMk5vWjNQc0l4OTZOSHBacXNyUlNkSFRHMXljOFhuMS9kQkpFKzU4ZFB0L0hyK3B6QXZmc3prNmNTdzZMLzc1YlljN1Q5UlU1Q1ZVUjQ0S24wK2YybzgrOWtQUDdOM28xSDlRcTUxajdqeUhPZnpTb3pjdm5EN2w4dWlKQjFsYlFIUlA5SDZtVDgvNEZVMmhLVXpCYUJxSHpkdnFRN1Q5WTZRTGltMlhjT3ZWcHVOTTFxc25nLzF1bUpHeWxxY3U3NS9yVHB4ei85Wk9QOHY1T2FubHRmVTdCOSt2VmlWYkVhVjJzN0oyNzlZL1dsN2NtS3QwUFdGdlU3d0c2ME9lbyszSFh4VTVxczNTZHo2YUwyd2E5b29mRHZaWXp1bk4wWW04bk5xMWF2M3p4eStQUlYvWUwzejZQdmFGK29mbzB0bkkyb3JQbDc0SDFWclZ2bDM1ZTdzd2F2bmRQbC92UDdoZFBXRjhSR2RsU29tN0Rsc3J3NUt5NTNuZVphMlQxcG5NWEkzTDZtRVVLYWk1MUkvQnFMYUxyTzNzNytIODMzNnptS3pvcXBqWU9RbnI3cXZQVnErN2FxWHplaVc3K1dycjhzYTcvL1krczMzejZ2MWw1SDlsNDFWcHFqL0kvUEI4eXJoZjNwOWJVY2ZRM1FBPVwiKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFs0IC8qeWllbGQqLywgKF9rLnNlbnQoKSkuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lLmFwcGx5KF9kLCBfZi5jb25jYXQoW19rLnNlbnQoKV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5BdWRpby5yZWdpc3RlcihcIm1vYi5cIiArIHRoaXMuZW50aXR5SUQgKyBcIi5xdWFja1wiLCBBc3luY1NpbmsuQXVkaW8uQ2F0ZWdvcnkuQU5JTUFMUywgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogXCJzb3VuZHMvbW9iL1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi9xdWFjay5vZ2dcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpdGNoOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2x1bWU6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbWluZzogZmFsc2UgLy91c2UgZm9yIGxhcmdlIGF1ZGlvIGZpbGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfaCA9IChfZyA9IEFzeW5jU2luaykuc2V0RmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9qID0gW1wicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9zb3VuZHMvbW9iL1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi9zdGVwLm9nZ1wiKV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChcImRhdGE6YXVkaW8vb2dnO2Jhc2U2NCxUMmRuVXdBQ0FBQUFBQUFBQUFBYlBRQUFBQUFBQUxZWldkSUJIZ0YyYjNKaWFYTUFBQUFBQVlBK0FBQUFBQUFBbUlZQkFBQUFBQUNwQVU5bloxTUFBQUFBQUFBQUFBQUFHejBBQUFFQUFBQmZLYk5ZRDVELy8vLy8vLy8vLy8vLy8vLy80QU4yYjNKaWFYTTBBQUFBV0dsd2FDNVBjbWNnYkdsaVZtOXlZbWx6SUVrZ01qQXlNREEzTURRZ0tGSmxaSFZqYVc1bklFVnVkbWx5YjI1dFpXNTBLUUlBQUFBekFBQUFWRWxVVEVVOVZHaGxJRk52YjNSb2FXNW5JRk52ZFc1a2N5QnZaaUJFVlVOTElDTXpJQ2h5ZFc1dWFXNW5JR1IxWTJzcEVRQUFBRUZTVkVsVFZEMXpaVVJWUTB0MGFYWmxBUVYyYjNKaWFYTWtRa05XQVFCQUFBQVlRaEFxQmExampqcklGU0dNR2FLZ1Fzb3B4eDFDMENHakpFT0lPc1kxeHhoalI3bGtpa0xKZ2RDUVZRQUFRQUFBcEJ4WFVISkpMZWVjYzZNWVY4eHg2Q0RubkhQbElHZk1jUWtsNTV4empqbm5rbktPTWVlY2M2TVlWdzV5S1Mzbm5IT0JGRWVLY2FjWTU1eHpwQnhIaW5Hb0dPZWNjMjB4dDVKeXpqbm5uSFBtSUlkU2NxNDE1NXh6cEJobkRuSUxKZWVjYzhZZ1o4eHg2eURubkhPTU5iZlVjczQ1NTV4enpqbm5uSFBPT2VlY2M0d3g1NXh6empubm5ITnVNZWNXYzY0NTU1eHp6am5uSEhQT09lZWNjeUEwWkJVQWtBQUFvS0VvaXVJb0RoQWFzZ29BeUFBQUVFQnhGRWVSRkV1eEhNdlJKQTBJRFZrRkFBQUJBQWdBQUtCSWhxUklpcVZZam1acG5pWjZvaWlhb2lxcnNtbktzaXpMc3V1NkxoQWFzZ29BU0FBQVVGRVV4WEFVQndnTldRVUFaQUFBQ0dBb2lxTTRqdVJZa3FWWm5nZUVocXdDQUlBQUFBUUFBRkFNUjdFVVRmRWt6L0k4ei9NOHovTTh6L004ei9NOHovTTh6L004RFFnTldRVUFJQUFBQUlJb1pCZ0RRa05XQVFCQUFBQUlJUm9aUTUxU0Vsd0tGa0ljRVVNZFFzNURxYVdENENtRkpXUFNVNnhCQ0NGODd6MzMzbnZ2Z2RDUVZRQUFFQUFBWVJRNGlJSEhKQWdoaEdJVUowUnhwaUFJSVlUbEpGaktlZWdrQ04yREVFSzRuSHZMdWZmZWV5QTBaQlVBQUFnQXdDQ0VFRUlJSVlRUVFnZ3BwSlJTU0NtbW1HS0tLY2NjYzh3eHh5Q0RERExvb0pOT09zbWtrazQ2eWlTampsSnJLYlVVVTB5eDVSWmpyYlhXbkhPdlFTbGpqREhHR0dPTU1jWVlZNHd4eGhnakNBMVpCUUNBQUFBUUJobGtrRUVJSVlRVVVrZ3BwcGh5ekRISEhBTkNRMVlCQUlBQUFBSUFBQUFjUlZJa1IzSWtSNUlreVpJc1NaTTh5N004eTdNOFRkUkVUUlZWMVZWdDEvWnRYL1p0MzlWbDMvWmwyOVZsWFpabDNiVnRYZFpkWGRkMVhkZDFYZGQxWGRkMVhkZDFYZGVCMEpCVkFJQUVBSUNPNURpTzVEaU81RWlPcEVnS0VCcXlDZ0NRQVFBUUFJQ2pPSXJqU0k3a1dJNGxXWkltYVpabmVaYW5lWnFvaVI0UUdySUtBQUFFQUJBQUFBQUFBSUNpS0lxak9JNGtXWmFtYVo2bmVxSW9tcXFxaXFhcHFxcHFtcVpwbXFacG1xWnBtcVpwbXFacG1xWnBtcVpwbXFacG1xWnBtcVpwbXFacEFxRWhxd0FBQ1FBQUhjZHhIRWR4SE1keEpFZVNKQ0EwWkJVQUlBTUFJQUFBUTFFY1JYSXN4NUkwUzdNOHk5TkV6L1JjVVRaMVUxZHRJRFJrRlFBQUNBQWdBQUFBQUFBQXgzTTh4M004eVpNOHkzTTh4NU04U2RNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUUU5DUTFZQ0FHUUFBQnpGbUh0U1Nxbk9RVWd4SjJjN3hoeTBtSnNPRlVKTVdpMDJaSWdZSnEzSDBpbENrS09hU3NpUU1ZcHFLYVZUQ0NtcHBaVFFNY2FrcHRaYUtxVzBIZ2dOV1JFQVJBRUFBQWdoeGhCamlERUdJWU1RTWNZZ2RCQWl4aHlFREVJR0laUVVTc2tnaEJKQ1NaRmpERUlISVlNUVVnbWhaQkJDS1NHVkFnQUFBaHdBQUFJc2hFSkRWZ1FBY1FJQUNFTE9JY1lnUkl4QkNDV2tGRUpJS1dJTVF1YWNsTXc1S2FXVTFrSXBxVVdNUWNpY2s1STVKeVdVMGxJcHBiVlFTbXVsbE5aQ0thMjExbXBOcmNVYVNta3RsTkphS2FXMTFGcU5yYlVhSThZZ1pNNUp5WnlUVWtwcHJaVFNXdVljbFE1Q1NoMkVsRXBLTFphVVdzeWNrOUpCUjZXRGtGSkpKYmFTVW93bGxkaEtTakdXbEdKc0xjYmFZcXcxbE5KYVNTVzJrbEtNTGJZYVc0dzFSNHhCeVp5VGtqa25wWlRTV2ltcHRjdzVLUjJFbERvSEpaV1VZaXdsdFpnNUo2V0RrRklISWFXU1Vtd2xwZGhDS2EyVmxHSXNKYlhZWXN5MXRkaHFLS25Ga2xLTUphVVlXNHkxdHRocTdLUzBGbEtKTFpUU1lvdXgxdFphcmFHVUdFdEtNWmFVWW93eDF0eGlyRG1VMG1KSkpjYVNVb3N0dGx4YmpEV24xbkp0TGRiY1lzdzF4bHg3cmJYbjFGcXRxYlZhVzR3MXh4cHpyTFhtM2tGcExaUVNXeWlweGRaYXJTM0dXa01wc1pXVVlpd2x4ZGhpekxXMVdITW9KY2FTVW93bHBSaGJqTFhHR0hOT3JkWFlZc3cxdFZacnJiWG5HR3ZzcWJWYVc0dzF0OWhxcmJYMlhuUHN0UUFBZ0FFSEFJQUFFOHBBb1NFckFZQW9BQURDR0tVWWc5QWdwSlJqRUJxRWxHSU9RcVVVWTg1SnFaUml6RGtwbVdQT1FVZ2xZODQ1Q0NXRkVFcEpKYVVRUWlrbHBWUUFBRUNCQXdCQWdBMmFFb3NERkJxeUVnQUlDUUFnRUZLS01lY2dsSkpTU2hGQ1REa0dJWVJTVW1vdFFrZ3A1aHlFVUVwS3JWVk1NZVljaEJCS1NhbTFTakhHbklNUVFpa3B0Wlk1NXh5RUVFcEpLYVhXTXVhY2d4QkNLU21sMUZvSElZUVFTaWtscGRaYTZ5Q0VFRUlwcGFUVVdtc2hoQkJLS2FXa2xGcUxNWVFRUWltbHBKSlNhekdXVWtwSkthV1VVbXN0eGxKS0tTbWxsRkpMcmNXWVVrb3BwZFphYXkzR0dGTktLYVhVV211eHhSaGphcTIxMWxxTE1jWVlhMDJ0dGRaYWl6SEdHR090QlFBQUhEZ0FBQVFZUVNjWlZSWmhvd2tYSG9CQ1ExWUVBRkVBQUlBeGlESEVHSEtPUWNpZ1JNNHhDWm1FeURsSHBaT1NTUW1obGRZeUthR1ZrbHJrbkpQU1VjcW9sSlpDYVptazBscG9vUUFBc0FNSEFMQURDNkhRa0pVQVFCNEFBSUdRVW93NTV4eFNpakhHbkhNT0thVVlZODQ1cHhoanpEbm5uRk9NTWVhY2M4NHh4cHh6empubkdHUE9PZWVjYzg0NTU1eHpEa0xubkhQT09RZWhjODQ1NXlDRTBEbm5uSE1RUWlnQUFLakFBUUFnd0VhUnpRbEdnZ29OV1FrQXBBSUFBTWd3NXB4elVsSnFsR0lNUWdpbHBOUW94UmlFRUVwSktYTU9RZ2lscE5SYXhoaDBFa3BKcWJVT1FpaWxwTlJhakIyRUVrcEpxYlVZT3dpbHBKUlNhekYyRUVwSnFhWFdZaXlscE5SYWF6SFdXa3BKcWJYV1lxdzFwZFJhakRIV1dtdEtxYlVZWTZ5MTFnSUF3Qk1jQUlBS2JGZ2Q0YVJvTExEUWtKVUFRQVlBd0JBQXdBRUFBQU1PQUFBQkpwU0JRa05XQWdDcEFBQ0FNWXc1NXh5RVVocWxuSU1RUWltcE5FbzVCeUdFVWxMS25KTlFTaWtwdFpZNUo2V1VVbEpxcllOUVNrb3B0UlpqQjZHVWxGSnFMY1lPUWlvcHRSWmpqUjJFVWxKcUxjWVlReWtwdFJaampMV0dVbEpxTGNZWWF5MHB0UlpqamJYbVdsSnFMY1lhYTgyMUFBQ0VCZ2NBc0FNYlZrYzRLUm9MTERSa0pRQ1FCd0JBSU1RWVk0dzVoNVJpakRIbm5FTktNY2FZYzg0eHhoaHp6am5uR0dPTU9lZWNjNHd4NTV4enpqbkdtSFBPT2VjY2M4NDU1NXh6ampubm5IUE9PZWVjYzg0NTU1eHp6am5ubkhQT0NRQUFLbkFBQUFpd1VXUnpncEdnUWtOV0FnRGhBQUNBTVl3NXh4aDBFbEpxbUlJT1FnZ2xwTkJDbzVoekVFSW9wYVRVTXVpa3BGUktTcTNGbGprbnBhUlNVa3F0eFE1Q1NpbWwxRnFNTVhZUVVrb3BwZFppakxXRFVFcEtMY1ZZWTYwZGhGSlNhcTIxR0dzTnBhVFVXbXd4MXBwektDV2wxbHFNc2RhYVMwcXR4VmhqcmJubVhGSnFMYlpZYTYwMTU5UmFqREhXbW12T3ZhZldZb3l4MXBwejdyMEFBSk1IQndDb0JCdG5XRWs2S3h3TkxqUmtKUUNRR3dDQUlNU1ljODVCQ0NHRUVFSUlJVktLTWVjZ2hCQkNDQ0dVVWtxa0ZHUE9RUWdoaEJCQ0NDR0VqREhub0lNUVFnaWxsRkpLS1JsanprRUlJWVFRU2lpbGhCSTY1NkNERUVJSnBaUlNTaW1sZE00NUNDR0VFRW9wcFpSU1N1a2doQkJDQ0tXVVVrb3BwWlRTUVFnaGhGQktLYVdVVWtvcEpZUVFRZ2lsbEZKS0thV1VVa29JSVlRUVNpbWxsRkpLS2FXVUVFSUlwWlJTU2ltbGxGSktLU0dFRUVvcHBaUlNTaW1sbEZKQ0NLV1VVa29wcFpSU1NpbWxoQkJLS2FXVVVrb3BwWlJTU2dtaGxGSktLYVdVVWtvcHBaUVNTaW1sbEZKS0thV1VVa29wSlpSU1NpbWxsRkpLS2FXVVVrb29wWlJTU2ltbGxGSktLYVdVVUVvcHBaUlNTaW1sbEZKS0thR1VVa29wcFpSU1NpbWxsRklLQUFBNmNBQUFDRENpMGtMc05PUEtJM0JFSWNNRVZHaklTZ0FnSEFBQVFBUTZDQ0dFRUVJSUVYTVFRZ2doaEJCQ2lKaURFRUlJSVlRUVFnZ2hoQkJDQ0tXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVVVQUhXWjRRQVlQV0hqREN0Slo0V2p3WVdHckFRQTBnSUFBR01ZWTR3cHlLU3pGbU90RFdNUVFnZWRoQlJxcUNXbWhqRUlJWFJRU2tvdHRsaHpCcUdrVWtwSkxjWllnODA5ZzFCS0thV2tGbU90T1JmalFVZ2xwZFJpcTdYbkhJenVJSlNTVWtveDFwcHo3cjFvMEVsSnFiVmFjKzQ5QjE4OENLV2sxbHFNUFFjZmpEQ2lsSlppckxIV0hId1JSaGhSU2tzdHhwcDd6YjBZWTRSS0tjWmFlODY1NTF5TUVUNmxGbU91dWZjZWZDN0MrT0ppekRuMzRvTVBQZ2hoakpBeDV0aHo4TDBYWTR3UHdzaGNjeTdDR09PTE1NTDRJR3l0dVFkZmpCRkdHR044N3pYNG9Ic3h3Z2dqakRIQ0NOMXowVVg0WW93eFJoaGZoQUVBdVJFT0FJZ0xSaEpTWnhsV0duSGpDUmdpa0VKRFZnRUFNUUFBQkRIR0lLU1FVa29weFJoampESEdHR09NTWNZWVk0d3h4cHhqempubm5BQUF3QVFIQUlBQUs5aVZXVnExVWR6VVNWNzBRZUFUT21Jek11UlNLbVp5SXVpUkdtcXhFdXpRQ203d0FyRFFrSlVBQUJrQUFPU2tsSlJhTFJwQ3lrRnBOWWpJSU9Va3hTUWlZNUNDMG9LbmtER0lTY29kWXdvaEJhbDIwREdGRktNYVVncVpVZ3BxcWptR2pqR29NU2ZoVWdtbEJnQUFRQkFBSUNBa0FNQUFRY0VNQURBNFFCZzVFT2dJSUhCb0F3QU1STWhNWUZBSURRNHlBZUFCSWtJcUFFaE1VSlF1ZEVFSUVhU0xJSXNITHB5NDhjUU5KM1JvZ3dBQUFBQUFnQUNBRHdDQWhBS0lpR1ptcnNMaUFpTkRZNE9qdytNREpFUmtKQUFBQUFBQVFBRGdBd0FnSVFFaW9wbVpxN0M0d01qUTJPRG84UGdBQ1JFWkNRQUFBQUFBQUFBQUFBSUNBZ0FBQUFBQUFRQUFBQUlDVDJkblV3QUVoZ3dBQUFBQUFBQWJQUUFBQWdBQUFEZWoxYjhMdWJ1Nyt2THRmcTNDQVFIVXBqNG96Yno3VXZmMHJsQkZNa1QzcnM5alo3Qi9IYTYwa2JlVDVkeC9qS0hEclB0aFhkMTB5UDJpNTkrNzdZZDc3WTgvS1pYS1UvcGNoZkJ0TFZJdGgwaGVxMlVQeTJGWnYxTTczN3lzd25yTjViQkVuOSs2dWJ2SmE3U1lJWU11SkxsTmNhYW9jb0wvZCt3aGZPc3F5NTFmcjlRTmovTDA0SlVTN3MrZXkyQWxsTjR6MTFjemNkcGE4cDNPSDF2UHNadjgzNXlZTHZ5ZUxzVVIyK3J0KzNhMThyTmJrV09PcC9lUmQ1ZGp4WlNTN3E1VFdpN2pMZXl5alJHTGV3NkhqODNYcnlIWGRXLzAwdHZvSlJHaWg2ZVA3QVcvUnhlZ0xKekw4bVVlMi9UUi91bkRpM2RtdWRwMjB2blQ3aDhjbW5RM0VxcTEybFRybnQ5MnRROXoyZkhpL2N2RHZQWjBodEsxcjNzdisvRVBuWHFVWUNrUmRGU3lPSHVzUEsyMXRXREFQYVZQNWE0dDlCTS8xODZMc25vdmtmN3pJWmRQWHo0ZlBscHU3RExsbFhtVjJZZTJHeDdYbGRQei9jZjljZUY1bWJuYWx0dW43WXB3L3dzblZucEM2RFltSXBzbmJPL2JObnNlYmhkN0FRRHNLSlA3N2ptY3VQbFR2WVRnc24rMFJzcG5wME9vTm4wK21ObVU5M2ZmTUhZN2FrTDAzTHYzeDU1T3ZqaTJ1YXpIYmxaaGZWbEk2cytzTzRkR2VWNXJhdW13SEk3dUx4OHFZTmRlZDg3cHlIcmZkdlRuZm5YNGRUK0lEOStuV0QrekFwbTZIL3ZLa2J1ZUxialFVdndpaEtxSFdtcHBlZjlmL1Y0OCsxbkw2L1lYZk9aVy93dmRxS09tQzMrZHI2Nll1MVZzdmlRT3Z1T2owOWQ3ejYzVGlYSzYrT1JUNHE0VVY4N0wzWGlpY2FsYVBYS01ieXdWdTQwQTJrYUxDQUFBSEUvdFkrc3ZqejEyK2xkalJTUjJQOWRiVnRiUXdzU0F4Wmx5WDZ1bHpTNEk0YjdMb3FDNmREWGxhWTN3MzdHcDZYbjhTZVhINWV4NVV1aVUxVzYzbFkzYldiWGNZeWY5enF2S2VXejc4L1RmVVp2ODFtdmw2NitjYWg3b2lQZTFuZmtsL2JiQ09meTMyMC90SkVrbys5cGh4WGJwVzZuNy9tSm50c3ZOSS80dnZaazhqQVRhZVlwWE9ENUJ2UXhicld4em05RDZSYVhFaUJFZXhzbXR1V3E1UVF4bDA1MlN5OU93T0YyRkoxejJXNkhaVUo4S1phSXZTeExUcmpydGxibEZxWFRqL3VzWDZJd1hlZFNSVGIyTzI3bWVDdkY0KzdIZ2I4ZCszMWZCcEU3VG5qcmFmTXRTYmY3Nmw4dmdxd0VBQUo3bXlnd29EUTFTTjlka3h3LzZzZVBaUzFXVnJocHR6VC9ORnUxcTNxek1YMU96MDZ0c1ZncFZ6LzNWbi92SnowdytWSHZXM2ErQ1p2Um54MHpBMkVOQ3I5bnpzbDkrcjczNXd2UHJBMzhwT0JxT0JPMTU5SVNlYll6bTFWSWw3dGRkY3NVMGNuUWlrTVRWNTR1aENIaSs5aWRQWlIxaGZMVnRFTkx3Y25NcmlQdEZXTnBtSWNwNjkvZUVaOTVNY2ZQaXhybFozWUE5VjVSY01kZFRqY3lEY0lOVi96NWpQVmpiTG9lUEN1TkovbW9GbTF6WXJhcjNzVzNzbnp1MHdYK0tLcFJQV09TRGJkU0VaVjdIRW5mZWhuRXh5bU45N1N0bHVTNC85WDN6ZWI1Z3J6SzVXNFNWQlRhczF5Z0dCd0FBTmhhTEJNQUJHQjB4QlYyT29tL3ZqNzN3c1p0YWxLQW91MVF2NEttc2l2T2ZOYU1kRkczZlZlWEFJMTBVMW01bmhPYTdXK2VuUzJsZXFMdE5zcUkwTExiVVo1ZWxxVncwdGVFS0JiMnR1V0tUTEJmYlRWNmZybnpoMGZ6NjVmZTliejQvZVpBYlBHaG1Lc2QvMzhheTgvMVpFZForV1BjblZ1dlNGUTBpamFJaTExOU54cEpPVXhuMjEzeWpOSWFFZFRHZGhrTExoMzI2TVB2Ri92dWFJRjNqZVFQZUptVmUzamN3ZXR1dys3bGQ3M0JaM1Iwdi9kTFRwN3c2UjFubWJiajRRODB5OCtUUG84YWRiV3l1OGtBaW83aTViSDA1N1o4cHh1bXBVdGdXKy90TzUvQkcrS0RETEFBQXpDaFRMM1IwNmZCMHkwK0pKb2hxcCtTaXAyRDg1akdKSmI2SFhnZmZnNjlqWEZORWx0ZFRQbHpFMWJvL2J6ZC9yK2Vac0hubHRIeDFzY1RabjhpYlRVbEY3c3QrZVNwdjN4dThHdTlNY29Pb2lOMXU3c2ZQemJFdVRvZmpuZjZ3VmxaOWF0WE9lYjdVZjlMY3ptMWVuOS95eUtKQzdHOCtkVGx6bkFRQTNDUmh3UngyaE0xbm5WVTUxWVorSHVOcGk1eU8zYm1HelJvemVXcm4vWTV5Vmc5YkZBdjJybmg5Y055clRrSTJENjVWek9OMXlsaVRhOVZ6L2RLNTJla0o2MmFZVWlRdzlwWGN6Z3BCeTd6YW5JMGxDcGJHYS9iNnIrN1pzdlhzMEw0ZS84OEt4dVcwU2kxemxWMC9YVXRIOVc5MU0vS01xemVjbnBQdDBlSjlJWEgrMHJSMS81ZjdmRjJMZXZzcG8vbmV2NGVEdGUydVRuTGFGdG1ublpSUWN6bExkTnE1bGxRUEJRQ2tpdWptbytucmJvOCtGVTg4Mnk5OCtoQTlmVmhYSDkrNzBHN25jZS8vK2NMeC9jdlY3Ny8zd3BQdlg2NCt2cmNMcTkrL3ZIQjhDKzMrNVFYSGMrTFpmdUhUaCtpcEQyN2lIdjJ5SDN0NnVmcjlkeGNPRWdUT1BHSFBrMG1Ndko3U1g3ZlgrdFhQK3hOVHo3dFZ4ejQwZTlwakRWKzgzSG1lSytQTnRTMnZTcCtPbXoyVnhzRDcrRno0ZXcrNlM4cG8rOVpaejZqN2VYL2YrekpidnVRNHVwOTYxRmNXRmMvZFpkanpycSszblYrN3Q3N2Q4M3JSdGVOZC9lWGF1RzBrQUFvT1wiKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFs0IC8qeWllbGQqLywgKF9rLnNlbnQoKSkuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9oLmFwcGx5KF9nLCBfai5jb25jYXQoW19rLnNlbnQoKV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5BdWRpby5yZWdpc3RlcihcIm1vYi5cIiArIHRoaXMuZW50aXR5SUQgKyBcIi5zdGVwXCIsIEFzeW5jU2luay5BdWRpby5DYXRlZ29yeS5BTklNQUxTLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBcInNvdW5kcy9tb2IvXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiL3N0ZXAub2dnXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXRjaDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9sdW1lOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IGZhbHNlIC8vdXNlIGZvciBsYXJnZSBhdWRpbyBmaWxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLm1jLnJlbmRlck1hbmFnZXIuZW50aXR5UmVuZGVyTWFwLnB1dChNb2RBUEkudXRpbC5hc0NsYXNzKGRhdGEuRW50aXR5RHVjayksIG5ldyBkYXRhLlJlbmRlckR1Y2soTW9kQVBJLm1jLnJlbmRlck1hbmFnZXIuZ2V0UmVmKCksIG5ldyBkYXRhLk1vZGVsRHVjaygpLCAwLjMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5wcm9taXNpZnkoTW9kQVBJLm1jLnJlbmRlckVuZ2luZS5iaW5kVGV4dHVyZSkoZGF0YS5kdWNrVGV4dHVyZXMpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGVkIE9FbnRpdHkgdGV4dHVyZSBpbnRvIGNhY2hlLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gT0VudGl0eTtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBPRW50aXR5O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xuICAgIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbi8qXG4gIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cbiAgT0l0ZW0udHNcbiAgICBcbiAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xudmFyIE9JdGVtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9JdGVtKGl0ZW1OYW1lLCBpdGVtSUQsIGl0ZW1TdGFjaywgdGV4dHVyZSwgb25SaWdodENsaWNrKSB7XG4gICAgICAgIHRoaXMuaXRlbU5hbWUgPSBpdGVtTmFtZTtcbiAgICAgICAgdGhpcy5pdGVtSUQgPSBpdGVtSUQ7XG4gICAgICAgIHRoaXMuaXRlbVN0YWNrID0gaXRlbVN0YWNrO1xuICAgICAgICB0aGlzLml0ZW1UZXh0dXJlID0gdGV4dHVyZTtcbiAgICAgICAgdGhpcy5vblJpZ2h0Q2xpY2sgPSBvblJpZ2h0Q2xpY2s7XG4gICAgfVxuICAgIE9JdGVtLnByb3RvdHlwZS5yZWdpc3RlckNsaWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyICQkaXRlbUdldEF0dHJpYnV0ZXMgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKS5tZXRob2RzLmdldEl0ZW1BdHRyaWJ1dGVNb2RpZmllcnMubWV0aG9kO1xuICAgICAgICB2YXIgY3JlYXRpdmVNaXNjVGFiO1xuICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIGNyZWF0aXZlTWlzY1RhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy5NSVNDO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3JlYXRpdmVNaXNjVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLnRhYk1pc2M7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGl0ZW1DbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpO1xuICAgICAgICB2YXIgaXRlbVN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoaXRlbUNsYXNzLCBmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuLmxlbmd0aCA9PT0gMTsgfSk7XG4gICAgICAgIHZhciBpdGVtU3RhY2sgPSB0aGlzLml0ZW1TdGFjaztcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBmdW5jdGlvbiBubWlfT3Zlbkl0ZW0oKSB7XG4gICAgICAgICAgICBpdGVtU3VwZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLiRzZXRDcmVhdGl2ZVRhYihjcmVhdGl2ZU1pc2NUYWIpO1xuICAgICAgICAgICAgdGhpcy4kbWF4U3RhY2tTaXplID0gKGl0ZW1TdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2soaXRlbUNsYXNzLCBubWlfT3Zlbkl0ZW0pO1xuICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1SaWdodENsaWNrID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcikge1xuICAgICAgICAgICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpXG4gICAgICAgICAgICAgICAgICAgICgkJHBsYXllcikuJHNldEl0ZW1JblVzZSgkJGl0ZW1zdGFjaywgMzIpO1xuICAgICAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXI7XG4gICAgICAgICAgICAgICAgc2VsZi5vblJpZ2h0Q2xpY2soJCRpdGVtc3RhY2spO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VydmVyIGl0ZW1zdGFjazpcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJCRpdGVtc3RhY2spO1xuICAgICAgICAgICAgICAgIHJldHVybiAoJCRpdGVtc3RhY2spO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICA7XG4gICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgdmFyICQkUmVzdWx0RW51bSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiRW51bUFjdGlvblJlc3VsdFwiKS5zdGF0aWNWYXJpYWJsZXM7XG4gICAgICAgICAgICB2YXIgJCRBY3Rpb25SZXN1bHQgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkFjdGlvblJlc3VsdFwiKS5jb25zdHJ1Y3RvcnNbMF07XG4gICAgICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1SaWdodENsaWNrID0gZnVuY3Rpb24gKCQkd29ybGQsICQkcGxheWVyLCAkaGFuZEVudW0sICR1bnVzZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2sgPSAoJCRwbGF5ZXIpLiRnZXRIZWxkSXRlbSgkaGFuZEVudW0pO1xuICAgICAgICAgICAgICAgICgkJHBsYXllcikuJHNldEFjdGl2ZUhhbmQoJGhhbmRFbnVtKTtcbiAgICAgICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyO1xuICAgICAgICAgICAgICAgIHNlbGYub25SaWdodENsaWNrKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgkJEFjdGlvblJlc3VsdCgkJFJlc3VsdEVudW0uU1VDQ0VTUywgJCRpdGVtc3RhY2spKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25VcGRhdGUgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGhvdGJhcl9zbG90LCAkJGlzX2hlbGQpIHtcbiAgICAgICAgICAgICQkaXNfaGVsZCA9ICgkJGlzX2hlbGQpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuICgkJGl0ZW1zdGFjayk7XG4gICAgICAgIH07XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVVzZUZpbmlzaCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoJCRpdGVtc3RhY2spO1xuICAgICAgICB9O1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRnZXRNYXhJdGVtVXNlRHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gMzI7XG4gICAgICAgIH07XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldEl0ZW1BdHRyaWJ1dGVNb2RpZmllcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJCRhdHRyaWJ1dGVtYXAgPSAkJGl0ZW1HZXRBdHRyaWJ1dGVzLmFwcGx5KHRoaXMsIFtdKTtcbiAgICAgICAgICAgIHJldHVybiAkJGF0dHJpYnV0ZW1hcDtcbiAgICAgICAgfTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kZ2V0U3RyVnNCbG9jayA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCRibG9jaykge1xuICAgICAgICAgICAgcmV0dXJuIDEuMDtcbiAgICAgICAgfTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25DcmVhdGVkID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkJsb2NrRGVzdHJveWVkID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJGJsb2NrLCAkJGJsb2NrcG9zLCAkJGVudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBpbnRlcm5hbF9yZWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaXRlbUluc3RhbmNlID0gbmV3IG5taV9PdmVuSXRlbSgpLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKF90aGlzLml0ZW1JRCkpO1xuICAgICAgICAgICAgaXRlbUNsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJJdGVtLm1ldGhvZChNb2RBUEkua2V5Z2VuLml0ZW0oX3RoaXMuaXRlbUlEKSwgTW9kQVBJLnV0aWwuc3RyKF90aGlzLml0ZW1JRCksIGl0ZW1JbnN0YW5jZSk7XG4gICAgICAgICAgICBNb2RBUEkuaXRlbXNbXCJcIi5jb25jYXQoc2VsZi5pdGVtSUQpXSA9IGl0ZW1JbnN0YW5jZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW1JbnN0YW5jZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyZWQgT3Zlbk1ESyBpdGVtICggY2xpZW50IHNpZGUgKVwiKTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtSW5zdGFuY2U7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChNb2RBUEkuaXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbF9yZWcoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsX3JlZyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9JdGVtLnByb3RvdHlwZS5yZWdpc3Rlckl0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmLCBjdXN0b21faXRlbTtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgY3VzdG9tX2l0ZW0gPSBuZXcgT0l0ZW0odGhpcy5pdGVtTmFtZSwgdGhpcy5pdGVtSUQsIHRoaXMuaXRlbVN0YWNrLCB0aGlzLml0ZW1UZXh0dXJlLCB0aGlzLm9uUmlnaHRDbGljaykucmVnaXN0ZXJDbGllbnQoKTtcbiAgICAgICAgICAgICAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVySXRlbShcXFwiXCIuY29uY2F0KHRoaXMuaXRlbUlELCBcIlxcXCIsIFwiKS5jb25jYXQodGhpcy5pdGVtU3RhY2ssIFwiLCBcIikuY29uY2F0KHRoaXMub25SaWdodENsaWNrLCBcIik7XCIpKTtcbiAgICAgICAgICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSwgYnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rOnJlZ2lzdGVyaXRlbXNcIiwgZnVuY3Rpb24gKHJlbmRlckl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJJdGVtLnJlZ2lzdGVySXRlbShjdXN0b21faXRlbSwgTW9kQVBJLnV0aWwuc3RyKFwiXCIuY29uY2F0KHNlbGYuaXRlbUlEKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuTDEwTi5zZXQoXCJpdGVtLlwiLmNvbmNhdChzZWxmLml0ZW1JRCwgXCIubmFtZVwiKSwgXCJcIi5jb25jYXQoc2VsZi5pdGVtTmFtZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9pdGVtL1wiLmNvbmNhdChzZWxmLml0ZW1JRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyZW50XCI6IFwiaXRlbS9nZW5lcmF0ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHR1cmVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXllcjBcIjogXCJpdGVtcy9cIi5jb25jYXQodGhpcy5pdGVtSUQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goc2VsZi5pdGVtVGV4dHVyZSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvdGV4dHVyZXMvaXRlbXMvXCIgKyBzZWxmLml0ZW1JRCArIFwiLnBuZ1wiLCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSwgYnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rOnJlZ2lzdGVyaXRlbXNcIiwgZnVuY3Rpb24gKHJlbmRlckl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJJdGVtLnJlZ2lzdGVySXRlbShjdXN0b21faXRlbSwgTW9kQVBJLnV0aWwuc3RyKHNlbGYuaXRlbUlEKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5MMTBOLnNldChcIml0ZW0uXCIuY29uY2F0KHNlbGYuaXRlbUlELCBcIi5uYW1lXCIpLCBzZWxmLml0ZW1OYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9tb2RlbHMvaXRlbS9cIi5jb25jYXQoc2VsZi5pdGVtSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmVudFwiOiBcImJ1aWx0aW4vZ2VuZXJhdGVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0dXJlc1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGF5ZXIwXCI6IFwiaXRlbXMvXCIuY29uY2F0KHNlbGYuaXRlbUlEKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXNwbGF5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aGlyZHBlcnNvbl9yaWdodGhhbmRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOiBbMCwgLTkwLCA1NV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0aW9uXCI6IFswLCA0LCAwLjVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzY2FsZVwiOiBbMC44NSwgMC44NSwgMC44NV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aGlyZHBlcnNvbl9sZWZ0aGFuZFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6IFswLCA5MCwgLTU1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRpb25cIjogWzAsIDQsIDAuNV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNjYWxlXCI6IFswLjg1LCAwLjg1LCAwLjg1XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZpcnN0cGVyc29uX3JpZ2h0aGFuZFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6IFswLCAtOTAsIDI1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRpb25cIjogWzEuMTMsIDMuMiwgMS4xM10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNjYWxlXCI6IFswLjY4LCAwLjY4LCAwLjY4XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZpcnN0cGVyc29uX2xlZnRoYW5kXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjogWzAsIDkwLCAtMjVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGlvblwiOiBbMS4xMywgMy4yLCAxLjEzXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2NhbGVcIjogWzAuNjgsIDAuNjgsIDAuNjhdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChzZWxmLml0ZW1UZXh0dXJlKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9pdGVtcy9cIi5jb25jYXQoc2VsZi5pdGVtSUQsIFwiLnBuZ1wiKSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gT0l0ZW07XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgT0l0ZW07XG4iLCIvKlxuICAgIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cbiAgICBPdmVuLnRzXG4gICAgXG4gICAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG52YXIgT3ZlbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPdmVuKCkge1xuICAgIH1cbiAgICBPdmVuLnJlZ2lzdGVyTW9kID0gZnVuY3Rpb24gKG1vZENsYXNzKSB7XG4gICAgICAgIE1vZEFQSS5tZXRhLnRpdGxlKG1vZENsYXNzLnRpdGxlKTtcbiAgICAgICAgTW9kQVBJLm1ldGEudmVyc2lvbihtb2RDbGFzcy52ZXJzaW9uKTtcbiAgICAgICAgTW9kQVBJLm1ldGEuZGVzY3JpcHRpb24obW9kQ2xhc3MuZGVzY3JpcHRpb24pO1xuICAgICAgICBNb2RBUEkubWV0YS5jcmVkaXRzKG1vZENsYXNzLmNyZWRpdHMpO1xuICAgICAgICBNb2RBUEkubWV0YS5pY29uKG1vZENsYXNzLmljb24pO1xuICAgICAgICBNb2RBUEkubWV0YS5jb25maWcobW9kQ2xhc3MuY29uZmlnKCkpO1xuICAgICAgICBtb2RDbGFzcy5pbml0KCk7XG4gICAgICAgIGdsb2JhbFRoaXMuRGVidWdfbW9kZSA9IG1vZENsYXNzLkRlYnVnX21vZGU7XG4gICAgICAgIC8qaWYgKG1vZENsYXNzLm9ubHlfMV8xMl8yID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gSWxsIGRvIHNvbWUgbW9yZSBzdHVmZiBsYXRlclxuICAgICAgICB9Ki9cbiAgICAgICAgdGhpcy5tb2RzLnB1c2gobW9kQ2xhc3MpO1xuICAgIH07XG4gICAgT3Zlbi5tb2RzID0gW107XG4gICAgcmV0dXJuIE92ZW47XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgT3ZlbjtcbiIsIi8qXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICAgIGNvbW1hbmRzLnRzXG4gICAgXG4gICAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5leHBvcnQgZnVuY3Rpb24gc2ltcGxlY29tbWFuZChwcmVmaXgsIG5hbWUsIG9uRXhlY3V0ZSkge1xuICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwic2VuZGNoYXRtZXNzYWdlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLm1lc3NhZ2UudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKFwiXCIuY29uY2F0KHByZWZpeCkuY29uY2F0KG5hbWUpKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XG4gICAgICAgICAgICBvbkV4ZWN1dGUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4gIE92ZW4gTW9kIERldmVsb3BtZW50IEtpdCAoT3Zlbk1ESykgUnVudGltZVxuICBEZXYga2l0IHVzZWQgZm9yIHNpbXBsaWZ5aW5nIEVhZ2xlckZvcmdlIG1vZCBkZXZlbG9wbWVudC5cbiAgICBcbiAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuaW1wb3J0IGljb24gZnJvbSBcIkFTU0VUUy9kZWZhdWx0SWNvbi5wbmdcIjtcbk1vZEFQSS5tZXRhLnRpdGxlKFwiT3Zlbk1ESyBSdW50aW1lXCIpO1xuTW9kQVBJLm1ldGEudmVyc2lvbihcIkFscGhhIHYwLjJcIik7XG5Nb2RBUEkubWV0YS5kZXNjcmlwdGlvbihcIlVub2ZmaWNpYWwgZGV2IGtpdCB1c2VkIGZvciBzaW1wbGlmeWluZyBFYWdsZXJGb3JnZSBtb2QgZGV2ZWxvcG1lbnQuXCIpO1xuTW9kQVBJLm1ldGEuY3JlZGl0cyhcIkJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXCIpO1xuTW9kQVBJLm1ldGEuaWNvbihpY29uKTtcbmltcG9ydCB7IHJlZ2lzdGVyU2VydmVySXRlbSwgcmVnaXN0ZXJTZXJ2ZXJCbG9jaywgcmVnaXN0ZXJFbnRpdHlTZXJ2ZXIsIH0gZnJvbSBcImNsYXNzZXMvY29yZS9IZWxwZXJfZnVuY1wiO1xuaW1wb3J0IE9JdGVtIGZyb20gXCJjbGFzc2VzL2NvcmUvT0l0ZW1cIjtcbmltcG9ydCBPTW9kIGZyb20gXCJjbGFzc2VzL2NvcmUvTW9kXCI7XG5pbXBvcnQgT3ZlbiBmcm9tIFwiY2xhc3Nlcy9jb3JlL092ZW5cIjtcbmltcG9ydCBPQmxvY2sgZnJvbSBcImNsYXNzZXMvY29yZS9PQmxvY2tcIjtcbmltcG9ydCB7IHNpbXBsZWNvbW1hbmQgfSBmcm9tIFwiY2xhc3Nlcy9jb3JlL2NvbW1hbmRzXCI7XG5pbXBvcnQgT0VudGl0eSBmcm9tIFwiLi9jbGFzc2VzL2NvcmUvT0VudGl0eVwiO1xudmFyIGRldm1vZGUgPSB0cnVlO1xuTW9kQVBJLmV2ZW50cy5uZXdFdmVudChcImxpYjpPdmVuTURLOmxvYWRcIik7XG5Nb2RBUEkuZXZlbnRzLm5ld0V2ZW50KFwibGliOk92ZW5NREs6bG9hZGVkXCIpO1xuTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6T3Zlbk1ESzpsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhcIk92ZW5NREsgUnVudGltZSBpcyBsb2FkaW5nXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiTG9hZGluZyBPdmVuTURLIGdsb2JhbHNcIik7XG4gICAgZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckl0ZW0gPSByZWdpc3RlclNlcnZlckl0ZW07XG4gICAgZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckJsb2NrID0gcmVnaXN0ZXJTZXJ2ZXJCbG9jaztcbiAgICBnbG9iYWxUaGlzLnJlZ2lzdGVyRW50aXR5U2VydmVyID0gcmVnaXN0ZXJFbnRpdHlTZXJ2ZXI7XG4gICAgZ2xvYmFsVGhpcy5PSXRlbSA9IE9JdGVtO1xuICAgIGdsb2JhbFRoaXMuT01vZCA9IE9Nb2Q7XG4gICAgZ2xvYmFsVGhpcy5PdmVuTURLID0gT3ZlbjtcbiAgICBnbG9iYWxUaGlzLk9CbG9jayA9IE9CbG9jaztcbiAgICBnbG9iYWxUaGlzLnNpbXBsZWNvbW1hbmQgPSBzaW1wbGVjb21tYW5kO1xuICAgIGdsb2JhbFRoaXMuT0VudGl0eSA9IE9FbnRpdHk7XG4gICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIGlmICghZGV2bW9kZSkge1xuICAgICAgICAgICAgYWxlcnQoXCJPdmVuTURLIGRvZXMgbm90IGZ1bGx5IHN1cHBvcnQgMS4xMiBhdCB0aGlzIHRpbWUsIHBsZWFzZSB1c2UgMS44LjggZm9yIGZ1bGwgc3VwcG9ydFwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiMS4xMiBkZXRlY3RlZFwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJPdmVuTURLIGRvZXMgbm90IGZ1bGx5IHN1cHBvcnQgMS4xMiBhdCB0aGlzIHRpbWUsIHBsZWFzZSB1c2UgMS44LjggZm9yIGZ1bGwgc3VwcG9ydFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIk92ZW5NREsgZ2xvYmFscyBoYXZlIGJlZW4gc2V0IGFuZCBsb2FkZWRcIik7XG4gICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckl0ZW0gPSBcIi5jb25jYXQocmVnaXN0ZXJTZXJ2ZXJJdGVtLCBcIjtcIikpO1xuICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXIgSXRlbSBzZXJ2ZXJzaWRlIGZ1bmN0aW9uIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVyQmxvY2sgPSBcIi5jb25jYXQocmVnaXN0ZXJTZXJ2ZXJCbG9jaywgXCI7XCIpKTtcbiAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyIEVudGl0eSBzZXJ2ZXJzaWRlIGZ1bmN0aW9uIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyRW50aXR5U2VydmVyID0gXCIuY29uY2F0KHJlZ2lzdGVyRW50aXR5U2VydmVyLCBcIjtcIikpO1xuICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXIgQmxvY2sgc2VydmVyc2lkZSBmdW5jdGlvbiBsb2FkZWRcIik7XG4gICAgTW9kQVBJLmV2ZW50cy5jYWxsRXZlbnQoXCJsaWI6T3Zlbk1ESzpsb2FkZWRcIiwge30pO1xufSk7XG5Nb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjpPdmVuTURLOmxvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coXCJPdmVuTURLIFJ1bnRpbWUgaGFzIGZpbmlzaGVkIGxvYWRpbmdcIik7XG4gICAgY29uc29sZS5sb2coXCJcXG4gICAgXFx1MjUwQ1xcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUxMFxcbiAgICBcXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICBPdmVuTURLIGhhcyBsb2FkZWQgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgd2VsY29tZSB0byBvdmVuTURLICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgIEEgbW9kIG1ha2VyIGtpdCBmb3Igc3RhcnRlcnMgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MTRcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MThcXG4gICAgXCIpO1xufSk7XG5Nb2RBUEkuZXZlbnRzLmNhbGxFdmVudChcImxpYjpPdmVuTURLOmxvYWRcIiwge30pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9