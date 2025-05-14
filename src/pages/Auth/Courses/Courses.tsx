import { title } from "@/components/primitives";
import { SimpleEditor } from "@/components/TipTap/tiptap-editor/Editor";
import DefaultLayout from "@/layouts/default";

export default function Courses() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Courses</h1>
          <SimpleEditor />
        </div>
      </section>
    </DefaultLayout>
  );
}
