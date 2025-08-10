import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function HeroSectionFooter() {
  return (
    <footer className="relative z-8">
      <div className="max-w-4xl px-6 mx-auto py-2 sm:py-3 lg:py-4 flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-white text-xs sm:text-sm lg:text-base">
            Author:{' '}
            <Link
              href="https://aligomaa.engineer/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#a6a6a6] to-[#6f6b6b] bg-clip-text text-transparent font-medium hover:text-muted-foreground transition-opacity"
            >
              @aligomaa
            </Link>
          </p>
        </div>
        <Link
          href="https://github.com/aligomaa56/Nuvio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={18} />
        </Link>
      </div>
    </footer>
  );
}
