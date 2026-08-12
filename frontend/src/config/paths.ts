export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    login: {
      path: '/login',
      getHref: (redirectTo?: string | null) =>
        `/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    register: {
      path: '/register',
      getHref: (redirectTo?: string | null) =>
        `/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  novels: {
    categories: {
      path: '/the-loai',
      getHref: (categoryId?: string) =>
        `/the-loai${categoryId ? `?categoryId=${categoryId}` : ''}`,
    },
    top: {
      path: '/top-truyen',
      getHref: () => '/top-truyen',
    },
    detail: {
      path: '/novels/:slug',
      getHref: (slug: string) => `/novels/${slug}`,
    },
  },

  payments: {
    recharge: {
      path: '/nap',
      getHref: () => '/nap',
    },
  },

  users: {
    profile: {
      path: '/profile',
      getHref: () => '/profile',
    },
  },

  admin: {
    root: {
      path: '/admin',
      getHref: () => '/admin',
    },
    dashboard: {
      path: '/admin',
      getHref: () => '/admin',
    },
    novels: {
      path: '/admin/novels',
      getHref: () => '/admin/novels',
    },
    users: {
      path: '/admin/users',
      getHref: () => '/admin/users',
    },
    chapters: {
      path: '/admin/chapters',
      getHref: (novelId?: string) =>
        `/admin/chapters${novelId ? `?novelId=${novelId}` : ''}`,
    },
  },
} as const
