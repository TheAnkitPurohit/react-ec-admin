// ----------------------------------------------------------------------

const ROOTS = {
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  login: `/login`,
  register: `/register`,
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    sales: `${ROOTS.DASHBOARD}/sales`,
    users: `${ROOTS.DASHBOARD}/users`,
    products: `${ROOTS.DASHBOARD}/products`,
    category: `${ROOTS.DASHBOARD}/category`,
    group: `${ROOTS.DASHBOARD}/group`,
    review: `${ROOTS.DASHBOARD}/review`,
    inquiry: `${ROOTS.DASHBOARD}/inquiry`,
    manager: `${ROOTS.DASHBOARD}/manager`,
    profile: `${ROOTS.DASHBOARD}/profile`,
    changePassword: `${ROOTS.DASHBOARD}/change-password`,
  },
};
