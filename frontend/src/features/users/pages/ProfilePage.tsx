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
        return 'bg-red-500/10 text-red-400 border-red-500/30'
      case 'AUTHOR':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30'
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    }
  }

  const userInitial = user.username ? user.username.charAt(0).toUpperCase() : 'U'

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Banner & User Summary */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-xl p-6 sm:p-8 mb-8 transition-colors">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar Initial Circle */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-black font-extrabold text-4xl shadow-xl shadow-amber-500/20 shrink-0 border-2 border-amber-400">
            {userInitial}
          </div>

          {/* User Basic Info */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                {user.username}
              </h1>
              <span className={`inline-flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full border self-center sm:self-auto ${getRoleBadgeColor(user.role)}`}>
                {user.role}
              </span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm">{user.email}</p>
            {user.createdAt && (
              <p className="text-[var(--text-muted)] text-xs">
                Ngày tham gia: {new Date(user.createdAt).toLocaleDateString('vi-VN')}
              </p>
            )}
          </div>

          {/* Coins Balance Card */}
          <div className="bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] rounded-xl p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-md">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <span className="text-2xl">🪙</span>
            </div>
            <div>
              <span className="block text-[var(--text-muted)] text-xs font-medium">Số dư Linh Thạch</span>
              <span className="text-2xl font-black text-amber-500">{user.coins.toLocaleString('vi-VN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--border-color)] mb-6 pb-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
          }`}
        >
          👤 Hồ Sơ Cá Nhân
        </button>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'bookmarks'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
          }`}
        >
          🔖 Tủ Truyện Đã Lưu
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'history'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
          }`}
        >
          📖 Lịch Sử Đọc
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
          }`}
        >
          ⚙️ Cài Đặt Tài Khoản
        </button>
      </div>

      {/* Tab Content Panels */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-xl transition-colors">
        {/* TAB 1: Profile Details */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
              Thông Tin Tài Khoản
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-[var(--bg-surface-elevated)] rounded-xl border border-[var(--border-color)]">
                <span className="block text-[var(--text-muted)] text-xs font-medium mb-1">Mã ID Người Dùng</span>
                <span className="font-mono text-sm text-[var(--text-primary)]">{user.id}</span>
              </div>
              <div className="p-4 bg-[var(--bg-surface-elevated)] rounded-xl border border-[var(--border-color)]">
                <span className="block text-[var(--text-muted)] text-xs font-medium mb-1">Tên Người Dùng</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{user.username}</span>
              </div>
              <div className="p-4 bg-[var(--bg-surface-elevated)] rounded-xl border border-[var(--border-color)]">
                <span className="block text-[var(--text-muted)] text-xs font-medium mb-1">Địa Chỉ Email</span>
                <span className="text-sm text-[var(--text-primary)]">{user.email}</span>
              </div>
              <div className="p-4 bg-[var(--bg-surface-elevated)] rounded-xl border border-[var(--border-color)]">
                <span className="block text-[var(--text-muted)] text-xs font-medium mb-1">Vai Trò Hệ Thống</span>
                <span className="text-sm font-bold text-amber-500">{user.role}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-color)] flex justify-end">
              <button
                onClick={logout}
                className="px-6 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/30 rounded-xl font-semibold text-sm transition-all"
              >
                Đăng Xuất Tài Khoản
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Bookmarks Placeholder */}
        {activeTab === 'bookmarks' && (
          <div className="text-center py-12 space-y-3">
            <div className="inline-flex p-4 rounded-full bg-amber-500/10 text-amber-500 text-3xl mb-2">
              🔖
            </div>
            <h4 className="text-lg font-bold text-[var(--text-primary)]">Tủ Truyện Đã Lưu</h4>
            <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
              Chức năng lưu truyện yêu thích đang được phát triển trong Mô-đun Quản lý Truyện.
            </p>
          </div>
        )}

        {/* TAB 3: Reading History Placeholder */}
        {activeTab === 'history' && (
          <div className="text-center py-12 space-y-3">
            <div className="inline-flex p-4 rounded-full bg-amber-500/10 text-amber-500 text-3xl mb-2">
              📖
            </div>
            <h4 className="text-lg font-bold text-[var(--text-primary)]">Lịch Sử Đọc Truyện</h4>
            <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
              Chức năng tự động ghi nhớ chương truyện đã đọc đang được phát triển trong Mô-đun Chương Truyện.
            </p>
          </div>
        )}

        {/* TAB 4: Account Settings Placeholder */}
        {activeTab === 'settings' && (
          <div className="text-center py-12 space-y-3">
            <div className="inline-flex p-4 rounded-full bg-amber-500/10 text-amber-500 text-3xl mb-2">
              ⚙️
            </div>
            <h4 className="text-lg font-bold text-[var(--text-primary)]">Cài Đặt & Đổi Mật Khẩu</h4>
            <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
              Chức năng chỉnh sửa thông tin cá nhân và đổi mật khẩu đang được tích hợp.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
