drop table if exists user;
drop table if exists mobile;
drop table if exists orders;

create table mobile(
    mid int primary key auto_increment,
    company varchar(20),
    model varchar(20),
    price int,
    img varchar(200),
    createdTimestamp DATETIME default CURRENT_TIMESTAMP
);
create table user(
    uid int primary key auto_increment,
    name varchar(30),
    email varchar(20),
    password varchar(150),
    phoneno int,
    createdTimestamp DATETIME default CURRENT_TIMESTAMP
);
create table orders(
    oid int primary key auto_increment,
    mid int,
    uid int,
    Total float,
    foreign key (mid) references mobile(mid),
    foreign key (uid) references user(uid),
    createdTimestamp DATETIME default CURRENT_TIMESTAMP
);

