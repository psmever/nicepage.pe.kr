import tw from 'twin.macro';
// import styled from '@emotion/styled';

export const MainLayoutStyle = {
	Container: tw.div`flex flex-col bg-gray-900`,
	MainSection: tw.section`min-h-screen text-gray-800`,
	Headers: {
		Constainer: tw.header`sticky top-0 z-50`,
		Nav: tw.nav`bg-gray-900`,
		NavMainWapper: tw.div`mx-auto max-w-7xl px-2 sm:px-8 lg:px-8`,
		NavBox: tw.div`relative flex h-16 items-center justify-between`,
		NavItemBox: tw.div`absolute inset-y-0 left-0 flex items-center sm:hidden`,
		MobileMenuButton: tw.button`inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`,
		MenuBox: tw.div`flex flex-1 items-center justify-center sm:items-stretch sm:justify-start`,
		LogoBox: tw.div`flex flex-shrink-0 items-center`,
		MobileLogo: tw.div`block h-8 w-auto lg:hidden text-white`,
		MainLogo: tw.div`hidden h-auto w-auto lg:block cursor-pointer`,
		MainMenuBox: tw.div`hidden sm:ml-6 sm:block`,
		MainMenuItems: tw.div`flex space-x-4`,
		MainMenuItem: tw.a`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-NanumSquare text-sm font-medium`,
		MobileMenuBox: tw.div`hidden`,
		MobileMenuItems: tw.div`space-y-1 px-2 pt-2 pb-3`,
		MobileMenuItem: tw.a`text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium`,
	},
	Footer: {
		Container: tw.footer`fixed inset-x-0 bottom-0 bg-white dark:bg-gray-900`,
		Wapper: tw.div`py-3 px-6 bg-gray-100 dark:bg-gray-700 flex flex-row justify-between`,
		Copyright: tw.span`text-sm text-gray-500 dark:text-gray-300`,
		RightIconBox: tw.div`flex mt-0 space-x-6 justify-end`,
		IconItem: tw.div`cursor-pointer text-gray-400 hover:text-gray-900 dark:hover:text-white`,
	},
};
