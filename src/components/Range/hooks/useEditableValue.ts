import { useRef, useState } from "react";
import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import { parseNumber } from "@/utils/number";
import { EDIT_KEYS } from "../constants";

interface UseEditableValueOptions {
  value: number;
  onCommit: (value: number) => void;
}

export const useEditableValue = ({ value, onCommit }: UseEditableValueOptions) => {
  const [draft, setDraft] = useState<string | null>(null);
  const isFinishingRef = useRef(false);

  const startEditing = () => {
    isFinishingRef.current = false;
    setDraft(String(value));
  };

  const finishEditing = (text: string, shouldCommit: boolean) => {
    if (isFinishingRef.current) return;

    isFinishingRef.current = true;

    const parsedValue = parseNumber(text);

    if (shouldCommit && parsedValue !== null) {
      onCommit(parsedValue);
    }

    setDraft(null);
  };

  const inputProps = {
    value: draft ?? String(value),
    onChange: (event: ChangeEvent<HTMLInputElement>) => setDraft(event.target.value),
    onBlur: (event: FocusEvent<HTMLInputElement>) => finishEditing(event.currentTarget.value, true),
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === EDIT_KEYS.commit) finishEditing(event.currentTarget.value, true);
      if (event.key === EDIT_KEYS.cancel) finishEditing(event.currentTarget.value, false);
    },
  };

  return { isEditing: draft !== null, startEditing, inputProps };
};
