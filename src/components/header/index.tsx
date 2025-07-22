import Link from 'next/link';
export function Header() {
  return (
    <header className="w-full flex items-center px-2 py-4 bg-blue-500 h-20">
      <div>
        <Link href="/">
          <span className="text-blue-500">Dev</span> Controle
        </Link>
      </div>
      <div>
        <Link href="/">
          <span className="text-black-500">Dev</span> Controle
        </Link>
      </div>
    </header>
  );
}
