FROM ubuntu:latest
LABEL maintainer="psmever <psmever@gmail.com>"

ENV DEBIAN_FRONTEND noninteractive
ENV LC_ALL=C.UTF-8

ARG OS_LOCALE

ENV TZ=Asia/Seoul

EXPOSE 80
EXPOSE 43380
EXPOSE 9000

ADD ./files/entrypoint.sh /usr/local/bin/entrypoint.sh
ADD ./files/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

RUN apt-get update

# System.. apt install
RUN apt-get install -y \
    apt-utils \
    language-pack-ko \
    tzdata \
    net-tools \
    curl \
    vim \
    iputils-ping \
    unzip

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN locale-gen ko_KR.UTF-8
RUN localedef -f UTF-8 -i ko_KR ko_KR.UTF-8

RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:ondrej/php
RUN apt-get update

# Developer apt install
RUN apt-get install -y \
    git \
    mariadb-client \
    nginx \
    php8.1 \
    php8.1-common \
    php8.1-cli \
    libphp8.1-embed \
    php8.1-bz2 \
    php8.1-mbstring \
    php8.1-zip \
    php8.1-curl \
    php8.1-xml \
    php8.1-gd \
    php8.1-fpm \
    php8.1-sqlite3 \
    php8.1-mysql

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN /bin/bash /usr/local/bin/entrypoint.sh

RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

RUN chown www-data:www-data /var/www
ADD ./files/nginx_default /etc/nginx/sites-available/default
