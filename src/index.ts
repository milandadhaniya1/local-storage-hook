import logger from '@milandadhaniya/tiny-logger-js';

export type LocalStorageAction = 'added' | 'removed';

interface StorageChangeEvent {
  key: string;
  action: LocalStorageAction;
}

export function setItem(key: string, fieldName: string | null, value: any, log = false): boolean {
  if (typeof window === 'undefined') return false;

  try {
    if (fieldName) {
      const existing = localStorage.getItem(key);
      const parsed = existing ? JSON.parse(existing) : {};
      parsed[fieldName] = value;
      localStorage.setItem(key, JSON.stringify(parsed));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }

    if (log) logger.log({ title: 'setItem', msg: `Key: ${key}, Field: ${fieldName ?? 'root'}` });
    fireChangeEvent({ key, action: 'added' });
    return true;
  } catch (e) {
    logger.error({ title: 'Failed to set localStorage item', msg: e });
    return false;
  }
}

export function getItem<T = any>(key: string, fieldName?: string): T | undefined {
  if (typeof window === 'undefined') return;

  try {
    const item = localStorage.getItem(key);
    if (!item) return undefined;
    const parsed = JSON.parse(item);
    return fieldName ? parsed?.[fieldName] : parsed;
  } catch (e) {
    logger.error({ title: 'Failed to get localStorage item', msg: e });
    return undefined;
  }
}

export function removeItem(key: string, fieldName?: string, log = false): boolean {
  if (typeof window === 'undefined') return false;

  try {
    if (fieldName) {
      const existing = localStorage.getItem(key);
      const parsed = existing ? JSON.parse(existing) : {};
      delete parsed[fieldName];
      localStorage.setItem(key, JSON.stringify(parsed));
    } else {
      localStorage.removeItem(key);
    }

    if (log) logger.log({ title: 'removeItem', msg: `Key: ${key}, Field: ${fieldName ?? 'root'}` });
    fireChangeEvent({ key, action: 'removed' });
    return true;
  } catch (e) {
    logger.error({ title: 'Failed to remove localStorage item', msg: e });
    return false;
  }
}

export function clearStorage(log = false): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.clear();
    if (log) logger.log({ title: 'clearAll', msg: 'Cleared all localStorage' });
    return true;
  } catch (e) {
    logger.error({ title: 'Failed to clear localStorage', msg: e });
    return false;
  }
}

function fireChangeEvent({ key, action }: StorageChangeEvent): void {
  window.dispatchEvent(new CustomEvent('local-storage-change', {
    detail: {
      key,
      value: localStorage.getItem(key),
      action,
    }
  }));
}