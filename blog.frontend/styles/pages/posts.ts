import tw from 'twin.macro';
// import styled from '@emotion/styled';

export const PostsStyle = {
	posts: {
		Container: tw.div`container mx-auto px-5 py-10 bg-gray-900`,
		Wapper: tw.div`-m-4 flex flex-wrap bg-gray-900`,
		PostWapper: tw.div`w-full p-4 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 cursor-pointer`,
		ItemWapper: tw.div`bg-gray-900 rounded-lg border border-gray-800 shadow-md`,
		ImageBox: tw.div`w-full h-40 relative`,
		ContentsWapper: tw.div`p-5`,
		TitleWapper: tw.h5`mb-2 text-2xl font-NanumSquare text-white`,
		ContentsText: tw.p`mb-3 font-NanumSquare text-gray-700 dark:text-gray-400`,
		DateWapper: tw.div`py-1 pl-3`,
		DateText: tw.p`mb-1 font-NanumSquare font-normal text-gray-700 dark:text-gray-400`,
	},
	view: {
		Container: tw.div`container mx-auto px-5 py-10 dark:bg-gray-900`,
		Wapper: tw.div`-m-4 flex flex-wrap dark:bg-gray-900`,
		ContentsWapper: tw.div`w-full`,
	},
};
