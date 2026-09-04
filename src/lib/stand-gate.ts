const STORAGE_KEY = "tbtx-stood-up";

export function hasStoodUp(): boolean {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markStoodUp(): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* private mode */
  }
}

export function clearStoodUp(): void {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* private mode */
  }
}
