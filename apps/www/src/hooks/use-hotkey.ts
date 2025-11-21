import { useEffect, useRef } from "react";

type Hotkey = string | string[];

interface UseHotkeyOptions {
  enabled?: boolean;
  eventType?: "keydown" | "keyup";
}

function parseHotkey(hotkey: Hotkey): string[] {
  return Array.isArray(hotkey) ? hotkey : [hotkey];
}

function matchHotkey(event: KeyboardEvent, hotkey: string): boolean {
  const keys = hotkey.toLowerCase().split("+").map(k => k.trim());
  const keySet = new Set(keys);

  // Modifier checks
  if (keySet.has("ctrl") !== event.ctrlKey) return false;
  if (keySet.has("shift") !== event.shiftKey) return false;
  if (keySet.has("alt") !== event.altKey) return false;
  if (keySet.has("meta") !== event.metaKey) return false;

  // Remove modifiers for key comparison
  const nonModKeys = keys.filter(
    k => !["ctrl", "shift", "alt", "meta"].includes(k)
  );
  if (nonModKeys.length === 0) return false;

  // Compare pressed key
  return nonModKeys.some(k => k === event.key.toLowerCase());
}

export function useHotkey(
  hotkey: Hotkey,
  callback: (event: KeyboardEvent) => void,
  options: UseHotkeyOptions = {}
) {
  const { enabled = true, eventType = "keydown" } = options;
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const hotkeys = parseHotkey(hotkey);

    function handler(event: KeyboardEvent) {
      if (hotkeys.some(hk => matchHotkey(event, hk))) {
        callbackRef.current(event);
      }
    }

    window.addEventListener(eventType, handler);
    return () => window.removeEventListener(eventType, handler);
  }, [hotkey, enabled, eventType]);
}
