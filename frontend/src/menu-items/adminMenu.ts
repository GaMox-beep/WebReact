export interface AdminMenuItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

export const adminNavItems: AdminMenuItem[] = [
  {
    id: 'dashboard',
    label: 'Tổng quan',
    path: '/admin',
    icon: 'dashboard',
  },
  {
    id: 'novels',
    label: 'Quản lý truyện',
    path: '/admin/novels',
    icon: 'book',
  },
  {
    id: 'users',
    label: 'Quản lý người dùng',
    path: '/admin/users',
    icon: 'users',
  },
  {
    id: 'chapters',
    label: 'Quản lý chương',
    path: '/admin/chapters',
    icon: 'file-text',
  },
];
