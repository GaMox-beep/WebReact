export interface CustomerMenuItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  isAccent?: boolean;
}

export const customerNavItems: CustomerMenuItem[] = [
  {
    id: 'home',
    label: 'Trang Chủ',
    path: '/',
    icon: 'home',
  },
  {
    id: 'categories',
    label: 'Thể Loại',
    path: '/the-loai',
    icon: 'grid',
  },
  {
    id: 'top',
    label: 'Top Truyện',
    path: '/top-truyen',
    icon: 'trophy',
  },
  {
    id: 'recharge',
    label: 'Nạp Linh Thạch',
    path: '/nap',
    icon: 'coins',
    isAccent: true,
  },
];
