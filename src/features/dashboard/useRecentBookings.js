import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last") || 7;
  const queryDate = subDays(new Date(), numDays);
  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate.toISOString()),
    queryKey: ["bookings", `last-${numDays}`],
  });
  return { isLoading, bookings };
}
