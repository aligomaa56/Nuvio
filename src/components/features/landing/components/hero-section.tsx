import React from 'react';
import Link from 'next/link';
import { TextEffect } from '@/components/ui/text-effect';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/header/header';
import { AnimatedTools } from '@/components/features/landing/components/animated-tools';
import SpaceBackground from '@/components/features/landing/components/space-background';
import { FaGithub } from 'react-icons/fa';
import { Badge } from '@/components/ui/badge';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HeroSection() {
  return (
    <>
      <main className="overflow-hidden min-h-screen bg-black text-white relative flex flex-col">
        <div className="hidden md:block">
          <SpaceBackground />
        </div>

        {/* Background Effects */}
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden contain-strict lg:block"
        >
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>

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
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                    Nuvio
                  </span>{' '}
                  leads the way, one write is all it takes.
                </h1>

                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="max-w-xl sm:max-w-2xl mx-auto text-pretty text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed px-4"
                >
                  Think clearly. Stay organized. Revisit with ease.
                </TextEffect>

                <AnimatedGroup variants={transitionVariants} className="pt-1 sm:pt-2">
                  <Link
                    href="/login"
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-3 sm:gap-4 lg:gap-5 rounded-full border p-1 sm:p-1.5 pl-4 sm:pl-6 shadow-lg shadow-zinc-950/10 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950 hover:scale-105"
                  >
                    <span className="text-foreground text-sm sm:text-base font-medium">
                      Get Started
                    </span>
                    <span className="dark:border-background block h-4 sm:h-5 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                    <div className="bg-background group-hover:bg-muted size-6 sm:size-7 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 sm:w-14 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6 sm:size-7">
                          <ArrowRight className="m-auto size-3 sm:size-3.5" />
                        </span>
                        <span className="flex size-6 sm:size-7">
                          <ArrowRight className="m-auto size-3 sm:size-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedGroup>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative z-8">
          <div className="max-w-4xl px-6 mx-auto py-2 sm:py-3 lg:py-4 flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-white text-xs sm:text-sm lg:text-base">
                Author:{' '}
                <a
                  href="https://aligomaa.engineer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-medium hover:opacity-80 transition-opacity"
                >
                  @aligomaa
                </a>
              </p>
            </div>
            <Badge
              className="rounded-full flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-900 via-purple-800 to-cyan-900 text-white border-0 shadow-md hover:from-blue-700 hover:to-cyan-700 transition-colors cursor-pointer"
              asChild
            >
              <a
                href="https://github.com/aligomaa56/Nuvio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
              >
                <FaGithub size={20} className="inline-block align-middle" />
                <span className="ml-1 font-semibold">Contribute now</span>
              </a>
            </Badge>
          </div>
        </footer>
      </main>
    </>
  );
}
