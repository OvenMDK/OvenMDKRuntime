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
  private creativeMiscTab: any;
  private itemClass: any;
  private itemSuper: any;
  private itemTexture: string;

  constructor(itemTexture: string) {
      this.itemTexture = itemTexture;
      this.creativeMiscTab = ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabMisc;
      this.itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
      this.itemSuper = ModAPI.reflect.getSuper(this.itemClass, (x: any) => x.length === 1);

      this.registerItem();
      this.setupAsyncSink();
  }

  private nmi_ItemExample = () => {
      const self = this;
      return function (this: any) {
          self.itemSuper.call(this);
          this.$setCreativeTab(self.creativeMiscTab);
      }
  }

  private internal_reg = () => {
      console.log("Registering item example");
      const nmiItemExample = this.nmi_ItemExample();
      ModAPI.reflect.prototypeStack(this.itemClass, nmiItemExample);

      nmiItemExample.prototype.$onItemRightClick = function (this: any, $itemstack: any, $world: any, $player: any) { // example of how to override a method
          return $itemstack;
      };

      const example_item = (new (nmiItemExample as any)()).$setUnlocalizedName(
          ModAPI.util.str("exampleitem")
      );
      this.itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("exampleitem"), ModAPI.util.str("exampleitem"), example_item);
      ModAPI.items["exampleitem"] = example_item;

      return example_item;
  }

  private registerItem() {
      if (ModAPI.items) {
          this.internal_reg();
      } else {
          ModAPI.addEventListener("bootstrap", this.internal_reg);
      }
      console.log("cool regsiterr")
      ModAPI.dedicatedServer.appendCode(this.internal_reg);
      this.internal_reg();
  }

  private async setupAsyncSink() {
      const self = this;
      ModAPI.addEventListener("lib:asyncsink", async () => {
          ModAPI.addEventListener("lib:asyncsink:registeritems", (renderItem: any) => {
              console.log('cool item render')
              renderItem.registerItem(self.internal_reg(), ModAPI.util.str("exampleitem"));
          });
          AsyncSink.L10N.set("item.exampleitem.name", "Example Item");
          AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/exampleitem.json", JSON.stringify(
              {
                  "parent": "builtin/generated",
                  "textures": {
                      "layer0": "items/exampleitem"
                  },
                  "display": {
                      "thirdperson": {
                          "rotation": [-90, 0, 0],
                          "translation": [0, 1, -3],
                          "scale": [0.55, 0.55, 0.55]
                      },
                      "firstperson": {
                          "rotation": [0, -135, 25],
                          "translation": [0, 4, 2],
                          "scale": [1.7, 1.7, 1.7]
                      }
                  }
              }
          ));
          AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/exampleitem.png", await (await fetch(
              this.itemTexture
          )).arrayBuffer());
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
