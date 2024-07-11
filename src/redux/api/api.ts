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
        method: "GET",
      }),
    }),
    getMovieDetailsAndReviews: builder.query({
      async queryFn(slug: string): Promise<any> {
        try {
          const [movieResponse, reviewResponse] = await Promise.all([
            fetch(`https://c-session.vercel.app/api/movies/${slug}`),
            fetch(`https://c-session.vercel.app/api/movies/${slug}/reviews`),
          ]);

          if (!reviewResponse.ok) {
            return {
              error: { status: "FETCH_ERROR", message: "Failed to fetch data" },
            };
          }

          if (!movieResponse.ok || !reviewResponse.ok) {
            return {
              error: { status: "FETCH_ERROR", message: "Failed to fetch data" },
            };
          }

          const movieData = await movieResponse.json();
          const reviewData = await reviewResponse.json();

          return { data: { movie: movieData, reviews: reviewData } };
        } catch (error) {
          return {
            error: { status: "FETCH_ERROR", message: (error as any).message },
          };
        }
      },
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useAddRatingMutation,
  useGetSingleMovieQuery,
  useGetMovieDetailsAndReviewsQuery,
} = baseApi;
