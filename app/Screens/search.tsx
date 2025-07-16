import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from '@/services/appwrite';
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const search = () => {
  
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movies= [],
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({query: searchQuery}), false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim())
      {
        await loadMovies();
      }
      else
      {
        reset()
      }
    }, 500);

    return() => clearTimeout(timeoutId);
  }, [searchQuery]);


  useEffect(() => {
      if(movies?.length! > 0 && movies?.[0]){
        updateSearchCount(searchQuery, movies[0]);
      }
  }, [movies]);


  return (
    <View className='flex-1 bg-slate-950'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>

      <FlatList
        data={movies as Movie[]}
        renderItem={({item}) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent:"flex-start",
          gap:16,
          marginVertical:16
        }}
        contentContainerStyle={{paddingBottom:100}}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image source={icons.logo} className='w-24 h-20'/>
            </View>

            <View className="my-5 mt-10">
              <SearchBar
              placeholder='Search for a movie                                                       '
              value={searchQuery}
              onChangeText={handleSearch}
            />
            </View>

            {loading && (
              <ActivityIndicator size='large' color="#0000ff" className='my-3'/>
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3" >
                Error: {error.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length! > 0 && (
              <Text className='text-xl text-white font-bold'>
                Search Results for{' '}
                <Text className='text-indigo-500'>{searchQuery}</Text>
              </Text>
            )}
          </>
        }

        ListEmptyComponent={
          !loading && !error ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default search;