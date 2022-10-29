import tw from 'twin.macro';
// import styled from '@emotion/styled';

export const Splash = {
	Container: tw.div`flex items-center justify-center h-screen`,
	Wapoper: tw.div`flex justify-center items-center space-x-1 text-sm text-gray-700`,
	LoadingText: tw.div``,
};

export const UnderConstruction = {
	MainContainer: tw.div`flex items-center justify-center h-screen bg-gray-200`,
	Container: tw.div`container`,
	Wapper: tw.div`bg-white rounded-lg shadow-lg p-5 md:p-20 mx-2`,
	TextBox: tw.div`text-center`,
	TextTitle: tw.h2`text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl`,
	TextSpan: tw.span`text-indigo-600`,
	ComingSoon: tw.h3`text-xl md:text-3xl mt-10`,
	MainTextBox: tw.p`text-base md:text-xl mt-10`,
	MainLink: tw.a`hover:underline`,
};

export const ButtonsStyle = {
	EditorActionStyle: tw.button`py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`,
};

export const EditorBoxStyle = {
	Container: tw.div`flex-1 text-gray-900 text-center bg-gray-100`,
	Wapper: tw.div`h-screen p-4`,
	TitleBox: tw.div`m-4`,
	TitleInput: tw.input`block w-full rounded-lg border-none focus:outline-none text-4xl`,
	TagBox: tw.div`w-full mt-4 grid-cols-12`,
	EditorBoxWapper: tw.div`w-full mt-4 grid-cols-12`,
	DropZoneBox: tw.div`flex justify-center items-center w-full`,
	DropZoneLabel: tw.label`flex flex-col justify-center items-center w-full border-2`,
	DropZoneTitleBox: tw.label`flex flex-col justify-center items-center pt-2 pb-2`,
	DropZoneTitleP: tw.p`text-sm`,
	DropZoneTitleSpan: tw.span`font-semibold`,
	DropZoneInput: tw.input`hidden`,
	DropZoneButtonBox: tw.div`flex justify-start mt-2`,
};

export const PriviewBoxStyle = {
	Container: tw.div`flex-1 bg-gray-100`,
	Wapper: tw.div`h-screen p-4`,
	TitleBox: tw.div`w-full grid-cols-12`,
	Title: tw.p`text-5xl font-black text-gray-900 m-4`,
	MarkdownViewBox: tw.div`w-full grid-cols-12 mt-12`,
};
