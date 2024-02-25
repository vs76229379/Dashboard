import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    
    "Geography",
    "Year",
    "Topic",
    "Sector",
    "Region",
    "Pest",
    "Source",
    "Pestle",
    "Swot",
   
  ],
  endpoints: (build) => ({
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getYear: build.query({
      query: () => "client/year",
      providesTags: ["Year"],
    }),
    getTopic: build.query({
      query: ()=>"client/topic",
      providesTags: ["Topic"],
    }),
    getSector: build.query({
      query: ()=>"client/sector",
      providesTags: ["Sector"],
    }),
    getRegion: build.query({
      query: ()=>"client/Region",
      providesTags: ["Region"],
    }),
    getPest: build.query({
      query: ()=>"client/Pest",
      providesTags: ["Pest"],
    }),
    getSource: build.query({
      query: ()=>"client/Source",
      providesTags: ["Source"],
    }),
    getPestle: build.query({
      query: ()=>"client/Pestle",
      providesTags: ["Pestle"],
    }),
    getSwot: build.query({
      query: ()=>"client/Swot",
      providesTags: ["Swot"],
    }),

  }),
  });
  export const {
    
    useGetGeographyQuery,
    useGetYearQuery,
    useGetTopicQuery,
    useGetSectorQuery,
    useGetRegionQuery,
    useGetPestQuery,
    useGetSourceQuery,
    useGetPestleQuery,
    useGetSwotQuery,

    
  } = api;