export const removeUrl = (v: string) => {
  if (!v) return '';
  const regExForUrl = /^(?:https?:\/\/)?[^/]*(\/.*)$/;
  const match = v.match(regExForUrl);

  if (match && match[1]) {
    return match[1].substring(1);
  }

  return v;
};
