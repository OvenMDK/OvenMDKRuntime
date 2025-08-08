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
  registerEntityServer,
  OvenMDK__defineExecCmdAsGlobal,
  registerOvenOreServer,
} from "classes/core/Helper_func";
import OItem from "classes/core/OItem";
import OMod from "classes/core/Mod";
import Oven from "classes/core/Oven";
import OBlock from "classes/core/OBlock";
import { simplecommand } from "classes/core/commands";
import OEntity from "./classes/core/OEntity";
import OvenOre from "classes/core/OvenOre";
//const devmode = true;
ModAPI.events.newEvent("lib:OvenMDK:load");
ModAPI.events.newEvent("lib:OvenMDK:loaded");
ModAPI.addEventListener("lib:OvenMDK:load", () => {
  console.log("OvenMDK Runtime is loading");
  console.log("Loading OvenMDK globals");
  globalThis.registerServerItem = registerServerItem;
  globalThis.registerServerBlock = registerServerBlock;
  globalThis.registerEntityServer = registerEntityServer;
  globalThis.OItem = OItem;
  globalThis.OMod = OMod;
  globalThis.OvenMDK = Oven;
  globalThis.OBlock = OBlock;
  globalThis.simplecommand = simplecommand;
  globalThis.OvenOre = OvenOre;
  globalThis.registerOvenOreServer = registerOvenOreServer;
  globalThis.OEntity = OEntity;
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
    `globalThis.registerOvenOreServer = ${registerOvenOreServer};`
  );
  console.log("Register Oven Ore serverside function loaded");
  ModAPI.dedicatedServer.appendCode(OvenMDK__defineExecCmdAsGlobal);
  OvenMDK__defineExecCmdAsGlobal();
  console.log(
    "OvenMDK__ExecCmdAsGlobal serverside and clientside function loaded"
  );
  ModAPI.dedicatedServer.appendCode(
    `globalThis.registerServerBlock = ${registerServerBlock};`
  );
  console.log("Register Entity serverside function loaded");
  ModAPI.dedicatedServer.appendCode(
    `globalThis.registerEntityServer = ${registerEntityServer};`
  );
  console.log("Register Block serverside function loaded");
  ModAPI.events.callEvent("lib:OvenMDK:loaded", {});
});
ModAPI.addEventListener("lib:OvenMDK:loaded", (version) => {
  console.log("OvenMDK Runtime has finished loading");
  console.log(`
    ┌───────────────────────────────────┐
    │                                   │
    │   OvenMDK has loaded              │
    │                                   │
    │   welcome to ovenMDK              │
    │                                   │
    │   A mod dev kit for starters      │
    │                                   │
    │   Version: ${version}                   │
    │                                   │
    └───────────────────────────────────┘
    `);
  simplecommand("/ovenmdk", " log_1", () => {
    ModAPI.displayToChat(`
      OvenMDK Runtime v0.1
      Made by BendieGames and Block_2222
      - Added basic core classes
      ( Not much can be documented due to so little being added )`)
  });
  simplecommand("/ovenmdk", " log_2", () => {
    ModAPI.displayToChat(`
      OvenMDK Runtime v0.2
      Made by BendieGames and Block_2222
      - Added support for 1.12
      - Added support for OvenOre
      - Added support for OEntity
      - QOL improvements
      - Added support for OvenMDK__ExecCmdAsGlobal
      - Added support for OvenMDK__defineExecCmdAsGlobal
      - Added support for simplecommands`)
  });
});
ModAPI.addCredit(
  "OvenMDK Coding lead",
  "BendieGames",
  " - Made OvenMDK\n - Coded most of OvenMDK"
);
ModAPI.addCredit("OvenMDK Founder", "Block_2222", " - Founded OvenMDK");
ModAPI.events.callEvent("lib:OvenMDK:load", {version: "v0.2"});
