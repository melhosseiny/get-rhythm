# get-rhythm

[PostCSS] plugin to generate vertical rhythm using a modular typographic scale

[PostCSS]: https://github.com/postcss/postcss

```css
/* f0=16, r=1.618, i=2 */
@scale 16 1.618 2;
```

## Usage

    import postcss from "https://deno.land/x/postcss/mod.js";
    import get_rhythm from "https://raw.githubusercontent.com/melhosseiny/get-rhythm/main/get_rhythm.js";

    const css = '@scale 16 1.618 2;';

    const result = await postcss([get_rhythm]).process(css);

    console.log(result.css);

`deno run --no-check --allow-env rhythm.js`
