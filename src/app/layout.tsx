import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Attendance Tracker",
  description: "Track your attendance and plan ahead for academic success. Monitor your class attendance, exam schedules, and weekly timetable all in one place.",
  keywords: ["attendance tracker", "student app", "academic planner", "class schedule", "exam schedule"],
  authors: [{ name: "Student Attendance Tracker" }],
  openGraph: {
    title: "Student Attendance Tracker",
    description: "Track your attendance and plan ahead for academic success",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Attendance Tracker",
    description: "Track your attendance and plan ahead for academic success",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
