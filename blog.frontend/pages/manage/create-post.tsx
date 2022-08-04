import { FC } from 'react';
import ManageLayout from '@components/layouts/manage';
import { EditorBox, PriviewBox } from '@components/elements';

type CreatePost = FC & { layout: typeof ManageLayout };

const CreatePost: CreatePost = () => {
    return (
        <div className="flex items-stretch bg-grey-lighter w-full min-h-screen border-2">
            <EditorBox />
            <PriviewBox />
        </div>
    );
};

CreatePost.layout = ManageLayout;

export default CreatePost;
