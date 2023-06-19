import { NextLayoutPage } from 'next';
import React, { ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import { MainLayout } from '@Components/layouts';
// import { BeakerIcon } from '@heroicons/react/24/solid';
import { PostsStyle } from '@Styles/pages/posts';
import { getPosts } from '@Services/postService';
import { PostListInterface } from '@Types/commonInterface';
import { useRouter } from 'next/router';

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
	const router = useRouter();
	const [pageState, setPageState] = useState<{
		postList: PostListInterface;
	}>();

	const handleClickPostItem = async (slugTitle: string) => {
		await router.push(`/posts/${slugTitle}`);
	};

	useEffect(() => {
		const funcGetPosts = async () => {
			const response = await getPosts(1).then();
			setPageState((prevState) => ({
				...prevState,
				postList: response.payload,
			}));
		};

		funcGetPosts().then();
	}, []);
	return (
		<Container>
			<Wapper>
				{pageState &&
					pageState.postList.posts.map((_, i) => {
						return (
							<PostWapper key={i} onClick={() => handleClickPostItem(_.slug_title)}>
								<ItemWapper key={i}>
									<ImageBox>
										<Image
											src={_.thumb}
											sizes="100%"
											layout="fill"
											objectFit="cover"
											quality={100}
											alt=""
											className="group-hover:opacity-75"
										/>
									</ImageBox>
									<ContentsWapper>
										<TitleWapper>{_.title}</TitleWapper>
										<ContentsText>{_.contents}</ContentsText>
									</ContentsWapper>
									<DateWapper>
										<DateText>{_.created_at}</DateText>
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
