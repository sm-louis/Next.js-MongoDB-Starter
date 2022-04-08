// import { matchPath } from 'react-router-dom';

// ----------------------------------------------------------------------

export { default as NavSectionVertical } from './vertical';
export { default as NavSectionHorizontal } from './horizontal';
export { default as NavSectionArtist } from './artist';

export function isExternalLink(path) {
  return path.includes('http');
}

export function getActive(path, pathname, asPath) {
  return pathname.includes(path) || asPath.includes(path);
}