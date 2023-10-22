import axios from 'axios';

export const getPostsController = new AbortController();

type Post = {
  id: string;
  userId: string;
  title: string;
  body: string;
};

const FIRST_API_URL = 'https://jsonplaceholder.typicode.com';
// const SECOND_API_URL = 'https://fakerapi.it/api/v1';

/* axios.defaults.baseURL = FIRST_API_URL;
axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
}; */

const firstApiAxios = axios.create({
  baseURL: FIRST_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token_1')}`,
  },
  withCredentials: true,
});

/* const secondApiAxios = axios.create({
  baseURL: SECOND_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token_2')}`,
  },
}); */

export const getPosts = async () => {
  try {
    const res = await firstApiAxios.get<Post>(`/posts/1`, {
      params: {
        offset: 0,
        limit: 10,
      },
      //validateStatus: (status) => {
      //return status >= 200 && status < 300;
      //},
      //timeout: 1000,
      //withCredentials:true - HttpOnly Cookie
      //onUploadProgress: (progressEvent) => {
      // working with the progress bar
      //},
      //onDownloadProgress: (progressEvent) => {
      //working with the progress bar
      //},
      signal: getPostsController.signal,
    });

    console.log(res.data.title);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error', error.response?.data.message || error.message);
    } else if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

/* export const createPost = async () => {
  try {
    const res = await secondApiAxios.post(
      `/posts`,
      {
        title: 'hello',
        body: 'world',
      },
      {
        params: {
          offset: 0,
        },
      }
    );

    console.log(res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error', error.response?.data.message || error.message);
    } else if (error instanceof Error) {
      console.log(error.message);
    }
  }
}; */

firstApiAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
  }
);

firstApiAxios.interceptors.response.use(
  (res) => {
    console.log('interceptor', res);
    return res;
  },
  (error) => {
    /* if (axios.isAxiosError(error)) {
      if (error.status === 401 && token) {
        const { data } = axios.post('url/auth', { refreshToken: token });

        localStorage.setItem(data, 'token');
      }
    } */

    /* if (axios.isAxiosError(error)) {
      console.log('error', error.response?.data.message || error.message);
    } else if (error instanceof Error) {
      console.log(error.message);
    } */

    console.log('interceptor', error);
  }
);
