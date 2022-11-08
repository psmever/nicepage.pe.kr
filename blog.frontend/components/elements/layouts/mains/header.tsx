import { NextPage } from 'next';
import React from 'react';
import { MainLayoutStyle } from '@Styles/layouts/main';

const {
	Constainer,
	Nav,
	NavMainWapper,
	NavBox,
	NavItemBox,
	MobileMenuButton,
	MenuBox,
	LogoBox,
	MobileLogo,
	MainLogo,
	MainMenuBox,
	MainMenuItems,
	MainMenuItem,
	MobileMenuBox,
	MobileMenuItems,
	MobileMenuItem,
} = MainLayoutStyle.Headers;

const Header: NextPage = () => {
	return (
		<Constainer>
			<Nav>
				<NavMainWapper>
					<NavBox>
						<NavItemBox>
							<MobileMenuButton
								type="button"
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
							</MobileMenuButton>
						</NavItemBox>
						<MenuBox>
							<LogoBox>
								<MobileLogo>
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
								</MobileLogo>
								<MainLogo>
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
								</MainLogo>
							</LogoBox>
							<MainMenuBox>
								<MainMenuItems>
									<MainMenuItem href="#">포스트</MainMenuItem>
									<MainMenuItem href="#">테그</MainMenuItem>
									<MainMenuItem href="#">끄적끄적</MainMenuItem>
									<MainMenuItem href="#">민군은</MainMenuItem>
									<MainMenuItem href="#">블로그 소개</MainMenuItem>
								</MainMenuItems>
							</MainMenuBox>
						</MenuBox>
					</NavBox>
				</NavMainWapper>

				<MobileMenuBox>
					<MobileMenuItems>
						<MobileMenuItem href="#">포스트</MobileMenuItem>
						<MobileMenuItem href="#">테그</MobileMenuItem>
						<MobileMenuItem href="#">끄적끄적</MobileMenuItem>
						<MobileMenuItem href="#">민군은</MobileMenuItem>
						<MobileMenuItem href="#">블로그 소개</MobileMenuItem>
					</MobileMenuItems>
				</MobileMenuBox>
			</Nav>
		</Constainer>
	);
};

export default Header;
