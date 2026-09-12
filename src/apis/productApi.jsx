import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_APP_PRODUCTS_URL;

export const productApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products",
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
        }),

    }),
});

export const {useGetProductsQuery, useLoginMutation, useGetProductByIdQuery} = productApi;