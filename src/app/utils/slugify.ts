import slugify from 'slugify';

export const generateSlug = (text: string) =>
  slugify(text, { lower: true, strict: true });
