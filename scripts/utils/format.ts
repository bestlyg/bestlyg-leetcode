export function nameFormat(name: string): string {
  return name.replace(/ /g, '');
}
export function descFormat(desc: string): string {
  return desc.endsWith('。') ? desc : desc + '。';
}
