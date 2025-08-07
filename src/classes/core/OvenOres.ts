export default class OvenOre {
  public blockID: string;
  public veinSize: number;
  public veinCount: number;
  public minGenerationHeight: number;
  public maxGenerationHeight: number;

  constructor(
    blockID: string,
    veinSize: number = 4,
    veinCount: number,
    minGenerationHeight: number,
    maxGenerationHeight: number
  ) {
    this.blockID = blockID;
    this.veinSize = veinSize;
    this.veinCount = veinCount;
    this.minGenerationHeight = minGenerationHeight;
    this.maxGenerationHeight = maxGenerationHeight;
  }
  public registerOvenOre(): void {
    ModAPI.dedicatedServer.appendCode(
      `globalThis.registerOvenOreServer("${this.blockID}",${this.veinSize},${this.veinCount},${this.minGenerationHeight},${this.maxGenerationHeight});`
    );
  }
}
