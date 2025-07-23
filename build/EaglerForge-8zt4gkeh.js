// src/ASSETS/defaultIcon.png
var defaultIcon_default = "./defaultIcon-nxewas8n.png";

// src/classes/core/OItem.ts
class OItem {
  itemTexture;
  itemName;
  itemID;
  itemInstance;
  onRightClick;
  constructor(itemName, itemID, texture, onRightClick) {
    this.itemName = itemName;
    this.itemID = itemID;
    this.itemTexture = texture;
    this.onRightClick = onRightClick;
  }
  registerClient() {
    var $$itemGetAttributes = ModAPI.reflect.getClassById("net.minecraft.item.Item").methods.getItemAttributeModifiers.method;
    const creativeMiscTab = ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabMisc;
    const itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
    const itemSuper = ModAPI.reflect.getSuper(itemClass, (fn) => fn.length === 1);
    function nmi_OvenItem() {
      itemSuper(this);
      this.$setCreativeTab(creativeMiscTab);
      this.$maxStackSize = 64;
    }
    ModAPI.reflect.prototypeStack(itemClass, nmi_OvenItem);
    const self = this;
    nmi_OvenItem.prototype.$onItemRightClick = function($$itemstack, $$world, $$player) {
      self.onRightClick($$itemstack);
      console.log($$itemstack);
      return $$itemstack;
    };
    nmi_OvenItem.prototype.$onUpdate = function($$itemstack, $$world, $$player, $$hotbar_slot, $$is_held) {
      $$is_held = $$is_held ? true : false;
      return $$itemstack;
    };
    nmi_OvenItem.prototype.$onItemUseFinish = function($$itemstack, $$world, $$player) {
      return $$itemstack;
    };
    nmi_OvenItem.prototype.$getMaxItemUseDuration = function() {
      return 32;
    };
    nmi_OvenItem.prototype.$getItemAttributeModifiers = function() {
      var $$attributemap = $$itemGetAttributes.apply(this, []);
      return $$attributemap;
    };
    nmi_OvenItem.prototype.$getStrVsBlock = function($$itemstack, $$block) {
      return 1;
    };
    nmi_OvenItem.prototype.$onCreated = function($$itemstack, $$world, $$player) {
      return;
    };
    nmi_OvenItem.prototype.$onBlockDestroyed = function($$itemstack, $$world, $$block, $$blockpos, $$entity) {
      return 0;
    };
    const internal_reg = () => {
      const itemInstance = new nmi_OvenItem().$setUnlocalizedName(ModAPI.util.str(this.itemID));
      itemClass.staticMethods.registerItem.method(ModAPI.keygen.item(this.itemID), ModAPI.util.str(this.itemID), itemInstance);
      ModAPI.items[`${self.itemID}`] = itemInstance;
      console.log(itemInstance);
      console.log("Registering item");
      return itemInstance;
    };
    if (ModAPI.items) {
      return internal_reg();
    } else {
      ModAPI.addEventListener("bootstrap", internal_reg);
    }
  }
  async register() {
    const self = this;
    var custom_item = new OItem(this.itemName, this.itemID, this.itemTexture, () => this.onRightClick).registerClient();
    ModAPI.dedicatedServer.appendCode(globalThis.registerServerItem(this.itemID, this.onRightClick));
    ModAPI.addEventListener("lib:asyncsink", async () => {
      ModAPI.addEventListener("lib:asyncsink:registeritems", (renderItem) => {
        renderItem.registerItem(custom_item, ModAPI.util.str(self.itemID));
      });
      AsyncSink.L10N.set(`item.${self.itemID}.name`, self.itemName);
      AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/models/item/${self.itemID}.json`, JSON.stringify({
        parent: "builtin/generated",
        textures: {
          layer0: `items/${self.itemID}`
        },
        display: {
          thirdperson: {
            rotation: [-90, 0, 0],
            translation: [0, 1, -3],
            scale: [0.55, 0.55, 0.55]
          },
          firstperson: {
            rotation: [0, -135, 25],
            translation: [0, 4, 2],
            scale: [1.7, 1.7, 1.7]
          }
        }
      }));
      const response = await fetch(self.itemTexture);
      const buffer = await response.arrayBuffer();
      AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/${self.itemID}.png`, buffer);
    });
  }
}

// src/classes/core/Mod.ts
class OMod {
  static title = "Default Name";
  static version = "";
  static description = "Default OvenMDK Description. Set 'description' in your OMod class!";
  static credits = "None Given";
  static icon = defaultIcon_default;
  static acceptedMinecraftVersions = null;
  static acceptedEaglerUpdates = null;
  static acceptedEFVersions = null;
  static acceptedEFFlavour = "injector";
  static clientSideOnly = false;
  static serverSideOnly = false;
  static only_1_12_2 = false;
  static Debug_mode = false;
  static config() {}
  static init() {}
  static postInit() {}
  static displayChatMessage(msg) {
    ModAPI.displayToChat(msg);
  }
}

// src/classes/core/Oven.ts
class Oven {
  static mods = [];
  static registerMod(modClass) {
    ModAPI.meta.title(modClass.title);
    ModAPI.meta.version(modClass.version);
    ModAPI.meta.description(modClass.description);
    ModAPI.meta.credits(modClass.credits);
    ModAPI.meta.icon(modClass.icon);
    ModAPI.meta.config(modClass.config());
    modClass.init();
    globalThis.Debug_mode = modClass.Debug_mode;
    if (modClass.only_1_12_2 === true) {}
    this.mods.push(modClass);
  }
}

// src/classes/core/OBlock.ts
class OBlock {
  blockTexture;
  blockName;
  blockID;
  blockInstance;
  onBreak;
  constructor(blockName, blockID, texture, onBreak) {
    this.blockName = blockName;
    this.blockID = blockID;
    this.blockTexture = texture;
    this.onBreak = onBreak;
  }
  register() {
    const BlockClass = ModAPI.reflect.getClassById("net.minecraft.block.Block");
    const ItemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
    const creativeTab = ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabBlock;
    const blockSuper = ModAPI.reflect.getSuper(BlockClass, (fn) => fn.length === 2);
    const breakBlockMethod = BlockClass.methods.breakBlock.method;
    const self = this;
    function CustomBlock() {
      blockSuper(this, ModAPI.materials.rock.getRef());
      this.$defaultBlockState = this.$blockState.$getBaseState();
      this.$setCreativeTab(creativeTab);
    }
    ModAPI.reflect.prototypeStack(BlockClass, CustomBlock);
    CustomBlock.prototype.$breakBlock = function($world, $blockpos, $blockstate) {
      self.onBreak($world, $blockpos, $blockstate);
      return breakBlockMethod(this, $world, $blockpos, $blockstate);
    };
    const internalRegister = () => {
      const custom_block = new CustomBlock().$setHardness(3).$setStepSound(BlockClass.staticVariables.soundTypePiston).$setUnlocalizedName(ModAPI.util.str(this.blockID));
      BlockClass.staticMethods.registerBlock0.method(ModAPI.keygen.block(this.blockID), ModAPI.util.str(this.blockID), custom_block);
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
  fixupBlockIds() {
    const blockRegistry = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.block.Block").staticVariables.blockRegistry).getCorrective();
    const BLOCK_STATE_IDS = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.block.Block").staticVariables.BLOCK_STATE_IDS).getCorrective();
    blockRegistry.registryObjects.hashTableKToV.forEach((entry) => {
      if (entry) {
        const block = entry.value;
        const validStates = block.getBlockState().getValidStates();
        const stateArray = validStates.array || [validStates.element];
        stateArray.forEach((iblockstate) => {
          const i = blockRegistry.getIDForObject(block.getRef()) << 4 | block.getMetaFromState(iblockstate.getRef());
          BLOCK_STATE_IDS.put(iblockstate.getRef(), i);
        });
      }
    });
  }
  async registerBlock() {
    var custom_block = new OBlock(this.blockName, this.blockID, this.blockTexture, () => this.onBreak).register();
    const self = this;
    ModAPI.dedicatedServer.appendCode(globalThis.registerServerBlock(this.blockID, this.onBreak));
    ModAPI.addEventListener("lib:asyncsink", async () => {
      ModAPI.addEventListener("lib:asyncsink:registeritems", (renderItem) => {
        renderItem.registerBlock(custom_block, ModAPI.util.str(self.blockID));
      });
      AsyncSink.L10N.set(`tile.${self.blockID}.name`, self.blockName);
      console.log(`Set localization for block ${self.blockID}`);
      AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/models/block/${self.blockID}.json`, JSON.stringify({
        parent: "block/cube_all",
        textures: {
          all: `blocks/${self.blockID}`
        }
      }));
      AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/models/item/${self.blockID}.json`, JSON.stringify({
        parent: `block/${self.blockID}`,
        display: {
          thirdperson: {
            rotation: [10, -45, 170],
            translation: [0, 1.5, -2.75],
            scale: [0.375, 0.375, 0.375]
          }
        }
      }));
      AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/blockstates/${self.blockID}.json`, JSON.stringify({
        variants: {
          normal: [
            {
              model: self.blockID
            }
          ]
        }
      }));
      const response = await fetch(self.blockTexture);
      const buffer = await response.arrayBuffer();
      AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/textures/blocks/${self.blockID}.png`, buffer);
    });
  }
}

