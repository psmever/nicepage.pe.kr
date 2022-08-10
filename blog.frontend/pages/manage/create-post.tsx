import { NextLayoutPage } from 'next';
import type { ReactElement } from 'react';
import ManageLayout from '@Components/layouts/manage';
import { EditorBox, PriviewBox } from '@Components/elements';

const CreatePost: NextLayoutPage = () => {
    return (
        <div className="flex items-stretch bg-grey-lighter w-full min-h-screen border-2">
            <EditorBox />
            <PriviewBox />
        </div>
    );
};

CreatePost.getLayout = (page: ReactElement) => {
    return <ManageLayout>{page}</ManageLayout>;
};

export default CreatePost;
