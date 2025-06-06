import { EditorContent, EditorContext, useEditor,Editor as Editortype } from "@tiptap/react"

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TaskItem } from "@tiptap/extension-task-item"
import { TaskList } from "@tiptap/extension-task-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Underline } from "@tiptap/extension-underline"

// --- Custom Extensions ---
import { Link } from "@/components/TipTap/tiptap-extension/link-extension"
import { Selection } from "@/components/TipTap/tiptap-extension/selection-extension"
import { TrailingNode } from "@/components/TipTap/tiptap-extension/trailing-node-extension"

// --- UI Primitives ---
import { Button } from "@/components/TipTap/tiptap-ui-primitive/button"
import { Spacer } from "@/components/TipTap/tiptap-ui-primitive/spacer"
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/TipTap/tiptap-ui-primitive/toolbar"

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/TipTap/tiptap-node/image-upload-node/image-upload-node-extension"
import "@/components/TipTap/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/TipTap/tiptap-node/list-node/list-node.scss"
import "@/components/TipTap/tiptap-node/image-node/image-node.scss"
import "@/components/TipTap/tiptap-node/paragraph-node/paragraph-node.scss"

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/TipTap/tiptap-ui/heading-dropdown-menu"
import { ImageUploadButton } from "@/components/TipTap/tiptap-ui/image-upload-button"
import { ListDropdownMenu } from "@/components/TipTap/tiptap-ui/list-dropdown-menu"
import { NodeButton } from "@/components/TipTap/tiptap-ui/node-button"
import {
  HighlightPopover,
  HighlightContent,
  HighlighterButton,
} from "@/components/TipTap/tiptap-ui/highlight-popover"
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/TipTap/tiptap-ui/link-popover"
import { MarkButton } from "@/components/TipTap/tiptap-ui/mark-button"
import { TextAlignButton } from "@/components/TipTap/tiptap-ui/text-align-button"
import { UndoRedoButton } from "@/components/TipTap/tiptap-ui/undo-redo-button"

// --- Icons ---
import { ArrowLeftIcon } from "@/components/TipTap/tiptap-icons/arrow-left-icon"
import { HighlighterIcon } from "@/components/TipTap/tiptap-icons/highlighter-icon"
import { LinkIcon } from "@/components/TipTap/tiptap-icons/link-icon"

// --- Hooks ---
import { useMobile } from "@/hooks/use-mobile"
import { useWindowSize } from "@/hooks/use-window-size"



// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"

// --- Styles ---
import "@/components/TipTap/tiptap-editor/editor.scss"


import content from "@/components/TipTap/tiptap-editor/data/content.json"
import { useEffect, useRef, useState } from "react"



export function ReadOnlyEditor({seteditor}:{seteditor:React.Dispatch<React.SetStateAction<Editortype | null>>}) {
  const isMobile = useMobile()
  const windowSize = useWindowSize()
  const [mobileView, setMobileView] = useState<
    "main" | "highlighter" | "link"
  >("main")
  const [rect, setRect] = useState<
    Pick<DOMRect, "x" | "y" | "width" | "height">
  >({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const toolbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateRect = () => {
      setRect(document.body.getBoundingClientRect())
    }

    updateRect()

    const resizeObserver = new ResizeObserver(updateRect)
    resizeObserver.observe(document.body)

    window.addEventListener("scroll", updateRect)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("scroll", updateRect)
    }
  }, [])

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,

      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      TrailingNode,
      Link.configure({ openOnClick: false }),
    ],
    content: content,
  });

  useEffect(() => {
    seteditor(editor);
  }, [editor, seteditor]);

  useEffect(() => {
    const checkCursorVisibility = () => {
      if (!editor || !toolbarRef.current) return

      const { state, view } = editor
      if (!view.hasFocus()) return

      const { from } = state.selection
      const cursorCoords = view.coordsAtPos(from)

      if (windowSize.height < rect.height) {
        if (cursorCoords && toolbarRef.current) {
          const toolbarHeight =
            toolbarRef.current.getBoundingClientRect().height
          const isEnoughSpace =
            windowSize.height - cursorCoords.top - toolbarHeight > 0

          // If not enough space, scroll until the cursor is the middle of the screen
          if (!isEnoughSpace) {
            const scrollY =
              cursorCoords.top - windowSize.height / 2 + toolbarHeight
            window.scrollTo({
              top: scrollY,
              behavior: "smooth",
            })
          }
        }
      }
    }

    checkCursorVisibility()
  }, [editor, rect.height, windowSize.height])

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main")
    }
  }, [isMobile, mobileView])

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className="content-wrapper">
        <EditorContent
          editor={editor}
          role="presentation"
        />
      </div>
    </EditorContext.Provider>
  )
}
