// import client from "./client";

// export default function addAuthTokenInterceptor(store: any) {
//   client.interceptors.request.use((req) => {
//     const { token } = store.getState().auth;
//     if (!token) return req;
//     req.headers.Authorization = `Bearer ${token}`;
//     return req;
//   });
// }
