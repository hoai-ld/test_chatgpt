# React WebGIS + Esri Free Layers (TypeScript)

Sample WebGIS dùng **ReactJS + TypeScript** + ArcGIS Maps SDK for JavaScript (`@arcgis/core`).

## Đăng nhập demo (không DB)

Hiện tại app chưa tích hợp database, nên dùng tài khoản cứng trong code:

- Username: `admin`
- Password: `admin`

## Context đã có trong code

- `AuthContext`: quản lý đăng nhập/đăng xuất và user hiện tại.
- `PartContext`: quản lý khu vực nghiệp vụ đang xem (`overview`, `operations`, `analytics`).
- `LayerPermissionContext`: quản lý quyền bật/tắt layer theo user + part.
- `MapContext`: lưu đối tượng `Map` và `MapView` để chia sẻ trong app.
- `MapViewModule`: module tách riêng logic khởi tạo/hủy ArcGIS `Map` + `MapView`, được `MapContext` sử dụng.

## Chạy local

```bash
npm install
npm run dev
```

Mở: `http://localhost:5173`

## Kiểm tra TypeScript

```bash
npm run typecheck
```

## Build production

```bash
npm run build
npm run preview
```

## Các lớp dữ liệu miễn phí đang dùng

- Basemap: `arcgis-topographic`
- Feature Layer công khai: `USA_Cities_Generalized`
