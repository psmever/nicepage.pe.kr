import tw from 'twin.macro';
import styled from '@emotion/styled';

// export const Container = tw.div`flex items-center justify-center h-screen`;

export const Container = styled.div(({ CollapseShow }: { CollapseShow: boolean }) => [
	CollapseShow
		? tw`absolute top-0 left-0 right-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none bg-white m-2 py-3 px-6`
		: tw`absolute top-0 left-0 right-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none bg-white hidden`,
]);
