interface StatusBadgeProps {
  status: 'ONGOING' | 'COMPLETED' | 'PAUSED' | string
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case 'ONGOING':
      return (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Đang Ra
        </span>
      )
    case 'COMPLETED':
      return (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          Hoàn Thành
        </span>
      )
    case 'PAUSED':
      return (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
          Tạm Dừng
        </span>
      )
    default:
      return (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20">
          {status}
        </span>
      )
  }
}
