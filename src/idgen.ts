export function idgen(alphabet: string): () => string {
  let currentId = '';
  let completedPart = '';

  return (): string => {
    const lastChar = currentId.substr(-1);
    const charIdx = lastChar ? alphabet.indexOf(lastChar) : -1;

    if (charIdx === -1) {
      currentId = alphabet.substr(0, 1);
    } else {
      const nextIdx = charIdx + 1;

      if (nextIdx < alphabet.length) {
        currentId = alphabet[nextIdx];
      } else {
        completedPart += currentId;
        currentId = alphabet.substr(0, 1);
      }
    }

    return `${completedPart}${currentId}`;
  };
}
