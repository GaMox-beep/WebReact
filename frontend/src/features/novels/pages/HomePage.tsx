export const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#11131e] border border-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-2">Chào mừng đến với Novelis</h2>
          <p className="text-slate-400 text-sm mb-4">
            Nền tảng đọc truyện chữ trực tuyến tốc độ cao, hỗ trợ nhiều thể loại và trải nghiệm mượt mà.
          </p>
          <button className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all text-sm">
            Khám Phá Ngay
          </button>
        </div>

        <div className="bg-[#11131e] border border-white/10 rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-3">Nhận Thông Báo</h3>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
            <div>
              <label className="block text-slate-300 text-xs font-medium mb-1">Địa chỉ Email</label>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
            </div>
            <button type="submit" className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl text-sm transition-all">
              Đăng Ký Nhận Tin
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default HomePage
