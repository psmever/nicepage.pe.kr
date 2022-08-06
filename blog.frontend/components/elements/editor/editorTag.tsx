import { NextPage } from 'next';
import { TagsInput } from 'react-tag-input-component';
import { useState } from 'react';

export const EditorTag: NextPage = () => {
    const [selected, setSelected] = useState(['papaya']);

    return (
        <div className="">
            <TagsInput
                value={selected}
                onChange={setSelected}
                name="fruits"
                placeHolder="테그를 입력해 주세요."
            />
        </div>
    );
};
