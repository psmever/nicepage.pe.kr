import { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
import { MarkdownView } from '@Elements/markdown';

const ViewContents = `
![image](https://media.nicepage.pe.kr/storage/blog/upload/576da5668bf482d1c1367cdd2e6534af5ef837ae/1d421865-5a1a-4b4c-9b4b-9c4b45661929.png)


# xdebug 설정 방법?

> 이놈에 xdebug 는 왜 pecl로 설치 해야 하는 거냐.. 쩝.



> 모듈의 디렉토리 위치 때문에 php 버전 올릴때마다 다시 깔아줘야함. ㅠㅠ




\`\`\`javascript
# pecl list


# pecl install xdebug

# mkdir /usr/local/etc/php/"PHP_VERSION"/conf.d

ex)# mkdir /usr/local/etc/php/7.4/conf.d
\`\`\`\`


\`\`\`javascript
# php --ini
Configuration File (php.ini) Path: /usr/local/etc/php/7.4
Loaded Configuration File:         /usr/local/etc/php/7.4/php.ini
Scan for additional .ini files in: /usr/local/etc/php/7.4/conf.d
Additional .ini files parsed:      /usr/local/etc/php/7.4/conf.d/error_log.ini,
/usr/local/etc/php/7.4/conf.d/ext-opcache.ini,
/usr/local/etc/php/7.4/conf.d/php-memory-limits.ini,
/usr/local/etc/php/7.4/conf.d/xdebug.ini
\`\`\`


\`\`\`javascript
xdebug.ini


[xdebug]
zend_extension = "/usr/local/Cellar/php@7.4/7.4.20/pecl/20190902/xdebug.so"
xdebug.mode = debug
xdebug.client_host = 127.0.0.1
xdebug.client_port = 9001
xdebug.start_with_request = yes
; xdebug.log="/var/log/nginx/xdebug.log"
xdebug.idekey = PHPSTORM
xdebug.discover_client_host = false
\`\`\`


> phpstorm 설정은 추후에;;



> 리눅스에선 못해봄.
`;

const View: NextPage = () => {
	return (
		<div className="flex flex-col dark:bg-slate-900">
			<header className="sticky top-0 z-50">
				<nav className="dark:bg-slate-900">
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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
									<span className="block h-8 w-auto lg:hidden text-white">
										NicePage
									</span>
									<span className="hidden h-8 w-auto lg:block text-white">
										NicePage
									</span>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										<a
											href="#"
											className="bg-slate-900 text-white px-3 py-2 rounded-md text-sm font-medium"
											aria-current="page"
										>
											포스트
										</a>
										<a
											href="#"
											className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
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
						<div className="w-full">
							<MarkdownView Contents={ViewContents} />
						</div>
					</div>
				</div>
			</section>
			<footer className="fixed inset-x-0 bottom-0 p-1 dark:bg-slate-900 shadow md:px-6 md:py-1">
				<span className="block text-sm text-gray-500 sm:text-center dark:bg-slate-900">
					© 2022{' '}
					<a href="https://blog.nicepage.pe.kr" className="hover:underline">
						NicePage
					</a>
					. All Rights Reserved.
				</span>
			</footer>
		</div>
	);
};

export default View;
