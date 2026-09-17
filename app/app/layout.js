import "./globals.css";

export const metadata = {
  title: "캠퍼스 마켓",
  description: "우리 학교 학생들을 위한 중고 거래 플랫폼",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className="mx-auto min-h-screen w-full max-w-[480px] bg-paper shadow-[0_0_40px_rgba(0,0,0,0.04)]">
          {children}
        </div>
      </body>
    </html>
  );
}
