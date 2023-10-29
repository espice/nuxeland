export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`}>
        <button>login</button>
      </a>
    </main>
  );
}
