import { baseApi } from "../app/api";

export interface User {
  length: number;
  id?: number;
  email: string;
  phone?: string;
  password: string;
}

export const AuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<User, User>({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation<User[], Partial<User>>({
      query: ({email, password}) => ({
        url: `/users?email=${email}&password=${password}`,
        method: "GET", 
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterUserMutation, useLoginUserMutation } = AuthApi;
