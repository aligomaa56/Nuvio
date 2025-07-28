import { getNoteById } from "@/server/notes"
import RichTextEditor from "@/components/features/dashboard/components/rich-text-editor"
import { JSONContent } from "@tiptap/react"


export async function NoteView({ noteId }: { noteId: string }) {
  const result = await getNoteById(noteId);
  if (!result.success || !result.note) {
    return <div>Error: {result.message}</div>;
  }
  const { note } = result;
  return <RichTextEditor content={note.content as JSONContent[]} noteId={noteId} />;
}