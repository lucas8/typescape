import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { borderRadii, colors, fontSizes, fontWeights, space } from './tokens';

const properties = defineProperties({
  conditions: {
    default: {},
    hover: { selector: '&:hover' },
    focus: { selector: '&:focus' },
    active: { selector: '&:active' },
  },
  defaultCondition: 'default',
  properties: {
    position: ['relative', 'absolute'],
    display: ['none', 'flex', 'grid', 'block', 'inline'],
    flexDirection: ['row', 'row-reverse', 'column'],
    justifyContent: ['stretch', 'flex-start', 'center', 'flex-end', 'space-around', 'space-between'],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    marginTop: space,
    marginRight: space,
    marginBottom: space,
    marginLeft: space,
    gap: space,
    rowGap: space,
    columnGap: space,
    aspectRatio: ['1/1', '4/3'],
    width: space,
    height: space,
    fontSize: fontSizes,
    fontWeight: fontWeights,
    textAlign: ['left', 'center', 'right'],
    color: colors,
    background: colors,
    backgroundColor: colors,
    borderRadius: borderRadii,
    top: [0],
    bottom: [0],
    left: [0],
    right: [0],
    flexShrink: [0],
    flexGrow: [0, 1],
    zIndex: [-1, 0, 1],
    cursor: ['pointer'],
    overflow: ['auto', 'hidden', 'scroll'],
  },
  shorthands: {
    p: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    pt: ['paddingTop'],
    pb: ['paddingBottom'],
    pl: ['paddingLeft'],
    pr: ['paddingRight'],
    m: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
    ml: ['marginLeft'],
    mt: ['marginTop'],
    mb: ['marginBottom'],
    mr: ['marginRight'],
  },
});

export const sprinkles = createSprinkles(properties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
