import { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
// import { BeakerIcon } from '@heroicons/react/24/solid';

const Home: NextPage = () => {
	return (
		<div className="flex flex-col dark:bg-slate-900">
			<header className="sticky top-0 z-50">
				<nav className="dark:bg-slate-900">
					<div className="mx-auto max-w-7xl px-2 sm:px-8 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								<button
									type="button"
									className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
									aria-controls="mobile-menu"
									aria-expanded="false"
								>
									<span className="sr-only">Open main menu</span>
									<svg
										className="block h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
										/>
									</svg>
									<svg
										className="hidden h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex flex-shrink-0 items-center">
									<div className="block h-8 w-auto lg:hidden text-white">
										<svg width="100" height="36">
											<text
												x="50%"
												y="50%"
												dominantBaseline="middle"
												textAnchor="middle"
												className="text-2xl"
												fill="white"
												fontFamily="Arial, Helvetica, sans-serif"
											>
												NicePage
											</text>
										</svg>
									</div>
									{/*<span className="hidden h-8 w-auto lg:block text-white">*/}
									{/*	NicePage1*/}
									{/*</span>*/}
									<div className="hidden h-auto w-auto lg:block cursor-pointer">
										<svg width="100" height="36">
											<text
												x="50%"
												y="50%"
												dominantBaseline="middle"
												textAnchor="middle"
												className="text-2xl"
												fill="white"
												fontFamily="Arial, Helvetica, sans-serif"
											>
												NicePage
											</text>
										</svg>
									</div>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										<a
											href="#"
											className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-NanumSquare text-sn font-medium"
											aria-current="page"
										>
											포스트
										</a>
										<a
											href="#"
											className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
											aria-current="page"
										>
											테그
										</a>

										<a
											href="#"
											className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
										>
											끄적끄적
										</a>

										<a
											href="#"
											className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
										>
											민군은
										</a>

										<a
											href="#"
											className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
										>
											블로그 소개
										</a>
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<div className="relative ml-3">
									<div>
										<button
											type="button"
											className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
											id="user-menu-button"
											aria-expanded="false"
											aria-haspopup="true"
										>
											<span className="sr-only">Open user menu</span>
											<Image
												src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												sizes="100%"
												layout="fill"
												objectFit="cover"
												quality={100}
												alt=""
												className="h-8 w-8 rounded-full"
											/>
										</button>
									</div>

									<div
										className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden"
										role="menu"
										aria-orientation="vertical"
										aria-labelledby="user-menu-button"
										tabIndex={-1}
									>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700"
											role="menuitem"
											tabIndex={-1}
											id="user-menu-item-0"
										>
											Your Profile
										</a>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700"
											role="menuitem"
											tabIndex={-1}
											id="user-menu-item-1"
										>
											Settings
										</a>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700"
											role="menuitem"
											tabIndex={-1}
											id="user-menu-item-2"
										>
											Sign out
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="hidden" id="mobile-menu">
						<div className="space-y-1 px-2 pt-2 pb-3">
							<a
								href="#"
								className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
								aria-current="page"
							>
								포스트
							</a>

							<a
								href="#"
								className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
							>
								테그
							</a>

							<a
								href="#"
								className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
							>
								끄적끄적
							</a>

							<a
								href="#"
								className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
							>
								민군은
							</a>

							<a
								href="#"
								className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
							>
								블로그 소개
							</a>
						</div>
					</div>
				</nav>
			</header>
			<section className="min-h-screen body-font text-gray-600 dark:bg-slate-900">
				<div className="container mx-auto px-5 py-10 dark:bg-slate-900">
					<div className="-m-4 flex flex-wrap dark:bg-slate-900">
						{Array.apply(null, Array(30)).map((_, i) => {
							return (
								<div
									key={i}
									className="w-full p-4 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 cursor-pointer"
								>
									<div
										key={i}
										className="bg-slate-900 rounded-lg border border-slate-800 shadow-md"
									>
										<div className="w-full h-40 relative">
											<Image
												src="https://media.nicepage.pe.kr/storage/blog/upload/46d82d77ed9f8d3382fdb0932e12fe558b936cc8/bbf34fc2-85f3-4a5f-bd63-8b74818330c3.png"
												sizes="100%"
												layout="fill"
												objectFit="cover"
												quality={100}
												alt=""
												className="group-hover:opacity-75"
											/>
										</div>
										<div className="p-5">
											<a href="#">
												<h5 className="mb-2 text-2xl font-NanumSquare text-white">
													[Xdebug] mac + valet + laravel + xdebug
												</h5>
											</a>
											<p className="mb-3 font-NanumSquare text-gray-700 dark:text-gray-400">
												설정방법이놈에는왜로설치해야하는거냐쩝모듈의디렉토리위치때문에버전올릴때마다다시깔아줘야함ㅠㅠ
											</p>
										</div>
										<div className="py-1 pl-3">
											<p className="mb-1 font-NanumSquare font-normal text-gray-700 dark:text-gray-400">
												2 year ago
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>
			{/* <footer className="fixed inset-x-0 bottom-0 p-1 dark:bg-slate-900 shadow md:px-6 md:py-1">
				<span className="block text-sm text-gray-500 sm:text-center dark:bg-slate-900">
					© 2022{' '}
					<a href="https://blog.nicepage.pe.kr" className="hover:underline">
						NicePage
					</a>
					. All Rights Reserved.
				</span>
			</footer> */}

			<footer className="fixed inset-x-0 bottom-0 bg-white dark:bg-gray-900">
				<div className="py-3 px-6 bg-gray-100 dark:bg-gray-700 flex flex-row justify-between">
					<span className="text-sm text-gray-500 dark:text-gray-300">
						© 2022 <a href="https://flowbite.com/">NicePage</a>. All Rights Reserved.
					</span>
					<div className="flex mt-0 space-x-6 justify-right">
						<a
							href="#"
							className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
						>
							<svg
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									clipRule="evenodd"
								></path>
							</svg>
							<span className="sr-only">GitHub account</span>
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
								/>
							</svg>
							<span className="sr-only">로그인</span>
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
								/>
							</svg>

							<span className="sr-only">로그인</span>
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Home;
