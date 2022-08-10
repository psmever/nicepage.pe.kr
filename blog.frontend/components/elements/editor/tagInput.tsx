import { NextPage } from 'next';
import { TagsInput } from 'react-tag-input-component';
import { useState } from 'react';

export const TagInput: NextPage = () => {
    const [selected, setSelected] = useState(['papaya']);

    return (
        <TagsInput
            value={selected}
            onChange={setSelected}
            name="fruits"
            placeHolder="테그를 입력해 주세요."
        />
    );
};
