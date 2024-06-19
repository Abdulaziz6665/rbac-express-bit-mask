create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;
ALTER DATABASE postgres SET timezone TO 'Asia/Tashkent';


create type e_user_role as enum('ADMIN', 'USER');

--view created
create table if not exists users (
    user_id uuid not null default uuid_generate_v4() primary key,
    user_name varchar(32) not null,
    user_password varchar(60) not null,
    user_role e_user_role not null default 'USER',
    user_email varchar(32) not null,
    created_at date not null default current_date,
    deleted timestamp
);

create unique index user_name_idx on users(user_name) where deleted is null;

create type e_book_genres as enum('FANTASY', 'FOLKLORE', 'ART');

--view created
create table if not exists books (
    book_id uuid not null default uuid_generate_v4() primary key,
    book_title text not null,
    book_author varchar(64) not null,
    book_publication_date date not null,
    book_genres e_book_genres not null,
    created_at date not null default current_date,
    deleted timestamp
);