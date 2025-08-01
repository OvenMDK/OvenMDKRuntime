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
export function registerServerItem(itemID: string, itemStack: number, onRightClick: ($$itemstack: any) => void) {
    /*if (isServer === false) {
        console.log("registerServerItem can only be used on the server side.");
        return;
    }*/

    let creativeMiscTab: any;
    if (ModAPI.is_1_12) {
        creativeMiscTab = ModAPI.reflect.getClassById(
            "net.minecraft.creativetab.CreativeTabs"
        ).staticVariables.MISC;
    } else {
        creativeMiscTab = ModAPI.reflect.getClassById(
            "net.minecraft.creativetab.CreativeTabs"
        ).staticVariables.tabMisc;
    }

    const $$itemGetAttributes = ModAPI.reflect.getClassById("net.minecraft.item.Item").methods.getItemAttributeModifiers.method;
    const itemClass: any = ModAPI.reflect.getClassById(
        "net.minecraft.item.Item"
    );
    const itemSuper: any = ModAPI.reflect.getSuper(
        itemClass,
        (fn: Function) => fn.length === 1
    );

    /*if (isServer === true) {
        console.log("using server side registerServerItem"); 
    }*/

    function nmi_OvenItem(this: any): void {
        itemSuper(this);
        this.$setCreativeTab(creativeMiscTab);
        this.$maxStackSize = (itemStack);
    }

    ModAPI.reflect.prototypeStack(itemClass, nmi_OvenItem);

    if (!ModAPI.is_1_12) {
        nmi_OvenItem.prototype.$onItemRightClick = function (
            $$itemstack: any,
            $$world: any,
            $$player: any
        ): void {
            if (!ModAPI.is_1_12) ($$player).$setItemInUse($$itemstack, 32);
            var $$itemstack, $$world, $$player;
            //onRightClick($$itemstack);
            console.log(`server itemstack:`);
            console.log($$itemstack);
            return ($$itemstack);
        }
    };
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
        }
    }

    nmi_OvenItem.prototype.$onUpdate = function ($$itemstack, $$world, $$player, $$hotbar_slot, $$is_held) {
        $$is_held = ($$is_held) ? true : false;
        return ($$itemstack);
    }
    nmi_OvenItem.prototype.$onItemUseFinish = function ($$itemstack, $$world, $$player) {
        return ($$itemstack);
    }
    nmi_OvenItem.prototype.$getMaxItemUseDuration = function () {
        return 32;
    }
    nmi_OvenItem.prototype.$getItemAttributeModifiers = function () { //1.12 works i think
        var $$attributemap = $$itemGetAttributes.apply(this, []);
        return $$attributemap;
    }
    nmi_OvenItem.prototype.$getStrVsBlock = function ($$itemstack, $$block) {
        return 1.0;
    }
    nmi_OvenItem.prototype.$onCreated = function ($$itemstack, $$world, $$player) { //1.12 works
        return;
    }
    nmi_OvenItem.prototype.$onBlockDestroyed = function ($$itemstack, $$world, $$block, $$blockpos, $$entity) {
        return 0;
    }
    const internal_reg = (): any => {
        var itemInstance: any = (new nmi_OvenItem()).$setUnlocalizedName(
            ModAPI.util.str(`${itemID}`)
        );

        itemClass.staticMethods.registerItem.method(
            ModAPI.keygen.item(`${itemID}`),
            ModAPI.util.str(`${itemID}`),
            itemInstance
        );

        ModAPI.items[`${itemID}`] = itemInstance;
        console.log(itemInstance);
        console.log("Registered OvenMDK item ( Server Side )");

        return itemInstance;
    };

    if (ModAPI.items) {
        return internal_reg();
    } else {
        ModAPI.addEventListener("bootstrap", internal_reg);
    }
}
export function registerServerBlock(blockID: string, onBreak: ($world: any, $blockpos: any, $blockstate: any) => void) {
    /*if (ModAPI.isServer === false) {
        console.log("registerServerBlock can only be used on the server side.");
        return;
    }*/
    const BlockClass = ModAPI.reflect.getClassById("net.minecraft.block.Block");
    const ItemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
    let creativeTab: any;
    if (ModAPI.is_1_12) {
        creativeTab = ModAPI.reflect.getClassById(
            "net.minecraft.creativetab.CreativeTabs"
        ).staticVariables.BUILDING_BLOCKS;
    }
    if (!ModAPI.is_1_12) {
        creativeTab = ModAPI.reflect.getClassById(
            "net.minecraft.creativetab.CreativeTabs"
        ).staticVariables.tabBlock;
    }
    const blockSuper = ModAPI.reflect.getSuper(
        BlockClass,
        (fn: Function) => fn.length === 2
    );
    const breakBlockMethod = BlockClass.methods.breakBlock.method;



    function nmb_Oblock(this: any): void {
        blockSuper(this, ModAPI.materials.rock.getRef());
        if (!ModAPI.is_1_12) {
            this.$defaultBlockState = this.$blockState.$getBaseState();
        }
        this.$setCreativeTab(creativeTab);
    }

    ModAPI.reflect.prototypeStack(BlockClass, nmb_Oblock);

    nmb_Oblock.prototype.$breakBlock = function (
        $world: any,
        $blockpos: any,
        $blockstate: any
    ): boolean {
        //onBreak($world, $blockpos, $blockstate);
        return breakBlockMethod(this, $world, $blockpos, $blockstate);
    };
    function fixupBlockIds() {
        const blockRegistry = ModAPI.util
            .wrap(
                ModAPI.reflect.getClassById("net.minecraft.block.Block").staticVariables
                    .blockRegistry
            )
            .getCorrective();

        const BLOCK_STATE_IDS = ModAPI.util
            .wrap(
                ModAPI.reflect.getClassById("net.minecraft.block.Block").staticVariables
                    .BLOCK_STATE_IDS
            )
            .getCorrective();

        blockRegistry.registryObjects.hashTableKToV.forEach(
            (entry: { value: any }) => {
                if (entry) {
                    const block = entry.value;
                    const validStates = block.getBlockState().getValidStates();
                    const stateArray = validStates.array || [validStates.element];
                    stateArray.forEach((iblockstate: any) => {
                        const i =
                            (blockRegistry.getIDForObject(block.getRef()) << 4) |
                            block.getMetaFromState(iblockstate.getRef());
                        BLOCK_STATE_IDS.put(iblockstate.getRef(), i);
                    });
                }
            }
        );
    }
    const internalRegister = (): any => {
        let custom_block: any;
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
        BlockClass.staticMethods.registerBlock0.method(
            ModAPI.keygen.block(blockID),
            ModAPI.util.str(blockID),
            custom_block
        );

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
        } else {
            ModAPI.addEventListener("bootstrap", internalRegister);
        }
    }
    if (ModAPI.is_1_12) {
        var blockClass = ModAPI.reflect.getClassById("net.minecraft.block.Block");
        var itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        ModAPI.addEventListener("bootstrap", () => {
            var custom_block = new nmb_Oblock()
                .$setHardness(3.0)
                .$setSoundType(ModAPI.blockSounds.PLANT.getRef())
                .$setUnlocalizedName(ModAPI.util.str(blockID));
            blockClass.staticMethods.registerBlock0.method(
                ModAPI.keygen.block(blockID),
                ModAPI.util.str(blockID),
                custom_block
            );

            itemClass.staticMethods.registerItemBlock0.method(custom_block);

            fixupBlockIds();
            ModAPI.blocks[blockID] = custom_block;
            console.log("Registering block on server side");
            console.log(custom_block);
        });
    }
}
export function registerEntityServer(entityID: string, entityName: string, entityModel: string) {
    console.log("entities are not finished yet! Use at your own risk!")
    //return;
    ModAPI.hooks.methods.jl_String_format = ModAPI.hooks.methods.nlev_HString_format; //temporary thing to fix an issue in eaglercraft
    // Utils
    function AITask(name: string, length: number) {
        return ModAPI.reflect.getClassById("net.minecraft.entity.ai." + name).constructors.find(x => x.length === length);
    }
    const ResourceLocation = ModAPI.reflect.getClassByName("ResourceLocation").constructors.find(x => x.length === 1);
    const EntityPlayer = ModAPI.reflect.getClassByName("EntityPlayer");
    const GlStateManager = Object.fromEntries(Object.values(ModAPI.reflect.getClassByName("GlStateManager").staticMethods).map(x => [x.methodNameShort, x.method]));
    const SharedMonsterAttributes = ModAPI.reflect.getClassByName("SharedMonsterAttributes").staticVariables;

    // START CUSTOM ENTITY
    var entityClass = ModAPI.reflect.getClassById("net.minecraft.entity.passive.EntityAnimal");
    var entitySuper = ModAPI.reflect.getSuper(entityClass, (x) => x.length === 2);
    var nme_OEntity = function nme_OEntity(this: any, $worldIn: any) {
        entitySuper(this, $worldIn);
        this.wrapped ||= ModAPI.util.wrap(this).getCorrective();
        this.wrapped.setSize(0.4, 0.7);
        this.wrapped.tasks.addTask(0, AITask("EntityAISwimming", 1)(this));
        this.wrapped.tasks.addTask(1, AITask("EntityAIPanic", 2)(this, 1.9));
        this.wrapped.tasks.addTask(2, AITask("EntityAIMate", 2)(this, 1.0));
        this.wrapped.tasks.addTask(3, AITask("EntityAITempt", 4)(this, 1.5, ModAPI.items.bread.getRef(), 0)); //won't cause a problem as the bread is obtained when the entity is constructed.
        this.wrapped.tasks.addTask(4, AITask("EntityAIFollowParent", 2)(this, 1.2));
        this.wrapped.tasks.addTask(5, AITask("EntityAIWander", 2)(this, 1.1));
        this.wrapped.tasks.addTask(6, AITask("EntityAIWatchClosest", 3)(this, ModAPI.util.asClass(EntityPlayer.class), 6));
        this.wrapped.tasks.addTask(7, AITask("EntityAILookIdle", 1)(this));
    }
    ModAPI.reflect.prototypeStack(entityClass, nme_OEntity);
    nme_OEntity.prototype.$getEyeHeight = function (this: any) {
        this.wrapped ||= ModAPI.util.wrap(this).getCorrective();
        return this.wrapped.height;
    }

    const originalApplyEntityAttributes = nme_OEntity.prototype.$applyEntityAttributes;
    nme_OEntity.prototype.$applyEntityAttributes = function (this: any) {
        this.wrapped ||= ModAPI.util.wrap(this).getCorrective();
        originalApplyEntityAttributes.apply(this, []);
        this.wrapped.getEntityAttribute(SharedMonsterAttributes.maxHealth).setBaseValue(5);
        this.wrapped.getEntityAttribute(SharedMonsterAttributes.movementSpeed).setBaseValue(0.25);
    }

    const originalLivingUpdate = nme_OEntity.prototype.$onLivingUpdate;
    nme_OEntity.prototype.$onLivingUpdate = function (this: any) {
        this.wrapped ||= ModAPI.util.wrap(this).getCorrective();
        originalLivingUpdate.apply(this, []);
        if (this.wrapped.isInWater()) {
            this.wrapped.motionY *= 0.5;
            this.wrapped.getEntityAttribute(SharedMonsterAttributes.movementSpeed).setBaseValue(1.4);
        } else {
            this.wrapped.getEntityAttribute(SharedMonsterAttributes.movementSpeed).setBaseValue(0.25);
        }
    }

    nme_OEntity.prototype.$getLivingSound = function (this: any) {
        return ModAPI.util.str("mob." + entityID + ".quack");
    }
    nme_OEntity.prototype.$getHurtSound = function (this: any) {
        return ModAPI.util.str("mob." + entityID + ".quack");
    }
    nme_OEntity.prototype.$getDeathSound = function (this: any) {
        return ModAPI.util.str("mob." + entityID + ".quack");
    }
    nme_OEntity.prototype.$playStepSound = function (this: any) {
        this.wrapped ||= ModAPI.util.wrap(this).getCorrective();
        this.wrapped.playSound(ModAPI.util.str("mob." + entityID + ".step"), 0.2, 1);
    }
    nme_OEntity.prototype.$getDropItem = function (this: any) {
        return ModAPI.items.feather.getRef();
    }
    nme_OEntity.prototype.$createChild = function (this: any, otherParent: any) {
        this.wrapped ||= ModAPI.util.wrap(this).getCorrective();
        return new nme_OEntity(this.wrapped.worldObj?.getRef() ?? null);
    }
    nme_OEntity.prototype.$isBreedingItem = function (this: any, itemstack: any) {
        return itemstack !== null && itemstack.$getItem() === ModAPI.items.bread.getRef();
    }
    // END CUSTOM ENTITY


    // START CUSTOM MODEL
    var modelChickenClass = ModAPI.reflect.getClassById(`net.minecraft.client.model.${entityModel}`);
    var modelChickenSuper = ModAPI.reflect.getSuper(modelChickenClass); //while super isn't used when extending this class, java implies the call.
    var nmcm_OEntityModel = function nmcm_OEntityModel(this: any) {
        modelChickenSuper(this);
    }
    ModAPI.reflect.prototypeStack(modelChickenClass, nmcm_OEntityModel);
    // END CUSTOM MhODEL


    // START CUSTOM RENDERER
    var renderClass = ModAPI.reflect.getClassById("net.minecraft.client.renderer.entity.RenderLiving");
    var renderSuper = ModAPI.reflect.getSuper(renderClass, (x) => x.length === 4);
    const duckTextures = ResourceLocation(ModAPI.util.str(`textures/entity/${entityID}.png`));
    var nmcre_RenderOEntity = function nmcre_RenderOEntity(this: any, renderManager: any, modelBaseIn: any, shadowSizeIn: any) {
        renderSuper(this, renderManager, modelBaseIn, shadowSizeIn);
    }
    ModAPI.reflect.prototypeStack(renderClass, nmcre_RenderOEntity);
    nmcre_RenderOEntity.prototype.$getEntityTexture = function (this: any, entity: any) {
        return duckTextures;
    }
    nmcre_RenderOEntity.prototype.$handleRotationFloat = function (this: any, entity: any, partialTicks: any) {
        entity = ModAPI.util.wrap(entity);
        if ((!entity.onGround) && (!entity.isInWater())) {
            return 2; //falling
        } else {
            return 0;
        }
    }

    const ID = ModAPI.keygen.entity(entityID);
    ModAPI.reflect.getClassById("net.minecraft.entity.EntityList").staticMethods.addMapping0.method(
        ModAPI.util.asClass(nme_OEntity),
        {
            $createEntity: function ($worldIn: any) {
                return new nme_OEntity($worldIn);
            }
        },
        ModAPI.util.str(entityName),
        ID,
        0x5e3e2d, //egg base
        0x269166 //egg spots
    );

    const SpawnPlacementType = ModAPI.reflect.getClassById("net.minecraft.entity.EntityLiving$SpawnPlacementType").staticVariables;
    const ENTITY_PLACEMENTS = ModAPI.util.wrap(
        ModAPI.reflect.getClassById("net.minecraft.entity.EntitySpawnPlacementRegistry")
            .staticVariables.ENTITY_PLACEMENTS
    );
    ENTITY_PLACEMENTS.put(ModAPI.util.asClass(nme_OEntity), SpawnPlacementType.ON_GROUND);
    ModAPI.addEventListener('bootstrap', () => {
        const SpawnListEntry = ModAPI.reflect
            .getClassById("net.minecraft.world.biome.BiomeGenBase$SpawnListEntry")
            .constructors.find(x => x.length === 4);
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
        const duckSpawnSwamp = SpawnListEntry(ModAPI.util.asClass(nme_OEntity), 22, 3, 5);
        const duckSpawnRiverBed = SpawnListEntry(ModAPI.util.asClass(nme_OEntity), 10, 5, 9);
        const duckSpawnBeach = SpawnListEntry(ModAPI.util.asClass(nme_OEntity), 24, 2, 3);
        BiomeGenSwamp.spawnableCreatureList.add(duckSpawnSwamp);
        BiomeGenRiver.spawnableCreatureList.add(duckSpawnRiverBed);
        BiomeGenBeach.spawnableCreatureList.add(duckSpawnBeach);
    });




    return {
        [`Entity${this.entityID}`]: nme_OEntity,
        [`Model${this.entityID}`]: nmcm_OEntityModel,
        [`Render${this.entityID}`]: nmcre_RenderOEntity,
        [`${this.entityID}Textures`]: duckTextures
    }
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
export function OvenMDK__defineExecCmdAsGlobal() {
    var getServer = ModAPI.reflect.getClassById("net.minecraft.server.MinecraftServer").staticMethods.getServer?.method;
    globalThis.OvenMDK__executeCommandAs = function OvenMDK__executeCommandAs($commandsender, command, feedback) {
        var server = getServer ?
            getServer() : //1.8
            ModAPI.reflect.getClassById("net.minecraft.server.MinecraftServer").staticVariables.server; //1.12
        console.log(server);
        if (!server) { return };
        var commandManager = server.$commandManager;

        //lie a bit
        var x = $commandsender.$canCommandSenderUseCommand;
        $commandsender.$canCommandSenderUseCommand = () => 1;

        var y = $commandsender.$sendCommandFeedback;
        $commandsender.$sendCommandFeedback = feedback ? () => 1 : () => 0;

        const notifyOps0 = ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0;
        const notifyOps = ModAPI.hooks.methods.nmc_CommandBase_notifyOperators;
        const addChatMsg = $commandsender.$addChatMessage;

        if (!feedback) {
            ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0 = () => { };
            ModAPI.hooks.methods.nmc_CommandBase_notifyOperators = () => { };
            $commandsender.$addChatMessage = () => { };
        }

        try {
            commandManager.$executeCommand($commandsender, ModAPI.util.str(command));
        } catch (error) {
            console.error(error);
        }

        if (!feedback) {
            ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0 = notifyOps0;
            ModAPI.hooks.methods.nmc_CommandBase_notifyOperators = notifyOps;
            $commandsender.$addChatMessage = addChatMsg;
        }

        $commandsender.$canCommandSenderUseCommand = x;
        $commandsender.$sendCommandFeedback = y;
    }
}