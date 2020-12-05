type Options<T extends string, U extends Record<string, any>> = { type: T, options: U };

type Field = {
  fullWidth?: boolean,
  key: string,
  label: string,
} & (
  | Options<'number', { max: number, min: number, step: number }>
  | Options<'colors', { quantity: number }>
)

/**
 * Cube
 */
export const cubeFields: Field[] = [
  {
    fullWidth: true,
    key: 'colors',
    label: 'Colors',
    options: { quantity: 6 },
    type: 'colors',
  },
  {
    key: 'cameraAngle',
    label: 'Camera Angle',
    options: { max: 90, min: 0, step: 0.01 },
    type: 'number',
  },
  {
    key: 'cameraDistance',
    label: 'Camera Distance',
    options: { max: 5, min: 0, step: 0.01 },
    type: 'number',
  },
  {
    key: 'turnDuration',
    label: 'Turn Duration',
    options: { max: 1000, min: 20, step: 1 },
    type: 'number',
  },
  {
    key: 'stickerSpacing',
    label: 'Sticker Spacing',
    options: { max: 1, min: 0, step: 0.01 },
    type: 'number',
  },
  {
    key: 'stickerElevation',
    label: 'Sticker Elevation',
    options: { max: 1, min: 0, step: 0.01 },
    type: 'number',
  },
  {
    key: 'stickerRadius',
    label: 'Sticker Radius',
    options: { max: 1, min: 0, step: 0.01 },
    type: 'number',
  },
  {
    key: 'innerBrightness',
    label: 'Inner Brightness',
    options: { max: 1, min: 0, step: 0.01 },
    type: 'number',
  },
];

/**
 * Dodecaminx
 */
export const dodecaminxOddFields: Field[] = [
  {
    fullWidth: true,
    key: 'colors',
    label: 'Colors',
    options: { quantity: 12 },
    type: 'colors',
  },
  {
    key: 'cameraAngle',
    label: 'Camera Angle',
    options: { max: 90, min: 0, step: 0.01 },
    type: 'number',
  },
  {
    key: 'cameraDistance',
    label: 'Camera Distance',
    options: { max: 5, min: 0, step: 0.01 },
    type: 'number',
  },
  {
    key: 'turnDuration',
    label: 'Turn Duration',
    options: { max: 1000, min: 20, step: 1 },
    type: 'number',
  },
  {
    key: 'stickerSpacing',
    label: 'Sticker Spacing',
    options: { max: 1, min: 0, step: 0.01 },
    type: 'number',
  },
  {
    key: 'stickerElevation',
    label: 'Sticker Elevation',
    options: { max: 1, min: 0, step: 0.01 },
    type: 'number',
  },
  {
    key: 'stickerRadius',
    label: 'Sticker Radius',
    options: { max: 1, min: 0, step: 0.01 },
    type: 'number',
  },
  {
    key: 'innerBrightness',
    label: 'Inner Brightness',
    options: { max: 1, min: 0, step: 0.01 },
    type: 'number',
  },
];

export const dodecaminxEvenFields: Field[] = [
  ...dodecaminxOddFields,
  {
    key: 'middleSize',
    label: 'Middle size',
    options: { max: 1, min: 0, step: 0.01 },
    type: 'number',
  },
];
