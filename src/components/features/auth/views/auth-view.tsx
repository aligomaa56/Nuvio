import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { SocialButtons } from '@/components/features/auth';

export function AuthView({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardContent>
          <SocialButtons />
        </CardContent>
      </Card>
    </div>
  );
}
