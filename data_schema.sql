create database api_coding_challenge;
use api_coding_challenge;

create table customer_table(

	customerId  int primary key not null auto_increment,
	firstName varchar(50) not null,
	lastName varchar(50) not null,
    address varchar(200) not null,
	email varchar(100) unique not null,
    state varchar(50) not null,
	plan enum("Gold","Silver","Bronze") not null
-- role enum("user","admin") not null
)auto_increment=100;

insert into customer_table (firstName,lastName,address,email,state,plan)values
("abhi","m","hyd","abhi@gmail.com","TS","Gold"),
("tarak","m","hyd","tarak@gmail.com","TS","Silver"),
("nag","m","hyd","nag@gmail.com","TS","Bronze"),
("ramu","m","hyd","ramu@gmail.com","TS","Gold"),
("ravi","m","hyd","ravi@gmail.com","TS","Silver");

insert into customer_table (firstName,lastName,address,email,state,plan)values
("aravinda","m","hyd","aravinda@gmail.com","TS","Gold");
insert into customer_table (firstName,lastName,address,email,state,plan)values
("sunil","m","hyd","sunil@gmail.com","TS","Gold");