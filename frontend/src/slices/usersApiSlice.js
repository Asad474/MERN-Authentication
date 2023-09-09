import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),

        updateuser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/userprofile`,
                method: 'PUT',
                body: data
            }),
        }),
    }),
});

export const {
    useLoginMutation, 
    useLogoutMutation,
    useRegisterMutation,
    useUpdateuserMutation,
} = usersApiSlice;