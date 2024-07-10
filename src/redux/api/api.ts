/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://c-session.vercel.app/api" }),
  tagTypes: ["movies"],
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => ({
        method: "GET",
        url: "/movies",
      }),
      providesTags: ["movies"],
    }),

    addRating: builder.mutation({
      query: ({ data, slug }) => {
        console.log(data);
        return {
          method: "POST",
          url: `/movies/${slug}/review`,
          body: data,
        };
      },
      invalidatesTags: ["movies"],
    }),
    getSingleMovie: builder.query({
      query: (slug) => ({
        url: `/movies/${slug}`,
        method: 'GET', 
      }),
    }),

  }),
});

export const { useGetMoviesQuery, useAddRatingMutation, useGetSingleMovieQuery } = baseApi;
