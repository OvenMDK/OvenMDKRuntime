type LogLevel = 'log' | 'info' | 'warn' | 'error';

interface OvenMDKLoggerOptions {
  appName?: string;
  getTime?: () => string;
}

function defaultTime(): string {
  const now = new Date();
  const pad = (n: number, len = 2) => String(n).padStart(len, '0');
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
    now.getSeconds()
  )}+${pad(now.getMilliseconds(), 3)}`;
}

export default class OvenMDKLogger {
  private appName: string;
  private getTime: () => string;

  constructor({ appName = 'OvenMDK', getTime = defaultTime }: OvenMDKLoggerOptions = {}) {
    this.appName = appName;
    this.getTime = getTime;
  }

  private baseStyle =
    'font-weight: bold; border-radius: 4px; padding: 0 8px; font-size: 12px';

  private levelIcons: Record<LogLevel, string> = {
    log: '📘',
    info: 'ℹ️',
    warn: '⚠️',
    error: '❌',
  };

  private tagStyles: Record<LogLevel, string> = {
    log: `background: #D6EAFF; color: #003F66; ${this.baseStyle}`,
    info: `background: #94CCFF; color: #1A237E; ${this.baseStyle}`,
    warn: `background: #FFF9B0; color: #8A6D00; ${this.baseStyle}`,
    error: `background: #FF5555; color: #FFFFFF; ${this.baseStyle}`,
  };

  private appStyle = `background: linear-gradient(to right, #6A11CB, #2575FC); color: #FFFFFF; ${this.baseStyle}`;
  private timeStyle = `background: linear-gradient(to right, #43E97B, #38F9D7); color: #003F3F; ${this.baseStyle}`;

  private formatObject(obj: any, depth = 0, maxDepth = 3): string {
    if (depth > maxDepth) return '...';
    
    try {
      if (obj === null) return 'null';
      if (obj === undefined) return 'undefined';
      
      const type = typeof obj;
      
      if (type === 'string') return `"${obj}"`;
      if (type === 'number' || type === 'boolean') return String(obj);
      if (type === 'function') return '[Function]';
      
      if (Array.isArray(obj)) {
        if (obj.length === 0) return '[]';
        const items = obj.slice(0, 5).map(item => this.formatObject(item, depth + 1, maxDepth));
        const more = obj.length > 5 ? ', ...' : '';
        return `[${items.join(', ')}${more}]`;
      }
      
      if (type === 'object') {
        const keys = Object.keys(obj);
        if (keys.length === 0) return '{}';
        
        const entries = keys.slice(0, 10).map(key => {
          const value = this.formatObject(obj[key], depth + 1, maxDepth);
          return `${key}: ${value}`;
        });
        
        const more = keys.length > 10 ? ', ...' : '';
        return `{ ${entries.join(', ')}${more} }`;
      }
      
      return String(obj);
    } catch (e) {
      return '[Error formatting object]';
    }
  }

  private safeToString(content: any): string {
    try {
      if (typeof content === "string") return content;
      if (typeof content === "number" || typeof content === "boolean") return String(content);
      if (content == null) return "null";
      
      // Format objects and arrays
      return this.formatObject(content);
    } catch (e) {
      return "[Unable to display object]";
    }
  }

  private logStyled(level: LogLevel, content: any) {
    const levelStyle = this.tagStyles[level];
    const icon = this.levelIcons[level];

    const safeContent = this.safeToString(content);

    const label = `%c✦ ${this.appName} ✦%c %c${this.getTime()}%c %c${icon} ${level.toUpperCase()}%c ${safeContent}`;
    const consoleMethod = console[level] || console.log;

    consoleMethod.call(
      console,
      label,
      this.appStyle,
      "",
      this.timeStyle,
      "",
      levelStyle,
      ""
    );
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