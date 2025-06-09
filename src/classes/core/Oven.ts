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
    private itemTexture: string;
    private itemName: string;

    constructor(itemName: string, itemTexture: string) {
        this.itemName = itemName;
        this.itemTexture = itemTexture;
        this.initialize();
    }

    private initialize(): void {
        const creativeMiscTab = ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabMisc;
        const itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        const itemSuper = ModAPI.reflect.getSuper(itemClass, (fn: Function) => fn.length === 1);

        function nmi_ItemExample(this: any) {
            itemSuper(this);
            this.$setCreativeTab(creativeMiscTab);
        }

        ModAPI.reflect.prototypeStack(itemClass, nmi_ItemExample);

        nmi_ItemExample.prototype.$onItemRightClick = function ($itemstack: any, $world: any, $player: any) {
            return $itemstack;
        }

        this.registerItem(nmi_ItemExample);
    }

    private registerItem(itemExample: any): void {
        const example_item = (new itemExample()).$setUnlocalizedName(
            ModAPI.util.str(this.itemName)
        );
        itemExample.staticMethods.registerItem.method(ModAPI.keygen.item(this.itemName), ModAPI.util.str(this.itemName), example_item);
        ModAPI.items[this.itemName] = example_item;

        if (ModAPI.items) {
            this.setupAsyncSink(example_item);
        } else {
            ModAPI.addEventListener("bootstrap", () => this.registerItem(itemExample));
        }
    }

    private setupAsyncSink(example_item: any): void {
        ModAPI.addEventListener("lib:asyncsink", async () => {
            ModAPI.addEventListener("lib:asyncsink:registeritems", (renderItem: any) => {
                renderItem.registerItem(example_item, ModAPI.util.str(example_item.$getUnlocalizedName()));
            });
            AsyncSink.L10N.set(`item.${example_item.$getUnlocalizedName()}.name`, example_item.$getUnlocalizedName());
            AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/models/item/${example_item.$getUnlocalizedName()}.json`, JSON.stringify(
                {
                    "parent": "builtin/generated",
                    "textures": {
                        "layer0": `items/${example_item.$getUnlocalizedName()}`
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
            AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/${example_item.$getUnlocalizedName()}.png`, await (await fetch(
                this.itemTexture
            )).arrayBuffer());
        });
    }
}

// example:
// new OMod("exampleitem", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAKZJREFUOE9j/P//PxMDBIBoEP6HREOl4PLIciA2AyPIgMcM//7KgvWSDJjBBpx9/+YvJzc3Sbq12DhB6sEGsJ19/+YnmQawYhigzc7FcPXnN4KugbqAHWQAy9n3b34T4wJkw6EGYLqAoNVQBWS5ANlwZBfAvUCs/0EGkW0AzBKqGoCSDgh5A80F2KMRpAgfAKUT6kcjsfEPUycmKMQgy8AETkgUZWcAS3CPIf4oSPsAAAAASUVORK5CYII=");
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
    static mods:Array<OMod> = [];
    
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
