/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  OSpawnegg.ts

  Copyright 2025 BendieGames and Block_2222
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

exort default class OSpawnegg {
    private itemTexture: string;
    private itemName: string;
    private itemID: string;
    private itemStack: number;
    private entityID: string;
    
    constructor(
        itemName: string,
        itemID: string,
        itemStack: number,
        texture: string,
        entityID: string
    ) {
        this.itemName = itemName;
        this.itemID = itemID;
        this.itemStack = itemStack;
        this.itemTexture = texture;
        this.entityID = entityID;
    }
    
    public registerClient(): void {
        // Implementation for registering the spawn egg client-side
        
    }
    }
    public registerOSpawnegg(): void {
        // async stuff
        // also you need a helper function
    }