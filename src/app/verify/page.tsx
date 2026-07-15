import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function VerifyPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="max-w-md text-center">
        <div className="mb-4 text-4xl">✨</div>
        <CardTitle>Email Terverifikasi!</CardTitle>
        <CardDescription className="mt-2">
          Kamu akan diarahkan otomatis. Jika tidak, kembali ke halaman login.
        </CardDescription>
      </Card>
    </div>
  );
}