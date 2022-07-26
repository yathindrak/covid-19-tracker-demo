import { HttpError, HttpResponse } from "@asgardeo/auth-react";
import useSWR from "swr";

export function useStatistics(
  shouldFetch: boolean,
  fetcher: (url: string) => Promise<any>
) {
  const { data, error } = useSWR<HttpResponse, HttpError>(
    shouldFetch
      ? `<CHOREO_API>`
      : null,
    fetcher
  );
  return { data, error };
}
