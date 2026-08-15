import { paths } from './paths'

export interface CustomerMenuItem {
  id: string
  label: string
  path: string
  icon?: string
  isAccent?: boolean
}

export interface AdminMenuItem {
  id: string
  label: string
  path: string
  icon?: string
}

export const customerNavItems: CustomerMenuItem[] = [
  {
    id: 'home',
    label: 'Trang Chủ',
    path: paths.home.getHref(),
    icon: 'home',
  },
  {
    id: 'categories',
    label: 'Thể Loại',
    path: paths.novels.categories.getHref(),
    icon: 'grid',
  },
  {
    id: 'top',
    label: 'Top Truyện',
    path: paths.novels.top.getHref(),
    icon: 'trophy',
  },
  {
    id: 'recharge',
    label: 'Nạp Linh Thạch',
    path: paths.payments.recharge.getHref(),
    icon: 'coins',
    isAccent: true,
  },
]

export const adminNavItems: AdminMenuItem[] = [
  {
    id: 'dashboard',
    label: 'Tổng quan',
    path: paths.admin.dashboard.getHref(),
    icon: 'dashboard',
  },
  {
    id: 'novels',
    label: 'Quản lý truyện',
    path: paths.admin.novels.getHref(),
    icon: 'book',
  },
  {
    id: 'categories',
    label: 'Quản lý thể loại',
    path: paths.admin.categories.getHref(),
    icon: 'grid',
  },
  {
    id: 'users',
    label: 'Quản lý người dùng',
    path: paths.admin.users.getHref(),
    icon: 'users',
  },
  {
    id: 'chapters',
    label: 'Quản lý chương',
    path: paths.admin.chapters.getHref(),
    icon: 'file-text',
  },
]
