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

class OItem {
  public example_item: any;

  constructor() {
    const creativeMiscTab = ModAPI.reflect.getClassById(
      "net.minecraft.creativetab.CreativeTabs"
    ).staticVariables.tabMisc;
    const itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
    const itemSuper: Function = ModAPI.reflect.getSuper(
      itemClass,
      (x: any[]) => x.length === 1
    );

    function nmi_ItemExample(this: any) {
      itemSuper(this);
      this.$setCreativeTab(creativeMiscTab);
    }

    ModAPI.reflect.prototypeStack(itemClass, nmi_ItemExample);

    nmi_ItemExample.prototype.$onItemRightClick = function (
      $itemstack: any,
      $world: any,
      $player: any
    ) {
      return $itemstack;
    };

    function internal_reg(): any {
      const example_item = new (nmi_ItemExample as any)().$setUnlocalizedName(
        ModAPI.util.str("exampleitem")
      );
      itemClass.staticMethods.registerItem.method(
        ModAPI.keygen.item("exampleitem"),
        ModAPI.util.str("exampleitem"),
        example_item
      );

      ModAPI.items["exampleitem"] = example_item;

      return example_item;
    }

    if (ModAPI.items) {
      this.example_item = internal_reg();
    } else {
      ModAPI.addEventListener("bootstrap", () => {
        this.example_item = internal_reg();
      });
    }
  }
}

// example:
// new OItem("exampleitem", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAKZJREFUOE9j/P//PxMDBIBoEP6HREOl4PLIciA2AyPIgMcM//7KgvWSDJjBBpx9/+YvJzc3Sbq12DhB6sEGsJ19/+YnmQawYhigzc7FcPXnN4KugbqAHWQAy9n3b34T4wJkw6EGYLqAoNVQBWS5ANlwZBfAvUCs/0EGkW0AzBKqGoCSDgh5A80F2KMRpAgfAKUT6kcjsfEPUycmKMQgy8AETkgUZWcAS3CPIf4oSPsAAAAASUVORK5CYII=");
export class OBlock {
  name: string;
  material: string;
  hardness: number;

  constructor(name: string, material: string, hardness: number) {
    this.name = name;
    this.material = material;
    this.hardness = hardness;
  }

  // Add any custom block behavior here
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
