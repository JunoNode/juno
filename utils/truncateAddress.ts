export function truncateAddress(
  address: string,
  chars = 4,
  options: { ellipsis?: string } = {}
): string {
  if (!address || address.length <= chars * 2) return address;

  const { ellipsis = '...' } = options;
  const prefix = address.slice(0, chars);
  const suffix = address.slice(-chars);

  return `${prefix}${ellipsis}${suffix}`;
}