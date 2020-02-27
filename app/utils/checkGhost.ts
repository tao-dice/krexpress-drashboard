export const isGhost = (arr: []) => arr.findIndex(({ key }) => key === 'GHOST') > -1;
