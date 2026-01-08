export function generateHWID(): string {
  const components = [];
  
  // User agent hash
  const ua = navigator.userAgent;
  let uaHash = 0;
  for (let i = 0; i < ua.length; i++) {
    uaHash = ((uaHash << 5) - uaHash) + ua.charCodeAt(i);
    uaHash = uaHash & uaHash;
  }
  
  // Screen properties
  const screenHash = (screen.width * screen.height).toString(36);
  
  // Timezone
  const tz = new Date().getTimezoneOffset();
  
  // Language
  const lang = navigator.language || 'unknown';
  
  // Combine components
  components.push(
    Math.abs(uaHash).toString(36).substring(0, 8),
    screenHash.substring(0, 6),
    Math.abs(tz).toString(36),
    lang.substring(0, 2)
  );
  
  // Add timestamp for uniqueness
  const timestamp = Date.now().toString(36);
  
  return components.join('-') + '-' + timestamp.substring(0, 8);
}
