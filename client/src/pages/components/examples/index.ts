// @todo
// figure out why this file throws a type error when examples
// is Record<string, () => Promise<typeof import('*.vue')>>

const examples: Record<string, () => Promise<any>> = {
};

export default examples;