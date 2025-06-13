/*
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Oven.ts
	
	Copyright 2025 Block_2222
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

import OMod from "./Mod";

export class OItem {
  private itemTexture: string;
  private itemName: string;
  private itemID: string;
  private itemInstance: any;
  //private onRightClick(): void {}

  constructor(itemName: string, itemID: string, texture: string) {
    this.itemName = itemName;
    this.itemID = itemID;
    this.itemTexture = texture;
    //this.onRightClick() = onRightClick();
  }

  public register(): void {
    const creativeMiscTab: any = ModAPI.reflect.getClassById(
      "net.minecraft.creativetab.CreativeTabs"
    ).staticVariables.tabMisc;

    const itemClass: any = ModAPI.reflect.getClassById(
      "net.minecraft.item.Item"
    );
    const itemSuper: any = ModAPI.reflect.getSuper(
      itemClass,
      (x: any[]) => x.length === 1
    );

    const self = this;

    function nmi_OvenItem(this: any): void {
      itemSuper(this);
      this.$setCreativeTab(creativeMiscTab);
    }

    ModAPI.reflect.prototypeStack(itemClass, nmi_OvenItem);

    nmi_OvenItem.prototype.$onItemRightClick = function (
      $itemstack: any,
      $world: any,
      $player: any
    ): any {
      return $itemstack;
    };

    const internal_reg = (): any => {
      const itemInstance: any = new nmi_OvenItem().$setUnlocalizedName(
        ModAPI.util.str(self.itemID)
      );

      itemClass.staticMethods.registerItem.method(
        ModAPI.keygen.item(self.itemID),
        ModAPI.util.str(self.itemID),
        itemInstance
      );

      ModAPI.items[self.itemID] = itemInstance;
      self.itemInstance = itemInstance;

      return itemInstance;
    };

    if (ModAPI.items) {
      internal_reg();
    } else {
      ModAPI.addEventListener("bootstrap", internal_reg);
    }

    ModAPI.dedicatedServer.appendCode(() => this.register());
  }

  public async registerClient(): Promise<void> {
    const self = this;

    ModAPI.addEventListener("lib:asyncsink", async () => {
      ModAPI.addEventListener(
        "lib:asyncsink:registeritems",
        (renderItem: any) => {
          renderItem.registerItem(
            self.itemInstance,
            ModAPI.util.str(self.itemID)
          );
        }
      );

      AsyncSink.L10N.set(`item.${self.itemID}.name`, self.itemName);

      AsyncSink.setFile(
        `resourcepacks/AsyncSinkLib/assets/minecraft/models/item/${self.itemID}.json`,
        JSON.stringify({
          parent: "builtin/generated",
          textures: {
            layer0: `items/${self.itemID}`,
          },
          display: {
            thirdperson: {
              rotation: [-90, 0, 0],
              translation: [0, 1, -3],
              scale: [0.55, 0.55, 0.55],
            },
            firstperson: {
              rotation: [0, -135, 25],
              translation: [0, 4, 2],
              scale: [1.7, 1.7, 1.7],
            },
          },
        })
      );

      const response = await fetch(self.itemTexture);
      const buffer = await response.arrayBuffer();

      AsyncSink.setFile(
        `resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/${self.itemID}.png`,
        buffer
      );
    });
  }
}

export class OBlock {
  name: string;
  material: string;
  hardness: number;

  constructor(name: string, material: string, hardness: number) {
    this.name = name;
    this.material = material;
    this.hardness = hardness;
  }
}
export default class Oven {
  static mods: Array<OMod> = [];

  static registerMod(modClass: any) {
    ModAPI.meta.title(modClass.title);
    ModAPI.meta.version(modClass.version);
    ModAPI.meta.description(modClass.description);
    ModAPI.meta.credits(modClass.credits);
    ModAPI.meta.icon(modClass.icon);
    ModAPI.meta.config(modClass.config());
    modClass.init();
    if (modClass.only_1_12_2 === true) {
      // Ill do some more stuff later
    }
    this.mods.push(modClass);
  }
}
