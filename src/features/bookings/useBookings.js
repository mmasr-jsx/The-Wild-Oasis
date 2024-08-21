import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  // FILTER
  const filterValue = searchParams.get("status");
  const filter = !filterValue || filterValue === "all" ? null : {field: "status", value: filterValue};

  // SORT BY
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = {field, direction};

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  
      //With useQuery hook, tanstackQuery can save our data in cache to avoid re-renderins and waiting times
  //it also provides some re-fetching protocols, so if the data gets old(we can set how much time we want to consider old) it will refetch automatically
  const {
    isLoading,
    data: {data: bookings, count} = {},
    error,
  } = useQuery({
    queryKey: ["booking", filter, sortBy, page],
    queryFn: () => getBookings({filter, sortBy, page}),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if(page > 1) {
    //With prefetchQuery() we can save the data for the next and prev pages of our table, for better user experience
    queryClient.prefetchQuery({
      queryKey: ["booking", filter, sortBy, page - 1],
      queryFn: () => getBookings({filter, sortBy, page: page - 1}),
    })
  } else if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["booking", filter, sortBy, page + 1],
      queryFn: () => getBookings({filter, sortBy, page: page + 1}),
    })
  }

  return {isLoading, bookings, error, count};
}

