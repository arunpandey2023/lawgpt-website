"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface SearchContextValue {
  open: boolean;
  /** Increments each time search opens so dialog state can remount cleanly. */
  sessionKey: number;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpenState] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  const setOpen = useCallback((next: boolean) => {
    if (next) {
      setSessionKey((value) => value + 1);
    }
    setOpenState(next);
  }, []);

  const toggle = useCallback(() => {
    setOpenState((value) => {
      if (!value) {
        setSessionKey((key) => key + 1);
      }
      return !value;
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpenState((value) => {
          if (!value) {
            setSessionKey((key) => key + 1);
          }
          return !value;
        });
        return;
      }

      if (event.key === "Escape") {
        setOpenState((value) => {
          if (!value) return value;
          event.preventDefault();
          return false;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const value = useMemo(
    () => ({ open, sessionKey, setOpen, toggle }),
    [open, sessionKey, setOpen, toggle],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearch(): SearchContextValue {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider");
  }
  return context;
}
