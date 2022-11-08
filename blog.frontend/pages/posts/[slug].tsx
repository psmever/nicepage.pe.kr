import { NextLayoutPage } from 'next';
import React, { ReactElement } from 'react';
import { MarkdownView } from '@Elements';
import { MainLayout } from '@Components/layouts';
import { PostsStyle } from '@Styles/pages/posts';

const { Container, Wapper, ContentsWapper } = PostsStyle.view;

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

const View: NextLayoutPage = () => {
	return (
		<Container>
			<Wapper>
				<ContentsWapper>
					<MarkdownView Contents={ViewContents} />
				</ContentsWapper>
			</Wapper>
		</Container>
	);
};

View.getLayout = (page: ReactElement) => {
	return <MainLayout>{page}</MainLayout>;
};

export default View;
