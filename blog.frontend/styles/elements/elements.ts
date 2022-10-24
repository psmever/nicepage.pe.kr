import tw from 'twin.macro';
// import styled from '@emotion/styled';

export const SplashContainer = tw.div`flex items-center justify-center h-screen`;
export const SplashWapoper = tw.div`flex justify-center items-center space-x-1 text-sm text-gray-700`;
export const LoadingText = tw.div``;

export const UnderConstructionMainContainer = tw.div`flex items-center justify-center h-screen bg-gray-200`;
export const UnderConstructionContainer = tw.div`container`;
export const UnderConstructionWapper = tw.div`bg-white rounded-lg shadow-lg p-5 md:p-20 mx-2`;
export const UnderConstructionTextBox = tw.div`text-center`;
export const UnderConstructionTextTitle = tw.h2`text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl`;
export const UnderConstructionTextSpan = tw.span`text-indigo-600`;
export const UnderConstructionComingSoon = tw.h3`text-xl md:text-3xl mt-10`;
export const UnderConstructionMainTextBox = tw.p`text-base md:text-xl mt-10`;
export const UnderConstructionMainLink = tw.a`hover:underline`;

export const EditorBoxContainer = tw.div`flex-1 text-gray-900 text-center bg-gray-100`;
export const EditorBoxWapper = tw.div`h-screen p-4`;
export const EditorBoxTitleBox = tw.div`m-4`;
export const EditorBoxTitleInput = tw.input`block w-full rounded-lg sm:text-base border-none focus:outline-none text-4xl`;
export const EditorBoxTagBox = tw.div`w-full mt-4 grid-cols-12`;
export const EditorBoxEditorBox  = tw.div`w-full mt-4 grid-cols-12`;
export const EditorBoxDropZoneBox = tw.div`flex justify-center items-center w-full`
export const EditorBoxDropZoneLabel = tw.label`flex flex-col justify-center items-center w-full border-2`
export const EditorBoxDropZoneTitleBox = tw.label`flex flex-col justify-center items-center pt-2 pb-2`
export const EditorBoxDropZoneTitleP = tw.p`text-sm`
export const EditorBoxDropZoneTitleSpan = tw.span`font-semibold`
export const EditorBoxDropZoneInput = tw.input`hidden`
export const EditorBoxDropZoneButtonBox = tw.div`flex justify-start mt-2`

export const PriviewBoxContainer = tw.div`flex-1 bg-gray-100`
export const PriviewBoxWapper = tw.div`h-screen p-4`
export const PriviewBoxTitleBox = tw.div`w-full grid-cols-12`
export const PriviewBoxTitle = tw.p`text-5xl font-black text-gray-900 m-4`
export const PriviewBoxMarkdownViewBox = tw.div`w-full grid-cols-12 mt-12`
