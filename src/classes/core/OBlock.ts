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
export default class OBlock {
  private blockTexture: string;
  private blockName: string;
  private blockID: string;
  private blockInstance: any;
  private onBreak: (world: any, pos: any, state: any) => void;
  constructor(
    blockName: string,
    blockID: string,
    texture: string,
    onBreak: (world: any, pos: any, state: any) => void
  ) {
    this.blockName = blockName;
    this.blockID = blockID;
    this.blockTexture = texture;
    this.onBreak = onBreak;
  }

  public register(): any {
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

    const self = this;

    function CustomBlock(this: any): void {
      blockSuper(this, ModAPI.materials.rock.getRef());
      this.$defaultBlockState = this.$blockState.$getBaseState();
      this.$setCreativeTab(creativeTab);
    }

    ModAPI.reflect.prototypeStack(BlockClass, CustomBlock);

    CustomBlock.prototype.$breakBlock = function (
      $world: any,
      $blockpos: any,
      $blockstate: any
    ): boolean {
      self.onBreak($world, $blockpos, $blockstate);
      return breakBlockMethod(this, $world, $blockpos, $blockstate);
    };

    const internalRegister = (): any => {
      const custom_block = new CustomBlock()
        .$setHardness(3.0)
        .$setStepSound(BlockClass.staticVariables.soundTypePiston)
        .$setUnlocalizedName(ModAPI.util.str(this.blockID));

      BlockClass.staticMethods.registerBlock0.method(
        ModAPI.keygen.block(this.blockID),
        ModAPI.util.str(this.blockID),
        custom_block
      );

      ItemClass.staticMethods.registerItemBlock0.method(custom_block);

      this.fixupBlockIds();
      ModAPI.blocks[this.blockID] = custom_block;
      this.blockInstance = custom_block;
      console.log("Registered block on client: " + this.blockID);
      console.log(custom_block);
      return custom_block;
    };

    if (ModAPI.materials) {
      return internalRegister();
    } else {
      ModAPI.addEventListener("bootstrap", internalRegister);
    }
  }

  private fixupBlockIds(): void {
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

  public async registerBlock(): Promise<void> {
    var custom_block = new OBlock(this.blockName, this.blockID, this.blockTexture, this.onBreak).register();

    const self = this;

    ModAPI.dedicatedServer.appendCode(`globalThis.registerServerBlock("${this.blockID}", ${this.onBreak});`);

    ModAPI.addEventListener("lib:asyncsink", async () => {
      ModAPI.addEventListener(
        "lib:asyncsink:registeritems",
        (renderItem: any) => {
          renderItem.registerBlock(custom_block, ModAPI.util.str(self.blockID));
        }
      );

      AsyncSink.L10N.set(`tile.${self.blockID}.name`, self.blockName);
      console.log(`Set localization for block ${self.blockID}`);
      AsyncSink.setFile(
        `resourcepacks/AsyncSinkLib/assets/minecraft/models/block/${self.blockID}.json`,
        JSON.stringify({
          parent: "block/cube_all",
          textures: {
            all: `blocks/${self.blockID}`,
          },
        })
      );

      AsyncSink.setFile(
        `resourcepacks/AsyncSinkLib/assets/minecraft/models/item/${self.blockID}.json`,
        JSON.stringify({
          parent: `block/${self.blockID}`,
          display: {
            thirdperson: {
              rotation: [10, -45, 170],
              translation: [0, 1.5, -2.75],
              scale: [0.375, 0.375, 0.375],
            },
          },
        })
      );

      AsyncSink.setFile(
        `resourcepacks/AsyncSinkLib/assets/minecraft/blockstates/${self.blockID}.json`,
        JSON.stringify({
          variants: {
            normal: [
              {
                model: self.blockID,
              },
            ],
          },
        })
      );

      const response = await fetch(self.blockTexture);
      const buffer = await response.arrayBuffer();

      AsyncSink.setFile(
        `resourcepacks/AsyncSinkLib/assets/minecraft/textures/blocks/${self.blockID}.png`,
        buffer
      );
    });
  }
}
