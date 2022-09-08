import { MDEditorProps } from '@uiw/react-md-editor';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor'), {
	ssr: false,
});

export const Editor = ({ ...rest }: MDEditorProps) => {
	return (
		<MDEditor
			preview="edit"
			{...rest}
			textareaProps={{
				placeholder: '내용을 입력해 주세요.',
			}}
		/>
	);
};
