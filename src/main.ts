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

import icon from "ASSETS/defaultIcon.png";

ModAPI.meta.title("OvenMDK Runtime");
ModAPI.meta.version("Alpha v0.2");
ModAPI.meta.description(
  "Unofficial dev kit used for simplifying EaglerForge mod development."
);
ModAPI.meta.credits("BendieGames and Block_2222");
ModAPI.meta.icon(icon);
import {
  registerServerItem,
  registerServerBlock,
} from "classes/core/Helper_func";
import OItem from "classes/core/OItem";
import OMod from "classes/core/Mod";
import Oven from "classes/core/Oven";
import OBlock from "classes/core/OBlock";
import { simplecommand } from "classes/core/commands";
//import OEntity from "./classes/core/OEntity"
const devmode = true;
ModAPI.events.newEvent("lib:OvenMDK:load");
ModAPI.events.newEvent("lib:OvenMDK:loaded");
ModAPI.addEventListener("lib:OvenMDK:load", () => {
  console.log("OvenMDK Runtime is loading");
  console.log("Loading OvenMDK globals");
  globalThis.registerServerItem = registerServerItem;
  globalThis.registerServerBlock = registerServerBlock;
  globalThis.OItem = OItem;
  globalThis.OMod = OMod;
  globalThis.OvenMDK = Oven;
  globalThis.OBlock = OBlock;
  globalThis.simplecommand = simplecommand;
  //globalThis.OEntity = OEntity;
  if (ModAPI.is_1_12) {
    if (!devmode) {
      alert(
        "OvenMDK does not fully support 1.12 at this time, please use 1.8.8 for full support"
      );
      console.log("1.12 detected");
      console.error(
        "OvenMDK does not fully support 1.12 at this time, please use 1.8.8 for full support"
      );
    }
  }
  console.log("OvenMDK globals have been set and loaded");
  ModAPI.dedicatedServer.appendCode(
    `globalThis.registerServerItem = ${registerServerItem};`
  );
  console.log("Register Item serverside function loaded");
  ModAPI.dedicatedServer.appendCode(
    `globalThis.registerServerBlock = ${registerServerBlock};`
  );
  console.log("Register Block serverside function loaded");
  ModAPI.events.callEvent("lib:OvenMDK:loaded", {});
});
ModAPI.addEventListener("lib:OvenMDK:loaded", () => {
  console.log("OvenMDK Runtime has finished loading");
  console.log(`
    ┌───────────────────────────────────┐
    │                                   │
    │   OvenMDK has loaded              │
    │                                   │
    │   welcome to ovenMDK              │
    │                                   │
    │   A mod maker kit for starters    │
    │                                   │
    └───────────────────────────────────┘
    `);
});

ModAPI.events.callEvent("lib:OvenMDK:load", {});
