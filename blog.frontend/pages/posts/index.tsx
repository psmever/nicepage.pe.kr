import { NextLayoutPage } from 'next';
import React, { ReactElement } from 'react';
import Image from 'next/image';
import { MainLayout } from '@Components/layouts';
// import { BeakerIcon } from '@heroicons/react/24/solid';
import { PostsStyle } from '@Styles/pages/posts';

const {
	Container,
	Wapper,
	PostWapper,
	ItemWapper,
	ImageBox,
	ContentsWapper,
	TitleWapper,
	ContentsText,
	DateWapper,
	DateText,
} = PostsStyle.posts;

const Home: NextLayoutPage = () => {
	return (
		<Container>
			<Wapper>
				{Array.apply(null, Array(30)).map((_, i) => {
					return (
						<PostWapper key={i}>
							<ItemWapper key={i}>
								<ImageBox>
									<Image
										src="https://media.nicepage.pe.kr/storage/blog/upload/46d82d77ed9f8d3382fdb0932e12fe558b936cc8/bbf34fc2-85f3-4a5f-bd63-8b74818330c3.png"
										sizes="100%"
										layout="fill"
										objectFit="cover"
										quality={100}
										alt=""
										className="group-hover:opacity-75"
									/>
								</ImageBox>
								<ContentsWapper>
									<TitleWapper>
										[Xdebug] mac + valet + laravel + xdebug
									</TitleWapper>
									<ContentsText>
										설정방법이놈에는왜로설치해야하는거냐쩝모듈의디렉토리위치때문에버전올릴때마다다시깔아줘야함ㅠㅠ
									</ContentsText>
								</ContentsWapper>
								<DateWapper>
									<DateText>2 year ago</DateText>
								</DateWapper>
							</ItemWapper>
						</PostWapper>
					);
				})}
			</Wapper>
		</Container>
	);
};

Home.getLayout = (page: ReactElement) => {
	return <MainLayout>{page}</MainLayout>;
};

export default Home;
