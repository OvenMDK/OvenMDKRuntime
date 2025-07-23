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
export default class OItem {
  private itemTexture: string;
  private itemName: string;
  private itemID: string;
  private itemStack: number;
  private itemInstance: any;
  private onRightClick: ($itemstack: any) => void;

  constructor(
    itemName: string,
    itemID: string,
    itemStack: number,
    texture: string,
    onRightClick: ($itemstack: any) => void
  ) {
    this.itemName = itemName;
    this.itemID = itemID;
    this.itemStack = itemStack;
    this.itemTexture = texture;
    this.onRightClick = onRightClick;
  }

  public registerClient(): void {

    var $$itemGetAttributes = ModAPI.reflect.getClassById("net.minecraft.item.Item").methods.getItemAttributeModifiers.method;
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

    const itemClass: any = ModAPI.reflect.getClassById(
      "net.minecraft.item.Item"
    );
    const itemSuper: any = ModAPI.reflect.getSuper(
      itemClass,
      (fn: Function) => fn.length === 1
    );
    const itemStack = this.itemStack;
    const self = this;
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
        self.onRightClick($$itemstack);
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
      const itemInstance: any = new nmi_OvenItem().$setUnlocalizedName(
        ModAPI.util.str(this.itemID)
      );

      itemClass.staticMethods.registerItem.method(
        ModAPI.keygen.item(this.itemID),
        ModAPI.util.str(this.itemID),
        itemInstance
      );

      ModAPI.items[`${self.itemID}`] = itemInstance;
      console.log(itemInstance);

      console.log("Registered OvenMDK item ( client side )");

      return itemInstance;
    };

    if (ModAPI.items) {
      return internal_reg();
    } else {
      ModAPI.addEventListener("bootstrap", internal_reg);
    }
  }
  public async registerItem(): Promise<void> {

    const self = this;
    var custom_item = new OItem(this.itemName, this.itemID, this.itemStack, this.itemTexture, this.onRightClick).registerClient();
    ModAPI.dedicatedServer.appendCode(`globalThis.registerServerItem("${this.itemID}", ${this.itemStack}, ${this.onRightClick});`);
    ModAPI.addEventListener("lib:asyncsink", async () => {
      ModAPI.addEventListener(
        "lib:asyncsink:registeritems",
        (renderItem: any) => {
          renderItem.registerItem(custom_item, ModAPI.util.str(self.itemID));
        }
      );

      AsyncSink.L10N.set(`item.${self.itemID}.name`, self.itemName);

      AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/models/item/${self.itemID}.json`, JSON.stringify({
        "parent": "builtin/generated",
        "textures": {
          "layer0": `items/${self.itemID}`
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

      const response = await fetch(self.itemTexture);
      const buffer = await response.arrayBuffer();

      AsyncSink.setFile(
        `resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/${self.itemID}.png`,
        buffer
      );
    });
  }
}
