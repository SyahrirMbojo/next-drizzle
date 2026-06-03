"use client";
import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";

type SearchViewProps = {
  value?: string;
  placeholder?: string;
  onClearValue?: () => void | undefined;
  onChangeValue?: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
  onEnterValue?: (val: string) => void | undefined;
};

export default function SearchView({
  value,
  placeholder = "Search...",
  onClearValue,
  onChangeValue,
  onEnterValue,
}: SearchViewProps) {
  const [issearch, setIssearch] = React.useState(value);
  const inputRef = React.useRef<any>(undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIssearch(event.target.value);
    onChangeValue !== undefined && onChangeValue!(event);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnterValue !== undefined && onEnterValue(issearch!);
    }
  };

  const handleClear = () => {
    setIssearch("");
    inputRef.current.focus();
    onClearValue !== undefined && onClearValue!();
  };
  return (
    <InputGroup className="max-w-sm">
      <InputGroupInput
        id="inline-start-input"
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={issearch}
      />
      <InputGroupAddon align="inline-start">
        <MagnifyingGlassIcon className="text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        {issearch?.length! > 0 && (
          <InputGroupButton
            aria-label="Copy"
            title="Copy"
            size="icon-xs"
            onClick={handleClear}
          >
            <XIcon />
          </InputGroupButton>
        )}
      </InputGroupAddon>
    </InputGroup>
  );
}
