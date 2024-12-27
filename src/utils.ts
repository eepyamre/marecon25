export const formatTimeUntil = (targetUnixTime: number) => {
  const now = Math.floor(Date.now() / 1000);
  let remaining = targetUnixTime - now;

  if (remaining <= 0) return '00:00'; //TODO:

  const days = Math.floor(remaining / 86400);
  remaining %= 86400;

  const hours = Math.floor(remaining / 3600);
  remaining %= 3600;

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  if (days > 0) {
    return `${String(days).padStart(2, '0')}:${String(hours).padStart(
      2,
      '0'
    )}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}:${String(seconds).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`;
};

export const replaceWordOnPage = (targetWord: string, newWord: string) => {
  const replaceInTextNodes = (node: HTMLElement) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent = node.textContent.replace(
        new RegExp(`${targetWord}`, 'ig'),
        newWord
      );
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach(replaceInTextNodes);
    }
  };

  replaceInTextNodes(document.body);
};
