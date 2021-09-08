import uniq from 'lodash.uniq';
import Color from 'color';

interface ComboColor {
  color: number[];
  model: string;
  valpha: number;
  hex: () => string;
  contrast: (color: ComboColor) => number;
}

export interface Accessibility {
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
  aaaLarge: boolean;
}

export interface Combination {
  accessibility: Accessibility;
  color?: number[];
  contrast: number;
  hex: string;
  model?: string;
  valpha?: number;
}

export interface ColorCombo {
  color?: number[];
  combinations: Combination[];
  hex: string;
  model?: string;
  valpha?: number;
}

interface Options {
  threshold?: number;
  compact?: boolean;
  uniq?: boolean;
}

const ColorCombos = (
  colors: string[] | { [name: string]: string },
  options: Options = {}
): ColorCombo[] | false => {
  let arr: ComboColor[] = [];
  let results: ColorCombo[] = [];

  const MINIMUMS: {
    aa: number;
    aaLarge: number;
    aaa: number;
    aaaLarge: number;
  } = {
    aa: 4.5,
    aaLarge: 3,
    aaa: 7,
    aaaLarge: 4.5,
  };

  const DEFAULT_OPTIONS: Options = {
    threshold: 0,
    compact: false,
    uniq: true,
  };

  const combinedOptions = Object.assign<Options, Options>(DEFAULT_OPTIONS, options);

  if (!Array.isArray(colors)) {
    if (typeof colors === 'object') {
      arr = Object.keys(colors).map((key) => Color(colors[key]) as unknown as ComboColor);

      if (combinedOptions.uniq) {
        arr = uniq(arr);
      }
    } else {
      console.error('Must provide an array or object');
      return false;
    }
  } else {
    let uniqueColors = colors;
    if (combinedOptions.uniq) {
      uniqueColors = uniq(colors);
    }

    if (uniqueColors !== undefined) {
      arr = uniqueColors.map((color) => Color(color) as unknown as ComboColor);
    }
  }

  results = arr.map((color): ColorCombo => {
    const result: ColorCombo = combinedOptions.compact
      ? {
          hex: '',
          combinations: [],
        }
      : {
          color: color.color,
          model: color.model,
          valpha: color.valpha,
          hex: '',
          combinations: [],
        };

    result.hex = color.hex();

    result.combinations = arr
      .filter((bg): boolean => color !== bg)
      .filter((bg): boolean => {
        if (combinedOptions.threshold !== undefined) {
          return color.contrast(bg) > combinedOptions.threshold;
        }
        return true;
      })
      .map((bg): Combination => {
        let combination: Combination = combinedOptions.compact
          ? {
              accessibility: {
                aa: false,
                aaLarge: false,
                aaa: false,
                aaaLarge: false,
              },
              hex: '',
              contrast: 0,
            }
          : {
              accessibility: {
                aa: false,
                aaLarge: false,
                aaa: false,
                aaaLarge: false,
              },
              hex: '',
              contrast: 0,
              color: bg.color,
              model: bg.model,
              valpha: bg.valpha,
            };

        combination = Object.assign(combination, {
          hex: bg.hex(),
          contrast: color.contrast(bg),
        });

        combination.accessibility = {
          aa: combination.contrast >= MINIMUMS.aa,
          aaLarge: combination.contrast >= MINIMUMS.aaLarge,
          aaa: combination.contrast >= MINIMUMS.aaa,
          aaaLarge: combination.contrast >= MINIMUMS.aaaLarge,
        };

        return combination;
      });

    return result;
  });

  return results;
};

// eslint-disable-next-line import/no-default-export
export default ColorCombos;
