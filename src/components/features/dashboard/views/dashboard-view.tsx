'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Notebook, Users, Clock, Sparkles } from 'lucide-react';

export default function DashboardView() {
  return (
    <div>
      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to Nuvio
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose your creative workspace and start building something amazing.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid auto-rows-min gap-6 md:grid-cols-3">
          {/* Notebooks Product Card */}
          <Link href="/dashboard/notebooks" className="group block">
            <div className="relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-primary/20">
              {/* Header with Icon and Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-semibold text-lg">Notebooks</h3>
                    <p className="text-sm text-muted-foreground">
                      Organize & Write
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                  <Sparkles className="h-3 w-3" />
                  Popular
                </div>
              </div>

              {/* Illustration */}
              <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/notes.svg"
                    alt="Notes illustration"
                    width={120}
                    height={120}
                    className="scale-120 group-hover:scale-130 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 mb-4">
                <p className="text-sm text-foreground leading-relaxed">
                  Create notebooks to categorize your thoughts, ideas, and
                  projects. Write rich-text notes with powerful editing tools.
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-xs text-foreground/80">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    Rich Text Editor
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground/80">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    Auto Save
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground/80">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    Organization
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground/80">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    Search & Tags
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    1.2k users
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Updated recently
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                  Get Started
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-muted/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </Link>

          {/* Whiteboard Product Card - Coming Soon */}
          <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-background to-muted/20 p-6 opacity-60">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-semibold text-lg">Whiteboard</h3>
                  <p className="text-sm text-muted-foreground">
                    Draw & Visualize
                  </p>
                </div>
              </div>
              <div className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-600 text-xs font-medium">
                Coming Soon
              </div>
            </div>

            {/* Illustration */}
            <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/drawing.svg"
                  alt="Whiteboard illustration"
                  width={120}
                  height={120}
                  className="scale-120 group-hover:scale-130 transition-transform duration-500"
                />
              </div>
            </div>

            <p className="text-sm text-foreground leading-relaxed">
              Express your creativity with digital whiteboarding tools. Perfect
              for brainstorming and visual collaboration.
            </p>
          </div>

          {/* Future Product Placeholder */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-muted bg-muted/10 p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
            <div className="p-4 rounded-xl">
              <Image src="/explore.svg" alt="Coming Soon" width={100} height={100} />
            </div>
            <h3 className="font-semibold text-lg mb-2">More Products Coming</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              We're working on exciting new tools to enhance your creative
              workflow. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
