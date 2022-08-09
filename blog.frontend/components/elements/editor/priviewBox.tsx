import { NextPage } from 'next';
import { MarkdownView } from './markdownView';

const PriviewBox: NextPage = () => {
    return (
        <div className="flex-1">
            <MarkdownView />
        </div>
    );
};

export default PriviewBox;
