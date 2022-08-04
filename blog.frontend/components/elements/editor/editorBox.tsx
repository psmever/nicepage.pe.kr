import { NextPage } from 'next';

const EditorBox: NextPage = () => {
    return (
        <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2">
            <div className="mb-6">
                <input
                    type="text"
                    className="block w-full rounded-lg sm:text-md border-none focus:outline-none text-3xl"
                    placeholder="제목을 입력해 주세요"
                />
            </div>
        </div>
    );
};

export default EditorBox;
