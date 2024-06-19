alter table users rename to users_;
alter table books rename to books_;


create or replace view users as select * from users_
where deleted is null;

create or replace view books as select * from books_
where deleted is null;