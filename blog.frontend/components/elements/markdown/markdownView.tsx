import { NextPage } from 'next';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useEffect } from 'react';

const sanityIoImageLoader = ({
	src,
	width,
	quality,
}: {
	src: string;
	width: number;
	quality: number | undefined;
}) => {
	return `https://media.nicepage.pe.kr/${src}?w=${width}&q=${quality || 75}`;
};

const MarkdownView: NextPage<{
	Contents: string;
}> = ({ Contents }) => {
	useEffect(() => {
		console.debug(Contents);
	}, [Contents]);
	return (
		<div className="markdown-body">
			<ReactMarkdown
				components={{
					p: ({ node, children }: { node: any; children: any }) => {
						if (node.children[0].tagName === 'img') {
							const image: any = node.children[0];
							return (
								<div className="image">
									<Image
										// loader={({ src }) => imgLoader({ src })}
										// src={`${image.properties.src}`}
										// alt={image.properties.alt}
										// width="600"
										// height="300"

										// loader={sanityIoImageLoader}
										loader={({ src, width, quality }) =>
											sanityIoImageLoader({ src, width, quality })
										}
										src={`${image.properties.src}`}
										alt={image.properties.alt}
										width={500}
										height={500}
										quality={100}
									/>
								</div>
							);
						}
						// Return default child if it's not an image
						return <p>{children}</p>;
					},
					code({ className, children }) {
						// Removing "language-" because React-Markdown already added "language-"
						const language = className?.replace('language-', '');
						return (
							<SyntaxHighlighter
								style={materialDark}
								language={language}
								// children={children[0]}
							>
								{String(children[0])}
							</SyntaxHighlighter>
						);
					},
				}}
			>
				{Contents}
			</ReactMarkdown>
		</div>
	);
};

export default MarkdownView;
