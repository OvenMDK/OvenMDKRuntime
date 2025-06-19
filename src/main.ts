/*
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Oven Mod Development Kit (OvenMDK) Runtime
	Dev kit used for simplifying EaglerForge mod development.
	
	Copyright 2025 Block_2222
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
ModAPI.meta.version("INDEV");
ModAPI.meta.description(
  "Unofficial dev kit used for simplifying EaglerForge mod development."
);
ModAPI.meta.credits("Block_2222");
ModAPI.meta.icon(icon);
import OItem from "classes/core/OItem";
import OMod from "classes/core/Mod";
import Oven from "classes/core/Oven";
//import OBlock from "classes/core/OBlock";
globalThis.OItem = OItem;
globalThis.OMod = OMod;
globalThis.OvenMDK = Oven;
//globalThis.OBlock = OBlock;
