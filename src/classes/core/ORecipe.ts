export function registerOvenMDKRecipe(pattern: string, result: string) {
    function $$internalRegister() {
        const $$ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;

        const $$ToChar = (char: string) =>
            ModAPI.reflect
                .getClassById("java.lang.Character")
                .staticMethods.valueOf.method(char.charCodeAt(0));

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
            const ingredient = (ing.type === "block")
                ? $$itemStackFromBlockWithMeta(ModAPI.blocks[ing.id].getRef(), 1, ing.meta)
                : $$itemStackFromItem(ModAPI.items[ing.id].getRef(), 1, ing.meta || 0);
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
    if (ModAPI.is_1_12) {
        console.warn("ORecipes do not work in 1.12.2 please use 1.8 for ORecipes!")
    } else {
        if (!ModAPI.server) {
            ModAPI.dedicatedServer.appendCode(
                `globalThis.registerServerORecipe("${patternString}", "${resultItem}");`
            );
        }
        globalThis.registerOvenMDKRecipe(patternString, resultItem);
    };
}

