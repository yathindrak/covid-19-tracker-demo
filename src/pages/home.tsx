import {
  useAuthContext,
} from "@asgardeo/auth-react";
import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import APP_LOGO from "../images/covid-tracker-logo.png";
import { AxisOptions, Chart } from "react-charts";
import React from "react";
import { useStatistics } from "../hooks/useStatistics";
import { ResizableBox } from "../components/ResizableBox";

type HomePagePropsInterface = {};

export const HomePage: FunctionComponent<
  HomePagePropsInterface
> = (): ReactElement => {
  const { state, signIn, httpRequest } = useAuthContext();
  const [chartData, setChartData] = useState<any>();
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const fetcher = (url: string) => httpRequest({ url }).then((res) => res.data);

  const { data, error } = useStatistics(shouldFetch, fetcher);

  type recordType = {
    primary: string | number | Date;
    secondary: number;
  };

  useEffect(() => {
    if (!state?.isAuthenticated) {
      return;
    }

    setShouldFetch(true);
  }, [state.isAuthenticated]);

  useEffect(() => {
    if (!state?.isAuthenticated || !data) {
      return;
    }

    const statisticsData = (data as any)?.country?.timeline?.cases;
    const statistics = Object.keys(statisticsData).map((key) => ({
      key,
      value: statisticsData[key],
    }));

    const dataSeries = [
      {
        data: statistics?.map((statistic) => ({
          primary: new Date(statistic?.key),
          secondary: statistic?.value,
        })),
        label: "Series 1",
      },
    ];

    dataSeries ? setChartData(dataSeries) : null;
  }, [data]);

  const primaryAxis = React.useMemo<AxisOptions<recordType>>(
    () => ({
      getValue: (datum: recordType) => datum.primary as unknown as Date,
    }),
    []
  );

  const secondaryAxes = React.useMemo<AxisOptions<recordType>[]>(
    () => [
      {
        getValue: (datum: recordType) => datum.secondary,
      },
    ],
    [data]
  );

  return (
    <div className={"mx-10"}>
      {state?.isAuthenticated ? (
        <>
          <p
            className={
              "my-8 text-5xl lg:text-3xl font-bold tracking-tight text-gray-900"
            }
          >
            Total confirmed COVID-19 cases per million people
          </p>

          <ResizableBox
            width={1200}
            height={600}
            style={{
              background: "rgba(0, 27, 45, 0.9)",
              padding: ".5rem",
              borderRadius: "5px",
            }}
          >
            <div style={{ width: "100%", height: "100%" }}>
              {chartData && (
                <Chart
                  options={{
                    data: chartData,
                    primaryAxis,
                    secondaryAxes,
                    dark: true,
                  }}
                />
              )}
            </div>
          </ResizableBox>
        </>
      ) : !state?.isAuthenticated ? (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
            <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
              <div className="mb-6 sm:mx-auto cursor-pointer">
                <a href="https://wso2.com/asgardeo/">
                  <img
                    src={APP_LOGO}
                    alt="covid tracker logo"
                    height={300}
                    width={300}
                  />
                </a>
              </div>
              <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12 mt-6">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                  <span className="relative inline-block">
                    <svg
                      viewBox="0 0 52 24"
                      fill="currentColor"
                      className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                    >
                      <defs>
                        <pattern
                          id="e77df901-b9d7-4b9b-822e-16b2d410795b"
                          x="0"
                          y="0"
                          width=".135"
                          height=".30"
                        >
                          <circle cx="1" cy="1" r=".7"></circle>
                        </pattern>
                      </defs>
                      <rect
                        fill="url(#e77df901-b9d7-4b9b-822e-16b2d410795b)"
                        width="52"
                        height="24"
                      ></rect>
                    </svg>
                    <span className="relative">Stay</span>
                  </span>{" "}
                  Home & Stay Safe!
                </h2>
                <p className="text-base text-gray-700 md:text-lg">
                  Let&apos;s fight against Coronovirus together
                </p>
              </div>
              <div>
                <button
                  className="inline-flex items-center justify-center h-12 px-6 
                  font-medium tracking-wide text-white transition duration-200 
                  rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 
                  focus:shadow-outline focus:outline-none"
                  onClick={() => signIn()}
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
