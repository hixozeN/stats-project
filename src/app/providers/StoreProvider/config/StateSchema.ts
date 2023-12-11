import { UserSchema } from 'entities/User';
import { AuthSchema } from 'features/AuthUser';
import { SearchSchema } from 'features/Search/model/slice/searchSlice';

export interface StateSchema {
  user: UserSchema,
  authForm?: AuthSchema,
  searchForm: SearchSchema
}
