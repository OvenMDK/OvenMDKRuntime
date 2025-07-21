
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
    const creativeMiscTab: any = ModAPI.reflect.getClassById(
      "net.minecraft.creativetab.CreativeTabs"
    ).staticVariables.tabMisc;

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
    nmi_OvenItem.prototype.$onItemRightClick = function (
      $$itemstack: any,
      $$world: any,
      $$player: any
    ): void {
      self.onRightClick($$itemstack);
      ($$player).$setItemInUse($$itemstack,32);
      var $$itemstack,$$world,$$player;
      console.log(`client itemstack:`);
      console.log($$itemstack);
      return ($$itemstack);
    };
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