// src/classes/core/Helper_func.ts
function registerServerItem(itemID, onRightClick) {
  if (ModAPI.isServer === false) {
    console.log("registerServerItem can only be used on the server side.");
    return;
  }
  const creativeMiscTab = ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabMisc;
  const $$itemGetAttributes = ModAPI.reflect.getClassById("net.minecraft.item.Item").methods.getItemAttributeModifiers.method;
  const itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
  const itemSuper = ModAPI.reflect.getSuper(itemClass, (fn) => fn.length === 1);
  function nmi_OvenItem() {
    itemSuper(this);
    this.$setCreativeTab(creativeMiscTab);
    this.$maxStackSize = 64;
  }
  ModAPI.reflect.prototypeStack(itemClass, nmi_OvenItem);
  nmi_OvenItem.prototype.$onItemRightClick = function($$itemstack, $$world, $$player) {
    onRightClick($$itemstack);
    console.log($$itemstack);
    return $$itemstack;
  };
  nmi_OvenItem.prototype.$onUpdate = function($$itemstack, $$world, $$player, $$hotbar_slot, $$is_held) {
    $$is_held = $$is_held ? true : false;
    return $$itemstack;
  };
  nmi_OvenItem.prototype.$onItemUseFinish = function($$itemstack, $$world, $$player) {
    return $$itemstack;
  };
  nmi_OvenItem.prototype.$getMaxItemUseDuration = function() {
    return 32;
  };
  nmi_OvenItem.prototype.$getItemAttributeModifiers = function() {
    var $$attributemap = $$itemGetAttributes.apply(this, []);
    return $$attributemap;
  };
  nmi_OvenItem.prototype.$getStrVsBlock = function($$itemstack, $$block) {
    return 1;
  };
  nmi_OvenItem.prototype.$onCreated = function($$itemstack, $$world, $$player) {
    return;
  };
  nmi_OvenItem.prototype.$onBlockDestroyed = function($$itemstack, $$world, $$block, $$blockpos, $$entity) {
    return 0;
  };
  const internal_reg = () => {
    var itemInstance = new nmi_OvenItem().$setUnlocalizedName(ModAPI.util.str(`${itemID}`));
    itemClass.staticMethods.registerItem.method(ModAPI.keygen.item(`${itemID}`), ModAPI.util.str(`${itemID}`), itemInstance);
    ModAPI.items[`${itemID}`] = itemInstance;
    console.log(itemInstance);
    console.log("Registering item");
    return itemInstance;
  };
  if (ModAPI.items) {
    return internal_reg();
  } else {
    ModAPI.addEventListener("bootstrap", internal_reg);
  }
}
function registerServerBlock(blockID, onBreak) {
  if (ModAPI.isServer === false) {
    console.log("registerServerBlock can only be used on the server side.");
    return;
  }
  const BlockClass = ModAPI.reflect.getClassById("net.minecraft.block.Block");
  const ItemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
  const creativeTab = ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabBlock;
  const blockSuper = ModAPI.reflect.getSuper(BlockClass, (fn) => fn.length === 2);
  const breakBlockMethod = BlockClass.methods.breakBlock.method;
  function CustomBlock() {
    blockSuper(this, ModAPI.materials.rock.getRef());
    this.$defaultBlockState = this.$blockState.$getBaseState();
    this.$setCreativeTab(creativeTab);
  }
  ModAPI.reflect.prototypeStack(BlockClass, CustomBlock);
  CustomBlock.prototype.$breakBlock = function($world, $blockpos, $blockstate) {
    onBreak($world, $blockpos, $blockstate);
    return breakBlockMethod(this, $world, $blockpos, $blockstate);
  };
  function fixupBlockIds() {
    const blockRegistry = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.block.Block").staticVariables.blockRegistry).getCorrective();
    const BLOCK_STATE_IDS = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.block.Block").staticVariables.BLOCK_STATE_IDS).getCorrective();
    blockRegistry.registryObjects.hashTableKToV.forEach((entry) => {
      if (entry) {
        const block = entry.value;
        const validStates = block.getBlockState().getValidStates();
        const stateArray = validStates.array || [validStates.element];
        stateArray.forEach((iblockstate) => {
          const i = blockRegistry.getIDForObject(block.getRef()) << 4 | block.getMetaFromState(iblockstate.getRef());
          BLOCK_STATE_IDS.put(iblockstate.getRef(), i);
        });
      }
    });
  }
  const internalRegister = () => {
    const custom_block = new CustomBlock().$setHardness(3).$setStepSound(BlockClass.staticVariables.soundTypePiston).$setUnlocalizedName(ModAPI.util.str(blockID));
    BlockClass.staticMethods.registerBlock0.method(ModAPI.keygen.block(blockID), ModAPI.util.str(blockID), custom_block);
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

// src/main.ts
ModAPI.meta.title("OvenMDK Runtime");
ModAPI.meta.version("INDEV");
ModAPI.meta.description("Unofficial dev kit used for simplifying EaglerForge mod development.");
ModAPI.meta.credits("Block_2222");
ModAPI.meta.icon(defaultIcon_default);
globalThis.registerServerItem = registerServerItem;
globalThis.registerServerBlock = registerServerBlock;
globalThis.OItem = OItem;
globalThis.OMod = OMod;
globalThis.OvenMDK = Oven;
globalThis.OBlock = OBlock;
ModAPI.addEventListener("load", () => {
  console.log(`
    ┌───────────────────────────────────┐
    │                                   │
    │   welcome to OvenMDK              │
    │                                   │
    │   A mod maker kit for starters    │
    │                                   │
    └───────────────────────────────────┘
    `);
});

//# debugId=C0FD6E72C1956D9664756E2164756E21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi5cXHNyY1xcY2xhc3Nlc1xcY29yZVxcT0l0ZW0udHMiLCAiLi5cXHNyY1xcY2xhc3Nlc1xcY29yZVxcTW9kLnRzIiwgIi4uXFxzcmNcXGNsYXNzZXNcXGNvcmVcXE92ZW4udHMiLCAiLi5cXHNyY1xcY2xhc3Nlc1xcY29yZVxcT0Jsb2NrLnRzIiwgIi4uXFxzcmNcXGNsYXNzZXNcXGNvcmVcXEhlbHBlcl9mdW5jLnRzIiwgIi4uXFxzcmNcXG1haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbCiAgICAiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9JdGVtIHtcclxuICBwcml2YXRlIGl0ZW1UZXh0dXJlOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBpdGVtTmFtZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgaXRlbUlEOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBpdGVtSW5zdGFuY2U6IGFueTtcclxuICBwcml2YXRlIG9uUmlnaHRDbGljazogKCRpdGVtc3RhY2s6IGFueSkgPT4gdm9pZDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpdGVtTmFtZTogc3RyaW5nLFxyXG4gICAgaXRlbUlEOiBzdHJpbmcsXHJcbiAgICB0ZXh0dXJlOiBzdHJpbmcsXHJcbiAgICBvblJpZ2h0Q2xpY2s6ICgkaXRlbXN0YWNrOiBhbnkpID0+IHZvaWRcclxuICApIHtcclxuICAgIHRoaXMuaXRlbU5hbWUgPSBpdGVtTmFtZTtcclxuICAgIHRoaXMuaXRlbUlEID0gaXRlbUlEO1xyXG4gICAgdGhpcy5pdGVtVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICB0aGlzLm9uUmlnaHRDbGljayA9IG9uUmlnaHRDbGljaztcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3RlckNsaWVudCgpOiB2b2lkIHtcclxuICAgIHZhciAkJGl0ZW1HZXRBdHRyaWJ1dGVzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIikubWV0aG9kcy5nZXRJdGVtQXR0cmlidXRlTW9kaWZpZXJzLm1ldGhvZDtcclxuICAgIGNvbnN0IGNyZWF0aXZlTWlzY1RhYjogYW55ID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFxyXG4gICAgICBcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCJcclxuICAgICkuc3RhdGljVmFyaWFibGVzLnRhYk1pc2M7XHJcblxyXG4gICAgY29uc3QgaXRlbUNsYXNzOiBhbnkgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXHJcbiAgICAgIFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIlxyXG4gICAgKTtcclxuICAgIGNvbnN0IGl0ZW1TdXBlcjogYW55ID0gTW9kQVBJLnJlZmxlY3QuZ2V0U3VwZXIoXHJcbiAgICAgIGl0ZW1DbGFzcyxcclxuICAgICAgKGZuOiBGdW5jdGlvbikgPT4gZm4ubGVuZ3RoID09PSAxXHJcbiAgICApO1xyXG5cclxuICAgIGZ1bmN0aW9uIG5taV9PdmVuSXRlbSh0aGlzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgaXRlbVN1cGVyKHRoaXMpO1xyXG4gICAgICB0aGlzLiRzZXRDcmVhdGl2ZVRhYihjcmVhdGl2ZU1pc2NUYWIpO1xyXG4gICAgICB0aGlzLiRtYXhTdGFja1NpemUgPSAoNjQpO1xyXG4gICAgfVxyXG5cclxuICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKGl0ZW1DbGFzcywgbm1pX092ZW5JdGVtKTtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtUmlnaHRDbGljayA9IGZ1bmN0aW9uIChcclxuICAgICAgJCRpdGVtc3RhY2s6IGFueSxcclxuICAgICAgJCR3b3JsZDogYW55LFxyXG4gICAgICAkJHBsYXllcjogYW55XHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgc2VsZi5vblJpZ2h0Q2xpY2soJCRpdGVtc3RhY2spO1xyXG4gICAgICBjb25zb2xlLmxvZygkJGl0ZW1zdGFjayk7XHJcbiAgICAgIHJldHVybiAoJCRpdGVtc3RhY2spO1xyXG4gICAgfTtcclxuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uVXBkYXRlID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllciwgJCRob3RiYXJfc2xvdCwgJCRpc19oZWxkKSB7XHJcbiAgICAgICQkaXNfaGVsZCA9ICgkJGlzX2hlbGQpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICByZXR1cm4gKCQkaXRlbXN0YWNrKTtcclxuICAgIH1cclxuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uSXRlbVVzZUZpbmlzaCA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIpIHtcclxuICAgICAgcmV0dXJuICgkJGl0ZW1zdGFjayk7XHJcbiAgICB9XHJcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRnZXRNYXhJdGVtVXNlRHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiAzMjtcclxuICAgIH1cclxuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldEl0ZW1BdHRyaWJ1dGVNb2RpZmllcnMgPSBmdW5jdGlvbiAoKSB7IC8vMS4xMiB3b3JrcyBpIHRoaW5rXHJcbiAgICAgIHZhciAkJGF0dHJpYnV0ZW1hcCA9ICQkaXRlbUdldEF0dHJpYnV0ZXMuYXBwbHkodGhpcywgW10pO1xyXG4gICAgICByZXR1cm4gJCRhdHRyaWJ1dGVtYXA7XHJcbiAgICB9XHJcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRnZXRTdHJWc0Jsb2NrID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJGJsb2NrKSB7XHJcbiAgICAgIHJldHVybiAxLjA7XHJcbiAgICB9XHJcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkNyZWF0ZWQgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7IC8vMS4xMiB3b3Jrc1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkJsb2NrRGVzdHJveWVkID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJGJsb2NrLCAkJGJsb2NrcG9zLCAkJGVudGl0eSkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGNvbnN0IGludGVybmFsX3JlZyA9ICgpOiBhbnkgPT4ge1xyXG4gICAgICBjb25zdCBpdGVtSW5zdGFuY2U6IGFueSA9IG5ldyBubWlfT3Zlbkl0ZW0oKS4kc2V0VW5sb2NhbGl6ZWROYW1lKFxyXG4gICAgICAgIE1vZEFQSS51dGlsLnN0cih0aGlzLml0ZW1JRClcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbS5tZXRob2QoXHJcbiAgICAgICAgTW9kQVBJLmtleWdlbi5pdGVtKHRoaXMuaXRlbUlEKSxcclxuICAgICAgICBNb2RBUEkudXRpbC5zdHIodGhpcy5pdGVtSUQpLFxyXG4gICAgICAgIGl0ZW1JbnN0YW5jZVxyXG4gICAgICApO1xyXG5cclxuICAgICAgTW9kQVBJLml0ZW1zW2Ake3NlbGYuaXRlbUlEfWBdID0gaXRlbUluc3RhbmNlO1xyXG4gICAgICBjb25zb2xlLmxvZyhpdGVtSW5zdGFuY2UpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmluZyBpdGVtXCIpO1xyXG5cclxuICAgICAgcmV0dXJuIGl0ZW1JbnN0YW5jZTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKE1vZEFQSS5pdGVtcykge1xyXG4gICAgICByZXR1cm4gaW50ZXJuYWxfcmVnKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImJvb3RzdHJhcFwiLCBpbnRlcm5hbF9yZWcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIHJlZ2lzdGVyKCk6IFByb21pc2U8dm9pZD4ge1xyXG5cclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgdmFyIGN1c3RvbV9pdGVtID0gbmV3IE9JdGVtKHRoaXMuaXRlbU5hbWUsIHRoaXMuaXRlbUlELCB0aGlzLml0ZW1UZXh0dXJlLCAoKSA9PiB0aGlzLm9uUmlnaHRDbGljaykucmVnaXN0ZXJDbGllbnQoKTtcclxuICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVySXRlbSh0aGlzLml0ZW1JRCwgdGhpcy5vblJpZ2h0Q2xpY2spKTtcclxuICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2lua1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgIFwibGliOmFzeW5jc2luazpyZWdpc3Rlcml0ZW1zXCIsXHJcbiAgICAgICAgKHJlbmRlckl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgcmVuZGVySXRlbS5yZWdpc3Rlckl0ZW0oY3VzdG9tX2l0ZW0sIE1vZEFQSS51dGlsLnN0cihzZWxmLml0ZW1JRCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIEFzeW5jU2luay5MMTBOLnNldChgaXRlbS4ke3NlbGYuaXRlbUlEfS5uYW1lYCwgc2VsZi5pdGVtTmFtZSk7XHJcblxyXG4gICAgICBBc3luY1Npbmsuc2V0RmlsZShcclxuICAgICAgICBgcmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9tb2RlbHMvaXRlbS8ke3NlbGYuaXRlbUlEfS5qc29uYCxcclxuICAgICAgICBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICBwYXJlbnQ6IFwiYnVpbHRpbi9nZW5lcmF0ZWRcIixcclxuICAgICAgICAgIHRleHR1cmVzOiB7XHJcbiAgICAgICAgICAgIGxheWVyMDogYGl0ZW1zLyR7c2VsZi5pdGVtSUR9YCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBkaXNwbGF5OiB7XHJcbiAgICAgICAgICAgIHRoaXJkcGVyc29uOiB7XHJcbiAgICAgICAgICAgICAgcm90YXRpb246IFstOTAsIDAsIDBdLFxyXG4gICAgICAgICAgICAgIHRyYW5zbGF0aW9uOiBbMCwgMSwgLTNdLFxyXG4gICAgICAgICAgICAgIHNjYWxlOiBbMC41NSwgMC41NSwgMC41NV0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZpcnN0cGVyc29uOiB7XHJcbiAgICAgICAgICAgICAgcm90YXRpb246IFswLCAtMTM1LCAyNV0sXHJcbiAgICAgICAgICAgICAgdHJhbnNsYXRpb246IFswLCA0LCAyXSxcclxuICAgICAgICAgICAgICBzY2FsZTogWzEuNywgMS43LCAxLjddLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG5cclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChzZWxmLml0ZW1UZXh0dXJlKTtcclxuICAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKTtcclxuXHJcbiAgICAgIEFzeW5jU2luay5zZXRGaWxlKFxyXG4gICAgICAgIGByZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L3RleHR1cmVzL2l0ZW1zLyR7c2VsZi5pdGVtSUR9LnBuZ2AsXHJcbiAgICAgICAgYnVmZmVyXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwKICAgICIvKlxuXHR+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cdE1vZC50c1xuXHRcblx0Q29weXJpZ2h0IDIwMjUgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuXHR+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZIFxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nIFxuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuaW1wb3J0IGRlZmF1bHRJY29uIGZyb20gXCJBU1NFVFMvZGVmYXVsdEljb24ucG5nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9Nb2Qge1xuICBzdGF0aWMgdGl0bGU6IHN0cmluZyA9IFwiRGVmYXVsdCBOYW1lXCI7XG4gIHN0YXRpYyB2ZXJzaW9uOiBzdHJpbmcgPSBcIlwiO1xuICBzdGF0aWMgZGVzY3JpcHRpb246IHN0cmluZyA9XG4gICAgXCJEZWZhdWx0IE92ZW5NREsgRGVzY3JpcHRpb24uIFNldCAnZGVzY3JpcHRpb24nIGluIHlvdXIgT01vZCBjbGFzcyFcIjtcbiAgc3RhdGljIGNyZWRpdHM6IHN0cmluZyA9IFwiTm9uZSBHaXZlblwiO1xuICBzdGF0aWMgaWNvbjogc3RyaW5nID0gZGVmYXVsdEljb247XG5cbiAgc3RhdGljIGFjY2VwdGVkTWluZWNyYWZ0VmVyc2lvbnM6IEFycmF5PHN0cmluZz4gPSBudWxsO1xuICBzdGF0aWMgYWNjZXB0ZWRFYWdsZXJVcGRhdGVzOiBBcnJheTxzdHJpbmc+ID0gbnVsbDtcbiAgc3RhdGljIGFjY2VwdGVkRUZWZXJzaW9uczogQXJyYXk8c3RyaW5nPiA9IG51bGw7XG4gIHN0YXRpYyBhY2NlcHRlZEVGRmxhdm91cjogc3RyaW5nID0gXCJpbmplY3RvclwiO1xuXG4gIHN0YXRpYyBjbGllbnRTaWRlT25seTogYm9vbGVhbiA9IGZhbHNlO1xuICBzdGF0aWMgc2VydmVyU2lkZU9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhdGljIG9ubHlfMV8xMl8yOiBib29sZWFuID0gZmFsc2U7XG4gIHN0YXRpYyBEZWJ1Z19tb2RlOiBib29sZWFuID0gZmFsc2U7XG4gIHN0YXRpYyBjb25maWcoKTogdm9pZCB7fVxuICBzdGF0aWMgaW5pdCgpOiB2b2lkIHt9XG4gIHN0YXRpYyBwb3N0SW5pdCgpOiB2b2lkIHt9XG4gIHN0YXRpYyBkaXNwbGF5Q2hhdE1lc3NhZ2UobXNnOiBzdHJpbmcpIHtcbiAgICBNb2RBUEkuZGlzcGxheVRvQ2hhdChtc2cpO1xuICB9XG59XG4iLAogICAgIi8qXG5cdH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cblx0T3Zlbi50c1xuXHRcblx0Q29weXJpZ2h0IDIwMjUgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuXHR+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZIFxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nIFxuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5pbXBvcnQgT01vZCBmcm9tIFwiLi9Nb2RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3ZlbiB7XG4gIHN0YXRpYyBtb2RzOiBBcnJheTxPTW9kPiA9IFtdO1xuXG4gIHN0YXRpYyByZWdpc3Rlck1vZChtb2RDbGFzczogYW55KSB7XG4gICAgTW9kQVBJLm1ldGEudGl0bGUobW9kQ2xhc3MudGl0bGUpO1xuICAgIE1vZEFQSS5tZXRhLnZlcnNpb24obW9kQ2xhc3MudmVyc2lvbik7XG4gICAgTW9kQVBJLm1ldGEuZGVzY3JpcHRpb24obW9kQ2xhc3MuZGVzY3JpcHRpb24pO1xuICAgIE1vZEFQSS5tZXRhLmNyZWRpdHMobW9kQ2xhc3MuY3JlZGl0cyk7XG4gICAgTW9kQVBJLm1ldGEuaWNvbihtb2RDbGFzcy5pY29uKTtcbiAgICBNb2RBUEkubWV0YS5jb25maWcobW9kQ2xhc3MuY29uZmlnKCkpO1xuICAgIG1vZENsYXNzLmluaXQoKTtcbiAgICBnbG9iYWxUaGlzLkRlYnVnX21vZGUgPSBtb2RDbGFzcy5EZWJ1Z19tb2RlO1xuICAgIGlmIChtb2RDbGFzcy5vbmx5XzFfMTJfMiA9PT0gdHJ1ZSkge1xuICAgICAgLy8gSWxsIGRvIHNvbWUgbW9yZSBzdHVmZiBsYXRlclxuICAgIH1cbiAgICB0aGlzLm1vZHMucHVzaChtb2RDbGFzcyk7XG4gIH1cbn1cbiIsCiAgICAiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQmxvY2sge1xuICBwcml2YXRlIGJsb2NrVGV4dHVyZTogc3RyaW5nO1xuICBwcml2YXRlIGJsb2NrTmFtZTogc3RyaW5nO1xuICBwcml2YXRlIGJsb2NrSUQ6IHN0cmluZztcbiAgcHJpdmF0ZSBibG9ja0luc3RhbmNlOiBhbnk7XG4gIHByaXZhdGUgb25CcmVhazogKHdvcmxkOiBhbnksIHBvczogYW55LCBzdGF0ZTogYW55KSA9PiB2b2lkO1xuICAvLyBibG9jayBjbGFzcyBhdWF1YXV1YVxuICBjb25zdHJ1Y3RvcihcbiAgICBibG9ja05hbWU6IHN0cmluZyxcbiAgICBibG9ja0lEOiBzdHJpbmcsXG4gICAgdGV4dHVyZTogc3RyaW5nLFxuICAgIG9uQnJlYWs6ICh3b3JsZDogYW55LCBwb3M6IGFueSwgc3RhdGU6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICB0aGlzLmJsb2NrTmFtZSA9IGJsb2NrTmFtZTtcbiAgICB0aGlzLmJsb2NrSUQgPSBibG9ja0lEO1xuICAgIHRoaXMuYmxvY2tUZXh0dXJlID0gdGV4dHVyZTtcbiAgICB0aGlzLm9uQnJlYWsgPSBvbkJyZWFrO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyKCk6IGFueSB7XG4gICAgY29uc3QgQmxvY2tDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIik7XG4gICAgY29uc3QgSXRlbUNsYXNzID0gTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5pdGVtLkl0ZW1cIik7XG5cbiAgICBjb25zdCBjcmVhdGl2ZVRhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcbiAgICAgIFwibmV0Lm1pbmVjcmFmdC5jcmVhdGl2ZXRhYi5DcmVhdGl2ZVRhYnNcIlxuICAgICkuc3RhdGljVmFyaWFibGVzLnRhYkJsb2NrO1xuXG4gICAgY29uc3QgYmxvY2tTdXBlciA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKFxuICAgICAgQmxvY2tDbGFzcyxcbiAgICAgIChmbjogRnVuY3Rpb24pID0+IGZuLmxlbmd0aCA9PT0gMlxuICAgICk7XG4gICAgY29uc3QgYnJlYWtCbG9ja01ldGhvZCA9IEJsb2NrQ2xhc3MubWV0aG9kcy5icmVha0Jsb2NrLm1ldGhvZDtcblxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gQ3VzdG9tQmxvY2sodGhpczogYW55KTogdm9pZCB7XG4gICAgICBibG9ja1N1cGVyKHRoaXMsIE1vZEFQSS5tYXRlcmlhbHMucm9jay5nZXRSZWYoKSk7XG4gICAgICB0aGlzLiRkZWZhdWx0QmxvY2tTdGF0ZSA9IHRoaXMuJGJsb2NrU3RhdGUuJGdldEJhc2VTdGF0ZSgpO1xuICAgICAgdGhpcy4kc2V0Q3JlYXRpdmVUYWIoY3JlYXRpdmVUYWIpO1xuICAgIH1cblxuICAgIE1vZEFQSS5yZWZsZWN0LnByb3RvdHlwZVN0YWNrKEJsb2NrQ2xhc3MsIEN1c3RvbUJsb2NrKTtcblxuICAgIEN1c3RvbUJsb2NrLnByb3RvdHlwZS4kYnJlYWtCbG9jayA9IGZ1bmN0aW9uIChcbiAgICAgICR3b3JsZDogYW55LFxuICAgICAgJGJsb2NrcG9zOiBhbnksXG4gICAgICAkYmxvY2tzdGF0ZTogYW55XG4gICAgKTogYm9vbGVhbiB7XG4gICAgICBzZWxmLm9uQnJlYWsoJHdvcmxkLCAkYmxvY2twb3MsICRibG9ja3N0YXRlKTtcbiAgICAgIHJldHVybiBicmVha0Jsb2NrTWV0aG9kKHRoaXMsICR3b3JsZCwgJGJsb2NrcG9zLCAkYmxvY2tzdGF0ZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGludGVybmFsUmVnaXN0ZXIgPSAoKTogYW55ID0+IHtcbiAgICAgIGNvbnN0IGN1c3RvbV9ibG9jayA9IG5ldyBDdXN0b21CbG9jaygpXG4gICAgICAgIC4kc2V0SGFyZG5lc3MoMy4wKVxuICAgICAgICAuJHNldFN0ZXBTb3VuZChCbG9ja0NsYXNzLnN0YXRpY1ZhcmlhYmxlcy5zb3VuZFR5cGVQaXN0b24pXG4gICAgICAgIC4kc2V0VW5sb2NhbGl6ZWROYW1lKE1vZEFQSS51dGlsLnN0cih0aGlzLmJsb2NrSUQpKTtcblxuICAgICAgQmxvY2tDbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVyQmxvY2swLm1ldGhvZChcbiAgICAgICAgTW9kQVBJLmtleWdlbi5ibG9jayh0aGlzLmJsb2NrSUQpLFxuICAgICAgICBNb2RBUEkudXRpbC5zdHIodGhpcy5ibG9ja0lEKSxcbiAgICAgICAgY3VzdG9tX2Jsb2NrXG4gICAgICApO1xuXG4gICAgICBJdGVtQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3Rlckl0ZW1CbG9jazAubWV0aG9kKGN1c3RvbV9ibG9jayk7XG5cbiAgICAgIHRoaXMuZml4dXBCbG9ja0lkcygpO1xuICAgICAgTW9kQVBJLmJsb2Nrc1t0aGlzLmJsb2NrSURdID0gY3VzdG9tX2Jsb2NrO1xuICAgICAgdGhpcy5ibG9ja0luc3RhbmNlID0gY3VzdG9tX2Jsb2NrO1xuICAgICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmVkIGJsb2NrIG9uIGNsaWVudDogXCIgKyB0aGlzLmJsb2NrSUQpO1xuICAgICAgY29uc29sZS5sb2coY3VzdG9tX2Jsb2NrKTtcbiAgICAgIHJldHVybiBjdXN0b21fYmxvY2s7XG4gICAgfTtcblxuICAgIGlmIChNb2RBUEkubWF0ZXJpYWxzKSB7XG4gICAgICByZXR1cm4gaW50ZXJuYWxSZWdpc3RlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcImJvb3RzdHJhcFwiLCBpbnRlcm5hbFJlZ2lzdGVyKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpeHVwQmxvY2tJZHMoKTogdm9pZCB7XG4gICAgY29uc3QgYmxvY2tSZWdpc3RyeSA9IE1vZEFQSS51dGlsXG4gICAgICAud3JhcChcbiAgICAgICAgTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5ibG9jay5CbG9ja1wiKS5zdGF0aWNWYXJpYWJsZXNcbiAgICAgICAgICAuYmxvY2tSZWdpc3RyeVxuICAgICAgKVxuICAgICAgLmdldENvcnJlY3RpdmUoKTtcblxuICAgIGNvbnN0IEJMT0NLX1NUQVRFX0lEUyA9IE1vZEFQSS51dGlsXG4gICAgICAud3JhcChcbiAgICAgICAgTW9kQVBJLnJlZmxlY3QuZ2V0Q2xhc3NCeUlkKFwibmV0Lm1pbmVjcmFmdC5ibG9jay5CbG9ja1wiKS5zdGF0aWNWYXJpYWJsZXNcbiAgICAgICAgICAuQkxPQ0tfU1RBVEVfSURTXG4gICAgICApXG4gICAgICAuZ2V0Q29ycmVjdGl2ZSgpO1xuXG4gICAgYmxvY2tSZWdpc3RyeS5yZWdpc3RyeU9iamVjdHMuaGFzaFRhYmxlS1RvVi5mb3JFYWNoKFxuICAgICAgKGVudHJ5OiB7IHZhbHVlOiBhbnkgfSkgPT4ge1xuICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICBjb25zdCBibG9jayA9IGVudHJ5LnZhbHVlO1xuICAgICAgICAgIGNvbnN0IHZhbGlkU3RhdGVzID0gYmxvY2suZ2V0QmxvY2tTdGF0ZSgpLmdldFZhbGlkU3RhdGVzKCk7XG4gICAgICAgICAgY29uc3Qgc3RhdGVBcnJheSA9IHZhbGlkU3RhdGVzLmFycmF5IHx8IFt2YWxpZFN0YXRlcy5lbGVtZW50XTtcbiAgICAgICAgICBzdGF0ZUFycmF5LmZvckVhY2goKGlibG9ja3N0YXRlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGkgPVxuICAgICAgICAgICAgICAoYmxvY2tSZWdpc3RyeS5nZXRJREZvck9iamVjdChibG9jay5nZXRSZWYoKSkgPDwgNCkgfFxuICAgICAgICAgICAgICBibG9jay5nZXRNZXRhRnJvbVN0YXRlKGlibG9ja3N0YXRlLmdldFJlZigpKTtcbiAgICAgICAgICAgIEJMT0NLX1NUQVRFX0lEUy5wdXQoaWJsb2Nrc3RhdGUuZ2V0UmVmKCksIGkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZWdpc3RlckJsb2NrKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHZhciBjdXN0b21fYmxvY2sgPSBuZXcgT0Jsb2NrKHRoaXMuYmxvY2tOYW1lLCB0aGlzLmJsb2NrSUQsIHRoaXMuYmxvY2tUZXh0dXJlLCAoKSA9PiB0aGlzLm9uQnJlYWspLnJlZ2lzdGVyKCk7XG5cbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIE1vZEFQSS5kZWRpY2F0ZWRTZXJ2ZXIuYXBwZW5kQ29kZShnbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVyQmxvY2sodGhpcy5ibG9ja0lELCB0aGlzLm9uQnJlYWspKTtcblxuICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibGliOmFzeW5jc2lua1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICBNb2RBUEkuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJsaWI6YXN5bmNzaW5rOnJlZ2lzdGVyaXRlbXNcIixcbiAgICAgICAgKHJlbmRlckl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgIHJlbmRlckl0ZW0ucmVnaXN0ZXJCbG9jayhjdXN0b21fYmxvY2ssIE1vZEFQSS51dGlsLnN0cihzZWxmLmJsb2NrSUQpKTtcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgQXN5bmNTaW5rLkwxME4uc2V0KGB0aWxlLiR7c2VsZi5ibG9ja0lEfS5uYW1lYCwgc2VsZi5ibG9ja05hbWUpO1xuICAgICAgY29uc29sZS5sb2coYFNldCBsb2NhbGl6YXRpb24gZm9yIGJsb2NrICR7c2VsZi5ibG9ja0lEfWApO1xuICAgICAgQXN5bmNTaW5rLnNldEZpbGUoXG4gICAgICAgIGByZXNvdXJjZXBhY2tzL0FzeW5jU2lua0xpYi9hc3NldHMvbWluZWNyYWZ0L21vZGVscy9ibG9jay8ke3NlbGYuYmxvY2tJRH0uanNvbmAsXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBwYXJlbnQ6IFwiYmxvY2svY3ViZV9hbGxcIixcbiAgICAgICAgICB0ZXh0dXJlczoge1xuICAgICAgICAgICAgYWxsOiBgYmxvY2tzLyR7c2VsZi5ibG9ja0lEfWAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIEFzeW5jU2luay5zZXRGaWxlKFxuICAgICAgICBgcmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9tb2RlbHMvaXRlbS8ke3NlbGYuYmxvY2tJRH0uanNvbmAsXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBwYXJlbnQ6IGBibG9jay8ke3NlbGYuYmxvY2tJRH1gLFxuICAgICAgICAgIGRpc3BsYXk6IHtcbiAgICAgICAgICAgIHRoaXJkcGVyc29uOiB7XG4gICAgICAgICAgICAgIHJvdGF0aW9uOiBbMTAsIC00NSwgMTcwXSxcbiAgICAgICAgICAgICAgdHJhbnNsYXRpb246IFswLCAxLjUsIC0yLjc1XSxcbiAgICAgICAgICAgICAgc2NhbGU6IFswLjM3NSwgMC4zNzUsIDAuMzc1XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIEFzeW5jU2luay5zZXRGaWxlKFxuICAgICAgICBgcmVzb3VyY2VwYWNrcy9Bc3luY1NpbmtMaWIvYXNzZXRzL21pbmVjcmFmdC9ibG9ja3N0YXRlcy8ke3NlbGYuYmxvY2tJRH0uanNvbmAsXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICB2YXJpYW50czoge1xuICAgICAgICAgICAgbm9ybWFsOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb2RlbDogc2VsZi5ibG9ja0lELFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChzZWxmLmJsb2NrVGV4dHVyZSk7XG4gICAgICBjb25zdCBidWZmZXIgPSBhd2FpdCByZXNwb25zZS5hcnJheUJ1ZmZlcigpO1xuXG4gICAgICBBc3luY1Npbmsuc2V0RmlsZShcbiAgICAgICAgYHJlc291cmNlcGFja3MvQXN5bmNTaW5rTGliL2Fzc2V0cy9taW5lY3JhZnQvdGV4dHVyZXMvYmxvY2tzLyR7c2VsZi5ibG9ja0lEfS5wbmdgLFxuICAgICAgICBidWZmZXJcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiIsCiAgICAiZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyU2VydmVySXRlbShpdGVtSUQ6IHN0cmluZywgb25SaWdodENsaWNrOiAoJCRpdGVtc3RhY2s6IGFueSkgPT4gdm9pZCkge1xyXG4gICAgaWYgKE1vZEFQSS5pc1NlcnZlciA9PT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJlZ2lzdGVyU2VydmVySXRlbSBjYW4gb25seSBiZSB1c2VkIG9uIHRoZSBzZXJ2ZXIgc2lkZS5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY3JlYXRpdmVNaXNjVGFiOiBhbnkgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXHJcbiAgICAgICAgXCJuZXQubWluZWNyYWZ0LmNyZWF0aXZldGFiLkNyZWF0aXZlVGFic1wiXHJcbiAgICApLnN0YXRpY1ZhcmlhYmxlcy50YWJNaXNjO1xyXG4gICAgY29uc3QgJCRpdGVtR2V0QXR0cmlidXRlcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCIpLm1ldGhvZHMuZ2V0SXRlbUF0dHJpYnV0ZU1vZGlmaWVycy5tZXRob2Q7XHJcbiAgICBjb25zdCBpdGVtQ2xhc3M6IGFueSA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcclxuICAgICAgICBcIm5ldC5taW5lY3JhZnQuaXRlbS5JdGVtXCJcclxuICAgICk7XHJcbiAgICBjb25zdCBpdGVtU3VwZXI6IGFueSA9IE1vZEFQSS5yZWZsZWN0LmdldFN1cGVyKFxyXG4gICAgICAgIGl0ZW1DbGFzcyxcclxuICAgICAgICAoZm46IEZ1bmN0aW9uKSA9PiBmbi5sZW5ndGggPT09IDFcclxuICAgICk7XHJcblxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBubWlfT3Zlbkl0ZW0odGhpczogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaXRlbVN1cGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuJHNldENyZWF0aXZlVGFiKGNyZWF0aXZlTWlzY1RhYik7XHJcbiAgICAgICAgdGhpcy4kbWF4U3RhY2tTaXplID0gKDY0KTtcclxuICAgIH1cclxuXHJcbiAgICBNb2RBUEkucmVmbGVjdC5wcm90b3R5cGVTdGFjayhpdGVtQ2xhc3MsIG5taV9PdmVuSXRlbSk7XHJcblxyXG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtUmlnaHRDbGljayA9IGZ1bmN0aW9uIChcclxuICAgICAgICAkJGl0ZW1zdGFjazogYW55LFxyXG4gICAgICAgICQkd29ybGQ6IGFueSxcclxuICAgICAgICAkJHBsYXllcjogYW55XHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBvblJpZ2h0Q2xpY2soJCRpdGVtc3RhY2spO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCQkaXRlbXN0YWNrKTtcclxuICAgICAgICByZXR1cm4gKCQkaXRlbXN0YWNrKTtcclxuICAgIH07XHJcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvblVwZGF0ZSA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCR3b3JsZCwgJCRwbGF5ZXIsICQkaG90YmFyX3Nsb3QsICQkaXNfaGVsZCkge1xyXG4gICAgICAgICQkaXNfaGVsZCA9ICgkJGlzX2hlbGQpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiAoJCRpdGVtc3RhY2spO1xyXG4gICAgfVxyXG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kb25JdGVtVXNlRmluaXNoID0gZnVuY3Rpb24gKCQkaXRlbXN0YWNrLCAkJHdvcmxkLCAkJHBsYXllcikge1xyXG4gICAgICAgIHJldHVybiAoJCRpdGVtc3RhY2spO1xyXG4gICAgfVxyXG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kZ2V0TWF4SXRlbVVzZUR1cmF0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAzMjtcclxuICAgIH1cclxuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJGdldEl0ZW1BdHRyaWJ1dGVNb2RpZmllcnMgPSBmdW5jdGlvbiAoKSB7IC8vMS4xMiB3b3JrcyBpIHRoaW5rXHJcbiAgICAgICAgdmFyICQkYXR0cmlidXRlbWFwID0gJCRpdGVtR2V0QXR0cmlidXRlcy5hcHBseSh0aGlzLCBbXSk7XHJcbiAgICAgICAgcmV0dXJuICQkYXR0cmlidXRlbWFwO1xyXG4gICAgfVxyXG4gICAgbm1pX092ZW5JdGVtLnByb3RvdHlwZS4kZ2V0U3RyVnNCbG9jayA9IGZ1bmN0aW9uICgkJGl0ZW1zdGFjaywgJCRibG9jaykge1xyXG4gICAgICAgIHJldHVybiAxLjA7XHJcbiAgICB9XHJcbiAgICBubWlfT3Zlbkl0ZW0ucHJvdG90eXBlLiRvbkNyZWF0ZWQgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkcGxheWVyKSB7IC8vMS4xMiB3b3Jrc1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIG5taV9PdmVuSXRlbS5wcm90b3R5cGUuJG9uQmxvY2tEZXN0cm95ZWQgPSBmdW5jdGlvbiAoJCRpdGVtc3RhY2ssICQkd29ybGQsICQkYmxvY2ssICQkYmxvY2twb3MsICQkZW50aXR5KSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpbnRlcm5hbF9yZWcgPSAoKTogYW55ID0+IHtcclxuICAgICAgICB2YXIgaXRlbUluc3RhbmNlOiBhbnkgPSBuZXcgbm1pX092ZW5JdGVtKCkuJHNldFVubG9jYWxpemVkTmFtZShcclxuICAgICAgICAgICAgTW9kQVBJLnV0aWwuc3RyKGAke2l0ZW1JRH1gKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGl0ZW1DbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVySXRlbS5tZXRob2QoXHJcbiAgICAgICAgICAgIE1vZEFQSS5rZXlnZW4uaXRlbShgJHtpdGVtSUR9YCksXHJcbiAgICAgICAgICAgIE1vZEFQSS51dGlsLnN0cihgJHtpdGVtSUR9YCksXHJcbiAgICAgICAgICAgIGl0ZW1JbnN0YW5jZVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIE1vZEFQSS5pdGVtc1tgJHtpdGVtSUR9YF0gPSBpdGVtSW5zdGFuY2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coaXRlbUluc3RhbmNlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyaW5nIGl0ZW1cIik7XHJcblxyXG4gICAgICAgIHJldHVybiBpdGVtSW5zdGFuY2U7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChNb2RBUEkuaXRlbXMpIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJuYWxfcmVnKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsX3JlZyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyU2VydmVyQmxvY2soYmxvY2tJRDogc3RyaW5nLCBvbkJyZWFrOiAoJHdvcmxkOiBhbnksICRibG9ja3BvczogYW55LCAkYmxvY2tzdGF0ZTogYW55KSA9PiB2b2lkKSB7XHJcbiAgICBpZiAoTW9kQVBJLmlzU2VydmVyID09PSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVnaXN0ZXJTZXJ2ZXJCbG9jayBjYW4gb25seSBiZSB1c2VkIG9uIHRoZSBzZXJ2ZXIgc2lkZS5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgQmxvY2tDbGFzcyA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIik7XHJcbiAgICBjb25zdCBJdGVtQ2xhc3MgPSBNb2RBUEkucmVmbGVjdC5nZXRDbGFzc0J5SWQoXCJuZXQubWluZWNyYWZ0Lml0ZW0uSXRlbVwiKTtcclxuXHJcbiAgICBjb25zdCBjcmVhdGl2ZVRhYiA9IE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcclxuICAgICAgICBcIm5ldC5taW5lY3JhZnQuY3JlYXRpdmV0YWIuQ3JlYXRpdmVUYWJzXCJcclxuICAgICkuc3RhdGljVmFyaWFibGVzLnRhYkJsb2NrO1xyXG5cclxuICAgIGNvbnN0IGJsb2NrU3VwZXIgPSBNb2RBUEkucmVmbGVjdC5nZXRTdXBlcihcclxuICAgICAgICBCbG9ja0NsYXNzLFxyXG4gICAgICAgIChmbjogRnVuY3Rpb24pID0+IGZuLmxlbmd0aCA9PT0gMlxyXG4gICAgKTtcclxuICAgIGNvbnN0IGJyZWFrQmxvY2tNZXRob2QgPSBCbG9ja0NsYXNzLm1ldGhvZHMuYnJlYWtCbG9jay5tZXRob2Q7XHJcblxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBDdXN0b21CbG9jayh0aGlzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBibG9ja1N1cGVyKHRoaXMsIE1vZEFQSS5tYXRlcmlhbHMucm9jay5nZXRSZWYoKSk7XHJcbiAgICAgICAgdGhpcy4kZGVmYXVsdEJsb2NrU3RhdGUgPSB0aGlzLiRibG9ja1N0YXRlLiRnZXRCYXNlU3RhdGUoKTtcclxuICAgICAgICB0aGlzLiRzZXRDcmVhdGl2ZVRhYihjcmVhdGl2ZVRhYik7XHJcbiAgICB9XHJcblxyXG4gICAgTW9kQVBJLnJlZmxlY3QucHJvdG90eXBlU3RhY2soQmxvY2tDbGFzcywgQ3VzdG9tQmxvY2spO1xyXG5cclxuICAgIEN1c3RvbUJsb2NrLnByb3RvdHlwZS4kYnJlYWtCbG9jayA9IGZ1bmN0aW9uIChcclxuICAgICAgICAkd29ybGQ6IGFueSxcclxuICAgICAgICAkYmxvY2twb3M6IGFueSxcclxuICAgICAgICAkYmxvY2tzdGF0ZTogYW55XHJcbiAgICApOiBib29sZWFuIHtcclxuICAgICAgICBvbkJyZWFrKCR3b3JsZCwgJGJsb2NrcG9zLCAkYmxvY2tzdGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGJyZWFrQmxvY2tNZXRob2QodGhpcywgJHdvcmxkLCAkYmxvY2twb3MsICRibG9ja3N0YXRlKTtcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiBmaXh1cEJsb2NrSWRzKCkge1xyXG4gICAgICAgIGNvbnN0IGJsb2NrUmVnaXN0cnkgPSBNb2RBUEkudXRpbFxyXG4gICAgICAgICAgICAud3JhcChcclxuICAgICAgICAgICAgICAgIE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIikuc3RhdGljVmFyaWFibGVzXHJcbiAgICAgICAgICAgICAgICAgICAgLmJsb2NrUmVnaXN0cnlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuZ2V0Q29ycmVjdGl2ZSgpO1xyXG5cclxuICAgICAgICBjb25zdCBCTE9DS19TVEFURV9JRFMgPSBNb2RBUEkudXRpbFxyXG4gICAgICAgICAgICAud3JhcChcclxuICAgICAgICAgICAgICAgIE1vZEFQSS5yZWZsZWN0LmdldENsYXNzQnlJZChcIm5ldC5taW5lY3JhZnQuYmxvY2suQmxvY2tcIikuc3RhdGljVmFyaWFibGVzXHJcbiAgICAgICAgICAgICAgICAgICAgLkJMT0NLX1NUQVRFX0lEU1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5nZXRDb3JyZWN0aXZlKCk7XHJcblxyXG4gICAgICAgIGJsb2NrUmVnaXN0cnkucmVnaXN0cnlPYmplY3RzLmhhc2hUYWJsZUtUb1YuZm9yRWFjaChcclxuICAgICAgICAgICAgKGVudHJ5OiB7IHZhbHVlOiBhbnkgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmxvY2sgPSBlbnRyeS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWxpZFN0YXRlcyA9IGJsb2NrLmdldEJsb2NrU3RhdGUoKS5nZXRWYWxpZFN0YXRlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRlQXJyYXkgPSB2YWxpZFN0YXRlcy5hcnJheSB8fCBbdmFsaWRTdGF0ZXMuZWxlbWVudF07XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVBcnJheS5mb3JFYWNoKChpYmxvY2tzdGF0ZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGkgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJsb2NrUmVnaXN0cnkuZ2V0SURGb3JPYmplY3QoYmxvY2suZ2V0UmVmKCkpIDw8IDQpIHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrLmdldE1ldGFGcm9tU3RhdGUoaWJsb2Nrc3RhdGUuZ2V0UmVmKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBCTE9DS19TVEFURV9JRFMucHV0KGlibG9ja3N0YXRlLmdldFJlZigpLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpbnRlcm5hbFJlZ2lzdGVyID0gKCk6IGFueSA9PiB7XHJcbiAgICAgICAgY29uc3QgY3VzdG9tX2Jsb2NrID0gbmV3IEN1c3RvbUJsb2NrKClcclxuICAgICAgICAgICAgLiRzZXRIYXJkbmVzcygzLjApXHJcbiAgICAgICAgICAgIC4kc2V0U3RlcFNvdW5kKEJsb2NrQ2xhc3Muc3RhdGljVmFyaWFibGVzLnNvdW5kVHlwZVBpc3RvbilcclxuICAgICAgICAgICAgLiRzZXRVbmxvY2FsaXplZE5hbWUoTW9kQVBJLnV0aWwuc3RyKGJsb2NrSUQpKTtcclxuXHJcbiAgICAgICAgQmxvY2tDbGFzcy5zdGF0aWNNZXRob2RzLnJlZ2lzdGVyQmxvY2swLm1ldGhvZChcclxuICAgICAgICAgICAgTW9kQVBJLmtleWdlbi5ibG9jayhibG9ja0lEKSxcclxuICAgICAgICAgICAgTW9kQVBJLnV0aWwuc3RyKGJsb2NrSUQpLFxyXG4gICAgICAgICAgICBjdXN0b21fYmxvY2tcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBJdGVtQ2xhc3Muc3RhdGljTWV0aG9kcy5yZWdpc3Rlckl0ZW1CbG9jazAubWV0aG9kKGN1c3RvbV9ibG9jayk7XHJcblxyXG4gICAgICAgIGZpeHVwQmxvY2tJZHMoKTtcclxuICAgICAgICBNb2RBUEkuYmxvY2tzW2Jsb2NrSURdID0gY3VzdG9tX2Jsb2NrO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXJpbmcgYmxvY2sgb24gc2VydmVyIHNpZGVcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coY3VzdG9tX2Jsb2NrKTtcclxuICAgICAgICByZXR1cm4gY3VzdG9tX2Jsb2NrO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoTW9kQVBJLm1hdGVyaWFscykge1xyXG4gICAgICAgIHJldHVybiBpbnRlcm5hbFJlZ2lzdGVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwiYm9vdHN0cmFwXCIsIGludGVybmFsUmVnaXN0ZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLAogICAgIi8qXG4gIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cbiAgT3ZlbiBNb2QgRGV2ZWxvcG1lbnQgS2l0IChPdmVuTURLKSBSdW50aW1lXG4gIERldiBraXQgdXNlZCBmb3Igc2ltcGxpZnlpbmcgRWFnbGVyRm9yZ2UgbW9kIGRldmVsb3BtZW50LlxuXHRcbiAgQ29weXJpZ2h0IDIwMjUgQmxvY2tfMjIyMlxuICAgIExpY2VuY2VkIHVuZGVyIEdOVSBMR1BMLTMuMC1vci1sYXRlclxuICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG5cbiAgICBUaGlzIGZpbGUgaXMgcGFydCBvZiBPdmVuTURLLlxuXG4gICAgT3Zlbk1ESyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5IGl0IHVuZGVyXG4gICAgdGhlIHRlcm1zIG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5IHRoZSBGcmVlXG4gICAgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBcbiAgICBhbnkgbGF0ZXIgdmVyc2lvbi5cblxuICAgIE92ZW5NREsgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCwgYnV0IFdJVEhPVVQgQU5ZIFxuICAgIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2YgTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgXG4gICAgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuXG4gICAgWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nIFxuICAgIHdpdGggT3ZlbiBNREsuIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5pbXBvcnQgaWNvbiBmcm9tIFwiQVNTRVRTL2RlZmF1bHRJY29uLnBuZ1wiO1xuXG5Nb2RBUEkubWV0YS50aXRsZShcIk92ZW5NREsgUnVudGltZVwiKTtcbk1vZEFQSS5tZXRhLnZlcnNpb24oXCJJTkRFVlwiKTtcbk1vZEFQSS5tZXRhLmRlc2NyaXB0aW9uKFxuICBcIlVub2ZmaWNpYWwgZGV2IGtpdCB1c2VkIGZvciBzaW1wbGlmeWluZyBFYWdsZXJGb3JnZSBtb2QgZGV2ZWxvcG1lbnQuXCJcbik7XG5Nb2RBUEkubWV0YS5jcmVkaXRzKFwiQmxvY2tfMjIyMlwiKTtcbk1vZEFQSS5tZXRhLmljb24oaWNvbik7XG5pbXBvcnQgT0l0ZW0gZnJvbSBcImNsYXNzZXMvY29yZS9PSXRlbVwiO1xuaW1wb3J0IE9Nb2QgZnJvbSBcImNsYXNzZXMvY29yZS9Nb2RcIjtcbmltcG9ydCBPdmVuIGZyb20gXCJjbGFzc2VzL2NvcmUvT3ZlblwiO1xuaW1wb3J0IE9CbG9jayBmcm9tIFwiY2xhc3Nlcy9jb3JlL09CbG9ja1wiO1xuaW1wb3J0IHsgcmVnaXN0ZXJTZXJ2ZXJJdGVtLCByZWdpc3RlclNlcnZlckJsb2NrIH0gZnJvbSBcImNsYXNzZXMvY29yZS9IZWxwZXJfZnVuY1wiO1xuZ2xvYmFsVGhpcy5yZWdpc3RlclNlcnZlckl0ZW0gPSByZWdpc3RlclNlcnZlckl0ZW07XG5nbG9iYWxUaGlzLnJlZ2lzdGVyU2VydmVyQmxvY2sgPSByZWdpc3RlclNlcnZlckJsb2NrO1xuZ2xvYmFsVGhpcy5PSXRlbSA9IE9JdGVtO1xuZ2xvYmFsVGhpcy5PTW9kID0gT01vZDtcbmdsb2JhbFRoaXMuT3Zlbk1ESyA9IE92ZW47XG5nbG9iYWxUaGlzLk9CbG9jayA9IE9CbG9jaztcbk1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBcbiAgICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcbiAgICDilIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxuICAgIOKUgiAgIHdlbGNvbWUgdG8gT3Zlbk1ESyAgICAgICAgICAgICAg4pSCXG4gICAg4pSCICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcbiAgICDilIIgICBBIG1vZCBtYWtlciBraXQgZm9yIHN0YXJ0ZXJzICAgIOKUglxuICAgIOKUgiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXG4gICAg4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG4gICAgYCk7XG59KTsiCiAgXSwKICAibWFwcGluZ3MiOiAiOzs7O0FBQ0EsTUFBcUIsTUFBTTtBQUFBLEVBQ2pCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRVIsV0FBVyxDQUNULFVBQ0EsUUFDQSxTQUNBLGNBQ0E7QUFBQSxJQUNBLEtBQUssV0FBVztBQUFBLElBQ2hCLEtBQUssU0FBUztBQUFBLElBQ2QsS0FBSyxjQUFjO0FBQUEsSUFDbkIsS0FBSyxl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
