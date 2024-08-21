import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
      //With useQuery hook, tanstackQuery can save our data in cache to avoid re-renderins and waiting times
  //it also provides some re-fetching protocols, so if the data gets old(we can set how much time we want to consider old) it will refetch automatically
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });

  return {isLoading, cabins, error};
}