const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 mt-auto border-t border-white/10 w-full bg-[#0a0b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <span className="font-bold text-lg text-white">Novelis</span>
          <p className="text-slate-400 text-sm mb-0">Nền tảng đọc truyện chữ trực tuyến cao cấp và mượt mà.</p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-slate-500 text-sm mb-0">
            &copy; {currentYear} Novelis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;