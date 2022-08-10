import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { useWindowResize } from '@Hooks/useWindowResize';

import { Editor } from '@Elements/markdown/editor';
import { TagInput } from './tagInput';

type DraftPageProps = {};

const EditorBox: NextPage<DraftPageProps> = () => {
    const [value, setValue] = useState('**Hello world!!!**');

    const [windowWidth, windowHeight] = useWindowResize();

    const [editorHeight, setEditorHeight] = useState<number>(0);

    const handleChange = useCallback((value: any) => {
        setValue(value);
    }, []);

    useEffect(() => {
        const funSetHeight = (height: number) => {
            setEditorHeight(height - 160);
        };

        if (windowHeight > 0) {
            funSetHeight(windowHeight);
        }
    }, [windowWidth, windowHeight]);

    useEffect(() => {
        console.debug(value);
    }, [value]);

    return (
        <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2">
            <div className="h-screen">
                <div className="mt-4 mb-4">
                    <input
                        type="text"
                        className="block w-full rounded-lg sm:text-md border-none focus:outline-none text-3xl"
                        placeholder="제목을 입력해 주세요"
                    />
                </div>

                <div className="w-full mb-4 grid-cols-12">
                    <TagInput />
                </div>

                <div className="w-full mb-4 grid-cols-12">
                    <Editor
                        value={value}
                        onChange={handleChange}
                        height={editorHeight}
                        hideToolbar={true}
                    />
                </div>

                <div className="flex justify-start">
                    <button
                        type="button"
                        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        나가기
                    </button>
                    <button
                        type="button"
                        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        저장
                    </button>
                    <button
                        type="button"
                        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        게시
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditorBox;
