/**
 * Extract initials from a name string
 * Filters out empty segments and returns up to 2 characters
 * Returns 'U' as fallback for empty input
 */
export function getInitials(name: string): string {
  if (!name || typeof name !== 'string') return 'U';
  
  const segments = name.trim().split(/\s+/).filter(Boolean);
  
  if (segments.length === 0) return 'U';
  if (segments.length === 1) return segments[0][0].toUpperCase();
  
  return (segments[0][0] + segments[segments.length - 1][0]).toUpperCase();
}
