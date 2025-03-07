export default function NotFound() {
  return (
    <div className="my-auto flex max-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-xl">這個頁面不存在，請返回首頁。</p>
      <a
        href="/"
        className="mt-6 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        回到首頁
      </a>
    </div>
  );
}
