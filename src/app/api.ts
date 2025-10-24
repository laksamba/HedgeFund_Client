import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:5000/",
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any)?.auth?.token;
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
      },
    }),

  
    tagTypes:["User"],
    endpoints: ()=>({}),
})

