import tw from 'twin.macro';
// import styled from '@emotion/styled';

export const Container = tw.div`md:w-1/2 lg:w-1/3 mx-auto my-12`;
export const Title = tw.h1`text-lg font-bold`;
export const InputWapper = tw.div`flex flex-col mt-4`;
export const EmailInput = tw.input`px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm`;
export const PasswordInput = tw.input`px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm`;
export const LoginButton = tw.button`mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none`;
