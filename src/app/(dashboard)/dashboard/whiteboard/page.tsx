import { redirect } from 'next/navigation';
import { whiteboardMetadata } from '@/app/data/metadata';

export const metadata = whiteboardMetadata;

export default function WhiteboardPage() {
  // Redirect to dashboard since whiteboard is not available yet
  redirect('/dashboard');
}
