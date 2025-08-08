/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Oven Mod Development Kit (OvenMDK) Runtime
  Dev kit used for simplifying EaglerForge mod development.
	
  Copyright 2025 BendieGames and Block_2222
    Licenced under GNU LGPL-3.0-or-later
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
export default class OvenOre {
  public blockID: string;
  public veinSize: number;
  public veinCount: number;
  public minGenerationHeight: number;
  public maxGenerationHeight: number;

  constructor(
    blockID: string,
    veinSize: number,
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
