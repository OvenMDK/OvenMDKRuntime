export function registerOvenMDKRecipe(pattern: string, result: string) {
    function $$internalRegister() {
        if (ModAPI.is_1_12) {
            const CraftingManager = ModAPI.reflect.getClassByName("CraftingManager");
            const CraftingManagerMethods = CraftingManager.staticMethods;
            const JSONObject = ModAPI.reflect.getClassByName("JSONObject");
            const parseJson = JSONObject.constructors.findLast(x => x.length === 1);

            // Convert pattern to 3 lines of 3 characters (rows of crafting grid)
            const rowPatterns = [
                "ABC", "DEF", "GHI"
            ];

            const jsonKey: Record<string, any> = {};
            for (let i = 0; i < 9; i++) {
                const key = String.fromCharCode(65 + i); // 'A' to 'I'
                const entry = pattern[i];
                if (!entry || entry === "") continue;

                let id = entry;
                let meta = 0;
                if (id.includes("@")) {
                    const parts = id.split("@");
                    id = parts[0];
                    meta = parseInt(parts[1]) || 0;
                }

                jsonKey[key] = {
                    item: id.includes(":") ? id : `minecraft:${id}`,
                    data: meta
                };
            }

            let resultId = result;
            let resultMeta = 0;
            let resultCount = 1;

            if (result.includes("*")) {
                const parts = result.split("*");
                resultId = parts[0];
                resultCount = parseInt(parts[1]) || 1;
            }
            if (resultId.includes("@")) {
                const parts = resultId.split("@");
                resultId = parts[0];
                resultMeta = parseInt(parts[1]) || 0;
            }

            const recipeJson = {
                type: "crafting_shaped",
                pattern: rowPatterns,
                key: jsonKey,
                result: {
                    item: resultId.includes(":") ? resultId : `minecraft:${resultId}`,
                    data: resultMeta,
                    count: resultCount
                }
            };

            const jsonData = parseJson(ModAPI.util.str(JSON.stringify(recipeJson)));
            const recipeObj = CraftingManagerMethods.func_193376_a.method(jsonData);
            CraftingManagerMethods.func_193379_a.method(
                ModAPI.util.str(`custom_recipe_${Date.now()}`),
                recipeObj
            );
        } else {
            const $$ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;

            const $$ToChar = (char: string) =>
                ModAPI.reflect
                    .getClassById("java.lang.Character")
                    .staticMethods.valueOf.method(char.charCodeAt(0));

            const parseEntry = (entry: string) => {
                let type: "block" | "item" | "air";
                let id = entry;
                let meta = 0;

                if (id.includes("@")) {
                    const parts = id.split("@");
                    id = parts[0];
                    meta = parseInt(parts[1], 10) || 0;
                }
                if (id.startsWith("block/")) {
                    type = "block";
                    id = id.replace("block/", "");
                } else if (id.startsWith("item/")) {
                    type = "item";
                    id = id.replace("item/", "");
                } else {
                    if (ModAPI.blocks[id]) {
                        type = "block";
                    } else if (ModAPI.items[id]) {
                        type = "item";
                    } else if (id === "") {
                        type = "air";
                    }
                    else {
                        throw new Error(`Unknown item/block id: ${entry}`);
                    }
                }

                return { type, id, meta };
            };


            const patternEntries = pattern.split(",");
            const $$recipeLegend: Record<string, any> = {};
            patternEntries.forEach((entry, i) => {
                $$recipeLegend[String.fromCharCode(65 + i)] = parseEntry(entry);
            });

            const $$recipePattern = ["ABC", "DEF", "GHI"];

            const $$itemStackFromBlockWithMeta =
                ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[2];
            const $$itemStackFromItem =
                ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[4];

            const $$recipeInternal: any[] = [];
            Object.keys($$recipeLegend).forEach(key => {
                $$recipeInternal.push($$ToChar(key));
                const ing = $$recipeLegend[key];
                let ingredient;
                if (ing.type === "air") {
                    ingredient = "";
                } else if (ing.type === "block") {

                    $$itemStackFromBlockWithMeta(ModAPI.blocks[ing.id].getRef(), 1, ing.meta)
                }
                else if (ing.type === "item") {
                    $$itemStackFromItem(ModAPI.items[ing.id].getRef(), 1, ing.meta || 0);
                }
                $$recipeInternal.push(ingredient);
            });

            const $$recipeContents = $$recipePattern.map(row => ModAPI.util.str(row));
            const $$recipe = ModAPI.util.makeArray(
                $$ObjectClass,
                $$recipeContents.concat($$recipeInternal)
            );

            // Parse result
            const res = parseEntry(result);
            const $$resultItem = (res.type === "block")
                ? $$itemStackFromBlockWithMeta(ModAPI.blocks[res.id].getRef(), 1, res.meta)
                : $$itemStackFromItem(ModAPI.items[res.id].getRef(), 1, res.meta || 0);

            const $$craftingManager =
                ModAPI.reflect.getClassById("net.minecraft.item.crafting.CraftingManager")
                    .staticMethods.getInstance.method();

            ModAPI.hooks.methods.nmic_CraftingManager_addRecipe(
                $$craftingManager,
                $$resultItem,
                $$recipe
            );
        }
    };

    if (ModAPI.items) {
        $$internalRegister();
    } else {
        ModAPI.addEventListener("bootstrap", $$internalRegister);
    }
}
export function ORecipe(
    A: string, B: string, C: string,
    D: string, E: string, F: string,
    G: string, H: string, I: string,
    resultItem: string
) {
    const patternString = `${A},${B},${C},${D},${E},${F},${G},${H},${I}`;
    if (!ModAPI.server) {
        ModAPI.dedicatedServer.appendCode(
            `globalThis.registerServerORecipe("${patternString}", "${resultItem}");`
        );
    }
    globalThis.registerOvenMDKRecipe(patternString, resultItem);
}
export function registerOvenMDKFurnaceRecipe(input_item: string, resultItem: string, experience: number) {
    function $$internalRegister() {

        const ItemStackCtorFromBlock =
            ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[1];
        const ItemStackCtorFromItem =
            ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[4];

        const FurnaceRecipesInstance =
            ModAPI.util.wrap(
                ModAPI.reflect.getClassByName("FurnaceRecipes").staticVariables.smeltingBase
            );

        const parseEntry = (entry: string) => {
            let type: "block" | "item";
            let id = entry;
            let meta = 0;

            if (id.includes("@")) {
                const parts = id.split("@");
                id = parts[0];
                meta = parseInt(parts[1], 10) || 0;
            }

            if (id.startsWith("block/")) {
                type = "block";
                id = id.replace("block/", "");
            } else if (id.startsWith("item/")) {
                type = "item";
                id = id.replace("item/", "");
            } else {
                if (ModAPI.blocks[id]) {
                    type = "block";
                } else if (ModAPI.items[id]) {
                    type = "item";
                } else {
                    throw new Error(`Unknown item/block id: ${entry}`);
                }
            }

            return { type, id, meta };
        };

        const input = parseEntry(input_item);
        const output = parseEntry(resultItem);

        const $$outputStack =
            output.type === "block"
                ? ItemStackCtorFromBlock(ModAPI.blocks[output.id].getRef(), 1)
                : ItemStackCtorFromItem(ModAPI.items[output.id].getRef(), 1);
        if (input.type === "block") {
            FurnaceRecipesInstance.addSmeltingRecipeForBlock(
                ModAPI.blocks[input.id].getRef(),
                $$outputStack,
                experience
            );
        } else {
            FurnaceRecipesInstance.addSmelting(
                ModAPI.items[input.id].getRef(),
                $$outputStack,
                experience
            );
        }
    }


    if (ModAPI.items && ModAPI.blocks) {
        $$internalRegister();
    } else {
        ModAPI.addEventListener("bootstrap", $$internalRegister);
    }
}


export function OFurnanceRecipe(
    input_item: string,
    resultItem: string,
    experience: number
) {
    if (ModAPI.is_1_12) {
        console.warn("OFurnaceRecipes do not work in 1.12.2 please use 1.8 for OFurnaceRecipes!")
    } else {
        ModAPI.dedicatedServer.appendCode(
            `globalThis.registerServerOFurnanceRecipe("${input_item}", "${resultItem}", ${experience});`
        );
        globalThis.registerOvenMDKFurnaceRecipe(input_item, resultItem, experience);
    };
}