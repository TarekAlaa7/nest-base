export const ROUTES = {
  USER: {
    BASE: 'users',
    CREATE: 'create',
    UPDATE: 'update/:id',
    DELETE: 'delete/:id',
    GET_ONE: ':id',
    LIST: '',
  },
  AUTH: {
    BASE: 'auth',
    LOGIN: 'login',
    REGISTER: 'register',
    REFRESH: 'refresh-token',
  },
};
