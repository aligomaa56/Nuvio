import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/header/header';
import { AnimatedTools } from '@/components/features/landing/components/animated-tools';
import SpaceBackground from '@/components/features/landing/components/space-background';
import { FaGithub } from 'react-icons/fa';

import { BackgroundEffects } from './background-effects';

export default function HeroSection() {
  return (
    <>
      <main className="overflow-hidden min-h-screen bg-black text-white relative flex flex-col">
        <div className="hidden md:block">
          <SpaceBackground />
        </div>

        {/* Background Effects */}
        <BackgroundEffects />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <section className="flex-1 flex items-center justify-center px-4 sm:px-6">
          <div className="relative w-full">
            <div className="mx-auto max-w-4xl lg:max-w-6xl px-4 sm:px-6">
              <div className="text-center space-y-3 sm:space-y-4 lg:space-y-5">
                <div className="hidden md:block">
                  <AnimatedTools />
                </div>
                <h1 className="max-w-3xl mx-auto text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight">
                  <span className="bg-gradient-to-r from-[#8b8b8b] via-[#545454] to-[#747474] bg-clip-text text-transparent animate-pulse">
                    Nuvio
                  </span>{' '}
                  leads the way, one write is all it takes.
                </h1>

                <p className="max-w-xl sm:max-w-2xl mx-auto text-pretty text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed px-4">
                  Think clearly. Stay organized. Revisit with ease.
                </p>

                <div className="pt-1 sm:pt-2">
                  <Link
                    href="/login"
                    className="bg-white dark:border border group mx-auto flex w-fit items-center gap-3 sm:gap-4 lg:gap-5 rounded-full p-1 sm:p-1.5 pl-4 sm:pl-6 shadow-lg shadow-zinc-950/10 transition-all duration-300 dark:border-zinc-400 dark:shadow-zinc-950 hover:bg-black hover:text-white hover:scale-105"
                  >
                    <span className="text-black text-sm sm:text-base font-medium group-hover:text-white">
                      Get Started
                    </span>
                    <span className="dark:border-background block h-4 sm:h-5 w-0.5 border-l bg-black dark:bg-zinc-400 group-hover:bg-white"></span>

                    <div className="bg-black group-hover:bg-white size-6 sm:size-7 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 sm:w-14 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6 sm:size-7">
                          <ArrowRight className="m-auto size-3 sm:size-3.5 text-white group-hover:text-black" />
                        </span>
                        <span className="flex size-6 sm:size-7">
                          <ArrowRight className="m-auto size-3 sm:size-3.5 text-white group-hover:text-black" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

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
      </main>
    </>
  );
}
