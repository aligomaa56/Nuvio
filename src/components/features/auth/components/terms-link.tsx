import Link from 'next/link';

export function TermsLink() {
  return (
    <div className="mt-4 text-center text-sm text-muted-foreground">
      By continuing, you agree to our{' '}
      <Link href="#" className="underline underline-offset-4">
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link href="#" className="underline underline-offset-4">
        Privacy Policy
      </Link>
    </div>
  );
} 