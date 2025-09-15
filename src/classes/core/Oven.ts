/*
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Oven.ts
	
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

import OMod from "./Mod";

export default class Oven {
  static mods: Array<OMod> = [];

  static registerMod(modClass: any) {
    ModAPI.meta.title(modClass.title);
    ModAPI.meta.version(modClass.version);
    ModAPI.meta.description(modClass.description);
    ModAPI.meta.credits(modClass.credits);
    ModAPI.meta.icon(modClass.icon);
    ModAPI.meta.config(modClass.config);
    globalThis.Debug_mode = modClass.Debug_mode;
    ModAPI.dedicatedServer.appendCode(`globalThis.Debug_mode = ${modClass.Debug_mode};`);
    modClass.init();
    this.mods.push(modClass);
  }

  static util = {
    oggtoBase64string: (ogg: string) => {
      const base64 = btoa(
        new Uint8Array(ogg.split(",").map((x) => parseInt(x, 10))).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return base64;
    },
  };
    
}

type LogLevel = 'log' | 'info' | 'warn' | 'error';

interface OvenMDKLoggerOptions {
  appName?: string;
  getTime?: () => string;
}

export class OvenMDKLogger {
  private appName: string;
  private getTime: () => string;

  private levelIcons: Record<LogLevel, string> = {
    log: '⭐',
    info: 'ℹ️',
    warn: '⚠️',
    error: '❌',
  };

  private tagStyles: Record<LogLevel, string> = {
    log: `background: #d6eaff; color: #003f66; font-weight: bold; border-radius: 4px; padding: 0 8px; font-size: 12px;`,
    info: `background: #94ccff; color: #1a237e; font-weight: bold; border-radius: 4px; padding: 0 8px; font-size: 12px;`,
    warn: `background: #fff9b0; color: #8a6d00; font-weight: bold; border-radius: 4px; padding: 0 8px; font-size: 12px;`,
    error: `background: #ff5555; color: #ffffff; font-weight: bold; border-radius: 4px; padding: 0 8px; font-size: 12px;`,
  };

  private appStyle = `background: linear-gradient(to right, #6A11CB, #2575FC); color: #FFFFFF; font-weight: bold; border-radius: 4px; padding: 0 8px; font-size: 12px;`;
  private timeStyle = `background: linear-gradient(to right, #43E97B, #38F9D7); color: #003F3F; font-weight: bold; border-radius: 4px; padding: 0 8px; font-size: 12px;`;

  constructor({ appName = 'GlassAPI', getTime = () => { try { return new Date().toLocaleTimeString(); } catch {}} }: OvenMDKLoggerOptions = {}) {
    this.appName = appName;
    this.getTime = getTime;
  }

  private baseStyle = 'font-weight: bold; border-radius: 4px; padding: 0 8px; font-size: 12px';

  private logStyled(level: LogLevel, content: any) {
    const levelStyle = this.tagStyles[level];
    const icon = this.levelIcons[level];

    const label = `%c✦ ${this.appName} ✦%c %c${this.getTime()}%c %c${icon} ${level.toUpperCase()}%c ${content}`;
    const consoleMethod = console[level] || console.log;

    consoleMethod.call(console, label, this.appStyle, '', this.timeStyle, '', levelStyle, '');
  }

  log(content: any) {
    this.logStyled('log', content);
  }

  info(content: any) {
    this.logStyled('info', content);
  }

  warn(content: any) {
    this.logStyled('warn', content);
  }

  error(content: any) {
    this.logStyled('error', content);
  }
}
