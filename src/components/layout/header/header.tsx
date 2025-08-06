import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  return (
    <header className="relative z-8 pt-2">
      <div className="mx-auto max-w-4xl px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Badge */}
          <div className="flex items-end gap-1">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Nuvio logo"
                width={24}
                height={24}
              />
            </div>
            <span className="bg-foreground/10 text-foreground/50 rounded-full py-0.5 px-2 text-xs font-bold">
              v1.0
            </span>
          </div>

          {/* Login Button */}
          <Link
            href="/login"
            className="hover:bg-background dark:hover:border-t-border bg-muted group flex w-fit items-center justify-center gap-5 rounded-full border px-3 py-1 shadow-lg shadow-zinc-950/10 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950 hover:scale-105"
          >
            <span className="text-foreground text-base font-medium">Login</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
