import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';


interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}


const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-white font-normal text-sm">{label}</Text>
    <Text className="text-gray-400 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);


const MovieDetails = () => {

  const {id} = useLocalSearchParams();

  const {data: movie, loading} = useFetch(() => fetchMovieDetails(id as string));

  return (
    <View className='flex-1 bg-gray-950'>
      <ScrollView contentContainerStyle={{paddingBottom:80}}>

        <View>
          <Image source={{ uri:`https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
            className='w-full h-[550px]' resizeMode='stretch'
          />
        </View>

        <View className='flex-col items-start justify-center mt-5 px-5'>

          <Text className='text-white font-bold text-xl'>{movie?.title}</Text>

          <View className='flex-row items-center gap-x-1 mt-2'>
            <Text className='text-gray-500 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
            <Text className='text-gray-500 text-sm'>   {movie?.runtime} min</Text>
          </View>

          <View className='flex-row items-center bg-gray-800 px-2 py-1 rounded-md gap-x-1 mt-2 '>
            <Image source={icons.star} className='size-4' />
            <Text className='text-white font-bold text-sm'>{Math.round(movie?.vote_average ?? 0)}/10</Text>
            <Text className='text-gray-500 text-sm'>({movie?.vote_count} votes)</Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" • ") ||
              "N/A"
            }
          />

        </View>

      </ScrollView>


      <TouchableOpacity
        className="absolute top-5 mx-5 bg-purple-500 py-3.5 flex flex-row z-50 p-2 rounded-tr-2xl rounded-bl-2xl ml-2"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>

    </View>
  )
}

export default MovieDetails