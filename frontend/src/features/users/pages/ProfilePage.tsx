import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

export const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'bookmarks' | 'history' | 'settings'>('profile')

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
      case 'AUTHOR':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    }
  }

  const userInitial = user.username ? user.username.charAt(0).toUpperCase() : 'U'

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Summary Card */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 mb-6 transition-colors">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar Initial Circle */}
          <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center text-black font-extrabold text-2xl shrink-0">
            {userInitial}
          </div>

          {/* User Basic Info */}
          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-xl font-bold text-[var(--text-primary)]">
                {user.username}
              </h1>
              <span className={`inline-flex items-center justify-center px-2.5 py-0.5 text-xs font-medium rounded-md border self-center sm:self-auto ${getRoleBadgeColor(user.role)}`}>
                {user.role}
              </span>
            </div>
            <p className="text-[var(--text-secondary)] text-xs">{user.email}</p>
            {user.createdAt && (
              <p className="text-[var(--text-muted)] text-[11px]">
                Tham gia: {new Date(user.createdAt).toLocaleDateString('vi-VN')}
              </p>
            )}
          </div>

          {/* Coins Balance Card */}
          <div className="bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] rounded-lg px-4 py-3 flex items-center gap-3 shrink-0">
            <span className="text-xl">🪙</span>
            <div>
              <span className="block text-[var(--text-muted)] text-[11px] font-medium">Linh Thạch</span>
              <span className="text-lg font-bold text-amber-500">{user.coins.toLocaleString('vi-VN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-1.5 border-b border-[var(--border-color)] mb-6 pb-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-3.5 py-2 rounded-lg font-medium text-xs transition-colors flex items-center gap-1.5 ${
            activeTab === 'profile'
              ? 'bg-amber-500 text-black font-semibold'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
          }`}
        >
          👤 Hồ Sơ
        </button>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`px-3.5 py-2 rounded-lg font-medium text-xs transition-colors flex items-center gap-1.5 ${
            activeTab === 'bookmarks'
              ? 'bg-amber-500 text-black font-semibold'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
          }`}
        >
          🔖 Tủ Truyện
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-3.5 py-2 rounded-lg font-medium text-xs transition-colors flex items-center gap-1.5 ${
            activeTab === 'history'
              ? 'bg-amber-500 text-black font-semibold'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
          }`}
        >
          📖 Lịch Sử Đọc
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-3.5 py-2 rounded-lg font-medium text-xs transition-colors flex items-center gap-1.5 ${
            activeTab === 'settings'
              ? 'bg-amber-500 text-black font-semibold'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
          }`}
        >
          ⚙️ Cài Đặt
        </button>
      </div>

      {/* Tab Content Panels */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 transition-colors">
        {/* TAB 1: Profile Details */}
        {activeTab === 'profile' && (
          <div className="space-y-5">
            <h3 className="text-base font-semibold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
              Thông Tin Tài Khoản
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-[var(--bg-surface-elevated)] rounded-lg border border-[var(--border-color)]">
                <span className="block text-[var(--text-muted)] text-[11px] font-medium mb-0.5">Mã ID</span>
                <span className="font-mono text-xs text-[var(--text-primary)]">{user.id}</span>
              </div>
              <div className="p-3.5 bg-[var(--bg-surface-elevated)] rounded-lg border border-[var(--border-color)]">
                <span className="block text-[var(--text-muted)] text-[11px] font-medium mb-0.5">Tên Người Dùng</span>
                <span className="text-xs font-semibold text-[var(--text-primary)]">{user.username}</span>
              </div>
              <div className="p-3.5 bg-[var(--bg-surface-elevated)] rounded-lg border border-[var(--border-color)]">
                <span className="block text-[var(--text-muted)] text-[11px] font-medium mb-0.5">Email</span>
                <span className="text-xs text-[var(--text-primary)]">{user.email}</span>
              </div>
              <div className="p-3.5 bg-[var(--bg-surface-elevated)] rounded-lg border border-[var(--border-color)]">
                <span className="block text-[var(--text-muted)] text-[11px] font-medium mb-0.5">Quyền Hạn</span>
                <span className="text-xs font-bold text-amber-500">{user.role}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-color)] flex justify-end">
              <button
                onClick={logout}
                className="px-4 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-lg font-medium text-xs transition-colors"
              >
                Đăng Xuất
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Bookmarks Placeholder */}
        {activeTab === 'bookmarks' && (
          <div className="text-center py-10 space-y-2">
            <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-500 text-2xl mb-1">
              🔖
            </div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">Tủ Truyện Đã Lưu</h4>
            <p className="text-[var(--text-muted)] text-xs max-w-sm mx-auto">
              Chức năng lưu truyện yêu thích đang được phát triển.
            </p>
          </div>
        )}

        {/* TAB 3: Reading History Placeholder */}
        {activeTab === 'history' && (
          <div className="text-center py-10 space-y-2">
            <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-500 text-2xl mb-1">
              📖
            </div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">Lịch Sử Đọc Truyện</h4>
            <p className="text-[var(--text-muted)] text-xs max-w-sm mx-auto">
              Chức năng lưu lịch sử chương truyện đang được phát triển.
            </p>
          </div>
        )}

        {/* TAB 4: Account Settings Placeholder */}
        {activeTab === 'settings' && (
          <div className="text-center py-10 space-y-2">
            <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-500 text-2xl mb-1">
              ⚙️
            </div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">Cài Đặt Tài Khoản</h4>
            <p className="text-[var(--text-muted)] text-xs max-w-sm mx-auto">
              Chức năng chỉnh sửa thông tin và đổi mật khẩu đang được tích hợp.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
