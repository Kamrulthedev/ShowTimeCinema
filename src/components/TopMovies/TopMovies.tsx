import { useGetMoviesQuery } from "@/redux/api/api";
import { MovieCard } from "../MovieCard/MovieCard";
import { TMovie } from "@/types";

const TopMovies = () => {
  const { data, isLoading } = useGetMoviesQuery({});

  if (isLoading) {
    return (
      <p className="text-center p-5 items-center">
        <span className="loading loading-ring loading-lg"></span>
      </p>
    );
  }

  return (
    <div className="my-5">
      <h1 className="text-4xl font-bold text-yellow-400">What to watch</h1>
      <h2 className="text-2xl font-bold my-2  border-l-4 border-l-yellow-400 px-1">
        Top Rated Movies
      </h2>
      <div className="grid grid-rows-2 md:grid-cols-3 lg:grid-cols-4">
        {data.data.slice(0, 8).map((movie: TMovie) => (
          <MovieCard key={movie?._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default TopMovies;
