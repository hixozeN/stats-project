import { UserSchema } from 'entities/User';
import { AuthSchema } from 'features/AuthUser';

export interface StateSchema {
  user: UserSchema,
  authForm?: AuthSchema,
}
