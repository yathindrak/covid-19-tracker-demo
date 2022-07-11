import { HttpError, HttpResponse } from "@asgardeo/auth-react";
import useSWR from "swr";

export function useStatistics(
  shouldFetch: boolean,
  fetcher: (url: string) => Promise<any>
) {
  const { data, error } = useSWR<HttpResponse, HttpError>(
    shouldFetch
      ? `https://1d8acbf1-e34a-4cb3-a9f5-9690a2b6d67b-prod.e1-us-east-azure.choreoapis.dev/jgdm/covid19-statistics/1.0.0/stats/usa`
      : null,
    fetcher
  );
  return { data, error };
}
