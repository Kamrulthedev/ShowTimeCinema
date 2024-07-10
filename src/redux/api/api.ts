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
    getSingelMovie: builder.query({
      query: (slug) => {
        return {
          method: "GET",
          url: `/movies/${slug}`,
          body: slug,
        };
      },
    }),

  }),
});

export const { useGetMoviesQuery, useAddRatingMutation, useGetSingelMovieQuery } = baseApi;
