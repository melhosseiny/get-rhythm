const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts = { }) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

// Write tests here
const expected = `
html {
  font-size: 16px;
}

:global(#grid) {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(rgba(238,0,0,0.5) 1px, transparent 1px);
  background-size: 100% 20px;

  @media (--gt-md-viewport) {
    background-size: 100% 26px;
  }

  @media (--gt-lg-viewport) {
    background-size: 100% 26px;
  }
}

h1 {
  font-size: 2.0625rem;
  line-height: 1.2121212121212122;
  margin-top: 0.6060606060606061em;
} /* 33px */

h2 {
  font-size: 1.625rem;
  line-height: 0.7692307692307693;
} /* 26px */

h3 {
  font-size: 1.25rem;
  line-height: 1;
} /* 20px */

body, :global(.type--body), p, h4, h5, h6 {
  font-size: 1rem;
  line-height: 1.25;
} /* 16px */

p, blockquote {
  margin-bottom: 1.25em;
}

:global(.type--body) {
  font-family: var(--type-body);
  font-weight: 400;
}

@media (--gt-md-viewport) {
  h1 {
    font-size: 2.625rem;
    line-height: 1.2380952380952381;
    margin-top: 0.6190476190476191em;
  } /* 42px */

  h2 {
    font-size: 2.0625rem;
    line-height: 0.7878787878787878;
  } /* 33px */

  h3 {
    font-size: 1.625rem;
    line-height: 1;
  } /* 26px */

  body, :global(.type--body), p, h4, h5, h6 {
    font-size: 1.25rem;
    line-height: 1.3;
  } /* 20px */

  p, blockquote {
    margin-bottom: 1.3em;
  }

  :global(.type--body) {
    font-family: var(--type-body);
    font-weight: 400;
  }
}

@media (--gt-lg-viewport) {
  h1 {
    font-size: 2.625rem;
    line-height: 1.2380952380952381;
    margin-top: 0.6190476190476191em;
  } /* 42px */
  h2 {
    font-size: 2.0625rem;
    line-height: 0.7878787878787878;
  } /* 33px */
  h3 {
    font-size: 1.625rem;
    line-height: 1;
  } /* 26px */
  body, :global(.type--body), p, h4, h5, h6 {
    font-size: 1.25rem;
    line-height: 1.3;
  } /* 20px */
  p, blockquote {
    margin-bottom: 1.3em;
  }
  :global(.type--body) {
    font-family: var(--type-body);
    font-weight: 400;
  }
}
`

it('does something', async () => {
  await run('@scale 16 1.618 2;', expected.replace(/\s/g, ''), { })
})
