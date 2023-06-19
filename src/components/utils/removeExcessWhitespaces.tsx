export const removeExcessWhitespaces = async (text: string) => {
  return text.replace(/\s+/g, ' ');
};
