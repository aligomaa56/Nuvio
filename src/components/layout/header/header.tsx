import Image from 'next/image';
import { AuthSection } from './auth-section';

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

          {/* Auth Section - Client Component */}
          <AuthSection />
        </div>
      </div>
    </header>
  );
};
