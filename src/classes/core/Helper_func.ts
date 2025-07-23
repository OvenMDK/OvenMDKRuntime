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
    if (!ModAPI.is_1_12) {
        const creativeMiscTab: any = ModAPI.reflect.getClassById(
            "net.minecraft.creativetab.CreativeTabs"
        ).staticVariables.tabMisc;
    }
    if (ModAPI.is_1_12) {
        const creativeMiscTab: any = ModAPI.reflect.getClassById(
            "net.minecraft.creativetab.CreativeTabs"
        ).staticVariables.MISC;
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

    nmi_OvenItem.prototype.$onItemRightClick = function (
        $$itemstack: any,
        $$world: any,
        $$player: any
    ): void {
        ($$player).$setItemInUse($$itemstack, 32);
        var $$itemstack, $$world, $$player;
        //onRightClick($$itemstack);
        console.log(`server itemstack:`);
        console.log($$itemstack);
        return ($$itemstack);
    };
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
        var itemInstance: any = new nmi_OvenItem().$setUnlocalizedName(
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

    const creativeTab = ModAPI.reflect.getClassById(
        "net.minecraft.creativetab.CreativeTabs"
    ).staticVariables.tabBlock;

    const blockSuper = ModAPI.reflect.getSuper(
        BlockClass,
        (fn: Function) => fn.length === 2
    );
    const breakBlockMethod = BlockClass.methods.breakBlock.method;



    function CustomBlock(this: any): void {
        blockSuper(this, ModAPI.materials.rock.getRef());
        if (!ModAPI.is_1_12) {
            this.$defaultBlockState = this.$blockState.$getBaseState();
        }
        this.$setCreativeTab(creativeTab);
    }

    ModAPI.reflect.prototypeStack(BlockClass, CustomBlock);

    CustomBlock.prototype.$breakBlock = function (
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
            const custom_block = new CustomBlock()
                .$setHardness(3.0)
                .$setStepSound(BlockClass.staticVariables.soundTypePiston)
                .$setUnlocalizedName(ModAPI.util.str(this.blockID));
        }
        if (ModAPI.is_1_12) {
            const custom_block = new CustomBlock()
                .$setHardness(3.0)
                .$setSoundType(ModAPI.blockSounds.PLANT.getRef())
                .$setUnlocalizedName(ModAPI.util.str(this.blockID));
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

    if (ModAPI.materials) {
        return internalRegister();
    } else {
        ModAPI.addEventListener("bootstrap", internalRegister);
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