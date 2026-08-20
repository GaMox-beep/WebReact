# 📖 WebNovel Platform

Nền tảng đọc và quản lý tiểu thuyết trực tuyến full-stack được xây dựng với kiến trúc hiện đại, hiệu năng cao và trải nghiệm người dùng tối ưu.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Frontend**: React 19, TypeScript, Vite 8, TailwindCSS v4, TanStack Query v5.
- **Backend**: NestJS 11, TypeScript, Prisma 7 ORM, Passport.js (JWT & Google OAuth 2.0).
- **Database & Storage**: PostgreSQL (Supabase), Supabase Storage (lưu trữ ảnh bìa).
- **Cổng Thanh Toán**: VNPay Gateway, Ví MoMo.
- **Testing & DevOps**: Docker, Docker Compose, Jest (23+ unit test suites).

---

## ✨ Tính Năng Chính (Key Features)

1. **Trang Chủ Đa Phân Đoạn**: Hiển thị danh sách truyện mới cập nhật và truyện đọc nhiều nhất, bộ lọc thể loại và tìm kiếm thông minh.
2. **Trình Đọc Chương Chuyên Nghiệp**: Tùy chỉnh font chữ, kích cỡ chữ, khoảng cách dòng, giao diện Dark/Light mode, tự động ghi nhận lượt đọc.
3. **Mở Khóa Chương VIP (Monetization)**: Cơ chế paywall mở khóa chương VIP bằng Linh Thạch (tiền tệ ảo).
4. **Hệ Thống Tủ Truyện (Bookmarks)**: Đánh dấu và theo dõi truyện yêu thích, đồng bộ tài khoản với giao diện phản hồi tức thì (Optimistic Updates).
5. **Nạp Linh Thạch & Thanh Toán Trực Tuyến**: Tích hợp VNPay và MoMo với cơ chế xử lý giao dịch lũy đẳng (Idempotent engine), chống cộng trùng xu và kiểm tra chữ ký IPN Webhook bảo mật.
6. **Bảng Quản Trị (Admin CMS)**: Quản lý danh mục thể loại, truyện, chương và theo dõi giao dịch.

---

## 🚀 Hướng Dẫn Khởi Chạy Nhanh (Quick Start)

### 1. Yêu cầu hệ thống
- Node.js >= 20
- pnpm >= 9
- Docker & Docker Compose

### 2. Cài đặt và chạy Backend
```bash
cd backend
# Cấu hình file .env từ .env.example
docker compose up -d --build
```
Backend API sẽ chạy tại: `http://localhost:3000/api`

### 3. Cài đặt và chạy Frontend
```bash
cd frontend
pnpm install
pnpm dev
```
Frontend Web sẽ chạy tại: `http://localhost:5173`

---

## 📁 Cấu Trúc Dự Án (Project Structure)

```text
WebNovel/
├── backend/          # NestJS API Server, Prisma ORM, Module thanh toán, Chapters, Novels, Bookmarks
├── frontend/         # React 19 SPA, Feature Modules (Domain-driven), TanStack Query, Routes
└── README.md         # Giới thiệu tổng quan dự án
```
