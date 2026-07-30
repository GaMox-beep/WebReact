import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { ProfileDetailsTab } from '../components/ProfileDetailsTab'
import { BookmarksTab } from '../components/BookmarksTab'
import { ReadingHistoryTab } from '../components/ReadingHistoryTab'
import { AccountSettingsTab } from '../components/AccountSettingsTab'

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
        {activeTab === 'profile' && <ProfileDetailsTab user={user} onLogout={logout} />}
        {activeTab === 'bookmarks' && <BookmarksTab />}
        {activeTab === 'history' && <ReadingHistoryTab />}
        {activeTab === 'settings' && <AccountSettingsTab />}
      </div>
    </div>
  )
}

export default ProfilePage
