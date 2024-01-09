export function formatXMLString(text: string) {
  return text.trim().replace(/(\r\n|\n|\r)/gm, '').replace(/>\s+</g, '><');
}
