/* scale: f0=16, r=1.618, i=2
 n fn s m l
-2 10
-1 13
 0 16 4
 1 20 3 4
 2 26 2 3 4
 3 33 1 2 3
 4 42   1 2
 5 53     1
 6 68
 7 86
*/

const plugin = (opts = { }) => {
  return {
    postcssPlugin: 'get-rhythm',
    AtRule: {
      scale: atRule => {
        const params = atRule.params.split(' ');

        const _f0 = Number(params[0]);
        const _r = Number(params[1]);
        const _i = Number(params[2]);

        const logn = (x, n) => Math.log(x) / Math.log(n);
        const fi = (n, f0 = _f0, r = _r, i = _i) => Math.round(f0 * (r ** (n/i)));
        const ni = (fi, f0 = _f0, r = _r, i = _i) => Math.round(logn((fi / f0), r) * i);

        const gridTemplate = (sm, md, lg) => `
          html {
            font-size: ${_f0}px;
          }

          #grid {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-image: linear-gradient(rgba(238,0,0,0.5) 1px, transparent 1px);
            background-size: 100% ${fi(sm)}px;

            @media (min-width: 60em) {
              background-size: 100% ${fi(md)}px;
            }

            @media (min-width: 120em) {
              background-size: 100% ${fi(lg)}px;
            }
          }
        `

        const template = (i0, l) => `
          :root {
            --line-height-h1: ${fi(l) / fi(i0+3)}em;
            --line-height-h2: ${fi(l) / fi(i0+2)}em;
            --line-height-h3: ${fi(l) / fi(i0+1)}em;
            --line-height-body: ${fi(l) / fi(i0)}em;
          }
          h1 {
            font-size: ${fi(i0+3) / _f0}rem;
            line-height: ${fi(l) / fi(i0+3) < 1 ? 2 * fi(l) / fi(i0+3) : fi(l) / fi(i0+3)};
          } /* ${fi(i0+3)}px */
          h2 {
            font-size: ${fi(i0+2) / _f0}rem;
            line-height: ${fi(l) / fi(i0+2)};
          } /* ${fi(i0+2)}px */
          h3 {
            font-size: ${fi(i0+1) / _f0}rem;
            line-height: ${fi(l) / fi(i0+1)};
          } /* ${fi(i0+1)}px */
          body, .type--body, p, h4, h5, h6, button, input[type="button"] {
            font-size: ${fi(i0) / _f0}rem;
            line-height: ${fi(l) / fi(i0)};
          } /* ${fi(i0)}px */
          p, blockquote {
            margin-bottom: ${fi(l) / fi(i0)}em;
          }
          .type--body {
            font-family: var(--type-body);
            font-weight: 400;
          }
        `

        const rhythm = (grid = false) => `
          ${grid ? gridTemplate(1, 2, 2) : ''}
          ${template(0, 1).trim()}
          @media (min-width: 60em) {
            ${template(1, 2).trim()}
          }

          @media (min-width: 120em) {
            ${template(1, 2).trim()}
          }
        `

        atRule.replaceWith(rhythm(true).replace(/\s/g, ''));
      }
    }

  }
}

plugin.postcss = true;

export default plugin;
