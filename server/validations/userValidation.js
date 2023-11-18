import vine from '@vinejs/vine';

export const userSchema = vine.object({
  first_name: vine.string().minLength(2).trim(),
  last_name: vine.string().minLength(2).trim(),
  email: vine.string().email(),
  gender: vine.string(),
  domain: vine.string(),
  available: vine.boolean(),
});
