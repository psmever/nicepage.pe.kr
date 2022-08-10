import { NextPage } from 'next';
import { MarkdownView } from '@Elements/markdown/markdownView';

const PriviewBox: NextPage = () => {
    return (
        <div className="flex-1">
            <MarkdownView />
        </div>
    );
};

export default PriviewBox;
