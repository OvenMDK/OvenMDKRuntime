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
  private customModel: string;
  private droppedItem: string;
  constructor(
    blockName: string,
    blockID: string,
    texture: string,
    onBreak: (world: any, pos: any, state: any) => void,
    droppedItem: string,
    customModel: string
  ) {
    this.blockName = blockName;
    this.blockID = blockID;
    this.blockTexture = texture;
    this.onBreak = onBreak;
    this.droppedItem = droppedItem;
    this.customModel = customModel;
  }

  public register(): any {
    const BlockClass = ModAPI.reflect.getClassById("net.minecraft.block.Block");
    const ItemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
    var getDroppedItem = BlockClass.methods.getItemDropped.method;
    var quantityDropped = BlockClass.methods.quantityDropped.method;
    let creativeTab: any;
    if (!ModAPI.is_1_12) {
      creativeTab = ModAPI.reflect.getClassById(
        "net.minecraft.creativetab.CreativeTabs"
      ).staticVariables.tabBlock;
    }
    if (ModAPI.is_1_12) {
      creativeTab = ModAPI.reflect.getClassById(
        "net.minecraft.creativetab.CreativeTabs"
      ).staticVariables.BUILDING_BLOCKS;
    }
    const blockSuper = ModAPI.reflect.getSuper(
      BlockClass,
      (fn: Function) => fn.length === 2
    );
    const breakBlockMethod = BlockClass.methods.breakBlock.method;

    const self = this;

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
      return breakBlockMethod(this, $world, $blockpos, $blockstate);
    };
    var $$onBlockDestroyedByPlayerMethod = BlockClass.methods.onBlockDestroyedByPlayer.method;
    nmb_Oblock.prototype.$onBlockDestroyedByPlayer = function ($$world, $$blockpos, $$blockstate) {
      var $$world, $$blockpos, $$blockstate;
      self.onBreak.call($$world, $$blockpos, $$blockstate)
      return $$onBlockDestroyedByPlayerMethod(this, $$world, $$blockpos, $$blockstate);
    }
    if (self.droppedItem) {
      nmb_Oblock.prototype.$getItemDropped = function ($$blockstate, $$random, __efb2_arg_forture) {
        var __efb2_arg_forture;
        return ModAPI.items[self.droppedItem].getRef();
      }
    }
    const internalRegister = (): any => {
      let custom_block: any;
      if (!ModAPI.is_1_12) {
        custom_block = new nmb_Oblock()
          .$setHardness(3.0)
          .$setStepSound(BlockClass.staticVariables.soundTypePiston)
          .$setUnlocalizedName(ModAPI.util.str(this.blockID));
      }
      if (ModAPI.is_1_12) {
        custom_block = new nmb_Oblock()
          .$setHardness(-1.0)
          .$setSoundType(ModAPI.blockSounds.PLANT.getRef())
          .$setUnlocalizedName(ModAPI.util.str(this.blockID));
      }
      BlockClass.staticMethods.registerBlock0.method(
        ModAPI.keygen.block(this.blockID),
        ModAPI.util.str(this.blockID),
        custom_block
      );

      ItemClass.staticMethods.registerItemBlock0.method(custom_block);

      this.fixupBlockIds();
      ModAPI.blocks[this.blockID] = custom_block;
      this.blockInstance = custom_block;
      new globalThis.OvenMDKLogger("Registered block on client: " + this.blockID);
      new globalThis.OvenMDKLogger(custom_block);
      return custom_block;
    };
    if (!ModAPI.is_1_12) {
      if (ModAPI.materials) {
        if (this.droppedItem) {
          if (ModAPI.items[this.droppedItem]) {
            return internalRegister();
          } else {
            ModAPI.addEventListener("bootstrap", internalRegister);
          }
        } else {
          return internalRegister();
        }
      } else {
        ModAPI.addEventListener("bootstrap", internalRegister);
      }
    }
    if (ModAPI.is_1_12) {
      if (ModAPI.blocks) {
        return ((new nmb_Oblock()).$setHardness(-1.0).$setSoundType(ModAPI.blockSounds.PLANT.getRef()).$setUnlocalizedName(ModAPI.util.str(this.blockID)));
      }
    }
  }

  public fixupBlockIds(): any {
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
    let custom_block: any;
    if (!ModAPI.is_1_12) {
      custom_block = new OBlock(this.blockName, this.blockID, this.blockTexture, this.onBreak, this.droppedItem, this.customModel).register();
    }
    if (ModAPI.is_1_12) {
      var nmb_OBlock = new OBlock(this.blockName, this.blockID, this.blockTexture, this.onBreak, this.droppedItem, this.customModel).register();
      var itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
      var blockClass = ModAPI.reflect.getClassById("net.minecraft.block.Block");
      custom_block = nmb_OBlock
      blockClass.staticMethods.registerBlock0.method(
        ModAPI.keygen.block(this.blockID),
        ModAPI.util.str(this.blockID),
        custom_block
      );
      itemClass.staticMethods.registerItemBlock0.method(custom_block);
      new globalThis.OvenMDKLogger(custom_block || "Block registration failed");
    }
    const self = this;

    if (!ModAPI.is_1_12) {
      ModAPI.dedicatedServer.appendCode(`globalThis.registerServerBlock("${this.blockID}", ${this.onBreak}, "${this.droppedItem}");`);
      ModAPI.addEventListener("lib:asyncsink", async () => {
        ModAPI.addEventListener(
          "lib:asyncsink:registeritems",
          (renderItem: any) => {
            renderItem.registerBlock(custom_block, ModAPI.util.str(self.blockID));
          }
        );

        AsyncSink.L10N.set(`tile.${self.blockID}.name`, self.blockName);
        new globalThis.OvenMDKLogger(`Set localization for block ${self.blockID}`);
        if (!self.customModel) {
          AsyncSink.setFile(
            `resourcepacks/AsyncSinkLib/assets/minecraft/models/block/${self.blockID}.json`,
            JSON.stringify({
              parent: "block/cube_all",
              textures: {
                all: `blocks/${self.blockID}`,
              },
            })
          );
        } else {
          AsyncSink.setFile(
            `resourcepacks/AsyncSinkLib/assets/minecraft/models/block/${self.blockID}.json`,
            self.customModel
          );
        }
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
    if (ModAPI.is_1_12) {
      ModAPI.addEventListener("lib:asyncsink", async () => {
        ModAPI.addEventListener(
          "lib:asyncsink:registeritems",
          (renderItem: any) => {
            new globalThis.OvenMDKLogger("cool register block")
            new globalThis.OvenMDKLogger(custom_block || "Block registration failed");
            renderItem.registerBlock(custom_block, ModAPI.util.str(this.blockID));
          }
        );
        AsyncSink.L10N.set("tile." + this.blockID + ".name", this.blockName);
        new globalThis.OvenMDKLogger(`Set localization for block ${self.blockID}`);
        new globalThis.OvenMDKLogger(custom_block || "Block registration failed");
        new globalThis.OvenMDKLogger(`custom cool: ${self.customModel}`);
        if (!self.customModel) {
          AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/models/block/${self.blockID}.json`, JSON.stringify(
            {
              "parent": "block/cube_all",
              "textures": {
                "all": `blocks/${self.blockID}`
              }
            }
          ));
        } else {
          AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/models/block/${self.blockID}.json`, self.customModel);
        }

        AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/models/item/${self.blockID}.json`, JSON.stringify(
          {
            "parent": `block/${self.blockID}`
          }
        ));

        AsyncSink.setFile(
          `resourcepacks/AsyncSinkLib/assets/minecraft/blockstates/${self.blockID}.json`,
          JSON.stringify(
            {
              "variants": {
                "normal": { "model": `${this.blockID}` }
              }
            }
          )
        );

        const response = await fetch(self.blockTexture);
        const buffer = await response.arrayBuffer();

        AsyncSink.setFile(
          `resourcepacks/AsyncSinkLib/assets/minecraft/textures/blocks/${self.blockID}.png`,
          buffer
        );
        ModAPI.dedicatedServer.appendCode(`globalThis.registerServerBlock("${this.blockID}", ${this.onBreak});`);
        ModAPI.blocks[this.blockID] = custom_block;
      })
    }
  }
}
