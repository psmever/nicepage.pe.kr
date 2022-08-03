import MainLayout from '@components/layouts/main';
import { FC } from 'react';

type Example = FC & { layout: typeof MainLayout };

const Example: Example = () => {
    return <div>example</div>;
};
Example.layout = MainLayout;

export default Example;
