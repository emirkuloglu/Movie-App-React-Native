import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading:moviesLoading,
    error:moviesError
  } = useFetch(() => fetchMovies({
    query: ''
  }))

  return (
    <View className="flex-1 bg-slate-950">
      <Image
      source={images.bg}
      className="flex-1 absolute w-full z-0"
      resizeMode="cover" />

      <ScrollView className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{minHeight:"100%", paddingBottom:10}}>

        <Image
        source={icons.logo}
        className="w-24 h-20 mt-20 mb-5 mx-auto" />

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator 
            size="large"
            color="#0000ff"
            className="mt-10 self-center "
          />
        ) : moviesError || trendingError ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (


          <View className="flex-1 mt-5">
            <SearchBar
              onPress={()=> router.push('/Screens/search')}
              placeholder="Search for a movie                                                       "
            />

            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>

              <FlatList 
                data={movies}
                renderItem={({item}) => (
                  <MovieCard 
                    {...item}
                  />
                )}

                keyExtractor={(item, index) => `${item.id}-${index}`}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent:"flex-start",
                  gap:20,
                  paddingRight:5,
                  marginBottom:10
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>

          </View>
        )}
      

      </ScrollView>
    </View>
  );
}