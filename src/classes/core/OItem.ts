export default class OItem {
  private itemTexture: string;
  private itemName: string;
  private itemID: string;
  private itemInstance: any;
  private onRightClick: ($itemstack: any) => void;

  constructor(
    itemName: string,
    itemID: string,
    texture: string,
    onRightClick: ($itemstack: any) => void
  ) {
    this.itemName = itemName;
    this.itemID = itemID;
    this.itemTexture = texture;
    this.onRightClick = onRightClick;
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
      (fn: Function) => fn.length === 1
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
    ): void {
      self.onRightClick($itemstack);
      if (globalThis.Debug_mode === true) {
        console.log($itemstack);
      }
      return $itemstack;
    };

    const internal_reg = (): any => {
      const itemInstance: any = new nmi_OvenItem().$setUnlocalizedName(
        ModAPI.util.str(`${self.itemID}`)
      );

      itemClass.staticMethods.registerItem.method(
        ModAPI.keygen.item(`${self.itemID}`),
        ModAPI.util.str(`${self.itemID}`),
        itemInstance
      );

      ModAPI.items[`${self.itemID}`] = itemInstance;
      if (globalThis.Debug_mode === true) {
        console.log(itemInstance);
      }
      console.log("Registering item");
      self.itemInstance = itemInstance;

      return itemInstance;
    };

    if (ModAPI.items) {
      return internal_reg();
    } else {
      ModAPI.addEventListener("bootstrap", internal_reg);
    }
  }

  public async registerClient(): Promise<void> {
    var custom_item = this.register();
    const self = this;
    const custom_item_data = new OItem(
      self.itemName,
      self.itemID,
      self.itemTexture,
      self.onRightClick
    );

    ModAPI.dedicatedServer.appendCode(() => custom_item_data.register());
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
