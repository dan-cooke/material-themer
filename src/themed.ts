import { Components, Theme } from '@mui/material';

type ThemedComponentConfig<T extends keyof Components<Theme>> =
  | ((theme: Theme) => Components<Theme>[T])
  | Components<Theme>[T];

export interface ThemedComponent<T extends keyof Components<Theme>> {
  component: T;
  config: ThemedComponentConfig<T>;
}

export function themed<T extends keyof Components<Theme>>(
  component: T,
  config: ThemedComponentConfig<T>,
): () => ThemedComponent<T> {
  return () => ({
    component,
    config,
  });
}
