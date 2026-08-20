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
    googleCallback: {
      path: '/auth/google/callback',
      getHref: () => '/auth/google/callback',
    },
  },

  novels: {
    categories: {
      path: '/the-loai',
      getHref: (slug?: string) =>
        `/the-loai${slug ? `?slug=${encodeURIComponent(slug)}` : ''}`,
    },
    top: {
      path: '/top-truyen',
      getHref: () => '/top-truyen',
    },
    bookmarks: {
      path: '/tu-truyen',
      getHref: () => '/tu-truyen',
    },
    detail: {
      path: '/novels/:slug',
      getHref: (slug: string) => `/novels/${slug}`,
    },
    chapter: {
      path: '/novels/:slug/chapters/:chapterNumber',
      getHref: (slug: string, chapterNumber: number | string) =>
        `/novels/${slug}/chapters/${chapterNumber}`,
    },
  },

  payments: {
    recharge: {
      path: '/nap',
      getHref: () => '/nap',
    },
    result: {
      path: '/nap/ket-qua',
      getHref: (orderId?: string) =>
        `/nap/ket-qua${orderId ? `?orderId=${encodeURIComponent(orderId)}` : ''}`,
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
    categories: {
      path: '/admin/categories',
      getHref: () => '/admin/categories',
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