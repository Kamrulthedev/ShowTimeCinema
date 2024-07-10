import { MovieCard } from "@/components/MovieCard/MovieCard";
import { useGetMoviesQuery } from "@/redux/api/api";
import { TMovie } from "@/types";

export default function Movies() {
  const { data, isLoading } = useGetMoviesQuery(undefined);

  if (isLoading) {
    return (
      <p className="text-center p-5 items-center">
        <span className="loading loading-ring loading-lg"></span>
      </p>
    );
  }

  return (
    <div className="container my-5 p-2">
      <div className="grid grid-rows-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.data.map((movie: TMovie) => (
          <MovieCard key={movie?._id} movie={movie}></MovieCard>
        ))}
      </div>
    </div>
  );
}
