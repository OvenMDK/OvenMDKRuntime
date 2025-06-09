/*
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Mod.ts
	
	Copyright 2025 Block_2222
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
import defaultIcon from "ASSETS/defaultIcon.png"
export default class OMod {
    static title:string = "Default Name";
    static version:string = "";
    static description:string = "Default OvenMDK Description. Set 'description' in your OMod class!";
    static credits:string = "None Given";
    static icon:string = defaultIcon;
	
    static acceptedMinecraftVersions:Array<string> = null;
    static acceptedEaglerUpdates:Array<string> = null;
    static acceptedEFVersions:Array<string> = null;
    static acceptedEFFlavour:string = "injector";

    static clientSideOnly:boolean = false;
    static serverSideOnly:boolean = false;
    static only_1_12_2:boolean = false;
    static config():void {

    }
    static init():void {

    }
    static postInit():void {

    }
}
