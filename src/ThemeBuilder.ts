import { Components, createTheme, Theme, ThemeOptions } from '@mui/material';
import { ThemedComponent } from './themed';

/**
 * Use the ThemeBuilder to construct your theme using the builder pattern.
 * 
 * @example
 * ```ts
 * const themer = new ThemeBuilder({
  typography: {
    fontFamily: `Poppins`,
  },
  shadows: [`0px 2px 6px #0000000A`, `0px 2px 6px #0000000A`],
});

themer.setDarkColors({
  primary: {
    main: `#83b9ff`,
  },
  secondary: {
    main: `#a8ff7d`,
  },
  background: {
    default: `#1e1e2f`,
    gradient: `linear-gradient(#1e1e2f, #1e1e24)`,
    paper: `#27293d`,
  } as any,
});
 * ```
 */
export class ThemeBuilder {
  private baseThemeOptions: ThemeOptions;

  private baseComponents: Components<Theme> = {};

  private lightThemeOptions: ThemeOptions = {
    palette: {
      mode: `light`,
    },
  };

  private lightTheme: Theme;

  private lightComponents: Components<Theme> = {};

  private darkThemeOptions: ThemeOptions = {
    palette: {
      mode: `dark`,
    },
  };

  private darkTheme: Theme;

  private darkComponents: Components<Theme> = {};

  /**
   * 
   * @param sharedTheme Pass values that will be shared across all themes
   */
  constructor(sharedTheme: ThemeOptions) {
    this.baseThemeOptions = sharedTheme;
    this.darkTheme = createTheme(this.darkThemeOptions);
    this.lightTheme = createTheme(this.lightThemeOptions);
  }

  private isObject(item: any) {
    return item && typeof item === `object` && !Array.isArray(item);
  }

  private mergeDeep(target: any, ...sources: any): any {
    if (!sources.length) return target;
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      return Object.entries(source).reduce((result, [key, value]) => {
        if (this.isObject(value)) {
          return {
            ...result,
            [key]: this.mergeDeep(target[key] || {}, value),
          };
        }
        return {
          ...result,
          [key]: value,
        };
      }, target);
    }
    return this.mergeDeep(target, ...sources);
  }

  /**
   * Sets up the palette.mode['light']
   */
  public setLightColors(palette: ThemeOptions['palette']) {
    this.lightThemeOptions.palette = {
      ...this.lightThemeOptions.palette,
      ...palette,
    };

    this.lightTheme = createTheme(this.lightThemeOptions);
  }

  /**
   * Sets up the palette.mode['dark']
   */
  public setDarkColors(palette: ThemeOptions['palette']) {
    this.darkThemeOptions.palette = {
      ...this.darkThemeOptions.palette,
      ...palette,
    };
    this.darkTheme = createTheme(this.darkThemeOptions);
  }

  /**
   * Pass an array of `themed()` components to override theme
   */
  public setComponents(
    ...themedComponents: (() => ThemedComponent<keyof Components<Theme>>)[]
  ) {
    themedComponents.forEach((themed) => {
      const { config, component } = themed();

      if (typeof config === `function`) {
        const lightConfig = config(this.lightTheme);
        const darkConfig = config(this.darkTheme);

        this.lightThemeOptions.components = {
          ...this.lightThemeOptions.components,
          [component]: lightConfig,
        };

        this.darkThemeOptions.components = {
          ...this.darkThemeOptions.components,
          [component]: darkConfig,
        };
      } else {
        this.baseThemeOptions.components = {
          ...this.baseThemeOptions.components,
          [component]: config,
        };
      }
    });
  }

  /**
   * 
   * Call this when you are done seting up to get your vanilla
   * material-ui theme configs that can be passed to `createTheme`
   */
  public build() {
    const light = createTheme(
      this.mergeDeep(this.baseThemeOptions, this.lightThemeOptions),
    );

    const dark = createTheme(
      this.mergeDeep(this.baseThemeOptions, this.darkThemeOptions),
    );
    return {
      light,
      dark,
    };
  }
}
