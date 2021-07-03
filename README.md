# PostCSS Rhythm

[PostCSS] plugin to generate vertical rhythm using a modular typographic scale

[PostCSS]: https://github.com/postcss/postcss

```css
@scale 16 1.618 2;
```

## Usage

import postcss from "https://deno.land/x/postcss/mod.js";
import get_rhythm from "./postcss-rhythm.js";

const css = '@scale 16 1.618 2;';

const result = await postcss([get_rhythm]).process(css);
