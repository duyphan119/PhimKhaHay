import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center bg-muted">
      <div className="_container rounded-2xl border border-white/10 bg-white/5 p-8 my-4 text-center shadow-2xl backdrop-blur">
        <h1 className="text-7xl font-extrabold text-white">404</h1>

        <h2 className="mt-3 text-2xl font-semibold text-white">
          Không tìm thấy trang
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          Xin lỗi, trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.
        </p>

        <Link
          href="/"
          className="mt-4 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:scale-105 hover:bg-slate-200"
        >
          ← Về trang chủ
        </Link>
      </div>
    </div>
  );
}
