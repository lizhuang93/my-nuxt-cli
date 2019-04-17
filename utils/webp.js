export function supoort_webp() {
  if (localStorage.getItem('webp_support') === 'true') {
    return true;
  }
  let isSupportWebp =
    !![].map &&
    document
      .createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') == 0;
  localStorage.setItem('webp_support', `${isSupportWebp}`);
  return isSupportWebp;
}
