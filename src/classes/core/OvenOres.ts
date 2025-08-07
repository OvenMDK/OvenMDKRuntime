export default class OvenOre {
  public veinSize: number;
  public veinCount: number;
  public minGenerationHeight: number;
  public maxGenerationHeight: number;

  constructor(
    veinSize: number = 4,
    veinCount: number,
    minGenerationHeight: number,
    maxGenerationHeight: number
  ) {
    this.veinSize = veinSize;
    this.veinCount = veinCount;
    this.minGenerationHeight = minGenerationHeight;
    this.maxGenerationHeight = maxGenerationHeight;
  }
  public registerOvenOre(): void {
    ModAPI.dedicatedServer.appendCode(`globalThis.registerOvenOreServer`);
  }
}
