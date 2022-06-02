# material-themer

Lightweight theme builder for the [material-ui](https://mui.com/) V5 library.

### Features

- No dependencies 📦
- Tiny (1kb) 🦐
- Builder pattern API 🏗️
- Use dynamic variables in your theme config
- Opinionated structure for theming

### Install

```
npm i material-themer
```

### Quickstart

Checkout the [examples](https://github.com/dan-cooke/material-themer/examples/theme1) for in-depth example.

```ts
import { ThemeBuilder } from "material-themer";
import { ThemeProvider } from "@mui/material";

// Values passed to the themer will be shared across all themes
const themer = new ThemeBuilder({
  typography: {
    fontFamily: `Poppins`,
  },
  shadows: [`0px 2px 6px #0000000A`, `0px 2px 6px #0000000A`],
});

// Create your light palette
themer.setLightColors({
  primary: {
    main: `#438AFF`,
    contrastText: `#FFFFFF`,
  },

  grey: {
    100: `#F5F6FA`,
  },

  secondary: {
    main: `#70F649`,
    contrastText: `#000000`,
  },
  background: {
    default: `#F0F0F7`,
    paper: `#FFFFFF`,
  },
});

// Create your dark palette
themer.setDarkColors({
  primary: {
    main: `#83b9ff`,
  },
  secondary: {
    main: `#a8ff7d`,
  },
  background: {
    default: `#1e1e2f`,
    paper: `#27293d`,
  },
});

// Build your theme
const { light, dark } = themer.build();

// In your app somewhere
<ThemeProvider theme={createTheme(light)}></ThemeProvider>;
```

### Override components

You can override a component by using the `themed` function.

```ts
// Use a simple object if you don't need to reference the current theme
export const SimpleButton = themed(`MuiButton`, {
  defaultProps: {
    variant: `contained`,
    size: `small`,
  },
});

// Or you can pass a function that will receive the theme config
export const DynamicallyThemedButton = themed(`MuiButton`, (theme) => ({
  defaultProps: {
    variant: theme.palette.mode === "dark" ? "contained" : "text",
  },
  styleOverrides: {
    root: {
      color: theme.palette.primary.main,
      fontFamily: "Poppins",
    },
  },
}));
```

Then simply pass the `themed` functions to the `setComponents` function

```ts
const themer = new ThemeBuilder();

// Setup light and dark themes as above...


// Pass all your component overrides as spread arguments to this function
themer.setComponents(SimpleButton);

// We recommend exporting each `themed` function as an element in an array
// For example

// import ComponentOverrides from './components'
// themer.setComponents(...ComponentOverrides)

// See the examples for more info


// Then build
const { light, dark } = themer.build();
```

### Why would I use this?

##### Share common values across all themes easily

With vanilla mui combining a shared base theme with your main themes is a real pain, you have to deep merge nested properties and it can be very error prone.

With `material-themer` this is all handled for you.

##### Re-use your theme config variables when overriding components

One of the limitations with the [default way of creating](https://mui.com/customization/theming/) a theme in `mui` is that you cannot easily reference colors and variables set on your current theme.

For example.

If you want to create a themed button that has a `border-color` of the primary palette color, how would you do this?

#### The default way

You would probably mantain a large colors file with all your theme colors defined.

```ts
export const PRIMARY = '#edf123'
... All your other colors
```

Then you would import these colors in your theme

```ts
createTheme({
  palette: {
    primary: {
      main: PRIMARY_MAIN,
    },
  },
});
```

And again in your component overrides

```ts
{
  components: {
    MuiButton: {
      styleOverrides: {
        borderColor: PRIMARY_MAIN;
      }
    }
  }
}
```

Why not just use the default palette as your source of truth?

#### With material-themer

You can mantain a single source of truth for your theme config, including all palettes and component overrides.

```ts
{
  palette: {
    primary: {
      main: "#eaeaea";
    }
  }
}
```

You can then reference this value in your component overrides with the `themed` function util

```ts
import { themed } from "material-themer";

export const MuiButton = themed(`MuiButton`, (theme) => ({
  styleOverrides: {
    root: {
      borderColor: theme.palette.primary.main,
    },
  },
}));
```
