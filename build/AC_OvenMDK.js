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
function registerEntityServer(entityID, entityName, entityModel) {
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
        return (itemstack !== null && itemstack.$getItem() === ModAPI.items.bread.getRef());
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
    }, ModAPI.util.str(entityName), ID, 0x5e3e2d, //egg base
    0x269166 //egg spots
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
                        return [4 /*yield*/, fetch("data:audio/ogg;base64,T2dnUwACAAAAAAAAAADVPQAAAAAAAMgAfuEBHgF2b3JiaXMAAAAAAYA+AAAAAAAAmIYBAAAAAACpAU9nZ1MAAAAAAAAAAAAA1T0AAAEAAAA5D14uD4b/////////////////4AN2b3JiaXM0AAAAWGlwaC5PcmcgbGliVm9yYmlzIEkgMjAyMDA3MDQgKFJlZHVjaW5nIEVudmlyb25tZW50KQIAAAAkAAAAVElUTEU9RHVjayBRdWFjayAtIFNvdW5kIEVmZmVjdCAoSEQpFgAAAEFSVElTVD1HYW1pbmcgU291bmQgRlgBBXZvcmJpcyRCQ1YBAEAAABhCECoFrWOOOsgVIYwZoqBCyinHHULQIaMkQ4g6xjXHGGNHuWSKQsmB0JBVAABAAACkHFdQckkt55xzoxhXzHHoIOecc+UgZ8xxCSXnnHOOOeeSco4x55xzoxhXDnIpLeecc4EUR4pxpxjnnHOkHEeKcagY55xzbTG3knLOOeecc+Ygh1JyrjXnnHOkGGcOcgsl55xzxiBnzHHrIOecc4w1t9RyzjnnnHPOOeecc84555xzjDHnnHPOOeecc24x5xZzrjnnnHPOOeccc84555xzIDRkFQCQAACgoSiK4igOEBqyCgDIAAAQQHEUR5EUS7Ecy9EkDQgNWQUAAAEACAAAoEiGpEiKpViOZmmeJnqiKJqiKquyacqyLMuy67ouEBqyCgBIAABQURTFcBQHCA1ZBQBkAAAIYCiKoziO5FiSpVmeB4SGrAIAgAAABAAAUAxHsRRN8STP8jzP8zzP8zzP8zzP8zzP8zzP8zwNCA1ZBQAgAAAAgihkGANCQ1YBAEAAAAghGhlDnVISXAoWQhwRQx1CzkOppYPgKYUlY9JTrEEIIXzvPffee++B0JBVAAAQAABhFDiIgcckCCGEYhQnRHGmIAghhOUkWMp56CQI3YMQQrice8u59957IDRkFQAACADAIIQQQgghhBBCCCmklFJIKaaYYoopxxxzzDHHIIMMMuigk046yaSSTjrKJKOOUmsptRRTTLHlFmOttdacc69BKWOMMcYYY4wxxhhjjDHGGCMIDVkFAIAAABAGGWSQQQghhBRSSCmmmHLMMcccA0JDVgEAgAAAAgAAABxFUiRHciRHkiTJkixJkzzLszzLszxN1ERNFVXVVW3X9m1f9m3f1WXf9mXb1WVdlmXdtW1d1l1d13Vd13Vd13Vd13Vd13Vd14HQkFUAgAQAgI7kOI7kOI7kSI6kSAoQGrIKAJABABAAgKM4iuNIjuRYjiVZkiZplmd5lqd5mqiJHhAasgoAAAQAEAAAAAAAgKIoiqM4jiRZlqZpnqd6oiiaqqqKpqmqqmqapmmapmmapmmapmmapmmapmmapmmapmmapmmapmmapmkCoSGrAAAJAAAdx3EcR3Ecx3EkR5IkIDRkFQAgAwAgAABDURxFcizHkjRLszzL00TP9FxRNnVTV20gNGQVAAAIACAAAAAAAADHczzHczzJkzzLczzHkzxJ0zRN0zRN0zRN0zRN0zRN0zRN0zRN0zRN0zRN0zRN0zRN0zRN0zRN0zRNA0JDVgIAZAAAHMWYe1JKqc5BSDEnZzvGHLSYmw4VQkxaLTZkiBgmrcfSKUKQo5pKyJAximoppVMIKamllNAxxqSm1loqpbQeCA1ZEQBEAQAACCHGEGOIMQYhgxAxxiB0ECLGHIQMQgYhlBRKySCEEkJJkWMMQgchgxBSCaFkEEIpIZUCAAACHAAAAiyEQkNWBABxAgAIQs4hxiBEjEEIJaQUQkgpYgxC5pyUzDkppZTWQimpRYxByJyTkjknJZTSUimltVBKa6WU1kIprbXWak2txRpKaS2U0loppbXUWo2ttRojxiBkzknJnJNSSmmtlNJa5hyVDkJKHYSUSkotlpRazJyT0kFHpYOQUkkltpJSjCWV2EpKMZaUYmwtxtpirDWU0lpJJbaSUowtthpbjDVHjEHJnJOSOSellNJaKam1zDkpHYSUOgcllZRiLCW1mDknpYOQUgchpZJSbCWl2EIprZWUYiwltdhizLW12GooqcWSUowlpRhbjLW22GrspLQWUoktlNJii7HW1lqtoZQYS0oxlpRijDHW3GKsOZTSYkklxpJSiy22XFuMNafWcm0t1txizDXGXHuttefUWq2ptVpbjDXHGnOstebeQWktlBJbKKnF1lqtLcZaQymxlZRiLCXF2GLMtbVYcyglxpJSjCWlGFuMtcYYc06t1dhizDW1VmuttecYa+yptVpbjDW32GqttfZec+y1AACAAQcAgAATykChISsBgCgAAMIYpRiD0CCklGMQGoSUYg5CpRRjzkmplGLMOSmZY85BSCVjzjkIJYUQSkklpRBCKSWlVAAAQIEDAECADZoSiwMUGrISAAgJACAQUoox5yCUklJKEUJMOQYhhFJSai1CSCnmHIRQSkqtVUwx5hyEEEpJqbVKMcacgxBCKSm1ljnnHIQQSkkppdYy5pyDEEIpKaXUWgchhBBKKSWl1lrrIIQQQimlpNRaayGEEEoppaSUWosxhBBCKaWkklJrMZZSSkkppZRSay3GUkopKaWUUkutxZhSSiml1lprLcYYU0oppdRaa7HFGGNqrbXWWosxxhhrTa211lqLMcYYY60FAAAcOAAABBhBJxlVFmGjCRcegEJDVgQAUQAAgDGIMcQYco5ByKBEzjEJmYTIOUelk5JJCaGV1jIpoZWSWuSck9JRyqiUlkJpmaTSWmihAACwAwcAsAMLodCQlQBAHgAAgZBSjDnnHFKKMcaccw4ppRhjzjmnGGPMOeecU4wx5pxzzjHGnHPOOecYY84555xzzjnnnHMOQuecc845B6FzzjnnIITQOeeccxBCKAAAqMABACDARpHNCUaCCg1ZCQCkAgAAyDDmnHNSUmqUYgxCCKWk1CjFGIQQSkkpcw5CCKWk1FrGGHQSSkmptQ5CKKWk1FqMHYQSSkmptRg7CKWklFJrMXYQSkmppdZiLKWk1FprMdZaSkmptdZirDWl1FqMMdZaa0qptRhjrLXWAgDAExwAgApsWB3hpGgssNCQlQBABgDAEADAAQAAAw4AAAEmlIFCQ1YCAKkAAIAxjDnnHIRSGqWcgxBCKak0SjkHIYRSUsqck1BKKSm1ljknpZRSUmqtg1BKSim1FmMHoZSUUmotxg5CKim1FmONHYRSUmotxhhDKSm1FmOMtYZSUmotxhhrLSm1FmONteZaUmotxhprzbUAAIQGBwCwAxtWRzgpGgssNGQlAJAHAEAgxBhjjDmHlGKMMeecQ0oxxphzzjHGGHPOOecYY4w555xzjDHnnHPOOcaYc8455xxzzjnnnHOOOeecc84555xzzjnnnHPOOeecc84JAAAqcAAACLBRZHOCkaBCQ1YCAOEAAIAxjDnHGHQSUmqYgg5CCCWk0EKjmHMQQiilpNQy6KSkVEpKrcWWOSelpFJSSq3FDkJKKaXUWowxdhBSSiml1mKMtYNQSkotxVhjrR2EUlJqrbUYaw2lpNRabDHWmnMoJaXWWoyx1ppLSq3FWGOtueZcUmottlhrrTXn1FqMMdaaa869p9ZijLHWmnPuvQAAkwcHAKgEG2dYSTorHA0uNGQlAJAbAIAgxJhzzkEIIYQQQgghUoox5yCEEEIIIZRSSqQUY85BCCGEEEIIIYSMMeeggxBCCKWUUkopGWPOQQghhBBKKKWEEjrnoIMQQgmllFJKKaV0zjkIIYQQSimllFJK6SCEEEIIpZRSSimllNJBCCGEUEoppZRSSiklhBBCCKWUUkoppZRSSgghhBBKKaWUUkoppZQQQgillFJKKaWUUkopIYQQSimllFJKKaWUUkIIpZRSSimllFJKKaWEEEoppZRSSimllFJKCaGUUkoppZRSSimllBJKKaWUUkoppZRSSikllFJKKaWUUkoppZRSSiillFJKKaWUUkoppZRQSimllFJKKaWUUkopoZRSSimllFJKKaWUUgoAADpwAAAIMKLSQuw048ojcEQhwwRUaMhKACAcAABABDoIIYQQQggRcxBCCCGEEEKImIMQQgghhBBCCCGEEEIIpZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppRQAdZnhABg9YeMMK0lnhaPBhYasBADSAgAAYxhjjCnIpLMWY60NYxBCB52EFGqoJaaGMQghdFBKSi22WHMGoaRSSkktxliDzT2DUEoppaQWY605F+NBSCWl1GKrteccjO4glJJSSjHWmnPuvWjQSUmptVpz7j0HXzwIpaTWWow9Bx+MMKKUlmKssdYcfBFGGFFKSy3GmnvNvRhjhEopxlp7zrnnXIwRPqUWY6659x58LsL44mLMOffigw8+CGGMkDHm2HPwvRdjjA/CyFxzLsIY44swwvggbK25B1+MEUYYY3zvNfigezHCCCOMMcII3XPRRfhijDFGGF+EAQC5EQ4AiAtGElJnGVYaceMJGCKQQkNWAQAxAAAEMcYgpJBSSinFGGOMMcYYY4wxxhhjjDHGnGPOOeecAADABAcAgAAr2JVZWrVR3NRJXvRB4BM6YjMy5FIqZnIi6JEaarES7NAKbvACsNCQlQAAGQAA5KSUlFotGkLKQWk1iMgg5STFJCJjkILSgqeQMYhJyh1jCiEFqXbQMYUUoxpSCplS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")];
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
        var spawnEgg = new _OItem__WEBPACK_IMPORTED_MODULE_0__["default"]("Spawn ".concat(this.entityName), "spawnegg_".concat(this.entityID), 64, texture, function () { }, function ($$itemstack, $$world, $$player, $$blockpos) {
            console.log($$blockpos);
            var spawn_x = $$blockpos.$x;
            var spawn_y = $$blockpos.$y + 1;
            var spawn_z = $$blockpos.$z;
            OvenMDK__executeCommandAs($$player, "/summon ExampleOEntity ".concat(spawn_x, " ").concat(spawn_y, " ").concat(spawn_z), true);
        });
        spawnEgg.registerItem();
        return spawnEgg;
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
ModAPI.addEventListener("lib:OvenMDK:loaded", function () {
    console.log("OvenMDK Runtime has finished loading");
    console.log("\n    \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n    \u2502                                   \u2502\n    \u2502   OvenMDK has loaded              \u2502\n    \u2502                                   \u2502\n    \u2502   welcome to ovenMDK              \u2502\n    \u2502                                   \u2502\n    \u2502   A mod dev kit for starters      \u2502\n    \u2502                                   \u2502\n    \u2502   Version: v0.2                   \u2502\n    \u2502                                   \u2502\n    \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n    ");
    (0,classes_core_commands__WEBPACK_IMPORTED_MODULE_6__.simplecommand)("/ovenmdk", "log_1", function () {
        ModAPI.displayToChat("\n      OvenMDK Runtime v0.1\n      Made by BendieGames and Block_2222\n      - Added basic core classes\n      ( Not much can be documented due to so little being added )");
    });
    (0,classes_core_commands__WEBPACK_IMPORTED_MODULE_6__.simplecommand)("/ovenmdk", "log_2", function () {
        ModAPI.displayToChat("\n      OvenMDK Runtime v0.2\n      Made by BendieGames and Block_2222\n      - Added support for 1.12\n      - Added support for OvenOre\n      - Added support for OEntity\n      - QOL improvements\n      - Added support for OvenMDK__ExecCmdAsGlobal\n      - Added support for OvenMDK__defineExecCmdAsGlobal\n      - Added support for simplecommands");
    });
});
ModAPI.addCredit("OvenMDK Coding lead", "BendieGames", " - Made OvenMDK\n - Coded most of OvenMDK");
ModAPI.addCredit("OvenMDK Founder", "Block_2222", " - Founded OvenMDK");
ModAPI.events.callEvent("lib:OvenMDK:load", {});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0EsaUJBQWlCLG1EQUFJO0FBQzRJO0FBQzFIO0FBQ0g7QUFDQztBQUNJO0FBQ2E7QUFDVDtBQUNGO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyx3RUFBa0I7QUFDdEQscUNBQXFDLHlFQUFtQjtBQUN4RCxzQ0FBc0MsMEVBQW9CO0FBQzFELHVCQUF1QiwwREFBSztBQUM1QixzQkFBc0Isd0RBQUk7QUFDMUIseUJBQXlCLHlEQUFJO0FBQzdCLHdCQUF3QiwyREFBTTtBQUM5QiwrQkFBK0IsZ0VBQWE7QUFDNUMseUJBQXlCLDREQUFPO0FBQ2hDLHVDQUF1QywyRUFBcUI7QUFDNUQseUJBQXlCLDZEQUFPO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0Ysd0VBQWtCLElBQUk7QUFDdEc7QUFDQSxtRkFBbUYsMkVBQXFCLElBQUk7QUFDNUc7QUFDQSxzQ0FBc0Msb0ZBQThCO0FBQ3BFLElBQUksd0ZBQThCO0FBQ2xDO0FBQ0EsaUZBQWlGLHlFQUFtQixJQUFJO0FBQ3hHO0FBQ0Esa0ZBQWtGLDBFQUFvQixJQUFJO0FBQzFHO0FBQ0Esb0RBQW9EO0FBQ3BELENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxJQUFJLG9FQUFhO0FBQ2pCO0FBQ0EsS0FBSztBQUNMLElBQUksb0VBQWE7QUFDakI7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQSw4Q0FBOEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL0hlbHBlcl9mdW5jLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvTW9kLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvT0Jsb2NrLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvT0VudGl0eS50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL09JdGVtLnRzIiwid2VicGFjazovL292ZW5tZGstcnVudGltZS8uL3NyYy9jbGFzc2VzL2NvcmUvT3Zlbi50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvY2xhc3Nlcy9jb3JlL092ZW5PcmUudHMiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lLy4vc3JjL2NsYXNzZXMvY29yZS9jb21tYW5kcy50cyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3Zlbm1kay1ydW50aW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vdmVubWRrLXJ1bnRpbWUvLi9zcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICAgIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cbiAgICBIZWxwZXJfZnVuYy50c1xuICAgIFxuICAgIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyU2VydmVySXRlbShpdGVtSUQsIGl0ZW1TdGFjaywgb25SaWdodENsaWNrLCBvbkl0ZW1Vc2UpIHtcbiAgICAvKmlmIChpc1NlcnZlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlZ2lzdGVyU2VydmVySXRlbSBjYW4gb25seSBiZSB1c2VkIG9uIHRoZSBzZXJ2ZXIgc2lkZS5cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfSovXG4gICAgdmFyIGNyZWF0aXZlTWlzY1RhYjtcbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgY3JlYXRpdmVNaXNjVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLk1JU0M7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjcmVhdGl2ZU1pc2NUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMudGFiTWlzYztcbiAgICB9XG4gICAgdmFyICQkaXRlbUdldEF0dHJpYnV0ZXMgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKS5tZXRob2RzLmdldEl0ZW1BdHRyaWJ1dGVNb2RpZmllcnMubWV0aG9kO1xuICAgIHZhciBpdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICB2YXIgaXRlbVN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoaXRlbUNsYXNzLCBmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuLmxlbmd0aCA9PT0gMTsgfSk7XG4gICAgLyppZiAoaXNTZXJ2ZXIgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInVzaW5nIHNlcnZlciBzaWRlIHJlZ2lzdGVyU2VydmVySXRlbVwiKTtcbiAgICAgIH0qL1xuICAgIGZ1bmN0aW9uIG5taV9PdmVuSXRlbSgpIHtcbiAgICAgICAgaXRlbVN1cGVyKHRoaXMpO1xuICAgICAgICB0aGlzLiRzZXRDcmVhdGl2ZVRhYihjcmVhdGl2ZU1pc2NUYWIpO1xuICAgICAgICB0aGlzLiRtYXhTdGFja1NpemUgPSBpdGVtU3RhY2s7XG4gICAgfVxuICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKGl0ZW1DbGFzcywgbm1pX092ZW5JdGVtKTtcbiAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVJpZ2h0Q2xpY2sgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7XG4gICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKVxuICAgICAgICAgICAgICAgICQkcGxheWVyLiRzZXRJdGVtSW5Vc2UoJCRpdGVtc3RhY2ssIDMyKTtcbiAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXI7XG4gICAgICAgICAgICBvblJpZ2h0Q2xpY2soJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VydmVyIGl0ZW1zdGFjazpcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICByZXR1cm4gJCRpdGVtc3RhY2s7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICB2YXIgJCRSZXN1bHRFbnVtID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnVtQWN0aW9uUmVzdWx0XCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgdmFyICQkQWN0aW9uUmVzdWx0ID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJBY3Rpb25SZXN1bHRcIikuY29uc3RydWN0b3JzWzBdO1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1SaWdodENsaWNrID0gZnVuY3Rpb24gKCQkd29ybGQsICQkcGxheWVyLCAkaGFuZEVudW0sICR1bnVzZWQpIHtcbiAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjayA9ICQkcGxheWVyLiRnZXRIZWxkSXRlbSgkaGFuZEVudW0pO1xuICAgICAgICAgICAgJCRwbGF5ZXIuJHNldEFjdGl2ZUhhbmQoJGhhbmRFbnVtKTtcbiAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXI7XG4gICAgICAgICAgICBvblJpZ2h0Q2xpY2soJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgIHJldHVybiAkJEFjdGlvblJlc3VsdCgkJFJlc3VsdEVudW0uU1VDQ0VTUywgJCRpdGVtc3RhY2spO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVVzZTAgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkcGxheWVyLCAkJHdvcmxkLCAkJGJsb2NrcG9zKSB7XG4gICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGJsb2NrcG9zO1xuICAgICAgICAgICAgb25JdGVtVXNlKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRibG9ja3Bvcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWVudCBpdGVtc3RhY2s6XCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJCRpdGVtc3RhY2spO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICB2YXIgJCRSZXN1bHRFbnVtID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnVtQWN0aW9uUmVzdWx0XCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtVXNlID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHBsYXllciwgJCR3b3JsZCwgJCRibG9ja3Bvcykge1xuICAgICAgICAgICAgdmFyICQkaXRlbXN0YWNrLCAkJHBsYXllciwgJCR3b3JsZCwgJCRibG9ja3BvcztcbiAgICAgICAgICAgIGlmIChvbkl0ZW1Vc2UpIHtcbiAgICAgICAgICAgICAgICBvbkl0ZW1Vc2UoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGJsb2NrcG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkJFJlc3VsdEVudW0uUEFTUztcbiAgICAgICAgfTtcbiAgICB9XG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25VcGRhdGUgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGhvdGJhcl9zbG90LCAkJGlzX2hlbGQpIHtcbiAgICAgICAgJCRpc19oZWxkID0gJCRpc19oZWxkID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICByZXR1cm4gJCRpdGVtc3RhY2s7XG4gICAgfTtcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1Vc2VGaW5pc2ggPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7XG4gICAgICAgIHJldHVybiAkJGl0ZW1zdGFjaztcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldE1heEl0ZW1Vc2VEdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIDMyO1xuICAgIH07XG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kZ2V0SXRlbUF0dHJpYnV0ZU1vZGlmaWVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8xLjEyIHdvcmtzIGkgdGhpbmtcbiAgICAgICAgdmFyICQkYXR0cmlidXRlbWFwID0gJCRpdGVtR2V0QXR0cmlidXRlcy5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgIHJldHVybiAkJGF0dHJpYnV0ZW1hcDtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldFN0clZzQmxvY2sgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkYmxvY2spIHtcbiAgICAgICAgcmV0dXJuIDEuMDtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uQ3JlYXRlZCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpIHtcbiAgICAgICAgLy8xLjEyIHdvcmtzXG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uQmxvY2tEZXN0cm95ZWQgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkYmxvY2ssICQkYmxvY2twb3MsICQkZW50aXR5KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgdmFyIGludGVybmFsX3JlZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGl0ZW1JbnN0YW5jZSA9IG5ldyBubWlfT3Zlbkl0ZW0oKS4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihcIlwiLmNvbmNhdChpdGVtSUQpKSk7XG4gICAgICAgIGl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbS5tZXRob2QoTW9kQVBJLmtleWdlbi5pdGVtKFwiXCIuY29uY2F0KGl0ZW1JRCkpLCBNb2RBUEkudXRpbC5zdHIoXCJcIi5jb25jYXQoaXRlbUlEKSksIGl0ZW1JbnN0YW5jZSk7XG4gICAgICAgIE1vZEFQSS5pdGVtc1tcIlwiLmNvbmNhdChpdGVtSUQpXSA9IGl0ZW1JbnN0YW5jZTtcbiAgICAgICAgY29uc29sZS5sb2coaXRlbUluc3RhbmNlKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmVkIE92ZW5NREsgaXRlbSAoIFNlcnZlciBTaWRlIClcIik7XG4gICAgICAgIHJldHVybiBpdGVtSW5zdGFuY2U7XG4gICAgfTtcbiAgICBpZiAoTW9kQVBJLml0ZW1zKSB7XG4gICAgICAgIHJldHVybiBpbnRlcm5hbF9yZWcoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsX3JlZyk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyU2VydmVyQmxvY2soYmxvY2tJRCwgb25CcmVhaykge1xuICAgIC8qaWYgKE1vZEFQSS5pc1NlcnZlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlZ2lzdGVyU2VydmVyQmxvY2sgY2FuIG9ubHkgYmUgdXNlZCBvbiB0aGUgc2VydmVyIHNpZGUuXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH0qL1xuICAgIHZhciBCbG9ja0NsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5ibG9jay5CbG9ja1wiKTtcbiAgICB2YXIgSXRlbUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIik7XG4gICAgdmFyIGNyZWF0aXZlVGFiO1xuICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICBjcmVhdGl2ZVRhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy5CVUlMRElOR19CTE9DS1M7XG4gICAgfVxuICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgY3JlYXRpdmVUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMudGFiQmxvY2s7XG4gICAgfVxuICAgIHZhciBibG9ja1N1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoQmxvY2tDbGFzcywgZnVuY3Rpb24gKGZuKSB7IHJldHVybiBmbi5sZW5ndGggPT09IDI7IH0pO1xuICAgIHZhciBicmVha0Jsb2NrTWV0aG9kID0gQmxvY2tDbGFzcy5tZXRob2RzLmJyZWFrQmxvY2subWV0aG9kO1xuICAgIGZ1bmN0aW9uIG5tYl9PYmxvY2soKSB7XG4gICAgICAgIGJsb2NrU3VwZXIodGhpcywgTW9kQVBJLm1hdGVyaWFscy5yb2NrLmdldFJlZigpKTtcbiAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgdGhpcy4kZGVmYXVsdEJsb2NrU3RhdGUgPSB0aGlzLiRibG9ja1N0YXRlLiRnZXRCYXNlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRzZXRDcmVhdGl2ZVRhYihjcmVhdGl2ZVRhYik7XG4gICAgfVxuICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKEJsb2NrQ2xhc3MsIG5tYl9PYmxvY2spO1xuICAgIG5tYl9PYmxvY2sucHJvdG90eXBlLiRicmVha0Jsb2NrID0gZnVuY3Rpb24gKCR3b3JsZCwgJGJsb2NrcG9zLCAkYmxvY2tzdGF0ZSkge1xuICAgICAgICAvL29uQnJlYWsoJHdvcmxkLCAkYmxvY2twb3MsICRibG9ja3N0YXRlKTtcbiAgICAgICAgcmV0dXJuIGJyZWFrQmxvY2tNZXRob2QodGhpcywgJHdvcmxkLCAkYmxvY2twb3MsICRibG9ja3N0YXRlKTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGZpeHVwQmxvY2tJZHMoKSB7XG4gICAgICAgIHZhciBibG9ja1JlZ2lzdHJ5ID0gTW9kQVBJLnV0aWxcbiAgICAgICAgICAgIC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIikuc3RhdGljVmFyaWFibGVzXG4gICAgICAgICAgICAuYmxvY2tSZWdpc3RyeSlcbiAgICAgICAgICAgIC5nZXRDb3JyZWN0aXZlKCk7XG4gICAgICAgIHZhciBCTE9DS19TVEFURV9JRFMgPSBNb2RBUEkudXRpbFxuICAgICAgICAgICAgLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5ibG9jay5CbG9ja1wiKS5zdGF0aWNWYXJpYWJsZXNcbiAgICAgICAgICAgIC5CTE9DS19TVEFURV9JRFMpXG4gICAgICAgICAgICAuZ2V0Q29ycmVjdGl2ZSgpO1xuICAgICAgICBibG9ja1JlZ2lzdHJ5LnJlZ2lzdHJ5T2JqZWN0cy5oYXNoVGFibGVLVG9WLmZvckVhY2goZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmxvY2tfMSA9IGVudHJ5LnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciB2YWxpZFN0YXRlcyA9IGJsb2NrXzEuZ2V0QmxvY2tTdGF0ZSgpLmdldFZhbGlkU3RhdGVzKCk7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXRlQXJyYXkgPSB2YWxpZFN0YXRlcy5hcnJheSB8fCBbdmFsaWRTdGF0ZXMuZWxlbWVudF07XG4gICAgICAgICAgICAgICAgc3RhdGVBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpYmxvY2tzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IChibG9ja1JlZ2lzdHJ5LmdldElERm9yT2JqZWN0KGJsb2NrXzEuZ2V0UmVmKCkpIDw8IDQpIHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrXzEuZ2V0TWV0YUZyb21TdGF0ZShpYmxvY2tzdGF0ZS5nZXRSZWYoKSk7XG4gICAgICAgICAgICAgICAgICAgIEJMT0NLX1NUQVRFX0lEUy5wdXQoaWJsb2Nrc3RhdGUuZ2V0UmVmKCksIGkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFyIGludGVybmFsUmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjdXN0b21fYmxvY2s7XG4gICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIGN1c3RvbV9ibG9jayA9IG5ldyBubWJfT2Jsb2NrKClcbiAgICAgICAgICAgICAgICAuJHNldEhhcmRuZXNzKDMuMClcbiAgICAgICAgICAgICAgICAuJHNldFN0ZXBTb3VuZChCbG9ja0NsYXNzLnN0YXRpY1ZhcmlhYmxlcy5zb3VuZFR5cGVQaXN0b24pXG4gICAgICAgICAgICAgICAgLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKGJsb2NrSUQpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIGN1c3RvbV9ibG9jayA9IG5ldyBubWJfT2Jsb2NrKClcbiAgICAgICAgICAgICAgICAuJHNldEhhcmRuZXNzKDMuMClcbiAgICAgICAgICAgICAgICAuJHNldFNvdW5kVHlwZShNb2RBUEkuYmxvY2tTb3VuZHMuUExBTlQuZ2V0UmVmKCkpXG4gICAgICAgICAgICAgICAgLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKGJsb2NrSUQpKTtcbiAgICAgICAgfVxuICAgICAgICBCbG9ja0NsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJCbG9jazAubWV0aG9kKE1vZEFQSS5rZXlnZW4uYmxvY2soYmxvY2tJRCksIE1vZEFQSS51dGlsLnN0cihibG9ja0lEKSwgY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgSXRlbUNsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJJdGVtQmxvY2swLm1ldGhvZChjdXN0b21fYmxvY2spO1xuICAgICAgICBmaXh1cEJsb2NrSWRzKCk7XG4gICAgICAgIE1vZEFQSS5ibG9ja3NbYmxvY2tJRF0gPSBjdXN0b21fYmxvY2s7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXJpbmcgYmxvY2sgb24gc2VydmVyIHNpZGVcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGN1c3RvbV9ibG9jayk7XG4gICAgICAgIHJldHVybiBjdXN0b21fYmxvY2s7XG4gICAgfTtcbiAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIGlmIChNb2RBUEkubWF0ZXJpYWxzKSB7XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJuYWxSZWdpc3RlcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJib290c3RyYXBcIiwgaW50ZXJuYWxSZWdpc3Rlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgIHZhciBibG9ja0NsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5ibG9jay5CbG9ja1wiKTtcbiAgICAgICAgdmFyIGl0ZW1DbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpO1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImJvb3RzdHJhcFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VzdG9tX2Jsb2NrID0gbmV3IG5tYl9PYmxvY2soKVxuICAgICAgICAgICAgICAgIC4kc2V0SGFyZG5lc3MoMy4wKVxuICAgICAgICAgICAgICAgIC4kc2V0U291bmRUeXBlKE1vZEFQSS5ibG9ja1NvdW5kcy5QTEFOVC5nZXRSZWYoKSlcbiAgICAgICAgICAgICAgICAuJHNldFVubG9jYWxpemVkTmFtZShNb2RBUEkudXRpbC5zdHIoYmxvY2tJRCkpO1xuICAgICAgICAgICAgYmxvY2tDbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVyQmxvY2swLm1ldGhvZChNb2RBUEkua2V5Z2VuLmJsb2NrKGJsb2NrSUQpLCBNb2RBUEkudXRpbC5zdHIoYmxvY2tJRCksIGN1c3RvbV9ibG9jayk7XG4gICAgICAgICAgICBpdGVtQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3Rlckl0ZW1CbG9jazAubWV0aG9kKGN1c3RvbV9ibG9jayk7XG4gICAgICAgICAgICBmaXh1cEJsb2NrSWRzKCk7XG4gICAgICAgICAgICBNb2RBUEkuYmxvY2tzW2Jsb2NrSURdID0gY3VzdG9tX2Jsb2NrO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmluZyBibG9jayBvbiBzZXJ2ZXIgc2lkZVwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1c3RvbV9ibG9jayk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckVudGl0eVNlcnZlcihlbnRpdHlJRCwgZW50aXR5TmFtZSwgZW50aXR5TW9kZWwpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc29sZS5sb2coXCJlbnRpdGllcyBhcmUgbm90IGZpbmlzaGVkIHlldCEgVXNlIGF0IHlvdXIgb3duIHJpc2shXCIpO1xuICAgIC8vcmV0dXJuO1xuICAgIE1vZEFQSS5ob29rcy5tZXRob2RzLmpsX1N0cmluZ19mb3JtYXQgPVxuICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5ubGV2X0hTdHJpbmdfZm9ybWF0OyAvL3RlbXBvcmFyeSB0aGluZyB0byBmaXggYW4gaXNzdWUgaW4gZWFnbGVyY3JhZnRcbiAgICAvLyBVdGlsc1xuICAgIGZ1bmN0aW9uIEFJVGFzayhuYW1lLCBsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIE1vZEFQSS5yZWZsZWN0XG4gICAgICAgICAgICAuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkuYWkuXCIgKyBuYW1lKVxuICAgICAgICAgICAgLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gbGVuZ3RoOyB9KTtcbiAgICB9XG4gICAgdmFyIFJlc291cmNlTG9jYXRpb24gPSBNb2RBUEkucmVmbGVjdFxuICAgICAgICAuZ2V0Q2xhc3NCeU5hbWUoXCJSZXNvdXJjZUxvY2F0aW9uXCIpXG4gICAgICAgIC5jb25zdHJ1Y3RvcnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDE7IH0pO1xuICAgIHZhciBFbnRpdHlQbGF5ZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkVudGl0eVBsYXllclwiKTtcbiAgICB2YXIgR2xTdGF0ZU1hbmFnZXIgPSBPYmplY3QuZnJvbUVudHJpZXMoT2JqZWN0LnZhbHVlcyhNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkdsU3RhdGVNYW5hZ2VyXCIpLnN0YXRpY01ldGhvZHMpLm1hcChmdW5jdGlvbiAoeCkgeyByZXR1cm4gW3gubWV0aG9kTmFtZVNob3J0LCB4Lm1ldGhvZF07IH0pKTtcbiAgICB2YXIgU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIlNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzXCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAvLyBTVEFSVCBDVVNUT00gRU5USVRZXG4gICAgdmFyIGVudGl0eUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkucGFzc2l2ZS5FbnRpdHlBbmltYWxcIik7XG4gICAgdmFyIGVudGl0eVN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoZW50aXR5Q2xhc3MsIGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gMjsgfSk7XG4gICAgdmFyIG5tZV9PRW50aXR5ID0gZnVuY3Rpb24gbm1lX09FbnRpdHkoJHdvcmxkSW4pIHtcbiAgICAgICAgZW50aXR5U3VwZXIodGhpcywgJHdvcmxkSW4pO1xuICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgdGhpcy53cmFwcGVkLnNldFNpemUoMC40LCAwLjcpO1xuICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygwLCBBSVRhc2soXCJFbnRpdHlBSVN3aW1taW5nXCIsIDEpKHRoaXMpKTtcbiAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMSwgQUlUYXNrKFwiRW50aXR5QUlQYW5pY1wiLCAyKSh0aGlzLCAxLjkpKTtcbiAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMiwgQUlUYXNrKFwiRW50aXR5QUlNYXRlXCIsIDIpKHRoaXMsIDEuMCkpO1xuICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzaygzLCBBSVRhc2soXCJFbnRpdHlBSVRlbXB0XCIsIDQpKHRoaXMsIDEuNSwgTW9kQVBJLml0ZW1zLmJyZWFkLmdldFJlZigpLCAwKSk7IC8vd29uJ3QgY2F1c2UgYSBwcm9ibGVtIGFzIHRoZSBicmVhZCBpcyBvYnRhaW5lZCB3aGVuIHRoZSBlbnRpdHkgaXMgY29uc3RydWN0ZWQuXG4gICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDQsIEFJVGFzayhcIkVudGl0eUFJRm9sbG93UGFyZW50XCIsIDIpKHRoaXMsIDEuMikpO1xuICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg1LCBBSVRhc2soXCJFbnRpdHlBSVdhbmRlclwiLCAyKSh0aGlzLCAxLjEpKTtcbiAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNiwgQUlUYXNrKFwiRW50aXR5QUlXYXRjaENsb3Nlc3RcIiwgMykodGhpcywgTW9kQVBJLnV0aWwuYXNDbGFzcyhFbnRpdHlQbGF5ZXIuY2xhc3MpLCA2KSk7XG4gICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDcsIEFJVGFzayhcIkVudGl0eUFJTG9va0lkbGVcIiwgMSkodGhpcykpO1xuICAgIH07XG4gICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2soZW50aXR5Q2xhc3MsIG5tZV9PRW50aXR5KTtcbiAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldEV5ZUhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLndyYXBwZWQuaGVpZ2h0O1xuICAgIH07XG4gICAgdmFyIG9yaWdpbmFsQXBwbHlFbnRpdHlBdHRyaWJ1dGVzID0gbm1lX09FbnRpdHkucHJvdG90eXBlLiRhcHBseUVudGl0eUF0dHJpYnV0ZXM7XG4gICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRhcHBseUVudGl0eUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICBvcmlnaW5hbEFwcGx5RW50aXR5QXR0cmlidXRlcy5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tYXhIZWFsdGgpXG4gICAgICAgICAgICAuc2V0QmFzZVZhbHVlKDUpO1xuICAgICAgICB0aGlzLndyYXBwZWRcbiAgICAgICAgICAgIC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZClcbiAgICAgICAgICAgIC5zZXRCYXNlVmFsdWUoMC4yNSk7XG4gICAgfTtcbiAgICB2YXIgb3JpZ2luYWxMaXZpbmdVcGRhdGUgPSBubWVfT0VudGl0eS5wcm90b3R5cGUuJG9uTGl2aW5nVXBkYXRlO1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kb25MaXZpbmdVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICBvcmlnaW5hbExpdmluZ1VwZGF0ZS5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgIGlmICh0aGlzLndyYXBwZWQuaXNJbldhdGVyKCkpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC5tb3Rpb25ZICo9IDAuNTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZFxuICAgICAgICAgICAgICAgIC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZClcbiAgICAgICAgICAgICAgICAuc2V0QmFzZVZhbHVlKDEuNCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWRcbiAgICAgICAgICAgICAgICAuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1vdmVtZW50U3BlZWQpXG4gICAgICAgICAgICAgICAgLnNldEJhc2VWYWx1ZSgwLjI1KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXRMaXZpbmdTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIGVudGl0eUlEICsgXCIucXVhY2tcIik7XG4gICAgfTtcbiAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldEh1cnRTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIGVudGl0eUlEICsgXCIucXVhY2tcIik7XG4gICAgfTtcbiAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldERlYXRoU291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBNb2RBUEkudXRpbC5zdHIoXCJtb2IuXCIgKyBlbnRpdHlJRCArIFwiLnF1YWNrXCIpO1xuICAgIH07XG4gICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRwbGF5U3RlcFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgdGhpcy53cmFwcGVkLnBsYXlTb3VuZChNb2RBUEkudXRpbC5zdHIoXCJtb2IuXCIgKyBlbnRpdHlJRCArIFwiLnN0ZXBcIiksIDAuMiwgMSk7XG4gICAgfTtcbiAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldERyb3BJdGVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gTW9kQVBJLml0ZW1zLmZlYXRoZXIuZ2V0UmVmKCk7XG4gICAgfTtcbiAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGNyZWF0ZUNoaWxkID0gZnVuY3Rpb24gKG90aGVyUGFyZW50KSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICByZXR1cm4gbmV3IG5tZV9PRW50aXR5KChfYiA9IChfYSA9IHRoaXMud3JhcHBlZC53b3JsZE9iaikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldFJlZigpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBudWxsKTtcbiAgICB9O1xuICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kaXNCcmVlZGluZ0l0ZW0gPSBmdW5jdGlvbiAoaXRlbXN0YWNrKSB7XG4gICAgICAgIHJldHVybiAoaXRlbXN0YWNrICE9PSBudWxsICYmIGl0ZW1zdGFjay4kZ2V0SXRlbSgpID09PSBNb2RBUEkuaXRlbXMuYnJlYWQuZ2V0UmVmKCkpO1xuICAgIH07XG4gICAgLy8gRU5EIENVU1RPTSBFTlRJVFlcbiAgICAvLyBTVEFSVCBDVVNUT00gTU9ERUxcbiAgICB2YXIgbW9kZWxDaGlja2VuQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNsaWVudC5tb2RlbC5cIi5jb25jYXQoZW50aXR5TW9kZWwpKTtcbiAgICB2YXIgbW9kZWxDaGlja2VuU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihtb2RlbENoaWNrZW5DbGFzcyk7IC8vd2hpbGUgc3VwZXIgaXNuJ3QgdXNlZCB3aGVuIGV4dGVuZGluZyB0aGlzIGNsYXNzLCBqYXZhIGltcGxpZXMgdGhlIGNhbGwuXG4gICAgdmFyIG5tY21fT0VudGl0eU1vZGVsID0gZnVuY3Rpb24gbm1jbV9PRW50aXR5TW9kZWwoKSB7XG4gICAgICAgIG1vZGVsQ2hpY2tlblN1cGVyKHRoaXMpO1xuICAgIH07XG4gICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2sobW9kZWxDaGlja2VuQ2xhc3MsIG5tY21fT0VudGl0eU1vZGVsKTtcbiAgICAvLyBFTkQgQ1VTVE9NIE1oT0RFTFxuICAgIC8vIFNUQVJUIENVU1RPTSBSRU5ERVJFUlxuICAgIHZhciByZW5kZXJDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY2xpZW50LnJlbmRlcmVyLmVudGl0eS5SZW5kZXJMaXZpbmdcIik7XG4gICAgdmFyIHJlbmRlclN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIocmVuZGVyQ2xhc3MsIGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gNDsgfSk7XG4gICAgdmFyIGR1Y2tUZXh0dXJlcyA9IFJlc291cmNlTG9jYXRpb24oTW9kQVBJLnV0aWwuc3RyKFwidGV4dHVyZXMvZW50aXR5L1wiLmNvbmNhdChlbnRpdHlJRCwgXCIucG5nXCIpKSk7XG4gICAgdmFyIG5tY3JlX1JlbmRlck9FbnRpdHkgPSBmdW5jdGlvbiBubWNyZV9SZW5kZXJPRW50aXR5KHJlbmRlck1hbmFnZXIsIG1vZGVsQmFzZUluLCBzaGFkb3dTaXplSW4pIHtcbiAgICAgICAgcmVuZGVyU3VwZXIodGhpcywgcmVuZGVyTWFuYWdlciwgbW9kZWxCYXNlSW4sIHNoYWRvd1NpemVJbik7XG4gICAgfTtcbiAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhyZW5kZXJDbGFzcywgbm1jcmVfUmVuZGVyT0VudGl0eSk7XG4gICAgbm1jcmVfUmVuZGVyT0VudGl0eS5wcm90b3R5cGUuJGdldEVudGl0eVRleHR1cmUgPSBmdW5jdGlvbiAoZW50aXR5KSB7XG4gICAgICAgIHJldHVybiBkdWNrVGV4dHVyZXM7XG4gICAgfTtcbiAgICBubWNyZV9SZW5kZXJPRW50aXR5LnByb3RvdHlwZS4kaGFuZGxlUm90YXRpb25GbG9hdCA9IGZ1bmN0aW9uIChlbnRpdHksIHBhcnRpYWxUaWNrcykge1xuICAgICAgICBlbnRpdHkgPSBNb2RBUEkudXRpbC53cmFwKGVudGl0eSk7XG4gICAgICAgIGlmICghZW50aXR5Lm9uR3JvdW5kICYmICFlbnRpdHkuaXNJbldhdGVyKCkpIHtcbiAgICAgICAgICAgIHJldHVybiAyOyAvL2ZhbGxpbmdcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgSUQgPSBNb2RBUEkua2V5Z2VuLmVudGl0eShlbnRpdHlJRCk7XG4gICAgTW9kQVBJLnJlZmxlY3RcbiAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eUxpc3RcIilcbiAgICAgICAgLnN0YXRpY01ldGhvZHMuYWRkTWFwcGluZzAubWV0aG9kKE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCB7XG4gICAgICAgICRjcmVhdGVFbnRpdHk6IGZ1bmN0aW9uICgkd29ybGRJbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBubWVfT0VudGl0eSgkd29ybGRJbik7XG4gICAgICAgIH0sXG4gICAgfSwgTW9kQVBJLnV0aWwuc3RyKGVudGl0eU5hbWUpLCBJRCwgMHg1ZTNlMmQsIC8vZWdnIGJhc2VcbiAgICAweDI2OTE2NiAvL2VnZyBzcG90c1xuICAgICk7XG4gICAgdmFyIFNwYXduUGxhY2VtZW50VHlwZSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eUxpdmluZyRTcGF3blBsYWNlbWVudFR5cGVcIikuc3RhdGljVmFyaWFibGVzO1xuICAgIHZhciBFTlRJVFlfUExBQ0VNRU5UUyA9IE1vZEFQSS51dGlsLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5lbnRpdHkuRW50aXR5U3Bhd25QbGFjZW1lbnRSZWdpc3RyeVwiKS5zdGF0aWNWYXJpYWJsZXMuRU5USVRZX1BMQUNFTUVOVFMpO1xuICAgIEVOVElUWV9QTEFDRU1FTlRTLnB1dChNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgU3Bhd25QbGFjZW1lbnRUeXBlLk9OX0dST1VORCk7XG4gICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJib290c3RyYXBcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgU3Bhd25MaXN0RW50cnkgPSBNb2RBUEkucmVmbGVjdFxuICAgICAgICAgICAgLmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlJFNwYXduTGlzdEVudHJ5XCIpXG4gICAgICAgICAgICAuY29uc3RydWN0b3JzLmZpbmQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSA0OyB9KTtcbiAgICAgICAgdmFyIEJpb21lR2VuU3dhbXAgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlXCIpXG4gICAgICAgICAgICAuc3RhdGljVmFyaWFibGVzLnN3YW1wbGFuZCk7XG4gICAgICAgIHZhciBCaW9tZUdlblJpdmVyID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5yaXZlcik7XG4gICAgICAgIHZhciBCaW9tZUdlbkJlYWNoID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5iZWFjaCk7XG4gICAgICAgIHZhciBkdWNrU3Bhd25Td2FtcCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAyMiwgMywgNSk7XG4gICAgICAgIHZhciBkdWNrU3Bhd25SaXZlckJlZCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAxMCwgNSwgOSk7XG4gICAgICAgIHZhciBkdWNrU3Bhd25CZWFjaCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAyNCwgMiwgMyk7XG4gICAgICAgIEJpb21lR2VuU3dhbXAuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25Td2FtcCk7XG4gICAgICAgIEJpb21lR2VuUml2ZXIuc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25SaXZlckJlZCk7XG4gICAgICAgIEJpb21lR2VuQmVhY2guc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25CZWFjaCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIF9hID0ge30sXG4gICAgICAgIF9hW1wiRW50aXR5XCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXSA9IG5tZV9PRW50aXR5LFxuICAgICAgICBfYVtcIk1vZGVsXCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXSA9IG5tY21fT0VudGl0eU1vZGVsLFxuICAgICAgICBfYVtcIlJlbmRlclwiLmNvbmNhdCh0aGlzLmVudGl0eUlEKV0gPSBubWNyZV9SZW5kZXJPRW50aXR5LFxuICAgICAgICBfYVtcIlwiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIlRleHR1cmVzXCIpXSA9IGR1Y2tUZXh0dXJlcyxcbiAgICAgICAgX2E7XG59XG4vKmV4cG9ydCBmdW5jdGlvbiBpc1NlcnZlclNpZGUoKSB7XG4gICAgZnVuY3Rpb24gc3ViZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXNTZXJ2ZXJTaWRlIGZ1bmN0aW9uIGNhbGxlZFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coYGlzU2VydmVyU2lkZTogJHtNb2RBUEkuaXNTZXJ2ZXJ9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKE1vZEFQSS5pc1NlcnZlcik7XG4gICAgfVxuICAgIHN1YmZ1bmN0aW9uKCk7XG4gICAgY29uc29sZS5sb2coYGlzU2VydmVyU2lkZTogJHtNb2RBUEkuaXNTZXJ2ZXJ9YCk7XG59Ki9cbmV4cG9ydCBmdW5jdGlvbiBPdmVuTURLX19kZWZpbmVFeGVjQ21kQXNHbG9iYWwoKSB7XG4gICAgdmFyIF9hO1xuICAgIC8vIEdldCBzZXJ2ZXIgbWV0aG9kIGZvciBkaWZmZXJlbnQgTWluZWNyYWZ0IHZlcnNpb25zXG4gICAgdmFyIGdldFNlcnZlciA9IChfYSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuc2VydmVyLk1pbmVjcmFmdFNlcnZlclwiKS5zdGF0aWNNZXRob2RzLmdldFNlcnZlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1ldGhvZDtcbiAgICAvLyBEZWZpbmUgZ2xvYmFsIGZ1bmN0aW9uXG4gICAgZ2xvYmFsVGhpcy5PdmVuTURLX19leGVjdXRlQ29tbWFuZEFzID1cbiAgICAgICAgZnVuY3Rpb24gT3Zlbk1ES19fZXhlY3V0ZUNvbW1hbmRBcygkY29tbWFuZHNlbmRlciwgY29tbWFuZCwgZmVlZGJhY2spIHtcbiAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSBnZXRTZXJ2ZXJcbiAgICAgICAgICAgICAgICA/IGdldFNlcnZlcigpIC8vIDEuOFxuICAgICAgICAgICAgICAgIDogTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5zZXJ2ZXIuTWluZWNyYWZ0U2VydmVyXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMuc2VydmVyOyAvLyAxLjEyXG4gICAgICAgICAgICBpZiAoIXNlcnZlcilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZXJ2ZXIpO1xuICAgICAgICAgICAgdmFyIGNvbW1hbmRNYW5hZ2VyID0gc2VydmVyLiRjb21tYW5kTWFuYWdlcjtcbiAgICAgICAgICAgIC8vIFRlbXBvcmFyaWx5IG92ZXJyaWRlIHBlcm1pc3Npb25zXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxDYW5Db21tYW5kID0gJGNvbW1hbmRzZW5kZXIuJGNhbkNvbW1hbmRTZW5kZXJVc2VDb21tYW5kO1xuICAgICAgICAgICAgJGNvbW1hbmRzZW5kZXIuJGNhbkNvbW1hbmRTZW5kZXJVc2VDb21tYW5kID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gMTsgfTtcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbEZlZWRiYWNrID0gJGNvbW1hbmRzZW5kZXIuJHNlbmRDb21tYW5kRmVlZGJhY2s7XG4gICAgICAgICAgICAkY29tbWFuZHNlbmRlci4kc2VuZENvbW1hbmRGZWVkYmFjayA9IGZlZWRiYWNrID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gMTsgfSA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDA7IH07XG4gICAgICAgICAgICB2YXIgbm90aWZ5T3BzMCA9IE1vZEFQSS5ob29rcy5tZXRob2RzLm5tY19Db21tYW5kQmFzZV9ub3RpZnlPcGVyYXRvcnMwO1xuICAgICAgICAgICAgdmFyIG5vdGlmeU9wcyA9IE1vZEFQSS5ob29rcy5tZXRob2RzLm5tY19Db21tYW5kQmFzZV9ub3RpZnlPcGVyYXRvcnM7XG4gICAgICAgICAgICB2YXIgYWRkQ2hhdE1zZyA9ICRjb21tYW5kc2VuZGVyLiRhZGRDaGF0TWVzc2FnZTtcbiAgICAgICAgICAgIGlmICghZmVlZGJhY2spIHtcbiAgICAgICAgICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5ubWNfQ29tbWFuZEJhc2Vfbm90aWZ5T3BlcmF0b3JzMCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5ubWNfQ29tbWFuZEJhc2Vfbm90aWZ5T3BlcmF0b3JzID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICAgICAgICAgICRjb21tYW5kc2VuZGVyLiRhZGRDaGF0TWVzc2FnZSA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29tbWFuZE1hbmFnZXIuJGV4ZWN1dGVDb21tYW5kKCRjb21tYW5kc2VuZGVyLCBNb2RBUEkudXRpbC5zdHIoY29tbWFuZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWZlZWRiYWNrKSB7XG4gICAgICAgICAgICAgICAgTW9kQVBJLmhvb2tzLm1ldGhvZHMubm1jX0NvbW1hbmRCYXNlX25vdGlmeU9wZXJhdG9yczAgPSBub3RpZnlPcHMwO1xuICAgICAgICAgICAgICAgIE1vZEFQSS5ob29rcy5tZXRob2RzLm5tY19Db21tYW5kQmFzZV9ub3RpZnlPcGVyYXRvcnMgPSBub3RpZnlPcHM7XG4gICAgICAgICAgICAgICAgJGNvbW1hbmRzZW5kZXIuJGFkZENoYXRNZXNzYWdlID0gYWRkQ2hhdE1zZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJlc3RvcmUgb3JpZ2luYWwgcGVybWlzc2lvbnMgYW5kIGZlZWRiYWNrXG4gICAgICAgICAgICAkY29tbWFuZHNlbmRlci4kY2FuQ29tbWFuZFNlbmRlclVzZUNvbW1hbmQgPSBvcmlnaW5hbENhbkNvbW1hbmQ7XG4gICAgICAgICAgICAkY29tbWFuZHNlbmRlci4kc2VuZENvbW1hbmRGZWVkYmFjayA9IG9yaWdpbmFsRmVlZGJhY2s7XG4gICAgICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJPdmVuT3JlU2VydmVyKGJsb2NrX0lELCB2aWVuU2l6ZSwgdmllbkNvdW50LCBtaW5HZW5lcmF0aW9uSGVpZ2h0LCBtYXhHZW5lcmF0aW9uSGVpZ2h0KSB7XG4gICAgdmFyIFdvcmxkR2VuTWluZWFibGUgPSBNb2RBUEkucmVmbGVjdFxuICAgICAgICAuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5nZW4uZmVhdHVyZS5Xb3JsZEdlbk1pbmFibGVcIilcbiAgICAgICAgLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gMjsgfSk7XG4gICAgdmFyIEJpb21lRGVjb3JhdG9yX2RlY29yYXRlID0gTW9kQVBJLnV0aWwuZ2V0TWV0aG9kRnJvbVBhY2thZ2UoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lRGVjb3JhdG9yXCIsIFwiZGVjb3JhdGVcIik7XG4gICAgdmFyIG9sZERlY29yYXRlID0gTW9kQVBJLmhvb2tzLm1ldGhvZHNbQmlvbWVEZWNvcmF0b3JfZGVjb3JhdGVdO1xuICAgIE1vZEFQSS5ob29rcy5tZXRob2RzW0Jpb21lRGVjb3JhdG9yX2RlY29yYXRlXSA9IGZ1bmN0aW9uICgkdGhpcywgJHdvcmxkLCAkcmFuZG9tLCAkYmlvbWVHZW5CYXNlLCAkYmxvY2twb3MpIHtcbiAgICAgICAgaWYgKCEkdGhpcy4kY3VycmVudFdvcmxkKSB7XG4gICAgICAgICAgICAkdGhpc1tcIiRPdmVuTURLX19hZHZhbmNlZF9ibG9jazBfNDgzNDk1X0Jsb2NrR2VuXCJdID0gV29ybGRHZW5NaW5lYWJsZShNb2RBUEkuYmxvY2tzW1wiXCIuY29uY2F0KGJsb2NrX0lEKV0uZ2V0U3RhdGVGcm9tTWV0YSgwKS5nZXRSZWYoKSwgdmllblNpemUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvbGREZWNvcmF0ZS5hcHBseSh0aGlzLCBbXG4gICAgICAgICAgICAkdGhpcyxcbiAgICAgICAgICAgICR3b3JsZCxcbiAgICAgICAgICAgICRyYW5kb20sXG4gICAgICAgICAgICAkYmlvbWVHZW5CYXNlLFxuICAgICAgICAgICAgJGJsb2NrcG9zLFxuICAgICAgICBdKTtcbiAgICB9O1xuICAgIHZhciBCaW9tZURlY29yYXRvcl9nZW5lcmF0ZU9yZXMgPSBNb2RBUEkudXRpbC5nZXRNZXRob2RGcm9tUGFja2FnZShcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVEZWNvcmF0b3JcIiwgXCJnZW5lcmF0ZU9yZXNcIik7XG4gICAgdmFyIG9sZEdlbmVyYXRlT3JlcyA9IE1vZEFQSS5ob29rcy5tZXRob2RzW0Jpb21lRGVjb3JhdG9yX2dlbmVyYXRlT3Jlc107XG4gICAgTW9kQVBJLmhvb2tzLm1ldGhvZHNbQmlvbWVEZWNvcmF0b3JfZ2VuZXJhdGVPcmVzXSA9IGZ1bmN0aW9uICgkdGhpcykge1xuICAgICAgICAkdGhpcy4kZ2VuU3RhbmRhcmRPcmUxKHZpZW5Db3VudCwgJHRoaXNbXCIkT3Zlbk1ES19fYWR2YW5jZWRfYmxvY2swXzQ4MzQ5NV9CbG9ja0dlblwiXSB8fCBudWxsLCBtaW5HZW5lcmF0aW9uSGVpZ2h0LCBtYXhHZW5lcmF0aW9uSGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIG9sZEdlbmVyYXRlT3Jlcy5hcHBseSh0aGlzLCBbJHRoaXNdKTtcbiAgICB9O1xufVxuIiwiLypcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4gICAgTW9kLnRzXG4gICAgXG4gICAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5pbXBvcnQgZGVmYXVsdEljb24gZnJvbSBcIkFTU0VUUy9kZWZhdWx0SWNvbi5wbmdcIjtcbnZhciBPTW9kID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9Nb2QoKSB7XG4gICAgfVxuICAgIE9Nb2QuY29uZmlnID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIE9Nb2QuaW5pdCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBPTW9kLnBvc3RJbml0ID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIE9Nb2QudGl0bGUgPSBcIkRlZmF1bHQgTmFtZVwiO1xuICAgIE9Nb2QudmVyc2lvbiA9IFwiXCI7XG4gICAgT01vZC5kZXNjcmlwdGlvbiA9IFwiRGVmYXVsdCBPdmVuTURLIERlc2NyaXB0aW9uLiBTZXQgJ2Rlc2NyaXB0aW9uJyBpbiB5b3VyIE9Nb2QgY2xhc3MhXCI7XG4gICAgT01vZC5jcmVkaXRzID0gXCJOb25lIEdpdmVuXCI7XG4gICAgT01vZC5pY29uID0gZGVmYXVsdEljb247XG4gICAgT01vZC5hY2NlcHRlZE1pbmVjcmFmdFZlcnNpb25zID0gbnVsbDtcbiAgICBPTW9kLmFjY2VwdGVkRWFnbGVyVXBkYXRlcyA9IG51bGw7XG4gICAgT01vZC5hY2NlcHRlZEVGVmVyc2lvbnMgPSBudWxsO1xuICAgIE9Nb2QuYWNjZXB0ZWRFRkZsYXZvdXIgPSBcImluamVjdG9yXCI7XG4gICAgT01vZC5jbGllbnRTaWRlT25seSA9IGZhbHNlO1xuICAgIE9Nb2Quc2VydmVyU2lkZU9ubHkgPSBmYWxzZTtcbiAgICBPTW9kLm9ubHlfMV8xMl8yID0gZmFsc2U7XG4gICAgT01vZC5EZWJ1Z19tb2RlID0gZmFsc2U7XG4gICAgcmV0dXJuIE9Nb2Q7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgT01vZDtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcbiAgICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG4vKlxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4gIE9CbG9jay50c1xuXG4gIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE92ZW5NREsuXG5cbiAgICBPdmVuTURLIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXJcbiAgICB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWVcbiAgICBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pXG4gICAgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICBPdmVuTURLIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWVxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1NcbiAgICBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYWxvbmdcbiAgICB3aXRoIE92ZW4gTURLLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbnZhciBPQmxvY2sgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT0Jsb2NrKGJsb2NrTmFtZSwgYmxvY2tJRCwgdGV4dHVyZSwgb25CcmVhaykge1xuICAgICAgICB0aGlzLmJsb2NrTmFtZSA9IGJsb2NrTmFtZTtcbiAgICAgICAgdGhpcy5ibG9ja0lEID0gYmxvY2tJRDtcbiAgICAgICAgdGhpcy5ibG9ja1RleHR1cmUgPSB0ZXh0dXJlO1xuICAgICAgICB0aGlzLm9uQnJlYWsgPSBvbkJyZWFrO1xuICAgIH1cbiAgICBPQmxvY2sucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgQmxvY2tDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIik7XG4gICAgICAgIHZhciBJdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICAgICAgdmFyIGNyZWF0aXZlVGFiO1xuICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjcmVhdGl2ZVRhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy50YWJCbG9jaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIGNyZWF0aXZlVGFiID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIikuc3RhdGljVmFyaWFibGVzLkJVSUxESU5HX0JMT0NLUztcbiAgICAgICAgfVxuICAgICAgICB2YXIgYmxvY2tTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKEJsb2NrQ2xhc3MsIGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZm4ubGVuZ3RoID09PSAyOyB9KTtcbiAgICAgICAgdmFyIGJyZWFrQmxvY2tNZXRob2QgPSBCbG9ja0NsYXNzLm1ldGhvZHMuYnJlYWtCbG9jay5tZXRob2Q7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gbm1iX09ibG9jaygpIHtcbiAgICAgICAgICAgIGJsb2NrU3VwZXIodGhpcywgTW9kQVBJLm1hdGVyaWFscy5yb2NrLmdldFJlZigpKTtcbiAgICAgICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRkZWZhdWx0QmxvY2tTdGF0ZSA9IHRoaXMuJGJsb2NrU3RhdGUuJGdldEJhc2VTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kc2V0Q3JlYXRpdmVUYWIoY3JlYXRpdmVUYWIpO1xuICAgICAgICB9XG4gICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKEJsb2NrQ2xhc3MsIG5tYl9PYmxvY2spO1xuICAgICAgICBubWJfT2Jsb2NrLnByb3RvdHlwZS4kYnJlYWtCbG9jayA9IGZ1bmN0aW9uICgkd29ybGQsICRibG9ja3BvcywgJGJsb2Nrc3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBicmVha0Jsb2NrTWV0aG9kKHRoaXMsICR3b3JsZCwgJGJsb2NrcG9zLCAkYmxvY2tzdGF0ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciAkJG9uQmxvY2tEZXN0cm95ZWRCeVBsYXllck1ldGhvZCA9IEJsb2NrQ2xhc3MubWV0aG9kcy5vbkJsb2NrRGVzdHJveWVkQnlQbGF5ZXIubWV0aG9kO1xuICAgICAgICBubWJfT2Jsb2NrLnByb3RvdHlwZS4kb25CbG9ja0Rlc3Ryb3llZEJ5UGxheWVyID0gZnVuY3Rpb24gKCQkd29ybGQsICQkYmxvY2twb3MsICQkYmxvY2tzdGF0ZSkge1xuICAgICAgICAgICAgdmFyICQkd29ybGQsICQkYmxvY2twb3MsICQkYmxvY2tzdGF0ZTtcbiAgICAgICAgICAgIHNlbGYub25CcmVhay5jYWxsKCQkd29ybGQsICQkYmxvY2twb3MsICQkYmxvY2tzdGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gJCRvbkJsb2NrRGVzdHJveWVkQnlQbGF5ZXJNZXRob2QodGhpcywgJCR3b3JsZCwgJCRibG9ja3BvcywgJCRibG9ja3N0YXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGludGVybmFsUmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VzdG9tX2Jsb2NrO1xuICAgICAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgIGN1c3RvbV9ibG9jayA9IG5ldyBubWJfT2Jsb2NrKClcbiAgICAgICAgICAgICAgICAgICAgLiRzZXRIYXJkbmVzcygzLjApXG4gICAgICAgICAgICAgICAgICAgIC4kc2V0U3RlcFNvdW5kKEJsb2NrQ2xhc3Muc3RhdGljVmFyaWFibGVzLnNvdW5kVHlwZVBpc3RvbilcbiAgICAgICAgICAgICAgICAgICAgLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKF90aGlzLmJsb2NrSUQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgIGN1c3RvbV9ibG9jayA9IG5ldyBubWJfT2Jsb2NrKClcbiAgICAgICAgICAgICAgICAgICAgLiRzZXRIYXJkbmVzcygtMS4wKVxuICAgICAgICAgICAgICAgICAgICAuJHNldFNvdW5kVHlwZShNb2RBUEkuYmxvY2tTb3VuZHMuUExBTlQuZ2V0UmVmKCkpXG4gICAgICAgICAgICAgICAgICAgIC4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cihfdGhpcy5ibG9ja0lEKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBCbG9ja0NsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJCbG9jazAubWV0aG9kKE1vZEFQSS5rZXlnZW4uYmxvY2soX3RoaXMuYmxvY2tJRCksIE1vZEFQSS51dGlsLnN0cihfdGhpcy5ibG9ja0lEKSwgY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgIEl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbUJsb2NrMC5tZXRob2QoY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgIF90aGlzLmZpeHVwQmxvY2tJZHMoKTtcbiAgICAgICAgICAgIE1vZEFQSS5ibG9ja3NbX3RoaXMuYmxvY2tJRF0gPSBjdXN0b21fYmxvY2s7XG4gICAgICAgICAgICBfdGhpcy5ibG9ja0luc3RhbmNlID0gY3VzdG9tX2Jsb2NrO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmVkIGJsb2NrIG9uIGNsaWVudDogXCIgKyBfdGhpcy5ibG9ja0lEKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1c3RvbV9ibG9jayk7XG4gICAgICAgICAgICByZXR1cm4gY3VzdG9tX2Jsb2NrO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBpZiAoTW9kQVBJLm1hdGVyaWFscykge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbFJlZ2lzdGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImJvb3RzdHJhcFwiLCBpbnRlcm5hbFJlZ2lzdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIGlmIChNb2RBUEkuYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgobmV3IG5tYl9PYmxvY2soKSkuJHNldEhhcmRuZXNzKC0xLjApLiRzZXRTb3VuZFR5cGUoTW9kQVBJLmJsb2NrU291bmRzLlBMQU5ULmdldFJlZigpKS4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cih0aGlzLmJsb2NrSUQpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9CbG9jay5wcm90b3R5cGUuZml4dXBCbG9ja0lkcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJsb2NrUmVnaXN0cnkgPSBNb2RBUEkudXRpbFxuICAgICAgICAgICAgLndyYXAoTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5ibG9jay5CbG9ja1wiKS5zdGF0aWNWYXJpYWJsZXNcbiAgICAgICAgICAgIC5ibG9ja1JlZ2lzdHJ5KVxuICAgICAgICAgICAgLmdldENvcnJlY3RpdmUoKTtcbiAgICAgICAgdmFyIEJMT0NLX1NUQVRFX0lEUyA9IE1vZEFQSS51dGlsXG4gICAgICAgICAgICAud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpLnN0YXRpY1ZhcmlhYmxlc1xuICAgICAgICAgICAgLkJMT0NLX1NUQVRFX0lEUylcbiAgICAgICAgICAgIC5nZXRDb3JyZWN0aXZlKCk7XG4gICAgICAgIGJsb2NrUmVnaXN0cnkucmVnaXN0cnlPYmplY3RzLmhhc2hUYWJsZUtUb1YuZm9yRWFjaChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIHZhciBibG9ja18xID0gZW50cnkudmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIHZhbGlkU3RhdGVzID0gYmxvY2tfMS5nZXRCbG9ja1N0YXRlKCkuZ2V0VmFsaWRTdGF0ZXMoKTtcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGVBcnJheSA9IHZhbGlkU3RhdGVzLmFycmF5IHx8IFt2YWxpZFN0YXRlcy5lbGVtZW50XTtcbiAgICAgICAgICAgICAgICBzdGF0ZUFycmF5LmZvckVhY2goZnVuY3Rpb24gKGlibG9ja3N0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gKGJsb2NrUmVnaXN0cnkuZ2V0SURGb3JPYmplY3QoYmxvY2tfMS5nZXRSZWYoKSkgPDwgNCkgfFxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tfMS5nZXRNZXRhRnJvbVN0YXRlKGlibG9ja3N0YXRlLmdldFJlZigpKTtcbiAgICAgICAgICAgICAgICAgICAgQkxPQ0tfU1RBVEVfSURTLnB1dChpYmxvY2tzdGF0ZS5nZXRSZWYoKSwgaSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT0Jsb2NrLnByb3RvdHlwZS5yZWdpc3RlckJsb2NrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VzdG9tX2Jsb2NrLCBubWJfT0Jsb2NrLCBpdGVtQ2xhc3MsIGJsb2NrQ2xhc3MsIHNlbGY7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIGlmICghTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tX2Jsb2NrID0gbmV3IE9CbG9jayh0aGlzLmJsb2NrTmFtZSwgdGhpcy5ibG9ja0lELCB0aGlzLmJsb2NrVGV4dHVyZSwgdGhpcy5vbkJyZWFrKS5yZWdpc3RlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgbm1iX09CbG9jayA9IG5ldyBPQmxvY2sodGhpcy5ibG9ja05hbWUsIHRoaXMuYmxvY2tJRCwgdGhpcy5ibG9ja1RleHR1cmUsIHRoaXMub25CcmVhaykucmVnaXN0ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIik7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmJsb2NrLkJsb2NrXCIpO1xuICAgICAgICAgICAgICAgICAgICBjdXN0b21fYmxvY2sgPSBubWJfT0Jsb2NrO1xuICAgICAgICAgICAgICAgICAgICBibG9ja0NsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJCbG9jazAubWV0aG9kKE1vZEFQSS5rZXlnZW4uYmxvY2sodGhpcy5ibG9ja0lEKSwgTW9kQVBJLnV0aWwuc3RyKHRoaXMuYmxvY2tJRCksIGN1c3RvbV9ibG9jayk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbUJsb2NrMC5tZXRob2QoY3VzdG9tX2Jsb2NrKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3VzdG9tX2Jsb2NrIHx8IFwiQmxvY2sgcmVnaXN0cmF0aW9uIGZhaWxlZFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVyQmxvY2soXFxcIlwiLmNvbmNhdCh0aGlzLmJsb2NrSUQsIFwiXFxcIiwgXCIpLmNvbmNhdCh0aGlzLm9uQnJlYWssIFwiKTtcIikpO1xuICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBidWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3Npbms6cmVnaXN0ZXJpdGVtc1wiLCBmdW5jdGlvbiAocmVuZGVySXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckl0ZW0ucmVnaXN0ZXJCbG9jayhjdXN0b21fYmxvY2ssIE1vZEFQSS51dGlsLnN0cihzZWxmLmJsb2NrSUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLkwxME4uc2V0KFwidGlsZS5cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5uYW1lXCIpLCBzZWxmLmJsb2NrTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNldCBsb2NhbGl6YXRpb24gZm9yIGJsb2NrIFwiLmNvbmNhdChzZWxmLmJsb2NrSUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9tb2RlbHMvYmxvY2svXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogXCJibG9jay9jdWJlX2FsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbDogXCJibG9ja3MvXCIuY29uY2F0KHNlbGYuYmxvY2tJRCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9tb2RlbHMvaXRlbS9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBcImJsb2NrL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcmRwZXJzb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBbMTAsIC00NSwgMTcwXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBbMCwgMS41LCAtMi43NV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTogWzAuMzc1LCAwLjM3NSwgMC4zNzVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvYmxvY2tzdGF0ZXMvXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBzZWxmLmJsb2NrSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChzZWxmLmJsb2NrVGV4dHVyZSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc3BvbnNlLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvdGV4dHVyZXMvYmxvY2tzL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLnBuZ1wiKSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSwgYnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2luazpyZWdpc3Rlcml0ZW1zXCIsIGZ1bmN0aW9uIChyZW5kZXJJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb29sIHJlZ2lzdGVyIGJsb2NrXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1c3RvbV9ibG9jayB8fCBcIkJsb2NrIHJlZ2lzdHJhdGlvbiBmYWlsZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVySXRlbS5yZWdpc3RlckJsb2NrKGN1c3RvbV9ibG9jaywgTW9kQVBJLnV0aWwuc3RyKF90aGlzLmJsb2NrSUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLkwxME4uc2V0KFwidGlsZS5cIiArIHRoaXMuYmxvY2tJRCArIFwiLm5hbWVcIiwgdGhpcy5ibG9ja05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZXQgbG9jYWxpemF0aW9uIGZvciBibG9jayBcIi5jb25jYXQoc2VsZi5ibG9ja0lEKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXN0b21fYmxvY2sgfHwgXCJCbG9jayByZWdpc3RyYXRpb24gZmFpbGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9ibG9jay9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJlbnRcIjogXCJibG9jay9jdWJlX2FsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dHVyZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFsbFwiOiBcImJsb2Nrcy9cIi5jb25jYXQoc2VsZi5ibG9ja0lEKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9tb2RlbHMvaXRlbS9cIi5jb25jYXQoc2VsZi5ibG9ja0lELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJlbnRcIjogXCJibG9jay9cIi5jb25jYXQoc2VsZi5ibG9ja0lEKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L2Jsb2Nrc3RhdGVzL1wiLmNvbmNhdChzZWxmLmJsb2NrSUQsIFwiLmpzb25cIiksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhcmlhbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJub3JtYWxcIjogeyBcIm1vZGVsXCI6IFwiXCIuY29uY2F0KHRoaXMuYmxvY2tJRCkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHNlbGYuYmxvY2tUZXh0dXJlKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9ibG9ja3MvXCIuY29uY2F0KHNlbGYuYmxvY2tJRCwgXCIucG5nXCIpLCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckJsb2NrKFxcXCJcIi5jb25jYXQodGhpcy5ibG9ja0lELCBcIlxcXCIsIFwiKS5jb25jYXQodGhpcy5vbkJyZWFrLCBcIik7XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5ibG9ja3NbdGhpcy5ibG9ja0lEXSA9IGN1c3RvbV9ibG9jaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gT0Jsb2NrO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE9CbG9jaztcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcbiAgICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgT0l0ZW0gZnJvbSBcIi4vT0l0ZW1cIjtcbnZhciBPRW50aXR5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9FbnRpdHkoZW50aXR5TmFtZSwgZW50aXR5SUQsIGVudGl0eVRleHR1cmUsIGVudGl0eU1vZGVsLCBlbnRpdHlCcmVlZEl0ZW0sIGVudGl0eURyb3BJdGVtKSB7XG4gICAgICAgIHRoaXMuZW50aXR5TmFtZSA9IGVudGl0eU5hbWU7XG4gICAgICAgIHRoaXMuZW50aXR5SUQgPSBlbnRpdHlJRDtcbiAgICAgICAgdGhpcy5lbnRpdHlUZXh0dXJlID0gZW50aXR5VGV4dHVyZTtcbiAgICAgICAgdGhpcy5lbnRpdHlNb2RlbCA9IGVudGl0eU1vZGVsO1xuICAgICAgICB0aGlzLmVudGl0eUJyZWVkSXRlbSA9IGVudGl0eUJyZWVkSXRlbSB8fCBcIndoZWF0XCI7IC8vZGVmYXVsdCBicmVlZCBpdGVtXG4gICAgICAgIHRoaXMuZW50aXR5RHJvcEl0ZW0gPSBlbnRpdHlEcm9wSXRlbSB8fCBcImZlYXRoZXJcIjsgLy9kZWZhdWx0IGRyb3AgaXRlbVxuICAgIH1cbiAgICBPRW50aXR5LnByb3RvdHlwZS53YWl0Rm9yUmVuZGVyTWFuYWdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzLCByZWopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNb2RBUEkubWMucmVuZGVyTWFuYWdlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2ssIDEgLyAyMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT0VudGl0eS5wcm90b3R5cGUucmVnaXN0ZXJFbnRpdHlDbGllbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPRW50aXR5IGRvZXMgbm90IHN1cHBvcnQgMS4xMiwgcGxlYXNlIHVzZSAxLjguOCBmb3IgZnVsbCBzdXBwb3J0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUud2FybihcImVudGl0aWVzIGFyZSBub3QgZmluaXNoZWQgeWV0ISBVc2UgYXQgeW91ciBvd24gcmlzayFcIik7XG4gICAgICAgIC8vcmV0dXJuO1xuICAgICAgICBNb2RBUEkuaG9va3MubWV0aG9kcy5qbF9TdHJpbmdfZm9ybWF0ID0gTW9kQVBJLmhvb2tzLm1ldGhvZHMubmxldl9IU3RyaW5nX2Zvcm1hdDsgLy90ZW1wb3JhcnkgdGhpbmcgdG8gZml4IGFuIGlzc3VlIGluIGVhZ2xlcmNyYWZ0XG4gICAgICAgIC8vIFV0aWxzXG4gICAgICAgIGZ1bmN0aW9uIEFJVGFzayhuYW1lLCBsZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5haS5cIiArIG5hbWUpLmNvbnN0cnVjdG9ycy5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gbGVuZ3RoOyB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgUmVzb3VyY2VMb2NhdGlvbiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiUmVzb3VyY2VMb2NhdGlvblwiKS5jb25zdHJ1Y3RvcnMuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPT09IDE7IH0pO1xuICAgICAgICB2YXIgRW50aXR5UGxheWVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnRpdHlQbGF5ZXJcIik7XG4gICAgICAgIHZhciBHbFN0YXRlTWFuYWdlciA9IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QudmFsdWVzKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiR2xTdGF0ZU1hbmFnZXJcIikuc3RhdGljTWV0aG9kcykubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiBbeC5tZXRob2ROYW1lU2hvcnQsIHgubWV0aG9kXTsgfSkpO1xuICAgICAgICB2YXIgU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIlNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzXCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgLy8gU1RBUlQgQ1VTVE9NIEVOVElUWVxuICAgICAgICB2YXIgZW50aXR5Q2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5wYXNzaXZlLkVudGl0eUFuaW1hbFwiKTtcbiAgICAgICAgdmFyIGVudGl0eVN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoZW50aXR5Q2xhc3MsIGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lmxlbmd0aCA9PT0gMjsgfSk7XG4gICAgICAgIHZhciBubWVfT0VudGl0eSA9IGZ1bmN0aW9uIG5tZV9PRW50aXR5KCR3b3JsZEluKSB7XG4gICAgICAgICAgICBlbnRpdHlTdXBlcih0aGlzLCAkd29ybGRJbik7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQgfHwgKHRoaXMud3JhcHBlZCA9IE1vZEFQSS51dGlsLndyYXAodGhpcykuZ2V0Q29ycmVjdGl2ZSgpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC5zZXRTaXplKDAuNCwgMC43KTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDAsIEFJVGFzayhcIkVudGl0eUFJU3dpbW1pbmdcIiwgMSkodGhpcykpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soMSwgQUlUYXNrKFwiRW50aXR5QUlQYW5pY1wiLCAyKSh0aGlzLCAxLjkpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDIsIEFJVGFzayhcIkVudGl0eUFJTWF0ZVwiLCAyKSh0aGlzLCAxLjApKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDMsIEFJVGFzayhcIkVudGl0eUFJVGVtcHRcIiwgNCkodGhpcywgMS41LCBNb2RBUEkuaXRlbXMuYnJlYWQuZ2V0UmVmKCksIDApKTsgLy93b24ndCBjYXVzZSBhIHByb2JsZW0gYXMgdGhlIGJyZWFkIGlzIG9idGFpbmVkIHdoZW4gdGhlIGVudGl0eSBpcyBjb25zdHJ1Y3RlZC5cbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDQsIEFJVGFzayhcIkVudGl0eUFJRm9sbG93UGFyZW50XCIsIDIpKHRoaXMsIDEuMikpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLnRhc2tzLmFkZFRhc2soNSwgQUlUYXNrKFwiRW50aXR5QUlXYW5kZXJcIiwgMikodGhpcywgMS4xKSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQudGFza3MuYWRkVGFzayg2LCBBSVRhc2soXCJFbnRpdHlBSVdhdGNoQ2xvc2VzdFwiLCAzKSh0aGlzLCBNb2RBUEkudXRpbC5hc0NsYXNzKEVudGl0eVBsYXllci5jbGFzcyksIDYpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC50YXNrcy5hZGRUYXNrKDcsIEFJVGFzayhcIkVudGl0eUFJTG9va0lkbGVcIiwgMSkodGhpcykpO1xuICAgICAgICB9O1xuICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhlbnRpdHlDbGFzcywgbm1lX09FbnRpdHkpO1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldEV5ZUhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlZC5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvcmlnaW5hbEFwcGx5RW50aXR5QXR0cmlidXRlcyA9IG5tZV9PRW50aXR5LnByb3RvdHlwZS4kYXBwbHlFbnRpdHlBdHRyaWJ1dGVzO1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGFwcGx5RW50aXR5QXR0cmlidXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZCB8fCAodGhpcy53cmFwcGVkID0gTW9kQVBJLnV0aWwud3JhcCh0aGlzKS5nZXRDb3JyZWN0aXZlKCkpO1xuICAgICAgICAgICAgb3JpZ2luYWxBcHBseUVudGl0eUF0dHJpYnV0ZXMuYXBwbHkodGhpcywgW10pO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkLmdldEVudGl0eUF0dHJpYnV0ZShTaGFyZWRNb25zdGVyQXR0cmlidXRlcy5tYXhIZWFsdGgpLnNldEJhc2VWYWx1ZSg1KTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlZC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZCkuc2V0QmFzZVZhbHVlKDAuMjUpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgb3JpZ2luYWxMaXZpbmdVcGRhdGUgPSBubWVfT0VudGl0eS5wcm90b3R5cGUuJG9uTGl2aW5nVXBkYXRlO1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJG9uTGl2aW5nVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICBvcmlnaW5hbExpdmluZ1VwZGF0ZS5hcHBseSh0aGlzLCBbXSk7XG4gICAgICAgICAgICBpZiAodGhpcy53cmFwcGVkLmlzSW5XYXRlcigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkLm1vdGlvblkgKj0gMC41O1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlZC5nZXRFbnRpdHlBdHRyaWJ1dGUoU2hhcmVkTW9uc3RlckF0dHJpYnV0ZXMubW92ZW1lbnRTcGVlZCkuc2V0QmFzZVZhbHVlKDEuNCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWQuZ2V0RW50aXR5QXR0cmlidXRlKFNoYXJlZE1vbnN0ZXJBdHRyaWJ1dGVzLm1vdmVtZW50U3BlZWQpLnNldEJhc2VWYWx1ZSgwLjI1KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXRMaXZpbmdTb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBNb2RBUEkudXRpbC5zdHIoXCJtb2IuXCIgKyB0aGlzLmVudGl0eUlEICsgXCIucXVhY2tcIik7XG4gICAgICAgIH07XG4gICAgICAgIG5tZV9PRW50aXR5LnByb3RvdHlwZS4kZ2V0SHVydFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIHRoaXMuZW50aXR5SUQgKyBcIi5xdWFja1wiKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRnZXREZWF0aFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIHRoaXMuZW50aXR5SUQgKyBcIi5xdWFja1wiKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRwbGF5U3RlcFNvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZWQucGxheVNvdW5kKE1vZEFQSS51dGlsLnN0cihcIm1vYi5cIiArIHRoaXMuZW50aXR5SUQgKyBcIi5zdGVwXCIpLCAwLjIsIDEpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGdldERyb3BJdGVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1vZEFQSS5pdGVtcy5mZWF0aGVyLmdldFJlZigpO1xuICAgICAgICB9O1xuICAgICAgICBubWVfT0VudGl0eS5wcm90b3R5cGUuJGNyZWF0ZUNoaWxkID0gZnVuY3Rpb24gKG90aGVyUGFyZW50KSB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVkIHx8ICh0aGlzLndyYXBwZWQgPSBNb2RBUEkudXRpbC53cmFwKHRoaXMpLmdldENvcnJlY3RpdmUoKSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IG5tZV9PRW50aXR5KChfYiA9IChfYSA9IHRoaXMud3JhcHBlZC53b3JsZE9iaikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldFJlZigpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBudWxsKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm1lX09FbnRpdHkucHJvdG90eXBlLiRpc0JyZWVkaW5nSXRlbSA9IGZ1bmN0aW9uIChpdGVtc3RhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtc3RhY2sgIT09IG51bGwgJiYgaXRlbXN0YWNrLiRnZXRJdGVtKCkgPT09IE1vZEFQSS5pdGVtc1tcIlwiLmNvbmNhdCh0aGlzLmVudGl0eUJyZWVkSXRlbSldLmdldFJlZigpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBFTkQgQ1VTVE9NIEVOVElUWVxuICAgICAgICAvLyBTVEFSVCBDVVNUT00gTU9ERUxcbiAgICAgICAgdmFyIG1vZGVsQ2hpY2tlbkNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5jbGllbnQubW9kZWwuXCIuY29uY2F0KHRoaXMuZW50aXR5TW9kZWwpKTtcbiAgICAgICAgdmFyIG1vZGVsQ2hpY2tlblN1cGVyID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIobW9kZWxDaGlja2VuQ2xhc3MpOyAvL3doaWxlIHN1cGVyIGlzbid0IHVzZWQgd2hlbiBleHRlbmRpbmcgdGhpcyBjbGFzcywgamF2YSBpbXBsaWVzIHRoZSBjYWxsLlxuICAgICAgICB2YXIgbm1jbV9PRW50aXR5TW9kZWwgPSBmdW5jdGlvbiBubWNtX09FbnRpdHlNb2RlbCgpIHtcbiAgICAgICAgICAgIG1vZGVsQ2hpY2tlblN1cGVyKHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhtb2RlbENoaWNrZW5DbGFzcywgbm1jbV9PRW50aXR5TW9kZWwpO1xuICAgICAgICAvLyBFTkQgQ1VTVE9NIE1PREVMXG4gICAgICAgIC8vIFNUQVJUIENVU1RPTSBSRU5ERVJFUlxuICAgICAgICB2YXIgcmVuZGVyQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNsaWVudC5yZW5kZXJlci5lbnRpdHkuUmVuZGVyTGl2aW5nXCIpO1xuICAgICAgICB2YXIgcmVuZGVyU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihyZW5kZXJDbGFzcywgZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSA0OyB9KTtcbiAgICAgICAgdmFyIGR1Y2tUZXh0dXJlcyA9IFJlc291cmNlTG9jYXRpb24oTW9kQVBJLnV0aWwuc3RyKFwidGV4dHVyZXMvZW50aXR5L1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi5wbmdcIikpKTtcbiAgICAgICAgdmFyIG5tY3JlX1JlbmRlck9FbnRpdHkgPSBmdW5jdGlvbiBubWNyZV9SZW5kZXJPRW50aXR5KHJlbmRlck1hbmFnZXIsIG1vZGVsQmFzZUluLCBzaGFkb3dTaXplSW4pIHtcbiAgICAgICAgICAgIHJlbmRlclN1cGVyKHRoaXMsIHJlbmRlck1hbmFnZXIsIG1vZGVsQmFzZUluLCBzaGFkb3dTaXplSW4pO1xuICAgICAgICB9O1xuICAgICAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhyZW5kZXJDbGFzcywgbm1jcmVfUmVuZGVyT0VudGl0eSk7XG4gICAgICAgIG5tY3JlX1JlbmRlck9FbnRpdHkucHJvdG90eXBlLiRnZXRFbnRpdHlUZXh0dXJlID0gZnVuY3Rpb24gKGVudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuIGR1Y2tUZXh0dXJlcztcbiAgICAgICAgfTtcbiAgICAgICAgbm1jcmVfUmVuZGVyT0VudGl0eS5wcm90b3R5cGUuJGhhbmRsZVJvdGF0aW9uRmxvYXQgPSBmdW5jdGlvbiAoZW50aXR5LCBwYXJ0aWFsVGlja3MpIHtcbiAgICAgICAgICAgIGVudGl0eSA9IE1vZEFQSS51dGlsLndyYXAoZW50aXR5KTtcbiAgICAgICAgICAgIGlmICgoIWVudGl0eS5vbkdyb3VuZCkgJiYgKCFlbnRpdHkuaXNJbldhdGVyKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7IC8vZmFsbGluZ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBJRCA9IE1vZEFQSS5rZXlnZW4uZW50aXR5KHRoaXMuZW50aXR5SUQpO1xuICAgICAgICBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmVudGl0eS5FbnRpdHlMaXN0XCIpLnN0YXRpY01ldGhvZHMuYWRkTWFwcGluZzAubWV0aG9kKE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCB7XG4gICAgICAgICAgICAkY3JlYXRlRW50aXR5OiBmdW5jdGlvbiAoJHdvcmxkSW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG5tZV9PRW50aXR5KCR3b3JsZEluKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgTW9kQVBJLnV0aWwuc3RyKHRoaXMuZW50aXR5SUQpLCBJRCwgMHg1ZTNlMmQsIC8vZWdnIGJhc2VcbiAgICAgICAgMHgyNjkxNjYgLy9lZ2cgc3BvdHNcbiAgICAgICAgKTtcbiAgICAgICAgdmFyIFNwYXduUGxhY2VtZW50VHlwZSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eUxpdmluZyRTcGF3blBsYWNlbWVudFR5cGVcIikuc3RhdGljVmFyaWFibGVzO1xuICAgICAgICB2YXIgRU5USVRZX1BMQUNFTUVOVFMgPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuZW50aXR5LkVudGl0eVNwYXduUGxhY2VtZW50UmVnaXN0cnlcIilcbiAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMuRU5USVRZX1BMQUNFTUVOVFMpO1xuICAgICAgICBFTlRJVFlfUExBQ0VNRU5UUy5wdXQoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIFNwYXduUGxhY2VtZW50VHlwZS5PTl9HUk9VTkQpO1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcignYm9vdHN0cmFwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIFNwYXduTGlzdEVudHJ5ID0gTW9kQVBJLnJlZmxlY3RcbiAgICAgICAgICAgICAgICAuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC53b3JsZC5iaW9tZS5CaW9tZUdlbkJhc2UkU3Bhd25MaXN0RW50cnlcIilcbiAgICAgICAgICAgICAgICAuY29uc3RydWN0b3JzLmZpbmQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoID09PSA0OyB9KTtcbiAgICAgICAgICAgIHZhciBCaW9tZUdlblN3YW1wID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMuc3dhbXBsYW5kKTtcbiAgICAgICAgICAgIHZhciBCaW9tZUdlblJpdmVyID0gTW9kQVBJLnV0aWwud3JhcChNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LndvcmxkLmJpb21lLkJpb21lR2VuQmFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdGF0aWNWYXJpYWJsZXMucml2ZXIpO1xuICAgICAgICAgICAgdmFyIEJpb21lR2VuQmVhY2ggPSBNb2RBUEkudXRpbC53cmFwKE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQud29ybGQuYmlvbWUuQmlvbWVHZW5CYXNlXCIpXG4gICAgICAgICAgICAgICAgLnN0YXRpY1ZhcmlhYmxlcy5iZWFjaCk7XG4gICAgICAgICAgICB2YXIgZHVja1NwYXduU3dhbXAgPSBTcGF3bkxpc3RFbnRyeShNb2RBUEkudXRpbC5hc0NsYXNzKG5tZV9PRW50aXR5KSwgMjIsIDMsIDUpO1xuICAgICAgICAgICAgdmFyIGR1Y2tTcGF3blJpdmVyQmVkID0gU3Bhd25MaXN0RW50cnkoTW9kQVBJLnV0aWwuYXNDbGFzcyhubWVfT0VudGl0eSksIDEwLCA1LCA5KTtcbiAgICAgICAgICAgIHZhciBkdWNrU3Bhd25CZWFjaCA9IFNwYXduTGlzdEVudHJ5KE1vZEFQSS51dGlsLmFzQ2xhc3Mobm1lX09FbnRpdHkpLCAyNCwgMiwgMyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhubWVfT0VudGl0eSk7XG4gICAgICAgICAgICBCaW9tZUdlblN3YW1wLnNwYXduYWJsZUNyZWF0dXJlTGlzdC5hZGQoZHVja1NwYXduU3dhbXApO1xuICAgICAgICAgICAgQmlvbWVHZW5SaXZlci5zcGF3bmFibGVDcmVhdHVyZUxpc3QuYWRkKGR1Y2tTcGF3blJpdmVyQmVkKTtcbiAgICAgICAgICAgIEJpb21lR2VuQmVhY2guc3Bhd25hYmxlQ3JlYXR1cmVMaXN0LmFkZChkdWNrU3Bhd25CZWFjaCk7XG4gICAgICAgIH0pO1xuICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIEFzeW5jU2luay5MMTBOLnNldChcImVudGl0eS5cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIubmFtZVwiKSwgdGhpcy5lbnRpdHlOYW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7IH0pO1xuICAgICAgICByZXR1cm4gX2EgPSB7fSxcbiAgICAgICAgICAgIF9hW1wiRW50aXR5XCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXSA9IG5tZV9PRW50aXR5LFxuICAgICAgICAgICAgX2FbXCJNb2RlbFwiLmNvbmNhdCh0aGlzLmVudGl0eUlEKV0gPSBubWNtX09FbnRpdHlNb2RlbCxcbiAgICAgICAgICAgIF9hW1wiUmVuZGVyXCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXSA9IG5tY3JlX1JlbmRlck9FbnRpdHksXG4gICAgICAgICAgICBfYVtcIlwiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIlRleHR1cmVzXCIpXSA9IGR1Y2tUZXh0dXJlcyxcbiAgICAgICAgICAgIF9hO1xuICAgIH07XG4gICAgT0VudGl0eS5wcm90b3R5cGUucmVnaXN0ZXJPRW50aXR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyRW50aXR5U2VydmVyKFxcXCJcIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCJcXFwiLCBcXFwiXCIpLmNvbmNhdCh0aGlzLmVudGl0eU5hbWUsIFwiXFxcIiwgXFxcIlwiKS5jb25jYXQodGhpcy5lbnRpdHlNb2RlbCwgXCJcXFwiKTtcIikpO1xuICAgICAgICB2YXIgZGF0YSA9IHRoaXMucmVnaXN0ZXJFbnRpdHlDbGllbnQoKTtcbiAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6YXN5bmNzaW5rXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfaykge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2subGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2IgPSAoX2EgPSBBc3luY1NpbmspLnNldEZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYyA9IFtcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvdGV4dHVyZXMvZW50aXR5L1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi5wbmdcIildO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2godGhpcy5lbnRpdHlUZXh0dXJlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFs0IC8qeWllbGQqLywgKF9rLnNlbnQoKSkuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmFwcGx5KF9hLCBfYy5jb25jYXQoW19rLnNlbnQoKV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5oaWRlRmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvdGV4dHVyZXMvZW50aXR5L2R1Y2sucG5nLm1jbWV0YVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMud2FpdEZvclJlbmRlck1hbmFnZXIoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9rLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lID0gKF9kID0gQXN5bmNTaW5rKS5zZXRGaWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2YgPSBbXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L3NvdW5kcy9tb2IvXCIuY29uY2F0KHRoaXMuZW50aXR5SUQsIFwiL3F1YWNrLm9nZ1wiKV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChcImRhdGE6YXVkaW8vb2dnO2Jhc2U2NCxUMmRuVXdBQ0FBQUFBQUFBQUFEVlBRQUFBQUFBQU1nQWZ1RUJIZ0YyYjNKaWFYTUFBQUFBQVlBK0FBQUFBQUFBbUlZQkFBQUFBQUNwQVU5bloxTUFBQUFBQUFBQUFBQUExVDBBQUFFQUFBQTVEMTR1RDRiLy8vLy8vLy8vLy8vLy8vLy80QU4yYjNKaWFYTTBBQUFBV0dsd2FDNVBjbWNnYkdsaVZtOXlZbWx6SUVrZ01qQXlNREEzTURRZ0tGSmxaSFZqYVc1bklFVnVkbWx5YjI1dFpXNTBLUUlBQUFBa0FBQUFWRWxVVEVVOVJIVmpheUJSZFdGamF5QXRJRk52ZFc1a0lFVm1abVZqZENBb1NFUXBGZ0FBQUVGU1ZFbFRWRDFIWVcxcGJtY2dVMjkxYm1RZ1JsZ0JCWFp2Y21KcGN5UkNRMVlCQUVBQUFCaENFQ29GcldPT09zZ1ZJWXdab3FCQ3lpbkhIVUxRSWFNa1E0ZzZ4alhIR0dOSHVXU0tRc21CMEpCVkFBQkFBQUNrSEZkUWNra3Q1NXh6b3hoWHpISG9JT2VjYytVZ1o4eHhDU1hubkhPT09lZVNjbzR4NTV4em94aFhEbklwTGVlY2M0RVVSNHB4cHhqbm5IT2tIRWVLY2FnWTU1eHpiVEcza25MT09lZWNjK1lnaDFKeXJqWG5uSE9rR0djT2Nnc2w1NXh6eGlCbnpISHJJT2VjYzR3MXQ5Unl6am5ubkhQT09lZWNjODQ1NTV4empESG5uSFBPT2VlY2MyNHg1eFp6cmpubm5IUE9PZWNjYzg0NTU1eHpJRFJrRlFDUUFBQ2dvU2lLNGlnT0VCcXlDZ0RJQUFBUVFIRVVSNUVVUzdFY3k5RWtEUWdOV1FVQUFBRUFDQUFBb0VpR3BFaUtwVmlPWm1tZUpucWlLSnFpS3F1eWFjcXlMTXV5NjdvdUVCcXlDZ0JJQUFCUVVSVEZjQlFIQ0ExWkJRQmtBQUFJWUNpS296aU81RmlTcFZtZUI0U0dyQUlBZ0FBQUJBQUFVQXhIc1JSTjhTVFA4anpQOHp6UDh6elA4enpQOHp6UDh6elA4endOQ0ExWkJRQWdBQUFBZ2loa0dBTkNRMVlCQUVBQUFBZ2hHaGxEblZJU1hBb1dRaHdSUXgxQ3prT3BwWVBnS1lVbFk5SlRyRUVJSVh6dlBmZmVlKytCMEpCVkFBQVFBQUJoRkRpSWdjY2tDQ0dFWWhRblJIR21JQWdoaE9Va1dNcDU2Q1FJM1lNUVFyaWNlOHU1OTk1N0lEUmtGUUFBQ0FEQUlJUVFRZ2doaEJCQ0NDbWtsRkpJS2FhWVlvb3B4eHh6ekRISElJTU1NdWlnazA0NnlhU1NUanJLSktPT1Vtc3B0UlJUVExIbEZtT3R0ZGFjYzY5QktXT01NY1lZWTR3eHhoaGpqREhHR0NNSURWa0ZBSUFBQUJBR0dXU1FRUWdoaEJSU1NDbW1tSExNTWNjY0EwSkRWZ0VBZ0FBQUFnQUFBQnhGVWlSSGNpUkhraVRKa2l4Smt6ekxzenpMc3p4TjFFUk5GVlhWVlczWDltMWY5bTNmMVdYZjltWGIxV1ZkbG1YZHRXMWQxbDFkMTNWZDEzVmQxM1ZkMTNWZDEzVmQxNEhRa0ZVQWdBUUFnSTdrT0k3a09JN2tTSTZrU0FvUUdySUtBSkFCQUJBQWdLTTRpdU5JanVSWWppVlpraVpwbG1kNWxxZDVtcWlKSGhBYXNnb0FBQVFBRUFBQUFBQUFnS0lvaXFNNGppUlpscVpwbnFkNm9paWFxcXFLcHFtcXFtcWFwbW1hcG1tYXBtbWFwbW1hcG1tYXBtbWFwbW1hcG1tYXBtbWFwbW1hcG1rQ29TR3JBQUFKQUFBZHgzRWNSM0VjeDNFa1I1SWtJRFJrRlFBZ0F3QWdBQUJEVVJ4RmNpekhralJMc3p6TDAwVFA5RnhSTm5WVFYyMGdOR1FWQUFBSUFDQUFBQUFBQUFESGN6ekhjenpKa3p6TGN6ekhrenhKMHpSTjB6Uk4welJOMHpSTjB6Uk4welJOMHpSTjB6Uk4welJOMHpSTjB6Uk4welJOMHpSTjB6Uk5BMEpEVmdJQVpBQUFITVdZZTFKS3FjNUJTREVuWnp2R0hMU1ltdzRWUWt4YUxUWmtpQmdtcmNmU0tVS1FvNXBLeUpBeGltb3BwVk1JS2FtbGxOQXh4cVNtMWxvcXBiUWVDQTFaRVFCRUFRQUFDQ0hHRUdPSU1RWWhneEF4eGlCMEVDTEdISVFNUWdZaGxCUkt5U0NFRWtKSmtXTU1RZ2NoZ3hCU0NhRmtFRUlwSVpVQ0FBQUNIQUFBQWl5RVFrTldCQUJ4QWdBSVFzNGh4aUJFakVFSUphUVVRa2dwWWd4QzVweVV6RGtwcFpUV1FpbXBSWXhCeUp5VGtqa25KWlRTVWltbHRWQkthNldVMWtJcHJiWFdhazJ0eFJwS2FTMlUwbG9wcGJYVVdvMnR0Um9qeGlCa3prbkpuSk5TU21tdGxOSmE1aHlWRGtKS0hZU1VTa290bHBSYXpKeVQwa0ZIcFlPUVVra2x0cEpTakNXVjJFcEtNWmFVWW13dHh0cGlyRFdVMGxwSkpiYVNVb3d0dGhwYmpEVkhqRUhKbkpPU09TZWxsTkphS2FtMXpEa3BIWVNVT2djbGxaUmlMQ1cxbURrbnBZT1FVZ2NocFpKU2JDV2wyRUlwclpXVVlpd2x0ZGhpekxXMTJHb29xY1dTVW93bHBSaGJqTFcyMkdyc3BMUVdVb2t0bE5KaWk3SFcxbHF0b1pRWVMwb3hscFJpakRIVzNHS3NPWlRTWWtrbHhwSlNpeTIyWEZ1TU5hZldjbTB0MXR4aXpEWEdYSHV0dGVmVVdxMnB0VnBiakRYSEduT3N0ZWJlUVdrdGxCSmJLS25GMWxxdExjWmFReW14bFpSaUxDWEYyR0xNdGJWWWN5Z2x4cEpTakNXbEdGdU10Y1lZYzA2dDFkaGl6RFcxVm11dHRlY1lhK3lwdFZwYmpEVzMyR3F0dGZaZWMreTFBQUNBQVFjQWdBQVR5a0NoSVNzQmdDZ0FBTUlZcFJpRDBDQ2tsR01RR29TVVlnNUNwUlJqemttcGxHTE1PU21aWTg1QlNDVmp6amtJSllVUVNra2xwUkJDS1NXbFZBQUFRSUVEQUVDQURab1Npd01VR3JJU0FBZ0pBQ0FRVW9veDV5Q1VrbEpLRVVKTU9RWWhoRkpTYWkxQ1NDbm1ISVJRU2txdFZVd3g1aHlFRUVwSnFiVktNY2FjZ3hCQ0tTbTFsam5uSElRUVNra3BwZFl5NXB5REVFSXBLYVhVV2djaGhCQktLU1dsMWxycklJUVFRaW1scE5SYWF5R0VFRW9wcGFTVVdvc3hoQkJDS2FXa2tsSnJNWlpTU2trcHBaUlNheTNHVWtvcEthV1VVa3V0eFpoU1NpbWwxbHByTGNZWVUwb3BwZFJhYTdIRkdHTnFyYlhXV29zeHhoaHJUYTIxMWxxTE1jWVlZNjBGQUFBY09BQUFCQmhCSnhsVkZtR2pDUmNlZ0VKRFZnUUFVUUFBZ0RHSU1jUVljbzVCeUtCRXpqRUptWVRJT1VlbGs1SkpDYUdWMWpJcG9aV1NXdVNjazlKUnlxaVVsa0pwbWFUU1dtaWhBQUN3QXdjQXNBTUxvZENRbFFCQUhnQUFnWkJTakRubkhGS0tNY2FjY3c0cHBSaGp6am1uR0dQTU9lZWNVNHd4NXB4enpqSEduSFBPT2VjWVk4NDU1NXh6empubm5ITU9RdWVjYzg0NUI2Rnp6am5uSUlUUU9lZWNjeEJDS0FBQXFNQUJBQ0RBUnBITkNVYUNDZzFaQ1FDa0FnQUF5RERtbkhOU1VtcVVZZ3hDQ0tXazFDakZHSVFRU2trcGN3NUNDS1drMUZyR0dIUVNTa21wdFE1Q0tLV2sxRnFNSFlRU1NrbXB0Umc3Q0tXa2xGSnJNWFlRU2ttcHBkWmlMS1drMUZwck1kWmFTa21wdGRaaXJEV2wxRnFNTWRaYWEwcXB0UmhqckxYV0FnREFFeHdBZ0Fwc1dCM2hwR2dzc05DUWxRQkFCZ0RBRUFEQUFRQUFBdzRBQUFFbWxJRkNRMVlDQUtrQUFJQXhqRG5uSElSU0dxV2NneEJDS2FrMFNqa0hJWVJTVXNxY2sxQktLU20xbGprbnBaUlNVbXF0ZzFCS1NpbTFGbU1Ib1pTVVVtb3R4ZzVDS2ltMUZtT05IWVJTVW1vdHhoaERLU20xRm1PTXRZWlNVbW90eGhockxTbTFGbU9OdGVaYVVtb3R4aHByemJVQUFJUUdCd0N3QXh0V1J6Z3BHZ3NzTkdRbEFKQUhBRUFneEJoampEbUhsR0tNTWVlY1Ewb3h4cGh6empIR0dIUE9PZWNZWTR3NTU1eHpqREhubkhQT09jYVljODQ1NXh4enpqbm5uSE9PT2VlY2M4NDU1NXh6empubm5IUE9PZWVjYzg0SkFBQXFjQUFBQ0xCUlpIT0NrYUJDUTFZQ0FPRUFBSUF4akRuSEdIUVNVbXFZZ2c1Q0NDV2swRUtqbUhNUVFpaWxwTlF5NktTa1ZFcEtyY1dXT1NlbHBGSlNTcTNGRGtKS0thWFVXb3d4ZGhCU1NpbWwxbUtNdFlOUVNrb3R4VmhqclIyRVVsSnFyYlVZYXcybHBOUmFiREhXbW5Nb0phWFdXb3l4MXBwTFNxM0ZXR090dWVaY1Vtb3R0bGhyclRYbjFGcU1NZGFhYTg2OXA5WmlqTEhXbW5QdXZRQUFrd2NIQUtnRUcyZFlTVG9ySEEwdU5HUWxBSkFiQUlBZ3hKaHp6a0VJSVlRUVFnZ2hVb294NXlDRUVFSUlJWlJTU3FRVVk4NUJDQ0dFRUVJSUlZU01NZWVnZ3hCQ0NLV1VVa29wR1dQT1FRZ2hoQkJLS0tXRUVqcm5vSU1RUWdtbGxGSktLYVYwemprSUlZUVFTaW1sbEZKSzZTQ0VFRUlJcFpSU1NpbWxsTkpCQ0NHRVVFb3BwWlJTU2lrbGhCQkNDS1dVVWtvcHBaUlNTZ2doaEJCS0thV1VVa29wcFpRUVFnaWxsRkpLS2FXVVVrb3BJWVFRU2ltbGxGSktLYVdVVWtJSXBaUlNTaW1sbEZKS0thV0VFRW9wcFpSU1NpbWxsRkpLQ2FHVVVrb3BwWlJTU2ltbGxCSktLYVdVVWtvcHBaUlNTaWtsbEZKS0thV1VVa29wcFpSU1NpaWxsRkpLS2FXVVVrb3BwWlJRU2ltbGxGSktLYVdVVWtvcG9aUlNTaW1sbEZKS0thV1VVZ29BQURwd0FBQUlNS0xTUXV3MDQ4b2pjRVFod3dSVWFNaEtBQ0FjQUFCQUJEb0lJWVFRUWdnUmN4QkNDQ0dFRUVLSW1JTVFRZ2doaEJCQ0NDR0VFRUlJcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwUlFBZFpuaEFCZzlZZU1NSzBsbmhhUEJoWWFzQkFEU0FnQUFZeGhqakNuSXBMTVdZNjBOWXhCQ0I1MkVGR3FvSmFhR01RZ2hkRkJLU2kyMldITUdvYVJTU2trdHhsaUR6VDJEVUVvcHBhUVdZNjA1RitOQlNDV2wxR0tydGVjY2pPNGdsSkpTU2pIV21uUHV2V2pRU1VtcHRWcHo3ajBIWHp3SXBhVFdXb3c5QngrTU1LS1VsbUtzc2RZY2ZCRkdHRkZLU3kzR21udk52UmhqaEVvcHhscDd6cm5uWEl3UlBxVVdZNjY1OXg1OExzTDQ0bUxNT2ZmaWd3OCtDR0dNa0RIbTJIUHd2UmRqakEvQ3lGeHpMc0lZNDRzd3d2Z2diSzI1QjErTUVVWVlZM3p2TmZpZ2V6SENDQ09NTWNJSTNYUFJSZmhpakRGR0dGK0VBUUM1RVE0QWlBdEdFbEpuR1ZZYWNlTUpHQ0tRUWtOV0FRQXhBQUFFTWNZZ3BKQlNTaW5GR0dPTU1jWVlZNHd4eGhoampESEduR1BPT2VlY0FBREFCQWNBZ0FBcjJKVlpXclZSM05SSlh2UkI0Qk02WWpNeTVGSXFabklpNkpFYWFyRVM3TkFLYnZBQ3NOQ1FsUUFBR1FBQTVLU1VsRm90R2tMS1FXazFpTWdnNVNURkpDSmprSUxTZ3FlUU1ZaEp5aDFqQ2lFRnFYYlFNWVVVb3hwU0NwbFNDbXFxT1lhT01hZ3hKK0ZTQ2FVR0FBQkFFQUFnSUNRQXdBQkJ3UXdBTURoQUdEa1E2QWdnY0dnREFBeEV5RXhnVUFnTkRqSUI0QUVpUWlvQVNFeFFsQzUwUVFnUnBJc2dpd2N1bkxqeHhBMG5kR2lEQUFBQUFBQ0FBSUFQQUlDRUFvaUlabWF1d3VJQ0kwTmpnNlBENHdNa1JHUWtBQUFBQUFCQUFPQURBQ0FoQVNLaW1abXJzTGpBeU5EWTRPancrQUFKRVJrSkFBQUFBQUFBQUFBQUFnSUNBQUFBQUFBQkFBQUFBZ0pQWjJkVEFBUlFDd0FBQUFBQUFOVTlBQUFDQUFBQU1NbHNRQXU1dHJxMi9mOEUrcmk4dXpTZk5qUnQ3czByMzMzMUs3ZTJ5dEN2UDZhNFg2UzBydXZhRHpmZnFUMnkzRXp1RjJkTllhN3J2SHgxdFB5VnIvNU9HTEZxSGg0UHMzYjQ5dFY1ZmVWbTdWQWY4ZXZzL004cHc5cDd3M1c3WDN6KzNSM2w5QWduVlZaQnFhbk1TNkVHVVRxcGxYYVRGOW5KRTFyK2ZacWtaVlY5bVRIRzN2cy9GRGRrUGYwOFBEWlVsMS9aU1VXYVBteU1yZTlzOUVwL3FucDRYM20vODNmcC8xN25tbVBsVVZScmpLOVpkMytONmZubWJjVjNqM2Q4NlVnN1ZDSUFWS3ZsYjVRLzEyRjJpd1NOK2lPekxjdmVYMjVxZXhiYU1iTXR0TW92VVovMVUvODR2TFp6eitxYm9zcnV1SC92ZEFGTzFTc1p1YVVGT2RFSnl5dmZmYmorVnU1YnIrNWVNa0ZrNzRFNUxjR2ppbkxLb2RQL2JYdEd6Zi9maUZ2UGZxbHBFWlhvM2hOTFdjZXRwZGx4aHgzL0xXWk9lMmVIaVkxamg5VTNuU3RUbldsZTdzbHRhOEhnZWZucFl0dWFUZG4vM1VhWmk3Yi9zWitaYmQycW1HdzFSTzJoeVNaYWFjM3BhSWFKS2FhVjVVaENTQUJFcjhFbVBEZVZwdytSemJySjV0bGwvOVcxSURKMysxak1jcmRZdW0xZ0Y2ZE9QRGh4eE0yV3VXYmh5SHF3TGZOeHd6WHUxQTg5NWxyNEtaOTJIZnZ1dCt0M2JyZlgycXlIRVJQNzQ3ZlBUMDJ4dVRsSFovMzIvUHdhVGVqMjNqNVpHMit4N0UyNXEwaHUzVjdTTEMzK3RFZXJOR0ovbmhvcE9pWUx6NXhxOUYrTlBGLyt1VlhVK2VPZWJJVEIvdC8wMHVUVWlrbVVtNnFaelhvOWcxWHU2NWVuc2pNYjBZV1F0Z2lFbldFVmJlMlJUOVFsdEg4amVnQXNxeEZ3Vjcvd3JMOVRBbWxBSHVuNDZsL2M4ekRSYlhsWWF2dVVnbW5XcXQ4WDJuNGJuWU15RldNdXpqWnhGL3RHUE8wQzZweSt6TzkzNnhjdDYzbC8zYjlsMStkVDlYRWMyNGJvOFVNNGRxaWRWRFhrMm1MNUErV0VyRlNudjVLaFZmWTgrZHNqT1d0eVQrMzVISTJULy8wV3d1cFNxZmJ2UEVLczlHNUlPV1oxenAzLzYrUmhweWYvV2FuSzBPbDkwM04xbVp0NnZWaFgwRjNxMmZQalA1NS9Ibzg3cFdkS3ZycFdEcU5BeDVGcjhLNENBUG9JS3lvUXpIV0RGdmZ0THJqNXN3ZDkvTUlLd2U1TWx2STExakJ6MnhaelNjTytQMzJxanFxc3F0SzNSTXJweGRURHkvMzVUS1RzM0xsaHErbWYwUHl3TXBudUhsMWp5LzFVYUxVY3ZSUnU2M1RQNGVEbjlhdk8wQ3BHRVczWDNKdFhSOXNKaXdxdDJvd0hPV3hMMDc1UHM4SlJueTNhN3E2bnZvNmZvdXlJaGpyYVlUa2RtcjFnV0JiWGg4WmVZNnJYcncyOWM5cHRKRTg2RHk1YjVlbXk0MzR0aTZHK0dzem1NaGtqNDZJaml0ejNXa3lTZEM4dk5OVzZ0djlvZFJTaHNjZ3pCei93dHUwV3g1VTdTeGVXamFZZFJiYk5wcFB2WEVSdmI0MnJweDdkRTY0dlBMUGJkTTdyMW5weGNQTDJldy9zZk1zbGowa0FBQUJlQ05PclFKbkRDUnF1aCtpenNTVnMzd0s2Q0ZzS25Td3FYc1VyN1lXUGpWV2x0MG5zRHlZVEwxMTFRSjN6ek5QbUpRL3poMS8xMkNrMUdOWktmVXhhU2M1b3R1MmwzbGpMQ3NaQzA5T1YzNmJUR2RJcU5NNmMvWE8vbmxEN1RsbWFLc0pBVk9SRHBjeWFNdGlsZjFFaUN1OU5wa1dNSDNSdnUrekRJNDFsdC96cXIrcW1EN2F4bEp1WC9aRDcray9RZWRXUHUvaDkzUXg2emRyQWlpYWVNZXEyOWRMR3BjbnErNTF3OUJKMUhsQmtOeFYwN2JGNW85Tjk1VkdYbng3VHVHSFI5WFdEMFBvM3BmQjYwa1gzcXNZenA5UTE5ZWc2bDg1VExqdWZkczNhb0ZlQ1NiOU85VGRXL043ZlhjMnpsYU16bmZmT1M1MUhBdmZtcElpb0FRQUExc2l5RTZERXl3SWRzUCswM1QvVStYOU85L1g1Lzcva0tNODRaLzNhVEljYVpldlBTdGRNdWxKWGhYY3Q2dW0weFpqTk8yUHlYdWZkZjc5eDJVbDNkWFNzeWZTNVhEb1dUNG1DdmJkK3FWVjFvOTluTWJYYnVlbjFnM24vV0tlMXN5Ry8zcU4wNlExOUY1RGxTeFhPQktOalZHOHovZFdzRktyckd6T0lkN1IzZGlvLytVclY0YnFJdVVJWUZrSTdtdVY4ZksvaGJHbXMySzJzMzlYV3Z2eVROSmYxRXIyS2NaUFJER0szQnlWMTJkNVVLNVBtcWhCelBkdVZqamp1dmZ0alE2ZGJPdXFXcGZ4cU9VLzJkbXVLQ1VzbndmNTNkWFdQYVhpcUNuUGsyNUtIWHM2OGJKdmhjbW5ySm4vWTNYdlBhMzBuWmdRQUFCd2xVaVBtNXFtNlJ4dVJOVjJvYjVsRWxqWjI5Mi9OMjdGbmhVOWVLTEpqczMvczFLUEhpYlNxblFhemFiSno4MTVrVnd1Uktub09ZWE9VODdjNWRxNk9UZzAzeThOY0g5UVQ3dFo3UEhSYkRmb3ZDbE11WXpxWDFsZlNlUFI4ZWs5WmVVTjcwcnUxNzl3ZTNqcnVmOGV6YzV0UFpQOFkxdkMrcXUyYjNVNG5meiswVElxSysxY3UxNlphNWNXbmg3WDcxT05SZFVmRlY3STYrZlpzN1Y3NWI0aGppWEsxbWk4bW0rdit4bG4xazY3M2p0dVVKQUFVRzJOb1ozUHNJeDk2TkhwWnFzclJTZEhURzF5YzhYbjEvZEJKRSs1OGRQdC9IcitwekF2ZnN6azZjU3c2TC83NWJZYzdUOVJVNUNWVVI0NEtuMCtmMm84KzlrUFA3TjNvMUg5UXE1MWo3anlIT2Z6U296Y3ZuRDdsOHVpSkIxbGJRSFJQOUg2bVQ4LzRGVTJoS1V6QmFCcUh6ZHZxUTdUOVk2UUxpbTJYY092VnB1Tk0xcXNuZy8xdW1KR3lscWN1NzUvclRweHovOVpPUDh2NU9hbmx0ZlU3QjkrdlZpVmJFYVYyczdKMjc5WS9XbDdjbUt0MFBXRnZVN3dHNjBPZW8rM0hYeFU1cXMzU2R6NmFMMndhOW9vZkR2Wll6dW5OMFltOG5OcTFhdjN6eHkrUFJWL1lMM3o2UHZhRitvZm8wdG5JMm9yUGw3NEgxVnJWdmwzNWU3c3dhdm5kUGwvdlA3aGRQV0Y4UkdkbFNvbTdEbHNydzVLeTUzbmVaYTJUMXBuTVhJM0w2bUVVS2FpNTFJL0JxTGFMck8zczcrSDgzMzZ6bUt6b3FwallPUW5yN3F2UFZxKzdhcVh6ZWlXNytXcnI4c2E3Ly9ZK3MzM3o2djFsNUg5bDQxVnBxai9JL1BCOHlyaGYzcDliVWNmUTNRQT1cIildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbNCAvKnlpZWxkKi8sIChfay5zZW50KCkpLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBfZS5hcHBseShfZCwgX2YuY29uY2F0KFtfay5zZW50KCldKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuQXVkaW8ucmVnaXN0ZXIoXCJtb2IuXCIgKyB0aGlzLmVudGl0eUlEICsgXCIucXVhY2tcIiwgQXN5bmNTaW5rLkF1ZGlvLkNhdGVnb3J5LkFOSU1BTFMsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IFwic291bmRzL21vYi9cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIvcXVhY2sub2dnXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXRjaDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9sdW1lOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW1pbmc6IGZhbHNlIC8vdXNlIGZvciBsYXJnZSBhdWRpbyBmaWxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2ggPSAoX2cgPSBBc3luY1NpbmspLnNldEZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfaiA9IFtcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvc291bmRzL21vYi9cIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCIvc3RlcC5vZ2dcIildO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goXCJkYXRhOmF1ZGlvL29nZztiYXNlNjQsVDJkblV3QUNBQUFBQUFBQUFBQWJQUUFBQUFBQUFMWVpXZElCSGdGMmIzSmlhWE1BQUFBQUFZQStBQUFBQUFBQW1JWUJBQUFBQUFDcEFVOW5aMU1BQUFBQUFBQUFBQUFBR3owQUFBRUFBQUJmS2JOWUQ1RC8vLy8vLy8vLy8vLy8vLy8vNEFOMmIzSmlhWE0wQUFBQVdHbHdhQzVQY21jZ2JHbGlWbTl5WW1seklFa2dNakF5TURBM01EUWdLRkpsWkhWamFXNW5JRVZ1ZG1seWIyNXRaVzUwS1FJQUFBQXpBQUFBVkVsVVRFVTlWR2hsSUZOdmIzUm9hVzVuSUZOdmRXNWtjeUJ2WmlCRVZVTkxJQ016SUNoeWRXNXVhVzVuSUdSMVkyc3BFUUFBQUVGU1ZFbFRWRDF6WlVSVlEwdDBhWFpsQVFWMmIzSmlhWE1rUWtOV0FRQkFBQUFZUWhBcUJhMWpqanJJRlNHTUdhS2dRc29weHgxQzBDR2pKRU9JT3NZMXh4aGpSN2xraWtMSmdkQ1FWUUFBUUFBQXBCeFhVSEpKTGVlY2M2TVlWOHh4NkNEbm5IUGxJR2ZNY1FrbDU1eHpqam5ua25LT01lZWNjNk1ZVnc1eUtTM25uSE9CRkVlS2NhY1k1NXh6cEJ4SGluR29HT2VjYzIweHQ1Snl6am5ubkhQbUlJZFNjcTQxNTV4enBCaG5EbklMSmVlY2M4WWdaOHh4NnlEbm5IT01OYmZVY3M0NTU1eHp6am5ubkhQT09lZWNjNHd4NTV4enpqbm5uSE51TWVjV2M2NDU1NXh6empubkhIUE9PZWVjY3lBMFpCVUFrQUFBb0tFb2l1SW9EaEFhc2dvQXlBQUFFRUJ4RkVlUkZFdXhITXZSSkEwSURWa0ZBQUFCQUFnQUFLQklocVJJaXFWWWptWnBuaVo2b2lpYW9pcXJzbW5Lc2l6THN1dTZMaEFhc2dvQVNBQUFVRkVVeFhBVUJ3Z05XUVVBWkFBQUNHQW9pcU00anVSWWtxVlpuZ2VFaHF3Q0FJQUFBQVFBQUZBTVI3RVVUZkVrei9JOHovTTh6L004ei9NOHovTTh6L004ei9NOERRZ05XUVVBSUFBQUFJSW9aQmdEUWtOV0FRQkFBQUFJSVJvWlE1MVNFbHdLRmtJY0VVTWRRczVEcWFXRDRDbUZKV1BTVTZ4QkNDRjg3ejMzM252dmdkQ1FWUUFBRUFBQVlSUTRpSUhISkFnaGhHSVVKMFJ4cGlBSUlZVGxKRmpLZWVna0NOMkRFRUs0bkh2THVmZmVleUEwWkJVQUFBZ0F3Q0NFRUVJSUlZUVFRZ2dwcEpSU1NDbW1tR0tLS2NjY2M4d3h4eUNERERMb29KTk9Pc21ra2s0NnlpU2pqbEpyS2JVVVUweXg1UlpqcmJYV25IT3ZRU2xqakRIR0dHT01NY1lZWTR3eHhoZ2pDQTFaQlFDQUFBQVFCaGxra0VFSUlZUVVVa2dwcHBoeXpESEhIQU5DUTFZQkFJQUFBQUlBQUFBY1JWSWtSM0lrUjVJa3laSXNTWk04eTdNOHk3TThUZFJFVFJWVjFWVnQxL1p0WC9adDM5VmwzL1psMjlWbFhaWmwzYlZ0WGRaZFhkZDFYZGQxWGRkMVhkZDFYZGQxWGRlQjBKQlZBSUFFQUlDTzVEaU81RGlPNUVpT3BFZ0tFQnF5Q2dDUUFRQVFBSUNqT0lyalNJN2tXSTRsV1pJbWFaWm5lWmFuZVpxb2lSNFFHcklLQUFBRUFCQUFBQUFBQUlDaUtJcWpPSTRrV1phbWFaNm5lcUlvbXFxcWlxYXBxcXBxbXFacG1xWnBtcVpwbXFacG1xWnBtcVpwbXFacG1xWnBtcVpwbXFacG1xWnBBcUVocXdBQUNRQUFIY2R4SEVkeEhNZHhKRWVTSkNBMFpCVUFJQU1BSUFBQVExRWNSWElzeDVJMFM3TTh5OU5Fei9SY1VUWjFVMWR0SURSa0ZRQUFDQUFnQUFBQUFBQUF4M004eDNNOHlaTTh5M004eDVNOFNkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVGRNMFRkTTBUZE0wVFFOQ1ExWUNBR1FBQUJ6Rm1IdFNTcW5PUVVneEoyYzd4aHkwbUpzT0ZVSk1XaTAyWklnWUpxM0gwaWxDa0tPYVNzaVFNWXBxS2FWVENDbXBwWlRRTWNha3B0WmFLcVcwSGdnTldSRUFSQUVBQUFnaHhoQmppREVHSVlNUU1jWWdkQkFpeGh5RURFSUdJWlFVU3NrZ2hCSkNTWkZqREVJSElZTVFVZ21oWkJCQ0tTR1ZBZ0FBQWh3QUFBSXNoRUpEVmdRQWNRSUFDRUxPSWNZZ1JJeEJDQ1drRkVKSUtXSU1RdWFjbE13NUthV1Uxa0lwcVVXTVFjaWNrNUk1SnlXVTBsSXBwYlZRU211bGxOWkNLYTIxMW1wTnJjVWFTbWt0bE5KYUthVzExRnFOcmJVYUk4WWdaTTVKeVp5VFVrcHByWlRTV3VZY2xRNUNTaDJFbEVwS0xaYVVXc3ljazlKQlI2V0RrRkpKSmJhU1Vvd2xsZGhLU2pHV2xHSnNMY2JhWXF3MWxOSmFTU1cya2xLTUxiWWFXNHcxUjR4QnlaeVRramtucFpUU1dpbXB0Y3c1S1IyRWxEb0hKWldVWWl3bHRaZzVKNldEa0ZJSElhV1NVbXdscGRoQ0thMlZsR0lzSmJYWVlzeTF0ZGhxS0tuRmtsS01KYVVZVzR5MXR0aHE3S1MwRmxLSkxaVFNZb3V4MXRaYXJhR1VHRXRLTVphVVlvd3gxdHhpckRtVTBtSkpKY2FTVW9zdHRseGJqRFduMW5KdExkYmNZc3cxeGx4N3JiWG4xRnF0cWJWYVc0dzF4eHB6ckxYbTNrRnBMWlFTV3lpcHhkWmFyUzNHV2tNcHNaV1VZaXdseGRoaXpMVzFXSE1vSmNhU1Vvd2xwUmhiakxYR0dITk9yZFhZWXN3MXRWWnJyYlhuR0d2c3FiVmFXNHcxdDlocXJiWDJYblBzdFFBQWdBRUhBSUFBRThwQW9TRXJBWUFvQUFEQ0dLVVlnOUFncEpSakVCcUVsR0lPUXFVVVk4NUpxWlJpekRrcG1XUE9RVWdsWTg0NUNDV0ZFRXBKSmFVUVFpa2xwVlFBQUVDQkF3QkFnQTJhRW9zREZCcXlFZ0FJQ1FBZ0VGS0tNZWNnbEpKU1NoRkNURGtHSVlSU1Vtb3RRa2dwNWh5RVVFcEtyVlZNTWVZY2hCQktTYW0xU2pIR25JTVFRaWtwdFpZNTV4eUVFRXBKS2FYV011YWNneEJDS1NtbDFGb0hJWVFRU2lrbHBkWmE2eUNFRUVJcHBhVFVXbXNoaEJCS0thV2tsRnFMTVlRUVFpbWxwSkpTYXpHV1VrcEpLYVdVVW1zdHhsSktLU21sbEZKTHJjV1lVa29wcGRaYWF5M0dHRk5LS2FYVVdtdXh4UmhqYXEyMTFscUxNY1lZYTAydHRkWmFpekhHR0dPdEJRQUFIRGdBQUFRWVFTY1pWUlpob3drWEhvQkNRMVlFQUZFQUFJQXhpREhFR0hLT1FjaWdSTTR4Q1ptRXlEbEhwWk9TU1FtaGxkWXlLYUdWa2xya25KUFNVY3FvbEpaQ2FabWswbHBvb1FBQXNBTUhBTEFEQzZIUWtKVUFRQjRBQUlHUVVvdzU1eHhTaWpIR25ITU9LYVVZWTg0NXB4aGp6RG5ubkZPTU1lYWNjODR4eHB4enpqbm5HR1BPT2VlY2M4NDU1NXh6RGtMbm5IUE9PUWVoYzg0NTV5Q0UwRG5ubkhNUVFpZ0FBS2pBQVFBZ3dFYVJ6UWxHZ2dvTldRa0FwQUlBQU1ndzVweHpVbEpxbEdJTVFnaWxwTlFveFJpRUVFcEpLWE1PUWdpbHBOUmF4aGgwRWtwSnFiVU9RaWlscE5SYWpCMkVFa3BKcWJVWU93aWxwSlJTYXpGMkVFcEpxYVhXWWl5bHBOUmFhekhXV2twSnFiWFdZcXcxcGRSYWpESFdXbXRLcWJVWVk2eTExZ0lBd0JNY0FJQUtiRmdkNGFSb0xMRFFrSlVBUUFZQXdCQUF3QUVBQUFNT0FBQUJKcFNCUWtOV0FnQ3BBQUNBTVl3NTV4eUVVaHFsbklNUVFpbXBORW81QnlHRVVsTEtuSk5RU2lrcHRaWTVKNldVVWxKcXJZTlFTa29wdFJaakI2R1VsRkpxTGNZT1Fpb3B0UlpqalIyRVVsSnFMY1lZUXlrcHRSWmpqTFdHVWxKcUxjWVlheTBwdFJaampiWG1XbEpxTGNZYWE4MjFBQUNFQmdjQXNBTWJWa2M0S1JvTExEUmtKUUNRQndCQUlNUVlZNHc1aDVSaWpESG5uRU5LTWNhWWM4NHh4aGh6empubkdHT01PZWVjYzR3eDU1eHp6am5HbUhQT09lY2NjODQ1NTV4empqbm5uSFBPT2VlY2M4NDU1NXh6empubm5IUE9DUUFBS25BQUFBaXdVV1J6Z3BHZ1FrTldBZ0RoQUFDQU1ZdzV4eGgwRWxKcW1JSU9RZ2dscE5CQ281aHpFRUlvcGFUVU11aWtwRlJLU3EzRmxqa25wYVJTVWtxdHhRNUNTaW1sMUZxTU1YWVFVa29wcGRaaWpMV0RVRXBLTGNWWVk2MGRoRkpTYXEyMUdHc05wYVRVV213eDFwcHpLQ1dsMWxxTXNkYWFTMHF0eFZoanJibm1YRkpxTGJaWWE2MDE1OVJhakRIV21tdk92YWZXWW95eDFwcHo3cjBBQUpNSEJ3Q29CQnRuV0VrNkt4d05MalJrSlFDUUd3Q0FJTVNZYzg1QkNDR0VFRUlJSVZLS01lY2doQkJDQ0NHVVVrcWtGR1BPUVFnaGhCQkNDQ0dFakRIbm9JTVFRZ2lsbEZKS0tSbGp6a0VJSVlRUVNpaWxoQkk2NTZDREVFSUpwWlJTU2ltbGRNNDVDQ0dFRUVvcHBaUlNTdWtnaEJCQ0NLV1VVa29wcFpUU1FRZ2hoRkJLS2FXVVVrb3BKWVFRUWdpbGxGSktLYVdVVWtvSUlZUVFTaW1sbEZKS0thV1VFRUlJcFpSU1NpbWxsRkpLS1NHRUVFb3BwWlJTU2ltbGxGSkNDS1dVVWtvcHBaUlNTaW1saEJCS0thV1VVa29wcFpSU1NnbWhsRkpLS2FXVVVrb3BwWlFTU2ltbGxGSktLYVdVVWtvcEpaUlNTaW1sbEZKS0thV1VVa29vcFpSU1NpbWxsRkpLS2FXVVVFb3BwWlJTU2ltbGxGSktLYUdVVWtvcHBaUlNTaW1sbEZJS0FBQTZjQUFBQ0RDaTBrTHNOT1BLSTNCRUljTUVWR2pJU2dBZ0hBQUFRQVE2Q0NHRUVFSUlFWE1RUWdnaGhCQkNpSmlERUVJSUlZUVFRZ2doaEJCQ0NLV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FXVVVrb3BwWlJTU2ltbGxGSktLYVdVVWtvcHBaUlNTaW1sbEZKS0thV1VVa29wcFpSU1NpbWxsRkpLS2FVVUFIV1o0UUFZUFdIakRDdEpaNFdqd1lXR3JBUUEwZ0lBQUdNWVk0d3B5S1N6Rm1PdERXTVFRZ2VkaEJScXFDV21oakVJSVhSUVNrb3R0bGh6QnFHa1VrcEpMY1pZZzgwOWcxQktLYVdrRm1PdE9SZmpRVWdscGRSaXE3WG5ISXp1SUpTU1Vrb3gxcHB6N3IxbzBFbEpxYlZhYys0OUIxODhDS1drMWxxTVBRY2ZqRENpbEpaaXJMSFdISHdSUmhoUlNrc3R4cHA3emIwWVk0UktLY1phZTg2NTUxeU1FVDZsRm1PdXVmY2VmQzdDK09KaXpEbjM0b01QUGdoaGpKQXg1dGh6OEwwWFk0d1B3c2hjY3k3Q0dPT0xNTUw0SUd5dHVRZGZqQkZHR0dOODd6WDRvSHN4d2dnampESENDTjF6MFVYNFlvd3hSaGhmaEFFQXVSRU9BSWdMUmhKU1p4bFdHbkhqQ1JnaWtFSkRWZ0VBTVFBQUJESEdJS1NRVWtvcHhSaGpqREhHR0dPTU1jWVlZNHd4eHB4anpqbm5uQUFBd0FRSEFJQUFLOWlWV1ZxMVVkelVTVjcwUWVBVE9tSXpNdVJTS21aeUl1aVJHbXF4RXV6UUNtN3dBckRRa0pVQUFCa0FBT1NrbEpSYUxScEN5a0ZwTllqSUlPVWt4U1FpWTVDQzBvS25rREdJU2NvZFl3b2hCYWwyMERHRkZLTWFVZ3FaVWdwcXFqbUdqakdvTVNmaFVnbWxCZ0FBUUJBQUlDQWtBTUFBUWNFTUFEQTRRQmc1RU9nSUlIQm9Bd0FNUk1oTVlGQUlEUTR5QWVBQklrSXFBRWhNVUpRdWRFRUlFYVNMSUlzSExweTQ4Y1FOSjNSb2d3QUFBQUFBZ0FDQUR3Q0FoQUtJaUdabXJzTGlBaU5EWTRPancrTURKRVJrSkFBQUFBQUFRQURnQXdBZ0lRRWlvcG1acTdDNHdNalEyT0RvOFBnQUNSRVpDUUFBQUFBQUFBQUFBQUlDQWdBQUFBQUFBUUFBQUFJQ1QyZG5Vd0FFaGd3QUFBQUFBQUFiUFFBQUFnQUFBRGVqMWI4THVidTcrdkx0ZnEzQ0FRSFVwajRvemJ6N1V2ZjBybEJGTWtUM3JzOWpaN0IvSGE2MGtiZVQ1ZHgvaktIRHJQdGhYZDEweVAyaTU5Kzc3WWQ3N1k4L0taWEtVL3BjaGZCdExWSXRoMGhlcTJVUHkyRlp2MU03Mzd5c3duck41YkJFbjkrNnVidkphN1NZSVlNdUpMbE5jYWFvY29ML2Qrd2hmT3NxeTUxZnI5UU5qL0wwNEpVUzdzK2V5MkFsbE40ejExY3pjZHBhOHAzT0gxdlBzWnY4MzV5WUx2eWVMc1VSMitydCszYTE4ck5ia1dPT3AvZVJkNWRqeFpTUzdxNVRXaTdqTGV5eWpSR0xldzZIajgzWHJ5SFhkVy8wMHR2b0pSR2loNmVQN0FXL1J4ZWdMSnpMOG1VZTIvVFIvdW5EaTNkbXVkcDIwdm5UN2g4Y21uUTNFcXExMmxUcm50OTJ0UTl6MmZIaS9jdkR2UFowaHRLMXIzc3YrL0VQblhxVVlDa1JkRlN5T0h1c1BLMjF0V0RBUGFWUDVhNHQ5Qk0vMTg2THNub3ZrZjd6SVpkUFh6NGZQbHB1N0RMbGxYbVYyWWUyR3g3WGxkUHovY2Y5Y2VGNW1ibmFsdHVuN1lwdy93c25WbnBDNkRZbUlwc25iTy9iTm5zZWJoZDdBUURzS0pQNzdqbWN1UGxUdllUZ3NuKzBSc3BucDBPb05uMCttTm1VOTNmZk1IWTdha0wwM0x2M3g1NU92amkydWF6SGJsWmhmVmxJNnMrc080ZEdlVjVyYXVtd0hJN3VMeDhxWU5kZWQ4N3B5SHJmZHZUbmZuWDRkVCtJRDkrbldEK3pBcG02SC92S2tidWVMYmpRVXZ3aWhLcUhXbXBwZWY5Zi9WNDgrMW5MNi9ZWGZPWlcvd3ZkcUtPbUMzK2RyNjZZdTFWc3ZpUU92dU9qMDlkN3o2M1RpWEs2K09SVDRxNFVWODdMM1hpaWNhbGFQWEtNYnl3VnU0MEEya2FMQ0FBQUhFL3RZK3N2anoxMitsZGpSU1IyUDlkYlZ0YlF3c1NBeFpseVg2dWx6UzRJNGI3TG9xQzZkRFhsYVkzdzM3R3A2WG44U2VYSDVleDVVdWlVMVc2M2xZM2JXYlhjWXlmOXpxdktlV3o3OC9UZlVadjgxbXZsNjYrY2FoN29pUGUxbmZrbC9iYkNPZnkzMjAvdEpFa28rOXBoeFhicFc2bjcvbUpudHN2TkkvNHZ2Wms4akFUYWVZcFhPRDVCdlF4YnJXeHptOUQ2UmFYRWlCRWV4c210dVdxNVFReGwwNTJTeTlPd09GMkZKMXoyVzZIWlVKOEtaYUl2U3hMVHJqcnRsYmxGcVhUai91c1g2SXdYZWRTUlRiMk8yN21lQ3ZGNCs3SGdiOGQrMzFmQnBFN1RuanJhZk10U2JmNzZsOHZncXdFQUFKN215Z3dvRFExU045ZGt4dy82c2VQWlMxV1ZyaHB0elQvTkZ1MXEzcXpNWDFPejA2dHNWZ3BWei8zVm4vdkp6MHcrVkh2VzNhK0NadlJueDB6QTJFTkNyOW56c2w5K3I3MzV3dlByQTM4cE9CcU9CTzE1OUlTZWJZem0xVklsN3RkZGNzVTBjblFpa01UVjU0dWhDSGkrOWlkUFpSMWhmTFZ0RU5Md2NuTXJpUHRGV05wbUljcDY5L2VFWjk1TWNmUGl4cmxaM1lBOVY1UmNNZGRUamN5RGNJTlYvejVqUFZqYkxvZVBDdU5KL21vRm0xellyYXIzc1czc256dTB3WCtLS3BSUFdPU0RiZFNFWlY3SEVuZmVobkV4eW1OOTdTdGx1UzQvOVgzemViNWdyeks1VzRTVkJUYXMxeWdHQndBQU5oYUxCTUFCR0IweEJWMk9vbS92ajczd3NadGFsS0FvdTFRdjRLbXNpdk9mTmFNZEZHM2ZWZVhBSTEwVTFtNW5oT2E3VytlblMybGVxTHROc3FJMExMYlVaNWVscVZ3MHRlRUtCYjJ0dVdLVExCZmJUVjZmcm56aDBmejY1ZmU5Yno0L2VaQWJQR2htS3NkLzM4YXk4LzFaRWRaK1dQY25WdXZTRlEwaWphSWkxMTlOeHBKT1V4bjIxM3lqTklhRWRUR2Roa0xMaDMyNk1QdkYvdnVhSUYzamVRUGVKbVZlM2pjd2V0dXcrN2xkNzNCWjNSMHYvZExUcDd3NlIxbm1iYmo0UTgweTgrVFBvOGFkYld5dThrQWlvN2k1YkgwNTdaOHB4dW1wVXRnVysvdE81L0JHK0tERExBQUF6Q2hUTDNSMDZmQjB5MCtKSm9ocXArU2lwMkQ4NWpHSkpiNkhYZ2ZmZzY5alhGTkVsdGRUUGx6RTFiby9iemQvcitlWnNIbmx0SHgxc2NUWm44aWJUVWxGN3N0K2VTcHYzeHU4R3U5TWNvT29pTjF1N3NmUHpiRXVUb2ZqbmY2d1ZsWjlhdFhPZWI3VWY5TGN6bTFlbjkveXlLSkM3RzgrZFRsem5BUUEzQ1Jod1J4MmhNMW5uVlU1MVlaK0h1TnBpNXlPM2JtR3pSb3plV3JuL1k1eVZnOWJGQXYycm5oOWNOeXJUa0kyRDY1VnpPTjF5bGlUYTlWei9kSzUyZWtKNjJhWVVpUXc5cFhjemdwQnk3emFuSTBsQ3BiR2EvYjZyKzdac3ZYczBMNGUvODhLeHVXMFNpMXpsVjAvWFV0SDlXOTFNL0tNcXplY25wUHQwZUo5SVhIKzByUjEvNWY3ZkYyTGV2c3BvL25ldjRlRHRlMnVUbkxhRnRtbm5aUlFjemxMZE5xNWxsUVBCUUNraXVqbW8rbnJibzgrRlU4ODJ5OTgraEE5ZlZoWEg5KzcwRzduY2UvLytjTHgvY3ZWNzcvM3dwUHZYNjQrdnJjTHE5Ky92SEI4QyszKzVRWEhjK0xaZnVIVGgraXBEMjdpSHYyeUgzdDZ1ZnI5ZHhjT0VnVE9QR0hQazBtTXZKN1NYN2ZYK3RYUCt4TlR6N3RWeHo0MGU5cGpEVis4M0htZUsrUE50UzJ2U3ArT216MlZ4c0Q3K0Z6NGV3KzZTOHBvKzlaWno2ajdlWC9mK3pKYnZ1UTR1cDk2MUZjV0ZjL2RaZGp6cnErM25WKzd0NzdkODNyUnRlTmQvZVhhdUcwa0FBb09cIildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbNCAvKnlpZWxkKi8sIChfay5zZW50KCkpLmFycmF5QnVmZmVyKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICBfaC5hcHBseShfZywgX2ouY29uY2F0KFtfay5zZW50KCldKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBBc3luY1NpbmsuQXVkaW8ucmVnaXN0ZXIoXCJtb2IuXCIgKyB0aGlzLmVudGl0eUlEICsgXCIuc3RlcFwiLCBBc3luY1NpbmsuQXVkaW8uQ2F0ZWdvcnkuQU5JTUFMUywgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogXCJzb3VuZHMvbW9iL1wiLmNvbmNhdCh0aGlzLmVudGl0eUlELCBcIi9zdGVwLm9nZ1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGl0Y2g6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvbHVtZTogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtaW5nOiBmYWxzZSAvL3VzZSBmb3IgbGFyZ2UgYXVkaW8gZmlsZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZEFQSS5tYy5yZW5kZXJNYW5hZ2VyLmVudGl0eVJlbmRlck1hcC5wdXQoTW9kQVBJLnV0aWwuYXNDbGFzcyhkYXRhW1wiRW50aXR5XCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXSksIG5ldyBkYXRhW1wiUmVuZGVyXCIuY29uY2F0KHRoaXMuZW50aXR5SUQpXShNb2RBUEkubWMucmVuZGVyTWFuYWdlci5nZXRSZWYoKSwgbmV3IGRhdGFbXCJNb2RlbFwiLmNvbmNhdCh0aGlzLmVudGl0eUlEKV0oKSwgMC4zKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkucHJvbWlzaWZ5KE1vZEFQSS5tYy5yZW5kZXJFbmdpbmUuYmluZFRleHR1cmUpKGRhdGFbXCJcIi5jb25jYXQodGhpcy5lbnRpdHlJRCwgXCJUZXh0dXJlc1wiKV0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGVkIE9FbnRpdHkgdGV4dHVyZSBpbnRvIGNhY2hlLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTsgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB2YXIga2V5ID0gXCJPRW50aXR5LlwiLmNvbmNhdCh0aGlzLmVudGl0eUlEKTtcbiAgICAgICAgZ2xvYmFsVGhpc1trZXldID0gZGF0YTtcbiAgICB9O1xuICAgIE9FbnRpdHkucHJvdG90eXBlLmNyZWF0ZVNwYXduZWdnID0gZnVuY3Rpb24gKHRleHR1cmUpIHtcbiAgICAgICAgdmFyIHNwYXduRWdnID0gbmV3IE9JdGVtKFwiU3Bhd24gXCIuY29uY2F0KHRoaXMuZW50aXR5TmFtZSksIFwic3Bhd25lZ2dfXCIuY29uY2F0KHRoaXMuZW50aXR5SUQpLCA2NCwgdGV4dHVyZSwgZnVuY3Rpb24gKCkgeyB9LCBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGJsb2NrcG9zKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkJGJsb2NrcG9zKTtcbiAgICAgICAgICAgIHZhciBzcGF3bl94ID0gJCRibG9ja3Bvcy4keDtcbiAgICAgICAgICAgIHZhciBzcGF3bl95ID0gJCRibG9ja3Bvcy4keSArIDE7XG4gICAgICAgICAgICB2YXIgc3Bhd25feiA9ICQkYmxvY2twb3MuJHo7XG4gICAgICAgICAgICBPdmVuTURLX19leGVjdXRlQ29tbWFuZEFzKCQkcGxheWVyLCBcIi9zdW1tb24gRXhhbXBsZU9FbnRpdHkgXCIuY29uY2F0KHNwYXduX3gsIFwiIFwiKS5jb25jYXQoc3Bhd25feSwgXCIgXCIpLmNvbmNhdChzcGF3bl96KSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzcGF3bkVnZy5yZWdpc3Rlckl0ZW0oKTtcbiAgICAgICAgcmV0dXJuIHNwYXduRWdnO1xuICAgIH07XG4gICAgcmV0dXJuIE9FbnRpdHk7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgT0VudGl0eTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcbiAgICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG4vKlxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4gIE9JdGVtLnRzXG4gICAgXG4gIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE92ZW5NREsuXG5cbiAgICBPdmVuTURLIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXJcbiAgICB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWVcbiAgICBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pXG4gICAgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICBPdmVuTURLIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWVxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1NcbiAgICBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYWxvbmdcbiAgICB3aXRoIE92ZW4gTURLLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbnZhciBPSXRlbSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPSXRlbShpdGVtTmFtZSwgaXRlbUlELCBpdGVtU3RhY2ssIHRleHR1cmUsIG9uUmlnaHRDbGljaywgb25JdGVtVXNlKSB7XG4gICAgICAgIHRoaXMuaXRlbU5hbWUgPSBpdGVtTmFtZTtcbiAgICAgICAgdGhpcy5pdGVtSUQgPSBpdGVtSUQ7XG4gICAgICAgIHRoaXMuaXRlbVN0YWNrID0gaXRlbVN0YWNrO1xuICAgICAgICB0aGlzLml0ZW1UZXh0dXJlID0gdGV4dHVyZTtcbiAgICAgICAgdGhpcy5vblJpZ2h0Q2xpY2sgPSBvblJpZ2h0Q2xpY2s7XG4gICAgICAgIC8vIEFzc2lnbiBvcHRpb25hbCBvbkl0ZW1Vc2UgaWYgcHJvdmlkZWRcbiAgICAgICAgaWYgKG9uSXRlbVVzZSlcbiAgICAgICAgICAgIHRoaXMub25JdGVtVXNlID0gb25JdGVtVXNlO1xuICAgIH1cbiAgICBPSXRlbS5wcm90b3R5cGUucmVnaXN0ZXJDbGllbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciAkJGl0ZW1HZXRBdHRyaWJ1dGVzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIikubWV0aG9kcy5nZXRJdGVtQXR0cmlidXRlTW9kaWZpZXJzLm1ldGhvZDtcbiAgICAgICAgdmFyIGNyZWF0aXZlTWlzY1RhYjtcbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBjcmVhdGl2ZU1pc2NUYWIgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiKS5zdGF0aWNWYXJpYWJsZXMuTUlTQztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNyZWF0aXZlTWlzY1RhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCIpLnN0YXRpY1ZhcmlhYmxlcy50YWJNaXNjO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcbiAgICAgICAgdmFyIGl0ZW1TdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKGl0ZW1DbGFzcywgZnVuY3Rpb24gKGZuKSB7IHJldHVybiBmbi5sZW5ndGggPT09IDE7IH0pO1xuICAgICAgICB2YXIgaXRlbVN0YWNrID0gdGhpcy5pdGVtU3RhY2s7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gbm1pX092ZW5JdGVtKCkge1xuICAgICAgICAgICAgaXRlbVN1cGVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kc2V0Q3JlYXRpdmVUYWIoY3JlYXRpdmVNaXNjVGFiKTtcbiAgICAgICAgICAgIHRoaXMuJG1heFN0YWNrU2l6ZSA9IChpdGVtU3RhY2spO1xuICAgICAgICB9XG4gICAgICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKGl0ZW1DbGFzcywgbm1pX092ZW5JdGVtKTtcbiAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtUmlnaHRDbGljayA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKVxuICAgICAgICAgICAgICAgICAgICAoJCRwbGF5ZXIpLiRzZXRJdGVtSW5Vc2UoJCRpdGVtc3RhY2ssIDMyKTtcbiAgICAgICAgICAgICAgICB2YXIgJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyO1xuICAgICAgICAgICAgICAgIHNlbGYub25SaWdodENsaWNrKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGllbnQgaXRlbXN0YWNrOlwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgkJGl0ZW1zdGFjayk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIDtcbiAgICAgICAgaWYgKE1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICB2YXIgJCRSZXN1bHRFbnVtID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeU5hbWUoXCJFbnVtQWN0aW9uUmVzdWx0XCIpLnN0YXRpY1ZhcmlhYmxlcztcbiAgICAgICAgICAgIHZhciAkJEFjdGlvblJlc3VsdCA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlOYW1lKFwiQWN0aW9uUmVzdWx0XCIpLmNvbnN0cnVjdG9yc1swXTtcbiAgICAgICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVJpZ2h0Q2xpY2sgPSBmdW5jdGlvbiAoJCR3b3JsZCwgJCRwbGF5ZXIsICRoYW5kRW51bSwgJHVudXNlZCkge1xuICAgICAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjayA9ICgkJHBsYXllcikuJGdldEhlbGRJdGVtKCRoYW5kRW51bSk7XG4gICAgICAgICAgICAgICAgKCQkcGxheWVyKS4kc2V0QWN0aXZlSGFuZCgkaGFuZEVudW0pO1xuICAgICAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXI7XG4gICAgICAgICAgICAgICAgc2VsZi5vblJpZ2h0Q2xpY2soJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWVudCBpdGVtc3RhY2s6XCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCQkQWN0aW9uUmVzdWx0KCQkUmVzdWx0RW51bS5TVUNDRVNTLCAkJGl0ZW1zdGFjaykpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIU1vZEFQSS5pc18xXzEyKSB7XG4gICAgICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkl0ZW1Vc2UwID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHBsYXllciwgJCR3b3JsZCwgJCRibG9ja3Bvcykge1xuICAgICAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIsICQkYmxvY2twb3M7XG4gICAgICAgICAgICAgICAgc2VsZi5vbkl0ZW1Vc2UoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGJsb2NrcG9zKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWVudCBpdGVtc3RhY2s6XCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCQkaXRlbXN0YWNrKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgO1xuICAgICAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgICAgIHZhciAkJFJlc3VsdEVudW0gPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5TmFtZShcIkVudW1BY3Rpb25SZXN1bHRcIikuc3RhdGljVmFyaWFibGVzO1xuICAgICAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtVXNlID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHBsYXllciwgJCR3b3JsZCwgJCRibG9ja3Bvcykge1xuICAgICAgICAgICAgICAgIHZhciAkJGl0ZW1zdGFjaywgJCRwbGF5ZXIsICQkd29ybGQsICQkYmxvY2twb3M7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub25JdGVtVXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub25JdGVtVXNlKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRibG9ja3Bvcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAkJFJlc3VsdEVudW0uUEFTUztcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25VcGRhdGUgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyLCAkJGhvdGJhcl9zbG90LCAkJGlzX2hlbGQpIHtcbiAgICAgICAgICAgICQkaXNfaGVsZCA9ICgkJGlzX2hlbGQpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuICgkJGl0ZW1zdGFjayk7XG4gICAgICAgIH07XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVVzZUZpbmlzaCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoJCRpdGVtc3RhY2spO1xuICAgICAgICB9O1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRnZXRNYXhJdGVtVXNlRHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gMzI7XG4gICAgICAgIH07XG4gICAgICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldEl0ZW1BdHRyaWJ1dGVNb2RpZmllcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJCRhdHRyaWJ1dGVtYXAgPSAkJGl0ZW1HZXRBdHRyaWJ1dGVzLmFwcGx5KHRoaXMsIFtdKTtcbiAgICAgICAgICAgIHJldHVybiAkJGF0dHJpYnV0ZW1hcDtcbiAgICAgICAgfTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kZ2V0U3RyVnNCbG9jayA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCRibG9jaykge1xuICAgICAgICAgICAgcmV0dXJuIDEuMDtcbiAgICAgICAgfTtcbiAgICAgICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25DcmVhdGVkID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkJsb2NrRGVzdHJveWVkID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJGJsb2NrLCAkJGJsb2NrcG9zLCAkJGVudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBpbnRlcm5hbF9yZWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaXRlbUluc3RhbmNlID0gbmV3IG5taV9PdmVuSXRlbSgpLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKF90aGlzLml0ZW1JRCkpO1xuICAgICAgICAgICAgaXRlbUNsYXNzLnN0YXRpY01ldGhvZHMucmVnaXN0ZXJJdGVtLm1ldGhvZChNb2RBUEkua2V5Z2VuLml0ZW0oX3RoaXMuaXRlbUlEKSwgTW9kQVBJLnV0aWwuc3RyKF90aGlzLml0ZW1JRCksIGl0ZW1JbnN0YW5jZSk7XG4gICAgICAgICAgICBNb2RBUEkuaXRlbXNbXCJcIi5jb25jYXQoc2VsZi5pdGVtSUQpXSA9IGl0ZW1JbnN0YW5jZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW1JbnN0YW5jZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyZWQgT3Zlbk1ESyBpdGVtICggY2xpZW50IHNpZGUgKVwiKTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtSW5zdGFuY2U7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChNb2RBUEkuaXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbF9yZWcoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsX3JlZyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9JdGVtLnByb3RvdHlwZS5yZWdpc3Rlckl0ZW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmLCBjdXN0b21faXRlbTtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgY3VzdG9tX2l0ZW0gPSBuZXcgT0l0ZW0odGhpcy5pdGVtTmFtZSwgdGhpcy5pdGVtSUQsIHRoaXMuaXRlbVN0YWNrLCB0aGlzLml0ZW1UZXh0dXJlLCB0aGlzLm9uUmlnaHRDbGljaywgdGhpcy5vbkl0ZW1Vc2UpLnJlZ2lzdGVyQ2xpZW50KCk7XG4gICAgICAgICAgICAgICAgTW9kQVBJLmRlZGljYXRlZFNlcnZlci5hcHBlbmRDb2RlKFwiZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckl0ZW0oXFxcIlwiLmNvbmNhdCh0aGlzLml0ZW1JRCwgXCJcXFwiLCBcIikuY29uY2F0KHRoaXMuaXRlbVN0YWNrLCBcIiwgXCIpLmNvbmNhdCh0aGlzLm9uUmlnaHRDbGljaywgXCIsIFwiKS5jb25jYXQodGhpcy5vbkl0ZW1Vc2UsIFwiKTtcIikpO1xuICAgICAgICAgICAgICAgIGlmIChNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBidWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3Npbms6cmVnaXN0ZXJpdGVtc1wiLCBmdW5jdGlvbiAocmVuZGVySXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckl0ZW0ucmVnaXN0ZXJJdGVtKGN1c3RvbV9pdGVtLCBNb2RBUEkudXRpbC5zdHIoXCJcIi5jb25jYXQoc2VsZi5pdGVtSUQpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5MMTBOLnNldChcIml0ZW0uXCIuY29uY2F0KHNlbGYuaXRlbUlELCBcIi5uYW1lXCIpLCBcIlwiLmNvbmNhdChzZWxmLml0ZW1OYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3luY1Npbmsuc2V0RmlsZShcInJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvbW9kZWxzL2l0ZW0vXCIuY29uY2F0KHNlbGYuaXRlbUlELCBcIi5qc29uXCIpLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJlbnRcIjogXCJpdGVtL2dlbmVyYXRlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dHVyZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxheWVyMFwiOiBcIml0ZW1zL1wiLmNvbmNhdCh0aGlzLml0ZW1JRClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChzZWxmLml0ZW1UZXh0dXJlKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzeW5jU2luay5zZXRGaWxlKFwicmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC90ZXh0dXJlcy9pdGVtcy9cIiArIHNlbGYuaXRlbUlEICsgXCIucG5nXCIsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFNb2RBUEkuaXNfMV8xMikge1xuICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3NpbmtcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBidWZmZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImxpYjphc3luY3Npbms6cmVnaXN0ZXJpdGVtc1wiLCBmdW5jdGlvbiAocmVuZGVySXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckl0ZW0ucmVnaXN0ZXJJdGVtKGN1c3RvbV9pdGVtLCBNb2RBUEkudXRpbC5zdHIoc2VsZi5pdGVtSUQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLkwxME4uc2V0KFwiaXRlbS5cIi5jb25jYXQoc2VsZi5pdGVtSUQsIFwiLm5hbWVcIiksIHNlbGYuaXRlbU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9pdGVtL1wiLmNvbmNhdChzZWxmLml0ZW1JRCwgXCIuanNvblwiKSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyZW50XCI6IFwiYnVpbHRpbi9nZW5lcmF0ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRleHR1cmVzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXllcjBcIjogXCJpdGVtcy9cIi5jb25jYXQoc2VsZi5pdGVtSUQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpc3BsYXlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRoaXJkcGVyc29uX3JpZ2h0aGFuZFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6IFswLCAtOTAsIDU1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRpb25cIjogWzAsIDQsIDAuNV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNjYWxlXCI6IFswLjg1LCAwLjg1LCAwLjg1XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRoaXJkcGVyc29uX2xlZnRoYW5kXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjogWzAsIDkwLCAtNTVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGlvblwiOiBbMCwgNCwgMC41XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2NhbGVcIjogWzAuODUsIDAuODUsIDAuODVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmlyc3RwZXJzb25fcmlnaHRoYW5kXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjogWzAsIC05MCwgMjVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGlvblwiOiBbMS4xMywgMy4yLCAxLjEzXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2NhbGVcIjogWzAuNjgsIDAuNjgsIDAuNjhdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmlyc3RwZXJzb25fbGVmdGhhbmRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOiBbMCwgOTAsIC0yNV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0aW9uXCI6IFsxLjEzLCAzLjIsIDEuMTNdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzY2FsZVwiOiBbMC42OCwgMC42OCwgMC42OF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHNlbGYuaXRlbVRleHR1cmUpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5hcnJheUJ1ZmZlcigpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXCJyZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L3RleHR1cmVzL2l0ZW1zL1wiLmNvbmNhdChzZWxmLml0ZW1JRCwgXCIucG5nXCIpLCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBPSXRlbTtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBPSXRlbTtcbiIsIi8qXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICAgIE92ZW4udHNcbiAgICBcbiAgICBDb3B5cmlnaHQgMjAyNSBCZW5kaWVHYW1lcyBhbmQgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICAgIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE92ZW5NREsuXG5cbiAgICBPdmVuTURLIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXJcbiAgICB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWVcbiAgICBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pXG4gICAgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICBPdmVuTURLIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWVxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1NcbiAgICBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYWxvbmdcbiAgICB3aXRoIE92ZW4gTURLLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbnZhciBPdmVuID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE92ZW4oKSB7XG4gICAgfVxuICAgIE92ZW4ucmVnaXN0ZXJNb2QgPSBmdW5jdGlvbiAobW9kQ2xhc3MpIHtcbiAgICAgICAgTW9kQVBJLm1ldGEudGl0bGUobW9kQ2xhc3MudGl0bGUpO1xuICAgICAgICBNb2RBUEkubWV0YS52ZXJzaW9uKG1vZENsYXNzLnZlcnNpb24pO1xuICAgICAgICBNb2RBUEkubWV0YS5kZXNjcmlwdGlvbihtb2RDbGFzcy5kZXNjcmlwdGlvbik7XG4gICAgICAgIE1vZEFQSS5tZXRhLmNyZWRpdHMobW9kQ2xhc3MuY3JlZGl0cyk7XG4gICAgICAgIE1vZEFQSS5tZXRhLmljb24obW9kQ2xhc3MuaWNvbik7XG4gICAgICAgIE1vZEFQSS5tZXRhLmNvbmZpZyhtb2RDbGFzcy5jb25maWcoKSk7XG4gICAgICAgIG1vZENsYXNzLmluaXQoKTtcbiAgICAgICAgZ2xvYmFsVGhpcy5EZWJ1Z19tb2RlID0gbW9kQ2xhc3MuRGVidWdfbW9kZTtcbiAgICAgICAgLyppZiAobW9kQ2xhc3Mub25seV8xXzEyXzIgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBJbGwgZG8gc29tZSBtb3JlIHN0dWZmIGxhdGVyXG4gICAgICAgIH0qL1xuICAgICAgICB0aGlzLm1vZHMucHVzaChtb2RDbGFzcyk7XG4gICAgfTtcbiAgICBPdmVuLm1vZHMgPSBbXTtcbiAgICByZXR1cm4gT3Zlbjtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBPdmVuO1xuIiwiLypcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICBPdmVuIE1vZCBEZXZlbG9wbWVudCBLaXQgKE92ZW5NREspIFJ1bnRpbWVcbiAgRGV2IGtpdCB1c2VkIGZvciBzaW1wbGlmeWluZyBFYWdsZXJGb3JnZSBtb2QgZGV2ZWxvcG1lbnQuXG4gICAgXG4gIENvcHlyaWdodCAyMDI1IEJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXG4gICAgTGljZW5jZWQgdW5kZXIgR05VIExHUEwtMy4wLW9yLWxhdGVyXG4gIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblxuICAgIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIE92ZW5NREsuXG5cbiAgICBPdmVuTURLIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXQgdW5kZXJcbiAgICB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnkgdGhlIEZyZWVcbiAgICBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pXG4gICAgYW55IGxhdGVyIHZlcnNpb24uXG5cbiAgICBPdmVuTURLIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dCBXSVRIT1VUIEFOWVxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1NcbiAgICBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG5cbiAgICBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYWxvbmdcbiAgICB3aXRoIE92ZW4gTURLLiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuKi9cbnZhciBPdmVuT3JlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE92ZW5PcmUoYmxvY2tJRCwgdmVpblNpemUsIHZlaW5Db3VudCwgbWluR2VuZXJhdGlvbkhlaWdodCwgbWF4R2VuZXJhdGlvbkhlaWdodCkge1xuICAgICAgICB0aGlzLmJsb2NrSUQgPSBibG9ja0lEO1xuICAgICAgICB0aGlzLnZlaW5TaXplID0gdmVpblNpemU7XG4gICAgICAgIHRoaXMudmVpbkNvdW50ID0gdmVpbkNvdW50O1xuICAgICAgICB0aGlzLm1pbkdlbmVyYXRpb25IZWlnaHQgPSBtaW5HZW5lcmF0aW9uSGVpZ2h0O1xuICAgICAgICB0aGlzLm1heEdlbmVyYXRpb25IZWlnaHQgPSBtYXhHZW5lcmF0aW9uSGVpZ2h0O1xuICAgIH1cbiAgICBPdmVuT3JlLnByb3RvdHlwZS5yZWdpc3Rlck92ZW5PcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJPdmVuT3JlU2VydmVyKFxcXCJcIi5jb25jYXQodGhpcy5ibG9ja0lELCBcIlxcXCIsXCIpLmNvbmNhdCh0aGlzLnZlaW5TaXplLCBcIixcIikuY29uY2F0KHRoaXMudmVpbkNvdW50LCBcIixcIikuY29uY2F0KHRoaXMubWluR2VuZXJhdGlvbkhlaWdodCwgXCIsXCIpLmNvbmNhdCh0aGlzLm1heEdlbmVyYXRpb25IZWlnaHQsIFwiKTtcIikpO1xuICAgIH07XG4gICAgcmV0dXJuIE92ZW5PcmU7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgT3Zlbk9yZTtcbiIsIi8qXG4gICAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuICAgIGNvbW1hbmRzLnRzXG4gICAgXG4gICAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKVxuICAgIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgT3Zlbk1ESyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXQgV0lUSE9VVCBBTllcbiAgICBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nXG4gICAgd2l0aCBPdmVuIE1ESy4gSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiovXG5leHBvcnQgZnVuY3Rpb24gc2ltcGxlY29tbWFuZChwcmVmaXgsIG5hbWUsIG9uRXhlY3V0ZSkge1xuICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwic2VuZGNoYXRtZXNzYWdlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLm1lc3NhZ2UudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKFwiXCIuY29uY2F0KHByZWZpeCkuY29uY2F0KG5hbWUpKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XG4gICAgICAgICAgICBvbkV4ZWN1dGUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKlxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4gIE92ZW4gTW9kIERldmVsb3BtZW50IEtpdCAoT3Zlbk1ESykgUnVudGltZVxuICBEZXYga2l0IHVzZWQgZm9yIHNpbXBsaWZ5aW5nIEVhZ2xlckZvcmdlIG1vZCBkZXZlbG9wbWVudC5cbiAgICBcbiAgQ29weXJpZ2h0IDIwMjUgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcbiAgICBMaWNlbmNlZCB1bmRlciBHTlUgTEdQTC0zLjAtb3ItbGF0ZXJcbiAgfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxuXG4gICAgVGhpcyBmaWxlIGlzIHBhcnQgb2YgT3Zlbk1ESy5cblxuICAgIE92ZW5NREsgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeSBpdCB1bmRlclxuICAgIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieSB0aGUgRnJlZVxuICAgIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbilcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZXG4gICAgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTU1xuICAgIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZ1xuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuaW1wb3J0IGljb24gZnJvbSBcIkFTU0VUUy9kZWZhdWx0SWNvbi5wbmdcIjtcbk1vZEFQSS5tZXRhLnRpdGxlKFwiT3Zlbk1ESyBSdW50aW1lXCIpO1xuTW9kQVBJLm1ldGEudmVyc2lvbihcIkFscGhhIHYwLjJcIik7XG5Nb2RBUEkubWV0YS5kZXNjcmlwdGlvbihcIlVub2ZmaWNpYWwgZGV2IGtpdCB1c2VkIGZvciBzaW1wbGlmeWluZyBFYWdsZXJGb3JnZSBtb2QgZGV2ZWxvcG1lbnQuXCIpO1xuTW9kQVBJLm1ldGEuY3JlZGl0cyhcIkJlbmRpZUdhbWVzIGFuZCBCbG9ja18yMjIyXCIpO1xuTW9kQVBJLm1ldGEuaWNvbihpY29uKTtcbmltcG9ydCB7IHJlZ2lzdGVyU2VydmVySXRlbSwgcmVnaXN0ZXJTZXJ2ZXJCbG9jaywgcmVnaXN0ZXJFbnRpdHlTZXJ2ZXIsIE92ZW5NREtfX2RlZmluZUV4ZWNDbWRBc0dsb2JhbCwgcmVnaXN0ZXJPdmVuT3JlU2VydmVyLCB9IGZyb20gXCJjbGFzc2VzL2NvcmUvSGVscGVyX2Z1bmNcIjtcbmltcG9ydCBPSXRlbSBmcm9tIFwiY2xhc3Nlcy9jb3JlL09JdGVtXCI7XG5pbXBvcnQgT01vZCBmcm9tIFwiY2xhc3Nlcy9jb3JlL01vZFwiO1xuaW1wb3J0IE92ZW4gZnJvbSBcImNsYXNzZXMvY29yZS9PdmVuXCI7XG5pbXBvcnQgT0Jsb2NrIGZyb20gXCJjbGFzc2VzL2NvcmUvT0Jsb2NrXCI7XG5pbXBvcnQgeyBzaW1wbGVjb21tYW5kIH0gZnJvbSBcImNsYXNzZXMvY29yZS9jb21tYW5kc1wiO1xuaW1wb3J0IE9FbnRpdHkgZnJvbSBcIi4vY2xhc3Nlcy9jb3JlL09FbnRpdHlcIjtcbmltcG9ydCBPdmVuT3JlIGZyb20gXCJjbGFzc2VzL2NvcmUvT3Zlbk9yZVwiO1xudmFyIGRldm1vZGUgPSB0cnVlO1xuTW9kQVBJLmV2ZW50cy5uZXdFdmVudChcImxpYjpPdmVuTURLOmxvYWRcIik7XG5Nb2RBUEkuZXZlbnRzLm5ld0V2ZW50KFwibGliOk92ZW5NREs6bG9hZGVkXCIpO1xuTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJsaWI6T3Zlbk1ESzpsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhcIk92ZW5NREsgUnVudGltZSBpcyBsb2FkaW5nXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiTG9hZGluZyBPdmVuTURLIGdsb2JhbHNcIik7XG4gICAgZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckl0ZW0gPSByZWdpc3RlclNlcnZlckl0ZW07XG4gICAgZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckJsb2NrID0gcmVnaXN0ZXJTZXJ2ZXJCbG9jaztcbiAgICBnbG9iYWxUaGlzLnJlZ2lzdGVyRW50aXR5U2VydmVyID0gcmVnaXN0ZXJFbnRpdHlTZXJ2ZXI7XG4gICAgZ2xvYmFsVGhpcy5PSXRlbSA9IE9JdGVtO1xuICAgIGdsb2JhbFRoaXMuT01vZCA9IE9Nb2Q7XG4gICAgZ2xvYmFsVGhpcy5PdmVuTURLID0gT3ZlbjtcbiAgICBnbG9iYWxUaGlzLk9CbG9jayA9IE9CbG9jaztcbiAgICBnbG9iYWxUaGlzLnNpbXBsZWNvbW1hbmQgPSBzaW1wbGVjb21tYW5kO1xuICAgIGdsb2JhbFRoaXMuT3Zlbk9yZSA9IE92ZW5PcmU7XG4gICAgZ2xvYmFsVGhpcy5yZWdpc3Rlck92ZW5PcmVTZXJ2ZXIgPSByZWdpc3Rlck92ZW5PcmVTZXJ2ZXI7XG4gICAgZ2xvYmFsVGhpcy5PRW50aXR5ID0gT0VudGl0eTtcbiAgICBpZiAoTW9kQVBJLmlzXzFfMTIpIHtcbiAgICAgICAgaWYgKCFkZXZtb2RlKSB7XG4gICAgICAgICAgICBhbGVydChcIk92ZW5NREsgZG9lcyBub3QgZnVsbHkgc3VwcG9ydCAxLjEyIGF0IHRoaXMgdGltZSwgcGxlYXNlIHVzZSAxLjguOCBmb3IgZnVsbCBzdXBwb3J0XCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCIxLjEyIGRldGVjdGVkXCIpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk92ZW5NREsgZG9lcyBub3QgZnVsbHkgc3VwcG9ydCAxLjEyIGF0IHRoaXMgdGltZSwgcGxlYXNlIHVzZSAxLjguOCBmb3IgZnVsbCBzdXBwb3J0XCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiT3Zlbk1ESyBnbG9iYWxzIGhhdmUgYmVlbiBzZXQgYW5kIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZGVkaWNhdGVkU2VydmVyLmFwcGVuZENvZGUoXCJnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVySXRlbSA9IFwiLmNvbmNhdChyZWdpc3RlclNlcnZlckl0ZW0sIFwiO1wiKSk7XG4gICAgY29uc29sZS5sb2coXCJSZWdpc3RlciBJdGVtIHNlcnZlcnNpZGUgZnVuY3Rpb24gbG9hZGVkXCIpO1xuICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJPdmVuT3JlU2VydmVyID0gXCIuY29uY2F0KHJlZ2lzdGVyT3Zlbk9yZVNlcnZlciwgXCI7XCIpKTtcbiAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyIE92ZW4gT3JlIHNlcnZlcnNpZGUgZnVuY3Rpb24gbG9hZGVkXCIpO1xuICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShPdmVuTURLX19kZWZpbmVFeGVjQ21kQXNHbG9iYWwpO1xuICAgIE92ZW5NREtfX2RlZmluZUV4ZWNDbWRBc0dsb2JhbCgpO1xuICAgIGNvbnNvbGUubG9nKFwiT3Zlbk1ES19fRXhlY0NtZEFzR2xvYmFsIHNlcnZlcnNpZGUgYW5kIGNsaWVudHNpZGUgZnVuY3Rpb24gbG9hZGVkXCIpO1xuICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJTZXJ2ZXJCbG9jayA9IFwiLmNvbmNhdChyZWdpc3RlclNlcnZlckJsb2NrLCBcIjtcIikpO1xuICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXIgRW50aXR5IHNlcnZlcnNpZGUgZnVuY3Rpb24gbG9hZGVkXCIpO1xuICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShcImdsb2JhbFRoaXMucmVnaXN0ZXJFbnRpdHlTZXJ2ZXIgPSBcIi5jb25jYXQocmVnaXN0ZXJFbnRpdHlTZXJ2ZXIsIFwiO1wiKSk7XG4gICAgY29uc29sZS5sb2coXCJSZWdpc3RlciBCbG9jayBzZXJ2ZXJzaWRlIGZ1bmN0aW9uIGxvYWRlZFwiKTtcbiAgICBNb2RBUEkuZXZlbnRzLmNhbGxFdmVudChcImxpYjpPdmVuTURLOmxvYWRlZFwiLCB7fSk7XG59KTtcbk1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOk92ZW5NREs6bG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZyhcIk92ZW5NREsgUnVudGltZSBoYXMgZmluaXNoZWQgbG9hZGluZ1wiKTtcbiAgICBjb25zb2xlLmxvZyhcIlxcbiAgICBcXHUyNTBDXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTEwXFxuICAgIFxcdTI1MDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgIE92ZW5NREsgaGFzIGxvYWRlZCAgICAgICAgICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICB3ZWxjb21lIHRvIG92ZW5NREsgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgQSBtb2QgZGV2IGtpdCBmb3Igc3RhcnRlcnMgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcdTI1MDJcXG4gICAgXFx1MjUwMiAgIFZlcnNpb246IHYwLjIgICAgICAgICAgICAgICAgICAgXFx1MjUwMlxcbiAgICBcXHUyNTAyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXHUyNTAyXFxuICAgIFxcdTI1MTRcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MDBcXHUyNTAwXFx1MjUwMFxcdTI1MThcXG4gICAgXCIpO1xuICAgIHNpbXBsZWNvbW1hbmQoXCIvb3Zlbm1ka1wiLCBcImxvZ18xXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgTW9kQVBJLmRpc3BsYXlUb0NoYXQoXCJcXG4gICAgICBPdmVuTURLIFJ1bnRpbWUgdjAuMVxcbiAgICAgIE1hZGUgYnkgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcXG4gICAgICAtIEFkZGVkIGJhc2ljIGNvcmUgY2xhc3Nlc1xcbiAgICAgICggTm90IG11Y2ggY2FuIGJlIGRvY3VtZW50ZWQgZHVlIHRvIHNvIGxpdHRsZSBiZWluZyBhZGRlZCApXCIpO1xuICAgIH0pO1xuICAgIHNpbXBsZWNvbW1hbmQoXCIvb3Zlbm1ka1wiLCBcImxvZ18yXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgTW9kQVBJLmRpc3BsYXlUb0NoYXQoXCJcXG4gICAgICBPdmVuTURLIFJ1bnRpbWUgdjAuMlxcbiAgICAgIE1hZGUgYnkgQmVuZGllR2FtZXMgYW5kIEJsb2NrXzIyMjJcXG4gICAgICAtIEFkZGVkIHN1cHBvcnQgZm9yIDEuMTJcXG4gICAgICAtIEFkZGVkIHN1cHBvcnQgZm9yIE92ZW5PcmVcXG4gICAgICAtIEFkZGVkIHN1cHBvcnQgZm9yIE9FbnRpdHlcXG4gICAgICAtIFFPTCBpbXByb3ZlbWVudHNcXG4gICAgICAtIEFkZGVkIHN1cHBvcnQgZm9yIE92ZW5NREtfX0V4ZWNDbWRBc0dsb2JhbFxcbiAgICAgIC0gQWRkZWQgc3VwcG9ydCBmb3IgT3Zlbk1ES19fZGVmaW5lRXhlY0NtZEFzR2xvYmFsXFxuICAgICAgLSBBZGRlZCBzdXBwb3J0IGZvciBzaW1wbGVjb21tYW5kc1wiKTtcbiAgICB9KTtcbn0pO1xuTW9kQVBJLmFkZENyZWRpdChcIk92ZW5NREsgQ29kaW5nIGxlYWRcIiwgXCJCZW5kaWVHYW1lc1wiLCBcIiAtIE1hZGUgT3Zlbk1ES1xcbiAtIENvZGVkIG1vc3Qgb2YgT3Zlbk1ES1wiKTtcbk1vZEFQSS5hZGRDcmVkaXQoXCJPdmVuTURLIEZvdW5kZXJcIiwgXCJCbG9ja18yMjIyXCIsIFwiIC0gRm91bmRlZCBPdmVuTURLXCIpO1xuTW9kQVBJLmV2ZW50cy5jYWxsRXZlbnQoXCJsaWI6T3Zlbk1ESzpsb2FkXCIsIHt9KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==