import { cn } from '@/lib/utils';
import * as React from 'react';
import { NotesIllustration } from './illustrations/notes-illustration';

export function EmptyState({
  title,
  description,
  cta,
  className,
}: {
  title?: string;
  description?: string;
  cta?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-label="Empty state"
      className={cn('mx-auto max-w-xl text-center grid gap-4', className)}
    >
      <div className="mx-auto">
        <NotesIllustration />
      </div>

      <h2 className="text-2xl font-semibold tracking-tight text-white">
        {title}
      </h2>

      {description ? (
        <p className="text-sm leading-relaxed text-white/70">{description}</p>
      ) : null}

      {cta ? <div className="mt-2">{cta}</div> : null}
    </section>
  );
}

export default EmptyState;
