import { useEffect, useState } from "react";
import dbAPI from "@/dbAPI";

type InputSuggestionsProps = {
  id: string;
};

const InputSuggestions = ({ id }: InputSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[] | undefined>(
    undefined
  );
  useEffect(() => {
    (async () => {
      const inputSuggestions = await dbAPI.getLastUpdatedId();
      setSuggestions(inputSuggestions);
    })();
  }, []);
  if (!suggestions) {
    return <></>;
  }
  return (
    <datalist id={id}>
      {suggestions.map((suggestion) => (
        <option key={suggestion} value={suggestion} />
      ))}
    </datalist>
  );
};

export default InputSuggestions;
