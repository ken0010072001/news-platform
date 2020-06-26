import { css } from 'styled-components'

const mediaMaxSizes = {
  desktop: 99999,
  tablet: 1023,
  mobile: 767,
}

const medaiMinSizes = {
  desktop: 1024,
  tablet: 768,
  mobile: 0
}

export const media = Object.keys(medaiMinSizes).reduce(
  (acc, label) => {
    acc[label] = (literals, ...placeholders) =>
      css`
        @media (max-width: ${mediaMaxSizes[label]}px) and (min-width: ${medaiMinSizes[label]}px) {
          ${css(literals, ...placeholders)};
        }
      `.join('')
    return acc
  },
  {}
)
