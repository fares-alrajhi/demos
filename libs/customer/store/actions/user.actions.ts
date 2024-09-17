import { createAction, props } from '@ngrx/store';


const TYPE = {
  auth: '[Auth]',
  user: '[User]',
};

// Login Actions
export const Login = createAction(`${TYPE.auth} Login`, props<{email: string, password: string}>());
export const LoginSuccess = createAction(`${TYPE.auth} Login Success`, props<{ token: string, name: string }>());
export const LoginFail = createAction(`${TYPE.auth} Login Failed`,  props<{error: any}>());

// Register Actions
export const Register = createAction(`${TYPE.user} Register`, props<{name: string, email: string, password: string}>());
export const RegisterSuccess = createAction(`${TYPE.user} Register Success`, props<{ status: string }>());
export const RegisterFail = createAction(`${TYPE.user} Register Failed`,  props<{error: any}>());

// Profile Actions
export const Profile = createAction(`${TYPE.user} Profile`, props<{userId: string, token: string}>());
export const ProfileSuccess = createAction(`${TYPE.user} Profile Success`, props<{ profile: object }>());
export const ProfileFail = createAction(`${TYPE.user} Profile Failed`,  props<{error: any}>());

// Edit Actions
export const Edit = createAction(`${TYPE.user} Edit`, props<{name: string, email: string}>());
export const EditSuccess = createAction(`${TYPE.user} Edit Success`, props<{ status: string }>());
export const EditFail = createAction(`${TYPE.user} Edit Failed`,  props<{error: any}>());