'use client';

import type { ForwardedRef } from 'react'
import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    type MDXEditorMethods,
    type MDXEditorProps,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    CreateLink,
    InsertCodeBlock,
    InsertTable,
    tablePlugin,
    linkPlugin,
    linkDialogPlugin,
    CodeToggle,
    codeBlockPlugin,
    sandpackPlugin,
    codeMirrorPlugin,
    Separator,
    SandpackConfig,
    ConditionalContents,
    InsertSandpack,
    ChangeCodeMirrorLanguage,
    ShowSandpackInfo,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css';
import { useTheme } from 'next-themes';

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

const simpleSandpackConfig: SandpackConfig = {
    defaultPreset: 'react',
    presets: [
      {
        label: 'React',
        name: 'react',
        meta: 'live react',
        sandpackTemplate: 'react',
        sandpackTheme: 'light',
        snippetFileName: '/App.js',
        snippetLanguage: 'jsx',
        initialSnippetContent: defaultSnippetContent
      },{
        label: 'React',
        name: 'react',
        meta: 'live react',
        sandpackTemplate: 'react',
        sandpackTheme: 'light',
        snippetFileName: '/App.js',
        snippetLanguage: 'jsx',
        initialSnippetContent: defaultSnippetContent
      }
    ]
  }

const Editor = ({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) => {

  const resolvedTheme = useTheme();

  return (
    <MDXEditor
    key={resolvedTheme.theme}
    placeholder="Write your question here..."
    plugins={[
    // typography plugins
    headingsPlugin(),
    listsPlugin(),
    quotePlugin(),
    thematicBreakPlugin(),
    markdownShortcutPlugin(),
    // toolbar nested plugins
    codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
    codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
    sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
    linkPlugin(),
    linkDialogPlugin(),
    tablePlugin(),
    // toolbar plugin
    toolbarPlugin({
        toolbarClassName: "",
        toolbarContents: () => (
            <>
            <UndoRedo />
            <Separator/>
            <BoldItalicUnderlineToggles/>
            <Separator/>
            <CreateLink/>
            <CodeToggle/>
            <ConditionalContents
              options={[
                { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                {
                  fallback: () => (
                    <>
                      <InsertCodeBlock />
                      <InsertSandpack />
                    </>
                  )
                }
              ]}
            />
            <InsertTable/>
            </>
        )
    })
    ]}
    {...props}
    ref={editorRef}
    />
  )
}

export default Editor;

