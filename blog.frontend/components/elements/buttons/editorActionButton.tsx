import { NextPage } from 'next';
import { ButtonsStyle } from '@Styles/elements/elements';

const { EditorActionStyle } = ButtonsStyle;

const EditorActionButton: NextPage<{
	buttonName: string;
	onClickHandler: () => void;
}> = ({ buttonName, onClickHandler }) => {
	return <EditorActionStyle onClick={() => onClickHandler()}>{buttonName}</EditorActionStyle>;
};

export default EditorActionButton;
