import { useEffect, useRef, useState } from 'react';
import { getMergedQuotes } from '../api/quotesApi';

/**
 * useTypewriterSummary hook that generates and stores a per-product AI summary.
 * Stores the final text in localStorage (product_summaries STORAGE_KEY)
 * STEP function prints text. It pauses after punctuation (.!?,)
 */
const STORAGE_KEY = 'product_summaries';
type SummaryMap = Record<string, string>;

export const useTypewriterSummary = (productId?: string | number | null) => {
  // Converts productId to string key. Required for checking localStorage data
  const productKey = productId == null ? '' : String(productId);

  const [text, setText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  /**
   * Internal ref values ​​for animation control
   * fullTextRef - complete text to be printed
   * indexRef -next character index
   */
  const fullTextRef = useRef<string>('');
  const indexRef = useRef<number>(0);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Helper function - Load STORAGE_KEY from localStorage
  const readStorageMap = (): SummaryMap => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as SummaryMap) : {};
    } catch {
      return {};
    }
  };

  // Helper function - Save  AI summary to STORAGE_KEY
  const saveToStorage = (key: string, finalText: string) => {
    try {
      const map = readStorageMap();
      map[key] = finalText;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch {
      // ignore storage errors
    }
  };

  // Helper function - clear typing
  const clearTypingTimeout = () => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
      typingTimeout.current = null;
    }
  };

  // When productKey changes, reset/load state
  useEffect(() => {
    clearTypingTimeout();
    setIsTyping(false);

    if (!productKey) {
      // clear text and refs
      fullTextRef.current = '';
      indexRef.current = 0;
      setText('');
      return;
    }

    // load from localStorage
    const map = readStorageMap();
    const stored = map[productKey];

    if (stored) {
      // if exists, show it now
      fullTextRef.current = stored;
      indexRef.current = stored.length;
      setText(stored);
      setIsTyping(false);
    } else {
      // does not exist, -> clear view and refs
      fullTextRef.current = '';
      indexRef.current = 0;
      setText('');
      setIsTyping(false);
    }

    return () => {
      clearTypingTimeout();
    };
  }, [productKey]);

  // Typewriter STEP function
  const step = () => {
    // safety: if there is no fullText fullText, it's over
    if (!fullTextRef.current || indexRef.current >= fullTextRef.current.length) {
      setIsTyping(false);
      if (productKey) saveToStorage(productKey, fullTextRef.current || '');
      return;
    }

    const char = fullTextRef.current[indexRef.current];
    setText((prev) => prev + char);
    indexRef.current++;

    let delay = 25;
    //add ~2× delay after . , ! ?
    if ('.!?,'.includes(char)) delay = 25 * 2;

    typingTimeout.current = setTimeout(step, delay);
  };

  // Generate AI summary for current productKey
  const generateSummary = async () => {
    if (!productKey) return;

    // reset everything before generating
    clearTypingTimeout();
    setText('');
    indexRef.current = 0;
    fullTextRef.current = '';

    setIsTyping(true);

    try {
      const merged = await getMergedQuotes();
      fullTextRef.current = merged;

      // start animation
      step();
    } catch (err) {
      setIsTyping(false);
      console.error('Failed to fetch quotes:', err);
    }
  };

  // cleanup on unmountu
  useEffect(() => {
    return () => {
      clearTypingTimeout();
    };
  }, []);

  // caret (blinking)
  const caret = isTyping ? (Date.now() % 600 < 300 ? '|' : ' ') : '';

  return {
    text,
    caret,
    isTyping,
    generateSummary,
  };
};
